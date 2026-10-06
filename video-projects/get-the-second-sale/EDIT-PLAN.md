# Get the Second Sale · 9:16 Meta Ad · Complete Editing Plan

Retention / second-sale creative. Sean A-roll + real B-roll + customer-journey motion graphics + standard bottom subtitles.

| | |
|---|---|
| A-roll | `Ad - Get the second sale.mov` (Drive id `10r1zY4Q7J13ffglIxPZO1Oozsed2iUHL`) |
| A-roll spec (measured) | ProRes, 3840x2160, 25 fps, 24-bit PCM audio, **34.12 s** |
| Delivery | 1080x1920, 25 fps (match the A-roll, avoids a frame-rate conform on Sean), H.264, stereo |
| Runtime | **34.12 s** as supplied (first word at 0.56 s, last word ends 32.08 s) |
| B-roll source | `B-Roll Short Cut` sheet (83 rows) |
| Word timings | `reference/aroll-word-timings.json` (faster-whisper small.en, cross-checked against the audio level profile) |

**Timecode convention:** every timestamp below is the A-roll source timecode, used 1:1 as the edit timecode. The A-roll audio is never cut. Optional: trim the first 0.40 s of dead air so Sean speaks at frame 4; if you do, subtract 0.40 s from every timestamp.

---

## 0 · Read first: what the analysis found

These change the plan, so they are stated before anything else.

1. **The trust line is not in the supplied A-roll.** "If we can't see it, we'll say so." does not exist in this file. Sean goes straight from "...bring your customers back." (ends 29.88 s) to "Tap Book Now..." (starts 30.50 s). The 0.6 s between them is silent (below -60 dB). Sections 15 and 16 of the brief therefore have no audio. The plan below is built on the audio that exists, and section 9 of this document gives a ready-to-drop insert spec if the line is recorded as a pickup or found in another take. **Recommendation: get the line.** It is the trust moment and the ad is stronger with it.
2. **"first get picked out" is also not in the A-roll.** Sean says "...and follow-ups worth testing." and stops (ends 14.86 s, silence to 15.45 s). The graphic copy still works because "worth testing" is spoken. Subtitles follow the audio, not the script.
3. **Actual spoken wording differs slightly from the script:** "more **of your** customers buying again" and "the team that helped Sweet E's". Subtitles use the spoken words.
4. **Two rows in the B-roll sheet have swapped links.**
   - Row "Sweet Es team working (1:00-1:03)" links to a 14.5 s file named `Sean on laptop - typing low angle.MP4`. A 1:00 timecode cannot exist in that file.
   - Row "Sean on Laptop (9-12 sec)" links to `Sweet E's Sean and Erica - intro.MP4` (82.9 s), and its 0:09 frame shows two Sweet E's team members working at a laptop.
   - Fix the sheet so nobody drops Sean-on-laptop under the Sweet E's claim.
5. **All client and event clips from the Canon / phone shoots are stored sideways.** The Sweet E's, Dryft and laptop files are 3840x2160 containers holding vertical footage. Rotate **90° clockwise** on import. Upside: they become native 9:16 with no crop loss.
6. **Frame verification coverage.** I pulled and viewed frames from the A-roll, all four Sweet E's files, Sean-on-laptop, the Shoptalk walk-and-talk and both Klaviyo phone clips. Drive then hit its public download quota on the remaining Canon event clips (Sean and Mason with two women, Sean holding laptop, Shoptalk stage, Dryft). Those picks use the sheet's own timecodes and are marked **[not frame-checked]**. Each has a verified fallback.
7. **Style references.** No previous campaign ad file was attached, so subtitle styling and logo placement follow the EcomIQ brand kit in this repo (`assets/ecomiq/`). If the existing campaign's caption sits at a different height or uses a box, match the campaign and keep the rules in section 5.
8. **Workspace aesthetic overridden on purpose.** This repo's `MOTION_PHILOSOPHY.md` calls for ~1.5 s scenes, whip transitions and chrome type. This brief explicitly demands calm, readable pacing and the EcomIQ palette, so that aesthetic is not applied. Its discipline is kept: one idea per beat, a recurring visual callback (the journey), and a held outro.

---

## Layout system (1080x1920)

| Zone | Y range | Use |
|---|---|---|
| Top unsafe | 0-270 | Nothing important (Reels header / profile) |
| Graphic zone | 290-1080 | Headlines, journey graphics, side cards, logo |
| Subtitle band | 1110-1250 | Subtitles only, bottom edge of text block at y 1250 |
| Bottom unsafe | 1250-1920 | No text (Reels caption, CTA button, UI) |
| Sides | 0-70 / 1010-1080 | No text |

**Sean framings** (source is 16:9 4K, Sean's head centred at source x≈1920):

| Name | Crop from 3840x2160 | Result |
|---|---|---|
| **Offset** | 1215x2160 window starting at source x=1130, scaled to 1080x1920 | Sean's head sits right of centre (output x≈460-960). Clean blue wall on the left gives a text column at x 70-420 |
| **Centre** | 1215x2160 window starting at source x=1312 | Sean centred, no side graphics |
| **Punch** | Same window, scaled 106-112% about Sean's eyes | Cut-in for emphasis. 4K source keeps it sharp |

Side-column text always sits on a Navy `#06284C` card at 88% opacity, 24 px corner radius, so it reads over the bright blue wall and over Sean's hands when he gestures.

**Logo:** EcomIQ white lockup (`ecomiq-logo-white.svg`), 200 px wide, top-left at x 70, y 300, **on full-screen Navy graphics only**. Confirm EcomIQ vs Pacific IQ lockup against the campaign before export.

**Type:** Rethink Sans ExtraBold for headlines (-2% tracking, 100% leading). Rethink Sans Bold for labels. Hedvig Letters Serif italic is reserved for the one word noted in the plan.

---

## PART 1 · Complete editing timeline

### Section 1 · Audience qualifier

| Field | Plan |
|---|---|
| Timestamp | 0.00-3.40 (3.40 s) |
| Exact dialogue | "Shopify founders doing $20,000 a month and up." (0.56-3.40) |
| Visual type | Sean + side card |
| Shot duration | 3.40 s |
| A-roll treatment | **Offset** framing, slow push 100% → 103% over the shot. Nothing on frame 1 except Sean |
| B-roll | None (Shopify intro clip deliberately not used) |
| Source timecode | A-roll 0.00-3.40 |
| Motion graphic | Side card, left column, y 480-760. Line 1 `SHOPIFY FOUNDERS` 50 px white. Line 2 `$20K+/MONTH` 76 px Blue Tint. Fades up + rises 20 px over 0.35 s starting 0.60 (on "Shopify"), exits 3.25-3.40 |
| Graphic read time | 2.65 s visible (4 short words). Comfortable |
| Exact hero text | SHOPIFY FOUNDERS / $20K+/MONTH |
| Subtitle | Shopify founders doing / $20,000 a month and up. |
| Highlight | None. The card already carries $20K+ in Blue Tint, a second blue $20,000 would double up |
| Hex | Text `#FFFFFF`, `$20K+/MONTH` `#9CD4FF`, card `#06284C` |
| Italic | No |
| Edit / transition | Opens on Sean. Card fade in / out |
| SFX | None. Open clean on Sean's voice |
| Why | The viewer has to recognise "this is for me" from Sean's face and one short qualifier. No graphic fights the first second |

### Section 2 · Customers buying again (the hook)

| Field | Plan |
|---|---|
| Timestamp | 3.40-7.55 (4.15 s) |
| Exact dialogue | "We'll show you how to get more of your customers buying again." (3.40-7.08) |
| Visual type | Sean (punch), then full-screen graphic |
| Shot durations | Sean punch 3.40-4.94 (**1.54 s**). Graphic GFX-1 4.94-7.55 (**2.61 s**) |
| A-roll treatment | **Punch** 112% centred on eyes, cut-in at 3.40 |
| B-roll | None |
| Source timecode | A-roll 3.40-4.94 |
| Motion graphic | **GFX-1 "Get the second sale"**, Navy full frame. See Part 3, State 1 |
| Graphic read time | Headline 2.61 s. ORDER #1 2.35 s. ORDER #2 1.63 s |
| Exact hero text | GET THE *SECOND* SALE. / ORDER #1 / ORDER #2 |
| Subtitle | We'll show you how to get (3.40-4.94) · more of your customers / buying again. (4.94-7.20) |
| Highlight | None. "buying again" in orange would compete with the orange ORDER #2 dot on screen at the same moment |
| Hex | BG `#06284C`, headline `#FFFFFF`, ORDER #1 `#9CD4FF`, connector `#DEEEFE`, ORDER #2 `#FF4C32` |
| Italic | Headline word *SECOND* in Hedvig Letters Serif italic (graphic only) |
| Edit / transition | Sean → GFX-1: 6-frame (0.24 s) cross-dissolve on "more". GFX-1 → Section 3: 6-frame dissolve inside the 7.08-7.55 silence |
| SFX | 5.20 soft click (ORDER #1). 5.35 light line movement. 5.92 soft marker (ORDER #2) |
| Why | This is the idea of the whole ad in one frame: first order, a gap, second order. It holds 2.6 s so it can be read and remembered |

### Section 3 · What they buy

| Field | Plan |
|---|---|
| Timestamp | 7.55-9.15 (1.60 s) |
| Exact dialogue | "It starts with what they buy" (7.55-8.84) |
| Visual type | B-roll + small tag |
| Shot duration | 1.60 s, one shot |
| A-roll treatment | Off screen, audio continues |
| B-roll clip | **Dryft Hold product** (`Copy of Dryft - Product holding.MP4`) **[not frame-checked]**. Verified fallback: **Sweet E's Cookie Scroll** 0:01.00-0:02.60 |
| Source timecode | Dryft 0:10.00-0:11.60 (sheet window 0:10-0:12). Rotate 90° CW |
| Motion graphic | Tag pill, left, y 860: Blue Tint dot + `ORDER #1` 40 px white on Navy pill. In 7.75 (0.3 s fade + 12 px slide). At 9.15 the tag does **not** disappear, it travels to become the ORDER #1 node of GFX-2 |
| Graphic read time | 1.40 s on the footage, then continuous as the GFX-2 node (total 4.15 s) |
| Exact hero text | ORDER #1 |
| Subtitle | It starts with / what they buy (7.55-8.84) |
| Highlight | None |
| Hex | Pill `#06284C`, dot `#9CD4FF`, text `#FFFFFF` |
| Italic | No |
| Edit / transition | In: dissolve from GFX-1. Out: footage dims to Navy over 0.35 s while the tag moves to its node position (match move, no cut feel) |
| SFX | None |
| Why | One real product makes "what they buy" concrete. Dryft is chosen over Sweet E's so Sweet E's footage first appears exactly where the Sweet E's claim is made |

### Section 4 · What happens after the first order

| Field | Plan |
|---|---|
| Timestamp | 9.15-11.90 (2.75 s) |
| Exact dialogue | "and what happens after their first order." (8.84-11.08) |
| Visual type | Full-screen graphic, **GFX-2 State A** |
| Shot duration | GFX-2 runs as ONE composition 9.15-15.45 (6.30 s). State A is 9.15-11.90 |
| A-roll / B-roll | None |
| Motion graphic | Header + vertical journey: ORDER #1 node at top, dashed connector drawing down into an empty gap, white "?" ring at the bottom. See Part 3, State 3 |
| Graphic read time | Header 2.55 s (6 words). Comfortable |
| Exact hero text | WHAT HAPPENS / AFTER ORDER #1? |
| Subtitle | and what happens after / their first order. (8.84-11.10) |
| Highlight | **first order** `#9CD4FF` (matches the Blue Tint ORDER #1 node on screen) |
| Italic | No |
| Edit / transition | Match move from Section 3 tag |
| SFX | 9.60 light movement as the connector draws |
| Why | The gap after Order #1 is the strategy. Showing it empty makes the viewer want it filled |

### Sections 5, 6 and 7 · Emails, offers, follow-ups (ONE composition)

| Field | Plan |
|---|---|
| Timestamp | 11.90-15.45 (3.55 s) |
| Exact dialogue | "From there, the emails, offers, and follow-ups worth testing." (11.58-14.86) |
| Visual type | Same full-screen graphic, **GFX-2 State B**. No cut |
| Shot duration | Continuous with State A (GFX-2 total 6.30 s) |
| Motion graphic | Header swaps. The "?" becomes a ghost ORDER #2 (orange outline). EMAIL, OFFER, FOLLOW-UP cards fill the gap one by one on the words. A small TEST FIRST tag lands on EMAIL. See Part 3, State 4 |
| Graphic read time | Header 3.25 s. EMAIL 3.20 s. OFFER 2.53 s. FOLLOW-UP 1.95 s. Full sequence 1.95 s. TEST FIRST 1.45 s |
| Exact hero text | WHAT'S WORTH / TESTING FIRST? · EMAIL · OFFER · FOLLOW-UP · TEST FIRST · ORDER #2 |
| Subtitle | From there, the emails, (11.58-12.85) · offers, and follow-ups / worth testing. (12.85-15.30) |
| Highlight | None |
| Hex | Cards `#DEEEFE` with `#06284C` text and icons. Header `#FFFFFF`. TEST FIRST tag `#9CD4FF` fill, `#06284C` text. ORDER #2 ghost `#FF4C32` outline at 60% |
| Italic | No |
| Edit / transition | No cuts. Out at 15.45: 6-frame dissolve to Section 8 inside the 14.86-15.45 silence |
| SFX | 12.25 gentle UI (EMAIL). 12.92 gentle UI (OFFER). 13.50 gentle UI (FOLLOW-UP). All three at the same low level |
| Why | Three ideas, one calm scene. Nothing flashes: each card arrives on its word and stays, so by 13.5 s the viewer sees the whole path from Order #1 towards Order #2 |

### Section 8 · Specialists from the team

| Field | Plan |
|---|---|
| Timestamp | 15.45-16.95 (1.50 s) |
| Exact dialogue | "Specialists from the team" (15.45-16.68) |
| Visual type | B-roll |
| Shot duration | 1.50 s, **one** shot (only 1.5 s exists before Sweet E's is named, so a 2-3 shot montage is not possible without flash cuts) |
| B-roll clip | **Sean talking on stage at Shoptalk - rebuy** **[not frame-checked: Drive returned no file to an anonymous request, check sharing]**. Fallback: **Sean and Mason standing talking to 2 women** (`A_0004C058A260304_115940HD_CANON.MP4`) 0:05.00-0:06.50 **[not frame-checked]** |
| Source timecode | Shoptalk 0:12.00-0:13.50 (sheet 0:12-0:14) |
| Motion graphic | **None** (see audit: ECOMMERCE SPECIALISTS removed) |
| Subtitle | Specialists from the team / that helped Sweet E's (15.45-17.68) |
| Highlight | None |
| Edit / transition | Dissolve in from GFX-2. Straight cut out at 16.95 on "that" |
| SFX | None |
| Why | Sean on a stage is the fastest possible read of "real experts". The subtitle already says "Specialists", a second text layer in 1.5 s would be too much |

### Section 9 · Sweet E's social proof

| Field | Plan |
|---|---|
| Timestamp | 16.95-18.30 (1.35 s) |
| Exact dialogue | "that helped Sweet E's" (16.68-17.68) |
| Visual type | Sweet E's B-roll |
| Shot duration | 1.35 s |
| B-roll clip | **Sweet Es Erica Packing Cake** (`Copy of Sweet E's Owner Erica - Packing cake.MP4`) **[frame-checked]**. Erica, the owner, turns and smiles to camera holding the red heart cake in the bright pink Sweet E's kitchen |
| Source timecode | 0:03.00-0:04.35. Rotate 90° CW |
| Motion graphic | None. Her face and the cake carry the brand |
| Subtitle | (continues) Specialists from the team / that helped Sweet E's |
| Highlight | None |
| Edit / transition | Straight cut in on "that" (16.95), straight cut out at 18.30 |
| SFX | None |
| Why | The claim names Sweet E's, so the viewer meets the actual owner as her name is spoken |

### Section 10 · +41% repeat customer rate (HERO PROOF)

| Field | Plan |
|---|---|
| Timestamp | 18.30-21.20 (2.90 s) |
| Exact dialogue | "lift repeat customer rate by 41%," (17.68-20.46) |
| Visual type | Sweet E's B-roll + hero proof card |
| Shot duration | 2.90 s |
| B-roll clip | **Sweet' Es cake being packed** (same file as Section 9) **[frame-checked]**. Heart cake sitting in the open pink Sweet E's box, hand closing the lid |
| Source timecode | 0:29.00-0:31.90. Rotate 90° CW. 20% Navy wash over the footage |
| Motion graphic | Navy proof card with SWEET E'S label, count-up to +41%, REPEAT CUSTOMER RATE. Full spec in Part 4 |
| Graphic read time | Label + metric name 2.65 s. Final +41% 1.75 s settled (2.50 s on screen including the count) |
| Exact hero text | SWEET E'S / +41% / REPEAT CUSTOMER RATE |
| Subtitle | lift repeat customer rate / by 41%, (17.68-20.46) |
| Highlight | **41%** `#FF4C32` |
| Italic | No |
| Edit / transition | Straight cut in at 18.30. Card enters 0.10 s after the cut. Card and shot leave together at 21.20 |
| SFX | 18.70-19.45 controlled count-up ticks, soft land on 19.45 |
| Why | The number sits on Sweet E's own product and carries Sweet E's name on the card, so it cannot be read as a generic or another client's result |

### Section 11 · Guide your team through the changes

| Field | Plan |
|---|---|
| Timestamp | 21.20-22.75 (1.55 s) |
| Exact dialogue | "guide your team through the changes" (20.46-22.50) |
| Visual type | B-roll |
| Shot duration | 1.55 s, one shot |
| B-roll clip | **Sean holding laptop talking to man** (`A_0004C078A260304_1210090O_CANON.MP4`) **[not frame-checked]**. Verified alternative: the Sweet E's team working at a laptop (`Sweet E's Sean and Erica - intro.MP4` 0:09.00-0:10.55, see section 0 point 4) |
| Source timecode | 0:03.50-0:05.05 (sheet 0:03-0:07) |
| Motion graphic | **None** (see audit: IMPLEMENT THE CHANGES removed) |
| Subtitle | guide your team / through the changes (20.46-22.50) |
| Highlight | None |
| Edit / transition | Straight cut in at 21.20. Out: 6-frame dissolve to GFX-3 |
| SFX | None |
| Why | A specialist with a laptop beside a client reads instantly as "guided, hands-on help" |

### Section 12 · Track repeat purchases

| Field | Plan |
|---|---|
| Timestamp | 22.75-24.70 (1.95 s) |
| Exact dialogue | "and track repeat purchases." (22.50-24.00) |
| Visual type | Full-screen graphic, **GFX-3** (callback of GFX-1) |
| Shot duration | 1.95 s |
| Motion graphic | Same horizontal ORDER #1 → ORDER #2 row as GFX-1, already built on entry so it reads instantly. ORDER #2 dot pulses and a Sky Blue up-arrow draws above it on "repeat purchases". See Part 3, State 6 |
| Graphic read time | 1.95 s for a 3-word headline whose diagram the viewer has already learned |
| Exact hero text | TRACK / REPEAT PURCHASES. |
| Subtitle | and track / repeat purchases. (22.50-24.10) |
| Highlight | None |
| Hex | BG `#06284C`, headline `#FFFFFF`, ORDER #1 `#9CD4FF`, connector `#DEEEFE`, ORDER #2 `#FF4C32`, arrow `#DEEEFE` |
| Edit / transition | Dissolve in. Straight cut out to Sean at 24.70 (silence 24.30-24.70) |
| SFX | 23.16 soft marker (ORDER #2) |
| Why | Brings the story back to its motif and shows the work is measured |

### Section 13 · Free discovery call

| Field | Plan |
|---|---|
| Timestamp | 24.70-26.85 (2.15 s) |
| Exact dialogue | "It starts with a free discovery call." (24.80-26.54) |
| Visual type | Sean + side card |
| Shot duration | 2.15 s |
| A-roll treatment | **Offset** framing at 100%. Sean completes the sentence on screen |
| Motion graphic | Side card, left column, y 560-760. `FREE` 76 px Blue Tint over `DISCOVERY CALL` 50 px white. In 24.95, out 26.75 |
| Graphic read time | 1.80 s (3 words) |
| Exact hero text | FREE / DISCOVERY CALL |
| Subtitle | It starts with a / free discovery call. (24.80-26.60) |
| Highlight | None (the card already marks FREE) |
| Hex | `FREE` `#9CD4FF` (orange is held back for BOOK NOW), rest `#FFFFFF`, card `#06284C` |
| Italic | No |
| Edit / transition | Cut on silence. Card fade |
| SFX | None |
| Why | Sean returns as the human making the offer. The card makes "free" unmissable |

### Section 14 · What could bring customers back

| Field | Plan |
|---|---|
| Timestamp | 26.85-30.45 (3.60 s) |
| Exact dialogue | "You'll come away knowing what could bring your customers back." (26.95-29.88) |
| Visual type | Sean + side card |
| Shot duration | 3.60 s |
| A-roll treatment | **Offset** framing, cut-in to 106% at 26.85 (silence 26.60-26.90) |
| Motion graphic | Side card, left column, y 470-900. Mini loop: Blue Tint dot and Orange dot on a Sky Blue circular arrow (no labels), then headline `WHAT COULD / BRING THEM / BACK?` 56 px white. In 27.50, out 30.35. See Part 3, State 7 |
| Graphic read time | 2.85 s (5 words) |
| Exact hero text | WHAT COULD BRING THEM BACK? |
| Subtitle | You'll come away knowing (26.95-28.34) · what could bring / your customers back. (28.34-29.95) |
| Highlight | None |
| Hex | Loop `#DEEEFE`, first dot `#9CD4FF`, return dot `#FF4C32`, text `#FFFFFF`, card `#06284C` |
| Italic | No |
| Edit / transition | Cut-in on silence. Card fade |
| SFX | None |
| Why | The promise of the call, as a question the viewer wants answered. Email / offer / follow-up are deliberately not repeated here to avoid clutter |

### Sections 15 and 16 · "If we can't see it, we'll say so."

**Not present in the supplied A-roll.** Nothing is placed here in the as-supplied cut. If the line is recorded, use the insert in section 9 of this document.

### Section 17 · CTA

| Field | Plan |
|---|---|
| Timestamp | 30.45-34.12 (3.67 s, to the end) |
| Exact dialogue | "Tap Book Now to choose a time." (30.50-32.08) |
| Visual type | Sean + CTA card |
| Shot duration | 3.67 s |
| A-roll treatment | **Offset** framing back to 100%, slow push to 104% through the end. Sean stays on screen to the last frame |
| Motion graphic | Left column, y 520-900. Tiny unlabelled callback (Blue Tint dot, Sky Blue line, Orange dot, 120 px wide, 60% opacity), `FREE DISCOVERY CALL` 36 px white, Orange button `BOOK NOW ↓` 56 px white on `#FF4C32`, `CHOOSE A TIME` 36 px white below. In 30.65, held to the last frame. Button gives one gentle 3% scale settle at 30.95, then stays still |
| Graphic read time | 3.47 s, the longest hold in the ad |
| Exact hero text | FREE DISCOVERY CALL / BOOK NOW ↓ / CHOOSE A TIME |
| Subtitle | Tap Book Now / to choose a time. (30.50-32.40), then subtitles clear and the CTA holds alone |
| Highlight | **Book Now** `#FF4C32` |
| Italic | No |
| Edit / transition | Cut on silence (29.90-30.45). No transition out, hold to end |
| SFX | 30.95 small CTA click |
| Why | One clear action, pointing down at Meta's button, with Sean still present as the person you will speak to |

---

## PART 2 · Pacing audit

### Shot list by duration

| # | In-Out | Dur | Shot |
|---|---|---|---|
| 1 | 0.00-3.40 | 3.40 | Sean offset + qualifier card |
| 2 | 3.40-4.94 | 1.54 | Sean punch |
| 3 | 4.94-7.55 | 2.61 | GFX-1 Get the second sale |
| 4 | 7.55-9.15 | 1.60 | Product B-roll + ORDER #1 tag |
| 5 | 9.15-15.45 | 6.30 | GFX-2 journey (evolves, no cuts) |
| 6 | 15.45-16.95 | 1.50 | Authority B-roll |
| 7 | 16.95-18.30 | 1.35 | Sweet E's, Erica |
| 8 | 18.30-21.20 | 2.90 | Sweet E's cake box + +41% |
| 9 | 21.20-22.75 | 1.55 | Collaboration B-roll |
| 10 | 22.75-24.70 | 1.95 | GFX-3 Track repeat purchases |
| 11 | 24.70-26.85 | 2.15 | Sean offset + FREE card |
| 12 | 26.85-30.45 | 3.60 | Sean 106% + bring-them-back card |
| 13 | 30.45-34.12 | 3.67 | Sean + CTA |

13 shots, 12 cuts, **average 2.62 s per shot**. Shortest shot 1.35 s.

### Cuts under 1 second

**None.** Nothing in the plan is shorter than 1.35 s.

### Motion graphics / text visible under 1.5 s

| Item | Visible | Verdict |
|---|---|---|
| ORDER #1 tag on product (Section 3) | 1.40 s on footage | **Justified.** Two words, already introduced 2 s earlier in GFX-1, and it does not disappear: it becomes the GFX-2 node, 4.15 s total exposure |
| TEST FIRST tag (GFX-2) | 1.45 s | **Revised.** First draft had it landing on "testing" (14.26) for 1.19 s. Moved to "worth" (14.00) to give 1.45 s. It is two words, and the header above it has said the same thing for 1.75 s already. If it still feels late in review, cut it: nothing is lost |

### Graphics removed because they could not be read in time

| Brief suggestion | Problem | Decision |
|---|---|---|
| ECOMMERCE SPECIALISTS overlay (Section 8) | Only 1.5 s of shot, new footage plus 2-line subtitle already saying "Specialists" | **Removed** |
| IMPLEMENT THE CHANGES overlay (Section 11) | 1.55 s shot, phrase needs 1.8-2.5 s, would duplicate the subtitle | **Removed** |
| DAY 1 / FOLLOW-UP / NEXT PURCHASE steps (Section 4) | Four labels in 2.75 s, and FOLLOW-UP would be shown twice within 3 s | **Simplified** to ORDER #1 → empty gap → "?" |
| BEFORE / AFTER returning-customer dots (Section 10) | Needs proportions. Inventing them would be a fake visual claim | **Removed**. The +41% card stands alone |
| 2-3 authority clips (Section 8) | Only 1.5 s before Sweet E's is named | **One** shot |

### Text cards that could be hard to read

| Card | Risk | Mitigation |
|---|---|---|
| GFX-2 State B (header + 5 nodes + tag) | Most elements on screen at once | Built progressively from 11.90, header visible 3.25 s, only one-word labels on the cards, ORDER #2 ghost at 60% so it does not compete |
| +41% card over footage | Bright pink background | Solid Navy card at 92% plus 20% Navy wash on the footage. Subtitles keep their Navy shadow |
| Side cards over Sean | Hand gestures cross the left column | Text always on a Navy card, never directly on the wall |

### More than 3 cuts within any 3 s window

**None.** The busiest stretch is 15.45 / 16.95 / 18.30: three cuts across 2.85 s, each shot a single clear subject held 1.35-1.50 s, driven by the sentence naming the team, then Sweet E's, then the result. Allowed by the rule (not more than 3) and kept because each cut lands on a new noun. 21.20 / 22.75 / 24.70 is three cuts across 3.50 s.

### Longest hold without a cut

GFX-2 at 6.30 s. Justified: it changes on screen every 0.6-1.0 s (connector, header swap, EMAIL, OFFER, FOLLOW-UP, tag) so the frame is never static, and replacing it with cuts is exactly the flash pattern the brief forbids.

---

## PART 3 · Customer journey graphic system

One visual language, eight appearances. First order is always Blue Tint, second order is always Flame Orange, the connection is always Sky Blue.

### State 1 · Introduce (GFX-1, Section 2)

| | |
|---|---|
| Time | 4.94-7.55 (screen 2.61 s) |
| Background | Navy `#06284C` full frame. Logo top-left |
| Exact text | `GET THE` / `SECOND SALE.` 104 px ExtraBold `#FFFFFF`, *SECOND* in Hedvig Letters Serif italic. Labels `ORDER #1` 40 px `#9CD4FF`, `ORDER #2` 40 px `#FF4C32` |
| Layout | Headline y 430-650 left aligned at x 90. Journey row at y 840: 36 px dot at x 200, 4 px Sky Blue `#DEEEFE` line to 36 px dot at x 880, labels 56 px below each dot |
| Animation | 4.94 headline fade + 24 px rise, 0.40 s `power2.out`. 5.20 ORDER #1 dot scales 0 → 1, 0.35 s `back.out(1.2)`, label fades 5.30. 5.35-5.92 line draws left to right, `power2.inOut`. 5.92 ORDER #2 dot lands (on "buying"), label 6.00. Whole frame drifts 100% → 102% scale to keep it alive |
| Readable hold | Headline 2.61 s. ORDER #1 2.25 s. ORDER #2 1.55 s |
| Into next state | 6-frame dissolve to the product shot. The ORDER #1 idea is carried by the product tag |

### State 2 · Seed (Section 3 tag)

| | |
|---|---|
| Time | 7.75-9.15 on footage |
| Background | Product B-roll |
| Exact text | `ORDER #1` 40 px `#FFFFFF` with 20 px `#9CD4FF` dot, on a `#06284C` pill |
| Animation | 0.30 s fade + 12 px slide in |
| Readable hold | 1.40 s, then continues as the node |
| Into next state | 9.15-9.50: footage dims to Navy, pill background dissolves, dot and label glide to the GFX-2 ORDER #1 node position (x 240, y 520), `power2.inOut` |

### State 3 · Question (GFX-2 A, Section 4)

| | |
|---|---|
| Time | 9.15-11.90 (screen 2.75 s) |
| Background | Navy. Logo top-left |
| Exact text | `WHAT HAPPENS` / `AFTER ORDER #1?` 76 px `#FFFFFF`, "ORDER #1" in `#9CD4FF`. Node label `ORDER #1` 44 px `#9CD4FF` |
| Layout | Header y 300-460. Vertical spine at x 240: ORDER #1 node y 520, dashed Sky Blue connector to a 44 px white outline ring with "?" at y 980 |
| Animation | 9.35 header fade + rise 0.40 s. 9.60-10.40 dashed connector draws down. 10.40 "?" ring fades in |
| Readable hold | Header 2.55 s |
| Into next state | No cut. 11.75-12.05 header crossfades. "?" ring recolours to an Orange outline and its label `ORDER #2` fades in at 60% |

### State 4 · Fill the gap (GFX-2 B, Sections 5-7)

| | |
|---|---|
| Time | 11.90-15.45 (screen 3.55 s, GFX-2 total 6.30 s) |
| Background | Navy |
| Exact text | Header `WHAT'S WORTH` / `TESTING FIRST?` 76 px `#FFFFFF`. Cards `EMAIL`, `OFFER`, `FOLLOW-UP` 44 px `#06284C` on `#DEEEFE` cards (88 px tall, 24 px radius, navy line icon: envelope / tag / chat bubble). Tag `TEST FIRST` 28 px `#06284C` on `#9CD4FF` pill. Ghost `ORDER #2` `#FF4C32` outline ring and label at 60% |
| Layout | Header y 300-460. Spine x 240. ORDER #1 y 520, EMAIL y 640, OFFER y 750, FOLLOW-UP y 860, ORDER #2 y 980. Cards start at x 290 |
| Animation | 12.25 EMAIL slides in 30 px from the right + fade, 0.35 s `power2.out` (on "emails"). 12.92 OFFER same (on "offers"). 13.50 FOLLOW-UP same (on "follow-ups"). Dashed connector turns solid Sky Blue behind each card as it lands. 14.00 TEST FIRST tag pops onto the right edge of EMAIL, 0.30 s `back.out(1.2)`, and all three cards get one soft Blue Tint glow pulse |
| Readable hold | Header 3.25 s. EMAIL 3.20 s. OFFER 2.53 s. FOLLOW-UP 1.95 s. TEST FIRST 1.45 s |
| Into next state | 6-frame dissolve to authority B-roll at 15.45 (in silence). The journey rests during the proof |

### State 5 · Proof (Section 10)

The journey is deliberately absent. The +41% card stands alone so the metric is the only thing to read. See Part 4.

### State 6 · Track (GFX-3, Section 12)

| | |
|---|---|
| Time | 22.75-24.70 (screen 1.95 s) |
| Background | Navy. Logo top-left |
| Exact text | `TRACK` / `REPEAT PURCHASES.` 96 px `#FFFFFF`. `ORDER #1` `#9CD4FF`, `ORDER #2` `#FF4C32` |
| Layout | Identical journey row to State 1 (y 840), so it reads as the same idea returning. ORDER #2 dot now solid and slightly larger (44 px) |
| Animation | Journey row is already drawn at the first frame. Headline fades + rises 0.30 s. 23.16 (on "repeat") ORDER #2 dot pulses once and a Sky Blue up-arrow draws 80 px above it, 0.40 s |
| Readable hold | 1.95 s (3 words, known diagram) |
| Into next state | Straight cut to Sean at 24.70 |

### State 7 · Promise (Section 14 side card)

| | |
|---|---|
| Time | 27.50-30.35 (screen 2.85 s) |
| Background | Navy card over Sean's offset framing |
| Exact text | `WHAT COULD` / `BRING THEM` / `BACK?` 56 px `#FFFFFF`. No labels on the loop |
| Layout | Loop icon (160 px circle, 4 px `#DEEEFE` arc with arrowhead, 20 px `#9CD4FF` dot at 9 o'clock, 20 px `#FF4C32` dot at 3 o'clock) above the headline |
| Animation | 27.50 card fades in. 27.60-28.40 arc draws from the blue dot round to the orange dot. 28.00 headline fades in. Out 30.20-30.35 |
| Readable hold | Headline 2.35 s, loop 2.75 s |
| Into next state | Card fades, cut to CTA framing on silence |

### State 8 · Callback (CTA)

| | |
|---|---|
| Time | 30.65-34.12 (screen 3.47 s) |
| Exact text | Unlabelled mini row: `#9CD4FF` dot, `#DEEEFE` line, `#FF4C32` dot, 60% opacity, above `FREE DISCOVERY CALL` |
| Animation | Fades in with the CTA card, no further motion |
| Into next state | End of ad |

---

## PART 4 · Sweet E's +41% proof sequence

Dialogue: "Specialists from the team that helped Sweet E's lift repeat customer rate by 41%," (15.45-20.46)

| Step | Time | Shot | Source | Duration | Graphic | Subtitle |
|---|---|---|---|---|---|---|
| Into | 15.45-16.95 | Authority B-roll (Section 8) | Shoptalk 0:12.00-0:13.50 | 1.50 s | None | Specialists from the team / that helped Sweet E's |
| 1 | 16.95-18.30 | **Erica (owner) smiling to camera with heart cake** | `Copy of Sweet E's Owner Erica - Packing cake.MP4` 0:03.00-0:04.35, rotate 90° CW | 1.35 s | None | (same block, ends 17.68) |
| 2 | 18.30-21.20 | **Heart cake in the pink Sweet E's box, hand closing lid** | Same file 0:29.00-0:31.90, rotate 90° CW | 2.90 s | +41% proof card | lift repeat customer rate / by **41%**, (17.68-20.46) |
| Out | 21.20 | Straight cut to collaboration B-roll | | | Card leaves with the shot | guide your team / through the changes |

No Dryft, Shoptalk-booth or other client footage appears anywhere from 16.95 to 21.20.

### Proof card spec

| | |
|---|---|
| Card | `#06284C` at 92%, 900x500 px, 28 px radius, centred at y 360-860 (cake stays visible below it) |
| Footage wash | `#06284C` at 20% over the Sweet E's shot for card contrast |
| Line 1 | `SWEET E'S` 40 px Rethink Sans Bold, +4% tracking, `#9CD4FF` |
| Line 2 | `+41%` 220 px Rethink Sans ExtraBold, -2% tracking, `#FF4C32` |
| Line 3 | `REPEAT CUSTOMER RATE` 54 px Rethink Sans Bold, `#FFFFFF`, one line |
| Exact metric wording | **+41% REPEAT CUSTOMER RATE**. Never "sales", "revenue", "conversion" or "retention rate" |

### Motion timing

| Time | Action |
|---|---|
| 18.30 | Cut to cake-box shot |
| 18.40-18.70 | Card fades up + 20 px rise, `power2.out`. `SWEET E'S` and `REPEAT CUSTOMER RATE` are visible immediately, number shows `+0%` |
| 18.70-19.45 | Count-up +0% → +41%, whole numbers, `power2.out` (fast start, gentle settle). Lands just as Sean says "41" (19.34) |
| 19.45 | Single soft scale settle 102% → 100%, 0.25 s |
| 19.45-21.20 | **Hold. No motion on the card** |
| 21.20 | Card leaves with the cut |

### Minimum readable hold

- `REPEAT CUSTOMER RATE` and `SWEET E'S`: 2.50 s on screen (18.70-21.20 fully opaque)
- Final `+41%` settled: **1.75 s**, plus 0.75 s of count-up visible before it. Total numeral on screen 2.50 s, inside the brief's 2-3 s
- Never under 1 s at any point

### Subtitle treatment

`lift repeat customer rate` / `by 41%,` with **41%** in `#FF4C32`. Everything else `#FFFFFF`. No italic. Position unchanged (bottom band), so the subtitle sits below the card, not on it.

---

## PART 5 · Subtitle plan

**Style:** Rethink Sans SemiBold 54 px, sentence case, centred, max 2 lines, max width 900 px, line height 1.15. Bottom edge of the text block at y 1250, fixed for the whole ad (Sean, B-roll, graphics, Sean). Legibility: soft drop shadow in `#06284C` at 60% (0 px x, 3 px y, 10 px blur). No box unless the existing campaign uses one. Subtitles enter and leave with a 3-frame fade, never pop.

| # | In-Out | Exact text (line break = /) | Default | Highlight | Highlight hex | Italic |
|---|---|---|---|---|---|---|
| 1 | 0.56-3.40 | Shopify founders doing / $20,000 a month and up. | `#FFFFFF` | None | | No |
| 2 | 3.40-4.94 | We'll show you how to get | `#FFFFFF` | None | | No |
| 3 | 4.94-7.20 | more of your customers / buying again. | `#FFFFFF` | None | | No |
| 4 | 7.55-8.84 | It starts with / what they buy | `#FFFFFF` | None | | No |
| 5 | 8.84-11.10 | and what happens after / their first order. | `#FFFFFF` | **first order** | `#9CD4FF` | No |
| 6 | 11.58-12.85 | From there, the emails, | `#FFFFFF` | None | | No |
| 7 | 12.85-15.30 | offers, and follow-ups / worth testing. | `#FFFFFF` | None | | No |
| 8 | 15.45-17.68 | Specialists from the team / that helped Sweet E's | `#FFFFFF` | None | | No |
| 9 | 17.68-20.46 | lift repeat customer rate / by 41%, | `#FFFFFF` | **41%** | `#FF4C32` | No |
| 10 | 20.46-22.50 | guide your team / through the changes | `#FFFFFF` | None | | No |
| 11 | 22.50-24.10 | and track / repeat purchases. | `#FFFFFF` | None | | No |
| 12 | 24.80-26.60 | It starts with a / free discovery call. | `#FFFFFF` | None | | No |
| 13 | 26.95-28.34 | You'll come away knowing | `#FFFFFF` | None | | No |
| 14 | 28.34-29.95 | what could bring / your customers back. | `#FFFFFF` | None | | No |
| 15 | 30.50-32.40 | Tap Book Now / to choose a time. | `#FFFFFF` | **Book Now** | `#FF4C32` | No |

15 subtitle blocks. **3 highlights total** (one Blue Tint, two Flame Orange), 12 blocks fully white. Shortest block 1.27 s (#6, 4 words).

If the trust line is added (section 9 below): `If we can't see it,` then `we'll say so.` both `#FFFFFF`, *we'll say so* in italic, no colour.

---

## PART 6 · B-roll pull list

Only five clips are needed. Fallbacks listed so nothing blocks the edit.

### A) Product / ecommerce

| Clip (sheet name → actual file) | Source TC | Ad section | Duration | Purpose |
|---|---|---|---|---|
| **Dryft Hold product** → `Copy of Dryft - Product holding.MP4` ([link](https://drive.google.com/file/d/1RapxMHiEtRmM6ig2GKFSSeCSHU4PA_U1/view)) **[not frame-checked]** | 0:10.00-0:11.60, rotate 90° CW | 3 · What they buy | 1.60 s | One real product a customer buys. Keeps Sweet E's footage reserved for the Sweet E's claim |
| Fallback: **Sweet E's Cookie Scroll** → `Copy of Sweet Es Cookie scroll.MP4` ([link](https://drive.google.com/file/d/1Cy939sI_20AioB9loydrqhbavZ-m_xcS/view)) **[frame-checked]** | 0:01.00-0:02.60, rotate 90° CW | 3 | 1.60 s | Slow move over trays of decorated cookies, calm and instantly readable |

### B) Team / authority

| Clip | Source TC | Ad section | Duration | Purpose |
|---|---|---|---|---|
| **Sean talking on stage at Shoptalk - rebuy** ([link](https://drive.google.com/file/d/1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z/view)) **[not frame-checked, check sharing]** | 0:12.00-0:13.50 | 8 · Specialists | 1.50 s | Expert on stage = authority at a glance |
| Fallback: **Sean and Mason standing talking to 2 women** → `A_0004C058A260304_115940HD_CANON.MP4` ([link](https://drive.google.com/file/d/1GycuM9sO1RClaXwnU7sdYi6HOqr6p15I/view)) **[not frame-checked]** | 0:05.00-0:06.50 | 8 | 1.50 s | Real team with real people |

### C) Sweet E's social proof

| Clip | Source TC | Ad section | Duration | Purpose |
|---|---|---|---|---|
| **Sweet Es Erica Packing Cake** → `Copy of Sweet E's Owner Erica - Packing cake.MP4` ([link](https://drive.google.com/file/d/1cF3UR7rqtK27rx9HUh5H7Wt_yipf8fhp/view)) **[frame-checked]** | 0:03.00-0:04.35, rotate 90° CW | 9 · Sweet E's | 1.35 s | The owner on camera as her brand is named |
| **Sweet' Es cake being packed** → same file **[frame-checked]** | 0:29.00-0:31.90, rotate 90° CW | 10 · +41% | 2.90 s | Sweet E's own product under Sweet E's own result |
| Spare: **Sweet Es Sprinkle on cupcakes** → `Copy of Sweet Es - Sprinkle on Cupcakes.MP4` **[frame-checked]** | 0:01.00-0:02.50, rotate 90° CW | Swap for step 2 only if the box shot is unusable | | |

### D) Collaboration / strategy

| Clip | Source TC | Ad section | Duration | Purpose |
|---|---|---|---|---|
| **Sean holding laptop talking to man** → `A_0004C078A260304_1210090O_CANON.MP4` ([link](https://drive.google.com/file/d/1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu/view)) **[not frame-checked]** | 0:03.50-0:05.05 | 11 · Guide your team | 1.55 s | Hands-on guidance |
| Fallback: **Sweet E's team working at laptop** → `Sweet E's Sean and Erica - intro.MP4` ([link](https://drive.google.com/file/d/1OEhRQ9CeyZxdI_21Eqm9x-SqGXKuoCL2/view), the file on the sheet's "Sean on Laptop" row) **[frame-checked at 0:09]** | 0:09.00-0:10.55, rotate 90° CW | 11 | 1.55 s | "Your team" working through the changes, same client as the proof |

### Checked and deliberately not used

| Clip | Reason |
|---|---|
| Sean walking around at Shoptalk talking | Sean talks into a handheld mic to camera: his lips would visibly not match the voiceover |
| Walking around Klaviyo booths | Large TikTok branding fills the frame |
| Walking in Klaviyo Event space (`IMG_0472.MOV`) | File is 7.9 s, so the sheet's 0:07-0:11 window only has 0.9 s of usable footage |
| Shopify intro | Excluded by the brief |
| Sean on laptop - typing low angle | Solo, introspective. Does not say "team" or "guide" |
| Dryft clips near the Sweet E's claim | Brief rule: no other client under the +41% claim |

---

## PART 7 · Condensed editor shot list

| TIMESTAMP | DIALOGUE | VISUAL | DURATION | B-ROLL | GRAPHIC | TEXT | SUBTITLE HIGHLIGHT | EDIT |
|---|---|---|---|---|---|---|---|---|
| 0.00-3.40 | Shopify founders doing $20,000 a month and up. | Sean offset, push 100→103% | 3.40 | | Side card in 0.60, out 3.40 | SHOPIFY FOUNDERS / $20K+/MONTH (#9CD4FF) | None | Open on Sean |
| 3.40-4.94 | We'll show you how to get | Sean punch 112% | 1.54 | | | | None | Cut-in |
| 4.94-7.55 | more of your customers buying again. | GFX-1 Navy full frame | 2.61 | | Journey row draws: #1 5.20, line 5.35, #2 5.92 | GET THE *SECOND* SALE. / ORDER #1 / ORDER #2 | None | 6f dissolve in and out |
| 7.55-9.15 | It starts with what they buy | Product B-roll | 1.60 | Dryft Hold 0:10.00-0:11.60 (fallback Cookie Scroll 0:01.00) | Tag in 7.75 | ORDER #1 | None | Tag match-moves into GFX-2 |
| 9.15-11.90 | and what happens after their first order. | GFX-2 A Navy | 2.75 | | ORDER #1 node, connector 9.60, "?" 10.40 | WHAT HAPPENS / AFTER ORDER #1? | first order #9CD4FF | Dip from footage to Navy |
| 11.90-15.45 | From there, the emails, offers, and follow-ups worth testing. | GFX-2 B (same scene) | 3.55 | | EMAIL 12.25, OFFER 12.92, FOLLOW-UP 13.50, TEST FIRST 14.00, ghost ORDER #2 12.00 | WHAT'S WORTH / TESTING FIRST? | None | No cut. 6f dissolve out |
| 15.45-16.95 | Specialists from the team | Authority B-roll | 1.50 | Shoptalk stage 0:12.00-0:13.50 (fallback Sean+Mason+2 women 0:05.00) | None | | None | Straight cut out |
| 16.95-18.30 | that helped Sweet E's | Sweet E's B-roll | 1.35 | Erica Packing Cake 0:03.00-0:04.35, rotate CW | None | | None | Straight cuts |
| 18.30-21.20 | lift repeat customer rate by 41%, | Sweet E's B-roll + proof card | 2.90 | Cake being packed 0:29.00-0:31.90, rotate CW | Card 18.40, count 18.70→19.45, hold | SWEET E'S / +41% (#FF4C32) / REPEAT CUSTOMER RATE | 41% #FF4C32 | Card leaves with cut |
| 21.20-22.75 | guide your team through the changes | Collaboration B-roll | 1.55 | Sean holding laptop 0:03.50-0:05.05 (fallback Sweet E's team 0:09.00) | None | | None | 6f dissolve out |
| 22.75-24.70 | and track repeat purchases. | GFX-3 Navy (callback) | 1.95 | | Row pre-built, #2 pulse + arrow 23.16 | TRACK / REPEAT PURCHASES. | None | Cut on silence |
| 24.70-26.85 | It starts with a free discovery call. | Sean offset 100% | 2.15 | | Side card 24.95-26.75 | FREE (#9CD4FF) / DISCOVERY CALL | None | Cut on silence |
| 26.85-30.45 | You'll come away knowing what could bring your customers back. | Sean offset 106% | 3.60 | | Loop + card 27.50-30.35 | WHAT COULD BRING THEM BACK? | None | Cut-in on silence |
| 30.45-34.12 | Tap Book Now to choose a time. | Sean offset, push 100→104% | 3.67 | | CTA card 30.65 to end | FREE DISCOVERY CALL / BOOK NOW ↓ (#FF4C32) / CHOOSE A TIME | Book Now #FF4C32 | Cut on silence, hold to end |

### Sound design cue sheet

| Time | Cue | Level |
|---|---|---|
| 5.20 | Soft click, ORDER #1 | About 14 dB under dialogue |
| 5.35 | Light line movement | About 18 dB under |
| 5.92 | Soft marker, ORDER #2 | About 14 dB under |
| 9.60 | Light line movement (connector) | About 18 dB under |
| 12.25 / 12.92 / 13.50 | Gentle UI, EMAIL / OFFER / FOLLOW-UP | About 16 dB under, identical sound each time |
| 18.70-19.45 | Controlled count-up ticks, soft land | About 14 dB under |
| 23.16 | Soft marker, ORDER #2 (same sound as 5.92) | About 14 dB under |
| 30.95 | Small CTA click | About 12 dB under |

Nine cues in 34 s, none on a plain cut. No whooshes, cash, alarms, impacts or meme sounds. If the campaign uses a music bed, keep it at least 20 dB under Sean.

---

## 9 · Insert spec if the trust line is recorded

Record or locate: **"If we can't see it, we'll say so."** in the same setup (same lighting, same vest). Expected length about 2.2 s including a breath.

Insert at 29.95 (after "back.") and push the CTA later by the clip length.

| New TC (assumes 2.20 s pickup) | Dialogue | Visual | Graphic | Subtitle |
|---|---|---|---|---|
| 29.95-31.10 | If we can't see it, | Sean **centre** framing 100%, no graphics | None (Section 14 card has already gone) | `If we can't see it,` all `#FFFFFF` |
| 31.10-32.15 | we'll say so. | Sean centre, cut-in 108% | None | `we'll say so.` all `#FFFFFF`, *we'll say so* italic |
| 32.15-36.32 | Tap Book Now to choose a time. | CTA as Section 17 | CTA card | Book Now `#FF4C32` |

Result: about 36.3 s, still under 40 s. The 2.2 s graphics-free stretch is the breathing room the trust statement needs.

---

## FINAL CREATIVE CHECK

| # | Check | Result |
|---|---|---|
| 1 | Communicates FIRST ORDER → SECOND ORDER? | **Yes.** The ORDER #1 → ORDER #2 row opens the graphics at 4.94, returns at 22.75 and closes beside the CTA |
| 2 | Repeat purchase / retention the central theme? | **Yes.** Every graphic is a stage of the same journey. No profit-leak, waterfall, roadmap, $20K→$100K, audit cards or ceiling graphics |
| 3 | No cuts that feel like flashes? | **Yes.** Shortest shot 1.35 s, average 2.62 s, 12 cuts in 34 s |
| 4 | B-roll held long enough? | **Yes.** All B-roll 1.35-2.90 s, one subject per shot |
| 5 | Graphics held long enough to read? | **Yes.** Headlines 1.95-3.25 s. Only one 2-word tag sits at 1.45 s and it is optional |
| 6 | Unreadable graphics removed? | **Yes.** Five suggestions removed or simplified (Part 2) |
| 7 | Email / offer / follow-up in ONE composition? | **Yes.** GFX-2, 6.30 s, no cuts, progressive reveal |
| 8 | Sweet E's clearly connected to +41%? | **Yes.** Owner on screen as the name is spoken, then the number on Sweet E's product, with SWEET E'S on the card |
| 9 | Metric exactly REPEAT CUSTOMER RATE? | **Yes.** `+41%` / `REPEAT CUSTOMER RATE` |
| 10 | Unrelated clients kept away from the proof? | **Yes.** 16.95-21.20 is Sweet E's only. Dryft appears once, 8 s earlier, with no claim attached |
| 11 | Sean still the human authority? | **Yes.** Opens and closes the ad (14.3 s of A-roll on screen) and is the subject of the authority and guidance B-roll |
| 12 | Free discovery call clear? | **Yes.** Card at 24.95 and repeated on the CTA |
| 13 | Trust statement has breathing room? | **Not possible in the supplied file: the line is not in the A-roll.** Insert spec ready in section 9 |
| 14 | BOOK NOW clear at the end? | **Yes.** Orange button held 3.47 s to the last frame, alone after 32.40 |
| 15 | Subtitles consistently at the bottom? | **Yes.** Fixed band, bottom edge y 1250, never moves |
| 16 | White dominant? | **Yes.** 12 of 15 blocks fully white |
| 17 | Orange and Blue Tint used sparingly? | **Yes.** Orange: ORDER #2, +41%, BOOK NOW (plus 41% and Book Now in subtitles). Blue Tint: first-order markers, $20K+, FREE, SWEET E'S label, one subtitle word pair |
| 18 | Every graphic readable? | **Yes**, subject to a phone-size review of GFX-2 B |
| 19 | Every B-roll shot has a reason? | **Yes.** Product, authority, Sweet E's owner, Sweet E's product under the claim, guidance. Five shots total |
| 20 | Smooth, premium, considered? | **Yes.** Cuts land on silences or new nouns, graphics evolve instead of replacing each other, and the ad ends on a long, still CTA |

### Open items before the edit locks

1. Record or source the trust line (strongly recommended).
2. Fix the two swapped links in the B-Roll Short Cut sheet.
3. Confirm the Shoptalk stage clip is shared (an anonymous request returned no file).
4. Frame-check the four **[not frame-checked]** picks once Drive's download quota resets (about 24 h), or have the editor eyeball them on import. Every one has a verified fallback.
5. Confirm logo lockup (EcomIQ vs Pacific IQ) and caption styling against the existing campaign ads.
