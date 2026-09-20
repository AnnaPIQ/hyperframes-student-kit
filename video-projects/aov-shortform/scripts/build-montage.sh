#!/usr/bin/env bash
# =============================================================================
# build-montage.sh, assemble the b-roll bed for the AOV short-form ad.
#
#   bash scripts/build-montage.sh <source.mp4> <916|45> [crop-up|crop-centre|pad]
#
# Cuts the "Showcase Reel" source into a shot list ordered against Sean's VO,
# normalises it to the target aspect, strips the source audio, and writes
# assets/montage-<ratio>.mp4.
#
# The shot table below is keyed to the reel's own scene cuts (ffmpeg
# scene-detect) with a 30ms inset either side so no frame of a neighbouring
# shot bleeds through. Shots are hard-cut inside a beat and cross-dissolved
# (0.18s) across beat boundaries, so the cuts land with the VO's phrasing.
#
# Source b-roll is only usable to 27.65s, the reel carries its own baked-in
# EcomIQ end card from ~27.70s, which this ad replaces with its own.
# =============================================================================
set -euo pipefail

SRC="${1:?usage: build-montage.sh <source.mp4> <916|45> [crop-up|crop-centre|pad]}"
RATIO="${2:?usage: build-montage.sh <source.mp4> <916|45> [crop-up|crop-centre|pad]}"
FITMODE="${3:-crop-up}"

cd "$(dirname "$0")/.."

case "$RATIO" in
  916) OUT_W=1080; OUT_H=1920;;
  45)  OUT_W=1080; OUT_H=1350;;
  *) echo "ratio must be 916 or 45" >&2; exit 1;;
esac

FPS=30
XF=0.18   # cross-dissolve length at beat boundaries

# ---- shot table -------------------------------------------------------------
# "<in> <out>" , source in/out seconds. Groups map 1:1 to the VO beats.
# Beat 1, hook:    "Run a Shopify store? Want every order worth more?"
BEAT1=(
  "24.64 25.47"   # Shopify cube on the event floor
  "23.68 24.57"   # store aisle, customer with product in hand
  "14.87 15.57"   # dryft pouches held up in store
  "15.63 16.41"   # site search / product listing screen recording
  "06.40 07.01"   # cupcakes, sprinkles falling
  "05.00 05.57"   # bakery storefront
)
# Beat 2, problem: "You're already winning the customer.
#                    Now make each one spend more."
BEAT2=(
  "13.19 13.85"   # expo floor wide, the crowd
  "12.40 13.15"   # badge scan at the booth
  "14.02 14.65"   # store aisle walk with a customer
  "07.63 08.35"   # couple laughing
  "20.93 22.01"   # pulling up to the store
  "22.86 23.62"   # hands on keyboard
  "19.99 20.88"   # coffee through the window, breath beat
)
# Beat 3, offer:   "Give us 90 days. You'll work with an EcomIQ strategist
#                    who's done this before, and they'll do it for you."
BEAT3=(
  "17.10 18.00"   # walking, sunglasses
  "18.06 19.00"   # stage, "2.3+ Billion / 99.9% uptime" behind
  "04.13 04.94"   # MMNTM presentation to the room
  "09.10 09.94"   # presenting to the screen
  "08.40 09.04"   # podcast, blue-lit
  "22.06 22.80"   # piece to camera, SHOPTALK
  "26.90 27.62"   # profile, smiling, warm human beat into the card
)

# Beat target lengths, keyed to the VO phrase boundaries (silencedetect).
# Beat 3 runs 0.25s past the end-card trigger so the transition has cover.
# The two later beats carry +XF because each cross-dissolve eats XF seconds.
B1_T=4.55
B2_T=$(echo "6.20 + $XF" | bc -l)
B3_T=$(echo "6.55 + $XF" | bc -l)

# ---- per-ratio normalisation ------------------------------------------------
# Source is 1080x1920 (9:16), so 9:16 is a straight pass-through.
if [ "$RATIO" = "916" ]; then
  FIT="scale=${OUT_W}:${OUT_H}:flags=lanczos,setsar=1"
elif [ "$FITMODE" = "pad" ]; then
  # Letterbox-safe: whole frame kept, navy pillarbox either side (#06284C).
  FIT="scale=w=${OUT_W}:h=${OUT_H}:force_original_aspect_ratio=decrease:flags=lanczos,pad=${OUT_W}:${OUT_H}:(ow-iw)/2:(oh-ih)/2:color=0x06284C,setsar=1"
elif [ "$FITMODE" = "crop-centre" ]; then
  # Straight centre crop: loses ~285px top and bottom, clips heads on the
  # stage shots.
  FIT="scale=${OUT_W}:-2:flags=lanczos,crop=${OUT_W}:${OUT_H}:0:(ih-${OUT_H})/2,setsar=1"
else
  # Default. Crop biased 15% toward the top so heads survive: ~200px off the
  # top, ~370px off the bottom. Fills the frame, keeps subjects large.
  FIT="scale=${OUT_W}:-2:flags=lanczos,crop=${OUT_W}:${OUT_H}:0:(ih-${OUT_H})*0.35,setsar=1"
fi

# ---- build the filter graph -------------------------------------------------
# Each shot becomes a trimmed, normalised stream; shots concat hard inside a
# beat, and the three beats xfade into one another.
FILTER=""
IDX=0
GROUP_LABELS=()

build_group () {
  local gname="$1"; shift
  local target="$1"; shift
  local shots=("$@")
  local n=${#shots[@]}

  # Natural length of the group, then a uniform stretch so it lands exactly on
  # the beat boundary (keeps every shot's share of the beat proportional).
  local natural=0
  for s in "${shots[@]}"; do
    read -r si so <<< "$s"
    natural=$(echo "$natural + ($so - $si)" | bc -l)
  done
  # Stretch a touch beyond the beat, then hard-trim back to it. Concat across
  # 7-8 shots loses up to a frame per shot, which left the group short of its
  # target and pushed the next xfade offset past the end of its own input.
  local stretch
  stretch=$(echo "($target + 0.25) / $natural" | bc -l)
  printf '   %s: %d shots, %.2fs source over %.2fs on screen, retime x%.3f, avg shot %.2fs\n' \
    "$gname" "$n" "$natural" "$target" "$stretch" "$(echo "$target / $n" | bc -l)" >&2

  local labels=""
  for s in "${shots[@]}"; do
    read -r si so <<< "$s"
    FILTER+="[0:v]trim=start=${si}:end=${so},setpts=(PTS-STARTPTS)*${stretch},${FIT},fps=${FPS}[v${IDX}];"
    labels+="[v${IDX}]"
    IDX=$((IDX+1))
  done
  # tpad is a safety net only (clone-holds the last frame if the stretch still
  # lands short); trim pins the group to exactly its beat length so the
  # xfade offsets below are exact.
  FILTER+="${labels}concat=n=${n}:v=1:a=0,tpad=stop_mode=clone:stop_duration=0.5,trim=0:${target},setpts=PTS-STARTPTS,fps=${FPS}[${gname}];"
  GROUP_LABELS+=("$gname")
}

build_group g1 "$B1_T" "${BEAT1[@]}"
build_group g2 "$B2_T" "${BEAT2[@]}"
build_group g3 "$B3_T" "${BEAT3[@]}"

# xfade offsets are measured on the *running* output, so each one subtracts XF.
O1=$(echo "$B1_T - $XF" | bc -l)
O2=$(echo "$B1_T + $B2_T - 2*$XF" | bc -l)
FILTER+="[g1][g2]xfade=transition=fade:duration=${XF}:offset=${O1}[x1];"
FILTER+="[x1][g3]xfade=transition=fade:duration=${XF}:offset=${O2},format=yuv420p[vout]"

OUT="assets/montage-${RATIO}.mp4"
echo "▶ ${OUT}  (${OUT_W}x${OUT_H} · ${FITMODE} · muted)"

ffmpeg -v warning -y -i "$SRC" \
  -filter_complex "$FILTER" -map "[vout]" -an \
  -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r "$FPS" \
  -movflags +faststart "$OUT"

ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,nb_frames \
  -show_entries format=duration -of default=nw=1 "$OUT"
