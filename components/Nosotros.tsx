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
    <section id="nosotros" className="py-20 bg-brand-dark">
      <div className="text-center max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="mb-10">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {FEATURES.map((feat, i) => (
            <FadeIn key={feat.title} delay={i * 0.08} className="flex">
              <div className="flex flex-col items-center text-center p-6 bg-brand-dark rounded-2xl border border-white/10 h-full min-h-[160px] justify-center">
                <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center mx-auto mb-3">
                  <span className="text-black">{feat.icon}</span>
                </div>
                <h3 className="font-bold text-brand-light text-sm mt-2 min-h-[2.5rem] flex items-center">
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
