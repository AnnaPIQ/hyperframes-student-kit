#!/usr/bin/env python3
"""
make-45.py, derive the 4:5 master from the 9:16 master.

    python3 scripts/make-45.py

Both cuts share one edit: the same montage bed, the same VO, the same GSAP
timeline and the same end-card trigger. Only the frame geometry and the scale
of the furniture differ, so the 4:5 is generated from index.html rather than
maintained by hand. Edit index.html, then re-run this.

Asset paths stay root-relative. Sub-compositions are served with the project
root as their base URL, so "../assets/..." 404s in Studio preview even though
renders happen to rewrite it.
"""
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "index.html"
DST = ROOT / "compositions" / "aov-45.html"

# (find, replace) applied in order. Every entry must match, so a drift in
# index.html fails loudly here instead of shipping a stale 4:5.
RULES = [
    # --- frame geometry -----------------------------------------------------
    ("width=1080, height=1920", "width=1080, height=1350"),
    ("<title>EcomIQ AOV, 9:16</title>", "<title>EcomIQ AOV, 4:5</title>"),
    ("width: 1080px; height: 1920px; overflow: hidden;",
     "width: 1080px; height: 1350px; overflow: hidden;"),
    ("#bed video { width: 1080px; height: 1920px;",
     "#bed video { width: 1080px; height: 1350px;"),
    ('data-composition-id="aov-shortform"', 'data-composition-id="aov-45"'),
    ('data-height="1920"', 'data-height="1350"'),
    ('window.__timelines["aov-shortform"]', 'window.__timelines["aov-45"]'),
    # --- the 4:5 bed is cropped, not padded (see DESIGN.md) -----------------
    ('src="assets/montage-916.mp4"', 'src="assets/montage-45.mp4"'),
    # --- furniture scaled for the shorter frame -----------------------------
    ("#logo-wrap { position: absolute; top: 92px; left: 80px; width: 300px; }",
     "#logo-wrap { position: absolute; top: 74px; left: 74px; width: 262px; }"),
    ("#card-logo { position: relative; width: 560px; height: auto; }",
     "#card-logo { position: relative; width: 500px; height: auto; }"),
    ("margin-top: 58px; width: 168px; height: 8px;",
     "margin-top: 46px; width: 150px; height: 7px;"),
    ("margin-top: 92px;", "margin-top: 74px;"),
    ("font-size: 56px; font-weight: 700; letter-spacing: -.01em;",
     "font-size: 50px; font-weight: 700; letter-spacing: -.01em;"),
    ("padding: 38px 92px; border-radius: 999px;",
     "padding: 34px 82px; border-radius: 999px;"),
    ("#card-cta .arrow { font-size: 52px;", "#card-cta .arrow { font-size: 46px;"),
]

html = SRC.read_text()
for find, replace in RULES:
    if find not in html:
        sys.exit(f"make-45.py: index.html no longer contains:\n  {find}")
    html = html.replace(find, replace)

DST.write_text(html)
print(f"wrote {DST.relative_to(ROOT)}  (1080x1350, derived from index.html)")
