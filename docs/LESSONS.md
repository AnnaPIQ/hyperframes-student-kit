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

- **Sub-composition asset paths must be root-relative, NOT `../assets/`.** The
  `/hyperframes` skill says "sub-compositions use `../`", but the linter errors with
  `invalid_parent_traversal_in_asset_path` and Studio preview 404s: compositions are
  served with the *project root* as their base URL. **Fix:** inside `compositions/*.html`
  write `assets/fonts/...`, `assets/vendor/gsap.min.js`, `assets/logo.svg` — plain
  root-relative, never `../assets/...`. (Renders happen to rewrite `../` per source path,
  but Studio/live consumers don't — so root-relative is the only form that works in both.)
- **Self-attribute-selector warnings (`composition_self_attribute_selector`).** Scoping a
  sub-comp's CSS/GSAP with `[data-composition-id='x'] .foo` fires this warning for every
  selector. **Fix:** give the sub-comp root a stable `id` (`<div id="x-root" ...>`) and
  scope via `#x-root .foo` instead. Clears all the warnings and reads better.
- **Portrait phone A-roll stored as 1920×1080 + `rotation=-90` metadata.** `ffprobe` shows
  landscape dims, but the display orientation is 1080×1920 vertical. **Fix:** run it
  through `npm run prep` (keep audio — no `--mute` for a VO/talking-head spine); the
  H.264 re-encode bakes the rotation so the output is truly 1080×1920. When grabbing
  verification frames, DON'T add `transpose=` — ffmpeg auto-applies rotation metadata, so
  a manual transpose double-rotates. HEVC A-roll should always be prepped to H.264 anyway
  (headless Chrome decodes it unreliably).
- **Full-frame cutaways over a talking-head spine: split the audio off the video.**
  Reference the same prepped mp4 as a muted `<video>` (spine) AND a sibling `<audio>` (VO)
  on separate tracks. Then branded cutaway cards on a higher track can cover the *picture*
  on the beats while the voice plays on uninterrupted underneath. Cutaways get a blur/scale
  reveal-OUT (the one place an overlay legitimately animates out — the video is the "next
  scene"). Give each ≥0.6s crisp hold; a 1.3s card with a staggered word-stack lands too
  late to hold — 1.6s reads much better.

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
