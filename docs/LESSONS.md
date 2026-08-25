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

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
