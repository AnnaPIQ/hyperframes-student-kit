# EcomIQ — Black Friday Profit Plan · Edit Plan

Approved edit plan for the Black Friday workbook ad. Sean's A-roll is the spine;
motion graphics and product stills cut in on the spoken beats; a workbook CTA
end card closes it.

**Deliverables:** 9:16 (1080×1920) and 4:5 (1080×1350), H.264/AAC, faststart, 30 fps, **39.0s**.

> Later revisions folded in below: **dead air removed** from between the phrases,
> a **reserved subtitle band** at the bottom of every frame, the product stills
> **replaced with the EcomIQ workbook b-roll**, and then a **strip-back** that cut
> every data graphic in favour of the three questions as plain copy.

---

## Source material

| Source | Detail |
| --- | --- |
| A-roll | `2c: Social Black Friday - start now V2.mov` — 3840×2160 ProRes, 25 fps, PCM s24be, **43.08s** |
| B-roll | `broll-workbook-{916,45}.mp4` — the 21.4s EcomIQ workbook film from branch `claude/wonderful-curie-brnfzl`, supplied at both ratios |
| ~~B-roll (superseded)~~ | 4 AI product stills from Drive — no longer used in the ad |
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

### Workbook b-roll

The three AI product stills are replaced by the EcomIQ workbook film, cut into
two slots by `scripts/prep-broll.sh`. Source beat map:

| beat | in–out | used |
| --- | --- | --- |
| cover | 0.0–2.8 | slot B |
| worksheets deck | 2.4–5.1 | **cut** — near-static, read as ~2s of dead screen at 15–17s |
| stats 8/32/19 | 4.7–7.5 | slot A |
| margin page | 7.1–10.4 | **skipped** — the cost-stack panel already counts to $59.71 at 5s |
| calendar | 10.0–12.9 | slot A |
| spreadsheets | 12.5–15.3 | slot A |
| tools | 14.9–17.6 | unused |
| outro lockup | 17.2–21.4 | **skipped** — the real end card does this at 34.4s |

* **Slot A** (7.48s) is natural speed with one hard cut where the margin page is
  skipped. It runs under the checklist only — the worksheets-deck beat was cut
  because it is almost a held frame, so Sean holds camera through "…is much
  easier" instead.
* **Slot B** (3.98s) is the cover. Only 2.55s of clean cover exists before it
  crossfades to the deck, so it is stretched 0.64× — imperceptible on an
  already-slow push.
* The **checklist sits on its own panel** over the b-roll, the same treatment the
  cost stack uses over Sean. A flat scrim was tried first and failed: the
  spreadsheet and calendar text read straight through the copy.
* Sean returns on camera for "that's where I'd start right now" — the b-roll is a
  bed for the surrounding lines, not the whole back half.

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
| S1 | 0.00–5.12 | Sean, full frame | Hook — "ask yourself these three questions" |
| S2 | 5.12–14.90 | Question panel over Sean | The **three questions**, one landing as he asks it. The panel is bottom-anchored so each grows it upward |
| S3 | 14.90–30.42 | Sean, full frame | The plan, "not guessing", "that's where I'd start right now" |
| S4 | 30.42–34.40 | **Workbook b-roll** | The cover, under "a free Black Friday workbook" |
| S5 | 34.40–39.00 | End card | Lands on "Link is below" (34.55); voice ends 35.40, holds 3.6s after |

Questions land at 5.12 / 7.85 / 10.43, each as Sean asks it. Copy, shortened on
review so each fits one line:

1. How much do you want to make?
2. How much can you spend to get the order?
3. How far can you afford to discount?

**Persistent:** EcomIQ logo top-left on every frame, stepping back to 30% opacity
on the end card so the hero lockup leads.

### Stripped back on review

The build originally carried four data graphics and a second b-roll slot. All
were cut on review, in this order: the hook eyebrow, the static worksheets-deck
b-roll beat, the 4-item checklist and the b-roll under it, then the cost stack,
count-up tiles and discount contrast — replaced by the three questions as plain
copy.

**No workbook figures appear on screen any more.** $114.70, $59.71, 52.1%,
1.92×, $33.00, 2.61× and 1.81× are all gone with the graphics that carried them.
The numbers and their provenance are kept below in case they are wanted back.

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
  button "Sign up free". "free" is white and upright, not the italic-serif
  emphasis used elsewhere.
* **Crop over pad**, per the framing test above.
* **Dead air spliced out** and a **subtitle band reserved** at the bottom.
* **Workbook b-roll** replaces the product stills across the back half, with the
  duplicated margin-page and outro beats skipped, and Sean returning on camera.

## Known limitations

* **The four AI product stills are no longer used.** The supplied workbook b-roll
  replaced them, which also retires `product-suite-wide.png` and its garbled
  micro-text ("Pash Cycle Calculator", "Delivery Coe Coot Sheet"). The stills stay
  in `assets/` in case they are wanted again.
* **Only the cover beat of the supplied b-roll is used.** Slot A was cut with the
  checklist, so the deck, 8/32/19, margin page, calendar, spreadsheets, tools and
  outro beats are all unused — about 19s of the 21.4s film.
* **Sean is on camera unbroken from 14.90 to 30.42** — 15.5s with no graphic or
  cutaway. That is the longest uninterrupted stretch in the ad by some way.
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
