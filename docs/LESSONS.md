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

## Transcription & word-level timing

- **Whisper stretches the first words of a clip when there's leading silence, and the drift
  poisons every downstream timestamp.** A 3 s room-tone head made `small.en` report the
  first word at 0.26 s (real onset 3.26 s) and skewed sentence boundaries by up to 0.8 s.
  **Fix:** never trust a single full-file ASR pass for a cut point. Cross-check against
  `silencedetect` (`-af silencedetect=noise=-35dB:d=0.4`) plus per-200 ms `volumedetect`
  RMS, then **re-transcribe a tight window** around the moment you care about — timestamps
  on a 2–3 s window are frame-accurate. Confirm the render afterwards by measuring RMS on
  the output at the cut time.
- **`silencedetect` at −35 dB swallows quiet speech.** A softly-delivered "I want to see"
  read as silence. Sweep the threshold (−35 / −45 dB) and confirm with RMS before calling
  a gap real.
- **`hyperframes transcribe` downloads its Whisper model on first run** (several minutes,
  no output until done). `doctor` reports `whisper-cpp Not found` until then. Run it early
  in the session and background it.

## Editing technique (montage under a VO)

- **VO longer than the montage? Reprise hero shots at native speed — don't slow down or
  loop.** A 17 % `setpts` stretch judders at 30 fps (frame duplication) and a loop reads as
  a mistake. Re-cutting 7–8 of the strongest shots to fill the gap is invisible and lands
  the beat. Seam it at a **sentence boundary** in the VO and the join disappears.
- **Extend the picture bed past the dissolve start, not up to it.** A 0.35 s cross-dissolve
  at t needs picture through t + 0.35, or the last frames dissolve from black.
- **Supplied montages often carry their own end card.** Scene-detect the tail and trim it
  before building your own, or you get two cards back to back.

## Circular PiP / avatar framing

- **Centre a circular PiP on the subject's FACE, not the head's bounding box.** Long hair
  (or a hat, or a turned head) pulls the bounding box to one side, so box-centring leaves
  the face visibly off-centre once the mask is on. Viewers read the face position, not the
  pixel mass.
- **Judge the framing through the actual circle mask at final display size, never the
  square crop.** The inscribed circle throws away the corners, so a square that looks
  balanced often isn't. Quick harness: build a one-off alpha mask with
  `geq=lum='if(lte(hypot(X-r,Y-r),r),255,0)'`, then
  `[v][m]alphamerge` over a flat brand-coloured background and tile a few timestamps.
- **Too tight a crop on a coloured-backdrop talking head turns the background into a flat
  disc of colour.** A studio wall usually has a gradient and darker surroundings; crop them
  out and the remaining patch reads as solid, which looks like a grade the shooter never
  applied. Leave enough room for the falloff, and size the circle up to keep the face
  legible.
- **Sample the crop across the whole take before committing** — presenters drift. Check
  head position at 5–7 points, not one hero frame.

## Aspect variants

- **Ask for a natively-framed master per ratio before reaching for crop/pad.** 9:16 → 1:1
  by scale+pad gives a 607×1080 picture with 236 px bars; a centre-crop clips upper-third
  on-screen graphics and feet. A recomposed square master fixed both for free. Verify the
  variants share a cut list (`select='gt(scene,0.25)',showinfo`) so one set of timestamps
  drives every ratio.

## Rendering & preview

- **Lint rule `gsap_css_transform_conflict`**: a CSS `transform` on an element GSAP tweens
  gets overwritten. **Fix:** move the CSS transform into the tween's `fromTo` start state.
- **`multiple_root_compositions`**: two root-level HTML files both with
  `data-composition-id` is a lint error. **Fix:** keep one `index.html` at the root and put
  ratio variants in `compositions/`, rendering with `--composition compositions/<f>.html`.
  Relative `assets/...` paths still resolve from the project root.
- **Playwright's bundled Chromium is absent on the web container, but Hyperframes' is not.**
  Launch with `executablePath:
  /root/.cache/hyperframes/chrome/chrome-headless-shell/*/chrome-headless-shell` to screenshot
  a composition without paying for a render. Works on root `index.html` over `file://`;
  a comp inside `compositions/` fails there because relative asset paths resolve against
  its own folder — check those from a real render instead.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
