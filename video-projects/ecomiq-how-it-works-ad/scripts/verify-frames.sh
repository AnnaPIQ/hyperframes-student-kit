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

# Coverage: overlay fade-in, all three native-speed montage windows, every beat
# head and staged reveal across beats A/B/C/00/01/02/03, both montage<->graphics
# cuts, both lower-thirds, the single dissolve, and the card hold.
TIMES=(0.10 0.45 3.00 6.00 7.20 8.80 9.90 11.00 \
       12.00 14.00 15.60 17.20 19.00 21.50 23.50 25.30 \
       26.40 27.50 30.00 31.60 33.30 37.70 40.10 42.00 \
       43.40 46.80 48.80 50.30 52.60 54.20 55.60 58.00 \
       60.90 63.00 67.00 70.00 71.25 71.45 73.00 76.30)

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
