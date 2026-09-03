# ecomiq-bf-workbook, Design Spec

Black Friday ad promoting the free **Black Friday Profit Plan** workbook.
Sean's A-roll is the audio spine; motion-graphic number beats and a product
hero carry the visual; a branded end card closes it.

**Formats:** 9:16 (1080×1920) `index.html` · 1:1 (1080×1080) `compositions/square.html`
**Runtime:** 19.60s @ 30fps (588 frames) · Safe area ~10% margins.

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens in `assets/brand-tokens.css`; local fonts in `assets/fonts/`.

## This project's idea

- **Hook:** a record Black Friday can still leave you with almost no profit.
- **Message:** know what one order contributes, and what a discount really costs, before you set the offer.
- **CTA:** get the free workbook, link below.

## Structure

One source of truth. `index.html` holds the whole edit (structure, copy, clip
timings, and the GSAP timeline inline). `compositions/square.html` is
**generated** from it by `scripts/gen-square.sh`; every layout difference lives
in the `body.r-916` / `body.r-1x1` blocks of `assets/ad.css`, so the two ratios
cannot drift. Edit `index.html`, run the generator, lint, render both.

## Palette, 4 active hues, each owning one meaning

| Token | Hex | Meaning here |
|---|---|---|
| `--brand-navy` | `#06284C` | canvas |
| `--brand-blue-tint` | `#9CD4FF` | neutral figures, the number that matters |
| `--brand-flame` | `#FF4C32` | money leaving the business, and the CTA |
| `--brand-sky` / white | `#DEEEFE` / `#FFFFFF` | the product beat, the one light scene |

## Type

- **Rethink Sans** (local `.woff2`, weights 400–800). Headlines at −3% tracking, ~1.0 leading.
- **No italic-serif emphasis word.** The brand's Hedvig signature is deliberately not used in this cut, so the end-card headline reads as one flat white statement. The `.woff2` stays in `assets/fonts/` for other variants, but its `@font-face` is not declared here (no point embedding an unused face in every render).
- Named literally in CSS (`font-family: 'Rethink Sans'`), never via `var()`, or the linter false-warns.
- Figures use `font-variant-numeric: tabular-nums`.

## Motion

- GSAP vendored locally (`assets/vendor/gsap.min.js`). No CDN, no render-time fetches.
- **Every beat change is a crossfade.** A graphic scene is an opaque panel over the A-roll, so fading it up dissolves Sean into it and fading it down dissolves back to him: no cut, nothing to hide. 0.30s in, 0.27s out, ending on the last frame the clip exists.
- **Workbook → end card overlaps.** It is the one boundary with no A-roll beneath (the video ends at 15.0333), so the card fades up on top while the workbook holds opaque under it, and `#gfx4`'s clip runs on to 15.1667. Fading out with nothing underneath would reveal bare canvas.
- Each scene's first entrance fires **on** its `data-start`, never after, or the dissolve lands on an empty frame.
- The logo lockup swap and the vignette ramp run over the **same windows** as the dissolves beneath them, so they track together instead of flipping against a half-faded ground.
- Persistent logo watermark top-left (16% width) in a positioned **non-clip** wrapper; it flies to centre and scales up to become the end-card hero. White lockup on navy, navy lockup on the light beat.
- Vignette + deterministic CSS film grain over every scene: that texture is what makes it one piece.
- Finite repeats only (`repeat: -1` breaks the capture engine), and every tween ends at or before 19.6s so `tl.duration()` matches `data-duration`.

## Numbers on screen

Every figure is the workbook's own worked example (Part 01, pages 8 and 10),
labelled `EXAMPLE` with its source in micro-type. Nothing is invented, and no
performance claim is made. See `EDIT-PLAN.md` §4.

## What NOT to do

- Don't reintroduce the italic-serif emphasis word; the end-card headline is flat white sans by direction.
- Don't introduce a hot accent other than flame orange.
- Don't reset big-headline tracking to 0 (brand is −2%, this piece uses −3% on display sizes).
- Don't use `→` (U+2192): it is **absent** from both brand font subsets and falls back or renders as tofu. The `#g3-arrow` arrow is drawn in CSS. `↓ − × ·` are all present.
- Don't hand-edit `compositions/square.html`; regenerate it.
- Don't place the product renders on a pure-white canvas: they are photographs on an off-white ground (`#EEEEEF` / `#FDFDFE`), not cut-outs, so their frame edges show as grey boxes. They are presented as rounded cards with a navy shadow.
