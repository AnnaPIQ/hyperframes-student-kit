#!/usr/bin/env bash
# =============================================================================
# build-montage.sh — cut the EcomIQ showcase reel down to the VO spine.
#
# Takes the raw 9:16 "Showcase Reel" and rebuilds it as a 585-frame (19.500s)
# silent montage that runs underneath Sean's voiceover, then emits one
# normalized master per delivery ratio.
#
#   bash scripts/build-montage.sh <raw-reel.mp4> <vo.aifc>
#
# Outputs (into assets/):
#   montage-9x16.mp4  1080x1920  native, no scaling
#   montage-4x5.mp4   1080x1350  centre crop (285px off top and bottom)
#   vo-sean.wav       48k mono PCM — sample-accurate spine, no codec delay
#
# The shot table below is frame-exact and deliberate: every entry is a source
# in-point (in frames @30fps) plus an output length, chosen so that three
# anchor shots land on three specific words in the VO. See DESIGN.md.
#
# Source reel is 30fps CFR, so frame = seconds * 30 throughout.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

RAW="${1:?usage: build-montage.sh <raw-reel.mp4> <vo.aifc>}"
VO="${2:?usage: build-montage.sh <raw-reel.mp4> <vo.aifc>}"
[ -f "$RAW" ] || { echo "✗ reel not found: $RAW" >&2; exit 1; }
[ -f "$VO" ]  || { echo "✗ vo not found: $VO" >&2; exit 1; }

mkdir -p assets

# --- the shot table ----------------------------------------------------------
# "<src_start_frame>:<out_frames>:<label>"
# Anchors (★) are timed against the VO transcript:
#   shot 13 → "We guarantee it."        (9.467s)
#   shot 15 → "Give us 90 days."        (11.133s)
#   shot 23 → "...order value climbing" (17.600s)
SHOTS=(
  "150:18:bake-shop storefront"          #  1  0.000  'Run a Shopify store'
  "192:19:cupcakes"                      #  2  0.600
  "685:24:laptop typing"                 #  3  1.233  'Plenty of orders'
  "416:24:retail aisle"                  #  4  2.033
  "710:27:retail, product in hand"       #  5  2.833
  "445:23:dryft packets"                 #  6  3.733 ★'they're all small'
  "272:27:whiteboard strategy"           #  7  4.500
  "469:24:upsell / bundle UI"            #  8  5.400 ★'how you sell'
  "371:24:tablet in hand"                #  9  6.200
  "661:24:2400/2300 screens"             # 10  7.000 ★'lift what every'
  "738:27:shopify booth"                 # 11  7.800
  "228:23:high-five"                     # 12  8.700
  "211:17:SHOPIFY PREMIER PARTNER"       # 13  9.467 ★'We guarantee it.'  (slowed 17→30)
  "252:20:sean closeup"                  # 14 10.467
  "327:25:sean with mic"                 # 15 11.133 ★'Give us 90 days.'
  "493:19:strategist video call"         # 16 11.967
  "352:19:merchant conversation"         # 17 12.600
  "571:28:stockroom walkthrough"         # 18 13.233 ★'EcomIQ strategist'
  "790:16:bakery kitchen"                # 19 14.167
  "299:27:team walking"                  # 20 14.700
  "628:33:delivery"                      # 21 15.600
  "600:27:coffee / reset beat"           # 22 16.700
  "541:30:1.3B / 99.9% stat wall"        # 23 17.600 ★'order value climbing'
  "513:27:confident walk-off"            # 24 18.600
)
SLOW_INDEX=13          # 1-based: the Premier Partner card, stretched to fill its beat
SLOW_OUT_FRAMES=30

# --- assemble the filter graph ----------------------------------------------
filter=""; labels=""; n=0; total=0
for entry in "${SHOTS[@]}"; do
  IFS=':' read -r start len _label <<< "$entry"
  n=$((n+1))
  end=$((start + len))
  if [ "$n" -eq "$SLOW_INDEX" ]; then
    # stretch a short static card to fill its beat rather than cutting away early
    pts=$(awk -v o=$SLOW_OUT_FRAMES -v l=$len 'BEGIN{printf "%.6f", o/l}')
    filter+="[0:v]trim=start_frame=${start}:end_frame=${end},setpts=(PTS-STARTPTS)*${pts},fps=30[v${n}];"
    total=$((total + SLOW_OUT_FRAMES))
  else
    filter+="[0:v]trim=start_frame=${start}:end_frame=${end},setpts=PTS-STARTPTS[v${n}];"
    total=$((total + len))
  fi
  labels+="[v${n}]"
done
filter+="${labels}concat=n=${n}:v=1:a=0[cut]"

dur=$(awk -v t=$total 'BEGIN{printf "%.3f", t/30}')
echo "▶ ${n} shots · ${total} frames · ${dur}s"

# --- 9:16 — source is natively 1080x1920, nothing to scale -------------------
echo "▶ montage-9x16.mp4  (1080x1920, native)"
ffmpeg -y -v error -i "$RAW" \
  -filter_complex "${filter};[cut]format=yuv420p[out]" -map "[out]" -an \
  -c:v libx264 -preset medium -crf 18 -r 30 -movflags +faststart \
  assets/montage-9x16.mp4

# --- 4:5 — centre crop, 285px off top and bottom -----------------------------
echo "▶ montage-4x5.mp4   (1080x1350, centre crop)"
ffmpeg -y -v error -i "$RAW" \
  -filter_complex "${filter};[cut]crop=1080:1350:0:285,format=yuv420p[out]" -map "[out]" -an \
  -c:v libx264 -preset medium -crf 18 -r 30 -movflags +faststart \
  assets/montage-4x5.mp4

# --- VO — PCM keeps it sample-accurate; AAC's encoder delay would drift ------
echo "▶ vo-sean.wav       (48k mono PCM)"
ffmpeg -y -v error -i "$VO" -ac 1 -ar 48000 -c:a pcm_s16le assets/vo-sean.wav

echo "✓ done"
for f in assets/montage-9x16.mp4 assets/montage-4x5.mp4 assets/vo-sean.wav; do
  printf '   %-26s %s\n' "$f" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")s"
done
