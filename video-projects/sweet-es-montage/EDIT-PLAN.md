# EcomIQ × Sweet E's — montage cut · EDIT PLAN

**Runtime 46.20s** · 9:16 master 1080×1920 @30fps · 4:5 generated 1080×1350
**Timebase:** all times below are *edit time*, which is the timebase of the
shipped `assets/vo.m4a`. Edit time = A-roll master time − 2.40s.

Word onsets are measured from `assets/vo.m4a` itself (whisper `small.en`, word
level), **not** from the pasted script. See "Discrepancies" at the end.

---

## The shape

One continuous montage carries the picture from the first frame to 38.53.
Sean's voiceover runs over the top of it, complete, from 0.00 to 41.90. Proof
points land in navy bands on the footage; the montage is never cut away from.
The CTA end card dissolves up at 38.10 and holds to 46.20.

| Layer | In | Out | Notes |
|---|---|---|---|
| Montage | 0.00 | 38.53 | 29.967s of source retimed to 0.776× — see DESIGN §6 |
| Voiceover | 0.00 | 41.90 | the complete read, dead air trimmed off both ends |
| End card | 38.10 | 46.20 | dissolves up over the montage, holds 4.64s past the last word |

## Transcript, as the voiceover actually reads

| Edit in–out | Line |
|---|---|
| 0.00–3.52 | You probably know Sweet E's Bake Shop for cakes, |
| 3.52–5.24 | but here's what you don't know about them. |
| 5.24–8.60 | They'll put your logo or your photo on 10,000, |
| 8.60–11.12 | 20,000 cookies, absolutely no problem. |
| 11.20–12.26 | They've worked with brands like |
| 12.26–16.37 | Nordstrom, Tory Burch, Beyond Yoga, The Lakers, |
| 16.37–20.86 | and custom work at scale is something that almost nobody else can touch. |
| 20.86–24.12 | And this is all made in LA in hours. |
| 24.12–27.72 | Now this is a brand we've worked with for over four years. |
| 27.72–29.20 | They have been so successful. |
| 29.20–32.18 | They recently had to move into a bigger facility |
| 32.18–35.44 | that was three times the size just to keep up with demand. |
| 35.44–38.32 | This is the kind of business we get to work with. |
| 38.32–41.56 | If you want us in your corner, tap the link and find out more. |

Onsets that drive the bands: **`10,000` 7.45** · **`20,000` 8.60** ·
`Nordstrom` 12.26 · `Tory Burch` 12.88 · `Beyond Yoga` 13.96 ·
`The Lakers` 15.24 · `hours` 23.20 · **`four years` 26.50** ·
**`three times` 32.18** · `if you want us` 38.32

## Beat sheet — 7 bands + end card

Every band leads its spoken word by ~0.15–0.20s, and every band bottoms out at
y=1330 in 9:16 / y=930 in 4:5, clear of the platform subtitle zone.

| # | In | Out | Dur | Content | Lands on |
|---|---|---|---|---|---|
| O1 | 0.40 | 3.60 | 3.20 | `AN ECOMIQ CLIENT` / **Sweet E's Bake Shop** / Los Angeles, California | establishes the subject under the storefront shot |
| — | 3.60 | 7.25 | 3.65 | clean montage | |
| O2 | 7.25 | 11.20 | 3.95 | `YOUR LOGO. YOUR PHOTO.` / **10,000 → 20,000** / Cookies. No problem. | figure lands 7.45, swaps 8.60 |
| — | 11.20 | 12.05 | 0.85 | clean montage | |
| O3 | 12.05 | 16.40 | 4.35 | `THEY MAKE FOR` / Nordstrom · Tory Burch · Beyond Yoga · The Lakers | each name on its own onset |
| — | 16.40 | 17.30 | 0.90 | clean montage | |
| O4 | 17.30 | 20.90 | 3.60 | `CUSTOM WORK AT A SCALE` / **Almost nobody else can touch.** | under "custom work at scale" |
| — | 20.90 | 22.00 | 1.10 | clean montage | |
| O5 | 22.00 | 24.20 | 2.20 | `MADE IN LA` / **Out the door in hours.** | "made in LA" 22.14, "hours" 23.20 |
| — | 24.20 | 26.35 | 2.15 | clean montage | |
| O6 | 26.35 | 29.20 | 2.85 | `A BRAND WE HAVE WORKED WITH FOR` / **Four years** / And counting | "over four years" 26.50 |
| — | 29.20 | 32.00 | 2.80 | clean montage | |
| O7 | 32.00 | 35.40 | 3.40 | `DEMAND OUTGREW THE OLD SPACE` / **3× the size** / labelled 1:3 bars | "three times" 32.18 |
| — | 35.40 | 38.10 | 2.70 | clean montage | |
| END | 38.10 | 46.20 | 8.10 | EcomIQ lockup / **Want us in your *corner*?** / flame pill `Find out more` | "if you want us in your corner" 38.32 |

Balance: montage on screen alone for 14.15s across seven windows · bands
23.55s · end card 8.10s. Graphics are on screen 68% of the pre-end-card
runtime, and the top half of the frame is clean picture throughout.

## Transitions

- **Bands push in and push out.** 0.40s in from +14% Y at scale 0.97 under 8px
  of blur resolving to 0; 0.30s out to −8% Y. No flash, no white line, no bright
  element anywhere — the energy is movement only.
- **The end card is the one cross-dissolve**, 0.50s `sine.inOut`. The montage
  keeps playing underneath for the whole of it rather than cutting to a hard
  edge.
- The montage's own 21 cuts do the rest of the work, at 0.776× so each shot
  averages 1.84s instead of 1.43s.

## Asserted before each render, not eyeballed

`node scripts/verify-layout.mjs [build/4x5]` loads the composition in Chromium,
clears the entrance transforms GSAP applies on load, and measures real bounding
boxes:

- no band bottoms out inside the subtitle zone (bottom 30% of the frame);
- no band collides with the logo bug;
- nothing overflows the stage on any edge;
- the 3× bars are drawn at a measured 1:3 width ratio;
- both brand faces resolved to the local `.woff2` rather than to a fallback.

## Discrepancies found while grounding

1. **The recorded take does not match the pasted script.** The audio says
   *"…on 10,000, 20,000 cookies, absolutely no problem"*, *"over four years"*,
   and *"They have been so successful, they recently had to move into a bigger
   facility that was three times the size just to keep up with demand"*. The
   pasted script has a tighter read (*"ten thousand cookies. No problem."*,
   *"four years"*, *"because demand like that needs room"*). Everything is timed
   to the audio, since the ad is audio-led and that audio is what ships. If a
   take matching the script exists, send it and the re-time is cheap — the plan
   is timing-only.
2. **`20,000` is spoken and is shown.** It is corroborated only by the take
   itself; the pasted script says 10,000 alone.
3. **The montage is 9:16 native with no wider master**, so the 4:5 cannot be
   filled without losing 285px off the top and bottom of every shot. Both
   treatments are rendered — see DESIGN §5. **This is the crop flag.**
4. **The montage is 29.967s but has to carry a 41.90s voiceover.** It is retimed
   to 0.776× rather than cut, looped or frozen; the alternative shapes are in
   DESIGN §6.
5. **No case-study statistics are on screen.** An earlier Sweet E's build in
   this repo used four-year results from EcomIQ's own case study (7× sessions,
   +115% total sales, +15% AOV). Nothing in this voiceover says them aloud and
   they could not be re-verified here, so they are out. The 29.20–32.00 window
   is clean footage and would take a results band as-is.
