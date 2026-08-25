/**
 * scrub.mjs — screenshot a composition at exact timeline seconds, without rendering.
 *
 *   node scripts/scrub.mjs <composition.html> <composition-id> <w> <h> <t1,t2,...>
 *   node scripts/scrub.mjs index.html ecomiq-social-proof 1080 1920 13.0,13.6
 *
 * A full draft render of this piece costs ~4.5 minutes; this costs seconds, so use
 * it to check a single graphic's state before paying for a render. It drives the
 * registered GSAP timeline directly (tl.time(t)) and also seeks each <video> to the
 * matching frame, honouring data-start / data-media-start.
 *
 * Run it from the WORKSPACE ROOT — that's where playwright is installed. Playwright's
 * own browser download is absent in this container, so it borrows the Chrome that
 * hyperframes already caches.
 */
import { chromium } from 'playwright';

const CHROME = '/root/.cache/hyperframes/chrome/chrome-headless-shell/'
  + 'linux-152.0.7977.30/chrome-headless-shell-linux64/chrome-headless-shell';

const [file, comp, w, h, times] = process.argv.slice(2);
if (!times) {
  console.error('usage: node scripts/scrub.mjs <file.html> <comp-id> <w> <h> <t1,t2,...>');
  process.exit(1);
}
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
await page.goto('file://' + new URL(file, 'file://' + process.cwd() + '/').pathname);
await page.waitForFunction(() => window.__timelines && Object.keys(window.__timelines).length);

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
  await page.waitForTimeout(350);
  const out = `/tmp/scrub-${t}.png`;
  await page.screenshot({ path: out });
  console.log('shot', t, '->', out);
}
await browser.close();
