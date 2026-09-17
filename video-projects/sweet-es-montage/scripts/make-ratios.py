#!/usr/bin/env python3
"""
make-ratios.py — emit the 4:5 cut from the 9:16 master composition.

    python3 scripts/make-ratios.py            # -> build/4x5/
    python3 scripts/make-ratios.py --crop     # -> build/4x5/ using the crop asset

index.html is the 9:16 master (1080x1920). This reads it and writes a
standalone 1080x1350 project under build/4x5/, rewriting exactly four things:

  1. the viewport meta + html/body dimensions
  2. the root data-width / data-height
  3. the ":root" ratio-metrics block (type scale, safe area, logo, bar widths)
  4. the montage asset the <video> points at

Nothing else is touched, so the two ratios can never drift apart in timing.
Assets are copied (not symlinked) so build/4x5/ renders standalone.
"""
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "build" / "4x5"
CROP = "--crop" in sys.argv

W, H = 1080, 1350

# 4:5 metrics. The band baseline sits at y=930 so every graphic clears the
# bottom-30% subtitle zone (y>945 at this height), and type steps down ~12%
# to hold the same optical weight in a frame that is 570px shorter.
METRICS_4X5 = """      :root {
        --band-bottom: 420px;   /* band baseline — keeps every graphic above the subtitle zone */
        --band-pad: 56px;
        --logo-top: 56px;   --logo-left: 56px;   --logo-w: 260px;
        --eyebrow: 27px;    --figure: 158px;     --label: 35px;
        --name: 66px;       --statement: 55px;   --barh: 56px;
        --end-logo: 580px;  --end-line: 66px;    --end-pill: 36px;
        --end-top: 150px;   --end-bottom: 330px;
        --cap-w: 220px;     --bar1: 130px;       --bar3: 390px;
      }"""

ASSET = "assets/montage-4x5-crop.mp4" if CROP else "assets/montage-4x5.mp4"


def main() -> int:
    src = (ROOT / "index.html").read_text()
    out = src

    # 1 · viewport + stage dimensions
    out = out.replace(
        '<meta name="viewport" content="width=1080, height=1920" />',
        f'<meta name="viewport" content="width={W}, height={H}" />',
    )
    out = out.replace(
        "html, body { width: 1080px; height: 1920px;",
        f"html, body {{ width: {W}px; height: {H}px;",
    )

    # 2 · root composition box
    out = out.replace('data-width="1080" data-height="1920"', f'data-width="{W}" data-height="{H}"')

    # 3 · the ratio-metrics block
    out, n = re.subn(
        r"      :root \{\n(?:.*\n)*?      \}",
        METRICS_4X5.replace("\\", "\\\\"),
        out,
        count=1,
    )
    if n != 1:
        raise SystemExit("make-ratios: could not find the :root metrics block")

    # 4 · the montage asset
    out = out.replace('src="assets/montage-9x16.mp4"', f'src="{ASSET}"')
    if ASSET not in out:
        raise SystemExit("make-ratios: montage asset was not swapped")

    # ---- emit ------------------------------------------------------------
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "renders").mkdir(parents=True)
    (OUT / "index.html").write_text(out)
    shutil.copytree(ROOT / "assets", OUT / "assets")
    # the 9:16 montage is dead weight in the 4:5 build
    (OUT / "assets" / "montage-9x16.mp4").unlink(missing_ok=True)
    unused = "assets/montage-4x5.mp4" if CROP else "assets/montage-4x5-crop.mp4"
    (OUT / unused).unlink(missing_ok=True)

    shutil.copy(ROOT / "hyperframes.json", OUT / "hyperframes.json")
    meta = json.loads((ROOT / "meta.json").read_text())
    meta["width"], meta["height"] = W, H
    (OUT / "meta.json").write_text(json.dumps(meta, indent=2) + "\n")

    print(f"build/4x5/ ready ({W}x{H}, {ASSET})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
