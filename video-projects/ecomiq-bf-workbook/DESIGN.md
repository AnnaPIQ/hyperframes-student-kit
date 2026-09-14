# ecomiq-bf-workbook — Design Spec

Black Friday ad promoting the free **Black Friday Profit Plan** workbook. Sean's
A-roll is the spine (full audio, ~50s of speech). Graphics are **full-screen
scenes** that replace him on their beats; he carries the beats between them. The
ad finishes on a workbook CTA end card. No captions are rendered — they go on
manually downstream.

## The cuts, one source of truth

| Cut | File | Dimensions | Render |
|---|---|---|---|
| 9:16 Story/Reels | `index.html` | 1080×1920 @ 30fps | `npx hyperframes render -q standard -o renders/ecomiq-bf-workbook-916.mp4` |
| 4:5 Meta feed | `compositions/feed-45.html` | 1080×1350 @ 30fps | `npx hyperframes render -q standard -c compositions/feed-45.html -o renders/ecomiq-bf-workbook-45.mp4` |

4:5 is the EcomIQ house Meta feed format and is the shipped pair with the 9:16.
A 1:1 cut also exists on demand (`bash scripts/gen-ratio.sh 1x1`) but is not
part of the delivery.

**Secondary cuts are GENERATED — never hand-edit them.** Edit `index.html`,
then run `bash scripts/gen-ratio.sh 45` (or `1x1`) from the repo root. Every
cut carries identical markup and identical timeline JS; everything that differs
is a CSS custom property under `body.r-916` / `body.r-45` / `body.r-1x1` in
`assets/ad.css`. That is why a change lands in every cut at once instead of
drifting. The generator also offsets each ratio's track indices into its own
range so static lint never reads two cuts as one timeline.

Two structural rules the linter enforces, learned the hard way:

- Only one root `index.html` may carry a `data-composition-id`, so secondary
  cuts live under `compositions/` and render with `-c`.
- Files under `compositions/` use **root-relative** asset paths (`assets/…`,
  never `../assets/…`) — Hyperframes serves every composition with the project
  root as its base URL.

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

**The workbook b-roll** (26.20–45.20) is the one thing that does not fill the
frame. It is EcomIQ's own 16:9 piece and every board in it, the margin
worksheet, the Black Friday calendar, the 8-tile spreadsheet grid, is laid out
edge to edge with about 2% side margin, so a portrait crop cuts columns off. It
plays full-width instead and floats in the navy field, centred at 54.5% of the
space above the subtitle band (dead centre reads top-heavy once the persistent
logo is in). That is not the rejected A-roll letterbox: nothing is being pulled
back from a fuller framing, and two details keep it from reading as one. The
backdrop is tuned to the b-roll's own field rather than `--brand-navy` (its
corners sit near `#021833`, clearly darker than the brand navy, so flat navy
behind it shows a seam), and the wrapper's top and bottom edges are feathered so
the video dissolves into that field instead of ending on a line. The feather is
shallow on purpose: the calendar board runs its header row to the frame edge.

**Graphic scenes** (`.scene`) are full-screen navy, `z-index: 10`, and replace
Sean entirely for their duration. `.sc` lays out with padding + flex, never an
absolute-positioned content container; `.sc-mid` centres content in whatever
space remains above the subtitle band, so every ratio balances without
hardcoded offsets.

Logo: `ecomiq-logo-white.svg`, top-left on **every** frame, 196px on 9:16 and
4:5, 168px on 1:1 (~18% and ~16% of frame width), in a **positioned non-`clip`
wrapper** — `clip` makes the render engine reposition it (`docs/LESSONS.md`).

## Reserved subtitle band (do not fill)

Subtitles are added **manually, downstream**. A clear band is reserved at the
bottom of every cut and nothing may be laid into it:

| Cut | `--sub-safe` | Band | % of height |
|---|---|---|---|
| 9:16 | `340px` | y 1580–1920 | 17.7% |
| 4:5 | `240px` | y 1110–1350 | 17.8% |
| 1:1 | `200px` | y 880–1080 | 18.5% |

Set once in `assets/ad.css`; every scene rebalances off it via
`padding-bottom: calc(var(--pad-bot) + var(--sub-safe))`.

**Re-check the band after any layout change:**

```bash
node scripts/check-subtitle-band.mjs video-projects/ecomiq-bf-workbook/index.html 1920 340
node scripts/check-subtitle-band.mjs video-projects/ecomiq-bf-workbook/compositions/feed-45.html 1350 240
```

Current clearance: **415px** (9:16), **201px** (4:5) — the b-roll sets the
lowest edge in both cuts now, and `.brollwrap` is in the checker's sweep.

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
  lets one script drive every cut.
- Finite repeats only — `repeat: -1` breaks the capture engine.

## Media

Regenerate with `bash scripts/prep-bf-assets.sh` from the repo root. Prepped
A-roll renditions are gitignored (derived from a 3.4 GB ProRes master).

- `aroll-916.mp4` / `aroll-45.mp4` / `aroll-1x1.mp4` — centre crops of a
  3840×2160 16:9 landscape 25fps master, scaled and conformed to 30fps CFR.
  **Each ratio needs its own crop** (1215, 1728 and 2160 px wide respectively);
  rescaling one rendition into another aspect squashes Sean. Silent by
  contract; audio is the sibling `<audio>`.
- `aroll-audio.m4a` — the full take. Every cut trims 2.75s via `data-media-start`
  on the video **and** the audio equally, dropping the dead air before Sean's
  first word without breaking lip sync.
- `workbook-broll.mp4` — EcomIQ's own 30s workbook b-roll, 1920×1080 silent,
  conformed to 1080×608 at CRF 20 (4.1 MB, small enough to commit, unlike the
  A-roll renditions). Source came from the `claude/wonderful-curie-brnfzl`
  branch. Its running order happens to track Sean's script almost exactly, which
  is why one continuous trim covers 31.00–44.75 with no cut of mine in it.
- The four product stills below are **no longer referenced** by either cut. They
  are kept in `assets/` because they came from the Drive folder and are the only
  copies here, not because anything uses them.
- `workbook-hero-trim.png` / `toolkit-spread-trim.png` — **both keep the
  mockup's white backdrop and sit on a white card** (`.shot`). Knocking the
  background out was tried on the cover and reverted: these products are shot at
  an angle with soft drop shadows, so an alpha cut leaves ragged edges along the
  page block and strands the shadow as a floating grey blob, and a navy book on
  a navy canvas has no separation anyway. On a white card the backdrop simply
  disappears into the card. The cover needs one extra step: the book sits left
  of centre inside its mockup frame, so after `-trim` it is cropped to 812px
  wide (the book and page block end at x=774 of 952) to drop the dead white.
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

Four more went in the same direction at once: **workbook cover**,
**max-discount dial**, **four-item checklist** and the **FREE slam** all ran
between 26.20 and 45.20, and Anna replaced the whole stretch with EcomIQ's own
workbook b-roll. Their markup, timeline blocks and CSS are deleted, along with
the `--dial` / `--box` / `--cover-w` / `--spread-w` / `--free-word` tokens they
owned. The `25%` max-discount figure is gone with the dial, so §3 of
`EDIT-PLAN.md` now over-lists what is on screen.

Four scenes remain, plus the b-roll: hook, cost stack, sales-up/profit-down,
workbook b-roll, end card. Sean is on camera roughly 12s of the 52s.

## What NOT to do

- Don't add captions or subtitles — they go on manually downstream, and the
  bottom band is reserved for them.
- Don't hand-edit `compositions/square.html`; edit `index.html` and regenerate.
- Don't invent performance claims. Every figure traces to the workbook's page-8
  worked example or is derived from it, and `EDIT-PLAN.md` §3 records which.
- Don't letterbox the A-roll to "zoom out" — built, reviewed, rejected. The
  workbook b-roll is a separate case and is argued in Layout above.
- Don't crop the workbook b-roll to fill a portrait frame; it loses columns.
- Don't knock the background out of either product still; they belong on the
  white card. See the Media section for why.
- Don't rescale one ratio's A-roll into another aspect; re-crop from the master.
- Don't use `toolkit-spread-alt.png` or the fourth Drive still for tight crops —
  they are AI mockups with garbled microtext.
- Don't put a second root composition at the project root.
- Don't reach for a CDN for GSAP or fonts.
