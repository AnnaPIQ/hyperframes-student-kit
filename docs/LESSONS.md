# LESSONS — cross-session knowledge base

Hard-won fixes and gotchas pooled from every video build in this workspace. **Read
this before building** (it's faster than rediscovering a render bug), and **append to
it** whenever you hit-and-fix something new. This is how the studio gets more
efficient over time instead of relearning the same lessons.

> Format: each entry is **Symptom → Fix** with where it bites. Keep it terse.

---

## Render-breaking (these waste the most time)

- **Two root-level HTML files with `data-composition-id` is a lint ERROR**
  (`multiple_root_compositions`) — the runtime may find both as entry points and
  double the audio. **Fix:** keep exactly one root `index.html`; put additional
  aspect-ratio cuts in `compositions/` and render them with
  `hyperframes render -c compositions/<name>.html`.
- **Files under `compositions/` must use ROOT-relative asset paths**
  (`assets/logo.svg`), *not* `../assets/logo.svg` — compositions are served with
  the project root as their base URL, and `../` trips
  `invalid_parent_traversal_in_asset_path`. Note this contradicts the
  `/hyperframes` skill text that says sub-compositions use `../`; the linter is
  right, trust it.
- **Cross-file lint aggregation reports `duplicate_audio_track`** between
  `index.html` and an unmounted sibling in `compositions/` that has its own
  `<audio>`, even though they never render together. **Fix:** give the sibling a
  distinct `data-track-index` range (e.g. 20+) so the static check stays quiet.

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

- **A `display:inline-block` wrapper inside a flex column still stretches to full
  width**, so a strike-through/underline pinned to `width:100%` of it overshoots the
  text by hundreds of px. **Fix:** add `align-self: flex-start` to the wrapper (flex
  containers default to `align-items: stretch`). Bit the Black Friday hook card.
- **Bottom-anchored overlay cards need ~10% bottom padding on 9:16**, not ~7%.
  Reels/Stories/TikTok UI overlays the lower strip, so a 132px pad on a 1920-tall
  frame put the last checklist row under the platform chrome. 180px reads safe.

- **Logo drifts / won't stay top-left.** The render engine repositions elements marked
  `class="clip"`. **Fix:** wrap the logo in a *positioned, non-`clip`* `<div>` and place
  the logo inside it.
- **Never animate `width/height/top/left` on a `<video>`** — the browser freezes the
  frame. Wrap it in a `<div>` and animate the wrapper. (Render contract rule 9.)

## Footage & A/V sync

- **`hyperframes doctor` can report `✗ FFmpeg  Failed to run` while ffmpeg is
  perfectly fine** (it mis-probes in this container; note it passes FFprobe on the
  same binary). **Fix:** don't trust it as a gate — run `ffmpeg -version` yourself
  before concluding the pipeline is missing.
- **Supplied transcript timestamps drift from the audio.** On the Black Friday
  A-roll they ran 1.8–2.5s EARLY, so timing graphics to them fired every beat
  before the words. **Fix:** build a phrase grid with
  `ffmpeg -af silencedetect=noise=-45dB:d=0.14 -f null -` and map the script's
  lines onto those segments by word count. Anchor beats to the grid, not the
  transcript.
- **A 16:9 landscape talking head going to 9:16/1:1 needs a CROP, not scale+pad.**
  Padding leaves the subject in a thin letterbox band. Check the subject holds
  frame position across the take (sample frames at several timestamps), then
  `crop=<h*9/16>:<h>:<centred x>:0` before scaling.
- **Google Drive files shared "anyone with the link" download with plain curl:**
  `curl -sSLf -o out.bin "https://drive.usercontent.google.com/download?id=<ID>&export=download"`.
  Essential for large media — a 3.4 GB master cannot come through the Drive
  connector's base64 tool channel. Verify the byte count against the file
  metadata afterwards.

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

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
