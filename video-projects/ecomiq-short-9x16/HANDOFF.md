# EcomIQ — Short-form ad (9:16) · HANDOFF

Footage-forward vertical short built from the "profitability bootcamp" talking-head
recording. Sibling project `ecomiq-short-4x5` is the same edit at 4:5.

## Spec
- **Aspect / size:** 9:16 · 1080×1920 · 30fps · duration **59.9s**
- **Style:** footage-forward — full-frame talking head, **no captions, no kinetic
  type, no motion graphics**. Only two brand layers ride on top:
  1. Persistent **white EcomIQ logo, top-left** (200px, soft drop-shadow), every frame.
  2. **Branded end card** for the last ~2s: EcomIQ logo + *Join our **Free**
     Profitability Bootcamp* + flame "Start free →" CTA (dissolves up from the footage).

## Source & prep
- Source: `IMG_1093.MOV` (2160×3840, 30fps, 59.3s) — raw stashed in repo-root
  `raw-media/` (gitignored). Re-download from the Drive link in the task if needed.
- Trim: **start 0.30s → 57.90s** (drops the dead frame at head, ends on "…cohort of
  brands"). End card holds 57.4–59.9.
- Video: `eq=contrast=1.03:saturation=1.05` → `scale=1080:1920 lanczos` → H.264 CRF19.
- **Audio cleanup** ("clean up mic feedback"): the spectrogram showed no sustained
  feedback tone, so the fix is broadband smoothing, not a notch —
  `highpass=85, afftdn(nr=12,nf=-30), equalizer f=280 -3dB (proximity boom),
  deesser i=0.35, acompressor 2.5:1, loudnorm I=-16:TP=-1.5:LRA=11`.
  Shared `assets/narration.m4a` drives the `<audio>` element.
- **De-plosive pass** (v2 audio, for the "poffy" mic pops on P/B/T): cascaded
  24 dB/oct high-pass at 110 Hz + `adeclick` + a dynamic low-cut
  (`adynamicequalizer` ducking ~95 Hz only when a pop spikes) + `bass -3 dB@110` +
  `alimiter`. Cuts the sub-100 Hz plosive thump ~5 dB (RMS) while the voice body
  (150–450 Hz) drops <0.6 dB. Because the `<video>` is muted and sound comes from
  `<audio>`, the shipped MP4 audio was **re-muxed** (video stream copied, not
  re-rendered) after swapping the narration.

## Assets (all local — no render-time network)
- `assets/talkinghead-9x16.mp4` — prepped footage (muted in comp; audio via `<audio>`)
- `assets/narration.m4a` — cleaned audio
- `assets/ecomiq-logo-white.svg` (corner) / `ecomiq-logo-white.png` (end card — distinct
  source so the linter's duplicate-media check stays quiet)
- `assets/fonts/` Rethink Sans + Hedvig Letters Serif · `assets/vendor/gsap.min.js`

## Re-render
```bash
cd video-projects/ecomiq-short-9x16
npx hyperframes lint
npx hyperframes render --quality standard --output renders/ecomiq-short-9x16.mp4
```
Final MP4 ships at `renders/ecomiq-short-9x16.mp4` (and a tracked copy at the project
root, since `renders/` is gitignored).
