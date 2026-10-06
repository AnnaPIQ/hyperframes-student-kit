#!/usr/bin/env python3
"""make-4x5.py: generate the 4:5 feed version from the 9:16 composition.

    python3 scripts/make-4x5.py          # writes ../profit-plan-90day-4x5/

The 9:16 index.html is the source of truth. This script copies it and
re-lays it out for 1080x1350: same timeline, cuts, captions and graphics,
with the vertical positions remapped for the shorter frame. Sean comes from
assets/media/aroll-4x5.mp4 (a wider 4:5 crop of the 4K A-roll, built by
prep-media.sh). Media is shared via a symlink to this project's assets/media.
"""
import json, os, re, shutil

SRC = os.path.normpath(os.path.join(os.path.dirname(__file__), ".."))
DST = os.path.normpath(os.path.join(SRC, "..", "profit-plan-90day-4x5"))
H = 1350

os.makedirs(DST, exist_ok=True)
shutil.copytree(os.path.join(SRC, "assets"), os.path.join(DST, "assets"), dirs_exist_ok=True,
                ignore=shutil.ignore_patterns("media"))
link = os.path.join(DST, "assets", "media")
if not os.path.lexists(link):
    os.symlink(os.path.join("..", "..", "profit-plan-90day", "assets", "media"), link)
shutil.copy(os.path.join(SRC, "hyperframes.json"), DST)
meta = json.load(open(os.path.join(SRC, "meta.json")))
meta.update(id="profit-plan-90day-4x5", name="profit-plan-90day-4x5", height=H)
json.dump(meta, open(os.path.join(DST, "meta.json"), "w"), indent=2)
open(os.path.join(DST, ".gitignore"), "w").write("renders/\n")

s = open(os.path.join(SRC, "index.html")).read()


def rep(a, b, count=1):
    global s
    assert a in s, f"missing: {a[:70]}"
    s = s.replace(a, b, count)


# canvas + composition id
rep('content="width=1080, height=1920"', f'content="width=1080, height={H}"')
rep("<title>profit-plan-90day</title>", "<title>profit-plan-90day-4x5</title>")
s = s.replace("height: 1920px;", f"height: {H}px;")
rep('data-composition-id="profit-plan-90day" data-start="0" data-duration="38.65" data-width="1080" data-height="1920"',
    f'data-composition-id="profit-plan-90day-4x5" data-start="0" data-duration="38.65" data-width="1080" data-height="{H}"')
rep('window.__timelines["profit-plan-90day"]', 'window.__timelines["profit-plan-90day-4x5"]')
rep('src="assets/media/aroll.mp4"', 'src="assets/media/aroll-4x5.mp4"')

# Sean framing modes (bottom-anchored GRAPHIC and TIGHT) on the shorter frame
rep("const G = (s) => ({ scale: s, y: 1920 * (1 - s) });", f"const G = (s) => ({{ scale: s, y: {H} * (1 - s) }});")
rep("const TIGHT = { scale: 1.3, y: -325 };", "const TIGHT = { scale: 1.3, y: -229 };")

# layout: logo, captions, cards, graphic tops
rep("#logoWrap { position: absolute; left: 64px; top: 104px; width: 236px;",
    "#logoWrap { position: absolute; left: 56px; top: 56px; width: 210px;")
rep("top: 1500px; height: 140px; z-index: 5;", "top: 1150px; height: 130px; z-index: 5;")
rep("padding: 270px 64px 670px; gap: 22px;", "padding: 120px 64px 200px; gap: 20px;")
tops = {"#g1b": 690, "#g2": 690, "#g3": 690, "#g4": 690, "#g6": 680, "#g10": 380, "#g13": 730}
for sel, top in tops.items():
    s, n = re.subn(r"(\n      %s \{ top: )\d+px;" % re.escape(sel), r"\g<1>%dpx;" % top, s)
    assert n == 1, sel
rep("#mobLock { position: absolute; left: 0; right: 0; top: 1030px;",
    "#mobLock { position: absolute; left: 0; right: 0; top: 760px;")
rep("#c5src { position: absolute; left: 0; right: 0; top: 1208px;",
    "#c5src { position: absolute; left: 0; right: 0; top: 1075px;")
# keep the speaker's title slide in frame on the stage shot (9:16 clips are centre-cropped)
rep('<video id="b1" ', '<video id="b1" style="object-position: 50% 0%" ')

open(os.path.join(DST, "index.html"), "w").write(s)
print("✓ wrote", DST)
