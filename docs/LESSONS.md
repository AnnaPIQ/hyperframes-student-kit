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
- **Scaling a `<video>` (or its wrapper) in the browser softens footage badly.** Chrome
  resamples with a soft filter: even a 0.996x scale threw away ~45% of fine face detail,
  and the shipped three-changes master kept only 36% of the camera's detail. Final
  encode (CRF 15) and an H.264 CRF 14 prep cost almost nothing by comparison. **Fix:**
  bake every crop, reframe and punch-in into the footage with FFmpeg Lanczos
  (`scale=...:eval=frame` + `crop` with time expressions) at the exact output size, and
  show `<video>` 1:1 with no transform. Render with `--video-frame-format png`. Example:
  `video-projects/three-changes-ad/scripts/prep-aroll-framed.sh`.
- **How to check a master for softness:** grab the same frame from the source, crop and
  Lanczos-scale it to the identical framing, then compare Laplacian variance (fine-detail
  energy) of a face crop. SSIM is unreliable here because sub-pixel misregistration of the
  reference drags it down most on the *sharper* image.

## Footage & A/V sync

- **Talking-head lips out of sync.** Source recordings often have a ~0.2s audio start
  offset that the engine drops. **Fix:** advance the video ~0.16s relative to audio so
  lips match (tune per clip).
- **Measure sync, don't eyeball it.** Camera MOVs carry an audio `start_time` (0.079 s on
  the three-changes A-roll) that is lost once the VO plays as its own `<audio>` clip, and
  `<video>` `data-media-start` landed one source frame early. Net result: voice 100 ms
  ahead of lips. **Fix:** (1) cross-correlate the render's audio envelope against the
  source audio to get the audio offset; (2) frame-match rendered frames against the
  prepped clip, run through the same scale and crop, to get the video offset; (3) set the
  VO `data-media-start` so the two agree. Scripts: `video-projects/three-changes-ad/scripts/`.
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

## Source footage from Google Drive

- **ffmpeg can't open a large Drive video by URL ("Invalid data found").** Streaming a
  big file straight from `drive.usercontent.google.com` fails intermittently through the
  proxy. **Fix:** `curl -r 0-70000000` the first ~70 MB (moov is at the front on camera
  MP4s) and cut from the partial file. Small files stream fine.
- **Studio A-roll VO arrives very quiet (about -37 LUFS) and the music bed buries it.**
  **Fix:** `highpass=f=70,acompressor,loudnorm=I=-15:TP=-1.5` on the VO during prep, music
  at `data-volume` 0.1 (about 19 dB under). Check the mix with `ebur128` (aim -14 LUFS).
- **Landscape A-roll into 9:16: guessing the face x from a thumbnail put Sean too far
  right.** Render a draft, measure the face position in the frame, back-solve the wrapper
  `x`, and prep the crop wider than the tightest framing needs so every punch-in still
  covers the full 1080 width.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
