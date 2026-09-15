/**
 * Renders both delivery ratios.
 *
 *   node scripts/render-all.mjs            # standard quality, both ratios
 *   node scripts/render-all.mjs draft      # fast iteration pass
 *   node scripts/render-all.mjs draft 9x16 # one ratio
 *
 * Outputs H.264 / yuv420p / AAC / +faststart into renders/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [quality = 'standard', only] = process.argv.slice(2);

const RATIOS = [
  { key: '9x16', comp: 'index.html' },
  { key: '4x5',  comp: 'compositions/ad-4x5.html'  },
];

fs.mkdirSync(path.join(ROOT, 'renders'), { recursive: true });

for (const r of RATIOS) {
  if (only && only !== r.key) continue;
  const out = `renders/ecomiq-bf-workbook-ad-${r.key}${quality === 'draft' ? '-draft' : ''}.mp4`;
  console.log(`\n=== ${r.key} · ${quality} -> ${out} ===`);
  execFileSync('npx', [
    'hyperframes', 'render',
    '-c', r.comp,
    '-q', quality,
    '--fps', '30',
    // Deliberately NOT --video-frame-format png. The only video sources are
    // camera footage and UI capture that is downscaled into a card, so PNG buys
    // nothing visible — and extracting 1400 PNG frames of the 1080x1920 A-roll
    // fills the container's disk. Everything text-heavy (the workbook page
    // renders, the cover) is an <img>, so it is unaffected by this.
    '-o', out,
  ], { cwd: ROOT, stdio: 'inherit' });
}
