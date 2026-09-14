# ecomiq-broll — reusable EcomIQ B-roll

Short (~3s), silent, un-branded building-block clips of the **real** EcomIQ
profitability workbook and its companion tools, framed for compositing into
future ads. No logo, no captions, no end card — those are added at ad-assembly
time.

Every clip is a genuine screen recording driven by Playwright against the real
asset. Nothing here is a rebuild or a mock-up, and no figures are invented.

## Pipeline

```bash
node scripts/fetch-sources.mjs        # pull the source PDF into assets/source/
node scripts/capture-<clip>.mjs       # Playwright screen-record -> captures/<clip>.webm + .marks.json
node scripts/prep-captures.mjs        # trim to the marked ~3s window -> assets/clips/<clip>.mp4
node scripts/build-compositions.mjs   # generate compositions/<clip>-<ratio>.html (+ index.html)
node scripts/build-hero.mjs           # generate the 5s motion-graphics hero composition
node scripts/lint-all.mjs             # hyperframes lint over every generated composition
node scripts/render-all.mjs           # render every clip x ratio -> renders/broll/<clip>/<ratio>.mp4
node scripts/build-index.mjs          # write broll-index.json from clips.json + the real renders
```

`clips.json` is the manifest: it declares each clip's name, what it shows, the
shipped duration and its source URL. `prep-captures` trims to the declared
duration and `build-compositions` builds to the same number, so a clip and its
composition can never disagree about length.

`broll-index.json` at the project root describes what each clip shows, its
duration, its ratios and its source URL.

## Environment notes (Claude Code on the web)

Two things this container needs that a local machine does not:

- **Chromium**: the pre-provisioned browser is at `/opt/pw-browsers/chromium`.
  The npm `playwright` package pins a newer build, so the capture scripts always
  pass an explicit `executablePath`. Do not run `playwright install`.
- **TLS**: outbound HTTPS goes through the agent proxy, and that relay drops
  Chromium's TLS 1.3 ClientHello mid-handshake (every navigation fails with
  `ERR_CONNECTION_RESET`). The capture scripts launch with
  `--ssl-version-max=tls1.2`, which makes every https:// target load.

## Two kinds of clip

`clips.json` marks each clip with a `builder`:

- **`frame`** — a real Playwright screen recording of the live asset, sat in a
  clean branded card. Recognition first: the viewer sees the actual thing they
  were sent. 3s, at 9:16 / 1:1 / 16:9.
- **`hero`** — a motion-graphics cut built from the real workbook pages rendered
  out of the PDF (`assets/pages/*.png`), in the EcomIQ motion language: deep navy
  ground, perspective grid, crosshair marks, vignette and grain, a CSS-3D book,
  a page fan, kinetic numerals, and flame-orange highlights on the rows that
  matter. Beats hand over on blur and scale alone — no streaks or flashes over
  the seams. Energy first. 5s, at 9:16 / 4:5.

Both use the real workbook. The hero never invents a figure — every number on
screen is a page out of the PDF.

### Gotcha worth keeping

Never put a GSAP `filter` tween on an element that relies on
`transform-style: preserve-3d`. A filter forces the element back to `flat` and
its 3D children collapse — that is what hid the book's fore-edge on the first
pass. Animate the blur on a wrapper instead.

## Framing

The recordings are landscape UI and are never cropped to go vertical. Each is
centred in an EcomIQ-branded frame (navy ground, soft bloom, vignette, soft-
shadowed card) sized as large as the ratio allows while the real UI stays
readable. The card makes a slow 0.985 -> 1.015 push so the frame is never
static, but there are no fades, so an editor can cut in or out on any frame.
