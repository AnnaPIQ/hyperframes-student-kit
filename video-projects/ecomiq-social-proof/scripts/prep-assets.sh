#!/usr/bin/env bash
# =============================================================================
# prep-assets.sh — trim the VO and normalize B-roll to each delivery ratio.
#
# VO: the source has a record-button press + throat clear at 0.10-0.85s, then
# handling noise and room tone until speech starts at 3.62s; and after the last
# word decays (~40.10s) there is nothing but room tone to 43.0s. So we keep
# 3.50 -> 40.35 (36.85s), which leaves ~0.12s of clean pre-roll and lets the
# final word decay naturally. Loudness is normalized (the source peaks at
# -13.5 dB / averages -38.4 dB, too quiet to ship).
#
# B-roll: CROP TO FILL for both ratios (approved) -- the footage is a darkened
# backdrop behind graphics, so losing the edges is safe and it beats letterboxing.
#   9:16  the five transposed wholesaler clips are already 2160x3840 = exactly
#         9:16, so they only scale -- no crop at all. `product` is true 16:9 and
#         IS cropped hard (keeps the middle ~32% of frame width).
#   1:1   every clip is cropped.
#
# A-roll: prefers the 4K ProRes master (see the source-selection block below); the
# preview stream is only a fallback.
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.."
SCRATCH="${SCRATCH:-/tmp/claude-0/-home-user-hyperframes-student-kit/c3f63d15-29e1-5c18-be4c-357fef94fbef/scratchpad}"

# ---- source selection: ProRes master if we have it, else the preview stream ----
# The 2.5 GB master ("Dryft Sleep - Without spending a dollar more on ads..mov") is
# 3840x2160 ProRes 10-bit + 24-bit/48kHz LPCM. Drive rate-limits its download, so the
# build fell back to the transcoded preview (1920x1080 @ 1.4 Mbps, 128 kbps AAC) for a
# long while. When the quota lets the master through, PULL IT: at 1920 the 9:16 crop is
# only 608px wide and gets UPSCALED to 1080, which is the single biggest softness in the
# piece. At 3840 the same crop is 1216px and downsamples instead.
#
# The preview transcode carries 0.0363s of extra leading padding, so every master trim is
# shifted that much earlier and the DELIVERED TIMELINE IS UNCHANGED — every approved cue
# (the +59% count-up landing on the spoken figure, every whip, the end-card cut) still
# lands on the same word.
#
# How that number was arrived at, because two cheaper methods both got it wrong:
#   - an RMS/silencedetect onset comparison said 0.12s  -> WRONG by ~84ms
#   - a one-off absolute FFT correlation said 0.112s    -> WRONG (buggy normalisation)
# What worked: trim a candidate, then measure the produced file against the APPROVED
# render's audio with normalised FFT cross-correlation at 48kHz over several windows.
# Candidates responded perfectly linearly (3.3880 -> -75.71ms, 3.4260 -> -37.71ms,
# 3.4637 -> +0.00ms, 3.5000 -> +36.29ms; r=0.98-0.99, identical at every window), so
# 3.4637 is exact. Verify a re-prep the same way rather than trusting an onset estimate.
MASTER="${AROLL_MASTER:-$SCRATCH/aroll-master.mov}"
PREVIEW_LEAD=0.0363

TRIM_START=3.50
TRIM_END=40.35

if [ -f "$MASTER" ]; then
  echo "▶ using ProRes master: $MASTER"
  AROLL_IN="$MASTER"
  VO_IN="$MASTER"
  A_SS=$(echo "$TRIM_START - $PREVIEW_LEAD" | bc)
  A_TO=$(echo "$TRIM_END - $PREVIEW_LEAD" | bc)
  # 3840x2160: every offset is exactly double the 1920x1080 numbers below.
  # Sean's centre sits at x=1844 of 3840. Each window is centred on him:
  #   9:16 -> 1216 wide, 4:5 -> 1728 wide (2160*0.8), 1:1 -> 2160 wide.
  CROP_916="crop=1216:2160:1236:0"
  CROP_45="crop=1728:2160:980:0"
  CROP_11="crop=2160:2160:764:0"
else
  echo "▶ master not present — falling back to the preview stream (softer 9:16)"
  AROLL_IN=assets/aroll-src.mp4
  VO_IN=assets/vo/dryft-social-proof-vo.m4a
  A_SS="$TRIM_START"
  A_TO="$TRIM_END"
  CROP_916="crop=608:1080:618:0"
  CROP_45="crop=864:1080:490:0"
  CROP_11="crop=1080:1080:382:0"
fi

echo "▶ VO trim ${A_SS}s -> ${A_TO}s + loudness normalize"
ffmpeg -nostdin -y -hide_banner -loglevel error \
  -ss "$A_SS" -to "$A_TO" -i "$VO_IN" \
  -map a:0 -af "loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=in:st=0:d=0.06" \
  -ac 2 -ar 48000 -c:a aac -b:a 192k assets/vo/vo-trimmed.m4a
ffprobe -v error -show_entries format=duration -of csv=p=0 assets/vo/vo-trimmed.m4a

# norm <name> <9:16 filter> <4:5 filter> <1:1 filter>
norm() {
  local name=$1 v916=$2 v45=$3 v11=$4
  echo "▶ $name"
  ffmpeg -nostdin -y -hide_banner -loglevel error -i "assets/broll/${name}-src.mp4" \
    -vf "$v916,setsar=1" -an -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    "assets/broll/9x16/${name}.mp4"
  ffmpeg -nostdin -y -hide_banner -loglevel error -i "assets/broll/${name}-src.mp4" \
    -vf "$v45,setsar=1" -an -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    "assets/broll/4x5/${name}.mp4"
  ffmpeg -nostdin -y -hide_banner -loglevel error -i "assets/broll/${name}-src.mp4" \
    -vf "$v11,setsar=1" -an -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    "assets/broll/1x1/${name}.mp4"
}
mkdir -p assets/broll/9x16 assets/broll/4x5 assets/broll/1x1

# The five transposed clips are already 2160x3840, so 9:16 is a pure scale.
# For 1:1 the crop window is biased DOWN per clip: these were shot with the
# subject low in the vertical frame, so a plain centre crop decapitates them.
# Offsets picked by eye off the frame sweep (420 = centre, larger = lower).
#   walking / excited  -> 420  (faces sit high; lower crops cut them)
#   storefront / suppliers / shelf -> 620  (subject sits low)
# Every clip scales to 1080 wide (=1920 tall) first, then the shorter frames crop
# from that. y is the TOP of the window, so the same subject centre is a different
# y per ratio: 1:1 keeps 1080 of 1920 (centre = y+540), 4:5 keeps 1350 (centre =
# y+675). The two centres in use are 960 (frame centre) and 1160 (200px lower).
VERT_916="scale=1080:1920"
vert45() { echo "scale=1080:-2,crop=1080:1350:0:$1"; }   # 285 -> centre 960, 485 -> 1160
vert11() { echo "scale=1080:-2,crop=1080:1080:0:$1"; }   # 420 -> centre 960, 620 -> 1160

# The three exterior/shopfront clips are shot into shade and sit ~75-81 mean luma
# vs ~138-148 for the interior ones. Under a navy scrim they crush to near-black,
# so lift them before the scrim ever touches them.
LIFT="eq=brightness=0.07:contrast=1.08:saturation=1.06,"

norm walking      "$VERT_916"      "$(vert45 285)"        "$(vert11 420)"
norm walking-late "$VERT_916"      "$(vert45 285)"        "$(vert11 420)"   # in the cut at 9.2s
norm excited    "$VERT_916"        "$(vert45 285)"        "$(vert11 420)"
norm storefront "$LIFT$VERT_916"   "$LIFT$(vert45 485)"   "$LIFT$(vert11 620)"
norm suppliers  "$LIFT$VERT_916"   "$LIFT$(vert45 485)"   "$LIFT$(vert11 620)"
norm shelf      "$LIFT$VERT_916"   "$LIFT$(vert45 485)"   "$LIFT$(vert11 620)"

norm product    "$VERT_916"        "$(vert45 285)"        "$(vert11 420)"

# ---- A-roll: crop the 1920x1080 talking head to each delivery ratio ----------
# Trimmed to the SAME 3.50-40.35 window as the VO, so lip sync is exact, and
# MUTED — the mix takes its audio from the separate <audio> element.
# Sean sits slightly left of centre: the subject centres on x=922 of 1920, so
# 9:16 crops 608 wide from x=618 and 1:1 crops 1080 wide from x=382. Framing
# was checked across the whole clip; a fixed window holds throughout.
# CRF 18 (~11 Mbps at 1080x1920), not 16: the intermediate only has to stay comfortably
# above the ~8.4 Mbps delivery bitrate, and the 4K-sourced detail makes CRF 16 cost 96 MB
# — twice the size for headroom the final encode never uses.
echo "▶ A-roll 9:16"
ffmpeg -nostdin -y -hide_banner -loglevel error \
  -ss "$A_SS" -to "$A_TO" -i "$AROLL_IN" \
  -map v:0 -an -vf "$CROP_916,scale=1080:1920:flags=lanczos,setsar=1" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p assets/broll/9x16/aroll.mp4
echo "▶ A-roll 4:5"
ffmpeg -nostdin -y -hide_banner -loglevel error \
  -ss "$A_SS" -to "$A_TO" -i "$AROLL_IN" \
  -map v:0 -an -vf "$CROP_45,scale=1080:1350:flags=lanczos,setsar=1" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p assets/broll/4x5/aroll.mp4
echo "▶ A-roll 1:1"
ffmpeg -nostdin -y -hide_banner -loglevel error \
  -ss "$A_SS" -to "$A_TO" -i "$AROLL_IN" \
  -map v:0 -an -vf "$CROP_11,scale=1080:1080:flags=lanczos,setsar=1" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p assets/broll/1x1/aroll.mp4

echo "✅ prepped"
for d in 9x16 4x5 1x1; do
  echo "--- $d ---"
  for f in assets/broll/$d/*.mp4; do
    printf '%-34s %s\n' "$f" "$(ffprobe -v error -select_streams v:0 \
      -show_entries stream=width,height -show_entries format=duration -of csv=p=0 "$f" | paste -sd' ')"
  done
done
