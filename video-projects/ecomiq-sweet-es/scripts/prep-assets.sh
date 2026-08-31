#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# prep-assets.sh — cut the measured windows out of the 4K masters into
# render-ready 1080p clips, one set per delivery ratio.
#
#   bash scripts/prep-assets.sh [9x16|4x5|all]     (default: all)
#
# MEASURED FACTS baked in below — do not "tidy" these numbers away:
#
#  * Every b-roll master is a phone-vertical take stored as 3840x2160 with NO
#    rotation metadata, so the picture is on its side. `transpose=1` (90° CW)
#    is required; it yields 2160x3840, i.e. exactly 9:16, so the 1080x1920
#    downscale is a clean 2:1 with no upscaling.
#  * The A-roll is a 4K ProRes landscape master (3840x2160, 25fps). Sean sits
#    left of centre: the 9:16 window is x=1200, the 4:5 window x=943.
#  * Mean luma (8-bit equivalent): A-roll ~61, b-roll ~129-143. The b-roll is
#    more than twice as bright as the A-roll, so an ungraded A/B cut flashes.
#    The eq() below lifts A-roll and pulls b-roll down to meet near ~100.
#  * VO runs 2.88s-43.60s in the master; the cut keeps 2.40-44.30 (41.90s),
#    which is the full voiceover plus a little air at each end.
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
SRC="../../assets/incoming/sweet-es"
OUT="assets/broll"
mkdir -p "$OUT"
WHICH="${1:-all}"

AROLL_IN=2.40
AROLL_DUR=41.90

# A-roll grade: lift the dark blue-lit set toward the b-roll.
GRADE_A="eq=brightness=0.030:contrast=1.06:saturation=1.05"
# B-roll grade: pull the bright bakery down to meet the A-roll.
GRADE_B="eq=brightness=-0.040:contrast=1.05:saturation=1.02"

enc() { # enc <outfile> <filterchain> <input> <ss> <dur>
  ffmpeg -y -v error -ss "$4" -t "$5" -i "$3" \
    -vf "$2" -an \
    -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
    -r 30 -movflags +faststart "$1"
  printf '  ✓ %-34s %s\n' "$(basename "$1")" "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -show_entries format=duration -of csv=p=0 "$1" | paste -sd' ')"
}

# name:source:ss:dur:crop4x5_y   (b-roll; y offset used only for the 4:5 cut)
BROLL=(
  "b1-cake:broll-erica-packing.mp4:5.00:4.60:380"
  "b2-cookies:broll-cookie-scroll.mp4:1.00:5.20:570"
  "b3-sprinkle:broll-sprinkle.mp4:0.80:3.40:570"
  "b4-box:broll-erica-packing.mp4:29.00:5.60:570"
  "b5-erica-box:broll-erica-packing.mp4:59.80:4.20:300"
  "b7-sean-erica:broll-sean-erica.mp4:11.45:2.80:250"
)

do_ratio() {
  local tag="$1" w="$2" h="$3" acrop="$4"
  echo "▶ $tag ($w x $h)"
  enc "$OUT/aroll-$tag.mp4" "$acrop,scale=$w:$h:flags=lanczos,$GRADE_A" \
      "$SRC/aroll-master.mov" "$AROLL_IN" "$AROLL_DUR"
  for spec in "${BROLL[@]}"; do
    IFS=: read -r name src ss dur cy <<<"$spec"
    local vf
    if [ "$tag" = "9x16" ]; then
      vf="transpose=1,scale=$w:$h:flags=lanczos,$GRADE_B"
    else
      vf="transpose=1,crop=2160:2700:0:$cy,scale=$w:$h:flags=lanczos,$GRADE_B"
    fi
    enc "$OUT/$name-$tag.mp4" "$vf" "$SRC/$src" "$ss" "$dur"
  done
}

case "$WHICH" in
  9x16) do_ratio 9x16 1080 1920 "crop=1215:2160:1200:0";;
  4x5)  do_ratio 4x5  1080 1350 "crop=1728:2160:943:0";;
  all)  do_ratio 9x16 1080 1920 "crop=1215:2160:1200:0"
        do_ratio 4x5  1080 1350 "crop=1728:2160:943:0";;
  *) echo "usage: prep-assets.sh [9x16|4x5|all]"; exit 1;;
esac

# The voiceover — one shared AAC track, identical for both ratios.
if [ ! -s assets/vo.m4a ]; then
  ffmpeg -y -v error -ss "$AROLL_IN" -t "$AROLL_DUR" -i "$SRC/aroll-master.mov" \
    -vn -ac 2 -ar 48000 -c:a aac -b:a 192k -movflags +faststart assets/vo.m4a
  printf '  ✓ %-34s %ss\n' "vo.m4a" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 assets/vo.m4a)"
fi
echo "assets ready in $OUT"
