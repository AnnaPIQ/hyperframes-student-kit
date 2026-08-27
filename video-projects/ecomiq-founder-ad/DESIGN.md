# ecomiq-founder-ad — Design Spec

Format: 4:5 Meta feed · 1080x1350 @ 30fps · Safe area ~10% margins (≈108px sides).

Style is locked to `video-projects/revenue-up-bank-empty/`. Tokens live in
`assets/brand-tokens.css`; fonts are local `.woff2` in `assets/fonts/`.

## This project's idea
- **Hook:** "Your coach is one guy." / "Guessing." (line 2 in flame)
- **Message:** One person's opinion vs. an entire team's proven track record.
- **CTA:** "Get an entire team behind your brand." + flame pill "Learn More →"

## Palette (5 colors, each with a job)
| Token | Hex | Meaning |
|---|---|---|
| navy | `#06284C` | canvas — every scene |
| deep-navy panel | `#0d3768` / `#0a325f` | raised surfaces: tiles, cards, chips |
| flame | `#FF4C32` | pain + emphasis + CTA only (pill = `#FF4C32`→`#f09025`) |
| blue-tint | `#9CD4FF` | positive tags, the "team" side, accents |
| muted blue-grey | `#6f8db3` / `#9fb6d4` | "before" / struck / de-emphasised text |

White `#FFFFFF` is the neutral headline color (non-italic). Hedvig Letters Serif
*italic* is reserved for exactly one emphasis word per scene.

## Background (every graphic scene)
Navy + soft radial blooms (blue-tint top, flame bottom) + a 90px `#1d4a7a` grid at
~12–14% opacity, radially masked. Cinematic inset vignette and a top scrim ride
above every scene in the root composition, with the EcomIQ logo pinned top-left
at 60/64px.

## Motion grammar
- Snappy GSAP entrances; `fromTo` on anything that starts hidden (LESSONS.md).
- Eases: `power3.out` / `expo.out` (reveals), `back.out(1.4–1.8)` (tiles, chips, pills),
  `power2.in` (exits), `sine.inOut` (breathing / drift), `none` (continuous drift).
- Numbers count up with `power2.out`; `font-variant-numeric: tabular-nums`.
- Beat seams are blur/whip — the outgoing beat lifts with blur, the incoming beat
  rises from below. Never a hard cut.
- Every sub-composition ends `tl.to({}, { duration: SLOT }, 0)` (Law #11).

## What NOT to do
- No second emphasis word in serif italic in one scene.
- No color outside the five above — flame is the only hot accent.
- No `gsap.from()` on hidden elements; no CDN GSAP; no render-time fetches.
- Never animate the `<video>` element itself — wrap it.
- No letterboxed A-roll; the founder is always full-frame cover-cropped.
