# BRIEF — scaling-but-losing-money

**Slug:** scaling-but-losing-money
**Intent:** Direct-response Meta (Facebook/Instagram) feed ad for EcomIQ (e-commerce intelligence)
**Audience:** Shopify brand founders scaling revenue but watching profit shrink
**Format:** 4:5 · 1080×1350 · 30fps
**Duration:** ~72.5s (founder VO is the spine; duplicate CTA take trimmed off)

## Source
- `assets/raw-ad4.mov` → normalized to `assets/talking-head.mp4` (H.264, 30fps CFR, 1280×720 = 16:9)
- Transcript: `assets/transcript.json` (word-level)
- Footage is a centered, blue-lit founder talking-head — maps into a 16:9 card with **no face crop** (source 16:9 → card 16:9).

## Core message
Revenue up ≠ profit up. As a Shopify brand scales, costs (ad spend, shipping, returns, COGS, discounts) quietly drain margin. The problem isn't sales — it's nobody watching the numbers that decide what you keep. EcomIQ finds exactly where margin leaks and what to fix first.

## Treatment
Branded founder ad: the talking-head plays in a rounded EcomIQ card (upper third), with on-brand **kinetic callouts** synced to each VO beat in the lower zone. The callouts carry the message for muted/sound-off scrolling (no separate caption bar — the kinetic type is the caption). Flame CTA outro held ~5.5s.

## Brand (EcomIQ)
- Palette: Navy `#06284C` canvas · White text · Blue-tint `#9CD4FF` accent/emphasis · **Flame `#FF4C32`** the one hot accent (arrows, ≠, CTA, key punch).
- Type: Rethink Sans (headlines/body) + Hedvig Letters Serif *italic* for one emphasis word per headline. Local `.woff2`.
- Logo: `ecomiq-logo-white.svg` top-left.
- GSAP vendored locally.

## Audio
Founder VO via the video's own track (`data-has-audio="true"`, `data-volume="1"`) — keeps lip-sync exact. No music bed (keeps the DR voice clean).

## Deliverable
`renders/scaling-but-losing-money-final.mp4` (standard, 1080×1350).
</content>
</invoke>
