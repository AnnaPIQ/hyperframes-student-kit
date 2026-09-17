#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# prep-assets.sh — turn the two Drive masters into the render-ready assets.
#
#   bash scripts/prep-assets.sh
#
# Expects the masters in ../../.dl/ (see scripts/pull-media.sh):
#   montage-test.mp4   Sweet E - 30sec montage no audio.mp4   1080x1920 30fps 29.967s
#   sean-vo.mov        Copy of Sweet E's customized in Bulk.mov 3840x2160 ProRes 25fps 47.200s
#
# Emits into assets/:
#   montage-9x16.mp4      1080x1920  retimed to 38.53s (1156 frames @30fps)
#   montage-4x5.mp4       1080x1350  scale + navy pad (no crop — full frame kept)   [gitignored: derived]
#   montage-4x5-crop.mp4  1080x1350  centre crop (full-bleed alternative)          [gitignored: derived]
#   vo.m4a                41.90s     the complete voiceover, dead air trimmed
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
SRC="../../.dl"
NAVY="0x06284C"

# --- VO -------------------------------------------------------------------
# Measured on the master: speech occupies 2.88-43.60s; digital silence sits at
# 0-2.40 (-70 dB) and 44.30-47.20 (-74 dB). Keeping 2.40-44.30 = 41.90s gives
# the FULL read with ~0.45s of air at each end and no dead space.
VO_IN=2.40
VO_DUR=41.90
ffmpeg -v error -ss "$VO_IN" -t "$VO_DUR" -i "$SRC/sean-vo.mov" -vn \
  -af "highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=11" \
  -c:a aac -b:a 192k -ar 48000 -ac 2 -y assets/vo.m4a
echo "  vo.m4a            $(ffprobe -v error -show_entries format=duration -of csv=p=0 assets/vo.m4a)s"

# --- Montage ---------------------------------------------------------------
# The montage is 29.967s but has to carry the VO up to the end card at 38.10s
# (+0.50s of cross-dissolve underneath) = 38.60s. PTS 38.60/29.966667.
# Motion-compensated interpolation rather than frame duplication: at 0.776x a
# plain setpts gives a 5:4 frame cadence, which judders on the handheld shots.
PTS=1.288107
# The retime is the only slow step (~10 min), and its output is committed, so
# skip it when the asset is already there. Pass --force to rebuild it anyway.
if [ -s assets/montage-9x16.mp4 ] && [ "${1:-}" != "--force" ]; then
  echo "  = montage-9x16.mp4  already built (pass --force to redo the retime)"
else
ffmpeg -v error -i "$SRC/montage-test.mp4" -an \
  -vf "setpts=${PTS}*PTS,minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p -y assets/montage-9x16.mp4
echo "  montage-9x16.mp4  $(ffprobe -v error -show_entries format=duration -of csv=p=0 assets/montage-9x16.mp4)s"
fi

# 4:5 — scale + pad, per brief. The montage is 9:16 native with no wider
# master available, so filling 1080x1350 would mean cropping 30% of the height.
# Padding keeps every pixel of the frame; the bars are brand navy so they read
# as a matte against the composition's own navy canvas.
ffmpeg -v error -i assets/montage-9x16.mp4 -an \
  -vf "scale=759:1350:flags=lanczos,pad=1080:1350:(ow-iw)/2:0:color=${NAVY}" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p -y assets/montage-4x5.mp4
echo "  montage-4x5.mp4   $(ffprobe -v error -show_entries format=duration -of csv=p=0 assets/montage-4x5.mp4)s"

# 4:5 full-bleed alternative — centre crop, flagged in DESIGN.md §5.
ffmpeg -v error -i assets/montage-9x16.mp4 -an \
  -vf "crop=1080:1350:0:285" \
  -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p -y assets/montage-4x5-crop.mp4
echo "  montage-4x5-crop.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 assets/montage-4x5-crop.mp4)s"

echo "assets ready"
