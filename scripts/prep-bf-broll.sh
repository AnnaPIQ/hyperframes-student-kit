#!/usr/bin/env bash
# =============================================================================
# prep-bf-broll.sh — rebuild assets/workbook-broll.mp4 for ecomiq-bf-workbook.
#
# The workbook b-roll is EcomIQ's own piece, built in a separate Hyperframes
# project on another branch. Anna asked for the perspective floor grid and the
# corner crosshairs to come off it, and that cannot be done to the baked video:
# the grid lines sit only 5-8 luma above the navy field, which is the same
# contrast as the small type on the worksheet boards, so every filter that
# erases one erases the other (median, smartblur and masked-blur were all tried
# and all destroyed the page text — see docs/LESSONS.md). So it is re-rendered
# from source with those two layers hidden instead.
#
# SOURCE: commit 98542c0 of branch claude/wonderful-curie-brnfzl,
#         video-projects/bf-workbook-broll — pinned deliberately. That branch's
#         tip re-times the piece to 21.4s, which would silently move every beat
#         this ad cuts to. Later revisions also add native 9:16 and 4:5 builds
#         of the b-roll, which would remove the need to letterbox it at all;
#         adopting one is a framing decision, not a maintenance one.
#
#   bash scripts/prep-bf-broll.sh
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

SRC_REV="98542c0"
SRC_DIR="video-projects/bf-workbook-broll"
WORK=".tmp-broll"                      # gitignored (.tmp-*/)
DEST="video-projects/ecomiq-bf-workbook/assets/workbook-broll.mp4"

git cat-file -e "${SRC_REV}^{commit}" 2>/dev/null || {
  echo "revision ${SRC_REV} not present — fetch it first:" >&2
  echo "  git fetch origin claude/wonderful-curie-brnfzl" >&2
  exit 1
}

rm -rf "$WORK" && mkdir -p "$WORK"
git archive "$SRC_REV" "$SRC_DIR" | tar -x -C "$WORK" --strip-components=1
P="$WORK/bf-workbook-broll"

# Hide the stage furniture. Appended as a late stylesheet rather than edited
# into the markup, so the source stays a verbatim checkout and the override is
# the only local change. GSAP still tweens #grid and .xh; tweening a display:none
# element is harmless.
python3 - "$P/index.html" <<'PY'
import sys
p = sys.argv[1]
s = open(p).read()
css = ("    <style>\n"
       "      /* prep-bf-broll.sh: stage furniture off at Anna's request. */\n"
       "      #grid-wrap, #crosshairs { display: none !important; }\n"
       "    </style>\n")
assert "#grid-wrap" in s, "grid markup not found — source layout changed"
i = s.index("  </head>")
open(p, "w").write(s[:i] + css + s[i:])
PY

( cd "$P" && npx hyperframes lint >/dev/null \
  && npx hyperframes render --quality standard --output renders/broll-nogrid.mp4 )

# Conform to the ad's own frame width. 1080x608 keeps the 16:9 shape, and CRF 20
# on a flat navy graphic lands ~4 MB, small enough to commit (unlike the A-roll
# renditions, which stay gitignored).
ffmpeg -y -loglevel error -i "$P/renders/broll-nogrid.mp4" -an \
  -vf "scale=1080:608:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset slow -crf 20 -r 30 -movflags +faststart "$DEST"

rm -rf "$WORK"
echo "✓ $DEST rebuilt from ${SRC_REV} (grid + crosshairs off)"
ffprobe -v error -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of csv "$DEST"
