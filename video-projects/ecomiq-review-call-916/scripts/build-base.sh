#!/usr/bin/env bash
# Builds the picture base (assets/base.mp4) and VO track (assets/vo.m4a) for this ad
# straight from the raw sources, following EDIT-PLAN.md v3.
#   Usage: bash scripts/build-base.sh <raw-dir>
# <raw-dir> must contain: aroll.mov, br_shoptalk_stage.bin, mob_mount_magnetic.bin,
# br_holding_laptop_man.bin (downloaded from the Drive links in EDIT-PLAN.md Part 5).
# Timeline = A-roll source minus 0.30s (head trim). Graphics/cards/subtitles live in index.html.
set -euo pipefail
RAW="${1:?raw dir}"
cd "$(dirname "$0")/.."
W=work-base; rm -rf ./work-base; mkdir -p "$W"
ENC=(-an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 25)
TRIM=0.30

# A-roll crop windows on the 3840x2160 source (EDIT-PLAN.md "A-roll crop windows")
declare -A CROP=(
  [WIDE]="1215:2160:1450:0"   [MED]="1080:1920:1460:120" [TIGHT]="864:1536:1570:250"
  [MEDL]="1080:1920:1720:60"  [WIDER]="1215:2160:1180:0" [MEDR]="1080:1920:1300:120"
)
n=0
fr() { awk "BEGIN{printf \"%d\", ($1)*25+0.5}"; }   # seconds -> frame index (25 fps)
aroll() { # start end crop  (cut on exact frame counts so segments never drift)
  local f0 f1; f0=$(fr "$1"); f1=$(fr "$2")
  local ss; ss=$(awk "BEGIN{printf \"%.2f\", $f0/25+$TRIM}")
  n=$((n+1)); ffmpeg -v error -y -ss "$ss" -i "$RAW/aroll.mov" -frames:v $((f1-f0)) \
    -vf "crop=${CROP[$3]},scale=1080:1920:flags=lanczos,setsar=1" "${ENC[@]}" "$W/$(printf %02d $n).mp4"
}
clip() { # file src_in start end vf
  local f0 f1; f0=$(fr "$3"); f1=$(fr "$4")
  n=$((n+1)); ffmpeg -v error -y -ss "$2" -i "$RAW/$1" -vf "$5,fps=25,setsar=1" -frames:v $((f1-f0)) "${ENC[@]}" "$W/$(printf %02d $n).mp4"
}

aroll 0.00  6.96  MEDL    # Shot 1 + under Card A
aroll 6.96  11.20 TIGHT   # Shot 3
aroll 11.20 16.44 WIDER   # under Card B, then Split A
aroll 16.44 21.30 MEDR    # Split B
clip br_shoptalk_stage.bin 14.60 21.30 22.84 "crop=608:1080:796:0,scale=1080:1920:flags=lanczos"            # Shot 7
clip mob_mount_magnetic.bin 0 22.84 27.30 "trim=0:2,setpts=PTS-STARTPTS,crop=608:1080:636:0,scale=1080:1920:flags=lanczos,setpts=PTS/0.6,tpad=stop_mode=clone:stop_duration=3"  # Shot 8
clip br_holding_laptop_man.bin 3.00 27.30 29.14 "transpose=1,scale=1080:1920:flags=lanczos"                  # Shot 9
aroll 29.14 32.02 MEDR    # Split C
aroll 32.02 36.44 WIDE    # Shot 11
aroll 36.44 40.70 MEDL    # Shot 12 + under end card

ls "$W"/*.mp4 | sed "s|^$W/|file '|; s|$|'|" > "$W/list.txt"
ffmpeg -v error -y -f concat -safe 0 -i "$W/list.txt" -c copy -movflags +faststart assets/base.mp4
# VO: unbroken A-roll audio from source 0.30, fade out as Sean breaks (38.90 to 39.30)
ffmpeg -v error -y -ss $TRIM -i "$RAW/aroll.mov" -t 40.70 -vn -af "afade=t=out:st=38.90:d=0.40" -c:a aac -b:a 256k assets/vo.m4a
[ -n "${KEEP:-}" ] || rm -rf ./work-base
ffprobe -v error -show_entries format=duration -of csv=p=0 assets/base.mp4
