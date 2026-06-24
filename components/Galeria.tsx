"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { productos } from "@/data/productos";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pick a few products with images for the gallery mosaic
const GALLERY_ITEMS = [
  { src: productos.find((p) => p.id === "whey-platinum-3kg")!.image, alt: "Whey Protein Platinum 3kg", span: "md:col-span-2 md:row-span-2" },
  { src: productos.find((p) => p.id === "crea-300-pote-star")!.image, alt: "Creatina 300g Pote" },
  { src: productos.find((p) => p.id === "pump-3d-ripped-315g")!.image, alt: "Pump 3D Ripped 315g" },
  { src: productos.find((p) => p.id === "amino-energy-270g-optimun")!.image, alt: "Amino Energy 270g" },
  { src: productos.find((p) => p.id === "colageno-210g-frutos-rojos")!.image, alt: "Colágeno Frutos Rojos" },
  { src: productos.find((p) => p.id === "whey-syntha6-5lb-bsn")!.image, alt: "Syntha-6 5 lbs", span: "md:col-span-2" },
];

export default function Galeria() {
  return (
    <section id="galeria" className="py-24 lg:py-32 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-brand-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
              Galería
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold">
              Nuestras{" "}
              <span className="text-gradient-gold">marcas</span>
            </h2>
            <div className="w-16 mx-auto mt-4 gold-divider" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <FadeIn
              key={item.src}
              delay={i * 0.08}
              className={item.span || ""}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden group bg-brand-black border border-brand-gold/10">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Gold overlay on hover */}
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors duration-300" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
