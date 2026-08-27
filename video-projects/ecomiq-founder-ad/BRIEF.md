# One Opinion, or an Entire Team — Brief

- **Slug:** `ecomiq-founder-ad`
- **Intent:** EcomIQ Meta (Facebook/Instagram) feed ad — founder talking-head + brand motion graphics.
- **Audience:** Shopify / DTC brand owners evaluating e-commerce coaching.
- **Format:** 4:5 · 1080×1350 · 30fps · long-form (full ~77s founder pitch + CTA hold).
- **Brand:** EcomIQ — navy `#06284C`, blue-tint `#9CD4FF`, flame `#FF4C32`; Rethink Sans + Hedvig Letters Serif (italic emphasis). Logo top-left, persistent.
- **Style lock:** matches `video-projects/revenue-up-bank-empty/` exactly — same palette, grid/bloom/vignette background, tile + bar + chip vocabulary, snappy GSAP entrances, blur/whip beat seams, 4–6s CTA hold. Topic and every graphic scene are new.

## Source
- Raw A-roll: Google Drive `How it works version 2 .mov` — ProRes 3840×2160, 25fps, 79.0s, PCM stereo.
- Prep: cover-cropped 16:9 → 4:5 (`scale=2400:1350,crop=1080:1350:660:0`), 30fps, H.264 crf 20, `+faststart`, muted.
- VO: extracted to mono AAC `assets/vo.m4a`; runs continuously under the whole edit.
- Speech spans 2.08s → 74.80s of the source (4.15s of tail silence trimmed off the back).

## Edit approach
- Keep the **full founder pitch**; VO runs continuously underneath, `<video>` always muted.
- Speaker **full-screen** (cover-cropped, never letterboxed), cutting to full-frame **brand motion-graphics** for emphasis.
- **No captions** — graphics carry the key terms.
- Logo top-left throughout via the root composition. VO only (no music bed).

## Message spine
One coach = one person's opinion, from a DTC job they left 5–10 years ago → EcomIQ is the coach arm of a **Shopify Premier Partner**, 10+ years, biggest brands in the world → you get an entire team that has worked across **8- and 9-figure** brands → here is the system (strategy session → growth blockers mapped → 2 specialist 1:1s a month → Slack + founder community) → every strategy is pulled from **real client work** at Pacific IQ → **so: one opinion, or an entire team?** → CTA.

## Hook (2-part cold open)
- Line A (white): **"Your coach is one guy."**
- Line B (flame `#FF4C32`): **"Guessing."**

## CTA end card
- Headline: **"Get an entire team behind your brand."**
- Flame-gradient pill: **"Learn More →"**

## Requested asset
- The **logo wall** (21 client marks + Shopify Premier Partner badge hero) is lifted from
  `claude/aug-general-ad-5-shortform-59z10c` and re-timed to land on the VO line
  *"It's the coach arm of a Shopify Premier Partner… biggest brands in the world."*
