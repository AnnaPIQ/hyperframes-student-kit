#!/usr/bin/env node
// ============================================================================
// gen-broll.mjs — AI b-roll with Runway Gen-4.
//
//   npm run gen -- --text "<scene>" --prompt "<motion>" [--project <slug>]
//   npm run gen -- --image <path|url> --prompt "<motion>" [--project <slug>]
//   npm run gen -- --text "<scene>" --image-only                  (just a still)
//
// Gen-4 video is image-to-video (it animates a STARTING IMAGE). This closes the
// loop: --text generates the still (gen4_image), then animates it with --prompt.
// Or bring your own still via --image. Or stop at the still with --image-only.
//
// Requires RUNWAYML_API_SECRET (set it in the environment config or a local
// .env — never commit it). Get a key at https://dev.runwayml.com
//
// Options:
//   --text "<scene>"     generate the starting still from a prompt (gen4_image)
//   --image <path|url>   OR bring your own starting still (local path or https)
//   --prompt "<motion>"  motion description for the video (required for video)
//   --image-only         generate just the still (PNG), skip animation
//   --ratio <w:h>        VIDEO ratio: 1280:720 (default) · 720:1280 · 960:960 · 832:1104
//   --image-ratio <w:h>  STILL ratio (default: derived from --ratio orientation)
//   --duration <5|10>    video length in seconds (default 5)
//   --model <id>         video model (default gen4_turbo)
//   --image-model <id>   still model (default gen4_image; also gen4_image_turbo)
//   --project <slug>     save into video-projects/<slug>/assets/ (else incoming/)
//   --out <file>         explicit output path
// ============================================================================
import RunwayML from '@runwayml/sdk';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const C = { blue: '\x1b[1;36m', grn: '\x1b[1;32m', red: '\x1b[1;31m', dim: '\x1b[2m', off: '\x1b[0m' };
const log = (m) => console.log(`${C.blue}▶${C.off} ${m}`);
const ok = (m) => console.log(`${C.grn}✓${C.off} ${m}`);
const die = (m) => { console.error(`${C.red}✗ ${m}${C.off}`); process.exit(1); };
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'broll';

// ---- args ----
const argv = process.argv.slice(2);
const get = (f) => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : undefined; };
const has = (f) => argv.includes(f);
if (has('-h') || has('--help') || argv.length === 0) {
  console.log(`Usage:
  npm run gen -- --text "<scene>" --prompt "<motion>" [--project <slug>]
  npm run gen -- --image <path|url> --prompt "<motion>" [--project <slug>]
  npm run gen -- --text "<scene>" --image-only
Options: --ratio --image-ratio --duration --model --image-model --out`);
  process.exit(0);
}

const text = get('--text');
let image = get('--image');
const prompt = get('--prompt');
const imageOnly = has('--image-only');
const ratio = get('--ratio') || '1280:720';
const duration = Number(get('--duration') || 5);
const videoModel = get('--model') || 'gen4_turbo';
const imageModel = get('--image-model') || 'gen4_image';
const project = get('--project');
let out = get('--out');

// still ratio derived from video orientation unless overridden
const imageRatio = get('--image-ratio') || (() => {
  const [w, h] = ratio.split(':').map(Number);
  return h > w ? '1080:1920' : w === h ? '1080:1080' : '1920:1080';
})();

if (!process.env.RUNWAYML_API_SECRET) {
  die(`RUNWAYML_API_SECRET is not set.\n` +
      `   Add it in the environment config (Manage environments → variables) or a local\n` +
      `   .env, then re-run. Get a key at https://dev.runwayml.com`);
}
if (!text && !image) die('Provide --text "<scene>" to generate a still, or --image <path|url>.');
if (imageOnly && !text) die('--image-only needs --text (it generates a still).');
if (!imageOnly && !prompt) die('Missing --prompt (the motion, e.g. "slow push-in, soft light").');

const client = new RunwayML({ apiKey: process.env.RUNWAYML_API_SECRET });

// ---- shared polling ----
async function poll(id, label) {
  const started = Date.now();
  while (true) {
    await new Promise((r) => setTimeout(r, 5000));
    const t = await client.tasks.retrieve(id);
    const s = Math.round((Date.now() - started) / 1000);
    process.stdout.write(`\r${C.dim}   ${label}: ${t.status}${t.progress ? ` ${Math.round(t.progress * 100)}%` : ''} · ${s}s${C.off}      `);
    if (t.status === 'SUCCEEDED') { console.log(); return Array.isArray(t.output) ? t.output[0] : t.output; }
    if (t.status === 'FAILED') { console.log(); die(`${label} failed: ${t.failure || t.failureCode || 'unknown'}`); }
  }
}
async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) die(`Download failed: HTTP ${res.status}`);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}
function destFor(name) {
  if (project) {
    const pdir = path.join('video-projects', project, 'assets');
    if (!existsSync(pdir)) die(`No project at video-projects/${project} — create it with: npm run new -- ${project}`);
    return path.join(pdir, name);
  }
  return path.join('assets', 'incoming', name);
}

const base = text ? slug(text) : path.basename(image).replace(/\.[^.]+$/, '');

// ---- 1. obtain the starting still ----
let promptImage = image;
if (text) {
  log(`Generating still with ${imageModel} · ${imageRatio}`);
  console.log(`${C.dim}   "${text}"${C.off}`);
  let task;
  try { task = await client.textToImage.create({ model: imageModel, promptText: text, ratio: imageRatio }); }
  catch (e) { die(`Runway rejected the image request: ${e?.message || e}`); }
  const url = await poll(task.id, 'image');
  const stillPath = out && imageOnly ? out : destFor(`${base}-still.png`);
  await download(url, stillPath);
  ok(`Still saved ${stillPath}`);
  promptImage = url; // ephemeral URL is valid as the video's promptImage right now
  if (imageOnly) process.exit(0);
} else if (!/^https?:\/\//.test(image)) {
  if (!existsSync(image)) die(`Image not found: ${image}`);
  const ext = (path.extname(image).slice(1) || 'jpeg').toLowerCase();
  promptImage = `data:image/${ext === 'jpg' ? 'jpeg' : ext};base64,${(await readFile(image)).toString('base64')}`;
}

// ---- 2. animate it ----
if (!out) out = destFor(`${base}-broll.mp4`);
log(`Animating with ${videoModel} · ${ratio} · ${duration}s`);
console.log(`${C.dim}   motion: "${prompt}"${C.off}`);
let vtask;
try { vtask = await client.imageToVideo.create({ model: videoModel, promptImage, promptText: prompt, ratio, duration }); }
catch (e) { die(`Runway rejected the video request: ${e?.message || e}`); }
const vurl = await poll(vtask.id, 'video');
await download(vurl, out);
ok(`Saved ${out}`);
console.log(`${C.dim}   Normalize for render:${C.off} npm run prep -- ${out}${project ? ` --project ${project} --mute` : ' --mute'}`);
