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

## Retiming & ffmpeg prep

- **`-ss X -i in.mp4 -to Y` silently cuts the wrong length.** Mixing an input-side
  `-ss` with an output-side `-to` is interpreted differently across ffmpeg builds.
  **Fix:** use `-ss X -t <duration>` (duration, not end time) whenever you are
  slicing a clip list — ambiguity here compounds across every segment.
- **Slow-motion interpolation must run PER SHOT, never across a cut.**
  `minterpolate` tries to find motion vectors between the last frame of shot A and
  the first of shot B and warps them into each other. **Fix:** cut first, retime
  each shot separately, concat after.
- **`minterpolate` is effectively single-threaded — fan segments out across cores.**
  A 30s reel took ~50 min serially and ~13 min across 4 workers
  (`ThreadPoolExecutor`, one ffmpeg per shot). Cache each segment to disk and skip
  the ones that exist, so a re-run after tweaking the EDL is nearly free.
- **Never trust the nominal EDL sum for a retimed clip.** Per-segment frame
  rounding loses a few frames on every shot (~0.09s each at 30fps), so a "64.4s"
  edit arrives several seconds short. **Fix:** deliberately overshoot the length
  you need, then `ffprobe` the concatenated result and build the composition
  against the MEASURED duration.
- **Scene-detect before assuming a montage is reusable.** `ffmpeg -vf
  "select='gt(scene,0.3)',metadata=print"` gives the shot list in seconds. Worth it
  for another reason too: supplied "montage" reels often already end with their own
  end card / logo sting, which will surface mid-video if you use the whole file.

- **Check the voiceover's loudness before shipping a social cut.** A raw VO
  arrived at **-32.6 LUFS** against a -8.2 dBTP peak (~24 dB crest); Meta and
  TikTok normalise toward ~-14 LUFS, so the ad would have played ~16 dB under
  everything around it in the feed. A flat gain can't fix that crest without
  clipping — use two-pass `loudnorm` (it limits), and fix it on the ASSET, not as
  a post-step on the rendered MP4 that the next re-render silently drops.
- **AAC re-encoding stretches a file by ~70ms (final-frame padding).** Harmless
  normally, fatal when every graphic is anchored to word onsets in a transcript.
  **Fix:** hard-trim the output back to the source duration (`-t <src_dur>`) and
  assert BOTH the duration and the speech onset (`silencedetect`) afterwards.
  `loudnorm` itself only changes level over time and never moves onsets — the
  encoder is the thing that shifts.
- **Pin a keyframe every second on any video the composition consumes.**
  The compiler warns `sparse keyframes (max interval: 2.4s) ... causes seek
  failures and frame freezing` — the renderer seeks frame by frame. Encode beds
  with `-g 30 -keyint_min 30 -sc_threshold 0` at 30fps.
- **Don't blow up a logo/icon SVG as an oversized watermark without checking it.**
  `ecomiq-icon-white.svg` carries a full-viewBox luminance mask and its paths run
  outside that box, so scaling it past the frame clipped to a visible hard-edged
  rectangle on the end card. A full-bleed `radial-gradient` bloom has no box to
  show and is safer.

## Multiple aspect ratios in one project

- **Two root-level HTML files with `data-composition-id` is a lint error**
  (`multiple_root_compositions`) — the runtime can discover both as entry points
  and double-play the audio. Moving the second one into `compositions/` then trips
  `invalid_parent_traversal_in_asset_path`, because it needs `../assets/…` and
  Studio resolves asset paths against the project root. **Fix:** ship each aspect
  ratio as its own sibling project with its own `assets/`, generated from the
  master by a script. Matches CLAUDE.md's "assets are duplicated per project, not
  symlinked."
- **9:16 → 4:5 cannot be done with scale+pad.** A 1080×1920 source padded into
  1080×1350 becomes 759×1350 with 160px black bars down both sides. Centre-crop
  285px off the top and bottom instead — but check faces on a contact sheet first
  and flag it, because it IS a crop.

## Clip windows vs GSAP tweens

- **An element that a GSAP tween reveals partway through its clip window is fully
  visible until that tween starts.** The clip system only controls presence, not
  opacity, so a sub-line tweened in at 32.8s inside a clip that opens at 30.8s sits
  there at full opacity for 2 seconds. **Fix:** set `opacity: 0` in CSS on
  everything GSAP brings in, and drive it with `fromTo` (never `from`).
- **Put timing attributes on the `<video>` itself, not its wrapper.** The wrapper
  stays an untimed plain `<div>` (it exists to be transformed, since animating the
  video element freezes frames). Same for `<audio>`, which also takes `data-volume`.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
