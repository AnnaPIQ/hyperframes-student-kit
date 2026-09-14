#!/usr/bin/env bash
# =============================================================================
# gen-ratio.sh — derive a secondary aspect-ratio cut from the 9:16 master.
#
#   bash scripts/gen-ratio.sh 45     # 4:5  Meta feed  -> compositions/feed-45.html
#   bash scripts/gen-ratio.sh 1x1    # 1:1  square     -> compositions/square.html
#
# Every cut shares one stylesheet (assets/ad.css) and identical markup and
# timeline JS; everything that differs between ratios is a CSS custom property
# under body.r-916 / body.r-45 / body.r-1x1. So a secondary cut is a mechanical
# transform of index.html, not another file to maintain by hand.
#
# Edit index.html, then re-run this for each ratio you ship.
# NEVER hand-edit the generated files.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
PROJ="video-projects/ecomiq-bf-workbook"
SRC="$PROJ/index.html"

RATIO="${1:-}"
case "$RATIO" in
  45)  HEIGHT=1350; CLASS="r-45";  SUFFIX="square";  OUT="compositions/feed-45.html"
       AROLL="assets/aroll-45.mp4";  LABEL="4:5";  COMPID="ecomiq-bf-workbook-45" ;;
  1x1) HEIGHT=1080; CLASS="r-1x1"; SUFFIX="square"; OUT="compositions/square.html"
       AROLL="assets/aroll-1x1.mp4"; LABEL="1:1";  COMPID="ecomiq-bf-workbook-square" ;;
  *)   echo "usage: gen-ratio.sh 45|1x1" >&2; exit 1 ;;
esac

DEST="$PROJ/$OUT"
[ -f "$SRC" ] || { echo "missing $SRC" >&2; exit 1; }
[ -f "$PROJ/$AROLL" ] || echo "warning: $PROJ/$AROLL not found — run scripts/prep-bf-assets.sh" >&2
mkdir -p "$(dirname "$DEST")"

sed \
  -e "s|<meta name=\"viewport\" content=\"width=1080, height=1920\" />|<meta name=\"viewport\" content=\"width=1080, height=${HEIGHT}\" />|" \
  -e "s|workbook (9:16)|workbook (${LABEL})|" \
  -e "s|<body class=\"r-916\">|<body class=\"${CLASS}\">|" \
  -e "s|data-composition-id=\"ecomiq-bf-workbook\"|data-composition-id=\"${COMPID}\"|" \
  -e "s|data-height=\"1920\"|data-height=\"${HEIGHT}\"|" \
  -e "s|assets/aroll-916.mp4|${AROLL}|" \
  -e "s|window.__timelines\[\"ecomiq-bf-workbook\"\]|window.__timelines[\"${COMPID}\"]|" \
  "$SRC" > "$DEST"

# Track indices shift into a distinct range so static lint never reads two cuts
# as one timeline with overlapping tracks / duplicate audio.
python3 - "$DEST" "$RATIO" <<'PY'
import re, sys
p, ratio = sys.argv[1], sys.argv[2]
offset = 20 if ratio == '45' else 40
s = open(p).read()
s = re.sub(r'data-track-index="(\d+)"',
           lambda m: 'data-track-index="%d"' % (int(m.group(1)) + offset), s)
s = s.replace(
    "         compositions/square.html is GENERATED from this file — run\n"
    "         scripts/gen-square.sh after editing, never hand-edit the square cut.",
    "         GENERATED FILE — do not edit. Produced from ../index.html by\n"
    "         scripts/gen-ratio.sh. Edit index.html and re-run that script.")
s = s.replace(
    "         Secondary ratio cuts are GENERATED from this file — run\n"
    "         scripts/gen-ratio.sh <ratio> after editing, never hand-edit them.",
    "         GENERATED FILE — do not edit. Produced from ../index.html by\n"
    "         scripts/gen-ratio.sh. Edit index.html and re-run that script.")
open(p, 'w').write(s)
PY

echo "✓ $DEST regenerated from $SRC  (${LABEL}, 1080x${HEIGHT})"
