# bf-webinar — Design Spec

EcomIQ Black Friday webinar ad. Sean's A-roll (full 18.9s audio) is the spine;
B-roll = social proof; kinetic figures = emphasis; end card = CTA.

Formats (one template → two builds, `node scripts/build.mjs`):
- **9:16** 1080x1920 · `index.html` (project root)
- **4:5** 1080x1350 · `.build-4x5/index.html` (generated sibling project, gitignored)

Brand kit from `assets/ecomiq/` (see `.claude/skills/ecomiq-ad/references/brand.md`).
Tokens: `assets/brand-tokens.css`. Fonts: local `assets/fonts/RethinkSans.woff2` +
`HedvigLettersSerif.woff2`. Logo: `assets/ecomiq-logo-white.svg`.

## Palette (5 hues, each with a job)
| Colour | Token | Meaning here |
|---|---|---|
| Black `#000` | `--brand-black` | Black Friday canvas (discount takeover) |
| Navy `#06284C` | `--brand-navy` | brand canvas, scrims, end card |
| Flame `#FF4C32` | `--brand-flame` | the hot accent: growth, discount danger, CTA |
| Blue Tint `#9CD4FF` | `--brand-blue-tint` | eyebrows, "last year", serif emphasis |
| White / Sky | `--brand-white` / `--brand-sky` | figures, body |

## Type
Rethink Sans 800 for figures/headlines (−3% tracking, ~0.95 leading), 700 tracked
caps for eyebrows. Hedvig Letters Serif italic for ONE word only: *Double* on the end card.

## Beat sheet (Whisper word timestamps)
| t (s) | VO | Visual |
|---|---|---|
| 0.30–2.10 | "double your revenue this Black Friday" | Sean + 1.0×→2.0× count-up, bar doubles |
| 3.14–5.22 | "a bigger discount is not going to get you there" | full-screen: discount dial 10→60% OFF, contribution margin drains 38→4%, "2× revenue" struck out |
| 5.18–6.42 | "this is why we've created" | B-roll: Sean on stage (Shoptalk) — landscape, scale+pad |
| 6.62–7.64 | "completely free webinar" | FREE slam + WEBINAR pill |
| 8.98–10.76 | "walk you through the secrets" | B-roll: Sean mentoring w/ laptop |
| 10.74–12.12 | "eight and nine figure brands" | B-roll Sweet E's → Dryft; $10,000,000 → $100,000,000 |
| 12.98–14.50 | "most successful Black Friday" | B-roll: Sean + Dryft founder in store |
| 15.50–16.46 | "It's completely free" | FREE callback |
| 16.55–20.50 | "Click the link below…" | end card; audio ends 18.9s, holds to 20.5s |

Every cut: light-streak whip + ±160px / 28px blur whip. Persistent logo bug top-left
(10% width, drop shadow). Grain + vignette on every frame.

## Footage prep (see assets/footage/)
- A-roll: iPhone HLG HDR → SDR (zscale + mobius tonemap @203 nits), 30fps.
- 4K B-roll was vertical footage stored sideways → `transpose=1`.
- 4:5 = centre crop of the 9:16 frame (A-roll + portrait B-roll). Stage clip is
  scale+pad on a blurred fill in both ratios.

## What NOT to do
- No captions (brief). No second serif-italic word. No off-palette accents.
- Don't edit `index.html` directly — edit `src/ad.template.html` and rebuild.
