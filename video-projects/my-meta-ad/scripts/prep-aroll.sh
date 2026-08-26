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
# Both targets are CROPS of a landscape 16:9 source, centre-punched on the
# speaker at ~47% of frame width. Approved by Anna 2026-08-26.
#
# 2026-08-26 (rev 2) — pulled back ~25% so more of Sean is in frame. A full-bleed
# 9:16 crop already used the source's full 2160 height, so that was the widest
# possible FOV at full bleed; going wider means the clip no longer fills the
# canvas. The compositions top-align it and fill the strip below with brand navy,
# which also gives captions their own band instead of sitting on his chest.
#   9:16  crop 1512x2160 @ x=1049 -> 1080x1542  (navy strip y 1542-1920)
#   1:1   crop 2500x2160 @ x=385  -> 1080x932   (navy strip y  932-1080)
# The 1:1 crop is NOT centred on the speaker: the unlit doorway at the right of
# the set starts around x=2885, so the window is pushed left to keep its right
# edge clear of it. That puts Sean ~57% across, which suits the left-aligned
# graphics band anyway.
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

echo "→ 9:16  1080x1542  (crop 1512x2160 @ x=1049)"
ffmpeg -y -hide_banner -loglevel error -stats \
  -ss "$SS" -i "$SRC" -t "$DUR" \
  -vf "crop=1512:2160:1049:0,scale=1080:1542:flags=lanczos" \
  -c:v libx264 -preset medium -crf "$CRF" -pix_fmt yuv420p \
  -vsync cfr -r 30 -movflags +faststart -an \
  "$OUT/aroll-vertical.mp4"

echo "→ 1:1   1080x932   (crop 2500x2160 @ x=385)"
ffmpeg -y -hide_banner -loglevel error -stats \
  -ss "$SS" -i "$SRC" -t "$DUR" \
  -vf "crop=2500:2160:385:0,scale=1080:932:flags=lanczos" \
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
