# ecomiq-how-it-works-ad — Design Spec

Short-form EcomIQ ad. A recorded voiceover carries the edit, an existing
showcase montage is the picture, the speaker rides along in a circular PiP, and
the brand end card lands on the closing line.

Shipped at three ratios from one timeline: **9:16** (1080×1920, `index.html`),
**1:1** (1080×1080, `compositions/square.html`), **4:5** (1080×1350,
`compositions/meta45.html`). 30 fps. Runtime **76.433s**.

Brand kit copied from `assets/ecomiq/`; full reference `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`, shared structure in `assets/ad.css`.
All derived numbers and the reasoning behind them: **`EDIT-PLAN.md`**.

## This project's idea

- **Hook:** most e-commerce coaching is one person's decade-old opinion.
- **Message:** EcomIQ is the coach arm of a Shopify Premier Partner — a whole
  team's experience across eight- and nine-figure brands, not one take.
- **CTA:** *Find out more →* on the end card, over the VO line "Tap the link
  below and book a call."

## Palette → `assets/brand-tokens.css`

Only four of the brand colours appear in this ad. Restraint is the point: the
montage supplies all the colour, so the graphics stay monochrome-plus-flame.

| Name | Hex | Token | Use here |
|---|---|---|---|
| Navy | `#06284C` | `--brand-navy` | end-card ground |
| Flame Orange | `#FF4C32` | `--brand-flame` | card rule, CTA pill — the only hot accent |
| White | `#FFFFFF` | `--brand-white` | brand bug, card lockup, pill label, PiP ring |
| Black | `#000000` | `--brand-black` | canvas behind the picture bed |

No gradients, no blue tint, no sky. The bug and the PiP ring are white so they sit on top of the footage without
competing with it. The bug carries a soft drop-shadow (no box) — the montage
runs from near-black to a blown-out white UI screen recording, and an
unprotected white lockup vanishes on the light shots.

## Type

- **Rethink Sans** — the only face in the ad. Weight **700** on the CTA pill;
  nothing else is type. Loaded from a local `.woff2`, never a CDN.
- **No Hedvig Letters Serif.** The brief calls for one face, one weight, no
  italics on the end card, so the serif emphasis signature is deliberately sat out.
- **No captions** in any ratio.

## Layout

Brand bug top left, speaker PiP top right, sharing a top offset of **5.2% of
frame height** so they read as a pair. Both fade in by **0.42s** and are covered
by the end card at **71.433s**. The speaker never appears full frame.

End card: navy ground, centred stack of white lockup (46% frame width) → flame
rule (3×150px) → flame pill reading *Find out more →*. One line, centred, still.

Per-ratio geometry lives in each composition's `:root` block; everything else
comes from `assets/ad.css`. See `EDIT-PLAN.md` §6 for the numbers.

## Motion

Deliberately almost none — the montage is the motion.

- **Hard cuts throughout.** The 37 cuts are baked into the retimed picture bed,
  so the composition itself has no scene-to-scene transitions to author.
- **Exactly one dissolve:** 0.35s, linear, into the end card. It runs across the
  0.681s silence gap before the closing line, so the card is fully opaque at
  71.400s and "Tap" lands at 71.4333s — the card resolves one frame before the
  word, verified against the rendered audio.
- Card stack rides in on that dissolve (`power3.out` → `power2.out` →
  `back.out(1.6)`) and is settled by **71.80s**, so the card sits perfectly
  still for its 5.000s hold.
- No exit animations anywhere. The card covers the overlays; nothing fades out.

## Audio

VO is the spine at full level; **montage audio is discarded entirely**.
`assets/music-bed.wav` is a silent placeholder wired at `data-volume="0"` —
drop a real bed at that path and raise the volume. Duck targets: **0.13 under
speech, 0.35 over the card.**

## What NOT to do

- **Don't loop or reprise the montage.** It plays through once. An earlier
  version reprised eight hero shots to fill a gap and it read as a repeat.
- **Don't put the speaker full frame.** Corner PiP only, and it never moves or
  resizes mid-ad.
- **Don't add a second dissolve, whip, or shader transition.** One dissolve,
  into the card. Everything else is a hard cut.
- **Don't inherit the montage master's own end card** (source 27.733–29.721s,
  "Click The Link Below") — it duplicates ours. The bed stops at 27.733s.
- **Don't add a second line, an italic, or a second weight to the card.**
- **Don't reference GSAP or fonts from a CDN** — renders freeze on cert
  failures. Everything is vendored under `assets/`.
- **Don't commit the derived beds.** They are gitignored; rebuild with
  `bash scripts/build-assets.sh`.
