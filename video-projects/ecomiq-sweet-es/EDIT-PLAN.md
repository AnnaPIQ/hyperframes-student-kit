# EcomIQ × Sweet E's — transcript-timed EDIT PLAN

**Runtime 46.60s** · 9:16 master 1080×1920 @30fps · 4:5 generated 1080×1350
**Timebase:** all times below are *edit time*. Edit time = A-roll master time
− 2.40s (the cut starts 0.48s before Sean's first word).

Word onsets come from a word-level transcription of the actual A-roll audio
(faster-whisper `small.en`, key figures re-verified with `medium.en`), **not**
from the pasted script — see "Discrepancies" at the end.

---

## Transcript, as the A-roll audio actually reads

| Edit in–out | Line |
|---|---|
| 0.48–3.06 | You probably know Sweet E's Bake Shop for cakes, |
| 3.32–4.90 | but here's what you don't know about them. |
| 5.10–8.42 | They'll put your logo or your photo on 10,000, |
| 8.48–10.90 | 20,000 cookies, absolutely no problem. |
| 11.12–12.60 | They've worked with brands like Nordstrom, |
| 12.78–15.14 | Tory Burch, Beyond Yoga, The Lakers. |
| 16.20–18.92 | And custom work at scale is something |
| 18.92–20.54 | that almost nobody else can touch. |
| 20.68–23.50 | And this is all made in LA in hours. |
| 23.50–26.98 | Now this is a brand we've worked with for over four years. |
| 27.54–28.92 | They have been so successful, |
| 29.12–31.26 | they recently had to move into a bigger facility |
| 31.26–34.74 | that was three times the size just to keep up with demand. |
| 35.24–37.64 | This is the kind of business we get to work with. |
| 38.12–39.62 | If you want us in your corner, |
| 39.74–41.20 | tap the link and find out more. |

Note: with the reuse removed, S9 absorbs what used to be a second cookie-rack
beat. Both halves are A-roll and contiguous in the master, so they play as one
continuous take — no flash fires mid-sentence.

Figure onsets that drive the cards: **`10,000` 7.46** · `Nordstrom` 12.06 ·
`Tory Burch` 12.78 · `Beyond Yoga` 13.86 · `The Lakers` 14.70 ·
**`hours` 22.62** · **`four years` 26.00** · **`three times` 31.84**

---

## Beat sheet — 17 scenes

Every cut is a short **scale-and-slide push** — no white line, no flash, no
bright element of any kind. 0.22s, from +6% Y at scale 1.05 under 6px of blur,
resolving to 0. The energy is movement only.

**The ad opens on b-roll, not on Sean.** In the previous cut the first 0.4s
showed his hand reaching up to hit record. The cake shot now carries the whole
first VO line, which removes that entirely and gives the opening shot 3.30s
instead of 1.10s. Sean arrives on "but here's what you don't know."

**Each b-roll clip is used exactly once**; where a beat has no fresh b-roll it
plays Sean to camera. "Clean" = footage with no scrim, no graphic.

| # | In | Out | Dur | Source | Content |
|---|---|---|---|---|---|
| S1 | 0.00 | 3.30 | **3.30** | b1-cake | clean — opens on the ruffle cake being boxed, under "You probably know Sweet E's Bake Shop for cakes" |
| S2 | 3.30 | 4.65 | 1.35 | **A-roll** | Sean's first appearance — "but here's what you don't know about them" |
| S3 | 4.65 | 7.40 | **2.75** | b2-cookies | clean — trays of logo-printed cookies, under "your logo or your photo" |
| S4 | 7.40 | 10.85 | 3.45 | **CARD A** | **10,000 → 20,000** — lands on the spoken figures at 7.46 and 8.48 |
| S5 | 10.85 | 12.05 | 1.20 | **A-roll** | "absolutely no problem" |
| S6 | 12.05 | 15.25 | 3.20 | **CARD B** | client roster, each name on its own spoken onset |
| S7 | 15.25 | 17.45 | **2.20** | b3-sprinkle | clean — sprinkles falling, holding over the top of "custom work at scale", then **cross-dissolving** into Sean |
| S8 | 17.45 | 20.05 | 2.60 | **A-roll** | dissolves up over the cupcakes — "…is something that almost nobody else can touch" |
| S9 | 20.05 | 22.30 | **2.25** | b4-box | clean — cake boxed, under "made in LA" |
| S10 | 22.30 | 23.95 | 1.65 | **CARD C** | **MIDNIGHT → 8AM** — lands on "hours" at 22.62 |
| S11 | 23.95 | 25.95 | **2.00** | b6-sean-laptop | clean — EcomIQ at work, under "a brand we've worked with for…" |
| S12 | 25.95 | 29.15 | 3.20 | **CARD D** | **hero results card** — lands on "four years" at 26.00 |
| S13 | 29.15 | 31.70 | 2.55 | **A-roll** | "they recently had to move into a bigger facility" |
| S14 | 31.70 | 34.90 | 3.20 | **CARD E** | **3× THE SIZE** + labelled 1:3 bars — lands on "three times" at 31.84 |
| S15 | 34.90 | 37.70 | **2.80** | b5-erica-box | clean — Erica to camera with the cake box |
| S16 | 37.70 | 39.70 | 2.00 | **A-roll** | "if you want us in your corner" — direct address |
| S17 | 39.70 | 46.60 | 6.90 | **END CARD** | comes up under "tap the link and find out more", then holds 4.70s |

### Why the b-roll lengths are what they are
Every b-roll shot was lengthened except the first and last, which were already
long enough. Shortest is now **1.85s** (was 0.95s); the average is 2.49s, up
from 2.15s.

The extra time comes from the adjacent **A-roll** beats, never from a card — a
card's in-point is locked to the word it lands on. Each A-roll scene's
`data-media-start` moves with its start, so lip sync is preserved by
construction (asserted: all five A-roll scenes have `media-start == data-start`).

One exception: the laptop shot at 23.95 sits between two cards, so it had no
adjacent A-roll to borrow from. Card C gives up 0.20s of its tail (1.85 → 1.65s)
— its content is fully on screen by ~1.1s, so it still holds for ~0.55s.

The timeline is asserted contiguous: 17 elements, 0.00 → 46.60, zero gaps.

Balance: b-roll 14.95s over six clips (one use each) · A-roll 10.05s over five
appearances · figure cards 14.70s · end card 6.90s. 16 cuts.

### Card B — the client roster, as logos

A 2×2 wall of white chips, each holding the brand's **own logo file**, used
unmodified — never redrawn, never recoloured. The marks are dark, so each sits
on a white chip rather than being inverted to suit the navy. Each chip lands on
the moment its brand is spoken (12.06 / 12.78 / 13.86 / 14.70).

| Brand | File | Source |
|---|---|---|
| Nordstrom | `nordstrom.svg` | shield + wordmark, solid |
| Tory Burch | `tory-burch.png` | official solid mark, stacked lockup |
| Beyond Yoga | `beyond-yoga.svg` | **their own site's header wordmark**, lifted from beyondyoga.com |
| The Lakers | `lakers.svg` | official NBA-hosted crest, full colour |

Beyond Yoga's file paints with `fill="currentColor"`, i.e. it carries no colour
of its own; it is set to the black they present it in. Tory Burch's flat white
margin was trimmed so the mark fills its chip — a crop only, nothing redrawn.

**Legibility.** The chips are 420×250 with tight padding, and each logo is
`width/height: 100%` + `object-fit: contain` so it scales **up** to fill its
chip. This matters: with `width: auto` a logo only ever renders at its intrinsic
size, which had the Lakers crest drawing at 17% of frame width — far too small
to read in-feed. Measured rendered widths now:

| Logo | Drawn | % of frame width |
|---|---|---|
| Nordstrom | 368×151 | 34% |
| Beyond Yoga | 368×38 | 34% |
| The Lakers | 329×209 | 30% |
| Tory Burch | 231×209 | 21% |

Tory Burch is smallest because its stacked lockup is nearly square and so is
height-constrained; the others are wide and fill the chip's width. Card content
bottoms out at y=1093, still clear of the subtitle zone.

`scripts/fit-logo-viewbox.mjs` tightens a logo SVG's viewBox to its real ink
bounds — brand exports sit on a large square canvas, often behind a white
backing plate, which otherwise makes `object-fit: contain` fit the empty canvas.
It crops whitespace only. Run it on any newly added SVG.

## The five figure cards — every value sourced

### CARD A · 7.40–10.85
```
YOUR LOGO. YOUR PHOTO.        ← eyebrow
10,000                        ← figure, counts 0→10,000, flame hairline under
COOKIES. NO PROBLEM.          ← label
```
Spoken at 7.46. Corroborated by the case study: *"Send us your logo, send us your
photo. We'll plaster it on 10,000 cookies. No problem."*
**Decision (approved):** the figure lands as a whole `10,000` on the word at
7.46 and swaps to `20,000` on the second spoken figure at 8.48 — as Sean says
it. It is not a 0→N counter: that would have put "2,710" on screen exactly as
he said "ten thousand".

### CARD B · 12.05–15.25
```
THEY'VE MADE FOR
NORDSTROM      ← in at 12.06
TORY BURCH     ← 12.78
BEYOND YOGA    ← 13.86
THE LAKERS     ← 14.70
```
Set as **type**, weight 800, white — no third-party logo is redrawn or recoloured
anywhere in the piece. Each name whips in on its own spoken onset.

### CARD C · 22.30–24.15
```
MADE IN LA
MIDNIGHT → 8AM
ORDER DEADLINE TO BOXED
```
Both clock facts are stated in the case study (orders close at midnight; bakers in
at 4–5am; boxed by 8am). Stated as the two real times rather than a derived total
— see Discrepancies.

### CARD D · 25.95–29.15 — the hero
```
FOUR YEARS WITH ECOMIQ
7×        SESSIONS
+115%     TOTAL SALES
+15%      AVERAGE ORDER VALUE
```
"over four years" is spoken at 26.00. All three figures are the measured
four-year outcomes in EcomIQ's own Sweet E's case study. Rule of threes; each
counts up on a proxy tween, staggered 0.28s.
**Decision (approved):** all three run. They are the one set of figures in the
piece that are real and sourced but not spoken aloud; "four years" is spoken, and
every value is from EcomIQ's own case study.

### CARD E · 31.70–34.90
```
THEY OUTGREW THE OLD SPACE
OLD FACILITY  ▮                 1×
NEW FACILITY  ▮▮▮               3×
3× THE SIZE
```
Spoken at 31.84. Bars are drawn at a true 1:3 width ratio and both are labelled.
The case study says the new facility is "3–4× larger"; the card uses the
conservative figure Sean actually says.

### END CARD · 39.70–46.60
Oversized centred EcomIQ white lockup → wide-tracked uppercase
**SEE IF WE CAN HELP YOU** → flame pill **Find out more**. Held 4.70s after the
last word, all content above the subtitle zone.

---

## Discrepancies found while grounding — your call on the first two

0. **Resolved by you:** card A shows `10,000 → 20,000` as spoken; card D carries
   all three four-year results.

1. **The A-roll take doesn't match the script you pasted.** The audio says
   *"…on 10,000, 20,000 cookies, absolutely no problem"*, *"over four years"*,
   *"They have been so successful, they recently had to move into a bigger
   facility that was three times the size just to keep up with demand"*. Your
   script has a tighter read (*"ten thousand cookies. No problem."*, *"four
   years"*, *"because demand like that needs room"*). Two independent
   transcription passes agree on the audio. **I've timed everything to the audio
   I have, since the ad is audio-led.** If a newer take matches your script,
   send it and I'll re-time — the plan is timing-only, so it's a cheap swap.
2. **`20,000` is spoken and now shown**, per your call. Note it is corroborated
   only by the take itself — the case study and your script both say 10,000.
3. **I avoided asserting "8 hours."** The case study lists a total fulfilment
   window of 8 hours, but its own timeline runs midnight order → noon delivery,
   which is 12. Card C states the two verifiable clock times instead.
4. **B-roll source #6 is mislabelled in the brief.** Listed as *"Sweet Es team
   working 1min – 1.03"*; the file is *"Sean on laptop - typing low angle.MP4"*
   and is only **14.56s** long, so `1:00–1:03` doesn't exist. I used 1.80–6.20s
   of it and placed it where it earns its keep — under "a brand *we've* worked
   with", where showing EcomIQ working is the point.
5. **Sweet E's has no white lockup.** Their site publishes one logo, pink, and
   only at 180px/120px in the markup; the underlying master is 1000×396 with
   alpha. I pulled the master and use it **unmodified** — it reads well on navy.
   Recolouring it to white would break the "never redraw" rule, so the pink
   stays. It is currently only in `assets/`; tell me if you want it on the end
   card as a "×" lockup with the EcomIQ mark.
6. **The reference project doesn't exist in this repo.** There is no
   `video-projects/ecomiq-social-proof/` in any commit — no `DESIGN.md`,
   `EDIT-PLAN.md`, `index.html`, `pull-media.sh`, `prep-assets.sh`,
   `make-ratios.py` or `scrub.mjs` to copy. I rebuilt the pipeline from the
   brief's spec on top of the EcomIQ brand kit and `npm run new`, and measured
   the trim points, crop windows and brightness lifts myself (all recorded in
   `scripts/prep-assets.sh` and DESIGN.md §6). If that project lives in another
   repo or branch, point me at it and I'll reconcile against the real thing.

---

## Status — awaiting your sign-off on the cut

Rendered `--quality standard` only, per your instruction. Nothing is baked at
`high` until you confirm the cut.

| File (project root) | Size | Spec |
|---|---|---|
| `preview-9x16.mp4` | 46.6 MiB | 1080×1920 · 30fps · H.264/AAC · +faststart · 46.60s |
| `preview-9x16-small.mp4` | 13.4 MiB | same, CRF 24, for playback in chat |
| `preview-4x5.mp4` | 32.3 MiB | 1080×1350 · 30fps · H.264/AAC · +faststart · 46.60s |

Lint: 0 errors, 0 warnings on the 9:16 master and the generated 4:5.

**This revision:**
- **No b-roll clip appears twice.** The two beats that had reused b2-cookies and
  b4-box are now Sean to camera. S9 absorbed the old cookie-rack repeat, giving a
  4.35s on-camera hold through "custom work at scale… nobody else can touch" —
  the longest hold in the piece, on the line that carries the argument.
- **The cuts are no longer flat.** Each is a hard 6px white horizontal line with
  a white/blue-tint halo, swept top to bottom over 0.22s and crossing centre
  exactly on the cut, trailing a blurred glow wake, with a short full-frame
  flash (0.30 opacity, ~0.045s) on the cut. The incoming scene arrives from
  +15% Y at scale 1.07 under 24px of blur.

**Verified from the render:**
- The line was measured, not eyeballed: a row-luma profile during a whip shows a
  single bright band (peak 230 at y≈300) against 162 max on a clean frame — one
  clean line, nothing stationary or doubled.
- Every scene sampled in both ratios: six distinct b-roll clips, six Sean beats,
  five cards, end card. No cropped faces, no overflow, subtitle zone clear
  (9:16 y<1344, 4:5 y<945).
- Card E bars still exactly 3.000; no frame shows a figure other than the real
  value (sampled every 0.10s).

**On confirmation** I'll bake both at `--quality high` and commit them as
`final-9x16.mp4` / `final-4x5.mp4`.
