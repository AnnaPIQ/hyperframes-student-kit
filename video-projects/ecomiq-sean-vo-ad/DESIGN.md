# ecomiq-sean-vo-ad — Design Spec

Short-form EcomIQ ad. **Sean's recorded voice is the spine; the Showcase Reel is the
picture.** He rides along in a circular a-roll PiP top right while the montage plays full
frame, then the brand end card cross-dissolves in on the words *"want to see if we can
help you."*

Three ratios from one project: **9:16** (`index.html`), **1:1**
(`compositions/square.html`) and **4:5** (`compositions/meta45.html`). Same timeline, same
card; 9:16 and 1:1 use natively-framed montage masters, 4:5 is cropped (see below).

The cut itself — every timestamp, the transcript, why each shot sits where it does — is in
**`EDIT-PLAN.md`**. This file covers the look.

## Format
- **9:16** — 1080×1920 @ 30 fps · `index.html` · comp id `ecomiq-sean-vo-ad`
- **1:1** — 1080×1080 @ 30 fps · `compositions/square.html` · comp id `ecomiq-sean-vo-ad-square`
- **4:5** — 1080×1350 @ 30 fps · `compositions/meta45.html` · comp id `ecomiq-sean-vo-ad-45`
- **Duration** — 37.60 s. VO runs 0 → 36.04; end card 33.70 → 37.60.

## Brand
Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`; local `.woff2` in `assets/fonts/`.

Nothing here invents a colour or a font — the end card is built entirely from tokens:

| Element | Token |
|---|---|
| Card ground | `--brand-navy` + the house radial bloom |
| Bottom lift | `--brand-gradient-2`, blurred 130px @ 0.17 opacity |
| Logo | `assets/ecomiq-logo-white.svg` (white lockup, for dark grounds) |
| Rule + CTA pill | `--brand-flame` |
| CTA label | `--brand-white`, Rethink Sans 700, −2% tracking |
| PiP ring | `--brand-blue-tint`, 5–6px |
| Brand bug | `assets/ecomiq-logo-white.png`, top left |

The Hedvig italic is deliberately absent from the card — the CTA reads as one uniform
label. The serif stays in the brand kit for headline work elsewhere.

### End card copy
```
        [ EcomIQ logo ]
         ▔▔▔▔ (flame rule)
     ( Find out more → )
```
One line, one action. The pill is the only copy on the card, set in a single face and
weight — Rethink Sans 700, no italics, no mixed type.

## Brand bug
A small white EcomIQ lockup sits top left over the montage, fading in at t = 0.25 just
ahead of the PiP and running until the end card covers it.

| | 9:16 | 1:1 | 4:5 |
|---|---|---|---|
| Width | 240 px | 200 px | 220 px |
| Offset | top 150, left 58 | top 58, left 58 | top 92, left 58 |

Top offsets match the PiP's, so the bug and Sean's circle sit on the same line and read as
a deliberate pair rather than two separate overlays. Wrapped in a positioned, non-`clip`
div and carrying a drop shadow so it stays legible over the reel's bright shots (the
bakery and street exteriors are near-white).

It points at the **PNG** lockup, not the SVG: two `<img>` elements sharing one source with
the same implicit timing trips the linter's `duplicate_media_discovery_risk`, since the
card carries the full-size lockup too. At 1671 px scaled to 240 there is no quality cost.

## A-roll PiP
Sean's head, circle-masked, top right, riding over the montage from t = 0.35 until the end
card covers it.

| | 9:16 | 1:1 | 4:5 |
|---|---|---|---|
| Diameter | 360 px | 300 px | 330 px |
| Offset | top 150, right 58 | top 58, right 58 | top 92, right 58 |
| Ring | 6 px | 5 px | 6 px |

All in `--brand-blue-tint`. Bug and PiP share a top offset in every ratio.

Cut from the **same in-point as the VO (3.100)**, so his lips track his own voice with no
offset to tune. Source is 25 fps, conformed to 30 to match the composition.

The crop is **1550×1550 @ (1090, 36)** on the 4K master, centred on his **face**, not the
head's bounding box — his long hair pulls that box right, so centring on it leaves him
visibly off-centre once the circle mask is on. The origin comes from a skin-tone centroid
measured over 68 frames spanning the whole take (median face centre 1865, 734; drift sd
43 px), not from eyeballing hero frames. Judge this through the mask, never the square. The width also matters: a tighter crop lands entirely on the brightest patch of his
blue set wall and reads as a flat disc, where 1550 keeps enough of the room for the blue to
fall off naturally.

The blue is the original set lighting in his recording, not a grade applied here.

The `<video>` sits inside a positioned `#pip-wrap` that owns the circle mask, ring and
shadow — GSAP only ever animates the wrapper, never the video (render contract #9).

## Motion
Snappy, per the brief. Hard cuts throughout the montage — **one** dissolve in the whole
piece, 0.35 s, landing on the word "want" (t = 33.70).

The PiP pops in at t = 0.35 (`back.out(1.6)`) once the first montage shot has landed.

On the card, a short stagger inside the first second: card dissolve → logo rises → flame
rule wipes from centre → pill pops (`back.out(1.7)`). The pill then breathes and the arrow
nudges sideways so the 3.9 s hold doesn't go static.

Everything uses `gsap.fromTo` — these elements start hidden, and `gsap.from()` on a hidden
element resolves to invisible (`docs/LESSONS.md`). The logo lives in a positioned,
non-`clip` wrapper so the render engine can't reposition it.

## Assets

Built by **`scripts/build-assets.sh`** from the raw Drive masters in
`../../assets/incoming/` (gitignored). Re-runnable and deterministic.

| File | What |
|---|---|
| `assets/bed-916.mp4` | 1080×1920 picture bed, 34.03 s, muted |
| `assets/bed-square.mp4` | 1440×1440 picture bed, 34.03 s, muted |
| `assets/bed-45.mp4` | 1080×1350 picture bed, 34.03 s, muted |
| `assets/sean-vo.wav` | Sean's VO, 48 kHz stereo, source 3.100 → 39.300 |
| `assets/sean-pip.mp4` | A-roll PiP, 720×720, 34.10 s, muted, source 3.100 |
| `assets/music-bed.wav` | **silent placeholder** — see below |

Each bed is the reel played **once**, slowed to 0.813× with motion interpolation so it
covers the voiceover without any shot repeating. Pre-cut with ffmpeg rather than assembled
as `<video>` clips in HTML: one video element per ratio keeps the composition readable and
the render fast, and puts the retime in a script that can be re-run. See `EDIT-PLAN.md`.

The bed rebuild takes ~10 min per ratio — motion interpolation is the cost of a
judder-free slowdown.

To rebuild after changing a timestamp:
```bash
bash scripts/build-assets.sh    # needs the Drive masters in ../../assets/incoming/
```

### Music bed
`assets/music-bed.wav` is silent and wired at `data-volume="0"`. Drop a real bed in at the
same path/name and set:
- `data-volume="0.13"` (≈ −18 dB) to sit under Sean's speech
- lift to `data-volume="0.35"` (≈ −9 dB) from t = 33.70, once the card is up and he's
  finished talking

## Delivery
H.264 High / yuv420p, AAC 48 kHz stereo, `+faststart`, 30 fps CFR.
Finals ship at `--quality high` (CRF 15), each ratio at native size and at 2×.

| File | Size | Notes |
|---|---|---|
| `ecomiq-sean-vo-916-1080.mp4` | 1080×1920 | native — the 9:16 master's true ceiling |
| `ecomiq-sean-vo-916-2160.mp4` | 2160×3840 | 2× — graphics and PiP gain, footage is upscaled |
| `ecomiq-sean-vo-square-1080.mp4` | 1080×1080 | native |
| `ecomiq-sean-vo-square-2160.mp4` | 2160×2160 | 2× — real detail, bed is built at 1440 |
| `ecomiq-sean-vo-45-1080.mp4` | 1080×1350 | Meta feed · `--quality standard` |

```bash
npx hyperframes render --quality high --output renders/ecomiq-sean-vo-916-1080.mp4
npx hyperframes render --quality high --resolution portrait-4k \
  --output renders/ecomiq-sean-vo-916-2160.mp4
npx hyperframes render --composition compositions/square.html --quality high \
  --output renders/ecomiq-sean-vo-square-1080.mp4
npx hyperframes render --composition compositions/square.html --quality high \
  --resolution square-4k --output renders/ecomiq-sean-vo-square-2160.mp4
```

### 4:5 has no native master
The 9:16 and 1:1 montages were both supplied natively framed. 4:5 was not, so its bed is
**centre-cropped out of the 9:16 master at y = 240** (1080×1350 from 1080×1920) — no
scaling, 1:1 pixels.

The 1:1 master was the other candidate (a 20% side crop rather than a 30% height crop) and
it reads the on-stage stat graphic better, but it slices a person in half at the frame edge
in the bakery two-shot. The height crop costs ceiling and floor instead, which no shot in
this reel depends on. y = 240 rather than a dead-centre 285 keeps the *1.3+ Billion* line
in frame without cutting feet on the full-body shots.

A natively recomposed 4:5 master would beat either crop — drop it in
`assets/incoming/` and point the bed at it, the cut list is the same.

### What 2× actually buys
`--resolution` re-renders the page at a higher device pixel ratio; it does not invent
detail in the footage.

- **Genuinely sharper at 2×:** everything drawn in the composition — end card, logo
  lockup, flame pill, brand bug — plus Sean's PiP, which is cut from the 4K camera file
  and only displayed at 348 CSS px.
- **9:16 footage:** the Showcase Reel master is natively 1080×1920, so a 2160 export
  upscales it. Ship the 1080 file unless a placement specifically wants the larger asset.
- **1:1 footage:** the square master is 1440×1440, so its bed is built at 1440 and the 2×
  export carries real extra detail.

No captions, by request.
