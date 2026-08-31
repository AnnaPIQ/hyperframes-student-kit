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
- **Never retime a montage per shot. A viewer reads a speed CHANGE far more easily than a
  constant offset from native.** Allocating stretch inversely to measured motion (so the
  slow-motion hides where there is least motion to betray it) sounds right and is wrong:
  the picture visibly speeds up and slows down shot to shot, and it reads as broken rather
  than as a look. Verdict across three cuts of the same ad: 2.58× uniform = "too slow";
  1.20–2.47× per shot = "fast sometimes and slow sometimes, really horrible to watch";
  **1.0× native = correct.** Uniform slow-motion is a style choice; varying slow-motion is
  a fault. If you must stretch, stretch everything equally.
- **If the montage doesn't fit the runtime, change the runtime it has to fill — not its
  speed.** Motion-graphics beats are the lever. Going from 4 beats (23.4s) to 7 beats
  (43.7s) let the same 27.7s montage play at exactly 1.0×: every source frame once, in
  order, split across three windows chained with `data-media-start`. Never fill the gap by
  reprising shots either — that reads as a repeat.

## Retiming vs. runtime — the real lever

- **Retiming a short montage to cover a long VO has a hard ceiling.** Stretching
  27.7s of handheld footage over 71.4s (2.58x, 0.39x speed) read as syrupy slow-motion
  no matter how cleverly the stretch was distributed per shot. Per-shot allocation
  helps, but it cannot rescue a factor that big. **Fix:** give runtime to something
  else. Moving 23.4s onto a motion-graphics section dropped the same montage to 1.73x
  (0.58x speed) and the average shot from 1.93s to 1.30s. Reach for graphics *before*
  reaching for a bigger stretch factor.
- **Split one bed across two clips instead of shortening the montage.** A second
  `<video>` on the same src with `data-media-start` set to where the first clip ended
  lets a graphics section sit in the middle while the montage still plays through
  once, in order, with nothing reprised. Two clips, one pass.

## CSS traps specific to layered compositions

- **A full-bleed utility class with `inset: 0` silently wins `top`/`right` over a
  later rule that only sets `left`/`bottom`.** A lower-third sharing a `.gfx { inset:
  0 }` bed class got stretched to full height, so its `align-items: flex-start`
  content rendered at the TOP of frame, on top of the brand bug — 40s into the ad
  where no one was looking. **Fix:** don't mix a full-bleed class onto a corner-pinned
  element, and pin `top: auto; right: auto` on the corner element so nothing can
  stretch it. Frame-verify overlays over their *actual* background, not just once.
- **Scoping type tokens under an ancestor class (`.gfx .h2`) means every element that
  needs them must carry that ancestor class** — which is what tempts you into the trap
  above. Keep genuinely standalone pieces (`.lt-tag`, `.lt-name`) unscoped.

## Multi-ratio: generate, don't copy

- **Three ratios diverge the moment you hand-edit two of them.** Author one root
  composition, mark the per-ratio block with sentinel comments (`@@GEO@@` /
  `@@ENDGEO@@`), and emit the siblings from a script that swaps only that block, the
  composition id, the bed filename and the track offset. Drive every size off custom
  properties so the markup and the timeline are byte-identical across ratios.
- **Sub-compositions can't solve the multi-ratio problem** — a `<template>` sub-comp
  carries one fixed `data-width`/`data-height`, so a shared beat cannot serve 9:16,
  4:5 and 1:1. Inline the beats and vary the geometry with custom properties instead.
  (Expect `composition_file_too_large` warnings as a result; that is the trade.)

## HyperFrames: animating clips vs. their contents

- **Never animate a `clip` element's own opacity/transform for a scene enter/exit.** The
  framework owns a clip's visibility, so a non-linear seek can land past your exit fade and
  leave stale state — `hyperframes lint` catches it as `gsap_exit_missing_hard_kill`, and it
  fires when an exit tween ends exactly on another clip's start boundary. **Fix:** put an
  inner non-`clip` `<div class="wrap">` inside the clip, animate that, and hard-kill it with
  `tl.set(sel, {opacity: 0}, <exit time>)`.

## Shell hazards when driving renders

- **`pkill -f <pattern>` will kill your own shell if the pattern appears in its command
  line.** `pkill -f 'hyperframes render'` matched the wrapping bash (whose args contained
  the render command) and killed the whole invocation — surfacing as a bare `exit code 144`
  with no output, which looks exactly like a render crash. **Fix:** check with
  `ps -eo pid,args | grep` first and kill by PID, or pick a pattern that cannot match your
  own process. Don't pre-emptively pkill at all unless something is actually stuck.
- **A full render can exceed a 10-minute foreground timeout.** Run renders with
  `run_in_background` and poll, rather than losing the work to a SIGTERM at the deadline.

## Audio artefacts hide in the source — scan for them

- **A single loud high-frequency burst can sit in a master and survive every visual
  check.** This build shipped four times before one was reported: a near-pure ~11975 Hz
  tone, 16 ms long, peaking at **1.2601 (clipped above full scale)** where the speech
  around it peaked at 0.045 — +26 dB, and ~2200x the neighbouring window's 8–16 kHz
  energy. **Fix:** before shipping, sweep the VO for band-limited outliers, not just
  peak level:
  `-af "highpass=f=9000,astats=metadata=1:reset=1:length=0.02,ametadata=print:key=lavfi.astats.Overall.Peak_level:file=-"`
  and look for any window standing 20 dB+ above its neighbours. Peak/RMS over the whole
  file will not show it — the burst is short and the file is otherwise well levelled.
- **One biquad will not remove a +26 dB tone.** `lowpass=f=5500` only reached −18 dB,
  because 12 kHz is barely an octave above the corner. **Four** 2-pole stages at 4.5 kHz
  brought the window back to ordinary speech level (0.891 → 0.0485 vs a 0.0447
  reference). Chain stages; check the result numerically rather than assuming.
- **Repair band-limited, not by muting.** A timeline-gated low-pass
  (`lowpass=...:enable='between(t,a,b)'`, biquads support the `enable` timeline option)
  kills the tone while leaving the speech under it intact — no hole punched in a word.
  Verify the gate is click-free by comparing max sample-to-sample delta inside the
  window against ordinary speech (0.01917 vs 0.01883 here).
- **Prove where a defect lives before fixing it.** Montage beds built with `-an` and a
  silent `anullsrc` music bed meant the VO was the only possible path; confirming the
  burst in the raw `.mov` at the mapped PTS ruled out the compositing entirely.

## Editing a composition by slicing text

- **Removing a block by slicing between two comment markers will take anything that
  sits between them.** Cutting from the payoff-beat comment to the overlays comment
  silently deleted the two lower-thirds that lived in between. **Fix:** after any
  structural edit, assert every expected clip id is still present exactly once, and
  dump the clip table (id / start / end / track / media-start) before rendering. Both
  checks take seconds and caught this before a 20-minute render.
- **In a fixed-runtime edit, every cut has to be paid for.** Picture time minus the
  montage's native length gives the graphics budget exactly; removing a beat means
  adding another beat or taking footage from a different footage window. Work the
  arithmetic before agreeing to a cut, and say what it costs.

## Anchors outrank arithmetic

- **A graphic's position is set by the line it illustrates. Nothing outranks that.**
  Not a frame budget, not "use every source frame", not any invariant you set for
  yourself earlier in the build. On this build a requested cut freed 2.8s that had to
  come out of footage; to keep all 832 montage frames in play a beat's start was moved
  6.8s -> 8.8s, which put the graphic roughly four seconds after the words it
  illustrated. The viewer noticed immediately, and was right to. **When the arithmetic
  does not close, trim the montage** — an ordinary 2s editorial trim is invisible; a
  graphic out of sync with the voiceover is the whole point of the edit being wrong.
- **Do not change a timing the user did not ask you to change.** When one requested
  edit forces a second, unrequested one, say so and let them choose — do not pick the
  option that preserves your own bookkeeping. State the cost and ask.
- **Interpolating a phrase's position across a speech run is not measurement — and it
  will be wrong by seconds.** A cut had beat A's "5-10 years ago." headline at 9.70s
  because the phrase was estimated by dividing an unbroken 12.5s speech run
  proportionally by word count. Measured, the phrase is 8.12-9.25s: the graphic fired
  half a second *after* he finished saying it. The same guess had beat B's badge at
  13.70 when "Shopify Premier Partner" is 14.72-16.21 — a full second *early*.
  **Fix:** for every staged reveal, cut the VO bed down to the few seconds around it
  (`atrim`) and run `whisper-cli -ml 1 -oj` on that slice alone, then add the slice
  offset back. One-word segments come back with real per-word offsets; whole-file
  transcription does not, and `silencedetect` only finds the pauses *between* runs,
  never the words inside one. Budget ~10s per slice; it is cheaper than one render.
- **A beat that illustrates a sentence has to run the length of that sentence.**
  Anchoring a beat by its *payoff* line is not enough. Beat A on this build carried
  one sentence — "…are just one person, and they're giving you their personal opinion
  based on the time that they once worked at another DTC brand five to ten years ago"
  — and was placed at 8.8s, then 6.8s, then re-anchored internally at 6.8s. All three
  were rejected, because the sentence *starts* at 2.280s: the graphic was appearing
  three-quarters of the way through its own line every time. **Fix:** measure the
  first and last word of the clause the beat illustrates and make the beat span
  exactly that, then distribute the reveals across it. Positioning a beat by what is
  left in the frame budget produces this bug every time — and each partial fix costs
  a full render cycle plus a round of the viewer's patience.
- **Anchor the END of an entrance to the word, not the start of it.** Correcting a
  late badge by firing it exactly on "Shopify Premier Partner" (14.72) fixed the sync
  and immediately created the *other* defect: a 0.58s `back.out` entrance is still
  rising while the word passes, and the frame before it holds a dim eyebrow alone for
  1.2s. **Fix:** `start = word - entrance duration`, so the element lands on the
  syllable. Doing the arithmetic per reveal also closes the dead gap for free, because
  the entrance now overlaps the lead-in line instead of following it.
- **Holding on a finished frame is fine; holding on a half-built one is not.** The
  complaint earlier in this build ("stays on this screen too long with nothing
  happening") was about a beat that showed only a dim eyebrow for 1.5s. Beat B holds
  2.4s on a complete frame — eyebrow, badge, rule, two chips — and reads as a beat
  landing. Re-anchoring reveals later in a beat is safe for the same reason; it is
  emptiness, not stillness, that reads as broken.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
