import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'captures/shoplift';
const SHOTS = path.join(OUT, 'screenshots');
const ASSETS = path.join(OUT, 'assets');
for (const d of [OUT, SHOTS, ASSETS]) fs.mkdirSync(d, { recursive: true });

const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const PROXY = process.env.HTTPS_PROXY || 'http://127.0.0.1:41101';

const pages = [
  { name: 'home', url: 'https://www.shoplift.ai/' },
  { name: 'product', url: 'https://www.shoplift.ai/product' },
  { name: 'features', url: 'https://www.shoplift.ai/features' },
  { name: 'how-it-works', url: 'https://www.shoplift.ai/how-it-works' },
  { name: 'platform', url: 'https://www.shoplift.ai/platform' },
  { name: 'app', url: 'https://app.shoplift.ai/' },
];

const browser = await chromium.launch({
  executablePath: EXE,
  proxy: { server: PROXY },
  args: ['--ignore-certificate-errors', '--no-sandbox'],
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  ignoreHTTPSErrors: true,
});

const imgManifest = [];

for (const p of pages) {
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(p.url, { waitUntil: 'networkidle', timeout: 45000 });
    console.log(`[${p.name}] ${p.url} -> ${resp ? resp.status() : 'no-resp'} final=${page.url()}`);
    await page.waitForTimeout(2500);
    // dismiss cookie banners if any
    for (const sel of ['button:has-text("Accept")', 'button:has-text("Got it")', '#onetrust-accept-btn-handler']) {
      const b = page.locator(sel).first();
      if (await b.count().catch(() => 0)) { await b.click({ timeout: 1500 }).catch(() => {}); }
    }
    await page.waitForTimeout(500);
    // full page
    await page.screenshot({ path: path.join(SHOTS, `${p.name}-full.png`), fullPage: true }).catch(e => console.log('  full fail', e.message));
    // viewport tiles by scrolling
    const H = await page.evaluate(() => document.body.scrollHeight);
    const vh = 900;
    let i = 0;
    for (let y = 0; y < H && i < 12; y += vh) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(SHOTS, `${p.name}-scroll-${String(i).padStart(2, '0')}.png`) }).catch(() => {});
      i++;
    }
    // collect image assets
    const imgs = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('img').forEach(el => {
        const r = el.getBoundingClientRect();
        out.push({ src: el.currentSrc || el.src, w: el.naturalWidth, h: el.naturalHeight, alt: el.alt || '', dw: Math.round(r.width), dh: Math.round(r.height) });
      });
      return out;
    });
    for (const im of imgs) if (im.src && im.w >= 300 && im.h >= 200) imgManifest.push({ page: p.name, ...im });
    // page text
    const txt = await page.evaluate(() => document.body.innerText.slice(0, 4000));
    fs.writeFileSync(path.join(OUT, `${p.name}.txt`), txt);
  } catch (e) {
    console.log(`[${p.name}] ERROR: ${e.message}`);
  } finally {
    await page.close();
  }
}

// de-dupe and download product-looking images
const seen = new Set();
const uniq = imgManifest.filter(im => { if (seen.has(im.src)) return false; seen.add(im.src); return true; });
uniq.sort((a, b) => (b.w * b.h) - (a.w * a.h));
fs.writeFileSync(path.join(OUT, 'img-manifest.json'), JSON.stringify(uniq, null, 2));
console.log(`\n${uniq.length} unique images >=300x200`);

let n = 0;
for (const im of uniq.slice(0, 40)) {
  try {
    const r = await ctx.request.get(im.src, { timeout: 20000 });
    if (!r.ok()) { console.log('  dl fail', r.status(), im.src); continue; }
    const buf = await r.body();
    const ext = (im.src.split('?')[0].split('.').pop() || 'png').slice(0, 4).replace(/[^a-z0-9]/gi, '') || 'png';
    const fn = `${im.page}-${String(n).padStart(2, '0')}-${im.w}x${im.h}.${ext}`;
    fs.writeFileSync(path.join(ASSETS, fn), buf);
    console.log(`  saved ${fn}  alt="${im.alt.slice(0,50)}"`);
    n++;
  } catch (e) { console.log('  dl err', e.message); }
}

await browser.close();
console.log('done');
