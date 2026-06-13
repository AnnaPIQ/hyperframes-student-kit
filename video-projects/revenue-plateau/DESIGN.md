# revenue-plateau — Design Spec

Format: 4:5 Meta feed · 1080x1350 @ 30fps · Safe area ~10% margins.
Duration: 93s (89.25s founder VSL + 6.5s end-card hold).

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens live in `assets/brand-tokens.css`; fonts local in `assets/fonts/`.

## This project's idea
- Hook: "Revenue *flat* for months?" — serif-italic emphasis over the founder VSL open.
- Message: a revenue plateau isn't an effort problem, it's a **system** problem.
  Founder talking-head carries the full argument; diagnostic chips visualize the
  four "maybes" (traffic / conversion / retention / AOV); Dryft Sleep b-roll +
  "+59% returning customers" stat is the proof beat (57.5–65.5s).
- CTA: "Learn how →" on a navy end card — "Fix what's *already* there."

## Assets
- `founder-broll.mp4` — 89s talking-head VSL, 4:5 center crop from "ad .mov" (muted)
- `founder-vo.m4a` — extracted VO, drives all caption timing
- `dryft-broll.mp4` — full 37s Dryft Sleep shelf b-roll, 4:5 master
- `dryft-cut.mp4` — the 8s pickup moment (t=18–26 of the master) used in-comp
- Captions phrase-synced from a whisper small.en transcript of the VO.

## Pending
- "Frustrated DTC founder" b-roll (mentioned as attached, never received) —
  would slot at 5.5–13.5s ("push harder / more ads, more products").

## Render pipeline (this cloud environment)
The host Chrome GPU probe hangs intermittently and the software/screenshot path
bakes an opaque black background (no alpha) — so videos can't render in-engine
and alpha export isn't available here. The working pipeline:

1. `graphics.html` — the full motion-graphics + captions + end-card layer with a
   solid green (`#00ff00`) `#keybg` element behind everything (the screenshot
   renderer ignores CSS body bg, so the key must be a real element). Elements
   over the key use transform-only entrances (opacity fades would ghost green).
2. Render it reliably with: `--low-memory-mode --no-browser-gpu` (low-memory
   mode skips the flaky auto-worker calibration probe). → `renders/graphics-key.mp4`
3. Base footage track (`renders/_base.mp4`): founder 0–86.5s → desk 86.5–93s
   (dimmed), with the Dryft cut overlaid 57.5–65.5s, built in ffmpeg.
4. Composite: `colorkey=0x00D700 + despill` the graphics over the base, mux
   `founder-vo.m4a`. → `renders/revenue-plateau-draft.mp4`

`index.html` keeps the canonical single-file version (footage via `<video>` +
GSAP video transitions) for a GPU-capable / local environment.
