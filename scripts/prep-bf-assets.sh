#!/usr/bin/env bash
# =============================================================================
# prep-bf-assets.sh — fetch + prep every media asset for the EcomIQ
# "Black Friday Profit Plan workbook" ad (video-projects/ecomiq-bf-workbook).
#
#   bash scripts/prep-bf-assets.sh
#
# Regenerates the assets that are too large to commit. Safe to re-run; each
# step skips work that is already done. Run from the repo root.
#
# Why this exists: the A-roll is a 3.4 GB ProRes master and the prepped
# renditions are ~75 MB, so neither is committed. Everything here is
# reproducible from the three link-shared Google Drive sources below.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

STAGE="assets/incoming/bf"          # gitignored drop zone
DEST="video-projects/ecomiq-bf-workbook/assets"

# Drive sources (link-shared, "anyone with the link can view")
AROLL_ID="1GiS1-wwoP1A8je7hpUg9vR91tw2PvuC2"   # Sean A-roll, ProRes .mov, 3.4 GB
WORKBOOK_ID="1QJvDX6G023N6vwAcHqS6dth7tarrAMOj" # The Black Friday Profit Plan Workbook.pdf
BROLL_2_ID="1_iFav3XbUEoryaAIDCVw69P7wXDJRqQ7"  # workbook hero cover      -> workbook-hero.png
BROLL_3_ID="1xeq_pm6q5dGSv4f-jh7HI0eXT4EKifiw"  # toolkit spread (alt)     -> toolkit-spread-alt.png
BROLL_4_ID="1TRNxgnQAtpZr3pg4js3vALfO9jP8rHyv"  # toolkit spread (primary) -> toolkit-spread.png
# Not fetched: 1oVvj1Akgu_rz1xoTOsk3CBgfwAWIRZJU — the fourth product still. Its
# AI-generated microtext is garbled, so the ad never shows it.

c_blue=$'\033[1;36m'; c_grn=$'\033[1;32m'; c_off=$'\033[0m'
say() { printf '%s▶ %s%s\n' "$c_blue" "$1" "$c_off"; }
ok()  { printf '%s  ✓ %s%s\n' "$c_grn" "$1" "$c_off"; }

mkdir -p "$STAGE" "$DEST"

dl() { # dl <file-id> <out-path>
  [ -s "$2" ] && { ok "$(basename "$2") already present"; return 0; }
  curl -sSLf -o "$2" "https://drive.usercontent.google.com/download?id=$1&export=download"
  ok "downloaded $(basename "$2")"
}

# ---- 1. fetch -------------------------------------------------------------
say "Fetching sources from Google Drive"
dl "$AROLL_ID"    "$STAGE/aroll-sean-bf.mov"
dl "$WORKBOOK_ID" "$STAGE/workbook.pdf"
dl "$BROLL_2_ID"  "$STAGE/broll-2.png"
dl "$BROLL_3_ID"  "$STAGE/broll-3.png"
dl "$BROLL_4_ID"  "$STAGE/broll-4.png"

# ---- 2. audio spine -------------------------------------------------------
# Full 55.03 s of Sean's audio. This is the mixer's spine: the composition
# references it from a sibling <audio> element, never from the muted <video>.
say "Extracting audio spine"
if [ ! -s "$DEST/aroll-audio.m4a" ]; then
  ffmpeg -nostdin -v warning -i "$STAGE/aroll-sean-bf.mov" \
    -map 0:a -c:a aac -b:a 192k -ar 48000 -ac 2 -y "$DEST/aroll-audio.m4a"
fi
ok "aroll-audio.m4a (AAC 192k, 48 kHz stereo)"

# ---- 3. A-roll renditions -------------------------------------------------
# The source is 3840x2160 16:9 LANDSCAPE at 25 fps. Both deliverables are
# taller than wide, so this is a CENTRE CROP, not scale+pad: padding would
# leave Sean in a 1080x608 letterbox band with most of the frame empty.
# Sean holds ~48% of frame width for the whole take, so a static centre crop
# keeps him framed with nothing clipped (checked at 1s, 4s, 12s, 33s, 50s).
# Video is silent by design — Hyperframes requires muted <video>.
say "Prepping A-roll renditions (centre crop, 30 fps CFR)"

prep_aroll() { # prep_aroll <crop> <scale> <out>
  [ -s "$3" ] && { ok "$(basename "$3") already present"; return 0; }
  ffmpeg -nostdin -v warning -i "$STAGE/aroll-sean-bf.mov" -an \
    -vf "crop=$1,scale=$2:flags=lanczos,fps=30" \
    -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -movflags +faststart -y "$3"
  ok "$(basename "$3")"
}

prep_aroll "1215:2160:1312:0" "1080:1920" "$DEST/aroll-916.mp4"   # 9:16
prep_aroll "2160:2160:840:0"  "1080:1080" "$DEST/aroll-1x1.mp4"   # 1:1

# ---- 4. stills ------------------------------------------------------------
# broll-1 is deliberately NOT used: its AI-generated microtext is garbled
# ("Delivery Coe Coot Sheet", "Pash Cycle Calculator").
say "Staging product stills + real workbook pages"
copy_still() { [ -s "$2" ] || cp "$1" "$2"; }
copy_still "$STAGE/broll-2.png" "$DEST/workbook-hero.png"
copy_still "$STAGE/broll-4.png" "$DEST/toolkit-spread.png"
copy_still "$STAGE/broll-3.png" "$DEST/toolkit-spread-alt.png"
ok "product stills"

# Page 1 = cover, page 8 = the contribution-margin worked example that every
# on-screen figure in the ad is drawn from.
for pg in 1 8; do
  out=$(printf '%s/wb-page-%02d.png' "$DEST" "$pg")
  [ -s "$out" ] || pdftoppm -f "$pg" -l "$pg" -r 150 -png "$STAGE/workbook.pdf" "$DEST/wb-page"
done
ok "wb-page-01.png (cover) + wb-page-08.png (contribution margin)"

printf '\n%s✅ Assets ready in %s%s\n' "$c_grn" "$DEST" "$c_off"
