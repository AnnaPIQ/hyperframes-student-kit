#!/usr/bin/env node
/**
 * Structural check that the reserved subtitle band stays clear of content.
 *
 * Why not sample pixels: pixel sampling can't tell "a graphic sits in the band"
 * from "video is showing through during a crossfade", so it cries wolf on every
 * transition. This measures the DOM instead.
 *
 * Two things it gets right that are easy to get wrong:
 *
 *  1. It serves the PROJECT ROOT over HTTP rather than opening file://.
 *     Compositions under compositions/ use root-relative asset paths
 *     (assets/…), which is what the render server expects — over file:// those
 *     404 and the page renders with NO CSS, which silently makes the whole
 *     check meaningless.
 *  2. It measures leaf content only. Full-bleed containers (.scene, .sc) and
 *     decoratives (.bloom) legitimately span the frame and would otherwise
 *     swamp the result.
 *
 * Readings are taken at page load, while GSAP still holds each tween's
 * entrance FROM-state, so the numbers are worst case rather than resting: a
 * `fromTo(y: +N)` starts N px lower than where it settles.
 *
 *   node scripts/check-subtitle-band.mjs <composition.html> <frameHeight> <band>
 */
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const [file, H, BAND] = [process.argv[2], +process.argv[3], +process.argv[4]];
if (!file || !H || !BAND) {
  console.error('usage: check-subtitle-band.mjs <composition.html> <frameHeight> <band>');
  process.exit(2);
}
const LIMIT = H - BAND;

// project root = nearest ancestor holding hyperframes.json
let root = path.dirname(path.resolve(file));
while (!fs.existsSync(path.join(root, 'hyperframes.json')) && root !== path.dirname(root)) {
  root = path.dirname(root);
}

const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.m4a': 'audio/mp4',
};
// The composition is served AT the project root, not at its own directory:
// Hyperframes gives every composition the project root as its base URL, which
// is why files under compositions/ use root-relative asset paths. Serving it
// from /compositions/ instead would 404 every asset and render an unstyled
// page that silently passes every check.
const ENTRY = '/__composition.html';
const server = http.createServer((req, res) => {
  const reqPath = decodeURIComponent(req.url.split('?')[0]);
  const p = reqPath === ENTRY ? path.resolve(file) : path.join(root, reqPath);
  fs.readFile(p, (err, buf) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(p)] || 'application/octet-stream' });
    res.end(buf);
  });
});
await new Promise((r) => server.listen(0, r));
const url = `http://127.0.0.1:${server.address().port}${ENTRY}`;

const CHROME = process.env.CHROME_PATH ||
  '/root/.cache/hyperframes/chrome/chrome-headless-shell/linux-152.0.7977.30/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1080, height: H } });
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(1500);

const res = await page.evaluate(() => {
  // sanity: if the ratio tokens are empty the stylesheet never loaded
  const probe = getComputedStyle(document.body).getPropertyValue('--sub-safe').trim();
  const items = [];
  const DECOR = new Set(['bloom', 'aroll-scrim', 'end-glow']);
  for (const holder of document.querySelectorAll('.scene, .card')) {
    for (const el of holder.querySelectorAll('*')) {
      if (el.children.length && el.tagName !== 'IMG' && el.tagName !== 'SVG') continue; // leaves only
      if (DECOR.has(el.id) || el.classList?.contains('bloom')) continue;
      const r = el.getBoundingClientRect();
      if (r.height === 0 || r.width === 0) continue;
      items.push({
        holder: holder.id,
        id: String(el.id || el.className?.baseVal || el.className || el.tagName).slice(0, 30),
        bottom: Math.round(r.bottom),
      });
    }
  }
  return { probe, items };
});
await browser.close();
server.close();

if (!res.probe) {
  console.error('FAIL — stylesheet did not load (ratio tokens empty). Check asset paths.');
  process.exit(1);
}
const worst = res.items.reduce((a, b) => (b.bottom > a.bottom ? b : a));
const over = res.items.filter((r) => r.bottom > LIMIT);

console.log(`band top y=${LIMIT}  (frame ${H}, band ${BAND}px, --sub-safe ${res.probe})`);
console.log(`measured ${res.items.length} content elements across all scenes`);
console.log(`lowest content edge: y=${worst.bottom}  [${worst.holder} / ${worst.id}]`);
console.log(`headroom: ${LIMIT - worst.bottom}px`);
if (over.length) {
  console.log(`FAIL — ${over.length} element(s) inside the reserved band:`);
  for (const o of over.slice(0, 12)) console.log(`   ${o.holder} / ${o.id}  bottom=${o.bottom}`);
  process.exit(1);
}
console.log('PASS — no content sits inside the reserved band (worst-case entrance offsets included)');
