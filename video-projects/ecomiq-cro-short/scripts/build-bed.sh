#!/usr/bin/env bash
# =============================================================================
# build-bed.sh — cut the montage bed that sits under Sean's VO.
#
#   bash scripts/build-bed.sh 916   ->  assets/montage-bed-916.mp4  (1080x1920)
#   bash scripts/build-bed.sh 45    ->  assets/montage-bed-45.mp4   (1080x1350)
#
# The montage is reordered so each shot block lands on the VO beat it sells,
# muted (Sean's VO is the only audio), and trimmed to exactly 16.87s — the
# moment "more sales from the traffic you've already got" begins and the
# EcomIQ end card takes over.
#
# Two source masters, same edit, two framings:
#   916 -> Showcase Reel.mp4   1080x1920  used as-is, zero loss
#   45  -> Showcase ad-1-1.mp4 1440x1440  centre-cropped to 1152x1440 (20% off
#          the sides) then scaled to 1080x1350. Cropping the 9:16 master into
#          4:5 instead would drop 29.7% of the height and clip heads.
#
# Source footage past 27.73s is the montage's own baked-in end card — never
# pulled from, we build ours in the composition.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

RATIO="${1:-916}"

case "$RATIO" in
  916) SRC="assets/src/montage-916.mp4"; NORM="null";                          OUT="assets/montage-bed-916.mp4";;
  45)  SRC="assets/src/montage-sq.mp4";  NORM="crop=1152:1440:144:0,scale=1080:1350"; OUT="../ecomiq-cro-short-45/assets/montage-bed-45.mp4";;
  *) echo "Unknown ratio '$RATIO'. Use: 916 | 45" >&2; exit 1;;
esac

[ -f "$SRC" ] || { echo "Missing source $SRC" >&2; exit 1; }

# --- shot map -----------------------------------------------------------------
# Each block is <source-in> <on-screen-length>. Blocks B and D carry an extra
# 0.10s because xfade eats its transition duration out of the running total.
#
#  A  0.00-3.70  "Want more of your Shopify traffic to actually buy?"  storefront UI
#  B  3.70-6.20  "You're paying for every visitor,"                    stage + expo floor
#  C  6.20-7.93  "too few of them actually convert,"                   store aisle browsing
#  D  7.93-10.55 "and we guarantee we can change that."               Shopify Premier Partner
#  E 10.55-13.88 "Give us 90 days, ... an EcomIQ strategist"           Sean + team
#  F 13.88-16.87 "who'll turn more of those visitors into sales,"      customer buys + TikTok Shop
A_IN=15.60; A_LEN=3.70
B_IN=2.90;  B_LEN=2.60   # 2.50 on screen + 0.10 for the B->C dissolve
C_IN=13.87; C_LEN=1.73
D_IN=6.35;  D_LEN=2.72   # 2.62 on screen + 0.10 for the D->E dissolve
E_IN=9.07;  E_LEN=3.33
F_IN=23.63; F_LEN=2.99

# Snappy: hard cuts at A->B, C->D and E->F, a 0.10s dissolve at B->C and D->E
# so the edit breathes twice without ever going soft.
XF=0.10

echo "▶ Building $OUT  (ratio $RATIO, 16.87s, muted)"

ffmpeg -y -v error -stats -i "$SRC" -filter_complex "
  [0:v]trim=start=${A_IN}:duration=${A_LEN},setpts=PTS-STARTPTS[a];
  [0:v]trim=start=${B_IN}:duration=${B_LEN},setpts=PTS-STARTPTS[b];
  [0:v]trim=start=${C_IN}:duration=${C_LEN},setpts=PTS-STARTPTS[c];
  [0:v]trim=start=${D_IN}:duration=${D_LEN},setpts=PTS-STARTPTS[d];
  [0:v]trim=start=${E_IN}:duration=${E_LEN},setpts=PTS-STARTPTS[e];
  [0:v]trim=start=${F_IN}:duration=${F_LEN},setpts=PTS-STARTPTS[f];
  [b][c]xfade=transition=fade:duration=${XF}:offset=2.50[bc];
  [d][e]xfade=transition=fade:duration=${XF}:offset=2.62[de];
  [a][bc][de][f]concat=n=4:v=1:a=0[cat];
  [cat]${NORM},fps=30,format=yuv420p[v]
" -map "[v]" -an \
  -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -movflags +faststart \
  "$OUT"

printf '  ✓ %s — ' "$OUT"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,nb_frames \
        -show_entries format=duration -of csv=p=0:s=x "$OUT" | tr '\n' ' '
echo
