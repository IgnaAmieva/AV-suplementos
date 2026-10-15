import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "A&V Suplementos — Tu mejor versión empieza acá";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadAsBase64(relativePath: string, mime: string) {
  const buf = await readFile(join(process.cwd(), "public", relativePath));
  return `data:${mime};base64,${buf.toString("base64")}`;
}

export default async function OGImage() {
  const [logoSrc, p1, p2, p3] = await Promise.all([
    loadAsBase64("images/NDSocial/logoAV.jpeg", "image/jpeg"),
    loadAsBase64("images/og/whey-gold-standard-hero.png", "image/png"),
    loadAsBase64("images/og/crea-300-optimun-hero.png", "image/png"),
    loadAsBase64("images/og/pump-3d-ripped-hero.png", "image/png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "50px 60px",
        }}
      >
        {/* Left: Logo + Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 16,
            maxWidth: 520,
          }}
        >
          <img
            src={logoSrc}
            width={80}
            height={80}
            style={{ borderRadius: 16 }}
          />
          <p
            style={{
              color: "#C9A227",
              fontSize: 16,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Suplementos deportivos originales
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: 800,
              fontSize: 72,
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: "#F5F5F5",
            }}
          >
            <span>TU MEJOR</span>
            <span>VERSIÓN</span>
            <span style={{ color: "#C9A227" }}>EMPIEZA ACÁ</span>
          </div>
          <p style={{ color: "#8A8A8A", fontSize: 18, margin: 0 }}>
            Proteínas · Creatinas · Combos · Envíos a todo el país
          </p>
        </div>

        {/* Right: 3 product images */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: 500,
            height: 500,
          }}
        >
          <img
            src={p1}
            width={220}
            height={220}
            style={{
              position: "absolute",
              objectFit: "contain",
              left: 30,
              top: 160,
            }}
          />
          <img
            src={p2}
            width={200}
            height={200}
            style={{
              position: "absolute",
              objectFit: "contain",
              left: 150,
              top: 60,
            }}
          />
          <img
            src={p3}
            width={200}
            height={200}
            style={{
              position: "absolute",
              objectFit: "contain",
              left: 260,
              top: 220,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
