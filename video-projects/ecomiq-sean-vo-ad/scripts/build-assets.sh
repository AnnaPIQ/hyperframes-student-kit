#!/usr/bin/env bash
# =============================================================================
# build-assets.sh — cut the picture bed + VO from the raw Drive masters.
#
#   bash scripts/build-assets.sh
#
# Run from video-projects/ecomiq-sean-vo-ad/. Reads the raw masters out of the
# workspace-level assets/incoming/ (gitignored) and writes render-ready assets
# into this project's assets/.
#
# Everything here is deterministic and re-runnable — see EDIT-PLAN.md for the
# reasoning behind every timestamp.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

IN="../../assets/incoming"
OUT="assets"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

SRC_916="$IN/montage-raw.mp4"          # 1080x1920 native
SRC_SQ="$IN/montage-square-raw.mp4"    # 1440x1440 native
SRC_VO="$IN/sean-raw.mov"              # 3840x2160 ProRes, PCM 48k

for f in "$SRC_916" "$SRC_SQ" "$SRC_VO"; do
  [ -f "$f" ] || { echo "✗ missing source: $f" >&2; exit 1; }
done

# ---------------------------------------------------------------------------
# 1. Voiceover — Sean's speech only.
#    Source speech runs 3.26 -> 39.14; we take 3.100 -> 39.300 for a 0.16s
#    handle either side. Montage audio is never used.
# ---------------------------------------------------------------------------
VO_IN=3.100
VO_DUR=36.200
echo "▶ VO  ${VO_IN}s +${VO_DUR}s"
ffmpeg -hide_banner -v error -y -ss "$VO_IN" -i "$SRC_VO" -t "$VO_DUR" \
  -vn -ac 2 -ar 48000 -c:a pcm_s16le \
  -af "afade=t=in:st=0:d=0.12,afade=t=out:st=36.02:d=0.18" \
  "$OUT/sean-vo.wav"

# ---------------------------------------------------------------------------
# 1b. A-roll PiP — Sean's head, square, ready for a CSS circle mask.
#     Cut from the SAME in-point as the VO (3.100) so lips track his voice with
#     no offset. Source is 25 fps; conformed to 30 to match the composition.
#     Crop window 1550x1550 @ (1090, 36) is centred on his FACE, not the head's
#     visual mass — his long hair pulls the bounding box right, so centring on
#     that leaves him visibly off-centre once masked. The origin comes from a
#     skin-tone centroid measured over 68 frames spanning the whole take:
#     median face centre (1865, 734), drift sd 43px. Eyeballing single frames
#     got this wrong twice; measure it.
#     Width is deliberate too — a tighter crop lands entirely on the brightest
#     patch of his blue set wall and reads as a flat disc, where 1550 keeps
#     enough of the room for the blue to fall off.
# ---------------------------------------------------------------------------
PIP_DUR=34.100
echo "▶ PiP  ${VO_IN}s +${PIP_DUR}s"
ffmpeg -hide_banner -v error -y -ss "$VO_IN" -i "$SRC_VO" -t "$PIP_DUR" \
  -vf "crop=1550:1550:1090:36,scale=720:720:flags=lanczos,setsar=1,fps=30" \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -an \
  -movflags +faststart "$OUT/sean-pip.mp4"

# Silent, duckable music-bed placeholder — swap in a real bed, keep the name.
echo "▶ music bed placeholder (silent)"
ffmpeg -hide_banner -v error -y -f lavfi -i anullsrc=r=48000:cl=stereo \
  -t 37.600 -c:a pcm_s16le "$OUT/music-bed.wav"

# ---------------------------------------------------------------------------
# 2. Picture bed — the reel ONCE, retimed to fill the voiceover.
#
#    Usable reel picture is 0 -> 27.733 (its own built-in end card starts there).
#    Picture is needed to 34.100, so the whole reel is slowed to 0.813x speed
#    (setpts x1.22957). It plays through exactly once — no shot is reprised.
#
#    Slowing is done with MOTION INTERPOLATION, not frame duplication: a 22.8%
#    stretch at 30 fps would otherwise double roughly every 4th frame and judder
#    on the camera moves. minterpolate's scene-change detection handles the
#    reel's 37 hard cuts cleanly — verified frame-by-frame across a cut, with no
#    smearing between shots.
#
#    This is the slow step in the build (~10 min per ratio). Worth it.
# ---------------------------------------------------------------------------
REEL_END=27.733333          # where the reel's own end card begins
BED_DUR=34.100              # picture needed: card at 33.700 + 0.35s dissolve + handle
PTS=1.22957                 # BED_DUR / REEL_END

build_bed() {
  local src="$1" out="$2" w="$3" h="$4"
  echo "▶ bed ${w}x${h} (reel once, ${PTS}x slower)  ->  $out"
  # -t BEFORE -i limits the INPUT read. After -i it would cap the OUTPUT, which
  # silently truncates the slowed bed back to the source length.
  ffmpeg -hide_banner -v error -y -t "$REEL_END" -i "$src" \
    -vf "scale=${w}:${h}:flags=lanczos,setsar=1,setpts=${PTS}*PTS,minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" \
    -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -an \
    -movflags +faststart "$out"
  printf '  ✓ %s  %ss\n' "$out" \
    "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out")"
}

build_bed "$SRC_916" "$OUT/bed-916.mp4"    1080 1920
build_bed "$SRC_SQ"  "$OUT/bed-square.mp4" 1080 1080

echo
echo "✅ assets built:"
ls -la "$OUT"/sean-vo.wav "$OUT"/sean-pip.mp4 "$OUT"/music-bed.wav "$OUT"/bed-916.mp4 "$OUT"/bed-square.mp4
