# The Black Friday Profit Plan — b-roll shot list

Silent b-roll for cutting under narration in future EcomIQ videos. **21.4s**,
30fps, **no audio track**, in three formats:

| Format | Project | Size | File |
|---|---|---|---|
| 16:9 landscape | `bf-workbook-broll` | 1920×1080 | `renders/bf-workbook-broll-1080p.mp4` |
| 9:16 Reels / Shorts | `bf-workbook-broll-9x16` | 1080×1920 | `renders/bf-workbook-broll-9x16.mp4` |
| 4:5 Meta feed | `bf-workbook-broll-4x5` | 1080×1350 | `renders/bf-workbook-broll-4x5.mp4` |

All three share the same eight shots, the same copy and the **same timing**, so
they cut together frame-for-frame. Only the layout changes per format.

## Shots

Shots overlap 0.4s (the incoming shot blur-rises while a light streak crosses
the seam). **Clean pull** is the window where a shot is fully built with nothing
from its neighbours on screen — use it when lifting a shot on its own.

| # | In | Out | Clean pull | Shot | Use it for |
|---|----|-----|-----------|------|-----------|
| 01 | 0.00 | 2.40 | 1.1 – 2.3 | Cover rises onto the grid, glint sweep, slow push | Naming the workbook, opening a segment |
| 02 | 2.40 | 4.70 | 3.3 – 4.6 | Seven pages fan into an arc and drift | "51 pages", "eight parts", scope |
| 03 | 4.70 | 7.10 | 5.5 – 7.0 | 8 PARTS · 32 WORKSHEETS · 19 FREE TOOLS count up | What's inside, stat call-out |
| 04 | 7.10 | 10.00 | 8.8 – 9.9 | Contribution-margin worksheet fills in, answer lands in flame | Margin, breakeven, "do the maths first" |
| 05 | 10.00 | 12.50 | 11.5 – 12.4 | Camera pans the 2026 calendar, Black Friday row lights | Dates, deadlines, planning backwards |
| 06 | 12.50 | 14.90 | 13.6 – 14.8 | Eight companion spreadsheets deal into a grid | The sheets you get, "copy and edit" |
| 07 | 14.90 | 17.20 | 15.9 – 17.1 | Seven free tools snap into a cloud | Calculators and audits on the site |
| 08 | 17.20 | 21.40 | 18.4 – 21.4 | Cover + EcomIQ lockup, hold | End card. Last frame is clean — freeze it |

Seven shots run 2.3–2.9s; the outro holds 4.2s. Long enough to lift one on its
own, short enough that the piece keeps moving under a voiceover.

## Notes for the edit
- No music and no voiceover by design — this sits under your own audio.
- Flame orange is the only hot accent. If you key text over a shot, white or
  `#9CD4FF` on the navy stays on-brand; avoid a second warm colour.
- Shots 01, 02, 05 and 08 leave large areas of empty navy — good places for a
  lower third or a headline. The vertical formats have the most room.
- Everything on screen is the real workbook: shots 01, 02, 05 and 08 use page
  renders straight from the PDF, and shots 04, 06 and 07 are rebuilt in the
  workbook's own styling so the numbers and fields can animate.
- Figures are the workbook's own worked example (a $114.70 order leaving $59.71
  contribution) and its real resource names. If the workbook is revised,
  re-check shots 03, 04, 06 and 07.

## Per-format layout differences
| Shot | 16:9 | 9:16 and 4:5 |
|---|---|---|
| 03 stats | three columns with dividers | three stacked rows, dividers dropped |
| 05 calendar | tall page, long pan down it | page nearly fills the frame, short drift |
| 06 sheets | 4 × 2 grid | 2 × 4 grid (smaller sheet thumbs at 4:5) |
| 07 tools | cloud wraps 3/3/1 | narrower cloud, more rows |
| 08 outro | cover beside the lockup | cover above a centred lockup |

## Rebuilding
The 16:9 project is the source of truth for structure, copy and timing. The two
vertical projects are **generated** — never hand-edit them.

```bash
cd video-projects/bf-workbook-broll
# edit index.html / compositions/*.html, then:
node scripts/build-variants.mjs          # regenerates the 9x16 and 4x5 projects

npx hyperframes lint
npx hyperframes render --quality draft    --workers 4 --output renders/draft.mp4
npx hyperframes render --quality standard --workers 4 --output renders/bf-workbook-broll-1080p.mp4
```

Layout deltas per format live in `scripts/overrides/9x16.css` and
`scripts/overrides/4x5.css`; the generator appends each section to the matching
file's own `<style>` block. Timing lives in `index.html` (slot starts and
durations) — each scene's `SLOT` constant must match its clip's `data-duration`.
Page art is generated from the source PDF with `pdftoppm -png -r 220` and
downscaled into `assets/pages/`.
