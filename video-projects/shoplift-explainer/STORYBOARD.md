# STORYBOARD — ShopLift Explainer (9:16, ~58.5s)

Timings anchored to `shoplift-vo.transcript.json`. Each row = one sub-composition file (isolated document: own local GSAP + fonts + scoped styles + one paused timeline). Transitions are matched-velocity vertical whips (blur + y) at the seams unless noted.

## Timing table

| # | File | Start | Dur | VO line | One idea |
|---|---|---|---|---|---|
| 1 | `01-hook.html` | 0.00 | 9.10 | "Have you ever run an A/B test… it just keeps running? Two weeks go by, then four… still no closer to an answer." | The test that never ends |
| 2 | `02-give-up.html` | 9.10 | 3.30 | "Eventually you give up and launch the version you preferred in the first place." | You cave & ship your gut pick |
| 3 | `03-traffic.html` | 12.40 | 3.41 | "and for a lot of Shopify stores, the issue is simply traffic." | The real issue = traffic |
| 4 | `04-significance.html` | 15.81 | 7.05 | "A traditional significance test can need thousands of visitors on each version before it's confident enough to call a winner," | Significance is hungry for traffic |
| 5 | `05-volume.html` | 22.86 | 2.67 | "and plenty of stores just don't have that volume." | Most stores fall short |
| 6 | `06-not-data.html` | 25.53 | 5.44 | "There's nothing wrong with the test — there just isn't enough data for it to give you a clear answer." | Test's fine; data's thin |
| 7 | `07-shoplift.html` | 30.97 | 4.20 | "And this is why ShopLift's latest update helps solve this." | The turn → the fix |
| 8 | `08-probability.html` | 35.17 | 5.21 | "Instead of waiting for a test to pass or fail, you can see how likely each version is to win" | Probability-to-win |
| 9 | `09-uplift.html` | 40.38 | 2.83 | "and what kind of difference it could make." | Uplift range +X% |
| 10 | `10-no-diff.html` | 43.21 | 6.84 | "It'll also tell you when there isn't enough of a difference between the two versions to even matter — and that's still very, very useful." | "No real difference" is an answer too |
| 11 | `11-decision.html` | 50.05 | 4.55 | "You can make a decision and move on instead of leaving a test running for months…" | Decide & move on (spinner callback resolves) |
| 12 | `12-endcard.html` | 54.60 | 3.90 | (VO tail → silence) | EcomIQ logo + "Find out more →" hold |

**Persistent overlay (in `index.html`, above scenes):** EcomIQ logo top-left, 0→54.6 (fades before the end card so we never double a logo). Ambient navy bg + faint grid + vignette + grain are self-contained per scene (isolated docs) so the texture is consistent throughout.

**Three-act shape:** Act 1 hook/problem 0–15.8s (27%) · Act 2 why-it-fails 15.8–31s (26%) · Act 3 the-fix + payoff 31–58.5s (47% — the product beats + held outro are where the value lands).

---

## Beat detail

### 1 — `01-hook` (0.00–9.10) · The test that never ends
- **Elements:** Two variant cards **A** (blue-grey) and **B** (blue-tint) slide in side-by-side (@0.3). A `Confidence` meter bar under them fills 0→~40% by ~2s then **stalls**, a flame spinner ticking beside "Running…". At ~4.9 ("Two weeks go by, then four") a compact calendar chip flips **WK 2 → WK 4** with a motion-blurred card-flip; the confidence bar nudges only +3%. Label hardens to "still running…" (~7.5, flame).
- **Motion:** cards `power3.out` slide; bar `none` linear fill then dead-stop; spinner continuous `none` rotation; calendar flip `power2.inOut` rotateX; a slow bg grid parallax + vignette breath keep it alive.
- **Eases:** power3.out · none · power2.inOut · sine.inOut(breath).
- **Exit:** whip up (y −150, blur 30) @ ~8.9.

### 2 — `02-give-up` (9.10–12.40) · Launch anyway
- **Elements:** The two cards return smaller; cursor moves to Variant A; a big flame **"LAUNCHED ANYWAY"** stamp slams in rotated ~−8° with overshoot + dust ring (@ ~10.2 on "launch"). The unfinished confidence bar greys out.
- **Motion:** stamp `back.out(2)` scale-down slam + tiny settle; ring ripple `power2.out`.
- **Exit:** whip up @ ~12.25.

### 3 — `03-traffic` (12.40–15.81) · The issue is traffic
- **Elements:** A simplified Shopify-style store card (top bar + product tile + buy button, navy/sky). Below it a **traffic meter** with only a thin trickle of visitor dots drifting up (sparse). At ~14.6 ("simply traffic") the word **traffic** locks in (Hedvig italic, blue-tint) with a low bar reading e.g. "~180 visitors/day".
- **Motion:** store card slide-up `power3.out`; visitor dots staggered drift `sine.inOut`; meter fill stops low.
- **Exit:** whip up @ ~15.66.

### 4 — `04-significance` (15.81–22.86) · Significance is hungry for traffic
- **Elements:** Center **"Significance"** gauge (arc) with a **95%** target line. Two visitor **counters** (A / B) tick rapidly upward toward "thousands" — numerals racing 0→7,400+ with a flame "visitors needed" tag. The gauge needle creeps toward 95% only as the counters balloon. Copy chip: "needs thousands per version". Everything reads: confidence costs traffic you may not have.
- **Motion:** counter = GSAP proxy tween onUpdate → formatted integer (deterministic, no random); needle `power1.inOut`; arc fill `none`.
- **Eases:** none · power1.inOut. Held 7s but numbers move the whole time.
- **Exit:** whip up @ ~22.7.

### 5 — `05-volume` (22.86–25.53) · Most stores fall short
- **Elements:** A row/grid of small store dots; a horizontal **threshold line** ("enough traffic"). Most dots sit **below** it (blue-grey), only a couple above (blue-tint). Tag: "plenty just don't have the volume" — the below-line cluster pulses flame briefly.
- **Motion:** dots stagger-in `power2.out` from below; threshold line wipes across `power3.out`.
- **Exit:** quick whip @ ~25.4.

### 6 — `06-not-data` (25.53–30.97) · The test's fine; the data's thin
- **Elements:** A "Test" chip earns a **✓ green-blue "working"** tick ("nothing wrong with the test"). But the result panel shows **"NOT ENOUGH DATA"** and a big **"?"** where a winner should be — the answer field reads "— no clear answer —". A thin data-fill bar sits well short of a "clear answer" mark.
- **Motion:** ✓ draws on (stroke-dashoffset); "?" flickers in with a soft flame glow; result panel settles `power2.out`.
- **Exit:** **brighter flash-whip** @ ~30.8 to mark the turn into the solution.

### 7 — `07-shoplift` (30.97–35.17) · The turn → the fix
- **Elements:** Navy clears to a cleaner surface. A **"ShopLift"** product badge + **"Latest update"** eyebrow crystallize center (blue-tint glow, chrome sweep across the wordmark). A thin flame rule wipes under it. This is the breath/pivot beat — 1 idea, held ~1.5s after reveal.
- **Motion:** badge scale 0.9→1 `back.out(1.4)`; chrome-gradient sweep `power2.out` stagger; rule scaleX `power3.out`.
- **Exit:** gentle whip up @ ~35.0.

### 8 — `08-probability` (35.17–40.38) · Probability-to-win
- **Elements:** The A/B cards return — now each with a big **probability-to-win %**. Two arcs/bars fill: **A 34%** (blue-grey) vs **B 66%** (blue-tint, glowing, subtle "leading" chip). "Likelihood to win" header. Counts animate up to their values; B's ring pulses once on landing.
- **Motion:** ring fills via proxy tween (deterministic); numerals count up; B halo `sine` pulse.
- **Exit:** whip up @ ~40.2.

### 9 — `09-uplift` (40.38–43.21) · Uplift range
- **Elements:** Beneath variant B, an **uplift range** reveals: **"+8% → +19% CVR"** (blue-tint), with a small distribution band (a soft range bar with a center marker). "Projected difference" label. Short, punchy.
- **Motion:** range bar expands from center `power3.out`; +% numerals count up; band shimmer.
- **Exit:** whip up @ ~43.05.

### 10 — `10-no-diff` (43.21–50.05) · "No real difference" is useful too
- **Elements:** A and B bars animate to **nearly equal** heights; a linking bracket + **"No meaningful difference"** pill (blue-grey, calm — NOT flame). Then a reassuring **"Still useful ✓"** tag (blue-tint) lands on "very, very useful". Copy: "not enough of a difference to matter".
- **Motion:** bars ease to near-equal `power2.inOut`; pill fades/scales `power2.out`; "Still useful" `back.out(1.4)` on the "useful" word (~49.3, lead the audio ~0.2s).
- **Exit:** whip up @ ~49.9.

### 11 — `11-decision` (50.05–54.60) · Decide & move on (callback)
- **Elements:** The original test card returns; the **stuck confidence spinner from beat 1 resolves** — it snaps to 100% and turns into a **"Decision made ✓"** state, then a **"Test closed"** stamp settles calmly (blue-tint, not flame — this is the good ending). A faint "months →" strikethrough underscores "instead of leaving it running for months".
- **Motion:** spinner accelerates then locks `power3.out`; ✓ draw-on; stamp settle `back.out(1.2)`.
- **Exit:** clean fade/whip into end card @ ~54.45; persistent top-left logo fades here.

### 12 — `12-endcard` (54.60–58.50) · Outro hold
- **Elements:** Centered **EcomIQ logo lockup** (white on navy) + tagline line + **"Find out more →"** flame pill. Soft blue bloom + grain. Held ~3.9s (breathing outro). Subtle shimmer sweep over the logo once.
- **Motion:** logo fade/rise `power3.out`; pill `back.out(1.7)`; gentle CTA breath `sine.inOut` yoyo; bloom drift.
- **Exit:** none — final hold to 58.50.

---

## Discipline check (MOTION_PHILOSOPHY)
- ✅ One idea per beat · ✅ ≤5 hues, flame = sole hot accent · ✅ motion in every transition (whips, no hard cuts) · ✅ unifying texture (grid+vignette+grain on navy) · ✅ callback (stuck spinner → resolved) · ✅ chrome/emphasis type, not flat white · ✅ held outro (~4s) · ✅ every sub-comp timeline ends with the `SLOT_DURATION` anchor.
