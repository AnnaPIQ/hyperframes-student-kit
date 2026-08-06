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

## Multi-format standalone comps (one project, several roots)

- **Comps under `compositions/` must use ROOT-relative asset paths (`assets/...`), not
  `../assets/...`.** Even though the file lives one level deep, Hyperframes serves every
  composition with the project root as its base URL. `../assets/` renders (it's rewritten
  per source path) but lint errors `invalid_parent_traversal_in_asset_path` and Studio
  preview 404s. Use `assets/…`, `assets/vendor/gsap.min.js`, etc. everywhere.
- **Render a specific format with `render --composition compositions/<file>.html`.** A
  full-doc standalone comp (its own `<!doctype html>` + timeline) renders as a root via
  `-c`; only `<template>`-wrapped sub-comps must be embedded from `index.html`. `lint`
  needs `index.html` to exist — mirror the primary format into it (root-relative paths).
- **Independent full comps in one project don't cross-flag audio.** Same track-4
  `<audio>` at 0–47s in `index.html` + two comps lints 0/0 as long as paths match; a
  path-prefix mismatch (`assets/` vs `../assets/`) is what triggered a spurious
  `duplicate_audio_track` warning.

## Footage-forward vertical (talking-head, no captions)

- **Phone selfies are stored rotated.** A "1920×1080" HEVC source with a rotation flag is
  really a 1080×1920 portrait — `ffprobe` shows the raw stream dims, but `ffmpeg` auto-
  applies the display matrix on decode. Extract one frame to check orientation before
  choosing a crop. Native portrait fits 9:16 with zero cropping.
- **One prepped clip → both verticals.** Re-encode the portrait master once (muted H.264,
  trim head/tail dead-air via `silencedetect`), then let CSS do the reframe: 9:16 is
  `object-fit: cover` full-bleed; 4:5 is the same video cover-cropped with
  `object-position: center 32%` (keeps face + headroom). Preview the 4:5 crop with
  `ffmpeg -vf crop=1080:1350:0:182` on a source frame — no full render needed to check it.
- **White corner logo needs a scrim on bright shots.** A top navy→transparent gradient
  band + a logo `drop-shadow` keeps a persistent white logo legible over windows/sky.
- **`doctor` false-negatives FFmpeg in this container.** It reported "FFmpeg failed to
  run" while `ffmpeg -version` and every encode worked fine. Trust a direct `ffmpeg`
  invocation over the doctor line.

## Fetching source footage from Google Drive (no base64 into context)

- **Don't pull a video through the Drive MCP `download_file_content`** — it returns
  base64 into context and blows it up. For a link-shared file, download straight to disk:
  `curl -sL "https://drive.usercontent.google.com/download?id=<FILEID>&export=download" -o out.mp4`
  (handles the >25MB confirm gate; `get_file_metadata` first to size it).

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
