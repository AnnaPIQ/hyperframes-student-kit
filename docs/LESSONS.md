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

## Talking-head + motion-graphics architecture

- **Cutting the A-roll into segments risks lip-sync drift on every splice.** If the VO
  and the picture come from the *same* take, don't cut the video at all. **Fix:** put
  ONE continuous muted `<video>` on track 0 for the whole runtime and layer full-frame
  graphic cards *above* it, revealing the founder at each seam. Picture is never
  re-cut against the audio, so sync cannot drift — and the "cut back to founder" is
  free (it's just the card exiting).
- **Revealing the A-roll under a card needs an exit tween, which the `/hyperframes`
  skill nominally bans.** Use MOTION_PHILOSOPHY's *cut-the-curve vertical whip*
  instead — matched exit/entry blur rides are the documented workspace transition and
  the only way to hand the frame back. Alternate the axis (y / x) per seam so the move
  doesn't repeat back to back.

## Transcription & VO prep

- **`whisper-cpp` missing and the GitHub clone is proxy-blocked (403).** **Fix:**
  `pip3 install faster-whisper` — pure-Python, pulls its model from Hugging Face
  (reachable), and emits word-level timestamps. Beats building whisper.cpp from source.
- **Whisper clamps the FIRST word's start time to 0 on a trimmed clip.** Don't validate
  a trim offset against word #1. **Fix:** check words 2–5 instead; if `e-commerce`,
  `coaching`, `is` all land at `expected − offset`, the offset is right.
- **A "verbatim" transcript from the client usually isn't what's on the tape.** The
  spoken take ad-libs, renames things, and runs longer. **Fix:** transcribe the real
  audio, then map the written lines onto the spoken sentences in order — the *audio* is
  the timing ground truth, the written script is only the message spine.
- **Trim leading silence before timing anything.** Compute one offset
  (`t_timeline = t_source − offset`) and derive every cue from it; re-deriving per scene
  is how off-by-a-beat errors creep in.

## Lint gotchas (hyperframes 0.8.x)

- **`gsap_non_transform_motion` on `"__unresolved__"`** just means *some* tween in that
  file animates `top`/`left`/`width`/`height`. The selector is unhelpful — grep the file
  for the property named in the message. **Fix:** move the static value into CSS and
  animate `x`/`y`/`xPercent` instead. Note it fires even when the property appears only
  in the `from` vars and never actually changes.
- **`overlapping_gsap_tweens` can be a 0.01s frame-rounding artifact.** A ride tween
  ending at `t+0.18` and a fade starting at `snap(t+0.18)` can overlap by one frame.
  **Fix:** leave a 2-frame gap (`t+0.22`) rather than reaching for `overwrite: "auto"`.
- **`hyperframes doctor` reports FFmpeg as failed while FFmpeg works fine.** The check
  is a false negative in this container — verify with `ffmpeg -version` before chasing it.

## Determinism

- **`drawSVG` is a paid GSAP plugin and silently does nothing.** **Fix:** set
  `stroke-dasharray`/`stroke-dashoffset` in CSS and tween `strokeDashoffset` to 0.
- **Prefer tweening properties over swapping classes for state changes.** `attr: {class}`
  at `duration: 0` is not reliably reversible under seek-by-frame capture; tweening
  `borderColor`/`backgroundColor`/`boxShadow` directly is fully seekable.
- **Deterministic "scatter" without `Math.random()`:** sort indices by a harmonic hash
  (`|sin(i·a+b)·cos(i·1.3+0.7)|`) and stagger along that order — random-looking, identical
  every render.

## A/V sync — the container offset that silently desyncs lips

- **Lips out of sync even though picture and sound came from the SAME file.** QuickTime
  recordings routinely carry a non-zero audio `start_time` (an edit-list offset) while
  video starts at 0 — check with
  `ffprobe -show_entries stream=codec_type,start_time,start_pts`. Extracting audio with
  `-i in.mov -vn out.wav` makes WAV sample 0 = source moment `start_time`, but seeking
  the video with `-ss T -i in.mov` lands on source moment `T`. Trimming both at the same
  T then leaves audio ahead of picture by exactly that offset. One real case: audio
  `start_time=0.078958` → a 79 ms lead, ~2.4 frames at 30fps, clearly visible (audio
  leading picture is the more noticeable direction; tolerance is roughly ±45 ms).
  **Fix:** seek the video to `T + audio_start_time`, not `T`. Snap to a source-frame
  boundary while you're there.
- **Measure the offset, never guess it.** Transcribe two 12s probes — one cut the way the
  VIDEO is cut (`-ss T -i file.mov -vn`), one cut the way the AUDIO is cut (trim the
  extracted WAV at T) — and diff the word onsets. A consistent delta across 4–5 words is
  the offset; after the fix the same diff should sit inside Whisper's ±20 ms granularity.
  Ignore word #1, whose start Whisper clamps to 0.
- **Scene timing is unaffected by this fix** when cuts are anchored to word onsets
  measured in the same WAV the VO track uses — only the picture moves. Re-check that
  before re-timing anything.

## Logo walls

- **A drifting logo wall needs the track ~2x the viewport, and density comes from row
  height.** Working values: 3 columns, `grid-auto-rows: 200px`, marks at
  `max-width:314px; max-height:104px; opacity:.34` plus
  `drop-shadow(0 0 18px rgba(6,40,76,.9))`. Stretching rows to fit fewer marks reads as
  sparse and empty — add marks instead.
- **Repeat the set in the SAME order, never shuffled.** With N marks listed twice, each
  mark's two copies sit exactly N tiles apart — the maximum possible separation, so no
  mark can appear twice inside one viewport. A "smarter" shuffle destroys that guarantee
  and visibly repeats marks a row or two apart.
- **Duplicating an `<img src>` trips `duplicate_media_discovery_risk`.** If you want the
  density without the warning, keep a second physical copy of each file under a distinct
  name (`foo-b.png`).
- **Hold the top/bottom fades solid past the first/last row**, not just a soft 12% ramp,
  or the edge row renders as a mark sliced in half. Solid to ~19% of frame height at the
  top clears both the clipped row and a pinned logo lockup.
- **Type over a logo wall needs its own scrim** — a localised radial band centred on the
  text block (not a full-frame wash, which flattens the whole wall into murk).

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
