# ecomiq-short-form-3 — Design Spec

Format: 9:16 Story/Reels · 1080x1920 @ 30fps · Safe area ~10% margins.

Brand kit copied from `assets/ecomiq/`. Tokens in `assets/brand-tokens.css`; fonts local in `assets/fonts/`.

## This project's idea
- **Source:** "EcomIQ 3" — A-roll from the Drive `Video 3 – focus on getting new customer` folder.
  UGC talking-head, native 9:16 (stored 1920×1080 HEVC + rotation flag → prepped to 1080×1920 H.264).
- **Hook:** the presenter's spoken pitch carries the spine; branded motion cards punctuate the beats.
- **Message:** clarity + growth — "clear up the confusion", "more new customers", "turn data into decisions".
- **CTA:** Rethink your strategy. → **Start free → ecomiq.com**

## Structure (~26.5s)
- **Spine (0–22.5s):** `assets/aroll-video3.mp4`, muted `<video>` (track 0) + sibling `<audio>` VO (track 1),
  head trimmed 0.4s. Cutaways cover the picture without cutting the voice.
- **Persistent logo (track 3):** `ecomiq-logo-white.svg` top-left with scrim + drop-shadow so it reads over
  the bright footage.
- **Cutaways (track 4, ~1.6s each, whip/blur in-out):**
  - 5.0s — `cutaway-1` "Clear up the *confusion*." (eyebrow + serif-italic emphasis + flame rule)
  - 11.0s — `cutaway-2` kinetic stack MORE / NEW / **CUSTOMERS**
  - 16.8s — `cutaway-3` "Turn data into *decisions*." + rising bar motif (data-feel)
- **End card (22.2–26.5s, track 5):** navy, centered white logo, "*Rethink* your strategy.", flame CTA pill.
- **Music bed (track 2):** `assets/music-bed-placeholder.m4a` — silent placeholder at a ducked-under-VO
  level (`data-volume="0.18"`). Swap the src for a real track and raise the volume where it should carry.

## No captions (by request).

## B-roll note
No B-roll folder was provided and the A-roll's Drive folder contained none, so the cutaways are on-brand
motion-graphic cards rather than footage. Drop real B-roll into `assets/` and swap the `cutaway-*` clips for
`<video>` cutaways on the same beats if/when footage is available.

## Deliverable
- `final.mp4` (project root) — 1080×1920, 26.5s, H.264 + AAC. Draft/verify frames under `renders/` (gitignored).
