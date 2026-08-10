# ecomiq-short-form — Design Spec

Footage-forward EcomIQ short-form ad, delivered in two vertical formats from one
prepped clip. No captions, no kinetic type — the talking-head footage carries the
message; branding is a persistent corner logo plus a branded end card.

## Formats (two standalone compositions under `compositions/`)
| File | Aspect | Dimensions | Render target |
|---|---|---|---|
| `compositions/ecomiq-short-9x16.html` | 9:16 | 1080×1920 @ 30fps | `renders/ecomiq-short-9x16.mp4` |
| `compositions/ecomiq-short-4x5.html`  | 4:5  | 1080×1350 @ 30fps | `renders/ecomiq-short-4x5.mp4` |
| `compositions/ecomiq-short-9x16-mg.html` | 9:16 | 1080×1920 @ 30fps | `renders/ecomiq-short-9x16-mg.mp4` |

`-mg` = **motion-graphics** variant: word-synced karaoke captions (from
`assets/transcript.json`), three flame kinetic callouts on the hero beats (PRICES
UP / TEST YOUR *ceiling* / LIFT YOUR PROFIT) with a rising-bars motif that returns
on the end card, animated brand chrome (logo + flame rule), and blur/whip
transitions. Keeps EcomIQ palette + Rethink Sans / Hedvig. The other two are the
footage-forward (no-caption) cut.

`index.html` mirrors the 9:16 comp (root-relative asset paths) so the project has a
default entry and `hyperframes lint` has an entry point. Render each variant with
`--composition compositions/<file>.html`.

## Source footage
- `assets/script5-pricing.mp4` — 1080×1920 H.264, muted, 47.0s. Re-encoded from a
  natively-vertical phone selfie ("Script 5 - pricing", HEVC 1920×1080 + rotation
  flag → 1080×1920). Trimmed 0.5s head dead-air; runs through end of speech (~46.7s).
- `assets/script5-pricing.m4a` — matching AAC audio, fed to the mixer via a sibling
  `<audio>` (the `<video>` stays `muted`).

## Structure (both comps, identical apart from dimensions/crop)
1. **Footage** — `<video>` full-bleed `object-fit: cover`. 9:16 fills natively; 4:5
   cover-crops with `object-position: center 32%` to keep face + headroom. Light
   grade `contrast(1.05) saturate(1.06)` + soft brand vignette.
2. **Top scrim** — navy→transparent gradient so the white logo reads over bright shots.
3. **Persistent logo** — `ecomiq-logo-white.svg`, top-left, ~146–152px, drop-shadow.
   Eases in at the top, fades out into the end-card crossfade.
4. **End card** (~2.6s) — navy brand gradient + blue→flame bloom, centered white
   EcomIQ logo + flame CTA pill **"Join our Free Profitability Bootcamp →"**.
   Footage crossfades to the end card over 0.5s after speech ends.

Total duration 49.6s (47.0s footage + end card hold).

## Brand
Tokens: `assets/brand-tokens.css` (navy `#06284C`, flame `#FF4C32`, blue-tint,
white). Fonts: local `assets/fonts/RethinkSans.woff2` + `HedvigLettersSerif.woff2`
(named literally in CSS). GSAP vendored at `assets/vendor/gsap.min.js`. Full brand
reference: `assets/ecomiq/BRAND.md`.
