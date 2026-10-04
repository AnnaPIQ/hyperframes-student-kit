#!/usr/bin/env bash
# Render both deliverables: 9:16 and 4:5.  Usage: bash scripts/render-all.sh [draft|standard]
# Builds index.html per format, lints, renders, faststarts, then restores the 9:16 default.
set -euo pipefail
cd "$(dirname "$0")/.."
Q="${1:-standard}"
trap 'node scripts/build.mjs 9x16 >/dev/null' EXIT
for fmt in 9x16 4x5; do
  node scripts/build.mjs "$fmt"
  npx hyperframes lint
  out="renders/ecomiq-sean-vo-ad-${fmt}-${Q}.mp4"
  npx hyperframes render --quality "$Q" --output "$out.tmp.mp4"
  # guarantee H.264/AAC + faststart (moov atom up front)
  ffmpeg -v error -y -i "$out.tmp.mp4" -c copy -movflags +faststart "$out" && rm "$out.tmp.mp4"
  ffprobe -v error -show_entries format=duration:stream=codec_name,width,height -of compact "$out"
done
