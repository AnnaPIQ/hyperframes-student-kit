# EcomIQ × Dryft Sleep — social-proof ad · EDIT PLAN

**Status: APPROVED and built.** Decisions taken: head + tail trim, crop-to-fill, no logo
wall, no star rating, no testimonial quote.

Format: 9:16 (1080×1920) + 1:1 (1080×1080) · 30fps · H.264/AAC, faststart.
Audio-led, full length — no cutdown.

## Source media

| Role | Source | Notes |
|---|---|---|
| VO (A-roll) | Drive `1WyK-Gg6…` "Dryft Sleep - Without spending a dollar more on ads..mov" | 2.5 GB ProRes master. Source download is **quota-blocked** by Drive; full 43.0s audio recovered via the transcoded preview stream (128 kbps AAC / 44.1 kHz). Master audio is 24-bit/48 kHz LPCM (~12.35 MB of the 2.5 GB) — recoverable via `scripts/drive-*` once quota resets. |
| B-roll | Drive folder `1XUyu60iAn7bPSd6JHlT_IBtBpyn_FDMt` | 4K 3840×2160 @ 23.976. Six wholesaler clips are phone-vertical stored **sideways** (no rotation metadata) → `transpose=1` makes them upright **and** native 2160×3840. `product` is true landscape 16:9. |

Audio: 43.003s total. Speech 3.67 → 40.22s. Throat clear 0.11–0.75 then dead air to 3.67.

## Transcript (raw audio timestamps)

| Time | Line |
|---|---|
| 0.11–0.75 | *(throat clear)*, dead air to 3.67 |
| 3.62–9.62 | "Dryft Sleep grew their returning customers by **59%** without spending a dollar more on ads." |
| 9.62–22.86 | "Now, everyone obsesses over finding new customers, but Dryft got the ones they already had to keep coming back again and again, to the point where their subscription revenue is now **three times** their first customer revenue." |
| 22.86–29.70 | "And that's the same brand, the same ad budget, but far more profit from every customer that had already won." |
| 29.70–36.94 | "That's what we do — help brands keep more of what they've already got, stop spending money on ads without needing to." |
| 36.94–40.22 | "If you wanna see how we can help you, tap the link below to find out more." |

Word-level timings: `assets/vo/dryft-social-proof-vo.words.json`.

**Trim (approved).** RMS analysis put the record-button press + throat clear at 0.10–0.85s,
handling noise to ~3.6s, speech onset at 3.62s; at the tail the last word decays by 40.10s
and the rest is room tone (no loud stop click). **Kept 3.50 → 40.35 = 36.90s of audio**, then
loudness-normalised (source averaged -38.4 dB, too quiet to ship). The end card holds ~1.6s
past the VO on silence so the outro breathes to ~5s. **Total runtime 38.5s.**
All cues below shift 3.50s earlier on the delivered timeline.

## Beat sheet (raw audio timestamps)

| # | Time | Graphic — lands on the word | B-roll |
|---|---|---|---|
| 1 | 3.6–9.6 | "DRYFT SLEEP" wipe-in · **count-up 0→59%** fires on "59%" **@6.11** · label `RETURNING CUSTOMERS` · flame chip **"$0 EXTRA AD SPEND"** @7.6 | walking |
| 2 | 9.6–12.7 | `NEW CUSTOMERS` dim + struck through @11.3 | shelf / storefront |
| 3 | 12.7–17.0 | Kinetic staggered type **"THE ONES THEY ALREADY HAD"** @12.9 · 3-beat repeat pulse on "again and again" @16.11 | excited |
| 4 | 17.0–22.9 | **Count-up 0→3×** on "three times" **@20.08** · label `SUBSCRIPTION REVENUE — 3x THE STOREFRONT` | product |
| 5 | 22.9–29.7 | Chips `SAME BRAND` @23.4 + `SAME AD BUDGET` @24.6 → flame **"FAR MORE PROFIT"** @25.6 | suppliers |
| 6 | 29.7–36.9 | *(quote removed per direction)* Kinetic value prop instead: "WHAT WE DO" → staggered "Keep more of / what you've / already got" @30.98, then ghost chip "WITHOUT MORE AD SPEND" @33.74 | shelf |
| 7 | **36.94**→40.35 (+1.6s silent hold) | **END CARD** cuts on "If": navy canvas, headline **"See if we can *help* you"** (Hedvig italic emphasis word), flame pill **"Find out more"** pops @39.19. Logo stays top-left. Audio continues, then holds to the last frame. | brand canvas |

Persistent: `ecomiq-logo-white.png` top-left on every frame (incl. the end card), ~24% width, subtle shadow. **No captions.**

## Verified proof inventory (real values only)

From the VO and the published case study
(`ecomiq.com/blogs/case-studies/how-dryft-sleep-grew-returning-customers-by-59-without-spending-more-on-ads`):

- **+59%** returning customers ("Returning customers up 59%") — *used*
- **3x** subscription revenue vs. the storefront ("Subscription revenue 3x the storefront") — *used*
- **$0** extra ad spend (from the VO) — *used*
- Quote: **removed per direction** (no testimonial card in the build)
- Available, unused (one idea per beat): +158% total sales YOY · +34% AOV YOY · +565% social as acquisition · +881% wholesale growth

## Open flags — nothing invented

1. **Star rating — REMOVED per direction.** None existed in the source material anyway.
2. **Logo wall — REMOVED per direction.** No third-party logo assets existed and none were
   recreated. (The Erewhon storefront appears incidentally in the footage itself.)
3. **Testimonial quote — REMOVED per direction.**
4. **Crop-to-fill (approved).** 9:16: the five transposed wholesaler clips are natively
   2160×3840, so they only scale — **no crop at all**; only `product` (true 16:9) is cropped,
   keeping the middle ~32% of frame width (the pouches stay centred — verified). 1:1: every
   clip is cropped, with the crop window biased **down** per clip (`walking`/`excited` y=420,
   `storefront`/`suppliers`/`shelf` y=620) because a plain centre crop decapitated subjects
   framed low in the vertical originals. No letterboxing anywhere.
5. **Audio is preview-quality** (128 kbps AAC / 44.1 kHz), not the ProRes master's
   24-bit/48 kHz LPCM — Drive quota. Fine for social; re-pullable for the final bake.
6. **Music bed:** duckable placeholder `<audio>` at low gain, commented, to drop a track into.
7. VO says "three times their first customer revenue"; the case study words it
   "Subscription revenue 3x the storefront" — the graphic uses the case-study wording.

## Delivery

- `renders/ecomiq-social-proof-9x16.mp4` — 1080×1920, from `index.html`
- `renders/ecomiq-social-proof-1x1.mp4` — 1080×1080, from `compositions/square.html`

Both H.264 / AAC, 30fps, `+faststart`.

## Build notes

- One standalone composition per ratio; the square is the same timeline with a layout
  scaled for the shorter frame (stat 300→210px, headline 106→82px, tighter padding).
- The b-roll bed crossfades (blur, 0.42s) under GSAP-driven graphic groups; every graphic
  group spans the full piece so it is always mounted, and GSAP owns visibility.
- Count-ups are GSAP tweens on a proxy object with `snap`, so they are fully seekable
  and deterministic.
- **Logo uses the PNG, not the SVG** — the SVG's luminance mask renders as a garbled
  swirl in the render engine (see `docs/LESSONS.md`).
- Logo is ~24% frame width, not the 8–10% in the brief: the lockup is 1671×286, so at
  10% (108px) the wordmark would be ~18px tall and illegible. Say the word if you'd
  rather swap to `ecomiq-icon-white.svg` at ~9%, which does work at that size.
