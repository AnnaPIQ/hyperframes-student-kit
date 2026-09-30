# sean-audit-call-ad — Design Spec

Short-form EcomIQ ad: Sean's VO (cut from 67s to 37s) over the Showcase Reel montage,
four emphasis graphics, EcomIQ end card on "Book your free audit call".

Formats (both built from one template in `scripts/build.mjs`):
- **9:16** `index.html` · 1080x1920 @ 30fps (montage native)
- **4:5** `compositions/format-4x5.html` · 1080x1350 @ 30fps (montage scaled + padded on navy)

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens live in `assets/brand-tokens.css`; fonts are local `.woff2` in `assets/fonts/`.

## This project's idea
- Hook: "If you're a Shopify founder… this is for you." -> *Shopify founder* graphic
- Message: a free audit call on YOUR store, not a template -> *Free audit call* pill,
  struck-through *Template / Checklist*, then *Your store. Your problems. Your plan.*
- CTA: end card at 34.13s ("Book") — EcomIQ logo, "Book your free *audit* call.", flame "Link Below" button, held 4s.

## Rules used
- White EcomIQ logo top-left over the montage, fades out as the card dissolves in.
- One serif-italic emphasis word per frame. Flame orange only on the pill / strike / CTA.
- Transitions: the montage's own hard cuts + 0.2s dissolves at the two VO splices and into the card.
- No captions.

## Rebuild
Edit `edit.json` (VO ranges, beat -> shot map, graphic timings), then
`node scripts/build.mjs` (or `--comps` to regenerate only the HTML).
Render: `npx hyperframes render --quality standard --output renders/sean-audit-9x16.mp4`
and `npx hyperframes render -c compositions/format-4x5.html --quality standard --output renders/sean-audit-4x5.mp4`.
