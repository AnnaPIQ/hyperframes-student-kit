#!/usr/bin/env bash
# Builds the 4:5 (1080x1350) feed cut in ../review-call-ad-4x5 from this 9:16 project.
# Same edit, timing and graphics; reframed, not squashed:
#   - picture: the 9:16 plate is re-cropped per shot (A-roll/graphics keep y 200-1550,
#     the stage shot keeps y 100-1450 so Sean's talk-title screen stays in frame)
#   - graphics: the whole overlay layer is shifted up 200px as one unit
#   - logo and subtitles get their own 4:5 positions; client tag clears the logo
# Re-run after any edit to index.html, then render from ../review-call-ad-4x5.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=../review-call-ad-4x5
mkdir -p "$OUT/assets/media" "$OUT/renders"
cp -r assets/fonts assets/vendor assets/brand-tokens.css assets/ecomiq-logo-white.svg assets/ecomiq-logo-white.png "$OUT/assets/"
cp assets/media/bubble.mp4 assets/media/ctatile.mp4 assets/media/vo.wav "$OUT/assets/media/"
cp hyperframes.json "$OUT/"
cat > "$OUT/meta.json" <<'J'
{
  "id": "review-call-ad-4x5",
  "name": "review-call-ad-4x5",
  "width": 1080,
  "height": 1350,
  "fps": 25
}
J

# picture: per-shot vertical crop of the 9:16 plate
ffmpeg -v error -y -i assets/media/plate.mp4 -an \
  -vf "crop=1080:1350:0:'if(between(t,7.88,9.159),100,200)',format=yuv420p" \
  -c:v libx264 -preset medium -crf 14 -r 25 "$OUT/assets/media/plate45.mp4"

python3 -I - "$OUT/index.html" <<'PY'
import sys
s = open('index.html').read()
R = [
  ('content="width=1080, height=1920"', 'content="width=1080, height=1350"'),
  ('html, body { width: 1080px; height: 1920px;', 'html, body { width: 1080px; height: 1350px;'),
  ('#plate { width: 1080px; height: 1920px;', '#plate { width: 1080px; height: 1350px;'),
  ('#logoBox { position: absolute; top: 150px;', '#logoBox { position: absolute; top: 56px;'),
  ('#clientTag { left: 64px; top: 236px;', '#clientTag { left: 64px; top: 340px;'),
  ('width: 960px; bottom: 270px;', 'width: 960px; bottom: 560px;'),
  # CTA block sits 60px lower in 4:5 so the call tile clears the logo
  ('#ctaTile { left: 64px; top: 300px;', '#ctaTile { left: 64px; top: 360px;'),
  ('#ctaChip { left: 92px; top: 328px;', '#ctaChip { left: 92px; top: 388px;'),
  ('#ctaRow { left: 0; top: 960px;', '#ctaRow { left: 0; top: 1020px;'),
  ('#book { left: 190px; top: 1052px;', '#book { left: 190px; top: 1112px;'),
  ('cursorTo(640, 1130, 20.84, 0.34);', 'cursorTo(640, 1190, 20.84, 0.34);'),
  ('data-composition-id="review-call-ad"', 'data-composition-id="review-call-ad-4x5"'),
  ("window.__timelines['review-call-ad']", "window.__timelines['review-call-ad-4x5']"),
  ('data-width="1080" data-height="1920"', 'data-width="1080" data-height="1350"'),
  ('<title>review-call-ad</title>', '<title>review-call-ad-4x5</title>'),
  ('src="assets/media/plate.mp4"', 'src="assets/media/plate45.mp4"'),
  ('      <div id="dim"></div>',
   '      <!-- 4:5: every overlay keeps its 9:16 layout, shifted up 200px as one layer -->\n'
   '      <div id="frame45" style="position:absolute;left:0;top:-200px;width:1080px;height:1920px;">\n'
   '      <div id="dim"></div>'),
  ('      <!-- logo: positioned', '      </div>\n\n      <!-- logo: positioned'),
]
for a, b in R:
    assert s.count(a) == 1, ('expected exactly one', a)
    s = s.replace(a, b)
open(sys.argv[1], 'w').write(s)
PY
echo "4:5 project ready: $OUT"
