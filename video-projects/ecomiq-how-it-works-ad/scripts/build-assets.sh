#!/usr/bin/env bash
# =============================================================================
# build-assets.sh — derive every render bed for ecomiq-how-it-works-ad.
#
#   bash scripts/build-assets.sh            # from the PROJECT folder
#
# Beds are derived, not committed (see .gitignore). Re-run this after pulling
# the repo to regenerate them from the three sources in ../../assets/incoming/.
#
# Inputs (repo-root assets/incoming/):
#   speaker-raw.mov        ProRes 422 3840x2160 25fps 79.000s, PCM s24 48k stereo
#   showcase-reel-raw.mp4  H.264 1080x1920 30fps 891f 29.721s   (9:16 master)
#   showcase-1-1-raw.mp4   H.264 1440x1440 30fps 891f 29.721s   (1:1  master)
#
# Outputs (assets/):
#   vo.wav           voiceover bed, head-trimmed, 76.4333s mono 48k
#   music-bed.wav    SILENT placeholder, 76.4333s stereo 48k  (data-volume="0")
#   pip.mp4          circular-ready speaker plate, 71.4333s, 480x480, muted
#   montage-916.mp4  1080x1920  montage at NATIVE speed, 27.7333s (832f), muted
#   montage-11.mp4   1080x1080  ditto
#   montage-45.mp4   1080x1350  ditto
#
# Key numbers (all derived in EDIT-PLAN.md, frame-exact at 30 fps):
#   VO head trim      1.931s  -> speech starts at 0.198s
#   Card trigger      71.4333s = frame 2143  ("Tap the link below and book a call")
#   Total runtime     76.4333s = frame 2293  (card holds 5.000s)
#   Montage        src frames 0-831 (27.7333s) at NATIVE SPEED - no retime.
#                     Split across three clips in the compositions:
#                       M1  ad  0.000- 6.800s  <- bed  0.000- 6.800s  (204f)
#                       M2  ad 20.600-25.000s  <- bed  6.800-11.200s  (132f)
#                       M3  ad 54.900-71.4333s <- bed 11.200-27.7333s (496f)
#                     204+132+496 = 832 = every source frame, once, in order.
#                     Motion graphics carry the other 43.7s. Retiming was
#                     removed outright: a per-shot variable stretch made the
#                     montage speed up and slow down shot to shot, which reads
#                     as broken. See docs/LESSONS.md.
#                     The masters' own baked EcomIQ end card (src 27.733-29.721s)
#                     is deliberately NOT used - it would duplicate our card.
#
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

FPS=30
# --- the container offset that matters -------------------------------------
# speaker-raw.mov: video stream starts at PTS 0, AUDIO starts at PTS 0.074563
# (start_pts=3579 @ 1/48000). Every transcript timing was measured off a
# straight `-vn` WAV dump, which discards that offset — so transcript time
# t maps to .mov audio PTS t + 0.074563.
# Both trims below run on the .mov PTS timeline, so A/V stays locked exactly as
# it is in the source. Trimming after an asetpts reset would silently shift the
# VO 0.0746s (2 frames) against the picture.
#   trigger line, transcript timeline : 73.291
#   trigger line, .mov audio PTS      : 73.365
#   wanted at                          : 71.4333  (frame 2143)
#   => VO_TRIM                         : 1.931063
# Speech then lands at 0.198s, as planned.
VO_TRIM=1.931063
TOTAL=76.433333      # frame 2293
CARD=71.433333       # frame 2143
FADE_OUT_AT=76.033333
MONT_FRAMES=832    # native montage bed: every live source frame, once
VO_END=78.364396    # VO_TRIM + TOTAL
PIP_END=73.364396   # VO_TRIM + CARD

IN="../../assets/incoming"
OUT="assets"
WORK=".build-work"

SPK="$IN/speaker-raw.mov"
M916="$IN/showcase-reel-raw.mp4"
M11="$IN/showcase-1-1-raw.mp4"

c_b=$'\033[1;36m'; c_g=$'\033[1;32m'; c_r=$'\033[1;31m'; c_o=$'\033[0m'
say(){ printf '%s▶ %s%s\n' "$c_b" "$1" "$c_o"; }
ok(){  printf '%s  ✓ %s%s\n' "$c_g" "$1" "$c_o"; }
die(){ printf '%s✗ %s%s\n' "$c_r" "$1" "$c_o" >&2; exit 1; }

for f in "$SPK" "$M916" "$M11"; do
  [ -f "$f" ] || die "missing input: $f"
done
mkdir -p "$OUT" "$WORK"

FORCE=0
[ "${1:-}" = "--force" ] && FORCE=1
# Skip a bed that is already built (the PiP step is a 6-minute 4K ProRes
# decode). Pass --force to rebuild everything.
have() { [ "$FORCE" -eq 0 ] && [ -s "$1" ] && { ok "$1 (exists, skipping)"; return 0; }; return 1; }

# ---------------------------------------------------------------- audio beds --
if ! have "$OUT/vo.wav"; then
say "VO bed  (trim ${VO_TRIM}s head, ${TOTAL}s, mono 48k)"
# atrim, NOT -ss: input seeking on this ProRes container snapped and
# under-trimmed by 0.075s, which pushed the trigger line 2 frames late
# (docs/LESSONS.md, ffmpeg gotchas). The filter is sample-exact.
ffmpeg -y -nostdin -v error -i "$SPK" -vn -ac 1 -ar 48000 \
  -af "atrim=start=${VO_TRIM}:end=${VO_END},asetpts=N/SR/TB,afade=t=in:st=0:d=0.12,afade=t=out:st=${FADE_OUT_AT}:d=0.4" \
  -c:a pcm_s16le "$OUT/vo.wav"
ok "assets/vo.wav"
fi

# Silent placeholder. Duck targets for a real bed: 0.13 under speech, 0.35 over
# the card. Swap the file in at this path and raise data-volume in the comps.
if ! have "$OUT/music-bed.wav"; then
say "music bed (SILENT placeholder, ${TOTAL}s stereo 48k)"
ffmpeg -y -nostdin -v error -f lavfi -i anullsrc=r=48000:cl=stereo -t "$TOTAL" \
  -c:a pcm_s16le "$OUT/music-bed.wav"
ok "assets/music-bed.wav"
fi

# ------------------------------------------------------------------ PiP plate --
# Head-and-shoulders square off the 4K plate, verified to hold the head inside
# the circle at t=3,12,25,38,50,62,74s. 25 -> 30 fps by duplication only, so
# duration and lip-sync are preserved. Same trim as the VO, so it stays in sync.
if ! have "$OUT/pip.mp4"; then
say "PiP plate (crop 1320 square -> 480x480, 25->30fps, ${CARD}s, muted)"
# Same exact-trim treatment as the VO so the two cannot drift apart. The 25fps
# source snaps the in-point to the nearest frame (<1 frame of offset at 30fps).
ffmpeg -y -nostdin -v error -i "$SPK" -an \
  -vf "trim=start=${VO_TRIM}:end=${PIP_END},setpts=PTS-STARTPTS,crop=1320:1320:1140:190,scale=480:480,fps=${FPS},setsar=1" \
  -frames:v 2143 \
  -c:v libx264 -profile:v high -crf 16 -preset medium -pix_fmt yuv420p \
  -movflags +faststart "$OUT/pip.mp4"
ok "assets/pip.mp4"
fi

# -------------------------------------------------------------- montage beds --
# NATIVE SPEED. The live picture is source frames 0-831; the masters' own baked
# EcomIQ end card (27.733-29.721s) is excluded so it cannot duplicate ours.
#
# There is deliberately NO retiming here. An earlier cut stretched this montage
# to cover the whole runtime, first uniformly (2.58x) and then per shot
# (1.20-2.47x, allocated by motion energy). The per-shot version was worse: the
# picture visibly sped up and slowed down from shot to shot. Playing every frame
# once at native speed is the only setting that cannot read as wrong, so the
# graphics section was extended until the montage fit at 1.0x.
native_bed() {
  local label="$1" src="$2" post="$3" out="$4"

  ffmpeg -y -nostdin -v error -i "$src" -an \
    -vf "trim=start_frame=0:end_frame=${MONT_FRAMES},setpts=N/${FPS}/TB,${post}" \
    -frames:v "$MONT_FRAMES" \
    -c:v libx264 -profile:v high -crf 14 -preset medium -pix_fmt yuv420p \
    -movflags +faststart "$out"

  local got
  got=$(ffprobe -v error -count_frames -select_streams v:0 \
        -show_entries stream=nb_read_frames -of csv=p=0 "$out")
  [ "$got" = "$MONT_FRAMES" ] || die "$label: got $got frames, expected $MONT_FRAMES"
  ok "$out  (${got} frames, native speed)"
}

say "montage 9:16  (1080x1920, native)"
have "$OUT/montage-916.mp4" || native_bed "916" "$M916" "setsar=1" "$OUT/montage-916.mp4"

say "montage 1:1   (1440 -> 1080)"
have "$OUT/montage-11.mp4" || native_bed "11" "$M11" "scale=1080:1080,setsar=1" "$OUT/montage-11.mp4"

# No native 4:5 master. Derived from the 1:1 (loses 20% width) rather than the
# 9:16 (would lose 29.7% height). See EDIT-PLAN.md.
say "montage 4:5   (1440 -> 1350 tall, centre-crop to 1080 wide)"
have "$OUT/montage-45.mp4" || native_bed "45" "$M11" "scale=1350:1350,crop=1080:1350:135:0,setsar=1" "$OUT/montage-45.mp4"

rmdir "$WORK" 2>/dev/null || true

printf '\n%s✅ beds built%s\n' "$c_g" "$c_o"
ls -la "$OUT"/vo.wav "$OUT"/music-bed.wav "$OUT"/pip.mp4 "$OUT"/montage-*.mp4
