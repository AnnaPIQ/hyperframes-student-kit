# ecomiq-social-proof — Design Spec

Audio-led EcomIQ social-proof ad built on the Dryft Sleep case study.
Delivered in two ratios from one timeline: **9:16 (1080×1920)** and **1:1 (1080×1080)**,
30fps, 38.5s. Safe area ~10% margins.

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`; local `.woff2` fonts in `assets/fonts/`.

## This project's idea

- **Hook:** a real retention number — *59% more returning customers, $0 extra ad spend.*
- **Message:** the growth came from customers Dryft already had, not from new acquisition.
  Same brand, same ad budget, far more profit.
- **CTA:** "See if we can *help* you" → **Find out more**.

The voiceover drives everything. The ad **cuts between Sean to camera (A-roll) and b-roll**
of Dryft in-store at Erewhon; each proof graphic sits over b-roll and is timed to the word
that states it (word-level timings in `assets/vo/dryft-social-proof-vo.words.json`).

**A graphic exists only where a real figure is spoken over it** — three in the whole piece
(`+59%`, `3×`, `$0`). Beats with no figure behind them carry no graphic, and no scrim
either: the footage plays clean. Never prop up a claim with a metaphor or an unlabelled
chart — if there isn't a graphic, don't use one.

**No words in the graphics** — numerals only. The **bottom of frame is left clear**
(580px on 9:16, 300px on 1:1) for subtitles added later.

## Colors — from `assets/brand-tokens.css`

| Role | Token | Hex |
|---|---|---|
| Canvas, scrim over footage | `--brand-navy` | `#06284C` |
| Reserved (unused in the current cut) | `--brand-blue-tint` | `#9CD4FF` |
| **The one** hot accent — up-arrow, numeral bloom, CTA pill | `--brand-flame` | `#FF4C32` |
| Numerals | `--brand-white` | `#FFFFFF` |

Flame orange is the only hot accent. No other accent colors.

## Typography

- **Rethink Sans** — numerals in the graphics (`+59%`, `3×`, `$0`) at 268px (9:16) /
  168px (1:1), weight 800, **−3% tracking**, `tabular-nums` so count-ups don't jitter.
  The end-card headline is Rethink Sans too, all white, weight 800.
- **Hedvig Letters Serif is not used** in the current cut — the end-card emphasis word was
  set back to white roman. The `@font-face` stays in place for future variants.

## Motion

- Medium energy. A↔B shots hand off with fast **0.20s blur dissolves** — quick enough to
  read as cuts without being jump cuts. B-roll carries a slow scale push; the talking head
  stays still, so cutting back to Sean reads as a change of shot rather than more motion.
- **Every cut is a whip, never a fade** (`MOTION_PHILOSOPHY.md`): outgoing rides up with
  blur (`power2.in`, 0.333s), incoming rises from below with matching blur (`power2.out`,
  0.667s). Clips carry a 1.12 base scale so the ±90px travel never exposes a frame edge.
- **The camera never sleeps.** B-roll pushes 1.12→1.19; the talking head still drifts to
  1.155. The vignette breathes on a 4s `sine.inOut` yoyo.
- **Unifying texture on every frame:** navy vignette + deterministic CSS grain (three radial
  tiles, no PNG). Without it the piece reads as clips rather than one thing.
- The navy scrim exists **only** to keep a numeral legible: 0.62 on the three segments
  that carry one, and **zero everywhere else**, so clean footage is never dulled.
- Numerals scale, they don't fade — in at 0.34 under 30px blur, slamming to full on
  `back.out(2.4)`, with one flame bloom behind the landing frame. That bloom is the
  callback: it returns behind the end-card pill.
- Tween durations are multiples of 1/30s so steep eases don't alias at sub-frame boundaries.
- No `repeat: -1` anywhere — infinite repeats break the capture engine; cycle counts are
  computed and clamped.
- Graphics **enter only** — the crossfade between beats is the exit. The end card is the
  one scene allowed an exit/hold.
- Count-ups are GSAP tweens on a proxy object with `snap`, fully seekable.
- Entrance eases vary per beat (`expo.out`, `power3.out`, `back.out`, `power2.inOut`).

## What NOT to do

- Don't invent proof. Every number on screen traces to the VO or the published case study.
  There is **no star rating** and **no testimonial quote** in the source — don't add either.
- Don't build a third-party logo wall; no logo assets exist for those brands and they are
  not to be recreated.
- Don't use `ecomiq-logo-white.svg` in a composition — its luminance mask renders broken.
  Use the **PNG**.
- Don't add captions or any on-screen copy in the graphics — numerals only, and keep the
  bottom of frame clear for subtitles.
- Don't add a graphic to a beat that has no figure behind it, and don't lay a scrim over a
  segment that carries no graphic.
- Don't draw an unlabelled chart. Without labels (which aren't allowed) bars and lines can't
  say what they compare, and invented curve shapes are fabricated data-viz.
- Don't use `fill: var(--...)` on SVG (it doesn't resolve at render time) and don't let a
  group rule like `.ring circle { fill: none }` catch your dots — see `docs/LESSONS.md`.
- Don't reset big-headline tracking to 0, and never a second serif-italic emphasis word.
