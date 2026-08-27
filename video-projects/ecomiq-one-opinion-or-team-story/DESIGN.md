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
| Bottom guard | 120px | **330px** — keeps the CTA pill above the Reels chrome |
| Logo lockup | 292px @ top 56 | 300px @ top 96 |
| Type scale | h1 90 / h2 62 / numeral 190 | h1 96 / h2 68 / numeral 220 |
| Scene gap | 34px | 46px |
| Grid pitch | 90px | 96px |

Timing, palette, motion grammar, callbacks and the render contract are unchanged —
see the sister spec.

```bash
cd video-projects/ecomiq-one-opinion-or-team-story
npx hyperframes lint
npx hyperframes render --quality high --output renders/final.mp4
```
