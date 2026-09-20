#!/usr/bin/env bash
# =============================================================================
# fetch-sources.sh — pull the three source masters from Drive into assets/src/.
#
#   bash scripts/fetch-sources.sh
#
# assets/src/ is gitignored: the masters total ~89 MB and are re-fetchable, so
# the repo carries the cut beds (the actual composition inputs) instead. Run
# this before scripts/build-bed.sh on a fresh clone.
#
# The files are Drive links shared with the team. If a download returns HTML
# instead of media, the share permission has changed — open the viewUrl and
# re-share, don't work around it.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
mkdir -p assets/src

fetch() { # <file-id> <dest> <label>
  if [ -s "$2" ]; then echo "  · $3 already present — skipping"; return; fi
  echo "▶ $3"
  curl -fsSL -o "$2" "https://drive.google.com/uc?export=download&id=$1"
  file "$2" | grep -qiE 'ISO Media|IFF data' \
    || { echo "✗ $3 came back as $(file -b "$2") — check Drive sharing" >&2; rm -f "$2"; exit 1; }
  echo "  ✓ $2"
}

# Showcase Reel.mp4   — montage, 9:16 master
fetch 1SsgE0TJCjKo2YwvpSOA8-MtFcpHWNWwl assets/src/montage-916.mp4 "montage 9:16"
# Showcase ad-1-1.mp4 — montage, 1:1 master (same edit, reframed)
fetch 1CJF1ekLpcx84iwlwXUv3weo6tuOMQ3zk assets/src/montage-sq.mp4  "montage 1:1"
# CRO2.aifc           — Sean's VO
fetch 1Pnidttyetjgw6XFtaMaynuXEMrbrfhB9 assets/src/sean-vo.aifc    "Sean VO"

# VO -> the composition's audio asset: normalised to the social delivery
# standard (-16 LUFS / -1.5 dBTP) and rewritten as WAV, which Chrome decodes
# without the priming offset an AAC/AIFF source can introduce at render time.
echo "▶ sean-vo.wav (loudnorm -16 LUFS)"
ffmpeg -y -v error -i assets/src/sean-vo.aifc \
  -af "loudnorm=I=-16:TP=-1.5:LRA=11" -ac 1 -ar 48000 -c:a pcm_s16le assets/sean-vo.wav
cp assets/sean-vo.wav ../ecomiq-cro-short-45/assets/sean-vo.wav
echo "  ✓ assets/sean-vo.wav (copied to the 4:5 project too)"
