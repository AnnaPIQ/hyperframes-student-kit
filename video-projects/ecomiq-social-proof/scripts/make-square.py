#!/usr/bin/env python3
"""
make-square.py — derive compositions/square.html (1:1) from index.html (9:16).

The two ratios are ONE edit: same cut sheet, same timeline, same word cues. Only
the frame height, the b-roll variant folder, the subtitle-safe zone and the type
scale differ. Keeping that as a scripted transform (rather than a hand-edited
second file) means a change to the 9:16 master can never silently miss the square.

Run from the project folder:  python3 scripts/make-square.py
"""
import io, os, sys, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'index.html')
DST = os.path.join(ROOT, 'compositions', 'square.html')

# (old, new) — every one is asserted present, so a drifted master fails loudly
# instead of shipping a square that quietly kept the tall frame's numbers.
RULES = [
    # ---- frame ----
    ('<meta name="viewport" content="width=1080, height=1920" />',
     '<meta name="viewport" content="width=1080, height=1080" />'),
    ('<title>EcomIQ — Dryft Sleep social proof (9:16)</title>',
     '<title>EcomIQ — Dryft Sleep social proof (1:1)</title>'),
    ('width: 1080px; height: 1920px; overflow: hidden;',
     'width: 1080px; height: 1080px; overflow: hidden;'),
    ('.bwrap video { width: 1080px; height: 1920px; object-fit: cover; display: block; }',
     '.bwrap video { width: 1080px; height: 1080px; object-fit: cover; display: block; }'),
    ('data-composition-id="ecomiq-social-proof"', 'data-composition-id="ecomiq-social-proof-1x1"'),
    ('data-height="1920"', 'data-height="1080"'),
    ('window.__timelines["ecomiq-social-proof"] = tl;',
     'window.__timelines["ecomiq-social-proof-1x1"] = tl;'),
    # The square frame is 44% shorter, so the whip travel scales with it —
    # ±90px on 1920 reads the same as ±52px on 1080.
    ('const OUT_D = 0.333, IN_D = 0.667, WHIP_Y = 90;',
     'const OUT_D = 0.333, IN_D = 0.667, WHIP_Y = 52;'),
    # ---- persistent logo ----
    ('#logo-hold { position: absolute; top: 74px; left: 108px; width: 260px; z-index: 40; }',
     '#logo-hold { position: absolute; top: 52px; left: 72px; width: 228px; z-index: 40; }'),
    # ---- +59% stat card ----
    ('align-items: flex-start; padding: 0 108px 470px;',
     'align-items: flex-start; padding: 0 76px 210px;'),
    ('#s59-eyebrow { font-size: 28px; font-weight: 700; letter-spacing: 0.20em;\n'
     '        text-transform: uppercase; color: var(--brand-white); margin-bottom: 26px; }',
     '#s59-eyebrow { font-size: 22px; font-weight: 700; letter-spacing: 0.20em;\n'
     '        text-transform: uppercase; color: var(--brand-white); margin-bottom: 18px; }'),
    ('#s59-num { font-size: 300px;', '#s59-num { font-size: 196px;'),
    ('#s59-rule { width: 790px; height: 7px; border-radius: 4px;\n'
     '        background: var(--brand-flame); transform-origin: left center; margin: 26px 0 34px; }',
     '#s59-rule { width: 540px; height: 6px; border-radius: 4px;\n'
     '        background: var(--brand-flame); transform-origin: left center; margin: 18px 0 24px; }'),
    ('#s59-sub { font-size: 70px;', '#s59-sub { font-size: 46px;'),
    ('color: var(--brand-white); max-width: 700px; }', 'color: var(--brand-white); max-width: 480px; }'),
    # ---- 3x graph card ----
    ('align-items: flex-start; padding: 0 116px 300px;',
     'align-items: flex-start; padding: 0 76px 150px;'),
    ('#gcard-eyebrow { font-size: 27px;', '#gcard-eyebrow { font-size: 21px;'),
    ('white-space: nowrap; margin-bottom: 56px; }', 'white-space: nowrap; margin-bottom: 34px; }'),
    ('.grow { margin-bottom: 56px; }', '.grow { margin-bottom: 32px; }'),
    ('.glabel { font-size: 34px;', '.glabel { font-size: 24px;'),
    ('.gbar { height: 92px;', '.gbar { height: 60px;'),
    # Bar widths stay the real 1:3 ratio — that ratio IS the datum.
    ('.gbar-dim { width: 250px; }', '.gbar-dim { width: 200px; }'),
    ('.gbar-hot { width: 750px; }', '.gbar-hot { width: 600px; }'),
    ('#gcard-lock { display: flex; align-items: center; gap: 22px; margin-top: 16px; }',
     '#gcard-lock { display: flex; align-items: center; gap: 16px; margin-top: 10px; }'),
    ('#gcard-mult { font-size: 210px;', '#gcard-mult { font-size: 140px;'),
    ('#gcard-vs { font-size: 54px;', '#gcard-vs { font-size: 36px;'),
    # ---- message card ----
    ('align-items: center; text-align: center; padding: 0 116px 300px;',
     'align-items: center; text-align: center; padding: 0 84px 150px;'),
    ('#card-eyebrow { font-size: 30px; font-weight: 600; letter-spacing: 0.34em;\n'
     '        text-transform: uppercase; color: var(--brand-white); margin-bottom: 40px; }',
     '#card-eyebrow { font-size: 24px; font-weight: 600; letter-spacing: 0.34em;\n'
     '        text-transform: uppercase; color: var(--brand-white); margin-bottom: 26px; }'),
    ('.card-line { font-size: 78px; font-weight: 800; line-height: 1.06;\n'
     '        letter-spacing: -0.02em; max-width: 830px; }',
     '.card-line { font-size: 54px; font-weight: 800; line-height: 1.06;\n'
     '        letter-spacing: -0.02em; max-width: 620px; }'),
    ('#card-arrow { margin: 34px 0; }', '#card-arrow { margin: 22px 0; }'),
    ('#card-pill { margin-top: 54px; display: inline-flex; align-items: center; gap: 18px;\n'
     '        font-size: 34px; font-weight: 700; color: var(--brand-white);',
     '#card-pill { margin-top: 36px; display: inline-flex; align-items: center; gap: 14px;\n'
     '        font-size: 27px; font-weight: 700; color: var(--brand-white);'),
    ('padding: 22px 44px; border-radius: 999px; }', 'padding: 16px 34px; border-radius: 999px; }'),
    ('#card-pill .x { color: var(--brand-flame); font-size: 36px; line-height: 1; }',
     '#card-pill .x { color: var(--brand-flame); font-size: 28px; line-height: 1; }'),
    ('<svg id="card-arrow" width="56" height="86"', '<svg id="card-arrow" width="40" height="62"'),
    # ---- end card (client reference layout) ----
    # #s7-bloom / #s7-glow are sized in %, so they carry over untouched.
    ('align-items: center; text-align: center; padding: 0 96px 400px; }',
     'align-items: center; text-align: center; padding: 0 76px 170px; }'),
    ('#s7-logo { width: 800px; height: auto; display: block; margin-bottom: 84px;',
     '#s7-logo { width: 540px; height: auto; display: block; margin-bottom: 54px;'),
    ('#s7-head { font-size: 66px;', '#s7-head { font-size: 46px;'),
    ('max-width: 560px; color: var(--brand-white); }',
     'max-width: 390px; color: var(--brand-white); }'),
    ('#s7-pill { margin-top: 76px; font-size: 52px;', '#s7-pill { margin-top: 50px; font-size: 36px;'),
    ('padding: 38px 90px; border-radius: 999px;', 'padding: 26px 62px; border-radius: 999px;'),
]

s = io.open(SRC, encoding='utf-8').read()
missing = [old for old, _ in RULES if old not in s]
if missing:
    print('make-square.py: these master strings no longer exist — update RULES:', file=sys.stderr)
    for m in missing:
        print('  ' + m.splitlines()[0][:96], file=sys.stderr)
    sys.exit(1)
for old, new in RULES:
    s = s.replace(old, new)

# Every b-roll + A-roll source swaps to the 1:1-cropped variant.
s, n = re.subn(r'assets/broll/9x16/', 'assets/broll/1x1/', s)
assert n, 'no 9x16 media paths found'

io.open(DST, 'w', encoding='utf-8').write(s)
print('wrote %s (%d rules, %d media paths)' % (os.path.relpath(DST, ROOT), len(RULES), n))
