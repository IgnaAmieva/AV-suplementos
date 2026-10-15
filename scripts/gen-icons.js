const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function run() {
  const bg = { r: 10, g: 10, b: 10 };
  const logo = path.resolve(__dirname, "..", "public", "images", "NDSocial", "logoAV.jpeg");
  const appDir = path.resolve(__dirname, "..", "app");

  console.log("logo exists:", fs.existsSync(logo));

  // icon.png 512x512
  const buf512 = await sharp(logo)
    .resize(512, 512, { fit: "contain", background: bg })
    .flatten({ background: bg })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(appDir, "icon.png"), buf512);
  console.log("icon.png", buf512.length, "bytes");

  // apple-icon.png 180x180
  const buf180 = await sharp(logo)
    .resize(180, 180, { fit: "contain", background: bg })
    .flatten({ background: bg })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(appDir, "apple-icon.png"), buf180);
  console.log("apple-icon.png", buf180.length, "bytes");

  // favicon 32x32
  const buf32 = await sharp(logo)
    .resize(32, 32, { fit: "contain", background: bg })
    .flatten({ background: bg })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(appDir, "favicon.ico"), buf32);
  console.log("favicon.ico", buf32.length, "bytes");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
