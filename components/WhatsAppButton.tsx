"use client";

import { useCart } from "./CartContext";

export default function WhatsAppButton() {
  const { itemCount, isOpen } = useCart();
  const hidden = isOpen || itemCount > 0;

  return (
    <a
      className={`fixed z-70 flex items-center gap-[10px] bg-[#1FAF55] text-white no-underline font-bold rounded-full px-5 py-[13px] shadow-[0_12px_30px_rgba(0,0,0,.5)] transition-all duration-300 ${
        hidden ? "translate-y-[120px] opacity-0 pointer-events-none" : ""
      }`}
      style={{
        right: "calc(16px + env(safe-area-inset-right, 0px))",
        bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
      }}
      href="https://wa.me/5492622543956?text=Hola%20A%26V%2C%20quiero%20hacer%20una%20consulta"
      target="_blank"
      rel="noopener"
      aria-label="Escribir por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[22px] h-[22px]">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.6.1-.2-.1-1.1-.4-2-1.3-.8-.7-1.3-1.5-1.4-1.8-.1-.2 0-.4.1-.5l.4-.4.1-.3v-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2-.3-.2-.6-.3z" />
      </svg>
      <span className="max-[700px]:hidden">Escribinos</span>
    </a>
  );
}
