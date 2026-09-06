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

## Fonts & glyphs

- **The EcomIQ brand fonts are latin-only: `→` (U+2192) is MISSING from both
  `RethinkSans.woff2` and `HedvigLettersSerif.woff2`** (222 / 219 codepoints). A right
  arrow in copy silently falls back to a system face or renders as tofu. **Fix:** draw
  arrows in CSS (a rotated two-border chevron on an `::after`) or use words ("rises 1.92
  to 2.61"). `↓` `−` `×` `·` `–` ARE present. **Check before you ship any glyph beyond
  basic latin:** `pip install fonttools brotli` then read the cmap, don't assume.

## Transitions & cut timing

- **A scene whose content tweens start *after* its `data-start` renders an empty frame on
  the cut.** A 0.1–0.2s lead-in feels harmless in code and reads as a dead frame on
  screen. **Fix:** fire each scene's first entrance AT the clip's `data-start` and let the
  blur+scale arrival carry the momentum.
- **`power2.in` on a whip streak leaves it off-frame when the cut lands.** An "in" ease
  spends its first 60% barely moving, so the streak crosses *after* the cut and reads as a
  hard cut with a late flick. **Fix:** start the sweep ~0.2s early with `power1.inOut` so
  the streak is mid-frame on the cut frame itself.
- **`power3.inOut` on a hero move barely advances over the first few frames.** Same trap as
  above: the end-card logo flight looked frozen at the most important cut in the piece.
  **Fix:** `power3.out` for any move that must read immediately at a cut.

## Layout & assets

- **"White background" product renders usually are not white, and are not cut-outs.**
  Sampling gave `#EEEEEF` (tool spread) and `#FDFDFE` (cover mockup), so on a pure-white
  canvas their frame edges showed as grey boxes. **Fix:** sample the corner
  (`convert img.png -crop 6x6+2+2 +repage -resize 1x1 -format "%[hex:p{0,0}]" info:`) and
  either match the canvas exactly or, better, present the shot as a deliberate rounded card
  with a shadow. Keying the background to alpha is a trap: `-transparent` also eats white
  text inside the product, and floodfill leaves a halo on the soft shadow.
- **`-trim` (uniform-border crop) is the safe way to tighten a mockup's margins** — no
  keying, no halo. It stops at the drop shadow, which is what you want.

## Two aspect ratios from one edit

- **Two root-level HTML files with `data-composition-id` is a lint ERROR**
  (`multiple_root_compositions`, plus duplicate-audio risk). **Fix:** keep `index.html` as
  the only root and put the second ratio in `compositions/`, rendered with
  `-c compositions/square.html`. Generate it from `index.html` with a small sed script so
  the two cannot drift, and keep all layout deltas in `body.r-<ratio>` CSS blocks.
- **Asset paths in a `compositions/` file stay ROOT-relative (`assets/...`), NOT
  `../assets/...`** — compositions are served with the project root as base URL, so `../`
  404s in Studio (lint: `invalid_parent_traversal_in_asset_path`).
- **Lint `missing_timeline_registry` fires if the timeline lives in an external `.js`.** The
  linter statically scans the HTML, so `window.__timelines[...]` must be inline in the
  composition file. Shared CSS in an external file is fine.

## Audio levels

- **Raw A-roll VO can be far below social delivery loudness.** This source measured
  **-33.3 LUFS** integrated, ~17 dB under target, which would have played near-silent next
  to other feed content. **Fix:** two-pass `loudnorm=I=-16:TP=-1.5:LRA=11` (measure, then
  pass `measured_*` back in). Verify the finished render with
  `ffmpeg -i out.mp4 -af ebur128=framelog=quiet -f null -` — this also catches accidentally
  layered audio tracks, which show up as roughly +6 dB.

## Crossfades between clips

- **A fade-out only crossfades if something is underneath.** Graphic panels layered over a
  talking-head video crossfade for free (fade up = dissolve into the graphic, fade down =
  dissolve back to the face). But at a boundary where the underlying media has ended, a
  fade-out reveals **bare canvas** instead of the next scene. **Fix:** overlap the two
  clips on different `data-track-index` values — extend the outgoing clip's
  `data-duration` past the dissolve and start the incoming clip early, so the incoming
  scene fades up on top while the outgoing one holds fully opaque beneath it.
- **Ride companion tweens on the same window as the dissolve they sit over.** A logo
  variant swap or vignette ramp timed independently gets caught half-faded against a
  half-faded ground and reads as muddy. Give it the same start and duration as the scene
  crossfade underneath.

## Reserving space for later subtitles

- **Reserve it as a CSS variable inside the scene's own padding, not by nudging each
  element.** `body.r-916 { --sub-safe: 340px }` plus
  `.sc { padding-bottom: calc(90px + var(--sub-safe)) }` makes every scene rebalance from
  one value, and a flex `.sc-mid` re-centres the content automatically. Nudging elements
  individually guarantees one gets missed.
- **Count an element's ANIMATED travel against the band, not its resting position.** A
  bobbing CTA chevron sat 12px clear at rest but its 14px `yoyo` loop pushed it 2px into
  the reserved strip. Check the extreme of every loop: grab a frame at
  `loopStart + duration` and measure, don't eyeball the hero frame.
- **Shrinking the reserve out of the top padding too keeps scenes centred.** Taking it all
  off the bottom shoves content upward into the logo; splitting the loss (e.g. top
  250→230) keeps the optical balance.
- **Re-check text that was already near a wrap boundary.** Reflowing the box can tip a
  one-line footnote into two. Tightening `letter-spacing` (.16em → .12em) buys ~7% width
  without touching the copy or the font size.

## Reframing a talking head between aspect ratios

- **A 16:9 source cover-cropped into 9:16 is ALREADY showing 100% of its height.** So
  "zoom out on the speaker" cannot be done by cropping wider or by scaling the wrapper
  below 1 — there is no more picture above or below, and the frame just empties. **Fix:**
  scale the subject down to a fraction of cover scale and fill the resulting gap with a
  blurred, slightly darkened copy of the same frame:
  `[0:v]crop=...,scale=W:H,boxblur=30:2,eq=brightness=-0.06[bg]; [0:v]scale=-2:<0.88*H>,crop=W:...[fg]; [bg][fg]overlay=(W-w)/2:(H-h)/2`.
  On a smooth studio backdrop the seam is invisible. Say this out loud to the client:
  it is a real constraint of the source, not a preference.
- **Bottom-anchor the subject and continue the backdrop, don't centre-and-blur.** A
  blurred copy of the frame behind itself is invisible for a small pull-back (~12%) but
  falls apart further out: centring opens a gap top AND bottom, and the fill becomes a
  recognisable smear of the subject's own face above and torso below, with a hard seam.
  Anchor the subject to the bottom so there is only ONE gap, above them, which is the one
  region where a talking-head source is plain backdrop, then fill it by stretching the top
  ~20px of the subject's own frame to full height with a light blur. That continues the
  studio gradient seamlessly and holds at 72% of frame height and beyond:
  `[fg]split[fga][fgb]; [fgb]crop=W:20:0:0,scale=W:H:flags=bicubic,boxblur=10:1[fill]; [fill][fga]overlay=0:<gap>`
- **Size the subject as a percentage of FRAME height, not of cover scale**, when the same
  person appears in two aspect ratios. 72% of frame height in both 9:16 and 1:1 makes them
  read at the same size; matching cover-scale percentages does not.
- **Keep the original 4K source around for the whole edit.** Every reframe is a re-encode
  from it; re-deriving from the already-cropped delivery file compounds quality loss and
  cannot widen the frame at all.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
