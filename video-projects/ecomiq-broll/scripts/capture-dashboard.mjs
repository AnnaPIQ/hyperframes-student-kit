/**
 * CLIP 2 — PROFITABILITY DASHBOARD
 * Screen-records the real "EcomIQ Profitability Dashboard BF" Google Sheet:
 * the cursor tracks down the measures column, selecting real cells so the
 * selection box and the formula bar follow, then the sheet scrolls to reveal
 * the rest of the twelve measures.
 *
 * Source: https://docs.google.com/spreadsheets/d/1TyUKGPZ5Y3MBfZ7-iOFyM_Bxd7oUcbK8hQTYguUmueM
 * Opened on /edit rather than /preview: /edit carries the full Sheets chrome
 * (menus, formula bar, row and column headers, sheet tab), which is what makes
 * it read instantly as "the spreadsheet you were sent". The sheet is shared
 * read-only, so this is a genuine anonymous view — no sign-in, and nothing in
 * the sheet is modified.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  launch, recordingContext, finish, makeClock,
  installCursor, cursorTo, cursorGlide, cursorClick, easedWheel, easeOut,
} from './capture-lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'captures');
const URL = 'https://docs.google.com/spreadsheets/d/1TyUKGPZ5Y3MBfZ7-iOFyM_Bxd7oUcbK8hQTYguUmueM/edit';

// Grid coordinates verified against the Sheets name box at a 1600x1000 viewport.
const CELL_MEASURE_1 = [240, 551];   // C15 "Total discount rate"
const CELL_MEASURE_2 = [240, 688];   // C20 "True customer acquisition cost"

const browser = await launch();
const ctx = await recordingContext(browser, OUT);
const page = await ctx.newPage();
const clock = makeClock();

await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForTimeout(15000);         // Sheets paints its canvas grid late
await installCursor(page);
await cursorTo(page, 980, 300);
await page.waitForTimeout(1200);

// --- the 3.0s that ship ---------------------------------------------------
clock.mark('in');
await page.waitForTimeout(150);
// Track down the measures column, selecting real cells: the selection box and
// the formula bar both follow, which is the sheet proving it is live.
await cursorGlide(page, [980, 300], CELL_MEASURE_1, 700);
await cursorClick(page, ...CELL_MEASURE_1);
await page.waitForTimeout(200);

await cursorGlide(page, CELL_MEASURE_1, CELL_MEASURE_2, 620);
await cursorClick(page, ...CELL_MEASURE_2);
await page.waitForTimeout(200);

// Ease down through the remaining measures into the annual rows.
await easedWheel(page, { total: 250, ms: 800, ease: easeOut });
await page.waitForTimeout(170);
clock.mark('out');
await page.waitForTimeout(700);           // tail padding, trimmed off

const out = await finish(ctx, OUT, 'dashboard', clock);
await browser.close();
console.log('captured ->', out, JSON.stringify(clock.marks));
