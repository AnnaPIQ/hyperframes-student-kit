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

- **Talking-head lips out of sync.** Source recordings often have the voice ~0.2s AHEAD of the lips
  (camera audio stream offset that gets dropped on extract). **Fix:** take the picture LATER than the
  audio timecode (advance the video ~0.16-0.20s; tune per clip). **Measure, don't eyeball:** single-frame
  "mouth opens here" checks gave the wrong sign once. Use face-landmark mouth opening vs voice envelope
  cross-correlation (`video-projects/get-the-second-sale/scripts/measure-lipsync.py`, MediaPipe face
  landmarker; needs `apt-get install libegl1 libgles2`). Target: best lag within +/-40ms on the RENDER.
- **Phone / vertical b-roll imports rotated.** **Fix:** rotate 90° CW during prep
  (`ffmpeg -vf "transpose=1"`).
- **Offline transcriber can't run (model download egress-blocked).** Some environments
  block the Whisper model download. **Fix:** caption from the known script text and
  anchor timing via silence analysis instead of word-level timestamps.

- **Need word timings but `whisper-cpp` is missing (cloud container).** `pip install faster-whisper`
  works and the `small.en` model downloads fine. If `transcribe()` throws
  `open() got an unexpected keyword argument 'metadata_errors'` (PyAV version clash), extract
  16 kHz mono WAV with ffmpeg and pass a numpy float32 array instead of a path. Cross-check
  gaps with an RMS level profile: it caught two script lines that were never actually recorded.
- **Google Drive public downloads hit "Quota exceeded" after a few large files.** Streaming
  ffmpeg seeks over `drive.usercontent.google.com` fire many range requests and burn the
  quota fast (the response becomes a small HTML page, so ffmpeg reports "Invalid data").
  **Fix:** download each clip once with `curl` sequentially, grab frames locally, delete;
  pass `-nostdin` to ffmpeg inside `while read` loops. Check the first bytes for `<!DOCTYPE`.
- **B-roll index sheets can carry swapped links.** Always confirm the actual filename
  (`curl -sI` shows `content-disposition`) and duration against the row label and timecode
  before trusting a pick, especially for client-proof footage.

- **Landscape stage footage in a 9:16 crop loses the subject when they walk.** A 608x1080 crop
  from 1080p is tight; use a time-based crop (`crop=608:1080:'min(1312,456+t*520)':0`) to pan
  with the speaker, and check for the clip's own camera cuts with
  `select='gt(scene,0.15)',showinfo` before choosing an in-point.

- **"The video looks degraded."** Draft renders are CRF 28 and visibly soft; never hand one over as
  the deliverable. Masters: near-lossless intermediate plate (`-crf 8 -preset slow`), then
  `hyperframes render --quality delivery --crf 12 --video-frame-format png` (the default `auto`
  can pull video frames as JPEG). Result for a 35s 1080x1920 ad: ~19 Mbps H.264 High, ~80MB.
- **Removing markup with a non-greedy regex deleted the wrong elements.** A pattern ending in
  `</div>\n      </div>\n\n` ran past the target block and silently removed two later cards; their
  tweens kept running against nothing (no lint error). **Fix:** after any bulk removal, diff element
  ids against the last good commit and assert every `'#id'` the timeline targets still exists.

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
