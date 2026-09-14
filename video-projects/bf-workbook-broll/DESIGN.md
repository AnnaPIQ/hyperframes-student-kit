# bf-workbook-broll — Design Spec

**B-roll, not an ad.** Silent, no voiceover, no CTA push. Eight self-contained
shots an editor can pull individually and lay under narration in any future
EcomIQ video.

Format: 16:9 landscape · 1920x1080 @ 30fps · 30.0s · no audio track.
Safe area ~10% margins (192px sides).

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
- Unifying texture on every frame: perspective grid + crosshairs + vignette +
  CSS grain, all in the root so it runs continuously under every scene.
- Camera never sleeps — every shot has a slow push, drift or parallax.
- Scenes overlap by 0.3s on ascending z-index; the incoming scene rises and
  un-blurs over the outgoing one, and a flame light-streak crosses the seam.
  No hard cuts, no exit animations (the transition is the exit).
- Shots run 3.4–4.1s — longer than an ad beat on purpose, so each one is usable
  standalone. The outro holds 5.6s.
- Callbacks: the flame hairline rule (shots 1, 3, 4, 8) and the cover itself
  (shot 1 → shot 8).

## Shot list
| # | t | Shot |
|---|---|---|
| 01 | 0.0 | Cover rises and settles on the grid, glint sweep, slow push-in |
| 02 | 3.6 | Seven pages fan into an arc and drift |
| 03 | 7.0 | 8 PARTS · 32 WORKSHEETS · 19 FREE TOOLS count up |
| 04 | 10.4 | Contribution-margin worksheet: fields fill, the answer lands in flame |
| 05 | 14.2 | The 2026 calendar page, push-in, Black Friday row lights |
| 06 | 17.6 | Eight companion spreadsheets deal into a stack |
| 07 | 21.0 | Seven free tools snap into a grid |
| 08 | 24.4 | Cover + EcomIQ lockup, 5.6s hold |

## What NOT to do
- No second hot accent. Flame orange is the only warm colour on screen.
- No voiceover, no music, no "Get started" CTA — this footage goes *under* someone else's edit.
- No hard cuts and no fade-to-black between shots.
- Don't put type over the middle of a page image; the editor may key their own text there.
- Don't stretch or recolour the logo or the page renders.
