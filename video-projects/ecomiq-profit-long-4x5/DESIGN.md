# EcomIQ — Profit Short (Long version, 4:5 Meta feed)

The **4:5 (1080×1350)** cut of `ecomiq-profit-long`. Same continuous "long" take
(`Script 1_long`, take 3), reframed for the feed aspect. Full script, no cuts.

## Spec
- **Format:** 1080×1350, 30 fps, 67.0 s (footage 66.1 s + end-card hold)
- **Delivery:** `final.mp4` (visually-lossless CRF-18, kept under GitHub's 100 MB limit).
  The CRF-15 master is `renders/ecomiq-profit-long-4x5-final.mp4` (gitignored).
- Reuses `assets/edit-video.mp4` + `assets/edit-audio.wav` from `ecomiq-profit-long`.

## Reframing
- 1080×1920 source → 1080×1350 via `object-fit: cover; object-position: 50% 50%`
  (centered vertical crop). Crop-tested across the take — face stays well-placed,
  mic visible, nothing cropped.

## Structure & audio
One continuous take: hook → welcome-discount fix → free-shipping/AOV fix → bootcamp
pitch → spoken CTA (62.6–65.6 s). End card rises at 62.6 s and holds to 67.0 s.
Audio continuous (no splices), −16.0 LUFS.

## Brand / look
White EcomIQ logo top-left (corner scrim); subtle grade + edge vignette + slow
1.00→1.05 Ken Burns; end card "READY TO BE MORE PROFITABLE." + flame "Click the link
below →". No captions, no B-roll. GSAP vendored locally; timeline padded to 67.0 s.
