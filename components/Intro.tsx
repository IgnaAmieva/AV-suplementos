"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0); // 0=bar, 1=plates, 2=logo, 3=exit
  const reducedMotion = useReducedMotion();

  const dismiss = useCallback(() => {
    if (!visible) return;
    setPhase(3);
    setTimeout(() => {
      setVisible(false);
      onDone();
    }, 600);
  }, [visible, onDone]);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false);
      onDone();
      return;
    }
    // Auto-sequence: bar -> plates -> logo -> wait -> exit
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => dismiss(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [reducedMotion, onDone, dismiss]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] bg-brand-black grid place-items-center cursor-pointer overflow-hidden"
          onClick={dismiss}
          exit={{ clipPath: "inset(50% 0 50% 0)" }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="relative w-[min(560px,92vw)]" style={{ aspectRatio: "2/1" }}>
            {/* Barbell SVG */}
            <svg viewBox="0 0 560 280" className="absolute inset-0 w-full h-full overflow-visible">
              {/* Bar */}
              <motion.line
                x1="20" y1="140" x2="540" y2="140"
                stroke="#C9C9C9" strokeWidth="9" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {/* Left plate */}
              <motion.g
                initial={{ x: -320 }}
                animate={{ x: phase >= 1 ? 0 : -320 }}
                transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <rect x="78" y="40" width="34" height="200" rx="8" fill="#C9A227" />
                <rect x="114" y="62" width="22" height="156" rx="6" fill="#8f7319" />
              </motion.g>
              {/* Right plate */}
              <motion.g
                initial={{ x: 320 }}
                animate={{ x: phase >= 1 ? 0 : 320 }}
                transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <rect x="448" y="40" width="34" height="200" rx="8" fill="#C9A227" />
                <rect x="424" y="62" width="22" height="156" rx="6" fill="#8f7319" />
              </motion.g>
            </svg>

            {/* Logo */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, rotateX: -90, y: -40 }}
              animate={phase >= 2 ? { opacity: 1, rotateX: 0, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/images/NDSocial/logoAV.jpeg"
                alt="A&V Suplementos"
                width={260}
                height={260}
                className="rounded-full"
                priority
              />
            </motion.div>
          </div>

          <div className="absolute bottom-[calc(22px+env(safe-area-inset-bottom,0px))] left-0 right-0 text-center text-xs tracking-[0.25em] uppercase text-brand-mute">
            toc&aacute; para entrar
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
