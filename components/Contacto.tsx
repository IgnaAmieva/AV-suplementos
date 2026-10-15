"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, MapPin, Clock } from "lucide-react";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const WHATSAPP_NUMBER = "5492622543956";
const WHATSAPP_MESSAGE = "Hola A&V, quiero hacer una consulta";

export default function Contacto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contacto" className="py-16 sm:py-24 lg:py-32 bg-brand-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Header + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-semibold mb-3">
            Contacto
          </p>
          <h2 className="heading-display text-[clamp(1.75rem,6vw,3.75rem)] text-brand-light mb-3">
            ESCRIBINOS{" "}
            <span className="text-brand-gold">AHORA</span>
          </h2>
          <p className="text-brand-silver-dark text-sm sm:text-base max-w-md mx-auto mb-8">
            Te asesoramos con lo que necesites. Respuesta rápida garantizada.
          </p>

          {/* WhatsApp CTA — prominent */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-4 rounded-full transition-colors min-h-[52px]"
          >
            <MessageCircle size={22} />
            Escribinos por WhatsApp
          </a>
        </motion.div>

        {/* Info — minimal row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-brand-silver-dark text-sm"
        >
          <a
            href="https://instagram.com/suplementos.av"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-brand-gold transition-colors min-h-[44px]"
          >
            <InstagramIcon size={18} />
            @suplementos.av
          </a>
          <span className="hidden sm:block text-brand-gold/20">·</span>
          <span className="flex items-center gap-2 min-h-[44px]">
            <MapPin size={16} className="text-brand-gold/60" />
            Tunuyán, Mendoza
          </span>
          <span className="hidden sm:block text-brand-gold/20">·</span>
          <span className="flex items-center gap-2 min-h-[44px]">
            <Clock size={16} className="text-brand-gold/60" />
            Lun a Sáb · 9 – 20hs
          </span>
        </motion.div>
      </div>
    </section>
  );
}
