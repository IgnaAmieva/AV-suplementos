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
  metadataBase: new URL("https://av-suplementos.vercel.app"),
  title: {
    default: "A&V Suplementos | Suplementos deportivos originales",
    template: "%s | A&V Suplementos",
  },
  description:
    "Suplementos deportivos originales: proteínas, creatinas, combos exclusivos. Asesoramiento personalizado y envíos a todo el país.",
  keywords: [
    "suplementos",
    "proteínas",
    "creatina",
    "pre-entreno",
    "suplementos deportivos",
    "Mendoza",
    "Tunuyán",
  ],
  openGraph: {
    title: "A&V Suplementos | Suplementos deportivos originales",
    description:
      "Proteínas, creatinas, combos exclusivos. Asesoramiento y envíos a todo el país.",
    url: "/",
    siteName: "A&V Suplementos",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A&V Suplementos | Suplementos deportivos originales",
    description:
      "Proteínas, creatinas, combos exclusivos. Asesoramiento y envíos a todo el país.",
  },
  other: {
    "theme-color": "#0A0A0A",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "A&V Suplementos",
  url: "https://av-suplementos.vercel.app",
  logo: "https://av-suplementos.vercel.app/icon.png",
  description:
    "Suplementos deportivos originales: proteínas, creatinas, combos exclusivos. Asesoramiento personalizado y envíos a todo el país.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tunuyán",
    addressRegion: "Mendoza",
    addressCountry: "AR",
  },
  sameAs: ["https://instagram.com/suplementos.av"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+54-9-262-254-3956",
    contactType: "sales",
    availableLanguage: "Spanish",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
