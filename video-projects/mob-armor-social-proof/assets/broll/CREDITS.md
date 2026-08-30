# B-roll credits — mob-armor-social-proof

All footage is **first-party Mob Armor material** supplied by the client via Google Drive.
No stock. No third-party UGC. No creator reposts. No customer-review video.

Source folder: `Client media` →
https://drive.google.com/drive/folders/1DBvZ_8bcxVX9wPEe0a8dUvXZhdftuAgt
Subfolder used: **Social Cuts** (Drive id `1ArKbSBupieY_R4spsdiF7sJqxYc0qzas`)

**No b-roll is used in the shipped cut.** The last remaining shot — a drone pass of a
buggy on sand dunes — sat under "after they started working with us" and did not connect
to the line, so it was cut and the slot folded into Sean. The piece is now the opening
card, Sean to camera, and the stat graphics.

Ranges below are all still logged: each regenerates in one ffmpeg line if a shot is
wanted back.

```bash
ffmpeg -y -ss <in> -t <dur> -i <src>.mp4 \
  -map 0:v:0 -an -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
  -vsync cfr -r 30 -movflags +faststart assets/broll/<name>.mp4
```

| Candidate | Source clip (Drive) | In–out | Note |
|---|---|---|---|
| `dunes-drone` | Tab Mount Maxx Tube Mount.mp4 | 31.95–34.75 | drone, buggy on dunes — the strongest single shot |
| `load-test` | Tabnetic Direct.mp4 | 14.90–17.20 | a man hanging his full weight off two mounts — the best *proof* shot |
| `incab-dash` | Mobnetic Stix.mp4 | 2.85–4.75 | phone on a dash mount, in-cab |
| `facility-floor` | Tab Mount Maxx Direct.mp4 | 12.70–15.10 | facility floor, mount in foreground |
| `cnc-sparks` | Tabnetic Discs.mp4 | 5.95–7.55 | CNC head, sparks. **Must stay inside 5.92–7.79** — there is a real cut at 7.79 that scene detection at the 0.35 threshold misses |
| `radio-guy` | Rad Mount.mp4 | 28.20–30.75 | a real customer, face to camera, in his truck |
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
| `a02.mp4` | 02 | 4.280 | 4.447 | 4.19 | "That's what happened to Mob Armor's total sales after they started working with us." |
| `a04.mp4` | 04 | 8.220 | 8.387 | 3.77 | "And it wasn't a lucky viral moment. It wasn't a magic ad." |
| `a05.mp4` | 05 | 11.733 | 11.900 | 3.22 | "When they came to us, almost everything ran through Facebook." |
| `a10.mp4` | 10 | 21.733 | 21.900 | 2.39 | "A year later, sales are up over" |
| `a13.mp4` | 13 | 27.200 | 27.367 | 2.62 | "And that's what the right plan does." |
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
pulled 2026-08-27. Exported at four sizes so no two `<img>` share a source (same src with
no `data-start` trips `duplicate_media_discovery_risk`): `mobarmor-wordmark-hero.png`
(opening card), `mobarmor-logo-white.png`, `mobarmor-wordmark-sm.png` and
`mobarmor-shield-white.png`. The opening card runs on `#101820` and the credit chips are
`#101820` plates, so the mark is always on black per `BRANDING_GUIDE.pdf`.

**Voiceover:** the same `Mob Armor Ad.mov`, audio track only — prepped to `assets/vo.m4a`
(high-pass 70 Hz, `loudnorm I=-16:TP=-1.5:LRA=11`) and laid as one continuous 38.6 s bed.
Pulled 2026-08-27.

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
- **The `MP4 Product Videos` folder (32 landscape clips)** — not needed. Every
  product shot required already exists in the Social Cuts at native 1080×1920, so
  nothing is cropped from 1920×1080 and nothing is upscaled.
