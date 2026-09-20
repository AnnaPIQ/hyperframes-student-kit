# EcomIQ CRO Short — Edit Plan

Status: **awaiting approval** on the end-card trigger and the 4:5 crop approach.
Nothing is rendered until that OK lands.

## Sources

| | Montage (visuals) | Sean (voiceover) |
|---|---|---|
| Drive title | `Showcase Reel.mp4` | `CRO1.aifc` |
| Probe | 1080x1920, 9:16, 30fps, 29.72s, H.264 + AAC | AIFF-C, PCM 24-bit BE, 48kHz mono, 21.60s |
| Staged as | `assets/montage-source.mp4` (muted, 0 to 27.73s) | `assets/sean-vo.m4a` (AAC 192k) |

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

## Shot list — 18 shots, montage covers 0 to 15.20s

Cuts are hard inside an act; act boundaries get a 0.18s dissolve.

### Act 1 — Hook
| # | Timeline | Source | Shot |
|---|---|---|---|
| 1 | 0.00 to 0.90 | 24.60 to 25.50 | Shopify booth, orange |
| 2 | 0.90 to 1.47 | 7.03 to 7.60 | SHOPIFY PREMIER PARTNER card |
| 3 | 1.47 to 2.35 | 23.63 to 24.51 | Boutique, Sean + client with product |

### Act 2 — Problem (hard cut on "Getting" at 2.35)
| # | Timeline | Source | Shot |
|---|---|---|---|
| 4 | 2.35 to 3.18 | 25.50 to 26.33 | TikTok booth, "Capture Leads" |
| 5 | 3.18 to 3.88 | 3.40 to 4.10 | Expo floor, crowds |
| 6 | 3.88 to 4.71 | 15.60 to 16.43 | Store site screen recording |
| 7 | 4.71 to 5.20 | 6.37 to 6.86 | Cupcake macro |

### Act 3 — Diagnosis
| # | Timeline | Source | Shot |
|---|---|---|---|
| 8 | 5.20 to 6.00 | 22.83 to 23.63 | Hands on keyboard |
| 9 | 6.00 to 6.80 | 5.57 to 6.37 | Sean at laptop |
| 10 | 6.80 to 7.96 | 17.87 to 19.03 | Stage, "1.3+ Billion / 99.9% uptime" |
| 11 | 7.96 to 8.66 | 8.37 to 9.07 | Sean direct to lens, lands on "fix" (8.67) |
| 12 | 8.66 to 9.40 | 9.07 to 9.81 | Sean presenting at screen |

### Act 4 — The offer (dissolve on "Give" at 9.40)
| # | Timeline | Source | Shot |
|---|---|---|---|
| 13 | 9.40 to 10.04 | 16.43 to 17.07 | Split-screen strategist call |
| 14 | 10.04 to 10.81 | 7.60 to 8.37 | Sean + client, greeting |
| 15 | 10.81 to 11.81 | 10.73 to 11.73 | Sean with mic, lands on "EcomIQ" (11.21) |
| 16 | 11.81 to 12.61 | 12.37 to 13.17 | Sean + attendee, phone in hand |
| 17 | 12.61 to 14.34 | 13.87 to 15.60 | Retail aisle, product lifted on "move" (13.16) and "move yours" (14.26) |
| 18 | 14.34 to 15.20 | 26.87 to 27.73 | Sean portrait, into the card |

## Overlay and card

- White `ecomiq-logo-white.svg` pinned top-left from 0.4s, fades out at 14.9s as the
  card takes over. Wrapped in a positioned non-`clip` div per `docs/LESSONS.md`.
- End card: navy canvas, white EcomIQ lockup, flame-orange "Link Below" pill,
  Rethink Sans, brand tokens only, flame bloom sweep behind the button.

## Framing

- **9:16 (1080x1920):** native. No scale, no pad, no crop.
- **4:5 (1080x1350):** scale+pad would pillarbox 160px each side, which reads weak in
  a Meta feed. Centre crop was checked against all 18 shots: 16 are clean with no
  cropped heads. Two need a decision:
  - **Shot 6** (store site screen recording) loses the page header and left nav under
    a centre crop. Proposed fix: bias that shot's crop upward.
  - **Shot 13** (vertical 2-up split screen) clips the bottom panel. Proposed fix:
    scale-to-fit on a navy pad for that shot only.
  - Recommendation: centre crop throughout plus those two per-shot fixes.

## Deliverables

| Ratio | Path | Size | Duration |
|---|---|---|---|
| 9:16 | `renders/ecomiq-cro-short-9x16.mp4` | 1080x1920 | 21.60s |
| 4:5 | `renders/ecomiq-cro-short-4x5.mp4` | 1080x1350 | 21.60s |

H.264 / AAC, `+faststart`, no captions.

## Open items for Nate

1. Confirm the **15.36s** end-card trigger.
2. Confirm **centre crop** for 4:5 (with the shot 6 and shot 13 fixes).
3. The brief's step 4 says 1:1 while OUTPUT says 4:5. Building 4:5; say if 1:1 is also
   wanted.
