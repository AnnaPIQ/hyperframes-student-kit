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

The voiceover drives everything. Each proof graphic is timed to the word that states it
(word-level timings in `assets/vo/dryft-social-proof-vo.words.json`), over a muted,
slowly-pushing b-roll bed of Dryft in-store at Erewhon.

## Colors — from `assets/brand-tokens.css`

| Role | Token | Hex |
|---|---|---|
| Canvas, scrim over footage | `--brand-navy` | `#06284C` |
| Eyebrows, labels, emphasis word | `--brand-blue-tint` | `#9CD4FF` |
| **The one** hot accent — chips, "Far more profit", CTA pill | `--brand-flame` | `#FF4C32` |
| Headlines, stats | `--brand-white` | `#FFFFFF` |

Flame orange is the only hot accent. No other accent colors.

## Typography

- **Rethink Sans** — everything. Stats 300px (9:16) / 210px (1:1) at weight 800;
  headlines 106px / 82px; eyebrows and labels 30px / 26px with wide uppercase tracking.
  Big type keeps **−2% tracking** and ~1.0 leading.
- **Hedvig Letters Serif**, italic — used exactly **once** in the whole piece: the word
  *help* in the end-card headline. That is the EcomIQ signature and it is never doubled.
- Stats use `font-variant-numeric: tabular-nums` so count-ups don't jitter.

## Motion

- Medium energy. B-roll shots hand off with **blur crossfades** (0.42s, `power2`), never
  hard cuts; each shot also carries a slow scale push so the backdrop stays alive.
- Graphics **enter only** — the crossfade between beats is the exit. The end card is the
  one scene allowed an exit/hold.
- Count-ups are GSAP tweens on a proxy object with `snap`, fully seekable.
- Entrance eases vary per beat (`expo.out`, `power3.out`, `back.out`, `power4.inOut`).

## What NOT to do

- Don't invent proof. Every number on screen traces to the VO or the published case study.
  There is **no star rating** and **no testimonial quote** in the source — don't add either.
- Don't build a third-party logo wall; no logo assets exist for those brands and they are
  not to be recreated.
- Don't use `ecomiq-logo-white.svg` in a composition — its luminance mask renders broken.
  Use the **PNG**.
- Don't add captions — the VO carries the words.
- Don't reset big-headline tracking to 0, and never a second serif-italic emphasis word.
