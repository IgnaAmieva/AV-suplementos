"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MessageCircle } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function NDSocial() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 lg:py-28 bg-brand-black border-t border-brand-gold/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="flex flex-col items-center gap-6">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-brand-silver-dark/50 text-xs sm:text-sm tracking-[0.2em] uppercase"
          >
            Sitio diseñado y desarrollado por
          </motion.p>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden group cursor-default shadow-[0_0_40px_rgba(192,192,192,0.08)]"
          >
            <Image
              src="/images/NDSocial/NDSocial-20.png"
              alt="NDSocial"
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
            {/* Glow ring on hover */}
            <div className="absolute inset-0 rounded-full ring-1 ring-brand-silver/10 group-hover:ring-brand-silver/25 transition-all duration-500" />
          </motion.div>

          {/* Name */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-brand-light text-3xl sm:text-4xl font-bold tracking-wide"
          >
            NDSocial
          </motion.h3>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="text-brand-silver-dark text-sm sm:text-base"
          >
            Agencia de Marketing Digital
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="w-16 gold-divider"
          />

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            className="flex items-center gap-5"
          >
            <a
              href="https://wa.me/5492622465311"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-silver/70 hover:text-[#25D366] transition-colors text-sm font-medium"
              aria-label="WhatsApp NDSocial"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <span className="text-brand-silver-dark/20 text-lg">|</span>
            <a
              href="https://instagram.com/NDSocial_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-silver/70 hover:text-brand-gold transition-colors text-sm font-medium"
              aria-label="Instagram NDSocial"
            >
              <InstagramIcon size={18} />
              @NDSocial_
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
