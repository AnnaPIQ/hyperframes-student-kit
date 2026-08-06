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

- **Sparse keyframes → frame freezing / seek failures during render.** Phone/camera
  recordings (and a plain `-crf` re-encode) land a keyframe only every ~8s, so the
  render engine's frame extraction warns `Video "<id>" has sparse keyframes` and can
  freeze frames — deadly on a talking head (frozen lips = A/V drift). **Fix:** re-encode
  footage with a dense, closed GOP: `-g 30 -keyint_min 30 -sc_threshold 0` (keyframe
  every 1s). Verify with `ffprobe ... -show_entries frame=key_frame,pts_time`.
- **Plosive "pops" (P/B popping the mic).** These are short low-frequency transients
  where the sub-160Hz band momentarily dominates the mid-band. Detect them by windowing
  a `lowpass=f=160` copy (`asetnsamples` + `astats` peak per 50ms) and flag windows where
  low-band ≫ mid-band (a vowel has strong low *and* mid; a pop is low-only). Kill each
  one surgically with a time-gated low-shelf: `bass=g=-20:f=180:enable='between(t,S,E)'`
  over a ~110ms window — drops the thump ~13dB while leaving the consonant's higher
  frequencies (so speech is untouched). `bass`/`equalizer` support the `enable` timeline.
- **Audio-only change → re-mux, don't re-render.** If a revision touches only the audio
  (video/overlays unchanged), swap the track into the existing final with
  `ffmpeg -i final.mp4 -i newaudio.m4a -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -shortest`
  instead of paying a ~10-min frame re-render. Also update the composition's `<audio>`
  asset so a future render matches the delivered file.
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
- **Two aspect ratios from one project = a second root comp under `compositions/`.**
  Keep 9:16 as `index.html`, add e.g. `compositions/ad-4x5.html` with its own root
  `data-width`/`data-height` and a unique `data-composition-id`, then render it with
  `npx hyperframes render -c compositions/ad-4x5.html`. Asset URLs inside a
  `compositions/` file stay project-root-relative (`assets/…`, NOT `../assets/…`) — the
  CLI serves the project root as the base. Give the second comp's tracks distinct
  indices (e.g. 10–13) or lint flags a cross-file `duplicate_audio_track`.
- **`renders/` is gitignored.** Deliverable MP4s must be copied to a tracked location
  (project root) to ship on the branch — the convention is `<name>.mp4` at the project
  root.
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
