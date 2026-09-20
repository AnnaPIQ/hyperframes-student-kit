# EcomIQ CRO Short — Edit Plan

Status: **built and rendered.** Approved 2026-09-20, revised twice the same day.
The shot list below is v3 and matches what shipped.

| | Shots | Avg shot | Retime |
|---|---|---|---|
| v1 | 18 | 0.86s | 1.00x |
| v2 | 13 | 1.19s | 1.23x |
| **v3** | **11** | **1.40s** | **1.48x** |

The montage window is pinned at 463 frames by the VO and the 15.36s card, so fewer
cuts necessarily means more retime: a shot cannot be held longer without being
slowed. At 1.48x this is plain frame duplication, which reads as deliberate
slow-motion rather than interpolation artefacts.

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

## Shot list — 11 shots, montage covers 0 to 15.4333s (463 frames @30)

Every shot is drawn from the **back half of the reel** (13.87s onward). Hard cuts
inside an act; a 6-frame cross-dissolve at each act boundary.

| # | Timeline | Source | Retime | Shot |
|---|---|---|---|---|
| 1 | 0.00 to 1.10 | 24.60 to 25.50 | 1.22x | Shopify booth |
| 2 | 1.10 to 2.33 | 23.63 to 24.60 | 1.28x | Boutique, Sean + client with product |
| 3 | 2.33 to 3.57 | 25.50 to 26.33 | 1.48x | TikTok booth, dissolve lands on "Getting" (2.35) |
| 4 | 3.57 to 4.80 | 15.60 to 16.43 | 1.48x | Store site screen recording, carries "sales" |
| 5 | 4.80 to 6.00 | 22.83 to 23.63 | 1.50x | Hands on keyboard, carries "Your conversion rate" (5.28) |
| 6 | 6.00 to 7.73 | 17.87 to 19.03 | 1.49x | Stage, "1.3+ Billion / 99.9% uptime", carries "we guarantee" (7.43) |
| 7 | 7.73 to 9.13 | 19.97 to 20.90 | 1.50x | Coffee meeting, carries "we can fix it" |
| 8 | 9.13 to 10.80 | 20.90 to 22.03 | 1.47x | Tesla, carries "Give us 90 days" (9.40) |
| 9 | 10.80 to 12.20 | 19.03 to 19.97 | 1.50x | Boutique, carries "EcomIQ strategist" (11.21) |
| 10 | 12.20 to 14.40 | 13.87 to 15.60 | 1.27x | Retail aisle, product lifted on "move" (13.16) and "move yours" (14.26) |
| 11 | 14.40 to 15.43 | 26.87 to 27.73 | 1.19x | Sean portrait, into the end card |

Act dissolves land at 2.33, 6.00 and 10.80.

### Dropped, worth knowing
- **SHOPIFY PREMIER PARTNER card** (source 7.03 to 7.60). The most on-message frame
  in the reel for a Shopify CRO ad, but it sits a quarter into the source, so the
  "last clips" rule pushed it out. One line to put it back in Act 1.
- Also out, all front-half: Sean direct-to-lens, Sean at laptop, Sean presenting,
  expo floor, cupcake macro, the greeting, attendee with phone, Sean with mic.

## Overlay and card

- White EcomIQ lockup pinned top-left from 0.4s, clearing at 14.9s as the card takes
  over. Wrapped in a positioned non-`clip` div per `docs/LESSONS.md`. Uses the `.png`
  so it is not a duplicate media node of the card's `.svg` lockup.
- End card: navy canvas, white EcomIQ lockup, headline, flame-orange "Link Below"
  pill, brand tokens only, flame bloom behind the button. **No watermark mark and no
  arrow glyph in the pill** (both removed on request).
- Card copy, revealed line by line from 15.62s:

  > **Stop losing sales**
  > **you've already paid for**
  > *Guaranteed*

  "Guaranteed" is the single italic Hedvig Letters Serif emphasis word in blue tint,
  the EcomIQ signature treatment. It pulses with a blue halo at 17.57s, leading
  Sean's spoken "Guaranteed" (17.75s) by 0.18s.
  Spelling note: the brief wrote "loosing"; the card ships "losing", matching the VO.

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
