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

# Coverage: overlay fade-in, montage A, the montage->graphics cut, every beat
# head and every staged reveal inside the graphics section, the graphics->montage
# cut, both lower-thirds, then the single dissolve and the card hold.
TIMES=(0.10 0.45 6.00 14.00 22.00 29.00 31.45 31.70 32.20 33.30 35.60 37.70 \
       40.10 41.90 43.30 45.70 47.20 48.70 50.20 52.60 54.00 54.85 55.50 \
       58.00 60.80 62.50 66.00 69.50 71.25 71.45 73.00 76.30)

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
build_strip "$OUT/strip-a.png" "${TIMES[@]:0:8}"
build_strip "$OUT/strip-b.png" "${TIMES[@]:8:8}"
build_strip "$OUT/strip-c.png" "${TIMES[@]:16:8}"
build_strip "$OUT/strip-d.png" "${TIMES[@]:24:8}"
echo "wrote $OUT/strip-{a,b,c,d}.png"
