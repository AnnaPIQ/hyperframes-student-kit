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

## EDL-based clip assembly (event-video-assembly, ffmpeg-native — not Hyperframes)

- **Symptom:** Phone A-roll clips render sideways (90° rotated) even though `ffprobe` shows a landscape 3840x2160 and there's NO `rotate`/`displaymatrix` metadata. **Fix:** the rotation is *baked into the pixels* with no flag, so nothing auto-rotates. Detect orientation **visually** (extract a thumbnail and look) — never trust coded dims or metadata — then `transpose=1` (90° CW) the offending clips before scaling. A whole shoot can be affected identically.
- **Symptom:** A clip auto-rotates correctly in one place but the "same" issue clip doesn't. **Fix:** some clips have real rotation metadata (ffmpeg autorotates on decode) and some have baked-in rotation (needs manual `transpose`). Verify each clip's *decoded* orientation with a native-resolution frame extract, not the stream's `width/height`.
- **Symptom:** Still photos (JPEG) come in rotated or as the wrong aspect. **Fix:** EXIF orientation. Bake it once: `ffmpeg -i in.jpg -update 1 out.png` produces an upright PNG; point the timeline at the PNG so there's no render-time EXIF ambiguity. Feed stills to the timeline with `-loop 1 -framerate <fps> -t <dur> -i img` (no `-ss`).
- **Symptom:** Final MP4 has a 3rd `data` stream; `-dn` + explicit `-map 0:v -map 0:a` don't remove it. **Fix:** it's the iPhone `tmcd` timecode track the mov/mp4 muxer re-writes. Strip it on a stream copy with **`-write_tmcd 0`** (harmless if left, but cleaner to remove for delivery).
- **Pattern that worked:** drive the whole cut from a single `edl.json` (per-segment src/in/out/fit/prerotate/transition) + a Python builder that emits one `ffmpeg` `filter_complex`: normalize every segment (fps + scale/crop or blurred-pad to target + `setsar=1` + `format=yuv420p`), then chain with `xfade` using **cumulative offsets** (`offset_i = running_len - transition_dur`; `running_len += dur_i - transition_dur`). Map every transition type onto xfade: hard cut = `fade`@~1frame, dissolve/matchcut = `fade`, dip-to-black = `fadeblack`, dip-to-white = `fadewhite`. Apply one global grade+vignette on the final composite for mixed-camera cohesion. This makes 15+ rounds of "swap/trim/reorder/retime" cheap — edit JSON, re-render, no filtergraph surgery.
- **Delivery-format sanity checks** worth running on the final: `pix_fmt=yuv420p`, faststart (`moov` before `mdat`), an AAC audio track present even if silent (empty/duckable bed for VO/music added later), and 2 streams only (v+a).
- **Fit for 9:16 vertical:** native-portrait footage → scale-to-cover + center-crop (`force_original_aspect_ratio=increase,crop=W:H`) fills edge-to-edge with no bars. For landscape-into-vertical (or vertical-into-landscape) use a darkened+blurred copy of the same frame as the pillarbox/letterbox background so the subject pops.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
