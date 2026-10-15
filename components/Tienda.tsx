"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import { ShoppingCart, Check, Package, X } from "lucide-react";
import { categorias, productosPorCategoria } from "@/data/productos";
import type { Producto } from "@/data/productos";
import { useCart } from "./CartContext";

/* ── Product card ── */
function ProductCard({
  producto,
  index,
  onImageClick,
}: {
  producto: Producto;
  index: number;
  onImageClick: (src: string, alt: string) => void;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSabor, setSelectedSabor] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const hasSabores = producto.sabores && producto.sabores.length > 0;
  const needsSabor = hasSabores && !selectedSabor;

  const handleAdd = () => {
    if (needsSabor) return;
    addItem({
      name: producto.nombre,
      option: producto.id,
      price: producto.precio,
      sabor: selectedSabor || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  /* 3D tilt — pointer:fine only */
  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (el) el.style.transform = "";
  };

  // Stagger delay: only on first viewport entry, capped at 8 items
  const staggerDelay = Math.min(index, 7) * 0.06;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: staggerDelay, ease: "easeOut" }}
      className="flex"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group flex flex-col w-full bg-brand-dark border border-brand-gold/10 rounded-2xl overflow-hidden transition-[border-color] duration-300 lg:hover:border-brand-gold/30 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image */}
        <button
          type="button"
          onClick={() => {
            if (producto.image) onImageClick(producto.image, producto.nombre);
          }}
          className="relative aspect-square w-full overflow-hidden bg-brand-black/60 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:ring-inset"
          aria-label={`Ver imagen de ${producto.nombre}`}
        >
          {producto.image ? (
            <Image
              src={producto.image}
              alt={producto.nombre}
              fill
              loading="lazy"
              className="object-contain p-3 sm:p-4 transition-transform duration-500 lg:group-hover:scale-110"
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 23vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package size={40} className="text-brand-silver-dark/30" />
            </div>
          )}
        </button>

        {/* Info */}
        <div className="flex flex-col flex-1 p-3 sm:p-4">
          <p className="text-brand-silver-dark text-xs uppercase tracking-wider mb-0.5">
            {producto.marca}
          </p>
          <h3 className="font-bold text-brand-light text-sm line-clamp-2 min-h-[2.5rem] leading-snug mb-1.5">
            {producto.nombre}
          </h3>

          {/* Flavor selector */}
          {hasSabores && (
            <select
              value={selectedSabor}
              onChange={(e) => setSelectedSabor(e.target.value)}
              className="w-full mb-2 px-2.5 py-2 min-h-[44px] rounded-lg bg-brand-black border border-brand-gold/30 text-brand-light text-xs sm:text-sm focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/50 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C9A227' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.5rem center",
              }}
            >
              <option value="" className="bg-brand-dark">
                Elegí un sabor
              </option>
              {producto.sabores!.map((s) => (
                <option key={s} value={s} className="bg-brand-dark">
                  {s}
                </option>
              ))}
            </select>
          )}

          <p className="text-brand-gold font-extrabold text-lg sm:text-xl lg:text-2xl mt-auto mb-2">
            ${producto.precio.toLocaleString("es-AR")}
          </p>

          <motion.button
            onClick={handleAdd}
            disabled={added || needsSabor}
            whileTap={!added && !needsSabor ? { scale: 0.95 } : {}}
            className={`w-full flex items-center justify-center gap-1.5 font-semibold py-2.5 min-h-[44px] rounded-xl transition-colors duration-300 text-xs sm:text-sm ${
              added
                ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/40"
                : needsSabor
                ? "bg-brand-silver-dark/20 text-brand-silver-dark cursor-not-allowed"
                : "bg-brand-gold hover:bg-brand-gold-light text-brand-black"
            }`}
          >
            {added ? (
              <>
                <Check size={16} />
                Agregado
              </>
            ) : needsSabor ? (
              "Elegí un sabor"
            ) : (
              <>
                <ShoppingCart size={16} />
                Agregar
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Category tabs with gradient edges, arrow hint, and entrance nudge ── */
function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (slug: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const hasHinted = useRef(false);

  // Track scroll position for gradient edges
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Hint animation: nudge scroll right and back on first mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || hasHinted.current) return;
    hasHinted.current = true;
    const timer = setTimeout(() => {
      el.scrollTo({ left: 60, behavior: "smooth" });
      setTimeout(() => {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }, 400);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Scroll active pill into view
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const activeEl = container.querySelector<HTMLElement>(
      `[data-slug="${active}"]`
    );
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [active]);

  return (
    <div
      className="sticky top-[82px] z-30 bg-brand-black/95 backdrop-blur-sm border-b border-brand-gold/10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3"
    >
      <div className="relative">
        <LayoutGroup id="tienda-tabs">
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto no-scrollbar"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {categorias.map((cat) => (
              <button
                key={cat.slug}
                data-slug={cat.slug}
                onClick={() => onChange(cat.slug)}
                className={`relative flex-shrink-0 px-4 py-2.5 min-h-[44px] rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 ${
                  active === cat.slug
                    ? "text-brand-black"
                    : "text-brand-silver hover:text-brand-light"
                }`}
              >
                {active === cat.slug && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-brand-gold rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.nombre}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Left gradient fade */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-brand-black/95 to-transparent pointer-events-none transition-opacity duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Right gradient fade + arrow */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-brand-black/95 to-transparent pointer-events-none transition-opacity duration-300 flex items-center justify-end pr-1 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-brand-gold/60 text-xs">›</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Tienda ── */
interface TiendaProps {
  categoriaActiva: string;
  onCategoriaChange: (slug: string) => void;
}

export default function Tienda({
  categoriaActiva,
  onCategoriaChange,
}: TiendaProps) {
  const productos = productosPorCategoria(categoriaActiva);
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

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
      <section id="tienda" className="py-16 sm:py-24 lg:py-32 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 sm:mb-10"
          >
            <p className="text-brand-gold text-sm tracking-[0.3em] uppercase font-semibold mb-3">
              Tienda
            </p>
            <h2 className="heading-display text-[clamp(1.75rem,6vw,3.75rem)] text-brand-light">
              ELEGÍ TU{" "}
              <span className="text-brand-gold">SUPLEMENTO</span>
            </h2>
          </motion.div>

          {/* Sticky category tabs */}
          <CategoryTabs
            active={categoriaActiva}
            onChange={onCategoriaChange}
          />

          {/* Product grid — fast fade on category change, no re-stagger */}
          <AnimatePresence mode="wait">
            <motion.div
              key={categoriaActiva}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8"
            >
              {productos.map((p, i) => (
                <ProductCard
                  key={p.id}
                  producto={p}
                  index={i}
                  onImageClick={(src, alt) => setLightbox({ src, alt })}
                />
              ))}
            </motion.div>
          </AnimatePresence>

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
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
