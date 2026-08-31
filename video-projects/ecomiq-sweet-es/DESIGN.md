# EcomIQ × Sweet E's Bake Shop — social-proof ad · DESIGN

Audio-led social-proof ad. Sean to camera carries the argument; Sweet E's b-roll
carries the proof; a full-bleed navy card lands **only** where a real figure is
spoken. Ends on the EcomIQ end card.

**Deliverables:** `final-9x16.mp4` (1080×1920) · `final-4x5.mp4` (1080×1350),
both 30fps H.264/AAC `+faststart`, rendered `--quality high`.
**Runtime:** 46.60s (41.90s of voiceover + 4.70s end-card hold).

---

## 1 · Palette & type — tokens only

Everything comes from `assets/brand-tokens.css`. No hardcoded hexes in the
composition, no invented colours.

| Role | Token | Value |
|---|---|---|
| Card / canvas | `--brand-navy` | `#06284C` |
| Raised card surface | `--brand-surface` | `#0a325f` |
| Non-text accent, rules, bar fills | `--brand-blue-tint` | `#9CD4FF` |
| The one hot accent (CTA pill, figure underscore) | `--brand-flame` | `#FF4C32` |
| All text | `--brand-white` | `#FFFFFF` |

**All text is white.** Blue tint is for non-text accents only — rules, bar fills,
grid lines, the tick under a figure. Flame is the only hot accent and appears on
the CTA pill and a single hairline under each hero figure.

**Type:** Rethink Sans, local `.woff2` from `assets/fonts/` (no CDN). Named
literally in CSS (`font-family:'Rethink Sans'`) because the linter doesn't resolve
`var()`. **Every piece of display type is weight 800** — a 700 cut lints clean but
reads as a different typeface. Big type keeps −2% tracking and ~0.95 leading.
Hedvig Letters Serif is *not* used here: this is a numbers ad, and the serif
italic emphasis is reserved for headline creative.

## 2 · The frame — constant on every scene

- **EcomIQ white lockup, top-left**, 300px wide, from first frame until the end
  card takes over. Wrapped in a positioned non-`clip` `<div>` so the render
  engine can't reposition it.
- **Vignette** — radial, transparent centre → navy-black edge, over footage and
  cards alike.
- **CSS grain** — three radial-gradient tiles at 3/5/7px, alphas .03/.02/.015.
  Deterministic, no PNG, no `repeat: -1`.
- **Bottom 30% (y > 1344 in 9:16) stays clear of graphics** — subtitles are added
  later on the platform. No burned-in captions anywhere.

## 3 · Cards — the hard rules

A card is a **full-bleed navy panel**: `position: absolute; inset: 0` (z-index is
inert without it). A numeral is never floated over footage; either the card owns
the frame or the footage plays clean with **no scrim**.

Card anatomy, top to bottom, all inside the top 70%:

1. **Eyebrow** — 34px, wide-tracked (.18em) uppercase, white at 72% opacity.
2. **Figure** — 190–300px, weight 800, white, with a 4px flame hairline beneath.
3. **Label** — 40px uppercase, white at 80%, says what the figure measures.

Hidden states are authored as `opacity: 0` **in CSS**, never via `tl.set(…, 0)`
— a `set` at time 0 doesn't render on frame 0. Entrances use `gsap.fromTo`.

**No unlabelled charts.** The only chart in the piece (card E) is two bars in a
true 1:3 ratio, each with its own label.

## 4 · Motion

- **Every cut is a motion-blurred vertical whip, never a fade.** 0.22s: outgoing
  scene translates −8% Y under a rising `blur(18px)`, incoming arrives from +8%
  Y with the blur resolving to 0. A blue-tint streak crosses on the same beat to
  mask the join.
- **The camera never sleeps.** Every footage scene carries a slow 1.00→1.045
  scale drift; every card's figure has a 0.6% breathing scale. No static frames.
- Figures count up from 0 on a proxy tween's `onUpdate` — `tl.call()` never fires
  under render, so it is not used anywhere.
- Never animate `letterSpacing` (lint rejects it) — tracked entrances animate
  per-word/per-character spans instead.
- Never animate `width/height/top/left` on a `<video>` — each is wrapped in a
  `<div>` and the wrapper is animated.

## 5 · Ratios

`index.html` is the 9:16 master. `scripts/make-ratios.py` reads it and emits
`index-4x5.html`, rewriting the root `data-width`/`data-height`, the asset suffix
(`-9x16` → `-4x5`) and the type-scale + safe-area custom properties. The 4:5
b-roll and A-roll are cut from the 4K masters with their own crop windows — the
4:5 frame is **not** a centre-crop of the 9:16 render, so nothing is upscaled and
Sean stays centred in both.

## 6 · Sources

| Asset | Master | Notes |
|---|---|---|
| A-roll | `Sweet E's customized in Bulk.mov` | 3840×2160 ProRes, 25fps, 47.20s. Full master (no quota block). |
| B-roll ×3 | `Copy of Sweet E's Owner Erica - Packing cake.MP4` | 93.09s |
| B-roll | `Copy of Sweet Es - Sprinkle on Cupcakes.MP4` | 48.34s |
| B-roll | `Copy of Sweet Es Cookie scroll.MP4` | 13.89s |
| B-roll | `Sweet E's Sean and Erica - intro.MP4` | 82.87s · 0:11–0:13 used. Replaced the laptop shot on review — it puts client and agency in one frame on the line "a brand *we've* worked with". |
| Sweet E's logo | `sweetesbakeshop.com/cdn/shop/files/SweetE-Logo-Pink2.png` | Their own file, 1000×396, unmodified — never redrawn, never recoloured. |
| Figures | `ecomiq.com/blogs/case-studies/how-sweet-es-bake-shop-grew-sessions-7x-in-four-years…` | |

**Measured facts baked into `scripts/prep-assets.sh`:**

- Every b-roll master is a phone-vertical take stored 3840×2160 with **no rotation
  metadata** — the picture is on its side. `transpose=1` (90° CW) is required and
  yields 2160×3840, exactly 9:16, so the 1080×1920 downscale is a clean 2:1.
- A-roll 9:16 window `crop=1215:2160:1200:0`; 4:5 window `crop=1728:2160:943:0`.
  Sean sits left of centre in the landscape master.
- Mean luma: A-roll ~72, b-roll ~120–143. The b-roll is nearly twice as bright as
  the blue-lit A-roll, so an ungraded A/B cut flashes. `eq()` lifts the A-roll and
  pulls the b-roll down; the vignette closes the rest of the gap.
- VO occupies 2.88–43.60s of the master; the cut keeps **2.40–44.30 (41.90s)** —
  the full voiceover plus a little air at each end. No cutdown.
