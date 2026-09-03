#!/usr/bin/env bash
# =============================================================================
# gen-square.sh — derive the 1:1 cut from the 9:16 cut.
#
# Both cuts share identical markup, identical timeline JS and one stylesheet
# (assets/ad.css); everything that differs between them is a CSS custom
# property under body.r-916 / body.r-1x1. So the square cut is a mechanical
# transform of index.html, not a second file to maintain.
#
# Edit index.html, then run this. Never hand-edit compositions/square.html.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
PROJ="video-projects/ecomiq-bf-workbook"
SRC="$PROJ/index.html"
DEST="$PROJ/compositions/square.html"

[ -f "$SRC" ] || { echo "missing $SRC" >&2; exit 1; }
mkdir -p "$(dirname "$DEST")"

sed \
  -e 's|<meta name="viewport" content="width=1080, height=1920" />|<meta name="viewport" content="width=1080, height=1080" />|' \
  -e 's|workbook (9:16)|workbook (1:1)|' \
  -e 's|<body class="r-916">|<body class="r-1x1">|' \
  -e 's|data-composition-id="ecomiq-bf-workbook"|data-composition-id="ecomiq-bf-workbook-square"|' \
  -e 's|data-height="1920"|data-height="1080"|' \
  -e 's|assets/aroll-916-wide.mp4|assets/aroll-1x1-wide.mp4|' \
  -e 's|window.__timelines\["ecomiq-bf-workbook"\]|window.__timelines["ecomiq-bf-workbook-square"]|' \
  "$SRC" > "$DEST"

# Track indices shift into a distinct range so static lint never reads the two
# cuts as one timeline with overlapping tracks / duplicate audio.
python3 - "$DEST" <<'PY'
import re, sys
p = sys.argv[1]
s = open(p).read()
s = re.sub(r'data-track-index="(\d+)"',
           lambda m: 'data-track-index="%d"' % (int(m.group(1)) + 20), s)
s = s.replace(
    "         compositions/square.html is GENERATED from this file — run\n"
    "         scripts/gen-square.sh after editing, never hand-edit the square cut.",
    "         GENERATED FILE — do not edit. Produced from ../index.html by\n"
    "         scripts/gen-square.sh. Edit index.html and re-run that script.")
open(p, 'w').write(s)
PY

echo "✓ $DEST regenerated from $SRC"
