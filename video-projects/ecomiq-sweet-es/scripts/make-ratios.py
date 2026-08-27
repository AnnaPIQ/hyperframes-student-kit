#!/usr/bin/env python3
"""
make-ratios.py — generate the 4:5 delivery composition FROM index.html.

    python3 scripts/make-ratios.py            # writes build/4x5/index.html

index.html is the 9:16 master (1080x1920). The 4:5 cut (1080x1350) is a real
re-layout, not a centre-crop of the 9:16 render:

  * The b-roll and A-roll for 4:5 are cut from the 4K masters with their own
    crop windows (see prep-assets.sh), so nothing is upscaled and Sean stays
    centred. This script only re-points the asset suffix.
  * Width is 1080 in both ratios, so the type scale is width-constrained and
    carries over unchanged. Only the vertical band moves, via the
    --inner-top / --inner-h / --end-logo custom properties.
  * The bottom ~30% must stay clear for platform subtitles: 30% of 1350 is
    405px, so card content has to finish above y=945. The band below centres
    content at y=470 and the deepest card lands well inside that.

Output goes to build/<tag>/ as a self-contained mini-project (index.html +
hyperframes.json + meta.json + a hard-linked assets tree), because
`hyperframes lint` rejects two root-level compositions in one project folder,
and does not resolve a symlinked assets directory. Render it with:

    cd build/4x5 && npx hyperframes render --quality high --output out.mp4
"""
import re, sys, json, shutil, subprocess, pathlib

SRC = pathlib.Path('index.html')
RATIOS = {
    # tag: (width, height, inner-top, inner-h, end-logo)
    '4x5': (1080, 1350, '60px', '820px', '560px'),
}

def build(tag, w, h, itop, ih, elogo):
    s = SRC.read_text()
    base_id = re.search(r'data-composition-id="([^"]+)"', s).group(1)
    new_id = f'{base_id}-{tag}'

    s = s.replace('<meta name="viewport" content="width=1080, height=1920" />',
                  f'<meta name="viewport" content="width={w}, height={h}" />')
    s = s.replace(':root { --inner-top: 190px; --inner-h: 1150px; --end-logo: 720px; }',
                  f':root {{ --inner-top: {itop}; --inner-h: {ih}; --end-logo: {elogo}; }}')
    s = s.replace('html, body { width: 1080px; height: 1920px;',
                  f'html, body {{ width: {w}px; height: {h}px;')
    s = s.replace('data-width="1080" data-height="1920"', f'data-width="{w}" data-height="{h}"')

    # 4:5 media was cut from the masters with its own crop window.
    s = s.replace('-9x16.mp4', f'-{tag}.mp4')

    # A distinct composition id so both ratios can coexist in one project.
    s = s.replace(f'data-composition-id="{base_id}"', f'data-composition-id="{new_id}"')
    s = s.replace(f"window.__timelines['{base_id}']", f"window.__timelines['{new_id}']")
    s = s.replace(f'<title>{base_id}</title>', f'<title>{new_id}</title>')

    d = pathlib.Path('build') / tag
    d.mkdir(parents=True, exist_ok=True)
    out = d / 'index.html'
    out.write_text(s)
    # Self-contained mini-project so the CLI can run inside build/<tag>/.
    (d / 'hyperframes.json').write_text(pathlib.Path('hyperframes.json').read_text())
    meta = json.loads(pathlib.Path('meta.json').read_text())
    meta.update({'id': new_id, 'name': new_id, 'width': w, 'height': h})
    (d / 'meta.json').write_text(json.dumps(meta, indent=2) + '\n')
    # Hard-link the asset tree in: a symlinked directory is not resolved by
    # `hyperframes lint`, and hard links cost no extra disk.
    dst = d / 'assets'
    if dst.exists():
        shutil.rmtree(dst, ignore_errors=True) if not dst.is_symlink() else dst.unlink()
    subprocess.run(['cp', '-al', 'assets', str(dst)], check=True)
    # Fail loudly rather than silently shipping a 9:16-shaped 4:5 file.
    assert f'-{tag}.mp4' in s and '-9x16.mp4' not in s, 'asset suffix not fully rewritten'
    assert f'data-height="{h}"' in s, 'root height not rewritten'
    assert f"window.__timelines['{new_id}']" in s, 'timeline key not rewritten'
    print(f'  ✓ {out}  {w}x{h}  comp id "{new_id}"  '
          f'content must clear y={int(h*0.7)}')

if not SRC.exists():
    sys.exit('index.html not found — run from the project folder')
for tag, spec in RATIOS.items():
    build(tag, *spec)
