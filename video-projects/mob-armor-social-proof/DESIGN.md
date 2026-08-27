# Mob Armor social-proof ad — design spec

**Whose ad:** EcomIQ, crediting Mob Armor (the Dryft pattern). EcomIQ navy + flame
throughout; EcomIQ end card; Mob Armor's white wordmark plays the role Dryft's did — it
sits on the stat cards, on a black chip.

**Formats:** 9:16 · 1080×1920 · 30 fps (master) — and 4:5 · 1080×1350 relayout.
**Runtime:** 38.60 s. Audio-led, full VO, no cutdown.

## Palette — 5 hues, each with a job
| Hex | Token | Job |
|---|---|---|
| `#06284C` | `--brand-navy` | canvas, every beat |
| `#FFFFFF` | `--brand-white` | all type |
| `#FF4C32` | `--brand-flame` | the only hot accent — numerals, rule, CTA, the "one channel" dot |
| `#9CD4FF` | `--brand-blue-tint` | eyebrows, the three found channels |
| `#101820` | Mob Armor black | **only** as the chip behind the Mob Armor wordmark |

## Type
- **Rethink Sans 800** for all display type, −2 % tracking, ~0.98 leading (brief: all
  display type weight 800).
- **Hedvig Letters Serif italic exactly once** — "*possible*" on the end card.
- Local `.woff2` from `assets/fonts/`, named literally in CSS. No Google-Fonts link.

## Layout
- EcomIQ white logo top-left at (72, 96), whole runtime, in a positioned non-`clip` div.
- Bottom **30 % kept clear** for subtitles — nothing below y=1344 (9:16) / y=945 (4:5).
- Graphics are **full-bleed cards**, never lower-thirds.

## Motion
- Every cut is a blur-whip; no hard cuts. Exit `y:-150 blur(30px) power2.in 0.33s` →
  entry `y:150 blur(30px)→0 power2.out 1.0s`, velocity-matched at the seam.
- Flame light-streak fired at the cut into the two 500% cards.
- Perspective grid + crosshairs + vignette + grain on every beat, footage included.
- Navy scrim ~0.35 over all b-roll.
- End card holds 6.77 s (3.47 s of it in silence).

## Rules inherited
- Graphics **only** where a real figure is spoken (5 cards — see `EDIT-PLAN.md` §3).
- Mob Armor logo: white or black only, never recoloured, never separated, always on a
  contrasting solid — hence the black chip on navy (`BRANDING_GUIDE.pdf`).
- Local GSAP, no render-time network fetches, `gsap.fromTo` for hidden starts,
  every timeline padded with `tl.to({}, {duration: SLOT}, 0)`.

Full beat sheet, shot list and sourcing report → `EDIT-PLAN.md`.
Footage provenance → `assets/broll/CREDITS.md`.
