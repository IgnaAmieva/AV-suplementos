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
      className="stat"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <b>
        {isNumeric ? (
          <>
            {prefix}
            {count}
            {suffix}
          </>
        ) : (
          value
        )}
      </b>
      <span>{label}</span>
    </motion.div>
  );
}

const STATS = [
  { value: "100", suffix: "%", label: "Productos originales" },
  { value: "500", prefix: "+", label: "Clientes satisfechos" },
  { value: "24", suffix: "HS", label: "Envios en todo el pais" },
  { value: "8", prefix: "+", label: "Marcas disponibles" },
];

export default function Nosotros() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="nosotros" className="about sec knurl" style={{ paddingBlock: 96 }}>
      <div className="wrap" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Sobre nosotros</span>
          <h2 className="about-h2" style={{ marginTop: 14 }}>
            No vendemos
            <br />
            <span className="o">suplementos.</span>
            <br />
            <span className="g">Potenciamos</span>
            <br />
            resultados.
          </h2>
          <p className="about-p">
            Suplementos deportivos originales, atención personalizada y los
            mejores precios del mercado. Tu confianza es nuestra prioridad.
          </p>
        </motion.div>

        <div className="stats">
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
      </div>

      <style jsx>{`
        .about-h2 {
          font-size: clamp(54px, 9vw, 130px);
        }
        .about-h2 :global(.o) {
          color: transparent;
          -webkit-text-stroke: 2px var(--color-brand-chalk, #f2f0ea);
        }
        .about-h2 :global(.g) {
          color: var(--color-brand-gold, #c9a227);
        }
        .about-p {
          color: var(--color-brand-silver, #c9c9c9);
          max-width: 52ch;
          font-size: 18px;
          margin: 26px 0 0;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--color-brand-line, rgba(255, 255, 255, 0.09));
          margin-top: 48px;
          border: 1px solid var(--color-brand-line, rgba(255, 255, 255, 0.09));
        }
        .stats :global(.stat) {
          background: var(--color-brand-black, #0a0a0a);
          padding: 26px 22px;
          display: grid;
          gap: 6px;
        }
        .stats :global(.stat b) {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(46px, 6vw, 72px);
          line-height: 0.9;
          color: var(--color-brand-gold-light, #e8c55a);
          font-variant-numeric: tabular-nums;
        }
        .stats :global(.stat span) {
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 14px;
          color: var(--color-brand-silver, #c9c9c9);
        }
        @media (max-width: 760px) {
          .stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
