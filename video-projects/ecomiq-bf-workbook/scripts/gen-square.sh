#!/usr/bin/env bash
# =============================================================================
# gen-square.sh - regenerate square.html (1:1) from index.html (9:16).
#
#   bash scripts/gen-square.sh      # run from the project folder
#
# index.html is the single source of truth for the edit: structure, copy, clip
# timings, the GSAP timeline and track indices. Only the frame size, the body
# ratio class, the composition id and the A-roll source differ between the two
# deliverables,
# and every layout difference lives in the body.r-916 / body.r-1x1 blocks of
# assets/ad.css. So the 1:1 cut is generated, never hand-maintained, and the
# two ratios cannot drift out of sync.
#
# Asset paths stay ROOT-relative ("assets/..."): compositions are served with
# the project root as their base URL, so "../assets/..." would 404 in Studio.
#
# Edit index.html, run this, then lint and render both.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=index.html
OUT=compositions/square.html

[ -f "$SRC" ] || { echo "gen-square: $SRC not found (run from the project folder)" >&2; exit 1; }

sed \
  -e 's|<meta name="viewport" content="width=1080, height=1920" />|<meta name="viewport" content="width=1080, height=1080" />|' \
  -e 's|<title>.*(9:16)</title>|<title>EcomIQ, Black Friday workbook (1:1)</title>|' \
  -e 's|<body class="r-916">|<body class="r-1x1">|' \
  -e 's|data-composition-id="ecomiq-bf-workbook"|data-composition-id="ecomiq-bf-workbook-1x1"|' \
  -e 's|data-height="1920"|data-height="1080"|' \
  -e 's|assets/aroll-916.mp4|assets/aroll-1x1.mp4|' \
  "$SRC" > "$OUT.tmp"

mkdir -p compositions

# Stamp the generated banner in so nobody hand-edits the 1:1 cut.
awk 'NR==1{print; print "<!-- GENERATED FILE - do not edit. Source: index.html - regenerate with: bash scripts/gen-square.sh -->"; next} {print}' \
  "$OUT.tmp" > "$OUT"
rm -f "$OUT.tmp"

# Fail loudly if any transform did not apply.
for needle in 'r-1x1' 'ecomiq-bf-workbook-1x1' 'data-height="1080"' 'aroll-1x1.mp4' 'content="width=1080, height=1080"' '(1:1)</title>'; do
  grep -q "$needle" "$OUT" || { echo "gen-square: transform failed, '$needle' missing from $OUT" >&2; exit 1; }
done
grep -q 'aroll-916\|r-916\|data-height="1920"' "$OUT" && {
  echo "gen-square: 9:16 leftovers found in $OUT" >&2; exit 1; }

echo "gen-square: wrote $OUT (1080x1080) from $SRC"
