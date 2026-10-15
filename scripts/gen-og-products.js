const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

async function run() {
  const ogDir = path.resolve(__dirname, "..", "public", "images", "og");
  fs.mkdirSync(ogDir, { recursive: true });

  const names = [
    "whey-gold-standard-hero.webp",
    "crea-300-optimun-hero.webp",
    "pump-3d-ripped-hero.webp",
  ];

  for (const name of names) {
    const src = path.resolve(__dirname, "..", "public", "images", "hero", name);
    const outName = name.replace(".webp", ".png");
    const dst = path.join(ogDir, outName);
    console.log("Processing:", src, "exists:", fs.existsSync(src));

    const buf = await sharp(src)
      .resize(300, 300, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();
    fs.writeFileSync(dst, buf);
    console.log("Created", outName, buf.length, "bytes");
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
