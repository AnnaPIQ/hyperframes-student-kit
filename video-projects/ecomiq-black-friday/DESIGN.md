# ecomiq-black-friday — Design Spec

Black Friday ad for US Shopify brands, promoting the free **Black Friday Profit
Plan** workbook. Sean's A-roll is the spine; motion graphics carry the three
questions; a workbook CTA end card closes.

**Formats:** 9:16 Story/Reels · 1080×1920 (`index.html`) and 4:5 Meta feed ·
1080×1350 (`compositions/bf-45.html`). 30 fps, 39.0s, safe area ~10% margins.

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`; local fonts in `assets/fonts/`.

**Runtime 39.0s.** Dead air is spliced out of the A-roll by `scripts/prep-media.sh`,
and `--safe-bottom` reserves an empty band at the bottom of every frame (230px in
9:16, 150px in 4:5) for subtitles to be added later.

## This project's idea
- **Hook:** "Before you plan a single Black Friday ad, ask yourself these three questions."
- **Message:** Know your contribution, your breakeven ROAS and your discount
  ceiling first, and the rest of the plan follows. Every number on screen is the
  workbook's own worked example.
- **CTA:** Get your free Black Friday workbook → "Sign up free".

## Look
- Navy canvas (`--brand-navy`) with a blue-tint bloom; flame orange
  (`--brand-flame`) reserved for the payoff number, the hot column, the final
  checklist item and the CTA pill.
- Rethink Sans throughout; Hedvig Letters Serif italic for the one emphasis word
  per headline ("*discount*", "*easy*", "*free*") — the EcomIQ signature.
- Data panels sit over Sean in the lower third; the bigger ideas take the full frame.
- Product stills: the workbook cover is keyed and floats on navy; the suite
  shots are framed as rounded white cards.

## Build

```bash
bash scripts/prep-media.sh <raw-aroll.mov>   # crop/trim A-roll to both ratios + audio
bash scripts/prep-stills.sh                  # key the workbook cover
node scripts/derive-45.mjs                   # regenerate the 4:5 cut from index.html
npx hyperframes lint
npx hyperframes render --quality standard --output renders/ecomiq-black-friday-9x16.mp4
npx hyperframes render --quality standard --composition compositions/bf-45.html \
  --output renders/ecomiq-black-friday-4x5.mp4
```

**`index.html` is the master.** Edit it, then re-run `derive-45.mjs` — the 4:5
cut is generated from it so the two ratios cannot drift apart. Geometry-only
overrides for 4:5 live in the generator, not in the generated file.

Timings, number provenance and known limitations: **`EDIT-PLAN.md`**.
