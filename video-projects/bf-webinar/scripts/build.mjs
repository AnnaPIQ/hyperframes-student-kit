// Build both aspect ratios from one template.
//   node scripts/build.mjs
// index.html (this folder)      -> 9:16 (1080x1920)  Stories / Reels   [root project]
// .build-4x5/index.html         -> 4:5  (1080x1350)  Meta feed         [generated sibling project]
// The CLI allows exactly one root composition per project folder, so the 4:5
// cut is emitted as its own project with hard-linked assets (no extra disk).
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tpl = readFileSync(join(root, "src/ad.template.html"), "utf8");
const render = (f) =>
  tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (!(k in f)) throw new Error(`unknown token {{${k}}}`);
    return String(f[k]);
  });

// 9:16 — the project root
writeFileSync(join(root, "index.html"), render({ FMT: "9x16", W: 1080, H: 1920, CLS: "f9x16", ID: "bf-webinar-9x16" }));
console.log("wrote index.html (1080x1920)");

// 4:5 — generated sibling project
const b = join(root, ".build-4x5");
rmSync(b, { recursive: true, force: true });
mkdirSync(b, { recursive: true });
execSync(`cp -al "${join(root, "assets")}" "${join(b, "assets")}"`);
cpSync(join(root, "hyperframes.json"), join(b, "hyperframes.json"));
const meta = JSON.parse(readFileSync(join(root, "meta.json"), "utf8"));
writeFileSync(join(b, "meta.json"), JSON.stringify({ ...meta, id: "bf-webinar-4x5", name: "bf-webinar-4x5", height: 1350 }, null, 2));
writeFileSync(join(b, "index.html"), render({ FMT: "4x5", W: 1080, H: 1350, CLS: "f4x5", ID: "bf-webinar-4x5" }));
console.log("wrote .build-4x5/index.html (1080x1350)");
