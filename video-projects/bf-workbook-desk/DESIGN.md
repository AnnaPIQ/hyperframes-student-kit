# bf-workbook-desk — Design Spec

**Alternative b-roll cut of The Black Friday Profit Plan.** Same subject as
`bf-workbook-broll`, deliberately the opposite treatment: that version is a
motion-graphics stage — void, grid, crosshairs, whip streaks, labelled beats.
This one is a **desk**. The workbook is a physical object under a single light,
and the camera behaves like a lens rather than a compositor.

Format: 16:9 · 1920x1080 @ 30fps · **21.4s** · no audio track.
Slot boundaries are identical to `bf-workbook-broll`, so the two versions are
drop-in interchangeable in an edit.

## The one rule that separates it from v1
**No type except the end card.** No eyebrows, no stat counters, no labels. The
artefact carries every shot. If a beat needs a caption to work, it is the wrong
beat for this version.

## The look system
| Element | How it is built |
|---|---|
| **Surface** | Matte navy `#071d35`, warmer than v1's void so it reads as a material, not emptiness. |
| **Key light** | One source, upper-left. A soft elliptical pool that drifts across the whole 21.4s. Everything is lit from that direction, always. |
| **Shadows** | Every object gets two: a tight dark contact shadow (short offset, ~20px blur) and a wide ambient one (~90px blur, low alpha). The pair is what sells weight. |
| **Depth of field** | One sharp focal plane. Out-of-focus paper edges sit in the foreground on several shots. |
| **Camera** | Never axis-aligned. The desk plane is tilted and the camera drifts on a slow sine — handheld, not locked off. |

No perspective grid and no crosshairs — that is v1's texture. The unifying
texture here is surface + raking light + shadow.

## Colors — the same five, but light does the work
`#071d35` desk · `#FFFFFF` paper · `#9CD4FF` cool light · `#DEEEFE` the fields ·
`#FF4C32` flame, still the only hot accent (the ticks, the answer, the rules).

## Typography
Only shot 08 carries type: Hedvig Letters Serif upright for the title, Rethink
Sans for everything else. Both local `.woff2`.

## Transitions
Scenes overlap 0.4s. The incoming shot rises and fades over the outgoing one,
and a soft **exposure bloom** — the whole frame lifting ~8% for a fifth of a
second — covers the seam. A light change, not a graphic wipe. v1's whip streak
would be wrong here.

## Shot list
| # | t | Shot |
|---|---|---|
| 01 | 0.0 | Closed workbook on the desk, light rakes across the cover |
| 02 | 2.4 | The cover lifts and turns, revealing the contents beneath |
| 03 | 4.7 | Three leaves turn in succession — the book being flipped through |
| 04 | 7.1 | Macro: a pen ticks two boxes on the mobile checkout checklist |
| 05 | 10.0 | Macro: the margin table, $59.71 lands in the flame-ruled box |
| 06 | 12.5 | The three printed sheets slide out across the desk |
| 07 | 14.9 | The book closes and the stack settles |
| 08 | 17.2 | Overhead: the closed cover and the EcomIQ lockup, 4.2s hold |

## Built vs photographed
Shots 01, 02, 03, 06, 07 and 08 use real page renders from the source PDF and
the three printable sheets. Shots 04 and 05 are rebuilt in CSS — a macro on a
raster crop would be soft, and the ticks and the counting answer have to
animate. Same split as v1, for the same reasons.

## What NOT to do
- No second hot accent, and no type creeping back into shots 01-07.
- No perfectly flat, axis-aligned, evenly-lit frames — that is the v1 stage.
- Don't put a `filter` on an ancestor of a 3D page turn; it flattens the
  transform and the leaf stops turning.
- Don't fake handwriting. The pen ticks a box; it does not write words.
