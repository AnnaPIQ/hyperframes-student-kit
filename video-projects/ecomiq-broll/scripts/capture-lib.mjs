/**
 * Shared Playwright capture helpers for the EcomIQ b-roll clips.
 *
 * Environment notes (Claude Code on the web container):
 *  - The pre-provisioned Chromium lives at /opt/pw-browsers/chromium. The npm
 *    `playwright` package pins a newer browser build, so we always pass an
 *    explicit executablePath rather than running `playwright install`.
 *  - Outbound HTTPS goes through the agent proxy on 127.0.0.1:33971, and that
 *    relay cannot carry Chromium's TLS 1.3 ClientHello (the tunnel resets
 *    mid-handshake). Capping at TLS 1.2 makes every https:// target load.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

export const CHROMIUM = process.env.HF_CHROMIUM || '/opt/pw-browsers/chromium';
export const PROXY = process.env.https_proxy || process.env.HTTPS_PROXY || null;

/** Recording size. Landscape UI captured big so text stays crisp after framing. */
export const REC = { width: 1600, height: 1000 };

export async function launch({ proxy = true } = {}) {
  return chromium.launch({
    executablePath: CHROMIUM,
    ...(proxy && PROXY ? { proxy: { server: PROXY } } : {}),
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--ssl-version-max=tls1.2',      // see note above — required for the proxy
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--disable-features=Translate,MediaRouter',
    ],
  });
}

export async function recordingContext(browser, outDir, extra = {}) {
  fs.mkdirSync(outDir, { recursive: true });
  return browser.newContext({
    viewport: { ...REC },
    recordVideo: { dir: outDir, size: { ...REC } },
    deviceScaleFactor: 1,
    ...extra,
  });
}

/**
 * A clock started at (approximately) the first recorded video frame, used to
 * stamp the in/out points of the interesting part of the take. The capture
 * runs longer than the delivered clip — page loads, plugin rasterisation and
 * settling all have to happen on camera — so each script marks the ~3s window
 * worth keeping and prep-captures.mjs trims to it.
 */
export function makeClock() {
  const t0 = Date.now();
  const marks = {};
  return {
    mark(name) { marks[name] = (Date.now() - t0) / 1000; },
    marks,
  };
}

/** Save the context's video to a stable filename and return that path. */
export async function finish(context, outDir, name, clock = null) {
  const page = context.pages()[0];
  const video = page && page.video();
  const src = video ? await video.path() : null;
  await context.close();                 // flushes the webm
  const dest = path.join(outDir, `${name}.webm`);
  if (!src || !fs.existsSync(src)) throw new Error('no video produced');
  fs.renameSync(src, dest);
  if (clock) {
    fs.writeFileSync(
      path.join(outDir, `${name}.marks.json`),
      JSON.stringify(clock.marks, null, 2) + '\n',
    );
  }
  return dest;
}

/** easeInOutCubic — gives scrolls a natural start/stop instead of a linear crawl. */
export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** easeOutCubic */
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Drive a wheel-based scroll over `ms` at ~60 steps/sec following an easing
 * curve. Used instead of window.scrollTo so it works over the PDF plugin and
 * so the motion reads as a human scroll rather than a jump cut.
 */
export async function easedWheel(page, { total, ms, ease = easeInOut, fps = 60 }) {
  const steps = Math.max(1, Math.round((ms / 1000) * fps));
  const dt = ms / steps;
  let applied = 0;
  for (let i = 1; i <= steps; i++) {
    const target = total * ease(i / steps);
    const delta = target - applied;
    applied = target;
    if (Math.abs(delta) >= 0.5) await page.mouse.wheel(0, delta);
    await page.waitForTimeout(dt);
  }
}

/** Move the cursor from a→b over `ms` on an ease curve, so it reads as a hand. */
export async function glideMouse(page, from, to, ms, ease = easeInOut, fps = 60) {
  const steps = Math.max(1, Math.round((ms / 1000) * fps));
  const dt = ms / steps;
  for (let i = 1; i <= steps; i++) {
    const t = ease(i / steps);
    await page.mouse.move(from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t);
    await page.waitForTimeout(dt);
  }
}

/**
 * Press `key` exactly `count` times spread evenly across `ms`. Time-paced
 * rather than delay-paced, so the take lands on a predictable duration even
 * though each keypress round-trip costs a variable ~20ms.
 */
export async function pacedKeys(page, key, count, ms) {
  const t0 = Date.now();
  for (let i = 1; i <= count; i++) {
    await page.keyboard.press(key);
    const wait = t0 + (ms * i) / count - Date.now();
    if (wait > 0) await page.waitForTimeout(wait);
  }
}
