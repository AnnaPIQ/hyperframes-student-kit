/**
 * Generates one framing composition per (clip × ratio) from a single template.
 *
 * The captured recording is the hero: the composition does nothing but sit it
 * in a clean EcomIQ-branded frame, centered and as large as the ratio allows
 * while the real UI stays fully readable. No logo, no captions, no end card —
 * these are building blocks, branding is added at ad-assembly time.
 *
 * Motion discipline (MOTION_PHILOSOPHY law 4, "camera never sleeps"): the card
 * makes a slow push from 0.985 -> 1.015 across the clip and the background
 * bloom drifts. No fades, so an editor can cut in or out on any frame. The card
 * is sized for its LARGEST scale, so the push never crops the UI.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLIPS = JSON.parse(fs.readFileSync(path.join(ROOT, 'clips.json'), 'utf8'));

const FPS = 30;
const snap = (t) => Math.round(t * FPS) / FPS;   // keep tween times on frame boundaries

/** Ratios: card sized at BASE scale; max scale 1.015 must still clear the edges. */
export const RATIOS = {
  '9x16': { w: 1080, h: 1920, card: [1008, 630], radius: 18 },
  '1x1':  { w: 1080, h: 1080, card: [1008, 630], radius: 18 },
  '16x9': { w: 1920, h: 1080, card: [1584, 990], radius: 22 },
};

const SCALE_FROM = 0.985;
const SCALE_TO = 1.015;

function template({ clip, ratioKey }) {
  const r = RATIOS[ratioKey];
  const id = `${clip.name}-${ratioKey}`;
  const dur = snap(clip.duration);
  const [cw, ch] = r.card;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${r.w}, height=${r.h}" />
    <title>EcomIQ B-roll — ${clip.title} (${ratioKey})</title>
    <!-- GSAP is vendored locally: a CDN cert failure freezes renders. -->
    <script src="assets/gsap.min.js"></script>
    <link rel="stylesheet" href="assets/brand-tokens.css" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        width: ${r.w}px;
        height: ${r.h}px;
        overflow: hidden;
        background: var(--brand-navy);
        font-family: var(--font-sans);
      }
      /* Brand ground: navy with a cool bloom high and a warm one low, so the
         white card separates from the background on every ratio. */
      #bg {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(70% 42% at 50% 14%, rgba(156, 212, 255, 0.085) 0%, rgba(6, 40, 76, 0) 62%),
          var(--brand-navy);
      }
      #bloom {
        position: absolute;
        left: -15%;
        bottom: -28%;
        width: 130%;
        height: 55%;
        background: var(--brand-gradient-2);
        filter: blur(110px);
        opacity: 0.10;
      }
      /* Vignette keeps the frame from reading flat-lit. Kept light so the clip
         stays clean for compositing. */
      #vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(120% 80% at 50% 50%, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0.42) 100%);
        pointer-events: none;
      }
      /* The card. Transform-only animation — never width/height/top/left, which
         freezes video frames in Chrome. */
      #card {
        position: absolute;
        left: ${Math.round((r.w - cw) / 2)}px;
        top: ${Math.round((r.h - ch) / 2)}px;
        width: ${cw}px;
        height: ${ch}px;
        border-radius: ${r.radius}px;
        overflow: hidden;
        background: #1b1b1b;
        border: 1px solid rgba(156, 212, 255, 0.22);
        box-shadow:
          0 2px 0 rgba(255, 255, 255, 0.06) inset,
          0 38px 90px rgba(0, 0, 0, 0.55),
          0 8px 24px rgba(0, 0, 0, 0.4);
        will-change: transform;
      }
      #shot {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    </style>
  </head>
  <body>
    <div
      id="${id}"
      data-composition-id="${id}"
      data-start="0"
      data-width="${r.w}"
      data-height="${r.h}"
      data-fps="${FPS}"
    >
      <div id="bg" class="clip" data-start="0" data-duration="${dur}" data-track-index="0">
        <div id="bloom"></div>
      </div>

      <!-- The card is an untimed visual container: timing a wrapper AND the
           <video> inside it desynchronises the frame extractor from visibility.
           No class="clip" on <video> either — it breaks playback. -->
      <div id="card">
        <video
          id="shot"
          src="assets/clips/${clip.name}.mp4"
          muted
          data-start="0"
          data-duration="${dur}"
          data-track-index="1"
        ></video>
      </div>

      <div id="vignette" class="clip" data-start="0" data-duration="${dur}" data-track-index="2"></div>
    </div>

    <script>
      const SLOT = ${dur};
      const tl = gsap.timeline({ paused: true });

      // Slow push on the card — the "camera never sleeps" beat. No fade in or
      // out, so this clip can be cut into an edit on any frame.
      tl.fromTo(
        "#card",
        { scale: ${SCALE_FROM} },
        { scale: ${SCALE_TO}, duration: SLOT, ease: "none" },
        0
      );

      // Background bloom drifts against the push so the ground isn't static.
      tl.fromTo(
        "#bloom",
        { xPercent: -2, yPercent: 2 },
        { xPercent: 2, yPercent: -2, duration: SLOT, ease: "none" },
        0
      );

      // Law 11: the timeline must fill its slot or the last frames go black.
      tl.to({}, { duration: SLOT }, 0);

      window.__timelines = window.__timelines || {};
      window.__timelines["${id}"] = tl;
    </script>
  </body>
</html>
`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const only = process.argv.slice(2);
  let n = 0;
  for (const clip of CLIPS) {
    if (only.length && !only.includes(clip.name)) continue;
    for (const ratioKey of Object.keys(RATIOS)) {
      const file = path.join(ROOT, 'compositions', `${clip.name}-${ratioKey}.html`);
      fs.writeFileSync(file, template({ clip, ratioKey }));
      console.log('wrote', path.relative(ROOT, file));
      n++;
    }
  }
  // The CLI needs an index.html to treat this folder as a project. The first
  // clip's 9:16 build doubles as that default entry point.
  const first = CLIPS.find((c) => !only.length || only.includes(c.name)) || CLIPS[0];
  fs.writeFileSync(
    path.join(ROOT, 'index.html'),
    template({ clip: first, ratioKey: '9x16' }),
  );
  console.log(`wrote index.html (default entry = ${first.name} 9x16)`);
  console.log(`${n} composition(s)`);
}
