#!/usr/bin/env bash
# Rebuild every derived media asset for bf-webinar-ad from the Drive sources.
# Run from the project folder:  bash scripts/prep-media.sh
# Needs: ffmpeg, python3 + numpy, npx hyperframes (remove-background is used only on the 2s stage clip).
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=.media-src; WORK=.media-work
mkdir -p "$SRC" "$WORK" assets

dl() { # dl <name> <drive-id>
  [ -s "$SRC/$1" ] || curl -sSL -o "$SRC/$1" "https://drive.usercontent.google.com/download?id=$2&export=download&confirm=t"
}
dl aroll.mov      1ACX0XWBYF8a29h99AiH0jF-v-a5Tf0MT   # IMG_1545.MOV, Sean floating-head A-roll
dl stage.vid      1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z   # Sean talking on stage at Shoptalk - rebuy
dl laptopman.vid  1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu   # Sean holding laptop talking to man
dl dryfthold.vid  1RapxMHiEtRmM6ig2GKFSSeCSHU4PA_U1   # Dryft Hold product

# --- A-roll: iPhone HLG (BT.2020) converted to SDR BT.709 (HLG is SDR-compatible, so gamut only, no tone map;
#     leaving HDR tags makes the renderer auto-promote the whole ad to HDR HEVC). Real footage at 1620x2880 (headroom for the 130% punch-in), last frame held 0.7s;
#     normalised voice (-14 LUFS, -1.5 dBTP) ---
ffmpeg -v error -y -i "$SRC/aroll.mov" -map 0:v:0 \
  -vf "zscale=min=bt2020nc:pin=bt2020:tin=bt709:rin=tv:m=bt709:p=bt709:t=bt709:r=tv,format=yuv420p,scale=1620:2880:flags=lanczos,fps=30,tpad=stop_mode=clone:stop_duration=0.7" \
  -c:v libx264 -crf 18 -g 30 -keyint_min 30 -pix_fmt yuv420p -color_primaries bt709 -color_trc bt709 -colorspace bt709 -an -movflags +faststart assets/sean-aroll.mp4
PRE="highpass=f=80,acompressor=threshold=-30dB:ratio=2.5:attack=8:release=120:makeup=1"
M=$(ffmpeg -hide_banner -i "$SRC/aroll.mov" -map 0:a:0 -af "$PRE,loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json" -f null - 2>&1 \
  | sed -n '/{/,/}/p' | python3 -I -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -v error -y -i "$SRC/aroll.mov" -map 0:a:0 -af "$PRE,loudnorm=I=-14:TP=-1.5:LRA=9:$M:linear=true" \
  -ar 48000 -c:a pcm_s16le assets/sean-vo.wav

# --- Shoptalk stage, full-screen 9:16 (6:03.3-6:05.5), crop follows Sean.
#     Real stage kept but defocused + highlights crushed so Rebuy's LED stats are illegible;
#     Sean stays sharp via a cleaned person matte (shallow depth-of-field look). ---
ffmpeg -v error -y -ss 363.3 -t 2.2 -i "$SRC/stage.vid" -an \
  -vf "crop=608:1080:x='min(1312\,max(0\,266+t*125))':y=0,scale=1080:1920:flags=lanczos,fps=30" \
  -c:v libx264 -crf 14 -g 30 -keyint_min 30 -pix_fmt yuv420p "$WORK/stage916.mp4"
npx hyperframes remove-background "$WORK/stage916.mp4" -o "$WORK/stage916-fg.mov"
# drop pink LED letters, neutral-white letters in the head band, and detached islands from the matte
G="if(gt(b(X,Y)-g(X,Y),22)*gt(r(X,Y)-g(X,Y),22)+lt(Y,720)*gt(min(min(r(X,Y),g(X,Y)),b(X,Y)),190)*lt(max(max(r(X,Y),g(X,Y)),b(X,Y))-min(min(r(X,Y),g(X,Y)),b(X,Y)),28),0,alpha(X,Y))"
ffmpeg -v error -i "$WORK/stage916-fg.mov" -vf "format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='$G',format=yuva444p,alphaextract,format=gray" \
  -f rawvideo - | python3 -I scripts/clean-matte.py 1080 1920 > "$WORK/stage916-alpha.raw"
ffmpeg -v error -y -i "$WORK/stage916.mp4" -i "$WORK/stage916-fg.mov" -f rawvideo -pix_fmt gray -s 1080x1920 -r 30 -i "$WORK/stage916-alpha.raw" \
  -filter_complex "[0:v]scale=27:48,gblur=sigma=1.5,scale=1080:1920:flags=bicubic,curves=all='0/0 0.2/0.11 1/0.15',huesaturation=saturation=-0.4[bn];[2:v]erosion,gblur=sigma=4[m];[1:v]format=yuva444p[c];[c][m]alphamerge[f];[bn][f]overlay=format=auto,format=yuv420p" \
  -c:v libx264 -crf 15 -g 30 -keyint_min 30 -pix_fmt yuv420p -an assets/broll-stage.mp4

# --- Event conversation + bundles product shot (portrait footage stored sideways: rotate 90° CW) ---
ffmpeg -v error -y -ss 2.8 -t 2.2 -i "$SRC/laptopman.vid" -an -vf "transpose=1,scale=1080:1920:flags=lanczos,fps=30" \
  -c:v libx264 -crf 16 -g 30 -keyint_min 30 -pix_fmt yuv420p assets/broll-laptop-convo.mp4
ffmpeg -v error -y -ss 9.8 -t 2.3 -i "$SRC/dryfthold.vid" -an -vf "transpose=1,scale=1080:1920:flags=lanczos,fps=30" \
  -c:v libx264 -crf 16 -g 30 -keyint_min 30 -pix_fmt yuv420p assets/broll-bundle.mp4

# --- Sean's shots baked at 1:1 from the 4K source (no browser scaling = no softness) ---
python3 -I scripts/bake-sean.py "$SRC/aroll.mov" assets/sean-program.mp4 916
python3 -I scripts/bake-sean.py "$SRC/aroll.mov" ../bf-webinar-ad-4x5/assets/sean-program.mp4 45
# bundles shot baked at its on-screen framing (9:16 and 4:5)
for spec in "assets/broll-bundle-baked.mp4 1920 -283" "../bf-webinar-ad-4x5/assets/broll-bundle-baked.mp4 1350 -543"; do
  set -- $spec
  ffmpeg -v error -y -ss 9.8 -t 2.3 -i "$SRC/dryfthold.vid" -f lavfi -i "color=c=0x06284C:s=1080x$2:r=30:d=2.3" \
    -filter_complex "[0:v]transpose=1,fps=30,scale=1253:2227:flags=lanczos[z];[1][z]overlay=x=-86:y=$3:shortest=1,format=yuv420p" \
    -c:v libx264 -crf 12 -g 30 -keyint_min 30 -pix_fmt yuv420p -an -movflags +faststart "$1"
done

# --- Final delivery: render lossless ProRes (PNG frame capture), then encode the MP4 ourselves.
#     A direct MP4 render captures frames as JPEG q80, which visibly degrades the A-roll.
#   npx hyperframes render --format mov --output renders/master-9x16.mov
#   ffmpeg -i renders/master-9x16.mov -c:v libx264 -preset slow -crf 14 -pix_fmt yuv420p \
#     -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a 256k -movflags +faststart BF-Webinar-Ad-9x16-final.mp4

# --- Sound design ---
python3 -I scripts/make-sfx.py assets/sfx.wav
echo "media ready"
