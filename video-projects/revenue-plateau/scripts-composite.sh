#!/usr/bin/env bash
# Composite the chroma-key graphics layer over the footage base track.
# Usage: bash scripts-composite.sh [graphics-key.mp4] [out.mp4]
set -euo pipefail
cd "$(dirname "$0")"
KEY="${1:-renders/graphics-key.mp4}"
OUT="${2:-renders/revenue-plateau-final.mp4}"

# 1. base track: founder 0-86.5 -> desk 86.5-93 (dimmed), Dryft overlay 57.5-65.5
ffmpeg -y -hide_banner -loglevel error -stats \
  -i assets/founder-broll.mp4 -i assets/founder-desk.mp4 -i assets/dryft-cut.mp4 \
  -filter_complex "\
    [0:v]trim=0:86.5,setpts=PTS-STARTPTS,fps=30,scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350[fv]; \
    [1:v]trim=0:6.5,setpts=PTS-STARTPTS,fps=30,scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350,eq=brightness=-0.12:saturation=0.9,colorbalance=bs=0.08[dv]; \
    [fv][dv]concat=n=2:v=1:a=0[basev]; \
    [2:v]trim=0:8,setpts=PTS-STARTPTS,fps=30,fade=t=in:st=0:d=0.4,fade=t=out:st=7.6:d=0.4,setpts=PTS-STARTPTS+57.5/TB[dry]; \
    [basev][dry]overlay=enable='between(t,57.5,65.5)':eof_action=pass[base]" \
  -map "[base]" -t 93 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p renders/_base.mp4

# 2. chroma-key graphics over base + mux VO
ffmpeg -y -hide_banner -loglevel error -stats \
  -i renders/_base.mp4 -i "$KEY" -i assets/founder-vo.m4a \
  -filter_complex "\
    [1:v]colorkey=0x00D700:0.30:0.10,despill=type=green:mix=0.5:expand=0.3[ck]; \
    [0:v][ck]overlay=format=auto,format=yuv420p[outv]" \
  -map "[outv]" -map 2:a -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -movflags +faststart -c:a aac -b:a 192k -t 93 "$OUT"
echo "wrote $OUT"
