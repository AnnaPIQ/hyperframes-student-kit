# LESSONS — cross-session knowledge base

Hard-won fixes and gotchas pooled from every video build in this workspace. **Read
this before building** (it's faster than rediscovering a render bug), and **append to
it** whenever you hit-and-fix something new. This is how the studio gets more
efficient over time instead of relearning the same lessons.

> Format: each entry is **Symptom → Fix** with where it bites. Keep it terse.

---

## CLI / install (cloud container)

- **`npx hyperframes <cmd>` exits 1 with NO output.** The `hyperframes` npm package pulls
  `onnxruntime-node` (the offline Whisper engine), whose **postinstall binary download is
  proxy-blocked (ECONNRESET)**. That aborts the whole install, so `npx` never runs the CLI
  and dies silently. **Fix:** install once with scripts skipped —
  `npm install --no-save --ignore-scripts hyperframes@0.7.26` — then call the local binary
  directly: `node node_modules/hyperframes/dist/cli.js <lint|render|...>`. `lint`/`render`
  don't need ONNX; only `transcribe` does (so transcription stays unavailable — caption from
  the script + `silencedetect`, per the transcriber lesson below).
- **Pulling a raw clip from a Google Drive share link:** `curl -sSL "https://drive.google.com/uc?export=download&id=<FILE_ID>" -o out.bin` works for reasonably-sized files without auth; the Google Drive MCP tools may fail with a permission-stream error in this env. Verify with `file`/`ffprobe` (it lands as .mov/.mp4).

## Caption / graphic timing (sync)

- **`ffmpeg silencedetect` gaps are NOT reliable word onsets — they drift 3–5s and cause
  "graphics don't match the audio."** Mapping which gap = which word is guesswork and was
  wrong by ~4.5s on a talking-head (placed the "more ads" beat at 16s when the VO says it at
  11.6s). **Fix:** get real word-level timestamps with `faster-whisper` (installs via pip,
  model downloads from HF through the proxy — works even when the CLI's onnxruntime path is
  blocked):
  `pip3 install -q faster-whisper` then
  `WhisperModel("base.en","cpu","int8").transcribe(f, word_timestamps=True)` → print
  `w.start w.end w.word`. Place every synced graphic/caption against those numbers. Save the
  dump next to the asset (e.g. `assets/word-timings.txt`).

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
- **Muted `<video>` + separate `<audio>` sibling (same file) can drift lip-sync.** The
  two tracks are seeked independently at render time, so any per-element offset shows as
  the audio leading/lagging the mouth (bit us worst on a 9:16 recut). **Fix:** drop the
  sibling `<audio>` and let the video carry its own track — `<video ... data-has-audio="true"
  data-volume="1">` with the `muted` attribute REMOVED (lint `video_muted_with_declared_audio`
  will flag it otherwise). One element = frames and audio are inseparable. Note this
  overrides render-contract rule 5's "video must be muted" — that rule is for the
  sibling-audio pattern; `data-has-audio` is the exception.
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

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
