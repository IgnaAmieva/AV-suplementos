import type { Metadata, Viewport } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartContext";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingCart from "@/components/FloatingCart";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://avsuplementos.vercel.app"),
  title: "A&V Suplementos — Tu mejor versión empieza acá",
  description:
    "Suplementos deportivos originales: creatinas, proteínas, pre-entrenos y más. Envíos a todo el país. Asesoramiento personalizado.",
  icons: {
    icon: "/images/NDSocial/logoAV.jpeg",
    apple: "/images/NDSocial/logoAV.jpeg",
  },
  openGraph: {
    title: "A&V Suplementos",
    description:
      "Suplementos deportivos originales. Creatinas, proteínas, pre-entrenos y más.",
    images: ["/images/NDSocial/logoAV.jpeg"],
    url: "/",
    siteName: "A&V Suplementos",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${barlow.variable}`}>
      <body className="grain">
        <a href="#main-content" className="skip-link">
          saltar al contenido
        </a>
        <CartProvider>
          <SmoothScroll />
          <Navbar />
          <main id="main-content">{children}</main>
          <FloatingCart />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
