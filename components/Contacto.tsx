"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, MapPin, Clock } from "lucide-react";

function InstagramIcon({ size = 24 }: { size?: number }) {
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

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Contacto() {
  return (
    <section id="contacto" className="py-24 lg:py-32 bg-brand-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          <p className="text-brand-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
            Contacto
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
            ¿Tenés{" "}
            <span className="text-gradient-gold">dudas</span>?
          </h2>
          <p className="text-brand-silver-dark text-lg max-w-xl mx-auto mb-10">
            Escribinos por WhatsApp y te asesoramos con lo que necesites.
            Respuesta rápida garantizada.
          </p>
        </FadeIn>

        {/* WhatsApp CTA */}
        <FadeIn delay={0.1}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-lg px-10 py-4 rounded-full transition-colors shadow-[0_0_30px_rgba(37,211,102,0.2)]"
          >
            <MessageCircle size={24} />
            Escribinos por WhatsApp
          </a>
        </FadeIn>

        {/* Info cards */}
        <div className="grid sm:grid-cols-3 gap-4 mt-16">
          <FadeIn delay={0.15}>
            <div className="bg-brand-dark border border-brand-gold/10 rounded-2xl p-6">
              <span className="text-brand-gold flex justify-center mb-3"><InstagramIcon size={24} /></span>
              <p className="text-brand-light font-bold text-sm mb-1">Instagram</p>
              <a
                href="https://instagram.com/suplementos.av"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-silver-dark text-sm hover:text-brand-gold transition-colors"
              >
                @suplementos.av
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-brand-dark border border-brand-gold/10 rounded-2xl p-6">
              <MapPin size={24} className="text-brand-gold mx-auto mb-3" />
              <p className="text-brand-light font-bold text-sm mb-1">Ubicación</p>
              <p className="text-brand-silver-dark text-sm">
                San Rafael, Mendoza
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="bg-brand-dark border border-brand-gold/10 rounded-2xl p-6">
              <Clock size={24} className="text-brand-gold mx-auto mb-3" />
              <p className="text-brand-light font-bold text-sm mb-1">Horarios</p>
              <p className="text-brand-silver-dark text-sm">
                Lun a Sáb · 9:00 – 20:00
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
