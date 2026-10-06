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
- **`tl.fromTo()` with a VISIBLE start state renders that state at t=0.** fromTo defaults to
  `immediateRender: true`, so e.g. a pulse ring `fromTo({opacity:0.9},{opacity:0}, 7.4)` sits on screen
  from frame 0. **Fix:** pass `immediateRender: false` on any fromTo whose start state is visible.
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

- **Moving a talking-head wrapper (y offset) exposes the plate's top edge** as a dark band once the
  room is visible. Keep every preset's transform covering the full canvas, or only offset while the
  room is fully replaced.

- **Talking-head lips out of sync.** Source recordings often have a ~0.2s audio start
  offset that the engine drops. **Fix:** advance the video ~0.16s relative to audio so
  lips match (tune per clip).
- **Phone / vertical b-roll imports rotated.** **Fix:** rotate 90° CW during prep
  (`ffmpeg -vf "transpose=1"`).
- **Offline transcriber can't run (model download egress-blocked).** Some environments
  block the Whisper model download. **Fix:** caption from the known script text and
  anchor timing via silence analysis instead of word-level timestamps.

## Editing technique (talking-head cutdowns)

- **Cut-out talker without alpha video.** Matte the head-trimmed A-roll with `rembg`
  (`isnet-general-use` keeps hair + the mic; ~1 s/frame at 600 px on CPU), then bake the subject over
  the flat brand navy with ffmpeg (`alphamerge` + `overlay`, `tmix` 3-frame smoothing, `gblur` 1.4 feather).
  Stack that composite over the plate in one wrapper: crossfading its opacity reads as "room fades to navy"
  with Sean frame-identical. No alpha codec, no sync risk.
- **Talker looks away at the end of the take.** Freeze the last good frame with
  `tpad=stop_mode=clone:stop_duration=N` (note: `-t` must not sit on the output side or the pad is cut off).
- **Phone B-roll from Drive is 4K landscape with no rotation flag**: `transpose=1` on prep. Check sponsor
  slides/stats behind the speaker before putting a claim over event footage.

- **Hide every splice under a graphic, and cut on silence.** Silence-aligned cuts +
  placing motion-graphic overlays over the join make cutdowns feel seamless.

## Delivery & resolution

- **Drive "quota exceeded" on direct downloads** comes back as a 2 KB HTML page saved as `.mp4`. Retry a
  couple of hours later, one file at a time. ffmpeg cannot read these Drive URLs directly; download with curl.
- **Never commit client footage/B-roll/VO pulled from Drive.** Gitignore the project's `assets/media/`
  (plates also exceed GitHub's 100 MB limit). Commit only the composition code.

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
