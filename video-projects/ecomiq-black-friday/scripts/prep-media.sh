#!/usr/bin/env bash
# =============================================================================
# prep-media.sh — normalise AND tighten the Black Friday A-roll.
#
#   bash scripts/prep-media.sh /path/to/raw-aroll.mov
#
# Source A-roll (Drive): "2c: Social Black Friday - start now V2.mov"
#   3840x2160 ProRes · 25 fps · PCM s24be · 43.08s
#
# Facts this script encodes (probed, not guessed):
#   • Speech runs 1.34s -> 40.32s in the source. Sean looks off-take from ~41s.
#   • 16:9 -> 9:16 / 4:5 needs a CENTRE CROP, not scale+pad. Sean is centred,
#     and cropping from 4K is resolution-safe (no upscaling in either ratio):
#       9:16  crop 1215x2160 @x=1312  -> 1080x1920
#       4:5   crop 1728x2160 @x=1056  -> 1080x1350
#   • Video is written MUTED (-an). Audio ships as a sibling track so the
#     HyperFrames mixer owns it (render contract rule 5).
#
# DEAD AIR
# --------
# The raw take carries ~3.8s of silence between phrases. Those gaps are spliced
# out here, keeping a short breath in each so the delivery still lands. Video
# and audio are cut by the same select/aselect expression, so they cannot drift.
#
#   source gap      kept   why
#   8.89–9.29       0.16   Q1 | Q2
#   11.65–12.29     0.16   Q2 | Q3
#   16.54–17.20     0.16   Q3 | "Once you know these numbers"
#   20.89–22.27     0.35   the rhetorical beat before the list — kept longer
#   29.57–30.35     0.18   "not guessing" | "that's where I'd start"
#   34.50–35.31     0.18   "ad account" | "We've put the full process"
#   39.01–39.51     0.16   "workbook" | "Link is below"
#
# Head trimmed to 1.14s (0.20s breath before the first word); tail to 40.48s
# (0.16s after the last word, well clear of the off-take look-down).
#
# Result: 35.52s of A-roll, down from 39.40s uncut.
# Each splice is a jump cut on Sean; the composition covers or accepts each one.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

RAW="${1:?usage: prep-media.sh <raw-aroll.mov>}"
[ -f "$RAW" ] || { echo "✗ not found: $RAW" >&2; exit 1; }

# Keep-ranges in SOURCE seconds. Edit here and the beat map in EDIT-PLAN.md
# must be recomputed to match.
KEEP="between(t,1.14,9.05)+between(t,9.29,11.81)+between(t,12.29,16.70)\
+between(t,17.20,21.24)+between(t,22.27,29.75)+between(t,30.35,34.68)\
+between(t,35.31,39.17)+between(t,39.51,40.48)"

OUT=assets
mkdir -p "$OUT"

echo "▶ Normalising + tightening A-roll (single decode, three outputs)…"
ffmpeg -hide_banner -v warning -stats -i "$RAW" \
  -filter_complex "\
    [0:v]select='${KEEP}',setpts=N/FRAME_RATE/TB,split=2[vsa][vsb];\
    [vsa]crop=1215:2160:1312:0,scale=1080:1920:flags=lanczos,fps=30,setsar=1[v916];\
    [vsb]crop=1728:2160:1056:0,scale=1080:1350:flags=lanczos,fps=30,setsar=1[v45];\
    [0:a]aselect='${KEEP}',asetpts=N/SR/TB[aout]" \
  -map "[v916]" -an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
    -movflags +faststart -y "$OUT/aroll-916.mp4" \
  -map "[v45]"  -an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
    -movflags +faststart -y "$OUT/aroll-45.mp4" \
  -map "[aout]" -c:a aac -b:a 256k -ar 48000 -ac 2 -y "$OUT/aroll-audio.m4a"

echo "✓ done:"
for f in "$OUT"/aroll-916.mp4 "$OUT"/aroll-45.mp4 "$OUT"/aroll-audio.m4a; do
  printf '   %-28s %ss\n' "$(basename "$f")" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")"
done
