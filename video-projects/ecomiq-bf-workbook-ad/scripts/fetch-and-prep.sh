#!/usr/bin/env bash
# =============================================================================
# fetch-and-prep.sh — rebuild every source asset this ad depends on.
#
#   bash scripts/fetch-and-prep.sh
#
# The raw A-roll is a 3.35 GB ProRes master and is NOT committed. This script
# pulls it from Drive and re-cuts the two delivery crops plus the VO, so the
# project can be rebuilt from a clean clone.
#
# The workbook page renders and the B-roll screen recordings ARE committed
# (they are small), so this script does not re-derive them. They came from:
#   claude/cool-allen-8hees7      video-projects/ecomiq-broll/assets/{clips,pages}
#   claude/wonderful-curie-brnfzl video-projects/bf-workbook-broll/assets/pages
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

RAW="../../assets/incoming/sean-black-friday-aroll.mov"
AROLL_ID="1hpbCEqlEX5N4K9cjl-dmBV2CoMp1Tjii"   # "Beat your black friday plan before its too late .mov"
WORKBOOK_ID="1QJvDX6G023N6vwAcHqS6dth7tarrAMOj" # "The Black Friday Profit Plan Workbook.pdf"

# Trim point: source 0.00-2.85s is the slate clap. Speech runs 3.15 -> 51.98.
IN=2.85
VID_LEN=46.6    # video is covered by the end card from 45.18 onward
AUD_LEN=53.0    # full VO, padded to the composition length

mkdir -p assets/aroll ../../assets/incoming

# --- workbook PDF (small, public link) --------------------------------------
if [ ! -f ../../assets/incoming/black-friday-workbook.pdf ]; then
  echo "▶ workbook PDF"
  curl -sSL "https://drive.usercontent.google.com/download?id=${WORKBOOK_ID}&export=download" \
    -o ../../assets/incoming/black-friday-workbook.pdf
  head -c 5 ../../assets/incoming/black-friday-workbook.pdf | grep -q '%PDF-' \
    || { echo "✗ not a PDF — Drive returned an interstitial"; exit 1; }
fi

# --- A-roll master ----------------------------------------------------------
# Files this large sit behind Drive's virus-scan interstitial, so the confirm
# token has to be read out of the HTML and replayed.
if [ ! -f "$RAW" ]; then
  echo "▶ A-roll master (3.35 GB)"
  UUID=$(curl -sSL "https://drive.usercontent.google.com/download?id=${AROLL_ID}&export=download" \
          | grep -oE 'name="uuid" value="[^"]+"' | sed 's/.*value="//;s/"//')
  [ -n "$UUID" ] || { echo "✗ could not read the Drive confirm token"; exit 1; }
  curl -sSL "https://drive.usercontent.google.com/download?id=${AROLL_ID}&export=download&confirm=t&uuid=${UUID}" \
    -o "$RAW"
fi

# --- normalise to the two delivery ratios -----------------------------------
# The master is 3840x2160 LANDSCAPE ProRes at 25fps. Scale-and-pad into a
# vertical frame would letterbox Sean to ~30% of frame height, so both outputs
# are centre CROPS instead. He sits dead-centre in the original framing, so no
# re-framing pass is needed; 1215px and 1728px of source both downscale to
# 1080 with resolution to spare.
echo "▶ 9:16  crop 1215x2160 @ x=1312  ->  1080x1920"
ffmpeg -y -hide_banner -loglevel error -ss "$IN" -t "$VID_LEN" -i "$RAW" \
  -an -vf "crop=1215:2160:1312:0,scale=1080:1920:flags=lanczos,fps=30" \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -movflags +faststart \
  assets/aroll/sean-9x16.mp4

echo "▶ 4:5   crop 1728x2160 @ x=1056  ->  1080x1350"
ffmpeg -y -hide_banner -loglevel error -ss "$IN" -t "$VID_LEN" -i "$RAW" \
  -an -vf "crop=1728:2160:1056:0,scale=1080:1350:flags=lanczos,fps=30" \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -movflags +faststart \
  assets/aroll/sean-4x5.mp4

# The master is quiet (mean -37.4 dBFS), so the VO is normalised to the -16 LUFS
# social target. Video is muted; this rides a sibling <audio> in the composition.
echo "▶ VO    loudnorm to -16 LUFS / -1.5 dBTP"
ffmpeg -y -hide_banner -loglevel error -ss "$IN" -t "$AUD_LEN" -i "$RAW" \
  -vn -af "loudnorm=I=-16:TP=-1.5:LRA=11" -ar 48000 -ac 2 -c:a aac -b:a 192k \
  assets/aroll/sean-vo.m4a

# --- silent, duckable music bed --------------------------------------------
if [ ! -f assets/music/music-bed.m4a ]; then
  echo "▶ music bed placeholder"
  mkdir -p assets/music
  ffmpeg -y -hide_banner -loglevel error -f lavfi -i anullsrc=r=48000:cl=stereo \
    -t "$AUD_LEN" -c:a aac -b:a 96k assets/music/music-bed.m4a
fi

echo "✓ sources ready"
ffprobe -v error -show_entries format=duration -show_entries stream=width,height \
  -of csv=p=0 assets/aroll/sean-9x16.mp4
