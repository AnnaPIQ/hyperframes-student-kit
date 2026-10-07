#!/usr/bin/env bash
# Rebuilds assets/media/{plate.mp4,bubble.mp4,ctatile.mp4,vo.wav} from the Drive originals.
#
# QUALITY RULES (Sean flagged softening on an earlier build):
#   - B-roll is fetched as a stream copy (no re-encode) of the camera originals
#     (10-bit 4:2:2, ~150 Mbps) and the A-roll is the ProRes master.
#   - Every shot is decoded once, cropped/scaled once (lanczos, from 4K) and written
#     LOSSLESS (x264 -qp 0). The only lossy encode is the final Hyperframes render,
#     which must use:  --video-frame-format png --crf 10
#   - No browser-side scaling of the plate (no CSS pushes), so frames are never resampled.
#
# Usage: bash scripts/build-plate.sh [workdir]
# Downloads are sequential on purpose: parallel Drive requests trip "Quota exceeded" (LESSONS.md).
set -euo pipefail
cd "$(dirname "$0")/.."
W="${1:-/tmp/review-call-build}"; mkdir -p "$W/orig" assets/media
U(){ echo "https://drive.usercontent.google.com/download?id=$1&export=download&confirm=t"; }

A="$W/aroll.mov"   # ProRes 422 3840x2160 25fps, Sean centred, face centre x~1931
[ -f "$A" ] || curl -sS -L --retry 4 -o "$A" "$(U 1uUDsUpDcEDbaVDLqz9qE9YgCMTh-Gu0V)"

# camera originals, stream copy of the first N seconds (no re-encode)
get(){ [ -f "$W/orig/$1.mp4" ] || { ffmpeg -v error -y -i "$(U "$2")" -t "$3" -map 0:v:0 -c copy "$W/orig/$1.mp4"; sleep 4; }; }
get stage0    1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z 14.6   # Shoptalk stage (1080p)
get lapman    1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu 5.5    # Sean holding laptop talking to man
get sign      1TIjxtO9kg_JXo48WW9bVog0DIDKakFis 2.5    # Sweet E's Bake Shop sign
get seanerica 1OEhRQ9CeyZxdI_21Eqm9x-SqGXKuoCL2 13.0   # Erica + Sean walk-out
get pack      1cF3UR7rqtK27rx9HUh5H7Wt_yipf8fhp 5.5    # Erica with cake (+500% hero)

LL="-c:v libx264 -preset veryfast -qp 0 -pix_fmt yuv420p -r 25 -an"   # lossless intermediate
cd "$W"
# A-roll: name src_in dur crop(w:h:x:y)
a(){ ffmpeg -v error -y -ss "$2" -i "$A" -t "$3" -vf "crop=$4,scale=1080:1920:flags=lanczos+accurate_rnd+full_chroma_int,fps=25" $LL "$1.mp4"; }
a a1  2.56  3.04 1215:2160:1518:0     # WIDE-L   0.00-3.04   qualifier
a a2  5.60  1.68 1085:1929:1540:115   # MID-L    3.04-4.72   three changes (punch-in)
a a4  8.80  1.64 1215:2160:1129:0     # WIDE-R   6.24-7.88   lock-up
a a8  17.80 3.16 1215:2160:1518:0     # WIDE-L  14.72-17.88  what we'd change
a a9  21.28 1.20 1056:1878:1572:100   # WIDE-L 1.15x 17.88-19.08 (hides the join)
a a10 22.72 1.32 1215:2160:1518:0     # WIDE-L  19.08-20.40  which to do first
# B-roll: name file src_in frames pre-filter
b(){ ffmpeg -v error -y -ss "$3" -i "orig/$2.mp4" -vf "${5}scale=1080:1920:flags=lanczos+accurate_rnd+full_chroma_int,fps=25" -frames:v "$4" $LL "$1.mp4"; }
R="transpose=1,"   # vertical phone footage stored sideways
b c1 stage0    13.12 32 "crop=608:1080:790:0,"   # 7.88-9.16 (clear of the clip's camera cut at 14.43s; crop keeps Rebuy stats out)
b c2 lapman    3.50  32 "$R"                     # 9.16-10.44
b c3 sign      0.50  28 "$R"                     # 10.44-11.56 (sign on "Sweet E's")
b c4 seanerica 11.60 24 "$R"                     # 11.56-12.52 (Erica + Sean)
b b8 pack      2.50  55 "$R"                     # 12.52-14.72 (+500% hero)
ffmpeg -v error -y -f lavfi -i "color=c=0x06284C:s=1080x1920:r=25" -frames:v 38  $LL navy3.mp4    # 4.72-6.24 store review
ffmpeg -v error -y -f lavfi -i "color=c=0x06284C:s=1080x1920:r=25" -frames:v 121 $LL navyend.mp4  # 20.40-25.24 CTA + end
printf "file '%s.mp4'\n" a1 a2 navy3 a4 c1 c2 c3 c4 b8 a8 a9 a10 navyend > list.txt
ffmpeg -v error -y -f concat -safe 0 -i list.txt -c copy plate.mp4

# overlays: Sean "on the call" bubble (S3) and CTA call tile (S11), lossless too
ffmpeg -v error -y -ss 7.28  -i "$A" -t 1.52 -vf "crop=900:900:1481:370,scale=420:420:flags=lanczos,fps=25" $LL bubble.mp4
ffmpeg -v error -y -ss 24.36 -i "$A" -t 3.88 -vf "crop=2200:1433:831:160,scale=952:620:flags=lanczos,fps=25" $LL ctatile.mp4

# VO edit: six segments cut on pauses (~1.4s of dead air removed), 20ms fades at each join
f="afade=t=in:d=0.02"
ffmpeg -v error -y -i "$A" -filter_complex "\
[0:a]atrim=2.56:10.44,asetpts=PTS-STARTPTS[s1];[0:a]atrim=10.72:17.56,asetpts=PTS-STARTPTS,$f[s2];\
[0:a]atrim=17.80:20.96,asetpts=PTS-STARTPTS,$f[s3];[0:a]atrim=21.28:22.48,asetpts=PTS-STARTPTS,$f[s4];\
[0:a]atrim=22.72:24.04,asetpts=PTS-STARTPTS,$f[s5];[0:a]atrim=24.36:28.20,asetpts=PTS-STARTPTS,$f[s6];\
[s1][s2][s3][s4][s5][s6]concat=n=6:v=0:a=1,loudnorm=I=-14:TP=-1.5:LRA=7,aresample=48000[a]" \
  -map "[a]" -c:a pcm_s16le vo.wav

cd - >/dev/null
cp "$W"/{plate.mp4,bubble.mp4,ctatile.mp4,vo.wav} assets/media/
echo "plate: $(ffprobe -v error -count_frames -show_entries stream=nb_read_frames -of csv=p=0 assets/media/plate.mp4) frames (expect 631)"
echo "cuts:  $(ffmpeg -i assets/media/plate.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null - 2>&1 | grep -o 'pts_time:[0-9.]*' | tr '\n' ' ')"
