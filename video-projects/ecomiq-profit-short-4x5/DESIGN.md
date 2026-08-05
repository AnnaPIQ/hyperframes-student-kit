# EcomIQ — Profit Short 4:5 (22s, Meta feed)

The **4:5 (1080×1350) Meta-feed cut** of `ecomiq-profit-short`. Same edited footage,
cleaned VO, and end card — reframed for the feed aspect.

## Spec
- **Format:** 1080×1350, 30 fps, 22.0 s (660 frames)
- **Delivery:** `renders/ecomiq-profit-short-4x5-final.mp4` (`--quality high`, CRF 15)
- Reuses `assets/edit-video.mp4` + `assets/edit-audio.wav` from the 9:16 project
  (identical Take 1 cut: hook → free-shipping fix → CTA; VO ends "…apply for access").

## Reframing
- Source edit is 1080×1920. Face video uses `object-fit: cover; object-position: 50% 50%`
  into the 1080×1350 frame — a **centered vertical crop** that keeps the face well-placed
  with the mic visible below across all three segments (crop-tested before building).
- Subtle grade + edge vignette + 1.00→1.03 Ken Burns, same as the 9:16.

## Brand / look
- White EcomIQ logo top-left, persistent, corner-anchored legibility scrim.
- **End card (16.9→22.0 s):** navy + blue bloom, white logo, kicker "READY TO BE MORE
  PROFITABLE." (one line), flame-orange pill "Click the link below →". No subline.
- No captions, no B-roll cutaways (per brief).

Palette: navy `#06284C`, flame `#FF4C32`, blue-tint `#9CD4FF`. Type: Rethink Sans (local).
GSAP vendored locally; timeline padded to 22.0 s (Law #11).
