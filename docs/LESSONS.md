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
- **Butt-joined VO clips jolt at the splice — in BOTH audio and video.** Two adjacent
  `<audio>` clips from non-contiguous source times click/jump at the boundary (sample gap +
  ambient-level discontinuity), and if a talking-head `<video>` also cuts there it's a
  visible jump-cut. **Fix (two parts):** (1) pre-splice the VO into ONE file with a short
  fade across the join — `atrim` each side, `afade` out/in at the cut, `concat` — and
  reference that single file; (2) put a b-roll cutaway *over* the join so the face splice
  happens off-camera. Verify the audio with `astats` RMS across the boundary (should stay
  steady, no spike or drop-out).
- **Splice on WORD boundaries from the transcript, not round numbers — a fade won't save a
  cut placed mid-word.** Fast talkers leave ~0ms between words, so trimming at a tidy
  timestamp (e.g. 19.0s / 38.9s) silently leaks the neighbouring word: it left the "Wh" of
  the next "When" on one side and a stray "…is" fragment before "Because" on the other,
  heard as a glitch even with fades + a b-roll cover. **Fix:** pull exact word start/end
  times from the transcript JSON and cut so each side ends/starts on a full word
  (`atrim=0:19.00` ended "flat"; `atrim=39.00:…` started "Because"). Re-transcribe the
  spliced file to confirm the word sequence has no fragment before shipping.

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

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*

- **Removing an interior sentence from a talking-head VO (splice-free join):**
  Symptom → the cut leaks the first word of the removed section (a stray "When…"),
  and no amount of nudging the trim by ±0.1s fixes it. Root cause → **the transcriber
  quantizes word boundaries to round numbers**: it reported "flat." ending at 19.00 and
  "When" starting at 19.00, but a **spectrogram** (`showspectrumpic`) showed "When"'s
  voiced burst actually begins at ~18.92 — so every cut at 19.00 kept its onset, and
  "extending the breath" to 19.45 pulled in the whole word. Fixes that finally worked:
  (1) **Use a spectrogram/waveform to find the true acoustic onset**, not the transcript
  timestamps — cut a hair *before* it (18.60 here). (2) The take already had ~0.5s of its
  **own quiet room tone after the word** — use that as the pause; do NOT splice a foreign
  "breath" snippet (word-free gaps elsewhere are often louder crowd noise and stick out).
  (3) Join the two halves with an **equal-power `acrossfade` (c1=esin:c2=esin)**, not a
  fade-to-silence on each side — the latter leaves an audible dropout notch in continuous
  ambience. (4) Verify on the **rendered** file, both by re-transcribing AND by eye on a
  join spectrogram.
