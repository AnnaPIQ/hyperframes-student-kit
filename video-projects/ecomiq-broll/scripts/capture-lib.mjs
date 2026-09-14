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
 * Wall-clock animation driver. Each step costs a variable CDP round-trip, so
 * stepping a fixed count overshoots the intended duration badly (a 700ms glide
 * lands at ~1.5s). This drives `fn(progress)` against the clock instead, so a
 * take always lasts exactly as long as it was written to.
 */
async function animate(page, ms, fn) {
  const t0 = Date.now();
  for (;;) {
    const t = Math.min(1, (Date.now() - t0) / ms);
    await fn(t);
    if (t >= 1) return;
    await page.waitForTimeout(4);
  }
}

/**
 * Drive a wheel-based scroll over `ms` following an easing curve. Used instead
 * of window.scrollTo so it works over canvas grids and plugin surfaces, and so
 * the motion reads as a human scroll rather than a jump cut.
 */
export async function easedWheel(page, { total, ms, ease = easeInOut }) {
  let applied = 0;
  await animate(page, ms, async (t) => {
    const target = total * ease(t);
    const delta = target - applied;
    applied = target;
    if (Math.abs(delta) >= 0.5) await page.mouse.wheel(0, delta);
  });
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

/**
 * Playwright's screencast does not draw the OS pointer, so "move the cursor"
 * would be invisible in the take. This injects a pointer overlay that is moved
 * in lockstep with the real Playwright mouse: every click below still lands on
 * the real UI at the coordinates the arrow is drawn at. The arrow is the only
 * thing added to the captured pixels — the application underneath is untouched.
 */
export async function installCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById('__hf_cursor')) return;
    const el = document.createElement('div');
    el.id = '__hf_cursor';
    el.style.cssText = [
      'position:fixed', 'left:0', 'top:0', 'width:24px', 'height:24px',
      'z-index:2147483647', 'pointer-events:none', 'will-change:transform',
      'transform:translate(-9999px,-9999px)',
    ].join(';');
    // Built with DOM APIs, not innerHTML: Google Sheets enforces Trusted Types,
    // which rejects innerHTML assignment outright.
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.style.filter = 'drop-shadow(0 1px 2px rgba(0,0,0,.45))';
    const arrow = document.createElementNS(NS, 'path');
    arrow.setAttribute('d', 'M5 2.5 L5 18.5 L9.2 14.6 L11.9 20.6 L14.6 19.4 L11.9 13.6 L17.5 13.2 Z');
    arrow.setAttribute('fill', '#ffffff');
    arrow.setAttribute('stroke', '#111111');
    arrow.setAttribute('stroke-width', '1.2');
    arrow.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(arrow);
    el.appendChild(svg);
    document.documentElement.appendChild(el);

    const ring = document.createElement('div');
    ring.id = '__hf_click';
    ring.style.cssText = [
      'position:fixed', 'left:0', 'top:0', 'width:34px', 'height:34px',
      'margin:-17px 0 0 -17px', 'border-radius:50%', 'z-index:2147483646',
      'pointer-events:none', 'opacity:0',
      'border:2px solid rgba(255,76,50,.9)', 'transform:translate(-9999px,-9999px)',
    ].join(';');
    document.documentElement.appendChild(ring);

    window.__hfCursor = (x, y) => {
      const c = document.getElementById('__hf_cursor');
      if (c) c.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.__hfClick = (x, y) => {
      const r = document.getElementById('__hf_click');
      if (!r) return;
      r.style.transition = 'none';
      r.style.transform = `translate(${x}px, ${y}px) scale(.45)`;
      r.style.opacity = '1';
      requestAnimationFrame(() => {
        r.style.transition = 'transform .38s ease-out, opacity .38s ease-out';
        r.style.transform = `translate(${x}px, ${y}px) scale(1.25)`;
        r.style.opacity = '0';
      });
    };
  });
}

/** Move the real mouse and the drawn pointer together. */
export async function cursorTo(page, x, y) {
  await page.mouse.move(x, y);
  await page.evaluate(([px, py]) => window.__hfCursor && window.__hfCursor(px, py), [x, y]);
}

/** Glide from a→b over `ms` on an ease curve, pointer and real mouse in step. */
export async function cursorGlide(page, from, to, ms, ease = easeInOut) {
  await animate(page, ms, async (raw) => {
    const t = ease(raw);
    await cursorTo(page, from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t);
  });
}

/** Real click at the pointer's position, with a visible click ripple. */
export async function cursorClick(page, x, y) {
  await cursorTo(page, x, y);
  await page.evaluate(([px, py]) => window.__hfClick && window.__hfClick(px, py), [x, y]);
  await page.mouse.click(x, y);
}
