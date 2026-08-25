# ecomiq-sean-vo-ad — Design Spec

Short-form EcomIQ ad. **Sean's recorded voice is the spine; the Showcase Reel is the
picture.** He rides along in a circular a-roll PiP top right while the montage plays full
frame, then the brand end card cross-dissolves in on the words *"want to see if we can
help you."*

Two deliverables from one project: **9:16** (`index.html`) and **1:1**
(`compositions/square.html`). Same timeline, same card, natively-framed montage per ratio.

The cut itself — every timestamp, the transcript, why each shot sits where it does — is in
**`EDIT-PLAN.md`**. This file covers the look.

## Format
- **9:16** — 1080×1920 @ 30 fps · `index.html` · comp id `ecomiq-sean-vo-ad`
- **1:1** — 1080×1080 @ 30 fps · `compositions/square.html` · comp id `ecomiq-sean-vo-ad-square`
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

The italic-serif emphasis word ("*more*") is the EcomIQ headline signature, set inside the
pill so the CTA carries the brand voice without a second line competing with it.

### End card copy
```
        [ EcomIQ logo ]
         ▔▔▔▔ (flame rule)
     ( Find out more → )
```
One line, one action. The pill is the only copy on the card.

## A-roll PiP
Sean's head, circle-masked, top right, riding over the montage from t = 0.35 until the end
card covers it.

| | 9:16 | 1:1 |
|---|---|---|
| Diameter | 360 px | 300 px |
| Offset | top 150, right 58 | top 58, right 58 |
| Ring | 6 px `--brand-blue-tint` | 5 px `--brand-blue-tint` |

Cut from the **same in-point as the VO (3.100)**, so his lips track his own voice with no
offset to tune. Source is 25 fps, conformed to 30 to match the composition. The crop
(1300×1300 @ 1055, 43 on the 4K master) is tight enough to read at corner size and holds
him inside the inscribed circle for the whole take.

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
| `assets/bed-916.mp4` | 1080×1920 picture bed, 34.07 s, muted |
| `assets/bed-square.mp4` | 1080×1080 picture bed, 34.07 s, muted |
| `assets/sean-vo.wav` | Sean's VO, 48 kHz stereo, source 3.100 → 39.300 |
| `assets/sean-pip.mp4` | A-roll PiP, 720×720, 34.10 s, muted, source 3.100 |
| `assets/music-bed.wav` | **silent placeholder** — see below |

The beds are pre-cut with ffmpeg rather than assembled as 45 `<video>` clips in HTML: one
video element per ratio keeps the composition readable and the render fast, and puts the
frame-accurate cutting in a script that can be re-run.

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
H.264 / yuv420p, AAC 48 kHz, `+faststart`, 30 fps CFR — `--quality standard` is visually
lossless at 1080p.

```bash
npx hyperframes render --quality standard --output renders/ecomiq-sean-vo-916.mp4
npx hyperframes render --composition compositions/square.html \
  --quality standard --output renders/ecomiq-sean-vo-square.mp4
```

No captions, by request.
