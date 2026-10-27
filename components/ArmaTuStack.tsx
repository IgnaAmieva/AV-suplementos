"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Package } from "lucide-react";
import {
  categorias,
  productosPorCategoria,
  PLATE_COLORS,
  type Producto,
} from "@/data/productos";
import { useCart } from "./CartContext";
import BarbellBar from "./BarbellBar";
import ProductSheet from "./ProductSheet";

/* All categories including combos (shown as chip) */
const CATS = categorias;

/* ── Product card (grid item) ── */
function ProductCard({
  producto,
  onOpen,
  onQuickAdd,
}: {
  producto: Producto;
  onOpen: (p: Producto) => void;
  onQuickAdd: (p: Producto) => void;
}) {
  const hasFlavors = producto.sabores && producto.sabores.length > 0;

  return (
    <article
      className="group bg-brand-steel border border-brand-line rounded-[14px] overflow-hidden flex flex-col min-w-0 cursor-pointer transition-all duration-250 hover:-translate-y-1 hover:border-brand-gold/50"
      onClick={() => onOpen(producto)}
    >
      {/* Image */}
      <div className="aspect-square bg-white grid place-items-center overflow-hidden">
        {producto.image ? (
          <Image
            src={producto.image}
            alt={producto.nombre}
            width={400}
            height={400}
            loading="lazy"
            className="w-[86%] h-[86%] object-contain transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 23vw"
          />
        ) : (
          <Package size={40} className="text-brand-silver-dark/30" />
        )}
      </div>

      {/* Body */}
      <div className="p-3 sm:p-[14px] flex flex-col flex-1 gap-1.5">
        <span className="font-[family-name:var(--font-display)] tracking-[0.14em] uppercase text-xs text-brand-gold font-bold">
          {producto.marca}
        </span>
        <h3 className="font-semibold text-brand-light text-[15px] sm:text-base leading-tight line-clamp-2">
          {producto.nombre}
        </h3>
        {hasFlavors && (
          <span className="text-[13px] text-brand-mute">
            {producto.sabores!.length} sabores
          </span>
        )}
        <div className="flex items-center justify-between gap-2 mt-auto pt-1.5">
          <span className="font-[family-name:var(--font-display)] font-black italic text-xl sm:text-2xl text-brand-light tabular-nums">
            ${producto.precio.toLocaleString("es-AR")}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (hasFlavors) onOpen(producto);
              else onQuickAdd(producto);
            }}
            className="min-w-[44px] sm:min-w-[48px] h-[44px] sm:h-[48px] rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black text-2xl font-bold grid place-items-center transition-colors flex-shrink-0"
            aria-label={`Sumar ${producto.nombre} a la barra`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Toast notification ── */
function Toast({ message }: { message: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="fixed left-1/2 -translate-x-1/2 top-[calc(80px+env(safe-area-inset-top,0px))] z-[120] bg-brand-chalk text-brand-black px-5 py-3 rounded-full font-bold shadow-xl max-w-[calc(100vw-32px)] whitespace-nowrap overflow-hidden text-ellipsis text-sm"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main section ── */
export default function ArmaTuStack() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const { addItem, itemCount, total } = useCart();

  const [activeCategory, setActiveCategory] = useState(CATS[0].slug);
  const [sheetProduct, setSheetProduct] = useState<Producto | null>(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const productos = useMemo(
    () => productosPorCategoria(activeCategory),
    [activeCategory]
  );

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1800);
  }, []);

  const quickAdd = useCallback(
    (p: Producto) => {
      addItem({
        name: p.nombre,
        option: p.id,
        price: p.precio,
      });
      showToast(`${p.nombre} a la barra`);
    },
    [addItem, showToast]
  );

  const chipScrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section id="tienda" className="bg-brand-iron relative pb-16 sm:pb-24">
        {/* Section header */}
        <div className="wrap pt-16 sm:pt-24 lg:pt-32 pb-4">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow mb-3">Personalizá</p>
            <h2 className="text-[clamp(50px,8vw,112px)] text-brand-light">
              ARM&Aacute; TU{" "}
              <span className="text-brand-gold">STACK</span>
            </h2>
            <p className="text-brand-silver max-w-[52ch] mt-3 text-base sm:text-lg">
              Sumá productos a la barra y armá tu pedido. Tocá un producto para elegir sabor y cantidad.
            </p>
          </motion.div>
        </div>

        {/* ── Sticky rack: barbell + total + category chips ── */}
        <div
          className="sticky z-[5] bg-brand-iron border-b border-brand-line"
          style={{ top: "calc(60px + env(safe-area-inset-top, 0px))" }}
        >
          <div className="wrap">
            {/* Barbell + readout */}
            <div className="grid justify-items-center gap-1.5 py-2">
              <div className="w-full max-w-[880px] max-h-[84px] sm:max-h-none overflow-hidden">
                <BarbellBar animate />
              </div>
              <div className="flex gap-4 items-baseline font-[family-name:var(--font-display)] uppercase tracking-[0.1em] font-bold text-brand-mute text-sm">
                <span>
                  {itemCount
                    ? `${itemCount} ${itemCount === 1 ? "disco" : "discos"} cargados`
                    : "Barra vacía"}
                </span>
                <b className="text-[26px] sm:text-[34px] italic font-black text-brand-gold-light tracking-normal tabular-nums">
                  $ {total.toLocaleString("es-AR")}
                </b>
              </div>
            </div>

            {/* Category chips */}
            <div
              ref={chipScrollRef}
              className="flex gap-2.5 overflow-x-auto no-scrollbar py-2 pb-3"
              style={{ WebkitOverflowScrolling: "touch" }}
              role="tablist"
              aria-label="Categorías"
            >
              {CATS.map((cat) => {
                const [color] = PLATE_COLORS[cat.slug] ?? ["#888"];
                const isActive = cat.slug === activeCategory;
                return (
                  <button
                    key={cat.slug}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveCategory(cat.slug);
                      // Scroll chip into view
                      const btn = chipScrollRef.current?.querySelector(
                        `[data-cat="${cat.slug}"]`
                      ) as HTMLElement | null;
                      btn?.scrollIntoView({
                        inline: "center",
                        block: "nearest",
                        behavior: "smooth",
                      });
                    }}
                    data-cat={cat.slug}
                    className={`flex-none flex items-center gap-2.5 min-h-[46px] sm:min-h-[50px] px-4 sm:px-5 rounded-full font-[family-name:var(--font-display)] font-black italic text-[17px] sm:text-xl uppercase tracking-[0.04em] transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-brand-chalk text-brand-black border border-brand-chalk"
                        : "border border-brand-line text-brand-silver hover:border-brand-gold/40"
                    }`}
                  >
                    <i
                      className="w-[14px] h-[14px] rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                    {cat.nombre}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Product grid ── */}
        <div className="wrap mt-3.5">
          <p className="text-brand-mute text-sm mb-4">
            {productos.length} {productos.length === 1 ? "producto" : "productos"} en {CATS.find((c) => c.slug === activeCategory)?.nombre}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5"
            >
              {productos.map((p) => (
                <ProductCard
                  key={p.id}
                  producto={p}
                  onOpen={setSheetProduct}
                  onQuickAdd={quickAdd}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {productos.length === 0 && (
            <p className="text-center text-brand-mute py-16">
              No hay productos en esta categoría.
            </p>
          )}
        </div>
      </section>

      {/* Product detail sheet */}
      <ProductSheet
        producto={sheetProduct}
        onClose={() => setSheetProduct(null)}
      />

      {/* Toast */}
      <Toast message={toast} />
    </>
  );
}
