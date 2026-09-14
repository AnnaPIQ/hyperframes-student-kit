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

## Source media & footage prep

- **Google Drive files over ~100MB can't come through the Drive connector.**
  `download_file_content` returns base64, so a 2.6GB `.mov` is a non-starter. **Fix:**
  for an "anyone with link" file, `curl` the interstitial
  (`https://drive.google.com/uc?export=download&id=<ID>&confirm=t`), parse the
  virus-scan form for its `uuid`, then fetch
  `https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t&uuid=<UUID>`.
  Verify with a `-r 0-500000` range request before pulling gigabytes.
- **Never trust a brief's stated runtime — probe the file.** A "~50s" A-roll was 43.08s
  with a 1.4s silent lead-in and an off-take tail, which moved every downstream beat and
  made the briefed end-card timing unreachable. **Fix:** `ffprobe` duration + a
  `silencedetect` pass before writing any timings, and raise the delta before building.
- **`ffmpeg -v error` silently suppresses `silencedetect`/`volumedetect` output** — those
  filters log at info level, so you get an empty result and assume "no silence found".
  **Fix:** drop `-v error` (or use `-loglevel info`) when reading filter metadata.
- **`silencedetect` is the cheapest way to cut on speech.** Map phrase gaps once
  (`-af silencedetect=noise=-45dB:d=0.3`), align them to the transcript, and place every
  cut in a gap. Nothing lands mid-word and the edit stays in sync for free.
- **A 16:9 talking head scaled+padded into 9:16 is an unusable letterbox strip.**
  **Fix:** centre-crop instead. From a 4K source neither 9:16 (1215×2160) nor 4:5
  (1728×2160) upscales, so cropping costs no resolution. Check where the subject sits
  before assuming a centre crop works.
- **Studio product shots on a white sweep read as a white box pasted on a navy canvas.**
  **Fix:** floodfill the background out (`convert in.png -fuzz 14% -fill none -floodfill
  +0+0 white`) so the product floats — but only when the subject has no white interior
  elements. On a shot full of white worksheets the fill bleeds through and eats holes in
  the paper; frame those as rounded white cards with a shadow instead.

## Multi-ratio deliverables

- **A second root-level composition file fails lint** (`multiple_root_compositions` — the
  runtime discovers both entry points and double-plays audio). **Fix:** keep one
  `index.html`, put the alternate ratio in `compositions/`, and render it with
  `--composition compositions/<name>.html`. Asset paths there resolve from the *project
  root*, so `assets/…` references carry over unchanged.
- **Don't hand-maintain two ratios.** Generate the second from the master with a script
  that swaps frame size, composition id and media source, then appends a geometry-only
  override block. Structure, timings and copy can then never drift apart.
- **Lint catches two GSAP traps worth knowing:** a second `fromTo` on the same target
  needs `immediateRender: false` (otherwise the last-authored "from" becomes the resting
  state for earlier seeks), and an exit tween that ends exactly on the next clip's start
  boundary needs an inner non-`clip` wrapper carrying the tween plus a `tl.set(...)` hard
  kill.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
