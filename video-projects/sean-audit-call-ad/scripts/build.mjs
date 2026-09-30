#!/usr/bin/env node
// =============================================================================
// build.mjs — rebuild every generated file in this project from edit.json.
//
//   node scripts/build.mjs            # sources -> VO cut -> montage cut -> comps
//   node scripts/build.mjs --comps    # only regenerate the two entry compositions
//
// Outputs:
//   assets/vo-cut.wav        Sean's VO cut down to the approved script
//   assets/montage-cut.mp4   montage re-timed under the VO (muted, 1080x1920)
//   index.html               9:16 entry (1080x1920)
//   compositions/format-4x5.html   4:5 entry (1080x1350, montage scaled + padded)
//
// Raw sources are fetched from Drive into assets/source/ (gitignored) if missing.
// =============================================================================
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const E = JSON.parse(readFileSync(join(ROOT, "edit.json"), "utf8"));
const FPS = E.fps;
const D = E.dissolve;
const f = (s) => Math.round(s * FPS); // seconds -> frames
const p = (...a) => join(ROOT, ...a);
const run = (bin, args) => execFileSync(bin, args, { stdio: ["ignore", "ignore", "inherit"] });
const log = (m) => console.log(`\x1b[1;36m▶ ${m}\x1b[0m`);

// ---- 1. sources ------------------------------------------------------------
function fetchSource({ source, driveId }) {
  const out = p(source);
  if (existsSync(out)) return;
  mkdirSync(dirname(out), { recursive: true });
  log(`downloading ${source} from Drive`);
  run("curl", ["-sSL", "-o", out, `https://drive.usercontent.google.com/download?id=${driveId}&export=download&confirm=t`]);
}

// ---- 2. VO cut -------------------------------------------------------------
function buildVO() {
  log("VO cut -> assets/vo-cut.wav");
  const { ranges, fade } = E.vo;
  const chains = ranges.map(([a, b], i) => {
    const len = +(b - a).toFixed(3);
    const fx = [`atrim=${a}:${b}`, "asetpts=N/SR/TB"];
    if (i > 0) fx.push(`afade=t=in:d=${fade}`);
    if (i < ranges.length - 1) fx.push(`afade=t=out:st=${(len - fade).toFixed(3)}:d=${fade}`);
    return `[0:a]${fx.join(",")}[a${i}]`;
  });
  const cat = ranges.map((_, i) => `[a${i}]`).join("") + `concat=n=${ranges.length}:v=0:a=1[o]`;
  run("ffmpeg", ["-v", "error", "-y", "-i", p(E.vo.source), "-filter_complex", [...chains, cat].join(";"),
    "-map", "[o]", "-ac", "1", "-ar", "48000", "-c:a", "pcm_s16le", p("assets/vo-cut.wav")]);
}

// ---- 3. montage cut --------------------------------------------------------
// Each beat is filled by its shots: trimmed proportionally when the shots are
// longer than the beat, slowed (down to minSpeed) when they are shorter.
// Sections are joined with a D-second dissolve centred on the join, and the
// last section runs D/2 past the end-card trigger so the card can dissolve in.
function buildMontage() {
  log("montage cut -> assets/montage-cut.mp4");
  const S = E.montage.shotStarts;
  const MARGIN = 1 / FPS; // skip one frame each side of a detected cut
  const tmp = p(".tmp-montage");
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp);

  let beatStart = 0;
  const sectionFiles = [];
  E.montage.sections.forEach((beats, si) => {
    const clips = [];
    beats.forEach((beat, bi) => {
      let a = beatStart, b = beat.until;
      if (si > 0 && bi === 0) a -= D / 2;                 // overlap for dissolve in
      if (bi === beats.length - 1) b += D / 2;            // overlap for dissolve out / end card
      const frames = f(b) - f(a);
      const avail = beat.shots.map((n) => S[n + 1] - S[n] - 2 * MARGIN);
      const sum = avail.reduce((x, y) => x + y, 0);
      const speed = Math.min(1, sum / (frames / FPS));
      if (speed < E.montage.minSpeed) throw new Error(`beat "${beat.vo}" needs speed ${speed.toFixed(2)} < minSpeed`);
      let used = 0;
      beat.shots.forEach((n, k) => {
        const nf = k === beat.shots.length - 1 ? frames - used : Math.round((avail[k] / sum) * frames);
        used += nf;
        const file = join(tmp, `s${si}b${bi}k${k}.mp4`);
        run("ffmpeg", ["-v", "error", "-y", "-ss", (S[n] + MARGIN).toFixed(4), "-i", p(E.montage.source), "-an",
          "-vf", `setpts=(PTS-STARTPTS)/${speed.toFixed(5)},fps=${FPS},scale=1080:1920,setsar=1,format=yuv420p`,
          "-frames:v", String(nf), "-c:v", "libx264", "-preset", "fast", "-crf", "12", file]);
        clips.push(file);
      });
      console.log(`  beat ${String(beat.until).padStart(5)}s  shots [${beat.shots}]  speed ${speed.toFixed(2)}  ${beat.vo}`);
      beatStart = beat.until;
    });
    const list = join(tmp, `sec${si}.txt`);
    writeFileSync(list, clips.map((c) => `file '${c}'`).join("\n"));
    const out = join(tmp, `sec${si}.mp4`);
    run("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", out]);
    sectionFiles.push(out);
  });

  // chain the dissolves: offset = running length - D
  const lens = sectionFiles.map((file) => +execFileSync("ffprobe", ["-v", "error", "-count_frames", "-select_streams", "v:0",
    "-show_entries", "stream=nb_read_frames", "-of", "csv=p=0", file]).toString().trim());
  const inputs = sectionFiles.flatMap((file) => ["-i", file]);
  const fc = [];
  let prev = "[0:v]", running = lens[0] / FPS;
  for (let i = 1; i < sectionFiles.length; i++) {
    const offset = running - D;
    fc.push(`${prev}[${i}:v]xfade=transition=fade:duration=${D}:offset=${offset.toFixed(4)}[x${i}]`);
    prev = `[x${i}]`;
    running = offset + lens[i] / FPS;
  }
  run("ffmpeg", ["-v", "error", "-y", ...inputs, "-filter_complex", fc.join(";"), "-map", prev, "-an",
    "-r", String(FPS), "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", p("assets/montage-cut.mp4")]);
  rmSync(tmp, { recursive: true, force: true });
  console.log(`  montage length ${running.toFixed(3)}s (end card at ${E.endCard}s)`);
}

// ---- 4. compositions -------------------------------------------------------
function page({ id, W, H, fit, base = "" }) {
  const G = E.graphics, T = E.endCard, DUR = E.duration;
  const k = H / 1920 < 0.8 ? 0.88 : 1; // type scale for the shorter 4:5 frame
  const px = (n) => `${Math.round(n * k)}px`;
  const montageEnd = +(T + D / 2).toFixed(3);
  const cardStart = +(T - D / 2).toFixed(3);
  const r3 = (n) => +n.toFixed(3);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <title>${id}</title>
    <!-- GENERATED by scripts/build.mjs from edit.json. Edit those, then: node scripts/build.mjs --comps -->
    <!-- GSAP vendored locally — CDN cert-fails in the render env and freezes renders -->
    <script src="${base}assets/vendor/gsap.min.js"></script>
    <link rel="stylesheet" href="${base}assets/brand-tokens.css" />
    <style>
      /* LOCAL fonts — no network dependency at render time (latin subset) */
      @font-face { font-family: 'Rethink Sans'; font-style: normal; font-weight: 400 800;
        font-display: block; src: url(${base}assets/fonts/RethinkSans.woff2) format('woff2'); }
      @font-face { font-family: 'Hedvig Letters Serif'; font-style: normal; font-weight: 400;
        font-display: block; src: url(${base}assets/fonts/HedvigLettersSerif.woff2) format('woff2'); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: ${W}px; height: ${H}px; overflow: hidden;
        background: var(--brand-bg); font-family: 'Rethink Sans', system-ui, sans-serif; color: var(--brand-text); }
      #root { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: var(--brand-navy); }

      /* montage: 9:16 source, ${fit === "contain" ? "scaled + padded (navy) into 4:5" : "native 9:16"} */
      #montage { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: ${fit}; }
      #scrim { position: absolute; inset: 0; pointer-events: none;
        background:
          radial-gradient(120% 60% at 50% 108%, rgba(6,40,76,.82) 0%, rgba(6,40,76,.35) 45%, rgba(6,40,76,0) 70%),
          radial-gradient(90% 22% at 18% 0%, rgba(6,40,76,.75) 0%, rgba(6,40,76,0) 100%),
          radial-gradient(140% 100% at 50% 50%, rgba(0,0,0,0) 62%, rgba(0,0,0,.35) 100%); }

      /* logo: positioned non-clip wrapper so the engine never moves it */
      #logo-wrap { position: absolute; top: ${Math.round(H * 0.045)}px; left: ${Math.round(W * 0.065)}px; width: ${Math.round(W * 0.3)}px; z-index: 20; }
      #logo-wrap img { display: block; width: 100%; height: auto; }

      /* emphasis graphics share one bottom-anchored stage */
      .gfx { position: absolute; inset: 0; z-index: 10; display: flex; flex-direction: column;
        align-items: center; justify-content: flex-end; text-align: center;
        padding: 0 ${Math.round(W * 0.09)}px ${Math.round(H * (fit === "contain" ? 0.13 : 0.16))}px; gap: ${px(18)}; }
      .line { font-weight: 800; font-size: ${px(104)}; line-height: 1; letter-spacing: -.02em;
        text-shadow: 0 6px 40px rgba(6,40,76,.75); }
      .em { font-family: 'Hedvig Letters Serif', serif; font-style: italic; font-weight: 400; color: var(--brand-blue-tint); letter-spacing: -.01em; }
      .eyebrow { font-weight: 600; font-size: ${px(32)}; letter-spacing: .3em; text-transform: uppercase; color: var(--brand-blue-tint);
        text-shadow: 0 2px 18px rgba(6,40,76,.9); }
      .pill { font-weight: 700; font-size: ${px(62)}; letter-spacing: -.01em; color: var(--brand-white); background: var(--brand-flame);
        padding: ${px(30)} ${px(64)}; border-radius: 999px; box-shadow: 0 24px 70px -18px rgba(255,76,50,.7); }
      .strike { position: relative; display: inline-block; font-size: ${px(124)}; }
      .strike i { position: absolute; left: -4%; width: 108%; top: 52%; height: ${px(14)}; margin-top: -${px(7)};
        background: var(--brand-flame); border-radius: 8px; transform: scaleX(0); transform-origin: left center; }

      /* end card */
      #endcard { position: absolute; inset: 0; z-index: 30;
        background: radial-gradient(90% 55% at 50% 30%, rgba(156,212,255,.14) 0%, rgba(6,40,76,0) 60%), var(--brand-navy); }
      #card-stage { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: ${px(64)}; padding: 0 10%; text-align: center; }
      #card-logo { width: ${Math.round(W * 0.64)}px; height: auto; }
      #card-head .row { display: block; }
      #card-head { font-weight: 800; font-size: ${px(86)}; line-height: 1; letter-spacing: -.02em; max-width: ${Math.round(W * 0.8)}px; }
      #card-cta { display: flex; align-items: center; gap: ${px(22)}; font-weight: 700; font-size: ${px(54)}; color: var(--brand-white);
        background: var(--brand-flame); padding: ${px(34)} ${px(70)}; border-radius: 999px; box-shadow: 0 28px 80px -18px rgba(255,76,50,.75); }
      #card-arrow { display: inline-block; font-size: ${px(58)}; line-height: 1; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="${id}" data-start="0" data-duration="${DUR}" data-width="${W}" data-height="${H}">
      <video id="montage" data-start="0" data-duration="${montageEnd}" data-track-index="0" src="${base}assets/montage-cut.mp4" muted playsinline></video>
      <audio id="vo" data-start="0" data-duration="${DUR}" data-track-index="1" src="${base}assets/vo-cut.wav" data-volume="1"></audio>
      <div id="scrim" class="clip" data-start="0" data-duration="${montageEnd}" data-track-index="2"></div>

      <div id="logo-wrap"><img id="logo" src="${base}assets/ecomiq-logo-white.png" alt="EcomIQ" /></div>

      <div id="g-founders" class="gfx clip" data-start="${G.founders.in}" data-duration="${r3(G.founders.out - G.founders.in)}" data-track-index="3">
        <div class="eyebrow">For every</div>
        <div class="line">Shopify <span class="em">founder</span></div>
      </div>

      <div id="g-audit" class="gfx clip" data-start="${G.audit.in}" data-duration="${r3(G.audit.out - G.audit.in)}" data-track-index="4">
        <div class="pill">Free audit call</div>
      </div>

      <div id="g-template" class="gfx clip" data-start="${G.template.in}" data-duration="${r3(G.template.out - G.template.in)}" data-track-index="5">
        <div class="eyebrow">Not a</div>
        <div class="line"><span class="strike" id="t1">Template<i></i></span></div>
        <div class="line"><span class="strike" id="t2">Checklist<i></i></span></div>
      </div>

      <div id="g-stack" class="gfx clip" data-start="${r3(G.stack.store - 0.05)}" data-duration="${r3(montageEnd - G.stack.store + 0.05)}" data-track-index="6">
        <div class="line" id="st1">Your store.</div>
        <div class="line" id="st2">Your problems.</div>
        <div class="line" id="st3">Your <span class="em">plan.</span></div>
      </div>

      <div id="endcard" class="clip" data-start="${cardStart}" data-duration="${r3(DUR - cardStart)}" data-track-index="7">
        <div id="card-stage">
          <img id="card-logo" src="${base}assets/ecomiq-logo-white.svg" alt="EcomIQ" />
          <div id="card-head"><span class="row">Book your free</span><span class="row"><span class="em">audit</span> call.</span></div>
          <div id="card-cta"><span>Link Below</span><span id="card-arrow">&darr;</span></div>
        </div>
      </div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      const G = ${JSON.stringify(G)};
      const CARD = ${cardStart};

      // logo: in at the top, out as the end card dissolves in
      tl.fromTo("#logo-wrap", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.1)
        .to("#logo-wrap", { opacity: 0, duration: ${D}, ease: "none" }, CARD);

      // 1 · "Shopify founder"
      tl.fromTo("#g-founders .eyebrow", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, G.founders.in)
        .fromTo("#g-founders .line", { opacity: 0, scale: 0.86, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "expo.out" }, G.founders.in + 0.06)
        .to("#g-founders .line", { scale: 1.04, duration: 3.0, ease: "none" }, G.founders.in + 0.5)
        .to("#g-founders", { opacity: 0, y: -24, duration: 0.2667, ease: "power2.in" }, G.founders.out - 0.2667);

      // 2 · "free audit call" pill
      tl.fromTo("#g-audit .pill", { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: 0.4333, ease: "back.out(1.7)" }, G.audit.in + 0.0667)
        .to("#g-audit .pill", { scale: 1.05, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 1 }, G.audit.in + 0.7)
        .to("#g-audit", { opacity: 0, duration: 0.2, ease: "power2.in" }, G.audit.out - 0.2);

      // 3 · "not a template / checklist" — struck through as he says them
      tl.fromTo("#g-template .eyebrow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, G.template.in - 0.1)
        .fromTo("#t1", { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.3333, ease: "expo.out" }, G.template.in)
        .fromTo("#t1 i", { scaleX: 0 }, { scaleX: 1, duration: 0.2667, ease: "power4.out" }, G.template.in + 0.3)
        .fromTo("#t2", { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.3333, ease: "expo.out" }, G.template.checklist)
        .fromTo("#t2 i", { scaleX: 0 }, { scaleX: 1, duration: 0.2667, ease: "power4.out" }, G.template.checklist + 0.3)
        .to(["#t1", "#t2"], { opacity: 0.55, duration: 0.3, ease: "none" }, G.template.checklist + 0.6)
        .to("#g-template", { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" }, G.template.out - 0.2);

      // 4 · "Your store. Your problems. Your plan." — one line per word
      [["#st1", G.stack.store], ["#st2", G.stack.problems], ["#st3", G.stack.plan]].forEach(([sel, t], i) => {
        tl.fromTo(sel, { opacity: 0, y: 46, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3667, ease: i === 2 ? "back.out(1.6)" : "expo.out" }, t);
      });
      tl.to(["#st1", "#st2"], { opacity: 0.6, duration: 0.3, ease: "none" }, G.stack.plan);

      // end card — quick dissolve in on "Book", then hold to the end
      tl.fromTo("#endcard", { opacity: 0 }, { opacity: 1, duration: ${D}, ease: "none" }, CARD)
        .fromTo("#card-logo", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, CARD + 0.1)
        .fromTo("#card-head", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4333, ease: "expo.out" }, CARD + 0.3)
        .fromTo("#card-cta", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4667, ease: "back.out(1.8)" }, CARD + 1.2)
        .to("#card-arrow", { y: 10, duration: 0.4, ease: "sine.inOut", yoyo: true, repeat: 5 }, CARD + 1.7)
        .to("#card-cta", { scale: 1.04, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, CARD + 2.0);

      tl.to({}, { duration: ${DUR} }, 0); // pad to data-duration
      window.__timelines["${id}"] = tl;
    </script>
  </body>
</html>
`;
}

function buildComps() {
  log("compositions -> index.html (9:16) + compositions/format-4x5.html (4:5)");
  writeFileSync(p("index.html"), page({ id: "sean-audit-call-ad", W: 1080, H: 1920, fit: "cover" }));
  // 4:5 lives in compositions/ so the project keeps exactly one root entry; render it with
  //   npx hyperframes render -c compositions/format-4x5.html
  writeFileSync(p("compositions/format-4x5.html"), page({ id: "sean-audit-call-ad-4x5", W: 1080, H: 1350, fit: "contain" }));
}

if (!process.argv.includes("--comps")) {
  fetchSource(E.vo);
  fetchSource(E.montage);
  buildVO();
  buildMontage();
}
buildComps();
