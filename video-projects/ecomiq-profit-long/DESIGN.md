# EcomIQ — Profit Short (Long version, 9:16)

Long-form single-take cut of the EcomIQ profitability pitch. Uses the **full "long"
take** (`Script 1_long.mp4`, take 3) as ONE continuous a-roll — the whole script,
no internal cuts — with the brand end card landing on the spoken CTA.

## Spec
- **Format:** 1080×1920, 30 fps, 67.0 s (footage 66.1 s + end-card hold)
- **Source:** take 3 (`Script 1_long`, id 1dTgV0j6…), rotation −90 → upright 1080×1920.
  Cleanest noise floor of the three takes; fullest script.
- **Delivery:** `final.mp4` (visually-lossless CRF-19). The CRF-15 master is
  `renders/ecomiq-profit-long-final.mp4` (gitignored).

## Structure (one continuous take — no cuts, no splices)
Full VO arc, spoken continuously: hook ("money walking out of your store on every
order") → fix 1 welcome discount → fix 2 free-shipping threshold / AOV → "two quick
fixes" → free profitability bootcamp pitch → **spoken CTA "Click the link below to
sign up for the free bootcamp"** (62.6–65.6 s). The end card rises at 62.6 s on that
CTA and holds to 67.0 s.

## Audio
Continuous (no splices): declick → highpass 75 → spectral NR → de-ess → gentle
de-reverb → compressor → two-pass loudnorm → makeup+limiter. **−16.0 LUFS**, −1.2 dBTP.

## Brand / look
- White EcomIQ logo top-left, persistent, corner-anchored legibility scrim.
- Subtle grade + edge vignette + very slow 1.00→1.05 Ken Burns over the full take.
- **End card:** navy + blue bloom, white logo, kicker "READY TO BE MORE PROFITABLE.",
  flame-orange pill "Click the link below →". No captions, no B-roll cutaways.

GSAP vendored locally; local fonts; timeline padded to 67.0 s (Law #11).
