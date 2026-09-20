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
# "<src_start_frame>:<src_frames>:<out_frames>:<label>"
# out > src means the shot is slowed to fill its beat (setpts). 17 shots over
# 585 frames — averaging 1.15s, deliberately slower than the reel's own ~0.8s
# cutting so the footage can breathe under the VO. Not every shot in the reel
# is used.
#
# Anchors (*) are timed against the VO transcript:
#   shot  4 -> "...they're all small."        (3.267s)
#   shot  6 -> "...how you sell..."           (5.767s)
#   shot  9 -> "We guarantee it."             (9.467s)
#   shot 10 -> "Give us 90 days."            (11.033s)
#   shot 12 -> "...an EcomIQ strategist..."  (13.033s)
#   shot 16 -> "...order value climbing."    (17.600s)
SHOTS=(
  "150:18:30:bake-shop storefront"      #  1  0.000  'Run a Shopify store'
  "192:19:32:cupcakes"                  #  2  1.000
  "685:24:36:laptop typing"             #  3  2.067  'Plenty of orders'
  "445:23:37:dryft packets"             #  4  3.267 *'they are all small'
  "272:27:38:whiteboard strategy"       #  5  4.500
  "469:24:38:upsell / bundle UI"        #  6  5.767 *'how you sell'
  "661:24:36:2400/2300 screens"         #  7  7.033  'lift what every'
  "738:27:37:shopify booth"             #  8  8.233  'customer spends'
  "211:17:47:SHOPIFY PREMIER PARTNER"   #  9  9.467 *'We guarantee it.' + the pause after
  "327:25:30:sean with mic"             # 10 11.033 *'Give us 90 days.'
  "493:19:30:strategist video call"     # 11 12.033  'You will work with'
  "571:28:40:stockroom walkthrough"     # 12 13.033 *'EcomIQ strategist'
  "299:27:34:team walking"              # 13 14.367  'build those changes with you'
  "628:33:36:delivery"                  # 14 15.500
  "600:27:27:coffee / reset beat"       # 15 16.700
  "541:30:30:1.3B / 99.9% stat wall"    # 16 17.600 *'order value climbing'
  "513:27:27:confident walk-off"        # 17 18.600
)

# --- assemble the filter graph ----------------------------------------------
filter=""; labels=""; n=0; total=0
for entry in "${SHOTS[@]}"; do
  IFS=':' read -r start srclen outlen _label <<< "$entry"
  n=$((n+1))
  end=$((start + srclen))
  if [ "$outlen" -ne "$srclen" ]; then
    # Stretch the shot to fill its beat. setpts rescales presentation times but
    # does NOT extend the final frame's duration, so a stretched segment lands
    # ~(factor-1) frames short. tpad clones the tail, then trim cuts back to an
    # exact frame count — without this the 17 segments totalled 578, not 585.
    pts=$(awk -v o="$outlen" -v l="$srclen" 'BEGIN{printf "%.6f", o/l}')
    filter+="[0:v]trim=start_frame=${start}:end_frame=${end},setpts=(PTS-STARTPTS)*${pts},fps=30,tpad=stop_mode=clone:stop_duration=1,trim=end_frame=${outlen},setpts=PTS-STARTPTS[v${n}];"
  else
    filter+="[0:v]trim=start_frame=${start}:end_frame=${end},setpts=PTS-STARTPTS[v${n}];"
  fi
  total=$((total + outlen))
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
