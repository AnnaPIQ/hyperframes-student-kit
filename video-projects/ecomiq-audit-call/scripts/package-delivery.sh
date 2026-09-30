#!/usr/bin/env bash
# package-delivery.sh - turn the two standard renders into shareable deliverables.
#
#   bash scripts/package-delivery.sh
#
# The standard renders are visually lossless and ~90MB / ~65MB, which is more
# than anyone wants to move around. These copies are CRF 20 H.264 High + AAC
# 192k with faststart (so they stream rather than needing a full download before
# playback), which is well above what Meta and TikTok re-encode to anyway.
#
# Both land in THIS project's renders/ - including the 4:5 - so they sit in one
# folder to hand over.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="renders"

pack () {  # pack <source> <destination>
  ffmpeg -y -v error -i "$1" \
    -c:v libx264 -profile:v high -crf 20 -preset slow -pix_fmt yuv420p \
    -c:a aac -b:a 192k -movflags +faststart "$2"
  printf '%-46s %6.1f MB\n' "$2" "$(du -m "$2" | cut -f1)"
}

pack renders/ecomiq-audit-call-916.mp4 "$OUT/EcomIQ-Audit-Call_9x16_1080x1920.mp4"
pack ../ecomiq-audit-call-45/renders/ecomiq-audit-call-45.mp4 \
     "$OUT/EcomIQ-Audit-Call_4x5_1080x1350.mp4"

for f in "$OUT"/EcomIQ-Audit-Call_*.mp4; do
  ffprobe -v error -select_streams v:0 -show_entries stream=width,height,codec_name,r_frame_rate \
    -show_entries format=duration -of default=nw=1 "$f" | tr '\n' ' '
  echo "<- $(basename "$f")"
done
