# BRIEF — "The Lever Moved" (EcomIQ Meta Ad)

## Project
- **Slug:** `lever-moved1-june26`
- **Intent:** Paid social ad (Meta feed) for **EcomIQ** — coaching, mentorship & strategy for Shopify brands
- **Audience:** Shopify / DTC founders scaling on Meta whose **spend is rising but profit/ROAS is falling**
- **Dimensions:** 1080 × 1350 (4:5 Meta feed) @ 30fps  *(9:16 reframe can be derived later as a second export)*
- **Duration:** **~65s** (60.3s VO/footage + 5s held end card)
- **Presenter:** Sean
- **Footage:**
  - `assets/lever-talk.mp4` — main continuous 16:9 talking-head (0–60.3s), VO drives the piece
  - `assets/lever-endcard.mp4` — 4.9s talking-head clip, used as **end-card background** (assumption — confirm)

## ⛔ THE ONE NON-NEGOTIABLE RULE (first thing QA checks)
**Every chart moves in the direction the words say.** Spend goes **UP**; profit / ROAS / results go **DOWN** (or **FLAT** when the word is "plateaued / not following"). **Never** show a rising revenue line under a "growth has stalled" message. This killed the last cut. Direction is verified per-beat in the storyboard's *Chart direction* column **and** in frame-verification (Gate 8).

## Video intent — **Face + MG overlays** (approved)
- **Full-bleed face** (Sean, cover-cropped from 16:9, centered — verified) is the spine.
- **Motion graphics overlay** the footage: text stabs, diverging charts, the lever motif, magnifier reveals.
- **Full-frame chart cutaways** on proof beats (Ads-Manager-style spend↑/profit↓, etc.), returning to the face between.
- **Punch-ins** (1.1–1.2× scale push on the footage) on strong lines — cheapest cutaway, no new footage.
- **Burned captions** (most views are sound-off), lower third.
- **EcomIQ wordmark** top-left, persistent; subtle vignette + grain for cohesion.

## Brand profile (EcomIQ kit — `assets/brand-tokens.css`, LOCAL fonts)
- **Palette (≤5 hues):** navy `#06284C` (canvas) · white `#FFFFFF` (voice) · **sky-blue `#9CD4FF`** (caption keyword highlight, "up/neutral" data) · **flame `#FF4C32`** (text stabs, "down/weak" flags, CTA) · muted blue-grey `#9fb6d4` (dim).
- **Type:** Rethink Sans (primary/labels/captions) · Hedvig Letters Serif italic (hero stabs).
- **Logo:** `ecomiq-logo-white.svg`.
- **No network at render** (no-egress container): only local fonts/tokens/assets. ✅

## Captions
- White text; **sky-blue highlight** on keywords: *spend, profit, ROAS, lever, retention, margin, conversion*.
- Lower third, branded pill, phrase-synced to VO segments (word-level karaoke needs transcription, network-blocked this session).

## Text stabs (placement)
| Text | Timecode | Lands on |
|------|----------|----------|
| REVENUE PLATEAUED? | 0:00 | cold open |
| SOMETHING CHANGED. | ~0:13 | "the game's completely changed" |
| THE LEVER MOVED. | ~0:43 | "the lever moved" |
| THE FLAT LINE IS INFORMATION. | ~0:51 | "results aren't following" |

## End card (0:54 Sean lands offer, no overlay → 1:00–1:05 card hold)
- EcomIQ logo
- "Coaching, mentorship & strategy for Shopify brands."
- "Find what's actually holding your brand back."
- CTA button: **Learn More** (animated arrow / underline)
- Background: dimmed/blurred `lever-endcard.mp4` (or solid navy) — confirm.

## Audio
- Main video's own VO feeds the mix via `data-has-audio="true"`, volume 1.0. No music bed by default (optional 0.12 ambient pad on request).

## ⚠️ Asset gap (needs your call)
Your shot list calls for **real screen-recordings** (Meta Ads Manager, Shopify Analytics, Shopify CVR, Klaviyo retention, margin/P&L). Those aren't in the project. Plan: **build credible EcomIQ-styled motion-graphic recreations** of each chart now (axis-labeled, sound-off readable, no real client data), and **swap in your real captures later** if/when you drop them in `assets/`. Confirm that's OK, or hold the data beats until you provide captures.

## Deliverable
- `renders/lever-moved1-june26-final.mp4` (1080×1350, standard quality, VO baked in).
