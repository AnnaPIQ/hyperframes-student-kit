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

## Brand assets

- **`ecomiq-logo-white.svg` renders as a garbled swirl (icon tile missing).** The SVG
  wraps the leaf mark in a `mask-type:luminance` mask; the render engine's rasteriser
  drops the white tile and keeps fragments of the leaf, so the lockup renders broken
  (rsvg fails on it too — it's the asset, not just one renderer). **Fix:** reference
  **`ecomiq-logo-white.png`** for anything that gets rendered. It's 1671×286, so it
  downscales cleanly to any on-screen logo size. The SVG is still fine for the web.

## Sourcing media from Google Drive

- **A big Drive file 404s / returns a 2 KB HTML page mid-download.** Drive rate-limits
  the *source-file* download of popular or large files ("Too many users have viewed or
  downloaded this file recently… up to 24 hours"). curl happily writes that HTML over
  your `.mov`. **Fix (VO/audio):** `yt-dlp -f ba/b "https://drive.google.com/file/d/<ID>/view"`
  pulls Drive's *transcoded preview* stream, which that quota does not cover. Caveat:
  preview audio is ~128 kbps AAC / 44.1 kHz, not the master's LPCM.
- **Don't download a multi-GB clip to use 4 seconds of it.** When a Drive video's `moov`
  atom is at the FRONT, ffmpeg can seek over HTTP: `ffmpeg -ss <in> -i "<drive-dl-url>" -t <dur>`
  fetches only the needed byte ranges. See `video-projects/ecomiq-social-proof/scripts/pull-media.sh`.
- **Need only the audio from a huge ProRes `.mov` whose `moov` is at the END?** Walk the
  QuickTime atom tree with small range requests to locate `moov`, parse the audio trak's
  `stsc`/`stco`/`stsz`, then range-fetch just those bytes — on a 2.5 GB master the LPCM
  audio was 12.35 MB (0.5%). Scripts: `scripts/drive-moov-locate.py`, `drive-audio-ranges.py`.
- **`ffmpeg` inside a `while read` loop silently eats the loop's stdin**, so only the first
  item is processed and the rest surface as bizarre "Enter command:" parse errors.
  **Fix:** always pass **`-nostdin`** to ffmpeg in a read loop.

## Footage prep

- **Phone-shot vertical b-roll can be baked sideways with NO rotation metadata.** ffprobe
  reports 3840×2160 and no `rotation` side-data, but the people are lying on their side.
  **Fix:** `transpose=1` (90° CW) — which also yields a native 2160×3840, i.e. a perfect
  9:16 fill needing no padding. Always eyeball a frame before trusting the dimensions.
- **A centre crop to 1:1 decapitates subjects shot low in a vertical frame.** Scaling
  2160×3840 to 1080 wide and cropping the middle 1080 cuts heads off when the subject sits
  low. **Fix:** bias the crop window per clip — `crop=1080:1080:0:<y>` (y=420 is centre;
  larger moves it down). Pick `y` off a 3-up frame sweep rather than guessing.

## SVG motion graphics

- **An SVG shape animates but never appears.** Two separate traps, both silent:
  1. `fill: var(--brand-flame)` in CSS doesn't resolve for SVG `fill` in the render
     engine — the shape paints black and vanishes on dark footage. Use a literal hex.
  2. A group rule like `.ring circle { fill: none; }` also matches your dots, and a
     **CSS rule outranks the `fill=""` presentation attribute**, so the attribute you
     "fixed" it with does nothing. **Fix:** `.ring circle:not(.dot)` for the group rule
     plus `.ring circle.dot { fill: #FF4C32; }` to win on specificity.
- **`drawSVG` is a GSAP *premium* plugin** and is absent from the vendored build; a tween
  using it silently does nothing. **Fix:** animate `strokeDasharray` + `strokeDashoffset`
  (set dasharray ≥ path length) — same line-draw effect, no plugin.
- **Don't `scale` SVG children to animate them in.** GSAP's transform origin on SVG
  collapses them unpredictably. **Fix:** tween the geometry instead —
  `{ attr: { r: 0 } }` → `{ attr: { r: 26 } }` for circles. Robust and seekable.

## Iterating without paying for renders

- **A draft render of a 38s piece costs ~4.5 minutes** — far too slow to check whether one
  graphic appears. **Fix:** drive the composition in Playwright and screenshot at exact
  timeline seconds (`tl.time(t)` + seek each `<video>` by `data-start`/`data-media-start`).
  See `video-projects/ecomiq-social-proof/scripts/scrub.mjs`. Playwright's own browser
  download is missing in this container — pass `executablePath` pointing at the Chrome
  that hyperframes already caches under `/root/.cache/hyperframes/chrome/...`.

## Editing to a voiceover

- **"Use the A-roll" means the picture, not just the audio.** A talking-head source is a
  shot to cut to, not merely a voiceover — build the A-roll/B-roll intercut, don't bury
  the presenter. Confirm which of the two is meant before designing the structure.
- **Intercutting one take across several segments stays in sync for free**: trim the video
  to the SAME window as the voiceover, then give each segment
  `data-media-start` == its own `data-start`. Lip sync needs no per-cut nudging.
- **Dark b-roll dies under a scrim.** Measure it (`mean_luma` over a decoded frame) before
  layering: these shopfront clips sat at ~75-81 vs ~140 for interiors, and a full navy
  scrim crushed them to black. **Fix:** lift the dark clips in prep
  (`eq=brightness=0.07:contrast=1.08`) AND vary scrim opacity per segment.

## Motion graphics that actually earn their place

- **A graphic with no figure behind it reads as filler.** A "returning customers" cycle ring
  and a rising-curve chart both got cut for this: one was a metaphor, the other had invented
  curve shapes with no data. **Rule:** put a graphic on a beat only when a real number is
  spoken over it; otherwise let the footage play. Corollary — an invented chart shape is
  fabricated data-viz even when the headline number next to it is real.
- **Unlabelled bars communicate nothing.** Two rectangles at a 1:3 ratio don't say *what* is
  being compared, and if the brief bans words you can't label them. **Fix:** drop the chart
  and let the numeral carry it — emphasis comes from the motion (blur + scale overshoot +
  a single colour bloom on the landing frame), not from shapes around the number.
- **A scrim is for legibility, nothing else.** Laying a navy wash over every b-roll segment
  dulled shots that carried no type at all. **Fix:** scrim only the segments with a graphic;
  zero elsewhere.

## Render-engine gotchas

- **`tl.set(el, {opacity: 0}, 0)` does not render on frame 0** — a zero-duration set at
  position 0 is skipped while the playhead sits exactly at 0, so frame 0 shows the element
  un-hidden. **Fix:** author the hidden state in CSS. `hyperframes lint` flags this as
  `gsap_timeline_set_initial_hide`.
- **Two `<img>` with the same src/start/duration trip `duplicate_media_discovery_risk`.** A
  persistent corner logo plus a centred end-card logo is exactly this. **Fix:** give the
  second one its own copy of the file.
- **Always eyeball footage orientation per clip, not per folder.** One clip in a batch of
  otherwise-identical phone verticals was mis-read as true landscape and shipped rotated;
  its subject just happened to look plausible in the first frame sampled.

## Scrubbing a composition without rendering

- **A sub-directory composition won't open off disk.** Compositions use paths relative to the
  PROJECT ROOT (what the renderer serves them against), so `compositions/foo.html` opened via
  `file://` 404s on gsap/fonts/media and no timeline ever registers. **Fix:** run a temporary
  copy from the project root.
- **`waitForFunction` times out on such a page even though the timeline registered.** Pending
  file:// media requests starve both rAF and interval polling inside the page. **Fix:** a
  fixed settle wait plus an explicit `Object.keys(window.__timelines)` check; and `goto` with
  `waitUntil: 'domcontentloaded'`, since `load` never fires.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
