#!/usr/bin/env bash
# =============================================================================
# make-4x5.sh — derive the 4:5 Meta-feed root from the 9:16 root.
#
# Both ratios share assets/ad.css and assets/ad.js, so the only things that
# differ are the canvas size, the montage master, the composition id, and the
# type/spacing scale. Deriving rather than duplicating keeps the two exports
# from drifting apart when the edit changes.
#
#   bash scripts/make-4x5.sh      # rewrites compositions/ad-4x5.html
# =============================================================================
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

mkdir -p compositions
sed -e 's|width=1080, height=1920|width=1080, height=1350|' \
    -e 's|bigger ones (9:16)|bigger ones (4:5)|' \
    -e 's|data-composition-id="ecomiq-aov-short"|data-composition-id="ecomiq-aov-short-4x5"|' \
    -e 's|__timelines\["ecomiq-aov-short"\]|__timelines["ecomiq-aov-short-4x5"]|' \
    -e 's|data-height="1920"|data-height="1350"|' \
    -e 's|width: 1080px; height: 1920px;|width: 1080px; height: 1350px;|' \
    -e 's|assets/montage-9x16.mp4|assets/montage-4x5.mp4|' \
    index.html > compositions/ad-4x5.html

# 4:5 is 570px shorter — step the type down and pull the callouts in.
python3 - <<'PY'
p = 'compositions/ad-4x5.html'
s = open(p).read()
old = """      /* 9:16 — Reels / Stories. Vertical room, so the logo sits higher and the
         callouts clear the platform UI at the bottom. */
      :root {
        --gutter: 108px;
        --logo-top: 104px;
        --logo-w: 300px;
        --lower-bottom: 640px;   /* bottom 640px kept clear for subtitles */
        --chip: 34px;
        --stat: 190px;
        --h1: 88px;
        --card-gutter: 56px;
        --card-lift: 0px;
        --pill: 40px;
        --card-logo-w: 460px;
      }"""
new = """      /* 4:5 — Meta feed. 570px shorter than the 9:16, so the type steps
         down and the callouts sit tighter to the lower edge. */
      :root {
        --gutter: 108px;
        --logo-top: 76px;
        --logo-w: 272px;
        --lower-bottom: 430px;   /* bottom 430px kept clear for subtitles */
        --chip: 31px;
        --stat: 158px;
        --h1: 78px;
        --card-gutter: 56px;
        --card-lift: 130px;
        --pill: 36px;
        --card-logo-w: 404px;
      }"""
assert old in s, '9:16 :root block not found — did index.html change shape?'
open(p, 'w').write(s.replace(old, new))
PY

echo "✓ compositions/ad-4x5.html regenerated from index.html"
