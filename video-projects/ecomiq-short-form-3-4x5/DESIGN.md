# ecomiq-short-form-3-4x5 — Design Spec

Format: 4:5 Meta feed · 1080x1350 @ 30fps · Safe area ~10% margins.

**4:5 counterpart of `video-projects/ecomiq-short-form-3` (9:16).** Same A-roll, same
copy, same brand system — only the frame/layout differ. Keep the two in sync.

## Structure (~44.8s — full original take)
- **Spine (0–44.8s):** `assets/aroll-video3.mp4` (native 9:16) cover-cropped to fill the
  4:5 frame with `object-fit: cover; object-position: 50% 72%` — biased low so more is
  trimmed off the top, raising the head so the eyes sit on the upper third (hair not
  clipped across the clip). Muted `<video>` (track 0) + sibling
  `<audio>` VO (track 1). Plays uninterrupted, no overlays.
- **Persistent logo (track 3):** `ecomiq-logo-white.svg` top-left, scrim + drop-shadow.
- **End card (40.8–44.8s, track 5):** navy, centered white logo, headline **"Join our Free
  Profitability Bootcamp"** (single color, no italic), flame CTA pill **"Start free →"** —
  overlays the tail so total runtime ≈ the original length.
- **Music bed (track 2):** `assets/music-bed-placeholder.m4a` — silent duckable placeholder
  (`data-volume="0.18"`). Swap the src for a real track later.

No cutaways / motion-graphic overlays. No captions.

## Deliverable
- `final.mp4` (project root) — 1080×1350, 44.8s, H.264 + AAC.
