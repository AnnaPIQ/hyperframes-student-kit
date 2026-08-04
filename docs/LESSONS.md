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

## Footage sourcing & prep

- **Google Drive footage: download to disk, never through the MCP connector.** The
  `Google_Drive__download_file_content` tool returns base64 into context — a 50 MB clip
  becomes ~67 MB of base64 and floods the window. **Fix:** `curl -sL
  "https://drive.usercontent.google.com/download?id=<ID>&export=download&confirm=t" -o
  clip.mp4` writes straight to disk (works for shared-folder files; the `confirm=t`
  skips Drive's large-file virus-scan interstitial). Use `get_file_metadata` first to
  confirm the byte size, then verify the download matches.
- **Selfie/GoPro vertical clips arrive as 1920×1080 with `rotation=-90` metadata**, not
  as true portrait. `ffprobe stream=width,height` reports the *stored* landscape dims;
  the displaymatrix rotates it to 1080×1920 on decode. **Fix:** re-encode with ffmpeg's
  default autorotate (it bakes the rotation → upright 1080×1920) and strip the flag
  (`-metadata:s:v rotate=0`). Check `ffprobe -show_frames ... frame_side_data=rotation`
  or just extract one JPG and confirm it's portrait before building.
- **FFmpeg doctor false-negative.** `hyperframes doctor` may report "FFmpeg Failed to run
  -version" while ffmpeg works perfectly (the `-version` probe trips under the sandbox).
  Confirm with a real `ffmpeg -version` before believing the toolchain is broken.

## Transcription (offline whisper-cli)

- **The offline transcriber DOES run in the cloud env** (contrary to the older note about
  egress-blocked models) — `hyperframes transcribe --model small.en` builds/caches
  `whisper.cpp` and works. It's just **slow** (~2 min per ~50 s clip on 4 shared cores).
- **Never run two transcriptions in parallel.** Every `transcribe` invocation writes to a
  fixed `transcript.json` (the `--output` flag is ignored), so concurrent jobs both write
  the same file → corruption, and they fight for CPU (each whisper-cli pins ~200%).
  **Fix:** run sequentially and `mv transcript.json takeN.json` after each. Also, a
  `nohup ... &` launched inside a foreground tool call gets reaped when the call returns —
  use the harness's real `run_in_background` for detached work.

## Talking-head audio cleanup (de-reverb → −16 LUFS)

- **A de-reverb expander (`agate`) over-ducks inter-word gaps → loudnorm can't reach the
  target.** Aggressive gating drops the integrated level while leaving loud word-onset
  peaks (crest climbs to ~20+ dB), so `loudnorm I=-16:TP=-1.5` caps out ~2–4 dB short
  because hitting −16 would blow the true-peak ceiling. **Fix chain that works:**
  `adeclick, highpass=f=75, afftdn=nr=12:nf=-45, deesser=i=0.3,
  agate=threshold=0.012:ratio=1.4 (gentle), acompressor=threshold=-21dB:ratio=2.6
  (tames crest BEFORE loudnorm)`, then two-pass `loudnorm`, then a final precise
  `volume=<+Δ>dB, alimiter=limit=<-1.2dBFS>` to land exactly on −16. Result on this build:
  noise floor −72.8 → −96.3 dB, −16.3 LUFS, −1.2 dBTP.
- **A/V sync: don't apply the ~0.16 s offset blind.** The LESSONS default (advance video
  ~0.16 s) is for when the engine visibly drops the source offset. On this build the
  engine kept video+audio synced (a bilabial-onset frame sweep showed <1-frame drift, not
  the 5–6 frames a real drop causes), so a blind shift would have *created* a desync.
  Verify with a frame sweep at a clear `m/b/p` onset before compensating; only shift if
  you see a gross, consistent gap. (Stills can't confirm sub-frame sync — flag it for a
  playback check.)

## Footage-forward shorts (no motion graphics)

- **Persistent corner logo: anchor the legibility scrim to the frame corner, not a box
  around the logo.** A bounded radial behind the logo reads as a faint dark rectangle over
  bright footage. Instead put a large `radial-gradient(120% 120% at 0% 0%, …)` on a
  corner-anchored wrapper so the shade bleeds off the top-left edge and never shows a box.
  Keep the logo `<img>` inset inside that wrapper.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
