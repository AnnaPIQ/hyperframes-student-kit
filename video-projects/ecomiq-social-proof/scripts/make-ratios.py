#!/usr/bin/env python3
"""
make-ratios.py — derive the shorter-frame compositions from index.html (9:16).

Every ratio is ONE edit: same cut sheet, same timeline, same word cues. Only the
frame height, the b-roll variant folder, the subtitle-safe zone and the type scale
differ. Keeping that as a scripted transform (rather than hand-edited sibling files)
means a change to the 9:16 master can never silently miss a ratio.

    python3 scripts/make-ratios.py            # all ratios
    python3 scripts/make-ratios.py 4x5        # just one

Add a ratio by adding a SPEC entry — the substitution templates are shared, so no
new rules are needed. Values are the 9:16 numbers scaled for the shorter frame and
then adjusted by eye where the frame height, not the width, is the constraint.
"""
import io, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, 'index.html')

SPEC = {
    # 1080x1350 — Meta / Instagram feed. NOTE the small bottom paddings: 4:5 is short
    # relative to the card content, so centring already leaves ~30% of the frame clear
    # for subtitles. Carrying the taller frames' padding across pushes everything into
    # the top half and opens a dead band underneath.
    '4x5': dict(
        out='compositions/portrait45.html', h=1350, comp='ecomiq-social-proof-4x5',
        media='4x5', label='4:5', whip=63,
        logo=(62, 88, 244),
        s59_pad='0 88px 120px', s59_eb=(25, 22), s59_num=240, s59_logo=(275, 36),
        s59_rule=(640, 7, '22px 0 28px'), s59_sub=(56, 570),
        g_pad='0 88px 90px', g_eb=24, g_eb_mb=42, g_row_mb=42, g_label=28,
        g_bar=74, g_dim=220, g_hot=660, g_gap=(18, 12), g_mult=168, g_vs=43,
        c_pad='0 96px 90px', c_eb=(27, 32), c_line=(64, 720), c_arrow_m=27,
        c_pill=(44, 16, 30), c_pill_pad='19px 39px', c_x=32, arrow_svg=(48, 74),
        s7_pad='0 86px 130px', s7_logo=(660, 66), s7_head=52, s7_head_mw=520,
        s7_pill=(62, 44), s7_pill_pad='32px 76px',
    ),
    # 1080x1080 — kept working so the square is one command away.
    '1x1': dict(
        out='compositions/square.html', h=1080, comp='ecomiq-social-proof-1x1',
        media='1x1', label='1:1', whip=52,
        logo=(52, 72, 228),
        s59_pad='0 76px 210px', s59_eb=(22, 18), s59_num=196, s59_logo=(225, 30),
        s59_rule=(540, 6, '18px 0 24px'), s59_sub=(46, 480),
        g_pad='0 76px 150px', g_eb=21, g_eb_mb=34, g_row_mb=32, g_label=24,
        g_bar=60, g_dim=200, g_hot=600, g_gap=(16, 10), g_mult=140, g_vs=36,
        c_pad='0 84px 150px', c_eb=(24, 26), c_line=(54, 620), c_arrow_m=22,
        c_pill=(36, 14, 27), c_pill_pad='16px 34px', c_x=28, arrow_svg=(40, 62),
        s7_pad='0 76px 170px', s7_logo=(540, 54), s7_head=42, s7_head_mw=450,
        s7_pill=(50, 36), s7_pill_pad='26px 62px',
    ),
}


def rules(s):
    """(old, new) pairs. `old` holds the 9:16 master's literal values."""
    return [
        # ---- frame ----
        ('<meta name="viewport" content="width=1080, height=1920" />',
         f'<meta name="viewport" content="width=1080, height={s["h"]}" />'),
        ('<title>EcomIQ — Dryft Sleep social proof (9:16)</title>',
         f'<title>EcomIQ — Dryft Sleep social proof ({s["label"]})</title>'),
        ('width: 1080px; height: 1920px; overflow: hidden;',
         f'width: 1080px; height: {s["h"]}px; overflow: hidden;'),
        ('.bwrap video { width: 1080px; height: 1920px; object-fit: cover; display: block; }',
         f'.bwrap video {{ width: 1080px; height: {s["h"]}px; object-fit: cover; display: block; }}'),
        ('data-composition-id="ecomiq-social-proof"', f'data-composition-id="{s["comp"]}"'),
        ('data-height="1920"', f'data-height="{s["h"]}"'),
        ('window.__timelines["ecomiq-social-proof"] = tl;',
         f'window.__timelines["{s["comp"]}"] = tl;'),
        # Whip travel scales with the frame: +/-90px on 1920 reads like +/-63 on 1350.
        ('const OUT_D = 0.333, IN_D = 0.667, WHIP_Y = 90;',
         f'const OUT_D = 0.333, IN_D = 0.667, WHIP_Y = {s["whip"]};'),
        # ---- persistent logo ----
        ('#logo-hold { position: absolute; top: 74px; left: 108px; width: 260px; z-index: 40; }',
         '#logo-hold {{ position: absolute; top: {0}px; left: {1}px; width: {2}px; z-index: 40; }}'
         .format(*s['logo'])),
        # ---- +59% stat card ----
        ('align-items: flex-start; padding: 0 108px 470px;',
         f'align-items: flex-start; padding: {s["s59_pad"]};'),
        ('#s59-logo { width: 340px; height: auto; display: block; margin-bottom: 46px;',
         '#s59-logo {{ width: {0}px; height: auto; display: block; margin-bottom: {1}px;'
         .format(*s['s59_logo'])),
        ('#s59-eyebrow { font-size: 28px; font-weight: 700; letter-spacing: 0.20em;\n'
         '        text-transform: uppercase; color: var(--brand-white); margin-bottom: 26px; }',
         '#s59-eyebrow {{ font-size: {0}px; font-weight: 700; letter-spacing: 0.20em;\n'
         '        text-transform: uppercase; color: var(--brand-white); margin-bottom: {1}px; }}'
         .format(*s['s59_eb'])),
        ('#s59-num { font-size: 300px;', f'#s59-num {{ font-size: {s["s59_num"]}px;'),
        ('#s59-rule { width: 790px; height: 7px; border-radius: 4px;\n'
         '        background: var(--brand-flame); transform-origin: left center; margin: 26px 0 34px; }',
         '#s59-rule {{ width: {0}px; height: {1}px; border-radius: 4px;\n'
         '        background: var(--brand-flame); transform-origin: left center; margin: {2}; }}'
         .format(*s['s59_rule'])),
        ('#s59-sub { font-size: 70px;', f'#s59-sub {{ font-size: {s["s59_sub"][0]}px;'),
        ('color: var(--brand-white); max-width: 700px; }',
         f'color: var(--brand-white); max-width: {s["s59_sub"][1]}px; }}'),
        # ---- 3x graph card ----
        ('align-items: flex-start; padding: 0 116px 300px;',
         f'align-items: flex-start; padding: {s["g_pad"]};'),
        ('#gcard-eyebrow { font-size: 27px;', f'#gcard-eyebrow {{ font-size: {s["g_eb"]}px;'),
        ('white-space: nowrap; margin-bottom: 56px; }',
         f'white-space: nowrap; margin-bottom: {s["g_eb_mb"]}px; }}'),
        ('.grow { margin-bottom: 56px; }', f'.grow {{ margin-bottom: {s["g_row_mb"]}px; }}'),
        ('.glabel { font-size: 34px;', f'.glabel {{ font-size: {s["g_label"]}px;'),
        ('.gbar { height: 92px;', f'.gbar {{ height: {s["g_bar"]}px;'),
        # Bar widths keep the real 1:3 ratio — that ratio IS the datum.
        ('.gbar-dim { width: 250px; }', f'.gbar-dim {{ width: {s["g_dim"]}px; }}'),
        ('.gbar-hot { width: 750px; }', f'.gbar-hot {{ width: {s["g_hot"]}px; }}'),
        ('#gcard-lock { display: flex; align-items: center; gap: 22px; margin-top: 16px; }',
         '#gcard-lock {{ display: flex; align-items: center; gap: {0}px; margin-top: {1}px; }}'
         .format(*s['g_gap'])),
        ('#gcard-mult { font-size: 210px;', f'#gcard-mult {{ font-size: {s["g_mult"]}px;'),
        ('#gcard-vs { font-size: 54px;', f'#gcard-vs {{ font-size: {s["g_vs"]}px;'),
        # ---- message card ----
        ('align-items: center; text-align: center; padding: 0 116px 300px;',
         f'align-items: center; text-align: center; padding: {s["c_pad"]};'),
        ('#card-eyebrow { font-size: 30px; font-weight: 600; letter-spacing: 0.34em;\n'
         '        text-transform: uppercase; color: var(--brand-white); margin-bottom: 40px; }',
         '#card-eyebrow {{ font-size: {0}px; font-weight: 600; letter-spacing: 0.34em;\n'
         '        text-transform: uppercase; color: var(--brand-white); margin-bottom: {1}px; }}'
         .format(*s['c_eb'])),
        ('.card-line { font-size: 78px; font-weight: 800; line-height: 1.06;\n'
         '        letter-spacing: -0.02em; max-width: 830px; }',
         '.card-line {{ font-size: {0}px; font-weight: 800; line-height: 1.06;\n'
         '        letter-spacing: -0.02em; max-width: {1}px; }}'.format(*s['c_line'])),
        ('#card-arrow { margin: 34px 0; }', f'#card-arrow {{ margin: {s["c_arrow_m"]}px 0; }}'),
        ('#card-pill { margin-top: 54px; display: inline-flex; align-items: center; gap: 18px;\n'
         '        font-size: 34px; font-weight: 700; color: var(--brand-white);',
         '#card-pill {{ margin-top: {0}px; display: inline-flex; align-items: center; gap: {1}px;\n'
         '        font-size: {2}px; font-weight: 700; color: var(--brand-white);'
         .format(*s['c_pill'])),
        ('padding: 22px 44px; border-radius: 999px; }',
         f'padding: {s["c_pill_pad"]}; border-radius: 999px; }}'),
        ('#card-pill .x { color: var(--brand-flame); font-size: 36px; line-height: 1; }',
         f'#card-pill .x {{ color: var(--brand-flame); font-size: {s["c_x"]}px; line-height: 1; }}'),
        ('<svg id="card-arrow" width="56" height="86"',
         '<svg id="card-arrow" width="{0}" height="{1}"'.format(*s['arrow_svg'])),
        # ---- end card (client reference layout) ----
        # #s7-bloom / #s7-glow are sized in %, so they carry over untouched.
        ('align-items: center; text-align: center; padding: 0 96px 400px; }',
         f'align-items: center; text-align: center; padding: {s["s7_pad"]}; }}'),
        ('#s7-logo { width: 800px; height: auto; display: block; margin-bottom: 84px;',
         '#s7-logo {{ width: {0}px; height: auto; display: block; margin-bottom: {1}px;'
         .format(*s['s7_logo'])),
        ('#s7-head { font-size: 66px;', f'#s7-head {{ font-size: {s["s7_head"]}px;'),
        ('        max-width: 560px; color: var(--brand-white); }',
         f'        max-width: {s["s7_head_mw"]}px; color: var(--brand-white); }}'),
        ('#s7-pill { margin-top: 76px; font-size: 52px;',
         '#s7-pill {{ margin-top: {0}px; font-size: {1}px;'.format(*s['s7_pill'])),
        ('padding: 38px 90px; border-radius: 999px;',
         f'padding: {s["s7_pill_pad"]}; border-radius: 999px;'),
    ]


def build(key):
    spec = SPEC[key]
    src = io.open(SRC, encoding='utf-8').read()
    pairs = rules(spec)
    missing = [o for o, _ in pairs if o not in src]
    if missing:
        print(f'make-ratios.py [{key}]: these master strings no longer exist — update rules():',
              file=sys.stderr)
        for m in missing:
            print('  ' + m.splitlines()[0][:96], file=sys.stderr)
        return False
    for o, n in pairs:
        src = src.replace(o, n)
    src, n = re.subn(r'assets/broll/9x16/', f'assets/broll/{spec["media"]}/', src)
    assert n, 'no 9x16 media paths found'
    dst = os.path.join(ROOT, spec['out'])
    io.open(dst, 'w', encoding='utf-8').write(src)
    print(f'wrote {spec["out"]:32s} ({len(pairs)} rules, {n} media paths)')
    return True


targets = sys.argv[1:] or list(SPEC)
bad = [t for t in targets if t not in SPEC]
if bad:
    sys.exit(f'unknown ratio(s): {bad}; known: {list(SPEC)}')
sys.exit(0 if all([build(t) for t in targets]) else 1)
