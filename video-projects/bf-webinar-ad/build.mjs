// Generates both ratios from ONE template (src/ad.template.html).
//   node build.mjs
//     -> ./index.html                     9:16  1080x1920  (this project)
//     -> ../bf-webinar-ad-4x5/index.html  4:5   1080x1350  (sibling project, assets synced)
// Hyperframes allows exactly one root composition per project, so the 4:5 cut lives in
// its own folder. Edit the template here, never the generated index.html files.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const tpl = readFileSync(join(here, "src/ad.template.html"), "utf8");
const formats = [
  { dir: here, fmt: "9x16", h: 1920, comp: "bf-webinar-ad" },
  { dir: join(here, "../bf-webinar-ad-4x5"), fmt: "4x5", h: 1350, comp: "bf-webinar-ad-4x5" },
];

for (const f of formats) {
  mkdirSync(join(f.dir, "renders"), { recursive: true });
  if (f.dir !== here) {
    // shared assets (brand kit, VO, music, stage clip) + this ratio's footage only
    for (const p of ["brand-tokens.css", "fonts", "vendor", "audio", "transcript", "stage.mp4",
      "ecomiq-logo-white.svg", "ecomiq-icon-white.svg"]) {
      cpSync(join(here, "assets", p), join(f.dir, "assets", p), { recursive: true });
    }
    const src = join(here, "assets", f.fmt);
    if (existsSync(src)) {
      rmSync(join(f.dir, "assets", f.fmt), { recursive: true, force: true });
      cpSync(src, join(f.dir, "assets", f.fmt), { recursive: true });
    }
    writeFileSync(join(f.dir, "hyperframes.json"), readFileSync(join(here, "hyperframes.json")));
    writeFileSync(join(f.dir, "meta.json"), JSON.stringify(
      { id: f.comp, name: f.comp, width: 1080, height: f.h, fps: 30, generatedFrom: "bf-webinar-ad/src/ad.template.html" }, null, 2) + "\n");
  }
  const out = tpl.replaceAll("__FMT__", f.fmt).replaceAll("__H__", String(f.h)).replaceAll("__COMP__", f.comp);
  writeFileSync(join(f.dir, "index.html"), out);
  console.log(`wrote ${join(f.dir, "index.html")}  (${f.fmt}, 1080x${f.h})`);
}
