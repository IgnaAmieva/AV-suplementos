"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WHATSAPP_NUMBER = "5492622543956";
const WHATSAPP_MESSAGE = "Hola A&V, quiero hacer una consulta";

export default function Contacto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="contact sec"
      id="contacto"
      style={{ paddingBlock: 96, background: "var(--color-brand-gold, #C9A227)", color: "#000" }}
    >
      <div className="wrap contact-grid" ref={ref}>
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow" style={{ color: "#000" }}>
            Contacto
          </span>
          <h2 style={{ marginTop: 12 }}>
            Escribinos
            <br />
            ahora.
          </h2>
          <p className="contact-desc">
            Te asesoramos con lo que necesites. Respuesta rápida garantizada.
          </p>
          <a
            className="btn contact-btn"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Escribinos por WhatsApp
          </a>
        </motion.div>

        {/* Right column — info */}
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <div>
            <span>WhatsApp</span>
            <b style={{ userSelect: "all" }}>2622 54-3956</b>
          </div>
          <div>
            <span>Instagram</span>
            <a
              href="https://instagram.com/suplementos.av"
              target="_blank"
              rel="noopener noreferrer"
            >
              @suplementos.av
            </a>
          </div>
          <div>
            <span>Donde</span>
            <b>Tunuyán, Mendoza</b>
          </div>
          <div>
            <span>Horario</span>
            <b>Lun a Sáb &middot; 9 – 20 h</b>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .contact h2 {
          font-size: clamp(56px, 10vw, 140px);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 30px;
          align-items: end;
        }
        .contact-desc {
          font-size: 18px;
          max-width: 40ch;
          margin: 18px 0 0;
        }
        .contact-btn {
          background: var(--color-brand-black, #0a0a0a);
          color: var(--color-brand-gold-light, #e8c55a);
          margin-top: 24px;
        }
        .contact-info {
          display: grid;
          gap: 14px;
          font-size: 18px;
          font-weight: 600;
        }
        .contact-info div {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 2px solid rgba(0, 0, 0, 0.2);
          padding-bottom: 10px;
        }
        .contact-info span {
          font-family: var(--font-display);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 800;
        }
        .contact-info a {
          color: inherit;
          text-decoration: none;
        }
        .contact-info a:hover {
          text-decoration: underline;
        }
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
