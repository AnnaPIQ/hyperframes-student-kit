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
# The reel is a rapid-cut montage — its own shots fire every 0.6-0.9s — so the
# bed runs at 0.854x to let each one land, and draws from the BACK HALF of the
# reel rather than sampling across all of it. Source 13.87-27.70 is the whole
# usable tail (27.73 onward is the montage's baked-in end card), and at 0.854x
# it fills the 16.87s under the VO exactly. Nothing before 13.87 is used,
# except one deliberate insert:
#
#   A  0.00- 8.69  src 13.870-21.170   storefront UI -> street -> retail -> cafe
#   B  8.69- 9.36  src  7.030- 7.597   Shopify Premier Partner card  ** INSERT **
#   C  9.36 -16.87 src 21.170-27.560   Tesla -> expo -> customer buys -> TikTok
#                                      Shop -> closes on Sean's portrait
#
# B is the one frame pulled from outside the tail. It is the strongest
# credibility image in the reel and it lands square on the word "guarantee"
# (VO 8.81-9.08); C resumes exactly where A left off, so it reads as a clean
# insert cut rather than a jump. Drop B and widen A/C if it is not wanted.
# ffmpeg's trim floors each segment to a whole source frame, so the three
# blocks yield 14.367s of real source, not the 14.407s the arithmetic suggests.
# The rate is set so the bed OVER-runs the 16.87s clip (it lands at 16.93s) and
# the engine trims the tail. Matching 16.87 exactly here left the bed two frames
# short and flashed navy between the last footage frame and the end card.
SPEED=0.840          # 16% slower than source — "slightly", not slow-motion
PTS=1.190
A_IN=13.870; A_LEN=7.302   # -> 8.599s on screen
B_IN=7.030;  B_LEN=0.574   # -> 0.668s on screen, lands on "guarantee"
C_IN=21.170; C_LEN=6.531   # -> 7.657s on screen

# Two hard cuts, in and out of the insert. An insert cut is always hard — a
# dissolve would read as a scene change instead of a cutaway. With the reel
# slowed and the tail running continuously either side, the edit sits far
# calmer than the six-block version it replaces.

echo "▶ Building $OUT  (ratio $RATIO, 16.87s, ${SPEED}x, muted)"

ffmpeg -y -v error -stats -i "$SRC" -filter_complex "
  [0:v]trim=start=${A_IN}:duration=${A_LEN},setpts=(PTS-STARTPTS)*${PTS}[a];
  [0:v]trim=start=${B_IN}:duration=${B_LEN},setpts=(PTS-STARTPTS)*${PTS}[b];
  [0:v]trim=start=${C_IN}:duration=${C_LEN},setpts=(PTS-STARTPTS)*${PTS}[c];
  [a][b][c]concat=n=3:v=1:a=0[cat];
  [cat]${NORM},fps=30,format=yuv420p[v]
" -map "[v]" -an \
  -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -movflags +faststart \
  "$OUT"

printf '  ✓ %s — ' "$OUT"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,nb_frames \
        -show_entries format=duration -of csv=p=0:s=x "$OUT" | tr '\n' ' '
echo
