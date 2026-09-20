# EcomIQ CRO Short — Edit Plan

Status: **built and rendered.** Approved 2026-09-20. Revised the same day on Nate's
note: *"slow down montage slightly, we don't need to use it all, I prefer last
clips."* The shot list below is v2 and matches what shipped.

## Sources

| | Montage, vertical | Montage, square | Sean (voiceover) |
|---|---|---|---|
| Drive title | `Showcase Reel.mp4` | `Showcase ad-1-1.mp4` | `CRO1.aifc` |
| Probe | 1080x1920, 9:16, 30fps, 29.72s | 1440x1440, 1:1, 30fps, 29.72s | AIFF-C, PCM 24-bit BE, 48kHz mono, 21.60s |
| Staged as | `assets/montage-source-9x16.mp4` | `assets/montage-source-4x5.mp4` | `assets/sean-vo.m4a` (AAC 192k) |
| Feeds | the 9:16 export | the 4:5 export | both exports |

Both montages are the same edit reframed: every cut in the vertical source appears at
an identical timestamp in the square source, so the shot list below applies unchanged
to both. Each is staged muted (`-an`) and trimmed to the 27.73s of live footage.

The montage's own audio is dropped at the staging step (`-an`). Sean's VO is the
only audio in the mix.

Live montage footage ends at 27.73s. From 27.73s the source already carries a baked
EcomIQ end card (navy, white lockup, flame "Click The Link Below" pill, light-streak
reveal). That card is the design reference; the shipped card is rebuilt natively from
`assets/brand-tokens.css` + `assets/ecomiq-logo-white.svg` so it stays crisp and
reframes cleanly at both ratios.

## Voiceover, as actually spoken

Transcribed on-device (`npx hyperframes transcribe --model small.en`), then anchored
against measured audio energy because Whisper reported a 22.94s duration for a 21.60s
file (its drift is confined to the final word).

> Run a Shopify store? Getting the traffic but not the sales? Your conversion rate is
> the problem and we guarantee we can fix it. Give us 90 days. You'll work with an
> EcomIQ strategist who knows how to move it and they'll move yours. Stop losing sales
> you've already paid for. Guaranteed in 90 days. Tap the link and see if you qualify.

This differs from the transcript supplied in the brief. The phrase "want to see if we
can help you" does not occur; the nearest line is "Tap the link and see if you
qualify" at 19.20s.

### Beat map

| Beat | Speech | Line |
|---|---|---|
| B1 | 0.85 to 1.95 | Run a Shopify store? |
| B2 | 2.35 to 4.40 | Getting the traffic but not the sales? |
| B3 | 5.15 to 8.80 | Your conversion rate is the problem and we guarantee we can fix it. |
| B4 | 9.40 to 14.80 | Give us 90 days. You'll work with an EcomIQ strategist who knows how to move it and they'll move yours. |
| B5 | 15.36 to 20.95 | Stop losing sales you've already paid for. Guaranteed in 90 days. Tap the link and see if you qualify. |

## End-card trigger

| | |
|---|---|
| Onset of "Stop" | **15.36s** (measured; Whisper's 15.00 falls in silence) |
| Previous word ends | 14.86s |
| Cross-dissolve | 14.96 to 15.36 (0.40s), card fully resolved on the word |
| Card hold | 15.36 to 21.60 (6.24s), VO continues over it |

## Shot list — 13 shots, montage covers 0 to 15.4333s (463 frames @30)

v2. Every shot is drawn from the **back half of the reel** (13.87s onward) per Nate's
"I prefer last clips", and each is retimed to roughly **0.81x** so the cutting
breathes: average shot is now **1.19s**, up from 0.86s in v1 (18 shots).

Hard cuts inside an act; a 6-frame cross-dissolve at each act boundary.

### Act 1 — Hook · "Run a Shopify store?"
| # | Timeline | Source | Retime | Shot |
|---|---|---|---|---|
| 1 | 0.00 to 1.10 | 24.60 to 25.50 | 1.22x | Shopify booth |
| 2 | 1.10 to 2.33 | 23.63 to 24.60 | 1.28x | Boutique, Sean + client with product |

### Act 2 — Problem · dissolve lands on "Getting" at 2.33
| # | Timeline | Source | Retime | Shot |
|---|---|---|---|---|
| 3 | 2.33 to 3.43 | 25.50 to 26.33 | 1.32x | TikTok booth, "Capture Leads" |
| 4 | 3.43 to 4.47 | 15.60 to 16.43 | 1.24x | Store site screen recording, cut on "not" (3.44) |

### Act 3 — Diagnosis
| # | Timeline | Source | Retime | Shot |
|---|---|---|---|---|
| 5 | 4.47 to 5.47 | 22.83 to 23.63 | 1.25x | Hands on keyboard |
| 6 | 5.47 to 6.47 | 22.03 to 22.83 | 1.25x | Sean with mic, expo |
| 7 | 6.47 to 7.90 | 17.87 to 19.03 | 1.23x | Stage, "1.3+ Billion / 99.9% uptime", carries "we guarantee" (7.43) |
| 8 | 7.90 to 8.70 | 16.43 to 17.07 | 1.26x | Strategist call, to camera |
| 9 | 8.70 to 9.87 | 19.97 to 20.90 | 1.25x | Coffee meeting, carries "Give us 90 days" (9.40) |

### Act 4 — The offer
| # | Timeline | Source | Retime | Shot |
|---|---|---|---|---|
| 10 | 9.87 to 11.03 | 20.90 to 22.03 | 1.03x | Tesla |
| 11 | 11.03 to 12.33 | 19.03 to 19.97 | 1.39x | Boutique, carries "EcomIQ strategist" (11.21) |
| 12 | 12.33 to 14.40 | 13.87 to 15.60 | 1.19x | Retail aisle, product lifted on "move" (13.16) and "move yours" (14.26) |
| 13 | 14.40 to 15.43 | 26.87 to 27.73 | 1.19x | Sean portrait, into the end card |

### Dropped from v1, worth knowing
- **SHOPIFY PREMIER PARTNER card** (source 7.03 to 7.60). The single most on-message
  frame in the reel for a Shopify CRO ad, but it sits at 25% into the source, so it
  fell to the "last clips" rule. Say the word and it goes back in Act 1.
- Also dropped: Sean direct-to-lens (8.37), Sean at laptop (5.57), Sean presenting
  (9.07), expo floor (3.40), cupcake macro (6.37), greeting (7.60), Sean with mic
  (10.73), attendee with phone (12.37). All from the front half.

## Overlay and card

- White `ecomiq-logo-white.svg` pinned top-left from 0.4s, fades out at 14.9s as the
  card takes over. Wrapped in a positioned non-`clip` div per `docs/LESSONS.md`.
- End card: navy canvas, white EcomIQ lockup, flame-orange "Link Below" pill,
  Rethink Sans, brand tokens only, flame bloom sweep behind the button.

## Framing

- **9:16 (1080x1920):** vertical source, native. No scale, no pad, no crop.
- **4:5 (1080x1350):** square source, centre-cropped on width (1152 of 1440, 144px off
  each side) then scaled to 1080x1350 with lanczos. Full height is kept, so no head is
  ever cropped, and the only resample is a mild 1152 to 1080 downscale.

The square source resolved both framing problems that a vertical-to-4:5 crop had:

| Shot | Vertical source cropped to 4:5 | Square source cropped to 4:5 |
|---|---|---|
| 6, store site screen recording | loses page header and left nav | page and Sean's circle both read clearly |
| 13, strategist call | vertical 2-up split, bottom panel clipped | reframed as a single full-frame shot, no split |

All 18 shots were frame-checked at the 4:5 crop. No crops to flag.

Note on shot 2: a designed lens-flare sweep passes over "PREMIER" around 7.15s and
resolves by 7.50s. That is in the source at every ratio, not a crop artifact.

## Deliverables

| Ratio | Path | Size | Duration |
|---|---|---|---|
| 9:16 | `renders/ecomiq-cro-short-9x16.mp4` | 1080x1920 | 21.60s |
| 4:5 | `renders/ecomiq-cro-short-4x5.mp4` | 1080x1350 | 21.60s |
| 1:1 | `renders/ecomiq-cro-short-1x1.mp4` | 1080x1080 | 21.60s |

All three: 648 frames @30fps, H.264 High, AAC-LC 48kHz stereo, `+faststart`, no
captions. The 1:1 resolves the brief's internal contradiction (step 4 asked for 1:1,
OUTPUT asked for 4:5) and is native from the square source, so it costs nothing.

Verified on the finals: audio envelope correlates 1.0000 against the source VO at
amplitude ratio 1.000 (single, un-layered copy); frames checked at every shot, the
dissolve and the card in all three ratios; no cropped faces, no overflow, no black
frames.

## Open items for Nate

All resolved. 15.36s trigger confirmed; 4:5 framing solved by the square source; 1:1
shipped alongside. The one open offer: the SHOPIFY PREMIER PARTNER card is out under
the "last clips" rule and can go back into Act 1 on request.
