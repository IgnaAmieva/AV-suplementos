"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FlaskConical,
  Dumbbell,
  Zap,
  Sparkles,
  Atom,
  CupSoda,
  Droplets,
} from "lucide-react";
import { categorias } from "@/data/productos";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  creatinas: <FlaskConical size={26} strokeWidth={2.5} />,
  proteinas: <Dumbbell size={26} strokeWidth={2.5} />,
  preentreno: <Zap size={26} strokeWidth={2.5} />,
  colageno: <Sparkles size={26} strokeWidth={2.5} />,
  aminoacidos: <Atom size={26} strokeWidth={2.5} />,
  shakers: <CupSoda size={26} strokeWidth={2.5} />,
  hidratantes: <Droplets size={26} strokeWidth={2.5} />,
};

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

interface ProductosProps {
  onSelectCategoria: (slug: string) => void;
}

export default function Productos({ onSelectCategoria }: ProductosProps) {
  const handleClick = (slug: string) => {
    onSelectCategoria(slug);
    const el = document.getElementById("tienda");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isOdd = categorias.length % 2 !== 0;

  return (
    <section id="productos" className="py-24 lg:py-32 bg-brand-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
              Categorías
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold">
              Nuestros{" "}
              <span className="text-gradient-gold">productos</span>
            </h2>
            <div className="w-16 mx-auto mt-4 gold-divider" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-4 lg:gap-5">
          {categorias.map((cat, i) => {
            const isLast = i === categorias.length - 1 && isOdd;
            return (
              <FadeIn
                key={cat.slug}
                delay={i * 0.08}
                className={isLast ? "col-span-2 flex justify-center" : ""}
              >
                <button
                  onClick={() => handleClick(cat.slug)}
                  className={`group bg-brand-dark border border-brand-gold/10 rounded-2xl p-6 lg:p-8 text-center transition-all duration-300 hover:border-brand-gold/40 hover:shadow-[0_0_20px_rgba(201,162,39,0.1)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:ring-offset-2 focus:ring-offset-brand-black ${
                    isLast ? "w-full max-w-[calc(50%-0.5rem)]" : "w-full"
                  }`}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-brand-gold flex items-center justify-center text-brand-black shadow-[0_0_16px_rgba(201,162,39,0.3)]">
                    {CATEGORY_ICONS[cat.slug]}
                  </div>
                  <h3 className="text-brand-light font-bold text-sm lg:text-base group-hover:text-brand-gold transition-colors">
                    {cat.nombre}
                  </h3>
                </button>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
