# ecomiq-how-it-works-ad — Design Spec

Short-form EcomIQ ad. A recorded voiceover carries the edit, an existing
showcase montage is the picture, the speaker rides along in a circular PiP, and
the brand end card lands on the closing line.

Shipped at three ratios from one timeline: **9:16** (1080×1920, `index.html`),
**1:1** (1080×1080, `compositions/square.html`), **4:5** (1080×1350,
`compositions/meta45.html`). 30 fps. Runtime **76.433s**.

Brand kit copied from `assets/ecomiq/`; full reference `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`, shared structure in `assets/ad.css`, the
motion-graphics section in `assets/beats.css`.
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

The graphics section adds **Blue Tint `#9CD4FF`** (step numerals, spine, nodes,
row marks) and a muted `#6F8DB3` / `#C7DAF0` for sub-lines — the montage sections
stay monochrome-plus-flame. The bug and the PiP ring are white so they sit on top of the footage without
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

## Structure

| Section | Window | What carries it |
|---|---|---|
| Act 1 | 0.000 – 31.500s | montage — the problem + the credibility |
| Graphics | 31.500 – 54.900s | 4 motion-graphics beats — the mechanism |
| Act 2 | 54.900 – 71.433s | montage + credibility lower-thirds |
| Card | 71.433 – 76.433s | end card |

The montage bed is **1441 frames (48.033s)** split across two clips
(`data-media-start` on the second), so it still plays through **once, in order,
with nothing reprised** — the graphics section simply sits in the middle.

**This is what fixed the pacing.** Carrying 23.4s on graphics drops the montage
retime from **2.58× to 1.73×** (0.39× → 0.58× speed) and the average shot from
1.93s to **1.30s**.

## Motion graphics (31.500 – 54.900s)

Ported from `video-projects/ecomiq-one-opinion-or-team-story` on branch
`claude/ecomiq-founder-ad-build-9auz5l` — same numbered-step grammar, same
node graph. Structure and CSS in `assets/beats.css`; geometry per ratio in each
composition's `:root`.

- **MOTION_PHILOSOPHY spine on every beat:** navy ground, perspective grid with
  parallax, registration crosshairs, vignette breath, deterministic CSS grain.
- One persistent bed (`#gfx`) carries the ambient so beat cards whip in and out
  over navy, **never over black**.
- **00 "Here's how it works"** — one slammed line, on the words at 31.485s.
- **01 Strategy session** — outlined `01`, 3-segment progress spine, three panel
  rows that each land on their own VO line (35.20 / 37.30 / 39.70).
- **02 Specialist 1:1 calls** — the `2 calls a month` stat slams on "two
  specialist", two coach avatars, two rows, `accountable` flame chip.
- **03 Slack & community** — the node graph. You are the flame node; the
  community assembles around you, then **the links draw exactly on "a community
  of founders that are all doing the same thing" (51.96s)**.
- Beats whip in from the left and out to the right under blur, snapping to opaque
  in 0.10s so no two beats ever cross-dissolve.

## Motion elsewhere

Deliberately almost none — the montage is the motion.

- **Hard cuts throughout.** The 37 montage cuts are baked into the retimed
  picture bed, and montage↔graphics are hard cuts too.
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
- **Don't add a second dissolve.** One dissolve in the whole ad, into the card.
  The beat-to-beat whips are position + blur, never opacity cross-fades — that
  distinction is the point.
- **Don't combine `.lt` with `.gfx`.** `.gfx { inset: 0 }` wins for top/right and
  parks the lower-third at the top of frame on top of the brand bug.
- **Don't edit `compositions/*.html` by hand.** They are generated —
  edit `index.html` and the geometry table in `scripts/gen-ratios.py`, then run
  `python3 scripts/gen-ratios.py`.
- **Don't inherit the montage master's own end card** (source 27.733–29.721s,
  "Click The Link Below") — it duplicates ours. The bed stops at 27.733s.
- **Don't add a second line, an italic, or a second weight to the card.**
- **Don't reference GSAP or fonts from a CDN** — renders freeze on cert
  failures. Everything is vendored under `assets/`.
- **Don't commit the derived beds.** They are gitignored; rebuild with
  `bash scripts/build-assets.sh`.
