#!/usr/bin/env bash
# Builds the 4:5 (1080x1350) feed cut in ../get-the-second-sale-4x5 from this 9:16 project
# (campaign method, see review-call-ad). Same edit, timing and graphics; reframed, not squashed:
#   - picture: the 9:16 plate is re-cropped per shot (y 200-1550; the Shoptalk close-up keeps
#     y 0-1350 so Sean's head stays in frame), near-lossless intermediate
#   - graphics: the whole overlay layer is shifted up 200px as one unit
#   - logo, captions, client tag and the two full-screen headlines get their own 4:5 positions
# Re-run after any edit to index.html or the plate, then render from ../get-the-second-sale-4x5.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=../get-the-second-sale-4x5
mkdir -p "$OUT/assets/media" "$OUT/renders"
cp -r assets/fonts assets/vendor assets/brand-tokens.css assets/ecomiq-logo-white.svg assets/ecomiq-logo-white.png "$OUT/assets/"
cp assets/media/vo.wav "$OUT/assets/media/"
cp hyperframes.json "$OUT/"
printf 'assets/media/\n' > "$OUT/.gitignore"
cat > "$OUT/meta.json" <<'J'
{
  "id": "get-the-second-sale-4x5",
  "name": "get-the-second-sale-4x5",
  "width": 1080,
  "height": 1350,
  "fps": 25
}
J
# Shoptalk close-up sits at edit 14.88-16.40 (audio 15.44-16.96 minus the 0.56 head trim)
ffmpeg -v error -y -i assets/media/plate.mp4 -an \
  -vf "crop=1080:1350:0:'if(between(t,14.88,16.399),0,200)',format=yuv420p" \
  -c:v libx264 -preset slow -crf 8 -r 25 "$OUT/assets/media/plate45.mp4"

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
  ('#g1head { left: 90px; top: 300px;', '#g1head { left: 90px; top: 360px;'),
  ('#g1panel { left: 90px; top: 580px;', '#g1panel { left: 90px; top: 640px;'),
  ('#g2head { left: 90px; top: 330px;', '#g2head { left: 90px; top: 360px;'),
  ('data-composition-id="get-the-second-sale"', 'data-composition-id="get-the-second-sale-4x5"'),
  ("window.__timelines['get-the-second-sale']", "window.__timelines['get-the-second-sale-4x5']"),
  ('data-width="1080" data-height="1920"', 'data-width="1080" data-height="1350"'),
  ('<title>get-the-second-sale</title>', '<title>get-the-second-sale-4x5</title>'),
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
