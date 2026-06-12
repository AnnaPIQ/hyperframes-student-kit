# lever-moved-jun26 — Creative Brief

## Intent
Meta (Facebook/Instagram) **feed video ad** for **EcomIQ** (e-commerce intelligence).
Talking-head founder ad. Goal: stop the scroll, name the pain, deliver the
"the lever moved" thesis, drive a link click.

## Audience
Shopify / DTC founders scaling on Meta who are spending more and making less —
rising ad spend, falling ROAS, squeezed profit.

## Format
- **4:5 Meta feed · 1080×1350 · 30fps**
- Source footage: **1920×1080 (16:9) landscape**, 60.32s single-take talking head,
  face dead-center → center-crop/scale to fill 4:5 (lose left/right edges, face stays safe).
- Mute-by-default safe: every word on screen as caption.

## Duration
Full **60.3s** (keep the entire take).

## Layout — "Face + motion-graphics overlays + captions"
- **Full-bleed face video** fills the 4:5 frame (`assets/lever-face.mp4`).
- **Top scrim** (navy gradient) → EcomIQ logo (white lockup, top-left, small).
- **Bottom scrim** (navy gradient) → big word-synced **captions** + flame callout chips.
- **Motion graphics** float over the face: callout chips, a diverging spend/ROAS
  chart, and the **lever motif** (the ad's central metaphor).

## Voice / audio
- VO = the video's own audio (talking head). Wired via the `<video>` feeding the
  mix (`data-has-audio="true"`), volume 1.0. No music bed by default (founder ads
  read more credible dry); optional 0.12 ambient pad if it feels thin on review.

## Captions
- Phrase-level (3–7 words), EcomIQ-styled: Rethink Sans 600, white on a translucent
  navy pill, flame for emphasis words. Timing estimated from the supplied
  line-level transcript (transcription is network-blocked here), then nudged
  against the rendered video during verification.

## Brand (EcomIQ — see assets/ecomiq/BRAND.md)
- **Palette (≤5 hues):** navy `#06284C` (canvas/scrims), white `#FFFFFF` (body),
  blue-tint `#9CD4FF` (secondary accent), **flame `#FF4C32` (the ONLY hot —
  negatives, emphasis, CTA)**, + the footage's natural blue lighting.
- **Type:** Rethink Sans (headlines ≥72px, −2% tracking, 100% leading) +
  **Hedvig Letters Serif *italic*** for a single emphasis word ("*moved*").
- **Logo:** `ecomiq-logo-white.svg` on the navy scrim.
- **Texture:** subtle grain + vignette + navy bloom. (EcomIQ brand overrides the
  MOTION_PHILOSOPHY Infinite grid/crosshair texture — we keep the *discipline*
  one-idea-per-beat, motion in transitions, a callback motif, a held outro — but
  the *palette/texture* is EcomIQ.)

## Motif / callback (MOTION_PHILOSOPHY Law 6)
**The lever.** Introduced ~24s ("still pulling the lever that used to work"),
pays off ~46s ("and the *lever moved*") — it physically slides to a new position.
One object carries the whole argument.

## Script (supplied transcript, line-level timestamps)
- 0:00 If you're spending more on Meta than ever and making less profit than ever, this is probably why. Most Shopify founders think the answer's simple.
- 0:08 Need more revenue, spend more on ads — and for a long time, that's what worked. The problem is the game's completely changed.
- 0:15 Today we're seeing brands increase spend month after month, while ROAS drifts down and profits get squeezed. Not because they're bad marketers — it's because they're still pulling the lever that used to work 18 months ago.
- 0:29 More spend often meant more growth. But today, more spend can actually expose the weaknesses already sitting inside your business: weak conversion rates, poor retention, margins that can't support scale.
- 0:43 The platforms got harder, the signal got worse, and the lever moved. Most founders just haven't realized it yet. If your ad spend keeps climbing but the results aren't following…
- 0:54 Let's find out what's actually holding your growth back. Click the link below and see how we can help.

## CTA
Final ~6s: EcomIQ logo lockup + "What's actually holding your growth back?" +
flame button **"Click the link below →"**.

## Assets
- `assets/lever-face.mp4` — prepped face footage (H.264, 60.32s, with audio)
- `assets/ecomiq-logo-white.svg`, brand tokens, local fonts — already in project.
