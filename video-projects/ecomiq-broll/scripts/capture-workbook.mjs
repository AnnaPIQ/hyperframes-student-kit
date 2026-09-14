/**
 * CLIP 1 — WORKBOOK
 * Screen-records the real "The Black Friday Profit Plan" workbook PDF in
 * Chromium's own PDF viewer: hold on the cover, then a smooth continuous
 * scroll down into the workbook, settling on a content spread.
 *
 * Source: https://drive.google.com/file/d/1QJvDX6G023N6vwAcHqS6dth7tarrAMOj/view
 * The PDF is fetched once into assets/source/ (see fetch-sources.mjs) and
 * served from 127.0.0.1 so the take is deterministic and offline.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch, recordingContext, finish, makeClock, pacedKeys, REC } from './capture-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PDF = path.join(ROOT, 'assets/source/black-friday-profit-plan.pdf');
const OUT = path.join(ROOT, 'captures');
const PORT = 8231;

if (!fs.existsSync(PDF)) throw new Error(`missing source PDF: ${PDF} — run scripts/fetch-sources.mjs`);

// --- local file server; the PDF plugin issues Range requests ---------------
const buf = fs.readFileSync(PDF);
const server = http.createServer((req, res) => {
  const range = req.headers.range;
  if (range) {
    const m = /bytes=(\d+)-(\d*)/.exec(range);
    const start = Number(m[1]);
    const end = m[2] ? Number(m[2]) : buf.length - 1;
    res.writeHead(206, {
      'Content-Type': 'application/pdf',
      'Content-Range': `bytes ${start}-${end}/${buf.length}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
    });
    return res.end(buf.subarray(start, end + 1));
  }
  res.writeHead(200, { 'Content-Type': 'application/pdf', 'Accept-Ranges': 'bytes', 'Content-Length': buf.length });
  res.end(buf);
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const browser = await launch({ proxy: false });
const ctx = await recordingContext(browser, OUT);
const page = await ctx.newPage();
const clock = makeClock();

await page.goto(`http://127.0.0.1:${PORT}/black-friday-profit-plan.pdf`, { waitUntil: 'load' });
await page.waitForTimeout(6000);           // let the plugin rasterise page 1

// Collapse the thumbnail sidebar so the page fills the frame height. The PDF
// toolbar is a fixed size regardless of viewport, so this coordinate is stable.
await page.mouse.click(22, 18);
await page.waitForTimeout(1000);

// Zoom 100% -> 110 -> 125 -> 150 using the viewer's own "+" button. At 150%
// the page covers ~76% of the capture width, so the workbook text is still
// readable once the clip is scaled down into a 1080-wide vertical frame.
// The zoom control group is centred on the viewport; "+" sits 23px left of centre.
const ZOOM_PLUS = [REC.width / 2 - 23, 20];
for (let i = 0; i < 3; i++) {
  await page.mouse.click(ZOOM_PLUS[0], ZOOM_PLUS[1]);
  await page.waitForTimeout(450);
}
await page.waitForTimeout(2200);          // let the re-rasterised page settle

// Focus the document so keypresses reach the plugin. page.mouse.wheel() does
// NOT reach it — the viewer is an out-of-process plugin frame — but the
// keyboard does once the document has focus.
await page.mouse.click(REC.width / 2, REC.height * 0.62);
await page.waitForTimeout(2000);           // let the click-settle frames pass

// --- the 3.0s that ship: 0.45 hold · 2.0 scroll · 0.55 settle -------------
clock.mark('in');
await page.waitForTimeout(450);            // hold on the cover
// ~40px per ArrowDown. 46 presses ≈ 1840px, which at 150% zoom carries the
// cover off the top and lands on the Contents spread — the page that makes
// the workbook instantly recognisable (8 parts, 51 pages).
await pacedKeys(page, 'ArrowDown', 46, 2000);
await page.waitForTimeout(550);            // settle on the landing spread
clock.mark('out');
await page.waitForTimeout(700);            // tail padding, trimmed off

const out = await finish(ctx, OUT, 'workbook', clock);
await browser.close();
server.close();
console.log('captured ->', out, JSON.stringify(clock.marks));
