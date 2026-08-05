# ecomiq-profit-bootcamp — Design Spec

Format: 9:16 Story/Reels · 1080x1920 @ 30fps · Safe area ~10% margins.

Brand kit copied from `assets/ecomiq/`. Full reference: `assets/ecomiq/BRAND.md`.
Tokens live in `assets/brand-tokens.css`; fonts in `assets/fonts/` (local, no render-time network).

## This project's idea
- **Hook:** "There's money walking out of your store on every single order."
- **Message:** Two quick profit leaks to revisit — (1) your new-customer discount offer, (2) your free-shipping threshold / AOV — the kind of thing the free Profitability Bootcamp covers.
- **CTA:** Join the free Profitability Bootcamp — link below.

## Aesthetic decision — footage-forward, not motion-graphics
Per brief: a **founder UGC talking-head** ad, footage-forward. No karaoke captions, no
b-roll cutaways, no scene overlays. We keep the discipline (graded face, no hard cuts,
breathing branded outro) but let the footage carry it. This is a deliberate departure from
`MOTION_PHILOSOPHY.md` (which is the motion-graphics gold standard) — the brand brief here
is UGC, so we adapt texture while keeping the craft.

## Source & the cut
- Three takes were shot (all same close-clipped lav mic, same UGC selfie setup). **take2** is
  the only take whose wording matches the target lines verbatim → selected.
- Native footage is vertical 1080×1920 (phone shot 1920×1080 + rotation −90) — fills the 9:16
  frame with no crop gymnastics.
- Final cut = 4 segments of take2, dead air + the weakest meander removed, joined with **0.15s
  dissolves** (soften the walking-UGC background jumps; keeps the "no hard cuts" rule), audio
  loudness-normalized to ~−14 LUFS / −1.1 dBTP for social.
  1. Hook `0.00–5.08`
  2. Discount-offer tip `8.67–14.62`
  3. Free-shipping tip + bootcamp `21.87–38.64`
  4. CTA `47.02–end`
  → `assets/founder-cut.mp4`, 31.0s. Original take: `assets/founder-take2-original.mp4`.

## Composition (`index.html`)
- **Face (0–31s):** full-frame `assets/founder-cut.mp4`, muted `<video>` + sibling `<audio>` for
  the mixer. House grade `contrast(1.06) saturate(1.07) brightness(.985)`, soft navy vignette,
  slow Ken Burns push `scale 1.0 → 1.035` over the whole read.
- **End card (30.4–35s):** crossfades in as the CTA lands. Navy canvas + blue→flame bloom, white
  EcomIQ logo, eyebrow "Free Profitability Bootcamp", flame accent rule, headline
  **"Keep the *margin* you give away."** (signature italic-serif emphasis word on *margin*, tying
  back to the hook), flame CTA pill "Join free — link below →" with a breathing hold.
- Total 35.0s.

## Palette / type (from brand-tokens.css)
- Navy `#06284C` canvas · Blue-tint `#9CD4FF` accent/emphasis · Flame `#FF4C32` the one hot accent.
- Rethink Sans (bold headline/CTA) + Hedvig Letters Serif italic (single emphasis word). −2% tracking.

## What NOT to do here
- No second emphasis word; flame orange is the only hot accent.
- No captions / no b-roll (brief) — don't add scene overlays.
- Don't animate the `<video>` element directly — animate `#face-wrapper`.
