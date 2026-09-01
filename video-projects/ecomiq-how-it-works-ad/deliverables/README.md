# Deliverables — EcomIQ "How it works" ad

Rendered from `index.html` (9:16) and `compositions/meta45.html` (4:5) at the
commit these files were added on. All four are 76.433s, 2293 frames, 30 fps CFR,
H.264 High / yuv420p, AAC 48 kHz stereo, `+faststart`. Card trigger at 71.433s.

| file | ratio | size | encode |
|---|---|--:|---|
| `ecomiq-how-it-works-9x16.mp4` | 1080×1920 | 67.9 MB | `--quality high` master (CRF 15) |
| `ecomiq-how-it-works-4x5.mp4`  | 1080×1350 | 49.2 MB | `--quality high` master (CRF 15) |
| `ecomiq-how-it-works-9x16-lite.mp4` | 1080×1920 | 23.7 MB | re-encode, CRF 21 — SSIM 0.9997 vs master |
| `ecomiq-how-it-works-4x5-lite.mp4`  | 1080×1350 | 20.1 MB | re-encode, CRF 20 — SSIM 0.9996 vs master |

Upload the **masters** to Meta. The `-lite` pair exists only because chat
attachments cap at 30 MiB; they are the same pixel dimensions and frame count,
just a lower bitrate, and are visually indistinguishable (PSNR ~34 dB).

These are checked in so they have stable download URLs. They are the one
exception to `.gitignore`'s `renders/` rule — regenerate rather than re-commit
if the edit changes:

```bash
cd video-projects/ecomiq-how-it-works-ad
bash scripts/build-assets.sh            # derive vo/pip/montage beds from ../../assets/incoming/
npx hyperframes render --quality high --output renders/ecomiq-how-it-works-916.mp4
npx hyperframes render -c compositions/meta45.html --quality high --output renders/ecomiq-how-it-works-4x5.mp4
```
