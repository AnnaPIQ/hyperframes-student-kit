/**
 * Turn raw Playwright takes (captures/<name>.webm, VP8, variable frame rate)
 * into clean constant-rate H.264 clips trimmed to the ~3s window each capture
 * script marked, ready to be referenced by the framing compositions.
 *
 * Output: assets/clips/<name>.mp4  (CFR 30fps, yuv420p, near-lossless CRF 14 —
 * this is an intermediate, so quality is kept high for the final encode.)
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CAPS = path.join(ROOT, 'captures');
const MANIFEST = JSON.parse(fs.readFileSync(path.join(ROOT, 'clips.json'), 'utf8'));
const OUT = path.join(ROOT, 'assets/clips');
fs.mkdirSync(OUT, { recursive: true });

const names = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(CAPS).filter((f) => f.endsWith('.webm')).map((f) => f.replace(/\.webm$/, ''));

for (const name of names) {
  const src = path.join(CAPS, `${name}.webm`);
  const marksPath = path.join(CAPS, `${name}.marks.json`);
  if (!fs.existsSync(src)) { console.error(`skip ${name}: no capture`); continue; }
  const marks = fs.existsSync(marksPath) ? JSON.parse(fs.readFileSync(marksPath, 'utf8')) : null;
  if (!marks || marks.in == null || marks.out == null) { console.error(`skip ${name}: no in/out marks`); continue; }

  // clips.json declares the shipped length, and the compositions are built to
  // that same number — so trim to it exactly rather than to whatever the take
  // drifted to. A take shorter than the target would freeze on its last frame.
  const target = MANIFEST.find((c) => c.name === name)?.duration;
  const marked = marks.out - marks.in;
  const length = target ?? marked;
  if (target && marked < target - 0.02) {
    console.error(`WARNING ${name}: marked window ${marked.toFixed(3)}s is shorter than the ${target}s target`);
  }

  const dest = path.join(OUT, `${name}.mp4`);
  execFileSync('ffmpeg', [
    '-y', '-v', 'error',
    '-ss', String(marks.in),
    '-t', String(length),
    '-i', src,
    '-vf', 'fps=30,format=yuv420p',   // VFR -> CFR; Hyperframes extracts frames
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '14',
    '-an',                            // b-roll is silent by design
    '-movflags', '+faststart',
    dest,
  ], { stdio: 'inherit' });

  const dur = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
    '-of', 'default=nw=1:nk=1', dest]).toString().trim();
  console.log(`${name}: marked ${marked.toFixed(2)}s, shipped ${length}s -> ${path.relative(ROOT, dest)} (${dur}s)`);
}
