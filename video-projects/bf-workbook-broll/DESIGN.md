# bf-workbook-broll — Design Spec

**B-roll, not an ad.** Silent, no voiceover, no CTA push. Eight self-contained
shots an editor can pull individually and lay under narration in any future
EcomIQ video.

Formats: **16:9** 1920x1080 (master) · **9:16** 1080x1920 · **4:5** 1080x1350.
All three: 30fps, **21.4s**, no audio track. Safe area ~10% margins.

The 16:9 project is the source of truth for structure, copy and timing. The two
vertical projects are generated from it by `scripts/build-variants.mjs`, which
appends the per-format layout deltas in `scripts/overrides/*.css`. Never
hand-edit a variant.

Subject: **The Black Friday Profit Plan** — EcomIQ's free workbook for US
Shopify brands (2026 edition). 51 pages · 8 parts · 32 worksheets · 19 free tools.

## Why these choices

The workbook is already a designed artefact in the EcomIQ system — navy cover,
flame hairline rules, upright Hedvig serif headlines, Rethink Sans body, pale
blue form fields. So the b-roll **stages the real pages** rather than inventing a
parallel look. Real page renders carry the shots that are about the object; CSS
rebuilds carry the shots that need to animate (fields filling, numbers counting),
because a raster crop can't do that and a seam between crop and overlay would show.

## Colors — 5 active hues, each with a job

| Hex | Token | Meaning in this piece |
|---|---|---|
| `#06284C` | `--brand-navy` | the stage. ~85% of every frame. |
| `#FFFFFF` | `--brand-white` | the page. The workbook is the only white object. |
| `#9CD4FF` | `--brand-blue-tint` | structure — grid, crosshairs, labels, eyebrows. |
| `#DEEEFE` | `--brand-sky` | the fields you fill in. Only ever inside a page. |
| `#FF4C32` | `--brand-flame` | **the one hot accent.** Rules, the answer, the highlighted date, the button. Never decorative. |

## Typography
- **Hedvig Letters Serif**, upright — headlines and the big stat numerals.
  Upright, not italic: the workbook's own headlines are upright, and the local
  face has no true italic (synthetic oblique would read as a fake).
- **Rethink Sans** — everything else. Eyebrows at `.28em` tracking, uppercase.
  Big headlines at −2% tracking, ~1.0 leading.
- Both load from local `.woff2`. No network at render time.

## Motion rules
- Unifying texture on every frame: perspective grid + crosshairs + vignette, all
  in the root so it runs continuously under every scene.
- Camera never sleeps — every shot has a slow push, drift or parallax.
- Scenes overlap by 0.4s on ascending z-index; the incoming scene rises and
  un-blurs over the outgoing one, and a flame light-streak crosses the seam.
  No hard cuts, no exit animations (the transition is the exit).
- Shots run 2.3–2.9s; the outro holds 4.2s. Faster than the first cut, but still
  longer than a 1.5s ad beat on purpose: a shot has to survive being lifted on
  its own. Under a voiceover the piece now rolls rather than dwells.
- Callbacks: the flame hairline rule (shots 1, 3, 4, 8) and the cover itself
  (shot 1 → shot 8).

## Shot list
| # | t | Shot |
|---|---|---|
| 01 | 0.0 | Cover rises and settles on the grid, glint sweep, slow push-in |
| 02 | 2.4 | Seven pages fan into an arc and drift |
| 03 | 4.7 | 8 PARTS · 32 WORKSHEETS · 19 FREE TOOLS count up |
| 04 | 7.1 | Contribution-margin worksheet: fields fill, the answer lands in flame |
| 05 | 10.0 | The 2026 calendar page, push-in, Black Friday row lights |
| 06 | 12.5 | Eight companion spreadsheets deal into a grid |
| 07 | 14.9 | Seven free tools snap into a cloud |
| 08 | 17.2 | Cover + EcomIQ lockup, 4.2s hold |

## What changes per format, and what must not
Only **layout** changes: type scale, grid columns, the fan's arc, and whether the
outro sits side-by-side or stacked. Timing, copy, palette, the order of the
shots and every animation curve stay identical, so the three cuts stay in sync
and an editor can swap formats without re-timing anything.

Anything positional that a variant needs to move lives in a CSS class, never an
inline `style` attribute — inline styles beat a stylesheet, so the fan's arc
(`.s02-p1`…`.s02-p7`) and the crosshair positions (`.xh1`…`.xh6`) are classes
for exactly that reason.

## What NOT to do
- No second hot accent. Flame orange is the only warm colour on screen.
- No voiceover, no music, no "Get started" CTA — this footage goes *under* someone else's edit.
- No hard cuts and no fade-to-black between shots.
- Don't put type over the middle of a page image; the editor may key their own text there.
- Don't stretch or recolour the logo or the page renders.
