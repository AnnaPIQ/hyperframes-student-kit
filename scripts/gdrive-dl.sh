#!/usr/bin/env bash
# gdrive-dl.sh — download a (publicly shared) Google Drive file to a path,
# handling the large-file virus-scan confirm interstitial.
#   bash scripts/gdrive-dl.sh <FILE_ID> <OUTPUT_PATH>
set -euo pipefail
ID="$1"; OUT="$2"
CK="$(mktemp)"; trap 'rm -f "$CK"' EXIT
mkdir -p "$(dirname "$OUT")"

# First attempt — small files come straight back.
curl -sL -c "$CK" "https://drive.usercontent.google.com/download?id=${ID}&export=download" -o "$OUT"

# If we got an HTML confirm page, extract the token + uuid and re-request.
if head -c 512 "$OUT" | grep -qi '<!DOCTYPE html\|<html'; then
  CONFIRM="$(grep -o 'confirm=[0-9A-Za-z_-]*' "$OUT" | head -1 | cut -d= -f2 || true)"
  UUID="$(grep -o 'name="uuid" value="[^"]*"' "$OUT" | head -1 | sed 's/.*value="//;s/"//' || true)"
  curl -sL -b "$CK" \
    "https://drive.usercontent.google.com/download?id=${ID}&export=download&confirm=${CONFIRM}&uuid=${UUID}" \
    -o "$OUT"
fi

SIZE=$(stat -c%s "$OUT" 2>/dev/null || echo 0)
echo "Downloaded $OUT (${SIZE} bytes)"
file "$OUT"
