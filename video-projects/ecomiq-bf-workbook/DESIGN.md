# ecomiq-bf-workbook — Design Spec

Black Friday ad promoting the free **Black Friday Profit Plan** workbook. Sean's
A-roll is the spine (full audio, ~50s of speech). Graphics are **full-screen
scenes** that replace him on their beats; he carries the beats between them. The
ad finishes on a workbook CTA end card. No captions are rendered — they go on
manually downstream.

## Two cuts, one source of truth

| Cut | File | Dimensions | Render |
|---|---|---|---|
| 9:16 Story/Reels | `index.html` | 1080×1920 @ 30fps | `npx hyperframes render -q standard -o renders/ecomiq-bf-workbook-916.mp4` |
| 1:1 square feed | `compositions/square.html` | 1080×1080 @ 30fps | `npx hyperframes render -q standard -c compositions/square.html -o renders/ecomiq-bf-workbook-1x1.mp4` |

**`compositions/square.html` is GENERATED — never hand-edit it.** Edit
`index.html`, then run `bash scripts/gen-square.sh` from the repo root. The two
cuts carry identical markup and identical timeline JS; everything that differs
is a CSS custom property under `body.r-916` / `body.r-1x1` in `assets/ad.css`.
That is why a change lands in both cuts at once instead of drifting.

Two structural rules the linter enforces, learned the hard way:

- Only one root `index.html` may carry a `data-composition-id`, so the square
  cut lives under `compositions/` and renders with `-c`.
- Files under `compositions/` use **root-relative** asset paths (`assets/…`,
  never `../assets/…`) — Hyperframes serves every composition with the project
  root as its base URL.

The generator also shifts the square cut's track indices into the 20+ range so
static lint never reads the two cuts as one timeline with duplicate audio.

Beat-by-beat timings and the provenance of every on-screen figure:
**`EDIT-PLAN.md`**. Note the plan predates two cuts Anna made in review (see
"Cut in review" below), so the scene list there runs ahead of what renders.

## Brand

Kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`; fonts are local `.woff2` in `assets/fonts/`
and GSAP is vendored at `assets/vendor/gsap.min.js` (a CDN tag cert-fails in the
render env and freezes renders).

- **Navy `#06284C`** canvas · **Blue Tint `#9CD4FF`** accent · **Flame `#FF4C32`**
  the one hot accent, used for costs, the CTA and emphasis
- **Rethink Sans** throughout, −2% tracking on anything large
- Font families are named literally in CSS, not via `var()` — the linter does
  not resolve variables and would false-warn
- **No serif italic anywhere.** The brand's signature italic-serif emphasis was
  removed from the end card at Anna's request: "Black Friday" is white and
  upright. Hedvig Letters Serif is still loaded but currently unused.

## This project's idea

- **Hook:** a record Black Friday can still be an unprofitable one
- **Message:** work out contribution margin and break-even ROAS *before* you set
  the offer, or discounts, ads, fulfilment and returns eat the order
- **CTA:** get the free workbook, "Sign up free"

## Layout

**A-roll is full-bleed** (`object-fit: cover`, `inset: 0`). The source is 16:9
landscape, so a full-height crop at either target ratio uses only ~31% of the
source width — already the widest framing possible while still filling the
frame. Pulling back further requires shrinking the video and letterboxing it
with navy above and below; that was built, reviewed and **rejected**. Don't
reopen it without new footage.

Only a **top** scrim gradient sits over the A-roll, so the logo separates from
the studio background. There is deliberately no bottom gradient — it existed to
blend the video's lower edge into the navy while letterboxed, and once the
A-roll went back to full-bleed it just tinted the bottom of the shot.

**Graphic scenes** (`.scene`) are full-screen navy, `z-index: 10`, and replace
Sean entirely for their duration. `.sc` lays out with padding + flex, never an
absolute-positioned content container; `.sc-mid` centres content in whatever
space remains above the subtitle band, so both ratios balance without
hardcoded offsets.

Logo: `ecomiq-logo-white.svg`, top-left on **every** frame, 196px on 9:16 and
168px on 1:1 (~18% and ~16% of frame width), in a **positioned non-`clip`
wrapper** — `clip` makes the render engine reposition it (`docs/LESSONS.md`).

## Reserved subtitle band (do not fill)

Subtitles are added **manually, downstream**. A clear band is reserved at the
bottom of both cuts and nothing may be laid into it:

| Cut | `--sub-safe` | Band | % of height |
|---|---|---|---|
| 9:16 | `340px` | y 1580–1920 | 17.7% |
| 1:1 | `200px` | y 880–1080 | 18.5% |

Set once in `assets/ad.css`; every scene rebalances off it via
`padding-bottom: calc(var(--pad-bot) + var(--sub-safe))`.

**Re-check the band after any layout change:**

```bash
node scripts/check-subtitle-band.mjs video-projects/ecomiq-bf-workbook/index.html 1920 340
node scripts/check-subtitle-band.mjs video-projects/ecomiq-bf-workbook/compositions/square.html 1080 200
```

Current clearance: **119px** (9:16), **22px** (1:1).

Two things that checker gets right, both of which produced false passes before:

1. It **serves the project root over HTTP** rather than opening `file://`. Over
   `file://` a composition under `compositions/` 404s every root-relative asset
   and renders with *no CSS at all*, which passes every check meaninglessly.
2. It reads bottom edges **at page load, while GSAP holds each tween's entrance
   FROM-state**, so the numbers are worst case rather than resting. A
   `fromTo(y: +N)` starts N px lower than where it settles; without this, text
   dipped into the band while fading in even though the resting layout was
   correct.

## Motion

- Every scene fades up and fades out across a 0.30s overlap tail, so the
  incoming scene is visible before the outgoing one clears — a real crossfade,
  not a pop.
- `gsap.fromTo` for anything that starts hidden; `gsap.from` on an `opacity: 0`
  element leaves it invisible.
- Count-ups tween a proxy object and write formatted text in `onUpdate`, so
  every figure stays seekable and deterministic.
- **No ratio constants in the JS.** Bar geometry is computed from the dollar
  figures against the live `.bar` width; the dial circumference reads the SVG's
  own radius; checkmark dash lengths come from `getTotalLength()`. That is what
  lets one script drive both cuts.
- Finite repeats only — `repeat: -1` breaks the capture engine.

## Media

Regenerate with `bash scripts/prep-bf-assets.sh` from the repo root. Prepped
A-roll renditions are gitignored (derived from a 3.4 GB ProRes master).

- `aroll-916.mp4` / `aroll-1x1.mp4` — centre crops of a 3840×2160 16:9 landscape
  25fps master, scaled and conformed to 30fps CFR. Silent by contract; audio is
  the sibling `<audio>`.
- `aroll-audio.m4a` — the full take. Both cuts trim 2.75s via `data-media-start`
  on the video **and** the audio equally, dropping the dead air before Sean's
  first word without breaking lip sync.
- `workbook-hero-trim.png` — cover with the mockup's white backdrop **flood-filled
  from the corners** to transparent, so it sits straight on navy at full size.
  A plain `-trim` is not enough: the book is shot at an angle, so wedges of white
  survive inside its bounding box and render as a hard white rectangle beside it.
- `toolkit-spread-trim.png` — plain `-trim` only, shown on a rounded white photo
  card. Flood-filling this one **erodes the artwork**: its worksheets are white
  paper touching the white backdrop, so the fill runs straight through the page
  edges and leaves them torn.
- `wb-page-08.png` — a real page from the workbook PDF, the contribution-margin
  worked example every on-screen figure is drawn from.

## Cut in review

Two graphic scenes were built, reviewed and removed at Anna's request. Their
markup, timeline blocks, styles and now-orphaned CSS tokens were all deleted
rather than commented out:

- **Contribution margin 52.1% / break-even ROAS 1.9×** — Sean carries that line
  on camera instead (12.4–19.1s).
- **Normal month $59.71 vs this Black Friday $9.62** — Sean carries "you can
  have nothing left" on camera instead (23.15–26.20s).

Nine scenes remain: hook, cost stack, sales-up/profit-down, workbook cover, real
page, max-discount dial, four-item checklist, FREE, end card. Sean is on camera
roughly 12s of the 52s.

## What NOT to do

- Don't add captions or subtitles — they go on manually downstream, and the
  bottom band is reserved for them.
- Don't hand-edit `compositions/square.html`; edit `index.html` and regenerate.
- Don't invent performance claims. Every figure traces to the workbook's page-8
  worked example or is derived from it, and `EDIT-PLAN.md` §3 records which.
- Don't letterbox the A-roll to "zoom out" — built, reviewed, rejected.
- Don't flood-fill `toolkit-spread.png`; don't plain-`-trim` `workbook-hero.png`.
- Don't use `toolkit-spread-alt.png` or the fourth Drive still for tight crops —
  they are AI mockups with garbled microtext.
- Don't put a second root composition at the project root.
- Don't reach for a CDN for GSAP or fonts.
