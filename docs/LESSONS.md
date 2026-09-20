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

## Composition authoring (clip lifecycle)

- **A clip pops fully-formed for one frame before its entrance tween.** A clip is
  inserted into the DOM at `data-start` wearing its CSS defaults, so an entrance
  that begins even 0.02s later lets one 30fps frame render the finished element
  before it animates in. **Fix:** lock the hidden state with
  `tl.set(sel, {...}, <exact data-start>)` for every graphic, then tween. Applies
  to anything the clip owns, including rails/containers you forgot to animate.
- **A GSAP counter must hold its START value in the HTML, not its end value.**
  `<div class="num">90</div>` flashes "90" before the count-up begins. Write `0`.
- **One root `index.html` per project — a second aspect ratio needs its own
  project folder.** `hyperframes lint` errors `root_composition_missing_html_wrapper`
  / "exactly one root index.html" if you add a second root to the same folder.
  Generate the sibling project's `index.html` from the first with a script so the
  two can't drift.
- **A generated `index.html` must literally begin with `<!doctype html>`.** Putting
  a "GENERATED — do not edit" banner comment *above* the doctype trips
  `root_composition_missing_html_wrapper`. Put the banner on the line after it.

## Legibility over footage

- **A white logo over bright footage needs a scrim, not just a drop-shadow.** Over
  a white storefront screenshot the lockup vanishes however heavy the shadow.
  **Fix:** a soft corner radial (`radial-gradient(... rgba(navy,.62) 0%, transparent 72%)`)
  behind it — invisible over dark footage, rescues the mark over bright.
- **A full-frame flash transition at 0.85 opacity white-outs two or more frames.**
  Peak ~0.55 over ~0.19s total (in 0.07s, out 0.12s) reads as a punch on the cut
  without blinding the viewer, and lets the incoming card rise out of its tail.

## Sourcing footage

- **Pull Drive media with `curl`, not the Drive connector's download tool.**
  `download_file_content` returns base64 into context — a 35MB MP4 becomes ~47MB
  of tokens. **Fix:** `curl -fsSL -o out.mp4 "https://drive.google.com/uc?export=download&id=<id>"`
  for link-shared files, then `ffprobe` it. Verify with `file` — an HTML response
  means the share permission changed.
- **Confirm two "different" masters really are different before re-planning the
  edit.** A 9:16 and a 1:1 export of the same reel look like different footage at
  the same timestamp because the reframe crops to a different subject. Compare
  frames at *identical* timestamps and check `nb_frames` — matching frame counts
  and matching scene-cut lists mean one shot map drives both.
- **`ffmpeg xfade` eats its transition duration out of the running total.** Each
  0.1s dissolve shortens the concat by 0.1s. Extend the outgoing segment by the
  transition duration per dissolve to land on an exact target length.

## Environment

- **`hyperframes doctor` reports FFmpeg and Chrome as failed on this container
  and is wrong.** Both are present and work — the probe times out under load.
  Run `ffmpeg -version` yourself before believing it and re-installing anything.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
