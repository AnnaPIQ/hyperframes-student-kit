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
| M1 montage | 0.000 – 6.800s | hook footage |
| Beat A | 6.800 – 11.700s | one person's opinion, one brand, years ago |
| Beat B | 11.600 – 20.600s | Shopify Premier Partner reveal |
| M2 montage | 20.600 – 25.000s | "not one person's take…" |
| Beat C | 25.000 – 31.000s | the team grid |
| Beat 00 | 31.000 – 32.900s | "Here's how it works" |
| Beat 01 | 32.800 – 41.700s | Strategy session |
| Beat 02 | 41.600 – 48.400s | Specialist 1:1 calls |
| Beat 03 | 48.300 – 54.900s | Slack & community + node graph |
| M3 montage | 54.900 – 71.433s | montage + credibility lower-thirds |
| Card | 71.433 – 76.433s | end card |

## The montage runs at NATIVE speed — there is no retime

**832 frames (27.733s) = every live source frame, exactly once, in order**, split
across three windows chained with `data-media-start`:

| | ad window | bed window | frames |
|---|---|---|--:|
| M1 | 0.000 – 6.800 | 0.000 – 6.800 | 204 |
| M2 | 20.600 – 25.000 | 6.800 – 11.200 | 132 |
| M3 | 54.900 – 71.433 | 11.200 – 27.733 | 496 |
| | | | **832** |

This replaced two earlier attempts, and the history matters:

| Attempt | Montage | Result |
|---|---|---|
| v1 | 2.58× uniform (0.39× speed) | too slow — syrupy |
| v2 | 1.20–2.47× **per shot**, by motion energy | **worse** — the picture visibly sped up and slowed down shot to shot |
| v3 | **1.0× native** | correct |

The v2 idea — spend more stretch on shots with little motion — is defensible on
paper and wrong in practice: **a viewer reads a speed *change* far more easily
than a constant offset from native.** Uniform slow-motion is a look; varying
slow-motion is a fault. Native is the only setting that cannot read as wrong, so
the graphics were extended until the montage fitted at 1.0×.

## Motion graphics (43.7s across seven beats)

Ported from `video-projects/ecomiq-one-opinion-or-team-story` on branch
`claude/ecomiq-founder-ad-build-9auz5l` — same numbered-step grammar, same node
graph, and its `shopify-premier-partner.png` + `team/*.jpg` assets. Structure
and CSS in `assets/beats.css`; geometry per ratio in each composition's `:root`.

- **MOTION_PHILOSOPHY spine on every beat:** navy ground, perspective grid with
  parallax, registration crosshairs, vignette breath, deterministic CSS grain.
- Two persistent beds (`#gfx1`, `#gfx2`) carry the ambient — two runs, because
  montage window M2 sits between them — so beat cards whip in and out over navy,
  **never over black**.
- **A One person's opinion** — a card standing in for that single stale
  reference brand, struck through in flame, then a pip per year and
  "5–10 years ago."
- **B Shopify Premier Partner** — the badge on a white card, landing on "coach
  arm of a Shopify Premier Partner" (13.54s), then chips for "10+ years" and
  "the biggest brands in the world" on their own lines.
- **C An entire team's knowledge** — ten team tiles land one by one, then the
  "8 & 9 figure brands" chip, then "their entire career" at 29.60s.
- **00 "Here's how it works"** — one slammed line, on the words at 31.485s.
- **01 Strategy session** — outlined `01`, 3-segment progress spine, three panel
  rows that each land on their own VO line (35.20 / 37.30 / 39.70).
- **02 Specialist 1:1 calls** — the `2 calls a month` stat slams on "two
  specialist", two coach avatars, two rows, `accountable` flame chip.
- **03 Slack & community** — the node graph. You are the flame node; the
  community assembles around you, then **the links draw exactly on "a community
  of founders that are all doing the same thing" (51.96s)**.
- Beats whip in from the left and out to the right under blur, snapping to opaque
  in 0.10s so no two beats ever cross-dissolve. The whip animates an **inner
  non-`clip` `.wrap`**, never the clip element itself, and hard-kills its opacity
  on the exit boundary — the framework owns a clip's visibility, so animating it
  directly lets a seek land past the fade and leave stale state.

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

- **Don't retime the montage.** It plays at native speed. Two earlier attempts
  (uniform, then per-shot) both failed; the per-shot one failed worse. If the
  montage doesn't fit, change how much runtime it has to fill, not its speed.
- **Don't loop or reprise the montage.** It plays through once. An earlier
  version reprised eight hero shots to fill a gap and it read as a repeat.
- **Don't put the speaker full frame.** Corner PiP only, and it never moves or
  resizes mid-ad.
- **Don't add a second dissolve.** One dissolve in the whole ad, into the card.
  The beat-to-beat whips are position + blur, never opacity cross-fades — that
  distinction is the point.
- **Don't animate a beat's clip element.** Animate its inner `.wrap`.
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
