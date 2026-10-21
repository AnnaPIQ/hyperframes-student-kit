#!/usr/bin/env bash
# Rebuild the full-quality media used by index.html (9:16) and index-4x5.html (4:5)
# from the original sources. Output: assets/master/ (gitignored: too large for GitHub).
#
#   AROLL=/path/Untitled\ 2.mov LAPTOP=/path/A_0004C078A260304_1210090O_CANON.MP4 \
#   FOUNDERS=/path/A_0004C058A260304_115940HD_CANON.MP4 SHOPTALK=/path/shoptalk-rebuy.mp4 \
#   bash scripts/prep-masters.sh
#
# Near-lossless intermediates (x264 CRF 10, 4:2:0 high profile) so the final render is
# the only meaningful encode. A-roll keeps its native 25fps.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=assets/master; mkdir -p "$OUT"
X264=(-c:v libx264 -preset slow -crf 10 -pix_fmt yuv420p -profile:v high -movflags +faststart -an)

# A-roll: source 0:00.40-0:57.10, Sean centred at x≈1960 of 3840
ffmpeg -v error -y -ss 0.40 -t 56.70 -i "$AROLL" -vf "crop=1216:2160:1352:0" -r 25 "${X264[@]}" "$OUT/aroll-916.mp4"
ffmpeg -v error -y -ss 0.40 -t 56.70 -i "$AROLL" -vf "crop=1728:2160:1096:0" -r 25 "${X264[@]}" "$OUT/aroll-4x5.mp4"
# Dialogue: PCM master (no lossy pre-encode), loudness-normalised
ffmpeg -v error -y -ss 0.40 -t 56.70 -i "$AROLL" -vn -af "highpass=f=80,loudnorm=I=-14:TP=-1.5:LRA=9" \
  -ar 48000 -c:a pcm_s24le "$OUT/dialogue.wav"

# B-roll (4K Canon clips shot vertical, stored landscape: rotate 90° CW)
ffmpeg -v error -y -i "$LAPTOP"   -ss 3.20 -t 3.20 -vf "transpose=1,scale=1080:1920:flags=lanczos" -r 30 "${X264[@]}" "$OUT/broll-strategist-laptop.mp4"
ffmpeg -v error -y -i "$FOUNDERS" -ss 4.00 -t 2.95 -vf "transpose=1,scale=1080:1920:flags=lanczos" -r 30 "${X264[@]}" "$OUT/broll-founders-conversation.mp4"
# Shoptalk talk (1080p landscape): 4:04.50 front-on, 9:16 crop on Sean (upscaled, inherently softer)
ffmpeg -v error -y -ss 240 -i "$SHOPTALK" -ss 4.50 -t 2.28 -vf "crop=608:1080:790:0,scale=1080:1920:flags=lanczos,unsharp=5:5:0.5" -r 30 "${X264[@]}" "$OUT/broll-shoptalk-stage.mp4"
echo "masters ready in $OUT"
