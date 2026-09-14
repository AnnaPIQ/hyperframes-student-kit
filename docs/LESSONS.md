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

## Playwright screen-recording real web assets (b-roll capture)

- **Chromium version mismatch → "Executable doesn't exist".** The container provisions
  a browser at `/opt/pw-browsers/chromium`, but the npm `playwright` package pins a
  newer build number and looks for that instead. Fix: pass
  `executablePath: '/opt/pw-browsers/chromium'` to `chromium.launch()`. Never run
  `playwright install` — it is not needed and the browser is already there.
- **Every https:// navigation dies with `ERR_CONNECTION_RESET` (curl works fine).**
  The agent proxy's relay cannot carry Chromium's TLS 1.3 ClientHello; the tunnel
  closes mid-handshake. Fix: launch with `--ssl-version-max=tls1.2` **and**
  `proxy: { server: process.env.https_proxy }`. Verify with example.com before
  blaming the target site.
- **`page.mouse.wheel()` does nothing in Chromium's PDF viewer.** The viewer is an
  out-of-process plugin frame. Fix: click the document to focus it, then scroll with
  `keyboard.press('ArrowDown')` (~40px per press, at any zoom).
- **The recorded video has no mouse pointer.** Playwright's screencast never draws the
  OS cursor, so "move the cursor" beats are invisible. Fix: inject a fixed-position
  SVG arrow with `pointer-events:none` and move it in lockstep with the real
  `page.mouse`, so the real clicks still land where the arrow is drawn.
- **`innerHTML` throws `This document requires 'TrustedHTML' assignment`** when
  injecting into Google Sheets (Trusted Types CSP). Fix: build injected nodes with
  `createElement` / `createElementNS` and `setAttribute`.
- **Fixed-step animation loops overshoot their duration ~2x.** Each `mouse.move` or
  `evaluate` costs a CDP round-trip, so a 60-step "700ms" glide lands near 1.5s. Fix:
  pace loops against `Date.now()` (drive `fn(elapsed/ms)`) rather than stepping a
  fixed count with a fixed delay.
- **Playwright writes VFR VP8 `.webm`, and the take is much longer than the clip.**
  Have the capture script stamp in/out marks from a clock started at page creation
  (they align with video time), then trim with `ffmpeg -ss <in> -t <length>` and
  `-vf fps=30` to get CFR. Trim to the *declared* clip length, not the marked window,
  so every deliverable is exactly the duration the composition was built for.
- **Google Sheets `/preview` vs `/edit` for b-roll.** `/preview` is a clean Drive
  viewer but reads as a document; `/edit` keeps menus, formula bar, row/column headers
  and the sheet tab, which is what makes it read instantly as a spreadsheet. A sheet
  shared "anyone with the link can view" opens `/edit` anonymously in View-only mode —
  cells can still be selected (selection box + formula bar update), but **nothing can
  be typed**. Use a real interactive web tool for any "type a value, watch it
  recalculate" beat.
- **Hyperframes lint: `video_nested_in_timed_element`.** Don't put `data-start` on both
  a `<video>` and its wrapper — the frame extractor and the visibility window then
  disagree. Time one of them; leave the card wrapper untimed.
- **Hyperframes lint: `invalid_parent_traversal_in_asset_path`.** Asset paths inside
  `compositions/*.html` must be root-relative (`assets/x.png`), not `../assets/x.png`,
  because compositions are served with the project root as their base URL.
- **Render UI recordings with `--video-frame-format png`.** JPEG frame extraction
  softens small UI text and rings high-contrast edges.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
