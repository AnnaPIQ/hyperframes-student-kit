# EcomIQ · "Your ads are spending. Are they selling?" · Review Call · 9:16 Meta

**Complete editing plan, v4.** A-roll with designed interruptions, not a cut-up social ad.

| | |
|---|---|
| Platform / format | Meta Ads (Reels, Stories, Feed 9:16), 1080 × 1920, 25 fps (matches A-roll) |
| Objective | Shopify founders spending on paid ads book a free call |
| Final length | **40.70s** |
| A-roll source | `Ad - Your ads are spending. Are they selling? \| Review call.mov` (ProRes, 3840 × 2160, 25 fps, 41.20s, single locked-off take) |
| Style reference | **`video-projects/my-meta-ad/DESIGN.md`** (EcomIQ design spec) together with the EcomIQ ad recipe (`.claude/skills/ecomiq-ad/references/ad-recipe.md`). See "Style reference applied" below |
| Timing basis | Word-level transcription of the actual A-roll (faster-whisper small.en) plus silence detection. Every timestamp is measured, not estimated. Word timings (in source time): `assets/aroll.words.json` |
| Timeline rule | **A-roll in-point = source 0:00.30 (head trim).** Timeline time = source time minus 0.30s. Sean's audio then runs unbroken from timeline 0.00 to 38.90. Nothing is cut out of his delivery, so there are no jump cuts to hide. Every visual change sits on top of one continuous performance |

### v2 changes
- **Head trim applied.** The first 0.30s of silence is removed. Sean's first word ("Shopify") now lands at **0.32s**. Every timestamp in this document is on the trimmed timeline. Source timecodes for B-roll are unchanged. (The A-roll only has 0.62s of silence before the first word, so 0.30s is the most that can be removed without clipping "Shopify".)
- **Mob Armor sign-off confirmed.** Use of the Mob Armor name, logo, product footage and the +500% claim is approved.
- **Style reference = DESIGN.md.** The type, colour, motion and layout rules are re-aligned to the EcomIQ design spec and recipe. Details are in the next section.

### v4 changes
- **End card simplified.** The "Spend → Click → Store → Fix" line is removed. "Free." is plain White sans, not italic. The ad now has a single serif italic word ("*return.*").
- **Placement.** Subtitles sit at the bottom of the frame. The EcomIQ logo sits higher, at y 150.

### v3 changes
- **Highlights cut back hard, so the ones that remain land.** Serif italic goes from 4 words to 2. Blue Tint word highlights go from about 12 to 2. Flame goes from 8 uses to 3 story moments. Subtitle highlights go from 4 rows to 2. The three decorative Flame accent lines are removed. Full rules in "Highlight budget" below.

---

## Style reference applied (DESIGN.md + EcomIQ ad recipe)

| DESIGN.md / recipe rule | How this plan applies it |
|---|---|
| **Headline signature:** one italic-serif emphasis word (Hedvig Letters Serif) over bold Rethink Sans. The emphasis word is **Blue Tint** | Used **once in the whole ad**, on the pain point: "with the ***return.***" (Card A). Every other headline, including "Free." on the end card, is plain White sans |
| Blue Tint = "secondary accent, highlights, **italic emphasis**" | Serif words are Blue Tint, not Flame. Beyond those, Blue Tint marks only two words in the graphics ("$20K+" and "IN 1 YEAR") plus the lit state of journey nodes |
| **Flame Orange = the only hot accent** (CTAs, emphasis) | Flame appears at exactly **three story moments**: the problem thread (LOST, which becomes FIX THIS FIRST), the proof (+500%) and the CTA (BOOK NOW). Never two at once |
| **Flame accent rule** that wipes in (scaleX 0 to 1) | **Not used in this ad.** A decorative Flame line would spend the colour on nothing. The three Flame moments above are the accents |
| Eyebrow: tracked caps in **Blue Tint** | Eyebrows here are **Sky Blue**, not Blue Tint, so they read as quiet labels rather than highlights. Rethink Sans Bold 30 px caps, +12% tracking |
| Big headlines at **-2% tracking**, about 100% leading. Never reset tracking to 0 | All hero type -2%, line-height 1.0 |
| Canvas: navy + faint Sky radial at the top (separates the logo) + **Gradient 2 (blue to flame) bloom** in the lower third at about 0.38 opacity. **Never put body copy over a bloom** | Cards use navy + a faint Sky radial at the top + a Gradient 2 bloom at 0.32 opacity, positioned **below y 1720**, under the subtitle line and clear of all text |
| Logo: `ecomiq-logo-white.svg` on navy. Never stretched or recoloured | White lockup top-left on every Sean shot and card (not over B-roll). Centred and large on the end card |
| Safe area: **about 10% margins (108 px sides)** | Side margin raised from 64 px to **108 px** for all text |
| Easing: **power3.out** for type, **back.out(1.7)** for the CTA, **sine.inOut** breathing pulse on the CTA | Adopted as the motion defaults below |
| CTA: Flame pill, white text, **glow shadow** | BOOK NOW button spec updated (glow + breathing pulse) |
| "**Whip/blur transitions between scenes, never hard cuts**" | Scene changes into and out of B-roll and cards use a calm blur dissolve (T-BLUR). The only straight cuts left are crop changes within the same take, because a multi-cam switch is meant to read as a camera change, not an effect |
| Art direction: vibrant product imagery on navy | The Mob Armor product macro sits under a navy wash with the stat on top |
| Voice: precise, trustworthy, clarifying | On-screen copy stays plain and specific ("Find what to fix first.", "Where sales leak"). No hype words |

Placement decisions: the **logo sits at y 150** and the **subtitles sit at the bottom of the frame (bottom edge y 1670)**, both matching the live campaign and the recipe's 9:16 note. The CTA stays in the hero zone beside Sean so the BOOK NOW button is never under Meta's UI.

---

## Highlight budget (the whole ad)

Highlights only land if most of the ad has none. **Default is White, plain sans, no italics.** Everything below is the complete list. Nothing else gets colour, italics or emphasis.

| Treatment | Allowed uses | Where | Why there |
|---|---|---|---|
| **Serif italic** (Hedvig, Blue Tint) | **1** | "with the ***return.***" (Card A, 4.75) | The pain point. The only serif word in the ad, so it lands |
| **Flame** | **3 moments** | ① LOST (19.78), which carries over as FIX THIS FIRST (30.08), one thread · ② +500% (24.18) · ③ BOOK NOW (36.70 to end) | Problem, proof, action. The only three things a viewer must remember |
| **Blue Tint words** | **2** | "$20K+" (1.60) · "IN 1 YEAR" (26.18) | The qualifier and the claim's timeframe |
| **Subtitle highlights** | **2 rows** | "*missing.*" italic (row 17) · "Book Now" Flame (row 18) | The trust line has no graphic, so the subtitle carries it. The CTA is the payoff |
| Blue Tint as a graphic state | lit journey nodes only | spine dots, never words | It's structure, not emphasis |

**Never highlighted:** headlines other than the one serif word, "Free." on the end card (plain White), eyebrows, node sub-labels, "free call" in the graphics, "fix first" in subtitles, column headlines, the footnote.

**Gaps between highlights.** There is no serif, Flame or Blue Tint word on screen during 6.96 to 19.78 (12.8s of plain White), and none during 32.02 to 34.54. That quiet is what makes LOST, +500% and BOOK NOW hit.

---

## READ FIRST · Findings from the source review

1. **Sean's delivery differs from the script.** Subtitles follow what he actually says:
   - "then your ads **and your** offers"
   - "see where it's **getting** lost"
   - "the team that **have helped brands like** Mob Armor"
   - "**are gonna** go through it with you"
   - "**And** if your data can't give us a clear answer"
   - "Tap Book Now **and** choose a time"
   - 7.76 to 9.24: the transcriber heard "what **we** change first". The script says "we'd". **Editor: confirm by ear.** Plan uses "we'd" for both hero text and subtitle (a soft "we'd" commonly reads as "we").
2. **Sean breaks at 39.10.** He looks down at 39.3, turns away and touches his chin at 39.7. **Last usable Sean frame is 38.90.** An end card covers 38.90 to 40.70 and his audio fades out over 38.90 to 39.30.
3. **B-roll library issues found:**
   - **"Sean on Laptop" (row 4) is mislabelled.** It's Sweet E's client footage (Sean in a suit with Erica, a bakery interior), not laptop work. **Never use it near the Mob Armor proof.**
   - The 4K Sony clips (`Angle over laptop`, `Sean holding laptop talking to man`, `Sean and Mason standing talking to 2 woman`, `Zoom in to sean talk…`) are vertical shots stored sideways. **Rotate 90° clockwise in prep** (`ffmpeg -vf transpose=1`).
   - **The Shoptalk stage clip is the Rebuy session.** Most of it shows Rebuy platform stats on the screen (59x, 1.3B, 99.9%). Only use the window specified below. Never let Rebuy's numbers sit near the +500% claim.
4. **Mob Armor footage is clean.** `MOB MOUNT MAGNETIC.mp4` (Drive: Mob Armor folder) has 0:00 to 0:02 of dark, branded product macro with **no burned-in text**. `Mob Armor video (9-16).mp4` and the Aug social ad both have burned-in captions. Don't use those.
5. **Claim verified and approved.** `Mob_Armor_Case_Study_Updated`: total sales **+500% YoY**, monthly revenue 6.6x, **Aug 2025 to Aug 2026, source: Mob Armor Shopify sales data.** Sean's line ("brands like Mob Armor grow total sales by over 500% in a year") matches. Mob Armor sign-off confirmed.

---

## Canvas, safe zones and the house system

**Canvas** 1080 × 1920.

**Meta safe zones (Reels is the strictest, so design to it):**
- Top 270 px: no critical text (account bar). The logo sits in this band at y 150 (campaign position, recipe value). It is branding, not critical text.
- Bottom 670 px (35%): no critical text (caption, CTA button, icons).
- Sides: **108 px** text margin (DESIGN.md). The right-hand 120 px from y 900 to 1650 is the Reels icon rail, so keep it clear.
- **Hero text zone: y 300 to 1120, x 108 to 972. Subtitle zone: bottom of frame, bottom edge locked at y 1670** (campaign position, inside the Stories safe zone; on Reels the bottom UI can overlap the lowest line, accepted by decision).

**Logo.** `ecomiq-logo-white.svg`, top-left, x 108, y 150, 260 px wide. Present on every Sean shot and card. Hidden over B-roll. Centred at 460 px wide on the end card. Wrap it in a non-clip positioned div (see LESSONS.md).

**Type.**
- **Rethink Sans:** hero 96 to 160 px Bold or ExtraBold, -2% tracking, 1.0 leading. Labels 40 to 44 px Bold caps, +6% tracking. Supporting text 28 to 32 px Medium. Eyebrows 30 px Bold caps, +12% tracking, Sky Blue.
- **Hedvig Letters Serif italic, Blue Tint:** two words in the whole ad (see the highlight budget).

**Colour meanings (fixed for the whole ad):**

| Colour | Hex | Means | Used for |
|---|---|---|---|
| Navy | #06284C | the EcomIQ space | card backgrounds, column panels, scrims |
| White | #FFFFFF | the message | all primary type and subtitles |
| Blue Tint | #9CD4FF | emphasis (rare) | the 1 serif word, "$20K+", "IN 1 YEAR", lit journey nodes. Nothing else |
| Sky Blue | #DEEEFE | structure | eyebrows, node sub-labels (at 80%), spine line, unlit nodes (at 35%), dividers, top radial on cards |
| Flame Orange | #FF4C32 | **the one thing that matters** | three moments only: LOST → FIX THIS FIRST, "+500%", BOOK NOW. Never two Flame items on screen at once |
| Black | #000000 | not used | |

**Card background.** Navy #06284C, a faint Sky Blue radial at the top (behind the logo, 8% opacity), and a Gradient 2 bloom (Blue Tint to Flame, blurred 160 px, 0.32 opacity) sitting below y 1720 so no text, including subtitles, ever sits on it. No grids, no grain on type, no glitch.

**Motion grammar (calm, premium, per the recipe):**

| Code | Name | Spec |
|---|---|---|
| T-RISE | Navy rise | Card slides up 6% and fades in over 0.35s (power3.out). Sean's frame underneath scales 100 to 103% and dims to 70% as the card covers him |
| T-DROP | Card release | Card fades out and drifts down 4% over 0.30s (power2.in), revealing Sean |
| T-MORPH | Panel morph | Navy panel resizes between full screen and the left column over 0.50s (power2.inOut). Spine elements tween position and scale. They are never re-drawn. **One composition evolving** |
| T-SHIFT | Crop shift | Straight cut between two crops of the **same take**, always on a breath or pause. Reads as a camera change, not a jump |
| T-BLUR | Blur dissolve | 0.24s crossfade. The incoming shot resolves from 10 px blur to sharp, and the outgoing one blurs to 6 px. Used for every change into or out of B-roll (the recipe's "never hard cuts" rule) |
| T-WASH | Navy wash | Navy rises over footage to 85% opacity over 0.40s. Footage keeps moving underneath |

**Text entrances:** fade plus 24 px rise, 0.40s, **power3.out**, 0.12s stagger between lines. **Text exits:** 0.25s fade. **No text ever appears for less than 1.4s.**

**A-roll crop windows** (all cut from the 3840 × 2160 source, so no shot is upscaled more than 1.25x):

| Code | Crop | Window in 4K source (w × h @ x, y) | Scale | Sean's face sits at |
|---|---|---|---|---|
| **WIDE** | wide, centred | 1215 × 2160 @ 1450, 0 | 0.89x | centre, hands and mic visible |
| **MED** | medium, centred | 1080 × 1920 @ 1460, 120 | 1.00x (native) | centre |
| **TIGHT** | tight, centred | 864 × 1536 @ 1570, 250 | 1.25x | centre, head and shoulders |
| **MED-L** | medium, Sean left | 1080 × 1920 @ 1720, 60 | 1.00x | 30% from left, open wall on the right for text |
| **WIDE-R** | wide, Sean right | 1215 × 2160 @ 1180, 0 | 0.89x | 70% from left, open wall on the left for the column |
| **MED-R** | medium, Sean right | 1080 × 1920 @ 1300, 120 | 1.00x | 65% from left (a punch-in on WIDE-R) |

"Push" means a slow scale on the crop: 100 to 104% across the shot, sine.inOut. Maximum one push per shot, and never on two consecutive shots.

---

## PART 1 · Complete editing timeline

All times are timeline seconds on the trimmed edit (source time minus 0.30s). At 25 fps, 0.04s = 1 frame.

### SECTION 1 · Audience + problem · 0.00 to 6.96

**SHOT 1 · 0.00 to 4.64 (4.64s)**
- **Dialogue:** "Shopify founders doing $20,000 a month and up, spending on paid ads and…"
- **Visual type:** Sean with in-frame text build
- **A-roll treatment:** live, slow push 100 to 104%
- **Crop:** MED-L · **Sean position:** left third
- **B-roll:** none
- **Motion graphic:** right-hand text column, x 600 to 972, builds in three stages:
  - 0.40: eyebrow "SHOPIFY FOUNDERS" (Sky Blue, 30 px caps, +12%), y 420
  - 1.60 (on "$20"): **"$20K+ / MONTH"** (Blue Tint, 120 px Bold, -2%; "/ MONTH" at 44 px White), y 470
  - 3.50 (on "spending"): **"PAID ADS"** (White, 72 px Bold), y 640, with a Sky Blue hairline divider above it
- **Hero text:** SHOPIFY FOUNDERS · $20K+ / MONTH · PAID ADS
- **Subtitles:** rows 1 to 3 (white)
- **Transition out:** T-RISE into Card A. The eyebrow and $20K+ line morph up into Card A's eyebrow
- **SFX:** 1.60 soft text tick (-28 dB). 3.50 soft text tick
- **Why:** Sean opens the ad within 0.32s. The frame then evolves around him, so the viewer self-qualifies ($20K+, paid ads) before the problem lands.

**SHOT 2 · CARD A · 4.64 to 6.96 (2.32s)**
- **Dialogue:** "…not happy with what comes back."
- **Visual type:** full-screen branded graphic (first design interruption)
- **A-roll treatment:** hidden (audio continues)
- **Motion graphic:** Navy card (top radial plus low Gradient 2 bloom). Eyebrow at y 420: "$20K+/MO · PAID ADS" (Sky Blue, 30 px caps), carried over from Shot 1. Hero at y 520 to 820, centred:
  - "Not happy" (White, 150 px ExtraBold, -2%)
  - "with the ***return.***" (White 150 px, with "***return.***" in Hedvig Letters Serif italic, **Blue Tint**)
  - Lines enter at 4.75 and 4.95 (power3.out). No accent line, no Flame. The serif word is the only emphasis
- **Hero text:** NOT HAPPY WITH THE *RETURN.*
- **Subtitle:** row 4 (white)
- **Transition:** in T-RISE (4.64). Out T-DROP (6.96, in the pause after "back.")
- **SFX:** 4.64 soft low "thup" on the card (-24 dB)
- **Why:** The pain point gets its own full-screen beat and the first of only two serif words in the ad. Four words, 2.3s, one emphasis: readable at a glance.

### SECTION 2 · What we'd change first · 6.96 to 11.20

**SHOT 3 · 6.96 to 11.20 (4.24s)**
- **Dialogue:** "We'll show you what we'd change first, live on a free call."
- **Visual type:** Sean with in-frame phrase, two beats in one composition
- **A-roll treatment:** live, slow push 100 to 103%
- **Crop:** TIGHT (tighter than Shot 1, as briefed) · **Sean position:** centre
- **Motion graphic:** lower hero band, y 880 to 1120, x 108 to 972, centred, over a navy gradient scrim rising from y 820 (0% to 70%) so the type sits cleanly on his jacket:
  - Beat 1 at 7.76 (on "what"): **"What we'd / change first."** White, 96 px Bold, -2%, two lines. No highlight
  - Beat 2 at 9.60 (on "live"): beat 1 lifts 90 px and dims to 35% (a 0.4s tween). **"Live, on a / free call."** enters below, White 96 px. No highlight. Size and position do the work
- **Hero text:** WHAT WE'D CHANGE FIRST. → LIVE, ON A FREE CALL.
- **Subtitles:** rows 5 to 6 (white)
- **Transition:** in T-DROP from Card A. Out T-RISE (11.20, in the pause after "call.")
- **SFX:** 7.76 text tick. 9.60 soft tick
- **Why:** This is the promise, so Sean stays on screen and delivers it, closer than before (pseudo multi-cam). The two beats get 1.84s and 1.60s, and the first stays visible at 35%.

### SECTION 3 · Cost to win a customer · 11.20 to 14.14

**SHOT 4 · CARD B · 11.20 to 14.14 (2.94s)**
- **Dialogue:** "First, what it costs you to win a customer,"
- **Visual type:** full-screen explainer (first appearance of the journey spine)
- **Motion graphic:** Navy card.
  - Headline at y 330 to 560: **"What it costs / to win a customer."** (White, 84 px Bold, -2%, no highlight), entering at 11.30
  - Journey spine below at y 640 to 1110: 4 nodes on a vertical Sky Blue line (see Part 3). The line draws top to bottom from 11.50 to 12.10. Nodes appear as unlabelled Sky Blue 35% dots
  - At 12.26 (on "costs"): node 1 lights Blue Tint. Label **"SPEND"** (White, 44 px caps) and sub-label **"Cost per customer · CAC"** (Sky Blue 80%, 30 px)
- **Hero text:** WHAT IT COSTS TO WIN A CUSTOMER. · SPEND · Cost per customer · CAC
- **Subtitle:** row 7 (white)
- **Transition:** in T-RISE. Out T-MORPH (14.14): the card shrinks into the left column as Sean slides in
- **SFX:** 12.26 soft click as SPEND lights. Gentle 0.6s rising "line" tone as the spine draws (-30 dB)
- **Why:** This is the first explainer. One headline, one lit stage and the acronym explained in plain English. No dashboard.

### SECTION 4 · Ads and offers · 14.14 to 16.44

**SHOT 5 · SPLIT A · 14.14 to 16.44 (2.30s)**
- **Dialogue:** "then your ads and your offers."
- **Visual type:** split composition. Sean right, spine column left
- **A-roll treatment:** live, no push
- **Crop:** WIDE-R · **Sean position:** right
- **Motion graphic:** Navy column panel (x 0 to 540, full height, 92% navy, a Sky Blue 20% hairline on its right edge). Same spine, scaled to 80%, at y 420 to 1100 (spine x 150, labels from x 200). SPEND stays Blue Tint with a small check, and its sub-label shortens to "CAC".
  - At 14.52 (on "ads"): node 2 lights. Label **"CLICK"** and sub-label **"Ads + offers"** (Sky Blue 80%)
- **Hero text:** CLICK · Ads + offers
- **Subtitle:** row 8 (white)
- **Transition:** in T-MORPH (14.14). Out T-SHIFT (16.44, in the pause after "offers.")
- **SFX:** 14.52 soft click
- **Why:** No montage. The same composition evolves and Sean comes back into frame. The viewer learns that the spine is the system.

### SECTION 5 · Follow the click · 16.44 to 21.30

**SHOT 6 · SPLIT B · 16.44 to 21.30 (4.86s)**
- **Dialogue:** "Then we follow the click through your store and see where it's getting lost."
- **Visual type:** split composition, punched in. The spine animates inside the frame
- **A-roll treatment:** live, no push (the crop change is the move)
- **Crop:** MED-R (punch-in from WIDE-R, which reads as a second camera) · **Sean position:** right
- **Motion graphic:** same left column. Column headline at y 330: **"Follow the click."** (White, 56 px Bold, -2%), entering at 16.84.
  - 17.30 (on "click"): a 22 px White **dot** appears on CLICK and travels down the line
  - 18.22 (on "store"): the dot reaches node 3, which lights Blue Tint. Label **"STORE"** and sub-label **"After the click"**
  - 19.18 to 19.78: the dot continues toward node 4
  - 19.78 (on "lost"): the dot slips sideways off the line and fades (0.5s). Node 4 turns **Flame**. Label **"LOST"** (Flame) and sub-label **"Where sales leak"**
  - Static hold from 20.30 to 21.30
- **Hero text:** FOLLOW THE CLICK. · STORE · LOST
- **Subtitles:** rows 9 to 10 (white)
- **Transition:** in T-SHIFT (16.44). Out T-BLUR (21.30, in the 0.98s pause before "Specialists")
- **SFX:** 17.30 to 18.22 a very light "travel" whoosh under the dot (-32 dB). 18.22 soft click. 19.78 a short, low, muted drop tone (not an alarm, -26 dB)
- **Why:** This is the core visual idea of the ad. It stays beside Sean for 4.86s with one moving object, and the full graphic holds still for 1.0s after the final change.

### SECTION 6 · Mob Armor proof · 21.30 to 27.30

**SHOT 7 · B-ROLL · 21.30 to 22.84 (1.54s)**
- **Dialogue:** "Specialists from the team that have helped brands…"
- **Visual type:** B-roll (authority)
- **B-roll:** `Sean talking on stage at Shoptalk - rebuy` · **source 0:14.60 to 0:16.14**
- **Treatment:** 9:16 crop centred on Sean (the source is 1080p, so this is a 1.78x enlargement. Add light grain to mask softness). Slow push 100 to 103%. Logo hidden
- **Motion graphic:** none
- **Subtitle:** row 11 (white)
- **Transition:** in T-BLUR (21.30). Out T-BLUR on "like" (22.84)
- **SFX:** soft room-tone swell from the stage clip at -30 dB, under Sean's VO
- **Why:** "Specialists" needs instant credibility, and Sean on a Shoptalk stage gives it in one held shot. **This window shows Sean and his PacificIQ title card only. Do not extend into the Rebuy stats.**

**SHOT 8 · MOB ARMOR PROOF · 22.84 to 27.30 (4.46s)** · full detail in Part 4
- **Dialogue:** "…like Mob Armor grow total sales by over 500% in a year"
- **Visual type:** approved client footage, then a full-screen stat card in one composition
- **B-roll:** `MOB MOUNT MAGNETIC.mp4` · **source 0:00.00 to 0:02.00 at 60% speed** (fills 3.33s), then hold the last frame under the wash
- **Motion graphic:** Mob Armor wordmark at 23.10. T-WASH at 24.10. **"+500%"** counts up from 24.18 to 25.70 (Flame). **"TOTAL SALES"** (White) and **"IN 1 YEAR"** (Blue Tint) follow
- **Hero text:** MOB ARMOR · +500% · TOTAL SALES · IN 1 YEAR
- **Subtitles:** rows 12 to 13 (white)
- **Transition:** in T-BLUR (22.84). Out T-BLUR (27.30)
- **SFX:** controlled count-up ticks from 24.18 to 25.70 (-30 dB), then a single soft impact as it lands (-22 dB)
- **Why:** This is the hero proof moment. The claim never appears without the Mob Armor name and Mob Armor product on screen.

### SECTION 7 · Go through it with you · 27.30 to 29.14

**SHOT 9 · B-ROLL · 27.30 to 29.14 (1.84s)**
- **Dialogue:** "…are gonna go through it with you."
- **Visual type:** B-roll (collaboration)
- **B-roll:** `Sean holding laptop talking to man` · **source 0:03.00 to 0:04.84** (rotate 90° CW)
- **Treatment:** full-bleed 9:16 (the source is 4K, so it's native), no push. Logo hidden
- **Motion graphic:** none (an understated beat, and the subtitle carries the line)
- **Subtitle:** row 14 (white)
- **Transition:** in T-BLUR (27.30, on "gonna"). Out T-BLUR (29.14, in the breath inside "You'll")
- **SFX:** none
- **Why:** This shows the "with you" part literally: Sean, laptop open, walking a founder through it. A split screen was considered and rejected. At 1.84s it would halve both images for no gain.

### SECTION 8 · What to fix first · 29.14 to 32.02

**SHOT 10 · SPLIT C · 29.14 to 32.02 (2.88s)**
- **Dialogue:** "You'll come away knowing what to fix first."
- **Visual type:** split composition, spine callback
- **A-roll treatment:** live, slow push 100 to 103%
- **Crop:** MED-R · **Sean position:** right
- **Motion graphic:** the left column returns with the full spine already in its Section 5 end state (SPEND, CLICK, STORE lit). Column headline **"What to fix first."** (White, 56 px Bold, -2%, no highlight. The Flame pill is the emphasis), entering at 29.30.
  - 30.08 (on "what"): node 4 (LOST) cools to Sky Blue 35% (the Flame moves). Node 3 (STORE) gains a Flame ring, and a **Flame pill "FIX THIS FIRST"** (White text, 34 px Bold caps, soft Flame glow) slides out from STORE toward the column's right edge
  - Static hold from 30.50 to 32.02
- **Hero text:** WHAT TO FIX FIRST. · FIX THIS FIRST
- **Subtitle:** row 15 (white. The graphic already carries "fix first" in Flame, so the subtitle stays plain)
- **Transition:** in T-BLUR. Out T-SHIFT (32.02, in the pause after "first.")
- **SFX:** 30.08 soft decisive click (the "identified" sound)
- **Why:** The same system pays off. Last time the click was lost after the store. Now the store is the thing you fix first. There's still only one Flame on screen.

### SECTION 9 · If the data isn't clear · 32.02 to 36.44

**SHOT 11 · 32.02 to 36.44 (4.42s)**
- **Dialogue:** "And if your data can't give us a clear answer, we'll tell you what's missing."
- **Visual type:** Sean only. The quiet trust section
- **A-roll treatment:** live, very slow push 100 to 103%
- **Crop:** WIDE · **Sean position:** centre
- **Motion graphic:** none. Logo only
- **Hero text:** none (the optional "WHAT'S MISSING" label was evaluated and dropped, because the line is stronger with an empty frame)
- **Subtitles:** rows 16 to 17 (white, with "missing." in italic)
- **Transition:** in T-SHIFT (WIDE after MED-R, which reads as the frame stepping back). Out T-SHIFT (36.44)
- **SFX:** none. Pull the music bed down 2 dB here
- **Why:** The honesty line gets the most space in the ad: 4.42s, the widest frame, no graphics.

### SECTION 10 · CTA · 36.44 to 40.70

**SHOT 12 · 36.44 to 38.90 (2.46s)**
- **Dialogue:** "Tap Book Now and choose a time."
- **Visual type:** Sean with CTA beside him
- **A-roll treatment:** live, no push
- **Crop:** MED-L · **Sean position:** left (mirrors the opening frame)
- **Motion graphic:** right column, x 600 to 972:
  - 36.50: **"Free call."** (White, 72 px Bold, -2%), y 560
  - 36.70 (on "book"): **"BOOK NOW ↓"** button. Flame pill fill, White 52 px Bold text, full-round radius, Flame glow (`0 10px 40px rgba(255,76,50,0.45)`), y 700. Enters with scale 0.85 to 1.0 over 0.45s (**back.out(1.7)**), then a breathing pulse 100 to 103% (**sine.inOut**, 1.2s, yoyo) until the end of the ad
- **Hero text:** FREE CALL. · BOOK NOW ↓
- **Subtitle:** row 18 ("Book Now" in Flame)
- **Transition:** in T-SHIFT. Out at 38.90: T-RISE into the end card. The BOOK NOW button stays put while the navy rises around it, then glides to centre
- **SFX:** 36.70 soft CTA click (-22 dB)
- **Why:** Sean says it while the button is on screen, so the CTA is human and designed at the same moment.

**SHOT 13 · END CARD · 38.90 to 40.70 (1.80s)**
- **Dialogue:** none (fade Sean's audio out from 38.90 to 39.30, since he moves off-camera)
- **Visual type:** full-screen branded card (the recipe's CTA outro)
- **Motion graphic:** Navy card (top radial plus low Gradient 2 bloom), centred stack at y 420 to 1100:
  - EcomIQ logo (white, 460 px wide), y 420
  - "Find what to fix first." (White, 72 px Bold, -2%), y 620
  - "Free." (Rethink Sans ExtraBold, White, 84 px, not italic), y 720
  - **BOOK NOW ↓** (the same Flame button, carried over and still pulsing), y 860
- **Subtitle:** none
- **SFX:** music resolves. No extra hit
- **Why:** This covers Sean breaking character and gives the CTA a clean 1.8s still frame in the campaign's end-card format ("Three changes. Thirty minutes. Free."). The CTA is on screen for 4.2s in total (36.50 to 40.70).

---

## PART 2 · Visual composition plan (how the frame evolves)

```
 0.00 ┃ SEAN · MED-L ─────────── text builds beside him ($20K+ / PAID ADS)
 4.64 ┃   ▲ CARD A · navy · "Not happy with the return."           ← design interruption
 6.96 ┃ SEAN · TIGHT ─────────── lower-band phrase, two beats         ← crop change (closer)
11.20 ┃   ▲ CARD B · navy · spine is born · SPEND                    ← full-screen explainer
14.14 ┃ SPLIT · spine left │ SEAN WIDE-R ── CLICK                    ← card morphs into column
16.44 ┃ SPLIT · spine left │ SEAN MED-R ─── click → store → LOST     ← punch-in, graphic moves
21.30 ┃   ◆ B-ROLL · Sean on stage, Shoptalk                         ← one purposeful cutaway
22.84 ┃   ▲ MOB ARMOR · product → navy wash → +500%                  ← hero proof
27.30 ┃   ◆ B-ROLL · Sean + founder, laptop                          ← "with you"
29.14 ┃ SPLIT · spine left │ SEAN MED-R ─── FIX THIS FIRST           ← system pays off
32.02 ┃ SEAN · WIDE · nothing else ────────────────────────────────  ← quiet trust
36.44 ┃ SEAN · MED-L ─────────── Free call · BOOK NOW ↓              ← mirrors the opening
38.90 ┃   ▲ END CARD · navy · BOOK NOW ↓                             ← clean close
40.70 ┃
```

**Why this is not a talking-head-plus-B-roll cut:**
- **Sean is on screen for 29.2s of 40.7s (72%)**: 25.8s of A-roll plus 3.4s of him in B-roll. The longest stretch without his face is the 4.46s Mob Armor proof, and his voice carries it.
- **The same take produces six "cameras"** (WIDE, MED, TIGHT, MED-L, WIDE-R, MED-R). Every change lands on a breath, so it reads as multi-cam, not jump cuts.
- **One graphic system evolves across four appearances** (Card B, Split A, Split B, Split C) instead of four separate cards. It morphs between full screen and the column. It is never cut away and redrawn.
- **Only 2 general B-roll shots, plus 1 client proof shot.** Each one has a specific job.
- **Bookends:** the opening and the CTA use the same MED-L frame with a text column on the right, so the ad closes the loop.
- **A visual change every 3.4s on average.** The shortest shot is 1.54s and the longest is 4.86s.

---

## PART 3 · Core graphic system: the journey spine

**Structure.** A vertical line with 4 nodes, top to bottom. It is vertical because 9:16 is tall, it matches the campaign's existing "ceiling" graphic, and it reads like a scroll down the funnel.

| | Full-screen (Card B) | Column (Splits A, B, C) |
|---|---|---|
| Spine x | 220 | 150 |
| Node y (1 to 4) | 660, 800, 940, 1080 | 480, 640, 800, 960 |
| Node size | 40 px ring, 4 px stroke | 34 px ring |
| Label | 44 px Bold caps, White, x + 70 | 40 px, from x 200 |
| Sub-label | 30 px Medium, Sky Blue 80% | 28 px, max 320 px wide |
| Line | 4 px Sky Blue #DEEEFE at 60% | same |

**Node states:**
- **Unlit:** Sky Blue ring at 35%, no label
- **Lit:** Blue Tint fill, White ring, label and sub-label rise in (0.40s, power3.out, 0.12s stagger)
- **Done:** Blue Tint ring with a small White check, label dims to 70%
- **Problem:** Flame fill, Flame label
- **Fix:** Flame ring with the "FIX THIS FIRST" pill

**The stages:**

| Stage | Exact text | Lit at | Colour | Animation | On screen (readable hold) | How it hands on |
|---|---|---|---|---|---|---|
| 1 · SPEND | "SPEND" / "Cost per customer · CAC" (column: "CAC") | 12.26 (Card B) | Blue Tint | line draws in 0.6s, node scales 0 to 100% (back.out 1.6), labels rise in | 1.88s on Card B, then visible as "done" until 21.30 | Card B morphs into the column (T-MORPH, 0.5s). The spine never disappears |
| 2 · CLICK | "CLICK" / "Ads + offers" | 14.52 (Split A) | Blue Tint | node lights, labels rise in | 1.92s in Split A, persists through Split B | Crop punch-in on Sean (T-SHIFT). The column stays identical, so the eye stays anchored |
| 3 · STORE | "STORE" / "After the click" | 18.22 (Split B) | Blue Tint | the White dot travels CLICK → STORE (0.92s, power1.inOut), node lights on arrival | 3.08s until 21.30 | dot continues to LOST |
| 4 · LOST | "LOST" / "Where sales leak" | 19.78 (Split B) | **Flame** | the dot slides 60 px right off the line and fades (0.5s). Node fills Flame | 1.52s, of which 1.0s is a static hold | blur to proof. On return (Split C) LOST cools to 35% |
| 5 · FIX FIRST | Pill: "FIX THIS FIRST" on STORE · headline "What to fix first." | 30.08 (Split C) | **Flame** pill, White text | the Flame ring draws round STORE (0.3s), the pill slides out 40 px (0.40s, power3.out) | 1.94s, static from 30.50 | T-SHIFT to Sean wide |

**Rules.** There is only ever one Flame element on screen. The spine is never shown with more than one new change at a time. Every change holds at least 1.4s before the next.

---

## PART 4 · Mob Armor proof sequence · 22.84 to 27.30

**Status:** Mob Armor sign-off confirmed for name, logo, product footage and claim.

**Is Sean on screen?** No, for 4.46s. He is on screen right before (Split B, to 21.30, with only the 1.54s Shoptalk shot between, which is also Sean) and right after (B-roll of him with a founder, then Split C). His voice carries the whole sequence.

| Time | Picture | Text | Colours |
|---|---|---|---|
| **22.84** (on "like") | T-BLUR from Shoptalk to **`MOB MOUNT MAGNETIC.mp4` source 0:00.00**, playing at 60% speed. Dark macro of a Mob Armor branded mount. 9:16 crop centred on the "MOB ARMOR" engraving (1080p source, 1.78x enlargement. The dark texture hides any softness). EcomIQ logo hidden | none | |
| **23.10** (on "Mob") | footage continues | **Mob Armor wordmark** (official white logo file), 360 px wide, centred at y 380, fades in 0.40s (power3.out) | White |
| **24.10** | T-WASH: navy rises to 85% over the footage (0.40s). Footage keeps drifting underneath, then holds its last frame from 26.17 | wordmark stays | Navy #06284C at 85% |
| **24.18** (on "grow total") | | **"+500%"** count-up from 0 to 500 (24.18 to 25.70, power2.out, so it decelerates and lands on Sean's "500"). 200 px ExtraBold, -2%, centred, y 520 to 720 | **Flame #FF4C32** |
| **24.52** (on "total sales") | | **"TOTAL SALES"**, 52 px Bold caps, +6% tracking, y 790 | **White #FFFFFF** |
| **26.18** (on "in a year") | | **"IN 1 YEAR"**, 40 px Bold caps, y 870 | **Blue Tint #9CD4FF** |
| **26.40** | | footnote: "Mob Armor Shopify sales data, Aug 2025 to Aug 2026", 22 px, y 1110 | Sky Blue at 70% |
| **26.18 to 27.30** | static hold | whole stat fully built, 1.12s still (the number has been on screen since 24.18, 3.12s in total) | |
| **27.30** (on "gonna") | T-BLUR to the laptop B-roll | | |

**Subtitles:** row 12 "like Mob Armor" and row 13 "grow total sales by over 500% in a year". Both all White, no highlight. The card is already doing the emphasis, so colouring the subtitle as well would double up.

**Transition in:** a blur dissolve from Sean on stage to the product, so authority hands directly to proof. **Transition out:** a blur dissolve on the "gonna" breath into the human "with you" moment.

**Misattribution guardrails:**
1. **The +500% never appears without the Mob Armor wordmark on screen.** Both stay up together until 27.30.
2. **Only Mob Armor's own product footage sits under the stat.** No Sweet E's, Dryft, Rebuy or Klaviyo footage anywhere in 21.30 to 29.14.
3. **The Shoptalk clip is a Rebuy session.** Use only 0:14.60 to 0:16.14, where the screen shows Sean's PacificIQ title card. Rebuy's stats (59x, 1.3B, 99.9%) must never be visible in this ad, because a viewer could read them as client results.
4. **"Sean on Laptop" in the sheet is Sweet E's footage.** It is not used.
5. **Wording matches the case study exactly:** total sales, over 500%, one year. Do not change it to "revenue" or "ROAS".
6. **Wordmark file:** use the official Mob Armor white wordmark from the Aug 2026 Mob Armor social ad project. Do not trace it from a frame grab.
7. The footnote supports the claim for Meta review. Keep it.

---

## PART 5 · B-roll pull list (lean)

| # | Clip name | Drive file | Source timecode | Appears | Duration | Purpose |
|---|---|---|---|---|---|---|
| 1 | Sean talking on stage at Shoptalk - rebuy | `1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z` | **0:14.60 to 0:16.14** | 21.30 to 22.84 | 1.54s | Specialist authority on "Specialists from the team". 9:16 crop on Sean, light grain. **Avoid the Rebuy stat screens** |
| 2 | MOB MOUNT MAGNETIC.mp4 (Mob Armor folder) | `1mvrHnD1hnjL5PQTaKVAXR1nD6Vaa2L0G` | **0:00.00 to 0:02.00 at 60% speed**, hold the last frame | 22.84 to 27.30 (clear until 24.10, then under the navy wash) | 4.46s | Ties +500% to Mob Armor's real product. No burned-in text in this window. Approved |
| 3 | Sean holding laptop talking to man | `1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu` | **0:03.00 to 0:04.84** (rotate 90° CW) | 27.30 to 29.14 | 1.84s | "go through it with you", shown literally |

**Considered and rejected:** Angle over laptop (an over-tight focus pull onto the PacificIQ leaf sticker, and it adds nothing Sean's own face isn't already doing), Sean and Mason with 2 women (overexposed and unstable), Klaviyo event space and booths (generic venue, no people at work), the hotel laptop clips (lifestyle, not analysis), Zoom/handshake (dark, crowded), "Sean on Laptop" (actually Sweet E's), and anything with driving, coffee or walking.

**Prep** (from the workspace root, after downloading into `assets/incoming/`):
```bash
# A-roll: apply the head trim at transcode time (source in-point 0:00.30), 4K H.264 intermediate
ffmpeg -ss 0.30 -i "assets/incoming/aroll.mov" -c:v libx264 -crf 16 -r 25 -c:a aac -b:a 256k -movflags +faststart video-projects/ecomiq-review-call-916/assets/aroll-4k.mp4

npm run prep -- assets/incoming/shoptalk.mp4  --project ecomiq-review-call-916 --mute
npm run prep -- assets/incoming/mob-mount.mp4 --project ecomiq-review-call-916 --mute
ffmpeg -i assets/incoming/holding-laptop.mp4 -vf transpose=1 -an -c:v libx264 -crf 18 assets/incoming/holding-laptop-rot.mp4
npm run prep -- assets/incoming/holding-laptop-rot.mp4 --project ecomiq-review-call-916 --mute
```
Keep the A-roll at 4K through the build. The crops need the 4K pixels.

---

## PART 6 · Pacing audit

**Measured against the rules (on the trimmed timeline):**

| Check | Result |
|---|---|
| Any shot under 1.0s | **None.** Shortest: Shot 7 at 1.54s |
| Any text or graphic visible under 1.5s | **None below 1.4s.** Two short labels sit at the edge and are accepted, because they are single words carried by a persistent graphic: "LOST" at 1.52s (it lives on as a dimmed node in Split C) and "PAID ADS" at 1.14s in Shot 1, which **is carried into Card A's eyebrow for another 2.32s, so 3.46s total** |
| Too many cuts in a short window | The busiest window is 21.30 to 29.14 (3 shots in 7.84s, an average of 2.6s each). This is within the 2 to 4s guideline. Every change lands on a word ("like", "gonna") and is softened by a blur dissolve |
| Text that may be hard to read | Smallest critical text: 28 px sub-labels in the column (about 9 pt on a phone). All are 3 words or fewer, high contrast on navy, and now shortened to fit 320 px ("CAC", "After the click", "Where sales leak"). The footnote (22 px) is deliberately non-critical |
| Anything that may feel like a flash | None. No card is under 2.3s and no graphic change is closer than 0.9s to the previous one |
| Head trim effect | The trim shortens only Shot 1 (4.94s to 4.64s). Its three text stages still get 4.24s, 3.04s and 1.14s (+2.32s carried). Nothing else changes length |

**Revisions made during the audit (v1 → v2):**
1. **Card A was 4.88 to 6.96 (2.08s).** Start moved to 4.64 (on "and") for **2.32s**. Four words now get a comfortable read.
2. **"PAID ADS" originally entered 0.58s before the card.** Moved it to 3.50 ("spending") and carried it into Card A's eyebrow, for 3.46s total.
3. **The Section 5 journey was a separate full-screen card** that took Sean off screen for 12.7s in a row. It is now a split beside Sean, which keeps the spine readable and brings back the A-roll anchor.
4. **Section 7 split screen (Sean plus laptop B-roll) dropped.** At 1.84s, two half-frames would have been a flash. It is now one full-bleed shot.
5. **The +500% stat originally cut away at 26.86** ("year" ends there, 0.3s after the full build). Extended to **27.30**, giving a 1.12s still hold and 3.12s with the number on screen.
6. **Optional "WHAT'S MISSING" label in Section 9: removed.** The trust line breathes.
7. **The CTA originally ended on Sean.** He turns away at 39.10, so the end card takes over at 38.90.
8. **Shoptalk window tightened to 0:14.60 to 0:16.14** to exclude Rebuy's stats.
9. **v2: hard cuts into and out of B-roll replaced with 0.24s blur dissolves** (DESIGN.md recipe). Column sub-labels shortened to fit the 108 px margins.

---

## PART 7 · Subtitle plan

**System:** Rethink Sans Medium 50 px, White #FFFFFF, sentence case (as in the live campaign), centred. **Bottom of frame, bottom edge locked at y 1670.** Two lines max, 864 px max width (inside the 108 px margins), 1.15 line height, soft shadow `0 2px 12px rgba(6,40,76,0.55)`, no box. On navy cards the shadow is unnecessary but harmless.

> **Placement:** matches the live campaign (bottom of frame). A soft navy gradient (no box) sits behind the subtitle line from y 1440 down, so white text stays readable over Sean's cream jacket and bright B-roll. The card glow is kept below y 1720 so subtitles never sit on it.

Each row stays up until the next row starts (gaps under 0.7s are bridged), so the subtitles never blink.

**Locked spellings (proper nouns and brand names, never auto-cased).** Subtitles are typed from this table, not auto-generated. Turn off any lowercase or title-case text transform in the subtitle style. After the build, check every row against these spellings:

| Always | Never |
|---|---|
| **Shopify** | shopify, SHOPIFY (in subtitles) |
| **Mob Armor** | mob armor, Mob armor, MobArmor |
| **Book Now** | book now, Book now |
| **EcomIQ** | Ecomiq, ecomIQ, Ecom IQ |
| **$20,000** | $20k, 20,000, $20 000 |
| **500%** | 500 percent, 500 % |

| # | In | Out | Exact subtitle (line break = /) | Default | Highlight | Hex | Italic |
|---|---|---|---|---|---|---|---|
| 1 | 0.32 | 1.60 | Shopify founders doing | White | none | | no |
| 2 | 1.60 | 3.50 | $20,000 a month and up, | White | none | | no |
| 3 | 3.50 | 4.64 | spending on paid ads | White | none | | no |
| 4 | 4.64 | 6.96 | and not happy / with what comes back. | White | none | | no |
| 5 | 6.96 | 9.60 | We'll show you / what we'd change first, | White | none | | no |
| 6 | 9.60 | 11.48 | live on a free call. | White | none | | no |
| 7 | 11.48 | 14.14 | First, what it costs you / to win a customer, | White | none | | no |
| 8 | 14.14 | 16.44 | then your ads and your offers. | White | none | | no |
| 9 | 16.44 | 18.52 | Then we follow the click / through your store | White | none | | no |
| 10 | 18.52 | 21.30 | and see where it's getting lost. | White | none | | no |
| 11 | 21.30 | 22.84 | Specialists from the team / that have helped brands | White | none | | no |
| 12 | 22.84 | 24.18 | like Mob Armor | White | none | | no |
| 13 | 24.18 | 26.86 | grow total sales by over 500% / in a year | White | none | | no |
| 14 | 26.86 | 28.66 | are gonna go through it with you. | White | none | | no |
| 15 | 28.66 | 32.02 | You'll come away knowing / what to fix first. | White | none | | no |
| 16 | 32.02 | 34.54 | And if your data can't give us / a clear answer, | White | none | | no |
| 17 | 34.54 | 36.44 | we'll tell you what's missing. | White | none | | **missing.** |
| 18 | 36.44 | 38.90 | Tap Book Now and choose a time. | White | **Book Now** | #FF4C32 | no |

**Tally:** 18 rows. **16 fully White.** 1 italic ("missing.", the trust line, where no graphic is on screen), 1 Flame ("Book Now", the CTA). No Blue Tint in subtitles at all. Rows 6 and 15 stay White on purpose: the graphics on screen at the same moment already carry those words.

---

## PART 8 · Final editor shot list

| # | TIMESTAMP | DIALOGUE | VISUAL | DUR | B-ROLL | GRAPHIC | HERO TEXT | SUB HIGHLIGHT | EDIT |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.00 to 4.64 | Shopify founders doing $20,000 a month and up, spending on paid ads and | Sean MED-L, push 100 to 104% | 4.64 | none | right-column text build | SHOPIFY FOUNDERS · $20K+ / MONTH · PAID ADS | none | A-roll in at source 0:00.30. Text at 0.40 / 1.60 / 3.50 |
| 2 | 4.64 to 6.96 | not happy with what comes back. | Card A, navy | 2.32 | none | headline | NOT HAPPY WITH THE *RETURN.* (the only serif word) | none | T-RISE in, T-DROP out |
| 3 | 6.96 to 11.20 | We'll show you what we'd change first, live on a free call. | Sean TIGHT, push 100 to 103% | 4.24 | none | lower-band phrase, two beats | WHAT WE'D CHANGE FIRST. → LIVE, ON A FREE CALL. | none | beat 2 at 9.60 |
| 4 | 11.20 to 14.14 | First, what it costs you to win a customer, | Card B, navy | 2.94 | none | spine born, SPEND lit | WHAT IT COSTS TO WIN A CUSTOMER. · SPEND · CAC | none | T-RISE in, T-MORPH out |
| 5 | 14.14 to 16.44 | then your ads and your offers. | Split: spine column + Sean WIDE-R | 2.30 | none | CLICK lights | CLICK · Ads + offers | none | T-MORPH in |
| 6 | 16.44 to 21.30 | Then we follow the click through your store and see where it's getting lost. | Split: spine column + Sean MED-R | 4.86 | none | dot travels, STORE lit, LOST in Flame | FOLLOW THE CLICK. · STORE · LOST | none | T-SHIFT punch-in, 1.0s hold, T-BLUR out |
| 7 | 21.30 to 22.84 | Specialists from the team that have helped brands | B-roll, full-bleed | 1.54 | Shoptalk stage 0:14.60 to 0:16.14 | none | none | none | T-BLUR in and out. Avoid the Rebuy stats |
| 8 | 22.84 to 27.30 | like Mob Armor grow total sales by over 500% in a year | Mob Armor product → navy wash → stat | 4.46 | MOB MOUNT MAGNETIC 0:00 to 0:02 @ 60% | wordmark, count-up, footnote | MOB ARMOR · +500% · TOTAL SALES · IN 1 YEAR | none | T-WASH at 24.10 |
| 9 | 27.30 to 29.14 | are gonna go through it with you. | B-roll, full-bleed | 1.84 | Holding laptop talking to man 0:03.00 to 0:04.84, rotate CW | none | none | none | T-BLUR in and out |
| 10 | 29.14 to 32.02 | You'll come away knowing what to fix first. | Split: spine column + Sean MED-R, push | 2.88 | none | FIX THIS FIRST pill on STORE | WHAT TO FIX FIRST. · FIX THIS FIRST | none | T-SHIFT out |
| 11 | 32.02 to 36.44 | And if your data can't give us a clear answer, we'll tell you what's missing. | Sean WIDE, slow push | 4.42 | none | none | none | "missing." italic | quiet, music -2 dB |
| 12 | 36.44 to 38.90 | Tap Book Now and choose a time. | Sean MED-L | 2.46 | none | right-column CTA, Flame pill with glow + breathing pulse | FREE CALL. · BOOK NOW ↓ | "Book Now" Flame | button at 36.70, back.out(1.7) |
| 13 | 38.90 to 40.70 | (none) | End card, navy | 1.80 | none | logo, CTA | FIND WHAT TO FIX FIRST. · FREE. (White, not italic) · BOOK NOW ↓ | (no subtitle) | T-RISE, Sean audio out 38.90 to 39.30 |

**Sound design summary:** all SFX between -32 and -22 dB under VO peaking around -6 dBFS. The palette is text ticks, soft clicks, one light travel whoosh, a muted drop tone, count-up ticks with one soft land, and a CTA click. **No** cash registers, coins, alarms, risers or booms. Optional music bed: calm, minimal, around -24 LUFS integrated under VO, -2 dB in Section 9, resolving on the end card.

---

## FINAL CREATIVE CHECK

| # | Question | Answer |
|---|---|---|
| 1 | Matches the style reference? | **Yes.** It is aligned to `my-meta-ad/DESIGN.md` and the EcomIQ recipe: the italic-serif Blue Tint signature (used once), Flame as the only hot accent, navy cards with a top radial and a low Gradient 2 bloom, -2% tracking, 108 px margins, power3.out type, a back.out CTA with glow and pulse, and blur dissolves instead of hard cuts between scenes. It also keeps the brief's grammar: long A-roll holds, crop changes and purposeful full-screen interruptions |
| 2 | Sean stays on screen longer? | **Yes.** 72% of runtime, and the longest gap without his face is the 4.46s Mob Armor proof |
| 3 | Frame evolving rather than cutting? | **Yes.** 6 crops from one take, one graphic that morphs, two splits that punch in |
| 4 | Clearly for Shopify founders on paid ads? | **Yes.** SHOPIFY FOUNDERS · $20K+ / MONTH · PAID ADS appears within 3.5s |
| 5 | "Not happy with what comes back" clear? | **Yes.** It gets its own full-screen card |
| 6 | "What we'd change first" strong? | **Yes.** In-frame hero on a tighter crop, then the free call |
| 7 | CAC understandable? | **Yes.** "What it *costs* to win a customer" with "Cost per customer · CAC" |
| 8 | Ads / offers / click-through-store clear? | **Yes.** CLICK = ads + offers, then the dot visibly travels into STORE |
| 9 | Journey system easy to understand? | **Yes.** 4 one-word nodes on one line, built one at a time |
| 10 | Mob Armor tied to +500%? | **Yes.** Wordmark, product and stat share one composition. Sign-off confirmed |
| 11 | Unrelated brands kept away? | **Yes.** No Sweet E's, Dryft or Rebuy stats anywhere near it |
| 12 | "What to fix first" outcome clear? | **Yes.** FIX THIS FIRST lands on the stage where the click was lost |
| 13 | Trust line has room? | **Yes.** 4.42s, widest frame, no graphics |
| 14 | BOOK NOW obvious? | **Yes.** Flame button with glow beside Sean, then centred on the end card, 4.2s total |
| 15 | Normal bottom subtitles? | **Yes.** Bottom of frame, fixed position, bottom edge y 1670 |
| 16 | White dominant? | **Yes.** 16 of 18 rows fully White |
| 16b | Brand names spelled correctly in subtitles? | **Yes.** Shopify, Mob Armor, Book Now and EcomIQ are locked spellings (Part 7). Subtitles are typed from the plan, never auto-cased |
| 17 | Blue Tint, Flame and italics sparing? | **Yes.** Fixed budget: 1 serif word, 2 Blue Tint words, 3 Flame moments, 2 subtitle highlights. 12.8s of plain White before the first Flame |
| 18 | No graphics too fast to read? | **Yes.** Every text element gets at least 1.4s, and most get 2 to 5s |
| 19 | No flash cuts? | **Yes.** Shortest shot is 1.54s, every change lands on a pause, and B-roll changes are blur dissolves |
| 20 | Every shot earns its place? | **Yes.** 13 shots, 3 B-roll, each with a stated job |

**Open item before build:** confirm "we'd" by ear at 7.76 to 9.24 (source 8.06 to 9.54).
