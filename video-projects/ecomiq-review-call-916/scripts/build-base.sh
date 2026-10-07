#!/usr/bin/env bash
# Builds the picture base and VO track for this ad straight from the raw sources (EDIT-PLAN.md).
#   Usage: [FORMAT=916|45] [CRF=n] bash scripts/build-base.sh <raw-dir>
#     FORMAT=916 (default) -> assets/base.mp4     1080x1920
#     FORMAT=45            -> assets/base-45.mp4  1080x1350 (same framing height, wider window)
#     CRF: x264 quality for the picture base. 18 for drafts (default); use 10 for masters.
# <raw-dir> must contain: aroll.mov, br_shoptalk_stage.bin, mob_mount_magnetic.bin,
# br_holding_laptop_man.bin (downloaded from the Drive links in EDIT-PLAN.md Part 5).
# Timeline = A-roll source minus 0.30s (head trim). Graphics/cards/subtitles live in index.html.
set -euo pipefail
RAW="${1:?raw dir}"
FORMAT="${FORMAT:-916}"
CRF="${CRF:-18}"
cd "$(dirname "$0")/.."
W=work-base; rm -rf ./work-base; mkdir -p "$W"
PRESET=medium; [ "$CRF" -le 12 ] && PRESET=slow
ENC=(-an -c:v libx264 -preset "$PRESET" -crf "$CRF" -pix_fmt yuv420p -r 25)
TRIM=0.30
if [ "$FORMAT" = 45 ]; then OW=1080; OH=1350; OUT=assets/base-45.mp4; else OW=1080; OH=1920; OUT=assets/base.mp4; fi

# A-roll crop windows on the 3840x2160 source for 9:16 (EDIT-PLAN.md "A-roll crop windows")
declare -A CROP=(
  [WIDE]="1215:2160:1450:0"   [MED]="1080:1920:1460:120" [TIGHT]="864:1536:1570:250"
  [MEDL]="1080:1920:1720:60"  [WIDER]="1215:2160:1180:0" [MEDR]="1080:1920:1300:120"
  [MEDR2]="1080:1920:1260:120"
)
# 4:5 uses the same window height and centre, widened to 4:5 (clamped inside the 3840 frame)
to45() { IFS=: read -r w h x y <<<"$1"
  awk -v w="$w" -v h="$h" -v x="$x" -v y="$y" 'BEGIN{W=int(h*0.8/2)*2; X=int(x+w/2-W/2); if(X<0)X=0; if(X>3840-W)X=3840-W; printf "%d:%d:%d:%d", W, h, X, y}'; }
if [ "$FORMAT" = 45 ]; then for k in "${!CROP[@]}"; do CROP[$k]=$(to45 "${CROP[$k]}"); done; fi

# Opening move: Sean starts centred (MED) and glides to Sean-left (MED-L) between 1.20s and 1.90s,
# eased (smoothstep), as the first graphics arrive.
P="clip((t-1.2)/0.7\\,0\\,1)"
if [ "$FORMAT" = 45 ]; then
  CROP[PANL]="1536:1920:'1232+260*$P*$P*(3-2*$P)':'120-60*$P*$P*(3-2*$P)'"
else
  CROP[PANL]="1080:1920:'1460+260*$P*$P*(3-2*$P)':'120-60*$P*$P*(3-2*$P)'"
fi

n=0
fr() { awk "BEGIN{printf \"%d\", ($1)*25+0.5}"; }   # seconds -> frame index (25 fps)
aroll() { # start end crop  (cut on exact frame counts so segments never drift)
  local f0 f1; f0=$(fr "$1"); f1=$(fr "$2")
  local ss; ss=$(awk "BEGIN{printf \"%.2f\", $f0/25+$TRIM}")
  n=$((n+1)); ffmpeg -v error -y -ss "$ss" -i "$RAW/aroll.mov" -frames:v $((f1-f0)) \
    -vf "crop=${CROP[$3]},scale=$OW:$OH:flags=lanczos,setsar=1" "${ENC[@]}" "$W/$(printf %02d $n).mp4"
}
clip() { # file src_in start end vf
  local f0 f1; f0=$(fr "$3"); f1=$(fr "$4")
  n=$((n+1)); ffmpeg -v error -y -ss "$2" -i "$RAW/$1" -vf "$5,fps=25,setsar=1" -frames:v $((f1-f0)) "${ENC[@]}" "$W/$(printf %02d $n).mp4"
}
# B-roll crop windows per format
if [ "$FORMAT" = 45 ]; then
  ST="crop=864:1080:668:0"; MOB="crop=864:1080:508:0"; LAP="transpose=1,crop=2160:2700:0:450"
else
  ST="crop=608:1080:796:0"; MOB="crop=608:1080:636:0"; LAP="transpose=1"
fi
S="scale=$OW:$OH:flags=lanczos"

aroll 0.00  6.96  PANL    # Shot 1 (centred, then glides to Sean-left) + under the cartoon card
aroll 6.96  11.20 MEDR2   # Shot 3 (Sean right, phone mock on the left)
aroll 11.20 16.44 WIDER   # under Card B, then Split A
aroll 16.44 21.30 MEDR    # Split B
clip br_shoptalk_stage.bin 14.60 21.30 22.84 "$ST,$S"                                                       # Shot 7
clip mob_mount_magnetic.bin 0 22.84 27.30 "trim=0:2,setpts=PTS-STARTPTS,$MOB,$S,setpts=PTS/0.6,tpad=stop_mode=clone:stop_duration=3"  # Shot 8
clip br_holding_laptop_man.bin 3.00 27.30 29.14 "$LAP,$S"                                                   # Shot 9
aroll 29.14 32.02 MEDR    # Split C
aroll 32.02 36.44 WIDE    # Shot 11
aroll 36.44 40.70 MEDL    # Shot 12 + under end card

ls "$W"/*.mp4 | sed "s|^$W/|file '|; s|$|'|" > "$W/list.txt"
ffmpeg -v error -y -f concat -safe 0 -i "$W/list.txt" -c copy -movflags +faststart "$OUT"
# VO: unbroken A-roll audio from source 0.30, fade out as Sean breaks (38.90 to 39.30)
ffmpeg -v error -y -ss $TRIM -i "$RAW/aroll.mov" -t 40.70 -vn -af "afade=t=out:st=38.90:d=0.40" -c:a aac -b:a 256k assets/vo.m4a
[ -n "${KEEP:-}" ] || rm -rf ./work-base
ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT"
