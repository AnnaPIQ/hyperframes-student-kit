# Project Notes — lever-moved1-june26

## ⭐ FINAL DELIVERY — render at the HIGHEST resolution possible (per Nate)
When the cut is locked, the final export must be max quality/resolution — not a draft.

Plan for the final bake:
- `npx hyperframes render --quality high --output renders/lever-moved1-june26-final.mp4`
  (`high` = CRF 15, visually lossless at 1080p-class).
- **Resolution:** composition is authored at **1080×1350** (Meta 4:5 native max, and
  the highest-quality master for this format). NOTE: `--resolution` only accepts fixed
  presets (16:9 / 9:16 / 1:1 + 4K variants) — there is **no 4:5 preset**, and it rejects
  custom WxH ("Invalid resolution"), so a 2× supersample (2160×2700) is NOT available via
  the flag. A true 2× master would require re-authoring every comp's data-width/height +
  px layout ×2 (large effort) — and the footage (Sean 1920×1080) wouldn't gain real detail
  anyway. So: ship `--quality high` at 1080×1350.
- Consider `--fps 30` (match), high bitrate (`--video-bitrate 12M`) or even a **ProRes
  master** (`--format mov`) for an archival/edit-friendly version, then derive the
  delivery MP4 from that.
- Re-confirm GSAP is vendored locally (`assets/gsap.min.js`) so the high render needs no
  network.

## Status / decisions log
- Audio: **VO only** (ambient pad + SFX removed per direction).
- **Captions removed** from the composition (handled manually downstream; `captions.html`
  kept on disk if needed).
- Opening hook reworked to **diverging live counters** (AD SPEND ▲ / NET PROFIT ▼).
- Old plateau cold-open, proof dashboard, and **old-playbook graph** removed.
- Mid-section graphics (lever, exposes-weakness, conversion/retention/margin, lever-moved)
  removed; replaced with **b-roll cutaways 0:22–0:43** (dashboard-review → founder →
  coins burning), muted + watermark-cropped + graded.
- End-card "Learn More" button = **#FF4C32**, underline removed.
- AI b-roll via `npm run gen` (Runway) needs `RUNWAYML_API_SECRET` + egress to
  `api.dev.runwayml.com` (both disabled in current sessions — enable in env config + fresh
  session to generate in-container).
