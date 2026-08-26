#!/usr/bin/env bash
# =============================================================================
# prep-aug-general-ad-5.sh — normalise the "whats working" A-roll into the two
# delivery framings for the Aug-General ad 5 composition.
#
#   bash scripts/prep-aug-general-ad-5.sh <source.mp4|mov>
#
# The source is a single continuous 1920x1080 @25fps take. Silence analysis
# (ffmpeg silencedetect, -34dB/0.28s) puts speech at 1.892s -> 38.087s, so we
# trim 1.75s off the head (keeping a breath) and hold 1.16s past the last word.
#
# Outputs into video-projects/my-meta-ad/assets/:
#   aug5-aroll-9x16.mp4   1080x1920  muted   full-bleed vertical crop
#   aug5-aroll-1x1.mp4    1080x1080  muted   square crop, native pixels
#   aug5-vo.m4a           stereo AAC         the voice track for the mixer
#
# Crop windows are centred on the speaker, who sits at x ~= 48.8% of frame:
#   9:16  608x1080 @ x=632  -> upscaled 1.78x to 1080x1920 (lanczos + unsharp)
#   1:1  1080x1080 @ x=396  -> native pixels, no resample
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

SRC="${1:?usage: prep-aug-general-ad-5.sh <source video>}"
DEST="video-projects/my-meta-ad/assets"
IN=1.75          # trim point: 0.14s of pre-breath before speech at 1.892
DUR=37.5         # 1125 frames @30fps; last word lands at 36.34, 1.16s ring-out

[ -f "$SRC" ] || { echo "source not found: $SRC" >&2; exit 1; }
mkdir -p "$DEST"

echo "▶ 9:16  1080x1920 (crop 608x1080 @632, lanczos + unsharp)"
ffmpeg -nostdin -y -v error -ss "$IN" -t "$DUR" -i "$SRC" \
  -an -vf "crop=608:1080:632:0,scale=1080:1920:flags=lanczos,unsharp=5:5:0.55:5:5:0.0,format=yuv420p" \
  -r 30 -c:v libx264 -preset slow -crf 17 -movflags +faststart \
  "$DEST/aug5-aroll-9x16.mp4"

echo "▶ 1:1   1080x1080 (crop 1080x1080 @396, native pixels)"
ffmpeg -nostdin -y -v error -ss "$IN" -t "$DUR" -i "$SRC" \
  -an -vf "crop=1080:1080:396:0,format=yuv420p" \
  -r 30 -c:v libx264 -preset slow -crf 17 -movflags +faststart \
  "$DEST/aug5-aroll-1x1.mp4"

echo "▶ VO    stereo AAC"
ffmpeg -nostdin -y -v error -ss "$IN" -t "$DUR" -i "$SRC" \
  -vn -c:a aac -b:a 192k -movflags +faststart \
  "$DEST/aug5-vo.m4a"

echo
for f in aug5-aroll-9x16.mp4 aug5-aroll-1x1.mp4 aug5-vo.m4a; do
  printf '  %-22s %s\n' "$f" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$DEST/$f")s  $(du -h "$DEST/$f" | cut -f1)"
done
