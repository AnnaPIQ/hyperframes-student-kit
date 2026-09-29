#!/usr/bin/env bash
# Prep 2x (hi-res) footage from the original 4K sources -> assets/footage-2x/ (gitignored, regenerable).
#   bash scripts/prep-2x.sh <dir with the Drive originals: aroll.mov + broll/*.mov>
# Same edits as the 1080 set (assets/footage/), at double size:
#   A-roll: native iPhone HLG, resize/crop only (no tonemap/grade) — 2160x3840 is the source size.
#   B-roll: sideways 4K clips rotated (transpose=1); stage clip scale+pad on a blurred fill.
#   4:5 crops at 2x offsets (A-roll y=300, portrait B-roll y=570).
set -euo pipefail
SRC="${1:?usage: prep-2x.sh <source dir>}"
cd "$(dirname "$0")/.."
OUT=assets/footage-2x; mkdir -p "$OUT"
HLG="-c:v libx265 -preset medium -crf 16 -pix_fmt yuv420p10le -tag:v hvc1 -color_primaries bt2020 -color_trc arib-std-b67 -colorspace bt2020nc -color_range tv -x265-params colorprim=bt2020:transfer=arib-std-b67:colormatrix=bt2020nc:range=limited:log-level=error -r 30 -movflags +faststart -an"
SDR="-c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -r 30 -movflags +faststart -an"

ffmpeg -v error -y -i "$SRC/aroll.mov" -vf "scale=2160:3840:flags=lanczos,format=yuv420p10le,setsar=1" $HLG $OUT/aroll_9x16.mp4 &
ffmpeg -v error -y -i "$SRC/aroll.mov" -vf "scale=2160:3840:flags=lanczos,crop=2160:2700:0:300,format=yuv420p10le,setsar=1" $HLG $OUT/aroll_4x5.mp4 &
wait
rb() { # name source in-point
  ffmpeg -v error -y -ss $3 -t 2.6 -i "$SRC/broll/$2.mov" -vf "transpose=1,scale=2160:3840:flags=lanczos,setsar=1" $SDR $OUT/$1_9x16.mp4
  ffmpeg -v error -y -ss $3 -t 2.6 -i "$SRC/broll/$2.mov" -vf "transpose=1,scale=2160:3840:flags=lanczos,crop=2160:2700:0:570,setsar=1" $SDR $OUT/$1_4x5.mp4
}
rb mentor laptopman 3.0 & rb cake sweetes 4.0 & rb dryft dryft 10.0 & rb store dryftstore 21.0 & wait
st() { # landscape 1080p stage clip: scale+pad on blurred fill
  ffmpeg -v error -y -ss 12.0 -t 2.6 -i "$SRC/broll/stage.mov" -filter_complex "[0:v]split[a][b];[a]scale=$1:$2:force_original_aspect_ratio=increase,crop=$1:$2,boxblur=80:2,eq=brightness=-0.12[bg];[b]scale=$1:-2:flags=lanczos[fg];[bg][fg]overlay=0:(H-h)/2,setsar=1" $SDR $OUT/stage_$3.mp4
}
st 2160 3840 9x16 & st 2160 2700 4x5 & wait
ls -la $OUT
