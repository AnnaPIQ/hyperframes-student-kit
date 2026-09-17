# EcomIQ × Sweet E's Bake Shop — montage social-proof ad · DESIGN

Audio-led social-proof ad. **The montage is the spine**: it runs unbroken from
the first frame to the end card, and Sean's voiceover sits over the top of it.
Proof points land in navy bands on the footage, never as full-frame takeovers,
so the picture is never taken away from the montage. Ends on the EcomIQ CTA
card.

**Deliverables:** `renders/sweet-es-montage-9x16.mp4` (1080×1920) ·
`renders/sweet-es-montage-4x5.mp4` (1080×1350) ·
`renders/sweet-es-montage-4x5-crop.mp4` (1080×1350, full-bleed alternative).
All 30fps H.264/AAC `+faststart`.

**Runtime:** 46.20s — 41.90s of voiceover plus a 4.64s end-card hold.

---

## 1 · Palette & type — tokens only

Everything comes from `assets/brand-tokens.css`. No hardcoded hexes in the
composition, no invented colours.

| Role | Token | Value |
|---|---|---|
| Canvas, band fill, end card | `--brand-navy` | `#06284C` |
| Eyebrows, band hairline border, bar fills | `--brand-blue-tint` | `#9CD4FF` |
| The one hot accent (band flame tab, figure hairline, CTA pill) | `--brand-flame` | `#FF4C32` |
| All display text | `--brand-white` | `#FFFFFF` |

Four active hues, each with one job. Blue tint is for non-text accents and the
eyebrow line only; flame is the only hot accent and appears in exactly three
places (the tab on each band, the hairline under a figure, the CTA pill).

**Type:** Rethink Sans, local `.woff2` from `assets/fonts/` — no CDN, no
render-time fetch. Named literally in CSS (`font-family: 'Rethink Sans'`)
because the linter does not resolve `var()`. Every piece of display type is
weight 800; big type keeps −2% tracking and ~0.95 leading.

**Hedvig Letters Serif appears exactly once**, italic, on the word *corner* in
the end card headline. That is the EcomIQ signature (italic-serif emphasis word
over bold sans) and the brand rule is one emphasis word, never two.

## 2 · The frame — constant on every scene

- **EcomIQ white lockup, top-left**, from the first frame until the end card's
  own lockup takes over at 38.10. Wrapped in a positioned non-`clip` `<div>` so
  the render engine cannot reposition it.
- **Vignette** — gentle radial, transparent centre → navy-black edge. Kept light
  on purpose: a heavy navy vignette turns bright bakery footage muddy blue-grey.
- **CSS grain** — three radial-gradient tiles at 3/5/7px, alphas .03/.02/.015.
  Deterministic, no PNG, no `repeat: -1`.
- **Bottom 30% stays clear of graphics** (y > 1344 in 9:16, y > 945 in 4:5) —
  subtitles are added on the platform. No burned-in captions anywhere.

## 3 · Bands — the hard rules

A band is a navy panel inset on the footage (`left/right: var(--band-pad)`,
anchored to a fixed baseline with `bottom: var(--band-bottom)`), so it grows
*upward* as its content needs and can never push into the subtitle zone. The
top half of the frame is always clean picture.

Band anatomy, top to bottom:

1. **Flame tab** — 120×6px, flush to the band's top-left corner.
2. **Eyebrow** — wide-tracked (.20em) uppercase, blue tint.
3. **Figure** (where there is one) — weight 800, white, with a flame hairline
   beneath. Or a **statement** line where the beat has no number.
4. **Label** — uppercase, white, says what the figure measures.

Hidden states are authored as `opacity: 0` **in CSS**, never via `tl.set(…, 0)`
— a `set` at time 0 does not render on frame 0. Every entrance uses
`gsap.fromTo`.

**No unlabelled charts.** The only chart in the piece is the pair of bars on the
3× band, drawn at a true 1:3 ratio with both bars labelled and multiplied.

**Nothing on screen that is not spoken.** Every figure and every client name in
the piece is said aloud in the voiceover. No case-study statistics were
imported — see §7.

## 4 · Motion

- Bands **push in and push out**: 0.40s in from +14% Y at scale 0.97 under 8px
  of blur resolving to 0; 0.30s out to −8% Y. No flash, no bright element, no
  fade-only entrance. The energy is movement.
- The end card is the one **cross-dissolve** in the piece: 0.50s `sine.inOut`,
  with the montage still playing underneath for the whole of it rather than
  cutting to a hard edge.
- The montage gets **no added camera drift**. It is 21 handheld shots with their
  own movement; a global zoom across all of them would read as each successive
  shot being punched in further than the last.
- Figures **land whole, on the spoken word** — never counted up from 0. A 0→N
  tween puts numbers on screen that are not the real number. The one text change
  in the piece (`10,000` → `20,000`) is driven by an `onUpdate` that is a pure
  function of band-local time, so every seek is correct and the render stays
  deterministic. `tl.call()` never fires under render and is used nowhere.
- Never animate `letterSpacing` (lint rejects it) — tracking is static in CSS.
- Never animate `width/height/top/left` on a `<video>` — it is wrapped in a
  `<div>` and the wrapper is what GSAP touches.
- Breathing holds use bounded `repeat`, never `repeat: -1`.

## 4.1 · Two render-contract notes

- **The root carries no `data-start`.** CLAUDE.md's render contract asks for
  `data-start="0"` on the root, but with an inline `<video data-start=…>` present
  that combination trips `video_nested_in_timed_element` and Studio preview dies
  at 0:00 — the workspace's own `scripts/preflight.mjs` documents the tradeoff
  and treats omitting it as the correct choice. `npx hyperframes lint` is clean
  either way; omitting it is the only combination that passes both gates, and
  the render is unaffected.
- **The montage `<video>` is `muted` with no `data-has-audio`.** Its master
  track is digital silence, so feeding it to the mixer would only add noise.

## 5 · Ratios

`index.html` is the 9:16 master. `scripts/make-ratios.py` reads it and emits a
standalone `build/4x5/` project, rewriting exactly four things: the viewport
meta + stage dimensions, the root `data-width`/`data-height`, the `:root`
ratio-metrics block (type scale, safe area, logo, bar widths) and the montage
asset the `<video>` points at. Nothing else is touched, so the two ratios cannot
drift apart in timing.

**The 4:5 needs a decision, and both options are rendered.** The montage master
is 1080×1920 and there is no wider master, so a 1080×1350 frame cannot be filled
without losing picture:

| Deliverable | Treatment | Trade-off |
|---|---|---|
| `sweet-es-montage-4x5.mp4` | **scale + pad** — montage scaled to 759×1350, centred, 160px of brand navy each side | keeps 100% of the frame; reads as a deliberate matte against the composition's own navy, but the picture only occupies 70% of the width |
| `sweet-es-montage-4x5-crop.mp4` | **centre crop** `crop=1080:1350:0:285` | full-bleed and native 1080 wide with no upscale, but loses 285px off the top and bottom of every shot |

The brief asked for scale+pad and for anything needing a crop to be flagged:
**this is that flag.** The crop version is the one that behaves like a normal
Meta 4:5 creative in-feed; the padded version is the one that loses no picture.

## 6 · Sources & the retime

| Asset | Master | Notes |
|---|---|---|
| Montage | `Sweet E - 30sec montage no audio.mp4` | 1080×1920, 30fps, 29.967s, 21 shots (avg 1.43s). Audio track is digital silence (−91 dB) and is dropped. |
| Voiceover | `Copy of Sweet E's customized in Bulk.mov` | 3840×2160 ProRes, 25fps, 47.200s. Only its audio is used. |

Both pulled by `scripts/pull-media.sh`; both prepped by `scripts/prep-assets.sh`.

**The voiceover trim.** Measured on the master: speech occupies 2.88–43.60s,
with digital silence at 0–2.40 (−70 dB) and 44.30–47.20 (−74 dB). The cut keeps
**2.40–44.30 = 41.90s** — the complete read with ~0.45s of air at each end and
no dead space. Nothing is cut out of the middle. Levels are normalised to
−16 LUFS / −1.5 dBTP with a 70Hz high-pass.

**The montage retime.** The montage is 29.967s but has to carry the voiceover to
the end card at 38.10 plus the 0.50s the card dissolves up over it, so it is
retimed to **38.60s** (`setpts=1.288107*PTS`, 0.776× speed). Average shot length
goes 1.43s → 1.84s, which is still inside the ≤2s bar and gives each shot room
to read.

The retime uses **motion-compensated interpolation** (`minterpolate
mi_mode=mci:mc_mode=aobmc:vsbmc=1`) rather than frame duplication: at 0.776× a
plain `setpts` leaves a 5:4 frame cadence, which judders visibly on the handheld
shots.

## 7 · Decisions and discrepancies

1. **The recorded take does not match the pasted script.** The audio says
   *"…on 10,000, 20,000 cookies, absolutely no problem"*, *"over four years"*,
   and *"They have been so successful, they recently had to move into a bigger
   facility that was three times the size just to keep up with demand"*. The
   pasted script has a tighter read (*"ten thousand cookies. No problem."*,
   *"four years"*, *"because demand like that needs room"*). **Everything is
   timed to the audio, since the ad is audio-led** and that audio is what ships.
   Word onsets were measured from the shipped `assets/vo.m4a` itself
   (whisper `small.en`, word level), not from the script.
2. **Only spoken facts are on screen.** EcomIQ's Sweet E's case study carries
   four-year results (sessions, total sales, average order value) that an
   earlier build of this ad used. They are not in this cut, because nothing in
   this voiceover says them aloud and they could not be re-verified here. Say
   the word and a results band drops into the 29.20–32.00 window, which is
   currently clean footage.
3. **Client names are set as type, not logos.** Nordstrom, Tory Burch, Beyond
   Yoga and The Lakers are all spoken aloud. No third-party logo is redrawn,
   recoloured or reproduced anywhere in the piece.
4. **The montage carries no audio of its own** — its track is digital silence,
   so the mix is the voiceover alone. If a music bed is wanted under it, that is
   a one-line addition.
