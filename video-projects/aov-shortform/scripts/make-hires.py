#!/usr/bin/env python3
"""
make-hires.py, derive a 2x master from a composition.

    python3 scripts/make-hires.py compositions/aov-45.html compositions/aov-45-2x.html

The CLI's --resolution flag only accepts fixed presets, and 4:5 has none
(portrait-4k covers 9:16, so the vertical cut uses that instead). This does the
same job for any aspect: the root keeps its original CSS pixel box and carries
`zoom: 2`, so Chrome lays the whole composition out at double scale and
rasterises text, the logo SVG and every shadow at the larger size. Because the
GSAP tweens are written in CSS pixels too, their translations and blur radii
scale with it and need no edits.

The montage bed is 1080 wide at source, so the footage is upscaled rather than
resolved finer. What genuinely gains detail is everything drawn by the browser:
the end card, its type, and the corner logo.
"""
import pathlib
import re
import sys

if len(sys.argv) != 3:
    sys.exit(__doc__.strip())

src = pathlib.Path(sys.argv[1])
dst = pathlib.Path(sys.argv[2])
html = src.read_text()


def need(pattern, text=None):
    """Substitute once, failing loudly if the source has drifted."""
    global html
    find, replace = pattern
    target = text if text is not None else html
    if find not in target:
        sys.exit(f"make-hires.py: {src} does not contain:\n  {find}")
    html = html.replace(find, replace)


# Root composition id, so the 2x variant registers its own timeline.
m = re.search(r'data-composition-id="([^"]+)"', html)
if not m:
    sys.exit("make-hires.py: no data-composition-id found")
comp_id = m.group(1)
need((f'data-composition-id="{comp_id}"', f'data-composition-id="{comp_id}-2x"'))
need((f'window.__timelines["{comp_id}"]', f'window.__timelines["{comp_id}-2x"]'))

# Composition frame doubles; the CSS box inside it does not.
m = re.search(r'data-width="(\d+)"\s*\n\s*data-height="(\d+)"', html)
if not m:
    sys.exit("make-hires.py: could not read data-width / data-height")
w, h = int(m.group(1)), int(m.group(2))
need((m.group(0), m.group(0).replace(f'"{w}"', f'"{w * 2}"', 1)
                             .replace(f'"{h}"', f'"{h * 2}"', 1)))

# The page grows to the output size; #root stays at the authored size and is
# zoomed into it, so every child keeps its original coordinates.
need((f'        width: {w}px; height: {h}px; overflow: hidden;',
      f'        width: {w * 2}px; height: {h * 2}px; overflow: hidden;'))
# The engine writes the composition size onto #root as an inline style, so the
# authored box has to be reasserted with !important. Without it #root is
# 2x wide AND zoomed 2x, which lays the content out in a 4x box and strands it
# in the bottom-right quadrant.
need(('    <style>',
      '    <style>\n'
      '      /* 2x master. #root keeps its authored CSS pixel box and is zoomed\n'
      '         into the doubled frame, so Chrome re-lays-out and rasterises the\n'
      '         card type, logo and shadows at full size. !important beats the\n'
      '         inline size the engine sets from data-width / data-height. */\n'
      f'      #root {{ position: absolute; top: 0; left: 0;\n'
      f'        width: {w}px !important; height: {h}px !important; zoom: 2; }}'))

dst.write_text(html)
print(f"wrote {dst}  ({w * 2}x{h * 2}, 2x of {src.name})")
