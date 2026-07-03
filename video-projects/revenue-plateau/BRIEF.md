# Revenue Plateau — Ad Brief

**Slug:** `revenue-plateau` · **Format:** 4:5 Meta feed · **1080×1350 @ 30fps** · **~67s**
**Type:** EcomIQ social ad — talking-head (founder to camera) + branded motion-graphic overlays.
**Audience:** Shopify brand founders/operators whose revenue has flatlined.

## The idea (one line)
A founder explains *why* a Shopify brand plateaus — revenue is a **system**, not one
lever — and EcomIQ finds the broken lever. The whole ad rides one visual metaphor:
**a flat revenue line that finally breaks upward** at the CTA.

## Source
- `assets/raw.mov` (Drive) → prepped to `assets/raw.mp4` (H.264, 30fps CFR, 67.05s, audio kept).
- Talking-head, blue-lit room, podcast mic, centered. Reframed 16:9→4:5 via `object-fit: cover`
  (fill height, center) — head sits ~upper-40%, torso/mic fill the bottom.

## Audio
- Founder's own VO drives all timing. Muted `<video>` + sibling `<audio src="assets/raw.mp4">`
  (same file → married sync, no drift). `data-volume=1`. Voice-only, no music bed.

## Script (VO — verbatim, used for captions)
> If your Shopify brand's revenue hasn't moved in months, despite trying everything to fix
> it, this is probably why. Most founders hit a plateau and assume they need to do more —
> more ad spend, more emails, more products, more marketing. But revenue isn't one lever,
> it's a system. Traffic, conversion, average order value, retention. When one of those
> breaks, throwing more effort at the others rarely fixes the problem. That's why so many
> Shopify brands work harder than ever before and still end up looking at the same revenue
> number month after month. The plateau isn't happening because you've stopped trying —
> it's happening because something inside the business is holding growth back. We've helped
> hundreds of Shopify brands identify the bottlenecks limiting growth and build a plan to
> move past them. If your revenue has been stuck for months, let's find out what's actually
> causing it. Click the link below to learn how we help Shopify brands uncover what's
> holding them back.

## Captions
- Corporate/measured tone → **Rethink Sans 600/700**, white, 3–6 word groups.
- Timing anchored to `ffmpeg silencedetect` speech boundaries (offline Whisper is
  egress-blocked here — see `docs/LESSONS.md`), sub-chunked by word-count proportion.
- Per-word accents: numbers + key nouns in **blue-tint**; the payoff words
  ("system", "plateau", "stuck") in **flame**.
- Positioned in the lower scrim band; never over his eyes/mouth.

## Style — EcomIQ brand (from `assets/ecomiq/`, already scaffolded)
- **Palette (≤5 hues, each a meaning):** Navy `#06284C` canvas · White text ·
  Blue-tint `#9CD4FF` = the healthy system/levels · **Flame `#FF4C32` = the ONE focal
  accent** (broken lever, payoff, CTA, the single emphasis word) · dim blue-grey `#9fb6d4` body.
- **Type:** Rethink Sans (headline/body) + Hedvig Letters Serif *italic* for exactly ONE
  emphasis word ("*plateau*"). Local `.woff2`, named literally. GSAP vendored locally.
- **Logo:** `ecomiq-logo-white.svg`, persistent top-left (subtle), full lockup on the CTA card.

## Two overlay modes (solves "no room below a full-frame face")
- **Face-forward:** bottom navy scrim only → captions + a compact lower-third graphic.
- **MG-forward:** full navy dim-scrim (~0.82) drops the face to a faint backdrop so a graphic
  owns the canvas (flat-line reveal, the 4-lever system, the proof stat, the CTA card). His
  voice continues underneath → continuity is kept.

## Pacing / structure (rule of threes)
- **Act 1 — Hook (0–16s):** flat line won't move → the "do more" trap (4 MORE chips pile up, line stays flat).
- **Act 2 — Body (16–46s):** "it's a system" → 4 levers (Traffic·Conversion·AOV·Retention) → one breaks flame-red → "same number month after month" (flat-line callback).
- **Act 3 — Payoff (46–67s):** "something is holding growth back" → proof ("hundreds of brands") → flat line **breaks upward** → CTA card, hold ~6s.

## Outro / CTA
- Full branded navy card (rises ~57s, holds to 67s over the closing VO).
- Eyebrow: `FOR SHOPIFY BRANDS` · Headline: **Break the *plateau*.** (serif-italic "plateau")
- Subhead: "We find the bottleneck holding your store back — and the plan to grow past it."
- Flame pill CTA: **Learn how we help →**

## Deliverable
`renders/revenue-plateau-final.mp4` (1080×1350, `--quality standard`). Draft-MP4 review is
Preview Gate 1 (localhost Studio unreachable in cloud).
