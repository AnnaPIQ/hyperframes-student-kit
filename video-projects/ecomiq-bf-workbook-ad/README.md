# ecomiq-bf-workbook-ad

EcomIQ Black Friday ad promoting the free **Black Friday Profit Plan** workbook.
Sean's A-roll is the spine; real product B-roll and motion graphics cut in and
out over it; it finishes on a workbook CTA card. **53.00s**, two ratios.

| Ratio | Size | Composition | Render |
|---|---|---|---|
| 9:16 Reels / Stories | 1080×1920 @ 30fps | `index.html` | `renders/ecomiq-bf-workbook-ad-9x16.mp4` |
| 4:5 Meta feed | 1080×1350 @ 30fps | `compositions/ad-4x5.html` | `renders/ecomiq-bf-workbook-ad-4x5.mp4` |

- **`EDIT_PLAN.md`** — the approved beat map, cut list, and the provenance of
  every on-screen figure.
- **`DESIGN.md`** — palette, type, motion rules, and what not to do.

## Build

```bash
bash scripts/fetch-and-prep.sh        # pull the A-roll + workbook from Drive, cut both ratios
node scripts/build-compositions.mjs   # generate index.html + ad-4x5.html
npx hyperframes lint                  # expect 0 errors
node scripts/render-all.mjs draft     # fast pass, for frame checking
node scripts/render-all.mjs           # standard quality, both ratios
```

`index.html` and `compositions/ad-4x5.html` are both **generated**. Edit
`scripts/build-compositions.mjs` and re-run it; never hand-edit the HTML.
(`index.html` is the 9:16 composition — `hyperframes lint` requires a root
`index.html`, so the primary ratio lives there.) Both ratios come out of one spec, so
timing and copy can't drift apart between them.

## Assets

| Path | What | Committed |
|---|---|---|
| `assets/aroll/sean-9x16.mp4`, `sean-4x5.mp4` | A-roll, muted, centre-cropped | no — 70 MB, rebuild with `fetch-and-prep.sh` |
| `assets/aroll/sean-vo.m4a` | the full VO, normalised to −16 LUFS | yes |
| `assets/broll/*.mp4` | real screen recordings: the workbook PDF and the Profitability Dashboard | yes |
| `assets/pages/*.png` | real page renders out of the workbook PDF (cover + the contribution-margin page) | yes |
| `assets/music/music-bed.m4a` | silent duckable placeholder, wired at `data-volume="0.14"` | yes |

B-roll and page renders came from two sibling branches:
`claude/cool-allen-8hees7` (`video-projects/ecomiq-broll/`) and
`claude/wonderful-curie-brnfzl` (`video-projects/bf-workbook-broll/`). Only the
clips and pages this ad actually uses are committed here; those branches also
carry the True CAC calculator recording, the 2026 calendar page, the page fan
and the rest of the PDF, if a revision needs them.

## Two things worth knowing

**The A-roll is landscape and had to be cropped.** The master is 3840×2160
ProRes. Scale-and-pad into a vertical frame would letterbox Sean to ~30% of
frame height, so both outputs are centre crops (`1215×2160` for 9:16,
`1728×2160` for 4:5). He sits dead-centre in the original framing, so no
re-framing pass was needed, and both crops downscale to 1080 with resolution
to spare.

**The bottom of every frame is a reserved subtitle band** — 380px in 9:16,
268px in 4:5 — for subtitles to be added by hand later. No graphic enters it,
and the scrim darkens it to ~0.97 navy so subtitles read without extra
treatment.

## Music

`assets/music/music-bed.m4a` is silent. Drop a real track in at the same path
to activate the bed; see `assets/music/README.md` for the encode command.
