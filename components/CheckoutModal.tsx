"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Send,
  Copy,
  Check,
} from "lucide-react";
import { useCart } from "./CartContext";

const WHATSAPP_NUMBER = "5492622543956";
const ALIAS = "SUPLEMENTOS.AV";

interface CheckoutForm {
  nombre: string;
  telefono: string;
  direccion: string;
  localidad: string;
}

const STEP_VARIANTS = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
};

export default function CheckoutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CheckoutForm>({
    nombre: "",
    telefono: "",
    direccion: "",
    localidad: "",
  });
  const [copied, setCopied] = useState(false);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setForm({ nombre: "", telefono: "", direccion: "", localidad: "" });
      setCopied(false);
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const getKey = (item: typeof items[0]) =>
    item.sabor ? `${item.option}::${item.sabor}` : item.option;

  const formComplete =
    form.nombre.trim() &&
    form.telefono.trim() &&
    form.direccion.trim() &&
    form.localidad.trim();

  const handleCopyAlias = async () => {
    try {
      await navigator.clipboard.writeText(ALIAS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = ALIAS;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buildWhatsAppUrl = () => {
    let msg = `*Nuevo pedido — A&V Suplementos*\n\n*Productos:*\n`;
    items.forEach((item) => {
      const sabor = item.sabor ? ` (${item.sabor})` : "";
      const subtotal = (item.price * item.quantity).toLocaleString("es-AR");
      msg += `• ${item.name}${sabor} x${item.quantity} — $${subtotal}\n`;
    });
    msg += `*Total: $${total.toLocaleString("es-AR")}*\n\n`;
    msg += `*Datos del cliente:*\n`;
    msg += `Nombre: ${form.nombre}\n`;
    msg += `Teléfono: ${form.telefono}\n`;
    msg += `Dirección: ${form.direccion}, ${form.localidad}\n\n`;
    msg += `*Método de pago:* Transferencia\n`;
    msg += `*Alias:* ${ALIAS}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const handleConfirm = () => {
    const url = buildWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-brand-dark w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col border border-brand-gold/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="shrink-0 px-6 pt-5 pb-4 border-b border-brand-gold/15">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-brand-light">
                Finalizar compra
              </h3>
              <button
                onClick={onClose}
                className="text-brand-silver-dark hover:text-brand-light transition-colors"
                aria-label="Cerrar"
              >
                <X size={22} />
              </button>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      s === step
                        ? "bg-brand-gold text-brand-black"
                        : s < step
                        ? "bg-brand-gold/30 text-brand-gold"
                        : "bg-brand-light/10 text-brand-silver-dark"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-0.5 transition-colors ${
                        s < step ? "bg-brand-gold/30" : "bg-brand-light/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-brand-silver-dark text-xs mt-2">
              Paso {step} de 3
            </p>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <AnimatePresence mode="wait">
              {/* ── STEP 1: Cart ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={STEP_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <h4 className="text-lg font-bold text-brand-light mb-4">
                    Tu carrito
                  </h4>

                  {items.length === 0 ? (
                    <p className="text-brand-silver-dark text-center py-8">
                      Tu carrito está vacío
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => {
                        const key = getKey(item);
                        return (
                          <div
                            key={key}
                            className="bg-brand-black/60 border border-brand-gold/10 rounded-xl p-4"
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-brand-light text-sm truncate">
                                  {item.name}
                                </p>
                                {item.sabor && (
                                  <p className="text-brand-gold/70 text-xs">
                                    {item.sabor}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => removeItem(key)}
                                className="text-red-400/60 hover:text-red-400 transition-colors shrink-0"
                                aria-label="Eliminar"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(key, item.quantity - 1)
                                  }
                                  className="w-7 h-7 rounded-full border border-brand-gold/30 flex items-center justify-center hover:bg-brand-gold/10 text-brand-silver transition-colors"
                                  aria-label="Menos"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="w-6 text-center font-semibold text-sm text-brand-light">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(key, item.quantity + 1)
                                  }
                                  className="w-7 h-7 rounded-full border border-brand-gold/30 flex items-center justify-center hover:bg-brand-gold/10 text-brand-silver transition-colors"
                                  aria-label="Más"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <p className="text-brand-gold font-bold text-sm">
                                $
                                {(item.price * item.quantity).toLocaleString(
                                  "es-AR"
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {items.length > 0 && (
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-gold/10">
                      <span className="text-brand-silver-dark font-medium">
                        Total
                      </span>
                      <span className="text-2xl font-extrabold text-brand-gold">
                        ${total.toLocaleString("es-AR")}
                      </span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── STEP 2: Form ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={STEP_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <h4 className="text-lg font-bold text-brand-light mb-6">
                    Tus datos
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-silver mb-1.5">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        value={form.nombre}
                        onChange={(e) =>
                          setForm({ ...form, nombre: e.target.value })
                        }
                        placeholder="Tu nombre y apellido"
                        className="w-full px-4 py-3 rounded-lg bg-brand-black border border-brand-gold/30 text-brand-light placeholder:text-brand-silver-dark/50 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-silver mb-1.5">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={(e) =>
                          setForm({ ...form, telefono: e.target.value })
                        }
                        placeholder="Ej: 2622-543956"
                        className="w-full px-4 py-3 rounded-lg bg-brand-black border border-brand-gold/30 text-brand-light placeholder:text-brand-silver-dark/50 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-silver mb-1.5">
                        Dirección
                      </label>
                      <input
                        type="text"
                        value={form.direccion}
                        onChange={(e) =>
                          setForm({ ...form, direccion: e.target.value })
                        }
                        placeholder="Calle y número"
                        className="w-full px-4 py-3 rounded-lg bg-brand-black border border-brand-gold/30 text-brand-light placeholder:text-brand-silver-dark/50 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-silver mb-1.5">
                        Localidad
                      </label>
                      <input
                        type="text"
                        value={form.localidad}
                        onChange={(e) =>
                          setForm({ ...form, localidad: e.target.value })
                        }
                        placeholder="Ciudad o localidad"
                        className="w-full px-4 py-3 rounded-lg bg-brand-black border border-brand-gold/30 text-brand-light placeholder:text-brand-silver-dark/50 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: Summary + Payment ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={STEP_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <h4 className="text-lg font-bold text-brand-light mb-4">
                    Resumen del pedido
                  </h4>

                  {/* Items summary */}
                  <div className="bg-brand-black/60 border border-brand-gold/10 rounded-xl p-4 space-y-2 mb-4">
                    {items.map((item) => {
                      const sabor = item.sabor ? ` — ${item.sabor}` : "";
                      return (
                        <div
                          key={getKey(item)}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-brand-silver truncate flex-1 mr-2">
                            {item.name}
                            {sabor} x{item.quantity}
                          </span>
                          <span className="text-brand-light font-medium shrink-0">
                            $
                            {(item.price * item.quantity).toLocaleString(
                              "es-AR"
                            )}
                          </span>
                        </div>
                      );
                    })}
                    <div className="pt-2 border-t border-brand-gold/10 flex justify-between">
                      <span className="text-brand-light font-bold">Total</span>
                      <span className="text-brand-gold font-extrabold text-lg">
                        ${total.toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>

                  {/* Customer data */}
                  <div className="bg-brand-black/60 border border-brand-gold/10 rounded-xl p-4 mb-4 space-y-1 text-sm">
                    <p className="text-brand-silver">
                      <span className="text-brand-silver-dark">Nombre:</span>{" "}
                      {form.nombre}
                    </p>
                    <p className="text-brand-silver">
                      <span className="text-brand-silver-dark">Teléfono:</span>{" "}
                      {form.telefono}
                    </p>
                    <p className="text-brand-silver">
                      <span className="text-brand-silver-dark">Dirección:</span>{" "}
                      {form.direccion}, {form.localidad}
                    </p>
                  </div>

                  {/* Payment */}
                  <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-5 text-center">
                    <p className="text-brand-silver text-sm mb-2">
                      Realizá tu pago por transferencia:
                    </p>
                    <p className="text-brand-gold font-extrabold text-2xl tracking-wider mb-3">
                      {ALIAS}
                    </p>
                    <button
                      onClick={handleCopyAlias}
                      className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        copied
                          ? "bg-green-600 text-white"
                          : "bg-brand-dark border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check size={14} />
                          ¡Copiado!
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copiar alias
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer buttons */}
          <div className="shrink-0 px-6 pb-6 pt-2">
            {step === 1 && (
              <button
                onClick={() => setStep(2)}
                disabled={items.length === 0}
                className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-full transition-colors ${
                  items.length === 0
                    ? "bg-brand-light/10 text-brand-silver-dark cursor-not-allowed"
                    : "bg-brand-gold hover:bg-brand-gold-light text-brand-black"
                }`}
              >
                Continuar
                <ArrowRight size={18} />
              </button>
            )}

            {step === 2 && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center justify-center gap-1 px-5 py-3.5 rounded-full border border-brand-gold/20 text-brand-silver hover:text-brand-light hover:border-brand-gold/40 font-medium transition-colors"
                >
                  <ArrowLeft size={16} />
                  Atrás
                </button>
                <button
                  onClick={() => {
                    if (formComplete) setStep(3);
                  }}
                  disabled={!formComplete}
                  className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-full transition-colors ${
                    formComplete
                      ? "bg-brand-gold hover:bg-brand-gold-light text-brand-black"
                      : "bg-brand-light/10 text-brand-silver-dark cursor-not-allowed"
                  }`}
                >
                  Continuar
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirm}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-3.5 rounded-full transition-colors"
                >
                  <Send size={18} />
                  Confirmar pedido por WhatsApp
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center justify-center gap-1 py-3 text-brand-silver-dark hover:text-brand-light font-medium transition-colors text-sm"
                >
                  <ArrowLeft size={14} />
                  Volver a mis datos
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
