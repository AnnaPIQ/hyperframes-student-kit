# ecomiq-short-form — Design Spec

Format: 9:16 Story/Reels · 1080x1920 @ 30fps · Safe area ~10% margins.

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens live in `assets/brand-tokens.css`; fonts in `assets/fonts/` (local woff2).

## This project's idea
- **Hook:** "Most customers lose money on a new customer's first order — and their dashboard just doesn't show it."
- **Message:** The ad-platform number is *just ad spend*. It ignores the real hidden costs of a first order (discounts, shipping, card fees, returns).
- **CTA (end card):** Free Profitability Bootcamp.

## Source & pre-production
- Two takes of Script 2 pulled from Google Drive. Chose **"Script 2 — medium"** on delivery
  (fluent, no stumbles; the "first order_long" take opens with a flubbed word and is ramblier).
  Audio cleanliness was ~equal between takes (same room, noise floor ≈ −65 dB, SNR mid-30s).
- Both takes are handheld phone selfie video, stored 1920×1080 with a `rotation=-90` flag →
  they display as native **portrait 1080×1920**. `face.mp4` bakes the rotation upright, so the
  composition uses it full-frame with **no crop**.
- **Edit (20s):** one cross-dissolve (0.35s) joining the clean mic-free hook
  (orig 0.85–8.55s) to the "hidden costs" beat (orig 12.30–22.40s). ≈17.45s of speech,
  then a ~3s end card → 20.0s total.

## Audio cleaning (`face-audio.m4a`)
highpass 75 · lowpass 15k · adeclick · afftdn (FFT denoise) · gentle agate (tucks room tail /
de-reverb) · deesser · 2-pass loudnorm → **−16.0 LUFS** (TP −1.5). Conservative settings for
smoothness. Audio crossfaded at the splice so there's no click.

## Look (minimal, face-only)
- Full-frame talking head throughout. No b-roll, no motion graphics.
- Subtle grade: `contrast(1.06) saturate(1.06)`; gentle vignette; imperceptible Ken Burns
  (1.00→1.02).
- **White EcomIQ logo top-left, small (196px) and persistent**, seated on a soft top-left
  navy scrim bloom so it stays legible whether the wall behind is dark brick or bright white.
- **End card (last ~3s):** navy panel crossfades over the face → centered white logo, a short
  flame divider, and the line **"Free *Profitability* Bootcamp"** (Rethink Sans, "Profitability"
  in Hedvig italic blue-tint — the brand's italic-serif emphasis signature).

## Deliverables
- `renders/ecomiq-short-form-v1.mp4` — final, `--quality high` (gitignored; renders/ is scratch).
