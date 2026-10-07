# ecomiq-review-call-916 · Design Spec

Format: 9:16 Reels / Stories · 1080x1920 @ 25fps (matches the A-roll) · 108px side margins · Meta safe zones (hero y 300 to 1120, subtitles bottom edge y 1240).

Brand: EcomIQ. Style reference is `video-projects/my-meta-ad/DESIGN.md` plus `assets/ecomiq/BRAND.md`. Tokens in `assets/brand-tokens.css`, local fonts in `assets/fonts/`.

**The full creative spec, timeline, highlight budget and subtitle plan live in `EDIT-PLAN.md`.** This file only summarises it.

## This project's idea
- Hook: Shopify founders doing $20K+/month on paid ads, not happy with the return.
- Message: on a free call we show what to fix first (cost to win a customer, ads and offers, where the click is lost after the store). Proof: Mob Armor, +500% total sales in a year.
- CTA: Tap Book Now.

## Build
1. `bash scripts/build-base.sh <raw-dir>` builds `assets/base.mp4` (A-roll crops + B-roll, frame-exact cuts) and `assets/vo.m4a`. Both are gitignored.
2. `index.html` layers the cards, journey spine, Mob Armor proof, CTA and subtitles on top.
3. `npx hyperframes lint` then `npx hyperframes render --quality draft --output renders/preview-draft.mp4`.
