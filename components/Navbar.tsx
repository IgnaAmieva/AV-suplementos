"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "./CartContext";
import CartSidebar from "./CartSidebar";

const NAV_LINKS = [
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#combos", label: "Combos" },
  { href: "#tienda", label: "Tienda" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-black/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-gold/30">
              <Image
                src="/images/NDSocial/logoAV.jpeg"
                alt="A&V Suplementos"
                fill
                className="object-cover"
              />
            </div>
            <span className="hidden md:block text-lg font-bold tracking-wide">
              <span className="text-gradient-gold">A&V</span>{" "}
              <span className="text-brand-light text-sm font-semibold">
                SUPLEMENTOS
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold tracking-wide text-brand-silver/80 hover:text-brand-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={openCart}
              className="relative text-brand-silver/80 hover:text-brand-gold transition-colors"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                  }}
                  className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={openCart}
              className="relative text-brand-silver/80 hover:text-brand-gold transition-colors p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Abrir carrito"
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                  }}
                  className="absolute top-0.5 right-0.5 bg-brand-gold text-brand-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-brand-silver/80 hover:text-brand-gold transition-colors p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Menú"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX, transformOrigin: "0%" }}
          className="h-[2px] bg-brand-gold"
        />

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-brand-black/95 backdrop-blur-md border-t border-brand-gold/20">
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-semibold text-brand-silver/80 hover:text-brand-gold transition-colors py-2 min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <CartSidebar />
    </>
  );
}
