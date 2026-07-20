"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, X } from "lucide-react";
import { productos } from "@/data/productos";
import { useCart } from "./CartContext";

const combos = productos.filter((p) => p.categoria === "combos");

function ComboCard({
  producto,
  delay,
  onImageClick,
}: {
  producto: (typeof combos)[0];
  delay: number;
  onImageClick: (src: string, alt: string) => void;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleAdd = () => {
    addItem({
      name: producto.nombre,
      option: producto.id,
      price: producto.precio,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      className="bg-brand-dark rounded-3xl overflow-hidden border border-brand-gold/40 transition-all duration-300 hover:border-brand-gold hover:shadow-[0_0_30px_rgba(201,162,39,0.2)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={() => onImageClick(producto.image, producto.nombre)}
          className="relative aspect-square w-full bg-brand-light/5 overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:ring-inset"
          aria-label={`Ver imagen de ${producto.nombre}`}
        >
          <Image
            src={producto.image}
            alt={producto.nombre}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </button>

        {/* Badge COMBO */}
        <span className="absolute top-3 right-3 bg-brand-gold text-black text-xs font-bold px-2 py-1 rounded-full z-10 pointer-events-none">
          COMBO
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-brand-light text-base mb-1">
          {producto.nombre}
        </h3>

        <p className="text-brand-gold font-extrabold text-2xl mb-4">
          ${producto.precio.toLocaleString("es-AR")}
        </p>

        <motion.button
          onClick={handleAdd}
          disabled={added}
          whileHover={!added ? { scale: 1.02 } : {}}
          whileTap={!added ? { scale: 0.97 } : {}}
          className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all duration-300 text-sm ${
            added
              ? "bg-green-600 text-white"
              : "bg-brand-gold hover:bg-brand-gold-light text-brand-dark"
          }`}
        >
          {added ? (
            <>
              <Check size={16} />
              Agregado
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              Agregar al carrito
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Combos() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  );

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox]);

  if (combos.length === 0) return null;

  return (
    <>
      <section
        id="combos"
        className="py-24 lg:py-32"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,162,39,0.08) 0%, #0a0a0a 70%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Separator top */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-12" />

          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block bg-brand-gold text-black rounded-full px-4 py-1 text-xs font-bold tracking-widest animate-pulse mb-4">
              OFERTA ESPECIAL
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gradient-gold mb-3">
              Combos Premium
            </h2>
            <p className="text-brand-silver text-sm">
              La combinación perfecta para maximizar tus resultados
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {combos.map((combo, i) => (
              <ComboCard
                key={combo.id}
                producto={combo}
                delay={i * 0.15}
                onImageClick={(src, alt) => setLightbox({ src, alt })}
              />
            ))}
          </div>

          {/* Separator bottom */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mt-12" />
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Cerrar"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={1200}
                height={1200}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
