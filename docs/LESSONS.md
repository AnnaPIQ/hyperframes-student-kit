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

## Footage & cutaways

- **Screen-recording b-roll of your OWN branded product collides with the persistent
  overlay logo.** Symptom: the recorded page's own EcomIQ header sat top-left, doubling
  with the ad's persistent top-left logo. Fix: crop the cutaway to a region that excludes
  the product's own logo (e.g. the right-column result card), so only the overlay logo shows.
- **A white overlay logo vanishes on bright cutaways / white ceilings.** A drop-shadow alone
  won't save white-on-white. Fix: put a soft navy corner **scrim** behind the logo group
  (radial-gradient, ~0.5 alpha → transparent) so the white lockup reads on any shot.
- **Landscape screen recordings scroll — a fixed crop drifts off content.** Probe candidate
  crops as still frames first (`ffmpeg -ss <t> -vf crop=…,scale=…` → `Read`), pick a source
  window where the ROI is static, and cut short holds. Cropping to a vertical ROI (not
  letterboxing) also hides browser chrome/bookmarks/record-timer for free.
- **No Whisper in the web container** → can't get word-level timestamps. Fallback: map a known
  script to the audio via `silencedetect=noise=-30dB:d=0.3` (sentence gaps), and place b-roll
  overlays on those boundaries. Overlays tolerate ±1s drift; hard captions would not.
- **Drive footage downloads:** the MCP `download_file_content` returns base64 into context —
  catastrophic for a 40MB+ clip. For link-shared files just `curl -L "https://drive.google.com/uc?export=download&id=<ID>"`.
  Portrait phone clips carry `rotation=-90`; re-encoding bakes it to true 1080×1920 (probe to confirm).

## Verifying static changes without a full re-render

- **A full render is ~13–15 min; don't pay it to check one text/CSS tweak.** Drive the paused
  timeline directly with Playwright: load `index.html`, `page.evaluate(() => window.__timelines['<id>'].seek(<t>))`,
  screenshot. Pure-DOM scenes (end cards, title cards) render correctly this way — video-backed
  scenes won't (the engine, not GSAP, drives video frames). Run node from the workspace root so
  `node_modules/playwright` resolves; Chromium is at `/opt/pw-browsers/chromium`.

## Housekeeping

- **Gitignore render scratch dirs** (`render-work-*`, `**/renders/frames*`). They bloat
  commits and aren't deliverables.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
