# Edit Plan: "Three changes. Thirty minutes. Free." (Review Call)

EcomIQ Meta performance ad, 9:16, 1080x1920. Concept: **3-Point Store Review / Teardown.**

Creative line: *"Give us 30 minutes and we'll show you the three most important changes we'd make."*

All timings in this plan come from the supplied A-roll (`Ad - Three changes. Thirty minutes. Free. | Review call.mov`), transcribed with word-level timestamps and cross-checked against a silence map. Word timings are saved in `assets/aroll-transcript.json` (source seconds).

---

## 0. Read this first: decisions and flags

**Runtime:** 25.3s (23.5s of speech, tightened by 1.4s, plus CTA hold and a 1.0s end card).

**Things found in the source material that change the plan:**

| # | Issue | Impact | What this plan does |
|---|---|---|---|
| 1 | Sheet row **"Sweet Es team working"** links to a file named **"Sean on laptop - typing low angle.MP4"** (id `1zYln8...`). It is not Sweet E's footage. | Using it under the Sweet E's claim would break the social-proof rule. | Not used under the claim. Real Sweet E's files from the Sweet E's folders are used instead (section 5 lists them). |
| 2 | Sheet row **"Sean on Laptop"** links to **"Sweet E's Sean and Erica - intro.MP4"** (id `1OEhRQ9...`). The two links look swapped. | This may be the single best proof shot: our team with the Sweet E's owner. | Listed as the preferred alternate for the Sweet E's open, pending a visual check. |
| 3 | **Shoptalk 6:02-6:05**: the first ~1.5s is a Rebuy "RETENTION" slide. Sean is only on screen from ~6:03.5, standing in front of **Rebuy's stats** (59x ROI, 1.3B requests, 99.9% uptime). Source is 1920x1080, so a 9:16 crop is a ~1.8x upscale. | Rebuy's numbers could read as EcomIQ results. Soft image if held long. | Use 6:03.6-6:04.3 only, cropped tight on Sean so the stat figures fall outside the frame. Hold 0.65s max. |
| 4 | **Shoptalk 0:12-0:14**: 0:12 is the talk title card ("From Targets to Roadmap", Sean Clarke, PacificIQ). 0:13-0:14 is a wide of Sean walking the stage. | Usable, but he is small in frame. | Alternate stage shot only. |
| 5 | **Walking in Klaviyo Event space** is 7.9s long, so the logged 0:07-0:11 runs past the end. Sean is not visible. Same for **Walking around Klaviyo booths**. | Proves "we attended an event", nothing more. Fails the "what does this shot prove?" test. | Cut. |
| 6 | **"Sweet E's Cookie Scroll"** is a camera pan across packaged cookies on a rack, not a website scroll. | Still a strong product shot, just not a UI shot. | Used as product proof in the Sweet E's montage. |
| 7 | Brief lists White as `#000000`. That is black. The brand PDF has the same typo. | | White is `#FFFFFF` throughout. |
| 8 | Sean's actual delivery differs from the written script (see section 7). Notably: *"the team that **have helped brands like** Sweet E's lift **their** website conversion rate"* and *"**And on the call,** we'll tell you what we'd change **on your store**"*. | Captions must match the audio. "Brands like" helps compliance. | Captions follow the audio. Whisper hears "Sweetie's"; caption reads **Sweet E's**. |
| 9 | Previous EcomIQ 9:16 ads place captions at ~85% of frame height, inside the Reels bottom UI zone. | On Reels placements the caption sits under Meta's caption, CTA button and icons. | Same caption style, raised to ~61% height. See section 2.6. Your call if you want to stay pixel-identical to the previous ads. |
| 10 | Drive hit a public-download quota partway through B-roll review. | Some clips were verified by eye, some only by filename and by previous EcomIQ ads. | Every clip in section 5 is marked **Verified** or **Unverified**. Check the unverified ones before locking the cut. |

**A-roll specs:** ProRes 422, 3840x2160 landscape, 25fps, 28.36s, PCM 24-bit. Sean sits centre frame in a cream quilted jacket, saturated blue/violet wall with an LED strip, black mic in front of his chest. The first ~2.5s is pre-roll (his arm reaches toward the camera at 0-1.5s) and is trimmed.

---

## 1. Edit decision list (A-roll)

Every A-roll splice is placed on a natural pause and hidden by a crop change or a cut to B-roll/graphics. Nothing is cut mid-word.

| Seg | Source in | Source out | Out time | Hides the join | Speech |
|---|---|---|---|---|---|
| A1 | 2.55 | 10.45 | 0.00-7.90 | Head trim | "Shopify founders ... on a free 30-minute call." |
| A2 | 10.72 | 17.58 | 7.90-14.76 | Cut to B-roll | "You'll be on with specialists ... by over 500%." |
| A3 | 17.80 | 20.97 | 14.76-17.93 | Back from B-roll | "And on the call, we'll tell you what we'd change on your store," |
| A4 | 21.26 | 22.47 | 17.93-19.14 | Punch-in (1.0x to 1.15x) | "why each one matters," |
| A5 | 22.73 | 24.04 | 19.14-20.45 | Punch-out (1.15x to 1.0x) | "and which to do first." |
| A6 | 24.36 | 28.20 | 20.45-24.29 | Crop change + CTA build | "Tap Book Now and choose a time." + 2.2s of Sean holding |
| End | n/a | n/a | 24.29-25.30 | Cut to end card | (music tail only) |

Pauses removed: 0.43s after "call", 0.43s after "500%", 0.49s after "store", 0.46s after "matters", 0.52s after "first". Each one is trimmed to ~0.15-0.25s, which keeps Sean natural and removes about 1.4s of dead air.

**Lip sync:** confirm sync on A1 after prep. LESSONS.md notes some recordings need the video advanced ~0.16s.

---

## 2. Visual system (what makes this ad look different)

### 2.1 The idea in one line
The ad looks like **a live store review in progress**: clean white review cards, numbered 01/02/03, with tick marks, annotation boxes, a cursor and priority flags laid over a confident operator. The previous ad was a dark analytical dashboard. This one is a crisp audit document.

### 2.2 Recurring motifs (use all of them, nothing else)
| Motif | Look | Where it appears |
|---|---|---|
| **Numbered review card** | White `#FFFFFF` card, 24px radius, soft navy shadow (`0 12px 40px rgba(6,40,76,.35)`), 1px Sky border. Number "01" in Rethink Sans 800, Blue Tint `#9CD4FF` on navy chip. Label in Rethink Sans 700 caps, +6% tracking, Navy. | Sections 1, 2, 4, 8, 9, 10, 11 |
| **Tick mark** | Flame `#FF4C32` circle, white check, draws on (stroke-dashoffset) in 0.2s | 1, 8, 9, 10 |
| **Annotation box** | 3px Blue Tint stroke rounded rect that draws around a region, with a short leader line to a small caps tag | 3, 8 |
| **Highlighter underline** | Flame bar, 8px, wipes left to right under a word in 0.25s | 2, 4 |
| **Cursor** | Simple white arrow cursor, navy 2px outline, moves on `power2.inOut`, click = 70ms scale to 0.9 and back | 3, 8, 10, 11 |
| **Priority flag** | Flame tab with white caps: "PRIORITY #1" / "DO THIS FIRST" | 10 |
| **Uplift indicator** | Flame pill "↑ CONVERSION" | 3, 7 |
| **Registration marks** | Small "+" crop marks at card corners, Sky at 40% opacity. The workspace "unifying texture", restyled as audit crop marks. | Every card, full-screen graphic beats, end card |

### 2.3 Colour meaning (5 hues, each with one job)
| Colour | Hex | Job |
|---|---|---|
| Navy | `#06284C` | Canvas for full-screen graphic beats, text on cards, logo field |
| White | `#FFFFFF` | Review cards, captions |
| Sky Blue | `#DEEEFE` | Inactive cards, skeleton UI blocks in wireframes |
| Blue Tint | `#9CD4FF` | Numbers 01/02/03, annotation strokes, active-card outline |
| Flame Orange | `#FF4C32` | Action only: ticks, priority, uplift, FREE, BOOK NOW |

Flame never decorates. If something is orange, it is either done, important, or the action.

### 2.4 Type
- **Rethink Sans** for everything on screen. Big lock-ups 800 weight, 100% leading, -2% tracking. Numbers use tabular figures so the +500% count-up does not jitter.
- **Hedvig Letters Serif italic** once in the whole ad: the word *Free.* on the end card. Same signature move as the "*Guaranteed*" end cards in the previous ads.
- Fonts are local `.woff2` (already in `assets/fonts/`).

### 2.5 Motion vocabulary
**Use:** mask reveals (clip-path inset wipes), sequential card slide-ups (`expo.out`, 0.3s, 0.14s stagger), tick draw-ons, count-up, underline wipes, gentle cursor glides, priority flag snap (`back.out(1.4)`, 0.3s), slow push-ins on Sean (2-4% over a beat), hard picture cuts.

**Do not use:** whips, glitches, shaders, neon, chrome text, fake 3D, bouncing type, giant zooms, speed ramps, confetti, fake notifications.

Note: `MOTION_PHILOSOPHY.md` defaults (black canvas, chrome type, whip transitions) are overridden by this brand brief. The discipline still applies: one idea per beat, callbacks (the 01/02/03 cards), a unifying texture (crop marks), camera never fully still (slow push on every Sean beat), held outro.

### 2.6 Safe zones and layout grid (1080x1920)
- **Meta Reels safe area:** keep all text out of the top 270px (14%) and bottom 670px (35%), and 64px from each side. Safe text band is **y 270-1250**.
- **Captions:** same treatment as previous ads (Rethink Sans 500, 52px, white, sentence case, soft shadow `0 2px 12px rgba(0,0,0,.45)`, max 2 lines, max ~28 characters per line). Centred at **y ≈ 1180**.
- **Graphics band:** y 300-1100, beside or below Sean's face. Never over his eyes or mouth.
- **Logo:** white EcomIQ wordmark top-left, same size as previous ads, dropped to **y ≈ 290** so the Reels header does not cover it. Wrap it in a non-`clip` positioned div (LESSONS.md).
- **Navy gradient:** a soft navy fade from the bottom (as in the previous ads) sits under the caption on every A-roll and B-roll beat for legibility.

### 2.7 A-roll framing presets
The source is 3840x2160. A full-height 9:16 crop is a 1215x2160 window, so we can **slide the crop left or right** to put Sean off-centre without any upscaling. Punch-ins up to 1.15x stay at native resolution. Do not exceed 1.3x.

| Preset | Scale | Sean's face centre (x in output) | Free space for graphics |
|---|---|---|---|
| **WIDE-L** | 1.00x | ~34% from left | Right side, ~430px wide |
| **WIDE-R** | 1.00x | ~66% from left | Left side, ~430px wide |
| **MID-C** | 1.12x | Centre, frame shifted down so his face sits higher | Lower band y 820-1100 |
| **TIGHT-C** | 1.25x | Centre | Captions only |

Every Sean beat also gets a slow 2-3% push over its length so the frame never sits dead.

---

## 3. Beat-by-beat plan

Times are output seconds. "VO" is the actual audio. Graphic cues are pinned to the word they land on.

### Section 1: Audience qualifier (0.00-3.05)
**VO:** "Shopify founders doing $10,000 to $60,000 a month."
**Picture:** Sean, **WIDE-L**, slow push 1.00x to 1.03x. No B-roll, no Shopify logo.
**Graphic:** a single review card to the right of Sean's face (x 600-1016, y 430-900).

| Time | Cue word | Action |
|---|---|---|
| 0.00-0.25 | (first frame) | Card wipes in from its left edge (mask reveal). Must be on screen by frame 6 for the scroll-stop. |
| 0.10 | "Shopify" | Small caps eyebrow **SHOPIFY FOUNDERS** reveals, with a flame dash before it (previous-ads eyebrow style) |
| 1.09 | "$10,000" | **$10K** slides up, 140px, 800 weight |
| 1.58 | "$60,000" | **-$60K** slides up beside it. The range is the biggest thing in the frame. |
| 2.63 | "a month" | **/ MONTH** in 44px. A flame tick stamps beside the range at 2.75: the first review mark of the ad. |
| 3.00 | | Card mask-wipes out |

**Muted read:** "Shopify founders, $10K-$60K/month, ticked." The viewer knows it is for them.

### Section 2: Three changes, the hook (3.05-4.73)
**VO:** "We'll show you three changes"
**Picture:** Sean, **MID-C** (cut from WIDE-L on "We'll", a clean punch-in on the same take).
**Graphic:** three numbered cards in a row in the lower band (y 860-1080), each ~290px wide.

| Time | Cue | Action |
|---|---|---|
| 3.84 | "three" | Card **01** slides up |
| 3.98 | | Card **02** slides up |
| 4.12 | | Card **03** slides up |
| 4.25 | "changes" | Label **3 CHANGES** reveals above the cards, flame underline wipes under it |
| 4.50 | | Smaller **WE'D MAKE** appears beside it |

Cards are blank apart from their numbers. **Do not label the changes.** The promise is the review itself.

### Section 3: Make your store more money (4.73-6.24)
**VO:** "to make your store more money"
**Picture:** hard cut to a **full-screen store review graphic** on navy with faint crop-mark grid. Sean stays present in a **circular "on the call" bubble** (bottom-right of the safe band, ~240px, white ring), live A-roll. It is literally what the review call looks like: your store on screen, Sean talking you through it.
**Graphic:**

| Time | Cue | Action |
|---|---|---|
| 4.73 | "to make" | A phone-proportion product-page wireframe slides up (Sky skeleton blocks: image, title, price, Add to Cart button). Small tag above it: **YOUR STORE** |
| 4.95 | | Cursor glides in |
| 5.05 / 5.30 / 5.55 | "your store" | Three annotation boxes draw on in turn with small tags: **PRODUCT PAGE**, **CART**, **CHECKOUT** (cart and checkout as small stacked thumbnails beside the page) |
| 5.61 | "more money" | Flame **↑ CONVERSION** pill rises from the Add to Cart button and settles |

The tags are **not** numbered, so they do not read as "the three changes". This is conceptual. Uses conversion, never revenue charts.

### Section 4: Free 30-minute call (6.24-7.90)
**VO:** "on a free 30-minute call."
**Picture:** back to Sean, **WIDE-R** (face right, flipped from section 1 for variety).
**Graphic:** the core lock-up card on the left (x 64-500, y 420-1000). It builds in speech order and reads top to bottom as the final lock-up.

| Time | Cue | Action |
|---|---|---|
| 6.24 | (cut) | Card is already present with the middle line **3 CHANGES.** (callback to section 2) |
| 6.45 | "free" | **FREE.** stamps in flame on the bottom line |
| 6.74 | "30-minute" | Top line **30 MINUTES.** reveals, with a small **30:00** session chip and a thin progress ring that draws once around it. It is a duration badge, **not** a countdown. Nothing ticks down. |
| 7.56 | "call" | Lock-up holds: **30 MINUTES. / 3 CHANGES. / FREE.** |

This lock-up is the ad's signature frame. It comes back in the CTA.

### Section 5: Specialists from the team (7.90-10.45)
**VO:** "You'll be on with specialists from the team that have helped"
**Picture:** authority montage, 4 shots, ~0.64s each, hard cuts. Footage does the work.
**Overlay:** eyebrow only, **ECOMMERCE SPECIALISTS**, lower band, flame dash, held across all four shots.

| Out time | Clip | Source in-out | What it proves | Status |
|---|---|---|---|---|
| 7.90-8.55 | Sean talking on stage at Shoptalk - rebuy | 6:03.6-6:04.25 | Industry speaker, peers listen to him | **Verified**. Crop tight on Sean, keep Rebuy stat figures out of frame. 1080p source, upscaled. |
| 8.55-9.20 | Sean holding laptop talking to man | 0:03.5-0:04.15 | Hands-on with founders, laptop in hand | Seen in the previous Audit ad. Re-check exact in-point. |
| 9.20-9.85 | Sean and Mason standing talking to 2 women | 0:05.0-0:05.65 | A **team** (Mason), not one guy selling advice | Seen in the previous Audit ad. Re-check. |
| 9.85-10.45 | Angle over laptop - Sean thinking | 0:04.5-0:05.1 | The work itself: analysing, reviewing | Unverified. Fallback: Hotel Room Sean on Couch typing on Laptop 0:00-0:02 (**Verified**, 1080p, vertical after rotation) |

Alternate opener: Shoptalk 0:13.0-0:13.65 (wide, his name on the screen behind him), if you prefer naming over closeness.

### Section 6: Sweet E's social proof (10.45-12.51)
**VO:** "brands like Sweet E's lift their website"
**Picture:** cut to **Sweet E's footage only** on "brands". The first shot names the brand visually as Sean says it.
**Overlay:** a small white review tag top-left of the safe band: **CLIENT · SWEET E'S BAKE SHOP**, held through section 7. This ties every frame of the proof to the named brand.

| Out time | Clip | Source | What it proves | Status |
|---|---|---|---|---|
| 10.45-11.05 | Sweet E's underneath sign.MP4 (Drive ids `1TIjxtO9...` / `1pc-Hjyb...`) | Sign in frame, ~0.6s | A real, named business. The viewer reads "Sweet E's" on the building. | Seen in the previous AOV ad. Re-check in-point. |
| 11.05-11.60 | Sweet E's Cookie Scroll | 0:01.0-0:01.55 | Real product, made at volume | **Verified** (4K, packaged cookies on rack) |
| 11.60-12.51 | Sweet Es Sprinkle on cupcakes | 0:01.0-0:01.9 | Craft product people buy online | Seen in the previous Audit ad. Re-check. |

Preferred alternate for 10.45-11.05: **Sweet E's Sean and Erica - intro.MP4** (the file the sheet calls "Sean on Laptop") at 0:09-0:12. If it shows Sean with Erica, it is the strongest possible proof shot: our team with the client. Unverified.

**Never** use Dryft, generic stores, or the mislinked "Sweet Es team working" file here.

### Section 7: +500% website conversion rate, the hero result (12.51-14.76)
**VO:** "conversion rate by over 500%."
**Picture:** one held Sweet E's shot: **Sweet Es Erica Packing Cake**, source 0:30.0-0:32.25 (from the logged 0:29-0:45 range). Dimmed ~35% with navy gradient so the number reads. One shot, no cuts, so the claim lands.
**Graphic:** centred in the safe band.

| Time | Cue | Action |
|---|---|---|
| 12.55 | "conversion" | A row of 10 small outline dots appears, label **100 VISITORS** (small). One dot is filled flame: the "before" purchase rate. |
| 13.39 | "by over" | **+0%** starts counting, 200px, 800 weight, white |
| 13.74-14.20 | "500%" | Count lands on **+500%** exactly with the word. In sync, five more dots fill flame (1 to 6 purchases = +500%). |
| 14.20 | | **WEBSITE CONVERSION RATE** reveals under the number, 48px, caps |
| 14.20-14.76 | | Hold. The CLIENT · SWEET E'S tag stays on screen the whole time. |

No chart, no confetti, no notifications. The dots are honest arithmetic: 6x is +500%.

**Compliance:** keep the substantiation for the Sweet E's figure (date range, before/after CVR) on file. Meta can request it. Sean says "over 500%", so "+500%" on screen is conservative.

### Section 8: What we'd change (14.76-17.93)
**VO:** "And on the call, we'll tell you what we'd change on your store,"
**Picture:** back to Sean, **WIDE-L**.
**Graphic:** the **card stack** returns on the right (x 600-1016): three slim cards stacked vertically, 01 / 02 / 03, in Sky (inactive). This stack stays in the same place through sections 8, 9 and 10 so it reads as one object evolving.

| Time | Cue | Action |
|---|---|---|
| 14.76 | (cut) | Stack wipes in, all three inactive |
| 15.40 | "we'll tell you" | **01** turns white with Blue Tint outline and expands: label **WHAT TO CHANGE**, plus a mini product-page wireframe inside the card |
| 16.24 | "what we'd change" | Cursor moves onto the wireframe; an annotation box draws around one region (unlabelled; we do not invent a recommendation) |
| 17.34 | "on your store" | Flame tick on **01**. Card 01 collapses back to its slim size, ticked. |

### Section 9: Why each one matters (17.93-19.14)
**VO:** "why each one matters,"
**Picture:** Sean, **WIDE-L at 1.15x** (the punch-in hides the A3/A4 join).
**Graphic:** same stack. **02** expands: label **WHY IT MATTERS**, with a single row inside: **CHANGE → IMPACT** (the arrow draws left to right on "matters", 18.64).
At 19.04: flame tick on 02, collapses.

### Section 10: Which to do first, the payoff (19.14-20.45)
**VO:** "and which to do first."
**Picture:** Sean, **WIDE-L back to 1.00x** (hides the A4/A5 join).
**Graphic:** same stack, now all three readable with labels:
```
01  WHAT TO CHANGE   ✓
02  WHY IT MATTERS   ✓
03  WHAT TO DO FIRST
```
| Time | Cue | Action |
|---|---|---|
| 19.24 | "and which" | **03** goes active (Blue Tint outline) |
| 19.71 | "to do" | Cursor slides to card 03 and clicks |
| 20.07 | "first" | A flame **PRIORITY #1** flag snaps onto the top edge of card 03, and the other two cards dim slightly. Flag text could also be **DO THIS FIRST**; pick one and keep it. |

This is the clearest visual difference from the 90-Day ad: a review that ends in a ranked decision, not a chart.

### Section 11: CTA (20.45-24.29)
**VO:** "Tap Book Now and choose a time."
**Picture:** Sean stays on screen, **MID-C**, slow push 1.12x to 1.16x across the whole beat. No B-roll.
**Graphic:** clean direct-response stack in the lower band, centred.

| Time | Cue | Action |
|---|---|---|
| 20.45 | (cut) | Lock-up callback from section 4, smaller, as one line of three chips: **30 MINUTES · 3 CHANGES · FREE** (FREE in flame) |
| 20.74 | "Book Now" | **BOOK NOW ↓** flame pill (same pill style as previous ads' "Link Below") scales in, then the cursor taps it (70ms compress, release). It is the largest element on screen. The ↓ points to Meta's own CTA button. |
| 21.32 | "choose a time" | Under the pill: **CHOOSE A TIME** small caps, with three tiny time-slot chips; one becomes selected (flame outline). |
| 22.13-24.29 | (Sean holds) | Everything holds. Caption clears at 22.6 so the CTA frame is clean. |

### End card (24.29-25.30)
Navy radial field with crop-mark texture (same as previous end cards). Centred: EcomIQ white logo, headline **Three changes. Thirty minutes.** with ***Free.*** in Hedvig italic on its own line, flame **BOOK NOW** pill. Total CTA visibility: ~4.8s.

---

## 4. The 01 / 02 / 03 system across the ad

| Moment | Time | State of the cards |
|---|---|---|
| "three changes" | 3.84 | 01, 02, 03 appear, unlabelled. **3 CHANGES** |
| "free 30-minute call" | 6.24 | Collapsed into the **3 CHANGES** line of the lock-up |
| "what we'd change" | 15.40 | Stack returns. **01 WHAT TO CHANGE** active, then ticked |
| "why each one matters" | 17.93 | **02 WHY IT MATTERS** active, then ticked |
| "which to do first" | 19.24 | **03 WHAT TO DO FIRST** active, **PRIORITY #1** flag |
| "Tap Book Now" | 20.45 | Summarised in the **30 MINUTES · 3 CHANGES · FREE** chip line |

Fragments early, full resolution at the end.

---

## 5. B-roll pull list

### Selected
| Use | Clip (sheet name) | Drive file id | Source in-out | Format | Proves | Status |
|---|---|---|---|---|---|---|
| S5-1 | Sean talking on stage at Shoptalk - rebuy | `1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z` | 6:03.6-6:04.25 | 1920x1080, upscale | Industry authority | Verified |
| S5-2 | Sean holding laptop talking to man | `1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu` | 0:03.5-0:04.15 | 3840x2160 | Works with founders | Seen in prior ad |
| S5-3 | Sean and Mason standing talking to 2 women | `1GycuM9sO1RClaXwnU7sdYi6HOqr6p15I` | 0:05.0-0:05.65 | 3840x2160 | A real team | Seen in prior ad |
| S5-4 | Angle over laptop - Sean thinking | `1x1uT_kVmPod-vpPn5SVIGY4kUZmfCwBo` | 0:04.5-0:05.1 | ? | Does the analysis | Unverified |
| S5-4 alt | Hotel Room Sean on Couch typing on Laptop | `1JNuCmTeW9-UxRyaW5SyWiffEqDqlM636` | 0:00-0:02 | 1080x1920 after rotate | Does the analysis | Verified |
| S6-1 | Sweet E's underneath sign | `1TIjxtO9kg_JXo48WW9bVog0DIDKakFis` | find sign frame | ? | Named real business | Seen in prior ad |
| S6-1 alt | (sheet: "Sean on Laptop") Sweet E's Sean and Erica - intro | `1OEhRQ9CeyZxdI_21Eqm9x-SqGXKuoCL2` | 0:09-0:12 | 3840x2160 | Our team with the client | Unverified |
| S6-2 | Sweet E's Cookie Scroll | `1Cy939sI_20AioB9loydrqhbavZ-m_xcS` | 0:01.0-0:01.55 | 3840x2160 | Real product | Verified |
| S6-3 | Sweet Es Sprinkle on cupcakes | `13dyHmvfYPQCPA84j_Kz8HsH9sf_hAUTy` | 0:01.0-0:01.9 | 3840x2160 | Craft product | Seen in prior ad |
| S7 | Sweet Es Erica Packing Cake | `1cF3UR7rqtK27rx9HUh5H7Wt_yipf8fhp` | 0:30.0-0:32.25 | 3840x2160 | Real orders fulfilled by the owner | Seen in prior ad (heart cake) |

All 4K landscape clips get a 9:16 crop window (1215x2160), positioned on the action. Re-encode with `npm run prep -- <clip> --project review-call-ad --mute`.

### Considered and rejected
| Clip | Why not |
|---|---|
| Sweet Es team working (as linked) | The link is "Sean on laptop - typing low angle". Not Sweet E's. |
| Walking in Klaviyo Event space, Walking around Klaviyo booths | No Sean, no team. Proves attendance only. |
| Limitless growth rebuy sign | Rebuy's branding, not ours. |
| Shopify intro | Brief: no Shopify logos or intro clip. |
| Dryft (all) | Unrelated to the Sweet E's claim; brief bans it here. |
| Driving, car, street, coffee, hugging clips | Lifestyle. They "look nice" but prove nothing in this script. |
| Bess and Sean - Old Podcast | Off-message for a review-call offer. |
| Erica walking toward camera with cake box (1:00-1:03) | Good, but no slot left. First swap if any Sweet E's shot fails review. |

---

## 6. Caption sheet (matches the audio)

| # | Out in | Out out | Caption |
|---|---|---|---|
| 1 | 0.10 | 1.09 | Shopify founders doing |
| 2 | 1.09 | 3.05 | $10,000 to $60,000 a month |
| 3 | 3.05 | 4.73 | we'll show you three changes |
| 4 | 4.73 | 6.24 | to make your store more money |
| 5 | 6.24 | 7.90 | on a free 30-minute call |
| 6 | 7.98 | 9.03 | you'll be on with specialists |
| 7 | 9.03 | 10.45 | from the team that have helped |
| 8 | 10.45 | 11.57 | brands like Sweet E's |
| 9 | 11.57 | 13.39 | lift their website conversion rate |
| 10 | 13.39 | 14.76 | by over 500% |
| 11 | 14.89 | 16.24 | and on the call, we'll tell you |
| 12 | 16.24 | 17.93 | what we'd change on your store |
| 13 | 18.03 | 19.14 | why each one matters |
| 14 | 19.24 | 20.45 | and which to do first |
| 15 | 20.55 | 21.32 | Tap Book Now |
| 16 | 21.32 | 22.60 | and choose a time |

Lowercase to match the previous ads, with proper nouns capitalised (Shopify, Sweet E's, Book Now). Word timings are ±0.1s; snap each to the waveform during the build.

---

## 7. Script vs audio

| Written | Spoken |
|---|---|
| ...from the team that helped Sweet E's lift website conversion rate by over 500%. | ...from the team that **have helped brands like** Sweet E's lift **their** website conversion rate by over 500%. |
| We tell you what we'd change, | **And on the call, we'll** tell you what we'd change **on your store,** |

Everything else matches.

---

## 8. Audio
- VO is the A-roll mic. Normalise to -14 LUFS integrated, -1 dBTP.
- Music: a light, modern bed (clean plucks or soft house), ducked to about -24 LUFS under VO, rising slightly into the end card.
- SFX (subtle, -28 LUFS): soft click on cursor taps, a light tick on each check mark, nothing on the count-up. Most viewers start muted, so the picture carries everything without these.

---

## 9. Versus the 90-Day Profit Plan ad

| Keep (brand) | Change (this ad) |
|---|---|
| Navy/flame palette, Rethink Sans, Hedvig italic accent | Dashboards and charts become **white review cards** |
| White wordmark top-left | Profit/margin diagnostics become **conversion annotations on a store wireframe** |
| Caption style | 90-day timeline becomes **01 / 02 / 03 and PRIORITY #1** |
| Flame pill CTA, navy end card | Data viz becomes **cursor, ticks, crop marks, one honest dot row** |
| Real team and client footage | Sean in a **"review call" bubble** over the store |

---

## 10. Build notes (Hyperframes)
1. Project is scaffolded at `video-projects/review-call-ad/` (1080x1920, EcomIQ kit, local GSAP and fonts).
2. Prep the A-roll: `npm run prep -- "<aroll.mov>" --project review-call-ad` (keep 3840x2160 so crops and punch-ins stay native; H.264 CRF 18).
3. **Frame rate:** the A-roll is 25fps. The CLI documents 24/30/60. Test `--fps 25` first; if it is rejected, render at 30 and check the talking head for cadence judder.
4. Suggested composition split: `aroll` (one video, crop presets animated on a wrapper div, never on the `<video>`), `cards` (one persistent card system so 01/02/03 can evolve across sections), `store-review` (section 3), `proof-500` (section 7), `cta`, `end-card`, `captions`.
5. Every sub-composition timeline ends with the duration anchor (`tl.to({}, {duration: SLOT}, 0)`). Use `gsap.fromTo` for anything that starts hidden.
6. Visual verification frames to pull: 0.3, 1.7, 2.9, 4.4, 5.9, 7.6, 8.2, 9.5, 10.7, 12.0, 14.3, 16.8, 18.8, 20.2, 21.8, 24.0, 25.0.

---

## 11. Open questions for sign-off
1. Caption height: lift to ~61% for Reels safety (recommended), or keep identical to the previous ads at ~85%?
2. Section 6 opener: storefront sign (safe) or Sean and Erica (stronger, needs a look)?
3. Priority flag wording: **PRIORITY #1** or **DO THIS FIRST**?
4. Confirm the Sweet E's +500% substantiation is on file for Meta review.
5. Fix the two swapped links in the "B-Roll Short Cut" sheet ("Sweet Es team working" and "Sean on Laptop").
