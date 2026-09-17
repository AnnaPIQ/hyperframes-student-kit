#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# bake.sh — render all three deliverables at --quality standard.
#
#   bash scripts/bake.sh
#
# Gates first (lint + the static layout assertions on both ratios), then renders
# 9:16, 4:5 padded and 4:5 cropped in that order. Copies each result to the
# project root as final-*.mp4, because renders/ is gitignored workspace-wide.
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
Q="${1:-standard}"

echo "▶ gates"
npx hyperframes lint
node scripts/verify-layout.mjs
python3 scripts/make-ratios.py >/dev/null
node scripts/verify-layout.mjs build/4x5

echo "▶ 9:16 ($Q)"
npx hyperframes render --quality "$Q" --fps 30 --output renders/sweet-es-montage-9x16.mp4

echo "▶ 4:5 padded ($Q)"
python3 scripts/make-ratios.py >/dev/null
(cd build/4x5 && npx hyperframes render --quality "$Q" --fps 30 \
  --output ../../renders/sweet-es-montage-4x5.mp4)

echo "▶ 4:5 cropped ($Q)"
python3 scripts/make-ratios.py --crop >/dev/null
(cd build/4x5 && npx hyperframes render --quality "$Q" --fps 30 \
  --output ../../renders/sweet-es-montage-4x5-crop.mp4)

# renders/ is gitignored; the committed copies live at the project root
cp renders/sweet-es-montage-9x16.mp4     final-9x16.mp4
cp renders/sweet-es-montage-4x5.mp4      final-4x5.mp4
cp renders/sweet-es-montage-4x5-crop.mp4 final-4x5-crop.mp4

echo "▶ done"
ls -la renders/sweet-es-montage-*.mp4
