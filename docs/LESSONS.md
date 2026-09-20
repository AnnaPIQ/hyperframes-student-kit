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
- **Never animate `width/height/top/left` on a `<video>`**, the browser freezes the
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
- **Runway's API is a multi-model gateway**, one `RUNWAYML_API_SECRET` reaches
  `kling3.0_pro`, `veo3.1`, `seedance2`, `gen4.5`, etc. via `npm run gen --model <id>`.
  Keep Runway as the single integration; pick the model per shot.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

## Audio & voiceover

- **Renders come out silent even though the `<audio>` element is wired.** The renderer
  discovers media elements by `id`. An `<audio>` with `data-start` but no `id` is
  skipped entirely. **Fix:** always give media elements a unique `id`. Lint catches this
  as `media_missing_id`, treat it as a hard error, not a nit.
- **Client voiceovers arrive far too quiet.** A supplied VO measured -34.7 LUFS
  integrated, roughly 18 LU under social delivery. **Fix:** always `ffmpeg -af
  loudnorm=I=-16:TP=-1.5:LRA=11` on ingest and re-measure. Never assume a source is
  mixed for delivery.
- **Whisper word timestamps drift by up to 0.5s** and cannot be trusted to place a hard
  cut. **Fix:** use whisper for the *words*, then pin the onset with
  `silencedetect=noise=-34dB` plus an `astats` RMS-per-frame pass. Three agreeing
  methods before you commit a transition to a timestamp.
- **The written script may not match the recorded VO.** Transcribe before planning the
  edit, and report the discrepancy rather than cutting to the script you were handed.

## Editing technique (montage assembly)

- **`xfade` silently truncates when `offset` exceeds the first input's duration.** Concat
  across 7-8 shots loses up to a frame per shot, so a group built to a 6.20s target
  lands at ~6.00s and the next xfade offset overruns it. The output was 6.6s instead of
  17.3s with no warning at all. **Fix:** pin each group's length before the xfade:
  `concat=...,tpad=stop_mode=clone:stop_duration=0.5,trim=0:<target>,setpts=PTS-STARTPTS`.
  Then the offsets are exact.
- **Verify a shot table against extracted frames, not against scene-detect output alone.**
  Reading a cut list off `select='gt(scene,0.15)'` and pairing it with a contact sheet by
  eye shifted an entire 24-shot table by one shot. **Fix:** build the bed, contact-sheet
  it, and `Read` it before writing the composition.
- **Supplied reels often carry their own baked-in end card.** Probe the tail before
  treating the whole clip as b-roll, or the source's CTA pre-empts yours.

## Layout & composition (more)

- **A transition streak placed before the end card in the DOM is painted over by it.**
  The whip fired correctly and was completely invisible, so the transition read as a hard
  cut. **Fix:** put the streak element *after* whatever it transitions into.
- **Two `fromTo` tweens on one target corrupt its resting state.** GSAP applies from-values
  at authoring time, so the last-authored one wins for every seek before the tween runs,
  which matters because renders seek per frame. **Fix:** `gsap.set()` the baseline outside
  the timeline (not `tl.set(..., 0)`, which does not render on frame 0) and add
  `immediateRender: false` to each `fromTo`.
- **Sub-compositions resolve assets against the PROJECT ROOT, not their own folder.**
  `../assets/...` inside `compositions/*.html` renders fine but 404s in Studio preview.
  **Fix:** keep paths root-relative (`assets/...`) in sub-compositions too.
- **A white logo over light footage still reads** if the grade carries a top scrim
  (`linear-gradient(180deg, rgba(navy,.62) 0%, transparent 38%)`) plus a
  `drop-shadow` on the mark. Verified against pale wood and pink-wall shots.

## Environment (more)

- **`hyperframes doctor` reports FFmpeg as failed when FFmpeg is fine.** On this
  container `/usr/bin/ffmpeg -version` exits 0 and encodes correctly, but doctor still
  flags it. **Fix:** verify with a real encode (`ffmpeg -f lavfi -i testsrc=d=1 ...`)
  before believing the doctor and stopping work.
- **`hyperframes transcribe` clones and builds whisper.cpp then downloads a ~490MB
  model on first use.** Budget several minutes for the first transcription in a fresh
  container; it is cached at `~/.cache/hyperframes/whisper` afterwards.
- **Drive sources: do not pull video through the connector's `download_file_content`** —
  it returns base64 into context. **Fix:** get the id from `get_file_metadata`, then
  `curl -sL "https://drive.google.com/uc?export=download&id=<ID>"`.


---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
