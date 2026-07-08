# STORYBOARD — 20–30s cutdown ("The Lever Moved", short)

Derived from the locked 60s master by **re-cutting the existing VO/footage** (no re-record).
Target: **~24s + ~3s end-card hold = ~27s**. Slug (proposed): `lever-moved-short`.

## Method
The 60s recording is one continuous take. Using the phrase boundaries from the earlier
`silencedetect` pass, we lift 4 clean segments and concatenate them into
`lever-talk-short.mp4` (video + VO together). The **graphic cutaways sit on every seam**,
so the talking-head jump-cuts are hidden behind motion graphics (not visible as jumps).

## VO selection (exact source timecodes from the 60s master)
| Keep | Source in 60s | Words | ~len |
|------|---------------|-------|------|
| A | 0.37–5.70 | "If you're spending more on Meta than ever and making less profit than ever — this is probably why." | 5.3s |
| B | 15.59–21.66 | "Brands increase spend month after month, while ROAS drifts down and profits get squeezed." | 6.1s |
| C | 43.26–48.35 | "The platforms got harder, the signal got worse — and the lever moved." | 5.1s |
| D | 51.55–59.57 | "If your ad spend keeps climbing but results aren't following — let's find out what's holding your growth back. Click the link below." | 8.0s |
| | | **VO total** | **~24.5s** |

Dropped from the 60s: "most founders think it's simple", the "spend more on ads / for years
that worked" setup, "pulling the lever 18 months ago" (concept still lands via C), the
3-weakness list, "most haven't realized it yet". (Tighter ~22s option: trim B to drop
"and profits get squeezed" and trim D's tail — needs sub-phrase cut points.)

## Beat-by-beat (short timeline)
| # | Time | On screen | VO | Graphic (reuse) |
|---|------|-----------|----|-----------------|
| 1 | 0.0–5.3 | **Hook** → Sean | A | Diverging counters **AD SPEND ▲ / NET PROFIT ▼** (fast, ~2s) → whip to Sean. Reuse `01-hook` (sped back up to ~2s). |
| 2 | 5.3–11.4 | cutaway | B | **Spend ▲ / ROAS ▼** diverge chart. Reuse `04-diverge`, condensed to ~5s. |
| 3 | 11.4–16.5 | Sean + stab | C | **"The lever moved."** serif/flame stab over Sean (the title payoff). Reuse the lever-moved stab. |
| 4 | 16.5–24.5 | Sean → end card | D | Sean delivers the offer → **end card** (logo · "Find what's actually holding your brand back." · **Learn More →** #FF4C32). Reuse `endcard`. |
| — | 24.5–27 | end-card hold | — | 2.5s hold. |

Three-act in miniature: **hook (problem) → the shift → CTA.** One idea per beat, every
seam on a motion-graphic, end-card holds. Keeps the brand system (navy + flame, Rethink/
Hedvig, logo, grade, grain). VO-only, no captions (matches the master).

## Build steps (once approved)
1. `ffmpeg` extract the 4 segments from `assets/lever-talk.mp4` (video+audio), concat →
   `assets/lever-talk-short.mp4` (~24.5s). Re-encode H.264, faststart.
2. Scaffold `video-projects/lever-moved-short/` (copy brand kit + the reused comps:
   `01-hook`, `04-diverge`, lever-moved stab, `endcard`, `frame`; vendor `gsap.min.js`).
3. New `index.html` wiring the 4 beats over the short footage; re-time graphics to the
   new seams; whip transitions on each cut.
4. Lint → draft render → frame-verify (hook counters, diverge directions, stab, end card)
   → send draft → final `--quality high` @1080×1350.

## Decisions to confirm
- **Length:** ~27s as planned, or push for a tighter ~22s (needs finer sub-phrase cuts)?
- **Beat 3 graphic:** bring back the **"The lever moved." stab** (removed from the 60s) for
  the short's payoff — OK? Or keep Sean clean there?
- **Format:** same 4:5 (1080×1350), or also want a 9:16 story version of the short?
