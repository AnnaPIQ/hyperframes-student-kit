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

- **`hyperframes doctor` can report a false FFmpeg failure.** It printed
  *"Failed to run /usr/bin/ffmpeg -version"* while ffmpeg 6.1.1 was present and
  encoding H.264/AAC fine (it self-corrected on a later session-start). **Fix:**
  don't trust that one row — verify directly with
  `ffmpeg -f lavfi -i testsrc -t 1 -c:v libx264 /tmp/t.mp4` before concluding the
  toolchain is broken.
- **Whisper transcription works without whisper-cpp.** doctor reports whisper-cpp
  missing and suggests a cmake build; `pip3 install --break-system-packages
  faster-whisper` is far quicker (CTranslate2, no torch) and HuggingFace is
  reachable from the web container. `small.en` with `word_timestamps=True` gives
  the word onsets an audio-led edit needs; re-check any spoken *figure* with
  `medium.en` before it goes on a card.
- **Phone-vertical b-roll can be sideways with NO rotation metadata.** `ffprobe`
  showed no `rotation` side-data and a normal 3840×2160, but the picture was on
  its side. **Fix:** always eyeball a frame before trusting the dimensions;
  `transpose=1` (90° CW) fixes it and conveniently yields 2160×3840 = exactly
  9:16, so the 1080×1920 downscale is a clean 2:1 with no upscaling.
- **Measure luma before cutting A-roll against b-roll.** A blue-lit talking-head
  master read ~72 mean luma against bakery b-roll at ~120–143 — nearly 2×, so
  every A/B cut flashed. **Fix:** measure with
  `ffprobe -f lavfi -i "movie=F,signalstats" -show_entries frame_tags=lavfi.signalstats.YAVG`
  and close the gap with `eq=brightness=…:contrast=…` in the prep pass, not in
  the composition.
- **Link-shared Drive files download anonymously, no API or gdown needed.**
  `curl -sL "https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t"`
  serves the full master with HTTP 206 range support. Guard the result by
  **expected byte size** — a revoked link or spent quota returns a few KB of HTML,
  not a video, and that failure is otherwise silent.
- **Trust the file, not the brief's label.** A source listed as "team working,
  1:00–1:03" was actually a different clip only 14.56s long, so the timecode
  didn't exist. Probe every clip's real duration and content before planning a
  cut around it.
- **Don't put a derived total on a card.** A case study stated an "8 hour"
  fulfilment window while its own timeline (midnight order → noon delivery) implied
  12. **Fix:** card the source's verifiable primitives ("MIDNIGHT → 8AM"), never
  arithmetic you did yourself on inconsistent inputs.


## Authoring gotchas found building the Sweet E's ad

- **An unquoted bash heredoc silently eats `${...}` in the file you are writing.**
  Writing `index.html` with `cat > f <<HTMLEOF` let bash expand `${cuts_placeholder}`
  to an empty string *before* the follow-up injector ran, so `const CUTS = [];` —
  every whip transition and motion blur was missing and the piece was all hard
  cuts. Lint passed; the page ran; nothing errored. **Fix:** quote the delimiter
  (`<<'HTMLEOF'`) whenever the body contains `$`, backticks or `$(`. And never
  verify an injection with `grep -c placeholder` — an expanded placeholder is
  *gone*, so absence reads as success. Assert the **injected value** is present
  instead.
- **`mix-blend-mode: screen` on an overlay renders as nothing.** A blend-mode
  overlay had no backdrop to composite against in the render's stacking context,
  so the whip streak was invisible at full opacity. **Fix:** use straight alpha
  (a plain rgba gradient) for overlays that must appear over footage.
- **Flexbox silently falsified a chart's ratio.** A `1×` vs `3×` bar pair
  overflowed its row, so flex shrank the long bar to ~2.5× — the labels still
  said 3×. **Fix:** `flex: 0 0 auto` on every bar/label in a ratio chart, size
  the row to fit, and *measure it* (`offsetWidth`, which ignores GSAP's scaleX)
  rather than eyeballing a contact sheet.
- **`page.evaluate` / `waitForFunction` hangs if the callback returns a GSAP
  timeline.** `tl.time(t)` returns the timeline, and Playwright then tries to
  serialise a circular object — the call never resolves and looks like a browser
  launch problem. **Fix:** use a block body (`() => { tl.time(t); }`) or return a
  scalar/boolean.
- **A static seek does not re-run the engine's clip gating.** Scrubbing a
  composition in Playwright shows only the always-on layers, so cards appear as
  empty background. **Fix:** after seeking, reproduce the gating yourself —
  toggle `display` on every `.clip[data-start]` by comparing the seek time
  against `data-start`/`data-duration` (see a project's `scripts/scrub.mjs`).
- **Playwright's own browser download is absent in this container.** `chromium
  .launch()` fails pointing at `/opt/pw-browsers/...`. **Fix:** reuse the shell
  Hyperframes already ensures — glob
  `/root/.cache/hyperframes/chrome/**/chrome-headless-shell` and pass it as
  `executablePath`, **filtering to files** (the glob also matches a directory of
  the same name, which fails with `EACCES`).
- **`hyperframes lint` rejects two root-level compositions in one project**
  (`multiple_root_compositions`), and it does **not** resolve a symlinked
  `assets/` directory. **Fix:** generate an alternate ratio into
  `build/<tag>/` as a mini-project (index.html + hyperframes.json + meta.json)
  and hard-link the asset tree in with `cp -al` — zero extra disk, and lint
  resolves every file.
- **Cards must not open on bare canvas.** A full-bleed panel whose first
  element enters at +0.3s reads as a dead flash after a whip from bright
  footage — worst on an end card, where the top-left logo has already gone.
  **Fix:** first element in by +0.02s with a ~0.24s entrance; on an end card
  bring the lockup in at +0.00.
- **Don't count a figure up from 0 if the number is spoken.** A 0→10,000
  counter puts "2,710" on screen exactly when the voiceover says "ten
  thousand". **Fix:** land the whole number on the word; if it must change,
  drive the text from a `onUpdate` that is a pure function of card-local time
  so every seek is correct and the render stays deterministic.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
