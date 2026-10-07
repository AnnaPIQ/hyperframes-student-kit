# get-the-second-sale: Design Spec

Format: 9:16 Reels/Stories, 1080x1920 @ 25fps (matches the A-roll). Full plan: `EDIT-PLAN.md`.
Campaign reference: `review-call-ad` (Oct 2026) for logo, caption and stage treatment.

## Style Prompt
A retention story told as one customer journey. ORDER #1 (Blue Tint dot) sits on the left,
ORDER #2 (Flame dot) on the right, joined by a Sky line. The gap between them is where the
strategy lives: email, offer and follow-up fill it in one calm, evolving scene. Sean is the
anchor, real B-roll is the proof, and Navy cards with crop-mark corners carry short copy beside
him. Calm pacing: every shot holds 1.35s or more, every graphic is readable before it leaves.

## Colors (each has one job)
- Navy `#06284C`: full-screen stages (with the campaign dot grid), side cards, proof card
- White `#FFFFFF`: headlines, captions
- Blue Tint `#9CD4FF`: the ORDER #1 marker (dot + label) and the single italic word on the end card
- Sky `#DEEEFE`: journey connectors, email / offer / follow-up cards, loop arrow
- Flame `#FF4C32`: the ORDER #2 marker, +41%, BOOK NOW. Nothing else

## Typography
Rethink Sans throughout (800 headlines at -2% tracking, 500 captions, 700-800 tracked labels).
Hedvig Letters Serif italic exactly once in the whole ad: *Free.* on the end card.

## Layout
- Graphics live between y 270 and y 1250 (Meta safe band).
- Captions: campaign treatment, white Rethink Sans 500 at 50px, bottom edge 270px above the frame
  bottom, soft dark shadow, never moved. All white: no coloured or italic caption words.

## Emphasis budget (land harder by using less)
Only three emphasis moments in the whole ad: **+41%** (Flame), the **BOOK NOW** button (Flame),
and *Free.* (the one italic, Blue Tint) on the end card. Everything else is white. The ORDER #1
(Blue Tint) / ORDER #2 (Flame) dots are the journey's colour code, not word highlights.
Never repeat in a caption a colour the graphic on screen already carries.
- Logo: white wordmark top-left (64, 150) in a non-clip wrapper, on every frame.
- Sean framed WIDE-L (face at x~370), side cards in the right column (x 620-1020).

## What NOT to Do
- No profit leaks, margin waterfalls, 90-day roadmap, $20K to $100K path, 01/02/03 cards, ceilings
- No sub-second shots, no flashing graphics, no text that leaves before it can be read
- No Dryft or other client footage under the +41% claim; the metric is exactly REPEAT CUSTOMER RATE
- No green for positive numbers, no extra hues, no glow, glitch, neon, confetti or cash SFX
- No second serif-italic word; no fake numbers on journey graphics

## Rebuild
```bash
bash scripts/build-plate.sh <dir-with-drive-masters>   # assets/media/plate.mp4 + vo.wav
npx hyperframes lint && npx hyperframes render --quality standard --output renders/final.mp4
```
No sound effects (removed at review) and no music bed: Sean's voice only. Add a licensed bed in the edit if wanted, at least 20 dB under Sean.

## Build notes (where the build differs from EDIT-PLAN.md)
- Captions follow the campaign (white, 50px, bottom edge 270px from the frame bottom), not the plan's y 1250 band.
- Picture cuts are hard cuts, as in the campaign; motion lives in card wipes, line draws and slow pushes.
  Graphics stages fade in over footage (0.2-0.36s) so nothing flashes.
- Sweet E's is named by the campaign CLIENT chip (SWEET E'S BAKE SHOP) above the +41% card, held 17.04-21.20.
- Authority shot is the Shoptalk stage close-up after the clip's own camera cut (source 14.56s),
  with a crop that pans with Sean. No Rebuy stats in frame.
- All B-roll is now frame-checked: Dryft hold, Shoptalk stage, Sean holding laptop, Erica x2.
- Opens at A-roll 0.56s with Sean already facing camera (his glance at the computer is trimmed);
  Sean is cut at 32.64s before he looks back down, then a 3s Navy end card holds BOOK NOW.
- Hook graphic (4.40-7.00) is a customer record: Order #1, then Order #2 "CAME BACK" lands on "buying again" and the count rolls 1 to 2.
- Lip sync: A-roll picture runs 2 frames (0.08s) behind its audio timecode to line lips up with the voice.
