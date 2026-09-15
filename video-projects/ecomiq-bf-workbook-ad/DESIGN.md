# ecomiq-bf-workbook-ad — Design Spec

**EcomIQ Black Friday ad promoting the free Black Friday Profit Plan workbook.**
Sean's A-roll is the spine; B-roll and motion graphics cut in and out over it;
finishes on a workbook CTA card.

Delivered in two ratios, generated from one spec:

| Ratio | Size | Composition | Render |
|---|---|---|---|
| 9:16 Reels / Stories | 1080×1920 @ 30fps | `index.html` | `renders/ecomiq-bf-workbook-ad-9x16.mp4` |
| 4:5 Meta feed | 1080×1350 @ 30fps | `compositions/ad-4x5.html` | `renders/ecomiq-bf-workbook-ad-4x5.mp4` |

Runtime **53.00s**. The full A-roll audio is used, nothing cut.

Brand kit from `assets/ecomiq/`; full reference `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`, local `.woff2` in `assets/fonts/`.

## The idea

- **Hook:** "A record Black Friday can still be an unprofitable one."
- **Message:** Revenue goes up, but so does every cost attached to the order.
  Work out contribution margin and breakeven ROAS *before* you set the offer.
- **CTA:** Get the free Black Friday Profit Plan workbook.

## Colour — five hues, each carrying one meaning

| Token | Hex | Carries |
|---|---|---|
| `--brand-navy` | `#06284C` | the ground, always |
| chrome white | `#FFFFFF` | the brand voice, headlines |
| `--brand-blue-tint` | `#9CD4FF` | *your* revenue, and what you get |
| `--brand-flame` | `#FF4C32` | **what it costs you**, and the CTA |
| `--brand-sky` | `#DEEEFE` | captions, dividers, sources |

Flame orange is the only hot accent. It is never decorative: it marks a cost
going the wrong way, or the thing to click.

## Type

- **Rethink Sans** 400–800, local `.woff2`. Headlines at 800 with −3.5%
  tracking, per the brand guide. `tabular-nums` on every number column.
- **Hedvig Letters Serif** is available but currently unused — the end-card
  headline is all Rethink Sans 800 in white, with no italic-serif emphasis word.

## Motion

Adapted from `MOTION_PHILOSOPHY.md`, keeping the discipline and swapping the
palette for EcomIQ's (the philosophy's own carve-out for a brand brief).

- **Graphics are for emphasis only.** Six graphic beats across 53s, covering
  46% of the pre-card runtime; Sean carries the other 54% clean. A graphic
  appears only where a word needs weight or a number has to be seen, and never
  just to restate what he already said.
- **No hard cuts.** Every seam is a velocity-matched vertical whip: the
  outgoing layer rides up into blur, the incoming one rises out of it.
- **The camera never sleeps.** The perspective grid parallaxes for the full
  53s; the vignette breathes on a 8.8s cycle; every held card makes a slow push.
- **Texture on everything.** Vignette and deterministic CSS grain on every
  frame. Perspective grid + crosshair registration marks come up only on the
  graphic beats, so Sean's footage still reads as footage.
- **Hold the outro.** The end card runs 7.82s, of which 3.87s is after the
  audio ends.
- **Callback.** The workbook cover lands at 26.75 and the flame `FREE` chip on
  it rhymes with the flame `Sign up free` pill on the end card.

## Sean is the bed

Three states, driven by a navy cover layer and a slow push on the footage:

| State | Navy cover | Footage | Used for |
|---|---|---|---|
| Clean | 0% | 1.00×, sharp | he is the shot |
| Overlay | 36% | 1.04× push in, 1.6px blur | graphics over his lower half |
| Hero | 100% | 1.09× push in, 9px blur | full-frame graphic or B-roll |

The push is always *in*, never out: scaling the footage below 1.0 exposes the
frame edge as navy bars on all four sides.

## Subtitle safe band

**No graphic ever enters the bottom of the frame** — 380px in 9:16, 268px in
4:5 — so subtitles can be added by hand later. The scrim's bottom stop darkens
that band to ~0.97 navy, so subtitles will read without any extra treatment.

## Every on-screen figure is the workbook's own

Nothing is invented and there are no EcomIQ performance claims. Sources are
captioned on screen. See EDIT_PLAN.md §5 for the full provenance table —
`$114.70` AOV, the `$59.71 · 52.1%` contribution example, `1.92 → 2.61`
breakeven ROAS at 25% off, `1.81×` units, and `8 / 32 / 19`.

## What NOT to do

- Don't put anything in the subtitle band.
- Don't add a second hot accent — flame orange is the only one.
- Don't drop headline tracking back to 0.
- Don't hand-edit `index.html` or `compositions/ad-4x5.html`; both are
  generated. Edit `scripts/build-compositions.mjs` and re-run it.
- Don't invent a number. If a figure isn't in the workbook, it doesn't go on
  screen.
