# EcomIQ × Dryft Sleep — social-proof ad · EDIT PLAN

**Status: awaiting approval.** Nothing rendered yet.

Format: 9:16 (1080×1920) + 1:1 (1080×1080) · 30fps · H.264/AAC, faststart.
Audio-led, full length — no cutdown.

## Source media

| Role | Source | Notes |
|---|---|---|
| VO (A-roll) | Drive `1WyK-Gg6…` "Dryft Sleep - Without spending a dollar more on ads..mov" | 2.5 GB ProRes master. Source download is **quota-blocked** by Drive; full 43.0s audio recovered via the transcoded preview stream (128 kbps AAC / 44.1 kHz). Master audio is 24-bit/48 kHz LPCM (~12.35 MB of the 2.5 GB) — recoverable via `scripts/drive-*` once quota resets. |
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

**Recommended head trim:** drop the first 3.4s (throat clear + dead air) → runtime ~39.6s,
all cues shift 3.4s earlier. Alternative: keep the full 43.0s.

## Beat sheet (raw audio timestamps)

| # | Time | Graphic — lands on the word | B-roll |
|---|---|---|---|
| 1 | 3.6–9.6 | "DRYFT SLEEP" wipe-in · **count-up 0→59%** fires on "59%" **@6.11** · label `RETURNING CUSTOMERS` · flame chip **"$0 EXTRA AD SPEND"** @7.6 | walking |
| 2 | 9.6–12.7 | `NEW CUSTOMERS` dim + struck through @11.3 | shelf / storefront |
| 3 | 12.7–17.0 | Kinetic staggered type **"THE ONES THEY ALREADY HAD"** @12.9 · 3-beat repeat pulse on "again and again" @16.11 | excited |
| 4 | 17.0–22.9 | **Count-up 0→3×** on "three times" **@20.08** · label `SUBSCRIPTION REVENUE — 3x THE STOREFRONT` | product |
| 5 | 22.9–29.7 | Chips `SAME BRAND` @23.4 + `SAME AD BUDGET` @24.6 → flame **"FAR MORE PROFIT"** @25.6 | suppliers |
| 6 | 29.7–36.9 | **Pull-quote card**, staggered lines: *"Our average subscriber is a minimum of six months."* — **Lindsey Rosenberg, Founder, Dryft Sleep** @30.0, exits 36.4 | shelf + walking tail |
| 7 | **36.94**→43.0 | **END CARD** cuts on "If": EcomIQ logo, headline **"See if we can help you"**, flame pill **"Find out more"** pops @38.9. Audio continues; holds ~6s. | brand canvas |

Persistent: `ecomiq-logo-white.svg` top-left every frame, ~9% width, subtle shadow. **No captions.**

## Verified proof inventory (real values only)

From the VO and the published case study
(`ecomiq.com/blogs/case-studies/how-dryft-sleep-grew-returning-customers-by-59-without-spending-more-on-ads`):

- **+59%** returning customers ("Returning customers up 59%") — *used*
- **3x** subscription revenue vs. the storefront ("Subscription revenue 3x the storefront") — *used*
- **$0** extra ad spend (from the VO) — *used*
- Quote: "Our average subscriber is a minimum of six months." — Lindsey Rosenberg, Founder — *used*
- Available, unused (one idea per beat): +158% total sales YOY · +34% AOV YOY · +565% social as acquisition · +881% wholesale growth

## Open flags — nothing invented

1. **No star rating exists.** The brief left `[e.g. 4.9/5]` as a placeholder and the case
   study has none → **star-draw graphic omitted.** Needs a real figure to include.
2. **No customer/brand logo assets** — `assets/` holds only EcomIQ logos. Real placements
   named in the case study (Erewhon, Urban Outfitters, Anthropologie, Amazon, Vogue,
   Harper's Bazaar, Women's Health) have no logo files here, and third-party logos will not
   be recreated. Options: **text wordmark ticker** ("Stocked at / Featured in") or **omit**.
3. **Quote was blank in the brief** — one real case-study quote proposed above. Alternatives:
   "Since we launched we've already seen many mouth tape brands close." ·
   "That's why we're building more of a sleep ecosystem than just a product line."
4. **Crop flag.** 9:16: the transposed wholesaler clips fill natively, no padding. The
   `product` clip is 16:9 and **needs a crop** in 9:16 (scale+pad would letterbox it to a
   thin band). **1:1: every clip needs a crop.** Recommendation: crop-to-fill, since the
   footage is a darkened backdrop behind graphics. Alternative: scale+pad letterbox.
5. **Audio is preview-quality** (128 kbps AAC / 44.1 kHz), not the ProRes master's
   24-bit/48 kHz LPCM — Drive quota. Fine for social; re-pullable for the final bake.
6. **Music bed:** duckable placeholder `<audio>` at low gain, commented, to drop a track into.
7. VO says "three times their first customer revenue"; the case study words it
   "Subscription revenue 3x the storefront" — the graphic uses the case-study wording.

## Delivery

- `renders/ecomiq-social-proof-9x16.mp4` — 1080×1920
- `renders/ecomiq-social-proof-1x1.mp4` — 1080×1080
