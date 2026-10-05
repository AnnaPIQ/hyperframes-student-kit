#!/usr/bin/env bash
# Rebuilds assets/media/{plate.mp4,bubble.mp4,ctatile.mp4,vo.wav} from the Drive sources.
# The plate is the full picture edit (A-roll crops + B-roll) at 1080x1920 / 25fps;
# index.html layers all graphics, captions and slow pushes on top of it.
#
# Usage: bash scripts/build-plate.sh [workdir]
# Downloads are sequential on purpose: parallel Drive requests trip "Quota exceeded" (LESSONS.md).
set -euo pipefail
cd "$(dirname "$0")/.."
W="${1:-/tmp/review-call-build}"; mkdir -p "$W/seg" assets/media
U(){ echo "https://drive.usercontent.google.com/download?id=$1&export=download&confirm=t"; }

# --- A-roll (ProRes 3840x2160 25fps, Sean centred, face centre x~1931) ---
A="$W/aroll.mov"
[ -f "$A" ] || curl -sS -L --retry 4 -o "$A" "$(U 1uUDsUpDcEDbaVDLqz9qE9YgCMTh-Gu0V)"

# --- B-roll segments (only the seconds we use) ---
seg(){ [ -f "$W/seg/$1.mp4" ] || { ffmpeg -v error -y -ss "$3" -t "$4" -i "$(U "$2")" -an \
  -c:v libx264 -preset veryfast -crf 14 -pix_fmt yuv420p "$W/seg/$1.mp4"; sleep 3; }; }
seg stage0    1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z 12.5 2   # Shoptalk stage wide (1080p)
seg lapman    1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu 2.5  5   # Sean holding laptop talking to man
seg women     1GycuM9sO1RClaXwnU7sdYi6HOqr6p15I 4    4   # Sean and Mason with group
seg overlap   1x1uT_kVmPod-vpPn5SVIGY4kUZmfCwBo 3.5  5   # angle over laptop, Sean thinking
seg seanerica 1OEhRQ9CeyZxdI_21Eqm9x-SqGXKuoCL2 7    7   # Sweet E's: Erica + Sean walk-out
seg sign      1TIjxtO9kg_JXo48WW9bVog0DIDKakFis 0    12  # Sweet E's Bake Shop sign
seg sprinkle  13dyHmvfYPQCPA84j_Kz8HsH9sf_hAUTy 0    4   # sprinkles on cupcakes
seg pack      1cF3UR7rqtK27rx9HUh5H7Wt_yipf8fhp 2.5  5   # Erica with cake (hero under +500%)

V="fps=25,format=yuv420p"; X="-c:v libx264 -preset medium -crf 14 -r 25 -an"
cd "$W"
a(){ ffmpeg -v error -y -ss "$2" -i "$A" -t "$3" -vf "crop=$4,scale=1080:1920:flags=lanczos,$V" $X "$1.mp4"; }
a a1  2.56  3.04 1215:2160:1518:0     # WIDE-L   0.00-3.04   qualifier
a a2  5.60  1.68 1085:1929:1540:115   # MID-L    3.04-4.72   three changes (punch-in)
a a4  8.80  1.64 1215:2160:1129:0     # WIDE-R   6.24-7.88   lock-up
a a8  17.80 3.16 1215:2160:1518:0     # WIDE-L  14.72-17.88  what we'd change
a a9  21.28 1.20 1056:1878:1572:100   # WIDE-L 1.15x 17.88-19.08 why it matters (hides join)
a a10 22.72 1.32 1215:2160:1518:0     # WIDE-L  19.08-20.40  which to do first
b(){ ffmpeg -v error -y -ss "$3" -i "seg/$2.mp4" -vf "$5scale=1080:1920:flags=lanczos,$V" -frames:v "$4" $X "$1.mp4"; }
R="transpose=1,fps=25,"   # vertical phone footage stored sideways
b b1 stage0    0.4 16 "crop=608:1080:760:0,fps=25,"   # 7.88-8.52 (crop keeps Rebuy stats out)
b b2 lapman    1.0 16 "$R"                            # 8.52-9.16
b b3 women     1.0 16 "$R"                            # 9.16-9.80
b b4 overlap   1.0 16 "$R"                            # 9.80-10.44
b b5 seanerica 4.8 14 "$R"                            # 10.44-11.00
b b6 sign      1.0 16 "$R"                            # 11.00-11.64 (lands on "Sweet E's")
b b7 sprinkle  0.6 22 "$R"                            # 11.64-12.52
b b8 pack      0.0 55 "$R"                            # 12.52-14.72 (+500% hero)
ffmpeg -v error -y -f lavfi -i "color=c=0x06284C:s=1080x1920:r=25" -frames:v 38  $X navy3.mp4    # 4.72-6.24 store review
ffmpeg -v error -y -f lavfi -i "color=c=0x06284C:s=1080x1920:r=25" -frames:v 121 $X navyend.mp4  # 20.40-25.24 CTA + end
printf "file '%s.mp4'\n" a1 a2 navy3 a4 b1 b2 b3 b4 b5 b6 b7 b8 a8 a9 a10 navyend > list.txt
ffmpeg -v error -y -f concat -safe 0 -i list.txt -c copy plate.mp4

# overlays: Sean "on the call" bubble (S3) and CTA call tile (S11)
ffmpeg -v error -y -ss 7.28  -i "$A" -t 1.52 -vf "crop=900:900:1481:370,scale=420:420,$V" $X bubble.mp4
ffmpeg -v error -y -ss 24.36 -i "$A" -t 3.88 -vf "crop=2200:1433:831:160,scale=952:620:flags=lanczos,$V" $X ctatile.mp4

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
