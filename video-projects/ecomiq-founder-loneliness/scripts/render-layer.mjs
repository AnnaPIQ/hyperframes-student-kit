// Renders the static overlay layer (corner logo + subtitle) as transparent PNGs,
// one per interval listed in layer.json. Called by build.py.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const spec = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const A = join(spec.proj, 'assets');
const L = spec.layout;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Rethink Sans";src:url(file://${A}/RethinkSans.woff2) format("woff2");font-weight:400 800}
html,body{margin:0;width:${L.W}px;height:${L.H}px;background:transparent}
#logo{position:absolute;left:${L.logo[0]}px;top:${L.logo[1]}px;width:${L.logo[2]}px}
#logo.shadow{filter:drop-shadow(0 0 3px rgba(6,40,76,.9)) drop-shadow(0 2px 10px rgba(6,40,76,.7))}
#sub{position:absolute;left:0;right:0;top:${L.subTop}px;display:flex;justify-content:center}
#sub span{display:none;max-width:840px;padding:14px 28px 16px;border-radius:16px;background:rgba(6,40,76,.6);
  color:#fff;font:600 54px/1.22 "Rethink Sans",sans-serif;text-align:center;white-space:pre-line}
</style></head><body><img id="logo"><div id="sub"><span></span></div></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: L.W, height: L.H } });
const htmlPath = join(spec.out, 'layer.html');
writeFileSync(htmlPath, html);
await page.goto('file://' + htmlPath);
await page.evaluate(() => document.fonts.load('600 54px "Rethink Sans"'));

for (const [i, f] of spec.frames.entries()) {
  await page.evaluate(({ src, sub, shadow }) => {
    const img = document.getElementById('logo');
    if (img.src !== src) img.src = src;
    img.className = shadow ? 'shadow' : '';
    const s = document.querySelector('#sub span');
    s.textContent = sub; s.style.display = sub ? 'inline-block' : 'none';
  }, { src: `file://${A}/ecomiq-logo-${f.logo.split('-')[0]}.png`, sub: f.sub, shadow: f.logo.endsWith('-shadow') });
  await page.waitForFunction(() => document.getElementById('logo').complete);
  await page.screenshot({ path: join(spec.out, `layer${String(i).padStart(3, '0')}.png`), omitBackground: true });
}
await browser.close();
