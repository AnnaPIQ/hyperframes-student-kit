#!/usr/bin/env python3
"""Generate the 4:5 sibling project ../ecomiq-review-call-45 (1080x1350) from this 9:16 index.html.

Writes ../ecomiq-review-call-45/index.html (a separate project, so the runtime never sees two
root compositions) and copies fonts, vendor GSAP, logos, assets/base-45.mp4 and assets/vo.m4a.

The 4:5 picture base (assets/base-45.mp4, built with FORMAT=45) keeps each shot's window
height and widens it, so Sean sits in the same place relative to the frame height. This
script re-places every overlay for the shorter canvas. Every replacement is asserted, so a
9:16 change that breaks an anchor fails loudly instead of producing a silent bad layout.

Usage: python3 scripts/make-45.py   (run from the project folder or anywhere)
"""
import os, shutil, json

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
src = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()

R = [
    # canvas + identity
    ('<meta name="viewport" content="width=1080, height=1920" />', '<meta name="viewport" content="width=1080, height=1350" />'),
    ("<title>ecomiq-review-call-916</title>", "<title>ecomiq-review-call-45</title>"),
    ("html, body { width: 1080px; height: 1920px;", "html, body { width: 1080px; height: 1350px;"),
    ('data-composition-id="ecomiq-review-call-916" data-start="0" data-duration="40.72" data-width="1080" data-height="1920"',
     'data-composition-id="ecomiq-review-call-45" data-start="0" data-duration="40.72" data-width="1080" data-height="1350"'),
    ('window.__timelines["ecomiq-review-call-916"] = tl;', 'window.__timelines["ecomiq-review-call-45"] = tl;'),
    ("#base { width: 1080px; height: 1920px;", "#base { width: 1080px; height: 1350px;"),
    ('src="assets/base.mp4"', 'src="assets/base-45.mp4"'),
    # logo, card glow, subtitles
    ("#logo-wrap { position: absolute; left: 108px; top: 150px; width: 260px;", "#logo-wrap { position: absolute; left: 90px; top: 70px; width: 230px;"),
    ("top: 1720px; height: 700px; filter: blur(120px);", "top: 1240px; height: 500px; filter: blur(110px);"),
    ("#subscrim { position: absolute; left: 0; right: 0; top: 1440px; height: 480px;", "#subscrim { position: absolute; left: 0; right: 0; top: 980px; height: 370px;"),
    (".subt { position: absolute; left: 108px; right: 108px; bottom: 250px;", ".subt { position: absolute; left: 90px; right: 90px; bottom: 110px;"),
    ("font-weight: 500; font-size: 50px; line-height: 1.15;", "font-weight: 500; font-size: 46px; line-height: 1.15;"),
    # Shot 1 column
    ("#s1 .col { position: absolute; left: 600px; top: 420px; width: 372px;", "#s1 .col { position: absolute; left: 610px; top: 250px; width: 380px;"),
    ("#s1-big { font-size: 120px;", "#s1-big { font-size: 104px;"),
    ("#s1-mo { font-size: 44px;", "#s1-mo { font-size: 40px;"),
    ("#s1-paid { font-size: 72px; }", "#s1-paid { font-size: 64px; }"),
    # cartoon
    ('width="960" height="811" style="position:absolute;left:60px;top:470px"', 'width="816" height="689" style="position:absolute;left:132px;top:250px"'),
    # Shot 3 phone
    ("#phone { position: absolute; left: 108px; top: 500px; width: 320px; height: 604px;", "#phone { position: absolute; left: 90px; top: 290px; width: 260px; height: 491px;"),
    # journey: narrower column, spine scaled with the CSS `scale` property (composes with GSAP transforms)
    ("#panel-edge { position: absolute; top: 0; bottom: 0; left: 539px;", "#panel-edge { position: absolute; top: 0; bottom: 0; left: 439px;"),
    (".spine { position: absolute; left: 0; top: 0; width: 540px; height: 1920px; }",
     ".spine { position: absolute; left: 0; top: 0; width: 540px; height: 1920px; scale: 0.8; transform-origin: 0 0; }"),
    (".lab { position: absolute; left: 200px; font-weight: 700; font-size: 40px;", ".lab { position: absolute; left: 200px; font-weight: 700; font-size: 44px;"),
    (".sub { position: absolute; left: 200px; font-weight: 500; font-size: 28px;", ".sub { position: absolute; left: 200px; font-weight: 500; font-size: 32px;"),
    ('{ clipPath: "inset(0px 540px 0px 0px)", duration: 0.5', '{ clipPath: "inset(0px 640px 0px 0px)", duration: 0.5'),
    ('style="left:0;top:0;width:540px;height:1920px;background:#06284C;', 'style="left:0;top:0;width:440px;height:1350px;background:#06284C;'),
    ('tl.fromTo("#c-panel", { x: -540 }', 'tl.fromTo("#c-panel", { x: -440 }'),
    # Mob Armor proof
    ("#mob-mark { position: absolute; left: 0; right: 0; top: 380px;", "#mob-mark { position: absolute; left: 0; right: 0; top: 250px;"),
    ("#mob-mark img { width: 620px;", "#mob-mark img { width: 540px;"),
    ("#mob-num { position: absolute; left: 0; right: 0; top: 500px; text-align: center; font-size: 200px;",
     "#mob-num { position: absolute; left: 0; right: 0; top: 340px; text-align: center; font-size: 180px;"),
    ("#mob-ts { position: absolute; left: 0; right: 0; top: 760px;", "#mob-ts { position: absolute; left: 0; right: 0; top: 560px;"),
    ("#mob-yr { position: absolute; left: 0; right: 0; top: 840px;", "#mob-yr { position: absolute; left: 0; right: 0; top: 630px;"),
    ("#mob-fn { position: absolute; left: 0; right: 0; top: 1110px;", "#mob-fn { position: absolute; left: 0; right: 0; top: 820px;"),
    # CTA + end card
    ("#cta-txt .t { position: absolute; left: 600px; top: 570px; width: 372px; font-size: 64px; }",
     "#cta-txt .t { position: absolute; left: 610px; top: 330px; width: 380px; font-size: 60px; }"),
    ("#btn .b { position: absolute; left: 600px; top: 700px; width: 372px;", "#btn .b { position: absolute; left: 610px; top: 440px; width: 380px;"),
    ("font-weight: 700; font-size: 48px; letter-spacing: .02em; padding: 26px 0;", "font-weight: 700; font-size: 44px; letter-spacing: .02em; padding: 24px 0;"),
    ("padding-top: 420px; }", "padding-top: 250px; }"),
    ("#end-logo { width: 460px; }", "#end-logo { width: 400px; }"),
    ("#end-h { font-size: 72px; margin-top: 90px; }", "#end-h { font-size: 64px; margin-top: 60px; }"),
    ("#end-free { font-size: 84px; margin-top: 18px;", "#end-free { font-size: 76px; margin-top: 14px;"),
    ('tl.to("#btn-b", { x: -264, y: 160, scale: 1,', 'tl.to("#btn-b", { x: -260, y: 150, scale: 1,'),
]

out = src
for a, b in R:
    n = out.count(a)
    if n != 1:
        raise SystemExit(f"make-45: anchor found {n}x (expected 1): {a[:90]}")
    out = out.replace(a, b)
out = out.replace("<!-- Built from EDIT-PLAN.md", "<!-- 4:5 version, GENERATED by ../ecomiq-review-call-916/scripts/make-45.py. Do not edit by hand. Built from EDIT-PLAN.md", 1)
DEST = os.path.join(os.path.dirname(ROOT), "ecomiq-review-call-45")
os.makedirs(os.path.join(DEST, "assets"), exist_ok=True)
for d in ("fonts", "vendor"):
    shutil.copytree(os.path.join(ROOT, "assets", d), os.path.join(DEST, "assets", d), dirs_exist_ok=True)
for f in os.listdir(os.path.join(ROOT, "assets")):
    if f.startswith("ecomiq-") or f.startswith("mob-armor-") or f in ("base-45.mp4", "vo.m4a", "brand-tokens.css"):
        shutil.copy2(os.path.join(ROOT, "assets", f), os.path.join(DEST, "assets", f))
shutil.copy2(os.path.join(ROOT, "hyperframes.json"), DEST)
meta = json.load(open(os.path.join(ROOT, "meta.json")))
meta.update({"id": "ecomiq-review-call-45", "name": "ecomiq-review-call-45", "height": 1350})
json.dump(meta, open(os.path.join(DEST, "meta.json"), "w"), indent=2)
open(os.path.join(DEST, ".gitignore"), "w").write("assets/base-45.mp4\nassets/vo.m4a\nrenders/\n")
open(os.path.join(DEST, "README.md"), "w").write(
    "# ecomiq-review-call-45 (4:5)\n\nGENERATED from `../ecomiq-review-call-916` by `scripts/make-45.py`. "
    "Do not edit `index.html` here: change the 9:16 project and re-run the generator.\n\n"
    "Media: `FORMAT=45 bash ../ecomiq-review-call-916/scripts/build-base.sh <raw-dir>` then re-run make-45.py.\n")
open(os.path.join(DEST, "index.html"), "w", encoding="utf-8").write(out)
print("wrote", os.path.join(DEST, "index.html"))
