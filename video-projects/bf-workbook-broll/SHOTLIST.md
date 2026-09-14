# The Black Friday Profit Plan — b-roll shot list

`renders/bf-workbook-broll-1080p.mp4` · 1920×1080 · 30fps · **30.0s** · **no audio track**

Silent b-roll for cutting under narration in future EcomIQ videos. Every shot is
self-contained, so you can pull any single one and loop or trim it. Shots overlap
by 0.55s (a blur-rise plus a light streak across the seam), so when you pull one
shot on its own, cut **just after** the previous shot's out point.

| # | In | Out | Clean pull | Shot | Use it for |
|---|----|-----|-----------|------|-----------|
| 01 | 0.00 | 3.60 | 0.9 – 3.5 | Cover rises onto the grid, glint sweep, slow push | Naming the workbook, opening a segment |
| 02 | 3.60 | 7.00 | 4.5 – 6.9 | Seven pages fan into an arc and drift | "51 pages", "eight parts", scope |
| 03 | 7.00 | 10.40 | 8.2 – 10.3 | 8 PARTS · 32 WORKSHEETS · 19 FREE TOOLS count up | What's inside, stat call-out |
| 04 | 10.40 | 14.20 | 12.6 – 14.1 | Contribution-margin worksheet fills in, answer lands in flame | Margin, breakeven, "do the maths first" |
| 05 | 14.20 | 17.60 | 16.4 – 17.5 | Camera pans the 2026 calendar, Black Friday row lights | Dates, deadlines, planning backwards |
| 06 | 17.60 | 21.00 | 19.0 – 20.9 | Eight companion spreadsheets deal into a grid | The sheets you get, "copy and edit" |
| 07 | 21.00 | 24.40 | 22.5 – 24.3 | Seven free tools snap into a cloud | Calculators and audits on the site |
| 08 | 24.40 | 30.00 | 26.2 – 30.0 | Cover + EcomIQ lockup, 4s still hold | End card. Last frame is clean — freeze it |

**Clean pull** = the window where the shot is fully built and nothing from the
neighbouring shot is on screen. Shot 08 holds clean to the final frame, so it
also works as a still.

## Notes for the edit
- No music and no voiceover by design — this sits under your own audio.
- Flame orange is the only hot accent. If you key text over a shot, white or
  `#9CD4FF` on the navy will stay on-brand; avoid a second warm colour.
- Shots 01, 02, 05 and 08 have large areas of empty navy on the grid — good
  places to drop a lower third or a headline.
- Everything on screen is the real workbook: shots 01, 02, 05 and 08 use page
  renders straight from the PDF, and shots 04, 06 and 07 are rebuilt in the
  workbook's own styling so the numbers and fields can animate.
- Figures are the workbook's own worked example (a $114.70 order leaving $59.71
  contribution) and its real resource names. If the workbook is revised, re-check
  shots 03, 04, 06 and 07.

## Rebuilding
```bash
cd video-projects/bf-workbook-broll
npx hyperframes lint
npx hyperframes render --quality draft    --workers 4 --output renders/bf-workbook-broll-draft.mp4
npx hyperframes render --quality standard --workers 4 --output renders/bf-workbook-broll-1080p.mp4
```
Page art is generated from the source PDF with
`pdftoppm -png -r 220 workbook.pdf` and downscaled into `assets/pages/`.
Timing lives in `index.html` (slot starts + durations) — each scene's `SLOT`
constant must match its clip's `data-duration`.
