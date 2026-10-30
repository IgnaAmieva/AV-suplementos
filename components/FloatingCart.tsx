"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export default function FloatingCart() {
  const { itemCount, total, openCart } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && itemCount > 0 && (
        <motion.button
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          onClick={openCart}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 h-[52px] rounded-full bg-brand-gold text-brand-black shadow-lg shadow-brand-gold/20 font-[family-name:var(--font-display)] font-black italic uppercase tracking-wider text-[15px]"
          aria-label={`Ver pedido (${itemCount} items)`}
        >
          <ShoppingBag size={20} />
          <span>Ver pedido</span>
          <span className="text-brand-black/60">&middot;</span>
          <motion.span
            key={itemCount}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </motion.span>
          <span className="text-brand-black/60">&middot;</span>
          <span className="tabular-nums">${total.toLocaleString("es-AR")}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
