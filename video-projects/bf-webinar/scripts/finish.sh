#!/usr/bin/env bash
# Final delivery: untouched HLG A-roll + colour-exact graphics layer.
#   bash scripts/finish.sh [9x16|4x5|9x16-2x|4x5-2x ...]   (default: 9x16 4x5)
#   2x targets = hi-res masters (2160x3840 / 2160x2700); run scripts/prep-2x.sh first.
#
# 1. render the graphics layer (A-roll stripped) as ProRes 4444 with alpha — SDR, brand-exact
# 2. convert that layer sRGB -> BT.2020 HLG with assets/luts/sdr-to-hlg.cube (BT.2408, 203-nit white)
# 3. overlay it on the native HLG A-roll (never re-graded), add the -14 LUFS VO
# 4. encode HEVC Main10 HLG + AAC, faststart  ->  renders/bf-webinar-<fmt>.mp4 and final-<fmt>.mp4
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/build.mjs >/dev/null
[ -f assets/luts/sdr-to-hlg.cube ] || python3 scripts/sdr-to-hlg-lut.py assets/luts/sdr-to-hlg.cube 65
DUR=20.5
for FMT in "${@:-9x16 4x5}"; do
  for F in $FMT; do
    case $F in *-2x) FOOT=footage-2x; CRF=18;; *) FOOT=footage; CRF=16;; esac
    FMT_BASE=${F%-2x}
    LAYER=renders/layer-$F.mov
    (cd .build-layer-$F && npx hyperframes render --format mov --output ../$LAYER --quiet)
    ffmpeg -v error -y \
      -i assets/$FOOT/aroll_$FMT_BASE.mp4 -i $LAYER -i assets/aroll-audio.m4a \
      -filter_complex "\
[0:v]tpad=stop_mode=clone:stop_duration=3,trim=duration=$DUR,setpts=PTS-STARTPTS,format=yuv444p10le[bg];\
[1:v]setpts=PTS-STARTPTS,split[c][a];\
[c]format=gbrpf32le,lut3d=file=assets/luts/sdr-to-hlg.cube:interp=tetrahedral,\
zscale=tin=arib-std-b67:pin=bt2020:min=gbr:rin=full:t=arib-std-b67:p=bt2020:m=bt2020nc:r=tv,format=yuv444p10le[cy];\
[a]alphaextract,format=gray10le[al];[cy][al]alphamerge[ov];\
[bg][ov]overlay=format=yuv444p10:eof_action=pass,format=yuv420p10le[v];\
[2:a]apad,atrim=duration=$DUR[au]" \
      -map "[v]" -map "[au]" -t $DUR -r 30 \
      -c:v libx265 -preset medium -crf $CRF -pix_fmt yuv420p10le -tag:v hvc1 \
      -color_primaries bt2020 -color_trc arib-std-b67 -colorspace bt2020nc -color_range tv \
      -x265-params "colorprim=bt2020:transfer=arib-std-b67:colormatrix=bt2020nc:range=limited:log-level=error" \
      -c:a aac -b:a 192k -movflags +faststart renders/bf-webinar-$F.mp4
    cp renders/bf-webinar-$F.mp4 final-$F.mp4
    echo "done $F -> final-$F.mp4"
  done
done
