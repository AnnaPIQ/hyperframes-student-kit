# B-roll provenance & vetting

**Sources:** the Mob Armor client Drive (b-roll folder `1DBvZ_8bcxVX9wPEe0a8dUvXZhdftuAgt`
— its "Social Cuts" subfolder `1ArKbSBupieY_R4spsdiF7sJqxYc0qzas` and its "MP4 Product
Videos" subfolder `1_SQ5A_MTjNzzzBp5wByRBDWEC0uFpvot`), plus two portfolio-brand shots
carried over from branch `claude/aug-general-ad-5-shortform-59z10c`.
Pulled 2026-08-31 and 2026-09-01.

First-party client media only. **No stock, no creator/UGC reposts, no customer-review
footage.** The mobarmor.com product-page video was *not* used — it is Okendo review UGC
at 576×1024, licensed for on-store display rather than paid ads, and shows identifiable
real customers.

All 12 Social Cuts are natively **1080×1920, 24 fps**, so 9:16 is a 1:1 use and 4:5 is a
1080×1350 crop out of it — no upscaling anywhere.

Every clip below was reviewed on an 8-frame contact sheet across its full duration.
Many Social Cuts carry **burned-in marketing text**; ranges are recorded either way.
In/out points for used clips were fixed by **full-file scene detection**
(`ffmpeg -i src -filter:v "select='gt(scene,0.15)',metadata=print"`, whole file, no
`-ss`) and then confirmed by eye.

---

## Used — the social-proof run, composition 24.9 → 29.9

Three shots under "That's what EcomIQ does. Real brands, real numbers, not theory."
Two real portfolio brands, then back to the client's own product. **Every cut lands
in a pause between spoken words**, never mid-word.

> **Freeze tails.** sp1 and sp2 are used to the very last frame the source has
> (2.10 s / 1.90 s — there is no more footage), which left nothing to fade out with.
> Each therefore carries a 0.35 s cloned final frame (`tpad=stop_mode=clone`). That
> freeze is only ever on screen underneath a dissolve, so it is not visible, and it
> is what lets every word landing stay where it is.

### sp1 · Sweet E's — `sp1-sweetes-9x16.mp4` / `-4x5.mp4`
- **Source:** `video-projects/my-meta-ad/assets/aug5-broll-sweetes-{9x16,4x5}.mp4` on
  branch `claude/aug-general-ad-5-shortform-59z10c` (commit `59ef7d8`), where it runs
  at 17.85–19.75 s of the Aug-General ad 5. Pulled 2026-09-01.
- **In / out used:** the whole clip, **0.00 → 2.10 s**, plus a 0.35 s freeze tail. Full-file scene detect: no cuts.
- **Placed:** 24.900 → 27.000, on "And that's what EcomIQ does."
- Native 2160×3840 / 2160×2700, so both aspects are a **0.5× downscale**. No text.

### sp2 · Dryft Sleep — `sp2-dryft-9x16.mp4` / `-4x5.mp4`
- **Source:** same branch, `aug5-broll-dryft-{9x16,4x5}.mp4`, where it runs at
  19.75–21.45 s. Pulled 2026-09-01.
- **In / out used:** the whole clip, **0.00 → 1.90 s**, plus a 0.35 s freeze tail. Scene detect flagged 0.67 s and
  0.83 s; **checked by eye and they are fast camera movement, not cuts** — the shot is
  continuous. (Recorded because the brief requires the eye-check either way.)
- **Placed:** 27.000 → 28.900, over the pause and "Real brands, real numbers,"
- Native 2160×3840 / 2160×2700 → **0.5× downscale**. No text.

### sp3 · Mobnetic Claw — `sp3-claw-9x16.mp4` / `-4x5.mp4`
*(now placed over "four paid channels", in place of the former "1 → 4" card)*
- **Source:** Drive `1mTbhx6wkCHZmaG8sQtiUKkntSdIPboTM` — "MOBNETIC CLAW.mp4", 66.7 MB,
  1920×1080, 23.976 fps, 52.67 s. Client "MP4 Product Videos" folder
  (`1_SQ5A_MTjNzzzBp5wByRBDWEC0uFpvot`). Pulled 2026-09-01.
- **Shot boundaries (full-file scene detect):** cuts at 21.81 / 23.94 → the shot spans
  **21.81 – 23.94**. **In / out used: 21.85 → 23.50**, safely inside it. No text.
- **Placed:** 14.033 → 15.333, over "four paid **channels**"
- **This is the one landscape source, and it is handled per the standing rule rather
  than cropped to fit:** a 9:16 window off 1080p would be 608 px wide — a 1.78×
  upscale — so 9:16 plays the *whole frame* at 1080×608 (a **0.5625× downscale**)
  inset on the navy ground, and **takes no push**. 4:5 gets **its own 864×1080 window
  at x=374** (centred on the mount and hand) scaled to 1080×1350 — **1.25×**, and goes
  full-bleed. The 4:5 is not a trim of the 9:16.

### Retired
`tabnetic-discs.mp4` 6.00–7.70 (laser cutting, sparks) was the single insert in the
previous cut, at 27.4–29.1 on "Real brands,". Replaced by the run above, which occupies
that span. It remains vetted and usable — see the entry below.

### sp4 · Mobnetic Slim, dash mount — `sp4-slim-dash-9x16.mp4` / `-4x5.mp4`
### sp5 · Mobnetic Slim, windscreen — `sp5-slim-screen-9x16.mp4` / `-4x5.mp4`
- **Source (both):** Drive `1qRd8uYasQBRbbqo6NJRkpG33NnvgUN1i` — "MOBNETIC SLIM.mp4",
  93.2 MB, 1920×1080, 24 fps, 73.37 s. Client "MP4 Product Videos" folder
  (`1_SQ5A_MTjNzzzBp5wByRBDWEC0uFpvot`). Pulled 2026-09-01.
- **The requested 38–41 s window crosses a cut.** Full-file scene detect puts cuts at
  37.79 / 39.88 / 43.04, so 38–41 spans two different shots — taken whole it would have
  jumped mid-beat. Split into two clips instead, each cut safely inside its own shot,
  with a blur-whip between them:
  | clip | shot boundaries | in / out used | placed |
  |---|---|---|---|
  | sp4 · dash mount | 37.79 – 39.88 | **38.00 → 39.85** | 15.333 → 16.367, over "**instead of one**" |
  | sp5 · windscreen | 39.88 – 43.04 | **39.95 → 41.30** | 28.900 → 29.900, on "not **theory**." |
- No burned-in text in either. Both landscape, so both take the same treatment as sp3:
  9:16 insets the whole frame at 1080×608 (0.5625× down) on navy with no push; 4:5 takes
  its own 864×1080 window at x=528 scaled to 1080×1350 (1.25×), full-bleed.

---

## Reviewed and rejected — Mob Armor "Social Cuts"

### `tabnetic-discs.mp4` — laser cutting, sparks *(vetted, currently unused)*
- **Drive id:** `1sQIRGCsAxMEFB3J7w-BFFTjR-xF7ctJc` · 27.63 s · 1080×1920 · 24 fps
- **Shot boundaries (scene detect):** cuts at 5.92 / 7.79 → the shot spans **5.92 – 7.79**
- **In / out used: 6.00 → 7.70** (1.70 s), taken with margin inside the shot so the clip
  never crosses a cut. Verified frame-by-frame at 6.05 / 6.35 / 6.65 / 6.95 / 7.25 / 7.60 —
  continuous, no text.
- **Why:** real Mob Armor manufacturing under a claim about real brands. The orange
  sparks against the dark plate sit naturally with the flame accent on navy.
- **Rejected ranges in this clip:** `12.28 s` carries burned-in "**65 mm**"; `3.07 s` and
  the surrounding range sit on Mob Armor brand yellow, which clashes with the EcomIQ navy.

| Clip | Drive id | Why rejected |
|---|---|---|
| `slim-mount.mp4` | `11Pom9KQ5zXJfoT06F3RJr1lRt9X8rVol` | Burned-in text through almost the whole clip — "STRONGEST MAGSAFE MOUNT", "INCLUDES RING FOR ANDROIDS", "OTHER BRANDS" / "MOB ARMOR SLIM" comparison, "ENGINEERED IN THE U.S.A.", "BLACK CHROME"/"BLACK". Only ~5.9 s and ~47.0 s are clean; neither earns a beat. |
| `rad-mount.mp4` | `1tDsY1YT6wk4z4xHC7Etaln2_8-qSmivU` | Hot-pink backgrounds clash with the navy/flame palette. Burned-in "90 LB PULL FORCE MAGNET", "WHAT'S INCLUDED:", "2 RUBBER PADS". |
| `mobnetic-stix.mp4` | `1BDmv8-GU7194MJedTT_Ewje4m1N2y0NF` | Burned-in "CLEAN AND STICK!", "MADE OF BILLET ALUMINUM", "360° PANNING". |
| `tab-mount-maxx-direct.mp4` | `1ud577NtpMV6BpnnCF260IGagWDuocPLJ` | Burned-in "INCLUDES: 2X TAPPING SCREWS…", "4.25\" base length", "2.5\" base width". Red/pink backgrounds off-palette. |
| `tab-mount-maxx-tube-mount.mp4` | `1a8KoxoKVBnCt7oyuspILNfhsW7Mx7r0E` | Burned-in "7-13\" TABLETS", "UP TO 2\" INCHES", "1.5\" INCHES". **Clean alternate held in reserve:** aerial dune truck, shot spans 31.92 – 34.96 (scene detect), usable 32.10 – 34.80, no text. Not placed — no beat in this VO refers to off-road use, and a bright sand field would fight the navy ground. |
| `tabnetic-plates.mp4` | `15PojsXpiif-BV0uhN1ymlRRZ_Q-G6MYp` | Burned-in "2.75 Inches Wide". Yellow backgrounds off-palette. |
| `retro-cap-social-cut.mp4` | `1JDV5I_couA7Ocaf6Y4ohmXqUU1V9reFw` | Opens on a burned-in "FLEX RETROCAP" title card; product-name graphics recur. |
| `quick-release-direct.mp4` | `1GeruTBTqpug1uPVbA8um2M1F02mkkExo` | No burned-in overlay text, but retail packaging with printed product copy is on screen (13.99 s) and the clip is all static bench product — nothing a beat in this VO calls for. |
| `quick-release-tube.mp4` | `1_z6gBlfa3vbw3KiXLFopunwjil4M1sls` | Clean, but bench-assembly detail with no beat to sit under. |
| `tabnetic-direct.mp4` | `1BqMYocdVmTMAGKIrBiitTGrgpG9kzbL2` | Clean throughout and a genuine second choice (industrial install, 10.67 s / 21.33 s / 37.33 s). Not used — the piece needs one b-roll insert, not two, and the sparks shot is the stronger read on "real brands". |
| `mobnetic-maxx-water-balloon.mp4` | `1uI6ZN5iO__2ixCbD3S__95f7bU2BPd-a` | Clean, no burned-in text; brand-produced talent in-vehicle. Not used — same reason as above. |
