/**
 * Writes broll-index.json from clips.json plus the actual rendered files, so
 * the index always describes what is really on disk rather than what was
 * intended.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';


const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLIPS = JSON.parse(fs.readFileSync(path.join(ROOT, 'clips.json'), 'utf8'));

const probe = (file) => {
  const raw = execFileSync('ffprobe', ['-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,codec_name,r_frame_rate',
    '-show_entries', 'format=duration',
    '-of', 'json', file]).toString();
  const j = JSON.parse(raw);
  const s = j.streams[0];
  const [n, d] = s.r_frame_rate.split('/').map(Number);
  return {
    width: s.width,
    height: s.height,
    codec: s.codec_name,
    fps: n / d,
    duration: Number(Number(j.format.duration).toFixed(3)),
    bytes: fs.statSync(file).size,
  };
};

const index = {
  project: 'ecomiq-broll',
  description:
    'Reusable EcomIQ B-roll: real screen recordings of the Black Friday Profit Plan '
    + 'workbook and its companion tools, framed for compositing. Silent, un-branded '
    + 'building blocks — no logo, captions or end card.',
  generated: new Date().toISOString().slice(0, 10),
  common: {
    container: 'mp4',
    videoCodec: 'h264',
    pixelFormat: 'yuv420p',
    faststart: true,
    audio: 'none — these clips are silent by design',
    captureSize: '1600x1000 (landscape UI, never cropped to go vertical)',
    framing:
      'EcomIQ navy ground with a soft bloom and vignette; the recording sits in a '
      + 'rounded, soft-shadowed card, centred and sized as large as each ratio allows. '
      + 'The card makes a slow 0.985->1.015 push so the frame is never static, and '
      + 'there are no fades, so an editor can cut in or out on any frame.',
  },
  clips: CLIPS.map((clip) => ({
    name: clip.name,
    title: clip.title,
    shows: clip.shows,
    durationSeconds: clip.duration,
    sourceUrl: clip.sourceUrl,
    builtBy: clip.capture,
    ratios: Object.fromEntries(clip.ratios.map((r) => {
      const rel = `renders/broll/${clip.name}/${r}.mp4`;
      return [r, { file: rel, ...probe(path.join(ROOT, rel)) }];
    })),
  })),
};

fs.writeFileSync(path.join(ROOT, 'broll-index.json'), JSON.stringify(index, null, 2) + '\n');
console.log('wrote broll-index.json —', index.clips.length, 'clips,',
  index.clips.reduce((n, c) => n + Object.keys(c.ratios).length, 0), 'files');
