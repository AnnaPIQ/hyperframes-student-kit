# EcomIQ — Black Friday Profit Plan · Edit Plan

Approved edit plan for the Black Friday workbook ad. Sean's A-roll is the spine;
motion graphics and product stills cut in on the spoken beats; a workbook CTA
end card closes it.

**Deliverables:** 9:16 (1080×1920) and 4:5 (1080×1350), H.264/AAC, faststart, 30 fps, **44.0s**.

---

## Source material

| Source | Detail |
| --- | --- |
| A-roll | `2c: Social Black Friday - start now V2.mov` — 3840×2160 ProRes, 25 fps, PCM s24be, **43.08s** |
| B-roll | 4 product stills (no video B-roll existed in the Drive folder) |
| Workbook | `The Black Friday Profit Plan.pdf` — every on-screen figure comes from its Part 01 worked example |

### What the A-roll probe changed

* Speech runs **1.34s → 40.32s**. There is a 1.4s silent lead-in, and Sean looks
  off-take from roughly 41s, so the tail is unusable.
* The A-roll is 43.08s, not the ~50s the brief assumed, so an end card at 00:46
  was not reachable. Agreed landing: **44.0s total**, card in at 38.20s, audio
  finishing over it at 39.18s, then a 4.8s hold.
* **Scale+pad does not work.** A 16:9 talking head padded into 9:16 is a thin
  letterbox strip. Both ratios use a **centre crop**, which is resolution-safe
  from 4K (9:16 crops 1215×2160; 4:5 crops 1728×2160 — neither upscales). Sean
  is centred in frame, so the crop needs no pan.

Trim and crop live in `scripts/prep-media.sh`: `TRIM_START=1.14`, `DURATION=39.40`.

---

## Beat map

Times are the finished timeline. Every cut sits on a silence-detected phrase
gap, so no cut lands mid-word.

| # | In–Out | On screen | Content |
| --- | --- | --- | --- |
| S1 | 0.00–5.12 | Sean, full frame | Hook. Eyebrow "ASK THESE 3 QUESTIONS" in at 2.90 |
| S2 | 5.12–8.15 | Lower panel over Sean | **Cost stack** on Q1 — $114.70 down to $59.71 / 52.1% |
| S3 | 8.15–10.55 | Lower panel over Sean | **Count-ups** on Q2 — $59.71 max per order · 1.92× breakeven ROAS |
| — | 10.55–11.15 | Sean, full frame | Breath |
| S4 | 11.15–15.45 | Full card | **Contrast** on Q3 — full price vs 25% off, closing on "1.81× the units" |
| S5 | 16.06–21.20 | Product suite still | Slow push; carries the 1.4s pause at 19.75 |
| S6 | 21.13–29.05 | Full card | **4-item checklist**, one tick per spoken line |
| S7 | 29.21–33.40 | Sean, full frame | Direct address — "that's where I'd start right now" |
| S8 | 33.40–34.20 | Whip insert | 0.8s motion-blurred cut into the workbook beat |
| S9 | 34.17–37.95 | Workbook cover | Cover rises; tag "8 PARTS · 32 WORKSHEETS · 19 FREE TOOLS" |
| S10 | 38.20–44.00 | End card | Lands on "Link is below" (38.37); holds 4.8s |

Checklist ticks fire at 22.30 / 24.70 / 27.30 / 28.20, each on its own spoken line.

**Persistent:** EcomIQ logo top-left on every frame, stepping back to 30% opacity
on the end card so the hero lockup leads.

---

## On-screen numbers — provenance

Every figure is the workbook's own Part 01 worked example. Nothing is invented,
and no performance claim is made about any real store.

| Figure | Value | Source |
| --- | --- | --- |
| Order value | $114.70 | 2025 Shopify BFCM average order value, cited in the workbook |
| Discounts & refunds | −$4.59 | 4% of revenue |
| Landed product / fulfilment / delivery / charges | $34.00 / $4.50 / $8.60 / $3.30 | Workbook p8 |
| **Contribution** | **$59.71 — 52.1%** | Workbook p8 |
| **Breakeven ROAS** | **1.92×** | 1 ÷ 0.521, workbook p9 |
| At 25% off | $86.03 in → $33.00 kept → 2.61× → 1.81× units | Workbook p10 |

The cost stack reconciles exactly: 114.70 − 4.59 − 34.00 − 4.50 − 8.60 − 3.30 = **59.71**.

---

## Decisions taken

* **Ratios:** 9:16 and 4:5. (The brief named 1:1 in one place and 4:5 in
  another; 4:5 was confirmed.)
* **End card wording:** headline "Get your free Black Friday workbook",
  button "Sign up free".
* **Crop over pad**, per the framing test above.

## Known limitations

* **No video B-roll exists.** The Drive "B-roll" folder holds four AI-generated
  product stills plus the workbook's companion PDFs and spreadsheets. The stills
  carry the product beats with motion instead of footage.
* **`product-suite-wide.png` has garbled micro-text** ("Pash Cycle Calculator",
  "Delivery Coe Coot Sheet"), an artefact of the image generator. It is used
  only as a 0.8s motion-blurred whip insert where the text cannot be read.
  `product-suite-alt.png` is held in reserve — it is near-identical to
  `product-suite.png`.
* **Music is a silent placeholder.** No licensed bed ships with the kit. Drop a
  track in at `assets/music-bed-placeholder.m4a` and the duck automation is
  already wired: bed at 0.16, lifting to 0.40 in the 19.75s pause and 0.42 once
  the voice ends over the end card.
* The **logo icon reads as a white block at small sizes**. That is the shipped
  brand asset — a navy monstera mark knocked out of a white square — not a
  render artefact.
* The persistent mark is **~18.5% of frame width**, not the 8–10% the brief
  suggested. At 10% the wordmark in this 5.9:1 lockup is about 18px tall and
  stops reading. Change `--logo-w` in `index.html` to adjust.
