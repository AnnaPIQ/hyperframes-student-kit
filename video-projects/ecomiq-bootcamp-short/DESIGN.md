# ecomiq-bootcamp-short — Design Spec

Footage-forward short-form vertical ad for EcomIQ's **Free Profitability Bootcamp**.
Two aspect ratios ship from this one project.

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens live in `assets/brand-tokens.css`; fonts are local (`assets/fonts/`).

## Formats

| File | Aspect | Size | Render command |
|---|---|---|---|
| `index.html` | 9:16 | 1080×1920 | `npx hyperframes render --quality standard --output renders/ecomiq-bootcamp-9x16.mp4` |
| `compositions/ad-4x5.html` | 4:5 | 1080×1350 | `npx hyperframes render -c compositions/ad-4x5.html --quality standard --output renders/ecomiq-bootcamp-4x5.mp4` |

Both are ~30.27s @ 30fps. Shipped finals are copied to the project root
(`ecomiq-bootcamp-9x16.mp4`, `ecomiq-bootcamp-4x5.mp4`) because `renders/` is gitignored.

## The idea

- **Hook:** how big brands print big margins — intentional pricing.
- **Message:** it's one of the principles taught in EcomIQ's completely free profit bootcamp.
- **CTA:** Join our Free Profitability Bootcamp (register free via the link).

## Build

Footage-forward: the talking-head recording carries the whole ad. **No captions, no
kinetic type, no motion-graphic overlays** — deliberately, per brief.

- **Source:** `IMG_1095.MOV` (2160×3840, 30fps). Trimmed `0.25s → 30.5s` to drop the
  lead-in and trailing silence, downscaled to 1080-wide, re-encoded H.264 with a dense
  closed GOP (`-g 30`) so frame extraction never freezes (see `docs/LESSONS.md`).
  - 9:16 → exact 2:1 downscale → `assets/bootcamp-9x16-edit.mp4`
  - 4:5 → downscale then centered vertical crop (`crop=1080:1350:0:285`) → `assets/bootcamp-4x5-edit.mp4`
- **Full-frame footage** with a gentle brand grade (`contrast 1.04 / saturate 1.05`).
- **Persistent brand bug:** white EcomIQ lockup, top-left, ~11% width, on every frame.
  Layered dark drop-shadow halo so it reads on any shot (incl. the bright ceiling).
  Wrapped in a positioned non-`clip` div so the engine never drifts it.
- **End card (final ~2s):** navy card with a blue→flame bloom fades over the footage,
  then the centered EcomIQ logo and a flame-orange pill CTA
  *"Join our Free Profitability Bootcamp →"* land. CTA breathes to hold the eye.

## Brand

- Navy `#06284C` canvas, Flame `#FF4C32` CTA (the only hot accent), White text.
- Rethink Sans (CTA / any text) + Hedvig Letters Serif available for italic emphasis.
- Logo never stretched or recolored; white lockup on the dark footage/navy.
