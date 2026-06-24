"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "#hero", label: "Inicio" },
  { href: "#productos", label: "Categorías" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#tienda", label: "Tienda" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark">
      {/* Gold divider */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-gold/30">
                <Image
                  src="/images/NDSocial/logoAV.jpeg"
                  alt="A&V Suplementos"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gradient-gold">A&V</span>{" "}
                <span className="text-brand-light">Suplementos</span>
              </span>
            </div>
            <p className="text-brand-silver-dark text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Suplementos deportivos originales con asesoramiento personalizado.
              Tu confianza, nuestra prioridad.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-brand-silver-dark text-sm hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider mb-4">
              Redes
            </h4>
            <div className="flex gap-3 justify-center md:justify-end">
              <a
                href="https://instagram.com/suplementos.av"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-silver hover:border-brand-gold hover:text-brand-gold transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://wa.me/5492622543956"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-silver hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-brand-gold/10 text-center">
          <p className="text-brand-silver-dark text-sm">
            &copy; {new Date().getFullYear()} A&V Suplementos. Todos los
            derechos reservados.
          </p>
        </div>
      </div>

    </footer>
  );
}
