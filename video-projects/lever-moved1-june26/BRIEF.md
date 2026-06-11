# BRIEF — "The Lever Moved" (EcomIQ Meta Ad)

## Project
- **Slug:** `lever-moved1-june26`
- **Intent:** Paid social ad (Meta feed) for **EcomIQ** (e-commerce intelligence)
- **Audience:** Shopify / DTC founders scaling on Meta ads whose **spend is rising but profit/ROAS is falling**
- **Dimensions:** 1080 × 1350 (4:5 Meta feed) @ 30fps
- **Duration:** full **~60.3s** (use the entire source clip)
- **Source footage:** `assets/lever-talk.mp4` — one continuous 16:9 talking-head shot (presenter, blue-lit room, podcast mic), VO drives the whole piece

## Core concept
The ad's own name is the metaphor: **"the lever moved."** The lever founders used to pull — *more spend → more growth* — no longer works. EcomIQ helps them find what's actually holding growth back. The **lever** is the recurring callback object (introduced early, "pulled" mid-piece, and visibly **moves** at the climax).

## Layout — "Designed frame" (approved)
- **EcomIQ navy** (`--brand-navy #06284C`) full-bleed stage.
- **Video card** (rounded, ~top 60%): the talking head, cropped 16:9 → card via `object-fit: cover` (face stays centered — verified). Thin `--brand-border` + soft shadow.
- **Graphics band** (navy, below the card): home for the lever motif + per-beat data callouts. One idea at a time.
- **EcomIQ wordmark** top-left, persistent (`assets/ecomiq-logo-white.svg`).
- **Captions:** branded pill pinned near the bottom, phrase-synced to VO.
- **Flame accent** hairline at the very bottom as a subtle progress/brand cue.

## Brand profile (EcomIQ kit — `assets/brand-tokens.css`)
- **Palette (≤5 active hues):** navy `#06284C` (canvas) · white `#FFFFFF` (voice) · light-blue `#9CD4FF` (secondary/accent) · **flame `#FF4C32`** (emphasis/CTA, used sparingly) · muted blue-grey `#9fb6d4` (dim/down-states).
- **Type:** Rethink Sans (primary, local woff2) · Hedvig Letters Serif italic (emphasis headlines).
- **Logo:** `ecomiq-logo-white.svg` (header), `ecomiq-logo-white.svg`/icon for the outro.
- **Fonts are LOCAL** — important: this container is on a no-egress network, so no Google Fonts / no model downloads at render time. Build uses only local assets. ✅

## Voiceover script (as provided)
> If you're spending more on Meta than ever and making less profit than ever, this is probably why. Most Shopify founders think the answer's simple. Need more revenue, spend more on ads — and for a long time, that's what worked. The problem is the game's completely changed. Today we're seeing brands increase spend month after month, while ROAS drifts down and profits get squeezed. Not because they're bad marketers — it's because they're still pulling the lever that used to work, 18 months ago. More spend often meant more growth, but today more spend can actually expose the weaknesses already sitting inside your business: weak conversion rates, poor retention, margins that can't support scale. The platforms got harder, the signal got worse, and the lever moved. Most founders just haven't realized it yet. If your ad spend keeps climbing but the results aren't following — let's find out what's actually holding your growth back. Click the link below and see how we can help.

## Captions
- **Style:** EcomIQ corporate-confident. Navy translucent pill + blur, Rethink Sans, white text; **flame** on emphasis words (*less profit, changed, ROAS, lever, weaknesses, the lever moved*).
- **Sync:** phrase-level (chunked ~16–18 lines) anchored to the VO segment times (0:00 / 0:08 / 0:15 / 0:29 / 0:43 / 0:54). True per-word karaoke needs word-level timestamps, which require transcription (network-blocked this session). Phrase-sync reads cleanly; can be upgraded to word-level later if network is enabled.

## Audio
- Video's own VO feeds the mix via `data-has-audio="true"` on the `<video>` (no separate audio file). Volume 1.0. No music bed by default (VO-led); optional 0.12 ambient pad can be added on request.

## Pacing
- Talking head is continuous; **graphics-band beats** change every ~5–7s with **blur-up/down** mini-transitions (no hard cuts).
- Three-act, rule-of-threes:
  - **Act 1 (0–15s):** Hook (spend↑/profit↓) → old playbook breaks.
  - **Act 2 (15–43s):** ROAS drifts + the lever introduced/pulled → 3 exposed weaknesses.
  - **Act 3 (43–60s):** **the lever MOVES** (payoff) → held CTA card.

## Deliverable
- `renders/lever-moved1-june26-final.mp4` (1080×1350, standard quality, with VO).

## Open / assumptions
- CTA copy assumed: **"See how we can help →"** + "Link below 👇" + "What's holding your growth back?" — tell me the exact button text / URL if different.
- No music bed unless you want one.
