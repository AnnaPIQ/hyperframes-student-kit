# fuel-on-a-leak-june26 — Design Spec

Format: 4:5 Meta feed · 1080x1350 @ 30fps · Safe area ~10% margins (≈108px).
Brand: EcomIQ. Tokens → `assets/brand-tokens.css`. Logos → `assets/`. Fonts local.

## The idea
- **Hook:** If more budget isn't growing revenue, this is why.
- **Thesis (the name):** *Don't pour fuel on a leak.* — the leak isn't in the ads,
  it's what happens after the click. More spend just pumps more people into a
  broken system.
- **Proof:** Drift Sleep — **+59% returning customers, $0 extra ad spend.**
- **CTA:** Find your growth bottleneck → click the link below.

## Source
- `assets/ad5.mp4` — talking-head VO take (1280×720 → center-cropped to 4:5),
  re-encoded H.264 from `ad 5.mov`. ~62.8s. Its own audio feeds the mix
  (`data-has-audio="true"`), so VO stays in lip-sync. Footage runs continuously
  underneath; branded graphics cut **over** it at the key beats (no video splices).

## Structure (continuous face underneath + branded overlays/cutaways)
| # | Window | Mode | Beat |
|---|---|---|---|
| 1 | 0–12s | face + captions | Hook. Thesis chip "Don't pour fuel on a *leak*." More budget / traffic / spend. |
| 2 | 12–21s | FULL-FRAME graphic | The leak isn't in the *ads* — it's after the click. (leaky funnel) |
| 3 | 21–28s | face + caption chips | 3 leaks: offer · landing page · one-time buyers |
| 4 | 28–35s | face + caption | More budget = more people into the same broken system |
| 5 | 35–46s | FULL-FRAME stat (HERO) | Drift Sleep **+59%** returning customers · $0 extra ad spend |
| 6 | 46–55s | face + caption | Growth comes from fixing what's already there |
| 7 | 55–63s | FULL-FRAME end card | Find your growth bottleneck → Click the link below |

## Look
- Navy `#06284C` canvas behind every graphic; talking head full-bleed for face beats.
- Headline signature: bold Rethink Sans + **one** italic-serif emphasis word
  (Hedvig Letters Serif) in blue-tint or flame.
- Flame `#FF4C32` is the only hot accent — CTA pill, the "leak"/"+59%" emphasis.
- Bottom navy→transparent scrim under captions for legibility over the face.
- Persistent EcomIQ logo bug, top-left, small.

## Motion (SaaS / medium energy)
- Face↔graphic = blur+scale dip (the panel covering/uncovering the face IS the
  transition — never a hard cut). Type entrances `power3.out`; CTA `back.out(1.7)`;
  pulses `sine.inOut`. One idea per beat. End card holds; CTA breathes.

## What NOT to do
- No second emphasis word per headline. No off-brand accent colours.
- Don't reset big-headline tracking to 0 (brand is −2%, ~1.0 leading).
- No hard cuts between face and graphics. Don't stretch/recolour the logo.
- No captions covering the speaker's face — keep them in the lower band.
