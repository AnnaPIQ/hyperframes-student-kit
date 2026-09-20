# EcomIQ — "Turn small orders into bigger ones" (short-form ad)

Sean's voiceover is the spine; the Showcase Reel is the picture. No talking
head, no captions. Two deliverables off one composition: **9:16** for
Reels/Stories and **4:5** for the Meta feed.

Brand spec → `../../assets/ecomiq/BRAND.md`. Tokens → `assets/brand-tokens.css`.

## Sources

| | File | Spec |
|---|---|---|
| Picture | `Showcase Reel.mp4` (Drive) | 1080×1920, 30fps CFR, 29.72s, 38 shots |
| Voice | `AVO2.aifc` (Drive) | mono 48k PCM-24, **24.085s** |

The reel's own EcomIQ end card (27.73–29.72s) is dropped — this build has its own.

## Transcript (measured, not supplied)

The brief's pasted script did not match the recording. This is what is actually
on the audio, with sentence bounds from an ffmpeg silence map:

| Beat | Line | In | Out |
|---|---|---|---|
| Hook | "Run a Shopify store. Plenty of orders, but they're all small." | 0.585 | 4.107 |
| Promise | "A few changes to how you sell will lift what every customer spends." | 4.935 | 8.978 |
| Proof | "We guarantee it." | 9.510 | 10.370 |
| Offer | "Give us 90 days." | 11.075 | 12.022 |
| Mechanism | "You'll work with an EcomIQ strategist who'll build those changes with you and get your order value climbing." | 12.190 | 18.528 |
| **End card** | **"Turn small orders into bigger ones."** | **19.488** | 21.194 |
| CTA | "Tap the link and see if you qualify." | 21.553 | 23.142 |

The brief also asked for the timestamp of "want to see if we can help you" —
that line is not in this recording. Nearest is "see if you qualify" (~22.30s).

### End-card trigger — 19.50s

"Turn" onsets at **19.488s**, established two ways: the longest internal pause
(0.96s, 18.528→19.488) in the silence map, and an isolated re-transcription of
19.35–21.35. The cut is placed at **19.500s (frame 585)** — under half a frame
after the onset. Verified in the render: the output's silence map is identical
to the source's, so there is zero A/V drift across 24.6s.

## Structure

Total **24.600s**. Montage runs 0 → 19.500 (585 frames), end card holds
**5.100s** — the longest shot in the piece, per the outro rule.

`scripts/build-montage.sh` takes **17 shots** out of the reel's 38, frame-exact,
averaging **1.15s**. That is deliberately slower than the reel's own ~0.8s
cutting: most shots are stretched (`setpts`, typically 1.2–1.7x) so the footage
breathes under the VO rather than racing it. Not all of the reel is used.

Six are anchors, timed so the picture lands on the word:

| Anchor | Source | Out | Lands on |
|---|---|---|---|
| dryft packets | 14.83s | 3.27–4.50 | "...they're all small." |
| Upsell / bundle UI | 15.60s | 5.77–7.03 | "...how you sell..." |
| Shopify Premier Partner card | 7.03s (17f → 47f) | 9.47–11.03 | "We guarantee it." + the pause after |
| Sean with mic | 10.87s | 11.03–12.03 | "Give us 90 days." |
| Stockroom walkthrough | 19.03s | 13.03–14.37 | "...an EcomIQ strategist..." |
| "1.3+ Billion / 99.9%" stat wall | 18.03s | 17.60–18.60 | "...order value climbing." |

The Premier Partner card is the one heavy stretch (2.76x) — a static title card
with a light sweep, so it holds the credibility beat through the following
silence without visible judder.

Cuts are hard. Five beat seams carry a motion-blurred whip streak instead of a
fade (4.50 / 9.47 / 11.03 / 12.03 / 17.60), and the end card takes a whip plus a
white flash at 19.50.

## Motion graphics

White EcomIQ lockup sits top-left from 0.40s and leaves at 19.14s, just before
the card — where it returns centred, as the callback.

| Element | In | Out | On the line |
|---|---|---|---|
| `↓ SMALL ORDERS` flame chip | 3.45 | 4.40 | "...they're all small." |
| `CHANGE HOW YOU SELL` chip | 5.88 | 6.92 | "...how you sell..." |
| `GUARANTEED` flame chip | 9.58 | 10.80 | "We guarantee it." |
| **`90 DAYS`** numerals | 11.16 | 11.94 | "Give us 90 days." |
| `YOUR ECOMIQ STRATEGIST` chip | 13.20 | 14.22 | "...an EcomIQ strategist..." |
| `ORDER VALUE ↑` + climbing bars | 17.70 | 19.10 | "...order value climbing." |
| End card `GUARANTEED` badge | 21.12 | — | before the CTA |
| End card CTA pill | 21.55 | — | "Tap the link..." |

Flame `#FF4C32` is the only hot accent.

### Subtitle safe band

Subtitles get added manually downstream, so the bottom of frame is kept clear:
**640px in 9:16, 430px in 4:5** (both ≈ the bottom third). Every callout is
anchored by `--lower-bottom` so it sits on top of that band, never in it, and
the end card column is lifted by `--card-lift` (130px in 4:5) so the CTA clears
it too. To widen the band, raise those two variables — nothing else moves.

### End card

Headline is **uniform white Rethink Sans, no serif-italic emphasis word** — a
deliberate departure from the brand's signature treatment, by request. "bigger"
still carries the beat, but as a scale lift rather than a type change. A
`GUARANTEED` badge sits between the headline and the CTA, and the CTA reads
`Link Below` with no arrow.

The spoken line is "Turn small orders into bigger ones", so the card copy
matches the VO verbatim rather than "smaller".

## Framing

- **9:16** — source is natively 1080×1920. No scaling at all.
- **4:5** — centre crop to 1080×1350, 285px off top and bottom (approved call;
  scale+pad was the alternative). Checked across the timeline: no cropped faces.
  Note the "1.3+ Billion" stat wall reads as "3+ Billion" — that clipping is in
  the vertical source's own framing, not introduced by the crop. The square
  1440×1440 master keeps it whole if that beat ever needs to be legible.

## Build

```bash
# 1. masters + VO spine (needs the two Drive sources)
bash scripts/build-montage.sh <Showcase Reel.mp4> <AVO2.aifc>

# 2. keep the 4:5 root in step with the 9:16 one
bash scripts/make-4x5.sh

# 3. render
npx hyperframes lint
npx hyperframes render --quality standard --output renders/ecomiq-aov-9x16.mp4
npx hyperframes render -c compositions/ad-4x5.html --quality standard \
  --output renders/ecomiq-aov-4x5.mp4
```

`index.html` (9:16) and `compositions/ad-4x5.html` (4:5) share `assets/ad.css`
and `assets/ad.js`, so the edit only ever lives in one place. The 4:5 root is
generated — edit `index.html` and re-run `make-4x5.sh`, never hand-edit it.

Built masters (`assets/montage-*.mp4`, `assets/vo-sean.wav`) are gitignored:
they are derivable from the Drive sources via step 1.

## Known lint warnings

11 warnings, 0 errors. All are `nested_structure_needs_subcomposition` plus one
`duplicate_media_discovery_risk`. Both are Studio-editability notes, not render
faults — every timed layer is a full-frame `.clip` wrapping an absolutely
positioned child, which is what stops the engine repositioning the logo and the
callouts (see `docs/LESSONS.md`). Splitting them into sub-compositions would
mean splitting the one VO-locked timeline, so they stay as they are.
