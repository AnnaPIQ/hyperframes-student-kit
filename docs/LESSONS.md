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

## Dropping a landscape b-roll into a portrait cut

- **Symptom:** a 16:9 brand b-roll cropped to 9:16 loses the ends of every board
  (table columns, tile grids, two-column lockups). **Fix:** measure the side
  margins on the tightest board first — if they are only 2–5% of frame width
  there is no crop worth having, so play it full-width and float it in the
  canvas colour instead. A crop that "nearly" fits still cuts a column off.
- **Symptom:** the letterbox reads as a mistake, with a visible seam top and
  bottom. **Fix:** two things, both needed. Sample the b-roll's own corner
  colour (`ffmpeg -vf crop=6:6:0:0` then `convert -format '%[pixel:p{0,0}]'`) and
  paint the backdrop that, not the brand navy — a near-match is what makes the
  seam obvious. Then feather the wrapper's top and bottom edges with a
  `mask-image` linear-gradient. Keep the feather shallow (~5% of the video's
  height): boards that run text to the frame edge get ghosted by a deep one.
- **Asked to remove something from a supplied clip? Find its source before you
  reach for a filter.** A brand b-roll's background furniture (perspective grid,
  crosshairs, vignette) is usually a discrete element in whatever built it, and
  hiding it there is a one-line override. Filtering it out of the baked video is
  not: low-contrast thin lines sit at the same contrast as small type, so median,
  smartblur and luma-masked blur all destroy the on-screen copy while only
  half-removing the lines (all three were tried; every one was unusable). Check
  the repo's other branches — `git log --all`, `git ls-tree -r <branch>` — before
  concluding the pixels are all you have.
- **Pin the source revision when you rebuild an asset from another branch.** That
  branch keeps moving: the tip of ours had re-timed the same piece from 30s to
  21.4s, which would have silently shifted every beat the ad cuts to. Put the
  commit hash in the prep script with a note on what changed after it.
- **Want a landscape clip bigger in a portrait cut?** Zoom only the beats whose
  content is centred with margin (a product hero, a title card), never the ones
  that run edge to edge. Measure the safe limit by simulating the crop straight
  off the asset — `ffmpeg -vf "crop=W:H:X:0,scale=1080:-2"` at several zoom
  levels — and eyeballing the widest frame of the beat. It costs seconds; a
  render costs minutes. Animating the zoom (push in, ease back out) hides the
  scale mismatch with the un-zoomed beat that follows far better than a constant.
- **Two `fromTo` tweens on one element need an explicit baseline.** GSAP applies
  fromTo from-values at *authoring* time, so whichever was written last silently
  becomes the resting state for every seek before the first tween. `tl.set(sel,
  {...}, 0)` before both pins it. Lint flags this as
  `gsap_repeated_fromto_without_baseline`.
- **Never set a CSS `transform` on an element GSAP tweens a transform property
  on** (`gsap_css_transform_conflict`). GSAP overwrites the whole transform, so
  a `translateY(-50%)` centring or a CSS scale vanishes the moment it runs. Centre
  with `top`/`left` arithmetic instead and leave `transform` to the timeline.
- **Symptom:** the clip's own end lockup bleeds in under your CTA card, two
  logos fighting. **Fix:** find where the lockup starts in the source and end the
  clip before it, not at the card boundary. A beat of clean backdrop before the
  CTA reads as a breath.
- **Centre a floating insert at ~54.5% of the space above the subtitle band**,
  not 50%. A persistent top-left logo eats the top of the frame, so true centre
  leaves a visibly bigger gap below than above.
- **Symptom:** `check-subtitle-band.mjs` passes but an element is in the band.
  **Fix:** it only sweeps `.scene, .card, .brollwrap`. Any new top-level visual
  holder must be added to that selector or it is simply not measured.
- **`media_missing_id`** — a `<video>` with `data-start` and no `id` renders
  **frozen**. Lint catches it; it is an error, not a warning, for good reason.
- **Trimming one source into several beats** costs nothing: several `<video>`
  elements can share one `src` with different `data-media-start`. Check first
  whether the segments you want are contiguous — if they are, one element with a
  longer `data-duration` keeps the source's own cuts and transitions intact,
  which always looks better than re-cutting them yourself.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
