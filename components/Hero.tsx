"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  TouchEvent as ReactTouchEvent,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

/* ── Featured products for the carousel ── */
const HERO_PRODUCTS = [
  {
    id: "whey-gold-standard-15lbs-optimum",
    name: "Whey Gold Standard 1.5 Lbs",
    price: 114000,
    image: "/images/hero/whey-gold-standard-hero.webp",
    category: "proteinas",
  },
  {
    id: "crea-300-optimun",
    name: "Creatina 300g Optimum",
    price: 36000,
    image: "/images/hero/crea-300-optimun-hero.webp",
    category: "creatinas",
  },
  {
    id: "pump-3d-ripped-315g",
    name: "Pump 3D Ripped 315g",
    price: 40500,
    image: "/images/hero/pump-3d-ripped-hero.webp",
    category: "preentreno",
  },
  {
    id: "amino-energy-270g-optimun",
    name: "Amino Energy 270g",
    price: 78000,
    image: "/images/hero/amino-energy-hero.webp",
    category: "aminoacidos",
  },
  {
    id: "crea-309-bsn",
    name: "Creatina BSN 309g",
    price: 39000,
    image: "/images/hero/crea-309-bsn-hero.webp",
    category: "creatinas",
  },
];

const INTERVAL = 3500;

function WordReveal({
  word,
  index,
  gold,
}: {
  word: string;
  index: number;
  gold?: boolean;
}) {
  return (
    <motion.span
      initial={{ y: "110%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`inline-block ${gold ? "text-brand-gold" : ""}`}
    >
      {word}
    </motion.span>
  );
}

/* ── Magnetic button (pointer:fine only) ── */
function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el || !window.matchMedia("(pointer: fine)").matches) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-bold px-8 py-3.5 sm:px-10 sm:py-4 rounded-full transition-colors text-sm sm:text-base uppercase tracking-wider font-[family-name:var(--font-display)] min-h-[48px]"
    >
      {children}
    </motion.a>
  );
}

/* ── Slide variants (mobile: simpler, no rotation) ── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    scale: 0.92,
    opacity: 0,
  }),
  center: { x: 0, scale: 1, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    scale: 0.92,
    opacity: 0,
  }),
};

const slideVariantsDesktop = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    scale: 0.85,
    rotate: dir > 0 ? 8 : -8,
    opacity: 0,
  }),
  center: { x: 0, scale: 1, rotate: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    scale: 0.85,
    rotate: dir > 0 ? -8 : 8,
    opacity: 0,
  }),
};

/* ── Main Hero ── */
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const reducedMotion = useReducedMotion();
  const touchStartX = useRef(0);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const productY = useTransform(scrollYProgress, [0, 1], [0, isDesktop ? -80 : 0]);
  const productScale = useTransform(scrollYProgress, [0, 1], [1, isDesktop ? 0.9 : 1]);

  const product = HERO_PRODUCTS[current];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % HERO_PRODUCTS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused, reducedMotion]);

  useEffect(() => {
    const handler = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  const onTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: ReactTouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) {
      setDirection(1);
      setCurrent((c) => (c + 1) % HERO_PRODUCTS.length);
    } else {
      setDirection(-1);
      setCurrent((c) => (c - 1 + HERO_PRODUCTS.length) % HERO_PRODUCTS.length);
    }
  };

  const handleProductClick = () => {
    const tienda = document.getElementById("tienda");
    if (tienda) tienda.scrollIntoView({ behavior: "smooth" });
  };

  const activeVariants = isDesktop ? slideVariantsDesktop : slideVariants;
  let wordIdx = 0;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center bg-brand-black overflow-hidden"
    >
      {/* Preload only the first hero image; others load after interaction */}
      <link rel="preload" as="image" href={HERO_PRODUCTS[0].image} />

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(201,162,39,0.06)_0%,_transparent_60%)]" />
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-brand-gold/20 to-transparent ml-[10%] hidden lg:block" />

      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden relative z-10 w-full px-4 sm:px-6 min-h-[85svh] flex items-center justify-center py-24">
        <div className="flex flex-col items-center w-full gap-3">
          {/* 1. Eyebrow + Title — static for LCP, no opacity:0 */}
          <div className="text-center">
            <p className="text-brand-gold text-xs tracking-[0.25em] uppercase font-semibold mb-2">
              Suplementos deportivos originales
            </p>

            <h1 className="heading-display text-[clamp(2rem,9vw,4rem)]">
              TU MEJOR
              <br />
              VERSIÓN
              <br />
              <span className="text-brand-gold">EMPIEZA ACÁ</span>
            </h1>
          </div>

          {/* 2. Product with glow */}
          <div
            className="relative flex items-center justify-center w-full"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Gold glow */}
            <motion.div
              key={`glow-m-${current}`}
              initial={{ opacity: 0.2, scale: 0.5 }}
              animate={{ opacity: 0.5, scale: 0.6 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute w-[70%] aspect-square rounded-full bg-brand-gold/8 blur-3xl"
            />

            {/* Product image */}
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-square">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={product.id}
                  custom={direction}
                  variants={reducedMotion ? undefined : activeVariants}
                  initial={reducedMotion ? { opacity: 0 } : "enter"}
                  animate={reducedMotion ? { opacity: 1 } : "center"}
                  exit={reducedMotion ? { opacity: 0 } : "exit"}
                  transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-[0_0_30px_rgba(201,162,39,0.12)]"
                    sizes="340px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 3. Chip: name + price + indicators */}
          <div className="flex flex-col items-center gap-2.5 -mt-1">
            <AnimatePresence mode="wait">
              <motion.button
                key={`chip-${current}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={handleProductClick}
                className="bg-brand-dark/80 backdrop-blur-sm border border-brand-gold/20 rounded-xl px-4 py-2 text-center min-h-[44px] flex items-center gap-3"
              >
                <p className="text-brand-light text-xs font-semibold leading-tight">
                  {product.name}
                </p>
                <p className="text-brand-gold font-extrabold text-base font-[family-name:var(--font-display)]">
                  ${product.price.toLocaleString("es-AR")}
                </p>
              </motion.button>
            </AnimatePresence>

            {/* Indicators */}
            <div className="flex gap-1.5">
              {HERO_PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Producto ${i + 1}`}
                  className="p-1 min-w-[28px] min-h-[28px] flex items-center justify-center"
                >
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 bg-brand-gold"
                        : "w-2 bg-brand-silver-dark/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 4. Buttons side by side */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
            className="flex items-center justify-center gap-3"
          >
            <a
              href="#tienda"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-brand-black font-bold px-7 py-3 rounded-full transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] min-h-[48px]"
            >
              Ver tienda
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 border-2 border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 font-bold px-6 py-3 rounded-full transition-colors text-sm uppercase tracking-wider font-[family-name:var(--font-display)] min-h-[48px]"
            >
              Contacto
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (unchanged) ── */}
      <div className="hidden lg:block relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="flex flex-row items-center gap-12 min-h-screen">
          {/* Text */}
          <div className="flex-1 text-left">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-brand-gold text-sm tracking-[0.3em] uppercase font-semibold mb-6"
            >
              Suplementos deportivos originales
            </motion.p>

            <h1 className="heading-display text-8xl xl:text-9xl mb-8 overflow-hidden">
              <span className="flex flex-wrap gap-x-4">
                {["TU", "MEJOR"].map((w) => (
                  <span key={w} className="overflow-hidden">
                    <WordReveal word={w} index={wordIdx++} />
                  </span>
                ))}
              </span>
              <span className="flex flex-wrap gap-x-4">
                <span className="overflow-hidden">
                  <WordReveal word="VERSIÓN" index={wordIdx++} />
                </span>
              </span>
              <span className="flex flex-wrap gap-x-4">
                {["EMPIEZA", "ACÁ"].map((w) => (
                  <span key={w} className="overflow-hidden">
                    <WordReveal word={w} index={wordIdx++} gold />
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-brand-silver-dark text-lg max-w-md mb-10"
            >
              Asesoramiento personalizado y envíos a todo el país.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <MagneticButton href="#tienda">Ver tienda</MagneticButton>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 border-2 border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 font-bold px-8 py-3.5 rounded-full transition-colors text-base uppercase tracking-wider font-[family-name:var(--font-display)] min-h-[48px]"
              >
                Contacto
              </a>
            </motion.div>
          </div>

          {/* Product carousel */}
          <motion.div
            style={{ y: productY, scale: productScale }}
            className="relative w-[28rem] h-[28rem] xl:w-[32rem] xl:h-[32rem] flex-shrink-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              key={`glow-${current}`}
              initial={{ opacity: 0.3, scale: 0.6 }}
              animate={{ opacity: 1, scale: 0.75 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-brand-gold/10 blur-3xl"
            />

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={product.id}
                custom={direction}
                variants={reducedMotion ? undefined : slideVariantsDesktop}
                initial={reducedMotion ? { opacity: 0 } : "enter"}
                animate={reducedMotion ? { opacity: 1 } : "center"}
                exit={reducedMotion ? { opacity: 0 } : "exit"}
                transition={{ duration: reducedMotion ? 0.15 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(201,162,39,0.15)]"
                  sizes="512px"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.button
                key={`info-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                onClick={handleProductClick}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brand-dark/90 backdrop-blur-sm border border-brand-gold/20 rounded-xl px-5 py-3 text-center hover:border-brand-gold/50 transition-colors cursor-pointer whitespace-nowrap"
              >
                <p className="text-brand-light text-sm font-bold truncate">
                  {product.name}
                </p>
                <p className="text-brand-gold font-extrabold text-lg font-[family-name:var(--font-display)]">
                  ${product.price.toLocaleString("es-AR")}
                </p>
              </motion.button>
            </AnimatePresence>

            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex gap-2">
              {HERO_PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Producto ${i + 1}`}
                  className="group p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-brand-gold"
                        : "w-3 bg-brand-silver-dark/40 group-hover:bg-brand-silver-dark"
                    }`}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Diagonal bottom cut */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-brand-dark diagonal-top" />
    </section>
  );
}
