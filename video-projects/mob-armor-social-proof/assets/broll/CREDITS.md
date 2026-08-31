# B-roll credits — mob-armor-social-proof

All footage is **first-party Mob Armor material** supplied by the client via Google Drive.
No stock. No third-party UGC. No creator reposts. No customer-review video.

Source folder: `Client media` →
https://drive.google.com/drive/folders/1DBvZ_8bcxVX9wPEe0a8dUvXZhdftuAgt
Subfolder used: **Social Cuts** (Drive id `1ArKbSBupieY_R4spsdiF7sJqxYc0qzas`)

**Two shots are used in the shipped cut**, both under the closing claim (beats 13 and 14):

| File | Beat | Composition in–out | Source clip | Source in–out |
|---|---|---|---|---|
| `claw-mount.mp4` | 13 | 27.200–29.567 | MOBNETIC CLAW.mp4 | 21.85–23.92, stretched 1.14343x |
| `radio-guy.mp4` | 14 | 29.567–31.650 | Rad Mount.mp4 | 28.15–30.78 (2.633 s) |

`radio-guy` is native 1080×1920; `claw-mount` is cropped from a 1920×1080 landscape
source and so has a per-aspect file (see below). Both are 30 fps and silent.

### `claw-mount` — the one landscape source, and what that cost

`MOBNETIC CLAW.mp4` (Drive id `1mTbhx6wkCHZmaG8sQtiUKkntSdIPboTM`, parent folder
`1_SQ5A_MTjNzzzBp5wByRBDWEC0uFpvot`, pulled 2026-08-31) is 1920×1080, 23.976 fps,
52.67 s — the landscape shape the brief warned about. A full-bleed 9:16 crop of 1080p is
only 608 px wide, i.e. a **1.78× upscale**. It holds up here because the shot is shallow
-depth-of-field handheld, so the softness reads as bokeh rather than as scaling — but it
is the softest clip in the piece, and it is the reason beat 13 carries **no `push()`**:
a further scale on top would compound it.

The 4:5 gets its own crop rather than a vertical trim of the 9:16, because 4:5 can take an
864 px window — a **1.25× upscale**, visibly sharper. `make-4x5.py` swaps the path and
guards the reference count.

**The usable shot is 21.81–23.94, not 22–23.** Full-file scene detection puts hard cuts at
both ends; the first attempt ran 22.0→24.367 and crossed the 23.94 cut, landing in a
completely different scene. The shot is 2.13 s and beat 13 is 2.367 s, so the cut is
21.85–23.92 (40 ms clear of each cut) stretched 1.14343× — imperceptible on handheld, and
it makes the beat sit a touch more deliberately.

> **Scene detection needs a full decode.** `ffmpeg -ss X -to Y -i src -vf select='gt(scene,N)'`
> returned *nothing* on this file at thresholds down to 0.03, including across a hard cut.
> Decoding the whole file without `-ss` found all 28 cuts at threshold 0.15. Seeking first
> silently breaks the filter — always run the detection pass over the whole file.

```bash
# 9:16 — 608px window, panning left with the subject, upscaled 1.78x
ffmpeg -ss 21.85 -t 2.07 -i "MOBNETIC CLAW.mp4" -map 0:v:0 -an \
  -vf "crop=608:1080:'560-110*(t/2.07)':0,scale=1080:1920:flags=lanczos,setpts=1.14348*PTS" \
  -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -vsync cfr -r 30 \
  -movflags +faststart assets/broll/claw-mount.mp4

# 4:5 — 864px window, same pan, upscaled only 1.25x
ffmpeg -ss 21.85 -t 2.07 -i "MOBNETIC CLAW.mp4" -map 0:v:0 -an \
  -vf "crop=864:1080:'448-120*(t/2.07)':0,scale=1080:1350:flags=lanczos,setpts=1.14348*PTS" \
  -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -vsync cfr -r 30 \
  -movflags +faststart assets/broll45/claw-mount.mp4
``` The remaining ranges below are candidates only —
each regenerates in one ffmpeg line if a shot is wanted back.

```bash
ffmpeg -y -ss <in> -t <dur> -i <src>.mp4 \
  -map 0:v:0 -an -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
  -vsync cfr -r 30 -movflags +faststart assets/broll/<name>.mp4
```

| Candidate | Source clip (Drive) | In–out | Note |
|---|---|---|---|
| `dunes-drone` | Tab Mount Maxx Tube Mount.mp4 | 31.95–34.75 | drone, buggy on dunes — the strongest single shot |
| `load-test` | Tabnetic Direct.mp4 | 14.55–17.25 | a man hanging his full weight off two mounts — the strongest *proof* shot, held in reserve |
| `incab-dash` | Mobnetic Stix.mp4 | 2.85–4.75 | phone on a dash mount, in-cab |
| `facility-floor` | Tab Mount Maxx Direct.mp4 | 12.70–15.10 | facility floor, mount in foreground |
| `cnc-sparks` | Tabnetic Discs.mp4 | 5.95–7.55 | CNC head, sparks. **Must stay inside 5.92–7.79** — there is a real cut at 7.79 that scene detection at the 0.35 threshold misses |
| `radio-guy` | Rad Mount.mp4 | 28.15–30.78 | **IN USE (beat 14)** — a real customer, face to camera in his truck, then his hand taking the radio off the mount |
| `tablet-wall` | Tabnetic Direct.mp4 | 20.50–23.00 | tablet going onto a wall mount |
| `tablet-locked` | Tabnetic Direct.mp4 | 41.10–43.45 | rugged tablet locked into its mount |
| `phone-dash` | Mobnetic Maxx Water balloon.mp4 | 2.55–3.80 | real vehicle interior, hand and keys |

Drive file ids: Tab Mount Maxx Tube `1a8KoxoKVBnCt7oyuspILNfhsW7Mx7r0E` · Tabnetic Direct
`1BqMYocdVmTMAGKIrBiitTGrgpG9kzbL2` · Mobnetic Stix `1BDmv8-GU7194MJedTT_Ewje4m1N2y0NF` ·
Tab Mount Maxx Direct `1ud577NtpMV6BpnnCF260IGagWDuocPLJ` · Tabnetic Discs
`1sQIRGCsAxMEFB3J7w-BFFTjR-xF7ctJc` · Rad Mount `1tDsY1YT6wk4z4xHC7Etaln2_8-qSmivU` ·
Water balloon `1uI6ZN5iO__2ixCbD3S__95f7bU2BPd-a`. All 1080×1920, 24 fps, with an audio
track *and* a stray data stream — `-map 0:v:0 -an` drops both in one pass.

### A-roll — Sean to camera (`assets/aroll/`, `assets/aroll45/`)

Source: `Mob Armor Ad.mov` (`1f2kXr2Ng227CLaBd5OH9d_EzX2d7TniS`), ProRes 3840×2160 25 fps.

> **MEASURED OFFSET — 0.167 s.** In this recording the picture lags the sound by five
> frames. Every segment is cut from source at **composition-time + 0.167** and placed at
> composition-time, which advances the picture by exactly that much. Verified by
> cross-correlating mouth-opening contrast against the audio envelope: the peak sits at
> −5 frames before the shift and at 0 after it. **Do not re-cut these without
> re-applying the offset.**

| File | Beat | Composition in | Source in | Dur | Line |
|---|---|---|---|---|---|
| `a-main.mp4` | 02 | 4.280 | 4.447 | 10.67 | 4.280→14.700 in one unbroken take — no cut, no re-framing |
| `a09.mp4` | 09/10 | 19.400 | 19.567 | 4.77 | 19.400→23.867 in one unbroken take — covers both lines, no cut |
| `a15.mp4` | 15 | 31.650 | 31.817 | 2.10 | "If you wanna see what's possible for yours," |

Two crops from the 4K master rather than one re-cropped — a 9:16 letterbox of the 4:5 cut
would cut his head or torso:

```bash
# 9:16  crop=1215:2160:1200:0,scale=1080:1920   -> assets/aroll/
# 4:5   crop=1728:2160:940:0,scale=1080:1350    -> assets/aroll45/
# both  eq=saturation=0.86:contrast=1.05:brightness=-0.015,colorbalance=rs=-0.02:bs=0.03
#       -ss <composition-time + 0.167> -r 30 -vsync cfr -crf 19 -an
```

The grade eases the electric-cyan backdrop toward the EcomIQ navy world.

**Logos** (client-supplied white versions — not redrawn, not recoloured):
`Logos/logo-white@2x.png` (`1yMyyTH9kNmlSJ2Il2mFY_JqEvvQcmKWZ`, 2800×481 RGBA) and
`Logos/logo-shield-white@2x.png` (`1MgOoFVh5E1YVkfnCpgOmyWCWxY_9JKhS`, 901×1061 RGBA),
pulled 2026-08-27. Exported at two sizes so no two `<img>` share a source (same src with
no `data-start` trips `duplicate_media_discovery_risk`): `mobarmor-wordmark-hero.png`
(opening card) and `mobarmor-logo-white.png` (persistent credit). The shield export was
dropped when the Mob Armor chip came off Card D — re-export from
`Logos/logo-shield-white@2x.png` at 480 px if it is ever wanted back.

The client's mark now appears in exactly one place: the opening card. It was originally
plated on `#101820` to satisfy `BRANDING_GUIDE.pdf` ("white or black logo only, on the
opposite colour"), but the card ground was changed to the EcomIQ navy on request, and the
black chip under Card D has since been cut. The white mark therefore sits on navy
`#06284C` — still a dark ground at high contrast, and the mark itself is the unmodified
client file with the shield intact, but it is worth knowing it is no longer literally
white-on-black if the client reviews it against their guide.

**Voiceover:** the same `Mob Armor Ad.mov`, audio track only — prepped to `assets/vo.m4a`
(high-pass 70 Hz, `loudnorm I=-16:TP=-1.5:LRA=11`) and laid as one continuous 38.6 s bed.
Pulled 2026-08-27.

> **The opening breath is ducked, not trimmed.** Sean's take begins with an audible breath
> in — a hump from ~0.30 to ~1.15 s peaking at −45.5 dB RMS, well above the −63 dB room
> tone around it. It is attenuated 16.5 dB with ramps at 0.15–0.32 and 1.10–1.25 s, which
> puts its peak at −62.7 dB, i.e. into the floor. **Trimming the head was not an option:**
> the A-roll is time-locked to the audio (see the offset note above), so removing 1.39 s
> of lead would shift every beat and force a re-cut of all three A-roll segments. Ducking
> leaves every timing untouched — first speech at 1.386 s is bit-identical, and the file
> measures the same before and after (I −17.1 LUFS, LRA 5.4, true peak −1.4 dBFS).
>
> ```bash
> ffmpeg -i vo.m4a -af "volume='if(lt(t,0.15),1, if(lt(t,0.32), 1-0.85*(t-0.15)/0.17, \
>   if(lt(t,1.10),0.15, if(lt(t,1.25), 0.15+0.85*(t-1.10)/0.15, 1))))':eval=frame" \
>   -c:a aac -b:a 192k -ar 48000 -ac 2 vo.m4a
> ```

## Every in-point sits inside a clean, text-free run

Most Social Cuts carry burned-in marketing text. Cut points were chosen against a
per-clip scene-detection pass so our own graphics never fight the client's.

Ranges rejected for burned-in text:
- `Tab Mount Maxx Direct` **22.9–31.7** — the entire red-product scene is covered with
  dimension callouts ("4.25\" base length", "2.5\" base width", "5\" height"). Unusable.
- `Mobnetic Stix` 14.9–19.0 ("90 lb pull force magnet"), 21.0–22.8 ("made of billet
  aluminum"), 24.3–27.3 ("360° panning"), 27.3–29.2 ("90° tilt").
- `Slim Mount` throughout ("strongest MagSafe mount", "fits curved surfaces", "daily driver").
- `Tabnetic Discs` 9.9–12.5 ("65 mm"). `Tab Mount Maxx Tube` 12.1–16.1 ("7–13\" tablets").
- `Rad Mount` 18.8–28.1 ("what's included", "2 rubber pads").

## Deliberately NOT used
- **mobarmor.com product-page video** — Okendo customer-review UGC at 576×1024. A 1.9×
  upscale, licensed for on-store display rather than paid media, and it shows
  identifiable real customers. Excluded per the brief, and per "don't use customer reviews".
- **YouTube @mobarmor** — not needed. The Drive Social Cuts covered every beat, so no
  download was attempted and no cookies were required.
- **Instagram / TikTok @mobarmor** — not needed, same reason.
- **Stock** — none. This is a proof-led first-party ad.
- **The `MP4 Product Videos` folder (32 landscape clips)** — used once, on request, for
  `claw-mount` at beat 13. Everything else comes from the Social Cuts at native
  1080×1920. See the `claw-mount` section above for what the landscape crop costs.
