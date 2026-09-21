#!/usr/bin/env python3
"""
build-45.py — derive the 4:5 Meta-feed composition from the 9:16 master.

Run after editing index.html:   python3 scripts/build-45.py

The 4:5 cut ships as its own sibling PROJECT (video-projects/ecomiq-audit-call-45/),
not as a second file in this one. Two root-level files both carrying
data-composition-id trips multiple_root_compositions, and pushing the 4:5 down
into compositions/ then forces "../assets/" paths, which the linter rejects as
invalid_parent_traversal_in_asset_path. A sibling project with its own assets/
is also the workspace convention (CLAUDE.md: assets are duplicated per project,
not symlinked, so each project stays portable).

The 4:5 frame is the 9:16 frame with 285px cropped off the top and bottom, so
the footage bed is already handled by broll-45.mp4 (built by build-broll.py).
What has to change here is the LAYOUT: 570px less vertical room means the copy
block, logo and end-card lockup all need re-anchoring, and the type comes down
a notch so the long headlines don't run into the safe area.

Beat timings, VO and GSAP structure are NOT touched - both cuts stay in sync.
"""
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
MASTER = ROOT / "index.html"
DEST = ROOT.parent / "ecomiq-audit-call-45"
OUT = DEST / "index.html"

# Assets the 4:5 cut needs. broll-45.mp4 is the pre-cropped footage bed; the
# 9:16 bed and the raw montage stay behind in the master project.
SHARED_ASSETS = [
    "brand-tokens.css", "ecomiq-logo-white.svg", "ecomiq-icon-white.svg",
    "sean-vo.m4a", "sean-vo.transcript.json", "broll-45.mp4",
    "fonts/RethinkSans.woff2", "fonts/HedvigLettersSerif.woff2",
    "vendor/gsap.min.js",
]

src = MASTER.read_text()
s = src


def sub(old, new):
    """Replace, but fail loudly if the master drifted away from what we expect."""
    global s
    if old not in s:
        sys.exit(f"build-45.py: pattern not found in index.html:\n  {old[:90]}...")
    s = s.replace(old, new)


# --- identity / canvas -----------------------------------------------------
sub('<meta name="viewport" content="width=1080, height=1920" />',
    '<meta name="viewport" content="width=1080, height=1350" />')
sub('<title>EcomIQ — Book a Free Audit Call (9:16)</title>',
    '<title>EcomIQ — Book a Free Audit Call (4:5)</title>')
sub('width: 1080px; height: 1920px; overflow: hidden;\n        background: var(--brand-navy);',
    'width: 1080px; height: 1350px; overflow: hidden;\n        background: var(--brand-navy);')
sub('data-composition-id="ecomiq-audit-call"', 'data-composition-id="ecomiq-audit-call-45"')
sub('window.__timelines["ecomiq-audit-call"]', 'window.__timelines["ecomiq-audit-call-45"]')
sub('data-width="1080"\n      data-height="1920"', 'data-width="1080"\n      data-height="1350"')

# --- footage bed: the pre-cropped 4:5 encode -------------------------------
sub('src="assets/broll-916.mp4"', 'src="assets/broll-45.mp4"')
sub('#broll { display: block; width: 1080px; height: 1920px; object-fit: cover;',
    '#broll { display: block; width: 1080px; height: 1350px; object-fit: cover;')

# --- layout: 570px less height to work with --------------------------------
sub('          linear-gradient(to top, rgba(6,40,76,.90) 0%, rgba(6,40,76,.74) 22%, rgba(6,40,76,.40) 38%, rgba(6,40,76,.08) 54%, rgba(6,40,76,0) 66%),\n'
    '          linear-gradient(to bottom, rgba(6,40,76,.62) 0%, rgba(6,40,76,.14) 12%, rgba(6,40,76,0) 22%); }',
    '          linear-gradient(to top, rgba(6,40,76,.95) 0%, rgba(6,40,76,.84) 26%, rgba(6,40,76,.14) 54%, rgba(6,40,76,0) 70%),\n'
    '          linear-gradient(to bottom, rgba(6,40,76,.80) 0%, rgba(6,40,76,.22) 15%, rgba(6,40,76,0) 27%); }')

# Meta feed has no Reels UI to clear, so the copy sits closer to the edge.
sub('.beat { position: absolute; left: 96px; right: 96px; bottom: 400px; }',
    '.beat { position: absolute; left: 96px; right: 96px; bottom: 150px; }')
sub('#logo-slot { position: absolute; top: 108px; left: 96px; width: 300px; }',
    '#logo-slot { position: absolute; top: 74px; left: 96px; width: 280px; }')

# Type scale steps down ~12% so the long headlines still breathe.
sub('.head { font-size: 86px;', '.head { font-size: 76px;')
sub('.head.big { font-size: 104px; }', '.head.big { font-size: 92px; }')
sub('.sub { margin-top: 26px; font-size: 36px;', '.sub { margin-top: 22px; font-size: 33px;')
sub('.stack .row { font-size: 62px;', '.stack .row { font-size: 54px;')
sub('.stack { display: flex; flex-direction: column; gap: 14px; margin-top: 18px; }',
    '.stack { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }')
sub('.chip { font-size: 38px; font-weight: 700; padding: 16px 30px;',
    '.chip { font-size: 34px; font-weight: 700; padding: 14px 26px;')
sub('.chips { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 24px; max-width: 840px; }',
    '.chips { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 20px; max-width: 800px; }')
sub('.trend .label { font-size: 54px;', '.trend .label { font-size: 47px;')
sub('.trend .label { font-size: 47px; font-weight: 800; letter-spacing: -.02em;\n        width: 300px;',
    '.trend .label { font-size: 47px; font-weight: 800; letter-spacing: -.02em;\n        width: 260px;')
sub('.trend { display: flex; align-items: center; gap: 34px; margin-top: 26px; }',
    '.trend { display: flex; align-items: center; gap: 28px; margin-top: 20px; }')
sub('.trend svg { width: 300px; height: 123px; overflow: visible; }',
    '.trend svg { width: 260px; height: 107px; overflow: visible; }')
sub('.pill { display: inline-block; font-size: 42px;', '.pill { display: inline-block; font-size: 38px;')
sub('.pill { display: inline-block; font-size: 38px; font-weight: 700;\n        color: var(--brand-white); background: var(--brand-flame);\n        padding: 26px 56px;',
    '.pill { display: inline-block; font-size: 38px; font-weight: 700;\n        color: var(--brand-white); background: var(--brand-flame);\n        padding: 23px 50px;')
sub('.head { font-size: 76px; font-weight: 800; line-height: 1.0;',
    '.head { font-size: 76px; font-weight: 800; line-height: 1.02;')
# The two beats that override .head inline need the same step-down.
s = s.replace('style="font-size: 76px"', 'style="font-size: 68px"')

# End card lockup: tighter gap, smaller logo, wider bloom for the shorter frame.
sub('display: flex; flex-direction: column; align-items: center; gap: 74px; }',
    'display: flex; flex-direction: column; align-items: center; gap: 54px; }')
sub('#ec-logo { width: 560px; height: auto; }', '#ec-logo { width: 500px; height: auto; }')
sub('#ec-cta { font-size: 46px; font-weight: 700; color: var(--brand-white);\n        background: var(--brand-flame); padding: 30px 68px;',
    '#ec-cta { font-size: 42px; font-weight: 700; color: var(--brand-white);\n        background: var(--brand-flame); padding: 27px 60px;')
sub('radial-gradient(126% 64% at 50% 118%,', 'radial-gradient(132% 72% at 50% 122%,')

# Vignette tightens to the shorter frame.
sub('radial-gradient(ellipse 78% 62% at 50% 46%,', 'radial-gradient(ellipse 80% 66% at 50% 44%,')

sub('    <!-- Render contract: root carries id',
    '''    <!-- 4:5 Meta-feed cut. Same edit, same VO, same beat timings as the 9:16
         master (index.html) — only the layout and type scale differ, and the
         footage bed is the pre-cropped broll-45.mp4. Generated by
         scripts/build-45.py; edit the master and re-run rather than hand-editing.
         Render contract: root carries id''')

# --- scaffold the sibling project -----------------------------------------
import json
import shutil

(DEST / "renders").mkdir(parents=True, exist_ok=True)
(DEST / "renders" / ".gitkeep").touch()
for rel in SHARED_ASSETS:
    srcf = ROOT / "assets" / rel
    if not srcf.exists():
        sys.exit(f"build-45.py: missing asset {srcf} - run build-broll.py first")
    dstf = DEST / "assets" / rel
    dstf.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(srcf, dstf)

shutil.copy2(ROOT / "hyperframes.json", DEST / "hyperframes.json")
meta = json.loads((ROOT / "meta.json").read_text())
meta.update({"id": "ecomiq-audit-call-45", "name": "ecomiq-audit-call-45",
             "width": 1080, "height": 1350})
(DEST / "meta.json").write_text(json.dumps(meta, indent=2) + "\n")

OUT.write_text(s)
print(f"wrote {OUT.relative_to(ROOT.parent)} (+ assets, meta.json) from {MASTER.name}")
