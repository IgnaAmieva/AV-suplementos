"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { productos } from "@/data/productos";

const GALLERY_ITEMS = [
  { src: productos.find((p) => p.id === "whey-platinum-3kg")!.image, alt: "Whey Protein Platinum 3kg", span: "md:col-span-2 md:row-span-2" },
  { src: productos.find((p) => p.id === "crea-300-pote-star")!.image, alt: "Creatina 300g Pote" },
  { src: productos.find((p) => p.id === "pump-3d-ripped-315g")!.image, alt: "Pump 3D Ripped 315g" },
  { src: productos.find((p) => p.id === "amino-energy-270g-optimun")!.image, alt: "Amino Energy 270g" },
  { src: productos.find((p) => p.id === "colageno-210g-frutos-rojos")!.image, alt: "Colágeno Frutos Rojos" },
  { src: productos.find((p) => p.id === "whey-syntha6-5lb-bsn")!.image, alt: "Syntha-6 5 lbs", span: "md:col-span-2" },
];

export default function Galeria() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const touchStartX = useRef(0);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i + 1) % GALLERY_ITEMS.length : null));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIdx((i) =>
      i !== null ? (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null
    );
  }, []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, closeLightbox, goNext, goPrev]);

  return (
    <>
      <section id="galeria" className="py-16 sm:py-24 lg:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 sm:mb-16"
          >
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-semibold mb-3">
              Galería
            </p>
            <h2 className="heading-display text-[clamp(1.75rem,6vw,3.75rem)] text-brand-light">
              NUESTRAS{" "}
              <span className="text-brand-gold">MARCAS</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <GalleryItem
                key={item.src}
                item={item}
                index={i}
                onClick={() => setLightboxIdx(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox with swipe */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(delta) > 50) {
                delta < 0 ? goNext() : goPrev();
              }
            }}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Cerrar"
            >
              <X size={28} />
            </button>

            {/* Prev / Next — desktop only */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors hidden sm:flex min-w-[44px] min-h-[44px] items-center justify-center"
              aria-label="Siguiente"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_ITEMS[lightboxIdx].src}
                alt={GALLERY_ITEMS[lightboxIdx].alt}
                width={1200}
                height={1200}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                sizes="90vw"
              />
              <p className="text-center text-brand-silver text-sm mt-3">
                {GALLERY_ITEMS[lightboxIdx].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GalleryItem({
  item,
  index,
  onClick,
}: {
  item: (typeof GALLERY_ITEMS)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.06, ease: "easeOut" }}
      onClick={onClick}
      className={`relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden group bg-brand-black border border-brand-gold/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold/50 lg:hover:border-brand-gold/40 transition-colors duration-300 ${item.span || ""}`}
      aria-label={`Ver ${item.alt}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        loading="lazy"
        className="object-contain p-4 sm:p-6 transition-transform duration-500 lg:group-hover:scale-110"
        sizes="(max-width: 768px) 46vw, 25vw"
      />
      {/* Gold border glow on desktop hover */}
      <div className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-inset ring-brand-gold/30 rounded-xl sm:rounded-2xl" />
    </motion.button>
  );
}
