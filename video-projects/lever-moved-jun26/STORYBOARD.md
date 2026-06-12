# lever-moved-jun26 — Storyboard

Full-bleed face video (60.3s) with motion-graphic overlays + word-synced captions.
One continuous shot → animation lives in the overlays and the **lever motif**.

## Timing table (6 beats over the single continuous take)

| Beat | Time | Duration | One idea | Hero overlay |
|------|------|----------|----------|--------------|
| 1 · HOOK            | 0.0–8.0   | 8.0s  | "Spending more, making less" | Kinetic "MORE SPEND ↑ / LESS PROFIT ↓" |
| 2 · USED TO WORK    | 8.0–15.0  | 7.0s  | The old playbook worked… then stopped | `SPEND ↑ → GROWTH ↑` + "USED TO WORK" stamp |
| 3 · DIVERGE + LEVER | 15.0–29.0 | 14.0s | ROAS drifts down; the old lever | Diverging spend/ROAS chart → **lever (old position)** |
| 4 · 3 WEAKNESSES    | 29.0–43.0 | 14.0s | More spend exposes what's broken | 3 flame chips: conversion · retention · margins |
| 5 · THE LEVER MOVED | 43.0–54.0 | 11.0s | The game changed — the lever moved | **Lever slides to new position** + "the *lever moved*" |
| 6 · CTA OUTRO       | 54.0–60.3 | 6.3s  | Find what's holding you back | Logo lockup + flame "Click the link below →" |

**Three-act shape:** Act 1 hook (0–15, ~25%) · Act 2 body (15–43, ~46%) · Act 3 payoff+CTA (43–60, ~29%).
**Callback:** lever introduced beat 3 (~24s), pays off beat 5 (~46s).

---

## Beat 1 — HOOK (0.0–8.0)
**Concept:** Name the exact pain in the first second.
- **Overlay:** Two stacked kinetic lines, lower third, over the face:
  `MORE SPEND` with a small up-chevron, then `LESS PROFIT ↓` in **flame**.
  Words slide+blur in (carrier 360px → tail decay), flame line punches 0.2s ahead of "less profit."
- **Logo:** EcomIQ white lockup fades in top-left (top scrim), stays for the whole ad.
- **Captions:** "If you're spending more on Meta than ever" → "and making less profit than ever," → "this is probably why." → "Most Shopify founders think the answer's simple."
- **Motion:** subtle 1.04× slow push-in on the face wrapper across the beat (camera never sleeps).
- **Exit:** overlay lines rise + blur out (vertical whip) into beat 2.
- **Eases:** `expo.out` (word in), `power2.in` (exit), `sine.inOut` (push-in).

## Beat 2 — USED TO WORK (8.0–15.0)
**Concept:** The simple answer ("spend more") genuinely used to work.
- **Overlay:** Equation builds: `SPEND ↑` → arrow → `GROWTH ↑` (white/blue-tint),
  then a **flame "USED TO WORK"** stamp rotates in (`back.out`). On "the game's
  completely changed," the stamp desaturates/strikes and the equation fades.
- **Captions:** "Need more revenue? Spend more on ads." → "And for a long time, that's what worked." → "The problem is the game's completely changed."
- **Exit:** equation collapses; whip into the chart.
- **Eases:** `power3.out`, `back.out(1.6)` (stamp), `power2.in` (collapse).

## Beat 3 — DIVERGE + LEVER INTRO (15.0–29.0)
**Concept:** Spend keeps rising while ROAS drifts down — and founders keep pulling the *old* lever.
- **Overlay A (15–22):** compact line chart, upper-right card: **spend line climbs**
  (blue-tint), **ROAS line drifts down** (flame). `ROAS ↓` + `PROFIT ↓` flame chips
  pop on "drifts down… squeezed." Lines draw via `stroke-dashoffset`.
- **Overlay B (22–29):** chart slides out; the **LEVER** appears — a slider/lever
  graphic pinned **left ("old position")**, with an "18 MONTHS AGO" tag on
  "used to work 18 months ago." Lever handle glows (it's the thing they keep pulling).
- **Captions:** "Brands increase spend month after month," → "while ROAS drifts down and profits get squeezed." → "Not because they're bad marketers —" → "they're still pulling the lever" → "that used to work 18 months ago."
- **Exit:** lever holds on screen (it returns in beat 5).
- **Eases:** `power2.inOut` (chart draw), `power3.out` (lever in), `sine.inOut` (handle glow breath).

## Beat 4 — THREE WEAKNESSES (29.0–43.0)
**Concept:** Today, more spend *exposes* what's already broken. (Rule of threes.)
- **Overlay:** `MORE SPEND = MORE GROWTH` shows, then a **flame strike + "NOT ANYMORE"**.
  Then three chips stagger in as each is named, lower stack:
  **1 · Weak conversion** · **2 · Poor retention** · **3 · Margins can't scale** —
  flame number badges, each lands on its caption word.
- **Captions:** "More spend used to mean more growth." → "Today, more spend exposes the weaknesses" → "already sitting inside your business:" → "Weak conversion rates." → "Poor retention." → "Margins that can't support scale."
- **Motion:** chips have a tiny `back.out` settle; the three stay stacked, dim slightly as the next lands.
- **Exit:** chips clear; lever re-enters for the payoff.
- **Eases:** `power2.in` (strike), `back.out(1.5)` (chip settle).

## Beat 5 — THE LEVER MOVED (43.0–54.0)  ← hero / callback
**Concept:** The platforms changed and the lever physically moved — most haven't noticed.
- **Overlay:** the lever from beat 3 returns; on "and the **lever moved**," the handle
  **slides from the old (left) position to a new (right) position** with a motion-blur
  trail, and the headline lands: **"The lever** ***moved.***" — "moved" in **Hedvig
  italic, flame**, scaled big, held ~1.5s (the one still moment / hero shot).
- **Captions:** "The platforms got harder. The signal got worse." → "And the lever moved." → "Most founders just haven't realized it yet." → "If your ad spend keeps climbing" → "but the results aren't following…"
- **Motion:** brief slow-mo feel — face push-in pauses, overlay carries the energy.
- **Exit:** headline + lever fade as the navy CTA scrim rises.
- **Eases:** `power4.in`→`power2.out` (lever slide w/ blur), hold on `none`.

## Beat 6 — CTA OUTRO (54.0–60.3)  ← hold 4–6s
**Concept:** Soft, confident CTA. Diagnose your growth.
- **Overlay:** navy bottom card rises (face dims slightly behind a stronger scrim or
  the face stays top, card owns bottom 45%). EcomIQ white logo lockup, headline
  **"What's actually holding your growth back?"** (Hedvig italic on "*holding*"),
  flame pill button **"Click the link below →"** with a subtle down-nudge loop.
- **Captions:** "Let's find what's actually holding your growth back." (CTA card carries the rest.)
- **Motion:** button settle `back.out`, then a gentle 2s breathing loop; hold the card to 60.3s.
- **Eases:** `power3.out` (card rise), `back.out(1.7)` (button), `sine.inOut` (breath).

---

## Build architecture (Gate 6)
- **Single root composition** in `index.html` (one continuous face video → not chopped
  into sub-comps). `data-duration="60.33"`.
- **Track 0:** `<video src="assets/lever-face.mp4" muted data-has-audio="true">` in a
  wrapper div (animate the wrapper, never the video — Render Contract #9), full-bleed,
  center-cropped to 4:5 via `object-fit: cover` + scale.
- **Tracks 1–3:** top scrim + logo, bottom scrim, grain/vignette (full duration).
- **Tracks 5–15:** motion-graphic overlay groups per beat, shown via `data-start`/
  `data-duration`, entrances/exits driven by the one master GSAP timeline.
- **Tracks ≥20:** captions as body-level siblings (MOTION_PHILOSOPHY §3.13).
- One paused master timeline on `window.__timelines["lever-moved-jun26"]`, padded to
  60.33s with `tl.to({}, { duration: 60.33 }, 0)` (Law 11).

## Verification plan
Draft render → pull frames at 2, 6, 11, 18, 25, 31, 38, 47, 52, 58s → Read each →
confirm: face not cropped weird, captions readable + on the right words, flame used
only for hot/negatives, lever slides cleanly, CTA holds. Nudge caption timing to the
real audio, re-render, then standard quality.
