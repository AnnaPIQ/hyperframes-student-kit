# EcomIQ — "One opinion, or a whole team?" (9:16 story cut)

Format: **9:16 Stories/Reels · 1080×1920 @ 30fps** · runtime **73.3s**.

This is the vertical cut of the 4:5 founder ad. **The full design spec lives in the
sister project** — read it first:

→ `video-projects/ecomiq-one-opinion-or-team/DESIGN.md`

Both cuts are emitted from one shared beat sheet, so the edit — every scene cut,
every word anchor, every transition — is identical. Only the layout differs.

## What changes in the vertical cut

| | 4:5 (`meta`) | 9:16 (`story`) |
|---|---|---|
| Canvas | 1080×1350 | 1080×1920 |
| A-roll crop | `1728×2160 @ x=966` | `1215×2160 @ x=1223` (both face-centred, cover, never letterboxed) |
| Top guard | 250px | **380px** — more headroom, clears the platform UI |
| Bottom guard | 300px | **450px** — Reels chrome plus the hand-subtitle band |
| Logo lockup | 292px @ top 56 | 300px @ top 96 |
| Type scale | h1 90 / h2 62 / numeral 190 | h1 96 / h2 68 / numeral 220 |
| Scene gap | 34px | 46px |
| Grid pitch | 90px | 96px |

Both cuts keep the bottom ~22% clear of graphics so subtitles can be added by hand
afterwards. Timing, palette, motion grammar, callbacks and the render contract are
otherwise unchanged — see the sister spec.

```bash
cd video-projects/ecomiq-one-opinion-or-team-story
npx hyperframes lint
npx hyperframes render --quality high --output renders/final.mp4                    # 1080x1920
npx hyperframes render --resolution portrait-4k --quality high --output renders/final-4k.mp4   # 2160x3840
```

## 4K master (2160×3840)

`final-4k.mp4` is a true 2× supersample, not an upscale: `--resolution portrait-4k`
re-renders the composition at Chrome `deviceScaleFactor` 2, so all type, vectors,
borders and shadows are drawn at native 4K. The A-roll is re-encoded for it straight
from the 3840×2160 ProRes master (`crop=1215:2160:1223:0 → 2160×3840`) rather than
letting Chrome upscale the 1080 delivery file — swap it in over `assets/founder.mp4`
for the render, then restore the 1080 one.

Three sources cannot carry 2× and are genuinely upscaled in it: the Shopify Premier
Partner badge (338×149 native), the logo-wall marks (~320–420px native) and the
client b-roll (1080-wide originals). Everything else gains real detail.

**The 4:5 cut has no 4K equivalent.** `--resolution` only accepts fixed presets and
none is 4:5, and declaring the composition at 2160×2700 with a CSS `zoom: 2` was
tested and **breaks sub-composition rendering** — the cards drop out and only the
chrome and pinned logo survive. A true 2160×2700 needs the layout rebuilt at 2×
(every format value and ~168 hardcoded px doubled), which has not been done.
