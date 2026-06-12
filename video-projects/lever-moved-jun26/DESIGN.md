# lever-moved-jun26 — Design Spec

Format: 4:5 Meta feed · 1080x1350 @ 30fps · Safe area ~10% margins.

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens live in `assets/brand-tokens.css`; fonts in `assets/fonts/fonts.css` (local).

## This project's idea
A talking-head Meta ad for Shopify/DTC founders. Full-bleed founder footage
(60.3s, center-cropped 16:9→4:5) with word-synced captions and a single
signature motion graphic — **the lever**.

- **Hook:** "Spending more. Making *less*." (paraphrases the opening pain)
- **Message:** The old growth lever (spend more → grow more) stopped working ~18
  months ago. More spend now just *exposes* weak conversion, poor retention, and
  margins that can't scale. The platforms changed — **the lever moved**.
- **CTA (full navy card):** "What's actually *holding* your growth back?" →
  flame pill **"Click the link below →"**

## Discipline (high-end / restrained)
- **One text zone at a time.** Hero punch lines *replace* bottom captions during
  their moment; the 3 weaknesses appear as the center list, not also captioned.
  Every spoken line is still on screen (accessibility) — never two text blocks.
- **Flame appears exactly twice:** the word "*moved*" (+ the knob's flame pulse,
  same beat) and the CTA pill. Withholding it everywhere else is why they land.
- **Motif + callback:** the lever — quiet intro ~24s, payoff slide ~46.5s.
- **Type:** Rethink Sans (captions/heads) + Hedvig Letters Serif *italic* for the
  one emphasis word per key line. Tone: calm, cinematic, confident.

## Files
- `index.html` — single root composition (face video track 0 + sibling `<audio>`
  for VO; everything else timeline-driven). Lint-clean.
- `assets/lever-face.mp4` — prepped footage (H.264, 60.32s, with audio).
- `BRIEF.md` / `STORYBOARD.md` — full creative plan.

## Caption timing note
Estimated from the supplied line-level transcript (transcription is network-
blocked in this container). Verify/nudge against the rendered audio. If a real
word-level `.srt` becomes available, replace the `CAPS` array in `index.html`.
