# LESSONS — cross-session knowledge base

Hard-won fixes and gotchas pooled from every video build in this workspace. **Read
this before building** (it's faster than rediscovering a render bug), and **append to
it** whenever you hit-and-fix something new. This is how the studio gets more
efficient over time instead of relearning the same lessons.

> Format: each entry is **Symptom → Fix** with where it bites. Keep it terse.

---

## Render-breaking (these waste the most time)

- **GSAP from a CDN freezes the render / timeline never registers.** The render env's
  cert handling intermittently fails on `cdn.jsdelivr.net`, so `gsap.min.js` never
  loads and nothing animates (or the frame freezes). **Fix:** vendor GSAP locally and
  reference `assets/vendor/gsap.min.js`. The generator (`npm run new`) now does this
  automatically. Never use a CDN `<script>` for GSAP. *(Hit independently by multiple
  sessions.)*
- **Any render-time network fetch is non-deterministic and can fail.** Vendor
  everything — GSAP, fonts (local `.woff2`), images. No CDN scripts, no Google-Fonts
  `<link>` at render time. (Render contract rule 11.)

## Animation & visibility

- **`gsap.from()` on an element that starts at `opacity:0` leaves it invisible.** `from`
  computes the end state from the *current* (hidden) state. **Fix:** use
  `gsap.fromTo(el, {opacity:0, y:20}, {opacity:1, y:0})` for anything that begins hidden.
- **Lint warning `gsap_studio_edit_blocked` is benign** (appears in hyperframes ≥0.6.97
  for every registered timeline). It only means Studio can't drag-edit GSAP-controlled
  elements — which is correct for code-authored compositions. Survivable; don't contort
  the comp to silence it.

## Layout

- **Logo drifts / won't stay top-left.** The render engine repositions elements marked
  `class="clip"`. **Fix:** wrap the logo in a *positioned, non-`clip`* `<div>` and place
  the logo inside it.
- **Never animate `width/height/top/left` on a `<video>`** — the browser freezes the
  frame. Wrap it in a `<div>` and animate the wrapper. (Render contract rule 9.)

## Footage & A/V sync

- **Talking-head lips out of sync.** Source recordings often have a ~0.2s audio start
  offset that the engine drops. **Fix:** advance the video ~0.16s relative to audio so
  lips match (tune per clip).
- **Phone / vertical b-roll imports rotated.** **Fix:** rotate 90° CW during prep
  (`ffmpeg -vf "transpose=1"`).
- **Offline transcriber can't run (model download egress-blocked).** Some environments
  block the Whisper model download. **Fix:** caption from the known script text and
  anchor timing via silence analysis instead of word-level timestamps.

## Editing technique (talking-head cutdowns)

- **Hide every splice under a graphic, and cut on silence.** Silence-aligned cuts +
  placing motion-graphic overlays over the join make cutdowns feel seamless.

## Delivery & resolution

- **There is no 4:5 render "preset."** Ship the final via `--quality high` at the
  project's native size (e.g. 1080×1350). For Meta hi-res deliverables, also export 2×
  (2160×2700).
- **Preview localhost (3002) is unreachable from the browser on the web.** Use the
  render → frame-grab → `Read` loop instead. Live Studio works only on a local clone.

## AI b-roll model picks (mid-2026)

- **Default: Kling 3.0** for short social b-roll / animating product stills (~$0.10/sec,
  top realism-per-dollar). **Hero shots: Veo 3.1** (4K + native audio, ~$0.15/sec).
  **Budget/volume: Seedance 2.** Avoid Sora 2 (API deprecating Sept 2026).
- **Runway's API is a multi-model gateway** — one `RUNWAYML_API_SECRET` reaches
  `kling3.0_pro`, `veo3.1`, `seedance2`, `gen4.5`, etc. via `npm run gen --model <id>`.
  Keep Runway as the single integration; pick the model per shot.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

---

- **Sub-compositions are isolated documents — each needs its OWN local GSAP + fonts +
  root dimensions.** Loading a scene via `data-composition-src` lints/renders it as a
  standalone composition, so the linter throws `root_missing_dimensions`,
  `timeline_registry_missing_init`, and `font_family_without_font_face` if the sub-comp
  only has its scoped `<div>`. **Fix:** wrap each sub-comp in `<template id="<id>-template">`
  containing (a) `<script src="../assets/vendor/gsap.min.js"></script>` (note `../` — paths
  resolve relative to `compositions/`), (b) `@font-face` declarations pointing at
  `../assets/fonts/*.woff2`, (c) a root `<div data-composition-id ... data-width data-height>`,
  and (d) `window.__timelines = window.__timelines || {};` before the assignment. Pattern
  confirmed in `linear-promo-30s/compositions/`. *(revenue-up-bank-empty)*
- **Composition hosts in index.html are `<div>`s, not `<template>`s.** A bare
  `<template data-composition-src>` triggers `host_missing_composition_id` and cascades
  into spurious root errors on index.html. **Fix:** host with
  `<div data-composition-id="<id>" data-composition-src="..." data-start data-duration
  data-track-index data-width data-height></div>`. The `data-composition-id` must match
  the sub-comp's root id. *(revenue-up-bank-empty)*
- **`<video>`/`<audio>` with `data-start` but no `id` → FROZEN video / SILENT audio in
  renders** (lint error `media_missing_id`). The renderer discovers media by `id`. **Fix:**
  give every timed `<video>`/`<audio>` a stable `id`. (They still must NOT get
  `class="clip"`.) *(revenue-up-bank-empty)*
- **GSAP can't target CSS pseudo-elements (`::after`, `::before`).** A strikethrough/underline
  animated via `tl.to('.x::after', {scaleX:1})` silently no-ops. **Fix:** use a real child
  element (e.g. `<i class="strk">`) positioned absolutely and animate that. *(revenue-up-bank-empty)*
- **Talking-head 16:9 → 4:5 framed window:** pre-cut each on-camera beat into its own
  muted H.264 clip (`-an -r 30 -vsync cfr -pix_fmt yuv420p -vf scale=1080:-2`), reference
  each from index.html (paths stay simple), keep ONE continuous `<audio>` VO across the
  whole timeline, and cut to full-frame GFX sub-comps on a different track. Disjoint time
  ranges = clean hard cuts; the VO never breaks. *(revenue-up-bank-empty)*

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
