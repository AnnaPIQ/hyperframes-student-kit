# EcomIQ, Black Friday Profit Plan workbook ad · EDIT PLAN

**Status:** APPROVED and delivered. Renders in `renders/`.
**Deliverables:** 9:16 (1080×1920) + 1:1 (1080×1080), H.264/AAC MP4, faststart, 30fps.
**Runtime:** 17.00s (510 frames @ 30fps).

---

## 1 · Source audit

| Source | What it actually is | Notes |
|---|---|---|
| A-roll `2a: Ad/Social - Black Friday…mov` | **ProRes 4444, 3840×2160, 25fps, 20.68s**, PCM 24-bit stereo | Landscape 16:9. Sean centre-framed, blue-lit studio (near-brand navy). |
| B-roll folder | **No video.** 4 AI product stills + the workbook PDF + 19 companion tools (xlsx/PDF) | 3 stills usable; 1 excluded (garbled AI text). |
| Workbook PDF | `The Black Friday Profit Plan`, 8 parts / 32 worksheets / 19 tools | Source of every on-screen figure. |

### A-roll audio map (silence analysis, source timeline)

| Source in | Source out | Content |
|---|---|---|
| 0.00 | 2.29 | **dead air** (2.22s), trimmed |
| 2.29 | 6.35 | "A record Black Friday can still leave you with very little profit." |
| 6.77 | 8.46 | "So before you set your offer," |
| 8.46 | 10.80 | "work out what each order contributes" |
| 11.01 | 13.91 | "and the biggest discount your margin can actually afford." |
| 14.62 | 16.60 | "Our free workbook walks you through all of it." |
| 17.00 | 17.63 | "The link is below." |
| 17.63 | 20.68 | **out-take tail** (3.05s, Sean looks down), trimmed |

**Edit time = source time − 1.95s.** 100% of speech is kept; only head dead-air and the tail out-take are removed.

---

## 2 · Media normalisation (done, real ffmpeg)

| Asset | Spec |
|---|---|
| `assets/aroll-916.mp4` | 1080×1920, Sean at **88% of cover scale** from 3840×2160 with a blurred fill top/bottom, 30fps CFR, CRF 19, muted |
| `assets/aroll-1x1.mp4` | 1080×1080, same 88% pull-back and blurred fill, 30fps CFR, CRF 19, muted |
| `assets/sean-vo.m4a` | 16.15s AAC 192k @48k, **loudnorm −33.3 → −16.1 LUFS** (source was 17 dB under social delivery loudness) |
| `assets/music-bed-placeholder.m4a` | 20s digital silence, swap-in point for the real bed |
| `assets/workbook-cover.png` | Portrait cover mockup (1122×1402) |
| `assets/workbook-spread.png` | Full tool spread, clean text (1535×1024) |
| `assets/workbook-spread-discount.png` | Spread with "Calculate how much you can afford to discount…" subline |

**Crop, not pad.** Pillarboxing a 16:9 head into 9:16 leaves a 1080×608 strip in a sea of navy. Cover-crop keeps Sean's face full-frame; his hands clip slightly at the vertical edges, which reads as normal social framing. 1:1 crop is comfortable with nothing lost.

---

## 3 · Shot list (edit time, snapped to 1/30s frame boundaries)

| # | In | Out | Dur | Shot | On screen |
|---|---|---|---|---|---|
| S1 | 0.000 | 1.900 | 1.90 | **Sean** full-bleed | Logo watermark in @0.20. Flame `BLACK FRIDAY` chip @0.60. VO: "A record Black Friday can still leave you…" |
| S2 | 1.900 | 4.833 | 2.93 | **GFX-1 · Revenue vs Profit** | Whip-in. Axis draws @2.05. `REVENUE` bar (blue-tint) rockets to 100% @2.13–2.80. `PROFIT` sliver (flame) crawls to ~8% @3.23–3.63, **lands on "very little profit"**. Flame underline flick @3.70. |
| S3 | 4.833 | 6.500 | 1.67 | **Sean** | VO: "So before you set your offer," |
| S4 | 6.500 | 8.833 | 2.33 | **GFX-2 · Contribution per order** | Eyebrow `ONE ORDER`. `$114.70` scales in @6.63. Deduction rows stagger 0.16s from @6.90: `−$4.59 refunds & discounts` · `−$34.00 product` · `−$13.10 fulfilment & delivery` · `−$3.30 fees`. Count-up to **`$59.71`** @7.60–8.20. Flame chip `52.1% CONTRIBUTION` @8.20. |
| -- | 8.833 | 9.067 | 0.23 | **Whip** | Transition sits inside Sean's natural 0.21s pause. |
| S5 | 9.067 | 11.967 | 2.90 | **GFX-3 · Discount dial** | Arc track draws. Flame arc sweeps 0→**25%** with centre count-up @9.20–9.90. Label `DISCOUNT DEPTH` @10.10. **Callback:** the `$59.71` chip from S4 flies in and morphs → **`$33.00`** ↓ @10.30–10.90. Chip `BREAKEVEN ROAS 1.92 → 2.61` @11.05. Micro-line `…and 1.81× the units to stand still` @11.25. |
| S6 | 11.967 | 12.667 | 0.70 | **Sean** | The rest beat, his breath before the offer. |
| S7 | 12.667 | 15.033 | 2.37 | **Workbook hero (light beat)** | Flash to white/sky. `workbook-spread-discount.png` scales 1.06→1.00 w/ drift @12.80. `workbook-cover.png` slides up front-left, `back.out(1.2)` @13.30. Flame chip `8 PARTS · 32 WORKSHEETS · 19 TOOLS` @13.80. Slow push-in to out. |
| S8 | 15.033 | 19.600 | 4.57 | **END CARD** | Light→navy wipe. Corner watermark **flies to centre and scales up** (logo callback) @15.033–15.30. Headline rises @15.30. Flame pill @15.90 `back.out(1.7)`. Bobbing ↓ chevron @16.30. VO ends 15.70; card holds 3.9s in silence. |

**Mid-section average scene length: 2.15s.** Slightly over the ≤2s house guideline because Sean's VO cadence owns the timing, not the graphics.

### Sean on screen
4 appearances, 5.94s of 19.60s. His voice runs the whole way. Graphics and product carry the visual.

---

## 4 · On-screen figures, all from the workbook's own worked example

Nothing here is invented. Part 01 of the workbook, pages 8 and 10:

```
$114.70   Shopify BFCM 2025 average order value        (Shopify, Dec 2025)
−  4%     discounts and refunds        → $110.11 retained
− $34.00  landed product cost
− $ 4.50  fulfilment  ┐
− $ 8.60  delivery    ┘ → shown combined as −$13.10
− $ 3.30  payment and commission charges
= $59.71  contribution per order  =  52.1%
```

```
Same order at 25% off → customer pays $86.03
Contribution falls   $59.71 → $33.00
Breakeven ROAS       1.92   → 2.61
Volume needed        1.81× to preserve total contribution
```

Every numeric beat carries an `EXAMPLE` label plus its source in micro-type
(`Shopify, Dec 2025` / `Adobe Analytics, Dec 2025`).

**Honesty note on S5.** The workbook's 25% is the *2025 apparel discount depth benchmark* used in its worked example, it is **not** a claim that 25% is the maximum any store can afford. So S5 is framed as **"what 25% off costs you"**, which serves the VO line ("the biggest discount your margin can actually afford") by making the trade-off concrete, without inventing a universal maximum.

---

## 5 · Brand system (reused, nothing invented)

| Element | Source |
|---|---|
| Palette | `assets/brand-tokens.css`, `--brand-navy #06284C`, `--brand-blue-tint #9CD4FF`, `--brand-sky #DEEEFE`, `--brand-flame #FF4C32`, `--brand-white`, `--brand-text-dim` |
| Type | Local `assets/fonts/RethinkSans.woff2` (400–800) + `HedvigLettersSerif.woff2`, named literally in CSS per the fonts README |
| Logo | `assets/ecomiq-logo-white.svg` (1671×286, 5.84:1) on navy |
| Active hues | 4: navy (canvas) · blue-tint (revenue / neutral figures) · flame (the cost of discounting, CTA) · sky/white (the product beat). Each owns one meaning. |
| Texture | Navy canvas + brand-gradient-2 bloom + breathing vignette + CSS film grain on every scene |
| Motion | GSAP vendored locally (`assets/vendor/gsap.min.js`). Every beat change is a crossfade (0.30s in / 0.27s out). No captions. |

Logo watermark sits **top-left on every frame**, subtle drop shadow, and is the same element that becomes the end-card hero.

---

## 6 · Audio

| Track | Element | Start | Dur | Volume |
|---|---|---|---|---|
| VO | `sean-vo.m4a` | 0.000 | 16.15 | 1.0 |
| Bed (under VO) | `music-bed-placeholder.m4a` | 0.000 | 15.033 | **0.10** |
| Bed (end card) | `music-bed-placeholder.m4a` | 15.033 | 4.567 | **0.18** |

The bed is pre-split at the end-card cut, so the duck is already wired: swap the
`src` on both clips for the real bed and it ducks under Sean and lifts on the card.
B-roll audio is a non-issue, the stills have none and both A-roll MP4s are encoded `-an`.

---

## 7 · Build & render approach

One project, two roots sharing one timeline source so the ratios cannot drift:

```
video-projects/ecomiq-bf-workbook/
├── index.html      ← 9:16 root  (1080×1920)
├── square.html     ← 1:1 root   (1080×1080)
├── assets/ad.css   ← shared design system + per-ratio layout blocks
└── assets/ad.js    ← shared GSAP timeline builder
```

```bash
npx hyperframes lint
npx hyperframes render --quality standard --output renders/ecomiq-bf-workbook-916.mp4
npx hyperframes render -c square.html --quality standard --output renders/ecomiq-bf-workbook-1x1.mp4
```

Then frame-verify every beat (`ffmpeg -ss` + `Read` on each PNG) before delivery.

---

## 8 · Decisions, as approved

1. **Trim** — head dead-air (2.22s) and tail out-take (3.05s) removed, 100% of speech kept. Approved.
2. **Crop, not pad**, on the A-roll. Approved.
3. **Sean/graphics balance** — the hybrid: he is on screen 4 times, 5.94s of 19.60s, voice throughout. Approved.
4. **Logo watermark at 16% width** (173×30px 9:16, 200×34px 1:1) rather than the briefed 8–10%, which rendered the wordmark illegible on mobile. Approved.
5. **End card** — headline "Get your *free* Black Friday workbook" + pill **"Get the workbook"**, dropping the second "free". Approved.
6. **19.60s runtime** with a 4.57s end-card hold. Approved.

---

## 9 · What changed during the build

Everything in §3 shipped as planned. These are the deltas, all found by looking at rendered frames:

- **S7 light beat, canvas and card treatment.** The product renders are photographs on an off-white studio ground (`#EEEEEF` and `#FDFDFE`), not cut-outs, so on the planned pure-white canvas their frame edges showed as grey boxes. The canvas is now a sky-to-white wash and each shot is a deliberate rounded card with a navy shadow. The cover was tightened with a uniform-border `-trim` (1122×1402 → 953×1131) so its card sits close around the book.
- **S7 in 1:1.** A stacked spread-plus-cover overflowed the square frame by ~180px. The square cut runs the spread as the hero with a horizontal `8 / 32 / 19` stat row beneath; the standalone cover is hidden (the spread already shows the cover front and centre).
- **Transition mechanics.** Whips now start 0.2s before the cut on a `power1.inOut` ease so the streak is mid-frame on the cut, and every scene's first entrance fires on its `data-start`. Both were landing on empty frames before.
- **End card entrance.** The logo flight moved from `power3.inOut` to `power3.out` and the headline now builds from the cut frame, which removed a ~6-frame empty navy card at 15.03s.
- **No `→` anywhere.** U+2192 is absent from both brand font subsets; the S5 arrow is drawn in CSS and the ROAS chip reads "rises 1.92 to 2.61".
- **Footnote contrast** raised to `#c3d5ea`; at `--brand-text-dim` under the vignette the attribution lines were close to unreadable.
- **1:1 dial caption** wrapped to two lines inside the gauge; a single line overlapped the arc strokes at 250px.

## 10 · Delivered

| File | Spec |
|---|---|
| `renders/ecomiq-bf-workbook-916.mp4` | 1080×1920, 19.60s, H.264 yuv420p / AAC 48k stereo, faststart, −16.1 LUFS, 12.8 MB |
| `renders/ecomiq-bf-workbook-1x1.mp4` | 1080×1080, 19.60s, H.264 yuv420p / AAC 48k stereo, faststart, −16.1 LUFS, 7.4 MB |

Lint: 0 errors (2 benign `composition_file_too_large` warnings). Frame-verified at
every beat and every cut in both ratios.

## 11 · Still open for you

- **The music bed is silent.** `assets/music-bed-placeholder.m4a` is 20s of digital silence, wired as two clips (0.10 under the VO, 0.18 on the card). Drop in a real bed and swap the `src` on both `<audio>` elements; the duck is already in place.
- **The CTA pill is not a link.** It reads "Get the workbook"; the destination lives in the ad's own link field.

---

## 12 · Revision, after first review

Two changes on Anna's note:

- **Cuts are now fades.** The whip-streak-plus-blur cuts are gone; every beat change is a plain opacity crossfade. Because the graphic scenes are opaque panels sitting over the A-roll, fading one up dissolves Sean into it and fading one down dissolves back to him, so most boundaries needed no structural change. The exception is **workbook → end card**, which had no A-roll beneath it (the video ends at 15.0333): those two clips now overlap, with the card fading up from **14.8667** over a workbook that holds opaque until **15.1667**. Card content still lands on "the link is below" at 15.0333.
- **End card "free" is white and upright**, not blue italic serif. That removes the last use of Hedvig Letters Serif from the piece, so its `@font-face` and the `.em` rules came out of `assets/ad.css` rather than embedding an unused font in every render. The `.woff2` stays in `assets/fonts/` for future variants.

Re-rendered and re-verified both ratios: mid-dissolve frames at every boundary, the
end card, and the 1:1 reflows. Runtime, specs and loudness unchanged.

One note for the record: the house motion guide (`MOTION_PHILOSOPHY.md`) prefers
motion-blurred whips over fades, and the `/hyperframes` skill bans exit animations
outside the final scene. Fades require both. This is a deliberate, instructed
departure, documented here so a future session doesn't "fix" it back.

---

## 13 · Revision, subtitle space

Bottom of every graphic scene is now reserved for subtitles you will add by hand.

| Ratio | Reserve | Clear band |
|---|---|---|
| 9:16 | 340px | y **1580–1920** |
| 1:1 | 200px | y **880–1080** |

It is one CSS variable (`--sub-safe`) subtracted from each scene's bottom
padding, so the whole piece rebalances from a single value if you want the band
deeper or shallower. What moved to make room:

- All scene content shifted up; the footnote attributions now sit just above the band rather than at the frame edge.
- The light beat is the tallest scene, so the product shots came down a little: spread 1010→940px (9:16) and 880→740px (1:1), cover 400→370px (9:16).
- The 1:1 end card lifted 70px. Its chevron **bobs 14px**, and at the old position the bottom of that loop crossed into the band by ~2px; measured on the render, its lowest point now sits at y 848, clear by 32px.
- Footnote tracking tightened .16em → .12em: the longest attribution had started wrapping to two lines in 9:16 after the earlier contrast bump.

Sean's beats are full-bleed video and needed no change; subtitles overlay him,
and the A-roll's bottom scrim already helps them read.

Verified by overlaying the band on rendered frames for every scene in both
ratios, and by measuring the chevron's lowest pixel across its bob cycle.
Runtime, specs and loudness unchanged.

---

## 14 · Revision, review pass 3

Six changes on Anna's notes:

1. **"Thin" is white**, not flame. The revenue/profit headline is now flat white throughout; flame is carried by the profit bar alone. No type-level emphasis colour is left in the piece, so the `.hot` rule came out.
2. **All three footnote attributions deleted** (`Illustrative · your numbers decide the answer`, and both `Example · …` source lines). `.foot` is gone from the stylesheet.
3. **The workbook beat is navy**, matching every other graphic scene. There is no longer a light beat, which also retires the navy logo lockup variant (one white lockup throughout) and the vignette's dip that existed only to avoid darkening a white frame. The product spread is now a rounded photo card with a dark lift on navy, which is the brand's "product photography against navy" direction.
4. **The standalone cover shot deleted.** The spread is the single hero, so it grew (940 → 980px in 9:16, 740 → 700px in 1:1) and the `8 / 32 / 19` stats became one horizontal row in both ratios.
5. **End-card down arrow removed.**
6. **Runtime 19.60s → 17.00s** (510 frames). The end card now holds 1.97s after the dissolve, and 1.30s after the VO ends at 15.70. The CTA's breathe was retimed to a single 0.42s pulse landing exactly on 17.00 so `tl.duration()` still matches the root `data-duration`, and the end-card music-bed clip shortened to 1.9667s to match.

**Flag on (2).** Those footnotes were what labelled the numeric beats as an
example and cited Shopify / Adobe. Without them, `$114.70`, `$59.71`, `52.1%`,
`25%`, `$33.00` and `ROAS 1.92 to 2.61` read as unqualified figures rather than
the workbook's worked example. Nothing on screen now attributes them. If that
matters for review, the no-cost fix is to fold the word into an eyebrow, e.g.
"What one order contributes · example", rather than bring the footnotes back.

Verified: 0 lint errors, resolved duration 17.0s, both renders 17.000s at
−16.1 LUFS, last frame is the card (not black), and every scene still clears
the subtitle band.

---

## 15 · Revision, review pass 4

- **Sean pulled back 12%.** Worth knowing why this needed a re-encode rather than a CSS tweak: the A-roll is 16:9 inside a 9:16 frame, so the crop was already using **100% of the source height**. There is no more picture above his head or below his chest to reveal, and zooming out can only mean scaling him down. He is now rendered at 88% of cover scale, and the resulting gap top and bottom is filled with a blurred, slightly darkened copy of the same frame. Against his smooth blue backdrop the seam does not read. Same treatment in both ratios.
- **"8 Parts" deleted** from the workbook stats.
- **32 and 19 much bigger**: 78 → 132px in 9:16, 54 → 92px in 1:1, labels up to match. With two stats left they are centred on a fixed gap rather than pushed to the frame edges.
- **"Free workbook" bigger**: 28 → 40px in 9:16, 23 → 32px in 1:1, with the flame rule scaled up to match (132 → 186px, 8px tall).
- The 1:1 spread came down 700 → 640px to pay for the taller eyebrow and stat row.

Verified: 0 lint errors, both renders 17.000s at −16.1 LUFS, and every scene
still clears the subtitle band.

**Still open:** the numeric beats remain unattributed on screen (see §14).

---

## 16 · Revision, review pass 5 (tried, then reverted)

Sean was pushed further back, 88% → 72% of frame height, bottom-anchored with
his backdrop stretched up to fill above him. Reviewed and **reverted**: the
88% framing is the keeper.

Kept here because the technique is worth knowing if this ever comes up again:

- Below roughly 12% pull-back, centring him with a blurred copy of the frame behind is invisible.
- Further out that breaks, the gap opens top *and* bottom and the fill shows recognisable smears of his own face above and torso below, with a hard seam.
- The fix is geometry, not blur: bottom-anchor him so there is only one gap, above, which is the one region where the source is plain backdrop, then fill it by stretching the top 20px of his own frame to full height with a light blur.

```
[0:v]scale=-2:1382,crop=1080:1382:(iw-1080)/2:0,setsar=1[fg];
[fg]split=2[fga][fgb];
[fgb]crop=1080:20:0:0,scale=1080:1920:flags=bicubic,boxblur=10:1[fill];
[fill][fga]overlay=0:538
```

Current delivery is back on the §15 framing: **88% of cover scale, centred,
blurred fill top and bottom**.
