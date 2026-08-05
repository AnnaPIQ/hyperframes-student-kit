# EcomIQ — "About Us" ad · Design Spec

Format: 9:16 Story/Reels · 1080x1920 @ 30fps · silent · 30s · safe area ~10% margins.

## Brand
EcomIQ (e-commerce intelligence). Navy-forward, one flame accent. Follows the
`ecomiq-ad` + `hyperframes` skills; motion discipline adapted from
`MOTION_PHILOSOPHY.md` (kept the discipline, swapped the palette to EcomIQ).

- **Palette (≤4 active hues):** Navy `#06284C` canvas · Blue-tint `#9CD4FF`
  (accent / italic emphasis / caption rules) · Flame `#FF4C32` (the one hot
  accent — CTA, value underline, one open word) · White `#FFFFFF`.
- **Type:** Rethink Sans (headlines/captions, −2–3% tracking) + **one** Hedvig
  Letters Serif italic emphasis word ("*Rethink*"). Both vendored woff2, named
  literally in CSS. Never two serif-italic words.
- **Texture under everything:** faint blue-tint perspective grid (drifting) +
  vignette (breathing) + grain, over a navy scrim on the footage.
- **Voice:** precise, trustworthy, clarifying. No em dashes in on-screen copy.

## Footage (no client clips)
Uses the founder/team A-roll + B-roll only — **excludes** all client-brand
footage (Dryft, Sweet E's, Shopify) and the Pacific-IQ-liveried car, per brief.
Sources pulled from the shared Drive shot-list (public links) with yt-dlp;
several were shot portrait but stored sideways (rot=0) and were rotated 90° CW
on ingest, then scaled/center-cropped to 1080x1920 muted H.264 in `assets/video/`.

| Clip | Role |
|---|---|
| `aroll-stage` (Sean on stage, Shoptalk rebuy, rotated 90° CW) | founder authority — hero, used twice |
| `thinking`, `hotel-couch`, `laptop-man` | work / strategy / consulting |
| `klaviyo`, `women` | events / networking |
| `laughing`, `industrial`, `car-la` | culture / momentum (value-word beats) |

## Structure (30s)
Open (navy graphic, hook) → founder-on-stage hero → work/event/consulting
captions → rule-of-three value words (Clarity / Precision / Confidence) over
motion → "*Rethink* what your data can do." hero → team/detail captions →
"This is EcomIQ." → outro hold (logo + "E-commerce, *clarified*." + flame CTA),
~5s. Whip streak at every seam (no jump cuts); crossfade + Ken Burns per shot.

## What NOT to do
- No client-brand footage; no Pacific IQ car/logo (different brand).
- No jump cuts — whip every seam. Animate the `.shot` wrapper, never `<video>`.
- One flame accent only; one serif-italic word only; keep −2–3% tracking.
