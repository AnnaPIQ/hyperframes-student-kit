# EcomIQ × Dryft Sleep — social-proof ad · EDIT PLAN

**Status: built (v2).** Decisions taken: head + tail trim, crop-to-fill, no logo wall,
no star rating, no testimonial quote, **A-roll intercut with b-roll**, **no words in the
graphics**, **bottom of frame left clear for subtitles**.

Format: 9:16 (1080×1920) + 1:1 (1080×1080) · 30fps · H.264/AAC, faststart.
Audio-led, full length — no cutdown.

## Source media

| Role | Source | Notes |
|---|---|---|
| A-roll | Drive `1WyK-Gg6…` "Dryft Sleep - Without spending a dollar more on ads..mov" | 2.5 GB ProRes master, **picture and sound**: Sean to camera, 1920×1080 @25fps, blue-lit studio. Source download is **quota-blocked** by Drive, so both come from the transcoded preview stream (video 1920×1080 ~1.4 Mbps, audio 128 kbps AAC / 44.1 kHz). Master is 24-bit/48 kHz LPCM + ProRes — re-pullable via `scripts/drive-*` once quota resets. |
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

## Cut sheet (delivered timeline; raw audio time − 3.50s)

A = Sean to camera, B = b-roll. Every A-roll segment is the same take trimmed to the same
window as the VO, with `data-media-start` == its own start, so lip sync is exact.
Transitions are 0.20s blur dissolves — fast enough to read as cuts.

| # | in–out | source | graphic |
|---|---|---|---|
| A1 | 0.00–2.30 | **Sean** | clean — he opens the claim |
| B1 | 2.30–6.12 | walking | **G1** growth bars + count-up to **+59%** on the spoken "59%" (2.61) |
| A2 | 6.12–9.20 | **Sean** | clean |
| B2 | 9.20–14.85 | excited | **G2** return-cycle ring draws in; 3 dots land on "again and again" (12.61) |
| A3 | 14.85–16.30 | **Sean** | clean |
| B3 | 16.30–19.35 | product | **G3** comparison bars (1× vs 3×) + count-up to **3×** on "three times" (16.58) |
| A4 | 19.35–23.10 | **Sean** | clean |
| B4 | 23.10–26.30 | suppliers | **G4** flat ad-spend line vs rising profit line, **$0** |
| A5 | 26.30–30.10 | **Sean** | clean |
| B5 | 30.10–33.44 | shelf | clean — breathe into the end card |
| END | 33.44–38.50 | brand canvas | end card, cuts on the spoken "If" (33.44) |

Bars are proportional, not decorative: G1 is 314:500 (=1.59, the +59%) and G3 is 234:702 (=3.0×).

**No words in any graphic** — numerals only (`+59%`, `3×`, `$0`). The **bottom 580px (9:16)
/ 300px (1:1) is left clear** for subtitles to be added later; nothing but footage sits there.

Persistent `ecomiq-logo-white.png` top-left on every frame, ~24% width.

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
5. **A-roll is preview-quality** — 1920×1080 at ~1.4 Mbps and 128 kbps AAC, not the ProRes
   master. It holds up well in the 9:16 crop (verified at full res), but a re-pull of the
   master once Drive's quota resets would sharpen it.
5b. **The end card still carries words** ("See if we can *help* you" / "Find out more") —
   the "no words" direction was applied to the motion graphics; the CTA was specified
   verbatim in the brief. Say the word if you want that stripped back too.
6. **Music bed:** duckable placeholder `<audio>` at low gain, commented, to drop a track into.
7. VO says "three times their first customer revenue"; the case study words it
   "Subscription revenue 3x the storefront" — the graphic uses the case-study wording.

## Delivery

- `renders/ecomiq-social-proof-9x16.mp4` — 1080×1920, from `index.html`
- `renders/ecomiq-social-proof-1x1.mp4` — 1080×1080, from `compositions/square.html`

Both H.264 / AAC, 30fps, `+faststart`.

## Build notes

- One standalone composition per ratio; the square is the same timeline with the graphics
  and the subtitle-safe zone scaled for the shorter frame.
- A-roll 9:16 crops 608px wide from x=618 of the 1920 frame (subject centres on x≈922);
  1:1 crops 1080 wide from x=382. Framing was checked across the whole take.
- The b-roll bed crossfades (blur, 0.42s) under GSAP-driven graphic groups; every graphic
  group spans the full piece so it is always mounted, and GSAP owns visibility.
- Count-ups are GSAP tweens on a proxy object with `snap`, so they are fully seekable
  and deterministic.
- **Logo uses the PNG, not the SVG** — the SVG's luminance mask renders as a garbled
  swirl in the render engine (see `docs/LESSONS.md`).
- Logo is ~24% frame width, not the 8–10% in the brief: the lockup is 1671×286, so at
  10% (108px) the wordmark would be ~18px tall and illegible. Say the word if you'd
  rather swap to `ecomiq-icon-white.svg` at ~9%, which does work at that size.
