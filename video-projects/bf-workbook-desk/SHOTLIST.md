# The Black Friday Profit Plan — desk b-roll (version 2)

`renders/bf-workbook-desk-1080p.mp4` · 1920×1080 · 30fps · **21.4s** · **no audio track**

The alternative cut to `bf-workbook-broll`. Same subject, opposite treatment:
that one is a motion-graphics stage, this one is a desk. The workbook is a
physical object under a single light and the camera behaves like a lens.

**Slot boundaries are identical to version 1**, so the two are drop-in
interchangeable — you can swap a shot between versions without re-timing.

## Shots
| # | In | Out | Clean pull | Shot |
|---|----|-----|-----------|------|
| 01 | 0.00 | 2.40 | 0.9 – 2.3 | Closed workbook on the desk, light rakes across the cover |
| 02 | 2.40 | 4.70 | 3.9 – 4.6 | The cover lifts and turns, revealing the contents beneath |
| 03 | 4.70 | 7.10 | 6.4 – 7.0 | Three leaves turn in succession — the book flipped through |
| 04 | 7.10 | 10.00 | 8.4 – 9.9 | Macro: a pen ticks two boxes on the mobile checkout checklist |
| 05 | 10.00 | 12.50 | 11.7 – 12.4 | Macro: the margin table, $59.71 lands in the flame-ruled box |
| 06 | 12.50 | 14.90 | 13.6 – 14.8 | The three printed sheets slide out across the desk |
| 07 | 14.90 | 17.20 | 16.4 – 17.1 | The book closes and settles |
| 08 | 17.20 | 21.40 | 18.4 – 21.4 | The closed cover and the EcomIQ lockup, 4.2s hold |

Shots 02, 03 and 07 contain the page turns, so their clean-pull windows sit late
— the turn has to finish before the shot is a usable still. Shot 08 holds clean
to the final frame.

## Which version to use where
| | v1 `bf-workbook-broll` | v2 `bf-workbook-desk` |
|---|---|---|
| Feel | Motion-graphics stage, void and grid | Desk, one light, real shadows |
| Labels | Eyebrows and stat counters on several shots | **None** except the end card |
| Best under | Narration that explains what the workbook contains | Narration that needs atmosphere, or where you key your own text |
| Formats | 16:9, 9:16, 4:5 | 16:9 (verticals can be added on request) |

Use v1 when the footage has to do some of the explaining. Use v2 when the voice
is doing the explaining and the picture just has to feel like a real thing on a
real desk.

## Notes for the edit
- No music, no voiceover, no CTA. It sits under your own audio.
- Flame orange is the only hot accent — the ticks, the answer, the rules.
- Shots 01, 07 and 08 leave large areas of empty desk for a lower third.
- The two macro shots (04, 05) are the ones with real depth of field; they cut
  well against wide shots from either version.
- Everything on screen is the real workbook. Shots 01, 02, 03, 06, 07 and 08 use
  page renders from the source PDF and the three printable sheets; shots 04 and
  05 are rebuilt in CSS because a macro on a raster crop would be soft and the
  ticks and the counting answer have to animate.

## Rebuilding
```bash
cd video-projects/bf-workbook-desk
npx hyperframes lint
npx hyperframes render --quality draft    --workers 4 --output renders/draft.mp4
npx hyperframes render --quality standard --workers 4 --output renders/bf-workbook-desk-1080p.mp4
```
Page art: `pdftoppm -png -r 130 workbook.pdf` into `assets/pages/`. The three
printable sheets come from the Drive links in the workbook's resource list.

**The page turns are real CSS 3D** (`preserve-3d` + `backface-visibility` on a
leaf with a front and a back face). Do not put a `filter` on any ancestor of a
leaf — it flattens the transform and the turn stops working. That is why shots
02, 03 and 07 fade in without the blur the other shots use.
