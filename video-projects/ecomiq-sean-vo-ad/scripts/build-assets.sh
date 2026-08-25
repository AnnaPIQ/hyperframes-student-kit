#!/usr/bin/env bash
# =============================================================================
# build-assets.sh — cut the picture bed + VO from the raw Drive masters.
#
#   bash scripts/build-assets.sh
#
# Run from video-projects/ecomiq-sean-vo-ad/. Reads the raw masters out of the
# workspace-level assets/incoming/ (gitignored) and writes render-ready assets
# into this project's assets/.
#
# Everything here is deterministic and re-runnable — see EDIT-PLAN.md for the
# reasoning behind every timestamp.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

IN="../../assets/incoming"
OUT="assets"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

SRC_916="$IN/montage-raw.mp4"          # 1080x1920 native
SRC_SQ="$IN/montage-square-raw.mp4"    # 1440x1440 native
SRC_VO="$IN/sean-raw.mov"              # 3840x2160 ProRes, PCM 48k

for f in "$SRC_916" "$SRC_SQ" "$SRC_VO"; do
  [ -f "$f" ] || { echo "✗ missing source: $f" >&2; exit 1; }
done

# ---------------------------------------------------------------------------
# 1. Voiceover — Sean's speech only.
#    Source speech runs 3.26 -> 39.14; we take 3.100 -> 39.300 for a 0.16s
#    handle either side. Montage audio is never used.
# ---------------------------------------------------------------------------
VO_IN=3.100
VO_DUR=36.200
echo "▶ VO  ${VO_IN}s +${VO_DUR}s"
ffmpeg -hide_banner -v error -y -ss "$VO_IN" -i "$SRC_VO" -t "$VO_DUR" \
  -vn -ac 2 -ar 48000 -c:a pcm_s16le \
  -af "afade=t=in:st=0:d=0.12,afade=t=out:st=36.02:d=0.18" \
  "$OUT/sean-vo.wav"

# ---------------------------------------------------------------------------
# 1b. A-roll PiP — Sean's head, square, ready for a CSS circle mask.
#     Cut from the SAME in-point as the VO (3.100) so lips track his voice with
#     no offset. Source is 25 fps; conformed to 30 to match the composition.
#     Crop window 1300x1300 @ (1055, 43) frames head-and-shoulders tight enough to
#     read at corner-PiP size, and holds him inside the inscribed circle for the
#     whole take.
# ---------------------------------------------------------------------------
PIP_DUR=34.100
echo "▶ PiP  ${VO_IN}s +${PIP_DUR}s"
ffmpeg -hide_banner -v error -y -ss "$VO_IN" -i "$SRC_VO" -t "$PIP_DUR" \
  -vf "crop=1300:1300:1055:43,scale=720:720:flags=lanczos,setsar=1,fps=30" \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -an \
  -movflags +faststart "$OUT/sean-pip.mp4"

# Silent, duckable music-bed placeholder — swap in a real bed, keep the name.
echo "▶ music bed placeholder (silent)"
ffmpeg -hide_banner -v error -y -f lavfi -i anullsrc=r=48000:cl=stereo \
  -t 37.600 -c:a pcm_s16le "$OUT/music-bed.wav"

# ---------------------------------------------------------------------------
# 2. Picture bed.
#    Block A  0.000 -> 27.733   the reel, straight, untouched
#    Block B  27.733 -> 34.050  authority reprise, 8 hero shots, native speed
#    Bed runs to 34.050 so the 0.35s dissolve into the end card (33.700 ->
#    34.050) always has picture underneath it.
#
#    Block B shots: "in duration" against the montage master. The cut list is
#    identical in both the 9:16 and 1:1 masters, so these apply to each.
# ---------------------------------------------------------------------------
BLOCK_B=(
  "7.033  0.567"   # Shopify Premier Partner card   -> "backed by"
  "9.067  0.900"   # Sean presenting charts         -> "an agency"
  "13.867 0.717"   # store aisle with a client      -> real brands
  "15.600 0.833"   # product / search UI            -> the work
  "18.033 1.000"   # stage: 1.3B requests / 99.9%   -> "done this for a living"
  "16.433 0.633"   # coaching call                  -> "coaching"
  "22.833 0.800"   # hands on laptop                -> craft
  "26.867 0.867"   # Sean, warm half-smile          -> "for over 10 years"
)

build_bed() {
  local src="$1" out="$2" w="$3" h="$4"
  local vf="scale=${w}:${h}:flags=lanczos,setsar=1"
  local enc=(-c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 30 -an)
  local list="$WORK/list.txt"; : > "$list"

  echo "▶ bed ${w}x${h}  ->  $out"

  # Block A — the reel up to its own built-in end card at 27.733
  ffmpeg -hide_banner -v error -y -i "$src" -t 27.733 -vf "$vf" "${enc[@]}" \
    "$WORK/a.mp4"
  echo "file '$WORK/a.mp4'" >> "$list"

  # Block B — the reprise
  local i=0
  for shot in "${BLOCK_B[@]}"; do
    read -r ss dur <<< "$shot"
    i=$((i + 1))
    local seg
    seg="$WORK/b$(printf %02d "$i").mp4"
    ffmpeg -hide_banner -v error -y -ss "$ss" -i "$src" -t "$dur" -vf "$vf" \
      "${enc[@]}" "$seg"
    echo "file '$seg'" >> "$list"
  done

  ffmpeg -hide_banner -v error -y -f concat -safe 0 -i "$list" \
    -c copy -movflags +faststart "$out"

  printf '  ✓ %s  %ss\n' "$out" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out")"
}

build_bed "$SRC_916" "$OUT/bed-916.mp4"    1080 1920
build_bed "$SRC_SQ"  "$OUT/bed-square.mp4" 1080 1080

echo
echo "✅ assets built:"
ls -la "$OUT"/sean-vo.wav "$OUT"/sean-pip.mp4 "$OUT"/music-bed.wav "$OUT"/bed-916.mp4 "$OUT"/bed-square.mp4
