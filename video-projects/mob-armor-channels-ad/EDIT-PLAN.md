# Mob Armor × EcomIQ — social-proof ad · EDIT PLAN

**Whose ad:** EcomIQ, crediting the client (Mob Armor).
**Deliverables:** `final-9x16.mp4` (1080×1920) · `final-4x5.mp4` (1080×1350) · 30 fps · H.264/AAC · +faststart.
**Runtime:** 38.00 s. Full VO, no cutdown.

---

## 1. Source & provenance

| Item | Source |
|---|---|
| A-roll + VO | Drive `17D7u7zifWSqqt_lsRW6WOQ6BN2Xy8RFz` — "Mob Armor Channels Ads.mov", 2.04 GB, ProRes 422, **3840×2160, 25 fps, 37.08 s**, PCM 24-bit 48 kHz stereo. Pulled 2026-08-31. |
| B-roll | Client "Social Cuts" folder `1ArKbSBupieY_R4spsdiF7sJqxYc0qzas` — see `assets/broll/CREDITS.md`. |
| Mob Armor wordmark | Client Logos folder — `logo_white_shield_text_right.png` (`17D_7iMzjQ7BIWZm_-E_7vqHRVRtYB3TL`). |
| Claim verification | *Mob Armor Case Study* (Drive `1ekRUpePz_Samtouv8smRGNiIV3IqRMdZXi7dFdNSjNU`). Shopify sales data, Aug 2025 → Aug 2026. |

First-party client media only. No stock, no UGC/creator reposts, no Okendo product-page review video, no customer-review footage.

---

## 2. Measured A/V sync offset — **+0.078 s** (not assumed)

The .mov carries an **initial empty edit on the audio track**:

```
stream 1 (audio):  start_pts = 3742  @ time_base 1/48000  ->  0.077958 s
elst: st:1  edit 0 -> media time -1, duration 3742   (empty edit)
elst: st:1  edit 1 -> media time  0, duration 1776098
```

So audio media begins **77.958 ms after** the first video frame in the presentation
timeline. **`ffmpeg -i src -map 0:a` silently drops that empty edit** — the extracted
WAV is 37.0021 s (media duration), not 37.080 s (presentation duration). Left alone,
the sound would run 78 ms early against picture.

**Corroboration.** Mouth-ROI motion (288×216 window at (1728,792), verified on-mouth)
cross-correlated against the audio RMS envelope at 10 ms resolution:

| audio used | best lag | r |
|---|---|---|
| raw audio media, as extracted | **+0.132 s** | 0.219 |
| same, with the 78 ms empty edit restored | **+0.056 s** | 0.215 |

Restoring the edit removed 76 ms of misalignment — matching the container's 77.958 ms
within the resolution of a broad, shallow peak. The correlation is weak (r ≈ 0.22) and
a tracked-aperture refinement failed to hold lock, so the **container value is the
authority here and the cross-correlation is corroboration, not the measurement.**

**How it is applied.** Rather than cutting segments at `(composition-time + offset)`
and risking arithmetic drift, the offset is baked once: the VO is rendered with
`adelay=delays=3742S` (sample-exact) so audio sits at its true presentation time, and
picture is taken straight from source presentation time. **Composition time ≡ source
presentation time ≡ VO time.** No per-segment offset arithmetic anywhere downstream.

> Consequence: word timings below are Whisper's audio-media times **+ 0.078 s**.

---

## 3. Transcript — measured, not assumed

`faster-whisper small.en`, word timestamps, no VAD filter. 106 words.
**The delivered VO differs from the supplied script** — build to the recording:

| supplied script | actually spoken |
|---|---|
| "One of the brands we work with" | "One of the brands **that** we work with" |
| "One channel, everything riding on it." | "**There was** one channel **and** everything riding on it." |
| "Twelve months later, their total sales **were** up over 500%" | "**Now,** 12 months later, their total sales **are** up over 500%" |
| "…in the right order, for their brand." | "…in the right order for their brand, **where their audience was**." |
| "Tap the link **and find** out more." | "Tap the link **below to find** out more." |

Whisper reports the first word at 1.02 s; the **measured** speech onset is **1.36 s**
(media) — level scan, 40 ms steps. 1.02 is Whisper's segment-start snap, not audio.

---

## 4. Beat map (composition time)

Architecture: **the A-roll is one continuous video element running 0 → 37.07 s and is
never cut.** Cards and b-roll are full-bleed layers *over* it. This makes trap #3
(cutting between two adjacent beats of the same take) structurally impossible — there
is no A-roll cut anywhere in the piece — and keeps lip-sync locked by construction.

| # | Layer | In | Out | Lands on | Content |
|---|---|---|---|---|---|
| S0 | EcomIQ bumper | 0.000 | 0.933 | — | EcomIQ lockup on navy. Covers the top of the take — he is looking down, settling, until ~0.70 — and stamps whose ad this is. |
| — | A-roll revealed | 1.750 | — | mid "One of the brands…" | blur-whip out of S0 |
| L | EcomIQ logo | 1.033 | 32.367 | — | the bumper mark takes its corner; pinned top-left until the end card |
| SMA | **Mob Armor card** | 3.333 | 5.200 | "**Mob Armor**" (3.318–3.578) | the client's white wordmark on the spoken name, over the client's own product under a navy band (see `assets/broll/CREDITS.md` for the brand-guide constraint) |
| G1 | **ONE CHANNEL** | 7.178 | 9.478 | "**one** channel" (7.178) | eyebrow `PAID CHANNELS`; big `1`; 4 dots — 1 flame-lit, 3 dark; sub `FACEBOOK ADS` |
| — | A-roll | 9.478 | 12.538 | "Now, 12 months later, their total sales are up over" | |
| G2 | **+500%** | 12.538 | 14.038 | "**500**" (12.538) | eyebrow `TOTAL SALES · 12 MONTHS`; `+500%`; flame rule |
| B4 | b-roll — Mobnetic Claw | 14.033 | 15.333 | "**four** paid channels" (14.038) | client's product in use, in place of the former "1 → 4" card |
| B5 | b-roll — Slim, dash | 15.333 | 16.367 | "instead of **one**" | client's product in use |
| — | A-roll | 16.378 | 24.900 | "And we didn't do that with a magic tactic…" | longest held A-roll stretch |
| B1 | b-roll — Sweet E's | 24.900 | 27.000 | "And that's what EcomIQ **does**" | real portfolio brand, in store |
| B2 | b-roll — Dryft Sleep | 27.000 | 28.900 | pause + "**Real brands,** real numbers," | real portfolio brand, on shelf |
| B3 | b-roll — Slim, windscreen | 28.900 | 29.900 | "not **theory**." | back to the client's own product |
| — | A-roll | 29.900 | 32.358 | "Want to see if we can do the same for you?" | |
| S9 | Outro / CTA | 32.358 | 38.000 | "**Tap** the link" (32.358) | Standing EcomIQ end card: lockup, "See if it will work for you.", flame `Learn More` pill. 5.64 s hold. The pinned top-left lockup fades at 32.2 and hands off to this one. |

G2 → G3 is a single card container with an internal blur-whip at 14.038 (they abut;
a 0.09 s gap between two separate cards would not read).

**Graphic discipline:** every card carries only figures actually spoken in this
recording — `one channel`, `12 months`, `+500%`, `four paid channels`. Nothing else
gets a graphic. No invented figures.

---

## 5. Claim verification

Every on-screen figure checked against the case study (Shopify sales data,
Aug 2025 → Aug 2026; absolute revenue withheld):

| On screen | Spoken at | Case-study evidence |
|---|---|---|
| `1` paid channel · `FACEBOOK ADS` | 7.178 | "almost all of the brand revenue was coming from a single paid channel… growth was heavily reliant on **Facebook ads**" |
| `TOTAL SALES · 12 MONTHS` | 10.038 | "TIMEFRAME **12 months**" |
| `+500%` | 12.538 | "TOTAL SALES YOY **+500%**"; "grew total sales by **over 500% year on year**" |

> The "1 → 4" card and the four channel names were **cut** at the client's request and
> replaced with product b-roll. Both figures remain spoken and both were verified
> ("PAID CHANNELS 1 to 4"; "including Google, TikTok, TikTok Shop, and Meta") — they
> simply no longer carry an on-screen graphic.

---

## 6. Framing — no upscales

| Deliverable | Window out of 3840×2160 | Scale | Note |
|---|---|---|---|
| 9:16 · 1080×1920 | `crop=1080:1920:1332:120` | **1.000× (native 1:1)** | zero resampling; face centred on x=1872 |
| 4:5 · 1080×1350 | `crop=1296:1620:1224:78` | **0.833× (down)** | its own window, not a trim of the 9:16 — native 1:1 was too tight at the top |

B-roll: the two portfolio shots are natively 2160×3840 / 2160×2700, so both aspects
are a 0.5× downscale. The one landscape source (Mobnetic Claw, 1920×1080) is **not**
cropped to a 9:16 window — that would be 608 px wide, a 1.78× upscale. Instead 9:16
plays the whole frame at 1080×608 (0.5625× down) inset on the navy ground and takes
no push, while 4:5 gets its own 864×1080 window at x=374 scaled to 1080×1350 (1.25×).

25 → 30 fps by frame duplication (locked-off tripod shot; no motion interpolation
artefacts on the mouth).

---

## 7. Audio

- Setup noise runs across the whole head, not just one breath — peaks at 0.40
  (−42.5), 0.90 (−43.4) and 1.10 (−33.6) dBFS. The head is **silenced, not trimmed**
  (the A-roll is time-locked to the audio; trimming would shift every beat):
  ramped `volume`, `eval=frame`, full mute to 1.20 s then a 120 ms ramp to unity at
  1.32 s. Measured speech onset is 1.36 s, so no phoneme is touched.
- **ebur128 verification** — only sub-−45 dB material moved; I/LRA/true-peak land
  on target either way:
  | | I | LRA | TP |
  |---|---|---|---|
  | source | −33.6 LUFS | 3.8 LU | −15.1 dBFS |
  | shipped VO | −17.0 LUFS | 3.5 LU | −1.5 dBFS |
- **The composition VO is PCM built straight from the source** — no AAC anywhere in
  the chain. An earlier build went source → AAC → WAV and the decode did not strip
  the encoder's 1024-sample priming, putting the whole VO 21.33 ms late. Caught by
  cross-correlating against the raw source audio: the shipped file now sits at
  exactly **+3742 samples, zero error**.
- Delivery loudness matched to the previous ad in this series (measured off the prior
  render: I −17.3 LUFS, TP −1.4 dBFS): two-pass `loudnorm` → **I −17.0 LUFS,
  TP −1.3 dBFS, LRA 3.6**.

---

## 8. Style (inherited, not relitigated)

All copy white · display weight 800 · no blue-tint or grey on type (blue-tint is a
graphic accent only — the channel dots) · every cut a 0.2667 s cross-dissolve ·
vignette + grain · **no grid, no crosshairs** · no burned-in subtitles, bottom ~30 %
kept clear (9:16 below y=1344, 4:5 below y=945) · full-bleed cards on the navy ground.

EcomIQ navy `#06284C` / flame `#FF4C32` / white, Rethink Sans (local woff2, no
Google-Fonts fetch at render time). GSAP vendored locally.

**Mob Armor brand compliance** (from `BRANDING_GUIDE.pdf`): logo used white, intact
side-by-side lockup, never recoloured, never broken up, on a plain dark ground with
clear space — all satisfied.
