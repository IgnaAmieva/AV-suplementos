"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";

export default function FloatingCart() {
  const { itemCount, openCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {visible && itemCount > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={openCart}
          className="fixed bottom-6 right-4 z-40 w-14 h-14 rounded-full bg-brand-gold text-brand-black flex items-center justify-center shadow-lg shadow-brand-gold/20"
          aria-label={`Carrito (${itemCount} items)`}
        >
          <ShoppingBag size={22} />
          {/* Bounce counter on change */}
          <motion.span
            key={itemCount}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="absolute -top-1 -right-1 bg-brand-black text-brand-gold text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-brand-gold"
          >
            {itemCount}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
