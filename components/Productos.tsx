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
  Cookie,
  Flame,
  Pill,
  Shirt,
} from "lucide-react";
import { categorias as allCategorias } from "@/data/productos";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  creatinas: <FlaskConical size={20} strokeWidth={2.5} />,
  proteinas: <Dumbbell size={20} strokeWidth={2.5} />,
  preentreno: <Zap size={20} strokeWidth={2.5} />,
  colageno: <Sparkles size={20} strokeWidth={2.5} />,
  aminoacidos: <Atom size={20} strokeWidth={2.5} />,
  shakers: <CupSoda size={20} strokeWidth={2.5} />,
  hidratantes: <Droplets size={20} strokeWidth={2.5} />,
  "pancakes-keto": <Cookie size={20} strokeWidth={2.5} />,
  energia: <Flame size={20} strokeWidth={2.5} />,
  varios: <Pill size={20} strokeWidth={2.5} />,
  indumentaria: <Shirt size={20} strokeWidth={2.5} />,
};

const categorias = allCategorias.filter((c) => c.slug !== "combos");

interface ProductosProps {
  onSelectCategoria: (slug: string) => void;
}

export default function Productos({ onSelectCategoria }: ProductosProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleClick = (slug: string) => {
    onSelectCategoria(slug);
    const el = document.getElementById("tienda");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="productos" className="relative py-16 sm:py-24 lg:py-32 bg-brand-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 sm:mb-12"
        >
          <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-semibold mb-3">
            Categorías
          </p>
          <h2 className="heading-display text-[clamp(1.75rem,6vw,3.75rem)] text-brand-light">
            NUESTROS{" "}
            <span className="text-brand-gold">PRODUCTOS</span>
          </h2>
        </motion.div>

        {/* Mobile: 2-column grid. Desktop: flex wrap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3"
        >
          {categorias.map((cat, i) => {
            const isLast = i === categorias.length - 1;
            const isOddTotal = categorias.length % 2 !== 0;
            return (
              <motion.button
                key={cat.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.35,
                  delay: 0.2 + i * 0.04,
                  ease: "easeOut",
                }}
                onClick={() => handleClick(cat.slug)}
                className={`group flex items-center justify-start gap-2 px-4 py-3 min-h-[48px] rounded-xl sm:rounded-full border border-brand-gold/20 bg-brand-black/50 text-brand-silver hover:border-brand-gold hover:text-brand-gold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 ${
                  isLast && isOddTotal ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <span className="text-brand-gold/60 group-hover:text-brand-gold transition-colors flex-shrink-0">
                  {CATEGORY_ICONS[cat.slug]}
                </span>
                <span className="text-sm font-semibold whitespace-nowrap">
                  {cat.nombre}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
