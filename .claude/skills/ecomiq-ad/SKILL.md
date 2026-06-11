---
name: ecomiq-ad
description: Build on-brand EcomIQ video ads in Hyperframes — Meta (Facebook/Instagram) feed and story creative. Use when the user says "EcomIQ ad", "Meta ad", "Facebook/Instagram ad", "make an ad", "ad variant", "story version", or wants any branded video for EcomIQ (e-commerce intelligence). Encodes the EcomIQ brand system (navy + flame-orange palette, Rethink Sans / Hedvig Letters Serif type, logo lockups) and the proven 4:5 ad recipe from the my-meta-ad project. Sits on top of /hyperframes — it does not replace the framework rules.
---

# EcomIQ Ad (Hyperframes)

Build branded EcomIQ video ads. This skill encodes the EcomIQ brand and the
proven ad pattern from `video-projects/my-meta-ad/`. **Always invoke
`/hyperframes` first** — this skill rides on top of the framework rules
(`data-*` attributes, `window.__timelines`, the 11-rule render contract); it
does not replace them.

## When this skill fires
- "Make an EcomIQ ad" / "Meta ad" / "Facebook ad" / "Instagram ad" / "a story version"
- "New ad variant" — different headline/CTA, light vs dark, new format
- Any branded EcomIQ video (promo, product reveal, sizzle)

## Brand in one breath
- **Palette:** Navy `#06284C` (primary canvas) · Blue Tint `#9CD4FF` (accent / italic emphasis) · Sky `#DEEEFE` · **Flame Orange `#FF4C32`** (the one hot accent — CTAs, emphasis) · White `#FFFFFF`.
- **Type:** **Rethink Sans** (headlines + body, big headlines at −2% tracking) + **Hedvig Letters Serif** *italic* for the one emphasis word. Both are Google Fonts.
- **Signature move:** italic-serif emphasis word ("*Rethink*") over bold sans ("your strategy.").
- **Voice:** precise, trustworthy, clarifying. Lines: *"Rethink Your Strategy"*, *"Clear Up Confusion, Gain Peace of Mind."*
- **Logos** (in any project's `assets/`): `ecomiq-logo-white.svg` (use on navy), `ecomiq-logo-navy.svg` (use on light), `ecomiq-icon-white.svg`, `ecomiq-icon-navy.png`.

Full spec → `references/brand.md`. Copy-pasteable composition shell + variant
patterns → `references/ad-recipe.md`.

## Formats
| Use | Aspect | Dimensions | Notes |
|---|---|---|---|
| Meta feed (default) | 4:5 | 1080×1350 @ 30fps | the `my-meta-ad` template |
| Square feed / ads | 1:1 | 1080×1080 | re-lay-out from the same tokens |
| Stories / Reels | 9:16 | 1080×1920 | more vertical room; logo top, CTA bottom |

Safe area: keep hero content inside ~10% margins (≈108px sides on 1080-wide).

## The build loop (proven)
1. **Read** `references/brand.md` + the target project's `DESIGN.md`.
2. Start from `video-projects/my-meta-ad/index.html` (the template) — copy it for a new variant, or edit in place.
3. Keep one idea per ad: eyebrow → headline (with one serif-italic emphasis word) → subhead → flame CTA. Logo top-left/center.
4. `npx hyperframes lint` — 0 errors. The two Google-Fonts warnings are **survivable** (fonts resolve at render time in this env — verify in frames).
5. `npx hyperframes render --quality draft --output renders/<name>-draft.mp4`
6. **Visual verification (mandatory):** grab the hero frame + one early/late frame, `Read` each PNG. Confirm: logo crisp, Rethink Sans + italic Hedvig serif both resolved (not a fallback), flame CTA reads, nothing overflows the safe area.
7. Only then `--quality standard` for the shippable MP4.

## Environment gotchas (this repo, on the web)
- Fresh container has no FFmpeg/Chrome/poppler → run `npm run setup` (or `bash scripts/setup-studio.sh`) once per session. See `docs/REMOTE-ENV-SETUP.md`.
- `hyperframes preview` localhost:3002 is **not reachable** from the user's browser in the cloud container — rely on render + frame-grab. Live Studio works when cloned locally.
- The CLI's render output line is `<size> · <render-time> · <status>` — the middle number is wall-clock render time, NOT the clip duration. Verify duration with `ffprobe`.

## Quality bar (gut check before delivery)
- Exactly **one** emphasis word in serif italic — never two.
- Flame orange is the **only** hot accent. No off-brand colors.
- Big headlines keep −2% tracking and tight (≈1.0) leading.
- Logo never stretched/recolored outside the palette.
- The ad reads in 1.5s on a muted scroll (it's a Meta feed ad).
