# ecomiq-short-form-3-motion — Design Spec

Format: 9:16 Story/Reels · 1080x1920 @ 30fps.

**Audio-driven motion-graphics version** of the EcomIQ 3 ad. Instead of a talking-head
base, Sean's VO carries the piece over an always-moving animated background, and Sean
appears only as a circular picture-in-picture, top-right, that pops in and out.

## Structure (~44.8s)
- **Ambient background (`bg.html`, track 0):** the constant motion-graphics canvas — deep
  navy with a drifting grid, drifting/twinkling particles, pulsing nodes, two animated
  chart lines, ambient glow drift, and a vignette. Deterministic (seeded mulberry32).
- **VO (track 1)** = `assets/aroll-video3.mp4` audio, the spine. **Music bed (track 2)** =
  silent duckable placeholder.
- **Sean PiP (track 3):** continuous muted `<video>` in a non-timed circular wrapper
  (`#sean-pip`), top-right. Shown/hidden by animating the wrapper opacity/scale — pops in
  ~1.4–11.5s (intro) and ~28.6–36.6s (retention), with a gentle idle bob.
- **Data-card scenes (track 4)** punctuate the message at their VO beats (reference-style
  dashboard cards): growth-inside (~6s), cost-to-reach (~14s), repeat rate (~21s), AOV
  (~25s), retention (~30s), then the **free bootcamp offer** scene (~37s).
- **Small logo (track 5)** top-left. **End card (track 6)** 40.8–44.8s.

No captions (added later). The cards reuse the reference-style comps; `bg.html` and
`scene-offer.html` are new.

## Deliverable
- `final.mp4` (project root) — 1080×1920, 44.8s, H.264 + AAC.

## Companion versions
- `../ecomiq-short-form-3` — talking-head cut (9:16), full-frame overlays.
- `../ecomiq-short-form-3-4x5` — talking-head cut (4:5).
