#!/usr/bin/env bash
# =============================================================================
# render-all.sh — build and render every ratio of the EcomIQ CRO short.
#
#   bash scripts/render-all.sh [draft|standard]     (default: standard)
#
# A Hyperframes project may only have ONE root composition: the runtime treats
# every root-level HTML file with a data-composition-id as an entry point, and a
# second one produces duplicate, layered audio. So each ratio is generated into
# index.html, linted, rendered, and only then replaced by the next. The 9:16 cut
# is regenerated at the end so the committed tree matches the primary format.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."

QUALITY="${1:-standard}"
RATIOS=(9x16 4x5 1x1)

echo "▶ rendering ${#RATIOS[@]} ratios at --quality ${QUALITY}"
mkdir -p renders

for r in "${RATIOS[@]}"; do
  echo
  echo "── ${r} ─────────────────────────────────────────────"
  [ -f "assets/montage-cutdown-${r}.mp4" ] || python3 scripts/build-cutdown.py --ratio "$r"
  python3 scripts/build-compositions.py --ratio "$r"
  npx hyperframes lint
  npx hyperframes render --quality "$QUALITY" \
    --output "renders/ecomiq-cro-short-${r}.mp4"
done

# leave the tree on the primary 9:16 cut
python3 scripts/build-compositions.py --ratio 9x16 >/dev/null

echo
echo "▶ outputs"
for r in "${RATIOS[@]}"; do
  f="renders/ecomiq-cro-short-${r}.mp4"
  printf '  %-34s ' "$f"
  ffprobe -v error -select_streams v:0 \
    -show_entries stream=width,height,nb_frames \
    -show_entries format=duration -of csv=p=0:nk=1 "$f" | paste -sd' '
done
