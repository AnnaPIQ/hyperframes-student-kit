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

- **Elements visible before their cue (e.g. checkmarks showing early).** Two `fromTo`s on
  the same target: the last-authored one's from-values win at load (immediateRender).
  **Fix:** `immediateRender: false` on every later `fromTo` for that target.
- **Lint `video_nested_in_timed_element`.** A `<video>` with `data-start` inside a timed
  (`class="clip"` + `data-start`) wrapper extracts the wrong frames. Make the wrapper a plain
  non-timed div and animate its opacity/transform with GSAP instead.

## Layout

- **Nested spans collapse on top of each other** when a rule like `.slot span
  { position:absolute }` also matches inner styling spans (an orange word inside a line).
  Use the child combinator: `.slot > span`.

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

- **Floating-head cutout: use the built-in `npx hyperframes remove-background`.** It writes
  alpha WebM that renders correctly in a `<video>` (verified, bf-webinar-ad). CPU only:
  ~1.8s/frame at 1080x1920, so a 36s A-roll is ~12 min plus encode. Choke the matte 1px
  (`alphaextract,erosion,gblur=sigma=1.2` → `alphamerge`) to kill the wall halo.
- **Matte grabs background text next to the subject (e.g. LED stats on a stage wall).**
  Erosion/opening and hard alpha thresholds don't remove it and eat the mic/hands.
  **Fix:** zero alpha on the text's hue (pink: b-g>22 & r-g>22; neutral white only in the
  head band), then drop detached islands (`video-projects/bf-webinar-ad/scripts/clean-matte.py`).
- **Hair-edge colour spill from monitors behind the speaker** (purple/green fringes) is
  inside the opaque hair region, so an edge-band despill does nothing. Fix at the shoot:
  plain wall behind the speaker. Otherwise it needs a manual roto pass.
- **Phone lav A-roll can arrive at -37 LUFS.** Two-pass `loudnorm` to -14 LUFS / -1.5 dBTP
  (with a gentle `highpass` + `acompressor` first) before it goes in the comp.
- **Google Drive "anyone with link" files download directly** with
  `curl -L "https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t"`
  (the Drive MCP base64 download is unusable for 300MB+ video).

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

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
