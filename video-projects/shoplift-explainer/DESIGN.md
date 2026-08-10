# shoplift-explainer — Design Spec

**ShopLift × EcomIQ** — ~20s motion-graphics product explainer.
Format: 9:16 Story/Reels · 1080×1920 @ 30fps · safe area ~10% margins · captions OFF.

Brand = **EcomIQ** (drives the look). Tokens: `assets/brand-tokens.css`; local fonts in
`assets/fonts/`. Full brand reference: `assets/ecomiq/BRAND.md`.

- **Palette:** navy `#06284C` (canvas) · blue-tint `#9CD4FF` (accent / italic emphasis) ·
  flame `#FF4C32` (the one hot accent — CTA, emphasis) · white. The real ShopLift
  screenshot keeps its in-app success-green (`Lift +20.4%`); EcomIQ callouts stay flame/blue.
- **Type:** Rethink Sans (headlines/body, −3% tracking) + Hedvig Letters Serif *italic*
  for the one emphasis word per headline (`ends.`, `traffic.`, `winner`).
- **Texture:** persistent navy bg + faint perspective grid + vignette + CSS grain on every
  scene. Motion-blur whip transitions between beats — no hard cuts.

## Story (4 beats, synced to the condensed VO)
| Time | Beat | On screen |
|---|---|---|
| 0.0–4.7 | **Test that never ends** | A vs B store cards (real product shot, hue-shifted B), significance meter stuck at **47% / 95% needed**, spinner "Still running — day 34" |
| 4.7–8.3 | **Not enough traffic** | Sparse visitor-dot stream, counter "**182** of ~4,000 needed", near-empty bar; "traffic" punches flame |
| 8.3–17.0 | **ShopLift's fix** (hero) | EcomIQ browser card wrapping the **real shoplift.ai results UI** (Lift +20.4%, Original 1.67% vs Variant 3.59%); EcomIQ stat pills animate in — **Probability to win 92%** (on "how likely each version is to win") + **Revenue uplift +20.4%** (on "difference it could make"); flame "✓ Variant B wins" stamp |
| 17.0–20.0 | **End card** | EcomIQ lockup + "Turn tests into decisions." + flame **Find out more →**, shimmer sweep, 3s hold |

## Voiceover
`assets/vo/shoplift-vo-cut.m4a` — 17.77s, **−16.8 LUFS / −1.5 dBTP**, denoised/de-clicked/
de-essed. Spliced from the source (`assets/vo/shoplift-vo.m4a`) on silence boundaries with
edge fades + inter-sentence beats: Hook (0–4.66) · Problem (4.8–8.2) · Solution (8.3–12.4) ·
Payoff (12.5–17.8). Wired as a sibling `<audio>` at `data-volume="1"`.

## Product assets (real captures — public shoplift.ai)
`assets/product/` — `results-chart.png` (hero results UI), `prod-a.png` / `prod-b.png`
(storefront A/B), cropped/converted from the site's public CDN. Raw captures in `captures/`
(gitignored).

## Render
Lint clean (0/0) → `renders/shoplift-final.mp4` at `--quality high`. `renders/` is gitignored.
