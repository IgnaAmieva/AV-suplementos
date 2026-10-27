"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCart } from "./CartContext";
import CartSidebar from "./CartSidebar";

const NAV_LINKS = [
  { href: "#tienda", label: "Tu Stack" },
  { href: "#combos", label: "Combos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 821px)");
    const handler = () => { if (mq.matches) setMobileOpen(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <nav className="nav knurl sticky top-0 z-50 bg-[rgba(10,10,10,.86)] backdrop-blur-[10px] border-b border-brand-line">
        <div className="wrap flex items-center gap-5 py-[10px]">
          {/* Brand */}
          <a href="#top" aria-label="A&V Suplementos, inicio" className="shrink-0">
            <Image
              src="/images/NDSocial/logoAV.jpeg"
              alt="A&V Suplementos"
              width={40}
              height={40}
              className="h-10 w-auto rounded-full"
              priority
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-6 list-none m-0 ml-3 mr-auto p-0 font-[family-name:var(--font-display)] font-bold tracking-[.12em] uppercase text-[15px]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="no-underline text-brand-silver hover:text-brand-gold-light transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Cart button (pill) */}
          <button
            onClick={openCart}
            className="ml-auto relative flex items-center gap-[10px] min-h-[46px] px-4 border border-brand-line rounded-full bg-brand-iron cursor-pointer font-[family-name:var(--font-display)] font-extrabold tracking-[.06em] text-[17px] uppercase"
            aria-label="Abrir pedido"
          >
            <span className="hidden md:inline text-brand-chalk">Tu barra</span>
            <motion.span
              key={itemCount}
              initial={{ scale: 1.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="min-w-[26px] h-[26px] rounded-full bg-brand-gold text-brand-black grid place-items-center text-[15px]"
            >
              {itemCount}
            </motion.span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-brand-silver hover:text-brand-gold transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Menú"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-brand-black/95 backdrop-blur-md border-t border-brand-line">
            <div className="wrap py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-[family-name:var(--font-display)] font-bold tracking-[.12em] uppercase text-[15px] text-brand-silver hover:text-brand-gold-light transition-colors py-3 min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <CartSidebar />
    </>
  );
}
