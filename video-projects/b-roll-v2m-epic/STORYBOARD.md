# b-roll-v2m-epic — STORYBOARD

**EcomIQ · 9:16 1080×1920 @ 30fps · ~78s · cinematic navy / sky-blue, VO-driven**

Aesthetic note: this is a brand-*film*, so scenes hold longer than the MOTION_PHILOSOPHY
1.5s default (3–9s beats). We keep the discipline — one idea per beat, motion in every
shot (slow dolly, grain breath, type reveals, whip transitions), callbacks, a held
outro — but adapt pacing + palette to the cinematic fintech brief.

## Timing table

| # | Comp file | Start | Dur | Beat | VO |
|---|---|---|---|---|---|
| 1 | `00-hook.html` | 0:00 | 7.0 | The paradox | "If your Shopify brand is doing more revenue than ever, but you're not keeping more money than ever, this is probably why." |
| 2 | `01-assumption.html` | 0:07 | 6.0 | The false assumption | "Most founders assume that when revenue goes up, profit follows…" |
| 3 | `02-divergence.html` | 0:13 | 5.0 | Fastest-growing = most pressure | "…but that's just not how it works. The fastest growing Shopify brands are the ones feeling the most pressure." |
| 4 | `03-cost-leak.html` | 0:18 | 12.0 | The 5 creeping costs | "Ad spend creeps up. Shipping gets more expensive, returns eat margins, cost of goods rises, discounts harder to avoid." |
| 5 | `04-drain.html` | 0:30 | 8.0 | They quietly pull profit out | "None feel major on their own, but together they quietly pull profit out while revenue keeps climbing." |
| 6 | `05-record-sales.html` | 0:38 | 8.0 | Record sales, where's the money | "Record sales months and still wonder where the money went. The problem usually isn't sales." |
| 7 | `06-rev-vs-profit.html` | 0:46 | 9.0 | Revenue vs Profit (hero) | "Revenue is what you sold, but profit is what you get to keep." |
| 8 | `07-only-profit.html` | 0:55 | 5.0 | Only one pays you | "Only one of them will pay you." |
| 9 | `08-we-help.html` | 1:00 | 7.0 | EcomIQ finds the leak | "…we can help you find exactly where the margin is leaking and what needs fixing first." |
| 10 | `09-cta.html` | 1:07 | 11.0 | CTA hold | "Click the link below… we guarantee the breakthrough you're looking for." |

Total ≈ 78s.

---

## Beats

### Beat 1 — HOOK (0:00–7.0) — the paradox in two words
- **Visual:** Cold open on near-black navy. Cinematic close-up b-roll of founder at
  laptop (slow dolly push-in, shallow DoF), graded navy + lifted blacks + grain.
  Kinetic type punches the contradiction: **"MORE REVENUE."** (sky-blue) rises, then
  **"LESS MONEY."** drops in below, larger, blue-tint italic-serif on "MONEY."
- **Motion language:** slow dolly behind, type slams in with motion blur.
- **Eases:** `expo.out` (word in), `power2.in` (settle), `sine.inOut` (grain/vignette breath).
- **Exit:** vertical whip up (blur 0→30px).
- **Audio:** VO line 1; ambient pad in.
- **B-roll candidate:** "Sean thinking and typing… close up of face" / "Angle over laptop - Sean thinking".

### Beat 2 — THE ASSUMPTION (7.0–13.0)
- **Visual:** A single clean line chart. **REVENUE** line climbs steadily (sky-blue),
  a soft up-arrow. Caption-type: *"Revenue up → profit follows?"* (the "?" lingers).
- **Motion:** line draws on (`stroke-dashoffset`), camera holds with grain breath.
- **Eases:** `power2.out` (line draw), `power2.inOut`.
- **Exit:** the chart stays — carries into Beat 3 (no cut, continuous).
- **Audio:** VO line 2.

### Beat 3 — DIVERGENCE (13.0–18.0)
- **Visual:** SAME chart (callback/continuity). Now a **PROFIT** line splits off and
  flattens / dips while REVENUE keeps climbing — the gap opens. Word **"pressure"**
  glows over a quick founder-pressure b-roll flash.
- **Motion:** second line draws + diverges, gap shaded sky-blue→navy.
- **Eases:** `power3.out`, `power2.in`.
- **Exit:** whip up into the cost montage.
- **B-roll candidate:** "Sean Texting in car" / "Sean on laptop - typing low angle".

### Beat 4 — THE 5 CREEPING COSTS (18.0–30.0) — rule-of-fives, dense kinetic
- **Visual:** Navy stage. Five cost rows tick in **on each VO word**, each with a small
  up-tick arrow: **AD SPEND ↑ · SHIPPING ↑ · RETURNS ↑ · COGS ↑ · DISCOUNTS ↑**.
  Each row nudges the running PROFIT bar (right edge) down a notch. Faint product/
  shipping b-roll textures behind, heavily darkened.
- **Motion:** staggered row entrance (`stagger 0.1`), each arrow flicks up, profit bar
  shrinks in steps.
- **Eases:** `expo.out` (rows), `back.out(1.2)` (arrows).
- **Exit:** all five rows blur-collapse downward into Beat 5's drain.
- **Audio:** VO line 4 (the list); soft ticks (0.2) per row.
- **B-roll candidate:** Dryft product clips (COGS/shipping), graded cool.

### Beat 5 — THE DRAIN (30.0–38.0) — hero metaphor
- **Visual:** The profit "drains." Revenue line keeps climbing top-frame while a
  navy/sky particle-or-liquid column **drains downward** out of frame — "quietly pull
  profit out." Volumetric raking light, heavy grain, slow-mo feel.
- **Engine:** Runway Gen-4 clip (if key) using the intent prompt — *else* Canva navy
  still + parallax — *else* hand-built GSAP particle drain.
- **Motion:** continuous downward drift, revenue line unaffected (the irony).
- **Eases:** `none` (constant drain), `sine.inOut` (drift).
- **Exit:** flash-dim into Beat 6.
- **Audio:** VO line 5; pad swells slightly.

### Beat 6 — RECORD SALES, WHERE'S THE MONEY (38.0–46.0)
- **Visual:** **"RECORD SALES"** lands big + bright (brief up-beat), then deflates as
  **"…where did it all go?"** ghosts in. Founder b-roll: looking up from laptop /
  thinking. The pivot line "The problem usually isn't sales" sets up the reframe.
- **Motion:** celebratory scale-in, then sink + desaturate.
- **Eases:** `back.out(1.4)` (in), `power2.in` (sink).
- **Exit:** hard-ish cut on "isn't sales" into the definition.
- **B-roll candidate:** "Over mason's shoulder - Sean sitting and talking" / "Sean working with laptop on lap".

### Beat 7 — REVENUE vs PROFIT (46.0–55.0) — the hero typographic moment
- **Visual:** Split definition, full type, no footage. Top: **REVENUE** — "what you
  sold." Bottom: **PROFIT** (Hedvig italic emphasis, blue-tint) — "what you keep."
  A thin divider line between. The piece's thesis frame.
- **Motion:** each half slides in from its edge, divider draws between.
- **Eases:** `expo.out` (slides), `power2.out` (divider).
- **Exit:** REVENUE dims away, PROFIT holds → Beat 8.
- **Audio:** VO line "Revenue is what you sold, but profit is what you get to keep."

### Beat 8 — ONLY ONE PAYS YOU (55.0–60.0) — breathing beat
- **Visual:** REVENUE gone. **PROFIT** alone, centered, sky-blue halo glow, gentle
  scale-breath. "Only one of them will pay you." Negative space, stillness.
- **Motion:** slow glow pulse, grain breath. The rest moment before the offer.
- **Eases:** `sine.inOut`.
- **Exit:** whip into the solution.

### Beat 9 — ECOMIQ FINDS THE LEAK (60.0–67.0)
- **Visual:** Confident founder b-roll (walking with purpose / Shoptalk authority),
  graded navy. EcomIQ logo enters top-left. Type: *"We find exactly where your margin
  is leaking — and what to fix first."* The diverging-gap motif from Beat 3 returns as
  a small callback, now with a pinpoint marker on the leak.
- **Motion:** logo fade-in, type rise, marker pings the leak point.
- **Eases:** `power3.out`, `back.out(1.7)` (marker).
- **Exit:** push up into CTA.
- **B-roll candidate:** "Sean walking down street - from behind" / "Sean walking around Shoptalk 26 talking".

### Beat 10 — CTA HOLD (67.0–78.0) — 11s held outro
- **Visual:** Navy stage, EcomIQ logo centered. Headline: **"We guarantee the
  breakthrough you're looking for."** (Hedvig italic on *"breakthrough"*). Below, the
  **flame `#FF4C32` CTA button: "Click the link below →"** — the single warm accent in
  the whole piece, earning its place. Shimmer sweep passes the logo once. Hold 4–6s
  past the final VO word.
- **Motion:** logo settle, button scale-in (`back.out(1.7)`), shimmer sweep, grain breath.
- **Eases:** `power3.out`, `back.out(1.7)`, `sine.inOut`.
- **Audio:** VO closing (repeated CTA); pad resolves, fades to silence under the hold.

---

## Structure check (rule of threes / MOTION_PHILOSOPHY)
- **Act 1 (0–18s, ~23%):** paradox → false assumption → divergence (hook).
- **Act 2 (18–55s, ~47%):** 5 costs → drain → record-sales irony → revenue/profit thesis.
- **Act 3 (55–78s, ~30%):** only-profit-pays → EcomIQ solution → CTA hold.
- **Callbacks:** the revenue/profit **line chart + gap** recurs (Beats 2→3→9); the word
  **PROFIT** carries through 7→8→(payoff).
- **Texture:** navy canvas + grain + vignette + raking light on every beat.
- **Breathing:** Beat 8 + the long Beat 10 outro hold.
- **Single warm accent:** flame only on the CTA button (Beat 10).
</content>
