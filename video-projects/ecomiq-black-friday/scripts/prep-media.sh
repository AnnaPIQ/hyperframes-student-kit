#!/usr/bin/env bash
# =============================================================================
# prep-media.sh — normalise the Black Friday A-roll + product stills.
#
#   bash scripts/prep-media.sh /path/to/raw-aroll.mov
#
# Source A-roll (Drive): "2c: Social Black Friday - start now V2.mov"
#   3840x2160 ProRes · 25 fps · PCM s24be · 43.08s
#
# Facts this script encodes (probed, not guessed):
#   • Speech runs 1.34s -> 40.32s in the source. Sean looks off-take from ~41s.
#   • We trim the 1.4s silent lead-in and the unusable tail:
#       TRIM_START=1.14  DURATION=39.40   (0.20s breath before the first word)
#   • 16:9 -> 9:16 / 4:5 needs a CENTRE CROP, not scale+pad. Sean is centred,
#     and cropping from 4K is resolution-safe (no upscaling in either ratio):
#       9:16  crop 1215x2160 @x=1312  -> 1080x1920
#       4:5   crop 1728x2160 @x=1056  -> 1080x1350
#   • Video is written MUTED (-an). Audio ships as a sibling track so the
#     HyperFrames mixer owns it (render contract rule 5).
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

RAW="${1:?usage: prep-media.sh <raw-aroll.mov>}"
[ -f "$RAW" ] || { echo "✗ not found: $RAW" >&2; exit 1; }

TRIM_START=1.14
DURATION=39.40
OUT=assets
mkdir -p "$OUT"

echo "▶ Normalising A-roll (single decode, three outputs)…"
ffmpeg -hide_banner -v warning -stats \
  -ss "$TRIM_START" -t "$DURATION" -i "$RAW" \
  -filter_complex "\
    [0:v]crop=1215:2160:1312:0,scale=1080:1920:flags=lanczos,fps=30,setsar=1[v916];\
    [0:v]crop=1728:2160:1056:0,scale=1080:1350:flags=lanczos,fps=30,setsar=1[v45]" \
  -map "[v916]" -an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
    -movflags +faststart -y "$OUT/aroll-916.mp4" \
  -map "[v45]"  -an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
    -movflags +faststart -y "$OUT/aroll-45.mp4" \
  -map 0:a -c:a aac -b:a 256k -ar 48000 -ac 2 -y "$OUT/aroll-audio.m4a"

echo "✓ done:"
for f in "$OUT"/aroll-916.mp4 "$OUT"/aroll-45.mp4 "$OUT"/aroll-audio.m4a; do
  printf '   %-28s %s\n' "$(basename "$f")" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")s"
done
