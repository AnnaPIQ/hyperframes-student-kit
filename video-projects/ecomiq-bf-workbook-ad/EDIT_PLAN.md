# EcomIQ — Black Friday Profit Plan ad · EDIT PLAN

**Status: APPROVED 15 Sep 2026.** Decisions taken: ratios **9:16 + 4:5** · end-card
wording **as planned** · **Sean on screen**, cutting in and out of B-roll and motion
graphics, with a **reserved subtitle band** at the bottom of every frame for
subtitles to be added by hand later.

---

## 1 · Sources (all pulled and probed)

| Source | What it is | Probe |
|---|---|---|
| A-roll | `Beat your black friday plan before its too late .mov` (Drive `1hpbCEq…`) | ProRes Standard, **3840×2160 landscape**, 25fps, **54.88s**, PCM 24-bit stereo |
| Workbook | `The Black Friday Profit Plan Workbook.pdf` (Drive `1QJvDX6G…`) | PDF 1.4, 8pp sampler of the 51-page book, 2026 edition |
| B-roll clips | `claude/cool-allen-8hees7` → `video-projects/ecomiq-broll/assets/clips/` | `workbook.mp4`, `dashboard.mp4`, `calculator.mp4` — 1600×1000, 30fps, 3.0s each, **silent** |
| Workbook page renders | `cool-allen` `assets/pages/page1–9.png` · `claude/wonderful-curie-brnfzl` `bf-workbook-broll/assets/pages/` | `cover.png`, `calendar.png`, `deck-1…7.png`, `page1–9.png` — real pages out of the PDF |

### ⚠️ A-roll needs a CROP, not scale+pad

The A-roll is **16:9 landscape**. Scale-and-pad into 9:16 leaves Sean as a
letterboxed strip about 30% of frame height, with 70% dead bars. That is not a
shippable talking-head ad, so I have **centre-cropped** instead:

| Output | Crop from 3840×2160 | Scaled to | Checked |
|---|---|---|---|
| 9:16 | `crop=1215:2160:1312:0` | 1080×1920 | ✅ frame pulled at t=12s — head fully in frame, good headroom, mic and hand visible, nothing clipped |
| 4:5 | `crop=1728:2160:1056:0` | 1080×1350 | ✅ same check — wider, more room either side, nothing clipped |

Sean sits dead-centre in the original framing, so a centre crop needs no
re-framing pass. Source resolution is ample (1215px → 1080px wide).
**Flagging it because the brief said scale+pad; say the word if you want the
padded version instead.**

### Trim and audio

- Source `0.00–2.85s` is the slate clap → trimmed off. Speech runs source
  `3.15 → 51.98`.
- Edit `t = source − 2.85`. Speech starts at **0.30**, ends at **49.13**.
- VO loudness-normalised to **−16 LUFS / −1.5 dBTP** (source was quiet: mean
  −37.4 dB). Full audio used, nothing cut.
- A-roll video is **muted**; VO rides a sibling `<audio>`. B-roll clips are
  silent by design.
- **Music bed placeholder**: `assets/music/music-bed.m4a`, wired at
  `data-volume="0.14"`. Silent until you drop a real track in at that path.

---

## 2 · Beat map (from silence analysis of the real audio, ±0.02s)

Every cut below lands on a measured pause in Sean's delivery, not a guess.

| Edit t | Source t | Line |
|---|---|---|
| 0.30 | 3.15 | "A record Black Friday can still be an unprofitable one." |
| 4.21 | 7.06 | "Your revenue goes up," |
| 5.85 | 8.70 | "but so do your discounts, your advertising costs higher than they are normally because it's so competitive." |
| 10.56 | 13.41 | "You've still got to pay fulfillment fees, and you're going to have more returns than you do in a normal month." |
| 15.37 | 18.22 | "And if you haven't worked out your contribution margin and break-even return on ad spend before Black Friday," |
| 21.75 | 24.60 | "you might end up selling more but making far less in terms of profit." |
| 26.45 | 29.30 | "I've put together a free workbook that helps you calculate the numbers first, including what each order actually contributes and the maximum discount your margin can support." |
| 36.88 | 39.73 | "Then it walks you through your offer, your inventory, your marketing, your follow-up plan via email." |
| 42.20 | 45.05 | "The best part is it is completely free." |
| **45.18** | **48.03** | **"The link is below…" → END CARD TRIGGER** |
| 49.13 | 51.98 | "…before it's too late." (speech ends) |
| 53.00 | — | composition ends |

**Total runtime: 53.00s.** End card holds 7.82s, of which 3.87s is silent.

---

## 3 · Structure — how Sean sits in it

Sean is the **bed**, and the edit cuts in and out of him. Three states:

| State | Navy cover | Footage | Used for |
|---|---|---|---|
| **Clean** | 0% | full, sharp | he is the shot |
| **Overlay** | 36% | −4.5% scale, 1.6px blur | graphics layer over his lower half, he stays present |
| **Hero** | 100% | −7% scale, 9px blur | full-frame graphic or B-roll, he is off screen |

Clean-Sean windows: 0.00–4.05 · 10.00–12.05 · 14.60–17.45 · 25.30–26.30 ·
36.18–36.74 · 41.44–42.76 (**11.8s**). Overlay windows add another **15.2s**
where he is on screen behind the graphics — **27s of the 45s before the end
card (≈60%)**.

### Subtitle safe band

The bottom of every frame is reserved and **no graphic ever enters it**:
**380px** in 9:16, **268px** in 4:5. The scrim's bottom stop darkens that band
to ~0.97 navy, so hand-added subtitles will sit on a clean, high-contrast
ground without any further treatment.

---

## 4 · Cut list

### ACT 1 — THE PROBLEM (0.00 → 25.44)

| # | In | Out | Dur | On screen |
|---|---|---|---|---|
| 01 | 0.00 | 4.21 | 4.21 | **Sean, clean.** Logo fades in at 0.20. At **2.30**, on the word, flame-ruled stamp `Unprofitable.` punches into the band, blur-scale entry. |
| 02 | 4.21 | 10.15 | 5.94 | **Sean as bed** (−4.5% scale, navy cover to 36%). Cost stack builds: **4.40** `Revenue ↑` blue-tint · **6.00** `Discounts ↑` flame · **7.50** `Ad costs ↑` flame · **8.40** cited chip `Meta CPM, Cyber Week — 2–3× baseline` with `Gupta Media 2025 · Trackbee 2026` under it. |
| 03 | 10.15 | 12.20 | 2.05 | **Sean, clean.** Panel whips up and out on the cut. |
| 04 | 12.20 | 14.73 | 2.53 | Panel returns, rows 2–3 carried over already in place. **12.35** `Fulfilment fees`. **13.50** `Returns ↑`. **14.10** closer: *All of it out of the same order.* |
| 05 | 14.73 | 17.60 | 2.87 | **Sean, clean.** |
| 06 | 17.60 | 19.55 | 1.95 | Two term cards over Sean. **17.75** `Contribution margin`. **18.60** `Breakeven ROAS` with the workbook's own formula `= 1 ÷ contribution margin %`. |
| 07 | 19.55 | 21.75 | 2.20 | **HERO — real product.** `dashboard.mp4`: the actual Profitability Dashboard sheet, cursor tracking live cells. Caption under it. |
| 08 | 21.75 | 25.44 | 3.69 | **HERO — the contrast.** `Selling more`, units count **1.00× → 1.81×** (22.05–23.10). `Making less` in flame, contribution counts **$59.71 → $33.00** (23.35–24.55). At **24.80** `Breakeven ROAS 1.92 → 2.61`. Footnote: *the workbook's worked example, at 25% off*. |

### ACT 2 — THE WORKBOOK (25.44 → 45.18)

| # | In | Out | Dur | On screen |
|---|---|---|---|---|
| 09 | 25.44 | 26.45 | 1.01 | **Sean, clean.** The 1.0s pause — the breathing beat before the turn. |
| 10 | 26.45 | 29.60 | 3.15 | **The workbook lands.** `cover.png` rises from depth onto the perspective grid with motion blur; glint sweep **27.60**; flame `FREE` chip pins to it **28.20**. |
| 11 | 29.60 | 32.40 | 2.80 | **Real product B-roll — `workbook.mp4`**: the actual PDF in a viewer, cover → Contents, 51 pages. Navy card, soft shadow, slow push. **30.90** stat row counts up: `8 PARTS · 32 WORKSHEETS · 19 FREE TOOLS`. |
| 12 | 32.40 | 36.29 | 3.89 | **HERO — the real worksheet.** `page8.png` slides in; the stack fills on the beat, one line every 0.40s from **32.60**: `$114.70` → `− 4%` → `− $34.00` → `− $4.50` → `− $8.60` → `− $3.30`, then **`= $59.71 · 52.1%`** lands lit in flame at **35.10**. **35.60** `Max discount it supports — 25%`. |
| 13 | 36.29 | 36.88 | 0.59 | **Sean, clean.** Pause beat. |
| 14 | 36.88 | 41.58 | 4.70 | **4-item checklist**, over Sean. Ticks draw on the words: **37.10** `Your offer` · **38.20** `Your inventory` · **39.30** `Your marketing` · **40.40** `Your email follow-up`. |
| 15 | 41.58 | 42.90 | 1.32 | **Sean, clean.** |
| 16 | 42.90 | 45.18 | 2.28 | **`Completely free.`** full-frame, type scales 0.80→1.00 out of blur. Cover returns small beneath it (callback). |

### ACT 3 — END CARD (45.18 → 53.00)

| # | In | Out | Dur | On screen |
|---|---|---|---|---|
| 17 | 45.18 | 53.00 | 7.82 | **END CARD**, triggered on "The link is below". EcomIQ white lockup · headline **"Get your free Black Friday workbook"** (Rethink Sans 800, −3.5% tracking, *free* in Hedvig Letters Serif italic, blue-tint) · cover thumb + `8 parts · 32 worksheets · 19 free tools · 2026 edition` · flame pill **"Sign up free"** popping in at **46.40** on `back.out(1.7)`, then a slow breathe. Audio ends 49.13; card holds silent to 53.00. |

---

## 5 · Every on-screen number, and where it comes from

Nothing here is invented. All of it is the workbook's own worked example or a
cited benchmark printed in the workbook.

| On screen | Source |
|---|---|
| `$114.70` | 2025 Shopify BFCM average order value (Shopify, Dec 2025) — workbook p8 |
| `− 4% · − $34.00 · − $4.50 · − $8.60 · − $3.30` | The workbook's worked example, p8 |
| `$59.71 · 52.1%` | Contribution per order in that example — p8 |
| `1.92` breakeven ROAS | `1 ÷ 52.1%` — p9 |
| `$33.00` · `2.61` · `1.81×` | Same order at 25% off — p10 |
| `25% off` | 2025 discount depth, apparel (Adobe Analytics, Dec 2025) — p10 |
| `Meta CPM 2–3× baseline` | Gupta Media 2025, Trackbee 2026 — p9 |
| `8 PARTS · 32 WORKSHEETS · 19 FREE TOOLS` | The workbook cover |

Each figure carries its source as a small caption, so nothing reads as an
EcomIQ performance claim.

---

## 6 · Look — all from `assets/`, nothing invented

- **Tokens:** `assets/brand-tokens.css` — `--brand-navy #06284C`, `--brand-blue-tint #9CD4FF`, `--brand-sky #DEEEFE`, `--brand-flame #FF4C32`, `--brand-white`, plus the semantic aliases and `--brand-gradient-1/2`.
- **Fonts:** local `.woff2` only — `assets/fonts/RethinkSans.woff2` (headlines/body, 800 at −2% tracking) and `assets/fonts/HedvigLettersSerif.woff2` (the italic emphasis word). No Google-Fonts `<link>` at render time.
- **Logo:** `assets/ecomiq-logo-white.svg`, top-left on **every** frame — 9.5% of frame width, 96px from top, soft drop-shadow, wrapped in a positioned non-`clip` div so the engine can't move it.
- **GSAP:** vendored `assets/vendor/gsap.min.js`. No CDN.
- **Colour discipline (5):** navy = ground · chrome white = brand voice · blue-tint = your revenue / what you get · **flame = what it costs you, and the CTA** · sky = dividers.
- **Texture:** perspective grid + crosshairs + vignette + grain on the graphic beats; vignette + grain only over clean Sean, so his footage still reads as footage.
- **Transitions:** no hard cuts. Velocity-matched vertical whip (exit rides up with blur, entry rises from below) at every seam.
- **No captions**, as briefed.

---

## 7 · 4:5 layout deltas

Same timings, frame for frame. Only geometry changes:

| Scene | 9:16 | 4:5 |
|---|---|---|
| — type scale | 1.0× | 0.86× throughout |
| — subtitle band | bottom 380px reserved | bottom 268px reserved |
| — overlay band | y 1020 → 1540 | y 700 → 1082 |
| 09 contrast | stacked over/under | side by side |
| 13 worksheet | page at 40% frame width | page at 30% frame width |
| 18 end card | left-aligned, cover beside the meta block | centred, cover above the meta block |

---

## 8 · Delivery

- `renders/ecomiq-bf-workbook-ad-9x16.mp4` — 1080×1920, 30fps
- `renders/ecomiq-bf-workbook-ad-4x5.mp4` — 1080×1350, 30fps
- Both H.264 High / yuv420p, AAC 192k 48kHz stereo, `+faststart`, `--quality standard`.

---

## 9 · Three things I need you to settle

1. **Second ratio** — settled: **4:5** (1080×1350), not 1:1.
2. **End-card wording** — settled: headline **"Get your free Black Friday
   workbook"**, pill **"Sign up free"**.
3. **Sean** — settled: **on screen, cutting in and out** of B-roll and motion
   graphics, with a reserved subtitle band at the bottom of every frame.
