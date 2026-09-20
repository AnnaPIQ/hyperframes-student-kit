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

`scripts/build-montage.sh` cuts 24 shots out of the reel, frame-exact, averaging
0.81s. Three are anchors, timed so the picture lands on the word:

| Anchor | Source | Lands on |
|---|---|---|
| Shopify Premier Partner card | 7.03s (stretched 17→30f) | "We guarantee it." |
| Sean with mic | 10.87s | "Give us 90 days." |
| "1.3+ Billion / 99.9% uptime" stat wall | 18.03s | "...order value climbing." |

Cuts are hard, matching the reel's native ~0.8s rhythm. Six beat seams carry a
motion-blurred whip streak instead of a fade (4.50 / 9.47 / 10.47 / 11.13 /
17.60 / 19.50), and the end card additionally takes a white flash.

## Motion graphics

White EcomIQ lockup sits top-left from 0.40s and leaves at 19.14s, just before
the card — where it returns centred, as the callback.

| Element | In | On the line |
|---|---|---|
| `↓ SMALL ORDERS` flame chip | 3.78 | "...they're all small." |
| `CHANGE HOW YOU SELL` chip | 5.50 | "...how you sell..." |
| `GUARANTEED` flame chip | 9.58 | "We guarantee it." |
| **`90 DAYS`** numerals | 11.16 | "Give us 90 days." |
| `YOUR ECOMIQ STRATEGIST` chip | 13.28 | "...an EcomIQ strategist..." |
| `ORDER VALUE ↑` + climbing bars | 17.70 | "...order value climbing." |
| End card CTA pill | 21.55 | "Tap the link..." |

Flame `#FF4C32` is the only hot accent. Exactly one italic-serif emphasis word
in the piece — *bigger*, on the end card.

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
