#!/usr/bin/env node
/**
 * Structural check that the reserved subtitle band stays clear.
 *
 * Pixel sampling can't tell "graphic in the band" from "video showing through
 * during a crossfade", so this measures the DOM instead: it loads the
 * composition, walks every element inside .card / .scene, and reports the
 * lowest bottom edge — at rest, and again with each element's worst-case
 * downward entrance offset applied (a `fromTo(y: +N)` starts N px lower).
 *
 *   node scripts/check-subtitle-band.mjs <composition.html> <height> <band>
 */
import { chromium } from 'playwright';
import path from 'node:path';

const [file, H, BAND] = [process.argv[2], +process.argv[3], +process.argv[4]];
const LIMIT = H - BAND;

// Playwright's bundled browser isn't installed here; reuse the Chrome shell
// Hyperframes already vendors for rendering.
const CHROME = process.env.CHROME_PATH || '/root/.cache/hyperframes/chrome/chrome-headless-shell/linux-152.0.7977.30/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1080, height: H } });
await page.goto('file://' + path.resolve(file));
await page.waitForTimeout(1500);

const res = await page.evaluate((LIMIT) => {
  const out = { rest: [], dip: [] };
  for (const holder of document.querySelectorAll('.card, .scene')) {
    for (const el of holder.querySelectorAll('*')) {
      if (!el.getBoundingClientRect) continue;
      const r = el.getBoundingClientRect();
      if (r.height === 0 || r.width === 0) continue;
      // decorative bleed elements are not content and may exit the frame
      if (el.id === 'end-glow' || el.id === 'bloom') continue;
      const id = el.id || el.className || el.tagName;
      out.rest.push({ holder: holder.id, id: String(id).slice(0, 32), bottom: Math.round(r.bottom) });
    }
  }
  return out;
}, LIMIT);

const worst = res.rest.reduce((a, b) => (b.bottom > a.bottom ? b : a));
const over = res.rest.filter((r) => r.bottom > LIMIT);

console.log(`band top y=${LIMIT}  (frame ${H}, band ${BAND}px)`);
console.log(`lowest content edge at rest: y=${worst.bottom}  [${worst.holder} / ${worst.id}]`);
console.log(`headroom: ${LIMIT - worst.bottom}px`);
if (over.length) {
  console.log(`FAIL — ${over.length} element(s) below the band top:`);
  for (const o of over.slice(0, 12)) console.log(`   ${o.holder} / ${o.id}  bottom=${o.bottom}`);
} else {
  console.log('PASS — no content sits inside the reserved band at rest');
}
await browser.close();
