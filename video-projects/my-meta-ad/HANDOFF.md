# my-meta-ad — Handoff

EcomIQ's first branded video project. 4:5 Meta feed ad. Use it as the template
for new EcomIQ ads (see the `/ecomiq-ad` skill).

## What's here
- `index.html` — 7s, 1080×1350 @ 30fps. Navy canvas, white EcomIQ logo, italic-serif
  "*Rethink*" emphasis over bold "your strategy.", flame-orange CTA, blue→flame bloom.
- `assets/brand-tokens.css` — full EcomIQ palette + type tokens. **Change a value
  here and the whole video re-skins.**
- `assets/ecomiq-logo-*.{svg,png}` + `ecomiq-icon-*` — logo lockups (white for navy
  bg, navy for light bg).
- `DESIGN.md` — the EcomIQ brand spec for this project.
- `renders/` — gitignored scratch. `ecomiq-final.mp4` is the standard-quality bake.

## How it was built (proven loop)
1. `npm run setup` (fresh container — installs ffmpeg/chrome/poppler).
2. Brand pulled from the EcomIQ Guidelines PDF + logo zip → `brand-tokens.css` + `DESIGN.md`.
3. `npx hyperframes lint` → 0 errors (2 Google-Fonts warnings, survivable).
4. `render --quality draft` → grabbed frames → `Read` to confirm Rethink Sans +
   italic Hedvig serif both resolved.
5. `render --quality standard` → `ecomiq-final.mp4`.

## To make a new variant
- Invoke **`/ecomiq-ad`** and say what you want ("light version", "9:16 story",
  "new headline: …"). It reads the brand + recipe and rides on `/hyperframes`.
- Or by hand: `cp index.html ../<new>/index.html`, edit copy/layout, keep the
  brand tokens, then lint → draft → verify → standard.

## Footguns
- Don't animate width/height/top/left on media elements (none here yet, but the
  rule bites once you add product video). Wrap in a div, animate the wrapper.
- Keep **one** serif-italic emphasis word per headline; flame orange is the only
  hot accent.
- `preview` localhost isn't reachable on the web — verify via rendered frames.

## Open / next ideas
- Light-background A/B variant.
- 1:1 (1080×1080) and 9:16 (1080×1920) cuts from the same tokens.
- 15s multi-scene with a product reveal + `data-chart` metric and whip transitions.
- Product photography from the Drive folders (not yet pulled in — upload here to use).
