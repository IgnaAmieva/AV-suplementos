/**
 * Generates public/og.jpg (1200x630) using Playwright.
 * Renders an HTML card matching the site's aesthetic, screenshots it as JPEG.
 * Run: node scripts/generate-og.mjs
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Load logo as base64
const logoBuf = readFileSync(join(root, "public/images/NDSocial/logoAV.jpeg"));
const logoB64 = `data:image/jpeg;base64,${logoBuf.toString("base64")}`;

// Load product images
const products = ["whey-gold-standard-hero.png", "crea-300-optimun-hero.png", "pump-3d-ripped-hero.png"];
const productB64 = products.map((f) => {
  const buf = readFileSync(join(root, `public/images/og/${f}`));
  return `data:image/png;base64,${buf.toString("base64")}`;
});

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Barlow:wght@400;600;700&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #0A0A0A;
    font-family: 'Barlow', sans-serif;
    display: flex; align-items: center; justify-content: space-between;
    padding: 50px 60px;
  }
  /* Subtle knurl texture */
  body::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      45deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px
    );
    pointer-events: none;
  }
  /* Gold accent line at top */
  body::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #C9A227, #E8B92A, #C9A227);
  }
  .left {
    display: flex; flex-direction: column; align-items: flex-start;
    justify-content: center; gap: 14px; max-width: 560px; z-index: 1;
  }
  .logo { width: 72px; height: 72px; border-radius: 14px; object-fit: cover; }
  .eyebrow {
    color: #C9A227; font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px; font-weight: 700; letter-spacing: 0.25em;
    text-transform: uppercase;
  }
  .title {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
    font-style: italic; font-size: 76px; line-height: 0.92;
    text-transform: uppercase; color: #F5F5F5;
  }
  .title .gold { color: #C9A227; }
  .subtitle {
    color: #8A8A8A; font-size: 18px; font-weight: 600;
    letter-spacing: 0.04em;
  }
  .url {
    margin-top: 4px; color: #C9A227; font-family: 'Barlow Condensed', sans-serif;
    font-size: 15px; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; opacity: 0.7;
  }
  .right {
    position: relative; width: 480px; height: 480px; flex-shrink: 0;
  }
  .right img {
    position: absolute; object-fit: contain; filter: drop-shadow(0 8px 32px rgba(0,0,0,0.5));
  }
  .p1 { width: 240px; left: 20px; top: 150px; }
  .p2 { width: 220px; left: 140px; top: 40px; }
  .p3 { width: 220px; left: 250px; top: 210px; }
</style>
</head>
<body>
  <div class="left">
    <img class="logo" src="${logoB64}" />
    <div class="eyebrow">Suplementos deportivos originales</div>
    <div class="title">
      TU MEJOR<br>
      VERSI&Oacute;N<br>
      <span class="gold">EMPIEZA AC&Aacute;</span>
    </div>
    <div class="subtitle">Prote&iacute;nas &middot; Creatinas &middot; Combos &middot; Env&iacute;os a todo el pa&iacute;s</div>
    <div class="url">av-suplementos.vercel.app</div>
  </div>
  <div class="right">
    <img class="p1" src="${productB64[0]}" />
    <img class="p2" src="${productB64[1]}" />
    <img class="p3" src="${productB64[2]}" />
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
const buf = await page.screenshot({ type: "jpeg", quality: 88 });
await browser.close();

const outPath = join(root, "public/og.jpg");
writeFileSync(outPath, buf);
const kb = (buf.length / 1024).toFixed(1);
console.log(`Created ${outPath} — ${kb} KB (${buf.length} bytes)`);
if (buf.length > 300 * 1024) {
  console.warn("WARNING: File exceeds 300 KB limit!");
}
