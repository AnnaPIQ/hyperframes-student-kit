# Mob Armor social-proof ad — shot list & edit plan

**Whose ad:** EcomIQ, crediting Mob Armor. EcomIQ navy + flame throughout, EcomIQ end
card, Mob Armor's white wordmark on the stat cards.
**Master format:** 9:16 · 1080×1920 · 30 fps. Relayout: 4:5 · 1080×1350.
**Runtime:** 38.60 s (VO 1.38 → 35.13, then 3.47 s of held end card).
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

## 4 · Beat sheet — 18 beats, 38.60 s

Mid-section average shot length **2.02 s**. Every cut is a blur-whip (exit `y:-140`,
`blur(24px)`, `power2.in` 0.30 s starting 0.10 s early → entry `y:140`, `blur(24px)`→0,
`power2.out` 0.45 s), same direction on both sides so the two blurs overlap and the cut
hides inside the motion. Cards A and D additionally get a flame light-streak fired on
the cut. Grid + crosshairs + vignette + grain on every beat. EcomIQ white logo pinned
top-left (72, 96) for the whole runtime, in a positioned non-`clip` div.

| # | in → out | VO | On screen | Source |
|---|---|---|---|---|
| 00 | 0.000 → 1.700 | *(silence)* → "Up over…" | **A-ROLL.** Cold open on Sean. The ad opens on a face, not a card — it's a case study, and a person saying it is the proof. Slow 1.03× push. | `a00` 0.000–1.950 |
| 01 | 1.700 → 4.400 | "…500% in a single year." | **CARD A — 500%.** Numeral snaps at 1.700, 0.20 s ahead of the spoken word, inside a flame streak. Rule wipes 2.10; "In a single year" 3.10; Mob Armor wordmark on a black chip 3.45. | — |
| 02 | 4.400 → 6.033 | "That's what happened to Mob Armor's…" | **A-ROLL.** Back to Sean for the attribution. | `a02` 4.400–6.283 |
| 03 | 6.033 → 8.520 | "…total sales after they started working with us." | **Hero b-roll:** drone, buggy across sand dunes, 1.08× push. | `Tab Mount Maxx Tube` 31.95–34.75 |
| 04 | 8.520 → 11.733 | "And it wasn't a lucky viral moment. It wasn't a magic ad." | **A-ROLL.** Sean's direct-address block — opinion belongs on a face. **Punch-in at 10.160** on the sentence boundary: a deliberate jump hidden in a 3-frame blur, so 3.2 s never goes static without needing a second angle. | `a04` 8.520–11.983 |
| 05 | 11.733 → 13.200 | "When they came to us," | B-roll: phone on dash mount, in-cab. | `Mobnetic Stix` 2.85–4.75 |
| 06 | 13.200 → 14.700 | "almost everything ran through Facebook." | B-roll: load test — a man hanging his full weight off two mounts. | `Tabnetic Direct` 14.90–17.20 |
| 07 | 14.700 → 17.267 | "There was one channel doing all of the work." | **CARD B — 1.** One flame dot lit, three dark, the lit one visibly overloading on a 4-beat pulse. | — |
| 08 | 17.267 → 19.400 | "We found three more that fit the brand" | **CARD C — +3.** Numeral swaps in place; three blue-tint dots ignite on "three more" and the two beats after. | — |
| 09 | 19.400 → 21.733 | "and got them working in the right order." | Same card, **no cut** — copy recolours and a flame pulse runs the wire left→right, popping each dot in sequence. | — |
| 10a | 21.733 → 22.800 | "A year later," | B-roll: facility floor, 1.05× push. | `Tab Mount Maxx Direct` 12.70–15.10 |
| 10b | 22.800 → 23.867 | "sales are up over" | B-roll: CNC cutting head, sparks. Two 1.07 s shots accelerating into the callback. | `Tabnetic Discs` 5.95–8.35 |
| 11 | 23.867 → 25.233 | **"500%"** | **CARD D — the callback.** Card A returns, faster (0.34 s vs 0.42 s), carrying the Mob Armor shield rather than the wordmark. | — |
| 12 | 25.233 → 27.500 | "across four channels instead of just one." | **CARD E — 4.** All four dots lit, staggered. "Channels — not one." | — |
| 13 | 27.500 → 29.567 | "And that's what the right plan does." | **A-ROLL.** Sean draws the conclusion. | `a13` 27.500–29.817 |
| 14 | 29.567 → 31.833 | "This is a real brand with real numbers." | B-roll: a real customer, face to camera, radio on the mount in his truck. | `Rad Mount` 28.20–30.75 |
| 15 | 31.833 → 33.500 | "If you wanna see what's possible for yours," | **A-ROLL.** Sean hands off to the CTA. | `a15` 31.833–33.750 |
| 16 | 33.500 → 38.600 | "tap the link to find out more." + 3.47 s silence | **EcomIQ end card.** Centred logo, "See what's *possible* for yours." with the single serif-italic word, flame CTA at 34.20. Holds **5.10 s**. Entry only — no exit tween, so the final frame never blurs away. | — |

### How the three registers alternate

| Register | Share | Job |
|---|---|---|
| **A-roll (Sean)** | 10.3 s · 27% | Opens the ad, carries every line of opinion or conclusion, hands off to the CTA |
| **Motion graphics** | 18.5 s · 48% | Only where a real figure is spoken — five cards, no more |
| **Client b-roll** | 9.9 s · 25% | Proof texture under the narrative beats |

Sean appears five times. The pattern is deliberate: **face → number → face → proof → face**.
He states the claim, the graphic evidences it, he interprets it. The b-roll never carries
a claim on its own — it sits under lines that are setting up or paying off a figure.

## 4.1 · The A-roll pass

The first build was audio-led only — Sean's voice, no picture of him. Bringing him on
screen changed the structure, not the timings: every card and every VO anchor sits where
it did, and the b-roll gave up five slots.

- **Five A-roll segments**, each cut at its own source timecode and placed in the
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
- **Three b-roll clips lost their slots** — `tablet-wall`, `tablet-locked`, `phone-dash`.
  Ranges are still logged in `assets/broll/CREDITS.md` if you want them back.

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
  the brief. Hedvig Letters Serif italic **exactly once**, on "*possible*" in the end
  card — the EcomIQ signature move.
- **Texture:** perspective grid + crosshairs + vignette + grain on every beat, footage
  included (grid at low alpha over video).
- **Safe area:** nothing below **y = 1344** (9:16) / **y = 945** (4:5) — the bottom ~30 %
  stays clear for subtitles.
- **Footage treatment:** navy scrim at ~0.35 over all b-roll so white type and the grid
  read consistently, and so the cuts feel like one piece rather than a reel.

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
5. **Full VO, no cutdown** — 38.60 s.
6. **Mob Armor's logo on navy** — their guide says white-on-black and *"avoid using other
   colours directly behind the logo"*. It sits on a black `#101820` chip inside the navy
   card, which honours the rule and reads as a deliberate lockup.
7. **Sean on screen** — five A-roll segments, moving between him, the graphics and the
   b-roll. See §4.1.
