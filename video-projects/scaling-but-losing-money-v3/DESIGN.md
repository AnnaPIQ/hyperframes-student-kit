# scaling-but-losing-money-v3 — Design Spec

Format: 4:5 Meta feed · 1080x1350 @ 30fps · Safe area ~10% margins.

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens live in `assets/brand-tokens.css`; fonts in `assets/fonts/fonts.css` (local).

## This project's idea
- **Concept:** *"The Profit Leak"* — a Red Bull-style fast-cut B-roll montage of founder
  Sean Clarke (PacificIQ) in the arena (Shoptalk stage, Klaviyo floor, advising, networking),
  rapid-cut on whoosh transitions with bold EcomIQ kinetic stamps. The studio talking-head
  is the VO spine only; it appears once in the calm reframe beat.
- **Hook:** "More REVENUE." (record month, $ ticker climbing) → "KEEPING LESS." (flame)
- **Message:** Costs quietly drain profit — AD SPEND / SHIPPING / RETURNS / COGS / DISCOUNTS
  each stamp in as a draining **PROFIT meter** bleeds (the recurring callback). Reframe:
  "REVENUE is what you sold. PROFIT is what you *keep*. Only one pays you."
- **CTA:** "Find exactly where your margin is *leaking*." → flame pill "Get your breakthrough →"
  · "We guarantee it." · meter heals to 100% (callback resolve). 5.9s outro hold.
- **Source footage:** raw talking-head `assets/ad4-raw.mov` (VO) + curated B-roll shot list
  (Google Drive) normalized to 1080×1350 in `assets/broll/`. 5 Canon clips imported rotated →
  fixed with `transpose=1`.
- **Audio:** spliced VO (33.0s, cut on silence) + synthesized whoosh/impact/pad in `assets/sfx/`.
  No licensed music track yet — drop one in `assets/sfx/` and add an `<audio>` bed to layer it.
- See `STORYBOARD.md` for the full beat sheet + timings.
