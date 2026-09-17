#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# pull-media.sh — fetch the two Drive masters this ad is cut from.
#
#   bash scripts/pull-media.sh
#
# Downloads into ../../.dl/ (shared raw stash, gitignored by size). Idempotent:
# a file whose size already matches the expected master size is skipped.
#
# These are link-shared Drive files fetched anonymously through
# drive.usercontent.google.com. Anything over ~100 MB returns a virus-scan
# interstitial unless confirm=t is passed; the byte-size guard below catches a
# revoked link or a spent quota (an HTML page is ~KB, not ~GB).
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
DEST="../../.dl"
mkdir -p "$DEST"

# id:filename:expected_bytes
FILES=(
  "16xHPMifBqX08T4ogLI6_9LbZJT-Mu_lg:montage-test.mp4:37405297"
  "1IGU_PNJxHNp6sIbq6DlKKf9BtIpU0G0N:sean-vo.mov:2780483965"
)

for spec in "${FILES[@]}"; do
  id="${spec%%:*}"; rest="${spec#*:}"; name="${rest%%:*}"; want="${rest##*:}"
  have=$(stat -c%s "$DEST/$name" 2>/dev/null || echo 0)
  if [ "$have" = "$want" ]; then printf '  = %-20s already complete\n' "$name"; continue; fi
  printf '  ↓ %-20s ' "$name"
  curl -sL --max-time 3000 \
    "https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t" \
    -o "$DEST/$name" -w 'http=%{http_code} '
  got=$(stat -c%s "$DEST/$name")
  if [ "$got" != "$want" ]; then
    echo "SIZE MISMATCH got=$got want=$want (quota / HTML interstitial?)"; exit 1
  fi
  echo "ok ($got bytes)"
done
echo "masters ready in $DEST"
