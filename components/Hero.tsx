"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/* ── Animation helpers ── */
const BACK_EASE = [0.34, 1.56, 0.64, 1] as const;

function PlateSVG() {
  return (
    <svg viewBox="0 0 400 400">
      <circle cx="200" cy="200" r="196" fill="#151515" stroke="#2a2a2a" strokeWidth="4" />
      <circle cx="200" cy="200" r="168" fill="none" stroke="#C9A227" strokeWidth="3" strokeDasharray="2 10" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#2a2a2a" strokeWidth="30" />
      <circle cx="200" cy="200" r="34" fill="#0A0A0A" stroke="#C9C9C9" strokeWidth="6" />
      <defs>
        <path id="tp" d="M200,36 a164,164 0 1,1 0,328 a164,164 0 1,1 0,-328" />
      </defs>
      <text fill="#C9A227" fontFamily="Barlow Condensed" fontWeight="800" fontSize="16" letterSpacing="6">
        <textPath href="#tp">
          A&amp;V SUPLEMENTOS &middot; POTENCIA TU MEJOR VERSI&Oacute;N &middot; A&amp;V SUPLEMENTOS &middot; POTENCIA TU MEJOR VERSI&Oacute;N &middot;
        </textPath>
      </text>
    </svg>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const skip = !!reducedMotion;

  /* ── H1 line reveal variants ── */
  const lineReveal = {
    hidden: { yPercent: skip ? 0 : 110 },
    visible: (i: number) => ({
      yPercent: 0,
      transition: { duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  /* ── Fade-up for eyebrow, paragraph, CTAs, facts ── */
  const fadeUp = {
    hidden: { opacity: skip ? 1 : 0, y: skip ? 0 : 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.5 + i * 0.07, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section className="hero knurl">
      <div className="wrap">
        {/* ── Left column ── */}
        <div className="hero-copy">
          {/* Eyebrow */}
          <motion.p
            className="eyebrow"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Suplementos deportivos originales
          </motion.p>

          {/* H1 */}
          <h1>
            <span className="line">
              <motion.span
                variants={lineReveal}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                Tu mejor
              </motion.span>
            </span>
            <span className="line">
              <motion.span
                className="g"
                variants={lineReveal}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                versión
              </motion.span>
            </span>
            <span className="line">
              <motion.span
                className="o"
                style={{ color: "transparent", WebkitTextStroke: "2px var(--color-brand-chalk)" }}
                variants={lineReveal}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                empieza acá
              </motion.span>
            </span>
          </h1>

          {/* Paragraph */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Proteínas, creatinas, pre-entrenos y más de las mejores marcas.
            Atención personalizada desde Tunuyán y envíos a todo el país.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="ctas"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <a href="#tienda" className="btn btn-gold">Ver tienda</a>
            <a href="#combos" className="btn btn-ghost">Ver combos</a>
          </motion.div>

          {/* Facts */}
          <motion.div
            className="facts"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <span><b>100% originales</b></span>
            <span><b>+8 marcas</b></span>
            <span><b>Lun a Sáb 9–20 h</b></span>
          </motion.div>
        </div>

        {/* ── Right column ── */}
        <div className="hero-art">
          {/* Spinning plate */}
          <motion.div
            className="plate"
            initial={skip ? false : { scale: 0.4, rotate: -180, opacity: 0 }}
            animate={skip ? {} : { scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={skip ? {} : { rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <PlateSVG />
            </motion.div>
          </motion.div>

          {/* Main product */}
          <motion.div
            className="main"
            initial={skip ? false : { y: -500, rotate: -20, opacity: 0 }}
            animate={skip
              ? {}
              : {
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                  transition: {
                    duration: 1,
                    ease: [0.34, 1.56, 0.64, 1],
                  },
                }
            }
          >
            <motion.div
              animate={skip ? {} : { y: [0, -14, 0] }}
              transition={skip ? {} : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/hero/pump-3d-ripped-hero.webp"
                alt="Pump 3D Ripped"
                width={500}
                height={500}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </motion.div>
          </motion.div>

          {/* Satellite 1 */}
          <motion.div
            className="sat s1"
            initial={skip ? false : { scale: 0, rotate: -30, opacity: 0 }}
            animate={skip ? {} : { scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: BACK_EASE }}
          >
            <motion.div
              animate={skip ? {} : { y: [0, -10, 0], rotate: [0, 6, 0] }}
              transition={skip ? {} : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/hero/crea-300-optimun-hero.webp"
                alt="Creatina 300g Optimum"
                width={200}
                height={200}
                style={{ width: "100%", height: "auto" }}
              />
            </motion.div>
          </motion.div>

          {/* Satellite 2 */}
          <motion.div
            className="sat s2"
            initial={skip ? false : { scale: 0, rotate: 25, opacity: 0 }}
            animate={skip ? {} : { scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: BACK_EASE }}
          >
            <motion.div
              animate={skip ? {} : { y: [0, -12, 0], rotate: [0, -6, 0] }}
              transition={skip ? {} : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/hero/whey-gold-standard-hero.webp"
                alt="Whey Gold Standard"
                width={200}
                height={200}
                style={{ width: "100%", height: "auto" }}
              />
            </motion.div>
          </motion.div>

          {/* Satellite 3 */}
          <motion.div
            className="sat s3"
            initial={skip ? false : { scale: 0, rotate: 20, opacity: 0 }}
            animate={skip ? {} : { scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: BACK_EASE }}
          >
            <Image
              src="/images/hero/crea-309-bsn-hero.webp"
              alt="Creatina BSN 309g"
              width={160}
              height={160}
              style={{ width: "100%", height: "auto" }}
            />
          </motion.div>

          {/* Price tag */}
          <motion.div
            className="price"
            initial={skip ? false : { scale: 0, rotate: -40, opacity: 0 }}
            animate={skip ? {} : { scale: 1, rotate: -6, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: BACK_EASE }}
          >
            <small>Pump 3D Ripped</small>
            <b>$ 40.500</b>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
