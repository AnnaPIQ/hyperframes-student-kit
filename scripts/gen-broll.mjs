#!/usr/bin/env node
// ============================================================================
// gen-broll.mjs — generate AI b-roll with Runway Gen-4 (image-to-video).
//
//   node scripts/gen-broll.mjs --image <path|url> --prompt "<motion>" [opts]
//   npm run gen -- --image assets/incoming/product.jpg --prompt "slow push-in, soft light" --project summer-sale
//
// Runway Gen-4 animates a STARTING IMAGE with a motion prompt (there is no
// text-only mode). Give it a product still + how it should move → animated
// b-roll. Output is downloaded as MP4, ready to prep + drop in a composition.
//
// Requires the RUNWAYML_API_SECRET env var (set it in the environment config so
// it's available in every session — do NOT commit it).
//
// Options:
//   --image <path|url>   starting image (local path or https URL)   [required]
//   --prompt "<text>"    motion / scene description                 [required]
//   --ratio <w:h>        gen4_turbo: 1280:720 (default) · 720:1280 (vertical)
//                        · 960:960 (square) · 832:1104 (portrait 3:4)
//   --duration <5|10>    clip length in seconds (default 5)
//   --model <id>         default gen4_turbo
//   --project <slug>     save into video-projects/<slug>/assets/ (else incoming/)
//   --out <file>         explicit output path (overrides --project)
// ============================================================================
import RunwayML from '@runwayml/sdk';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const C = { blue: '\x1b[1;36m', grn: '\x1b[1;32m', red: '\x1b[1;31m', dim: '\x1b[2m', off: '\x1b[0m' };
const log = (m) => console.log(`${C.blue}▶${C.off} ${m}`);
const ok = (m) => console.log(`${C.grn}✓${C.off} ${m}`);
const die = (m) => { console.error(`${C.red}✗ ${m}${C.off}`); process.exit(1); };

// ---- args ----
const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : undefined; };
if (args.includes('-h') || args.includes('--help') || args.length === 0) {
  console.log(`Usage: npm run gen -- --image <path|url> --prompt "<motion>" [--ratio 1280:720] [--duration 5] [--project <slug>]`);
  process.exit(0);
}

const image = get('--image');
const prompt = get('--prompt');
const ratio = get('--ratio') || '1280:720';
const duration = Number(get('--duration') || 5);
const model = get('--model') || 'gen4_turbo';
const project = get('--project');
let out = get('--out');

if (!process.env.RUNWAYML_API_SECRET) {
  die(`RUNWAYML_API_SECRET is not set.\n` +
      `   Add it in your environment's config (Manage environments → variables) so it\n` +
      `   loads in every session, then re-run. Get a key at https://dev.runwayml.com`);
}
if (!image) die('Missing --image (a starting product/scene still — Gen-4 animates an image).');
if (!prompt) die('Missing --prompt (describe the motion, e.g. "slow push-in, soft studio light").');

// ---- resolve output path ----
const base = path.basename(image).replace(/\.[^.]+$/, '');
if (!out) {
  if (project) {
    const pdir = path.join('video-projects', project, 'assets');
    if (!existsSync(pdir)) die(`No project at video-projects/${project} — create it with: npm run new -- ${project}`);
    out = path.join(pdir, `${base}-broll.mp4`);
  } else {
    out = path.join('assets', 'incoming', `${base}-broll.mp4`);
  }
}
await mkdir(path.dirname(out), { recursive: true });

// ---- build promptImage (local file → data URI, else pass URL through) ----
let promptImage = image;
if (!/^https?:\/\//.test(image)) {
  if (!existsSync(image)) die(`Image not found: ${image}`);
  const ext = path.extname(image).slice(1).toLowerCase() || 'jpeg';
  const mime = ext === 'jpg' ? 'jpeg' : ext;
  promptImage = `data:image/${mime};base64,${(await readFile(image)).toString('base64')}`;
}

// ---- generate ----
const client = new RunwayML({ apiKey: process.env.RUNWAYML_API_SECRET });
log(`Generating with ${model} · ${ratio} · ${duration}s`);
console.log(`${C.dim}   image: ${image}\n   prompt: "${prompt}"${C.off}`);

let task;
try {
  task = await client.imageToVideo.create({ model, promptImage, promptText: prompt, ratio, duration });
} catch (e) {
  die(`Runway API rejected the request: ${e?.message || e}`);
}
log(`Task ${task.id} submitted — polling…`);

// ---- poll until done ----
const started = Date.now();
let result;
while (true) {
  await new Promise((r) => setTimeout(r, 5000));
  const t = await client.tasks.retrieve(task.id);
  const elapsed = Math.round((Date.now() - started) / 1000);
  process.stdout.write(`\r${C.dim}   ${t.status}${t.progress ? ` ${Math.round(t.progress * 100)}%` : ''} · ${elapsed}s${C.off}      `);
  if (t.status === 'SUCCEEDED') { result = t; break; }
  if (t.status === 'FAILED') { console.log(); die(`Generation failed: ${t.failure || t.failureCode || 'unknown'}`); }
}
console.log();

// ---- download ----
const url = Array.isArray(result.output) ? result.output[0] : result.output;
if (!url) die('Task succeeded but returned no output URL.');
log('Downloading result…');
const res = await fetch(url);
if (!res.ok) die(`Download failed: HTTP ${res.status}`);
await writeFile(out, Buffer.from(await res.arrayBuffer()));
ok(`Saved ${out}`);
console.log(`${C.dim}   Normalize for render:${C.off} npm run prep -- ${out}${project ? ` --project ${project} --mute` : ' --mute'}`);
