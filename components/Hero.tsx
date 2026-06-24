"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-brand-black overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,39,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(201,162,39,0.05)_0%,_transparent_50%)]" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent via-brand-gold/30 to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-2 border-brand-gold/30 shadow-[0_0_40px_rgba(201,162,39,0.15)]">
              <Image
                src="/images/NDSocial/logoAV.jpeg"
                alt="A&V Suplementos"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Brand name */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-4">
            <span className="text-gradient-gold">A&V</span>{" "}
            <span className="text-brand-light">SUPLEMENTOS</span>
          </h1>

          {/* Gold divider */}
          <div className="w-24 h-0.5 mx-auto my-6 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

          {/* Headline */}
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-light mb-3">
            Tu mejor versión{" "}
            <span className="text-gradient-gold">empieza acá</span>
          </p>
          <p className="text-brand-silver-dark text-base sm:text-lg max-w-xl mx-auto mb-10">
            Suplementos deportivos originales con asesoramiento personalizado
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#tienda"
            className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-bold px-8 py-3.5 rounded-full transition-colors text-base"
          >
            Ver productos
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 border-2 border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-bold px-8 py-3.5 rounded-full transition-colors text-base"
          >
            Contacto
          </a>
        </motion.div>
      </div>
    </section>
  );
}
