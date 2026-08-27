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

# 0.10 / 0.45  overlays mid-fade, then fully up
# 2.0 … 69.5   montage shots across the full retime
# 71.05 …      dissolve start, mid, card up, settled
# 76.30        last frame of the card hold
TIMES=(0.10 0.45 2.00 5.50 9.00 13.00 18.00 24.00 30.00 37.70 41.50 48.00 \
       55.00 60.50 65.00 69.50 71.05 71.25 71.40 71.55 73.00 76.30)

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
build_strip "$OUT/strip-a.png" "${TIMES[@]:0:11}"
build_strip "$OUT/strip-b.png" "${TIMES[@]:11:11}"
echo "wrote $OUT/strip-a.png + strip-b.png"
