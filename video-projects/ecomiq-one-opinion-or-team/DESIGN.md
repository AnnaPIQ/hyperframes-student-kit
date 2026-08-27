# EcomIQ — "One opinion, or a whole team?" (founder ad)

Format: **4:5 Meta feed · 1080×1350 @ 30fps** · runtime **73.3s** · safe area ~96px.
**Subtitle band:** the bottom ~22% (300px on 4:5, 450px on 9:16) is deliberately kept
clear of graphics so subtitles can be added by hand afterwards. `botGuard` in the
format config enforces it for every card; the b-roll chips sit above it too.
Sister cut: `video-projects/ecomiq-one-opinion-or-team-story/` (9:16, 1080×1920) —
identical beat sheet, re-laid-out.

## The idea

Most ecommerce coaching is one person selling you the playbook from the one brand
they happened to run — years ago. EcomIQ is the coaching arm of a Shopify Premier
Partner, so you get a whole team working inside dozens of live brands every day.

- **Cold open:** the founder himself, straight to camera — no card
- **First graphic:** "Based on one brand" → "5–10 YEARS AGO." (both white, per direction)
- **Turn / payoff:** "So — which do you want?" → one opinion vs a whole team
- **CTA:** "Book a call." / flame gradient pill "Tap the link below →"

## Source material

| Input | Detail |
|---|---|
| A-roll | `how we work with you.mov` — 3840×2160 ProRes, 25fps, 77.6s, single take |
| VO | **the A-roll's own audio** — trimmed at 6.12s, high-passed at 80Hz, loudness-normalised to −16 LUFS / −1.5 dBTP, padded to 73.3s |
| A/V sync | the source's audio stream starts at **0.078958s** while its video starts at 0, so the picture is cut at **6.20s** to line up with audio cut at 6.12s |
| Word timings | `faster-whisper small.en`, word-level. **Every scene cut is anchored to a real word onset.** |

`t_timeline = t_source − 6.12`. Speech runs t=0.40 → 67.92; the CTA card then
holds 5.4s in silence.

**The 79 ms sync offset matters.** The `.mov`'s audio stream carries an edit-list
offset (`start_time = 0.078958`, video `start_time = 0`). Extracting audio to WAV
makes sample 0 = source moment 0.079, while seeking the video lands on the literal
timestamp — so trimming both at 6.12 left audio leading picture by 79 ms (~2.4
frames), which reads as bad lip sync. The A-roll is therefore cut at **6.20s**
(source frame 155 @ 25fps) against an audio cut of 6.12s. Scene cuts are unaffected:
they're anchored to word onsets measured in the same WAV the VO track uses.

The founder's delivery is looser than the written script (he ad-libs "five or ten
years ago", names "Pacific IQ", says "keep you accountable"). The spoken audio is
the ground truth for timing; the written transcript maps to it line-for-line, in order.

## Palette — 5 working colours, one meaning each

| Colour | Hex | Owns |
|---|---|---|
| Navy | `#06284C` | the canvas. Every graphic scene. |
| White | `#FFFFFF` | neutral headline words + emphasis keywords (**non-italic**) |
| Flame | `#FF4C32` | the CTA pill, the strike-through kill-marks, the "accountable" chip |
| Muted blue-grey | `#6F8DB3` | "before", struck-through, the thing you're not getting |
| Soft blue | `#9CD4FF` | positive tags, the team, what you do get |

Deep-navy panels (`#0A325F`–`#0D3A6B`) and border `#1D4A7A` are surface tones, not
accent colours.

## Type

**Rethink Sans only**, local `.woff2` (no CDN at render time). Headlines 800wt at
−3% tracking, ~0.95 leading. Big numerals −4.5% tracking, `tabular-nums`.

> Deviation from `/ecomiq-ad`'s default, on purpose: the skill's signature is one
> Hedvig-serif *italic* emphasis word. This ad's brief locks emphasis to **white,
> non-italic**, with flame reserved for pain words — so Hedvig is not used here.

## Scene chrome (on EVERY graphic beat)

Navy base → two radial blooms (blue top-left, flame bottom-right) → faint 90px grid
→ 12 deterministic registration crosshairs → vignette → CSS grain. The grid drifts
and the vignette breathes across every slot: the camera never sleeps.

The EcomIQ lockup is pinned top-left (60px) in the **root** composition, so it
persists across all 73.3s, over both the A-roll and every card. A navy scrim sits
over the A-roll so the white lockup always separates from the blue-lit backdrop.

## Structure — 9 graphic beats + a client b-roll beat, interleaved with 7 founder segments

The A-roll is **one continuous muted clip on track 0** for the whole piece; the
graphic cards sit above it and reveal it at each seam. That guarantees lip-sync can
never drift, because the picture is never re-cut against the audio.

| # | Beat | t | Lands on |
|---|---|---|---|
| — | **Founder cold open** — the ad opens on his face, no card | 0.00–4.87 | "most ecommerce coaching is just one person" |
| S02 | Brand card greys out, struck through, **"5–10 YEARS AGO."** | 4.87–8.97 | "five or ten years ago" |
| — | **Founder** | 8.97–12.30 | "this is why EcomIQ is completely different" |
| S03 | Partner reveal — the real **Shopify Premier Partner badge** on a white credential card + Pacific IQ chip | 12.30–16.37 | "Shopify premier partner" |
| S04 | **Team grid** — 10 real headshots pop in 3/4/3 with their roles, then "An entire *team's* knowledge" | 16.37–20.70 | "not one person's take" → "an entire team" |
| S05 | **Logo wall** — 21 real client marks drifting up, no type at all | 20.70–24.63 | "dozens" |
| — | **Founder** | 24.63–28.67 | "now here is how it works" |
| S06 | Step 01 — strategy session; both rows white, blue step spine | 28.67–34.43 | "map out your business" |
| — | **Founder** | 34.43–36.43 | "two specialist…" |
| S07 | Step 02 — big **2** counts up, coach avatars, flame "accountable" chip | 36.43–42.20 | "one-on-one calls a month" |
| — | **Founder** | 42.20–45.07 | "full Slack support" |
| S08 | Step 03 — 7-node founder network, links draw between them | 45.07–51.60 | "a community of founders" |
| — | **Founder** | 51.60–54.53 | "every single strategy" |
| — | **Client b-roll** — Sweet E's then Dryft Sleep, real footage with brand chips | 54.53–59.40 | "pulled from real client work…" |
| — | **Founder** | 59.40–61.43 | "before it comes anywhere near you" |
| S10 | Payoff — a lone struck bar vs the lit team cluster | 61.43–65.33 | "a whole team's opinion" |
| S11 | CTA end card — icon, "Book a call.", flame pill; **holds 5.4s** | 65.33–73.30 | "tap the link… book a call" |

**Callbacks:** the strike-through motif runs S02 → S10; the one-vs-many contrast is
set up by the S04 team grid and paid off in S10; the 01/02/03 spine ties S06–S08.

**S04 team grid** follows the `Team_Knowledge.mp4` reference: eyebrow, a staggered
3/4/3 wall of headshots flying in oversized-and-blurred one at a time, each with a
role label, then the payoff line with "team's" in flame. Source photos are in
`assets/team/`, cropped square and face-checked. **The role labels are read off that
reference's own grid** — the same ten people appear in it — rather than assigned by
guesswork, which would mean publishing invented job titles for real named people.

**Client b-roll (54.53–59.40)** reuses two portfolio clips from the
`aug-general-ad-5` branch (~18–20s in that build): Sweet E's and Dryft. They're
cover-cropped per format and slowed ~1.23× so the pair fills the slot to the frame —
a `<video>` that runs out of source black-frames, so the arithmetic has to be exact.
Each clip is a `<video>` in the **root** composition (never inside a sub-composition)
with an untimed wrapper carrying the drift, per render-contract #9. They cut out hard
rather than fading — a fade ghosts the A-roll through for a few frames — with the seam
streak carrying the cut.

The **S05 logo wall** reuses the prepped client marks from the `aug-general-ad-5`
branch (`assets/logos/`, 21 white knockouts produced by `scripts/prep-logo-wall.sh`
on that branch). Geometry is ported from that original: 3 columns, 200px rows, marks at
314×104 max and `.34` opacity, lifting to `.48` as "DOZENS" lands. The 21 marks are
listed **twice in the same order** (second set as `-b.png` copies) so each mark's two
occurrences sit exactly 21 tiles apart and none can repeat inside one viewport. Top
and bottom fades are held solid past the edge rows so no mark renders sliced, and a
localised radial band keeps the headline clear of the marks behind it. **The Shopify Premier
Partner badge is deliberately excluded** from this wall.

## Motion grammar

- Every entrance is `gsap.fromTo` — `from` leaves `opacity:0` elements invisible.
- **No hard cuts.** Every seam is a cut-the-curve whip: the card rides in from
  +170px under `blur(30px)` and rides out the opposite way, revealing the A-roll.
  Axis alternates y / x across the 11 seams so no move repeats back to back.
- A light streak crosses each seam; 5 bigger white→flame streaks mark the act breaks
  (8.97 / 28.67 / 54.53 / 59.40 / 65.33), including both edges of the b-roll beat.
- Numbers count up. Elements settle with a slight overshoot (`back.out`).
- Every tween lands on a 1/30s boundary — steep eases alias off-grid.
- No `repeat: -1` anywhere; ambient loops use finite `yoyo` counts.
- Every scene timeline ends on `tl.to({}, { duration: SLOT }, 0)` — Law #11, or
  HyperFrames hides the card early and you get a black-frame flash at the tail.

## Claims discipline

Everything on screen traces to something the founder actually says. An earlier draft
carried a "top 1% of agencies" chip in S03 — invented, not in the VO, not verifiable —
and it was cut. "Dozens" stays the word because that is the word he uses; no fabricated
brand count appears anywhere.

## What NOT to do

- No second hot accent — flame is the only one. On direction it has been pulled back
  further: the S02 headline, the step-card emphasis words ("whole business", "holding
  growth back", "next right move") and the active step spine are all now white or soft
  blue, so flame survives only on the strike-through kill-marks, the "accountable" chip
  and the CTA pill.
- Keep the bottom band clear — see the subtitle note at the top.
- No italic serif emphasis (see the type note above).
- Never animate the `<video>`; the wrapper `#founder-wrap` takes the push.
- No CDN GSAP, no Google-Fonts link, no render-time fetch of any kind.
- Don't letterbox the A-roll — it is cover-cropped from the 4K source per format
  (4:5 crops `1728×2160@x=966`; 9:16 crops `1215×2160@x=1223`, both face-centred).

## Rebuilding

Both cuts are emitted from one beat sheet so they can't drift apart. The generator
(`beats.mjs` / `theme.mjs` / `scenes.mjs` / `build.mjs`) lives in the session
scratchpad; the committed HTML is self-contained and hand-editable — edit it
directly for one-off tweaks.

```bash
cd video-projects/ecomiq-one-opinion-or-team
npx hyperframes lint
npx hyperframes render --quality draft --output renders/draft.mp4
npx hyperframes render --quality high  --output renders/final.mp4
```
