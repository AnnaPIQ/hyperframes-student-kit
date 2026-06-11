# STORYBOARD — "The Lever Moved" (4:5, 60.3s, 30fps)

Talking-head video runs continuously in the card (0–60.3s). Beats below = the **graphics-band + caption** changes layered over it. Band transitions are blur-up/down (≈0.3s), never hard cuts.

## Timing table

| # | Beat | Start–End | VO anchor | Band graphic | Caption (flame = emphasis) |
|---|------|-----------|-----------|--------------|----------------------------|
| 0 | Brand wrap | 0–60.3 | — | EcomIQ logo (TL) + flame hairline (bottom) | — |
| 1 | **Hook: spend↑ / profit↓** | 0.0–8.0 | "spending more on Meta… making less profit… this is probably why" | Two opposing meters: **AD SPEND ▲** (flame, rises) vs **PROFIT ▼** (blue-grey, falls) | "More spend on Meta than ever…" → "…**less profit** than ever." → "This is probably why." |
| 2 | **The old playbook** | 8.0–15.0 | "spend more on ads… that's what worked… the game's completely changed" | Equation `More spend = More growth` with ✓ → at ~13s a flame **"CHANGED"** stamp slashes it | "Spend more → make more." → "For years, that worked." → "The game's **changed**." |
| 3a | **ROAS drifts down** | 15.0–22.0 | "increase spend month after month, while ROAS drifts down, profits squeezed" | Line chart: spend bars step **up**, **ROAS** line drifts **down** (linear) ; "profit" pinched | "Spend climbs, month after month." → "**ROAS** drifts down." → "Profits get squeezed." |
| 3b | **The lever (introduced + pulled)** | 22.0–29.0 | "not bad marketers — still pulling the lever that worked 18 months ago" | **LEVER motif appears** (old position). It's "pulled" → output flat. Tag: **"worked 18 months ago"** | "Not bad marketers." → "They're pulling the **lever**…" → "…that worked **18 months ago**." |
| 4a | **More spend exposes weakness** | 29.0–34.0 | "more spend used to mean growth… today it exposes weaknesses inside your business" | Headline: `MORE SPEND → EXPOSES WEAKNESS` (flame) | "More spend used to mean growth." → "Now it exposes the **weakness** inside." |
| 4b | **The 3 weaknesses** | 34.0–43.0 | "weak conversion rates, poor retention, margins that can't support scale" | 3-item list staggers in: **① Weak conversion ② Poor retention ③ Margins that can't scale** | "① Weak **conversion** rates." → "② Poor **retention**." → "③ **Margins** that can't scale." |
| 5 | **THE LEVER MOVED** (payoff) | 43.0–54.0 | "platforms harder, signal worse, and the lever moved… spend climbs but results aren't following" | Two quick tags **"Platforms harder"/"Signal worse"** → **the lever visibly SLIDES to a new position** with flame burst + halo: **"THE LEVER MOVED."** → reprise spend▲ / results-flat | "Platforms got harder." → "Signal got worse." → "**The lever moved.**" → "Spend climbs — results don't." |
| 6 | **CTA outro (hold)** | 54.0–60.3 | "find out what's holding your growth back — click the link below" | Navy CTA card takes frame (video dims/recedes): **EcomIQ logo** · "What's holding your growth back?" · button **"See how we can help →"** · "👇 Link below" | "Find out what's holding you back." → "**Click the link below.**" |

## Three-act / rule-of-threes
- **Act 1 (0–15s, ~25%)** — hook + the playbook that broke.
- **Act 2 (15–43s, ~47%)** — ROAS down + lever introduced/pulled → three exposed weaknesses (the central threes).
- **Act 3 (43–60s, ~28%)** — the lever MOVES (callback payoff) → 6s held CTA.

## Callback object
**The lever**: appears 22s (old position) → pulled, no response 25s → **moves** at ~47s (payoff). One object, three returns (Motion Philosophy Law 6 + Law 9).

## Motion language & eases
- Band content enter: `power3.out` (0.4–0.6s) with blur-up; exit: `power2.in` (0.3s) blur-down.
- Meters/bars grow: `power2.out`; ROAS line drift: `none` (documentary linearity).
- Lever pull: `power2.inOut`; **lever MOVE/snap**: `back.out(1.6)` + flame flash.
- List items: stagger 0.12s, `power3.out`.
- CTA button settle: `back.out(1.4)`; logo: `power3.out`.
- Continuous: subtle vignette/breathe on the card `sine.inOut` (4s yoyo).

## Per-beat font discipline
Rethink Sans for data/labels/captions; **Hedvig Letters Serif italic** reserved for the two hero lines — *"the game's changed"* feel and the **"the lever moved"** climax — for editorial contrast.

## Build notes
- Single root composition `lever-moved1-june26` with ONE master GSAP timeline (the base is one continuous clip; one clock keeps band beats perfectly synced).
- `<video>` is `muted` + `data-has-audio="true"`, NOT `class="clip"`; wrapped in a card div (never animate the video's own w/h).
- Captions are body-level siblings, `data-track-index ≥ 20`.
- Timeline ends with `tl.to({}, { duration: 60.4 }, 0)` anchor (Law 11).
- Deterministic only (no random / no Date.now). Local fonts + tokens only (no network at render).
