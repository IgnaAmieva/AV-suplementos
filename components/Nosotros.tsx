"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatBlockProps {
  value: string;
  prefix?: string;
  label: string;
  suffix?: string;
  delay: number;
}

function StatBlock({ value, prefix = "", label, suffix = "", delay }: StatBlockProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value, 10);
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (!inView || !isNumeric) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setCount(numericValue);
      return;
    }

    const duration = 1200;
    const startTime = performance.now();
    let frame: number;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericValue));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [inView, numericValue, isNumeric, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="text-center"
    >
      <p className="heading-display text-[clamp(2rem,8vw,4.5rem)] text-brand-gold mb-1">
        {isNumeric ? (
          <>
            {prefix}
            {count}
            {suffix}
          </>
        ) : (
          value
        )}
      </p>
      <p className="text-brand-silver text-xs sm:text-sm uppercase tracking-wider font-semibold leading-tight">
        {label}
      </p>
    </motion.div>
  );
}

// TODO: confirmar con cliente — valores placeholder
const STATS = [
  { value: "100", suffix: "%", label: "Productos originales" }, // TODO: confirmar con cliente
  { value: "500", prefix: "+", label: "Clientes satisfechos" }, // TODO: confirmar con cliente
  { value: "24", suffix: "hs", label: "Envíos en todo el país" }, // TODO: confirmar con cliente
  { value: "8", prefix: "+", label: "Marcas disponibles" }, // TODO: confirmar con cliente
];

export default function Nosotros() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="nosotros" className="relative py-16 sm:py-24 lg:py-32 bg-brand-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Editorial text — full width on mobile, left column on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center lg:text-left mb-12 lg:mb-0 lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center"
        >
          <div>
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-semibold mb-3">
              Sobre nosotros
            </p>
            <h2 className="heading-display text-[clamp(1.75rem,5.5vw,3.75rem)] text-brand-light mb-5">
              NO VENDEMOS
              <br />
              <span className="text-brand-gold">SUPLEMENTOS.</span>
              <br />
              POTENCIAMOS
              <br />
              RESULTADOS.
            </h2>
            <p className="text-brand-silver-dark text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
              Suplementos deportivos originales, atención personalizada y los
              mejores precios del mercado. Tu confianza es nuestra prioridad.
            </p>
          </div>

          {/* Stats grid — 2x2 always */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mt-10 lg:mt-0">
            {STATS.map((stat, i) => (
              <StatBlock
                key={stat.label}
                value={stat.value}
                prefix={stat.prefix || ""}
                suffix={stat.suffix || ""}
                label={stat.label}
                delay={0.2 + i * 0.12}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
