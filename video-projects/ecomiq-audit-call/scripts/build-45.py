#!/usr/bin/env python3
"""
build-45.py - generate the 4:5 sibling project from the 9:16 master.

  python3 scripts/build-45.py

Never hand-edit ../ecomiq-audit-call-45/index.html: it is overwritten here.
Edit index.html in THIS project and re-run.

Why a sibling project rather than a second root composition
-----------------------------------------------------------
Two root <div data-composition-id> in one project is a `multiple_root_compositions`
lint error, and pointing a composition at `../assets/` is
`invalid_parent_traversal_in_asset_path`. So the 4:5 gets its own folder with its
own hyperframes.json, meta.json and assets/.

Why this is now a :root swap
----------------------------
The master keeps every size and offset in CSS custom properties on :root, so the
only real difference between the cuts is that token block. The previous version
ran ~20 separate string substitutions against individual CSS rules and broke
every time the master's whitespace moved. Anything still substituted below is
structural (dimensions, composition id, bed filename), and each one asserts.
"""
import re
import shutil
import subprocess
import sys
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent
DST = SRC.parent / "ecomiq-audit-call-45"

# 1080x1350 is 570px shorter than 1080x1920. The type comes down a touch so the
# beat block doesn't crowd the logo, and the block is top-anchored, so the whole
# lower half stays clear for the subtitles added downstream - no reserved band
# to measure any more.
ROOT_45 = """      :root {
        --fw: 1080px;  --fh: 1350px;
        --gutter: 66px;
        --logo-top: 72px;   --logo-w: 248px;
        --beat-top: 226px;
        --lead: 50px;
        --head: 90px;
        --sub: 34px;
        --op: 118px;
        --card-pad: 28px;
        --card-num: 68px;   --spark-h: 48px;
        --tile-label: 23px;
        --tile-value: 46px;
        --pill: 36px;
        --ec-logo: 470px;  --ec-cta: 40px;
      }"""


def sub(s, pattern, repl, label):
    # DOTALL: the token block and the <title> both span lines.
    out, n = re.subn(pattern, repl, s, count=1, flags=re.DOTALL)
    if n != 1:
        sys.exit(f"build-45: '{label}' did not match - the master has drifted, "
                 f"fix this script rather than hand-editing the 4:5.")
    return out


def main():
    html = (SRC / "index.html").read_text()

    html = sub(html, r":root \{\n        --fw: 1080px;.*?\n      \}", ROOT_45, "root token block")
    html = sub(html, r'<meta name="viewport" content="width=1080, height=1920" />',
               '<meta name="viewport" content="width=1080, height=1350" />', "viewport")
    html = sub(html, r"<title>.*?</title>",
               "<title>EcomIQ - Book a Free Audit Call (4:5)</title>", "title")
    html = sub(html, r'data-composition-id="ecomiq-audit-call"',
               'data-composition-id="ecomiq-audit-call-45"', "composition id")
    html = sub(html, r'data-height="1920"', 'data-height="1350"', "root data-height")
    html = sub(html, r'src="assets/broll-916\.mp4"', 'src="assets/broll-45.mp4"', "bed source")
    html = sub(html, r'window\.__timelines\["ecomiq-audit-call"\]',
               'window.__timelines["ecomiq-audit-call-45"]', "timeline key")

    # Anything still naming the 9:16 would silently point the 4:5 at the wrong
    # asset or register under the wrong key.
    leftovers = [m for m in ("1920", "broll-916", '"ecomiq-audit-call"') if m in html]
    if leftovers:
        sys.exit(f"build-45: 9:16 values survived the transform: {leftovers}")

    DST.mkdir(exist_ok=True)
    (DST / "index.html").write_text(html)
    (DST / "renders").mkdir(exist_ok=True)
    (DST / "assets").mkdir(exist_ok=True)

    # Assets are copied, not symlinked, so the 4:5 renders standalone.
    for rel in ("brand-tokens.css", "ecomiq-logo-white.svg", "sean-vo.m4a",
                "sean-vo.transcript.json"):
        shutil.copy2(SRC / "assets" / rel, DST / "assets" / rel)
    for rel in ("fonts", "vendor"):
        shutil.copytree(SRC / "assets" / rel, DST / "assets" / rel, dirs_exist_ok=True)
    bed = SRC / "assets" / "broll-45.mp4"
    if bed.exists():
        shutil.copy2(bed, DST / "assets" / "broll-45.mp4")
    else:
        print("note: assets/broll-45.mp4 missing - run build-broll.py first")

    for rel in ("hyperframes.json", "meta.json"):
        txt = (SRC / rel).read_text()
        txt = txt.replace("ecomiq-audit-call", "ecomiq-audit-call-45").replace("1920", "1350")
        (DST / rel).write_text(txt)

    print(f"wrote {DST}/index.html")
    r = subprocess.run(["npx", "hyperframes", "lint"], cwd=DST, capture_output=True, text=True)
    print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr.strip())


if __name__ == "__main__":
    main()
