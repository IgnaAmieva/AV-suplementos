"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ShoppingCart, Check, X } from "lucide-react";
import { productos } from "@/data/productos";
import { useCart } from "./CartContext";

const combos = productos.filter((p) => p.categoria === "combos");

/* ── Combo card ── */
function ComboCard({
  producto,
  onImageClick,
}: {
  producto: (typeof combos)[0];
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
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="w-full lg:w-[380px] flex-shrink-0 bg-brand-dark rounded-2xl lg:rounded-3xl overflow-hidden border border-brand-gold/20 transition-all duration-300 hover:border-brand-gold lg:hover:shadow-[0_0_40px_rgba(201,162,39,0.15)] group">
      {/* Image — tall, protagonist */}
      <button
        type="button"
        onClick={() => onImageClick(producto.image, producto.nombre)}
        className="relative aspect-[4/3] lg:aspect-[4/5] w-full bg-brand-black overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:ring-inset"
        aria-label={`Ver imagen de ${producto.nombre}`}
      >
        <Image
          src={producto.image}
          alt={producto.nombre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
        />
        {/* Badge */}
        <span className="absolute top-4 right-4 bg-brand-gold text-black text-xs font-bold px-3 py-1 rounded-full pointer-events-none">
          COMBO
        </span>
      </button>

      {/* Content */}
      <div className="p-5 lg:p-6">
        <h3 className="font-[family-name:var(--font-display)] font-bold text-brand-light text-lg lg:text-xl uppercase tracking-wide mb-2 leading-tight">
          {producto.nombre}
        </h3>

        <p className="text-brand-gold font-extrabold text-2xl lg:text-3xl mb-5 font-[family-name:var(--font-display)]">
          ${producto.precio.toLocaleString("es-AR")}
        </p>

        <motion.button
          onClick={handleAdd}
          disabled={added}
          whileHover={!added ? { scale: 1.02 } : {}}
          whileTap={!added ? { scale: 0.97 } : {}}
          className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 min-h-[48px] rounded-xl transition-all duration-300 text-sm uppercase tracking-wider ${
            added
              ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/40"
              : "bg-brand-gold hover:bg-brand-gold-light text-brand-dark"
          }`}
        >
          {added ? (
            <>
              <Check size={18} />
              Agregado
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Agregar al carrito
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

/* ── Desktop: horizontal scroll driven by vertical scroll (sticky) ── */
function CombosDesktop({
  onImageClick,
}: {
  onImageClick: (src: string, alt: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  // Total scrollable width: cards + gaps - viewport
  // We need enough vertical scroll height to drive the horizontal movement
  const cardW = 380;
  const totalCardsWidth = combos.length * cardW + (combos.length - 1) * 24;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll to horizontal translation
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [scrollHeight, setScrollHeight] = useState("200vh");

  useEffect(() => {
    const update = () => {
      const overflow = Math.max(0, totalCardsWidth - window.innerWidth + 120);
      setMaxTranslate(overflow);
      // Height = 100vh (sticky screen) + enough scroll to cover the overflow
      // 1.2x ratio feels natural — not too fast, not dragging
      const extraVh = Math.round((overflow / window.innerHeight) * 120);
      setScrollHeight(`${100 + Math.max(50, extraVh)}vh`);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [totalCardsWidth]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block relative"
      style={{ height: scrollHeight }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -30 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="px-8 xl:px-16 mb-10"
        >
          <span className="inline-block bg-brand-gold text-black rounded-full px-4 py-1 text-xs font-bold tracking-widest mb-4">
            OFERTA ESPECIAL
          </span>
          <h2 className="heading-display text-5xl xl:text-6xl text-brand-light">
            COMBOS <span className="text-brand-gold">PREMIUM</span>
          </h2>
        </motion.div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="flex gap-6 pl-8 xl:pl-16 pr-16"
        >
          {combos.map((combo) => (
            <ComboCard
              key={combo.id}
              producto={combo}
              onImageClick={onImageClick}
            />
          ))}
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-brand-silver-dark text-xs uppercase tracking-widest">
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
          Scroll para ver más
        </div>
      </div>
    </div>
  );
}

/* ── Mobile: snap carousel with dots & arrows ── */
function CombosMobile({
  onImageClick,
}: {
  onImageClick: (src: string, alt: string) => void;
}) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which card is in view
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth
        : 1;
      const idx = Math.round(scrollLeft / (cardWidth + 16)); // 16 = gap-4
      setActiveIndex(Math.min(idx, combos.length - 1));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (idx: number) => {
    const container = scrollRef.current;
    if (!container || !container.children[idx]) return;
    const child = container.children[idx] as HTMLElement;
    container.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
  };

  return (
    <div className="lg:hidden">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="px-4 sm:px-6 mb-8"
      >
        <span className="inline-block bg-brand-gold text-black rounded-full px-4 py-1 text-xs font-bold tracking-widest mb-4">
          OFERTA ESPECIAL
        </span>
        <h2 className="heading-display text-[clamp(1.75rem,6vw,3rem)] text-brand-light">
          COMBOS <span className="text-brand-gold">PREMIUM</span>
        </h2>
      </motion.div>

      {/* Carousel container with arrows */}
      <div className="relative">
        {/* Snap carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pl-4 sm:pl-6 pr-4 no-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x",
          }}
        >
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="snap-start flex-shrink-0 w-[calc(100vw-4rem)] sm:w-[300px]"
            >
              <ComboCard producto={combo} onImageClick={onImageClick} />
            </div>
          ))}
          {/* Spacer at the end so last card can snap fully */}
          <div className="flex-shrink-0 w-4 sm:w-6" aria-hidden />
        </div>

        {/* Small arrows */}
        {activeIndex > 0 && (
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-black/70 border border-brand-gold/30 flex items-center justify-center text-brand-gold text-sm backdrop-blur-sm"
            aria-label="Anterior"
          >
            ‹
          </button>
        )}
        {activeIndex < combos.length - 1 && (
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-black/70 border border-brand-gold/30 flex items-center justify-center text-brand-gold text-sm backdrop-blur-sm"
            aria-label="Siguiente"
          >
            ›
          </button>
        )}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {combos.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-brand-gold w-5"
                : "bg-brand-silver-dark/40"
            }`}
            aria-label={`Combo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main Combos section ── */
export default function Combos() {
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);

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

  const handleImageClick = (src: string, alt: string) =>
    setLightbox({ src, alt });

  return (
    <>
      <section
        id="combos"
        className="py-16 lg:py-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,162,39,0.06) 0%, #0a0a0a 70%)",
        }}
      >
        <CombosDesktop onImageClick={handleImageClick} />
        <CombosMobile onImageClick={handleImageClick} />
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
