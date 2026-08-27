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


## Whip transitions between beats (opaque-plate pattern)

- **The incoming plate lands before its content starts → blank-frame flash.** A beat
  built as `slot(clip) > plate(opaque navy) > body(content)` wipes the plate up over the
  outgoing frame in ~0.25s, but if the body's first element tween starts at 0.05–0.15s
  the plate arrives on an empty frame. **Fix:** every beat's *first* element enters at
  local `0`. Grab a frame at each seam and look — lint cannot see this.
- **Cross-whipping two graphic beats empties the frame.** Lifting the outgoing body out
  while the incoming body slides in leaves ~6 frames of bare canvas, because the
  incoming elements have not entered yet. **Fix:** hold the outgoing beat in place and
  wipe the incoming beat's opaque plate over it. Only wipe *bodies* when something
  opaque is already covering the frame.
- **A sliding opaque panel reads as a panel, not a whip.** Add a blurred light streak
  (`opacity: 0` at rest, tweened 0→1→0 over ~0.2s) pinned to the plate's leading edge.
  Cheap, and it turns the slide into a whip.
- **Never blur the opaque plate itself** — `filter: blur()` makes its edges translucent
  and the footage underneath shows through. Blur the inner content wrapper instead and
  slide the plate with `y` only.
- **Cut founder clips with pre/post-roll at every seam.** ~0.30s head + 0.35s tail means
  the adjoining graphic plate always has live footage to wipe over instead of bare `#bg`.

## Transcription & A/V alignment

- **whisper.cpp `small.en` word *ends* are unreliable; word *starts* are solid.** It
  stretches the opening words backwards into leading silence (a clip whose first audible
  word is at 2.08s reported it at 0.02s). **Fix:** anchor cuts to word *starts*, and
  cross-check the whole track against `ffmpeg -af silencedetect=noise=-30dB:d=0.3`. If
  the two agree within ~0.15s across the timeline, the timebase is trustworthy — then
  take the measured speech onset over Whisper's for the very first word.
- **`npx hyperframes transcribe` provisions whisper.cpp itself** (builds from source +
  downloads the model, several minutes on first use) even when `doctor` reports
  `whisper-cpp Not found`. Run it before assuming transcription is unavailable.

## Tooling gotchas

- **`hyperframes doctor` can false-negative on FFmpeg.** It reported "Failed to run
  /usr/bin/ffmpeg -version" on a container where ffmpeg 6.1.1 worked perfectly. Verify
  with `ffmpeg -version` before installing anything.
- **Don't wait on a render by testing for the output file.** The previous render's MP4
  sits there until the new one is nearly done, so the check passes instantly and you
  verify stale frames. **Fix:** wait on file-exists AND `! pgrep -f "hyperframes render"`,
  or compare mtime.
- **Lint (≥0.8.15) errors on `../assets/...` in sub-compositions**
  (`invalid_parent_traversal_in_asset_path`). Compositions are served with the *project
  root* as base URL — use root-relative `assets/...` even from `compositions/`.
- **Lint rejects animating `letterSpacing`** (`gsap_non_transform_motion`) — it reflows
  text and snaps glyphs under the seek-by-frame capture engine. Use `scaleX` for the
  same spread-in feel, or hold the value statically.
- **Repeating a logo set to fill a drifting wall trips `duplicate_media_discovery_risk`.**
  Re-grid so one pass fills the track (e.g. 2 columns × 230px rows covers 1350px + drift)
  instead of listing the same 21 marks twice.

## Layout

- **Text over a drifting logo wall needs its own scrim.** At 34% opacity the marks still
  cut straight through an eyebrow or a headline. Add radial navy gradients behind each
  text band plus a `text-shadow`; the top/bottom linear fades alone are not enough.
- **A strike-through on a flex child spans the flex width, not the text.** Wrap the words
  in a `position: relative; display: inline-block` span and anchor the rule to that, or
  it overshoots by however much room the flex item had.
- **Receding "stack" cards need to go well below 0.5 opacity.** At 0.5 half-legible text
  reads as a rendering bug; ~0.22 reads as depth.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
