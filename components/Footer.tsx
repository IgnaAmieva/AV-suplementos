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

export default function Footer() {
  return (
    <footer className="bg-brand-dark">
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
        {/* Mobile: single centered column. Desktop: 3 columns */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:justify-between gap-10 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-gold/30">
                <Image
                  src="/images/NDSocial/logoAV.jpeg"
                  alt="A&V Suplementos"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold">
                <span className="text-brand-gold">A&V</span>{" "}
                <span className="text-brand-light">Suplementos</span>
              </span>
            </div>
            <p className="text-brand-silver-dark text-sm leading-relaxed max-w-xs">
              Suplementos deportivos originales con asesoramiento personalizado.
            </p>
          </div>

          {/* Social + WhatsApp */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-3">
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

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-brand-gold/10 text-center">
          <p className="text-brand-silver-dark/60 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} A&V Suplementos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
