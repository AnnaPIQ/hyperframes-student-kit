# EDITING PLAN: "Make the business pay you | Discovery call"
## 9:16 Meta performance ad. Creative device: PROFIT LEAK INVESTIGATION

Prepared 6 Oct 2026 for the video editor. Built from the actual A-roll audio and picture, not from the script.

---

## 0. What was analysed, and what it changed

### 0.1 A-roll (analysed directly)
- File: `Ad - Make the business pay you | Discovery call.mov` (Drive)
- 3840x2160, ProRes, **25 fps**, mono 48 kHz, **38.88 s**, one continuous take.
- Framing: Sean seated centre, cream quilted vest over white tee, black podcast mic bottom-centre, cobalt-blue lit wall behind, a framed print top-right, dark doorway right. Locked-off camera. He gestures with both hands, mostly in front of his chest.
- Word-level timestamps were taken from the real audio (speech-to-text plus a 100 ms loudness envelope to confirm every pause).

### 0.2 Sean did NOT read the script word for word
The subtitles and timeline below follow what he actually says. Differences from the supplied transcript:

| Supplied transcript | What Sean actually says |
|---|---|
| "doing $20,000+ a month" | "doing **twenty thousand** a month" (no audible "plus". Editor: confirm by ear. If there is no "plus", subtitles read `$20,000 a month`; the graphic can still say `$20K+` because it is the qualifier, not a quote) |
| "Then they bring in specialists" | "**They then** bring in specialists" |
| "It starts with a free discovery call. We go through your business and your profit goals." | "**And it all starts** with a free discovery call **where we'll go through** your business and your profit goals." |
| "If we can't show you where the profit is leaking, we'll say so." | "And if we can't show you **or work out** where the profit is leaking, **we'll tell you on this call.**" |
| "Tap Book Now to choose a time." | "**So tap Book Now and choose a time below for your free discovery call.**" |

Impact on the plan: Section 13 becomes "we'll tell you on this call" (still sincere, still stripped back). The CTA line ends on "free discovery call", which gives the end card a natural spoken callback.

### 0.3 Head trim and timecode convention
- Sean's first word starts at source 00:00.92. **Trim the head at source 00:00.80.**
- **AD TC = SOURCE TC minus 0.80 s.** Every timestamp in this plan is AD TC unless labelled SRC.
- Last word ends AD 35.70. Footage runs to AD 38.08. **Final ad length: 38.0 s** (CTA holds 2.3 s after the last word).
- Deliver at **25 fps** to match the A-roll (do not conform to 30, it adds judder on a locked-off talking head).

### 0.4 Campaign subtitle reference (analysed: "Revenue up bank account empty" and "The lever moved", with captions)
- All lowercase, no punctuation, 1 to 2 lines, centred.
- Medium-weight geometric sans, white, thin dark outline (about 2 px) plus soft shadow.
- EcomIQ white wordmark top-left on every frame.
- Graphics live on Navy with a soft radial lift, Blue Tint for revenue/positive markers, Flame Orange for the problem number.
- **Use the same caption preset in this ad.** Consistency with the campaign is the point; the variety comes from composition, not from the subtitles.

### 0.5 Critical finding: the cream vest
In the reference ads Sean wears a dark jacket, so white subtitles sit on dark fabric. In this A-roll he wears a **cream vest**. White subtitles over his chest will lose contrast.
**Fix (mandatory in every full-Sean frame):** a Navy `#06284C` gradient rising from the bottom of frame (0% at y 960 to 65% at y 1920), plus the campaign's dark outline on the subtitle. In every designed composition the subtitles already sit on Navy, so the problem disappears there.

### 0.6 B-roll library access
The "B-Roll Short Cut" sheet (83 rows) was reviewed in full. Drive blocked full downloads on most clips ("download quota exceeded"), so the picks below are based on: the sheet's own in-point notes, the first-frame thumbnails of each candidate, and the one clip that did download (Klaviyo event space, checked frame by frame). **Editor: check each in-point by eye before locking.** Note the phone clips are stored rotated 90°; rotate them upright on import.

---

## GLOBAL SPECS

### Canvas and safe zones (1080 x 1920, 25 fps)
| Zone | Pixels | Rule |
|---|---|---|
| Top UI zone | y 0 to 270 | No key text. Logo only (as per campaign). |
| Graphic zone | x 64 to 1016, y 270 to 1120 | All hero text and diagrams live here. |
| Subtitle band | y 1130 to 1250 | Subtitles only. Fixed position all ad. |
| Bottom UI zone | y 1250 to 1920 | No text. Footage, navy, or Sean's torso/mic only. |

### Type
- Hero text and labels: **Rethink Sans** ExtraBold (800) for headlines, Bold (700) for labels, tracking minus 2% on anything 72 px and above. Eyebrows: Rethink Sans SemiBold, tracking plus 8%, uppercase.
- Subtitles: campaign caption preset (see 0.4), about 58 px on the 1080 canvas, line height 1.2, max line width 880 px.
- No Hedvig serif italic in graphics for this ad. The only italic in the whole piece is one subtitle phrase (Section 13).

### Colour logic (exact, no other colours)
| Meaning | Colour |
|---|---|
| Background, panels, diagnostic environment, gradients | NAVY `#06284C` |
| Revenue, money coming in, current-state markers, diagnostic scan line | BLUE TINT `#9CD4FF` |
| Profit, main text, primary labels, subtitles | WHITE `#FFFFFF` |
| Costs, flow lines, dividers, inactive leaks, low-priority shapes | SKY BLUE `#DEEEFE` |
| The leak, the priority fix, BOOK NOW | FLAME ORANGE `#FF4C32` |
| Not used (no light backgrounds in this ad) | BLACK `#000000` |

### Sean placement presets (all derived from the one locked-off A-roll)
| Preset | How | Sean face centre | Free column |
|---|---|---|---|
| **FULL 100** | 9:16 crop of the 4K frame, 1215x2160 window, Sean centred | x 540, y 560 | none |
| **FULL 110** | same, 110% | x 540, y 600 | none |
| **CUT-OUT LEFT** | Rotoscoped Sean (keep the mic in the matte) at 115% over Navy, pushed left so his left shoulder exits frame | x 330 | right column x 600 to 1016 |
| **CUT-OUT RIGHT** | Mirror position | x 750 | left column x 64 to 480 |
| **CARD RIGHT** | Original footage (real blue room, not cut-out) at 130% inside a rounded card x 640 to 1016, y 300 to 1110, 32 px radius, 2 px Sky border at 30% | card centre | left column x 64 to 600 |

Roto: the camera is locked off and the wall is a clean, evenly lit blue, so one pass of DaVinci Magic Mask, After Effects Roto Brush, or Runway background removal over the full 38 s will hold. Feather 1 to 2 px, add a faint 1 px Sky rim at 20% so his hair edge doesn't fringe blue. Maximum crop is 130%; at that size the 4K source is still at native resolution in the 1080 canvas, so nothing goes soft.

Texture on every Navy composition: soft radial lift (centre 8% lighter), subtle vignette, very fine grain. No perspective grid, no chrome type (the campaign is cleaner than that).

---

## PART 1. COMPLETE EDITING TIMELINE

### SECTION 1. $20K+ BUT KEEPING TOO LITTLE
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:00.0 to 00:04.5 (SRC 00:00.8 to 00:05.3) |
| EXACT DIALOGUE | "Shopify founders doing twenty thousand a month and keeping too little of it." |
| COMPOSITION TYPE | Full Sean, evolving into cut-out Sean + information column |
| A-ROLL TREATMENT | 00:00.0 to 00:00.9: FULL 110, real room, slow push 110 to 112%. 00:00.9 to 00:01.5: room fades to Navy (cut-out reveal) while Sean glides left (0.6 s, ease in-out). |
| SEAN POSITION | Centre, then LEFT |
| B-ROLL CLIP | None |
| SOURCE TIMECODE | A-roll SRC 00:00.8 to 00:05.3 |
| SHOT DURATION | 4.5 s (one continuous shot) |
| MOTION GRAPHIC | Right column builds: eyebrow `SHOPIFY FOUNDERS` fades up at 00:01.0. `$20K+` mask-reveals upward at 00:01.4 on "twenty", `/ MONTH` settles under it. At 00:02.8 on "keeping", a 2 px Sky divider draws left to right, then `KEEPING` / `TOO LITTLE` slides up 20 px and fades in. |
| GRAPHIC READ TIME | `$20K+` on screen 3.1 s (01.4 to 04.5). `KEEPING TOO LITTLE` on screen 1.7 s, and it keeps reading into the S2 move (fades at 04.6). |
| HERO TEXT | `SHOPIFY FOUNDERS` (Sky, 34 px eyebrow) / `$20K+` (Blue Tint, 150 px ExtraBold) / `/ MONTH` (White, 40 px) / `KEEPING` (White, 72 px) / `TOO LITTLE` (Flame Orange, 72 px) |
| SUBTITLE | `shopify founders doing` / `$20,000 a month` then `and keeping` / `too little of it` |
| SUBTITLE HIGHLIGHT | `$20,000` only |
| HEX COLOUR | `#9CD4FF` |
| ITALIC | No |
| TRANSITION | In: none (start on Sean, mid-sentence energy). Internal: room to Navy dissolve + position glide. |
| SFX | 00:01.4 soft rise under `$20K+` (very low, 0.6 s) |
| WHY | The qualifier must be legible in the first 1.5 s on mute. Moving Sean aside on "founders" clears the right column just as "twenty thousand" lands, so the viewer reads `$20K+` while hearing it. Orange appears exactly once, on the problem. Revenue is not the problem, keeping it is. |

### SECTION 2. TWO OR THREE THINGS EATING THE MARGIN
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:04.5 to 00:07.3 (SRC 00:05.3 to 00:08.1) |
| EXACT DIALOGUE | "We'll show you the two or three things eating your margin" |
| COMPOSITION TYPE | Cut-out Sean + margin diagram (same Navy world, no cut) |
| A-ROLL TREATMENT | CUT-OUT, glides from LEFT to RIGHT 00:04.5 to 00:05.2 (0.7 s, ease in-out). |
| SEAN POSITION | RIGHT |
| B-ROLL CLIP | None |
| SOURCE TIMECODE | A-roll SRC 00:05.3 to 00:08.1 |
| SHOT DURATION | Continuous with S1 and S3 |
| MOTION GRAPHIC | `KEEPING TOO LITTLE` fades out (0.3 s). The `$20K+` lockup shrinks and travels to the top of the left column, becoming the label of the REVENUE bar. Revenue bar extends left to right (Blue Tint). Then the margin waterfall builds, one step at a time: LEAK 01 at 00:05.3 ("two"), LEAK 02 at 00:05.7 ("three"), LEAK 03 at 00:06.1 ("things"). Each leak bites a chunk off the right end of the bar and drops it one row lower. PROFIT bar (White, short) extends at 00:06.5 ("eating your margin"). See Part 3, stages A and B. |
| GRAPHIC READ TIME | Full diagram complete by 00:06.8 and stays up until 00:09.6 (2.8 s of complete diagram) |
| HERO TEXT | `$20K+ REVENUE` / `LEAK 01` / `LEAK 02` / `LEAK 03` / `PROFIT` |
| SUBTITLE | `we'll show you the two` / `or three things` then `eating your margin` |
| SUBTITLE HIGHLIGHT | None |
| HEX COLOUR | All `#FFFFFF` |
| ITALIC | No |
| TRANSITION | No cut. Sean glide + lockup morph. |
| SFX | 00:05.3 one light marker click on LEAK 01 only (not on 02 and 03) |
| WHY | The same frame keeps evolving: the number the viewer just read becomes the top of the diagram, so the story "revenue comes in, something eats it" reads without a new scene. Sean switching sides is the visual change, the diagram is the information. |

### SECTION 3. WHAT TO FIX FIRST
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:07.3 to 00:09.6 (SRC 00:08.1 to 00:10.4) |
| EXACT DIALOGUE | "and what to fix first." (plus "Your strategist" at 00:09.1, carried under the held frame) |
| COMPOSITION TYPE | Same as S2. Do not cut. |
| A-ROLL TREATMENT | CUT-OUT RIGHT, imperceptible push 115 to 117% across the section |
| SEAN POSITION | RIGHT |
| B-ROLL CLIP | None |
| SOURCE TIMECODE | A-roll SRC 00:08.1 to 00:10.4 |
| SHOT DURATION | Continuous |
| MOTION GRAPHIC | 00:07.3 ("and what"): LEAK 01 and LEAK 03 dim to 40%. LEAK 02 bar fills Flame Orange, its label turns Flame Orange. 00:07.6 ("to fix"): a 3 px orange connector draws down from LEAK 02 and the tag `FIX THIS FIRST` slides up under the diagram. |
| GRAPHIC READ TIME | `FIX THIS FIRST` held 2.0 s (07.6 to 09.6) |
| HERO TEXT | `FIX THIS FIRST` (White, 48 px ExtraBold) |
| SUBTITLE | `and what to fix first` |
| SUBTITLE HIGHLIGHT | None (the orange is already in the graphic) |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | No |
| TRANSITION | None. The frame is held 0.5 s past Sean's next sentence start on purpose (see Pacing Audit) |
| SFX | 00:07.6 soft lock sound |
| WHY | The brief's ideal "evolve, don't replace" beat. Making LEAK 02 the biggest bite in S2 means "fix first" also reads as "fix the biggest leak first" with zero extra text. |

### SECTION 4. STRATEGIST GOES THROUGH YOUR NUMBERS
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:09.6 to 00:11.3 (SRC 00:10.4 to 00:12.1) |
| EXACT DIALOGUE | "Your strategist goes through your numbers with you" |
| COMPOSITION TYPE | 40/60 split-screen: Sean card 40% / diagnostic 60% |
| A-ROLL TREATMENT | 00:09.6 to 00:10.2: Sean cut-out shrinks into CARD RIGHT, and the real blue room fades back in inside the card (now 130% crop, face and shoulders). |
| SEAN POSITION | Card, RIGHT (40%) |
| B-ROLL CLIP | None |
| SOURCE TIMECODE | A-roll SRC 00:10.4 to 00:12.1 |
| SHOT DURATION | Continuous |
| MOTION GRAPHIC | The waterfall reorganises (0.5 s) into three clean horizontal bars in the left 60%: REVENUE (Blue Tint, full width), COSTS (Sky, about 70%), PROFIT (White, about 30%). Headline `YOUR NUMBERS.` fades in above at 00:09.9. 00:10.4 to 00:11.3: a 2 px Blue Tint scan line with a small crosshair slides top to bottom across the bars ("numbers with you"). |
| GRAPHIC READ TIME | `YOUR NUMBERS.` 2.2 s (09.9 to 12.1). Bars on screen through 14.1. |
| HERO TEXT | `YOUR NUMBERS.` (White, 52 px ExtraBold). Bar labels `REVENUE` / `COSTS` / `PROFIT` (28 px Bold, colour matches bar) |
| SUBTITLE | `your strategist goes through` / `your numbers with you` |
| SUBTITLE HIGHLIGHT | None |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | No |
| TRANSITION | No cut. Cut-out to card morph, diagram reflow. |
| SFX | None (scan line is silent, keeps it analytical) |
| WHY | Sean is now one element in a working "analysis desk". Putting him in a card (real room, not cut-out) is a third distinct Sean treatment in under 10 s without a single hard cut. |

### SECTION 5. FIND WHERE THE PROFIT IS LEAKING
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:11.3 to 00:14.2 (SRC 00:12.1 to 00:15.0) |
| EXACT DIALOGUE | "and finds where the profit is leaking." (plus "They then bring in" at 00:13.4, carried under the held frame) |
| COMPOSITION TYPE | Same 40/60 split. Do not cut. |
| A-ROLL TREATMENT | CARD RIGHT, unchanged |
| SEAN POSITION | Card, RIGHT |
| B-ROLL CLIP | None |
| SOURCE TIMECODE | A-roll SRC 00:12.1 to 00:15.0 |
| SHOT DURATION | Continuous |
| MOTION GRAPHIC | 00:11.7 ("where"): scan line returns and stops on the COSTS bar. 00:12.1 ("profit"): the right-hand 30% of the COSTS bar turns Flame Orange and a 3 px orange rounded-rectangle locator draws around it (0.4 s stroke). Headline swaps: `YOUR NUMBERS.` fades, `PROFIT LEAK` (Flame Orange) appears. 00:12.6 ("leaking"): `FOUND.` (White) appears beneath it. |
| GRAPHIC READ TIME | `PROFIT LEAK` 2.1 s (12.1 to 14.2). `FOUND.` 1.6 s (12.6 to 14.2). |
| HERO TEXT | `PROFIT LEAK` (Flame Orange, 52 px) / `FOUND.` (White, 52 px) |
| SUBTITLE | `and finds where the` / `profit is leaking` then `they then bring in` |
| SUBTITLE HIGHLIGHT | None (orange already owns the graphic; two orange elements plus an orange subtitle word would be too much) |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | No |
| TRANSITION | None inside the section |
| SFX | 00:12.1 light click as the locator closes |
| WHY | The investigation pays off in the same frame where it started. One orange segment, one ring, one word. |

### SECTION 6. SPECIALISTS COME IN
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:14.2 to 00:15.9 (SRC 00:15.0 to 00:16.7) |
| EXACT DIALOGUE | "specialists who work with" |
| COMPOSITION TYPE | B-roll proof panel (Sean off screen, voice continues) |
| A-ROLL TREATMENT | Sean leaves: 00:14.05 diagnostic content fades (0.25 s). 00:14.2 to 00:14.7: Sean's card expands into the full proof window (x 64 to 1016, y 270 to 1120, 28 px radius) and Sean crossfades to B-roll 1 inside it. |
| SEAN POSITION | Off screen (VO only) |
| B-ROLL CLIP | **B1: Sean and Mason standing talking to 2 women** |
| SOURCE TIMECODE | 00:05.0 to 00:06.7 (sheet note 0:05 to 0:07) |
| SHOT DURATION | 1.7 s visible (14.2 to 15.9), plus the 0.4 s dissolve out |
| MOTION GRAPHIC | Navy gradient across the bottom 35% of the window. Label `ECOMMERCE` / `SPECIALISTS` rises in at 00:14.4. Footage gets a slow 100 to 104% push. |
| GRAPHIC READ TIME | 1.5 s as a full label, then the word SPECIALISTS carries into S7's eyebrow, so the idea stays on screen 3.6 s |
| HERO TEXT | `ECOMMERCE SPECIALISTS` (White, 64 px ExtraBold, 2 lines, bottom-left of window) |
| SUBTITLE | `specialists who work with` (continuing the line started in S5: see Part 6, lines 9 and 10) |
| SUBTITLE HIGHLIGHT | None |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | No |
| TRANSITION | Card-to-window expand (no cut, no whip) |
| SFX | 00:14.2 one subtle soft air transition, low in the mix |
| WHY | The card Sean was sitting in literally becomes the window into the real world. That is a designed transition, not an insert. Real people, real conversation, no stock. |

### SECTION 7. EIGHT- AND NINE-FIGURE BRANDS
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:15.6 to 00:17.8 (SRC 00:16.4 to 00:18.6) |
| EXACT DIALOGUE | "eight and nine figure brands" |
| COMPOSITION TYPE | B-roll proof panel + hero text overlay |
| A-ROLL TREATMENT | Off screen |
| SEAN POSITION | Off screen (he is on stage in the footage) |
| B-ROLL CLIP | **B2: Sean talking on stage at Shoptalk** (rebuy file) |
| SOURCE TIMECODE | 06:02.0 to 06:04.2 (sheet note 6:02 to 6:05). Alternate: 00:12.0 to 00:14.0 |
| SHOT DURATION | 2.2 s visible in full (15.9 to 17.8), dissolving in from 15.7 |
| MOTION GRAPHIC | Inside the same window: B1 dissolves to B2 (0.4 s, 15.7 to 16.1). At 00:15.6 ("eight") the label evolves: `ECOMMERCE SPECIALISTS` shrinks into a small eyebrow `SPECIALISTS WHO WORK WITH`, and the hero `8- & 9-FIGURE` / `BRANDS` mask-reveals upward beneath it. |
| GRAPHIC READ TIME | 2.4 s (15.6 to 18.0) |
| HERO TEXT | `SPECIALISTS WHO WORK WITH` (Sky, 30 px eyebrow) / `8- & 9-FIGURE` (Blue Tint, 92 px ExtraBold) / `BRANDS` (White, 92 px ExtraBold) |
| SUBTITLE | `who work with eight- and` / `nine-figure brands` |
| SUBTITLE HIGHLIGHT | None (Blue Tint already carries it in the graphic) |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | No |
| TRANSITION | Dissolve inside the window (frame does not move) |
| SFX | None (the stage audio is not used; keep VO clean) |
| WHY | Authority is held, not flashed. The eyebrow ties the claim to the specialists' experience, so it never implies that the event, its sponsors or anyone on screen is an 8- or 9-figure client. **Pick a wide stage frame where Sean is the subject; avoid frames where sponsor or brand logos dominate under the text.** Blue Tint (not orange) because orange is reserved for the leak and the CTA. |

### SECTION 8. HELP YOUR TEAM MAKE THE CHANGES
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:17.8 to 00:20.0 (SRC 00:18.6 to 00:20.8) |
| EXACT DIALOGUE | "to help your team make the changes" |
| COMPOSITION TYPE | 60/40: B-roll card 60% / process graphic 40% |
| A-ROLL TREATMENT | Off screen |
| SEAN POSITION | Off screen (appears in the B-roll) |
| B-ROLL CLIP | **B3: Sean holding laptop talking to man** |
| SOURCE TIMECODE | 00:03.0 to 00:05.2 (sheet note 0:03 to 0:07) |
| SHOT DURATION | 2.2 s (17.8 to 20.0) |
| MOTION GRAPHIC | 00:17.8 to 00:18.3: the window shrinks to a portrait card on the LEFT (x 64 to 600, y 300 to 1110) while crossfading from B2 to B3, so the card lands with the new clip already playing. Right column (x 640 to 1016) builds the process: 00:18.1 `LEAK FOUND` (with a 16 px orange dot), 00:18.5 a 2 px Sky line draws downward, 00:19.2 ("the changes") `CHANGE MADE`. |
| GRAPHIC READ TIME | `LEAK FOUND` 4.2 s, `CHANGE MADE` 3.1 s (both stay through S9) |
| HERO TEXT | `LEAK` / `FOUND` (White, 44 px, orange dot) then `CHANGE` / `MADE` (White, 44 px) |
| SUBTITLE | `to help your team` / `make the changes` |
| SUBTITLE HIGHLIGHT | None |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | No |
| TRANSITION | Window-to-card shrink with internal crossfade (one movement) |
| SFX | None |
| WHY | One good collaboration clip, held. The vertical phone footage fits the portrait card natively, so nothing is awkwardly cropped. "MAKE THE CHANGE" is expressed as a process stage rather than an extra headline, which keeps the right column to two words at a time. |

### SECTION 9. MEASURE THE RESULT
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:20.0 to 00:22.3 (SRC 00:20.8 to 00:23.1) |
| EXACT DIALOGUE | "and measure the result." (plus "And it all starts with", carried under the held frame) |
| COMPOSITION TYPE | Same 60/40 |
| A-ROLL TREATMENT | Off screen |
| SEAN POSITION | Off screen |
| B-ROLL CLIP | **B4: Angle over laptop, Sean thinking** |
| SOURCE TIMECODE | 00:04.0 to 00:06.3 (sheet note 0:04 to 0:08) |
| SHOT DURATION | 2.3 s (20.0 to 22.3), 0.4 s dissolve in from B3 inside the card |
| MOTION GRAPHIC | 00:20.0 ("measure"): second Sky line draws, `RESULT MEASURED` appears. 00:20.3: under it a `PROFIT` label and the White profit bar from S2/S4 reappear at their old short length, then extend to roughly 1.6x over 0.8 s (ease out). No numbers. |
| GRAPHIC READ TIME | `RESULT MEASURED` 2.3 s; profit bar movement finishes at 21.1 and holds 1.2 s |
| HERO TEXT | `RESULT` / `MEASURED` (White, 44 px), `PROFIT` (White, 26 px label on bar) |
| SUBTITLE | `and measure the result` |
| SUBTITLE HIGHLIGHT | None |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | No |
| TRANSITION | Dissolve inside the card only |
| SFX | 00:20.3 small UI tick as the profit bar starts moving |
| WHY | The outcome metric is explicitly PROFIT, shown with the same white bar the viewer saw being eaten in S2. Conceptual only, no invented result. A second clip keeps the card alive without adding a cut to the frame. |

### SECTION 10. FREE DISCOVERY CALL
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:22.3 to 00:24.4 (SRC 00:23.1 to 00:25.2) |
| EXACT DIALOGUE | "a free discovery call" (the sentence began at 00:21.4 under S9) |
| COMPOSITION TYPE | Full Sean (deliberate reset) |
| A-ROLL TREATMENT | FULL 100, real room, 0.5 s soft dissolve from the S9 composition. Bottom navy gradient on (see 0.5). |
| SEAN POSITION | Centre |
| B-ROLL CLIP | None |
| SOURCE TIMECODE | A-roll SRC 00:23.1 to 00:25.2 |
| SHOT DURATION | 2.1 s |
| MOTION GRAPHIC | 00:22.6 ("free"): a Navy card (92% opacity, 24 px radius, about 760 x 120) fades up across his lower chest at y 900 to 1020, with one line: `FREE DISCOVERY CALL`. |
| GRAPHIC READ TIME | 1.9 s here, and the offer is repeated on the end card |
| HERO TEXT | `FREE` (Blue Tint, 64 px ExtraBold) + `DISCOVERY CALL` (White, 64 px ExtraBold), one line |
| SUBTITLE | `and it all starts with a` / `free discovery call` |
| SUBTITLE HIGHLIGHT | None |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | No |
| TRANSITION | Soft dissolve (the only full-frame dissolve in the ad, which is why it reads as a reset) |
| SFX | 00:22.6 subtle low impact |
| WHY | After 13 s of designed frames, returning to plain full-frame Sean signals "now the offer". The Navy card protects the text from the cream vest. |

### SECTION 11. YOUR BUSINESS + PROFIT GOALS
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:24.4 to 00:27.2 (SRC 00:25.2 to 00:28.0) |
| EXACT DIALOGUE | "where we'll go through your business and your profit goals." |
| COMPOSITION TYPE | Cut-out Sean over darkened room + information column |
| A-ROLL TREATMENT | Room darkens under a 75% Navy overlay (room still faintly visible, warmer and more consultative than pure navy). Sean cut-out glides LEFT (0.6 s). |
| SEAN POSITION | LEFT (slightly: face at x 360, not as far as S1) |
| B-ROLL CLIP | None |
| SOURCE TIMECODE | A-roll SRC 00:25.2 to 00:28.0 |
| SHOT DURATION | 2.8 s |
| MOTION GRAPHIC | Right column: 00:24.6 `YOUR BUSINESS` fades up. 00:25.2 a 2 px Sky line draws down with a small chevron. 00:25.6 ("and your") `YOUR PROFIT GOALS` fades up. |
| GRAPHIC READ TIME | `YOUR BUSINESS` 2.6 s, `YOUR PROFIT GOALS` 1.6 s |
| HERO TEXT | `YOUR` / `BUSINESS` (White, 60 px) then `YOUR` / `PROFIT GOALS` (White, 60 px) |
| SUBTITLE | `where we'll go through` / `your business` then `and your profit goals` |
| SUBTITLE HIGHLIGHT | None |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | No |
| TRANSITION | Overlay darken + position glide |
| SFX | None |
| WHY | Consultative, not salesy: no B-roll, no orange, just two plain stages. Profit stays White, consistent with the colour logic. |

### SECTION 12. IF WE CAN'T SHOW YOU THE LEAK
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:27.2 to 00:30.5 (SRC 00:28.0 to 00:31.3) |
| EXACT DIALOGUE | "And if we can't show you or work out where the profit is leaking," |
| COMPOSITION TYPE | Full Sean, stripped back |
| A-ROLL TREATMENT | FULL 100. The Navy overlay lifts and Sean drifts back to centre (0.6 s). Begin a very slow push 100 to 106% that runs to 00:31.9. Bottom gradient on. |
| SEAN POSITION | Centre |
| B-ROLL CLIP | None |
| SOURCE TIMECODE | A-roll SRC 00:28.0 to 00:31.3 |
| SHOT DURATION | 3.3 s (continuous with S13) |
| MOTION GRAPHIC | None. (The optional `PROFIT LEAK?` tag was considered and dropped: the trust line needs the room.) |
| GRAPHIC READ TIME | n/a |
| HERO TEXT | None |
| SUBTITLE | `and if we can't show you` then `or work out where the` / `profit is leaking` |
| SUBTITLE HIGHLIGHT | None |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | No |
| TRANSITION | Overlay lift + glide back to centre |
| SFX | None. Dip any music bed by 3 dB here. |
| WHY | The most human moment in the ad. Removing everything is itself a visual change after the busy middle. |

### SECTION 13. "WE'LL TELL YOU ON THIS CALL"
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:30.5 to 00:31.9 (SRC 00:31.3 to 00:32.7) |
| EXACT DIALOGUE | "we'll tell you on this call." |
| COMPOSITION TYPE | Full Sean |
| A-ROLL TREATMENT | Continuing slow push (reaches 106% at 00:31.9). |
| SEAN POSITION | Centre |
| B-ROLL CLIP | None |
| SOURCE TIMECODE | A-roll SRC 00:31.3 to 00:32.7 |
| SHOT DURATION | 1.4 s (part of the 4.7 s S12+S13 hold) |
| MOTION GRAPHIC | None |
| GRAPHIC READ TIME | n/a |
| HERO TEXT | None |
| SUBTITLE | `we'll tell you on this call` |
| SUBTITLE HIGHLIGHT | None |
| HEX COLOUR | `#FFFFFF` |
| ITALIC | Yes: `we'll tell you` |
| TRANSITION | None |
| SFX | None |
| WHY | Sincerity. White, a touch of italic, no hero graphic, no B-roll. |

### SECTION 14. CTA
| Field | Spec |
|---|---|
| TIMESTAMP | AD 00:31.9 to 00:38.0 (SRC 00:32.7 to 00:38.8) |
| EXACT DIALOGUE | "So tap Book Now and choose a time below for your free discovery call." |
| COMPOSITION TYPE | Cut-out Sean + CTA column (bookends Section 1) |
| A-ROLL TREATMENT | 00:31.9 to 00:32.5: room fades to Navy, Sean cut-out glides LEFT into exactly the S1 position. Hold. |
| SEAN POSITION | LEFT |
| B-ROLL CLIP | None |
| SOURCE TIMECODE | A-roll SRC 00:32.7 to 00:38.8 |
| SHOT DURATION | 6.1 s |
| MOTION GRAPHIC | 00:32.2 eyebrow `FREE` / `DISCOVERY CALL` fades up. 00:32.5 ("book") the `BOOK NOW` pill scales from 96 to 100% and fades in. 00:33.0 a `↓` arrow fades in under the pill, bobs twice (8 px), then holds still. 00:34.8 ("free discovery call" spoken): the eyebrow brightens from 80% to 100%, no other motion. Everything holds to the last frame. |
| GRAPHIC READ TIME | `BOOK NOW` 5.5 s. `FREE DISCOVERY CALL` 5.8 s. |
| HERO TEXT | `FREE` / `DISCOVERY CALL` (White, 40 px Bold) / `BOOK NOW` (White 56 px ExtraBold on a Flame Orange pill, 400 x 112, 56 px radius) / `↓` (White, 64 px) |
| SUBTITLE | `so tap Book Now and` / `choose a time below` then `for your free discovery call` |
| SUBTITLE HIGHLIGHT | `Book Now` |
| HEX COLOUR | `#FF4C32` |
| ITALIC | No |
| TRANSITION | Room-to-Navy dissolve + glide (matches S1, so the ad closes the loop) |
| SFX | 00:32.5 soft CTA click |
| WHY | BOOK NOW is the single biggest, brightest element on the final frame and the only orange. The `LEAK FOUND → PLAN` callback was left out to keep the frame clean. |

---

## PART 2. COMPOSITION PLAN (how Sean's A-roll changes)

```
AD TC        SEAN                          FRAME                                    CHANGE TYPE
00.0-00.9    FULL 110, centre              real blue room                           open on Sean
00.9-04.5    CUT-OUT LEFT                  Navy | $20K+ / KEEPING TOO LITTLE right  glide + room-to-navy
04.5-09.6    CUT-OUT RIGHT                 margin waterfall left, LEAK 02 > FIX     glide, diagram evolves
09.6-14.2    CARD RIGHT (40%)              diagnostic bars left (60%), PROFIT LEAK  cut-out shrinks into card
14.2-17.8    off (in B-roll)               full proof window: B1 > B2 + 8&9-FIGURE  card expands into window
17.8-22.3    off (in B-roll)               B-roll card left 60% | process right 40% window shrinks into card
22.3-24.4    FULL 100, centre              real room + FREE DISCOVERY CALL card     soft dissolve (the reset)
24.4-27.2    CUT-OUT LEFT (lighter)        darkened room | BUSINESS > PROFIT GOALS  overlay + glide
27.2-31.9    FULL 100 > 106 push, centre   real room, subtitles only                overlay lifts
31.9-38.0    CUT-OUT LEFT (= S1)           Navy | FREE DISCOVERY CALL / BOOK NOW    glide, bookend
```

Visual sketch (9:16 frames, S = Sean):

```
 00.0       01.5        05.2        10.2        14.7        18.3        22.3        25.0        28.0        32.5
┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐
│     │   │  │$K│   │▀▀▀│ │   │YOUR│┌┐│   │┌───┐│   │┌──┐L│   │     │   │  │BU│   │     │   │  │FR│
│  S  │   │S │  │   │▄▄ │S│   │▀▀▀ │S││   ││ B ││   ││B │C│   │  S  │   │S │↓ │   │  S  │   │S │▓▓│
│     │   │  │KE│   │▄  │ │   │▀▀  │└┘│   │└───┘│   │└──┘R│   │[FDC]│   │  │PG│   │     │   │  │ ↓│
│ ‾‾‾ │   │ ‾‾‾ │   │ ‾‾‾ │   │ ‾‾‾ │   │ ‾‾‾ │   │ ‾‾‾ │   │ ‾‾‾ │   │ ‾‾‾ │   │ ‾‾‾ │   │ ‾‾‾ │
└─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   └─────┘
 full      left      right     card      window    card+     full      left      full      left
                                         (B-roll)  process                                  CTA
 ‾‾‾ = fixed subtitle band
```

**Proof that this is not "Sean, B-roll, Sean, graphic":**
- 10 distinct compositions in 38 s (average 3.8 s each). Four distinct Sean treatments (full, cut-out left, cut-out right, card).
- **Zero hard cuts on the main frame.** Every change is a glide, a morph, a reflow or a dissolve. The only footage swaps (B1 to B2, B3 to B4) happen inside a window that does not move.
- Sean is on screen for 29.9 s of 38 s. B-roll occupies one 8.1 s block (14.2 to 22.3), and even then the Navy frame and graphics persist around it.
- 4 B-roll clips total.

---

## PART 3. PROFIT LEAK GRAPHIC SYSTEM

One diagram, born in S2, carried through S9. Same bars, same colours, same positions wherever possible, so the viewer never has to re-learn it.

### Stage A. REVENUE (S2 start)
| | |
|---|---|
| Text | `$20K+ REVENUE` |
| Colours | Label and bar `#9CD4FF` on `#06284C` |
| Animation | The `$20K+` from S1 scales down (150 to 40 px) and travels to x 64, y 340 over 0.6 s; `REVENUE` types on beside it. Bar (416 x 70) extends left to right from x 64, 0.5 s, ease out. |
| Total screen time | 00:05.0 to 00:09.6 (4.6 s) |
| Readable hold | 4.0 s |
| Background | Navy, Sean cut-out right |

### Stage B. LEAK 01 / 02 / 03, then PROFIT (S2)
| | |
|---|---|
| Text | `LEAK 01`, `LEAK 02`, `LEAK 03`, `PROFIT` |
| Colours | Leak bars `#DEEEFE` at 35% fill with a 2 px `#DEEEFE` outline, leak labels `#FFFFFF`, connector lines `#DEEEFE` dashed, profit bar and label `#FFFFFF` |
| Layout | Waterfall in the left column. Each leak takes a chunk off the right end of the revenue bar and steps it down one row (rows at y 510 / 610 / 710). Chunk widths: LEAK 01 80 px, **LEAK 02 130 px (deliberately the biggest)**, LEAK 03 70 px. PROFIT bar 136 px at y 830, starting at x 64. |
| Animation | Each chunk slides down 100 px and fades its label in, 0.35 s apart (05.3, 05.7, 06.1). Then the profit bar extends at 06.5 (0.4 s). Never more than one element moving at a time. |
| Total screen time | 00:05.3 to 00:09.6 (4.3 s) |
| Readable hold | Complete diagram 2.8 s, untouched by new elements for 0.5 s before Stage C starts |
| Background | Navy |

### Stage C. LEAK IDENTIFIED + FIX FIRST (S3)
| | |
|---|---|
| Text | `LEAK 02` (now orange), `FIX THIS FIRST` |
| Colours | LEAK 02 bar and label `#FF4C32`. LEAK 01 and 03 drop to 40% opacity. Connector `#FF4C32` 3 px. Tag text `#FFFFFF`. |
| Animation | Recolour 0.3 s at 07.3. Connector draws down 0.3 s at 07.6, tag slides up 20 px and fades in 0.3 s. One single orange pulse (ring scales 100 to 115%, fades) on the LEAK 02 bar. |
| Total screen time | 00:07.3 to 00:09.6 (2.3 s) |
| Readable hold | `FIX THIS FIRST` fully static for 1.7 s |
| Background | Navy |

### Stage D. YOUR NUMBERS / LEAK FOUND (S4 and S5)
| | |
|---|---|
| Text | `YOUR NUMBERS.` → `PROFIT LEAK` + `FOUND.`; bar labels `REVENUE`, `COSTS`, `PROFIT` |
| Colours | REVENUE `#9CD4FF`, COSTS `#DEEEFE`, PROFIT `#FFFFFF`, scan line `#9CD4FF`, leak segment and locator ring `#FF4C32`, `PROFIT LEAK` `#FF4C32`, `FOUND.` `#FFFFFF` |
| Animation | Waterfall reflows into three stacked bars (0.5 s; the leak chunks merge into a single COSTS bar, which is the visual idea: those leaks are hiding inside your costs). Scan line sweeps once (10.4 to 11.3), returns and parks on COSTS (11.7). Leak segment turns orange and locator ring stroke-draws (12.1, 0.4 s). Headline crossfades (12.1), `FOUND.` appears (12.6). |
| Total screen time | 00:09.6 to 00:14.2 (4.6 s) |
| Readable hold | `YOUR NUMBERS.` 2.2 s; `PROFIT LEAK FOUND.` complete and static for 1.6 s |
| Background | Navy, Sean in card on the right |

### Stage E. CHANGE MADE (S8)
| | |
|---|---|
| Text | `LEAK FOUND` ↓ `CHANGE MADE` |
| Colours | Orange dot `#FF4C32` (the only orange, a callback to the leak), text `#FFFFFF`, connector `#DEEEFE` |
| Animation | Stage labels fade up 20 px, one at a time; connector line draws downward between them (0.4 s). |
| Total screen time | 00:18.1 to 00:22.3 (4.2 s) |
| Readable hold | Each stage is static for at least 2.3 s before the ad leaves it |
| Background | Navy, B-roll card on the left |

### Stage F. RESULT MEASURED (S9)
| | |
|---|---|
| Text | `RESULT MEASURED`, `PROFIT` |
| Colours | Text `#FFFFFF`, profit bar `#FFFFFF`, connector `#DEEEFE` |
| Animation | Third stage appears (20.0). The same 136 px white profit bar from Stage B fades in, then extends to about 220 px (0.8 s, ease out). No number, no arrow graphic, no green. |
| Total screen time | 00:20.0 to 00:22.3 (2.3 s) |
| Readable hold | 2.3 s for the label, 1.2 s of static final bar |
| Background | Navy |

**Rules for the system:** revenue is always Blue Tint, costs and leaks Sky until identified, the identified leak is the only orange, profit is always white. The profit bar is the same object every time it appears (S2, S4, S9) so the viewer sees it shrink, get diagnosed, and then grow.

---

## PART 4. B-ROLL PULL LIST

Only four clips. All are from the B-Roll Short Cut sheet.

| # | CLIP NAME | SOURCE TIMECODE | AD SECTION | DURATION | PURPOSE |
|---|---|---|---|---|---|
| B1 | Sean and Mason standing talking to 2 woman | 00:05.0 to 00:06.7 | S6 specialists (AD 14.2 to 15.9) | 1.7 s (+0.4 s dissolve) | Specialists in real conversation with people. Credibility through behaviour, not claims. |
| B2 | Sean talking on stage at Shoptalk (rebuy file "Sean Clarke Pacific IQ.mp4") | 06:02.0 to 06:04.2 (alt 00:12.0 to 00:14.0) | S7 8- & 9-figure (AD 15.7 to 17.8) | 2.2 s | Event authority under the hero claim. Choose a wide frame, Sean as subject, sponsor logos not dominant. |
| B3 | Sean holding laptop talking to man | 00:03.0 to 00:05.2 | S8 make the changes (AD 17.8 to 20.0) | 2.2 s | Working with a team member, laptop in hand: implementation. |
| B4 | Angle over laptop, Sean thinking | 00:04.0 to 00:06.3 | S9 measure the result (AD 20.0 to 22.3) | 2.3 s | Analysis and measurement. Calm, considered. |

Grade all four gently toward the campaign: lift blacks slightly toward Navy, keep skin natural. Phone clips are stored rotated, rotate 90° upright on import.

**Considered and not used:**
- Walking in Klaviyo Event space: checked frame by frame. No people in focus and strong pink/red lighting that fights the palette. Generic walking.
- Sean on Laptop (9 to 12 s): first frame shows a different scene in a doorway; B4 does the analysis job better. Use as the alternate for B4 if its in-point is weak.
- Sean thinking and typing, close-up of face / Sean working on laptop in cream venue: good backups for B4, but no logged in-points in the sheet.
- Driving, coffee, street walking, hotel couch, Sweet E's, Dryft, Shopify intro: off-brief or excluded.

---

## PART 5. PACING AUDIT

### Every visual change on the main frame
| AD TC | Change | Time since previous change |
|---|---|---|
| 00.9 | Sean glides left, room to Navy | 0.9 (opening, intentional) |
| 04.5 | Sean glides right, diagram builds | 3.6 |
| 07.3 | LEAK 02 highlighted (no move) | 2.8 |
| 09.6 | Cut-out shrinks into card, diagram reflows | 2.3 |
| 12.1 | Leak located (no move) | 2.5 |
| 14.2 | Card expands into proof window | 2.1 |
| 15.7 | B1 to B2 dissolve inside window | 1.5 |
| 17.8 | Window shrinks into card (B3) | 2.1 |
| 20.0 | B3 to B4 dissolve inside card | 2.2 |
| 22.3 | Reset to full Sean | 2.3 |
| 24.4 | Sean glides left, darkened room | 2.1 |
| 27.2 | Overlay lifts, Sean centre | 2.8 |
| 31.9 | Navy, Sean left, CTA | 4.7 |
| 38.0 | End | 6.1 |

### Flags and resolutions
| Check | Result |
|---|---|
| Any shot under 1 second? | **None.** Shortest B-roll is B1 at 1.7 s. The opening FULL 110 state is 0.9 s, but it is not a shot: it flows continuously into the S1 composition with no cut. |
| Any motion graphic visible under 1.5 s? | **None.** Shortest reads: `ECOMMERCE SPECIALISTS` 1.5 s as a full label (then continues as eyebrow), `YOUR PROFIT GOALS` 1.6 s (three words), `FOUND.` 1.6 s (one word). |
| Text that may not stay long enough? | Three risks were found in the brief's literal timings and fixed: (1) **FIX THIS FIRST** would only have had 1.3 s if the frame changed on "Your strategist". Fixed by holding the S3 frame 0.5 s into the next sentence (2.0 s total). (2) **FOUND.** would have had 0.8 s. Fixed by holding the split until "specialists" (1.6 s). (3) **RESULT MEASURED** would have had 1.4 s. Fixed by holding until "free" (2.3 s). Holding a composition slightly past a sentence break is calmer than cutting early. |
| More than 3 cuts within 3 s? | **Never.** The densest window is 14.2 to 17.8 (2 changes in 3.6 s). There are zero hard cuts on the main frame. |
| Multiple pop-ins at once? | No. Leaks are staggered 0.35 to 0.4 s apart, every other build is one element at a time. |
| Frantic sections? | None. The busiest stretch (S6 to S9, 8 s) is framed by a persistent Navy layout so the eye has a fixed anchor while footage changes inside it. |

**Verdict: no flash-cut feel.**

---

## PART 6. SUBTITLE PLAN

Style: campaign caption preset, lowercase, no punctuation, white with thin dark outline, centred in the subtitle band (y 1130 to 1250). Bottom navy gradient on in every full-Sean frame. Two highlights and one italic in the whole ad.

| # | AD IN | AD OUT | Exact text (line 1 / line 2) | Default | Highlight | Highlight hex | Italic |
|---|---|---|---|---|---|---|---|
| 1 | 00:00.1 | 00:02.5 | shopify founders doing / $20,000 a month | `#FFFFFF` | $20,000 | `#9CD4FF` | none |
| 2 | 00:02.5 | 00:04.4 | and keeping / too little of it | `#FFFFFF` | none | | none |
| 3 | 00:04.5 | 00:06.2 | we'll show you the two / or three things | `#FFFFFF` | none | | none |
| 4 | 00:06.2 | 00:07.3 | eating your margin | `#FFFFFF` | none | | none |
| 5 | 00:07.3 | 00:08.7 | and what to fix first | `#FFFFFF` | none | | none |
| 6 | 00:09.0 | 00:11.1 | your strategist goes through / your numbers with you | `#FFFFFF` | none | | none |
| 7 | 00:11.1 | 00:13.0 | and finds where the / profit is leaking | `#FFFFFF` | none | | none |
| 8 | 00:13.4 | 00:14.7 | they then bring in / specialists | `#FFFFFF` | none | | none |
| 9 | 00:14.7 | 00:17.1 | who work with eight- and / nine-figure brands | `#FFFFFF` | none | | none |
| 10 | 00:17.1 | 00:19.6 | to help your team / make the changes | `#FFFFFF` | none | | none |
| 11 | 00:19.6 | 00:21.0 | and measure the result | `#FFFFFF` | none | | none |
| 12 | 00:21.4 | 00:23.9 | and it all starts with a / free discovery call | `#FFFFFF` | none | | none |
| 13 | 00:23.9 | 00:25.6 | where we'll go through / your business | `#FFFFFF` | none | | none |
| 14 | 00:25.6 | 00:26.7 | and your profit goals | `#FFFFFF` | none | | none |
| 15 | 00:27.1 | 00:28.7 | and if we can't show you | `#FFFFFF` | none | | none |
| 16 | 00:28.7 | 00:30.5 | or work out where the / profit is leaking | `#FFFFFF` | none | | none |
| 17 | 00:30.7 | 00:31.8 | we'll tell you on this call | `#FFFFFF` | none | | we'll tell you |
| 18 | 00:32.1 | 00:34.2 | so tap Book Now and / choose a time below | `#FFFFFF` | Book Now | `#FF4C32` | none |
| 19 | 00:34.4 | 00:35.8 | for your free discovery call | `#FFFFFF` | none | | none |

Notes:
- "Book Now" keeps its capitals as the name of the button the viewer must tap; everything else follows the campaign's lowercase style.
- `$20,000` is the only Blue Tint highlight, because the qualifier must read on mute in the first second. "profit", "leaking", "eight- and nine-figure", "profit goals" are all deliberately left white: the graphics already colour those ideas.
- If the editor hears "twenty thousand **plus**", line 1 becomes `$20,000+ a month`.

---

## PART 7. CONDENSED EDITOR SHOT LIST

| TIMESTAMP (AD) | DIALOGUE | COMPOSITION | SEAN POSITION | B-ROLL | GRAPHIC | HERO TEXT | SUBTITLE | EDIT |
|---|---|---|---|---|---|---|---|---|
| 00.0-00.9 | Shopify founders | Full Sean | Centre, 110% | none | none | none | shopify founders doing / **$20,000** a month | Open on Sean, slow push |
| 00.9-04.5 | doing $20,000 a month and keeping too little of it | Cut-out + info column | LEFT | none | Eyebrow, $20K+ mask reveal, divider, KEEPING TOO LITTLE | SHOPIFY FOUNDERS / $20K+ / MONTH / KEEPING **TOO LITTLE** | ...then: and keeping / too little of it | Room to Navy, glide left. SFX soft rise 01.4 |
| 04.5-07.3 | We'll show you the two or three things eating your margin | Cut-out + margin waterfall | RIGHT | none | $20K+ becomes revenue bar, 3 leaks step down, profit bar | $20K+ REVENUE / LEAK 01-03 / PROFIT | we'll show you the two / or three things, eating your margin | Glide right, lockup morph. SFX click 05.3 |
| 07.3-09.6 | and what to fix first. (Your strategist...) | Same, held | RIGHT | none | LEAK 02 to orange, others dim, connector + tag | **FIX THIS FIRST** | and what to fix first | No cut. SFX lock 07.6 |
| 09.6-11.3 | Your strategist goes through your numbers with you | 40/60 split | CARD RIGHT, 130% | none | Waterfall reflows to 3 bars, scan line | YOUR NUMBERS. | your strategist goes through / your numbers with you | Cut-out shrinks into card |
| 11.3-14.2 | and finds where the profit is leaking. (They then bring in) | Same split, held | CARD RIGHT | none | Scan parks on COSTS, orange segment + locator | **PROFIT LEAK** / FOUND. | and finds where the / profit is leaking, they then bring in / specialists | No cut. SFX click 12.1 |
| 14.2-15.9 | specialists who work with | Proof window | Off | B1 Sean+Mason w/ 2 women 00:05.0-06.7 | Bottom gradient, label | ECOMMERCE SPECIALISTS | who work with eight- and / nine-figure brands | Card expands to window. SFX soft air 14.2 |
| 15.7-17.8 | eight and nine figure brands | Proof window + hero overlay | Off | B2 Shoptalk stage 06:02.0-06:04.2 | Label evolves to eyebrow, hero mask reveal | SPECIALISTS WHO WORK WITH / 8- & 9-FIGURE / BRANDS | (cont.) | Dissolve inside window |
| 17.8-20.0 | to help your team make the changes | 60/40 card + process | Off | B3 Sean holding laptop talking to man 00:03.0-05.2 | Stages 1-2 build | LEAK FOUND ↓ CHANGE MADE | to help your team / make the changes | Window shrinks to card with crossfade |
| 20.0-22.3 | and measure the result. (And it all starts with) | Same, held | Off | B4 Angle over laptop, Sean thinking 00:04.0-06.3 | Stage 3, profit bar grows | RESULT MEASURED / PROFIT | and measure the result, and it all starts with a / free discovery call | Dissolve inside card. SFX tick 20.3 |
| 22.3-24.4 | a free discovery call | Full Sean reset | Centre, 100% | none | Navy card | **FREE** DISCOVERY CALL | (cont.) | Soft dissolve. SFX low impact 22.6 |
| 24.4-27.2 | where we'll go through your business and your profit goals. | Cut-out over darkened room + column | LEFT (slight) | none | Two stages with line | YOUR BUSINESS ↓ YOUR PROFIT GOALS | where we'll go through / your business, and your profit goals | 75% Navy overlay, glide left |
| 27.2-30.5 | And if we can't show you or work out where the profit is leaking, | Full Sean, stripped | Centre, push 100-106% | none | none | none | and if we can't show you, or work out where the / profit is leaking | Overlay lifts. Music dip 3 dB |
| 30.5-31.9 | we'll tell you on this call. | Full Sean | Centre | none | none | none | *we'll tell you* on this call | Push continues. No SFX |
| 31.9-38.0 | So tap Book Now and choose a time below for your free discovery call. | Cut-out + CTA column | LEFT (= S1) | none | Eyebrow, orange pill, arrow | FREE DISCOVERY CALL / **BOOK NOW** / ↓ | so tap **Book Now** and / choose a time below, for your free discovery call | Room to Navy, glide left. SFX CTA click 32.5. Hold to end |

---

## FINAL CREATIVE CHECK

| # | Question | Answer |
|---|---|---|
| 1 | Visually different from previous talking-head ads? | Yes. The references alternate full-frame Sean with full-frame graphics. This ad has no full-frame graphic cards at all: Sean shares the frame with information for most of the runtime. |
| 2 | Sean used as a design element? | Yes. Four treatments (full, cut-out left, cut-out right, card), full-frame centre only 7.7 s of 38 s. |
| 3 | Frame evolves instead of cutting? | Yes. Zero hard cuts on the main frame. |
| 4 | $20K+ qualifier obvious immediately? | Yes. On screen at 1.4 s in Blue Tint at 150 px, and in the first subtitle. |
| 5 | "Keeping too little" visually clear? | Yes. Orange TOO LITTLE under a blue $20K+, then made literal by the small white profit bar. |
| 6 | 2-3 margin leaks easy to understand? | Yes. Three labelled bites out of one bar, built one at a time. |
| 7 | "What to fix first" visually obvious? | Yes. One leak turns orange, the others dim, a tag says it. |
| 8 | Strategist section analytical? | Yes. Bars, scan line, locator. No fake statements. |
| 9 | Specialist section credible? | Yes. Real event and real conversations, held long enough to register. |
| 10 | 8- & 9-figure without implying client relationships? | Yes. The eyebrow says SPECIALISTS WHO WORK WITH, and the footage is Sean on stage, not client logos. Editor: avoid frames where sponsor logos dominate. |
| 11 | Implementation process clear? | Yes. LEAK FOUND ↓ CHANGE MADE ↓ RESULT MEASURED. |
| 12 | PROFIT is the metric measured? | Yes. Labelled PROFIT, white, the same bar from S2. |
| 13 | No flash cuts? | Yes. Shortest shot 1.7 s, no hard cuts on the frame. |
| 14 | Every graphic readable? | Yes. Minimum 1.5 s for any text; three timings were extended (see Part 5). |
| 15 | B-roll held long enough? | Yes. 1.7 to 2.3 s each. |
| 16 | Discovery call clear? | Yes. Shown at 22.6 and held 5.8 s on the end card, and spoken twice. |
| 17 | Trust statement has breathing room? | Yes. 4.7 s of plain full-frame Sean, no graphics, no SFX. |
| 18 | BOOK NOW dominant CTA? | Yes. Largest, only orange element on the final frame, held 5.5 s. |
| 19 | Normal bottom subtitles? | Yes. One fixed band, campaign preset. |
| 20 | White dominant in subtitles? | Yes. 17 of 19 lines are entirely white. |
| 21 | Orange and Blue Tint used sparingly? | Yes. Orange: TOO LITTLE, LEAK 02 + connector, PROFIT LEAK segment, the leak dot, BOOK NOW. Blue Tint: revenue, FREE, 8- & 9-FIGURE, $20,000. |
| 22 | Every element has a reason to be on screen? | Yes. Each element is a stage of the profit-leak story or the offer. Nothing decorative. |

---

## Open items for the editor
1. Confirm by ear whether Sean says "twenty thousand plus". Adjust subtitle 1 if so.
2. Confirm the four B-roll in-points by eye (Drive blocked full downloads during analysis). If B2 at 06:02 shows a sponsor wall behind him, use the 00:12 alternate.
3. Build the roto matte first; four of the ten compositions depend on it.
4. Music: use the campaign's existing bed at a low level if the other ads use one; dip 3 dB under S12-S13.
