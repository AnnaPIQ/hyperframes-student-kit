#!/usr/bin/env node
/**
 * verify-layout.mjs — static layout assertions, before paying for a render.
 *
 *   node scripts/verify-layout.mjs            # 9:16 master
 *   node scripts/verify-layout.mjs build/4x5  # the generated 4:5
 *
 * Loads the composition in Chromium with every band forced visible and
 * measures real bounding boxes. Asserts, rather than eyeballs:
 *
 *   - no band bottoms out inside the subtitle zone (bottom 30% of the frame)
 *   - no band collides with the logo bug
 *   - no element overflows the stage horizontally or vertically
 *   - the 3x bars really are drawn at a 1:3 width ratio
 *   - both brand faces resolved to the local woff2, not to a fallback
 */
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = process.argv[2] ? path.resolve(ROOT, process.argv[2]) : ROOT;
const meta = JSON.parse(readFileSync(path.join(DIR, 'meta.json'), 'utf8'));
const { width: W, height: H } = meta;
const SUBTITLE_TOP = Math.round(H * 0.7); // bottom 30% must stay clear

const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };

// This container ships Chrome under the hyperframes cache and a Playwright
// bundle that does not match the installed driver, so resolve an executable
// explicitly rather than relying on Playwright's own lookup.
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const roots = ['/opt/pw-browsers', '/root/.cache/hyperframes/chrome'];
  const hits = [];
  const walk = (d, depth) => {
    if (depth > 4) return;
    let entries = [];
    try { entries = readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full, depth + 1);
      else if (e.name === 'chrome' || e.name === 'chrome-headless-shell') hits.push(full);
    }
  };
  roots.forEach((r) => walk(r, 0));
  if (!hits.length) throw new Error('no Chrome executable found under ' + roots.join(', '));
  return hits.sort()[hits.length - 1];
}

const browser = await chromium.launch({ executablePath: findChrome() });
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.goto(pathToFileURL(path.join(DIR, 'index.html')).href);
await page.evaluate(() => document.fonts.ready);

// Force every timed element visible, and clear the transforms GSAP's fromTo
// applies immediately on load, so what gets measured is the RESTING position
// each element animates to — not its entrance offset.
await page.addStyleTag({
  content: `.bandwrap,.band,.eyebrow,.figure,.label,.name,.statement,.barrow,.hair,
            #endCard,#endLogo,#endLine,#endPill{opacity:1 !important; transform:none !important}
            .bar{transform:scaleX(1) !important}`
});

const boxes = await page.evaluate(() => {
  const out = {};
  for (const el of document.querySelectorAll('.band, #logoWrap, #eBar1, #eBar3, #endLogo, #endLine, #endPill')) {
    const r = el.getBoundingClientRect();
    out[el.id] = { x: r.x, y: r.y, w: r.width, h: r.height, bottom: r.bottom, right: r.right };
  }
  return out;
});

const logo = boxes.logoWrap;
for (const [id, b] of Object.entries(boxes)) {
  if (!id.startsWith('b') || id === 'bg') continue;
  ok(b.bottom <= SUBTITLE_TOP + 1,
    `${id} bottoms out at y=${b.bottom.toFixed(0)}, inside the subtitle zone (y>${SUBTITLE_TOP})`);
  ok(b.y >= logo.bottom,
    `${id} top y=${b.y.toFixed(0)} collides with the logo bug (bottom y=${logo.bottom.toFixed(0)})`);
  ok(b.x >= 0 && b.right <= W + 1, `${id} overflows the stage horizontally`);
  ok(b.y >= 0, `${id} overflows the top of the stage`);
}

// every piece of end-card content must also clear the subtitle zone
for (const id of ['endLogo', 'endLine', 'endPill']) {
  ok(boxes[id].bottom <= SUBTITLE_TOP + 1,
    `#${id} bottoms out at y=${boxes[id].bottom.toFixed(0)}, inside the subtitle zone (y>${SUBTITLE_TOP})`);
  ok(boxes[id].x >= 0 && boxes[id].right <= W + 1, `#${id} overflows the stage horizontally`);
}

// Display type that nearly fills its band in 9:16 can overflow in the narrower
// 4:5. Compare each text node's real ink width against its band's content box.
const overflow = await page.evaluate(() => {
  const out = [];
  for (const band of document.querySelectorAll('.band')) {
    const cs = getComputedStyle(band);
    const inner = band.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    for (const el of band.querySelectorAll('.eyebrow,.figure,.label,.name,.statement')) {
      const r = document.createRange();
      r.selectNodeContents(el);
      const ink = Math.max(...[...r.getClientRects()].map((x) => x.width), 0);
      if (ink > inner) out.push({ band: band.id, el: el.id, ink: Math.round(ink), inner: Math.round(inner) });
      else out.push({ band: band.id, el: el.id, ink: Math.round(ink), inner: Math.round(inner), ok: true });
    }
  }
  return out;
});
for (const o of overflow) {
  ok(o.ok, `#${o.el} draws ${o.ink}px inside a ${o.inner}px band (${o.band}) — it will wrap or clip`);
}
const tightest = overflow.reduce((a, b) => (b.ink / b.inner > a.ink / a.inner ? b : a));

// the one chart in the piece has to be drawn at its stated ratio
const ratio = boxes.eBar3.w / boxes.eBar1.w;
ok(Math.abs(ratio - 3) < 0.02, `bars are drawn at 1:${ratio.toFixed(3)}, not the stated 1:3`);

// fonts: a fallback silently changes the typeface without failing lint
const fonts = await page.evaluate(() => ({
  sans: getComputedStyle(document.querySelector('.name')).fontFamily,
  serif: getComputedStyle(document.querySelector('#endLine .em')).fontFamily,
  loaded: [...document.fonts].map((f) => `${f.family}:${f.status}`)
}));
ok(fonts.loaded.some((f) => f.startsWith('Rethink Sans') && f.endsWith('loaded')),
  `Rethink Sans did not load (${fonts.loaded.join(', ')})`);
ok(fonts.loaded.some((f) => f.startsWith('Hedvig Letters Serif') && f.endsWith('loaded')),
  `Hedvig Letters Serif did not load (${fonts.loaded.join(', ')})`);

await browser.close();

const label = `${W}x${H}`;
if (fails.length) {
  console.error(`✗ ${label}: ${fails.length} layout failure(s)`);
  for (const f of fails) console.error(`   - ${f}`);
  process.exit(1);
}
console.log(`✓ ${label}: bands clear the subtitle zone and the logo, bars at 1:3, both fonts local`);
console.log(`    tightest line: #${tightest.el} ${tightest.ink}px in ${tightest.inner}px ` +
  `(${Math.round((tightest.ink / tightest.inner) * 100)}% of the band)`);
for (const [id, b] of Object.entries(boxes)) {
  console.log(`    ${id.padEnd(8)} y ${b.y.toFixed(0).padStart(4)} → ${b.bottom.toFixed(0).padStart(4)}  (h ${b.h.toFixed(0)})`);
}
