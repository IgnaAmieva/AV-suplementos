"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Package, X } from "lucide-react";
import { categorias, productosPorCategoria } from "@/data/productos";
import type { Producto } from "@/data/productos";
import { useCart } from "./CartContext";

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

function ProductCard({
  producto,
  onImageClick,
}: {
  producto: Producto;
  onImageClick: (src: string, alt: string) => void;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      name: producto.nombre,
      option: producto.id,
      price: producto.precio,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-brand-dark border border-brand-gold/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-gold/30 hover:shadow-[0_0_30px_rgba(201,162,39,0.08)]">
      {/* Image — clickable for lightbox */}
      <button
        type="button"
        onClick={() => {
          if (producto.image) onImageClick(producto.image, producto.nombre);
        }}
        className="relative aspect-square w-full bg-brand-light/5 overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:ring-inset"
        aria-label={`Ver imagen de ${producto.nombre}`}
      >
        {producto.image ? (
          <Image
            src={producto.image}
            alt={producto.nombre}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package size={48} className="text-brand-silver-dark/30" />
          </div>
        )}
      </button>

      {/* Info */}
      <div className="p-4 lg:p-5">
        <p className="text-brand-silver-dark text-xs uppercase tracking-wider mb-1">
          {producto.marca}
        </p>
        <h3 className="text-brand-light font-bold text-sm lg:text-base mb-3 leading-snug min-h-[2.5rem]">
          {producto.nombre}
        </h3>
        <p className="text-brand-gold font-extrabold text-xl lg:text-2xl mb-4">
          ${producto.precio.toLocaleString("es-AR")}
        </p>
        <button
          onClick={handleAdd}
          disabled={added}
          className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-full transition-all duration-300 text-sm ${
            added
              ? "bg-green-600 text-white"
              : "bg-brand-gold hover:bg-brand-gold-light text-brand-black"
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
        </button>
      </div>
    </div>
  );
}

interface TiendaProps {
  categoriaActiva: string;
  onCategoriaChange: (slug: string) => void;
}

export default function Tienda({
  categoriaActiva,
  onCategoriaChange,
}: TiendaProps) {
  const productos = productosPorCategoria(categoriaActiva);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox]);

  return (
    <>
      <section id="tienda" className="py-24 lg:py-32 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-brand-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
                Tienda
              </p>
              <h2 className="text-4xl lg:text-5xl font-extrabold">
                Elegí tu{" "}
                <span className="text-gradient-gold">suplemento</span>
              </h2>
              <div className="w-16 mx-auto mt-4 gold-divider" />
            </div>
          </FadeIn>

          {/* Category tabs */}
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categorias.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => onCategoriaChange(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 ${
                    categoriaActiva === cat.slug
                      ? "bg-brand-gold text-brand-black"
                      : "bg-brand-dark border border-brand-gold/20 text-brand-silver hover:border-brand-gold/40 hover:text-brand-light"
                  }`}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Product grid */}
          <motion.div
            key={categoriaActiva}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {productos.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProductCard
                  producto={p}
                  onImageClick={(src, alt) => setLightbox({ src, alt })}
                />
              </FadeIn>
            ))}
          </motion.div>

          {productos.length === 0 && (
            <p className="text-center text-brand-silver-dark py-12">
              No hay productos en esta categoría.
            </p>
          )}
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
