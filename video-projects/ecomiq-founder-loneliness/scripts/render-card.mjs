// Renders end-card.html to a PNG at the given size. Called by build.py.
import { chromium } from 'playwright';
const [, , html, out, w, h] = process.argv;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
await page.goto('file://' + html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out });
await browser.close();
