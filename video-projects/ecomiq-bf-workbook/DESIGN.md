# ecomiq-bf-workbook — Design Spec

Black Friday ad promoting the free **Black Friday Profit Plan** workbook. Sean's
A-roll is the spine (full audio), motion graphics land on the beats, and the ad
finishes on a workbook CTA end card. No captions.

Two deliverables from one project:

| Cut | File | Dimensions | Render |
|---|---|---|---|
| 9:16 Story/Reels | `index.html` | 1080×1920 @ 30fps | `npx hyperframes render -q standard -o renders/ecomiq-bf-workbook-916.mp4` |
| 1:1 square feed | `compositions/square.html` | 1080×1080 @ 30fps | `npx hyperframes render -q standard -c compositions/square.html -o renders/ecomiq-bf-workbook-1x1.mp4` |

Only one root `index.html` may carry a `data-composition-id`, so the square cut
lives under `compositions/` and is rendered with `-c`. Its asset paths are
root-relative (`assets/…`, never `../assets/…`) and its track indices sit in the
20+ range so static lint never sees the two cuts as one overlapping timeline.

Beat-by-beat timings, the on-screen figures and their provenance: **`EDIT-PLAN.md`**.

## Brand

Kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`; fonts are local `.woff2` in `assets/fonts/`
and GSAP is vendored at `assets/vendor/gsap.min.js` (a CDN tag cert-fails in the
render env and freezes renders).

- **Navy `#06284C`** canvas · **Blue Tint `#9CD4FF`** accent · **Flame `#FF4C32`**
  the one hot accent, used for costs, the CTA and emphasis · **Sky `#DEEEFE`**
  pale surfaces
- **Rethink Sans** for everything, −2% tracking on anything large
- **Hedvig Letters Serif** italic for exactly one emphasis phrase, "*Black Friday*"
  on the end card, and nowhere else
- Font families are named literally in CSS, not via `var()` — the linter does not
  resolve variables and would false-warn

## This project's idea

- **Hook:** a record Black Friday can still be an unprofitable one
- **Message:** work out contribution margin and break-even ROAS *before* you set
  the offer, or the discounts, ads, fulfilment and returns eat the order
- **CTA:** get the free workbook — "Sign up free"

## Layout

**9:16.** Sean full-bleed as the base layer. Graphics ride in overlay cards
anchored to the bottom (`.card--std` 768px / `.card--tall` 922px) over a navy
scrim gradient, so type always has contrast over his dark shirt and the mic. His
face stays clear throughout; the scrim covers the hand and mic. Product beats
(`.scene`) take the full frame and replace Sean.

**1:1.** Same structure, re-laid-out rather than squashed: cards are 470/560px
(the tall card is capped at 560 so the scrim stays off Sean's chin, which sits at
about 50% of frame height in the square crop) and type steps down about 22%.

Logo: `ecomiq-logo-white.svg`, top-left on **every** frame, 9–10% width, inside
the 10% safe margin, in a **positioned non-`clip` wrapper** — `clip` makes the
render engine reposition it (`docs/LESSONS.md`).

## Reserved subtitle band (do not fill)

Subtitles are added **manually, downstream** — this composition deliberately
renders none. A clear band is reserved at the bottom of both cuts and nothing
may be laid into it:

| Cut | Band | % of height |
|---|---|---|
| 9:16 | bottom **260px** | 13.5% |
| 1:1 | bottom **150px** | 13.9% |

Sized for two lines of ~48px subtitle plus leading (~130px) with margin either
side. Enforced by `padding-bottom` on `.card` (bottom-anchored graphics pad up
off it) and on `.scene` / `#endcard` (centred content shifts up clear of it).
The padding carries **50px more than the band** as animation headroom, because
GSAP entrance tweens offset elements downward before they settle (max +48px);
without it, text dips into the band while fading in even though the resting
layout looks correct.

**If you add or grow a card, re-check the band:**

```bash
node scripts/check-subtitle-band.mjs video-projects/ecomiq-bf-workbook/index.html 1920 260
node scripts/check-subtitle-band.mjs video-projects/ecomiq-bf-workbook/compositions/square.html 1080 150
```

It measures the DOM rather than pixels, because pixel sampling cannot tell a
graphic in the band from video showing through during a crossfade. It reads
bottom edges at page load, when GSAP has applied the entrance FROM-state, so
the numbers are worst case rather than resting. Current clearance: **6px**
(9:16) and **38px** (1:1).

The card scrim reaches solid navy before the band starts, so subtitles land on
flat navy for most of the timeline, which is ideal for legibility. The one
exception is the ~0.7s gap at 37.2–37.9s where no card is up and the band shows
Sean's shirt.

Bottom padding also keeps the last row of a card clear of the Reels/Stories
platform chrome.

## Motion

- Every card and scene fades up, and fades out across a 0.30s overlap tail so the
  incoming card is already visible before the outgoing one clears — a real
  crossfade rather than a pop. Overlay cards over a continuous base are not
  scenes, which is why they carry a short exit.
- `gsap.fromTo` for anything that starts hidden; `gsap.from` on an `opacity:0`
  element leaves it invisible.
- Count-ups tween a proxy object and write formatted text in `onUpdate`, so every
  figure stays seekable and deterministic.
- Cost-stack bar geometry is computed at runtime from the dollar figures and
  `BAR_W`, not hardcoded pixels, so the two cuts share one source of truth. The
  three constants that differ between them are `BAR_W`, `DIAL_R` and `TICK_LEN`.
- Finite repeats only — `repeat: -1` breaks the capture engine.

## Media

Regenerate every media asset with `bash scripts/prep-bf-assets.sh` from the repo
root. The prepped A-roll renditions are gitignored (75 MB of H.264 derived from a
3.4 GB ProRes master).

- `aroll-916.mp4` / `aroll-1x1.mp4` — centre crops of a 3840×2160 **16:9
  landscape** 25fps master, scaled and conformed to 30fps CFR. Both cuts are
  taller than wide, so this is a crop; padding would strand Sean in a letterbox
  band. Silent by contract — audio is the sibling `<audio>`.
- `aroll-audio.m4a` — the full take. Both cuts trim 2.75s via `data-media-start`
  on the video *and* the audio equally, which drops the dead air before Sean's
  first word without breaking lip sync.
- `workbook-hero.png`, `toolkit-spread.png` — product stills, shown on light
  panels (the brand's high-key product treatment) inset on navy.
- `wb-page-08.png` — a real page from the workbook PDF, the contribution-margin
  worked example every on-screen figure is drawn from.

## What NOT to do

- Don't add captions or subtitles — they go on manually downstream, and the
  bottom band is reserved for them.
- Don't invent performance claims. Every figure traces to the workbook's page-8
  worked example or is derived from it, and `EDIT-PLAN.md` §3 records which.
- Don't use `toolkit-spread-alt.png` or the fourth Drive still for tight crops —
  they are AI mockups with garbled microtext. Medium scale only.
- Don't put a second root composition at the project root.
- Don't reach for a CDN for GSAP or fonts.
- Don't use more than one serif-italic emphasis per frame.
