# EcomIQ — Brand Reference

Distilled from the EcomIQ Brand Guidelines (the `EComiq_Branding_Brand.pdf`).
EcomIQ = e-commerce intelligence. Core values: **trust, clarity, precision,
efficiency, empowerment.** Tone: modern yet trustworthy, analytical yet
approachable.

## Palette
| Name | Hex | Token (`brand-tokens.css`) | Role |
|---|---|---|---|
| Navy | `#06284C` | `--brand-navy` | primary canvas, primary text on light |
| Blue Tint | `#9CD4FF` | `--brand-blue-tint` | secondary accent, highlights, italic emphasis |
| Sky Blue | `#DEEEFE` | `--brand-sky` | pale surfaces, subtle dividers |
| Flame Orange | `#FF4C32` | `--brand-flame` | **the** hot accent — CTAs, emphasis |
| White | `#FFFFFF` | `--brand-white` | text on navy |
| Black | `#000000` | `--brand-black` | neutral |

> Note: the source PDF labels a white swatch with hex `#000000` (a typo). White
> is `#FFFFFF`; black `#000000` is a separate neutral.

**Gradients:** Gradient 1 = warm (flame→gold, `--brand-gradient-1`). Gradient 2 =
blue→flame (`--brand-gradient-2`). Use as soft background blooms, never behind body text.

## Typography (both on Google Fonts)
- **Rethink Sans** — primary. Weights 400/500/600/700/800. Headlines ≥72px,
  **100% leading, −2% tracking.** Clean geometric sans = clarity/efficiency/trust.
- **Hedvig Letters Serif** — secondary, used *italic* for a single emphasis word
  in a headline (the brand's signature). Adds tradition/credibility.

Google Fonts link:
```html
<link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800&family=Hedvig+Letters+Serif:opsz@12..24&display=block" rel="stylesheet" />
```

## Logos (copied into each project's `assets/`)
| File | Use |
|---|---|
| `ecomiq-logo-white.svg` / `.png` | full lockup on **navy/dark** backgrounds (default for ads) |
| `ecomiq-logo-navy.svg` / `.png` | full lockup on **light** backgrounds |
| `ecomiq-icon-white.svg` | icon-only mark, white |
| `ecomiq-icon-navy.png` | icon mark on navy square |

Master copies also live at repo root: unzip from the brand kit into a project's
`assets/` when starting fresh. Never stretch or recolor the logo.

## Art direction
Vibrant, high-key product photography (fresh, energetic) set on navy or white.
Headline signature = italic-serif emphasis word + bold sans.

## Don'ts
- No second emphasis word; no off-brand accent colors (flame orange is the only hot).
- Don't reset big-headline tracking to 0 (brand is −2%).
- Don't put body copy over a gradient bloom.
