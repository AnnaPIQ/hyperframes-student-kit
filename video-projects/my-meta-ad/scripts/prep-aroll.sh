#!/usr/bin/env bash
# Normalize the "What We Do Version 1" A-roll into render-ready 9:16 + 1:1 clips
# for the aug-general-ad-4 compositions, plus a separate VO track.
#
#   Source : "What We Do Version 1.mov" — Google Drive fileId
#            1CNt_w6M6g4jFMKpq0XIwe1DfjJ7CcIv9 (2.05 GB)
#            3840x2160 ProRes, 25fps, 37.20s, PCM 24-bit 48k stereo
#            NB: the anonymous download path can return a 2 KB "Quota exceeded"
#            HTML page instead of the file — see docs/LESSONS.md for the
#            copy_file + confirm-token workaround.
#   Speech : 3.717s -> 34.172s (silencedetect, noise=-34dB:d=0.30)
#   Trim   : start 3.45s, duration 31.10s (0.27s handle before speech)
#
# Both targets are CROPS, not scale+pad: the source is landscape 16:9, so padding
# into 9:16 would leave a letterboxed strip. Centre-punch is on the speaker at
# ~47% of frame width. Approved by Anna 2026-08-26.
#
# Usage: bash scripts/prep-aroll.sh [path-to-source.mov]
set -euo pipefail

SRC="${1:-../../assets/incoming/aroll-raw.mov}"
OUT="assets"
SS=3.45
DUR=31.10
CRF=20

[ -f "$SRC" ] || { echo "source not found: $SRC" >&2; exit 1; }
mkdir -p "$OUT"

echo "→ 9:16  1080x1920  (crop 1215x2160 @ x=1198)"
ffmpeg -y -hide_banner -loglevel error -stats \
  -ss "$SS" -i "$SRC" -t "$DUR" \
  -vf "crop=1215:2160:1198:0,scale=1080:1920:flags=lanczos" \
  -c:v libx264 -preset medium -crf "$CRF" -pix_fmt yuv420p \
  -vsync cfr -r 30 -movflags +faststart -an \
  "$OUT/aroll-vertical.mp4"

echo "→ 1:1   1080x1080  (crop 2160x2160 @ x=725)"
ffmpeg -y -hide_banner -loglevel error -stats \
  -ss "$SS" -i "$SRC" -t "$DUR" \
  -vf "crop=2160:2160:725:0,scale=1080:1080:flags=lanczos" \
  -c:v libx264 -preset medium -crf "$CRF" -pix_fmt yuv420p \
  -vsync cfr -r 30 -movflags +faststart -an \
  "$OUT/aroll-square.mp4"

echo "→ VO    AAC 192k stereo (sibling <audio>, per render contract rule 5)"
ffmpeg -y -hide_banner -loglevel error -stats \
  -ss "$SS" -i "$SRC" -t "$DUR" \
  -vn -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart \
  "$OUT/aroll-vo.m4a"

echo "done:"
for f in "$OUT/aroll-vertical.mp4" "$OUT/aroll-square.mp4" "$OUT/aroll-vo.m4a"; do
  printf '  %-28s %s\n' "$(basename "$f")" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")s"
done
