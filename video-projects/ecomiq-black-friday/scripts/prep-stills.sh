#!/usr/bin/env bash
# =============================================================================
# prep-stills.sh — derive the composition-ready product stills.
#
#   bash scripts/prep-stills.sh
#
# The Drive product shots are studio images on a white sweep. Dropped straight
# onto the navy canvas they read as a white rectangle pasted on the frame, so:
#
#   • workbook-cover.png -> workbook-cover-float.png
#     The cover is a single navy book on a clean white background, so the
#     background floods out cleanly and the book floats on the navy canvas.
#     The baked contact shadow survives the key.
#
#   • The two suite shots are NOT keyed. Their worksheets are themselves white
#     and touch the white background, so a floodfill bleeds straight into the
#     paper and eats holes in it (verified). Those two stay as-is and the
#     composition frames them as rounded white cards instead.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

command -v convert >/dev/null || { echo "✗ ImageMagick 'convert' not found" >&2; exit 1; }

echo "▶ Keying the workbook cover…"
convert assets/workbook-cover.png \
  -fuzz 14% -fill none -floodfill +0+0 white \
  -fuzz 10% -fill none -floodfill +1121+0 white \
  -fuzz 10% -fill none -floodfill +0+1401 white \
  assets/workbook-cover-float.png

echo "✓ assets/workbook-cover-float.png  ($(identify -format '%wx%h alpha=%A' assets/workbook-cover-float.png))"
