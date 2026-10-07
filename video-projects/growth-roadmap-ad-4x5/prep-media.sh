#!/usr/bin/env bash
# Rebuild this project's footage from the camera originals at master quality.
# aroll-916.mp4 (~330 MB) is too large for GitHub, so it is regenerated here, not committed.
#   bash prep-media.sh /path/to/"Ad - Make \$100k months the target | Discovery call.mov" /path/to/broll-dir
# Rules learned the hard way: CRF 14 (never 23) for intermediates, native fps (25 for the A-roll),
# 1s keyframes (-g) so the renderer can seek, and keep the camera's 0.089s audio start offset.
set -euo pipefail
cd "$(dirname "$0")"
MOV="$1"; B="${2:-}"
ffmpeg -y -i "$MOV" -vf "crop=1216:2160:1370:0,format=yuv420p" -c:v libx264 -preset slow -crf 14 -tune film -g 25 -keyint_min 25 -an -movflags +faststart assets/aroll-916.mp4
ffmpeg -y -i "$MOV" -vn -af "aresample=async=1:first_pts=0,highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=9" -ac 2 -ar 48000 -c:a aac -b:a 192k assets/vo.m4a
[ -z "$B" ] && exit 0
cut(){ ffmpeg -y -ss "$2" -t "$3" -i "$B/$1" -vf "$4,format=yuv420p" -c:v libx264 -preset slow -crf 14 -tune film -g 12 -keyint_min 12 -an -movflags +faststart "assets/broll/$5.mp4"; }
cut angle-laptop  4.4 2.0 "transpose=1,scale=1080:1920:flags=lanczos" b1-angle-laptop
cut hotel-laptop  2.8 1.8 "scale=1080:1920:flags=lanczos"             b2-hotel-laptop
cut shoptalk-stage 14.2 1.4 "crop=608:1080:496:0,scale=1080:1920:flags=lanczos" b3-shoptalk-stage
cut klaviyo-walk  5.4 1.4 "scale=1080:1920:flags=lanczos"             b4-klaviyo-event
cut mason-2women  4.8 1.6 "transpose=1,scale=1080:1920:flags=lanczos" b5-mason-team
cut laptop-man    2.8 1.8 "transpose=1,scale=1080:1920:flags=lanczos" b6-laptop-man
cut handshake     7.8 1.6 "transpose=1,scale=1080:1920:flags=lanczos" b7-handshake
# Final masters: npx hyperframes render --fps 25 --video-bitrate 16M --output renders/<name>.mp4
