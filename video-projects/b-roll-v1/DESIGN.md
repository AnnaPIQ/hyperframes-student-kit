# b-roll-v1 — Design Spec

Format: 4:5 Meta feed · 1080x1350 @ 30fps · Safe area ~10% margins.
Brand kit from `assets/ecomiq/` (navy `#06284C` + flame `#FF4C32`, Rethink Sans +
Hedvig Letters Serif italic emphasis). Tokens in `assets/brand-tokens.css`.

## This project's idea
- **Hook:** Scaling Shopify brand, more revenue than ever — but keeping *less* money.
- **Message:** Revenue ≠ profit. A stack of creeping costs (ad spend, shipping, returns,
  COGS, discounts) quietly pulls margin out while revenue climbs. The problem isn't
  sales — it's that nobody's watching the numbers that decide what you keep.
- **CTA:** EcomIQ finds where your margin leaks and what to fix first. *Click the link
  below — we guarantee the breakthrough.*

## Source & format
- **VO spine:** `ad 4.mov` (Drive) → `assets/audio/vo.m4a` (82.5s, loudnorm). Drives all
  timing. Mostly voiceover; cards + b-roll carry the visuals.
- **Sean on camera:** 4 lip-synced face cuts from the same recording (`th-*` proxies,
  source-aligned timestamps so lips match the VO) + Sean as silent b-roll (thinking,
  typing, walking).
- **B-roll:** Dryft product (real Shopify brand), Sean typing/thinking/walking. 4K 16:9
  cropped to 4:5; three clips needed `transpose=1` (phone-rotation).
- **No captions** (per brief). **Subtle ambient pad** @ 0.13 + whoosh/twinkle SFX.

## Structure (3 acts, ~82.6s)
1. **Hook (0–13):** face → "more revenue, less money" → "revenue up ≠ profit up".
2. **Body (13–58):** pressure → **cost-stack hero list** → **revenue/profit divergence
   chart** → "where'd it go?" → "it's not sales, it's the numbers".
3. **Payoff (50–82.6):** thesis "Revenue is what you *sold*, profit is what you *keep*"
   → EcomIQ solution + face cameo → CTA hold (logo + flame button + guarantee).

## Asset pipeline notes
- `assets/raw/` (1.4GB Drive originals) is gitignored — re-downloadable. Committed
  assets are the light proxies (`assets/proxies/`, ~6MB) + audio.
- Single root composition (`index.html`): engine windows each beat via
  `data-start/data-duration`; one master GSAP timeline drives the motion. Lint: 0 errors.
