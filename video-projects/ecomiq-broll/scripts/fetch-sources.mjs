/**
 * Pulls the public source assets that the capture scripts record.
 * Only the workbook PDF needs downloading — the sheet and the calculator are
 * captured live in the browser from their public URLs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'assets/source');
fs.mkdirSync(DIR, { recursive: true });

const FILE_ID = '1QJvDX6G023N6vwAcHqS6dth7tarrAMOj';
const dest = path.join(DIR, 'black-friday-profit-plan.pdf');

execFileSync('curl', [
  '-sSL',
  `https://drive.usercontent.google.com/download?id=${FILE_ID}&export=download`,
  '-o', dest,
], { stdio: 'inherit' });

const head = fs.readFileSync(dest).subarray(0, 5).toString();
if (head !== '%PDF-') throw new Error(`not a PDF — Drive probably returned an interstitial: ${dest}`);
console.log('fetched', path.relative(ROOT, dest), `(${fs.statSync(dest).size} bytes)`);
