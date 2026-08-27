#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# pull-media.sh — fetch the Sweet E's A-roll + b-roll masters from Drive.
#
#   bash scripts/pull-media.sh
#
# Downloads into ../../assets/incoming/sweet-es/ (shared raw stash, gitignored
# by size). Idempotent: skips a file whose size already matches the expected
# master size, so a re-run is cheap.
#
# NOTE: these are link-shared Drive files, fetched anonymously through
# drive.usercontent.google.com. If a file 302s to an HTML interstitial the
# share link has been revoked or the daily quota is spent — the byte-size
# guard below catches that (an HTML page is ~KB, not ~GB).
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
DEST="../../assets/incoming/sweet-es"
mkdir -p "$DEST"

# id:filename:expected_bytes
FILES=(
  "1gTiK-D9W5h0-0MN5BwvtS0zg7KtqqdCP:aroll-master.mov:2780483965"
  "1cF3UR7rqtK27rx9HUh5H7Wt_yipf8fhp:broll-erica-packing.mp4:1758599054"
  "13dyHmvfYPQCPA84j_Kz8HsH9sf_hAUTy:broll-sprinkle.mp4:915779566"
  "1Cy939sI_20AioB9loydrqhbavZ-m_xcS:broll-cookie-scroll.mp4:265539781"
  "1zYln8LRm6OesbDwjXfiiKcpRLxs6H-E7:broll-sean-laptop.mp4:278835660"
)

for spec in "${FILES[@]}"; do
  id="${spec%%:*}"; rest="${spec#*:}"; name="${rest%%:*}"; want="${rest##*:}"
  have=$(stat -c%s "$DEST/$name" 2>/dev/null || echo 0)
  if [ "$have" = "$want" ]; then printf '  = %-28s already complete\n' "$name"; continue; fi
  printf '  ↓ %-28s ' "$name"
  curl -sL --max-time 3000 \
    "https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t" \
    -o "$DEST/$name" -w 'http=%{http_code} '
  got=$(stat -c%s "$DEST/$name")
  if [ "$got" != "$want" ]; then echo "SIZE MISMATCH got=$got want=$want (quota/HTML interstitial?)"; exit 1; fi
  echo "ok ($got bytes)"
done

# Sweet E's own logo lockup, straight from their Shopify CDN (never redrawn).
if [ ! -s assets/sweetes-logo.png ]; then
  curl -s --max-time 60 \
    "https://www.sweetesbakeshop.com/cdn/shop/files/SweetE-Logo-Pink2.png?v=1657922828" \
    -o assets/sweetes-logo.png
  printf '  ↓ %-28s ok (%s bytes)\n' "sweetes-logo.png" "$(stat -c%s assets/sweetes-logo.png)"
fi
echo "media ready in $DEST"
