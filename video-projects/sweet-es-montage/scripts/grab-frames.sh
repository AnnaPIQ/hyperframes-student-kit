#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# grab-frames.sh — pull one frame per beat out of a render, for visual checking.
#
#   bash scripts/grab-frames.sh renders/sweet-es-montage-9x16-draft.mp4 [outdir]
#
# Covers the whole timeline: each band at its hero moment, each clean-footage
# window between bands, and the end card at dissolve / line / pill / hold.
# Lint passing is not the bar — these frames are.
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
SRC="${1:?usage: grab-frames.sh <render.mp4> [outdir]}"
OUT="${2:-renders/frames}"
rm -rf "$OUT"; mkdir -p "$OUT"

#     t      what should be on screen
BEATS=(
  "0.80:b1-band-in"
  "2.50:b1-hold"
  "5.50:clean-montage"
  "8.00:fig-10000"
  "9.40:fig-20000-label"
  "13.20:roster-two-names"
  "15.90:roster-four-names"
  "18.60:claim-band"
  "21.40:clean-montage-2"
  "23.20:made-in-la"
  "25.20:clean-montage-3"
  "27.60:four-years"
  "30.60:clean-montage-4"
  "33.60:three-times-bars"
  "36.60:clean-montage-5"
  "38.35:end-card-dissolve"
  "40.20:end-card-line"
  "42.50:end-card-pill"
  "45.80:end-card-hold"
)

for b in "${BEATS[@]}"; do
  t="${b%%:*}"; name="${b#*:}"
  ffmpeg -v error -ss "$t" -i "$SRC" -frames:v 1 -q:v 2 "$OUT/t${t}-${name}.png" -y
done
echo "$(ls "$OUT" | wc -l) frames in $OUT"
