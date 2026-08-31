# Mob Armor social-proof ad — shot list & edit plan

**Whose ad:** EcomIQ, crediting Mob Armor. EcomIQ navy + flame throughout, EcomIQ end
card, Mob Armor's white wordmark on the stat cards.
**Master format:** 9:16 · 1080×1920 · 30 fps. Relayout: 4:5 · 1080×1350.
**Runtime:** 36.00 s (VO 1.38 → 35.13, then 0.87 s of tail). Cut from 38.60 s on
Nate's note — nothing spoken is lost, the end card just stops holding dead air.
**Registers:** Sean to camera (A-roll), motion-graphic stat cards, client b-roll — the
edit moves between all three. Sean opens it and closes it.
**Source of truth for timings:** `assets/vo-transcript.json` — word-level Whisper
(`small.en`), head and every hero block re-transcribed on trimmed segments and
cross-checked against `silencedetect` boundaries. All beat times snapped to 1/30 s.

---

## 0 · The voiceover (transcribed, not supplied)

> Up over 500% in a single year. That's what happened to Mob Armor's total sales after
> they started working with us. And it wasn't a lucky viral moment. It wasn't a magic ad.
> When they came to us, almost everything ran through Facebook. There was one channel
> doing all of the work. We found three more that fit the brand and got them working in
> the right order. A year later, sales are up over 500% across four channels instead of
> just one. And that's what the right plan does. This is a real brand with real numbers.
> If you wanna see what's possible for yours, tap the link to find out more.

This is an **EcomIQ case study about Mob Armor's results** — not a Mob Armor product ad.
That changes which figures earn a graphic (see §3).

Hero word onsets (s): `500%` **1.90**, `single year` 3.21, `Mob Armor's` 5.39,
`Facebook` 13.92, `one channel` **14.96**, `three more` **17.69**, `right order` 20.52,
`A year later` 22.05, `500%` **24.08**, `four channels` **25.45**, `just one` 26.85,
`tap the link` 33.55, ends 35.13.

---

## 1 · Sourcing report — what I found and what I didn't

**Every beat is filled from first-party Drive material. No stock, no UGC, no YouTube.**

The brief expected the Drive folder to be product-only and warned I'd have to go hunting
for off-road / trucking / work-truck context. It's actually in there — buried inside the
Social Cuts rather than shot as standalone b-roll. Scene-detection across all 12 cuts
surfaced:

| Context the brief said was missing | Where it actually is |
|---|---|
| Off-road | `Tab Mount Maxx Tube` 31.9–35.0 — drone, buggy across sand dunes |
| Race / UTV | `Tab Mount Maxx Direct` 9.6–10.8 — race UTV, Method wheels, at an event |
| In-cab driving | `Mobnetic Stix` 2.8–4.6 and 29.2–30.0 — dash mount, road ahead |
| Work truck / fleet | `Tabnetic Direct` 34.5–44.0 — worker fitting a rugged tablet, then the tablet locked in |
| Manufacturing | `Tabnetic Discs` 5.9–9.9 — CNC/plasma cutting, sparks |
| Facility / real ops | `Tabnetic Direct` 30.0–37.0 — warehouse floor, worker fitting a mount |
| Real people | `Mobnetic Maxx Water balloon` 1.3–4.3; `Rad Mount` 28.1–31.0 |

**So: no YouTube downloads needed, and no cookies required from you.** I didn't attempt
them — the shot list was filled before that step became necessary.

**The landscape-crop softness problem is avoided entirely.** I'm not using the
`MP4 Product Videos` folder at all. Every product shot the edit needs already exists in
the Social Cuts at native 1080×1920. No 608 px crop, no upscale, no inset window.

**Watch-out I hit:** most Social Cuts carry burned-in text ("90 LB PULL FORCE MAGNET",
"MADE OF BILLET ALUMINUM", "STRONGEST MAGSAFE MOUNT", dimension callouts). Every in/out
below sits **inside a clean, text-free run** so it never fights our graphics. This cost
three clips between plan and build — see §4.1. The full list of rejected ranges is in
`assets/broll/CREDITS.md`.

**Excluded on rights grounds:** the mobarmor.com product-page video (Okendo review UGC,
576×1024, on-store licence only) — per the brief. Full log in
`assets/broll/CREDITS.md`.

---

## 2 · Prep (identical for all clips)

Every Social Cut is 1080×1920, **24 fps**, with an audio track and a stray data stream.

```bash
ffmpeg -y -ss <in> -t <dur> -i <src>.mp4 \
  -map 0:v:0 -an -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
  -vsync cfr -r 30 -movflags +faststart assets/broll/<name>.mp4
```

Video-only (`-map v:0 -an`) drops both the audio and the data stream; `-r 30 -vsync cfr`
normalises 24 → 30 fps.

---

## 3 · Graphics discipline — which numbers earn a card

Brief rule: *a beat with no real number gets no graphic.* Applied strictly, this VO earns
**five** full-bleed cards, and only five:

| Card | Figure | Spoken at | Source |
|---|---|---|---|
| **A** | `500%` | 1.90 | EcomIQ case study — spoken in your own VO |
| **B** | `1` channel | 14.96 | spoken |
| **C** | `+3` channels | 17.69 | spoken |
| **D** | `500%` (callback) | 24.08 | same as A |
| **E** | `4` channels | 25.45 | spoken |

A → D is the deliberate callback (MOTION_PHILOSOPHY Law 6); B → C → E is one continuous
dot diagram that never hard-cuts, it recolours and resolves.

**The mobarmor.com proof points get no graphic**, because none of them is spoken in this
VO. I verified them live today anyway, and they're in §7 if you want one used.

---

## 4 · Beat sheet — 12 beats, 36.00 s

Mid-section average shot length **2.4 s**. Every cut is a blur-whip (exit `y:-140`,
`blur(24px)`, `power2.in` 0.30 s starting 0.10 s early → entry `y:140`, `blur(24px)`→0,
`power2.out` 0.45 s), same direction on both sides so the two blurs overlap and the cut
hides inside the motion. Cards A and D additionally get a flame light-streak fired on
the cut. Grid + crosshairs + vignette + grain on every beat. EcomIQ white logo pinned
top-left (72, 96) for the whole runtime, in a positioned non-`clip` div.

| # | in → out | VO | On screen | Source |
|---|---|---|---|---|
| 00 | 0.000 → 4.280 | *(silence)* → "Up over 500% in a single year." | **OPENING CARD.** The client's wordmark lands at 0.10 and **holds alone until 1.700** — the first screen is their mark. Then `+500%` snaps in beneath it, 0.20 s ahead of the spoken word; "Total sales" 1.82; flame rule 2.10; "In a single year" 3.10. Transparent, so the navy ground reads through it like every other card. EcomIQ's mark stays off until 4.32. | `mobarmor-wordmark-hero.png` |
| 02 | 4.280 → 14.700 | "That's what happened to Mob Armor's total sales after they started working with us. And it wasn't a lucky viral moment. It wasn't a magic ad. When they came to us, almost everything ran through Facebook." | **A-ROLL — one unbroken shot.** No cut and no re-framing anywhere in 10.42 s; the only movement is a slow 1.06× push. | `a-main` |
| 07 | 14.700 → 17.267 | "There was one channel doing all of the work." | **CARD B — 1.** One flame dot lit, three dark, the lit one visibly overloading on a four-beat pulse. | — |
| 08 | 17.267 → 19.400 | "We found three more that fit the brand" | **CARD C — +3.** Numeral swaps in place; three dots ignite on "three more". | — |
| 09 | 19.400 → 21.733 | "and got them working in the right order." | **A-ROLL** — slow push. Was a third state of the channel card (recoloured copy, a pulse running the wire, dots popping in order); cut on request, and the line went back to Sean rather than holding the `+3` card for 4.5 s. | `a09` |
| 10 | 21.733 → 23.867 | "A year later, sales are up over" | **A-ROLL** — slow push. | `a10` |
| 11 | 23.867 → 25.233 | **"500%"** | **CARD D — the callback.** `+500%` returns faster than the opener. Eyebrow, figure, flame rule — the Mob Armor chip that sat under it was cut on request, so the client's mark now appears only on the opening card. | — |
| 12 | 25.233 → 27.200 | "across four channels instead of just one." | **CARD E — 4.** All four dots lit, staggered. | — |
| 13 | 27.200 → 29.567 | "And that's what the right plan does." | **CLIENT B-ROLL — the claw mount.** A phone goes onto the claw clamped to a workbench, seats, and holds as the hand leaves for the impact driver. Pan baked into the clip; no `push()` on top, because this is the one shot cut from a landscape source. | `claw-mount` |
| 14 | 29.567 → 31.650 | "This is a real brand with real numbers." | **CLIENT B-ROLL — a real customer.** Face to camera in his truck, then his hand taking the radio off the mount. The line asks for a real brand, so it shows one. Slow 1.04× push. | `radio-guy` |
| 15 | 31.650 → 33.500 | "If you wanna see what's possible for yours," | **A-ROLL** — slow push, hands off to the CTA. | `a15` |
| 16 | 33.500 → 36.000 | "tap the link to find out more." + 0.87 s tail | **EcomIQ end card.** Logo 33.56, headline 33.72, CTA 33.98 — all three pulled forward when the runtime was cut, so the CTA still lands after "tap the link" (33.55) and holds ~1.7 s instead of ~1.3 s. | — |

### How the three registers alternate

| Register | Share | Job |
|---|---|---|
| **A-roll (Sean)** | 16.7 s · 46% | Four segments, the first a single unbroken 10.42 s take |
| **Motion graphics** | 14.9 s · 41% | The client's mark opens the ad; four cards |
| **Client b-roll** | 4.4 s · 12% | Two shots, both under the closing claim |

The ad opens on the client's mark, and Sean carries the story between the cards. He
states each claim, the graphic evidences it, he interprets it.

**Beat 13's shot is the one landscape crop in the piece.** `MOBNETIC CLAW.mp4` is
1920×1080, so a full-bleed 9:16 window is 608 px wide — a 1.78× upscale, the thing the
brief warned about. It survives because the shot is shallow-depth-of-field handheld, so
the softness reads as bokeh; it is still the softest clip here, which is why it carries no
push and why the 4:5 is re-cropped from source at 864 px (1.25×) instead of trimmed from
the 9:16. `load-test` — the man hanging his weight off two mounts — remains the stronger
proof shot and is one ffmpeg line away in `CREDITS.md` if this reads too soft on a phone.

**B-roll went 29% → 4% → none → 12%.** The first pass used too much of it, the middle
passes cut it back to nothing, and the final pass brought two shots back — but only under
the two lines that ask for physical proof rather than a number: "that's what the right
plan does" and "a real brand with real numbers". Both are the client's own footage.
Card F (the `+500% / 4 CHANNELS` summary) gave up its slot for the second of them, so
**"real numbers" now plays with no number on screen** — a deliberate trade, since the
same two figures have already been on screen four times by then. Every other candidate
range stays logged in `assets/broll/CREDITS.md` and regenerates in one ffmpeg line.

**All copy is white** — eyebrows, chip labels, summary labels and the end card's serif
emphasis word were blue-tint or grey until this pass. The brief said all text white; the
build had drifted from it. Blue-tint survives only as a *graphic* accent on the channel
dots, never on type.

**The figure reads `+500%`**, which is ~20% wider than `500%`, so `.stat.xl` drops
330 → 268 px and `.stat.md` 190 → 158 px to keep the leading plus inside the 888 px
content width.

**No cuts or re-framing on Sean.** An earlier pass switched framing presets at sentence
boundaries to keep long blocks alive; Nate read those as weird cuts, so they are gone.
4.280–14.700 has no cards in it, so it is one clip rather than three, and the only
movement on him is a slow push. The consequence is a 10.42 s unbroken take — if that
drags, the fix is a card or a cutaway in the middle, not a re-frame.

**A-roll uses a different transition from everything else** — a 4-frame blur kiss, no
slide — so his lips are readable the moment he speaks (see §4.1).

## 4.1 · The A-roll pass

The first build was audio-led only — Sean's voice, no picture of him. Bringing him on
screen changed the structure, not the timings: every card and every VO anchor sits where
it did, and the b-roll gave up four slots (two of which it later won back — see above).

**Two things had to be fixed after the first A-roll cut:**

**The opening.** Sean's take begins with him setting up at the recorder — head down, mic
not yet raised, until ~1.05 s. Because the A-roll is time-locked to the audio (below),
there is no trim that fixes this: showing him at all in the first second means showing
the fumble. The silent 1.7 s lead went to the Mob Armor opening card instead — the
client's wordmark holding alone, which is where Nate wanted the first screen anyway.

**The A/V offset — measured properly the second time.** My first pass checked mouth
closure against silence gaps by eye and concluded the A/V was frame-accurate. That method
cannot resolve five frames, and it was wrong.

The reliable measurement: take a tight `230×150` ROI on his lips (where the handheld mic
does *not* obscure them), reduce each frame to its greyscale contrast — closed lips are
near-uniform, an open mouth is bright teeth against a dark cavity — and cross-correlate
that against the audio RMS envelope at 30 fps over 303 frames. The result is a clean
unimodal peak at **−5 frames = −0.167 s**: the picture lags the sound.

Every A-roll segment is therefore cut from source at `composition-time + 0.167` and placed
at `composition-time`, which advances the picture by exactly that. Re-running the same
correlation with the shift applied moves the peak to **0 frames**, with a higher and
symmetric curve. **Never re-cut an A-roll segment without re-applying the offset.**

`docs/LESSONS.md` already carried this — *"~0.2 s audio start offset … advance the video
~0.16 s so lips match"*. It was read at the start of the build and not applied; the
measurement landed within 7 ms of the documented value.

**A second, separate problem made it worse.** The 0.45 s blur-whip fired on every A-roll
entry, and Sean starts speaking the instant he cuts in, so his first words played over a
blurred, sliding face — at beat 04 he began "And it wasn't…" at 8.52 but was not readable
until 8.97. Two fixes, both in the shipped cut:

- **`beatFace()`** — a 4-frame blur kiss with no slide, for A-roll only. The whip stays on
  graphics and b-roll, where nothing is speaking.
- **Every A-roll beat starts ~0.2 s before its first word**, so he is settled and readable
  before he speaks rather than arriving mid-syllable. He is now readable at 8.30 against a
  first word at 8.52.

- **Six A-roll segments**, each cut at its own source timecode plus the 0.167 s advance and placed in the
  composition at that same timecode. The VO is one continuous track from the same file,
  so the lips lock with no offset. Re-trimming a segment to a different start would break
  that — the constraint is written into `index.html` above the A-roll block.
- **Two crops from the 4K master**, not one crop re-cropped: 9:16 takes `1215×2160` at
  x=1200, 4:5 takes `1728×2160` at x=940, both from 3840×2160. Letterboxing the 9:16 cut
  into 4:5 would have cut his head or his torso.
- **A grade on the A-roll only** — `saturation 0.86, contrast 1.05, brightness −0.015`
  plus a small blue push — to ease the electric-cyan backdrop toward the EcomIQ navy
  world without touching his skin tones.
- **Sean sits above the b-roll scrim.** The scrim is one layer for the whole runtime at
  z-index 2; b-roll is z-index 1 and gets dimmed by it, Sean is z-index 3 and does not.
  A talking head under a navy scrim reads as an error, not a grade.
- **A punch-in instead of a second angle.** Beat 04 runs 3.2 s, well over this cut rate.
  At the sentence boundary (10.160) the shot jumps 1.045× → 1.16× inside a 3-frame blur.
- **Two b-roll clips lost their slots** — `tablet-locked` and `phone-dash`. Ranges are
  still logged in `assets/broll/CREDITS.md` if you want them back.
- **A trap worth remembering:** re-trimming `cnc-sparks` longer to fill beat 03 pushed it
  across a cut at 7.79 in the source, so the beat jumped from the CNC head to a hand
  holding a disc mid-shot. Scene detection at the 0.35 threshold had reported 5.9–9.9 as
  one scene; the cut only shows at 0.12. Verify the *trimmed file*, not the scene list.

## 4.2 · What changed between the approved plan and the build

Three clips in the approved sheet did not survive contact with the footage, and the
first draft render exposed a grade problem. All fixed:

| Beat | Approved | Shipped | Why |
|---|---|---|---|
| 03 | `Tab Mount Maxx Direct` 22.9–25.0, product on red | `Tabnetic Discs` 5.95–8.35, CNC sparks | The **entire** 22.9–31.7 red-product scene is covered in burned-in dimension callouts. Not a trim I could work around — the whole scene is out. |
| 05 | `Tab Mount Maxx Tube` 5.6–7.2 | `Tabnetic Direct` 20.55–22.35 | Coarse sampling made 5.6–7.2 look like hands-on-a-UTV; at frame level it's a tight, fiddly macro of fingers and a screwdriver. Reads as assembly, not proof. |
| 06b | `Mobnetic Stix` 16.9–18.4, product on orange | `Tabnetic Direct` 14.90–17.20, load test | The clean orange run is only ~0.7 s before the "90 lb pull force magnet" caption lands. The load-test shot is longer, brighter, has a person in it, and is a better proof image. |
| 06a | `Water balloon` 1.3–2.8 | `Water balloon` 2.55–3.80 | The original range straddled two cuts — that clip runs at ~0.7 s per shot. |
| 10 | `Tabnetic Direct` 30.0–32.1 | `Tab Mount Maxx Direct` 12.70–15.10 | Brighter, wider read on the same idea. |

**Grade.** The first draft crushed the b-roll — the navy scrim, vignette and grain
stacked up and several shots read as murk. Scrim went 0.50/0.28/0.44 → 0.34/0.12/0.30,
vignette 0.62 → 0.44, grain 0.50 → 0.34. Grid and crosshairs went the other way
(0.045 → 0.062 alpha) because the unifying texture was invisible in the render.

**Cold open.** The plan opened on 1.70 s of empty navy — dead air at the top of a paid
ad. Card A now arrives at 0.900 with its eyebrow, and the numeral still snaps at 1.700,
0.20 s ahead of the spoken word.

**Vertical balance.** Reserving the bottom 30 % pushed everything into the top third.
The card band now centres on y = 820 (43 % of frame) instead of y = 672, which is as low
as it goes while keeping every glyph clear of the subtitle line.

**Unused but held in reserve:** `Tab Mount Maxx Tube` 26.2–28.4 — Mob Armor product on
red with a wrench, clean and punchy. Left out because that red sits close to the flame
accent and would read as a second hot colour.

---

## 5 · Look

- **Palette (5, each with a job):** navy `#06284C` canvas · white type · flame `#FF4C32`
  the only hot accent (the numerals, the rule, the CTA, the "one channel" dot) · blue
  tint `#9CD4FF` eyebrows + the three found channels · Mob Armor black `#101820`, used
  **only** as the chip behind their wordmark.
- **Type:** Rethink Sans **800**, −2 % tracking, ~0.98 leading on every display line, per
  the brief. **No serif italic anywhere** — the EcomIQ signature emphasis word was on
  "possible" in the end card until Nate asked for it plain.
- **Texture:** vignette + grain only. The grid and crosshairs are gone — the grid layer
  sat above the A-roll, so its verticals ran across Sean's face.
- **Safe area:** nothing below **y = 1344** (9:16) / **y = 945** (4:5) — the bottom ~30 %
  stays clear for subtitles.
- **CTA:** flame pill, no arrow.

## 6 · Build & delivery

Local GSAP (`assets/vendor/gsap.min.js`) and local `.woff2` — no CDN at render time.
One paused timeline per sub-composition on `window.__timelines`, each ending with
`tl.to({}, {duration: SLOT}, 0)`. `gsap.fromTo` for anything starting hidden.

Deliverables, `--quality high`, H.264/AAC, `+faststart`, committed at the project root:
`final-9x16.mp4` (1080×1920) and `final-4x5.mp4` (1080×1350), plus a sub-30 MiB copy of
either if it exceeds that. `renders/` stays gitignored.

## 7 · mobarmor.com proof points — re-verified live 2026-08-27

| Claim | Status |
|---|---|
| "500,000+ drivers trust Mob Armor in their vehicles & more" | ✅ verified, homepage |
| "industry leading three year warranty" | ✅ verified |
| "Veteran owned and operated", military & first-responder discount | ✅ verified |
| "The Most Versatile Phone Mounts on the Planet" | ✅ verified (page title) |
| Star ratings | ⚠️ **now 4.3–5.0★**, not 4.5–5.0. Flagship MobNetic Maxx .MS is **4.7★ / 505 reviews** (brief said 504). |

None of these is spoken in the VO, so under the brief's own rule none gets a graphic.

---

## 8 · Decisions taken

1. **Whose ad** — EcomIQ, crediting Mob Armor. Confirmed.
2. **The 500% and the four-channel claim** — taken from Sean's own recorded VO as the
   source of truth. There is no external source to check them against, so the words on
   screen are the words he says. If EcomIQ's records qualify either differently, that is
   the one thing to change before this runs as paid media.
3. **No customer reviews** — no review UGC, no star-rating graphics, nowhere in the cut.
4. **No burned-in subtitles.** The bottom 30% is held clear for them to be added later.
5. **Full VO, no cutdown** — the whole voiceover plays; runtime trimmed to 36.00 s so the
   end card stops on the last word rather than holding dead air.
6. **Mob Armor's logo on navy** — their guide says white-on-black and *"avoid using other
   colours directly behind the logo"*. It sits on a black `#101820` chip inside the navy
   card, which honours the rule and reads as a deliberate lockup.
7. **Sean on screen** — five A-roll segments, moving between him, the graphics and the
   b-roll. See §4.1.
