# EcomIQ — Black Friday Profit Plan · Edit Plan

Approved edit plan for the Black Friday workbook ad. Sean's A-roll is the spine;
motion graphics and product stills cut in on the spoken beats; a workbook CTA
end card closes it.

**Deliverables:** 9:16 (1080×1920) and 4:5 (1080×1350), H.264/AAC, faststart, 30 fps, **39.0s**.

> Two later revisions are folded in below: **dead air removed** from between the
> phrases, and a **reserved subtitle band** at the bottom of every frame.

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
  was not reachable.
* **Scale+pad does not work.** A 16:9 talking head padded into 9:16 is a thin
  letterbox strip. Both ratios use a **centre crop**, which is resolution-safe
  from 4K (9:16 crops 1215×2160; 4:5 crops 1728×2160 — neither upscales). Sean
  is centred in frame, so the crop needs no pan.

Trim, crop and the dead-air splice all live in `scripts/prep-media.sh`.

### Dead air removed

The raw take carried ~3.8s of silence between phrases. Those gaps are spliced out
by the same `select`/`aselect` expression on video and audio, so they cannot
drift, keeping a short breath in each:

| source gap | kept | between |
| --- | --- | --- |
| 8.89–9.29 | 0.16s | Q1 \| Q2 |
| 11.65–12.29 | 0.16s | Q2 \| Q3 |
| 16.54–17.20 | 0.16s | Q3 \| "Once you know these numbers" |
| 20.89–22.27 | 0.35s | the rhetorical beat before the list — kept longer on purpose |
| 29.57–30.35 | 0.18s | "not guessing" \| "that's where I'd start" |
| 34.50–35.31 | 0.18s | "ad account" \| "We've put the full process" |
| 39.01–39.51 | 0.16s | "workbook" \| "Link is below" |

A-roll runs **35.52s** tightened, from 39.40s uncut. Verified in the render: the
only silence over 0.4s in the finished 39.0s ad is the end-card hold from 35.40s.
Each splice is a jump cut on Sean; the composition covers or accepts each one.

### Reserved subtitle band

`--safe-bottom` reserves the bottom of the frame for subtitles to be added
later — **230px in 9:16** (12% of height), **150px in 4:5** (11%). Nothing is
drawn inside it in any scene: bottom-anchored elements sit above it, centred
cards carry it as `padding-bottom`, and the data panels were compacted so they
still clear Sean's face with the band in place. Change the one token to resize.

---

## Beat map

Times are the finished timeline. Every cut sits on a silence-detected phrase
gap, so no cut lands mid-word.

| # | In–Out | On screen | Content |
| --- | --- | --- | --- |
| S1 | 0.00–5.12 | Sean, full frame | Hook. Eyebrow "ASK THESE 3 QUESTIONS" in at 2.90 |
| S2 | 5.12–7.85 | Lower panel over Sean | **Cost stack** on Q1 — $114.70 down to $59.71 / 52.1% |
| S3 | 7.85–10.40 | Lower panel over Sean | **Count-ups** on Q2 — $59.71 max per order · 1.92× breakeven ROAS |
| S4 | 10.43–14.78 | Full card | **Contrast** on Q3 — full price vs 25% off, closing on "1.81× the units" |
| S5 | 14.84–18.92 | Product suite still | Slow push; carries the 0.33s held beat before the list |
| S6 | 18.88–26.28 | Full card | **4-item checklist**, one tick per spoken line |
| S7 | 26.36–30.42 | Sean, full frame | Direct address — "that's where I'd start right now" |
| S8 | 30.42–31.05 | Whip insert | 0.63s motion-blurred cut into the workbook beat |
| S9 | 30.98–34.50 | Workbook cover | Cover rises; tag "8 PARTS · 32 WORKSHEETS · 19 FREE TOOLS" |
| S10 | 34.40–39.00 | End card | Lands on "Link is below" (34.55); voice ends 35.40, holds 3.6s after |

Checklist ticks fire at 19.60 / 21.31 / 23.91 / 25.55, each on its own spoken line.

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
* **Dead air spliced out** and a **subtitle band reserved** at the bottom.

## Known limitations

* **No video B-roll exists.** The Drive "B-roll" folder holds four AI-generated
  product stills plus the workbook's companion PDFs and spreadsheets. The stills
  carry the product beats with motion instead of footage.
* **`product-suite-wide.png` has garbled micro-text** ("Pash Cycle Calculator",
  "Delivery Coe Coot Sheet"), an artefact of the image generator. It is used
  only as a 0.63s motion-blurred whip insert where the text cannot be read.
  `product-suite-alt.png` is held in reserve — it is near-identical to
  `product-suite.png`.
* **Music is a silent placeholder.** No licensed bed ships with the kit. Drop a
  track in at `assets/music-bed-placeholder.m4a` and the duck automation is
  already wired: bed at 0.16 under the voice, lifting to 0.42 at 35.20 once Sean
  finishes, so the end card is not silent. Until a track is added, the last 3.6s
  is silent.
* The **logo icon reads as a white block at small sizes**. That is the shipped
  brand asset — a navy monstera mark knocked out of a white square — not a
  render artefact.
* The persistent mark is **~18.5% of frame width**, not the 8–10% the brief
  suggested. At 10% the wordmark in this 5.9:1 lockup is about 18px tall and
  stops reading. Change `--logo-w` in `index.html` to adjust.
