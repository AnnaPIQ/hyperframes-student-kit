# EcomIQ CRO short — edit plan

Sean's VO is the spine; the Showcase Reel montage is the visuals underneath it.
Sean is never on screen as a talking head — it is montage throughout with his
voice over the top, cutting to an EcomIQ end card on the closing line.

Two exports, same edit, two frames:

| Export | Project | Size | Deliverable |
|---|---|---|---|
| 9:16 vertical | `ecomiq-cro-short` | 1080×1920 | `renders/ecomiq-cro-916.mp4` · `final.mp4` |
| 4:5 feed | `ecomiq-cro-short-45` | 1080×1350 | `renders/ecomiq-cro-45.mp4` · `final.mp4` |

Total runtime **22.90s**. H.264 High / AAC LC, faststart.

---

## Sources

| Role | File | Probe |
|---|---|---|
| VO (master) | `Showcase`→ `CRO2.aifc` | AIFF-C, pcm_s24be, mono, 48 kHz, **22.23s** |
| Montage 9:16 | `Showcase Reel.mp4` | H.264 1080×1920, 30fps, 29.70s |
| Montage 1:1 | `Showcase ad-1-1.mp4` | H.264 1440×1440, 30fps, 29.70s |

Both montage masters are the **same edit** — identical 891 frames and identical
shot boundaries — reframed. That is why one shot map drives both exports.

The montage's own audio is discarded. The VO is loudness-normalised to
**-16 LUFS / -1.5 dBTP** (social delivery standard) and carried as
`assets/sean-vo.wav`.

### The transcript on the tape

The VO differs from the script that came with the brief. What Sean actually says:

> Want more of your Shopify traffic to actually buy? You're paying for every
> visitor, too few of them actually convert, and we guarantee we can change
> that. Give us 90 days, you'll work with an EcomIQ strategist who'll turn more
> of those visitors into sales, more sales from the traffic you've already got.
> Tap the link and see if you qualify.

The line "want to see if we can help you" is **not** in this recording. The
closest is "Tap the link and see if you qualify" at **19.77s**.

---

## The end-card trigger

| Line | In | Out |
|---|---|---|
| **"more sales from the traffic you've already got."** | **16.87s** | 19.66s |
| "Tap the link and see if you qualify." | 19.77s | 22.48s |

The card cuts in at **16.87s**, landing on the word *more*, and holds **6.03s**
to 22.90s with the VO playing out over it.

---

## Shot map

Every in-point sits on a real shot boundary in the source, so no cut lands
mid-motion. Source timings are identical in both masters.

| # | VO line | On screen | Montage source | Why |
|---|---|---|---|---|
| A | "Want more of your Shopify traffic to actually buy?" | 0.00–3.70 | 15.60–19.30 | storefront / product page UI — literal on "Shopify traffic" |
| B | "You're paying for every visitor," | 3.70–6.20 | 2.90–5.40 | stage + expo floor: spend in motion |
| C | "too few of them actually convert," | 6.20–7.93 | 13.87–15.60 | store aisle, product in hand, browsing not buying |
| D | "and we guarantee we can change that." | 7.93–10.55 | 6.35–9.07 | **Shopify Premier Partner** card lands on the word *guarantee* |
| E | "Give us 90 days, … an EcomIQ strategist" | 10.55–13.88 | 9.07–12.40 | Sean + team, the human strategist |
| F | "who'll turn more of those visitors into sales," | 13.88–16.87 | 23.63–26.62 | customer buying + TikTok Shop: conversion |
| G | **END CARD** | 16.87–22.90 | — | EcomIQ logo + "Link Below", VO continues over it |

Source past **27.73s** is the montage's own baked-in EcomIQ end card. Never
pulled from — ours is built in the composition.

### Transitions

Snappy. **Hard cuts** at A→B, C→D and E→F. **0.10s dissolves** at B→C and D→E
so the edit breathes twice without going soft. A 0.19s sky-blue flash carries
the cut into the end card so the card arrives on the beat.

---

## Motion graphics

Brand tokens only — flame `#FF4C32`, blue tint `#9CD4FF`, Rethink Sans, with the
one Hedvig Letters Serif italic reserved for *days*. **No captions.**

| Mark | Time | Beat |
|---|---|---|
| EcomIQ white lockup, top-left | 0.00–16.87 | persistent, off as the end card takes over |
| Conversion-gap bars (VISITORS / BUYERS) | 6.30–7.93 | "too few of them actually convert" |
| GUARANTEED flame pill | 9.25–10.55 | "we guarantee we can change that" |
| **90** counter + *days* | 10.82–13.60 | "Give us 90 days" |
| VISITORS → SALES | 14.90–16.80 | "turn more of those visitors into sales" |
| End card: logo + "Link Below" | 16.87–22.90 | the close |

The bars are deliberately unlabelled by percentage — the script makes no
numeric claim, so neither does the graphic.

---

## Framing decisions

- **9:16** uses the vertical master **as-is**. Native 1080×1920, zero loss.
- **4:5** is cut from the **square** master: centre-crop 1152×1440 (20% off the
  sides) then scale to 1080×1350. Cropping the 9:16 master into 4:5 instead
  would drop 29.7% of the height and clip heads; scale-and-pad would put 160px
  black bars down both sides of a feed ad.
- One crop note: the 4:5 trims the outer edges of the storefront-UI shot in
  beat A, so a little of that page's left-hand text is lost. Inherent to any
  crop of a square into 4:5; the shot still reads.

---

## Rebuild

```bash
cd video-projects/ecomiq-cro-short
bash scripts/fetch-sources.sh     # pulls both masters + the VO from Drive
bash scripts/build-bed.sh 916     # -> assets/montage-bed-916.mp4
bash scripts/build-bed.sh 45      # -> ../ecomiq-cro-short-45/assets/montage-bed-45.mp4
python3 scripts/make-45.py        # regenerates the 4:5 root from this one
npx hyperframes lint
npx hyperframes render --quality standard --output renders/ecomiq-cro-916.mp4
```

`index.html` is the single source of truth for both frames — edit it, re-run
`make-45.py`, and the 4:5 follows.
