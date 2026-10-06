#!/usr/bin/env bash
# =============================================================================
# prep-media.sh — build every media file the composition needs.
#
#   bash scripts/prep-media.sh [path/to/"Ad - Your 90-day profit plan.mov"]
#
# Outputs to assets/media/ (gitignored, regenerate with this script):
#   aroll.mp4      A-roll, 4 source ranges joined (pauses tightened), graded,
#                  cropped to a 1215x2160 9:16 column centred on Sean.
#   vo.wav         Sean's dialogue for the same ranges (10 ms fades on joins).
#   b1..b7.mp4     B-roll shots, trimmed, rotated upright, 1080x1920.
#
# Source ranges / B-roll picks follow the edit plan doc (Part 1 + Part 2).
# B-roll is pulled straight from Google Drive with HTTP range seeks, so only
# the seconds we use are downloaded.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=assets/media
mkdir -p "$OUT"

AROLL="${1:-}"
DRIVE="https://drive.usercontent.google.com/download?export=download&confirm=t&id="
if [ -z "$AROLL" ]; then
  AROLL="$OUT/aroll-source.mov"
  [ -f "$AROLL" ] || curl -sSL -o "$AROLL" "${DRIVE}1ZmCQ99KQ4u8mUzhQ6qR4z0bCsvOFB51Q"
fi

# ---- A-roll: ranges (source seconds) -> ad 0.00-38.65 -----------------------
# [0.50,14.95] [15.55,30.05] [30.65,36.10] [36.65,40.90]
GRADE="huesaturation=hue=-20:saturation=-0.15:colors=b+m:strength=1"
CROP="crop=1215:2160:1323:0"
ffmpeg -nostdin -v error -y -i "$AROLL" -filter_complex "
 [0:v]split=4[v0][v1][v2][v3];
 [v0]trim=0.50:14.95,setpts=PTS-STARTPTS[a];
 [v1]trim=15.55:30.05,setpts=PTS-STARTPTS[b];
 [v2]trim=30.65:36.10,setpts=PTS-STARTPTS[c];
 [v3]trim=36.65:40.90,setpts=PTS-STARTPTS[d];
 [a][b][c][d]concat=n=4:v=1:a=0,$CROP,$GRADE,fps=30,format=yuv420p[v];
 [0:a]asplit=4[x0][x1][x2][x3];
 [x0]atrim=0.50:14.95,asetpts=PTS-STARTPTS,afade=t=in:d=0.01,afade=t=out:st=14.44:d=0.01[p];
 [x1]atrim=15.55:30.05,asetpts=PTS-STARTPTS,afade=t=in:d=0.01,afade=t=out:st=14.49:d=0.01[q];
 [x2]atrim=30.65:36.10,asetpts=PTS-STARTPTS,afade=t=in:d=0.01,afade=t=out:st=5.44:d=0.01[r];
 [x3]atrim=36.65:40.90,asetpts=PTS-STARTPTS,afade=t=in:d=0.01,afade=t=out:st=4.24:d=0.01[s];
 [p][q][r][s]concat=n=4:v=0:a=1,aformat=sample_rates=48000:channel_layouts=stereo[aout]" \
 -map "[v]" -c:v libx264 -preset medium -crf 16 -g 15 -movflags +faststart -an "$OUT/aroll.mp4" \
 -map "[aout]" -c:a pcm_s16le "$OUT/vo.wav"
echo "✓ aroll.mp4 + vo.wav"

# 4:5 feed version: wider 1728x2160 window on the same centre, same cuts + grade
CROP45="crop=1728:2160:1066:0,scale=1440:1800:flags=lanczos"
ffmpeg -nostdin -v error -y -i "$AROLL" -filter_complex "
 [0:v]split=4[v0][v1][v2][v3];
 [v0]trim=0.50:14.95,setpts=PTS-STARTPTS[a];
 [v1]trim=15.55:30.05,setpts=PTS-STARTPTS[b];
 [v2]trim=30.65:36.10,setpts=PTS-STARTPTS[c];
 [v3]trim=36.65:40.90,setpts=PTS-STARTPTS[d];
 [a][b][c][d]concat=n=4:v=1:a=0,$CROP45,$GRADE,fps=30,format=yuv420p[v]" \
 -map "[v]" -c:v libx264 -preset medium -crf 17 -g 15 -movflags +faststart -an "$OUT/aroll-4x5.mp4"
echo "✓ aroll-4x5.mp4"

# ---- B-roll ------------------------------------------------------------------
# name | drive id | in (s) | dur (s) | filter (rotate/crop to 1080x1920)
ROT="transpose=1,scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920"
broll() {
  local name=$1 id=$2 ss=$3 dur=$4 vf=$5
  ffmpeg -nostdin -v error -y -ss "$ss" -i "${DRIVE}${id}" -t "$dur" -an \
    -vf "$vf,fps=30,format=yuv420p" -c:v libx264 -preset medium -crf 17 -g 15 \
    -movflags +faststart "$OUT/$name.mp4"
  echo "✓ $name.mp4"
}
# 1 Shoptalk stage ("Sean Clarke Pacific IQ.mp4", 1080p). Crop starts right of
#   Rebuy's stats wall: Sean on the left third, his own title slide top right.
broll b1 1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z 13.2 0.9 "crop=ih*9/16:ih:iw*0.42:0,scale=1080:1920:flags=lanczos,unsharp=5:5:0.6"
# 2 Sean and Mason standing talking to 2 women
broll b2 1GycuM9sO1RClaXwnU7sdYi6HOqr6p15I 5.0 0.85 "$ROT"
# 3 Sean holding laptop talking to man
broll b3 1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu 4.0 0.8 "$ROT"
# 4 Mob Armor product in hand (August Mob Armor 9:16 export; 1.4x, cropped
#   so its burned-in EcomIQ logo and caption both leave the frame)
broll b4 1y-p9X7CAXZ9kW9a_5ntcjSeAJvIxTC-2 27.4 1.15 "scale=1512:2688,crop=1080:1920:216:220"
# 5 Sean and Mason talking
broll b5 1vk6MsGPlFBwNjRb_CvsJ17lq6EokzIXi 13.0 0.9 "$ROT"
# 6 Close-up fingers typing
broll b6 1eaH53uLyLgLPm6v75Ad2NSgeelsIBLKJ 2.0 0.86 "$ROT"
# 7 Angle over laptop, Sean thinking (sits under the tracker graphic)
broll b7 1x1uT_kVmPod-vpPn5SVIGY4kUZmfCwBo 4.0 3.05 "$ROT"
echo "✅ media ready in $OUT"
