/**
 * `hyperframes lint` validates a project via its index.html, so this walks
 * every generated composition through that entry point and reports the lot.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INDEX = path.join(ROOT, 'index.html');
const backup = fs.readFileSync(INDEX);
const comps = fs.readdirSync(path.join(ROOT, 'compositions')).filter((f) => f.endsWith('.html') && !f.startsWith('_'));

let failed = 0;
try {
  for (const c of comps) {
    fs.copyFileSync(path.join(ROOT, 'compositions', c), INDEX);
    try {
      execFileSync('npx', ['hyperframes', 'lint'], { cwd: ROOT, stdio: 'pipe' });
      console.log(`✓ ${c}`);
    } catch (e) {
      failed++;
      console.log(`✗ ${c}\n${e.stdout?.toString() || ''}${e.stderr?.toString() || ''}`);
    }
  }
} finally {
  fs.writeFileSync(INDEX, backup);
}
console.log(failed ? `${failed} composition(s) failed lint` : `all ${comps.length} compositions clean`);
process.exit(failed ? 1 : 0);
