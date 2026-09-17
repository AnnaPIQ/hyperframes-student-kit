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

## Environment (this container)

- **A render started with `nohup … &` inside a Bash tool call dies partway**
  with `render_cancelled_parent_exited`. The tool's shell is the parent and it
  exits as soon as the call returns. **Fix:** start long renders with the Bash
  tool's own `run_in_background`, not with `nohup`/`&` inside a foreground call.
- **`playwright.chromium.launch()` fails with "Executable doesn't exist at
  …chromium_headless_shell-1217…".** The bundled Playwright version and the
  browsers under `/opt/pw-browsers` are different revisions. **Fix:** resolve an
  executable yourself and pass `executablePath` — `/opt/pw-browsers/chromium*`
  or the hyperframes cache at
  `/root/.cache/hyperframes/chrome/*/chrome-headless-shell-linux64/`. Never run
  `playwright install` (it re-downloads ~200MB into a fixed-size disk).
- **Google Drive files over ~100MB return an HTML virus-scan interstitial**, not
  the file, so `curl` lands a 2KB page named `whatever.mov`. **Fix:** fetch
  `https://drive.usercontent.google.com/download?id=<id>&export=download&confirm=t`
  and guard on the expected byte size — an HTML page is ~KB, not ~GB.

## Measuring a composition without rendering it

- **`gsap.fromTo` has `immediateRender: true`, so the from-state is applied the
  moment the page loads.** Any static layout measurement (Playwright bounding
  boxes) therefore reads each element at its *entrance offset*, not where it
  rests — an element entering from `yPercent: 14` measures 14% of its own
  height too low, so band heights and safe-area checks all come out wrong.
  **Fix:** inject `transform: none !important` alongside `opacity: 1` before
  measuring. Worth doing: a Playwright pass that asserts safe-area clearance,
  overflow and chart ratios costs seconds and catches what a render would cost
  minutes to show you.

## Fonts

- **Hedvig Letters Serif ships upright only — there is no italic cut.** Declare
  the `@font-face` as `font-style: normal` and let the browser synthesise the
  oblique for `font-style: italic`. Declaring the face as `italic` maps the
  upright file straight onto italic requests, and the brand's signature emphasis
  word renders unslanted — lint passes, the frame is wrong.

## Retiming footage to fit a voiceover

- **A montage that is shorter than the VO should be retimed, not looped or
  frozen.** `setpts=<f>*PTS` alone re-uses source frames, so at 0.776× you get a
  5:4 frame cadence that judders on handheld shots. **Fix:** add
  `minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:vsbmc=1`. Budget ~10 min per
  30s of 1080×1920 at ~1.2× realtime, and run it in the background.
- **Check the retimed asset's real duration before wiring `data-duration`.**
  `setpts` lands on a frame boundary, so 29.967s × 1.288107 comes out at
  38.533s, not the 38.600s the arithmetic promised. A `data-duration` longer
  than the asset freezes its last frames.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
