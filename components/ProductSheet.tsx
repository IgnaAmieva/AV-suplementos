"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Package, X } from "lucide-react";
import type { Producto } from "@/data/productos";
import { useCart } from "./CartContext";

interface ProductSheetProps {
  producto: Producto | null;
  onClose: () => void;
}

export default function ProductSheet({ producto, onClose }: ProductSheetProps) {
  const { addItem } = useCart();
  const [flavor, setFlavor] = useState("");
  const [qty, setQty] = useState(1);

  // Reset when product changes
  useEffect(() => {
    setFlavor("");
    setQty(1);
  }, [producto?.id]);

  // Escape key
  useEffect(() => {
    if (!producto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [producto, onClose]);

  const hasFlavors = producto?.sabores && producto.sabores.length > 0;
  const needsFlavor = hasFlavors && !flavor;
  const price = producto ? producto.precio * qty : 0;

  const handleAdd = useCallback(() => {
    if (!producto || needsFlavor) return;
    addItem(
      {
        name: producto.nombre,
        option: producto.id,
        price: producto.precio,
        sabor: flavor || undefined,
      },
      qty
    );
    onClose();
  }, [producto, qty, flavor, needsFlavor, addItem, onClose]);

  return (
    <AnimatePresence>
      {producto && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-[150]"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            exit={{ y: "105%" }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed z-[160] left-1/2 bottom-0 -translate-x-1/2 w-full sm:max-w-[560px] bg-brand-iron border border-brand-line rounded-t-[22px] sm:rounded-[22px] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-h-[92vh] overflow-auto"
            style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom, 0px))" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab bar (mobile) */}
            <div className="w-11 h-[5px] rounded-full bg-[#444] mx-auto mt-3 mb-3 sm:hidden" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-brand-mute hover:text-brand-light transition-colors z-10 w-9 h-9 flex items-center justify-center"
              aria-label="Cerrar"
            >
              <X size={22} />
            </button>

            {/* Content */}
            <div className="px-5 pb-5">
              {/* Top: image + info */}
              <div className="grid grid-cols-[120px_1fr] gap-4 items-center mb-5">
                <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center">
                  {producto.image ? (
                    <Image
                      src={producto.image}
                      alt={producto.nombre}
                      width={200}
                      height={200}
                      className="w-[88%] h-[88%] object-contain"
                    />
                  ) : (
                    <Package size={40} className="text-brand-silver-dark/30" />
                  )}
                </div>
                <div>
                  <p className="text-brand-gold text-xs font-bold tracking-[0.14em] uppercase mb-1">
                    {producto.marca}
                  </p>
                  <h3 className="font-bold text-brand-light text-lg leading-tight mb-1">
                    {producto.nombre}
                  </h3>
                  <p className="font-[family-name:var(--font-display)] font-black italic text-brand-gold text-2xl tabular-nums">
                    ${producto.precio.toLocaleString("es-AR")}
                  </p>
                </div>
              </div>

              {/* Flavor chips */}
              {hasFlavors && (
                <div className="mb-5">
                  <p className="text-brand-mute text-sm mb-2">Sabor</p>
                  <div className="flex flex-wrap gap-2">
                    {producto.sabores!.map((s) => (
                      <button
                        key={s}
                        onClick={() => setFlavor(s)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                          flavor === s
                            ? "bg-brand-chalk text-brand-black"
                            : "border border-brand-line text-brand-silver hover:border-brand-gold/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <p className="text-brand-mute text-sm">Cantidad</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full border border-brand-line flex items-center justify-center text-brand-silver hover:border-brand-gold/40 hover:text-brand-light transition-colors"
                    aria-label="Menos"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg text-brand-light tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 rounded-full border border-brand-line flex items-center justify-center text-brand-silver hover:border-brand-gold/40 hover:text-brand-light transition-colors"
                    aria-label="Más"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add button */}
              <button
                onClick={handleAdd}
                disabled={!!needsFlavor}
                className={`w-full min-h-[52px] rounded-md font-[family-name:var(--font-display)] font-black italic text-xl uppercase tracking-wider transition-all duration-200 ${
                  needsFlavor
                    ? "bg-brand-steel text-brand-mute cursor-not-allowed"
                    : "bg-brand-gold hover:bg-brand-gold-light text-brand-black"
                }`}
                style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
              >
                {needsFlavor
                  ? "Elegí un sabor"
                  : `Sumar a la barra · $${price.toLocaleString("es-AR")}`}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
