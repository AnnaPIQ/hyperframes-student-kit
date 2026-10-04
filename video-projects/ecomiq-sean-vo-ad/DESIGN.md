# ecomiq-sean-vo-ad — Design Spec

Short-form EcomIQ ad: Sean's VO over the Showcase Reel montage, ending on a branded end card.
Formats: **9:16** 1080x1920 (committed `index.html`) and **4:5** 1080x1350, both 30fps, 25.0s.

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`; fonts local in `assets/fonts/` (Rethink Sans, Hedvig Letters Serif).

## This project's idea
- Hook: "Run a Shopify store, your sales are up, but your profit's flatlining."
- Message: profit problem, not sales problem. One EcomIQ strategist, 90 days, guaranteed.
- CTA: "Tap the link and see if you qualify." -> end card: EcomIQ logo + flame "Link Below" pill.

## Edit
| Time | Beat |
|---|---|
| 0 – 21.87s | Montage (`assets/montage.mp4`, source 0–22.2s, audio stripped) under VO, original hard cuts |
| 0.2 – 21.6s | White EcomIQ logo top-left (fades out from 21.3s) |
| 21.62s | 0.25s dissolve to end card; "Tap" lands at 21.75s |
| 21.62 – 25.0s | End card holds; VO ends 23.96s; ~1s tail |

Framing: montage is 9:16 native. 4:5 uses scale + pad (`object-fit: contain`, navy pillars ~160px each side), no crop.

## Sources
- Montage: Drive "Showcase Reel.mp4" (1080x1920, 30fps, 29.7s)
- VO: Drive "Profit 2.aifc" (48kHz mono) -> `assets/sean-vo.wav`; transcript `assets/sean-vo.transcript.json` (whisper small.en)

## Build
```bash
node scripts/build.mjs [9x16|4x5]     # regenerate index.html for a format (edit timing/layout here)
bash scripts/render-all.sh standard   # lint + render both, faststart, restore 9:16
```
