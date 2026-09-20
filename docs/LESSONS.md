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

## Audio & transcription

- **`<audio>` without an `id` renders SILENT.** Lint catches it as the
  `media_missing_id` *error*: "the renderer requires id to discover media
  elements". `class="clip"` is forbidden on media (rule 2) and `id` is
  mandatory — easy to write a comp that lints clean on structure but ships with
  no sound. Same applies to `<video>`. **Fix:** always `<audio id="vo" ...>`.
- **Encode a VO spine as PCM WAV, never AAC.** AAC carries encoder delay, so an
  m4a VO drifts a few ms against graphics keyed to word onsets. A 24s 48k mono
  WAV is only ~2.3MB. Verified: with WAV the rendered output's silence map is
  identical to the source's, zero drift over 24.6s.
- **Whisper word timings drift; silence onsets don't.** Over a 24s file
  `hyperframes transcribe` put words up to ~0.7s off (and ran its last word past
  the file's own duration). **Fix:** take sentence onsets from
  `ffmpeg -af silencedetect`, and to pin one exact word, cut a ~2s clip around
  it and re-transcribe just that — the offset within a short clip is reliable.
- **Verify A/V sync by re-running silencedetect on the *rendered* file** and
  diffing against the source's map. Cheaper and more certain than eyeballing.

## Pulling sources from Google Drive

- **Don't fetch large media through the Drive connector.** `download_file_content`
  returns base64 — a 35MB video becomes ~47MB of text and blows the context
  window. **Fix:** use the connector for metadata (confirms access, gives the
  real filename/mime), then pull the bytes with
  `curl -L "https://drive.google.com/uc?export=download&id=<FILE_ID>" -o out.mp4`.
- **Probe before planning.** A montage delivered as "the 9:16" and "the square"
  may not be the same framing — the 1440x1440 master of this reel was genuinely
  *wider*, keeping on-screen stat text that the vertical crops off.

## Editing technique (montage under a VO)

- **Cut the montage in ffmpeg, layer graphics in HyperFrames.** Pre-building one
  frame-exact silent master per ratio beats wiring 24 `<video>` elements: it is
  deterministic, keeps the comp to a single video element, and the shot table
  stays reviewable in one script.
- **Respect the source's own cut points.** Detect them with
  `select='gt(scene,0.25)',metadata=print`, then never let a chosen segment run
  past its shot's end or you get a 2-3 frame flash of the next shot. Build a
  labelled contact sheet of every detected shot first — sampling at `fps=1`
  mis-maps content when the reel cuts faster than 1s.
- **A too-short anchor shot can be stretched rather than dropped.** A 0.57s
  static graphic card slowed to 1.00s (`setpts`) held a whole VO beat with no
  visible artefact.

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
