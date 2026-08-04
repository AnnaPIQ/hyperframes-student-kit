# EcomIQ — Profit Short (20s, 9:16)

Footage-forward short-form vertical ad for EcomIQ (e-commerce intelligence). Talking-head
UGC recut to 20s with a branded end card. No motion graphics / no kinetic type — the
footage carries it.

## Spec
- **Format:** 1080×1920, 30 fps, 20.0 s (600 frames)
- **Source:** 3 takes of the same profitability script (Google Drive). **Take 1**
  selected — cleanest-drying audio (least reverb tail) + tightest delivery (194 wpm, zero
  long pauses). Selection evidence: noise floor −72.8 dB, fastest post-word decay.
- **Delivery:** `renders/ecomiq-profit-short-v1-final.mp4` (`--quality high`, CRF 15)

## The 20s cut (Take 1, silence-aligned)
| # | Beat | Source in→out | Edited | Line |
|---|------|---------------|--------|------|
| A | Hook | 0.00–6.05 | 0.00–6.07 | "There is money walking out the door on every single order that goes through your Shopify store." |
| B | Fix  | 12.40–19.65 | 6.07–13.33 | "The first one is your free shipping. Have you optimized that towards increasing your average order value?" |
| C | CTA  | 41.18–47.84 | 13.33–20.00 | "It's things like this that we cover inside our completely free profitability bootcamp. Click the link below…" |

Two jump cuts (native UGC style); each segment has a different room background because the
speaker moves through the house while filming — reads as intentional editing. Audio splices
land in silence with 8 ms edge fades.

## Audio
Cleaned chain: declick → highpass 75 → spectral NR (afftdn) → de-ess → gentle de-reverb
gate → compressor → two-pass loudnorm → makeup+limiter. **−16.3 LUFS, −1.2 dBTP**, noise
floor −72.8 → −96.3 dB. Video+audio kept in native sync (0/0); frame-sweep sync check
showed <1-frame drift.

## Brand / look (minimal, footage-forward)
- **Logo:** white EcomIQ, small, persistent, top-left. Corner-anchored legibility scrim so
  it stays readable over bright ceilings/windows without a visible box.
- **Face:** subtle grade `contrast(1.06) saturate(1.07) brightness(0.98)`, edge vignette,
  slow 1.00→1.03 Ken Burns.
- **No captions** (per brief), **no B-roll cutaways** (per brief — no real dashboard footage).
- **End card (last 3.1 s, 16.9→20.0):** navy canvas + blue bloom, white logo, "READY TO
  FIX IT?" kicker (blue-tint, letter-spaced), flame-orange pill "Click the link below →",
  subline "We guarantee the breakthrough you're looking for." Soft fade/stagger in (not
  kinetic). Matches the approved mockup.

Palette: navy `#06284C`, flame `#FF4C32`, blue-tint `#9CD4FF`. Type: Rethink Sans (local).

## Render contract notes
- GSAP vendored locally (`assets/vendor/gsap.min.js`), local `.woff2` fonts — no render-time network.
- Face `<video>` muted; cleaned VO in a sibling `<audio>` (track 4). Logo in a non-clip
  positioned wrapper (no drift). Timeline padded to 20.0 s (Law #11).

## Assets
- `assets/edit-video.mp4` — muted 1080×1920 face cut (600 frames)
- `assets/edit-audio.wav` — cleaned VO, −16 LUFS
- `assets/ecomiq-logo-white.svg/.png`, brand tokens, local fonts, vendored GSAP
