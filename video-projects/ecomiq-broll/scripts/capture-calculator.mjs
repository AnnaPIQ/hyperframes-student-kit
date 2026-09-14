/**
 * CLIP 3 — TRUE CAC CALCULATOR
 * Screen-records the real EcomIQ True CAC Calculator: the cursor moves to the
 * "New customer ad spend" field, selects it, types a new figure, and the live
 * result panel on the right recalculates as the keystrokes land.
 *
 * Source: https://page.ecomiq.com/cac-calculator-page
 *
 * Why this tool and not the Price Change Calculator sheet: the sheets are
 * shared read-only, so an anonymous session cannot type into a cell. This is
 * the real, public, interactive tool the dashboard itself links to, so the
 * "type a value, watch it recalculate" beat is genuine rather than staged.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  launch, recordingContext, finish, makeClock,
  installCursor, cursorTo, cursorGlide, cursorClick,
} from './capture-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'captures');
const URL = 'https://page.ecomiq.com/cac-calculator-page';

// Document-space landmarks, measured from the live page at a 1600px viewport.
const SCROLL_Y = 640;             // puts the first input and the result card side by side
const AD_SPEND_INPUT = [678, 868 - SCROLL_Y];
const NEW_VALUE = '42000';

const browser = await launch();
const ctx = await recordingContext(browser, OUT);
const page = await ctx.newPage();
const clock = makeClock();

await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForTimeout(18000);          // funnel app hydrates late
await page.evaluate((y) => window.scrollTo(0, y), SCROLL_Y);
await page.waitForTimeout(1500);
await installCursor(page);
await cursorTo(page, 1180, 620);
await page.waitForTimeout(1000);

const trueCac = () => page.evaluate(() => {
  const el = [...document.querySelectorAll('*')]
    .find((e) => !e.children.length && /^\$?\d[\d,]*\.\d\d$/.test(e.textContent.trim())
                 && parseFloat(getComputedStyle(e).fontSize) > 50);
  return el ? el.textContent.trim() : null;
});
const before = await trueCac();

// --- the 3.0s that ship ---------------------------------------------------
clock.mark('in');
await page.waitForTimeout(100);
await cursorGlide(page, [1180, 620], AD_SPEND_INPUT, 620);
// Triple-click selects the field's current figure, so typing replaces it.
await cursorClick(page, ...AD_SPEND_INPUT);
await page.mouse.click(AD_SPEND_INPUT[0], AD_SPEND_INPUT[1], { clickCount: 3 });
await page.waitForTimeout(150);
// The panel recalculates on every keystroke — that live churn is the point.
await page.keyboard.type(NEW_VALUE, { delay: 170 });
await page.waitForTimeout(1140);           // hold on the settled figure
clock.mark('out');
await page.waitForTimeout(700);            // tail padding, trimmed off

const after = await trueCac();
const outPath = await finish(ctx, OUT, 'calculator', clock);
await browser.close();
console.log(`true CAC: ${before} -> ${after}`);
if (before === after) console.warn('WARNING: result did not change — check the input target');
console.log('captured ->', outPath, JSON.stringify(clock.marks));
