# ecomiq-next-step — Design Spec

Format: 9:16 Reels/TikTok · 1080x1920 @ 30fps · 59.6s · organic talking-head (Sean) + end card.

## The idea
Having information vs. knowing what to do next. Ecommerce founders have tools and
data but no one who understands the whole business to help them pick the next step.

## Rules for this piece (deliberately NOT the motion-graphics house style)
- No motion graphics or graphic cards during the talk. Hard cuts only. One static
  end card (3s, 0.3s dissolve in) matching the EcomIQ end-card template.
- Sean (A-roll, his real room) anchors ~84% of the runtime. Crop changes 100-120%,
  only on cuts or pauses, pivoting on his eye line (`transform-origin: 50% 40%`).
- B-roll is social proof only (3 shots): strategist conversation, Shoptalk stage,
  founders in conversation. Every shot must prove something the line claims.
- The "biggest ecommerce brands in the US" claim plays on Sean, never over
  third-party or client footage.

## Type & colour
- Subtitles: Rethink Sans 620, 62px, white `#FFFFFF`, crisp 6px navy `#06284C` outline
  (`-webkit-text-stroke` + `paint-order: stroke fill`; blurred glows read as soft).
  Standard bottom position (last line ends ~190px above the frame edge), `text-wrap: balance`.
  US spelling. Text follows Sean's actual delivery, not the original script.
- Highlights (3 total): "lonely" Blue Tint `#9CD4FF`; "Personal Strategist" and
  "right plan" Flame `#FF4C32`.
- Logo: EcomIQ navy lockup top-left, static. White variant only over the dark-wood
  laptop shot (swap rides the hard cuts).

- End card: navy radial glow (grain-dithered against banding), white logo, headline
  "Turn good information into the right plan" (Rethink 700, 64px, white, one block),
  flame pill "Link Below". Extra air above the headline and
  above the pill.

## Sources
- A-roll: `Untitled 2.mov` (4K ProRes 25fps), 9:16 crop x=1352, src 0:00.48-0:57.10.
- B-roll (rotated 90° CW where shot vertical):
  - Sean holding laptop talking to man, src 0:03.20-0:06.37
  - Sean talking on stage at Shoptalk - rebuy, src 4:04.50-4:06.76 (crop x=790)
  - Sean and Mason standing talking to 2 woman, src 0:04.00-0:06.90

## What NOT to do
- No whooshes, zoom/whip transitions, kinetic type or dashboards.
- No Rebuy stats slides, Klaviyo/TikTok signage, or client footage behind claims.
- Music: only a licensed, understated bed (slot is commented out in index.html).

## Masters (Meta upload)
- Build inputs: `bash scripts/prep-masters.sh` (near-lossless CRF 10 intermediates + PCM
  dialogue into `assets/master/`, gitignored).
- 9:16: `npx hyperframes render --fps 25 --crf 12 --video-frame-format png -o renders/EcomIQ-NextStep-9x16-master.mp4`
- 4:5:  same flags plus `-c index-4x5.html`, output `renders/EcomIQ-NextStep-4x5-master.mp4`
- 25fps matches the A-roll (no 25 to 30 judder). Verified: H.264 High 4:2:0, ~39/27 Mbps,
  AAC 48k stereo, -13.4 LUFS / -1.3 dBFS peak, moov at front, SSIM 0.98 / PSNR 42.5 dB
  against the original 4K ProRes.
- Lint flags `multiple_root_compositions` because both index files sit at the root.
  Renders were checked for doubled audio (loudness unchanged); always render each with
  its own file.
