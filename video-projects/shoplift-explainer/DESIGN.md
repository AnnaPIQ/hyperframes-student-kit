# shoplift-explainer — Design Spec

Format: 9:16 Story/Reels · 1080×1920 @ 30fps · Safe area ~10% margins (≈108px sides).
Duration: 57.47s — locked to the cleaned VO (`assets/shoplift-vo.wav`, ≈−16 LUFS).

**Brand = EcomIQ** (not ShopLift). EcomIQ motion-graphics drive the design; the real
ShopLift product UI appears *inside* EcomIQ-styled device/card frames. ShopLift's own
green/navy UI colors read as "the product," not as the ad's design system — every EcomIQ
annotation, callout, ring and CTA is **flame orange**, the single hot accent.

## Idea
- **Hook:** an A/B test that never ends — two weeks, then four, still no answer.
- **Problem:** significance tests need thousands of visitors; most Shopify stores don't have the volume → not enough data.
- **Fix (hero):** ShopLift's update shows *probability to win* + *uplift*, and flags when there's no real difference — so you decide and move on.
- **CTA:** EcomIQ logo + "Find out more →" (flame).

## Colors (from `assets/brand-tokens.css`)
| Role | Hex |
|---|---|
| Canvas navy | `#06284C` |
| Deeper navy (vignette/edges) | `#041B34` |
| Card surface | `#0a325f` / `#103d6f` |
| Border | `#1d4a7a` |
| Blue tint (meters, labels, secondary) | `#9CD4FF` |
| Sky (pale detail) | `#DEEEFE` |
| **Flame (THE hot accent — answer, rings, CTA)** | `#FF4C32` |
| White (primary text) | `#FFFFFF` |
| Dim blue-grey (muted text) | `#9fb6d4` |

≤5 active hues, each with meaning: navy = canvas/silence · white = voice · blue-tint = data/UI ·
flame = the answer / the payoff · (ShopLift green inside real screenshots = "the product").

## Typography (local `.woff2`, no CDN)
- **Rethink Sans** — headlines + labels. Big heads −2% tracking, ~1.0 leading.
- **Hedvig Letters Serif** *italic* — exactly one emphasis word in a headline, used sparingly (brand signature). Never two per headline.

## Motion (EcomIQ adaptation of MOTION_PHILOSOPHY.md)
- Navy canvas, ~85% negative space. Blue-tint line-grid + vignette + faint grain on every beat (the unifying texture).
- One idea per beat; a new element every ~0.6–1s. Pacing follows the VO's explanatory cadence (this is a narrated explainer, not a 1.5s-cut hype spot) — but motion never sleeps: grid drifts, vignette breathes, progress line fills.
- **Motion-blur whip streak (flame→white) at every seam** — no hard cuts. Content enters with y+blur.
- Never animate out except the final card. The incoming whip + entrance masks each cut.
- **Callbacks:** the A/B pair (Beat 1 setup → Beat 6 winner) · the significance meter (Beat 1 stuck → Beat 3 demanding → Beat 4 replaced by probability-to-win).

## Real product assets (captured from public shoplift.ai)
- `assets/product/analyze-trim.png` — **hero:** "Lift +20.4%" + Original-vs-Variant chart + A/B insight table with uplift badges. → Beat 4.
- `assets/product/variant3-trim.png` — two storefront variants side-by-side + "+20.21%". → Beat 1 A/B, Beat 6 winner.
- `assets/product/variant1-trim.png` — "Select your variant" test-builder. → supporting.
- `assets/product/variant2-trim.png` — product-page variant editor. → supporting.
- **Probability-to-win gauge** (Beat 4) is the login-gated in-app view → recreated in EcomIQ style (user opted for public-capture-only, no logins).

## Beat sheet → VO word timings (absolute s)
| Beat | Slot | VO |
|---|---|---|
| 1 · Test that never ends | 0.0–8.95 | "…A-B test… it just keeps running? Two weeks… then four… still no closer to an answer." |
| 2 · Give up; it's traffic | 8.95–16.0 | "Eventually you give up and launch the version you preferred… the issue is simply traffic." |
| 3 · Needs thousands / not enough data | 16.0–31.0 | "…need thousands of visitors… don't have that volume… isn't enough data… clear answer." |
| 4 · ShopLift's fix (HERO) | 31.0–43.2 | "…ShopLift's latest update… see how likely each version is to win and what difference it could make." |
| 5 · Flags "no real difference" | 43.2–50.05 | "…tell you when there isn't enough of a difference… still very, very useful." |
| 6 · Decide and move on | 50.05–55.3 | "make a decision and move on instead of leaving a test running for months…" |
| End card | 55.3–57.47 | (VO tail / room tone) EcomIQ logo + "Find out more →" |

## What NOT to do
- No second emphasis word; no serif italic used flat/everywhere.
- Flame is the ONLY hot accent for EcomIQ elements — don't introduce ShopLift green into EcomIQ chrome.
- No hard cuts; no CDN GSAP/fonts (render-freeze); `gsap.fromTo` for anything starting hidden.
- Don't let the persistent logo or a callout overlap unread product UI text.
