# ecomiq-short-form-3 — Design Spec

Format: 9:16 Story/Reels · 1080x1920 @ 30fps · Safe area ~10% margins.

Brand kit copied from `assets/ecomiq/`. Tokens in `assets/brand-tokens.css`; fonts local in `assets/fonts/`.

## This project's idea
- **Source:** "EcomIQ 3" — A-roll from the Drive `Video 3 – focus on getting new customer` folder.
  UGC talking-head, native 9:16 (stored 1920×1080 HEVC + rotation flag → prepped to 1080×1920 H.264).
- **Hook:** the presenter's spoken pitch carries the spine; branded motion cards punctuate the beats.
- **Message:** clarity + growth — "clear up the confusion", "more new customers", "turn data into decisions".
- **CTA:** Rethink your strategy. → **Start free → ecomiq.com**

## Structure (~44.8s — full original take)
The A-roll is continuous speech for its whole ~44.8s (no dead air / no natural stop at 36s), so the ad runs
the full length rather than trimming the presenter off mid-sentence. Total runtime ≈ the original length.
- **Spine (0–44.8s):** `assets/aroll-video3.mp4`, muted `<video>` (track 0) + sibling `<audio>` VO (track 1),
  full take from 0. Cutaways cover the picture without cutting the voice.
- **Persistent logo (track 3):** `ecomiq-logo-white.svg` top-left with scrim + drop-shadow so it reads over
  the bright footage.
- **Cutaways (track 4, ~1.6s each, whip/blur in-out), spread across the spine:**
  - 7.0s — `cutaway-1` "Clear up the *confusion*." (eyebrow + serif-italic emphasis + flame rule)
  - 15.5s — `cutaway-2` kinetic stack MORE / NEW / **CUSTOMERS**
  - 24.0s — `cutaway-3` "Turn data into *decisions*." + rising bar motif (data-feel)
  - 32.5s — `cutaway-4` "Grow with *confidence*." (matches cutaway-1 style)
- **End card (40.8–44.8s, track 5):** navy, centered white logo, "*Rethink* your strategy.", flame CTA pill —
  overlays the tail of the spine so total runtime ≈ the original length.
- **Music bed (track 2):** `assets/music-bed-placeholder.m4a` — silent placeholder at a ducked-under-VO
  level (`data-volume="0.18"`). Swap the src for a real track and raise the volume where it should carry.

## No captions (by request).

## B-roll note
No B-roll folder was provided and the A-roll's Drive folder contained none, so the cutaways are on-brand
motion-graphic cards rather than footage. Drop real B-roll into `assets/` and swap the `cutaway-*` clips for
`<video>` cutaways on the same beats if/when footage is available.

## Deliverable
- `final.mp4` (project root) — 1080×1920, 26.5s, H.264 + AAC. Draft/verify frames under `renders/` (gitignored).
