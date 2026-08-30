#!/usr/bin/env bash
# =============================================================================
# verify-frames.sh — pull frames across the WHOLE timeline of a render so they
# can actually be looked at (CLAUDE.md: Visual Verification is mandatory).
#
#   bash scripts/verify-frames.sh renders/916-draft.mp4 [outdir]
#
# Timestamps cover: the overlay fade-in, ~14 montage shots spread across the
# retime, both sides of the single dissolve, and the card hold. Also prints a
# contact strip so a whole render can be eyeballed in one image.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

SRC="${1:?usage: verify-frames.sh <render.mp4> [outdir]}"
OUT="${2:-renders/frames}"
[ -f "$SRC" ] || { echo "no such render: $SRC" >&2; exit 1; }
mkdir -p "$OUT"
rm -f "$OUT"/*.png

# Coverage: every montage window, every beat head and staged reveal, both
# montage<->graphics cuts, both lower-thirds, the dissolve and the card hold.
# 24.35 is the repaired 12 kHz burst; 30.00 / 24.40 check the white "differently"
# and "team's"; 16.20 confirms the red "biggest brands" chip is gone.
TIMES=(0.45 4.00 7.50 8.95 9.90 10.90 11.75 12.90 \
       13.60 14.20 16.20 18.50 21.50 23.20 24.40 25.60 \
       26.90 28.00 29.00 30.00 31.90 32.70 33.60 34.80 \
       36.00 38.60 41.00 42.20 44.00 45.80 47.50 49.00 \
       50.80 52.40 54.00 56.00 62.00 67.00 70.50 74.00)

for t in "${TIMES[@]}"; do
  ffmpeg -y -v error -ss "$t" -i "$SRC" -frames:v 1 -q:v 2 "$OUT/t$t.png"
done
echo "wrote ${#TIMES[@]} frames to $OUT"

# contact strips (2 rows of 11) — quick whole-timeline read
build_strip() {
  local out="$1"; shift
  local args=() ; local n=0
  for t in "$@"; do
    ffmpeg -y -v error -i "$OUT/t$t.png" -vf "scale=150:-1" "$OUT/.s$n.png"
    args+=(-i "$OUT/.s$n.png"); n=$((n+1))
  done
  ffmpeg -y -v error "${args[@]}" -filter_complex "hstack=inputs=$n" -frames:v 1 "$out"
  rm -f "$OUT"/.s*.png
}
for n in 0 1 2 3 4; do
  build_strip "$OUT/strip-$n.png" "${TIMES[@]:$((n*8)):8}"
done
echo "wrote $OUT/strip-0..4.png"
