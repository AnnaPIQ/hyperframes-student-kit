# Storyboard — One Opinion, or an Entire Team (4:5 · 1080×1350 · 30fps)

VO runs continuously 0.40 → 73.32s. Logo top-left + navy canvas persist across every
scene. TH = founder talking-head · GFX = full-frame brand motion graphics ·
B-ROLL = real client footage.

**Timebase.** Project time = source time − **1.68s** (trims the leading silence so the
first word lands at 0.40s). Every cut is anchored to a Whisper word onset from
`assets/transcript.json`, cross-checked against an ffmpeg silence map (agreement ±0.15s).

| # | Scene | Type | Start | End | Dur | Source |
|---|-------|------|-------|-----|-----|--------|
| 1 | Founder — the cold open | TH | 0.00 | 7.00 | 7.00 | `th1.mp4` |
| 2 | Stale experience stamp | GFX | 7.00 | 9.55 | 2.55 | `s03-stale.html` |
| 3 | Founder — "why we built EcomIQ" | TH | 9.55 | 13.80 | 4.25 | `th2.mp4` |
| 4 | Logo wall + Premier Partner | GFX | 13.80 | 20.90 | 7.10 | `s05-logo-wall.html` |
| 5 | Founder — "not one person's take" | TH | 20.90 | 24.05 | 3.15 | `th3.mp4` |
| 6 | The ten specialists | GFX | 24.05 | 30.95 | 6.90 | `s07-team.html` |
| 7 | Founder — "here is how it works" | TH | 30.95 | 33.10 | 2.15 | `th4.mp4` |
| 8 | **01** Strategy session | GFX | 33.10 | 41.95 | 8.85 | `s10-system.html` |
| 9 | Founder — "two specialist calls" | TH | 41.95 | 44.25 | 2.30 | `th5.mp4` |
| 10 | **02** Specialist 1:1 calls | GFX | 44.25 | 47.75 | 3.50 | `s12-calls.html` |
| 11 | Founder — "plus, on top of that" | TH | 47.75 | 50.30 | 2.55 | `th6.mp4` |
| 12 | **03** Slack & community | GFX | 50.30 | 55.20 | 4.90 | `s14-community.html` |
| 13 | Founder — "now remember" | TH | 55.20 | 58.90 | 3.70 | `th7.mp4` |
| 14 | Sweet E's — real client work | B-ROLL | 58.90 | 60.10 | 1.20 | `broll-sweetes.mp4` |
| 15 | Dryft Sleep — real client work | B-ROLL | 60.10 | 61.30 | 1.20 | `broll-dryft.mp4` |
| 16 | Pacific IQ lockup | GFX | 61.30 | 64.15 | 2.85 | `s16-realwork.html` |
| 17 | Founder — "so, would you prefer…" | TH | 64.15 | 68.10 | 3.95 | `th8.mp4` |
| 18 | Payoff — 1 opinion vs. a team | GFX | 68.10 | 71.75 | 3.65 | `s18-payoff.html` |
| 19 | CTA hold | GFX | 71.75 | 77.60 | 5.85 | `s19-cta.html` |

Total **77.60s**. CTA holds **4.28s** past the last spoken word.

## Beats

**1 · Founder (0.00–7.00)** — The ad opens on Sean, no cold-open graphic. "Most
e-commerce coaching agencies are just one person…"

**2 · Stale stamp (7.00–9.55)** — A dim coach card on a receding year axis; a flame
**"5–10 YEARS AGO"** stamp slams on at 8.06 (the VO word "five").

**3 · Founder (9.55–13.80)** — "And this is why we've created EcomIQ… it works
differently." The human pivot.

**4 · Logo wall (13.80–20.90)** — *(asset from `claude/aug-general-ad-5-shortform-59z10c`.)*
21 client marks drift up behind a **Shopify Premier Partner** badge that lands centre at
14.78 — the frame the VO says "Shopify" — then a **10+ years in business** chip at 17.64.

**5 · Founder (20.90–24.05)** — "So you're not just getting one person's take,"

**6 · The ten specialists (24.05–30.95)** — *(built to the supplied `Team_Knowledge`
reference.)* Eyebrow **NOT ONE PERSON'S TAKE**, then a 3/4/3 grid of ten real headshot
cards with role labels — Founder · Operations · Strategy / Paid media · Email · Tech ·
SEO / Creative · Design · Analytics. The grid expands from 0.86 while the cards pop
outward from the centre, so "one operator becomes ten specialists" reads without
spending a beat on it. Two breaths carry the hold through "eight and nine figure brands
for their entire career".

**7 · Founder (30.95–33.10)** — "And here is how it works."

**8–12 · The system (33.10–55.20)** — *(built to the supplied `202608281038` graph
reference.)* Three beats share one persistent chrome: a ghosted step numeral, title and
subtitle over a **3-segment meter that lights the current step**, so 01 → 02 → 03 reads
as one system. Founder cuts sit between them.
- **01 Strategy session** / *with your lead coach* — rows land on their own phrases:
  "Map your whole business" (map, 36.32), "Find what's holding growth back" (38.16),
  "And a plan to resolve it" (plan, 40.30).
- **02 Specialist 1:1 calls** / *every single month* — the count lands on "each month",
  two overlapping discs grow beside it, then "Teach the next right move" (45.04) and
  "And hold you to it" with the flame **ACCOUNTABLE** tag (46.56).
- **03 Slack & community** / *founders doing the same thing as you* — a network graph:
  flame hub wired into seven peers, edges drawing themselves in via `stroke-dashoffset`
  so the network assembles rather than appears, then "Common problems, already solved".

**13 · Founder (55.20–58.90)** — "Now, remember, every single strategy we deliver to you"

**14–15 · Real client work (58.90–61.30)** — *(b-roll from
`claude/ecomiq-founder-ad-build-9auz5l`.)* Two full-frame client cuts — **Sweet E's**,
then **Dryft Sleep** — each with a brand chip and the line *real client work*. A bottom
scrim seats the type: the Sweet E's footage is near-white exactly where the caption sits.

**16 · Pacific IQ (61.30–64.15)** — The lockup lands at 61.34 on "the eight and nine
figure brand agency", with that line beneath it. The supplied logo is electric blue on
transparent and vanishes on navy, so it is knocked out to white — the same treatment as
the client marks and the EcomIQ mark.

**17 · Founder (64.15–68.10)** — "So, would you prefer the opinion of just one person"

**18 · Payoff (68.10–71.75)** — The fork. **One opinion.** struck through in flame above
**An entire team.** lit blue, with a *proven track record* tag.

**19 · CTA (71.75–77.60)** — EcomIQ lockup, **"Get an entire team behind your brand."**,
flame-gradient pill **"Learn More →"**. Held 4.28s past the last word.

## Audio
VO only, no music bed. One 0 dBFS high-frequency click at **24.54s** — a ~25ms transient
sitting in a gap between words, ~8 dB above anything else in the track — was gated out
(24.532–24.575) on the encoded VO. Re-deriving from the raw instead shifted everything
~40ms via AAC priming and would have desynced the edit.

## Seam mechanics
Every graphic beat is three layers: a non-animated `class="clip"` `.slot`, an opaque navy
`.plate`, and a `.body` carrying the content.

**Every seam wipes the incoming plate** — up over whatever is on screen in 0.24s
(`power3`), with a blurred light streak on its leading edge, while the `.body` rises from
+150px under a 24px blur that de-ramps over 0.52s. Each founder clip carries 0.30s of
pre-roll and 0.35s of post-roll so there is always live footage beneath the wipe.

Two failure modes this avoids, both caught by pulling frames at the seams:

- *Cross-whipping two bodies* left ~6 frames of bare canvas, because the incoming beat's
  elements had not entered yet. Holding the outgoing beat and wiping over it removes it.
- *A plate landing before its own content starts.* Every beat's first element enters at
  local `0`, so the frame is never empty behind the arriving panel.

The plate is never blurred — `filter: blur()` would make its edges translucent and show
the footage through. Only the inner `.body` blurs. No hard cuts anywhere in the piece.
