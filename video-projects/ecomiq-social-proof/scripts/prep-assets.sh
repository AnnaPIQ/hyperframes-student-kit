#!/usr/bin/env bash
# =============================================================================
# prep-assets.sh — trim the VO and normalize B-roll to each delivery ratio.
#
# VO: the source has a record-button press + throat clear at 0.10-0.85s, then
# handling noise and room tone until speech starts at 3.62s; and after the last
# word decays (~40.10s) there is nothing but room tone to 43.0s. So we keep
# 3.50 -> 40.35 (36.85s), which leaves ~0.12s of clean pre-roll and lets the
# final word decay naturally. Loudness is normalized (the source peaks at
# -13.5 dB / averages -38.4 dB, too quiet to ship).
#
# B-roll: CROP TO FILL for both ratios (approved) -- the footage is a darkened
# backdrop behind graphics, so losing the edges is safe and it beats letterboxing.
#   9:16  the five transposed wholesaler clips are already 2160x3840 = exactly
#         9:16, so they only scale -- no crop at all. `product` is true 16:9 and
#         IS cropped hard (keeps the middle ~32% of frame width).
#   1:1   every clip is cropped.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

VO_IN=assets/vo/dryft-social-proof-vo.m4a
TRIM_START=3.50
TRIM_END=40.35

echo "▶ VO trim ${TRIM_START}s -> ${TRIM_END}s + loudness normalize"
ffmpeg -nostdin -y -hide_banner -loglevel error \
  -ss "$TRIM_START" -to "$TRIM_END" -i "$VO_IN" \
  -af "loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=in:st=0:d=0.06" \
  -ac 2 -ar 48000 -c:a aac -b:a 192k assets/vo/vo-trimmed.m4a
ffprobe -v error -show_entries format=duration -of csv=p=0 assets/vo/vo-trimmed.m4a

# norm <name> <9:16 filter> <1:1 filter>
norm() {
  local name=$1 v916=$2 v11=$3
  echo "▶ $name"
  ffmpeg -nostdin -y -hide_banner -loglevel error -i "assets/broll/${name}-src.mp4" \
    -vf "$v916,setsar=1" -an -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    "assets/broll/9x16/${name}.mp4"
  ffmpeg -nostdin -y -hide_banner -loglevel error -i "assets/broll/${name}-src.mp4" \
    -vf "$v11,setsar=1" -an -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    "assets/broll/1x1/${name}.mp4"
}
mkdir -p assets/broll/9x16 assets/broll/1x1

# The five transposed clips are already 2160x3840, so 9:16 is a pure scale.
# For 1:1 the crop window is biased DOWN per clip: these were shot with the
# subject low in the vertical frame, so a plain centre crop decapitates them.
# Offsets picked by eye off the frame sweep (420 = centre, larger = lower).
#   walking / excited  -> 420  (faces sit high; lower crops cut them)
#   storefront / suppliers / shelf -> 620  (subject sits low)
VERT_916="scale=1080:1920"
vert11() { echo "scale=1080:-2,crop=1080:1080:0:$1"; }

# The three exterior/shopfront clips are shot into shade and sit ~75-81 mean luma
# vs ~138-148 for the interior ones. Under a navy scrim they crush to near-black,
# so lift them before the scrim ever touches them.
LIFT="eq=brightness=0.07:contrast=1.08:saturation=1.06,"

norm walking    "$VERT_916"        "$(vert11 420)"
norm excited    "$VERT_916"        "$(vert11 420)"
norm storefront "$LIFT$VERT_916"   "$LIFT$(vert11 620)"
norm suppliers  "$LIFT$VERT_916"   "$LIFT$(vert11 620)"
norm shelf      "$LIFT$VERT_916"   "$LIFT$(vert11 620)"

norm product    "$VERT_916"        "$(vert11 420)"

# ---- A-roll: crop the 1920x1080 talking head to each delivery ratio ----------
# Trimmed to the SAME 3.50-40.35 window as the VO, so lip sync is exact, and
# MUTED — the mix takes its audio from the separate <audio> element.
# Sean sits slightly left of centre: the subject centres on x=922 of 1920, so
# 9:16 crops 608 wide from x=618 and 1:1 crops 1080 wide from x=382. Framing
# was checked across the whole clip; a fixed window holds throughout.
echo "▶ A-roll 9:16"
ffmpeg -nostdin -y -hide_banner -loglevel error \
  -ss "$TRIM_START" -to "$TRIM_END" -i assets/aroll-src.mp4 \
  -an -vf "crop=608:1080:618:0,scale=1080:1920:flags=lanczos,setsar=1" \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p assets/broll/9x16/aroll.mp4
echo "▶ A-roll 1:1"
ffmpeg -nostdin -y -hide_banner -loglevel error \
  -ss "$TRIM_START" -to "$TRIM_END" -i assets/aroll-src.mp4 \
  -an -vf "crop=1080:1080:382:0,setsar=1" \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p assets/broll/1x1/aroll.mp4

echo "✅ prepped"
for d in 9x16 1x1; do
  echo "--- $d ---"
  for f in assets/broll/$d/*.mp4; do
    printf '%-34s %s\n' "$f" "$(ffprobe -v error -select_streams v:0 \
      -show_entries stream=width,height -show_entries format=duration -of csv=p=0 "$f" | paste -sd' ')"
  done
done
