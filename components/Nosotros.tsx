"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Truck, Headset, BadgeDollarSign } from "lucide-react";

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

const FEATURES = [
  { icon: <ShieldCheck size={22} strokeWidth={2.5} />, title: "Productos originales" },
  { icon: <Truck size={22} strokeWidth={2.5} />, title: "Envío rápido" },
  { icon: <Headset size={22} strokeWidth={2.5} />, title: "Asesoramiento" },
  { icon: <BadgeDollarSign size={22} strokeWidth={2.5} />, title: "Mejores precios" },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="py-16 lg:py-20 bg-brand-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-10">
            <p className="text-brand-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
              Sobre nosotros
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              ¿Por qué elegir{" "}
              <span className="text-gradient-gold">A&V</span>?
            </h2>
            <div className="w-12 mx-auto gold-divider mb-6" />
            <p className="text-brand-silver text-base max-w-xl mx-auto">
              Suplementos deportivos originales, atención personalizada y los
              mejores precios del mercado. Tu confianza es nuestra prioridad.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-4">
          {FEATURES.map((feat, i) => (
            <FadeIn key={feat.title} delay={i * 0.08}>
              <div className="bg-brand-black/60 border border-brand-gold/10 rounded-2xl p-5 flex flex-col items-center text-center hover:border-brand-gold/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center text-brand-black mb-3 shadow-[0_0_16px_rgba(201,162,39,0.3)]">
                  {feat.icon}
                </div>
                <h3 className="text-brand-light font-bold text-sm">
                  {feat.title}
                </h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
