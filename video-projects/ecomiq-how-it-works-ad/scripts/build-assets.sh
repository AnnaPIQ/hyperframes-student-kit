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
#   montage-916.mp4  1080x1920  retimed montage, 48.0333s (1441f), muted
#   montage-11.mp4   1080x1080  ditto
#   montage-45.mp4   1080x1350  ditto
#
# Key numbers (all derived in EDIT-PLAN.md, frame-exact at 30 fps):
#   VO head trim      1.931s  -> speech starts at 0.198s
#   Card trigger      71.4333s = frame 2143  ("Tap the link below and book a call")
#   Total runtime     76.4333s = frame 2293  (card holds 5.000s)
#   Montage live      src frames 0-831 (27.7333s) -> 1441 frames (48.0333s)
#                     Split across two clips in the compositions:
#                       A  ad 0.000-31.500s   <- bed 0.000-31.500s
#                       B  ad 54.900-71.4333s <- bed 31.500-48.0333s
#                     The motion-graphics section carries 31.500-54.900s, which
#                     is what drops the retime from 2.58x to 1.73x.
#                     The masters' own baked EcomIQ end card (src 27.733-29.721s)
#                     is deliberately NOT used - it would duplicate our card.
#
# The montage is retimed PER SHOT, not uniformly: stretch is allocated inversely
# to measured motion energy so near-static shots absorb the slack and moving
# shots stay closer to native. Table: scripts/retime-shots.tsv (37 rows, sums to
# exactly 1441 frames). Retiming is frame duplication - no interpolation, so
# there are no morph artefacts.
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
MONT_FRAMES=1441   # retimed montage bed: 832 src frames -> 1441 (48.0333s)
VO_END=78.364396    # VO_TRIM + TOTAL
PIP_END=73.364396   # VO_TRIM + CARD

IN="../../assets/incoming"
OUT="assets"
TSV="scripts/retime-shots.tsv"
WORK=".build-work"

SPK="$IN/speaker-raw.mov"
M916="$IN/showcase-reel-raw.mp4"
M11="$IN/showcase-1-1-raw.mp4"

c_b=$'\033[1;36m'; c_g=$'\033[1;32m'; c_r=$'\033[1;31m'; c_o=$'\033[0m'
say(){ printf '%s▶ %s%s\n' "$c_b" "$1" "$c_o"; }
ok(){  printf '%s  ✓ %s%s\n' "$c_g" "$1" "$c_o"; }
die(){ printf '%s✗ %s%s\n' "$c_r" "$1" "$c_o" >&2; exit 1; }

for f in "$SPK" "$M916" "$M11" "$TSV"; do
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
# One decode, one encode per ratio: split the source 37 ways, retime each shot
# in its own branch, concat. ~14s a ratio.
#
# Per branch, in order, and every stage earns its place:
#   trim=start_frame/end_frame   frame-exact shot window (seconds drift)
#   setpts=(PTS-STARTPTS)*K      stretch it
#   fps=30                       back to CFR by DUPLICATING frames — no
#                                interpolation, so no morph artefacts
#   tpad=stop_mode=clone         fps can only drop frames, never pad, and a
#                                stretched shot lands ~K-1 frames short because
#                                its last PTS is (N-1)*K/30, not N*K/30. Clone
#                                the last frame for a second of headroom...
#   trim=end_frame=<outf>        ...then cut to the exact count.
#   setpts=N/30/TB               clean CFR timestamps so concat stays seamless.
# Without the tpad/trim pair the bed comes out 15 frames short of 2143.
retime_bed() {
  local label="$1" src="$2" post="$3" out="$4"
  local fc="$WORK/fc-$label.txt"

  FPS="$FPS" POST="$post" TSV="$TSV" python3 - > "$fc" <<'PYEOF'
import csv, os
fps, post, tsv = os.environ["FPS"], os.environ["POST"], os.environ["TSV"]
rows = [r for r in csv.reader(open(tsv), delimiter="\t") if r and not r[0].startswith("#")]
assert len(rows) == 37, f"expected 37 shots in {tsv}, got {len(rows)}"
p = ["[0:v]split=%d%s;" % (len(rows), "".join(f"[i{r[0]}]" for r in rows))]
for i, f0, f1, srcf, outf, k, ydif in rows:
    p.append(f"[i{i}]trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)*{k},"
             f"fps={fps},tpad=stop_mode=clone:stop_duration=1,"
             f"trim=end_frame={outf},setpts=N/{fps}/TB[c{i}];")
p.append("".join(f"[c{r[0]}]" for r in rows) + f"concat=n={len(rows)}:v=1:a=0[cat];")
p.append(f"[cat]{post}[v]")
print("".join(p))
PYEOF

  ffmpeg -y -nostdin -v error -i "$src" -filter_complex_script "$fc" -map '[v]' -an \
    -c:v libx264 -profile:v high -crf 14 -preset medium -pix_fmt yuv420p \
    -movflags +faststart "$out"

  local got
  got=$(ffprobe -v error -count_frames -select_streams v:0 \
        -show_entries stream=nb_read_frames -of csv=p=0 "$out")
  [ "$got" = "$MONT_FRAMES" ] || die "$label: got $got frames, expected $MONT_FRAMES"
  ok "$out  (37 shots, ${got} frames)"
  rm -f "$fc"
}

say "montage 9:16  (1080x1920, native)"
have "$OUT/montage-916.mp4" || retime_bed "916" "$M916" "setsar=1" "$OUT/montage-916.mp4"

say "montage 1:1   (1440 -> 1080)"
have "$OUT/montage-11.mp4" || retime_bed "11" "$M11" "scale=1080:1080,setsar=1" "$OUT/montage-11.mp4"

# No native 4:5 master. Derived from the 1:1 (loses 20% width) rather than the
# 9:16 (would lose 29.7% height). See EDIT-PLAN.md.
say "montage 4:5   (1440 -> 1350 tall, centre-crop to 1080 wide)"
have "$OUT/montage-45.mp4" || retime_bed "45" "$M11" "scale=1350:1350,crop=1080:1350:135:0,setsar=1" "$OUT/montage-45.mp4"

rmdir "$WORK" 2>/dev/null || true

printf '\n%s✅ beds built%s\n' "$c_g" "$c_o"
ls -la "$OUT"/vo.wav "$OUT"/music-bed.wav "$OUT"/pip.mp4 "$OUT"/montage-*.mp4
