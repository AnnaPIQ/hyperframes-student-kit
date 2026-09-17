#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# verify-render.sh — check a finished render against spec, on the file itself.
#
#   bash scripts/verify-render.sh renders/sweet-es-montage-9x16.mp4 1080 1920
#
# Asserts container/stream spec, +faststart (moov before mdat), runtime, and
# that the voiceover in the render sits at zero offset against assets/vo.m4a
# (envelope cross-correlation, so it measures the audio that actually shipped
# rather than trusting the timeline).
# ---------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1
SRC="${1:?usage: verify-render.sh <render.mp4> <width> <height>}"
WANT_W="${2:?}"; WANT_H="${3:?}"
WANT_DUR=46.2
fails=0
note() { printf '  %s %s\n' "$1" "$2"; }
bad()  { note '✗' "$1"; fails=$((fails + 1)); }

echo "verify $SRC"

# One field per call: ffprobe's csv writer emits fields in ITS order, not the
# order they are asked for, so a single multi-field read mis-assigns them.
probe() { ffprobe -v error -select_streams "$1" -show_entries "stream=$2" -of csv=p=0 "$SRC" | head -1; }
w=$(probe v:0 width);        h=$(probe v:0 height)
vcodec=$(probe v:0 codec_name); fps=$(probe v:0 r_frame_rate)
acodec=$(probe a:0 codec_name); ar=$(probe a:0 sample_rate); ac=$(probe a:0 channels)
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC")
pixfmt=$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of csv=p=0 "$SRC")

[ "$w" = "$WANT_W" ] && [ "$h" = "$WANT_H" ] && note '✓' "${w}x${h}" || bad "size ${w}x${h}, wanted ${WANT_W}x${WANT_H}"
[ "$vcodec" = "h264" ] && note '✓' "video h264 $pixfmt @ $fps" || bad "video codec $vcodec, wanted h264"
[ "$acodec" = "aac" ] && note '✓' "audio aac ${ar}Hz ${ac}ch" || bad "audio codec $acodec, wanted aac"
[ "$pixfmt" = "yuv420p" ] || bad "pix_fmt $pixfmt, wanted yuv420p"
awk -v d="$dur" -v t="$WANT_DUR" 'BEGIN{exit !(d>t-0.15 && d<t+0.15)}' \
  && note '✓' "duration ${dur}s" || bad "duration ${dur}s, wanted ~${WANT_DUR}s"

# +faststart puts moov ahead of mdat so the file starts playing before it lands
if [ "$(head -c 4096 "$SRC" | grep -abo -m1 moov | head -1 | cut -d: -f1)" ]; then
  note '✓' '+faststart (moov before mdat)'
else
  bad 'moov atom is not at the head — not +faststart'
fi

# A/V sync: does the voiceover in the render sit where assets/vo.m4a does?
python3 - "$SRC" <<'PY'
import subprocess, sys, struct, math
def envelope(path, hop=480):          # 8kHz mono, 100 envelope points/second
    raw = subprocess.run(
        ['ffmpeg','-v','error','-i',path,'-ac','1','-ar','8000','-f','s16le','-'],
        capture_output=True, check=True).stdout
    s = struct.unpack(f'<{len(raw)//2}h', raw[:len(raw)//2*2])
    return [math.sqrt(sum(v*v for v in s[i:i+hop])/hop) for i in range(0, len(s)-hop, hop)]

a, b = envelope(sys.argv[1]), envelope('assets/vo.m4a')
n = min(len(a), len(b))
best, lag = -1.0, None
for k in range(-100, 101):            # +/- 1.00s, in 10ms steps
    num = den_a = den_b = 0.0
    for i in range(200, n - 200):
        x, y = a[i], b[i - k]
        num += x*y; den_a += x*x; den_b += y*y
    r = num / math.sqrt(den_a*den_b) if den_a and den_b else 0
    if r > best: best, lag = r, k
off = lag * 10
if abs(off) <= 10 and best > 0.9:
    print(f'  ✓ voiceover offset {off:+d} ms (r={best:.3f})')
else:
    print(f'  ✗ voiceover offset {off:+d} ms (r={best:.3f}) — expected 0 ms')
    sys.exit(1)
PY
sync=$?
[ "$sync" -eq 0 ] || fails=$((fails + 1))

if [ "$fails" -gt 0 ]; then echo "  $fails failure(s)"; exit 1; fi
echo "  all checks passed"
