# B-roll provenance & vetting

**Pulled:** 2026-08-31. **Source:** Mob Armor client Drive, "Social Cuts" subfolder
`1ArKbSBupieY_R4spsdiF7sJqxYc0qzas` (parent b-roll folder `1DBvZ_8bcxVX9wPEe0a8dUvXZhdftuAgt`).

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

## Used

### `tabnetic-discs.mp4` — laser cutting, sparks
- **Drive id:** `1sQIRGCsAxMEFB3J7w-BFFTjR-xF7ctJc` · 27.63 s · 1080×1920 · 24 fps
- **Shot boundaries (scene detect):** cuts at 5.92 / 7.79 → the shot spans **5.92 – 7.79**
- **In / out used: 6.00 → 7.70** (1.70 s), taken with margin inside the shot so the clip
  never crosses a cut. Verified frame-by-frame at 6.05 / 6.35 / 6.65 / 6.95 / 7.25 / 7.60 —
  continuous, no text.
- **Placed:** composition 27.398 → 29.100, on "**Real brands,**"
- **Why:** real Mob Armor manufacturing under a claim about real brands. The orange
  sparks against the dark plate sit naturally with the flame accent on navy.
- **Rejected ranges in this clip:** `12.28 s` carries burned-in "**65 mm**"; `3.07 s` and
  the surrounding range sit on Mob Armor brand yellow, which clashes with the EcomIQ navy.

---

## Reviewed and rejected

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
