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

## Website capture (site → assets)

- **`hyperframes capture` / Playwright Chromium can `ERR_CONNECTION_RESET` on an origin
  even though `curl` reaches it fine** (bot/TLS fingerprinting past the agent proxy).
  **Fix:** fall back to `curl` for the HTML, grep out the asset URLs, and download the
  images directly with `curl` (public marketing CDNs like `cdn.prod.website-files.com`
  work). Convert `.avif`/`.webp` → `.png` with `ffmpeg -i x.avif x.png`.
- **Driving Playwright yourself:** pass an explicit `executablePath`
  (`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`) — the default resolves to a
  `chromium_headless_shell-*` path that may be absent. Run the script from the **workspace
  root** (where `node_modules` lives) or the `playwright` import won't resolve, and set
  `proxy: { server: process.env.HTTPS_PROXY }` + `ignoreHTTPSErrors: true`.

## Lint gotchas (0.7.x)

- **`gsap_non_transform_motion`:** animating `left`/`top`/`width` snaps to integer pixels
  and stutters under the capture engine. Animate `x`/`y`/`scale` transforms instead
  (e.g. a shimmer sweep: `fromTo(el, {x:-460},{x:980})`, not `left`).
- **`gsap_css_transform_conflict`:** if an element has a CSS `transform` (e.g.
  `translate(-50%,-50%)` centering) AND GSAP animates `scale`, GSAP overwrites the whole
  transform and the centering is lost. Drop the CSS transform and put
  `xPercent:-50, yPercent:-50, scale:…` in a `gsap.fromTo` (fromTo is exempt from the rule).
- **`gsap_exit_missing_hard_kill`:** an exit fade that ends exactly on another clip's
  `data-start` boundary needs a `tl.set(sel, {opacity:0}, <exit-end>)` right after it, or
  non-linear seeking leaves stale visibility state.
- **`duplicate_media_discovery_risk`:** the same image `src` used in two `<img>` at the
  same start/duration warns. Use a distinct file (a hue-shifted `ffmpeg -vf hue=h=165`
  copy makes a clean "variant B" of the same product shot), or a different asset.

## Audio (VO cutdowns)

- **Two-pass `loudnorm` still undershoots -16 LUFS on a quiet, peaky VO** (high
  crest factor → true-peak-limited at -1.5 dBTP before it reaches -16). **Fix:** put a
  gentle `acompressor=threshold=-24dB:ratio=4:makeup=5` *before* `loudnorm` to lower the
  crest factor; then loudnorm lands ~-16.8 LUFS with TP safe. Don't chase the last dB with
  a plain `alimiter` — it's not true-peak-aware and pushed TP to +0.4 (clipping).
- **Splice on `silencedetect` boundaries, not raw Whisper word times.** Run
  `ffmpeg -af silencedetect=noise=-34dB:d=0.12` to find real gaps; cut there and add
  50–100ms edge fades + a ~0.16s silence pad between sentences for a natural join.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
