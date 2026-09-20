#!/usr/bin/env python3
"""
make-45.py — derive the 4:5 root composition from the 9:16 one.

    python3 scripts/make-45.py     ->  ../ecomiq-cro-short-45/index.html

Both exports are the same edit on the same VO: identical shot map, identical
beat timings, identical end-card trigger at 16.87s. Only the frame changes, so
ad-45.html is generated from index.html rather than maintained by hand — edit
index.html, re-run this, and the two stay in sync.

What changes for 1080x1350:
  · canvas + bed swap to the 4:5 bed (cut from the square master)
  · lower-third graphics ride up, since there are 570 fewer pixels of height
  · display type steps down so the safe area still holds
Timings, animation and copy are untouched.
"""
import pathlib
import re
import sys

SRC = pathlib.Path(__file__).resolve().parent.parent / "index.html"
# The 4:5 lives in its own project folder: hyperframes allows exactly one root
# index.html per project, and the workspace is one folder per video.
DST = SRC.parent.parent / "ecomiq-cro-short-45" / "index.html"

# (old, new, expected occurrences)
EDITS = [
    # ---- canvas -------------------------------------------------------------
    ('<meta name="viewport" content="width=1080, height=1920" />',
     '<meta name="viewport" content="width=1080, height=1350" />', 1),
    ("<title>EcomIQ — CRO short (9:16)</title>",
     "<title>EcomIQ — CRO short (4:5)</title>", 1),
    ("width: 1080px; height: 1920px; overflow: hidden;",
     "width: 1080px; height: 1350px; overflow: hidden;", 1),
    ('data-composition-id="ecomiq-cro-short"',
     'data-composition-id="ecomiq-cro-short-45"', 1),
    ('window.__timelines["ecomiq-cro-short"] = tl;',
     'window.__timelines["ecomiq-cro-short-45"] = tl;', 1),
    ('data-height="1920"', 'data-height="1350"', 1),

    # ---- the bed: 4:5 is cut from the SQUARE master (20% off the sides), not
    #      cropped out of the 9:16 one (which would drop 29.7% of the height
    #      and clip heads). See scripts/build-bed.sh.
    ("#bed { display: block; width: 1080px; height: 1920px; object-fit: cover;",
     "#bed { display: block; width: 1080px; height: 1350px; object-fit: cover;", 1),
    ('src="assets/montage-bed-916.mp4"', 'src="assets/montage-bed-45.mp4"', 1),

    # ---- scrims scale with the shorter frame --------------------------------
    ("#scrim { position: absolute; left: 0; right: 0; bottom: 0; height: 620px; z-index: 21;",
     "#scrim { position: absolute; left: 0; right: 0; bottom: 0; height: 470px; z-index: 21;", 1),
    ("#logo-scrim { position: absolute; top: 0; left: 0; width: 760px; height: 470px;",
     "#logo-scrim { position: absolute; top: 0; left: 0; width: 700px; height: 400px;", 1),

    # ---- brand mark ---------------------------------------------------------
    ("#logo-slot { position: absolute; top: 96px; left: 96px; z-index: 40; }",
     "#logo-slot { position: absolute; top: 78px; left: 84px; z-index: 40; }", 1),
    ("#logo-slot img { display: block; width: 320px; height: auto;",
     "#logo-slot img { display: block; width: 286px; height: auto;", 1),
    (".gfx { position: absolute; left: 96px; right: 96px; z-index: 30; }",
     ".gfx { position: absolute; left: 84px; right: 84px; z-index: 30; }", 1),

    # ---- lower-third graphics ride up ---------------------------------------
    ("#g-gap { bottom: 380px; }", "#g-gap { bottom: 252px; }", 1),
    (".gap-row { margin-bottom: 48px; }", ".gap-row { margin-bottom: 38px; }", 1),
    (".gap-label { font-size: 40px;", ".gap-label { font-size: 34px;", 1),
    (".gap-rail { height: 30px;", ".gap-rail { height: 26px;", 1),

    ("#g-guarantee { bottom: 360px; text-align: center; }",
     "#g-guarantee { bottom: 236px; text-align: center; }", 1),
    ("#g-guarantee .pill { display: inline-block; font-size: 56px;",
     "#g-guarantee .pill { display: inline-block; font-size: 48px;", 1),
    ("background: var(--brand-flame); padding: 26px 62px; border-radius: 999px;",
     "background: var(--brand-flame); padding: 22px 54px; border-radius: 999px;", 1),

    ("#g-days { bottom: 300px; text-align: center; }",
     "#g-days { bottom: 200px; text-align: center; }", 1),
    ("#g-days .num { font-size: 300px;", "#g-days .num { font-size: 236px;", 1),
    ("font-style: italic; font-weight: 400; font-size: 112px; line-height: 1;",
     "font-style: italic; font-weight: 400; font-size: 92px; line-height: 1;", 1),

    ("#g-flow { bottom: 360px;", "#g-flow { bottom: 238px;", 1),
    ("#g-flow .tag { font-size: 58px;", "#g-flow .tag { font-size: 50px;", 1),

    # ---- end card -----------------------------------------------------------
    ("justify-content: center; gap: 58px; }", "justify-content: center; gap: 46px; }", 1),
    ("#card-logo { position: relative; width: 680px;",
     "#card-logo { position: relative; width: 600px;", 1),
    ("#card-cta { position: relative; font-size: 58px;",
     "#card-cta { position: relative; font-size: 50px;", 1),
    ("padding: 38px 92px; border-radius: 999px;",
     "padding: 32px 78px; border-radius: 999px;", 1),
]

html = SRC.read_text()

for old, new, want in EDITS:
    got = html.count(old)
    if got != want:
        sys.exit(f"make-45: expected {want}x {old[:60]!r}, found {got}. "
                 "index.html changed — update EDITS.")
    html = html.replace(old, new)

# The banner goes AFTER the doctype — the linter rejects an index.html that
# does not literally begin with <!doctype html>.
html = html.replace(
    "<!doctype html>",
    "<!doctype html>\n<!-- GENERATED from ../ecomiq-cro-short/index.html by scripts/make-45.py — do not edit by hand. -->",
    1)

DST.write_text(html)
print(f"  ✓ {DST.parent.name}/{DST.name} — 1080x1350, derived from index.html")
