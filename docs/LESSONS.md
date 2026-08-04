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
- **Phone selfie footage reads 1920×1080 in `ffprobe` but is actually portrait.** iPhone
  clips store landscape pixels + a `rotation=-90` display-matrix flag, so `ffprobe
  stream=width,height` says `1920×1080` and a naive landscape center-crop grabs ceiling/wall
  with the face sliced off. **Check first:** `ffprobe -select_streams v:0 -show_frames
  -read_intervals "%+#1" -show_entries frame_side_data=rotation`. If it's `-90`/`90`, the clip
  is native **portrait 1080×1920** — no crop needed for a 9:16 short. ffmpeg **auto-rotates
  before filtering** by default, so any `trim`/`xfade` graph outputs upright portrait with the
  flag baked out (verify with a dims probe on the result). Grab a real frame and *look* before
  committing a crop math.
- **Handheld talking-head cutdown with "no graphics" still needs a smooth join.** When the brief
  forbids b-roll/motion-graphics you can't hide a splice under an overlay — but a short (~0.3s)
  **cross-dissolve** between the two face segments (video `xfade=fade` + audio `acrossfade`) masks
  the background/hand jump and stays "full-frame talking head throughout." Cut on real silences
  (find them with `silencedetect=noise=-34dB:d=0.18`), not whisper word-ends.
- **Offline transcriber can't run (model download egress-blocked).** Some environments
  block the Whisper model download. **Fix:** caption from the known script text and
  anchor timing via silence analysis instead of word-level timestamps.

## Editing technique (talking-head cutdowns)

- **Hide every splice under a graphic, and cut on silence.** Silence-aligned cuts +
  placing motion-graphic overlays over the join make cutdowns feel seamless.
- **White logo vanishes on light backgrounds.** A persistent white corner logo disappears
  when the handheld background swings to a bright white wall. **Fix:** seat it on a soft,
  feathered top-left navy scrim (put the gradient on a *full-bleed* `inset:0` overlay clip so
  the render engine can't drift it — small positioned clips drift, full-bleed ones don't) +
  a subtle `drop-shadow` on the logo. Reads on both dark brick and white wall.
- **Verify A/V sync by cross-correlating, not by eyeballing stills.** Extract the rendered
  audio + the clean master at 16 kHz mono, envelope-correlate over ±0.5s. <1 frame (33ms) lag
  = engine preserved sync, no offset comp needed. Frame stills can't show lip-sync; this can.

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
