"use client";

import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "./CartContext";

const WHATSAPP_NUMBER = "5492622543956";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCart();

  if (!isOpen) return null;

  const buildWhatsAppMessage = () => {
    let msg = "Hola A&V! Quiero hacer un pedido:\n\n";
    items.forEach((item) => {
      msg += `- ${item.name} x${item.quantity} — $${(item.price * item.quantity).toLocaleString("es-AR")}\n`;
    });
    msg += `\nTotal: $${total.toLocaleString("es-AR")}`;
    return encodeURIComponent(msg);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-dark z-50 shadow-2xl flex flex-col border-l border-brand-gold/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-gold/15">
          <h2 className="text-xl font-bold text-brand-light">Tu Pedido</h2>
          <button
            onClick={closeCart}
            className="text-brand-silver-dark hover:text-brand-light transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-brand-silver-dark text-center mt-12">
              Tu carrito está vacío
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.option}
                  className="flex items-center gap-4 bg-brand-black/60 border border-brand-gold/10 rounded-xl p-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-light text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-brand-gold font-bold">
                      ${(item.price * item.quantity).toLocaleString("es-AR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.option, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center hover:bg-brand-gold/10 text-brand-silver transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-semibold text-sm text-brand-light">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.option, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center hover:bg-brand-gold/10 text-brand-silver transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(item.option)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-red-400/60 hover:text-red-400 transition-colors"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-brand-gold/15">
            <div className="flex justify-between items-center mb-4">
              <span className="text-brand-silver-dark">Total</span>
              <span className="text-2xl font-extrabold text-brand-gold">
                ${total.toLocaleString("es-AR")}
              </span>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-3.5 rounded-full transition-colors"
            >
              <MessageCircle size={20} />
              Finalizar pedido por WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
