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

## Multi-scene compositions (overlapping scene slots)

- **A GSAP-animated wrapper silently re-anchors its absolutely-positioned children.**
  Any transform on an element makes it the containing block for `position:absolute`
  descendants, so children with `top:50%; left:50%` jump to the wrapper's own
  (often zero-height) box instead of the stage. Symptom: a carefully centred
  layout renders jammed against the top edge. **Fix:** give every wrapper you
  animate an explicit `position: absolute; inset: 0;`.
- **A scene is invisible before its entrance tween starts, so overlapping slots
  can show nothing.** `gsap.fromTo` defaults to `immediateRender: true`, which
  applies the "from" state at build time. If the incoming scene's first tween
  starts 0.3s into its slot, the whole overlap window is empty and the cut reads
  as a hard cut anyway. **Fix:** wrap each scene in an `.enter` div and tween it
  (`y` + `blur` + `opacity`) from position `0` of the scene timeline; let the
  inner elements stagger on top. Keep the outgoing slot alive until the incoming
  `.enter` tween has finished (overlap ≥ entrance duration).
- **Sub-composition asset paths are parent-relative, not folder-relative.** From
  `compositions/x.html` write `src="assets/…"` (and `assets/vendor/gsap.min.js`),
  never `../assets/…`.
- **A whip streak on `power3.in` over 0.24s is invisible.** Steep-in easing keeps
  it off-frame until the last two frames. **Fix:** `power1.inOut` over ~0.44s,
  centred on the cut (start at `cut − duration/2`), with opacity ramped in over
  ~0.14s and out over the last ~0.16s.
- **Never use `repeat: -1`** (breaks the capture engine) — compute a finite count,
  e.g. `repeat: Math.ceil(duration / cycle) - 1`. And avoid GSAP's
  `stagger.from: "random"` / `ease: "random(...)"`: they call `Math.random()` and
  break determinism. `from: "center"` / `"start"` / `"end"` are safe.

## Highlighting / glow

- **A blurred colour overlay placed over content washes the content out.** A
  `filter: blur()` div with a tinted background sitting on a table row tints the
  text too. **Fix:** glow outward only — an overlay div with a transparent
  background and `box-shadow: 0 0 44px 7px rgba(...)`. Keep any interior fill
  under ~0.07 alpha.

## Environment

- **`npx hyperframes doctor` reports FFmpeg as "Failed to run" in the cloud
  container even when FFmpeg is fine** (`/usr/bin/ffmpeg -version` returns 0 and
  renders + frame grabs both work). Treat that one red check as a false negative;
  don't reinstall anything.

## Multi-format variants (one build, several aspect ratios)

- **Anything a variant needs to reposition must be a CSS class, never an inline
  `style` attribute.** An inline style beats a stylesheet, so a generated
  per-format override silently does nothing against `style="transform: …"`.
  Symptom: the override file looks right, the render ignores it. **Fix:** move
  the positions into classes in the master (e.g. `.s02-p1`…`.s02-p7` for a card
  fan, `.xh1`…`.xh6` for crosshairs) and override those.
- **Don't rely on a `<link>` in a sub-composition's `<head>` for format
  overrides.** The framework inlines a sub-composition's markup into the parent,
  so a head-level `<link>` may not survive. **Fix:** have the generator append
  the override CSS to the end of each file's own `<style>` block, where it wins
  the cascade for free.
- **A generator that wipes the whole project folder will delete `renders/`.**
  Symptom: a final MP4 that took minutes disappears on the next rebuild.
  **Fix:** remove only the generated entries (`assets`, `compositions`,
  `index.html`, config) and leave `renders/` alone.
- **Content sized for 16:9 reads tiny when reused at 9:16.** The same block in a
  1920-tall frame occupies a quarter of it and looks under-designed rather than
  deliberate. **Fix:** bump type and element sizes in the vertical override
  (~10-20%), don't just re-centre. Scaling the stage with CSS is not an option
  when GSAP already animates that element's transform — it gets clobbered.
- **Keep per-format values that the timeline reads (e.g. a pan distance) as named
  constants at the top of the scene's script**, so the generator can rewrite them
  with one regex instead of the override file having to fight the JS.


## CSS 3D page turns (and tactile "real object" looks)

- **Real page turns work in the headless renderer.** A leaf with
  `transform-style: preserve-3d`, two `.face` children with
  `backface-visibility: hidden` (the back one pre-rotated `rotateY(180deg)`),
  and `transform-origin: left center`, tweened `rotateY: 0 → -172`. Front face =
  page N, back face = page N+1.
- **Never put a `filter` on an ancestor of a 3D turn.** It flattens the
  transform and the leaf stops rotating. This kills the usual blur-rise scene
  entrance — use opacity + y only on scenes that contain a turn.
- **z-index cannot tween, but a turning leaf has to change stacking order.** On
  the right of the spread it must be above its siblings; once it lands on the
  left it must be below the next one. Flip it with `tl.set(el, {zIndex: n}, t)`
  at the halfway point of each turn.
- **A shadow directly behind an opaque object is invisible.** Offset every cast
  shadow down-and-right of its object (matching the key light) or it does
  nothing at all. Symptom: the object looks like it is floating, or pasted on.
- **Two shadows per object, not one** — a tight dark contact shadow (~20-35px
  blur) plus a wide soft ambient one (~90px). The pair is what reads as weight.
- **Solid offset box-shadows make convincing page edges**:
  `box-shadow: 5px 6px 0 -1px #dde6f1, 11px 12px 0 -2px #b9c9db` turns a single
  sheet into a book block with no extra DOM.
- **Navy artwork on a navy surface disappears.** Add a 1px rim
  (`0 0 0 1px rgba(156,212,255,.18)`) to every sheet so its edge separates from
  the desk.
- **A flat page render reads as pasted-on until you light it.** An absolutely
  positioned gradient overlay across each sheet (light at the key-light corner,
  dark at the opposite one) is what turns an image into paper.
- **Position a prop by its point of contact.** For a pen, make the wrapper a
  zero-size div at the nib tip and offset the artwork up-and-right from it, so
  moving the prop means moving the nib to a target's coordinates — not guessing
  at an offset. Work those coordinates out from the layout maths; eyeballing
  them put the first pen a full frame-width away from the checkbox.


## Talking-head shorts (face + graphics + karaoke captions)

- **Caption the audio, not the transcript you were handed.** Auto-captions and
  pasted transcripts drift from what was actually said. Run
  `npx hyperframes transcribe <edit>.mp4 --model small.en --json` (it works in
  this container — `doctor` reporting whisper-cpp missing is a false negative)
  and caption from that. A caption that disagrees with the voice is worse than
  none.
- **Two caption lines double-expose unless the exit is clamped to the next
  line's entry.** `lastWord.end + 0.16` alone overlaps the following group.
  Clamp: `outT = min(lastEnd + 0.16, nextGroupFirstWord.t - 0.13)`, and follow
  the fade with a hard `tl.set({opacity:0, visibility:"hidden"})` — the lint rule
  `caption_exit_missing_hard_kill` exists because a word-level tween can
  otherwise win the race and strand a line on screen.
- **The seam must overlap the video's top edge, not stop above it.** A gradient
  band that ends where the face begins leaves the razor line it was meant to
  hide. Start the band ~30px above the face top and run it ~190px down INTO the
  video, opaque at the top.
- **A `scaleX` parent squashes its own label.** Bars that shrink to show a value
  being consumed will distort any text inside them. Put labels in siblings
  positioned over the track, never inside the scaling element.
- **Type over a full-screen face needs a directional scrim, not a radial one.**
  A soft radial leaves the words sitting on the subject's eyes. A top-down
  linear gradient (0.94 → 0 over ~700px) reads as a deliberate title band and
  actually separates the type.
- **Position a prop by its point of contact** — for a pen, a zero-size wrapper
  at the nib with the artwork offset from it, so moving it means moving the nib
  to a target's coordinates.
- **Google Drive: a big file needs the confirm URL, and it supports ranges.**
  `uc?export=download` returns an HTML virus-scan interstitial for anything
  large. Use `https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t`,
  which serves `accept-ranges: bytes` — so `ffprobe`/`ffmpeg` can read a 3GB mov
  over HTTP without downloading it first.


---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
