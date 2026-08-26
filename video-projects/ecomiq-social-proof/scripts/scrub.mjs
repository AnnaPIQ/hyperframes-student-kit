/**
 * scrub.mjs — screenshot a composition at exact timeline seconds, without rendering.
 *
 *   node <project>/scripts/scrub.mjs <composition.html> <comp-id> <w> <h> <t1,t2,...>
 *
 * A draft render of this piece costs ~4.5 minutes; this costs seconds, so use it to
 * check a graphic before paying for a render. It drives the registered GSAP timeline
 * directly (tl.time(t)) and seeks each <video> to the matching frame, honouring
 * data-start / data-media-start.
 *
 * Run it from the WORKSPACE ROOT (that's where playwright is installed) and pass an
 * ABSOLUTE path to the composition. Playwright's own browser download is absent in
 * this container, so it borrows the Chrome that hyperframes already caches.
 *
 * Compositions reference assets relative to the PROJECT ROOT — that's what the
 * renderer serves them against — so a composition living in compositions/ would 404
 * on gsap/fonts/media if opened straight off disk. We therefore run a temporary copy
 * from the project root, where those paths resolve exactly as they do at render time.
 */
import { chromium } from 'playwright';
import { copyFileSync, existsSync, unlinkSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';

const CHROME = '/root/.cache/hyperframes/chrome/chrome-headless-shell/'
  + 'linux-152.0.7977.30/chrome-headless-shell-linux64/chrome-headless-shell';

const [file, comp, w, h, times] = process.argv.slice(2);
const comp0 = comp;
if (!times) {
  console.error('usage: node scripts/scrub.mjs <abs-file.html> <comp-id> <w> <h> <t1,t2,...>');
  process.exit(1);
}

const abs = resolve(process.cwd(), file);
let root = dirname(abs);
while (!existsSync(resolve(root, 'hyperframes.json')) && root !== dirname(root)) root = dirname(root);

const shim = join(root, '.scrub-tmp.html');
const needsShim = dirname(abs) !== root;
if (needsShim) copyFileSync(abs, shim);
const target = needsShim ? shim : abs;

const browser = await chromium.launch({ executablePath: CHROME });
try {
  const page = await browser.newPage({ viewport: { width: +w, height: +h } });
  // 'load' never fires: Chromium's media loader keeps the b-roll requests open over
  // file://, which is harmless for a still frame.
  await page.goto('file://' + target, { waitUntil: 'domcontentloaded' });
  // A settle wait beats waitForFunction here: the pending file:// media requests
  // starve both rAF and interval polling inside the page.
  await page.waitForTimeout(2500);
  const keys = await page.evaluate(() => Object.keys(window.__timelines || {}));
  if (!keys.includes(comp0)) throw new Error(`timeline "${comp0}" not registered; found: ${keys}`);

  for (const t of times.split(',')) {
    await page.evaluate(([id, tt]) => {
      const tl = window.__timelines[id];
      tl.pause();
      tl.time(parseFloat(tt));
      document.querySelectorAll('video').forEach((v) => {
        const start = parseFloat(v.dataset.start || 0);
        const mediaStart = parseFloat(v.dataset.mediaStart || 0);
        const local = parseFloat(tt) - start + mediaStart;
        if (local >= 0) { try { v.currentTime = local; } catch (e) { /* not seekable yet */ } }
      });
    }, [comp, t]);
    await page.waitForTimeout(400);
    const out = `/tmp/scrub-${t}.png`;
    await page.screenshot({ path: out });
    console.log('shot', t, '->', out);
  }
} finally {
  await browser.close();
  if (needsShim && existsSync(shim)) unlinkSync(shim);
}
