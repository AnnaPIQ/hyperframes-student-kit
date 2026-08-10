# BRIEF — ShopLift A/B Testing Explainer

| Field | Value |
|---|---|
| **Slug** | `shoplift-explainer` |
| **Intent** | Product explainer — ShopLift's new "likelihood-to-win + uplift" A/B testing update |
| **Audience** | Shopify store owners / DTC operators running (or giving up on) A/B tests |
| **Dimensions** | 1080 × 1920 (9:16 vertical) |
| **FPS** | 30 |
| **Duration** | ~58.5s (VO runs 0–57.5s; end card holds to 58.5s for a breathing CTA) |
| **Narration** | Supplied VO, cleaned → `assets/vo/shoplift-vo-clean.m4a` |
| **Captions** | **OFF** — VO + data-viz carry the story |
| **Talking head** | None — motion graphics only |

## Audio
- Source: `assets/vo/shoplift-vo.m4a` (mono, 48kHz, 57.5s, was −31.1 LUFS/quiet).
- Cleaned to `assets/vo/shoplift-vo-clean.m4a`: highpass 85Hz → FFT de-noise → de-click → de-ess → loudnorm **−16 LUFS** (measured −17.3 LUFS integrated, −1.3 dBTP — safe & broadcast-ish).
- Wired as a single sibling `<audio data-volume="1.0">` in `index.html`. No music bed (graphics carry it); fully deterministic, no render-time fetches.
- Word-level sync from `assets/vo/shoplift-vo.transcript.json` (not re-transcribed).

## Brand — EcomIQ (your choice)
Persistent EcomIQ logo top-left; EcomIQ end card. Product UI panels are labelled "ShopLift" (the VO names it) but styled entirely in the EcomIQ system so the piece reads as one brand.

- **Fonts (local, no CDN):** Rethink Sans (primary) + Hedvig Letters Serif italic (single emphasis word).
- **Palette — 5 hues, one hot accent:**
  - `#06284C` **Navy** — canvas / silence
  - `#9CD4FF` **Blue tint** — ShopLift's answer / confidence / the *winning* variant
  - `#FFFFFF` **White** — headline voice
  - `#9fb6d4` **Blue-grey** — dim / secondary / the *other* variant
  - `#FF4C32` **Flame** — THE hot accent: friction/"stuck"/problem states **and** the CTA. Used sparingly.
- **Aesthetic:** MOTION_PHILOSOPHY discipline adapted to the EcomIQ palette — navy canvas (not black), faint grid + soft vignette + grain as the unifying texture, chrome/white type with blue emphasis + halo, motion-blur vertical whips between beats (no hard cuts), one idea per beat, a callback (the stuck confidence spinner returns *resolved*), and a held outro.

## Data-viz vocabulary (carries the whole piece)
A-vs-B variant cards · a confidence meter that fills then **stalls** · calendar week-flip · "LAUNCHED ANYWAY" stamp · visitor-volume counter climbing to "thousands" · 95%-to-call-a-winner threshold · "not enough data / no clear answer" state · **probability-to-win %** per version · **uplift range +X%** · "no meaningful difference" indicator · "Decision made / Test closed" resolution.

## Outro / CTA
EcomIQ logo lockup + **"Find out more →"** flame pill button, held ~4s.

## Render plan
Lint clean → draft render → extract & **Read** frames (frame verification) → MP4 review (Gate 2) → final `--quality high`.

Storyboard with per-beat VO-anchored timings → `STORYBOARD.md`.
