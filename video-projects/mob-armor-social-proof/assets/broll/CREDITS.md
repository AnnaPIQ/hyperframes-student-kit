# B-roll credits — mob-armor-social-proof

All footage is **first-party Mob Armor material** supplied by the client via Google Drive.
No stock. No third-party UGC. No creator reposts. No customer-review video.

Source folder: `Client media` →
https://drive.google.com/drive/folders/1DBvZ_8bcxVX9wPEe0a8dUvXZhdftuAgt
Subfolder used: **Social Cuts** (Drive id `1ArKbSBupieY_R4spsdiF7sJqxYc0qzas`)

Every Social Cut is 1080×1920, **24 fps**, H.264, carrying an audio track *and* a stray
data stream. Prep for all nine clips — video-only, normalised to 30 fps cfr:

```bash
ffmpeg -y -ss <in> -t <dur> -i <src>.mp4 \
  -map 0:v:0 -an -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
  -vsync cfr -r 30 -movflags +faststart assets/broll/<name>.mp4
```

`-map 0:v:0 -an` drops both the audio and the data stream in one pass.

| Local file | Beat | Source clip (Drive) | Drive file id | In–out | Pulled |
|---|---|---|---|---|---|
| `incab-dash.mp4` | 02 | Mobnetic Stix.mp4 | `1BDmv8-GU7194MJedTT_Ewje4m1N2y0NF` | 2.85–4.75 | 2026-08-27 |
| `cnc-sparks.mp4` | 03 | Tabnetic Discs.mp4 | `1sQIRGCsAxMEFB3J7w-BFFTjR-xF7ctJc` | 5.95–8.35 | 2026-08-27 |
| `dunes-drone.mp4` | 04 | Tab Mount Maxx Tube Mount.mp4 | `1a8KoxoKVBnCt7oyuspILNfhsW7Mx7r0E` | 32.00–34.45 | 2026-08-27 |
| `tablet-wall.mp4` | 05 | Tabnetic Direct.mp4 | `1BqMYocdVmTMAGKIrBiitTGrgpG9kzbL2` | 20.55–22.35 | 2026-08-27 |
| `phone-dash.mp4` | 06a | Mobnetic Maxx Water balloon.mp4 | `1uI6ZN5iO__2ixCbD3S__95f7bU2BPd-a` | 2.55–3.80 | 2026-08-27 |
| `load-test.mp4` | 06b | Tabnetic Direct.mp4 | `1BqMYocdVmTMAGKIrBiitTGrgpG9kzbL2` | 14.90–17.20 | 2026-08-27 |
| `facility-floor.mp4` | 10 | Tab Mount Maxx Direct.mp4 | `1ud577NtpMV6BpnnCF260IGagWDuocPLJ` | 12.70–15.10 | 2026-08-27 |
| `tablet-locked.mp4` | 13 | Tabnetic Direct.mp4 | `1BqMYocdVmTMAGKIrBiitTGrgpG9kzbL2` | 41.10–43.45 | 2026-08-27 |
| `radio-guy.mp4` | 14 | Rad Mount.mp4 | `1tDsY1YT6wk4z4xHC7Etaln2_8-qSmivU` | 28.20–30.75 | 2026-08-27 |

**Logos** (client-supplied white versions — not redrawn, not recoloured):
`Logos/logo-white@2x.png` (`1yMyyTH9kNmlSJ2Il2mFY_JqEvvQcmKWZ`, 2800×481 RGBA) and
`Logos/logo-shield-white@2x.png` (`1MgOoFVh5E1YVkfnCpgOmyWCWxY_9JKhS`, 901×1061 RGBA),
pulled 2026-08-27. Both sit on a black `#101820` chip, per `BRANDING_GUIDE.pdf`.

**A-roll / voiceover:** `Mob Armor Ad.mov` (`1f2kXr2Ng227CLaBd5OH9d_EzX2d7TniS`),
ProRes 3840×2160 25 fps, PCM 24-bit stereo, 39.28 s. Audio only is used — the picture
is never cut in. Prepped to `assets/vo.m4a` (high-pass 70 Hz, `loudnorm I=-16 TP=-1.5`).
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
