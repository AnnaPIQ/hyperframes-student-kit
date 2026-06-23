# STORYBOARD — PacificIQ × Duckhorn Six-Site Launch Sizzle (30s · 16:9 · 30fps)

## Timing table

| # | Scene | Comp file | Start | Dur | Beat |
|---|-------|-----------|-------|-----|------|
| — | Ambient bg (electric-blue grid + vignette + grain) | runs across all scenes (track 0) | 0.0 | 30.0 | unifying texture |
| 1 | Cold open — leaf + "SIX BRANDS / ONE LAUNCH DAY" | `01-open.html` | 0.0 | 5.5 | Hook |
| 2 | The Duckhorn Collection | `02-tdc.html` | 5.5 | 3.2 | Showcase 01/06 |
| 3 | Duckhorn Vineyards | `03-duckhorn.html` | 8.7 | 3.1 | Showcase 02/06 |
| 4 | Decoy | `04-decoy.html` | 11.8 | 3.1 | Showcase 03/06 |
| 5 | Goldeneye | `05-goldeneye.html` | 14.9 | 3.1 | Showcase 04/06 |
| 6 | Calera | `06-calera.html` | 18.0 | 3.1 | Showcase 05/06 |
| 7 | Greenwing | `07-greenwing.html` | 21.1 | 3.3 | Showcase 06/06 |
| 8 | Payoff — six-grid → PacificIQ lock + CTA | `08-outro.html` | 24.4 | 5.6 | Payoff + hold |

**Total: 30.0s.** Three acts: Hook (0–5.5 ≈ 18%) · The Six (5.5–24.4 ≈ 63%) · Payoff (24.4–30 ≈ 19%).
**Rule of sixes:** six brands, each one idea/one beat. Counter "0N / 06" reinforces the count.

---

## Beat 1 — COLD OPEN (0.0–5.5, 5.5s) — "PacificIQ launched six brands at once."
**Visual:** Near-black canvas, faint electric-blue perspective grid receding + crosshair `+` marks. A soft electric-blue bloom at center. PacificIQ **leaf mark** scales up from 0.7→1 with a blur-clear (0–1.0s). Then kinetic type:
- "SIX" + "BRANDS." land word-by-word, Space Grotesk 800, white with electric-blue underline sweep (1.0–2.8s).
- Swap to "ONE LAUNCH DAY." — "ONE" carries, scales 1→1.15 (2.8–4.6s).
- Mono kicker "PACIFICIQ · SHOPIFY PARTNER" tracks in under, lime `#FAFF7E` micro-dot pulsing (the only lime in the piece besides outro).
**Motion language:** bloom + word reveal + camera drift on grid.
**Eases:** `power3.out` (word slide), `expo.out` (leaf), `power2.in` (whip-out), `sine.inOut` (grid drift).
**Exit:** vertical whip-up with 30px blur into card #1 (MOTION_PHILOSOPHY cut-the-curve whip).
**Audio:** music bed enters; soft riser. Whoosh on exit.

## Beats 2–7 — THE SIX (template, ~3.1s each)
**Visual:** Dark canvas. A rounded **browser-frame card** (dark chrome, 3 dots, URL pill showing the domain) whips in from alternating sides (R, L, R, L, R, L) with motion blur, settling slightly off-center. Inside: the scroll-capture video plays (real scroll motion). Lower-left text block animates up:
- **Brand name** — Space Grotesk 700, white (e.g. "The Duckhorn Collection")
- **One-line descriptor** — Space Grotesk 400, `#E3E3FD`
- **Domain** — JetBrains Mono, electric-blue `#0500ED`
Top-right: mono counter "01 / 06" → "06 / 06". A thin electric-blue progress tick advances each beat.
**Motion language:** card whip-in (blur→clear), text stagger-up, slow 1.02× push on the card while it holds (camera never sleeps), whip-out.
**Eases:** card in `expo.out` (0.6s) / card out `power2.in` (0.3s); text `power3.out` stagger 0.08; hold push `none`.
**Exit:** whip in card-travel direction, hands velocity to next card's entry (matched at the seam).
**Audio:** whoosh per transition (~0.2); subtle tick on counter increment.

Per-brand descriptors + domains:
| # | Brand | Descriptor | Domain | Card enters from |
|---|-------|-----------|--------|------------------|
| 02 | The Duckhorn Collection | The portfolio, reimagined | theduckhorncollection.com | right |
| 03 | Duckhorn Vineyards | Napa Valley estate, est. 1976 | duckhorn.com | left |
| 04 | Decoy | Pour to what's possible | decoywines.com | right |
| 05 | Goldeneye | Anderson Valley Pinot Noir | goldeneyewinery.com | left |
| 06 | Calera | A singular mountain | calerawine.com | right |
| 07 | Greenwing | Rooted in remarkable places | greenwingwines.com | left |

## Beat 8 — PAYOFF + OUTRO (24.4–30.0, 5.6s) — "Six websites. One launch. PacificIQ."
**Visual:**
- (24.4–25.8) Six site thumbnails snap into a tidy **3×2 grid** (callback — every brand returns at once), electric-blue connector lines pulse between them. "SIX WEBSITES. ONE LAUNCH." sweeps in.
- (25.8–26.8) Grid scales down + blurs back; near-black resets.
- (26.8–30.0) PacificIQ **leaf + "PacificIQ" wordmark** crystallize center, electric blue. A lime `#FAFF7E` "● LIVE" tag flickers on, then settles. Sub-line: `pacificiq.com` · *The future of commerce.* **Hold ~3.2s** (the longest shot — the breath). Shimmer glint passes the wordmark once.
**Motion language:** grid assemble → recede → logo crystallize → stillness.
**Eases:** grid snap `back.out(1.4)`; recede `power2.inOut`; logo `expo.out`; shimmer `none`.
**Exit:** none — final hold to 30.0.
**Audio:** music swells then resolves; single soft "snap"/chime on logo lock; tail to silence.

---

## Palette discipline (≤5 hues, each with meaning)
- `#0A0A0C` near-black — canvas / silence
- `#0500ED` electric blue — **PacificIQ brand thread** (grid, domains, connectors, logo)
- `#FFFFFF`/`#E3E3FD` white/lavender — voice / labels
- `#FAFF7E` lime — "live / launched" flourish ONLY (open kicker dot + outro LIVE tag)
- warm wine tones — live only inside the footage (the brands' own color)

## Callbacks
- Leaf mark: open → outro. · Electric-blue grid: every scene. · "ONE LAUNCH" line: open → outro. · All six cards return in the outro grid.
