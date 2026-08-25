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

**No words in the graphics** — numerals only. The **bottom of frame is left clear**
(580px on 9:16, 300px on 1:1) for subtitles added later.

## Colors — from `assets/brand-tokens.css`

| Role | Token | Hex |
|---|---|---|
| Canvas, scrim over footage | `--brand-navy` | `#06284C` |
| Comparison bars, flat line, emphasis word | `--brand-blue-tint` | `#9CD4FF` |
| **The one** hot accent — bars, lines, dots, CTA pill | `--brand-flame` | `#FF4C32` |
| Numerals | `--brand-white` | `#FFFFFF` |

Flame orange is the only hot accent. No other accent colors.

## Typography

- **Rethink Sans** — numerals only in the graphics (`+59%`, `3×`, `$0`) at 268px (9:16) /
  168px (1:1), weight 800, **−3% tracking**, `tabular-nums`.
- **Hedvig Letters Serif**, italic — used exactly **once** in the whole piece: the word
  *help* in the end-card headline. That is the EcomIQ signature and it is never doubled.
- Stats use `font-variant-numeric: tabular-nums` so count-ups don't jitter.

## Motion

- Medium energy. A↔B shots hand off with fast **0.20s blur dissolves** — quick enough to
  read as cuts without being jump cuts. B-roll carries a slow scale push; the talking head
  stays still, so cutting back to Sean reads as a change of shot rather than more motion.
- The navy scrim sits back to 0.45 over Sean and rises to 0.80 over b-roll carrying
  graphics, so he stays vibrant and the numerals still hold contrast.
- Charts are **proportional to the real figures** — G1's bars are 1.59:1, G3's are 3:1.
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
- Don't use `fill: var(--...)` on SVG (it doesn't resolve at render time) and don't let a
  group rule like `.ring circle { fill: none }` catch your dots — see `docs/LESSONS.md`.
- Don't reset big-headline tracking to 0, and never a second serif-italic emphasis word.
