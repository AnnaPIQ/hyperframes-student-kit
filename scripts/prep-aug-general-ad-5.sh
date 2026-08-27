#!/usr/bin/env bash
# =============================================================================
# prep-aug-general-ad-5.sh — normalise the "whats working" A-roll into the two
# delivery framings for the Aug-General ad 5 composition.
#
#   bash scripts/prep-aug-general-ad-5.sh <source.mp4|mov>
#
# The source is a single continuous 3840x2160 ProRes 422 10-bit @25fps take.
# Every output below is a PURE CROP of that master — no scaling anywhere — so
# the delivery resolution is decided by the renderer, not baked in.
# Silence analysis
# (ffmpeg silencedetect, -34dB/0.28s) puts speech at 1.892s -> 38.087s, so we
# trim 1.75s off the head (keeping a breath) and hold 1.16s past the last word.
#
# Outputs into video-projects/my-meta-ad/assets/:
#   aug5-aroll-9x16.mp4   1080x1920  muted   full-bleed vertical crop
#   aug5-aroll-1x1.mp4    1080x1080  muted   square crop, native pixels
#   aug5-vo.m4a           stereo AAC         the voice track for the mixer
#
# Crop windows are centred on the speaker, who sits at x ~= 48.8% of frame:
#   9:16  1216x2160 @ x=1266   (1216px is ALL the horizontal detail a 9:16
#                              window of a 16:9 frame can contain)
#   1:1   2160x2160 @ x=794    full-height square, true 4K
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

SRC="${1:?usage: prep-aug-general-ad-5.sh <source video>}"
DEST="video-projects/my-meta-ad/assets"
IN=1.75          # trim point: 0.14s of pre-breath before speech at 1.892
DUR=37.5         # 1125 frames @30fps; last word lands at 36.34, 1.16s ring-out

[ -f "$SRC" ] || { echo "source not found: $SRC" >&2; exit 1; }
mkdir -p "$DEST"

echo "▶ 9:16  crop 1216x2160 @1266 out of the 4K master (pure crop, no resample)"
ffmpeg -nostdin -y -v error -ss "$IN" -t "$DUR" -i "$SRC" \
  -an -vf "crop=1216:2160:1266:0,format=yuv420p" \
  -r 30 -c:v libx264 -preset slow -crf 16 -movflags +faststart \
  "$DEST/aug5-aroll-9x16.mp4"

echo "▶ 1:1   crop 2160x2160 @794 out of the 4K master (pure crop, no resample)"
ffmpeg -nostdin -y -v error -ss "$IN" -t "$DUR" -i "$SRC" \
  -an -vf "crop=2160:2160:794:0,format=yuv420p" \
  -r 30 -c:v libx264 -preset slow -crf 16 -movflags +faststart \
  "$DEST/aug5-aroll-1x1.mp4"

echo "▶ VO    stereo AAC (from the master's 24-bit PCM)"
ffmpeg -nostdin -y -v error -ss "$IN" -t "$DUR" -i "$SRC" \
  -vn -c:a aac -b:a 192k -movflags +faststart \
  "$DEST/aug5-vo.m4a"

echo
for f in aug5-aroll-9x16.mp4 aug5-aroll-1x1.mp4 aug5-vo.m4a; do
  printf '  %-22s %s\n' "$f" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$DEST/$f")s  $(du -h "$DEST/$f" | cut -f1)"
done

# -----------------------------------------------------------------------------
# B-roll — two real portfolio brands, shown while the VO says "already working
# right now across dozens of real brands / nothing we coach is theory".
#
# Both sources are phone footage stored landscape with no rotation metadata, so
# they need an explicit 90° clockwise rotate (transpose=1). After the rotate a
# 3840x2160 master is exactly 2160x3840 — native fit for the 9:16, and the 1:1
# takes a 2160x2160 window pulled up from centre to keep faces and product in.
# Audio is stripped: the A-roll VO keeps running underneath.
# -----------------------------------------------------------------------------
prep_broll() {   # <src> <in> <dur> <slug> <square-y>
  local src="$1" tin="$2" tdur="$3" slug="$4" sqy="$5"
  [ -f "$src" ] || { echo "  ! b-roll source missing: $src (skipping $slug)"; return 0; }
  echo "▶ b-roll $slug  9:16 + 1:1  (rotate 90° CW, from ${tin}s +${tdur}s)"
  ffmpeg -nostdin -y -v error -ss "$tin" -t "$tdur" -i "$src" \
    -an -vf "transpose=1,format=yuv420p" -r 30 \
    -c:v libx264 -preset slow -crf 16 -movflags +faststart \
    "$DEST/aug5-broll-${slug}-9x16.mp4"
  ffmpeg -nostdin -y -v error -ss "$tin" -t "$tdur" -i "$src" \
    -an -vf "transpose=1,crop=2160:2160:0:${sqy},format=yuv420p" -r 30 \
    -c:v libx264 -preset slow -crf 16 -movflags +faststart \
    "$DEST/aug5-broll-${slug}-1x1.mp4"
}

BROLL_DIR="${BROLL_DIR:-.media}"
prep_broll "$BROLL_DIR/broll-sweetes-master.mp4" 88.5 2.05 sweetes 580
prep_broll "$BROLL_DIR/broll-dryft-master.mp4"   21.2 1.85 dryft   500

for f in "$DEST"/aug5-broll-*.mp4; do
  [ -e "$f" ] || continue
  printf '  %-30s %s\n' "$(basename "$f")" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")s  $(du -h "$f" | cut -f1)"
done
