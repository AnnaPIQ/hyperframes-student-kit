# EcomIQ Meta Ad: "Three Changes" Store Review, Complete Edit Plan

**Format:** 9:16 vertical, 1080×1920, rendered at 30 fps (A-roll is 25 fps), Meta Reels / Stories / Feed 9:16
**Runtime:** 31.00 s (voice ends 28.84 s, CTA held 2.16 s after the last word)
**Timebase:** every timestamp below is the A-roll source timecode, and the edit runs 1:1 on it. There are no trims, so edit time = A-roll time. Snap to the nearest frame (0.04 s).


> **Build revisions (supersede the plan below where they differ)**
> 1. Head trimmed by 0.48 s so Sean is already looking at camera on frame 1. Every timestamp below is now 0.48 s earlier, and the runtime is 30.52 s.
> 2. Subtitles moved down to the lower position: block bottom edge at y 1670 (250 px above the frame edge).
> 3. Logo moved higher: top-left, x 64 / y 120.
> 4. Subtitle highlights cut to two: "Book Now" in #FF4C32 and "first" in italic. Everything else is white.
> 5. Graphics too brief to read were removed: the "TO MAKE YOUR STORE / MORE MONEY." lines, the "ECOMMERCE SPECIALISTS" label and the "YOUR STORE. WITH YOU." card. The +49% lockup and the DO THIS FIRST tag now hold longer.
> 6. End card reads "FREE" (white) over "Store Review" (white, title case), then the BOOK NOW pill.
> 7. Lip sync measured and corrected: the VO now runs 0.10 s later so voice and lips match within one frame.
> 8. Final masters: `final.mp4` here (9:16, 1080×1920) and `../three-changes-ad-4x5/final.mp4` (4:5, 1080×1350). H.264 High, CRF 12, 30 fps, BT.709, AAC 48 kHz, -14.4 LUFS. A-roll framing is baked with Lanczos (no browser scaling), so Sean's shots carry the camera's full detail.

---

## 0. What was analysed

| Input | What I found |
|---|---|
| **A-roll** `Ad - Three money-making opportunities.mov` | 3840×2160 ProRes, 25 fps, 31.08 s. Landscape 16:9, so the edit needs a 9:16 crop (1215×2160 window). That window still downsamples to 1080×1920, so **punch-ins up to 112% stay at native sharpness**. Sean sits just right of frame centre (face centre ≈ x 2010 px of 3840) against the blue-lit studio wall, in a cream quilted jacket, with the mic at the bottom of frame. His hands gesture mostly to frame-left, so **frame-right is the clean side for side graphics**. |
| **Style reference** `Revenue up, bank account empty - short - without captions` | 1080×1350 (4:5), 29.8 s. Rhythm: graphic, then Sean (~4.5 s), then a long run of navy graphic beats (~17 s), then Sean, then the end card. Navy radial-glow canvas, EcomIQ logo top-left on **every** frame (Sean shots included), bold Rethink Sans headlines in the upper-middle third, big empty lower half, gradient blue bars with small pill labels, one dark "account" card, previous lines dimmed to a muted Sky Blue when the next line arrives, and an orange pill CTA. |
| **B-Roll Short Cut** sheet (82 rows) | Opened every clip with a logged timecode or a strong candidate description and checked frames at the logged times. Results are in Part 3. Two sheet problems turned up: **"Sean on Laptop" (9–12 sec) actually links to *Sweet E's Sean and Erica - intro.MP4*** and shows Sweet E's footage, and the Klaviyo clip is only 7.9 s long, so its logged "0.07–0.11" runs past the end. |
| **Furbish Studio footage** | **None exists.** Drive search (title and full text) only returns 2022 documents: agreement, onboarding, project proposal deck, email setup and site scripts. There is nothing in the B-Roll Short Cut either. The Furbish moment is therefore built **text-led on a navy graphic**, and no other client's footage appears under the claim (Part 4). |
| **Proof bank** (EcomIQ paid-ads skill) | Furbish Studio: *Holiday online sales up 49% year on year. The case concerns **Q4 2022**.* So the chart must **not** say "LAST YEAR / THIS YEAR", because in a 2026 ad that would misdate the result. It uses **Q4 2021 vs Q4 2022**. |
| **Brand kit** `assets/ecomiq/` | `ecomiq-logo-white.svg` (use this one), Rethink Sans (local woff2), palette as briefed. |

### Script vs. actual delivery (subtitles follow the audio)

Word-level transcription of the A-roll:

| Time | Sean actually says | Difference from the written script |
|---|---|---|
| 0.00–3.92 | "Shopify founders doing $10,000 to $60,000 a month." | Matches |
| 3.92–9.54 | "We'll show you three changes to make your store more money on a free 30-minute call." | Matches |
| 10.14–16.06 | "Specialists from the team **that have helped brands like** Furbish Studio grow holiday online sales by 49% year on year" | **"that have helped brands like"** in place of "that helped" |
| 16.06–18.30 | "will go through your store with you." | Matches |
| 18.70–20.10 | "We'll show you what we'd change," | Transcriber heard "what would change". **Editor to confirm by ear.** Plan assumes "we'd". |
| 20.26–22.18 | "explain why each **of those** change(s) matters," | Adds **"of those"**. **Editor to confirm "change" vs "changes".** Plan assumes "changes". |
| 22.18–24.22 | "and tell you which to do first." | Matches |
| 24.22–28.84 | "Click Book Now and choose a time for your free EcomIQ store review." | Matches |

Natural pauses: **9.54–10.14** (0.60 s, used to hold FREE), **18.30–18.70** (0.40 s), **20.10–20.26**.

---

## 1. Global system (applies to every section)

### 1.1 Meta 9:16 safe zones (1080×1920)
| Zone | Pixels | Rule |
|---|---|---|
| Top UI band | y 0–270 | No logo, text or key content (Reels/Stories profile row) |
| **Logo slot** | x 72–302, y 290–345 | `ecomiq-logo-white.svg`, **230 px wide**, top edge y 290, left edge x 72. Never moves. |
| **Hero zone** | x 80–1000, y 380–1050 | All large type, charts and cards live here |
| **Subtitle zone** | x 110–970, y 1100–1248 | Bottom edge of the last subtitle line never below y 1248 |
| Bottom UI band | y 1248–1920 | Background only (Sean's jacket/mic, empty navy). Reels caption and CTA UI cover this. |
| Side margins | 65 px each side | Nothing essential outside x 65–1015 |

The logo sits lower than in the 4:5 reference on purpose. In 9:16 the reference position falls under Meta's profile header.

### 1.2 Logo rule
- **ON:** every navy graphic scene and every Sean A-roll scene, matching the reference, which keeps it on Sean too.
- **OFF:** real B-roll only (10.14–11.92 and 17.68–18.50). Those shots already carry Shoptalk / PacificIQ marks, and a third mark clutters them.
- Never animate, rescale or reposition it. It persists through dissolves with a hard on/off only at B-roll cuts.

### 1.3 Navy canvas (all full-screen graphics)
- Base fill **#06284C**.
- Soft glow: radial gradient of **#9CD4FF at 10% opacity**, centred at x 540 / y 760, radius ~900 px, fading to 0. This recreates the reference's lit centre without introducing a new colour.
- Optional faint grain (2–3%) for the premium texture. No black vignette, because black is reserved for light backgrounds only.

### 1.4 Typography
| Role | Font | Size | Colour |
|---|---|---|---|
| Hero headline | Rethink Sans ExtraBold, −2% tracking | 110–150 px | #FFFFFF |
| Hero number | Rethink Sans ExtraBold, −3% tracking | 200–220 px | per section |
| Supporting line | Rethink Sans Bold | 44–64 px | #FFFFFF or #DEEEFE |
| Eyebrow / label | Rethink Sans Bold, ALL CAPS, +8% tracking | 28–36 px | #DEEEFE or #9CD4FF |
| Chart labels | Rethink Sans SemiBold, ALL CAPS | 26 px | #DEEEFE |
| Subtitles | Rethink Sans SemiBold | 54 px, line-height 1.15 | #FFFFFF |

Two weights on screen at once, maximum. No serif and no decorative fonts. Italic appears only in two subtitle phrases.

### 1.5 Subtitle style (separate from hero text)
- Bottom-centre, centred text, max width 860 px, **1–2 lines, max ~26 characters per line**.
- Bottom edge of the block fixed at **y 1240** for the whole ad. Two-line blocks grow upward, single lines sit on the same baseline.
- Legibility: soft shadow `0 2px 14px` in **#06284C at 70%**. On the two bright B-roll shots (stage floor, sunlit window) add a **#06284C box at 70%**, 12 px radius, 14/22 px padding.
- In/out: 2-frame (0.08 s) fade. No pop, bounce or word-by-word karaoke.
- Present from 0.00 to 28.94. Off on the final hold.

### 1.6 Colour budget (audit)
| Colour | Where it appears |
|---|---|
| **#06284C Navy** | Every graphic canvas, side cards, subtitle shadow/box |
| **#FFFFFF White** | All headlines, subtitles, logo. **The dominant text colour.** |
| **#9CD4FF Blue Tint** | $10K / $60K, Q4 2022 bar, selected wireframe block, IMPACT card, "YEAR ON YEAR", FREE on end card, 2 subtitle words |
| **#DEEEFE Sky Blue** | Labels, eyebrows, wireframe lines, Q4 2021 bar, dimmed lines, dividers |
| **#FF4C32 Flame** | **Exactly 4 graphic moments:** FREE (9.04), +49% (15.06), DO THIS FIRST tag (23.84), BOOK NOW pill (25.04 → end), plus the subtitle words "Book Now" |
| #000000 Black | Not used |

The reference's end-card button uses an orange-to-amber gradient. **Do not copy it.** Use flat #FF4C32.

### 1.7 Motion language
- Easing `power2.out` for entrances (0.25–0.35 s), `power3.inOut` for re-layouts (0.35–0.45 s). Text enters with opacity 0→1 and a **12 px upward drift**. No scale-bounces except the BOOK NOW pill (gentle `back.out(1.4)`).
- Scene changes are **0.20 s (5-frame) cross-dissolves** between Sean/B-roll and navy, and **straight cuts on a syllable** between live-action shots.
- No whip-pans, glitches, flashes, shakes or countdowns.
- Discipline kept from `MOTION_PHILOSOPHY.md` (the brand brief overrides its black/chrome aesthetic): one idea per beat, rule of threes (01/02/03, 3 changes / 30 minutes / FREE), visual callbacks, and a breathing outro hold.

### 1.8 Audio
- VO dominant. Final mix about **−14 LUFS integrated, −1 dBTP**.
- Music: modern, premium, confident minimal electronic pulse, 100–115 BPM, no vocals. Sits **−18 to −22 dB under VO**, lifts ~3 dB on the 28.84–31.00 hold and ends on a clean button at 31.00.
- SFX all subtle (about −20 dB under VO peak). **No** cash registers, coins, alarms, meme sounds, booms or whooshes.

---

## PART 1: Complete edit timeline

### SECTION 1: Audience qualifier · 0.00–3.92
| Field | Detail |
|---|---|
| **Dialogue** | "Shopify founders doing $10,000 to $60,000 a month." |
| **Visual type** | Sean + side graphic card |
| **A-roll treatment** | 9:16 crop with Sean's face at **~36% of frame width** (crop window x ≈ 1575–2790 of 3840), which opens frame-right for the card. **Punch-in 100% → 106%**, linear over 0.00–3.92, anchored at the chin so his head never rises into the logo. If his hair touches the logo at 106%, cap the punch at 103%. Starts on Sean: no cold-open graphic. |
| **B-roll** | None |
| **Motion graphic** | Navy side card (#06284C at 88%, 24 px radius, 1 px #DEEEFE border at 20%), **x 690–1010, y 520–900**, over the blue wall to the right of his head. Stacked layout: |
| **Exact hero text** | `SHOPIFY FOUNDERS` (eyebrow, #DEEEFE, 30 px caps) · `$10K` (#9CD4FF, 104 px ExtraBold) · thin #DEEEFE divider line · `$60K` (#9CD4FF, 104 px) · `/ MONTH` (#FFFFFF, 40 px Bold) |
| **Animation** | Card fades in at 0.20 with the eyebrow · `$10K` rises in at **1.88** ("$10,000") · divider draws left to right 2.10–2.40 · `$60K` rises in at **2.40** ("$60,000") · `/ MONTH` at **3.62** ("month") |
| **Subtitle** | `Shopify founders doing` (0.00–1.88) → `$10,000 to $60,000 a month` (1.88–3.92) |
| **Subtitle highlight** | "$10,000 to $60,000" in **#9CD4FF**. Italic: No |
| **Edit / transition** | Opens on Sean, no fade from black |
| **SFX** | Music in at frame 0. No SFX. |
| **Why** | Instant self-identification ("this is for me") while the human anchor stays on screen. The range sits in a card, not full-screen, so Sean's face and eye contact carry the hook. |

### SECTION 2: "Three changes" · 3.92–5.98 (Sean 3.92–5.00, graphic from 5.00)
| Field | Detail |
|---|---|
| **Dialogue** | "We'll show you three changes" |
| **Visual type** | Sean (3.92–5.00) → full-screen navy graphic GFX-1 (from 5.00) |
| **A-roll treatment** | Hold at 106%. Side card fades out 4.50–4.80 (opacity + 12 px drop). |
| **B-roll** | None |
| **Motion graphic** | **GFX-1 beat A** (see Part 2) |
| **Exact hero text** | `01` `02` `03` → resolves to `3 CHANGES.` |
| **Animation** | 5.00 dissolve to navy · `01` 5.10 · `02` 5.30 · `03` 5.50 (one row, #FFFFFF, 150 px, centred at y 560) · **5.98** the row compresses into a small `01 · 02 · 03` (#DEEEFE, 36 px) at y 430 while `3 CHANGES.` rises in at 130 px, y 520–650 |
| **Subtitle** | `We'll show you three changes` (3.92–5.98) |
| **Subtitle highlight** | None (the graphic carries "3 changes") |
| **Edit / transition** | 0.20 s cross-dissolve Sean → navy at 5.00 |
| **SFX** | Soft click ×3 at 5.10 / 5.30 / 5.50. Very light settle tick at 5.98. |
| **Why** | Makes "three" countable and memorable without revealing store-specific recommendations. |

### SECTION 3: "To make your store more money" · 5.98–7.72
| Field | Detail |
|---|---|
| **Dialogue** | "to make your store more money" |
| **Visual type** | Full-screen graphic (GFX-1 continues, same canvas) |
| **A-roll treatment** | Off screen |
| **B-roll** | None |
| **Motion graphic** | **GFX-1 beat B**. Supporting lines under `3 CHANGES.` plus a simple store card. |
| **Exact hero text** | `TO MAKE YOUR STORE` (#DEEEFE, 44 px) at **6.50** · `MORE MONEY.` (#FFFFFF, 64 px ExtraBold) at **7.10** |
| **Visual** | Store card (x 270–810, y 800–1010): #DEEEFE 2 px outline, 20 px radius, minimal storefront glyph at left (awning + door, #DEEEFE line icon). At right a #9CD4FF line chart **draws upward** 6.84–7.60, ending in a small #9CD4FF ▲ chevron. No numbers, no axes. |
| **Subtitle** | `to make your store more money` (5.98–7.72) |
| **Subtitle highlight** | None |
| **Edit / transition** | No cut. Same canvas, new layer. |
| **SFX** | None (keep the clicks meaningful) |
| **Why** | One quick metaphor: same store, more money. No fake numbers, no dashboard. |

### SECTION 4: "On a free 30-minute call" · 7.72–10.14
| Field | Detail |
|---|---|
| **Dialogue** | "on a free 30-minute call." (+ 0.60 s pause) |
| **Visual type** | Full-screen graphic (GFX-1 beat C, **core lockup**) |
| **A-roll treatment** | Off screen |
| **B-roll** | None |
| **Motion graphic** | 7.72: store card, supporting lines and the small `01 · 02 · 03` fade out (0.25 s). `3 CHANGES.` re-lays to slot 1 (120 px, y 470) over 0.35 s. |
| **Exact hero text** | `3 CHANGES.` (#FFFFFF) / `30 MINUTES.` (#FFFFFF) / `FREE.` (#FF4C32). All 120 px ExtraBold, centred, stacked at y 470 / 610 / 750. |
| **Animation** | `30 MINUTES.` rises in at **8.14** (as "free 30-minute" begins) · `FREE.` lands at **9.04** ("-minute call") with a slightly firmer entrance (0.30 s, 16 px rise) and a faint #FF4C32 glow at 18% · lockup **holds still through the pause to 10.14** |
| **Subtitle** | `on a free 30-minute call` (7.72–10.14) |
| **Subtitle highlight** | None (FREE is already orange on screen) |
| **Edit / transition** | No cut inside. Hard cut out at 10.14 on the first syllable of "Specialists". |
| **SFX** | Subtle low impact at 8.14. Slightly stronger (still soft) impact at 9.04. |
| **Why** | The campaign's core lockup. FREE lands last and holds through Sean's natural pause, so the strongest accent gets the most screen time. No countdown timer. |

### SECTION 5: "Specialists from the team" · 10.14–11.92
| Field | Detail |
|---|---|
| **Dialogue** | "Specialists from the team that have helped brands like" |
| **Visual type** | Real B-roll ×2 (logo OFF) |
| **A-roll treatment** | Audio only |
| **B-roll clip 1** | **"Sean talking on stage at Shoptalk - rebuy"** → Drive file `Sean Clarke Pacific IQ.mp4` (1920×1080). **Source 00:12.60–00:13.62.** Edit 10.14–11.16. |
| **Crop note** | 9:16 window **x 750–1357 px** (of 1920): Sean on stage plus the "Sean Clarke / PacificIQ" speaker slide. This **excludes** the Rebuy stat wall on the left (59x / 1.3+ Billion / 99.9%) and the OLLY / Blenders logos and testimonial on the right. Slow push 100 → 104%. Light sharpening, because the shot is a 178% upscale. |
| **B-roll clip 2** | **"Sean walking around at Shoptalk Talking"** → `IMG_0185.MOV` (native vertical 2160×3840). **Source 00:04.80–00:05.56.** Edit 11.16–11.92. SHOPTALK lanyard and PacificIQ tee in frame, show floor behind. |
| **Motion graphic** | Small overlay label, both shots, 10.30–11.86: `ECOMMERCE` / `SPECIALISTS` (#FFFFFF, 44 px Bold caps, left-aligned at x 80, y 900–1010) with a 60 px #9CD4FF rule above it. No card. |
| **Subtitle** | `Specialists from the team` / `that have helped` (10.14–11.42, 2 lines) → `brands like Furbish Studio` (11.42–12.58) |
| **Subtitle highlight** | None. Subtitle box ON for these shots (bright floor). |
| **Edit / transition** | Hard cut in on "Specialists" (10.14). Hard cut 10.14 → 11.16 on "have". |
| **SFX** | None. Music only. |
| **Why** | Proves a real team with real industry presence: Sean speaking at Shoptalk and on the floor. No client brand is visible. |

### SECTION 6: "Furbish Studio" · 11.92–12.94
| Field | Detail |
|---|---|
| **Dialogue** | "Furbish Studio grow" |
| **Visual type** | Full-screen navy graphic **GFX-2** (Furbish proof) begins |
| **B-roll** | **No Furbish footage exists.** Do not use Sweet E's, Dryft, Mob Armor or any other client here. |
| **Motion graphic** | 0.20 s dissolve to navy at 11.92. `FURBISH STUDIO` (#FFFFFF, 56 px ExtraBold caps, y 420) rises in on "Furbish" (11.92), with eyebrow `CLIENT RESULT` (#DEEEFE, 28 px caps) above it at y 380. Logo ON. |
| **Subtitle** | `brands like Furbish Studio` (to 12.58) → `grow holiday online sales` (12.58–14.48) |
| **Subtitle highlight** | None |
| **Why** | The claim stays visually tied to Furbish Studio by name, which is accurate and avoids borrowed footage. Full detail in Part 4. |

### SECTION 7: "+49% holiday online sales" · 12.94–16.36 (HERO PROOF)
| Field | Detail |
|---|---|
| **Dialogue** | "holiday online sales by 49% year on year" |
| **Visual type** | Full-screen navy graphic (GFX-2 continues) |
| **Exact hero text** | `+49%` (#FF4C32, 210 px) · `HOLIDAY ONLINE SALES` (#FFFFFF, 52 px ExtraBold) · `YEAR ON YEAR` (#9CD4FF, 34 px caps) · bar labels `Q4 2021` / `Q4 2022` (#DEEEFE, 26 px caps) |
| **Animation** | 12.94 `HOLIDAY ONLINE SALES` in · 13.00–13.60 Q4 2021 bar grows to 160 px · 13.34–13.94 Q4 2022 bar grows to 160 px · **14.48–15.06** `+49%` counts up 0 → 49 while the Q4 2022 bar grows from 160 → **238 px** (exactly 1.49×) · `+49%` locks at **15.06** · `YEAR ON YEAR` at **15.42** · full lockup holds still to **16.36** |
| **Subtitle** | `grow holiday online sales` (12.58–14.48) → `by 49% year on year` (14.48–16.36) |
| **Subtitle highlight** | None. The full-screen +49% already owns the number, so a second orange 49% would compete. Kept white per the brief's own rule. |
| **Edit / transition** | 0.20 s dissolve navy → Sean at 16.36 (on "go") |
| **SFX** | 8–10 soft count-up ticks 14.48–15.06. One soft resolve tone at 15.06. |
| **Why** | The single proof point, given the most weight of any graphic. Exact claim, exact ratio, correct period. |

### SECTION 8: "Will go through your store with you" · 16.36–18.50
| Field | Detail |
|---|---|
| **Dialogue** | "will go through your store with you." (+ pause to 18.70) |
| **Visual type** | Sean (16.36–17.68) → store-review B-roll (17.68–18.50) |
| **A-roll treatment** | Same 36% framing as Section 1, at 104%. Logo ON. |
| **B-roll** | **"Sean holding laptop talking to man"** → `A_0004C078A260304_1210090O_CANON.MP4` (3840×2160, filmed sideways: **rotate 90° clockwise** for a native vertical frame). **Source 00:03.50–00:04.32.** Edit 17.68–18.50. Logo OFF. |
| **Motion graphic** | Small side text, same position as the Section 1 card: `YOUR STORE.` / `WITH YOU.` (#FFFFFF, 56 px ExtraBold, on the same navy card style). In at **17.32** ("store"), **carries across the cut** onto the B-roll and fades at 18.40. |
| **Subtitle** | `will go through` / `your store with you` (16.36–18.30, 2 lines) |
| **Subtitle highlight** | "with you" in **italic**, white. Subtitle box ON during the B-roll (bright window). |
| **Edit / transition** | Dissolve in from GFX-2 at 16.36 · hard cut to B-roll at 17.68 on "with" |
| **SFX** | None |
| **Why** | Brings Sean's face back after the graphic/B-roll run, then shows a literal laptop-in-hand, face-to-face review. Makes the call feel personal, not a sales pitch. |

### SECTION 9: "What we'd change" · 18.50–20.18
| Field | Detail |
|---|---|
| **Dialogue** | "We'll show you what we'd change," |
| **Visual type** | Full-screen navy graphic **GFX-3 beat 01** |
| **Exact hero text** | `01` (#9CD4FF, 48 px) above `WHAT WE'D` / `CHANGE.` (#FFFFFF, 96 px ExtraBold), y 500–720 |
| **Visual** | Phone-shaped ecommerce wireframe (x 330–750, y 760–1040, cropped at the bottom of the hero zone): header bar, hero banner, two product tiles and a button, all as #DEEEFE 2 px outlines at 45%. At **19.70** ("change") the hero banner block fills **#9CD4FF at 30%** with a 2 px #9CD4FF outline and one soft pulse. |
| **Subtitle** | `We'll show you what we'd change` (18.70–20.18) |
| **Subtitle highlight** | None |
| **Edit / transition** | 0.20 s dissolve B-roll → navy at 18.50. Logo back ON. |
| **SFX** | Light UI-selection tick at 19.70 |
| **Why** | Shows "we pinpoint a specific part of your store" conceptually, without inventing a recommendation. |

### SECTION 10: "Why each change matters" · 20.18–22.18
| Field | Detail |
|---|---|
| **Dialogue** | "explain why each of those changes matters," |
| **Visual type** | Full-screen graphic **GFX-3 beat 02** (same canvas) |
| **Re-layout at 20.18** | `01 WHAT WE'D CHANGE.` shrinks to a one-line list item (#DEEEFE at 55%, 36 px) at y 400. Wireframe fades out. |
| **Exact hero text** | `02` (#9CD4FF, 48 px) above `WHY IT` / `MATTERS.` (#FFFFFF, 96 px), y 500–720 |
| **Visual** | Two stacked cards, centred, 420 px wide: `CHANGE` (#DEEEFE 2 px outline, white 34 px caps) at y 770 → vertical #9CD4FF 2 px line **draws down** 21.00–21.60 to an arrowhead → `IMPACT` card at y 930, which **fills #9CD4FF at 25%** at **21.78** ("matters") |
| **Subtitle** | `explain why each of those` / `changes matters` (20.26–22.18) |
| **Subtitle highlight** | None |
| **Edit / transition** | No cut. 0.40 s `power3.inOut` re-layout. |
| **SFX** | Soft tick at 21.78 |
| **Why** | Change → impact says the advice is reasoned, not arbitrary. No fake metrics. |

### SECTION 11: "Which to do first" · 22.18–24.62
| Field | Detail |
|---|---|
| **Dialogue** | "and tell you which to do first." |
| **Visual type** | Full-screen graphic **GFX-3 beat 03** (same canvas) |
| **Re-layout at 22.18** | `02 WHY IT MATTERS.` drops into the list under item 01 (#DEEEFE at 55%, 36 px, y 450). Change/impact cards fade out. |
| **Exact hero text** | `03` (#9CD4FF, 48 px) above `WHAT TO DO` / `FIRST.` (#FFFFFF, 96 px), y 520–740 |
| **Visual** | Three stacked horizontal cards (560×80 px, #DEEEFE 2 px outline): `CHANGE A` / `CHANGE B` / `CHANGE C` (white 34 px caps), y 790 / 890 / 990, in at 22.30 staggered 0.08 s. At **23.84** (just before "first") **CHANGE B** lifts (scale 1.04) and **slides to the top slot** (0.35 s) while the others shift down. Its border turns **#FF4C32** and an orange pill tag `DO THIS FIRST` (#FF4C32 fill, white 26 px caps) attaches to its right edge. |
| **Payoff state (24.20–24.62)** | The screen now reads top to bottom: `01 WHAT WE'D CHANGE.` / `02 WHY IT MATTERS.` / **`03 WHAT TO DO FIRST.`** with the priority card. That is the three-part payoff in one frame. |
| **Subtitle** | `and tell you which` / `to do first` (22.18–24.22) |
| **Subtitle highlight** | "first" in **italic**, white |
| **Edit / transition** | Hard cut to Sean at 24.62, inside the long "Click" (24.22–25.04) |
| **SFX** | Clean check / lock at 23.84 |
| **Why** | Each review step gets its own distinct visual (wireframe, flow, priority stack). Orange appears only on the single priority marker. |

### SECTION 12: "Click Book Now" · 24.62–26.66
| Field | Detail |
|---|---|
| **Dialogue** | "Click Book Now and choose a time" |
| **Visual type** | Sean + CTA pill (no B-roll) |
| **A-roll treatment** | Simplified, centred frame: face at **50%** width, **punch 112%** (the maximum before softening). Logo ON. |
| **Motion graphic** | Pill `BOOK NOW ↓`: #FF4C32 fill, #FFFFFF 46 px ExtraBold text, 440×112 px, fully rounded, soft #FF4C32 glow at 25%. Centred at **y 900–1012** over his upper chest. Enters at **25.04** ("book"): scale 0.92 → 1, `back.out(1.4)`, 0.30 s. |
| **Subtitle** | `Click Book Now` (24.22–25.54) → `and choose a time` (25.54–26.66) |
| **Subtitle highlight** | "Book Now" in **#FF4C32** |
| **Edit / transition** | Hard cut in at 24.62. 0.20 s dissolve to the end card at 26.66, with **the pill staying locked in place across the dissolve.** |
| **SFX** | Soft CTA click at 25.04 |
| **Why** | Sean personally gives the instruction. The arrow points to Meta's native Book Now button. |

### SECTION 13: Free EcomIQ store review end card · 26.66–31.00
| Field | Detail |
|---|---|
| **Dialogue** | "for your free EcomIQ store review." (VO ends 28.84) |
| **Visual type** | Full-screen navy end card **GFX-4** |
| **Exact hero text** | `FREE` (#9CD4FF, 120 px ExtraBold) · `ECOMIQ` / `STORE REVIEW` (#FFFFFF, 92 px ExtraBold) · `3 changes · 30 minutes` (#DEEEFE, 34 px Bold, callback line) · `BOOK NOW ↓` pill (#FF4C32, carried over) |
| **Layout** | Centred stack: FREE y 430–550 · ECOMIQ STORE REVIEW y 570–780 · callback line y 810 · pill y 900–1012 (same position as Section 12) |
| **Animation** | `FREE` at **26.76** ("free") · `ECOMIQ STORE REVIEW` at **27.16** ("EcomIQ") · callback line at 27.90 · one gentle pill pulse (1 → 1.04 → 1, 0.5 s) at **28.84** · **still hold 29.00–31.00** |
| **Subtitle** | `for your free` / `EcomIQ store review` (26.66–28.94) · subtitles off for the hold |
| **Subtitle highlight** | None |
| **Edit / transition** | Ends on the held frame at 31.00, music button. No fade to black. |
| **SFX** | None beyond the music button. The pulse is silent. |
| **Why** | Clean, readable CTA held 4.3 s, 2.2 s of it after the last word. Orange is reserved for the action alone. |

---

## PART 2: Full-screen motion graphic plan

All four scenes: background **#06284C** with a #9CD4FF 10% radial glow · logo `ecomiq-logo-white.svg` **top-left, 230 px wide, x 72 / y 290** · content inside the hero zone y 380–1050 · lower third left as empty navy, as in the reference.

### GFX-1: "3 CHANGES / 30 MINUTES / FREE" · 5.00–10.14 (5.14 s, three beats on one canvas)
| | Beat A · 5.00–5.98 | Beat B · 5.98–7.72 | Beat C · 7.72–10.14 |
|---|---|---|---|
| **Voiceover** | "three changes" | "to make your store more money" | "on a free 30-minute call." |
| **Headline** | `01` `02` `03` → `3 CHANGES.` | `3 CHANGES.` | `3 CHANGES.` / `30 MINUTES.` / `FREE.` |
| **Supporting copy** | none | `TO MAKE YOUR STORE` / `MORE MONEY.` + store card | none |
| **Text hex** | #FFFFFF | #FFFFFF, #DEEEFE | #FFFFFF |
| **Accent hex** | #DEEEFE (small 01·02·03) | #9CD4FF (upward line + ▲) | **#FF4C32** (FREE only) |
| **Layout** | Numerals in one centred row at y 560, then they compress to a small row at y 430 with the headline below | Headline y 520–650, supporting y 690–790, store card y 800–1010 | Three equal 120 px lines centred at y 470 / 610 / 750 |
| **Animation** | 0.25 s rise-ins at 5.10 / 5.30 / 5.50 · 0.35 s compress at 5.98 | Lines rise in at 6.50 / 7.10 · chart line draws 6.84–7.60 | Re-layout 7.72 (0.35 s) · 30 MINUTES at 8.14 · FREE at 9.04 · still hold to 10.14 |

### GFX-2: Furbish Studio +49% · 11.92–16.36 (4.44 s)
| | |
|---|---|
| **Voiceover** | "Furbish Studio grow holiday online sales by 49% year on year" |
| **Headline** | `+49%` |
| **Supporting copy** | `CLIENT RESULT` · `FURBISH STUDIO` · `HOLIDAY ONLINE SALES` · `YEAR ON YEAR` · bars `Q4 2021` / `Q4 2022` |
| **Background hex** | #06284C |
| **Text hex** | #FFFFFF (name, HOLIDAY ONLINE SALES), #DEEEFE (eyebrow, bar labels) |
| **Accent hex** | **#FF4C32** (+49%), #9CD4FF (YEAR ON YEAR, Q4 2022 bar) |
| **Layout** | Eyebrow y 380 · name y 420 · +49% y 480–690 · HOLIDAY ONLINE SALES y 710 · YEAR ON YEAR y 775 · bars on a baseline at y 1010 (bars 150 px wide, 70 px gap, centred) · labels y 1025 |
| **Animation** | See Part 4 |
| **Duration** | 4.44 s, with the full lockup held 1.30 s |

### GFX-3: Review steps 01 / 02 / 03 · 18.50–24.62 (6.12 s, three beats on one canvas)
| | Beat 01 · 18.50–20.18 | Beat 02 · 20.18–22.18 | Beat 03 · 22.18–24.62 |
|---|---|---|---|
| **Voiceover** | "We'll show you what we'd change," | "explain why each of those changes matters," | "and tell you which to do first." |
| **Headline** | `01` `WHAT WE'D CHANGE.` | `02` `WHY IT MATTERS.` | `03` `WHAT TO DO FIRST.` |
| **Supporting** | Wireframe page | `CHANGE` ↓ `IMPACT` | `CHANGE A/B/C` + `DO THIS FIRST` |
| **Text hex** | #FFFFFF | #FFFFFF, earlier items #DEEEFE at 55% | same |
| **Accent hex** | #9CD4FF (selected block) | #9CD4FF (line + IMPACT fill) | **#FF4C32** (priority border + tag only) |
| **Layout** | Number + 2-line headline y 500–720 · visual y 760–1040 | Previous item becomes a list row at y 400 · same headline slot · cards y 770 / 930 | List rows y 400 / 450 · headline y 520–740 · cards y 790 / 890 / 990 |
| **Animation** | Highlight fill at 19.70 | 0.40 s re-layout · line draw 21.00–21.60 · IMPACT fill 21.78 | Card stagger 22.30 · priority lift and slide at 23.84 |
| **Distinct treatment** | Spatial: "where" | Causal: "why" | Ranking: "what first" |

### GFX-4: End card · 26.66–31.00 (4.34 s)
| | |
|---|---|
| **Voiceover** | "for your free EcomIQ store review." |
| **Headline** | `FREE` / `ECOMIQ STORE REVIEW` |
| **Supporting copy** | `3 changes · 30 minutes` |
| **CTA** | `BOOK NOW ↓` pill |
| **Background hex** | #06284C |
| **Text hex** | #FFFFFF, #DEEEFE |
| **Accent hex** | #9CD4FF (FREE), **#FF4C32** (pill) |
| **Layout** | Centred stack, see Section 13 |
| **Animation** | Rise-ins on the words · one pill pulse at 28.84 · 2.0 s still hold |
| **Logo** | Top-left (kept consistent, not the reference's centred end-card logo) |

Side cards (not full-screen) use the same system: Section 1 `SHOPIFY FOUNDERS $10K–$60K / MONTH` and Section 8 `YOUR STORE. WITH YOU.`, both at x 690–1010 on a #06284C 88% card.

---

## PART 3: B-roll pull list

Only footage I genuinely recommend, verified by frame grabs at these timecodes. Timecodes are source file seconds.

### A) Team / authority footage
| Clip name (sheet) | Drive file | Source TC | Use | Ad section | Purpose |
|---|---|---|---|---|---|
| Sean talking on stage at Shoptalk - rebuy | `Sean Clarke Pacific IQ.mp4` (1920×1080, [link](https://drive.google.com/file/d/1XuPAArGjpESm3JUhjU7Q3gVmz4L_y72Z/view)) | **00:12.60–00:13.62** | 1.02 s | 5 (10.14–11.16) | Sean as a conference speaker = real expertise. **Crop x 750–1357** to keep the Rebuy stats, OLLY/Blenders logos and testimonial out of frame. **Do not use the sheet's other entry (6:02–6:05):** "99.9%" and "1.3+ Billion" fill that frame and would compete with +49%. |
| Sean walking around at Shoptalk Talking | `IMG_0185.MOV` (2160×3840 vertical, [link](https://drive.google.com/file/d/1E84Z6zKpVVUDcihIVQ6L6hbSFyUbOxrb/view)) | **00:04.80–00:05.56** | 0.76 s | 5 (11.16–11.92) | On the Shoptalk floor, SHOPTALK lanyard + PacificIQ tee = real industry presence. No timecode was logged in the sheet. This range is verified. |

### B) Furbish Studio footage
| Clip name | Source TC | Use | Ad section | Purpose |
|---|---|---|---|---|
| **None available** | n/a | n/a | 6–7 | Searched Drive by title and full text and checked every sheet row: no Furbish video exists. Section 6–7 is a text-led navy graphic naming Furbish Studio. **Optional upgrade, only with Furbish's written approval:** product imagery from the published case study (pacificiq.com/case-studies/furbish-studio) as a soft background under a #06284C 80% overlay in GFX-2. |

### C) Store review / strategy footage
| Clip name (sheet) | Drive file | Source TC | Use | Ad section | Purpose |
|---|---|---|---|---|---|
| Sean holding laptop talking to man | `A_0004C078A260304_1210090O_CANON.MP4` (3840×2160, [link](https://drive.google.com/file/d/1HVH9tFgvcAfS-YczxU_aiLOmUxm18Ofu/view)) | **00:03.50–00:04.32** | 0.82 s | 8 (17.68–18.50) | Laptop in hand, face-to-face = hands-on, collaborative review. **Filmed sideways: rotate 90° clockwise.** No third-party brands visible. |

**Alternate (not in the cut):** "Angle over laptop - Sean thinking.MP4" ([link](https://drive.google.com/file/d/1x1uT_kVmPod-vpPn5SVIGY4kUZmfCwBo/view)), 00:04.50–00:05.50, also sideways (rotate 90° CW). It can replace the Section 8 shot if a more "analysing" feel is wanted. Check the round emblem in the right of frame before using it.

### Deliberately excluded
| Sheet row | Why |
|---|---|
| **"Sean on Laptop" (9–12 sec)** | **Mislabelled in the sheet.** The link opens `Sweet E's Sean and Erica - intro.MP4`, and 0:09–0:12 shows Sweet E's Erica at her counter. That is another client's footage, so it must not be used. Worth correcting in the sheet. |
| Sweet E's (all), Dryft (all), Mob Armor | Other clients. Never near the Furbish claim. |
| Shopify intro | Excluded per brief |
| Limitless growth rebuy sign | Partner signage, proves nothing about EcomIQ |
| Walking in Klaviyo Event space | Clip is only 7.9 s, so the logged 0:07–0:11 overruns it. Low proof value. |
| Sean and Mason talking to 2 women | Wide, small figures, filmed sideways. Weaker than the two Shoptalk shots. |
| Car, driving, coffee, street, hotel-room lifestyle | Filler: they prove nothing this ad needs |

---

## PART 4: Furbish Studio proof sequence

**Line:** "…that have helped brands like Furbish Studio grow holiday online sales by 49% year on year" (11.00–16.06)

| # | Edit TC | Voice | Shot | Detail |
|---|---|---|---|---|
| 0 | 10.14–11.16 | "Specialists from the team that" | B-roll: Shoptalk stage, src 00:12.60–00:13.62 | Neutral authority. Sean only, no client brands. `ECOMMERCE SPECIALISTS` label. |
| 1 | 11.16–11.92 | "have helped brands like" | B-roll: Shoptalk floor, src 00:04.80–00:05.56 | Neutral authority. **Nothing on screen that could be read as Furbish.** |
| 2 | 11.92 | "Furbish" | **Transition in:** 0.20 s cross-dissolve to navy #06284C | Logo top-left returns |
| 3 | 11.92–12.94 | "Furbish Studio grow" | GFX-2 opens | `CLIENT RESULT` (#DEEEFE 28 px caps, y 380) and `FURBISH STUDIO` (#FFFFFF 56 px ExtraBold, y 420) rise in. The name is on screen while it is spoken. |
| 4 | 12.94 | "holiday" | | `HOLIDAY ONLINE SALES` (#FFFFFF 52 px, y 710) rises in |
| 5 | 13.00–13.94 | "online sales" | **Graph:** two bars on a #DEEEFE 1 px baseline at y 1010 | **Q4 2021** bar: #DEEEFE at 30% fill, 1 px #DEEEFE outline, grows 0 → 160 px (13.00–13.60). **Q4 2022** bar: #9CD4FF fill with a vertical gradient to #9CD4FF at 70% at the base, soft #9CD4FF glow at 20%, grows 0 → 160 px (13.34–13.94). Labels `Q4 2021` / `Q4 2022` (#DEEEFE 26 px caps, y 1025). |
| 6 | 14.48–15.06 | "by 49%" | | `+49%` (#FF4C32, 210 px ExtraBold, y 480–690) counts up +0% → +49% with tabular figures. The Q4 2022 bar grows 160 → **238 px** in sync (exactly 49% taller, so the graph is mathematically honest). |
| 7 | 15.06 | "%" | | Number locks. Faint #FF4C32 glow at 18% behind it. |
| 8 | 15.42 | "year on year" | | `YEAR ON YEAR` (#9CD4FF 34 px caps, tracking +8%, y 775) rises in |
| 9 | 15.42–16.36 | "will" | | **Still hold** of the full lockup (1.30 s from the number lock) |
| 10 | 16.36 | "go" | **Transition out:** 0.20 s cross-dissolve to Sean (Section 8 framing) | |

**What the screen says, and only this:** FURBISH STUDIO · +49% · HOLIDAY ONLINE SALES · YEAR ON YEAR · Q4 2021 vs Q4 2022.
- Not "conversion", not "total sales", not "revenue", not "this year".
- No dollar values and no y-axis numbers.
- "Q4 2021 / Q4 2022" comes from the published case study (Q4 2022). If Sean prefers not to date it, the fallback labels are `YEAR BEFORE` / `YEAR AFTER`, never `THIS YEAR`.

**Subtitle treatment:**
- `brands like Furbish Studio` (11.42–12.58), all white
- `grow holiday online sales` (12.58–14.48), all white
- `by 49% year on year` (14.48–16.36), all white. The orange +49% graphic is already dominant, so an orange subtitle number would double up.

**SFX:** 8–10 soft ticks across 14.48–15.06, one soft resolve tone at 15.06, nothing else.

---

## PART 5: Subtitle plan

Default colour **#FFFFFF** for everything. `/` = line break. Bottom edge fixed at y 1240.

| # | In–Out | Exact text | Highlight word | Hex | Italic |
|---|---|---|---|---|---|
| 1 | 0.00–1.88 | Shopify founders doing | none | n/a | No |
| 2 | 1.88–3.92 | $10,000 to $60,000 a month | **$10,000 to $60,000** | **#9CD4FF** | No |
| 3 | 3.92–5.98 | We'll show you three changes | none | n/a | No |
| 4 | 5.98–7.72 | to make your store more money | none | n/a | No |
| 5 | 7.72–10.14 | on a free 30-minute call | none | n/a | No |
| 6 | 10.14–11.42 | Specialists from the team / that have helped | none | n/a | No |
| 7 | 11.42–12.58 | brands like Furbish Studio | none | n/a | No |
| 8 | 12.58–14.48 | grow holiday online sales | none | n/a | No |
| 9 | 14.48–16.36 | by 49% year on year | none | n/a | No |
| 10 | 16.36–18.30 | will go through / your store with you | none | n/a | **"with you"** |
| 11 | 18.70–20.18 | We'll show you what we'd change | none | n/a | No |
| 12 | 20.26–22.18 | explain why each of those / changes matters | none | n/a | No |
| 13 | 22.18–24.22 | and tell you which / to do first | none | n/a | **"first"** |
| 14 | 24.22–25.54 | Click Book Now | **Book Now** | **#FF4C32** | No |
| 15 | 25.54–26.66 | and choose a time | none | n/a | No |
| 16 | 26.66–28.94 | for your free / EcomIQ store review | none | n/a | No |

**Emphasis budget:** 8 of 84 words (≈ 10%) carry any colour or italic, within the brief's ceiling of 10–20%. 13 of 16 subtitles are pure white. "$10,000 to $60,000" stays Blue Tint because the side card is small and Sean's face dominates that frame. "free", "three changes", "49%" and "store review" stay white because a full-screen graphic already carries each of them.

Notes for the editor:
- #9 reads "by 49%", not "by over 49%". "Over" is not in the audio, and the published result is 49%.
- #6, #11 and #12 follow the audio, which differs from the written script (see section 0).

---

## PART 6: Final editor shot list

| Timestamp | Dialogue | Visual | B-roll (src TC) | Graphic | Hero text | Subtitle highlight | Edit |
|---|---|---|---|---|---|---|---|
| 0.00–3.92 | Shopify founders doing $10,000 to $60,000 a month. | Sean, face at 36%, punch 100→106%, logo ON | n/a | Side card, right | SHOPIFY FOUNDERS · $10K ── $60K · / MONTH | $10,000 to $60,000 #9CD4FF | Open on Sean |
| 3.92–5.00 | We'll show you | Sean 106% | n/a | Card out 4.50 | n/a | n/a | n/a |
| 5.00–5.98 | three changes | Navy GFX-1 A | n/a | 01 / 02 / 03 → compress | 01 02 03 → 3 CHANGES. | n/a | 0.20 s dissolve · 3 soft clicks |
| 5.98–7.72 | to make your store more money | Navy GFX-1 B | n/a | Store card, line up ▲ | TO MAKE YOUR STORE / MORE MONEY. | n/a | Same canvas |
| 7.72–10.14 | on a free 30-minute call. (pause) | Navy GFX-1 C | n/a | Core lockup | 3 CHANGES. / 30 MINUTES. / **FREE.** (#FF4C32) | n/a | Impacts 8.14 / 9.04 · hold |
| 10.14–11.16 | Specialists from the team that | B-roll, logo OFF | Shoptalk stage `Sean Clarke Pacific IQ.mp4` 00:12.60–00:13.62, crop x 750–1357 | Label | ECOMMERCE SPECIALISTS | n/a | Hard cut on "Specialists" |
| 11.16–11.92 | have helped brands like | B-roll | Shoptalk floor `IMG_0185.MOV` 00:04.80–00:05.56 | Label | ECOMMERCE SPECIALISTS | n/a | Hard cut |
| 11.92–16.36 | Furbish Studio grow holiday online sales by 49% year on year | Navy GFX-2, logo ON | **None (no Furbish footage exists)** | Name + 2-bar chart + count-up | CLIENT RESULT · FURBISH STUDIO · **+49%** (#FF4C32) · HOLIDAY ONLINE SALES · YEAR ON YEAR · Q4 2021 / Q4 2022 | n/a | 0.20 s dissolve in · ticks 14.48–15.06 · hold 1.3 s |
| 16.36–17.68 | will go through your store | Sean, 36% framing at 104% | n/a | Side text at 17.32 | YOUR STORE. / WITH YOU. | n/a | 0.20 s dissolve |
| 17.68–18.50 | with you. (pause) | B-roll, logo OFF | Laptop + man `A_0004C078A260304_1210090O_CANON.MP4` 00:03.50–00:04.32, **rotate 90° CW** | Side text carries over | YOUR STORE. / WITH YOU. | "with you" *italic* | Hard cut on "with" |
| 18.50–20.18 | We'll show you what we'd change, | Navy GFX-3 / 01 | n/a | Wireframe, block highlights 19.70 | 01 WHAT WE'D CHANGE. | n/a | 0.20 s dissolve · UI tick |
| 20.18–22.18 | explain why each of those changes matters, | Navy GFX-3 / 02 | n/a | CHANGE ↓ IMPACT | 02 WHY IT MATTERS. | n/a | 0.40 s re-layout · tick 21.78 |
| 22.18–24.62 | and tell you which to do first. Click… | Navy GFX-3 / 03 | n/a | 3 cards, B → top + tag | 03 WHAT TO DO FIRST. · **DO THIS FIRST** (#FF4C32) | "first" *italic* | Check/lock 23.84 |
| 24.62–26.66 | …Book Now and choose a time | Sean centred, 112%, logo ON | n/a | CTA pill at 25.04 | **BOOK NOW ↓** (#FF4C32) | "Book Now" #FF4C32 | Hard cut · soft click |
| 26.66–31.00 | for your free EcomIQ store review. | Navy end card GFX-4 | n/a | Lockup, pill carried over | FREE (#9CD4FF) · ECOMIQ STORE REVIEW · 3 changes · 30 minutes · **BOOK NOW ↓** | n/a | 0.20 s dissolve · pulse 28.84 · 2 s hold · music button |

**Screen-time balance:** Sean to camera 8.4 s · Sean in B-roll 2.6 s · navy graphics 20.0 s · on-screen human presence 11.0 s of 31. This is close to the reference ratio. The longest stretch without Sean's face is 5.00–16.36, and 1.8 s of that is Sean on B-roll.

---

## Final creative check

| # | Check | Result |
|---|---|---|
| 1 | Matches the reference style? | **Yes.** Navy glow canvas, top-left logo, centred bold Rethink Sans, empty lower third, gradient blue bars with labels, dimmed previous lines (GFX-3 list), orange pill CTA. |
| 2 | Navy and White doing most of the work? | **Yes.** 20 s of navy canvas; white is the primary text colour on every frame. |
| 3 | Flame used sparingly? | **Yes.** 4 graphic moments (FREE, +49%, DO THIS FIRST, BOOK NOW) plus 2 subtitle words. Never more than one orange element on screen. |
| 4 | Graphics understood instantly? | **Yes.** One idea per beat, 1–3 words of hero copy each. |
| 5 | Normal bottom subtitles? | **Yes.** Fixed 54 px white at y 1240, no kinetic captions. |
| 6 | $10K–$60K obvious early? | **Yes.** On screen 1.88–4.80 beside Sean, plus the Blue Tint subtitle. |
| 7 | "3 changes" memorable? | **Yes.** 01/02/03 build, the lockup, the 01/02/03 callback in GFX-3 and the end-card callback line. |
| 8 | "30 minutes / free" unmistakable? | **Yes.** Core lockup with FREE in orange, held 1.1 s through the pause. |
| 9 | +49% given strong weight? | **Yes.** Largest type in the ad (210 px), count-up, honest chart, 1.3 s hold. |
| 10 | +49% described exactly? | **Yes.** HOLIDAY ONLINE SALES · YEAR ON YEAR · Q4 2021 vs Q4 2022. No conversion, total sales or "this year". |
| 11 | Furbish footage used if available? | **None exists** (Drive and sheet both checked). The name is shown on screen instead. |
| 12 | Other client brands kept away from the claim? | **Yes.** Sweet E's / Dryft / Mob Armor excluded, the mislabelled Sweet E's file flagged, and stage crop excludes Rebuy/OLLY/Blenders. |
| 13 | Distinct treatments for change / why / first? | **Yes.** Wireframe highlight, change→impact flow, priority stack. |
| 14 | BOOK NOW obvious? | **Yes.** Orange pill from 25.04 to the end, in two scenes, plus the orange subtitle. |
| 15 | Clean and premium? | **Yes.** 4 graphic scenes, 3 B-roll shots, no whooshes, no stock filler. |

## Open items for sign-off
1. **Confirm two words by ear:** "what we'd change" and "each of those changes matters".
2. **Bar labels:** Q4 2021 / Q4 2022 (recommended, matches the case study) or undated YEAR BEFORE / YEAR AFTER.
3. **Furbish imagery:** only if Furbish approves case-study product imagery for paid ads.
4. **B-Roll Short Cut sheet fix:** the "Sean on Laptop" row points at Sweet E's footage, and the Klaviyo timecode overruns the clip.
