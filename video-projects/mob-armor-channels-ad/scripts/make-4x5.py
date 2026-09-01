#!/usr/bin/env python3
"""Generate compositions/index-4x5.html from index.html.

The 9:16 composition is the single source of truth. This script only swaps
*layout constants and asset paths* — it never touches timing, copy, colour or
animation, so the two deliverables cannot drift apart beat-for-beat.

Every swap is anchored on an exact string that MUST appear exactly once. If any
anchor matches zero times (someone renamed or reformatted it) or more than once
(it stopped being unique), the script hard-fails and writes nothing. That check
has caught real drift twice; do not soften it into a regex or a "replace all".

The output lives under compositions/ rather than the project root: hyperframes
lint rejects two root-level files carrying data-composition-id (it would discover
both as entry points and double the audio). Render it with
    npx hyperframes render -c compositions/index-4x5.html
Asset paths stay ROOT-relative (assets/...), not ../assets/ — compositions are
served with the project root as their base URL.

Usage:  python3 scripts/make-4x5.py            # from the project root
        python3 scripts/make-4x5.py --check    # verify the existing output is current
"""

from __future__ import annotations

import argparse
import pathlib
import sys

SRC = "index.html"
DST = "compositions/index-4x5.html"

# 9:16 is 1080x1920 with the platform subtitle zone below y=1344.
# 4:5  is 1080x1350 with the platform subtitle zone below y=945.
# Width is 1080 in both, so horizontal metrics and every font size carry over
# untouched; only vertical space changes.
SWAPS: list[tuple[str, str, str]] = [
    (
        "viewport",
        '<meta name="viewport" content="width=1080, height=1920" />',
        '<meta name="viewport" content="width=1080, height=1350" />',
    ),
    (
        "title",
        "<title>Mob Armor × EcomIQ — social proof (9:16)</title>",
        "<title>Mob Armor × EcomIQ — social proof (4:5)</title>",
    ),
    (
        "stage height",
        "--stage-h: 1920px;",
        "--stage-h: 1350px;",
    ),
    (
        "subtitle-safe zone",
        "--safe-bottom: 576px;   /* 1920 - 1344 : platform subtitle zone, kept clear */",
        "--safe-bottom: 405px;   /* 1350 -  945 : platform subtitle zone, kept clear */",
    ),
    (
        "pinned logo top",
        "--logo-top: 96px;",
        "--logo-top: 64px;",
    ),
    (
        "pinned logo width",
        "--logo-w: 300px;",
        "--logo-w: 260px;",
    ),
    (
        "opening wordmark width",
        "--wordmark-w: 780px;",
        "--wordmark-w: 700px;",
    ),
    (
        "end-card lockup width",
        "--endmark-w: 620px;",
        "--endmark-w: 560px;",
    ),
    (
        "card padding-top",
        "--pad-top: 120px;",
        "--pad-top: 84px;",
    ),
    (
        "composition id (markup)",
        'data-composition-id="mob-armor-channels-ad"',
        'data-composition-id="mob-armor-channels-ad-4x5"',
    ),
    (
        "composition id (timeline registration)",
        "window.__timelines['mob-armor-channels-ad'] = tl;",
        "window.__timelines['mob-armor-channels-ad-4x5'] = tl;",
    ),
    (
        # The linter reads both files as one project graph and flags two <audio>
        # overlapping on the same track, though they never render together.
        "VO track index",
        'data-track-index="3"',
        'data-track-index="23"',
    ),
    (
        "root data-height",
        'data-height="1920"',
        'data-height="1350"',
    ),
    (
        "A-roll source",
        'src="assets/aroll/aroll-9x16.mp4"',
        'src="assets/aroll/aroll-4x5.mp4"',
    ),
    (
        "b-roll sp1 source",
        'src="assets/broll/sp1-sweetes-9x16.mp4"',
        'src="assets/broll/sp1-sweetes-4x5.mp4"',
    ),
    (
        "b-roll sp2 source",
        'src="assets/broll/sp2-dryft-9x16.mp4"',
        'src="assets/broll/sp2-dryft-4x5.mp4"',
    ),
    (
        # sp3 is the landscape source: 9:16 insets it at 1080x608 on navy, 4:5
        # takes its own 864px crop and goes full-bleed.
        "b-roll sp3 source",
        'src="assets/broll/sp3-claw-9x16.mp4"',
        'src="assets/broll/sp3-claw-4x5.mp4"',
    ),
    (
        "sp3 inset top",
        "--b3-top: 428px;   /* landscape inset, centred above the subtitle line */",
        "--b3-top: 0px;     /* 4:5 takes its own crop, so sp3 is full-bleed */",
    ),
    (
        "sp3 inset height",
        "--b3-h: 608px;",
        "--b3-h: 1350px;",
    ),
]
# Deliberately NOT swapped: every font size, horizontal padding, the streak's
# x: 1080 travel, and all 46 tween times. Width is 1080 in both aspects and the
# timing is the edit — if either ever needs to differ, that is a design decision
# for index.html, not something this script should paper over.

BANNER = (
    "    <!-- GENERATED FILE — do not edit.\n"
    "         Produced by scripts/make-4x5.py from index.html, which is the source\n"
    "         of truth for timing, copy and animation. Re-run the script after any\n"
    "         edit to index.html. -->\n"
)


def build(src_text: str) -> str:
    out = src_text
    failures: list[str] = []

    for label, old, new in SWAPS:
        n = out.count(old)
        if n != 1:
            failures.append(
                f"  · {label}: anchor matched {n} times, expected exactly 1\n"
                f"      anchor: {old!r}"
            )
            continue
        out = out.replace(old, new)

    if failures:
        sys.stderr.write(
            "make-4x5.py: REFUSING TO WRITE — index.html has drifted away from the\n"
            "anchors this script swaps on. Fix the anchor (or update SWAPS) before\n"
            "regenerating, so the two aspect ratios cannot silently diverge.\n\n"
            + "\n".join(failures)
            + "\n"
        )
        raise SystemExit(2)

    # Belt and braces: nothing 9:16-specific may survive into the 4:5 output.
    leftovers = [tok for tok in ("1920px", 'data-height="1920"', "-9x16.mp4") if tok in out]
    # Asset paths must stay ROOT-relative: compositions/ files are served with the
    # project root as their base URL, so "../assets/" 404s in Studio preview.
    if "../assets/" in out:
        leftovers.append("../assets/")
    if leftovers:
        sys.stderr.write(
            "make-4x5.py: REFUSING TO WRITE — 9:16 values survived the swap: "
            + ", ".join(repr(t) for t in leftovers)
            + "\n"
        )
        raise SystemExit(2)

    marker = "  <body>\n"
    if out.count(marker) != 1:
        sys.stderr.write("make-4x5.py: could not locate a unique <body> to mark.\n")
        raise SystemExit(2)
    return out.replace(marker, marker + BANNER)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--check",
        action="store_true",
        help="exit non-zero if index-4x5.html is stale rather than rewriting it",
    )
    args = ap.parse_args()

    root = pathlib.Path(__file__).resolve().parent.parent
    src = root / SRC
    dst = root / DST
    dst.parent.mkdir(parents=True, exist_ok=True)
    if not src.is_file():
        sys.stderr.write(f"make-4x5.py: {SRC} not found next to scripts/\n")
        raise SystemExit(2)

    built = build(src.read_text(encoding="utf-8"))

    if args.check:
        if not dst.is_file():
            sys.stderr.write(f"make-4x5.py: {DST} does not exist — run without --check.\n")
            raise SystemExit(1)
        if dst.read_text(encoding="utf-8") != built:
            sys.stderr.write(f"make-4x5.py: {DST} is stale — re-run without --check.\n")
            raise SystemExit(1)
        print(f"make-4x5.py: {DST} is up to date ({len(SWAPS)} anchors verified).")
        return

    dst.write_text(built, encoding="utf-8")
    print(f"make-4x5.py: wrote {DST} ({len(SWAPS)} anchors swapped, each matched once).")


if __name__ == "__main__":
    main()
