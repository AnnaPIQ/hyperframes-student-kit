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

## Brand assets

- **`ecomiq-logo-white.svg` renders with an inverted icon in the render engine.** The
  mark is drawn with a `mask-type:luminance` mask and off-canvas path coordinates;
  headless Chrome resolves it differently from a design tool, so the icon lands as a
  dark block on navy instead of a white block with the navy motif inside. It is not
  obvious at corner-logo size and very obvious at end-card size. **Fix:** use
  `ecomiq-logo-white.png` (1671×286, has alpha) for both the corner logo and the
  lockup. Check any new SVG logo by rendering a frame, not by opening it in a viewer.

## Layout

- **Scaling an A-roll `<video>` wrapper below 1.0 exposes the frame edge as navy
  bars on all four sides.** "Push the footage back" as a state change looks right in
  the abstract and wrong in the render. **Fix:** always push *in* (scale > 1.0) and
  carry the state change on an overlay's opacity instead. Same read, no bars.

## Render-breaking

- **`--video-frame-format png` fills the container disk on long vertical footage.**
  Extracting a 46s 1080×1920 A-roll to PNG is ~4–5 GB of frame cache, on top of a
  ~12 GB allowance. **Fix:** only pass it when a *video* source is text-heavy UI shown
  near native scale. Images (`<img>` page renders, covers) are unaffected by the flag,
  so text crispness from stills costs nothing.

## Compositions

- **Assets referenced from a file in `compositions/` must be root-relative.** `../assets/…`
  lints as an error (`invalid_parent_traversal_in_asset_path`) — compositions are served
  with the *project root* as their base URL, so write `assets/…` even from a subfolder.
- **An `id` that starts with a digit breaks `querySelector`.** `id="9x16-r1"` makes
  `#9x16-r1` a SyntaxError. Don't derive element ids from a ratio key like `9x16`.
- **A GSAP count-up leaves the final value on screen for barely a frame if the tween
  ends near the clip's end.** Plan the count to *land* ~1s before the clip ends, and add
  a trailing zero-delta tween that keeps writing the final value — otherwise a re-created
  clip element reverts to its HTML default. (Shipped `8 / 31 / 17` instead of
  `8 / 32 / 19` on the first draft.)
- **Two tweens touching the same property with adjacent start/end times trip
  `overlapping_gsap_tweens`.** An entrance ending at t and a slow push starting at t
  count as overlapping — leave a frame or two of daylight between them.

## Sourcing

- **Google Drive files over ~100 MB return a virus-scan interstitial, not the file.**
  A plain `drive.usercontent.google.com/download?id=…&export=download` gives HTML.
  **Fix:** scrape `uuid` out of the interstitial's form and replay with
  `&confirm=t&uuid=<uuid>`. Verify the first bytes are the real container before using it.
- **Don't pull a multi-GB Drive file through the MCP connector** — `download_file_content`
  returns base64 into context. Use the connector to *resolve* the file (title, size, mime)
  and `curl` to fetch the bytes.

---

*Add new entries above this line as you discover them. One symptom → fix per bullet.*
