# bf-webinar-ad, Design Spec

Format: 9:16 Reels/Stories · 1080x1920 @ 30fps · 37.0s
Full shot-by-shot plan: `EDIT_PLAN.md` (this build implements it).

## Style Prompt
A Black Friday Playbook presented by Sean, shot as real A-roll in his own office. No cut-outs.
Variety comes from framing and layout: pseudo multi-cam punch-ins (100% / ~110% / 130% crops of
the same take), reframing Sean left or right inside a split with a solid navy brand panel that holds
the typography, a framed window of his real shot beside the playbook card, and full-screen
interrupts (proof B-roll, the discount reset, bundles, October 14). Practical, premium, calm pacing:
no flash cuts, every state on screen at least 1.2s.

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

## Build notes (v2 draft)
- v2 replaces the v1 floating-head cut-out with real footage, at Anna's direction.
- v3 opening (Anna): plain A-roll first, design later. 0-3.5s original framing + one restrained overlay
  (DOUBLE YOUR / BLACK FRIDAY REVENUE?) on a soft top fade; 3.5s slight punch-in with single-line overlays
  (FREE LIVE WEBINAR, then THE BLACK FRIDAY PLAYBOOK). Split panels only return at the CTA.
- One `index.html` timeline (37.0s). Sean = `#sean-frame` (clip-path window) + `#sean-wrap` (crop transform).
  Shot presets live in `SHOT` / `WIN` in the script: OPEN, PUNCH, CLOSE (130%), WIDE, WINDOW, SPLIT_R (CTA).
- Subtitles: bottom edge at y 1720, all white on a soft navy backing box.
- No gradient fades over footage. Text on busy footage sits in a solid navy label box (`.lbox`).
- Highlights are rationed: Flame only on DOUBLE (hook), 14 (date card), FREE (CTA). No italics.
- Media is derived from the Drive sources by `scripts/prep-media.sh`. `assets/sean-aroll.mp4` (196MB) is gitignored.
- The Shoptalk stage stays real but defocused, with highlights crushed so Rebuy's LED stats are illegible.
- No music bed (no licence-cleared track in the workspace). SFX are synthesised (`scripts/make-sfx.py`).
