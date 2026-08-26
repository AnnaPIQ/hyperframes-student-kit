# EcomIQ × Dryft Sleep — social-proof ad · EDIT PLAN

**Status: FINAL (v13) — high-quality bake off the 4K ProRes master.** Head + tail trim · crop-to-fill · A-roll intercut with b-roll ·
**wordless numerals** (one deliberate full-bleed message card carries copy) ·
**bottom of frame clear for subtitles** · no logo wall ·
no star rating · no testimonial quote · **a graphic only where a real figure is spoken** ·
**no scrim on any segment without a graphic** · motion pass against
`MOTION_PHILOSOPHY.md`.

Format: 9:16 (1080×1920) + 1:1 (1080×1080) · 30fps · H.264/AAC, faststart.
Audio-led, full length — no cutdown.

## Source media

| Role | Source | Notes |
|---|---|---|
| A-roll | Drive `1WyK-Gg6…` "Dryft Sleep - Without spending a dollar more on ads..mov" | **v13 uses the 2.5 GB ProRes master** — Drive's download quota reset and the whole file came through. It is **3840×2160 ProRes 10-bit @25fps + 24-bit/48 kHz LPCM**, not the 1920×1080 the preview implied. Earlier builds fell back to the transcoded preview (1.4 Mbps, 128 kbps AAC). |
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
| A1 | 0.00–1.70 | **Sean** | — |
| STAT | 1.70–6.12 | full-bleed navy | **+59% stat card**, built to the supplied reference |
| A2 | 6.12–9.20 | **Sean** | — |
| B2 | 9.20–12.60 | **hand-off** *(new pull: 21.9s window of the walking source)* | — |
| A3 | 12.60–15.00 | **Sean** | — |
| GRAPH | 15.00–19.90 | full-bleed navy | **3× graph card**, built to the supplied reference |
| A4 | 19.90–23.10 | **Sean** | — |
| B4 | 23.10–26.40 | product *(starts 1.3s in)* | — |
| CARD | 26.40–33.44 | full-bleed navy | message card, revealed line by line |
| END | 33.44–38.50 | brand canvas | end card, cuts on the spoken "If" (33.44) |

**Both stats are full-bleed navy cards, built to the reference clips supplied**
(kept in `assets/reference/`), left-aligned and sharing one type system:

- **+59% stat card** (1.70–6.12) — **Dryft's white wordmark** scales in first at 1.78 (the VO
  has just said "Dryft Sleep", so the mark is the card's opening statement), then the eyebrow
  "RETURNING CUSTOMERS" at 1.95 — "Dryft Sleep," left the eyebrow because the logo now says
  it. Then an oversized
  figure with a flame `+` and a smaller `%`, counting up onto the spoken "59%" (2.61); a flame
  rule drawing beneath it; then "WITHOUT A DOLLAR MORE ON ADS" landing on "without spending a
  dollar more" (3.52).
- **3× graph card** (15.00–19.90) — eyebrow "WHERE THE REVENUE COMES FROM NOW"; a labelled
  baseline bar ("First order revenue"), then the subscription bar extending to exactly 3× it on
  the spoken "three times" (16.58); then the `3x BIGGER THAN FIRST ORDERS` lockup. Bar widths
  are the real ratio, 250 : 750.

Both cards rise in and ride out on the same blur-whip as a cut. The **bottom 580px (9:16) /
300px (1:1) is left clear** for subtitles.

**The message card is the one place words are wanted** (requested with a reference frame),
covering "that's what we do… keep more of what they've already got" and "stop spending money
on ads without needing to": eyebrow → white statement → down-arrow → payoff line in blue tint
→ outlined pill, each beat revealed on the words that state it.

**v10: all text is white.** Every eyebrow, statement, qualifier, end-card line and pill
label is now `--brand-white`; blue tint is left only on the two non-text graphics (the
message card's down-arrow and the graph card's baseline bar).

**End card:** rebuilt to the client's supplied end-card reference — the corner logo steps
aside, the lockup appears centred and oversized (800px), then one wide-tracked uppercase
line ("SEE IF WE CAN HELP YOU") arrives word by word, and the flame "Find out more"
pill lands beneath it over a soft blue bloom. The line is Rethink Sans **800** — matching
every other headline; at 700 it read as a different typeface. `max-width: 560px` forces the
break after "CAN" (measured: 474px vs 656px), so "YOU" is never orphaned.

## Motion pass (against `MOTION_PHILOSOPHY.md`)

The Infinite spot's *palette* doesn't apply here — EcomIQ is navy and flame, not black and
chrome — but its **discipline** does, so:

- **Every transition uses motion.** A↔B cuts are the doc's "cut-the-curve" vertical whip:
  the outgoing frame rides up with blur (`power2.in`, 0.333s), the incoming rises from below
  with matching blur (`power2.out`, 0.667s). Same direction, velocity matched at the cut.
  A 1.12 base scale on every clip is headroom so the ±90px travel never exposes a frame edge.
- **The camera never sleeps.** B-roll pushes 1.12→1.19 across its segment; the talking head
  still drifts 1.12→1.155, so no beat sits perfectly still. The vignette breathes on a
  4s `sine.inOut` yoyo.
- **One unifying texture.** A navy vignette and a deterministic CSS grain (three radial
  tiles, no PNG, headless-safe) sit on **every** frame — A-roll, b-roll and end card — so
  the piece reads as one thing rather than as clips.
- **Type scales, it doesn't fade.** Numerals arrive at 0.34 scale under 30px of blur and
  slam to full on `back.out(2.4)`, with one flame bloom behind the landing frame. That bloom
  is the piece's callback — it returns behind the end-card pill.
- **Cut faster.** The 5.65s b-roll beat was split in two (excited → storefront) so no
  mid-section shot outstays ~3s.
- **Hold the outro.** 5.06s on the end card.
- Tween durations are multiples of 1/30s so the steep eases don't alias at sub-frame
  boundaries.

**Deliberate deviations:** the reference's black canvas, chrome-gradient type and perspective
grid are Infinite's brand, not EcomIQ's — CLAUDE.md says keep the discipline and adapt the
palette, so the texture here is a navy vignette + grain instead. Scene lengths are set by the
voiceover rather than a ~1.5s target: this is an audio-led piece and cutting against the
narration would fight the words.

Persistent `ecomiq-logo-white.png` top-left on every frame up to the end card.

## Verified proof inventory (real values only)

From the VO and the published case study
(`ecomiq.com/blogs/case-studies/how-dryft-sleep-grew-returning-customers-by-59-without-spending-more-on-ads`):

- **+59%** returning customers ("Returning customers up 59%") — *used*
- **3x** subscription revenue vs. the storefront ("Subscription revenue 3x the storefront") — *used*
- **$0** extra ad spend (from the VO) — *now carried by the message card's pill, not a numeral*
- Quote: **removed per direction** (no testimonial card in the build)
- Available, unused (one idea per beat): +158% total sales YOY · +34% AOV YOY · +565% social as acquisition · +881% wholesale growth

## Open flags — nothing invented

1. **Star rating — REMOVED per direction.** None existed in the source material anyway.
2. **Logo wall — REMOVED per direction.** No wall was built and no mark was recreated. **v12
   adds one real third-party mark**: Dryft's own white wordmark on the +59% card. The client
   supplied it, but the image never reached the container, so it was taken from Dryft's own
   site (`dryftsleep.com/cdn/shop/files/dryft-sleep-logo-2023-white.png`) — the official white
   lockup, 753x316, already tight-cropped with real alpha, so no crop or keying was needed and
   nothing was redrawn. (The Erewhon storefront appears incidentally in the footage itself.)
3. **Testimonial quote — REMOVED per direction.**
4. **Crop-to-fill.** **All six** wholesaler clips — `product` included — are phone-vertical
   stored sideways and need `transpose=1`; that makes each natively 2160×3840, an exact 9:16
   fill with **no crop at all**. (`product` was initially mis-read as true landscape and
   shipped rotated in v2 — corrected.) 1:1 crops every clip, with the window biased **down**
   per clip (`walking`/`excited`/`product` y=420, `storefront`/`suppliers`/`shelf` y=620)
   because a plain centre crop decapitated subjects framed low. No letterboxing anywhere.
5. **A-roll — RESOLVED in v13.** The master is now the source. This was the single biggest
   softness in the piece and it was worse than it looked: at 1920 wide the 9:16 window is only
   608px and was being **upscaled 1.78× to 1080**. The master is 3840 wide, so the same window
   is 1216px and **downsamples** instead. Encoded at CRF 16 `-preset slow` (was CRF 19
   `medium`), and the VO now comes off 24-bit/48 kHz LPCM rather than 128 kbps AAC.
   The prepped intermediate is CRF 18 (~11 Mbps), not CRF 16: it only has to stay comfortably
   above the ~8.4 Mbps delivery bitrate, and CRF 16 cost 96 MB — twice the size for headroom
   the final encode never uses.
   **Timeline is unchanged.** The preview transcode carried 0.0363s of extra leading padding,
   so master trims are shifted by that much: 3.4637 → 40.3137. Verified by normalised FFT
   cross-correlation of the new VO against the approved v12 audio: **0.00 ms at all seven
   probe windows** (r = 0.978–0.997), so every cue still lands on the same word. Picture sits
   within ~22 ms of the approved build (sub-frame at 30fps; the 25fps source trim cannot land
   on an exact frame boundary).
5b. **The end card carries words** ("See if we can help you" / "Find out more") — the
   "no words" direction was applied to the motion graphics; the CTA was specified verbatim
   in the brief. The headline is now all white and non-italic, so **Hedvig Letters Serif is
   no longer used anywhere** in the piece.
6. **Music bed:** duckable placeholder `<audio>` at low gain, commented, to drop a track into.
7d. **v9 — b-roll re-cut and end card rebuilt.** The 9.2s beat is a **new pull** from the
   walking source (`1jHsUTe0...`), taking its **21.9s window** rather than the 19s one: an
   Erewhon hand-off with the Dryft pouch face-on and readable, `transpose=1`, natively
   2160x3840. `product` moved from 9.2s to **23.1s**, and `suppliers` was **dropped**. So the
   b-roll in the cut is now `walking-late` + `product`; `walking`, `excited`, `storefront`
   and `shelf` are unused.
   The end card was rebuilt to the client's reference layout (centred oversized lockup ->
   wide-tracked uppercase line -> flame pill). **That fixed a real latent bug:** `#s7` had
   `z-index: 30` but no `position`, so the z-index was inert, the card fell into normal flow
   and the shipped v8 end card was jammed against the top of frame with the logo cropped by
   the frame edge. It is now `position: absolute; inset: 0` with `opacity: 0` authored in CSS.
7c. **v8:** both stats became full-bleed cards to match the reference clips. That retired the
   `walking` b-roll from the old +59%-over-footage slot.
7b. **v6:** the 9s and 19s b-roll are swapped (product now opens the retention beat, the
   aisle shot carries the 3×). Both are trimmed past their own opening handheld move via
   `data-media-start` — the product clip reframes for ~1.3s, the aisle clip tracks left
   until ~2.1s before settling.
7a. **Dropped in v5, and why:** the `storefront` cut at 12s (read as a duplicate of the later
   Erewhon exteriors — the A-roll covers 12.60–16.30 instead); the standalone `$0` numeral
   (replaced by the message card); `shelf` and the fifth A-roll segment (the card owns that
   stretch). The `product` clip now starts 1.3s in, past a handheld reframe.
7. **Dropped in v3, and why:** the return-cycle ring (no figure behind it — a metaphor, not
   a graphic); the comparison bars under +59% and 3× (unlabelled bars can't say what they
   compare, and labels aren't allowed); the flat/rising line chart under $0 (its curves were
   invented shapes with no data behind them — fabricated data-viz).

## Delivery

- `renders/ecomiq-social-proof-9x16.mp4` — 1080×1920, from `index.html` — **38.7 MB, 8.4 Mbps**
- `renders/ecomiq-social-proof-1x1.mp4` — 1080×1080, from `compositions/square.html` — **21.6 MB, 4.7 Mbps**
- `renders/ecomiq-social-proof-9x16-compressed.mp4` — CRF 26 copy for chat/email (5.9 MB)

Both masters are `--quality high` (CRF 15), H.264 High profile / AAC-LC 48 kHz stereo,
1080p, 30fps, `yuv420p`, `+faststart` — verified with ffprobe. Delivery dimensions stay
1080×1920 and 1080×1080: that is the Meta/IG spec, and the gain in v13 is real detail from
the 4K source rather than a bigger frame.

## Build notes

- One standalone composition per ratio. `compositions/square.html` is **generated** from
  `index.html` by `scripts/make-square.py` — same cut sheet and timeline, with the frame
  height, b-roll variant folder, subtitle-safe zone and type scale swapped. Every rule is
  asserted present, so a change to the 9:16 master cannot silently miss the square. Run it
  after any edit to `index.html`.
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
