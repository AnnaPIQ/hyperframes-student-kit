/**
 * Renders every (clip × ratio) composition to renders/broll/<clip>/<ratio>.mp4.
 *
 * --video-frame-format png: the sources are UI screen recordings, where JPEG
 * frame extraction softens small text and rings around high-contrast edges.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';


const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLIPS = JSON.parse(fs.readFileSync(path.join(ROOT, 'clips.json'), 'utf8'));
const only = process.argv.slice(2);

for (const clip of CLIPS) {
  if (only.length && !only.includes(clip.name)) continue;
  for (const ratio of clip.ratios) {
    const out = path.join('renders/broll', clip.name, `${ratio}.mp4`);
    fs.mkdirSync(path.join(ROOT, path.dirname(out)), { recursive: true });
    console.log(`\n=== ${clip.name} ${ratio} ===`);
    execFileSync('npx', [
      'hyperframes', 'render',
      '-c', `compositions/${clip.name}-${ratio}.html`,
      '-q', 'standard',
      '--video-frame-format', 'png',
      '--quiet',
      '-o', out,
    ], { cwd: ROOT, stdio: 'inherit' });
  }
}
