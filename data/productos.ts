export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  image: string;
  marca: string;
  sabores?: string[];
}

export interface Categoria {
  slug: string;
  nombre: string;
}

export const categorias: Categoria[] = [
  { slug: "creatinas", nombre: "Creatinas" },
  { slug: "proteinas", nombre: "Proteínas" },
  { slug: "preentreno", nombre: "Pre-Entreno" },
  { slug: "colageno", nombre: "Colágeno" },
  { slug: "aminoacidos", nombre: "Aminoácidos" },
  { slug: "shakers", nombre: "Shakers" },
  { slug: "hidratantes", nombre: "Hidratantes" },
  { slug: "combos", nombre: "Combos" },
];

export const productos: Producto[] = [
  // ── Creatinas ──
  {
    id: "crea-150-star",
    nombre: "Creatina 150g",
    precio: 16000,
    categoria: "creatinas",
    image: "/images/creatinas/crea-150-star.webp",
    marca: "Star Nutrition",
  },
  {
    id: "crea-300-pote-star",
    nombre: "Creatina 300g Pote",
    precio: 26000,
    categoria: "creatinas",
    image: "/images/creatinas/crea-300-pote-star.webp",
    marca: "Star Nutrition",
  },
  {
    id: "crea-500-star",
    nombre: "Creatina 500g",
    precio: 41500,
    categoria: "creatinas",
    image: "/images/creatinas/crea-500-star.jpeg",
    marca: "Star Nutrition",
  },
  {
    id: "crea-1kg-star",
    nombre: "Creatina 1kg",
    precio: 75500,
    categoria: "creatinas",
    image: "/images/creatinas/crea-1kg-star.jpeg",
    marca: "Star Nutrition",
  },
  {
    id: "crea-300-optimun",
    nombre: "Creatina 300g Optimum",
    precio: 36000,
    categoria: "creatinas",
    image: "/images/creatinas/crea-300-optimun.webp",
    marca: "Optimum Nutrition",
  },
  {
    id: "crea-309-bsn",
    nombre: "Creatina BSN 309g",
    precio: 36000,
    categoria: "creatinas",
    image: "/images/creatinas/crea-309-bsn.webp",
    marca: "BSN",
  },

  // ── Proteínas ──
  {
    id: "whey-doypack-2lb-star",
    nombre: "Whey Protein Doypack 2 lbs",
    precio: 66000,
    categoria: "proteinas",
    image: "/images/proteinas/whey-doypack-2lb-star.jpeg",
    marca: "Star Nutrition",
    sabores: ["Cookies and Cream", "Chocolate", "Vainilla", "Frutilla"],
  },
  {
    id: "whey-platinum-3kg",
    nombre: "Whey Protein Platinum 3kg",
    precio: 217000,
    categoria: "proteinas",
    image: "/images/proteinas/whey-platinum-3kg.jpeg",
    marca: "Star Nutrition",
    sabores: ["Cookies and Cream", "Chocolate", "Vainilla", "Frutilla"],
  },
  {
    id: "syntha6-14lbs-bsn",
    nombre: "Syntha-6 1,4 lbs",
    precio: 77500,
    categoria: "proteinas",
    image: "/images/proteinas/syntha6-14lbs-bsn.webp",
    marca: "BSN",
    sabores: ["Chocolate", "Vainilla"],
  },
  {
    id: "whey-syntha6-edge-23lbs",
    nombre: "Syntha-6 Edge 2,3 lbs",
    precio: 129500,
    categoria: "proteinas",
    image: "/images/proteinas/whey-syntha6-edge-23lbs.webp",
    marca: "BSN",
    sabores: ["Chocolate", "Vainilla"],
  },
  {
    id: "whey-syntha6-5lb-bsn",
    nombre: "Syntha-6 5 lbs",
    precio: 157000,
    categoria: "proteinas",
    image: "/images/proteinas/whey-syntha6-5lb-bsn.webp",
    marca: "BSN",
    sabores: ["Chocolate", "Vainilla"],
  },

  // ── Pre-Entreno ──
  {
    id: "pump-3d-ripped-315g",
    nombre: "Pump 3D Ripped 315g",
    precio: 38500,
    categoria: "preentreno",
    image: "/images/preentreno/pump-3d-ripped-315g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "tnt-dynamite-240g",
    nombre: "TNT Dynamite 240g",
    precio: 22500,
    categoria: "preentreno",
    image: "/images/preentreno/tnt-dynamite-240g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "pump-v8-285g",
    nombre: "Pump V8 285g",
    precio: 30000,
    categoria: "preentreno",
    image: "/images/preentreno/pump-v8-285g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "cafeina-200mg-30caps",
    nombre: "Cafeína 200mg x30 Caps",
    precio: 8500,
    categoria: "preentreno",
    image: "/images/preentreno/cafeina-200mg-30caps.webp",
    marca: "Star Nutrition",
  },

  // ── Colágeno ──
  {
    id: "colageno-210g-frutos-rojos",
    nombre: "Colágeno Hidrolizado 210g Frutos Rojos",
    precio: 17000,
    categoria: "colageno",
    image: "/images/colageno/colageno-210g-frutos-rojos.png",
    marca: "Star Nutrition",
  },
  {
    id: "colageno-210g-limon",
    nombre: "Colágeno Hidrolizado 210g Limón",
    precio: 17000,
    categoria: "colageno",
    image: "/images/colageno/colageno-210g-limon.webp",
    marca: "Star Nutrition",
  },
  {
    id: "resveratrol-500-60caps",
    nombre: "Resveratrol 500 x60 Caps",
    precio: 20000,
    categoria: "colageno",
    image: "/images/colageno/resveratrol-500-60caps.webp",
    marca: "Star Nutrition",
  },

  // ── Aminoácidos ──
  {
    id: "amino-energy-270g-optimun",
    nombre: "Amino Energy 270g",
    precio: 62000,
    categoria: "aminoacidos",
    image: "/images/aminoacidos/amino-energy-270g-optimun.png",
    marca: "Optimum Nutrition",
  },
  {
    id: "mtor-bcaa-270g",
    nombre: "MTOR BCAA 270g",
    precio: 28000,
    categoria: "aminoacidos",
    image: "/images/aminoacidos/mtor-bcaa-270g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "eaa-essential-360g-limon",
    nombre: "EAA Essential Aminos 360g Limón",
    precio: 39000,
    categoria: "aminoacidos",
    image: "/images/aminoacidos/eaa-essential-360g-limon.png",
    marca: "Star Nutrition",
  },
  {
    id: "l-glutamina-300g",
    nombre: "L-Glutamina 300g",
    precio: 32500,
    categoria: "aminoacidos",
    image: "/images/aminoacidos/l-glutamina-300g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "beta-alanina-300g",
    nombre: "Beta Alanina 300g",
    precio: 27000,
    categoria: "aminoacidos",
    image: "/images/aminoacidos/beta-alanina-300g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "citrulina-malate-300g",
    nombre: "Citrulina Malate 300g",
    precio: 57000,
    categoria: "aminoacidos",
    image: "/images/aminoacidos/citrulina-malate-300g.webp",
    marca: "Star Nutrition",
  },

  // ── Shakers ──
  {
    id: "shaker-everlast-700ml",
    nombre: "Shaker Everlast 700ml",
    precio: 17000,
    categoria: "shakers",
    image: "/images/shakers/shaker-everlast-700ml.webp",
    marca: "Everlast",
  },

  // ── Hidratantes ──
  {
    id: "just-carbs-1kg-star",
    nombre: "Just Carbs 1kg",
    precio: 20000,
    categoria: "hidratantes",
    image: "/images/hidratantes/just-carbs-1kg-star.png",
    marca: "Star Nutrition",
  },
  {
    id: "hydroplus-endurance-700g",
    nombre: "Hydroplus Endurance 700g",
    precio: 20500,
    categoria: "hidratantes",
    image: "/images/hidratantes/hydroplus-endurance-700g.webp",
    marca: "Star Nutrition",
  },

  // ── Combos ──
  {
    id: "combo-proteina-crea-150",
    nombre: "Proteína Star 1kg + Creatina Star 150gr",
    precio: 77000,
    categoria: "combos",
    image: "/images/combos/proteina-crea-150.webp",
    marca: "Star Nutrition",
  },
  {
    id: "combo-proteina-crea-300",
    nombre: "Proteína Star 1kg + Creatina Star 300gr",
    precio: 85000,
    categoria: "combos",
    image: "/images/combos/proteina-crea-300.webp",
    marca: "Star Nutrition",
  },
  {
    id: "combo-proteina-crea-1kg",
    nombre: "Proteína Star 1kg + Creatina Star 1kg",
    precio: 133000,
    categoria: "combos",
    image: "/images/combos/proteina-crea-1kg.webp",
    marca: "Star Nutrition",
  },
];

export function productosPorCategoria(slug: string): Producto[] {
  return productos.filter((p) => p.categoria === slug);
}
