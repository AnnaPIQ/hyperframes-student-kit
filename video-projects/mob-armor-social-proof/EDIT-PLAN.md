# Mob Armor social-proof ad — shot list & edit plan

**Whose ad:** EcomIQ, crediting Mob Armor. EcomIQ navy + flame throughout, EcomIQ end
card, Mob Armor's white wordmark on the stat cards.
**Master format:** 9:16 · 1080×1920 · 30 fps. Relayout: 4:5 · 1080×1350.
**Runtime:** 38.60 s (VO 1.38 → 35.13, then 3.47 s of held end card).
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
| Race / UTV | `Tab Mount Maxx Direct` 9.6–12.6 — race UTV, Method wheels, at an event |
| In-cab driving | `Mobnetic Stix` 2.8–4.6 and 29.2–30.0 — dash mount, road ahead |
| Work truck / fleet | `Tab Mount Maxx Direct` 39.4–41.6 — tablet on mount, driving |
| Manufacturing | `Tabnetic Discs` 5.9–9.9 — CNC/plasma cutting, sparks |
| Facility / real ops | `Tabnetic Direct` 30.0–37.0 — warehouse floor, worker fitting a mount |
| Real people | `Mobnetic Maxx Water balloon` 1.3–4.3; `Rad Mount` 28.1–31.0 |

**So: no YouTube downloads needed, and no cookies required from you.** I didn't attempt
them — the shot list was filled before that step became necessary.

**The landscape-crop softness problem is avoided entirely.** I'm not using the
`MP4 Product Videos` folder at all. Every product-beauty shot I need already exists in
the Social Cuts at native 1080×1920 on plain brand colour (orange `Mobnetic Stix`
14.9–19.0, red `Tab Mount Maxx Direct` 22.9–31.7). No 608 px crop, no upscale, no inset
window needed.

**Watch-out I hit:** most Social Cuts carry burned-in text ("90 LB PULL FORCE MAGNET",
"MADE OF BILLET ALUMINUM", "STRONGEST MAGSAFE MOUNT", dimension callouts). Every in/out
below is chosen to sit **inside a clean, text-free run** so it never fights our graphics.

**Excluded on rights grounds:** the mobarmor.com product-page video (Okendo review UGC,
576×1024, on-store licence only) — per the brief. Full log in
`assets/broll/CREDITS.md`.

---

## 2 · Prep (identical for all clips)

Every Social Cut is 1080×1920, **24 fps**, with an audio track and a stray data stream.

```bash
ffmpeg -y -ss <in> -to <out> -i <src>.mp4 \
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
| **A** | `500%` | 1.90 | EcomIQ case study — **needs your confirmation** |
| **B** | `1` channel | 14.96 | spoken |
| **C** | `+3` channels | 17.69 | spoken |
| **D** | `500%` (callback) | 24.08 | same as A |
| **E** | `4` channels | 25.45 | spoken |

A → D is the deliberate callback (MOTION_PHILOSOPHY Law 6); B → C → E is one continuous
dot diagram that never hard-cuts, it recolours and resolves.

**The mobarmor.com proof points get no graphic**, because none of them is spoken in this
VO. I verified them live today anyway, and they're in §7 if you want one used.

---

## 4 · Beat sheet — 17 beats, 38.60 s

Mid-section average shot length **2.06 s**. Every cut is a blur-whip (exit `y:-150`,
`blur(30px)`, `power2.in` 0.33 s → entry `y:150`, `blur(30px)`→0, `power2.out` 1.0 s),
velocity-matched at the seam. Cards A and D additionally get a flame light-streak fired
at the cut. Vignette + grain + receding perspective grid on every beat. EcomIQ white
logo pinned top-left (72, 96) for the whole runtime, inside a positioned non-`clip` div.

| # | in → out | VO | On screen | Clip (Drive source, in–out) |
|---|---|---|---|---|
| 00 | 0.000 → 1.700 | *(silence)* | Cold open. Navy stage, grid recedes, crosshairs, EcomIQ logo fades up. | — |
| 01 | 1.700 → 4.400 | "Up over 500% in a single year." | **CARD A — 500%.** Numerals snap at 1.70 (0.2 s ahead of the word), flame rule wipes under, eyebrow "IN A SINGLE YEAR" lands 3.21. Mob Armor wordmark on a black chip at card foot. | — |
| 02 | 4.400 → 6.033 | "That's what happened to Mob Armor's…" | Phone on dash mount, in-cab | `Mobnetic Stix` **2.8–4.6** |
| 03 | 6.033 → 8.100 | "…total sales after they started" | Product beauty on red, native vertical | `Tab Mount Maxx Direct` **22.9–25.0** |
| 04 | 8.100 → 10.267 | "working with us. And it wasn't a lucky viral moment." | **Hero:** drone, buggy across sand dunes | `Tab Mount Maxx Tube` **31.9–35.0** |
| 05 | 10.267 → 11.733 | "It wasn't a magic ad." | Race UTV at an event | `Tab Mount Maxx Direct` **9.6–12.0** |
| 06a | 11.733 → 13.200 | "When they came to us," | Real people in a vehicle | `Mobnetic Maxx Water balloon` **1.3–2.8** |
| 06b | 13.200 → 14.700 | "almost everything ran through Facebook." | Product on orange — reads as the paid-social ad unit | `Mobnetic Stix` **16.9–18.4** |
| 07 | 14.700 → 17.267 | "There was one channel doing all of the work." | **CARD B — 1.** One flame dot, four inbound paths all routed into it, load pulsing. "ONE CHANNEL / DOING ALL THE WORK". | — |
| 08 | 17.267 → 19.400 | "We found three more that fit the brand" | **CARD C — +3.** Three blue-tint dots ignite around the flame one. | — |
| 09 | 19.400 → 21.733 | "and got them working in the right order." | Same card, **no cut** — recolour + a sequenced energy pulse runs the four dots in order (MOTION_PHILOSOPHY §3.5 / §2.4). | — |
| 10 | 21.733 → 23.867 | "A year later, sales are up over" | Warehouse floor, worker fitting a mount | `Tabnetic Direct` **30.0–32.1** |
| 11 | 23.867 → 25.233 | **"500%"** | **CARD D — 500% callback.** Card A returns, Mob Armor chip present. Snaps 23.87, word 24.08. | — |
| 12 | 25.233 → 27.500 | "across four channels instead of just one." | **CARD E — 4.** The four dots from C resolve into a `4`. "FOUR CHANNELS · NOT ONE". | — |
| 13 | 27.500 → 29.567 | "And that's what the right plan does." | Driving, mount + road ahead | `Mobnetic Stix` **29.2–30.0** → `Tab Mount Maxx Direct` **39.4–41.6** |
| 14 | 29.567 → 31.833 | "This is a real brand with real numbers." | Real customer outdoors w/ radio → resolves to Mob Armor wordmark on black chip | `Rad Mount` **28.1–30.4** |
| 15 | 31.833 → 38.600 | "If you wanna see what's possible for yours, tap the link to find out more." | **EcomIQ end card.** Logo, headline with the single serif-italic emphasis word, flame CTA pill "See what's possible →". Holds **6.77 s** (3.47 s of it in silence). | — |

**Unused but held in reserve:** `Tabnetic Discs` 5.9–9.9 (CNC sparks) — cut for pace;
it's the swap-in if you want beat 10 to read "manufacturing" rather than "operations".

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

## 8 · Open questions — answer these and I'll build

1. **Confirm the 500% figure and its wording.** It's EcomIQ's own case-study number; I
   can't verify it against any source I have. Before it goes on a full-bleed card twice:
   is it *total sales, up over 500%, year over year*? Any qualifier needed for ad-claim
   safety?
2. **Confirm the four-channel claim** the same way — "one channel (Facebook) → four".
3. **Subtitles:** I'm keeping the bottom 30 % clear and **not** burning captions, per the
   brief. Say if you'd rather I burn them.
4. **Mob Armor logo on navy.** Their BRANDING_GUIDE is explicit: white logo on black,
   *"avoid using other colours directly behind the logo"*. I'm putting the white wordmark
   on a black `#101820` chip inside the navy card, which satisfies the rule and reads as
   a deliberate lockup. Confirm, or I'll ask them.
5. **38.6 s runtime** — full VO, no cutdown, as briefed. Confirm that's the intent for a
   paid placement.
