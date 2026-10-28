"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { productos } from "@/data/productos";
import { useCart } from "./CartContext";

const combos = productos.filter((p) => p.categoria === "combos");

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1];
const OFFSETS = [0, 26, 8, 30, 0, 18];

export default function Combos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (producto: (typeof combos)[0]) => {
    addItem({
      name: producto.nombre,
      option: producto.id,
      price: producto.precio,
    });
    setAddedId(producto.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  if (combos.length === 0) return null;

  return (
    <section className="combos sec" id="combos" style={{ paddingBlock: 96 }}>
      <div className="wrap">
        {/* Section heading */}
        <motion.div
          ref={ref}
          className="sec-head"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Oferta especial</span>
          <h2>
            Combos{" "}
            <span style={{ color: "var(--color-brand-gold)" }}>premium.</span>
          </h2>
        </motion.div>

        {/* 3-column grid */}
        <div className="combos-grid">
          {combos.map((combo, i) => {
            const r = ROTATIONS[i % ROTATIONS.length];
            const y = OFFSETS[i % OFFSETS.length];
            return (
              <motion.article
                key={combo.id}
                className="combo"
                style={
                  {
                    "--r": `${r}deg`,
                    "--y": `${y}px`,
                  } as React.CSSProperties
                }
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.08,
                  ease: "easeOut",
                }}
              >
                <div className="combo-ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={combo.image}
                    alt={combo.nombre}
                    loading="lazy"
                  />
                </div>
                <div className="combo-bd">
                  <span className="combo-tag">
                    Combo &middot; {combo.marca}
                  </span>
                  <h3>{combo.nombre}</h3>
                  <div className="combo-row">
                    <span className="combo-pr">
                      $ {combo.precio.toLocaleString("es-AR")}
                    </span>
                    <button
                      className="combo-plus"
                      onClick={() => handleAdd(combo)}
                      aria-label={`Agregar ${combo.nombre}`}
                    >
                      {addedId === combo.id ? "\u2713" : "+"}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

    </section>
  );
}
