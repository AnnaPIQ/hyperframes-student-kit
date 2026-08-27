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

## ffmpeg gotchas that silently produce wrong data

- **`-v error` silently kills filter metadata.** `showinfo`, `signalstats`, `silencedetect`
  and friends log at *info* level, so scene detection / motion measurement returns an
  empty list instead of an error. **Fix:** scrape metadata at default verbosity
  (`-hide_banner -nostats` if you want it quiet) — never `-v error`.
- **`-ss A -to B -i in.wav -c copy` ignores the trim.** Stream-copy on WAV hands back
  most of the file, and `-ss` before `-i` combined with `-to` reports durations with the
  start offset folded in, so the file *looks* right in `ffprobe`. **Fix:** for exact audio
  slices use the filter — `-af "atrim=start=A:end=B,asetpts=N/SR/TB"` — and re-encode.
- **`select` + `setpts` + `fps` pads to the scaled end of stream.** Retiming a 17-frame
  shot by 2× yielded **1782** frames, because `fps` duplicates the last frame out to the
  (stretched) input duration, not the selected range. **Fix:** cap the output explicitly
  with `-frames:v <n>`. Verify with `ffprobe -count_frames`.
- **Frame-exact shot boundaries want frame numbers, not seconds.** Use
  `select='between(n,F0,F1-1)'` over a full decode rather than `-ss`/`-t`, then assert the
  concatenated frame count equals what you computed.

## Transcription — verify before you cut to it

- **`hyperframes transcribe --model small.en` can return correct words with fabricated
  word timings.** On a 79s VO the 245-word list contained **one** gap ≥0.30s where the
  audio had **nineteen**; it also reported `durationSeconds: 75` for a 79.000s file and put
  the first word at 0.00s when speech started at 2.054s. Anything cut to those timestamps
  lands on the wrong word. **Fix:** anchor to `silencedetect=noise=-34dB:d=0.30` for the
  real speech runs, then transcribe **each run in isolation** — short clips align reliably
  even when the full-file pass smears. Cross-check any human-supplied transcript too; the
  one on this build was 1.5–1.8s late throughout.

## Multi-ratio projects (one timeline, several sizes)

- **Standalone root compositions in `compositions/` must use ROOT-relative asset paths.**
  `../assets/...` lints as `invalid_parent_traversal_in_asset_path` and 404s in Studio:
  compositions are served with the *project root* as their base URL, even when rendered
  via `-c compositions/square.html`. Use `assets/...` from every depth.
- **A standalone root composition must NOT be wrapped in `<template>`.** `<template>` is
  only for sub-compositions pulled in via `data-composition-src`.
- **CSS `url()` resolves against the stylesheet, not the document.** A shared
  `assets/ad.css` needs `url(fonts/X.woff2)`, not `url(assets/fonts/X.woff2)` — the latter
  works only when the `@font-face` is inline in the HTML.
- **Lint merges sibling root compositions into one graph**, so three ratios sharing track
  indices produce bogus `duplicate_audio_track` warnings. **Fix:** offset track indices per
  variant (0–5 / 10–15 / 20–25). Tracks are per-composition, so this costs nothing.

## Working with supplied montage / stock masters

- **Check the tail before you retime — masters often carry their own baked end card.**
  Both showcase masters on this build ended with a full EcomIQ card ("Click The Link
  Below") in the last 1.988s. Retiming the whole file would have stretched it to ~5s and
  parked a second, differently-worded end card immediately before ours. **Fix:** scene-detect,
  eyeball a contact sheet of the tail, and stop the picture bed at the last live shot.
- **Confirm alternate-ratio masters share a cut list before deriving one set of timings.**
  `select='gt(scene,0.25)',showinfo` on each; identical frame counts *and* identical
  timestamps means one table drives every ratio.
- **When a montage must cover far more runtime than it was cut for, retime per shot, not
  uniformly.** Measure motion energy per shot (mean `signalstats.YDIF`) and allocate stretch
  inversely — near-static shots absorb the slack, moving shots stay closer to native. A flat
  2.58× read as syrupy; the same total spread 1.75–3.93× by motion held a ~1.9s average shot
  length. Never fill the gap by reprising shots: it reads as a repeat.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
