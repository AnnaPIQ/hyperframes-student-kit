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

## Multi-format projects (one composition, several aspect ratios)

- **Two root-level HTML files with a `data-composition-id` = duplicated, layered audio.**
  The runtime discovers *every* root-level composition as an entry point, so shipping
  `index.html` + `ad-4x5.html` plays the voiceover twice. Lint catches it as
  `multiple_root_compositions`. **Fix:** keep exactly one root composition and
  generate each ratio into `index.html` in turn, rendering before the next is written
  (see `video-projects/ecomiq-cro-short/scripts/render-all.sh`). Verify afterwards by
  correlating the rendered audio envelope against the source — a single, un-layered
  copy gives correlation 1.0000 and an amplitude ratio of 1.000.
- **`../assets/...` from inside `compositions/` 404s in Studio.** Renders rewrite the
  path, but Studio and other live consumers resolve against the *project root*.
  **Fix:** always use root-relative paths (`assets/...`), whatever directory the
  composition file sits in. Lint flags it as `invalid_parent_traversal_in_asset_path`.
- **Two `<img>` with the same src + start + duration trip `duplicate_media_discovery_risk`.**
  Hit when the same logo is used as both a corner bug and a hero lockup. **Fix:** point
  one at a different file (e.g. the `.png` for the small corner instance, the `.svg`
  for the large one) — quality-neutral when the raster is oversampled.

## Transcription & sync

- **Whisper timestamps can run past the end of the audio.** On a 21.60s file the
  offline model reported 22.94s and placed a word onset 0.36s inside a silence.
  **Fix:** never take a word time on faith for a hard cut. Anchor it against measured
  audio energy (RMS over ~10ms windows) and use the real onset. Whisper's *ordering*
  is reliable; its absolute tail timing is not.
- **`hyperframes doctor` can report FFmpeg as broken when it works.** The startup hook
  showed `✗ FFmpeg Failed to run ... -version` while `ffmpeg -version` returned 0 and
  every filter ran fine. **Fix:** confirm with `ffmpeg -version` before believing the
  doctor and chasing an install.

## Retimes & frame-accurate cutdowns

- **Express cutdowns in FRAMES, not seconds.** Round every in-point and length to
  `1/fps` up front and let the script convert; deriving times from floats mid-pipeline
  drifts cuts off the grid and lands them a frame either side of the word.
- **`xfade` shortens the output by its own duration, which shifts every later cut.**
  To cross-dissolve without moving the timeline, give the *incoming* segment an extra
  head of exactly the transition length and set `offset = (running_length - xfade)/fps`.
  With a retimed shot, the head must be `xfade * src_len / out_len` source frames so it
  still lands as `xfade` frames of output.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
