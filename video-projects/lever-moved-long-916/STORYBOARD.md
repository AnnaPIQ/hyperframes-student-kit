# STORYBOARD — "The Lever Moved" (4:5, ~65s, 30fps) · Face + MG overlays

Sean's footage (`lever-talk.mp4`) is the full-bleed spine 0–60.3s. MG = overlays on the
footage + full-frame chart **cutaways** on proof beats. End card 60–65s.

## ⛔ Chart-direction rule (QA #1)
Every chart animates the way the words say. The *Dir* column is law. Spend ▲ · profit/ROAS/results ▼ · "plateaued/not following" → **flat**. Rising lines ONLY where the VO says it worked.

## Timing table

| # | Beat / VO anchor | Start–End | On screen | MG element | Dir | Caption / stab (sky-blue = keyword) |
|---|------------------|-----------|-----------|------------|-----|--------------------------------------|
| 0 | persistent | 0–65 | — | EcomIQ logo (TL) · vignette · grain | — | — |
| **1a** | cold open | 0.0–1.5 | full-frame MG (navy) | revenue line rises → **flattens to dead-flat plateau** | rise→**FLAT** | stab **REVENUE PLATEAUED?** |
| **1b** | "spending more on Meta… less profit… this is probably why" | 1.5–6.0 | Sean (punch-in 1.15×) → **proof cutaway** ~3.0–6.0 | Ads-Manager-style panel: **Amount Spent ▲** vs **Net Profit ▼** (diverging), axes labeled | spend ▲ / profit ▼ | "More `spend` on Meta than ever — `less profit` than ever." |
| **1c** | "most founders think the answer's simple" | 6.0–8.0 | Sean | — | — | "Most founders think the fix is simple." |
| **2a** | "spend more on ads… that's what worked" | 8.0–13.0 | MG / b-roll | **clean rising chart** up-and-to-the-right (the playbook *working*) | **UP** (legit) | "Spend more → make more. For years, it worked." |
| **2b** | "the game's completely changed" | 13.0–15.0 | disruption → Sean | rising chart **breaks downward** / glitch | breaks **DOWN** | stab **SOMETHING CHANGED.** |
| **3a** | "increase spend month after month, ROAS drifts down, profits squeezed" | 15.0–22.0 | cutaway (core viz) | **Spend ▲** month-over-month vs **ROAS ▼** drifting down; axes labeled, sound-off readable | spend ▲ / ROAS ▼ | "Spend climbs every month — `ROAS` drifts down." |
| **3b** | "still pulling the lever that used to work, 18 months ago" | 22.0–29.0 | Sean + MG | **LEVER motif** introduced → pulled → **output gauge stays flat** (no response); tag *worked 18 mo ago* | output **FLAT** | "They're pulling the `lever`… that worked 18 months ago." |
| **4a** | "more spend exposes the weaknesses inside your business" | 29.0–34.0 | Sean + MG | flip card: ~~More spend = More growth~~ → **EXPOSES WEAKNESS** (flame) | — | "More spend now **exposes the weakness** inside." |
| **4b** | "weak conversion rates" | 34.0–37.3 | **magnifier cutaway ①** | Shopify-style CVR report; magnifier reveals **CVR ▼** (flame flag) | **DOWN** | label **CONVERSION** · "Weak `conversion` rates." |
| **4c** | "poor retention" | 37.3–40.3 | **magnifier cutaway ②** | Klaviyo-style repeat/returning; magnifier reveals **weak repeat rate ▼** | **DOWN** | label **RETENTION** · "Poor `retention`." |
| **4d** | "margins that can't support scale" | 40.3–43.0 | **magnifier cutaway ③** | margin / P&L; magnifier reveals **thin net margin ▼** | **DOWN** | label **MARGIN** · "`Margins` that can't scale." |
| **5a** | "the platforms got harder, signal got worse, the lever moved" | 43.0–45.0 | MG over Sean | **lever visibly SLIDES to a new position** + flame burst/halo | — | stab **THE LEVER MOVED.** |
| **5b** | "most founders just haven't realized it yet" | 45.0–50.0 | Sean (punch-in 1.2×) | none — let it land on his face | — | "Most haven't realized it yet." |
| **5c** | "if your ad spend keeps climbing but results aren't following" | 50.0–54.0 | cutaway | diverging again: **spend ▲** / **results FLAT —** | spend ▲ / results **FLAT** | stab **THE FLAT LINE IS INFORMATION.** |
| **6a** | "let's find out what's holding your growth back… click the link below" | 54.0–60.0 | Sean direct, **no overlay** | — (trust beat) | — | minimal / none |
| **6b** | end card (hold) | 60.0–65.0 | `lever-endcard.mp4` dimmed/blurred (or navy) | **EcomIQ logo** · "Coaching, mentorship & strategy for Shopify brands." · "Find what's actually holding your brand back." · button **Learn More** (arrow/underline anim) | — | — |

## Three-act / rule-of-threes
- **Act 1 (0–15s, ~23%)** — plateau cold open → hook proof (spend↑/profit↓) → the playbook that broke.
- **Act 2 (15–43s, ~43%)** — diverging spend/ROAS + lever pulled (no response) → **three** magnifier weaknesses (CVR/retention/margin).
- **Act 3 (43–65s, ~34%)** — the lever MOVES → flat-line reframe → trust beat → held end card.

## Callback object — the lever
Introduced 22s (old position) → pulled, no response 25s → **MOVES** at 43s (payoff). One object, three returns (Motion Philosophy L6 + L9).

## Motion language & eases
- Overlay enter `power3.out` 0.4–0.6s + blur-up; exit `power2.in` 0.3s blur-down.
- Chart bars grow `power2.out`; trend lines drift `none` (documentary). Magnifier glide `power2.inOut`; reveal pop `back.out(1.5)` + flame flag.
- Punch-ins: footage wrapper `scale 1→1.15/1.2`, `power2.out` 0.5s, hold, ease back.
- Lever pull `power2.inOut`; **lever MOVE** `back.out(1.6)` + flame flash.
- List/3-reveal stagger 0.12s. CTA button settle `back.out(1.4)`.
- Continuous vignette breathe `sine.inOut` 4s yoyo.

## Font discipline
Rethink Sans for labels/data/captions. **Hedvig Letters Serif italic** reserved for the hero stabs (**THE LEVER MOVED.**, **THE FLAT LINE IS INFORMATION.**) for editorial contrast. Stabs flame or white per moment.

## Build / framework notes
- Single root composition `lever-moved1-june26`, ONE master GSAP timeline (one continuous spine → one clock keeps overlays synced). `data-duration ≈ 65.2`.
- Main `<video>` = `muted` + `data-has-audio="true"`, NOT `class="clip"`, wrapped in a div (never animate the video's own w/h; punch-in scales the wrapper).
- Captions = body-level siblings, `data-track-index ≥ 20`.
- Timeline ends `tl.to({}, { duration: 65.2 }, 0)` (Law 11). Deterministic only; local assets only.
- Chart MGs are EcomIQ-styled recreations (axis-labeled, no real client data); swap real captures later if provided.
