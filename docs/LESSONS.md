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

## Media elements (render-breaking)

- **A timed wrapper `<div>` around a timed `<video>` shows the wrong source frames.** If
  both carry `data-start`, the frame extractor resolves the video's start from its own
  attribute while visibility uses the wrapper's window — they disagree and the clip plays
  the wrong footage, then vanishes partway through its slot. Lint calls it
  `video_nested_in_timed_element`. **Fix:** make each `<video>` a direct child of the
  stage and animate the video element itself. Transform/opacity/filter on a `<video>` is
  fine — it's `width/height/top/left` that freezes the frame (contract rule 9). If you
  needed the wrapper for a scrim, use one scrim layer for the whole runtime, z-ordered
  above the footage tracks and below the type.
- **`<video>`/`<audio>` with `data-start` but no `id` renders FROZEN / SILENT.** The
  renderer discovers media by id. Lint: `media_missing_id`. Always give them one.
- **Two `<img>` with the same `src` and no `data-start` trip `duplicate_media_discovery_risk`.**
  A logo used both as a persistent mark and inside a card counts. **Fix:** point the second
  instance at a different asset (a `.png` next to the `.svg`, or a different lockup).
- **Don't `clearProps: "filter"` if you tween `filter` again later.** GSAP can't
  interpolate from a computed `none` back into `blur(24px)`. Leave `blur(0px)` in place.
- **`repeat: -1` on a finite composition is a lint warning, and a real one** — the export
  clips to `data-duration`. Compute a finite repeat count that covers the slot.

## Working with client b-roll

- **Client "social cut" b-roll is usually full of burned-in marketing text** ("90 lb pull
  force magnet", dimension callouts, product name cards). It fights your own graphics.
  Run `ffmpeg -filter:v "select='gt(scene,0.18)',showinfo"` per clip to get the real cut
  list, then pull a frame from the *middle of each scene* and actually look at it.
- **Coarse contact sheets lie when the source cuts fast.** Sampling at 6 evenly-spaced
  points across a 40s clip that cuts every 0.7s shows you shots that aren't at those
  timestamps once you re-sample. Three clips got as far as a draft render on the strength
  of coarse samples and all three had to be replaced. Verify at scene midpoints, and
  verify the *trimmed* file before wiring it in.
- **Check the tail of a clip before using it** — client cuts usually end on their own
  logo card. A range that looked like in-cab driving was the end card.
- **Big Google Drive files:** the Drive MCP `download_file_content` returns base64, which
  is impractical past a few MB. For a link-shared file, GET
  `https://drive.usercontent.google.com/download?id=<id>&export=download`, parse the
  virus-scan form for its `confirm`/`uuid`, and re-request with those — a 2.3 GB ProRes
  pulled fine that way.

## Transcription & timing

- **Whisper's first few word timings are unreliable.** On a 39s VO the head words were
  crammed into one 2.1s "word" and started 1.4s before the actual speech onset.
  **Fix:** find real speech bounds with `silencedetect=noise=-32dB:d=0.35`, re-transcribe
  the head (and any hero block) as a *trimmed* segment, and add the offset back. Interior
  timings from the full pass are usually within ~0.15s — cross-check them against the
  silence boundaries rather than trusting them blind.

## Grade

- **Navy scrim + vignette + grain stack multiplicatively and will crush your footage.**
  What looks like a tasteful 0.5 scrim in CSS reads as murk in the render. Draft, pull
  frames, *look*, then tune. This build ended at scrim 0.34/0.12/0.30, vignette 0.44,
  grain 0.34 — and had to push grid/crosshairs *up* to 0.062 alpha because the unifying
  texture was invisible at 0.045.
- **Reserving the bottom 30% for subtitles pushes everything into the top third.** Content
  centred in the remaining band sits at 35% of frame and reads unbalanced. Centre the card
  band at ~43% instead — as low as it goes while keeping glyphs clear of the subtitle line.

## Diagnostics

- **`hyperframes doctor` reporting `FFmpeg  Failed to run` can be a false negative.**
  `ffmpeg -version` worked fine and every render succeeded. Check directly before chasing it.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*

- **Symptom:** the talent's opening breath-in is audible under the first card, but the
  A-roll is time-locked to the audio so trimming the head would shift every beat and
  force a re-cut of every A-roll segment.
  **Fix:** duck the breath in place instead of trimming — an `ffmpeg volume` expression
  with `eval=frame`, ramped in and out, attenuating just that window down to the room-tone
  floor (measure the floor first with `astats` at ~20 ms resolution and pick the gain so
  the breath's peak lands at or below it). Every timing survives untouched. Verify with
  `ebur128` before and after: if only sub-−45 dB material was touched, I / LRA / true peak
  come back identical, which is the proof that speech was not altered.

- **Symptom:** `ffmpeg -ss X -to Y -i src -vf "select='gt(scene,N)',showinfo"` reports no
  scene cuts at all — even at a threshold of 0.03, and even when a hard cut is plainly
  inside the range. A clip trimmed from that "single shot" then jumps to a different scene
  mid-beat.
  **Fix:** run the detection pass over the **whole file with no `-ss`**
  (`ffmpeg -i src -map 0:v:0 -filter:v "select='gt(scene,0.15)',metadata=print:file=-" -an -f null -`)
  and read the in/out points off that list. Seeking before the filter silently breaks it.
  This is the second time a beat has jumped mid-shot for this reason — always verify the
  trimmed file by eye as well, never the scene list alone.
- **Symptom:** the only usable take is shorter than the beat it has to fill.
  **Fix:** `setpts=<beat/take>*PTS` rather than moving the beat boundaries — a stretch up
  to ~1.15× is imperceptible on handheld footage and costs nothing, whereas retiming the
  beat shifts everything downstream of it.
