# Pacific IQ — "About Us" montage · Design Spec

Format: 9:16 Story/Reels · 1080x1920 @ 30fps · silent · safe area ~10% margins.

## Brand
Branded **Pacific IQ**, not EcomIQ. The source footage carries Pacific IQ's own
identity on screen (the white Tesla with "PacificIQ — Shopify Premier Partner"
livery + monstera-leaf mark; Jaren driving/entering it; Sean at Rutherford Hill
winery). An EcomIQ navy/flame lockup would clash with that footage, so this
project follows the `pacific-iq-brand-style` skill instead of the EcomIQ kit.

- **Palette:** black `#000000` canvas · white `#FFFFFF` text · warm gray
  `#8A8A8A` / light gray `#C4C4C4` secondary · accent blue `#4A90D9` (rule,
  dot, glow — used sparingly, per brand).
- **Type:** brand face is Inter (tight negative tracking). Inter is not
  available offline in the render container and render-time network fetches are
  banned, so **Rethink Sans** (vendored woff2, a clean geometric grotesque)
  stands in with `letter-spacing: -.045em` on the display wordmark. Swap to a
  vendored Inter woff2 when available.
- **Tone:** premium, minimal, dark-forward. No em dashes in on-screen copy.

## Structure (13.9s)
1. **0–2.5s** Title card — "ABOUT US" eyebrow, accent rule, `PacificIQ.`
   wordmark, "Shopify Premier Partner".
2. **2.05–10.5s** Six footage cuts (~1.5s each), cross-dissolved with a slow
   Ken Burns push + persistent top-left `PacificIQ` wordmark, vignette + grain:
   driver smile → livery pull-away → standing by door → seated in car →
   Sean on phone at the winery → Rutherford Hill bag.
3. **10.1–13.9s** End card — `PacificIQ.` wordmark, "Shopify Premier Partner",
   accent rule, "Elevated eCommerce, engineered.", `Let's build →` button, held
   with a slow accent bloom.

## What NOT to do
- No jump cuts — every shot boundary dissolves.
- Don't animate the `<video>` element itself — animate its `.shot` wrapper.
- Don't recolor/stretch the wordmark; accent blue is the only non-mono color.
- Don't reintroduce the EcomIQ flame/navy palette here.

See `STATUS.md` for the footage-access blocker and the full 30s shot-swap map.
