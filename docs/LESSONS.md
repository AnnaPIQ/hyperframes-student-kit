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
- **`<audio>` without an `id` renders SILENT.** The renderer discovers media elements by
  `id`, so a perfectly-wired `<audio data-start=… data-volume=…>` produces a mute video.
  Lint catches it as `media_missing_id` — it's an error, not a warning, so don't render
  past it. Same applies to `<video>`.

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
- **Google Drive serves a 2 KB "Quota exceeded" HTML page instead of the file.** Big,
  widely-viewed public files hit an *anonymous* download cap ("Too many users have
  viewed or downloaded this file recently" — Google says up to 24h). The MCP
  connector's `download_file_content` is NOT the fallback: it returns base64 into the
  conversation, so anything over a few MB is unusable. **Fix:** `copy_file` the Drive
  file — the copy inherits the folder's `anyone: reader` and gets a *fresh* quota
  bucket — then parse the `uuid` confirm token out of the virus-scan interstitial at
  `drive.google.com/uc?export=download&id=<ID>&confirm=t` and GET
  `drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t&uuid=<UUID>`.
  Pulled 2.05 GB in 45s. Always `file` the result — an HTML error page happily saves
  itself as `.mov`.
- **Anchoring beats without a transcriber: `silencedetect` is enough.** Two passes —
  `silencedetect=noise=-34dB:d=0.30` for sentence boundaries, then
  `noise=-32dB:d=0.12` for phrase boundaries — maps a known script onto real
  timestamps in seconds. It also finds the true speech in/out points so you trim dead
  pre-roll/post-roll instead of eyeballing it.

## Turning a client-logo pack into a logo wall

- **A mixed logo pack won't silhouette with one rule.** Deciding polarity from
  mean luminance (dark-on-light → invert, light-on-dark → straight) handles most
  marks, but any logo sitting on a **solid colour** keeps its ground as a visible
  grey box on navy. **Fix:** colour-key those out — sample the top-left pixel and
  `-fuzz N% -transparent "$bg"`.
- **Flood-filling the ground from the edges leaves letter counters filled** (the
  hole in Ozium's O, Flamingo's O), because they aren't connected to the border.
  **Fix:** key the colour out *everywhere*, not `-floodfill +0+0`.
- **Compositing the keyed result onto black and taking greyscale as the alpha**
  keeps interior detail — the brighter the mark, the more opaque — instead of
  flattening each logo to a solid blob.
- **Repeating the same logo in a wall trips lint's `duplicate_media_discovery_risk`**
  ("2 matching img entries with the same source/start/duration"). For a *scattered*
  wall, use each mark once. But a **scrolling grid** genuinely needs the repeat —
  21 marks at 3 columns is only 1400px of track, and a 1920 frame drifting 700px
  needs ~2600px — so there the warning is expected and benign: decorative `<img>`s
  with no `data-start` are not timed media. Deleting the repeat to silence it just
  makes the wall run out of rows mid-drift.
- **`identify -format` prints no trailing newline**, so `read -r w h < <(identify …)`
  returns non-zero and `set -e` kills the script mid-run with no error. Use an MPR
  round-trip (or command substitution) instead of reading dimensions back out.

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

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
