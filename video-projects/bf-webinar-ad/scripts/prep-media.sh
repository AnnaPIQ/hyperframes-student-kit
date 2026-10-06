#!/usr/bin/env bash
# Rebuild every derived media asset for bf-webinar-ad from the Drive sources.
# Run from the project folder:  bash scripts/prep-media.sh
# Needs: ffmpeg, python3 + numpy, npx hyperframes (remove-background, ~15 min on CPU).
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

# --- A-roll: 1080x1920 30fps picture, normalised voice (-14 LUFS, -1.5 dBTP) ---
ffmpeg -v error -y -i "$SRC/aroll.mov" -map 0:v:0 -vf "scale=1080:1920:flags=lanczos,fps=30" \
  -c:v libx264 -crf 16 -pix_fmt yuv420p -an "$WORK/aroll-1080.mp4"
PRE="highpass=f=80,acompressor=threshold=-30dB:ratio=2.5:attack=8:release=120:makeup=1"
M=$(ffmpeg -hide_banner -i "$SRC/aroll.mov" -map 0:a:0 -af "$PRE,loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json" -f null - 2>&1 \
  | sed -n '/{/,/}/p' | python3 -I -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -v error -y -i "$SRC/aroll.mov" -map 0:a:0 -af "$PRE,loudnorm=I=-14:TP=-1.5:LRA=9:$M:linear=true" \
  -ar 48000 -c:a pcm_s16le assets/sean-vo.wav

# --- Sean cutout (alpha WebM), edge choked 1px to remove wall halo ---
npx hyperframes remove-background "$WORK/aroll-1080.mp4" -o "$WORK/sean-cutout-raw.webm" --quality best
ffmpeg -v error -y -c:v libvpx-vp9 -i "$WORK/sean-cutout-raw.webm" -filter_complex \
  "[0:v]format=yuva420p,split[c][a];[a]alphaextract,erosion,gblur=sigma=1.2[m];[c][m]alphamerge,format=yuva420p" \
  -c:v libvpx-vp9 -pix_fmt yuva420p -crf 26 -b:v 0 -deadline good -cpu-used 4 -row-mt 1 -auto-alt-ref 0 -an assets/sean-cutout.webm
ffmpeg -v error -y -c:v libvpx-vp9 -sseof -0.05 -i assets/sean-cutout.webm -frames:v 1 assets/sean-last-frame.png

# --- Shoptalk stage card: 6:03.3-6:05.5, Rebuy LED stats made illegible ---
ffmpeg -v error -y -ss 363.3 -t 2.2 -i "$SRC/stage.vid" -an -vf "crop=810:1080:400:0,scale=840:1120:flags=lanczos,fps=30" \
  -c:v libx264 -crf 14 -pix_fmt yuv420p "$WORK/stage-crop.mp4"
npx hyperframes remove-background "$WORK/stage-crop.mp4" -o "$WORK/stage-fg.mov"
# drop pink LED letters, neutral-white letters in the head band, and detached islands from the matte
G="if(gt(b(X,Y)-g(X,Y),22)*gt(r(X,Y)-g(X,Y),22)+lt(Y,430)*gt(min(min(r(X,Y),g(X,Y)),b(X,Y)),190)*lt(max(max(r(X,Y),g(X,Y)),b(X,Y))-min(min(r(X,Y),g(X,Y)),b(X,Y)),28),0,alpha(X,Y))"
ffmpeg -v error -i "$WORK/stage-fg.mov" -vf "format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='$G',format=yuva444p,alphaextract,format=gray" \
  -f rawvideo - | python3 -I scripts/clean-matte.py 840 1120 > "$WORK/stage-alpha.raw"
ffmpeg -v error -y -i "$WORK/stage-crop.mp4" -i "$WORK/stage-fg.mov" -f rawvideo -pix_fmt gray -s 840x1120 -r 30 -i "$WORK/stage-alpha.raw" \
  -f lavfi -i "color=c=0x06284C@0.5:s=840x1120:r=30" -filter_complex \
  "[0:v]scale=105:140,gblur=sigma=6,scale=840:1120:flags=bicubic[b];[b][3:v]overlay=shortest=1[bn];[2:v]erosion,gblur=sigma=1.5[m];[1:v]format=yuva444p[c];[c][m]alphamerge[f];[bn][f]overlay=format=auto,format=yuv420p" \
  -c:v libx264 -crf 15 -pix_fmt yuv420p -an assets/broll-stage.mp4

# --- Event conversation card + bundles product shot (portrait footage stored sideways: rotate 90° CW) ---
ffmpeg -v error -y -ss 2.8 -t 2.2 -i "$SRC/laptopman.vid" -an -vf "transpose=1,crop=2160:2880:0:600,scale=840:1120:flags=lanczos,fps=30" \
  -c:v libx264 -crf 16 -pix_fmt yuv420p assets/broll-laptop-convo.mp4
ffmpeg -v error -y -ss 9.8 -t 2.3 -i "$SRC/dryfthold.vid" -an -vf "transpose=1,scale=1080:1920:flags=lanczos,fps=30" \
  -c:v libx264 -crf 16 -pix_fmt yuv420p assets/broll-bundle.mp4

# --- Sound design ---
python3 -I scripts/make-sfx.py assets/sfx.wav
echo "media ready"
