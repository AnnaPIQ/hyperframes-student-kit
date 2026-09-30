#!/usr/bin/env bash
# package-delivery.sh - turn the two standard renders into shareable deliverables.
#
#   bash scripts/package-delivery.sh
#
# The standard renders are visually lossless and ~90MB / ~65MB, which is more
# than anyone wants to move around, and over the 30 MiB ceiling most chat and
# upload paths impose. These copies are two-pass H.264 High + AAC 128k with
# faststart (so they stream rather than needing a full download before
# playback), rate-targeted to land under 28 MiB.
#
# Two-pass rather than CRF because the ceiling is a SIZE, and CRF gives you a
# quality target with a size you find out afterwards - CRF 20 came out at 52MB
# and 38MB. At 1080p/30 this bitrate is still above what Meta and TikTok
# re-encode to on ingest.
#
# Both land in THIS project's renders/ - including the 4:5 - so they sit in one
# folder to hand over.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="renders"

TARGET_MIB=28

pack () {  # pack <source> <destination>
  local dur vbr log
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$1")
  # (budget bits - audio bits) / seconds, in kbps.
  vbr=$(python3 -c "print(int((${TARGET_MIB}*8*1024*1024/${dur} - 128000)/1000))")
  log="$(mktemp -d)/pass"
  ffmpeg -y -v error -i "$1" -c:v libx264 -profile:v high -preset slow \
    -b:v "${vbr}k" -pass 1 -passlogfile "$log" -an -f null /dev/null
  ffmpeg -y -v error -i "$1" -c:v libx264 -profile:v high -preset slow \
    -b:v "${vbr}k" -pass 2 -passlogfile "$log" -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart "$2"
  printf '%-46s %6.1f MiB  (%s kbps video)\n' "$2" \
    "$(python3 -c "import os;print(os.path.getsize('$2')/1048576)")" "$vbr"
}

pack renders/ecomiq-audit-call-916.mp4 "$OUT/EcomIQ-Audit-Call_9x16_1080x1920.mp4"
pack ../ecomiq-audit-call-45/renders/ecomiq-audit-call-45.mp4 \
     "$OUT/EcomIQ-Audit-Call_4x5_1080x1350.mp4"

for f in "$OUT"/EcomIQ-Audit-Call_*.mp4; do
  ffprobe -v error -select_streams v:0 -show_entries stream=width,height,codec_name,r_frame_rate \
    -show_entries format=duration -of default=nw=1 "$f" | tr '\n' ' '
  echo "<- $(basename "$f")"
done
