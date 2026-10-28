"use client";

import { useRef, useState } from "react";
import Image from "next/image";
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
                    transform: `rotate(var(--r)) translateY(var(--y))`,
                  } as React.CSSProperties
                }
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  translateY: -8,
                  rotate: 0,
                  transition: { duration: 0.35 },
                }}
              >
                <div className="combo-ph">
                  <Image
                    src={combo.image}
                    alt={combo.nombre}
                    width={600}
                    height={450}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
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

      <style jsx>{`
        .sec-head {
          display: grid;
          gap: 12px;
          justify-items: start;
          margin-bottom: 36px;
        }
        .sec-head h2 {
          font-size: clamp(50px, 8vw, 112px);
        }
        .combos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px 18px;
        }
        .combo {
          background: var(--color-brand-chalk, #f2f0ea);
          color: #000;
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.8);
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .combo-ph {
          aspect-ratio: 4/3;
          background: #fff;
          overflow: hidden;
          display: grid;
          place-items: center;
        }
        .combo-ph :global(img) {
          transition: transform 0.5s;
        }
        .combo:hover .combo-ph :global(img) {
          transform: scale(1.06);
        }
        .combo-bd {
          padding: 16px 18px 18px;
          display: grid;
          gap: 10px;
        }
        .combo-tag {
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: 0.18em;
          font-size: 12px;
          color: #8a6d10;
          text-transform: uppercase;
        }
        .combo h3 {
          font-size: 28px;
          line-height: 0.95;
        }
        .combo-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }
        .combo-pr {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: 32px;
          font-variant-numeric: tabular-nums;
        }
        .combo-plus {
          min-width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: var(--color-brand-black, #0a0a0a);
          color: var(--color-brand-gold-light, #e8c55a);
          font-size: 26px;
          font-weight: 700;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: background 0.2s;
        }
        .combo-plus:hover {
          background: #1a1a1a;
        }
        @media (max-width: 900px) {
          .combos-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .combos-grid {
            grid-template-columns: 1fr;
          }
          .combo h3 {
            font-size: 25px;
          }
        }
      `}</style>
    </section>
  );
}
