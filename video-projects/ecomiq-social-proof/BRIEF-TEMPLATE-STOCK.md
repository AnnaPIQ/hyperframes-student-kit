# EcomIQ social-proof ad — brief variant: **b-roll sourced online**

Same ad, same style, but there is **no supplied b-roll** — it has to be found from free stock
libraries. Paste everything below the line into a new session. Fill the three `‹…›` blanks.

Everything in `BRIEF-TEMPLATE.md` still applies; this only changes where footage comes from,
and adds the licensing and consistency problems that come with it.

**Verified from this container (2026-08-27) — re-check, don't assume:**
- `api.pexels.com` works **without supplying a key** and is authenticated upstream
  (25,000 req/hr). Search returns real results and the MP4s download — a 2560×1440 clip
  pulled fine.
- Coverage is **patchy and query-sensitive**: `warehouse` returns results consistently,
  `packing` / `retail` / `shopping` returned 0 every time. A zero does not mean "nothing
  exists" — reword and retry.
- Pexels and Pixabay **web pages** are bot-blocked (403). Use the API, don't scrape.
- Pixabay's API is reachable but needs a real key. `mixkit.co` / `coverr.co` pages load,
  but their asset CDNs 403 on guessed URLs.
- Stock is overwhelmingly **landscape**, often 50/60fps. Our delivery is 9:16 and 4:5.

---

## Brief — EcomIQ social-proof ad (‹BRAND›), stock b-roll

Build an EcomIQ social-proof video ad in the **same idea and style** as
`video-projects/ecomiq-social-proof/`. New voiceover, new numbers, and **b-roll you source
from free stock libraries** — I'm not supplying any footage.

**Read first:** `video-projects/ecomiq-social-proof/BRIEF-TEMPLATE.md` (the full style, content
and pipeline spec — all of it applies), then `DESIGN.md`, `EDIT-PLAN.md`, `docs/LESSONS.md`,
and the workspace `CLAUDE.md` + `MOTION_PHILOSOPHY.md`. **Copy that project and swap the media
and numbers** — don't start from a blank composition.

**Sources**
- A-roll (Sean to camera, picture + sound): ‹DRIVE LINK›
- Proof / case study: ‹URL or the real figures›
- B-roll: **none supplied — find it.**

### Sourcing b-roll

1. **Transcribe the VO and build a shot list FIRST.** One line per beat: what the words are
   doing, and the shot that supports them. Search against that list. Never browse first and
   retro-fit the edit to whatever you found.
2. **Probe your search terms before committing to the shot list.** Coverage is patchy (see
   above). If a beat's shot can't be filled, change the shot idea, not the edit's meaning.
3. Use the **Pexels API** as the primary source:
   `https://api.pexels.com/videos/search?query=<q>&per_page=15&orientation=portrait`
   Take the largest `video_files` entry, note `width`/`height`/`fps`, and download the `link`.
   Prefer `orientation=portrait` — it exists for some terms and saves a brutal crop.
4. Fallbacks if a beat can't be filled: Mixkit / Coverr, or AI generation via
   `npm run gen -- --image <path> --prompt "<motion>" --project <slug>` (Runway Gen-4,
   needs `RUNWAYML_API_SECRET`, currently unset → `docs/AI-VIDEO-GEN.md`).
5. **Record every clip** in `assets/broll/CREDITS.md`: source URL, clip id, author, licence,
   and download date. Do this as you go.

### Licensing and honesty — the part that actually matters

This is a **social-proof ad**. Stock footage carries a specific risk here that it wouldn't in
a generic brand film:

- **Stock people are not ‹BRAND›'s customers or staff.** Never cut a stock clip so it reads as
  "here is a real customer" — no piece-to-camera lookalikes, no shots framed as testimonial, no
  stock face sitting under a customer quote or next to a retention stat in a way that implies
  that person is the data. Keep stock **contextual and non-attributive**: hands packing, a
  phone screen, shelves, a doorway, a delivery van. The proof lives on the navy cards; the
  footage is texture.
- **The real numbers still have to be real.** Sourcing footage freely does not loosen the
  "never invent proof" rule.
- **No recognisable third-party brands, logos, packaging or storefronts** in frame. You cannot
  imply a partnership that doesn't exist. If a clip has a visible logo, reject it — don't blur it.
- Pexels/Pixabay licences allow commercial use with no attribution, but **prohibit** using
  identifiable people to imply endorsement of a product or service. That is precisely the trap
  in a proof-led ad. Read the licence for each source and keep to it. If you are unsure whether
  a clip is safe for a paid social ad, **don't use it and tell me why.**
- If ‹BRAND› has its own product shots or store footage available, prefer them over stock for
  anything that needs to look like the brand itself.

### Making mixed stock look like one film

Stock arrives inconsistent; the reference build's whole look depends on it not being.

- **Frame rate:** clips come at 24/25/30/50/60fps. Normalise everything to the delivery 30fps
  (`npm run prep -- <file> --project <slug> --mute` does the render-ready re-encode).
- **Crop:** most stock is landscape and the delivery is 9:16 and 4:5. Pick clips with the
  subject **centred with headroom** so the vertical crop survives; reject anything where the
  action lives at the frame edges. Never letterbox. Check every crop on a real frame.
- **Colour:** grade toward one look. The reference used a per-clip brightness/contrast/
  saturation lift on the clips that sat darker (see `LIFT` in `scripts/prep-assets.sh`) —
  do the equivalent here, measured per clip, not one blanket filter.
- **Camera:** prefer slow or locked-off shots. The composition adds its own scale push and
  whip transitions; footage that's already moving fights them.
- **Reject:** watermarks or burned-in text, obvious stock-cliché setups, anything with a
  different colour temperature you can't pull into line, and any two clips that read alike
  (the reference learned this — cut back to Sean rather than run a near-duplicate).

### Everything else is unchanged

Audio-led, full VO, no cutdown. Graphics only where a real figure is spoken, each as a
full-bleed navy card. All text white, all display type weight 800, navy + flame only, logo
top-left, blur-whip cuts, vignette + grain, bottom ~30% clear for subtitles, EcomIQ end card.
Same script pipeline, same traps (`renders/` is gitignored — deliverables are the committed
`final-*.mp4` at the project root).

**Checkpoint:** give me the **shot list with the specific clips you've chosen** (thumbnail or
frame, source URL, licence) **plus the transcript-timed edit plan**, and wait for my approval
before rendering.

**Delivery:** 9:16 (1080×1920) and 4:5 (1080×1350), 30fps, H.264/AAC, `+faststart`,
`--quality high`, committed as `final-9x16.mp4` / `final-4x5.mp4` at the project root, plus a
sub-30 MiB copy of anything larger, and give me the links.
