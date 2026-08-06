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
- Final cut = the client's **exact 6-line script** — 3 segments of take2 (the two elaboration
  tangents dropped), joined with **0.15s dissolves** (soften the walking-UGC background jumps;
  keeps the "no hard cuts" rule), audio loudness-normalized to ~−14 LUFS for social.
  1. `0.00–12.42` — "There's money walking out of your store on every single order, and here are
     two quick things you should revisit… The first one is your new customer discount offer."
  2. `21.95–23.36` — "And second one, free shipping."
  3. `32.47–50.30` — "…it's things like this that we cover inside our profitability bootcamp. It
     is completely free to join, and we are going to show you guys all these places where you can
     find margin that you can keep instead of giving it away to your customers. Click the link
     below to sign up for the free bootcamp."
  → `assets/founder-cut.mp4`, 31.5s. Original take: `assets/founder-take2-original.mp4`.

## Composition (`index.html`)
- **Face (0–31.5s):** full-frame `assets/founder-cut.mp4`, muted `<video>` + sibling `<audio>` for
  the mixer. House grade `contrast(1.06) saturate(1.07) brightness(.985)`, soft navy vignette,
  slow Ken Burns push `scale 1.0 → 1.035` over the whole read.
- **Top-right logo:** persistent white EcomIQ lockup (`ecomiq-logo-white.png`) with a soft navy
  corner scrim + drop-shadow so it stays legible over the white-wall shots; fades out into the
  end card.
- **End card (31.1–35.6s):** crossfades in as the CTA lands. Navy canvas + blue→flame bloom, white
  EcomIQ logo, eyebrow "Free Profitability Bootcamp", flame accent rule, headline
  **"Keep the *margin* you give away."** (signature italic-serif emphasis word on *margin*, tying
  back to the hook), flame CTA pill "Join free — link below →" with a breathing hold.
- Total 35.6s.

## Deliverables — two aspect ratios
- **9:16 (1080×1920)** — `index.html` → `final.mp4`. Primary Reels/TikTok/Shorts.
- **4:5 (1080×1350)** — `index-4x5.html` → `final-4x5.mp4`. Meta feed. Same cut/timings/logo/end
  card; the face is cropped **from the top** (`object-fit:cover; object-position:50% 100%` keeps
  the lower frame where the face + mic sit). End card re-laid for 1350 height (not cropped).
  Render with `npx hyperframes render -c index-4x5.html --quality high`.

## Palette / type (from brand-tokens.css)
- Navy `#06284C` canvas · Blue-tint `#9CD4FF` accent/emphasis · Flame `#FF4C32` the one hot accent.
- Rethink Sans (bold headline/CTA) + Hedvig Letters Serif italic (single emphasis word). −2% tracking.

## What NOT to do here
- No second emphasis word; flame orange is the only hot accent.
- No captions / no b-roll (brief) — don't add scene overlays.
- Don't animate the `<video>` element directly — animate `#face-wrapper`.
