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

## B-roll / video clips in compositions

- **Symptom → Fix: render dies at ~30% with `[Parallel] Capture failed: Worker N:
  Runtime.callFunctionOn timed out` + `REQUESTFAILED ... resource=media
  net::ERR_ABORTED` for the .mp4s.** The clips had sparse keyframes (default GOP →
  max keyframe interval ~5s). The capture engine seeks `video.currentTime` per frame;
  with sparse keyframes every seek re-decodes from far back, stalls, and blows the
  300s protocol timeout. **Re-encode b-roll with dense keyframes:**
  `ffmpeg -i in.mp4 -an -vf "scale=1080:1920" -c:v libx264 -crf 21 -g 10 -keyint_min 10 -sc_threshold 0 -r 30 -movflags +faststart out.mp4`.
  The render also prints this exact warning during `video_extract` — don't ignore it.
- **Symptom → Fix: phone footage renders rotated 90° even though the crop looked right.**
  Some clips are portrait content stored in a landscape container with NO rotation
  metadata (ffprobe shows 3840×2160, no side_data). Auto-rotate won't fix it. Manually
  `transpose=1` (90° CW) then `scale=1080:1920`. Always pull one frame and `Read` it
  before trusting a crop.
- **Video inside a sub-composition** needs `id` + `data-start`/`data-duration`/
  `data-track-index` + `muted` (NO `class="clip"`). Without `id` the renderer can't
  discover it and freezes the frame (lint catches this).

## Sub-composition structure (lint-clean multi-beat projects)

- Wrap each sub-comp file in `<template id="<id>-template"> … </template>`; the inner
  root `<div>` carries `data-composition-id` + `data-start` + `data-duration` +
  **`data-width` + `data-height`** (omitting dimensions is a lint error).
- **Inner animated elements are plain divs** — do NOT give them `class="clip"` /
  `data-start` / `data-track-index`. Marking every inner element as a full-beat clip on
  the same track triggers `overlapping_clips_same_track` errors. Only the root (and
  `<video>`/`<audio>`) are timed; GSAP drives everything else.
- Index hosts use `<div class="beat-layer" data-composition-id="<id>"
  data-composition-src="…" data-start … data-duration … data-track-index … data-width
  data-height>` — NOT `<template>` (template hosts confuse the linter into reporting the
  root as missing id/dimensions/registry).
- Add `window.__timelines = window.__timelines || {};` at the top of every sub-comp IIFE.

## Asset ingestion (Google Drive, cloud container)

- **Symptom → Fix: `yt-dlp` Drive download fails with `CERTIFICATE_VERIFY_FAILED`** (the
  sandbox proxy uses a self-signed CA Python doesn't trust). `curl` trusts the system CA
  store, so use it instead. Helper: `scripts/gdrive-dl.sh <FILE_ID> <OUT>` handles the
  large-file virus-scan confirm token. The MCP Google Drive `download_file_content`
  returns base64 into context — unusable for video; always curl to disk.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
