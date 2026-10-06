# bf-webinar-ad, Design Spec

Format: 9:16 Reels/Stories · 1080x1920 @ 30fps · 37.0s
Full shot-by-shot plan: `EDIT_PLAN.md` (this build implements it).

## Style Prompt
A Black Friday Playbook presented by Sean. Navy canvas, Sean as a floating-head
cutout that moves between a few planned positions, information evolving around
him. One persistent playbook card that activates topic by topic. Practical,
premium, calm pacing: no flash cuts, every state on screen at least 1.2s.

## Colors (exact, nothing else)
- Navy `#06284C`: every background, cards (as White 6-10% over Navy)
- Blue Tint `#9CD4FF`: supporting words, numbers, active bars, sub-tags
- White `#FFFFFF`: hero type, labels, subtitles
- Sky `#DEEEFE`: grid, ticks, connecting lines, calendar strip
- Flame `#FF4C32`: DOUBLE, FREE, the date 14, the LIVE dot, the final FREE. Nothing else.

## Typography
- Rethink Sans (local woff2): 800 for hero (-2% tracking, 1.0 leading), 700 for labels and subtitles
- Hedvig Letters Serif: the single italic subtitle moment ("eight and nine figure")

## Layout grid
- Graphics zone y 290-1080 · Subtitle zone y 1110-1240 (bottom edge locked at 1240)
- Nothing important in y 0-270 or below y 1250 (Meta UI)

## What NOT to Do
- No colours outside the five above, no gradients that read as new hues
- No shot or graphic state under 1.2s, no hard cuts, no white flashes
- No numbers or results that are not in the script or on the landing page
- No brand names on product B-roll; the Rebuy stats behind Sean on stage must stay illegible
- Never more than one Flame element competing on the same frame (CTA pill stays white)

## Build notes (v1 draft)
- Implements EDIT_PLAN.md section by section in a single `index.html` timeline (37.0s).
- Media is derived from the Drive sources by `scripts/prep-media.sh` (cutout, B-roll, voice loudness).
  `assets/sean-cutout.webm` (54MB) is gitignored; run the script to regenerate it.
- Deviations from the plan:
  - Subtitles sit on a soft Navy 62% backing so they stay readable over B-roll (white shirt on stage).
  - No music bed: no licence-cleared track in the workspace. SFX are synthesised (`scripts/make-sfx.py`).
    Add a licensed bed at about -26 LUFS under the voice if wanted.
  - End-frame EcomIQ logo sits at y 200 (the CTA stack starts at y 330).
  - The Shoptalk wall is blurred and tinted, and the matte is cleaned so no Rebuy stat or letter remains.
- Known minor: faint colour spill on Sean's outer hair edge (from the monitors behind him at the shoot).
  Only visible up close. A manual roto pass would remove it.
