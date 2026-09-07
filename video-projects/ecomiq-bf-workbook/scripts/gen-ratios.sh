#!/usr/bin/env bash
# =============================================================================
# gen-ratios.sh - regenerate the derived aspect-ratio roots from index.html.
#
#   bash scripts/gen-ratios.sh      # run from the project folder
#
#   index.html                 9:16  1080x1920   (source of truth)
#   compositions/meta45.html   4:5   1080x1350   (generated)
#   compositions/square.html   1:1   1080x1080   (generated)
#
# index.html is the single source of truth for the edit: structure, copy, clip
# timings, the GSAP timeline and track indices. Only the frame size, the body
# ratio class, the composition id and the A-roll source differ between the
# deliverables, and every layout difference lives in the body.r-916 /
# body.r-45 / body.r-1x1 blocks of assets/ad.css. So the derived cuts are
# generated, never hand-maintained, and the three ratios cannot drift.
#
# Asset paths stay ROOT-relative ("assets/..."): compositions are served with
# the project root as their base URL, so "../assets/..." would 404 in Studio.
#
# Edit index.html, run this, then lint and render all three.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=index.html
[ -f "$SRC" ] || { echo "gen-ratios: $SRC not found (run from the project folder)" >&2; exit 1; }
mkdir -p compositions

# emit <out> <height> <ratio-class> <id-suffix> <aroll> <label>
emit() {
  local out="$1" h="$2" cls="$3" sfx="$4" aroll="$5" label="$6"
  sed \
    -e "s|<meta name=\"viewport\" content=\"width=1080, height=1920\" />|<meta name=\"viewport\" content=\"width=1080, height=${h}\" />|" \
    -e "s|<title>.*(9:16)</title>|<title>EcomIQ, Black Friday workbook (${label})</title>|" \
    -e "s|<body class=\"r-916\">|<body class=\"${cls}\">|" \
    -e "s|data-composition-id=\"ecomiq-bf-workbook\"|data-composition-id=\"ecomiq-bf-workbook-${sfx}\"|" \
    -e "s|data-height=\"1920\"|data-height=\"${h}\"|" \
    -e "s|assets/aroll-916.mp4|assets/${aroll}|" \
    "$SRC" > "$out.tmp"

  # Stamp the generated banner in so nobody hand-edits a derived cut.
  awk 'NR==1{print; print "<!-- GENERATED FILE - do not edit. Source: index.html - regenerate with: bash scripts/gen-ratios.sh -->"; next} {print}' \
    "$out.tmp" > "$out"
  rm -f "$out.tmp"

  # Fail loudly if any transform did not apply.
  local needle
  for needle in "$cls" "ecomiq-bf-workbook-${sfx}" "data-height=\"${h}\"" "$aroll" \
                "content=\"width=1080, height=${h}\"" "(${label})</title>"; do
    grep -q "$needle" "$out" || {
      echo "gen-ratios: transform failed, '$needle' missing from $out" >&2; exit 1; }
  done
  grep -q 'aroll-916\|r-916\|data-height="1920"' "$out" && {
    echo "gen-ratios: 9:16 leftovers found in $out" >&2; exit 1; }

  echo "gen-ratios: wrote $out (1080x${h})"
}

emit compositions/meta45.html 1350 r-45  45  aroll-45.mp4  "4:5"
emit compositions/square.html 1080 r-1x1 1x1 aroll-1x1.mp4 "1:1"
