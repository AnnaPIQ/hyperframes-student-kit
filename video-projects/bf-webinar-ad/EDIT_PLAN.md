# BF Webinar Meta Ad, 9:16: Complete Editing Plan

**Working title:** Black Friday Playbook (Sean floating-head)
**Format:** 1080 x 1920, 9:16, 30fps delivery (source A-roll is 60fps, conform to 30)
**Runtime:** 37.0s (36.38s A-roll + 0.62s end-frame hold)
**Event:** FREE live webinar, **Wednesday October 14**, 1:30 PM PT / 4:30 PM ET (confirmed on the landing page)
**Landing page CTA wording:** "Save my free spot" / "Reserve my free spot"

---

## 0. What was analysed, and what it changed

### A-roll (IMG_1545.MOV, Drive `1ACX0XWBYF8a29h99AiH0jF-v-a5Tf0MT`)
- 36.38s, HEVC 3840x2160 with -90 rotation = **2160 x 3840 portrait**, 60fps, stereo AAC.
- Sean is centred, head in roughly the 30% to 65% band of frame, black PacificIQ tee.
- **He holds the lav mic (fluffy windscreen) in his right hand at chin height and gestures with his left hand across the lower frame.** The floating-head matte must include the mic hand and gesturing hand. Tight crops will clip hands, so tighter crops are push-ins on the face, never side crops.
- The background is a home office with two monitors (one shows the landing page in purple). This is removed entirely by the cutout.
- Sean drifts slightly closer and further during the take. Track-stabilise the cutout so his face centre stays fixed within each layout.
- 4K portrait source = up to 2x punch-in with no quality loss at 1080 delivery.
- Word timings were transcribed locally (Whisper small.en) and cross-checked against a silence map. They are saved in `reference/aroll-word-timings.json`. Treat timings as **±0.1s** and snap every cut and subtitle to the waveform.

### Actual dialogue timing (output timeline = A-roll timeline, the A-roll plays in full and uncut)

| A-roll time | Line |
|---|---|
| 00.10 - 02.88 | If you want to double your revenue this Black Friday versus last year, |
| 02.92 - 04.72 | I'm hosting a completely free webinar |
| 04.76 - 08.59 | where we are going to give you the exact secrets that we use at Pacific IQ |
| 08.85 - 11.03 | with eight and nine figure brands year on year |
| 11.53 - 13.39 | to get incredible performance. |
| 13.65 - 15.85 | Now, it's not just going to be what discounts, |
| 15.90 - 16.78 | but we're going to go through |
| 16.80 - 18.05 | how to set up your ad accounts, |
| 18.10 - 19.25 | how many creatives you need. |
| 19.30 - 20.75 | Do you need to do bundles, |
| 20.78 - 22.33 | what emails to send and when, |
| 22.35 - 25.19 | and what to actually look at once Black Friday is live. |
| 25.84 - 29.55 | I'm going to walk through all of this on our free live webinar on October 14th. |
| 30.31 - 34.35 | If that's something that you think might be helpful for you, just click the link below and register for the webinar. |
| 34.40 - 35.29 | It's completely free. |
| 35.29 - 36.38 | (silence, Sean holds) |

### B-roll sheet: verified frame by frame (14 clips pulled and checked)

Findings the editor must know before touching the library:

1. **Most 4K "landscape" clips are actually portrait footage missing rotation metadata.** They display sideways. **Rotate 90° clockwise** and they become native 2160 x 3840 vertical, perfect for full-bleed 9:16. This affects: Angle over laptop, Sean holding laptop talking to man, Sean and Mason talking to 2 women, all Sweet E's clips, Dryft Sleep, Dryft Hold product, Cookie Scroll, Sprinkle. See `reference/broll-rotated-check.jpg`.
2. **"Sean on Laptop" (0:09-0:12) is mislabelled.** It shows two women at a pink desk, then a woman walking, then a woman and a man in a doorway. Sean is not in the shot. **Do not use** (see `reference/mislabelled-sean-on-laptop.jpg`).
3. **"Sweet Es team working" (1:00-1:03) is mislabelled and the timecode does not exist.** The clip is 14.5s long and shows a low-angle shot of Sean. Not Sweet E's. **Do not use** under that label.
4. **"Walking in Klaviyo Event space" is only 7.93s long.** The sheet range 0:07-0:11 runs off the end. The useful section is **0:00.5-0:03.0** (Klaviyo K:service booths with people). 0:05 onward is an empty bar area.
5. **"Sean talking on stage at Shoptalk - rebuy" (1080p, 16:9):**
   - 0:12 is a **title slide**, not stage footage. The stage shot starts at about 0:12.5.
   - 6:02 is a **"RETENTION / LTV is not just a metric" slide**. Sean is on stage from about 6:02.6.
   - **Misattribution risk:** the LED wall behind Sean shows **Rebuy's platform stats** ("59x average ROI for Shopify Plus brands", "1.3+ Billion requests processed daily", "4.5+ Million API calls", "99.9% platform uptime"). Viewers could read these as Pacific IQ results. Even a tight crop leaves "59x" and "ROI / Shopify Plus" fragments legible (see `reference/shoptalk-crop-check.jpg`). **These must be made illegible** (treatment in Part 4).
   - Good detail: Sean's lanyard badge reads **SHOPTALK / SEAN CLARKE / PACIFIC IQ**. This is genuine authority proof.
6. **"Limitless growth rebuy sign" is an MMNTM banner**, not Rebuy. Third-party branding, no message value. **Do not use.**
7. **"Sweet Es Sprinkle on cupcakes" 0:01-0:02 is a 1s range.** Below the pacing minimum. Not used.
8. **Shopify intro: excluded per brief.**

### Landing page (ecomiq.com/pages/bf-webinar)
- Headline: "Double Your Black Friday". Host: Sean Clarke, Founder of EcomIQ and Pacific IQ.
- Agenda covers offer structure and metrics, multi-channel coordination, where sales and profit are lost, time and budget priorities. Deliverable: a plan covering email strategy, ad budget, creative requirements, discount levels that protect margin, and pre-launch priorities.
- Claims on page: "8- and 9-figure Shopify brands", "$98 million in combined revenue". **No revenue guarantee** (explicit disclaimer). This supports framing "double" as a question.
- Replay available to all registrants.
- Brand on page: **EcomIQ**. Sean says "Pacific IQ" in the VO and wears a PacificIQ tee. Recommendation: EcomIQ logo on the event card and end frame for landing-page continuity. **Anna to confirm.**

### Brand system (from `assets/ecomiq/`)
- Type: **Rethink Sans** (ExtraBold 800 for hero, Bold 700 for subtitles and labels, -2% tracking on hero, 1.0 leading). **Hedvig Letters Serif Italic** only for the single italic moment.
- Palette, used strictly as briefed: Navy `#06284C`, Blue Tint `#9CD4FF`, White `#FFFFFF`, Sky `#DEEEFE`, Flame `#FF4C32`, Black `#000000` (light backgrounds only, which this ad does not use).
- Panels and cards are **White `#FFFFFF` at 6-10% opacity over Navy**, with a 1.5px Blue Tint stroke at 35% opacity. No new hex values.
- Background texture on every navy scene: a faint perspective grid in Sky `#DEEEFE` at 6% opacity plus a soft vignette. Keep it quiet.

---

## Global layout grid (1080 x 1920)

| Zone | Y range | Use |
|---|---|---|
| Top UI danger | 0 - 270 | Nothing important. Background only. |
| Graphics zone | 290 - 1080 | Hero text, playbook card, overlays |
| Subtitle zone | 1110 - 1240 | Subtitles only. Graphics never enter it. |
| Bottom UI danger | 1250 - 1920 | Sean's torso, footage, background. **No text.** |
| Side margins | 72px left, 130px right below y 1100 | Right side has the Reels icon column |

### Sean cutout presets

| Preset | Face width | Face centre (x, y) | Shows |
|---|---|---|---|
| **S** small | ~260px | (250, 1010) | Head and shoulders, bottom-left corner |
| **M** medium | ~400px | LEFT (330, 880) / RIGHT (750, 880) | Head, shoulders, mic hand, gestures |
| **MT** medium-tight | ~470px | same x as M, y 860 | Head and upper chest, hand partly in frame |
| **L** full-screen | ~560px | CENTRE (540, 820) | Full presenter frame, trust moment |

**Cutout treatment (all presets):** clean matte that includes the mic and both hands, 2px edge feather, a very soft Blue Tint `#9CD4FF` rim glow at 15% opacity, and a navy contact shadow. The bottom of the cutout fades into navy over 220px so Sean never ends in a hard horizontal edge, whatever the scale. Position changes use a **0.5s ease-in-out glide** (power2.inOut) or happen under a transition. Never bounce, never overshoot.

---

## PART 1: COMPLETE EDITING TIMELINE

Each section lists, in order: timestamp, exact dialogue, visual type, Sean position, Sean scale and crop, B-roll clip, source timecode, shot duration, why the B-roll is relevant, motion graphic, graphic read time, hero text, subtitle, subtitle highlight, hex, italic, transition, SFX, and why this composition is used.

### S1 HOOK: 00.00 - 03.55 (3.55s)
- **Dialogue:** "If you want to double your revenue this Black Friday versus last year,"
- **Visual type:** Sean + graphic
- **Sean position:** LEFT
- **Scale / crop:** M, static (no push on the first frame, so the hook reads cleanly)
- **B-roll:** none · **Source TC:** n/a · **Shot duration:** n/a
- **Motion graphic:** hero text in the top band, right-aligned (x 1008), with a "VS LAST YEAR" chip in the free pocket right of Sean's head (x 640-1000, y 880)
  - 00.50 "DOUBLE YOUR" rises 40px and fades in (0.35s, power3.out), landing on the word "double" (0.60)
  - 01.00 "BLACK FRIDAY" + "REVENUE?" rise together on "revenue" (1.04)
  - 02.00 "VS LAST YEAR" chip slides in from the right on "versus" (2.00)
- **Graphic read time:** full stack readable from 02.00 to 03.55 (1.55s), with the main lines on screen for 2.55s
- **Hero text:**
  - DOUBLE (Flame `#FF4C32`) YOUR (White `#FFFFFF`)
  - BLACK FRIDAY (White)
  - REVENUE? (White)
  - Chip: VS LAST YEAR (Blue Tint `#9CD4FF`, 34px, in a 1.5px Blue Tint outline pill)
- **Subtitle:** "If you want to double your revenue" / "this Black Friday versus last year,"
- **Highlight:** none · **Hex:** `#FFFFFF` · **Italic:** no
- **Transition in:** none, open on Sean already talking (frame 1 is Sean + navy, no splash)
- **SFX:** soft branded low impact at 00.55 under "DOUBLE"
- **Why:** Black Friday is in the first readable line. Sean delivers the hook in person. The question mark frames "double" as an ambition, matching the landing page's no-guarantee stance.

### S2 FREE WEBINAR: 03.55 - 06.10 (2.55s)
- **Dialogue:** "I'm hosting a completely free webinar where we are going to give you"
- **Visual type:** Sean + graphic (composition evolves)
- **Sean position:** RIGHT (glides from LEFT under a 0.45s blur-push)
- **Scale / crop:** M, beginning a slow push to MT (100% to 108% over 03.55 to 08.50)
- **B-roll:** none
- **Motion graphic:** the text block moves to the top band, left-aligned (x 72). Three lines:
  - FREE LIVE (FREE in Flame, LIVE in White)
  - BLACK FRIDAY (White)
  - WEBINAR (White)
  - Lines build on "free" (04.08) with a 0.12s stagger
- **Graphic read time:** 04.05 to 06.10 = 2.05s (3 lines, 4 words)
- **Subtitle:** "I'm hosting a completely free webinar" / "where we are going to give you the exact secrets"
- **Highlight:** none (the hero text carries FREE) · **Hex:** `#FFFFFF` · **Italic:** no
- **Transition:** 0.45s horizontal blur-push left to right, carrying Sean across. This is his one big move in the first half.
- **SFX:** soft UI tick at 04.08
- **Why:** this is a position change rather than a cut. Sean stays in shot while the information changes around him.

### S3 EXACT SECRETS: 06.10 - 08.50 (2.40s)
- **Dialogue:** "the exact secrets that we use at Pacific IQ"
- **Visual type:** Sean + graphic (same composition evolving)
- **Sean position:** RIGHT
- **Scale / crop:** push continues toward MT
- **B-roll:** none
- **Motion graphic:** **"BLACK FRIDAY" stays locked in place.** Only lines 1 and 3 swap, with a vertical roll (0.35s):
  - FREE LIVE → **THE ACTUAL**
  - WEBINAR → **PLAYBOOK** (Blue Tint `#9CD4FF`)
  - Result: THE ACTUAL / BLACK FRIDAY / PLAYBOOK, with the swap landing on "exact" (06.00 to 06.10)
- **Graphic read time:** 2.40s
- **Hero text:** THE ACTUAL (White), BLACK FRIDAY (White), PLAYBOOK (Blue Tint)
- **Subtitle:** "that we use at Pacific IQ"
- **Highlight:** none · **Italic:** no
- **Transition:** in-place text roll, no cut
- **SFX:** none (let the VO breathe)
- **Why:** this plants the word PLAYBOOK, which the framework later pays off. The fixed BLACK FRIDAY line makes it read as one evolving system rather than a new screen.

### S4 8- & 9-FIGURE SOCIAL PROOF: 08.50 - 12.00 (3.50s). Full detail in Part 4.
- **Dialogue:** "with eight and nine figure brands year on year to get"
- **Visual type:** B-roll in a framed card, with a persistent text overlay
- **Sean position:** the cutout fades out. Sean appears in the B-roll.
- **Clip 1:** Sean talking on stage at Shoptalk (rebuy), source **6:03.4-6:05.2**, **1.80s** (08.50-10.30)
- **Clip 2:** Sean holding laptop talking to man, source **0:03.0-0:04.7** (rotate 90° CW), **1.70s** (10.30-12.00)
- **Why the B-roll is relevant:** Sean speaking on an industry stage and Sean in an operator conversation at an event = real-world experience behind "eight and nine figure brands"
- **Overlay:** STRATEGIES USED WITH (Blue Tint, 40px) / **8- & 9-FIGURE** (White, 96px) / ECOMMERCE BRANDS (White, 56px). It lands on "with eight" at 08.85, holds to 12.00, and does not cut with the clips.
- **Graphic read time:** 3.15s
- **Subtitle:** "with *eight and nine figure* brands" (08.85-10.35) / "year on year to get" (10.39-12.04)
- **Highlight:** "eight and nine figure" in Blue Tint `#9CD4FF`, **Italic: YES** (Hedvig Letters Serif Italic, the single italic moment in the ad)
- **Transition in:** the PLAYBOOK line rolls out. The B-roll card rises from the bottom (0.45s, power3.out) while the Sean cutout dissolves (0.3s).
- **Between clips:** 0.30s soft cross-dissolve inside the card (same frame, footage swaps)
- **SFX:** none on entry. Soft card-movement air at 08.50.
- **Why:** this is proof. The stage and event footage shows the experience instead of asserting it.

### S5 PERFORMANCE: 12.00 - 13.50 (1.50s)
- **Dialogue:** "incredible performance."
- **Visual type:** Sean + graphic
- **Sean position:** LEFT (returns, a callback to the hook)
- **Scale / crop:** MT, static
- **B-roll:** none
- **Motion graphic:** a single word plus an arrow line. PERFORMANCE (White, 88px) in the top band with a thin Blue Tint line that draws upward into a small ↑ arrowhead (0.5s draw). **No numbers.**
- **Graphic read time:** 1.40s (one word, trivially readable)
- **Subtitle:** "incredible performance."
- **Highlight:** none · **Italic:** no
- **Transition in:** the card drops out downward (0.4s) as Sean scales up from 92% to 100% and fades in (0.4s)
- **SFX:** none
- **Why:** this brings the presenter back after proof. It is intentionally simple because the next beat is the big visual reset.

### S6 NOT JUST DISCOUNTS: 13.50 - 16.00 (2.50s)
- **Dialogue:** "Now, it's not just going to be what discounts,"
- **Visual type:** full-screen graphic
- **Sean position:** off
- **B-roll:** none
- **Motion graphic:** full navy screen with grid
  - 13.55: a generic % price-tag icon (Sky `#DEEEFE` outline, 140px, no number on it) swings in from the top, pivoting on its string hole (0.5s, gentle)
  - 13.75: **THE DISCOUNT** (Blue Tint, 92px)
  - 14.20: **ISN'T THE** / **WHOLE PLAN.** (White, 120px)
- **Graphic read time:** 2.25s for 5 words
- **Subtitle:** "Now, it's not just going to be" / "what discounts,"
- **Highlight:** none · **Italic:** no
- **Transition in:** 0.4s blur-zoom through Sean (the strongest transition in the ad, used once)
- **SFX:** subtle transition swell, no whoosh stack
- **Why:** this is a deliberate pattern break and resets attention before the framework. It also tells the viewer this webinar is more than a discount-tips session.

### S7 PLAYBOOK INTRODUCED: 16.00 - 16.70 (0.70s build, with the composition persisting to 27.55). Full detail in Part 3.
- **Dialogue:** "but we're going to go through"
- **Visual type:** Sean + persistent graphic
- **Sean position:** LEFT, behind the card edge
- **Scale / crop:** M
- **Motion graphic:** the BLACK FRIDAY PLAYBOOK card slides in from the right (0.45s). The header lands, then rows 01-05 stagger in dimmed (0.06s each).
- **Graphic read time:** the header persists for 11.5s, so it is fully readable
- **Subtitle:** "but we're going to go through"
- **Highlight:** none
- **Transition in:** blur-push from the discount screen (0.4s). Sean glides in from the left edge.
- **SFX:** soft card slide
- **Why:** one persistent system. Viewers learn the frame once, then watch it evolve.

### S8 AD ACCOUNT: 16.70 - 18.05 (1.35s)
- **Dialogue:** "how to set up your ad accounts,"
- **Visual type:** Sean + graphic (same composition)
- **Sean position:** LEFT · **Scale:** M
- **Motion graphic:** row **01 AD ACCOUNT** activates, and its panel expands to show a **structure glyph**: one node branching to two, then four (thin Sky lines, Blue Tint nodes). **No labels inside the glyph.** It reads instantly as "structure". No fake Ads Manager.
- **Graphic read time:** 1.35s active. The row label stays on screen to the end of the recap.
- **Subtitle:** "how to set up your ad accounts,"
- **Highlight:** none
- **Transition:** in-card accordion (0.35s)
- **SFX:** soft UI tick at 16.70
- **Why:** an abstract concept, so motion graphics beat B-roll here. The glyph is simplified so it can be read in the short window.

### S9 CREATIVES: 18.05 - 19.25 (1.20s)
- **Dialogue:** "how many creatives you need."
- **Visual type:** Sean + graphic (same composition)
- **Sean position:** LEFT · **Scale:** M
- **Motion graphic:** row 01 collapses with a Sky tick. Row **02 CREATIVES** expands into a 2x2 grid of blank 9:16 "ad" tiles (white 10% fill, Blue Tint stroke, tiny play triangle) that deal in with a 0.06s stagger. Then **HOW MANY?** (Blue Tint, 44px) fades in under the grid at 18.45. **No number.**
- **Graphic read time:** "HOW MANY?" on screen 0.80s inside the card, and it then carries over as the row's sub-tag until 19.25. Two words, readable.
- **Subtitle:** "how many creatives you need."
- **Highlight:** none
- **SFX:** light card-deal ticks (one sound for the whole deal, not four)
- **Why:** the curiosity gap (HOW MANY?) is a reason to register.

### S10 BUNDLES: 19.25 - 21.00 (1.75s). Full detail in Part 5.
- **Dialogue:** "Do you need to do bundles,"
- **Visual type:** B-roll (full-bleed) with a playbook-style overlay
- **Sean position:** off
- **B-roll:** Dryft Hold product, source **0:10.0-0:11.75** (rotate 90° CW), **1.75s**
- **Why the B-roll is relevant:** a hand holding two products together is a literal visual of a bundle, in real ecommerce product context
- **Overlay:** "03" (Blue Tint, 40px) + **BUNDLES?** (White, 100px) in the top band, using the same lockup style as the card row
- **Graphic read time:** 1.55s, one word
- **Subtitle:** "Do you need to do bundles,"
- **Highlight:** none
- **Transition in:** row 03 activates at 19.25, then the footage **expands out of row 03** to full frame (0.4s mask scale). The B-roll is visibly part of the system.
- **Transition out:** the footage shrinks back into row 03 (0.4s)
- **SFX:** subtle soft transition swell
- **Why:** this is the brief's designated product moment. The question mark keeps it a question, not a claim about Dryft.

### S11 EMAILS: 21.00 - 22.40 (1.40s)
- **Dialogue:** "what emails to send and when,"
- **Visual type:** Sean + graphic
- **Sean position:** LEFT · **Scale:** M
- **Motion graphic:** row 03 gets a tick. Row **04 EMAILS** expands into three envelope icons labelled 1, 2, 3 joined by Sky arrows (0.1s stagger), plus the sub-tag **WHAT + WHEN** (Blue Tint)
- **Graphic read time:** 1.40s (3 icons + 2 words)
- **Subtitle:** "what emails to send and when,"
- **Highlight:** none
- **SFX:** soft "send" swish at 21.20
- **Why:** sequencing is abstract, so a graphic explains it best. Klaviyo footage was considered and **removed**, because the 1.4s window cannot hold a cutaway and the graphic without flashing.

### S12 LIVE NUMBERS: 22.40 - 25.00 (2.60s)
- **Dialogue:** "and what to actually look at once Black Friday is live."
- **Visual type:** graphic-dominant, Sean small
- **Sean position:** LEFT, shrinking to S in the bottom-left corner (0.5s glide)
- **Scale / crop:** S
- **Motion graphic:** the card widens to x 260-1020. Row **05 LIVE NUMBERS** expands to a panel with a small "LIVE" dot (Flame dot pulse, 12px, the only orange in the section). **WHAT DO YOU WATCH?** (White, 56px) appears above three data chips: **SPEND · SALES · PROFIT** (Blue Tint labels, each with a short rising Sky sparkline stub and no values). The chips land at 22.70, 22.85, and 23.00.
- **Graphic read time:** 2.30s
- **Subtitle:** "and what to actually look at" / "once Black Friday is live."
- **Highlight:** none
- **SFX:** light data tick on each chip (3 ticks, low volume)
- **Why:** the brief suggested 4 metrics. CONVERSION was dropped because the landing page grounds spend (ad budget), sales, and profit ("where profit is lost") but does not name conversion. Three chips are also easier to read than four.

### S13 PLAYBOOK RECAP: 25.00 - 27.55 (2.55s)
- **Dialogue:** (pause 25.19 - 25.84) "I'm going to walk through all of this"
- **Visual type:** Sean + graphic
- **Sean position:** LEFT, glides back to M (0.5s)
- **Motion graphic:** the card returns to its standard size. All 5 rows show at full white with a Sky tick on each (0.12s stagger), and the header gets a soft Blue Tint glow. "All of this" (27.02) lands on a fully lit list.
- **Graphic read time:** 2.55s for 5 short rows that viewers have already seen once each
- **Subtitle:** "I'm going to walk through all of this"
- **Highlight:** none
- **SFX:** one soft confirm chime (not 5 ticks)
- **Why:** this shows the breadth of the webinar in one frame, timed exactly to "all of this".

### S14 OCTOBER 14 EVENT CARD: 27.55 - 31.00 (3.45s). Full detail in Part 6.
- **Dialogue:** "on our free live webinar on October 14th. If that's something"
- **Visual type:** full-screen graphic
- **Sean position:** off
- **Hero text:** FREE LIVE / BLACK FRIDAY WEBINAR (White), calendar tile OCTOBER (Navy on Sky strip) / **14** (Flame `#FF4C32`), WED · 1:30 PM PT · 4:30 PM ET (Blue Tint), REGISTER FREE (white pill)
- **Graphic read time:** date on screen from 28.85, and it stays visible (as a chip) until the end of the ad
- **Subtitle:** "on our free live webinar" / "on *October 14th.*"
- **Highlight:** "October 14th." in Flame `#FF4C32` · **Italic:** no
- **Transition in:** blur-push upward from the recap (0.4s)
- **SFX:** small clean impact at 28.90 on the date
- **Why:** the date is the single most important fact, so it gets the whole screen.

### S15 REGISTER: 31.00 - 34.35 (3.35s)
- **Dialogue:** "If that's something that you think might be helpful for you, just click the link below and register for the webinar."
- **Visual type:** Sean full-screen, then Sean + CTA
- **31.00 - 32.40:** Sean **CENTRE, L (full-screen trust moment)**. The calendar tile shrinks to an "OCT 14" chip (Flame 14) at the top right (x 820-1008, y 300).
- **32.40 - 34.35:** Sean glides to **RIGHT, M**. The CTA builds top-left:
  - REGISTER (White, 96px) **FREE** (Flame)
  - OCTOBER 14 (White, 60px, the chip resolves into this line)
  - LINK BELOW ↓ (white-outline pill with White text, and the arrow bobs 6px on a 1.2s loop)
- **Graphic read time:** 1.95s for the CTA. It then evolves and holds to the end (4.6s total CTA presence).
- **Subtitle:** "If that's something that you think" / "might be helpful for you," / "just click the link below" / "and register for the webinar."
- **Highlight:** none
- **Transition:** in-place glide, no cut
- **SFX:** soft click at 32.55 ("click")
- **Why:** the full-screen Sean is the trust beat, and he is personally inviting the viewer. The CTA then sits beside him.

### S16 COMPLETELY FREE + END HOLD: 34.35 - 37.00 (2.65s)
- **Dialogue:** "It's completely free." (34.40-35.29), then Sean holds silently to 36.38, then a 0.62s freeze on the last frame
- **Visual type:** Sean + CTA
- **Sean position:** RIGHT, slow push M to MT (100% to 106%)
- **Motion graphic:** the headline rolls from REGISTER FREE to **100% FREE** (100% White, FREE Flame) at 34.40. The pill text becomes **REGISTER NOW ↓**. OCTOBER 14 stays. A small EcomIQ white logo fades in top-centre at y 300 at 35.30.
- **Graphic read time:** 2.6s, held to the last frame
- **Subtitle:** "It's completely *free.*"
- **Highlight:** "free." in Flame `#FF4C32` · **Italic:** no
- **SFX:** soft click at 34.40. The music resolves on the last beat.
- **Why:** the final frame carries every action fact: FREE, date, register, link below.

---

## PART 2: FLOATING-HEAD COMPOSITION PLAN

| Time | Sean | Graphic side | Move |
|---|---|---|---|
| 00.00 - 03.55 | **LEFT, M**, static | Hook text top-right, chip right of head | none |
| 03.55 - 08.50 | **RIGHT, M → MT** slow push (8%) | Webinar / Playbook text top-left | one blur-push glide L→R |
| 08.50 - 12.00 | off, appears in B-roll | Proof overlay + B-roll card | dissolve out |
| 12.00 - 13.50 | **LEFT, MT**, static | PERFORMANCE ↑ top-right | scale-in return |
| 13.50 - 16.00 | off | Full-screen discount reset | blur-zoom |
| 16.00 - 22.40 | **LEFT, M**, behind card edge (38% of frame) | Playbook card right (62%) | glide in from left |
| 19.25 - 21.00 | off (bundles B-roll from row 03) | full-bleed product | mask expand |
| 22.40 - 25.00 | **LEFT, S**, bottom-left corner | Card widens, LIVE NUMBERS dominant | 0.5s shrink |
| 25.00 - 27.55 | **LEFT, M** | Recap card right | 0.5s grow back |
| 27.55 - 31.00 | off | Full-screen October 14 card | blur-push up |
| 31.00 - 32.40 | **CENTRE, L full-screen** | OCT 14 chip top-right only | scale-in |
| 32.40 - 34.35 | **RIGHT, M** | CTA top-left | 0.5s glide |
| 34.35 - 37.00 | **RIGHT, M → MT** slow push (6%) | 100% FREE CTA top-left | in-place |

**On screen:** about 25.8s of 37.0s (70%). **Position changes:** 7 in 37s, each tied to a section change, never mid-sentence. Every side has a reason: LEFT for teaching (hook, performance, playbook), RIGHT for invitation (webinar and CTA), CENTRE once for trust.

---

## PART 3: BLACK FRIDAY PLAYBOOK GRAPHIC (one persistent composition, 16.00 - 27.55)

**Total screen time:** 11.55s, with a 1.75s excursion into bundles B-roll that grows out of the card and returns into it.

### Layout
- **Sean:** LEFT, preset M, face centre (330, 880). He occupies about 38% of frame width. The card overlaps his far shoulder and gesturing hand slightly, with **Sean behind the card**. This depth layering makes it feel designed rather than split-screen.
- **Card:** x 400-1020 (620px wide), y 300-1080, 28px radius, White 7% fill over Navy, 1.5px Blue Tint stroke at 35%, and a soft Blue Tint outer glow at 10%.
- **Header (y 330-430):** BLACK FRIDAY (White, 44px, 800) / PLAYBOOK (Blue Tint, 44px, 800)
- **Rows:** collapsed height 80px each. The one active row expands to 300px for its mini-graphic.
  - Number: Blue Tint, 36px, 700, tabular
  - Label: White, 46px, 800
  - Row labels: **01 AD ACCOUNT · 02 CREATIVES · 03 BUNDLES / OFFER · 04 EMAILS · 05 LIVE NUMBERS**

### States
| State | Number | Label | Background | Extra |
|---|---|---|---|---|
| Waiting | Blue Tint 45% | White 45% | none | none |
| Active | Blue Tint 100% | White 100% | White 10% pill + 6px Blue Tint left bar | Panel expands with mini-graphic |
| Done | Blue Tint 80% | White 85% | none | Small Sky `#DEEEFE` tick at the right edge |

### Activation schedule (each about 0.2s before the spoken keyword)
| Row | Active window | Mini-graphic inside expanded row | Read time |
|---|---|---|---|
| 01 AD ACCOUNT | 16.70 - 18.05 | Structure glyph 1→2→4 nodes, no text | 1.35s |
| 02 CREATIVES | 18.05 - 19.25 | 2x2 ad-tile grid + HOW MANY? | 1.20s |
| 03 BUNDLES / OFFER | 19.25 - 21.00 | **Row opens into full-bleed product B-roll** | 1.75s |
| 04 EMAILS | 21.00 - 22.40 | Envelopes 1 → 2 → 3 + WHAT + WHEN | 1.40s |
| 05 LIVE NUMBERS | 22.40 - 25.00 | Card widens: LIVE dot, WHAT DO YOU WATCH?, SPEND · SALES · PROFIT | 2.60s |
| Recap | 25.00 - 27.55 | All rows "Done", full white, header glow | 2.55s |

### Animation rules
- Accordion expand and collapse: 0.35s, power2.inOut. The outgoing row collapses while the incoming row expands, so the list never jumps.
- Rows never leave the card. The viewer always sees all 5 topics, so the breadth is understood even before the recap.
- Only one row is active at a time. There is no orange in the card except the 12px LIVE dot.
- Sean stays still during the activations. The information moves, the presenter does not.

### Hex summary
Navy `#06284C` background · White `#FFFFFF` labels and header line 1 · Blue Tint `#9CD4FF` numbers, header line 2, active bar, sub-tags · Sky `#DEEEFE` ticks, glyph lines, arrows, grid · Flame `#FF4C32` LIVE dot only.

---

## PART 4: SOCIAL PROOF B-ROLL SEQUENCE ("eight and nine figure brands year on year")

**Window:** 08.50 - 12.00 (3.50s), 2 clips, both inside the same rounded B-roll card (x 120-960, y 600-1720, 840x1120, 3:4, 28px radius, Blue Tint stroke 35%). The card format hides the softness of the 1080p stage source and keeps the scene designed.

| # | Out time | Clip | Source TC | Dur | Role |
|---|---|---|---|---|---|
| 1 | 08.50 - 10.30 | Sean talking on stage at Shoptalk - rebuy (Drive `1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z`) | **6:03.4 - 6:05.2** | 1.80s | Authority: Sean presenting to an ecommerce industry audience. The badge reads SHOPTALK / SEAN CLARKE / PACIFIC IQ. |
| 2 | 10.30 - 12.00 | Sean holding laptop talking to man (`1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu`), **rotate 90° CW** | **0:03.0 - 0:04.7** | 1.70s | Operator experience: Sean in a working conversation with an event attendee (lanyard visible) |

**Alternate for clip 2:** Sean and Mason standing talking to 2 women (`1GycuM9sO1RClaXwnU7sdYi6HOqr6p15I`), rotate 90° CW, **0:03.0 - 0:04.7**. Avoid 0:00-0:02, which is blurred whip motion.

**Overlay (persistent across both clips, top band y 300-560):**
- STRATEGIES USED WITH (Blue Tint, 40px)
- **8- & 9-FIGURE** (White, 96px)
- ECOMMERCE BRANDS (White, 56px)
- It lands at 08.85 ("with eight"), with a 0.1s line stagger, and holds to 12.00 (3.15s read).

**Clip 1 treatment (mandatory):**
- Reframe to 3:4 centred on Sean and keyframe the crop to follow his slight drift.
- **Make the Rebuy LED stats illegible:** rough-roto Sean (he is against a flat dark wall, so this is easy), then apply a 14px blur plus a 55% Navy overlay to the wall only. Then verify on a frame grab that "59x", "ROI", "Shopify Plus", "1.3+ Billion" and "99.9%" cannot be read.
- Add a 0-55% Navy gradient over the bottom 40% for subtitle legibility.
- Do not caption "Shoptalk" or "Rebuy". Nothing on screen should suggest a Rebuy endorsement or that the stats are Pacific IQ results.

**Sean transition in and out:**
- In (08.50): the PLAYBOOK line rolls out, the Sean cutout dissolves (0.3s), and the card rises from y+200 (0.45s, power3.out). Sean's voice continues uninterrupted.
- Between clips (10.30): 0.30s cross-dissolve inside the card.
- Out (12.00): the card drops away (0.4s) and the Sean cutout returns LEFT, MT, scaling 92% to 100%.

**Misattribution warnings:**
- The overlay describes the **team's experience**. Nobody shown is identified as an 8- or 9-figure brand. Do not name or caption the man in clip 2 or the women in the alternate.
- The Shoptalk LED stats belong to Rebuy and must not be legible.
- "Sean on Laptop" in the sheet is not Sean. Do not substitute it here.
- Do not use the 0:12 title slide or the 6:02 "RETENTION" slide by accident. Both sit right before the stage ranges in the sheet.

---

## PART 5: BUNDLES / PRODUCT SEQUENCE ("Do you need to do bundles")

**Window:** 19.25 - 21.00 (1.75s). The spoken phrase is only 1.45s, so **one clip** is the correct answer. Two clips would put both under 0.9s, which breaks the pacing rule.

| Out time | Clip | Source TC | Dur | Role |
|---|---|---|---|---|
| 19.25 - 21.00 | **Dryft Hold product** (`1RapxMHiEtRmM6ig2GKFSSeCSHU4PA_U1`), **rotate 90° CW** | **0:10.0 - 0:11.75** | 1.75s | A hand holding two Dryft Sleep pouches together: a literal "bundle" image, real ecommerce product, retail shelf context |

**Reframe:** scale 110% and shift up about 150px so the two pouches sit in y 560-1100, between the overlay and the subtitles.

**Overlay:** "03" (Blue Tint, 40px) + **BUNDLES?** (White, 100px), top band, using the playbook row lockup. One word, 1.55s on screen.

**Transition in:** row 03 activates on the card, then its row panel **mask-expands to full frame** (0.4s, power2.inOut) revealing the footage. **Transition out:** the reverse, back into row 03, which then gets its tick. Sound is a single soft swell, no whoosh.

**Alternates (approved product context, use only if Dryft usage is not cleared):**
- Sweet E's cake being packed (`1cF3UR7rqtK27rx9HUh5H7Wt_yipf8fhp`), rotate 90° CW, **0:36.0 - 0:37.75**: a cake being placed in its pink branded box (fulfilment)
- Sweet E's Cookie Scroll (`1Cy939sI_20AioB9loydrqhbavZ-m_xcS`), rotate 90° CW, **0:01.5 - 0:03.25**: individually wrapped cookies on trays (product groupings)

**Warnings:**
- Do **not** show the brand names as text and do not imply Dryft or Sweet E's ran Black Friday bundles or used this strategy. The overlay is a question, not a case study.
- **Confirm paid-media usage rights** with Dryft and Sweet E's before this runs as a Meta ad. Client footage cleared for organic use is not automatically cleared for paid ads.

---

## PART 6: OCTOBER 14 EVENT CARD (27.55 - 31.00, then the date persists to the end)

### Layout (graphics zone y 290-1080, centred)
| Y | Element | Style |
|---|---|---|
| 300 | EcomIQ logo (white), 44px tall | fades in at 27.70 |
| 380 - 450 | FREE LIVE | White, 64px, 800 |
| 450 - 520 | BLACK FRIDAY WEBINAR | White, 64px, 800 |
| 560 - 930 | **Calendar tile** 360x370, 32px radius: top strip Sky `#DEEEFE` with **OCTOBER** in Navy (52px, 800); body Navy with a White 8% fill and **14** in Flame `#FF4C32` (240px, 800) | the hero |
| 960 | WED · 1:30 PM PT · 4:30 PM ET | Blue Tint, 34px, 700 |
| 1010 - 1070 | REGISTER FREE | White 2px outline pill, White text, 38px |

**Hierarchy:** 14 → OCTOBER → FREE LIVE BLACK FRIDAY WEBINAR → time → REGISTER FREE. **Orange appears only on 14.** FREE stays white here so the date is the single hot element.

### Animation
- 27.55: blur-push up from the recap (0.4s)
- 27.60 - 28.00: FREE LIVE / BLACK FRIDAY WEBINAR rise 30px with a 0.1s stagger (spoken "free live webinar" at 27.89)
- 28.85: the calendar tile scales 0.9 to 1.0 and fades in (0.35s, power3.out). The Sky strip lands first, then 14, timed to "October" (28.95). Small clean impact SFX.
- 29.40: time line fades in
- 29.70: REGISTER FREE pill draws its outline (0.4s)
- Then hold. No looping motion except a very slow 1% breathe on the tile.

**Readable hold:** the full card stays fully built for 1.3s, and the date is on screen from 28.85 to 31.00 (2.15s). It then never disappears: at 31.00 the tile shrinks into an "OCT 14" chip, and from 32.40 it is a full OCTOBER 14 line in the CTA until 37.00. **Total date screen time: 8.15s.**

**CTA treatment:** the pill is a white outline, not orange, so it reads as an instruction rather than competing with the date. The real tap target is Meta's CTA button, which the "LINK BELOW ↓" arrow on the next screen points at.

---

## PART 7: B-ROLL PULL LIST (recommended only)

### A) AUTHORITY / SOCIAL PROOF
| Clip | Source TC | Where used | Dur | Purpose |
|---|---|---|---|---|
| Sean talking on stage at Shoptalk - rebuy | 6:03.4 - 6:05.2 | S4, 08.50 - 10.30 | 1.80s | Industry speaker authority. Rebuy stats must be blurred. |
| Sean holding laptop talking to man (rotate 90° CW) | 0:03.0 - 0:04.7 | S4, 10.30 - 12.00 | 1.70s | Real operator conversation at an event |
| *Alt:* Sean and Mason standing talking to 2 women (rotate 90° CW) | 0:03.0 - 0:04.7 | S4 clip 2 alternate | 1.70s | Team at an event |
| *Alt, not in primary cut:* Walking in Klaviyo Event space | **0:00.5 - 0:03.0** (sheet's 0:07-0:11 does not exist) | none, kept as a spare for a longer cut-down | 2.5s | Ecommerce event context. Do not imply a Klaviyo partnership. |

### B) PRODUCT / ECOMMERCE
| Clip | Source TC | Where used | Dur | Purpose |
|---|---|---|---|---|
| Dryft Hold product (rotate 90° CW) | 0:10.0 - 0:11.75 | S10, 19.25 - 21.00 | 1.75s | Two products held together = bundle |
| *Alt:* Sweet E's cake being packed (rotate 90° CW) | 0:36.0 - 0:37.75 | S10 alternate | 1.75s | Real fulfilment |
| *Alt:* Sweet E's Cookie Scroll (rotate 90° CW) | 0:01.5 - 0:03.25 | S10 alternate | 1.75s | Product groupings |

### C) STRATEGY / WORK
| Clip | Source TC | Where used | Dur | Purpose |
|---|---|---|---|---|
| *Alt, not in primary cut:* Angle over laptop - Sean thinking (rotate 90° CW) | 0:04.0 - 0:06.0 | Spare only. Every strategy beat in this script is better served by Sean + graphic. | 2.0s | Planning / operational credibility |

**Excluded and why:** Shopify intro (brief), "Sean on Laptop" (mislabelled, not Sean), "Sweet Es team working" (mislabelled, TC invalid), Limitless growth sign (MMNTM branding), Sprinkle 0:01-0:02 (1s), all driving, coffee, walking, and hotel lifestyle clips (decorative only), Pacific IQ reel (not reviewed for this cut, and pre-cut reels risk flash pacing).

---

## PART 8: SUBTITLE PLAN

**Style:** Rethink Sans Bold 700, 58px, sentence case, White `#FFFFFF`, centred, max width 820px, max 2 lines (about 26 characters per line), bottom edge locked at y 1240. Navy text shadow `0 3px 14px` at 85% opacity on every subtitle. Every B-roll gets a 0-55% Navy gradient on its lower 40%, so the style never changes. Phrases cut on the word boundaries below with no gaps under 0.15s (hold the previous phrase through short pauses). If an existing EcomIQ subtitle template is in the editing project, use its font, weight, and shadow settings and keep these timings and highlight rules.

**Highlight rule:** 3 highlights in 22 rows. Everything else is white.

| # | In - Out | Exact text | Default | Highlight | Hex | Italic |
|---|---|---|---|---|---|---|
| 1 | 00.10 - 01.36 | If you want to double your revenue | White | none | | no |
| 2 | 01.39 - 02.90 | this Black Friday versus last year, | White | none | | no |
| 3 | 02.92 - 04.72 | I'm hosting a completely free webinar | White | none | | no |
| 4 | 04.76 - 06.85 | where we are going to give you the exact secrets | White | none | | no |
| 5 | 06.88 - 08.80 | that we use at Pacific IQ | White | none | | no |
| 6 | 08.85 - 10.35 | with eight and nine figure brands | White | **eight and nine figure** | `#9CD4FF` | **yes** (Hedvig Letters Serif Italic) |
| 7 | 10.39 - 12.25 | year on year to get | White | none | | no |
| 8 | 12.28 - 13.60 | incredible performance. | White | none | | no |
| 9 | 13.65 - 15.00 | Now, it's not just going to be | White | none | | no |
| 10 | 15.02 - 15.88 | what discounts, | White | none | | no |
| 11 | 15.90 - 16.94 | but we're going to go through | White | none | | no |
| 12 | 16.96 - 18.08 | how to set up your ad accounts, | White | none | | no |
| 13 | 18.10 - 19.28 | how many creatives you need. | White | none | | no |
| 14 | 19.30 - 20.76 | Do you need to do bundles, | White | none | | no |
| 15 | 20.78 - 22.33 | what emails to send and when, | White | none | | no |
| 16 | 22.35 - 24.00 | and what to actually look at | White | none | | no |
| 17 | 24.02 - 25.70 | once Black Friday is live. | White | none | | no |
| 18 | 25.78 - 27.55 | I'm going to walk through all of this | White | none | | no |
| 19 | 27.58 - 28.80 | on our free live webinar | White | none | | no |
| 20 | 28.83 - 30.18 | on October 14th. | White | **October 14th.** | `#FF4C32` | no |
| 21 | 30.20 - 31.38 | If that's something that you think | White | none | | no |
| 22 | 31.40 - 32.38 | might be helpful for you, | White | none | | no |
| 23 | 32.40 - 33.28 | just click the link below | White | none | | no |
| 24 | 33.30 - 34.38 | and register for the webinar. | White | none | | no |
| 25 | 34.40 - 36.38 | It's completely free. | White | **free.** | `#FF4C32` | no |

(Rows 10, 22 and 23 run 0.86-0.98s. They are 2-4 word phrases, which read comfortably at that length, and merging them would exceed 2 lines.)

---

## PART 9: PACING AUDIT

| Issue found | Where | Fix applied |
|---|---|---|
| Ad Account keyword window was only 0.95s (17.18 - 18.05, after a pause) | S8 | Activate at 16.70 on "how to" = 1.35s. Glide simplified to a text-free structure glyph. Label persists to the end. |
| The suggested ACCOUNT → CAMPAIGN → ADS labels and "SET IT UP FOR BFCM" could not be read in that window | S8 | Removed the text and kept the glyph |
| Bundles window 1.45s spoken. Multiple product clips would be under 0.9s each. | S10 | One clip, 1.75s, extended to "what" (20.78) |
| Klaviyo layer in Emails would create a sub-1s cutaway | S11 | Removed. Graphic only. |
| "WHEN BFCM GOES LIVE... WHAT DO YOU WATCH?" plus 4 metrics is too much text for 2.6s | S12 | One question + 3 one-word chips |
| Social-proof clips at 1.3s each in the 2.18s spoken window | S4 | Window widened to 08.50 - 12.00, giving 2 clips of 1.8s and 1.7s |
| Shoptalk 0:12 title slide and 6:02 RETENTION slide sit right before the sheet ranges, causing a flash risk | S4 | Source in-points moved to 6:03.4. 0:12 range unused. |
| Hook text would only be fully readable for 0.9s if it changed on "I'm hosting" | S1 | Hook held to 03.55 (all lines for 1.55s, main lines for 2.55s) |
| October 14 risked disappearing under the full-screen Sean beat | S15 | Date shrinks to a persistent chip instead of leaving |
| Subtitle "year on year" alone was 0.66s | Subs | Merged into "year on year to get" (1.86s) |
| Sprinkle clip only 1s | Pull list | Excluded |
| Shortest shot in the ad | | 1.20s (S9 Creatives state). **No visual shot or graphic state is under 1.2s.** |
| Transitions | Global | All 0.30-0.45s soft blur-push, dissolve or mask. One blur-zoom (S6). No hard flash cuts, no white flashes, no glitch. |

---

## PART 10: CONDENSED EDITOR SHOT LIST

| TIMESTAMP | DIALOGUE | VISUAL | SEAN POSITION | B-ROLL | SOURCE TC | GRAPHIC | HERO TEXT | DURATION | EDIT |
|---|---|---|---|---|---|---|---|---|---|
| 00.00-03.55 | If you want to double your revenue this Black Friday versus last year, | Sean + graphic | LEFT, M | none | A 00.00-03.55 | Hook stack + chip | **DOUBLE** YOUR / BLACK FRIDAY / REVENUE? + VS LAST YEAR | 3.55 | Open on Sean, text builds on "double" and "revenue", soft impact |
| 03.55-06.10 | I'm hosting a completely free webinar where we are going to give you | Sean + graphic | RIGHT, M→MT push | none | A 03.55-06.10 | Text block | **FREE** LIVE / BLACK FRIDAY / WEBINAR | 2.55 | 0.45s blur-push glide L→R |
| 06.10-08.50 | the exact secrets that we use at Pacific IQ | Sean + graphic | RIGHT, push cont. | none | A 06.10-08.50 | Lines 1 and 3 roll, line 2 locked | THE ACTUAL / BLACK FRIDAY / PLAYBOOK | 2.40 | In-place text roll |
| 08.50-10.30 | with eight and nine figure brands | B-roll card + overlay | off | Shoptalk stage | 6:03.4-6:05.2 | Proof overlay | STRATEGIES USED WITH / 8- & 9-FIGURE / ECOMMERCE BRANDS | 1.80 | Card rises 0.45s. Blur Rebuy stats. |
| 10.30-12.00 | year on year to get | B-roll card + overlay | off | Sean holding laptop talking to man (rot 90° CW) | 0:03.0-0:04.7 | Overlay held | (same) | 1.70 | 0.3s dissolve in card |
| 12.00-13.50 | incredible performance. | Sean + graphic | LEFT, MT | none | A 12.00-13.50 | Arrow line draws up | PERFORMANCE ↑ | 1.50 | Card drops, Sean scales in |
| 13.50-16.00 | Now, it's not just going to be what discounts, | Full-screen graphic | off | none | n/a | % tag swing | THE DISCOUNT / ISN'T THE / WHOLE PLAN. | 2.50 | 0.4s blur-zoom |
| 16.00-16.70 | but we're going to go through | Sean + playbook | LEFT, M | none | A 16.00-16.70 | Card in, rows stagger | BLACK FRIDAY PLAYBOOK 01-05 | 0.70 build (persists) | Blur-push, card slides in |
| 16.70-18.05 | how to set up your ad accounts, | Sean + playbook | LEFT, M | none | A | Row 01 + structure glyph | 01 AD ACCOUNT | 1.35 | Accordion 0.35s, tick |
| 18.05-19.25 | how many creatives you need. | Sean + playbook | LEFT, M | none | A | Row 02 + 2x2 tiles | 02 CREATIVES / HOW MANY? | 1.20 | Accordion, deal sound |
| 19.25-21.00 | Do you need to do bundles, | Full-bleed B-roll + overlay | off | Dryft Hold product (rot 90° CW) | 0:10.0-0:11.75 | Row 03 expands to full frame | 03 BUNDLES? | 1.75 | Mask expand in and out of row 03 |
| 21.00-22.40 | what emails to send and when, | Sean + playbook | LEFT, M | none | A | Row 04 + envelopes 1→2→3 | 04 EMAILS / WHAT + WHEN | 1.40 | Accordion, send swish |
| 22.40-25.00 | and what to actually look at once Black Friday is live. | Graphic-dominant | LEFT, S | none | A | Card widens, 3 chips | 05 LIVE NUMBERS / WHAT DO YOU WATCH? / SPEND · SALES · PROFIT | 2.60 | Sean shrinks 0.5s, data ticks |
| 25.00-27.55 | I'm going to walk through all of this | Sean + playbook recap | LEFT, M | none | A | All rows ticked | BLACK FRIDAY PLAYBOOK 01-05 | 2.55 | Sean grows 0.5s, one chime |
| 27.55-31.00 | on our free live webinar on October 14th. If that's something | Full-screen event card | off | none | n/a | Calendar tile | FREE LIVE / BLACK FRIDAY WEBINAR / OCTOBER **14** / WED 1:30 PM PT | 3.45 | Blur-push up, impact on date |
| 31.00-32.40 | that you think might be helpful for you, | Sean full-screen | CENTRE, L | none | A 31.00-32.40 | OCT 14 chip | OCT 14 | 1.40 | Tile shrinks to chip, Sean scales in |
| 32.40-34.35 | just click the link below and register for the webinar. | Sean + CTA | RIGHT, M | none | A 32.40-34.35 | CTA stack + bobbing arrow | REGISTER **FREE** / OCTOBER 14 / LINK BELOW ↓ | 1.95 | 0.5s glide, click SFX |
| 34.35-37.00 | It's completely free. | Sean + CTA end | RIGHT, M→MT push | none | A 34.35-36.38 + 0.62s freeze | Headline roll + logo | 100% **FREE** / OCTOBER 14 / REGISTER NOW ↓ | 2.65 | Hold to last frame |

---

## SOUND DESIGN

Voice is the spine: about -14 LUFS integrated, peaks at -1 dBTP. Music bed is a minimal, modern pulse at about -26 LUFS, ducked a further 4 dB under the voice. Every SFX sits 10-14 dB under the voice.

| Time | Cue |
|---|---|
| 00.55 | Soft branded low impact (DOUBLE) |
| 04.08 | UI tick (FREE) |
| 08.50 | Soft air on card rise |
| 13.50 | Single gentle transition swell |
| 16.00 | Soft card slide |
| 16.70 | UI tick (01) |
| 18.10 | Light card-deal (02) |
| 19.25 | Soft transition swell (bundles) |
| 21.20 | Soft send swish (04) |
| 22.70 / 22.85 / 23.00 | Light data ticks (05 chips) |
| 27.00 | One soft confirm chime (recap) |
| 28.90 | Small clean impact (October 14) |
| 32.55 | Soft click ("click the link") |
| 34.40 | Soft click (100% FREE) and the music resolves |

Avoid: cash registers, meme hits, whoosh stacks, alarms, cinematic booms.

---

## FINAL CREATIVE CHECK

1. **Sean as presenter and anchor:** yes. On screen about 70% of runtime, including both the hook and the CTA.
2. **Floating-head feels designed:** yes. Seven planned positions across four presets, with depth-layering behind the playbook card and one full-screen trust beat.
3. **Black Friday obvious immediately:** yes. "BLACK FRIDAY" is in the hero text at 01.00 and in the subtitle from 01.39.
4. **"Double" as a goal:** yes. "DOUBLE YOUR BLACK FRIDAY REVENUE?" uses a question mark, matching the landing page's no-guarantee disclaimer.
5. **Webinar clearly free:** yes. FREE appears at 04.08, on the event card, in the CTA, and as the final word.
6. **8- and 9-figure section credible:** yes. Real stage and event footage of Sean, with the Shoptalk badge visible and the Rebuy stats neutralised.
7. **B-roll relevant to the words:** yes. Only 3 clips, each mapped to its sentence.
8. **Product clips as context only:** yes. The overlay is a question, there are no brand names on screen, and usage rights are flagged.
9. **Playbook is one cohesive system:** yes. One card for 11.55s, and even the bundles B-roll grows out of and returns into row 03.
10. **Five topics easy to understand:** yes. One active row at a time, with a mini-graphic of 0-2 words each.
11. **Graphics readable:** yes. The minimum state is 1.2s and the heaviest text screens get 2.3-3.5s.
12. **No flash cuts:** yes. No shot is under 1.2s and every transition is 0.3-0.45s.
13. **October 14 unmistakable:** yes. Full-screen calendar tile, in the only orange on its card, and on screen for 8.15s in total.
14. **REGISTER FREE clear:** yes. On the event card, then as the CTA headline, then REGISTER NOW with LINK BELOW ↓.
15. **Normal bottom subtitles:** yes. Locked at y 1240, centred, within Meta safe zones.
16. **White dominant:** yes. 22 of 25 rows are all white.
17. **Blue Tint and Flame used sparingly:** yes. Subtitles have one Blue Tint italic and two Flame words. Graphics put Flame on DOUBLE, FREE (x2, in different scenes), 14, the LIVE dot, and the final FREE.
18. **Every visual supports the sentence spoken:** yes. Each state change is pinned to its spoken keyword.

---

## OPEN ITEMS FOR ANNA (decisions, not blockers)

1. **End-frame logo:** EcomIQ (landing page brand) or Pacific IQ (what Sean says and wears)? This plan assumes EcomIQ.
2. **Usage rights:** confirm Dryft and Sweet E's footage is cleared for paid Meta placement.
3. **Webinar time line:** "WED · 1:30 PM PT · 4:30 PM ET" is from the landing page. Keep it if the ad targets both coasts, or drop it for a cleaner card.
4. **Timing:** today is October 6 and the webinar is October 14, so this ad needs to be live by about October 8 to earn meaningful delivery before the event.
