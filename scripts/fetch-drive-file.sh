#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Chunked, resumable Google Drive fetch for large link-shared files.
#
#   ./fetch-chunked.sh <fileId> <outPath> <totalBytes>
#
# Large Drive files serve behind a "virus scan warning" interstitial; this
# grabs the confirm uuid from that page, then pulls the payload in Range
# chunks so a dropped connection only costs one chunk. Google intermittently
# answers with a small "quota exceeded" HTML page instead of bytes, so every
# chunk is size-checked and sniffed for HTML before it is appended.
# ---------------------------------------------------------------------------
set -uo pipefail
FILE_ID="$1"; OUT="$2"; TOTAL="$3"
CHUNK=$((32 * 1024 * 1024))
COOKIE="/tmp/gc-${FILE_ID}.txt"
TRIES=${TRIES:-180}          # per chunk
BACKOFF=${BACKOFF:-20}       # seconds between tries

new_uuid() {
  curl -sSL -c "$COOKIE" "https://drive.google.com/uc?export=download&id=${FILE_ID}" \
    | grep -o 'name="uuid" value="[^"]*"' | sed 's/.*value="//;s/"//'
}

UUID=$(new_uuid)
touch "$OUT"
while :; do
  HAVE=$(stat -c%s "$OUT")
  [ "$HAVE" -ge "$TOTAL" ] && { echo "DONE $HAVE/$TOTAL"; break; }
  END=$((HAVE + CHUNK - 1)); [ "$END" -ge "$TOTAL" ] && END=$((TOTAL - 1))
  WANT=$((END - HAVE + 1))
  ok=0
  for try in $(seq 1 "$TRIES"); do
    curl -sS -b "$COOKIE" -c "$COOKIE" -r "${HAVE}-${END}" -o "/tmp/chunk-$$.bin" \
      "https://drive.usercontent.google.com/download?id=${FILE_ID}&export=download&confirm=t&uuid=${UUID}"
    CS=$(stat -c%s "/tmp/chunk-$$.bin" 2>/dev/null || echo 0)
    if [ "$CS" -eq "$WANT" ] && ! head -c 20 "/tmp/chunk-$$.bin" | grep -qi '<!DOCTYPE\|<html'; then
      cat "/tmp/chunk-$$.bin" >> "$OUT"; ok=1; break
    fi
    [ $((try % 10)) -eq 1 ] && echo "offset $HAVE: try $try got $CS/$WANT  $(date -u +%H:%M:%S)"
    UUID=$(new_uuid)
    sleep "$BACKOFF"
  done
  [ "$ok" -eq 0 ] && { echo "FAILED at offset $HAVE after $TRIES tries"; exit 1; }
  echo "progress $(stat -c%s "$OUT")/$TOTAL  $(date -u +%H:%M:%S)"
done
