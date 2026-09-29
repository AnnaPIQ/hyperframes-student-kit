# bf-webinar — Design Spec

EcomIQ Black Friday webinar ad. Sean's A-roll (full 18.9s audio) is the spine;
B-roll = social proof; kinetic figures = emphasis; end card = CTA.

Formats (one template `src/ad.template.html` → `node scripts/build.mjs`):
- **9:16** 1080x1920 · `index.html` (project root, Studio preview)
- **4:5** 1080x1350 · `.build-4x5/index.html` (generated, gitignored)
- Graphics-only layers `.build-layer-9x16/`, `.build-layer-4x5/` (generated) for delivery.

**Deliver with `bash scripts/finish.sh`** (not `hyperframes render`): renders the graphics
layer as ProRes 4444 alpha, converts it SDR→HLG with `assets/luts/sdr-to-hlg.cube`
(BT.2408, 203-nit white; brand colours round-trip within 1/255), overlays it on the untouched
HLG A-roll, adds the −14 LUFS VO → `final-9x16.mp4`, `final-4x5.mp4` (HEVC Main10 HLG, AAC).
Why: the engine's own HDR compositor shifted brand colours (flame → pure red, navy → bright blue).

Brand kit from `assets/ecomiq/` (see `.claude/skills/ecomiq-ad/references/brand.md`).
Tokens: `assets/brand-tokens.css`. Fonts: local `assets/fonts/RethinkSans.woff2` +
`HedvigLettersSerif.woff2`. Logo: `assets/ecomiq-logo-white.svg`.

## Palette (each hue has a job)
| Colour | Token | Meaning here |
|---|---|---|
| Navy `#06284C` | `--brand-navy` | brand canvas: discount takeover, graphic panels, end card |
| Black `#000` | `--brand-black` | neutral page background only |
| Flame `#FF4C32` | `--brand-flame` | the hot accent: growth, discount danger, CTA |
| Blue Tint `#9CD4FF` | `--brand-blue-tint` | eyebrows, "last year", end-card date line |
| White / Sky | `--brand-white` / `--brand-sky` | figures, body |

## Type
Rethink Sans 800 for figures/headlines (−3% tracking, ~0.95 leading), 700 tracked
caps for eyebrows. **Client direction: no serif/italic emphasis on this ad** — the end-card
headline "Double your Black Friday" is all white Rethink Sans. All colours come from
`assets/brand-tokens.css` (CSS `var()`/`color-mix()`, JS reads the tokens) — no hex in the template.

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

Every cut: clean slide + fade (±120px, no blur, no light streak: client asked for no flashes).
Persistent logo bug top-left (10% width, drop shadow). No vignette/grain over footage: the
footage keeps its original lighting.

## Subtitle safe zone (keep clear, subtitles added later)
- 9:16: bottom **600px** (y ≥ 1320). 4:5: bottom **330px** (y ≥ 1020).
- Overlay graphics sit in an upper band (`--band-top`) on compact navy panels (no full-frame
  scrim — it darkened the footage); the discount
  takeover and end card pad their content above the zone (`--safe-bottom`).

## Footage prep (see assets/footage/)
- A-roll: **native iPhone HLG HDR, passed through untouched** (resize/crop/30fps only,
  HEVC Main10, BT.2020, arib-std-b67). No tonemap, no LUT, no grade: original lighting.
  No push-in either. Composited by `scripts/finish.sh` (see top).
- 4K B-roll was vertical footage stored sideways → `transpose=1`.
- 4:5 = crop of the 9:16 frame (A-roll at y=150 for headroom above Sean; portrait B-roll centred). Stage clip is
  scale+pad on a blurred fill in both ratios.

## What NOT to do
- No captions (brief; subtitles come later in the safe zone). No serif/italic. No off-palette accents, no hex in the template.
- No vignette/grain/scrim/zoom on Sean's footage. Don't deliver via plain `hyperframes render` (HDR colour shift).
- Don't edit `index.html` directly — edit `src/ad.template.html` and rebuild.
