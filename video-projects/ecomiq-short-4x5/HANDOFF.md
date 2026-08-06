# EcomIQ — Short-form ad (4:5) · HANDOFF

Footage-forward vertical short built from the "profitability bootcamp" talking-head
recording. Sibling project `ecomiq-short-9x16` is the same edit at 9:16.

## Spec
- **Aspect / size:** 4:5 · 1080×1350 · 30fps · duration **59.9s**
- **Style:** footage-forward — full-frame talking head, **no captions, no kinetic
  type, no motion graphics**. Only two brand layers ride on top:
  1. Persistent **white EcomIQ logo, top-left** (200px, soft drop-shadow), every frame.
  2. **Branded end card** for the last ~2s: EcomIQ logo + *Join our **Free**
     Profitability Bootcamp* + flame "Start free →" CTA (dissolves up from the footage).

## Source & prep
- Source: `IMG_1093.MOV` (2160×3840, 30fps, 59.3s) — raw stashed in repo-root
  `raw-media/` (gitignored). Re-download from the Drive link in the task if needed.
- Trim: **start 0.30s → 57.90s**. End card holds 57.4–59.9.
- Video: `eq=contrast=1.03:saturation=1.05` → **crop 2160×2700 @ y=420** (keeps
  headroom + face + mic, drops equal top/bottom) → `scale=1080:1350 lanczos` → CRF19.
- **Audio cleanup** identical to the 9:16 (shared `assets/narration.m4a`):
  `highpass=85, afftdn, equalizer f=280 -3dB, deesser, acompressor, loudnorm`.
- **De-plosive pass** (v2 audio, for the "poffy" mic pops): cascaded 24 dB/oct
  high-pass at 110 Hz + `adeclick` + dynamic low-cut (`adynamicequalizer` at ~95 Hz)
  + `bass -3 dB@110` + `alimiter`. Sub-100 Hz thump down ~5 dB, voice body intact.
  Shipped MP4 audio re-muxed (video copied, not re-rendered).

## Assets (all local — no render-time network)
- `assets/talkinghead-4x5.mp4` — prepped footage (muted in comp; audio via `<audio>`)
- `assets/narration.m4a` — cleaned audio
- `assets/ecomiq-logo-white.svg` (corner) / `ecomiq-logo-white.png` (end card)
- `assets/fonts/` Rethink Sans + Hedvig Letters Serif · `assets/vendor/gsap.min.js`

## Re-render
```bash
cd video-projects/ecomiq-short-4x5
npx hyperframes lint
npx hyperframes render --quality standard --output renders/ecomiq-short-4x5.mp4
```
Final MP4 ships at `renders/ecomiq-short-4x5.mp4` (and a tracked copy at the project
root, since `renders/` is gitignored).
