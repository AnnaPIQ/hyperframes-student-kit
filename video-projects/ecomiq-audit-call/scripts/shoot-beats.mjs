/**
 * shoot-beats.mjs — screenshot the composition at arbitrary timestamps.
 *
 *   CH=<chrome-headless-shell> node scripts/shoot-beats.mjs <index.html> <H> <outdir> <t> [t...]
 *
 * A full draft render costs ~5 minutes; this costs ~15 seconds, so use it for
 * layout/legibility review passes and keep renders for the final check. It
 * drives the GSAP timeline with tl.seek() and seeks the <video> by hand, which
 * the render engine would never do - that is fine here, nothing is recorded.
 */
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const [file, H, outdir, ...times] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });

const b = await chromium.launch({ executablePath: process.env.CH });
const p = await b.newPage({ viewport: { width: 1080, height: Number(H) } });
await p.goto('file://' + path.resolve(file));
await p.waitForTimeout(3000);   // fonts + GSAP + first video frame

for (const t of times) {
  await p.evaluate(async (t) => {
    const tl = Object.values(window.__timelines)[0];
    tl.pause(); tl.seek(Number(t));
    const v = document.querySelector('video');
    if (v) {
      // Beds start at 0 on the root timeline, so composition time == media time.
      v.pause(); v.currentTime = Math.min(Number(t), (v.duration || 1e9) - 0.05);
      await new Promise(r => {
        if (v.readyState >= 2) { v.requestVideoFrameCallback ? v.requestVideoFrameCallback(() => r()) : r(); }
        else v.addEventListener('seeked', () => r(), { once: true });
        setTimeout(r, 1200);
      });
    }
  }, t);
  await p.waitForTimeout(250);
  const out = path.join(outdir, `t${String(t).padStart(5, '0')}.png`);
  await p.screenshot({ path: out });
  console.log(out);
}
await b.close();
