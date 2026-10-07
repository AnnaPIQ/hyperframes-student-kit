#!/usr/bin/env bash
# Builds assets/media/{plate.mp4,vo.wav} for the Get the Second Sale 9:16 ad.
# The plate is the full picture edit (A-roll crops + B-roll) at 1080x1920 / 25fps,
# cut frame-accurately here. index.html layers graphics, captions and slow pushes on top.
#
# Usage: bash scripts/build-plate.sh <workdir>
#   <workdir> must contain the Drive masters (download them sequentially, LESSONS.md):
#     aroll.mov        Ad - Get the second sale.mov           10r1zY4Q7J13ffglIxPZO1Oozsed2iUHL
#     dryfthold.mp4    Copy of Dryft - Product holding.MP4    1RapxMHiEtRmM6ig2GKFSSeCSHU4PA_U1
#     shoptalk-stage.mp4  Sean talking on stage at Shoptalk   1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z
#     erica.mp4        Copy of Sweet E's Owner Erica - Packing cake.MP4  1cF3UR7rqtK27rx9HUh5H7Wt_yipf8fhp
#     holdlap.mp4      Sean holding laptop talking to man     1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu
# Times below are A-roll audio timecodes. The edit opens at T0=0.56 (Sean already facing camera,
# the glance at his computer is trimmed) and Sean is cut at 32.40 (before he looks back down),
# followed by a 3.00s end card. 877 frames = 35.08s.
# Lip sync (measured with face-landmark mouth tracking against the voice envelope): in the camera
# file the voice runs ~0.20s AHEAD of the lips once extracted, so every A-roll picture segment is
# taken VS=0.20s LATER than its audio timecode (VS=-0.20 below).
set -euo pipefail
cd "$(dirname "$0")/.."
W="${1:?workdir with masters}"; O="$W/plate-build"; mkdir -p "$O" assets/media
A="$W/aroll.mov"
V="fps=25,format=yuv420p"; X="-c:v libx264 -preset medium -crf 14 -r 25 -an"

# A-roll: ProRes 3840x2160 25fps, Sean's face centred at source x~1920.
# WIDE-L puts Sean left of centre (face ~x 370 of 1080) and leaves the right column for cards.
WIDE="crop=1215:2160:1518:0"; P112="crop=1085:1929:1583:60"; P106="crop=1146:2038:1552:40"
VS=-0.20
a(){ ffmpeg -v error -y -ss "$(python3 -c "print(round($2-$VS,2))")" -i "$A" -frames:v "$3" -vf "$4,scale=1080:1920:flags=lanczos,$V" $X "$O/$1.mp4"; }
a a1 0.56  71 "$WIDE"   # 0.56-3.40  qualifier (opens facing camera)
a a2 3.40  39 "$P112"   # 3.40-4.96  hook punch-in
a a3 24.72 53 "$WIDE"   # 24.72-26.84 free discovery call
a a4 26.84 90 "$P106"   # 26.84-30.44 bring them back (cut-in on silence)
a a5 30.44 49 "$WIDE"   # 30.44-32.40 CTA (cut before he looks back to the computer)

# B-roll. Canon client/event masters are vertical footage stored sideways: rotate 90 deg CW.
R="transpose=1"
b(){ ffmpeg -v error -y -ss "$3" -i "$W/$2" -frames:v "$4" -vf "$5,scale=1080:1920:flags=lanczos,$V" $X "$O/$1.mp4"; }
b b1 dryfthold.mp4      10.00 50 "$R"                    # 7.56-9.56 product (navy stage covers from 9.16)
# Shoptalk: use the close-up after the clip's own camera cut (14.43s). No Rebuy stats in frame.
# Sean walks left to right, so the 9:16 crop pans with him.
b c1 shoptalk-stage.mp4 14.56 38 "crop=608:1080:'min(1312,456+t*520)':0"   # 15.44-16.96 authority
b d1 erica.mp4          3.00  34 "$R"                    # 16.96-18.32 Erica, owner, to camera
b e1 erica.mp4          29.00 72 "$R"                    # 18.32-21.20 heart cake in Sweet E's box (+41%)
b f1 holdlap.mp4        3.50  88 "$R"                    # 21.20-24.72 guide your team + track repeat purchases (one held shot)

n(){ ffmpeg -v error -y -f lavfi -i "color=c=0x06284C:s=1080x1920:r=25" -frames:v "$2" $X "$O/$1.mp4"; }
n n1 65    # 4.96-7.56   GFX-1 get the second sale
n n2 147   # 9.56-15.44  GFX-2 journey
n n4 81    # 32.40-35.64 end card

printf "file '%s.mp4'\n" a1 a2 n1 b1 n2 c1 d1 e1 f1 a3 a4 a5 n4 > "$O/list.txt"
ffmpeg -v error -y -f concat -safe 0 -i "$O/list.txt" -c copy assets/media/plate.mp4

# VO: the A-roll read, untouched in time, cleaned and normalised for Meta. Extracted whole first
# (stream offset dropped, which is the timebase all timings here use), then trimmed to the edit.
ffmpeg -v error -y -i "$A" -vn -ac 2 -c:a pcm_s16le "$O/vo_full.wav"
ffmpeg -v error -y -i "$O/vo_full.wav" -af "atrim=start=0.56:end=32.64,asetpts=PTS-STARTPTS,afade=t=out:st=31.88:d=0.20,\
afade=t=in:d=0.01,highpass=f=70,loudnorm=I=-14:TP=-1.5:LRA=7,aresample=48000,apad=whole_dur=35.08" \
  -ac 2 -c:a pcm_s16le assets/media/vo.wav
echo "plate: $(ffprobe -v error -count_frames -show_entries stream=nb_read_frames -of csv=p=0 assets/media/plate.mp4) frames (expect 877)"
