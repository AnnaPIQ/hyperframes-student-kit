#!/usr/bin/env python3
"""
Generate the 4:5 (1080x1350) relayout from the 9:16 (1080x1920) master.

Only layout constants change — every data-start, data-duration and GSAP tween is
copied verbatim, so the two deliverables cut identically and stay in sync when the
master is edited. Re-run after any change to ../index.html:

    python3 scripts/make-4x5.py

Type scales down ~18% and the card band re-centres on y=575 (43% of 1350), which
keeps every glyph clear of the y=945 subtitle line — the 4:5 equivalent of the
9:16 y=1344 line.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(HERE)
SRC = os.path.join(PROJ, "index.html")
OUTDIR = os.path.join(PROJ, "4x5")
OUT = os.path.join(OUTDIR, "index.html")

# (old, new) — every pair must match exactly once, or the master has drifted.
SUBS = [
    # ── canvas ──────────────────────────────────────────────────────────────
    ('<meta name="viewport" content="width=1080, height=1920" />',
     '<meta name="viewport" content="width=1080, height=1350" />'),
    ("""      html, body {
        width: 1080px; height: 1920px; overflow: hidden;""",
     """      html, body {
        width: 1080px; height: 1350px; overflow: hidden;"""),
    ('data-width="1080" data-height="1920"', 'data-width="1080" data-height="1350"'),

    # ── footage: b-roll is 1080x1920, so 4:5 centre-crops it vertically. Bias the crop
    #    up to 42% — faces and horizons sit above centre in this material. The A-roll is
    #    NOT cropped: it has its own 1728-wide 4:5 crop from the 4K master (see aroll45). ──
    ("""        position: absolute; inset: 0; width: 1080px; height: 1920px;
        object-fit: cover; will-change: transform, filter;""",
     """        position: absolute; inset: 0; width: 1080px; height: 1350px;
        object-fit: cover; object-position: 50% 42%; will-change: transform, filter;"""),

    # ── card band re-centres on y=575; bottom 30% (below y=945) stays clear ──
    ("position: absolute; left: 0; right: 0; top: 300px; height: 1040px; z-index: 6;",
     "position: absolute; left: 0; right: 0; top: 190px; height: 770px; z-index: 6;"),
    ("gap: 30px; padding: 0 96px; text-align: center;",
     "gap: 25px; padding: 0 78px; text-align: center;"),

    # ── type scale ──────────────────────────────────────────────────────────
    ("font-weight: 800; font-size: 30px; letter-spacing: .30em;",
     "font-weight: 800; font-size: 25px; letter-spacing: .30em;"),
    (".stat.xl  { font-size: 268px; }", ".stat.xl  { font-size: 217px; }"),
    (".stat.lg  { font-size: 260px; }", ".stat.lg  { font-size: 212px; }"),
    ("font-weight: 800; font-size: 46px; line-height: 1.14;",
     "font-weight: 800; font-size: 39px; line-height: 1.14;"),
    ("transform: translate(-50%,-50%); pointer-events: none; z-index: -1;\n        background: radial-gradient(50% 50% at 50% 50%, rgba(255,76,50,.42)",
     "transform: translate(-50%,-50%); pointer-events: none; z-index: -1;\n        background: radial-gradient(50% 50% at 50% 50%, rgba(255,76,50,.42)"),
    ("position: absolute; left: 50%; top: 50%; width: 900px; height: 620px;",
     "position: absolute; left: 50%; top: 50%; width: 736px; height: 506px;"),
    (".rule { width: 420px; height: 8px;", ".rule { width: 344px; height: 7px;"),

    # ── Mob Armor chip ──────────────────────────────────────────────────────
    ("display: flex; align-items: center; gap: 22px;\n        background: #101820; padding: 22px 38px; border-radius: 10px;",
     "display: flex; align-items: center; gap: 18px;\n        background: #101820; padding: 18px 30px; border-radius: 9px;"),
    (".ma-chip img { width: 300px; height: auto; display: block; }",
     ".ma-chip img { width: 248px; height: auto; display: block; }"),
    (".ma-chip.shield img { width: 74px; }", ".ma-chip.shield img { width: 62px; }"),
    ("font-weight: 800; font-size: 19px; letter-spacing: .22em; text-transform: uppercase;\n        color: var(--brand-white); border-left: 2px solid #2a3644; padding-left: 22px;",
     "font-weight: 800; font-size: 16px; letter-spacing: .22em; text-transform: uppercase;\n        color: var(--brand-white); border-left: 2px solid #2a3644; padding-left: 18px;"),

    # ── channel diagram (4x78 + 3x34 = 414, so the wire spans the dot row) ──
    (".dots { display: flex; align-items: center; justify-content: center; gap: 42px; height: 132px; }",
     ".dots { display: flex; align-items: center; justify-content: center; gap: 34px; height: 108px; }"),
    ("width: 96px; height: 96px; border-radius: 50%; position: relative;",
     "width: 78px; height: 78px; border-radius: 50%; position: relative;"),
    ("position: absolute; inset: 16px; border-radius: 50%; background: var(--brand-blue-tint);",
     "position: absolute; inset: 13px; border-radius: 50%; background: var(--brand-blue-tint);"),
    ("position: absolute; inset: -30px; border-radius: 50%; pointer-events: none; opacity: 0;",
     "position: absolute; inset: -24px; border-radius: 50%; pointer-events: none; opacity: 0;"),
    ("width: 510px; height: 4px; background: #3f6fa8;", "width: 414px; height: 4px; background: #3f6fa8;"),
    ("position: absolute; top: 0; left: 0; width: 150px; height: 4px;",
     "position: absolute; top: 0; left: 0; width: 122px; height: 4px;"),
    ("{ x: 510, opacity: 1, duration: 1.30", "{ x: 414, opacity: 1, duration: 1.30"),

    # ── Mob Armor first screen + summary card ───────────────────────────────
    ("      #maHero { width: 620px; height: auto; display: block; }",
     "      #maHero { width: 505px; height: auto; display: block; }"),
    (".stat.md { font-size: 158px; }", ".stat.md { font-size: 128px; }"),
    (".duo { display: flex; align-items: center; justify-content: center; gap: 56px; }",
     ".duo { display: flex; align-items: center; justify-content: center; gap: 45px; }"),
    (".duo-rule { width: 3px; height: 150px; background: #2f588a; }",
     ".duo-rule { width: 3px; height: 122px; background: #2f588a; }"),
    ("      .duo-lbl {\n        font-weight: 800; font-size: 26px;",
     "      .duo-lbl {\n        font-weight: 800; font-size: 22px;"),

    # ── end card ────────────────────────────────────────────────────────────
    ("#endcard img.logo { width: 560px; height: auto; }",
     "#endcard img.logo { width: 458px; height: auto; }"),
    ("font-weight: 800; font-size: 92px; line-height: .98; letter-spacing: -.032em;\n        max-width: 830px;",
     "font-weight: 800; font-size: 75px; line-height: .98; letter-spacing: -.032em;\n        max-width: 690px;"),
    ("font-weight: 800; font-size: 40px; letter-spacing: -.01em; color: var(--brand-white);\n        background: var(--brand-flame); padding: 30px 62px;",
     "font-weight: 800; font-size: 33px; letter-spacing: -.01em; color: var(--brand-white);\n        background: var(--brand-flame); padding: 25px 52px;"),

    # ── persistent logo ─────────────────────────────────────────────────────
    ("#logo-slot { position: absolute; top: 96px; left: 72px; width: 320px; z-index: 7; }",
     "#logo-slot { position: absolute; top: 68px; left: 58px; width: 262px; z-index: 7; }"),

]


def main():
    src = open(SRC, encoding="utf-8").read()
    out = src
    failed = []
    for old, new in SUBS:
        n = out.count(old)
        if n != 1:
            failed.append((n, old.strip().splitlines()[0][:78]))
            continue
        out = out.replace(old, new)
    if failed:
        print("make-4x5: master has drifted — these anchors did not match exactly once:")
        for n, frag in failed:
            print(f"  {n} match(es): {frag}")
        return 1

    # A-roll is re-cropped from the 4K master for 4:5 (1728x2160 -> 1080x1350) rather than
    # letterbox-cropped from the 9:16 cut, which would cut Sean's head or torso.
    n_aroll = out.count('assets/aroll/')
    if n_aroll != 4:
        print(f"make-4x5: expected 4 A-roll references, found {n_aroll}")
        return 1
    out = out.replace('assets/aroll/', 'assets/aroll45/')

    # Distinct composition id so the two builds can never resolve to each other's timeline.
    out = out.replace('data-composition-id="mob-armor-social-proof"',
                      'data-composition-id="mob-armor-social-proof-4x5"')
    out = out.replace('window.__timelines["mob-armor-social-proof"]',
                      'window.__timelines["mob-armor-social-proof-4x5"]')
    out = out.replace('<title>mob-armor-social-proof</title>',
                      '<title>mob-armor-social-proof-4x5</title>')

    # The 9:16 vignette ellipse is tuned for a tall frame; widen it for 4:5.
    out = out.replace("radial-gradient(ellipse 82% 66% at 50% 44%",
                      "radial-gradient(ellipse 88% 74% at 50% 46%")

    os.makedirs(OUTDIR, exist_ok=True)
    open(OUT, "w", encoding="utf-8").write(out)

    # Sanity: nothing from the 9:16 canvas should survive.
    leftovers = [m for m in re.findall(r"1920", out)]
    print(f"make-4x5: wrote {OUT}")
    print(f"make-4x5: {len(SUBS)} anchors applied, {len(leftovers)} '1920' token(s) remaining")
    return 0


if __name__ == "__main__":
    sys.exit(main())
