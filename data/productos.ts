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
  { slug: "pancakes-keto", nombre: "Pancakes & Keto" },
  { slug: "energia", nombre: "Geles y Energía" },
  { slug: "varios", nombre: "Varios" },
  { slug: "indumentaria", nombre: "Indumentaria" },
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
    nombre: "Creatina 300g Doy Pack",
    precio: 26000,
    categoria: "creatinas",
    image: "/images/creatinas/crea-300-pote-star.png",
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
    precio: 39000,
    categoria: "creatinas",
    image: "/images/creatinas/crea-309-bsn.webp",
    marca: "BSN",
  },

  // ── Proteínas ──
  {
    id: "whey-doypack-2lb-star",
    nombre: "Proteína Star 1kg Star Nutrition",
    precio: 94500,
    categoria: "proteinas",
    image: "/images/proteinas/whey-doypack-2lb-star.jpeg",
    marca: "Star Nutrition",
    sabores: ["Cookies and Cream", "Chocolate", "Vainilla", "Frutilla"],
  },
  {
    id: "whey-platinum-3kg",
    nombre: "Whey Protein Platinum 3kg",
    precio: 304000,
    categoria: "proteinas",
    image: "/images/proteinas/whey-platinum-3kg.jpeg",
    marca: "Star Nutrition",
    sabores: ["Cookies and Cream", "Chocolate", "Vainilla", "Frutilla"],
  },
  {
    id: "syntha6-14lbs-bsn",
    nombre: "Syntha-6 1,4 lbs",
    precio: 110500,
    categoria: "proteinas",
    image: "/images/proteinas/syntha6-14lbs-bsn.webp",
    marca: "BSN",
    sabores: ["Chocolate", "Vainilla"],
  },
  {
    id: "whey-syntha6-edge-23lbs",
    nombre: "Syntha-6 Edge 2,3 lbs",
    precio: 182500,
    categoria: "proteinas",
    image: "/images/proteinas/whey-syntha6-edge-23lbs.webp",
    marca: "BSN",
    sabores: ["Chocolate", "Vainilla"],
  },
  {
    id: "whey-syntha6-5lb-bsn",
    nombre: "Syntha-6 5 lbs",
    precio: 302500,
    categoria: "proteinas",
    image: "/images/proteinas/whey-syntha6-5lb-bsn.webp",
    marca: "BSN",
    sabores: ["Chocolate", "Vainilla"],
  },
  {
    id: "whey-gold-standard-15lbs-optimum",
    nombre: "Whey Gold Standard 1.5 Lbs",
    precio: 114000,
    categoria: "proteinas",
    image: "/images/proteinas/whey-gold-standard-15lbs-optimum.webp",
    marca: "Optimum Nutrition",
  },
  {
    id: "whey-gourmet-series-optimum",
    nombre: "Whey Gourmet Series",
    precio: 152500,
    categoria: "proteinas",
    image: "/images/proteinas/whey-gourmet-series-optimum.webp",
    marca: "Optimum Nutrition",
  },
  {
    id: "whey-protein-2lb-gold",
    nombre: "Whey Protein 2 Lb",
    precio: 79000,
    categoria: "proteinas",
    image: "/images/proteinas/whey-protein-2lb-gold.webp",
    marca: "Gold Nutrition",
  },
  {
    id: "mutant-mass-15kg-star",
    nombre: "Mutant Mass Doy Pack 1.5kg",
    precio: 68000,
    categoria: "proteinas",
    image: "/images/proteinas/mutant-mass-15kg-star.webp",
    marca: "Star Nutrition",
  },

  // ── Pre-Entreno ──
  {
    id: "pump-3d-ripped-315g",
    nombre: "Pump 3D Ripped 315g",
    precio: 40500,
    categoria: "preentreno",
    image: "/images/preentreno/pump-3d-ripped-315g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "tnt-dynamite-240g",
    nombre: "TNT Dynamite 240g",
    precio: 24000,
    categoria: "preentreno",
    image: "/images/preentreno/tnt-dynamite-240g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "pump-v8-285g",
    nombre: "Pump V8 285g",
    precio: 32000,
    categoria: "preentreno",
    image: "/images/preentreno/pump-v8-285g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "cafeina-200mg-30caps",
    nombre: "Cafeína 200mg x30 Caps",
    precio: 9500,
    categoria: "preentreno",
    image: "/images/preentreno/cafeina-200mg-30caps.webp",
    marca: "Star Nutrition",
  },

  // ── Colágeno ──
  {
    id: "colageno-210g-frutos-rojos",
    nombre: "Colágeno Hidrolizado 210g Frutos Rojos",
    precio: 22000,
    categoria: "colageno",
    image: "/images/colageno/colageno-210g-frutos-rojos.png",
    marca: "Star Nutrition",
  },
  {
    id: "colageno-210g-limon",
    nombre: "Colágeno Hidrolizado 210g Limón",
    precio: 22000,
    categoria: "colageno",
    image: "/images/colageno/colageno-210g-limon.webp",
    marca: "Star Nutrition",
  },
  {
    id: "resveratrol-500-60caps",
    nombre: "Resveratrol 500 x60 Caps",
    precio: 21000,
    categoria: "colageno",
    image: "/images/colageno/resveratrol-500-60caps.webp",
    marca: "Star Nutrition",
  },

  // ── Aminoácidos ──
  {
    id: "amino-energy-270g-optimun",
    nombre: "Amino Energy 270g",
    precio: 78000,
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
    precio: 42000,
    categoria: "aminoacidos",
    image: "/images/aminoacidos/eaa-essential-360g-limon.png",
    marca: "Star Nutrition",
  },
  {
    id: "l-glutamina-300g",
    nombre: "L-Glutamina 300g",
    precio: 33000,
    categoria: "aminoacidos",
    image: "/images/aminoacidos/l-glutamina-300g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "beta-alanina-300g",
    nombre: "Beta Alanina 300g",
    precio: 31000,
    categoria: "aminoacidos",
    image: "/images/aminoacidos/beta-alanina-300g.webp",
    marca: "Star Nutrition",
  },
  {
    id: "citrulina-malate-300g",
    nombre: "Citrulina Malate 300g",
    precio: 63000,
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
  {
    id: "shaker-everlast-610ml",
    nombre: "Shaker Everlast 610ml",
    precio: 20000,
    categoria: "shakers",
    image: "/images/shakers/shaker-everlast-610ml.webp",
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
    precio: 106000,
    categoria: "combos",
    image: "/images/combos/proteina-crea-150.webp",
    marca: "Star Nutrition",
  },
  {
    id: "combo-proteina-crea-300",
    nombre: "Proteína Star 1kg + Creatina Star 300gr",
    precio: 116000,
    categoria: "combos",
    image: "/images/combos/proteina-crea-300.webp",
    marca: "Star Nutrition",
  },
  {
    id: "combo-proteina-crea-1kg",
    nombre: "Proteína Star 1kg + Creatina Star 1kg",
    precio: 164000,
    categoria: "combos",
    image: "/images/combos/proteina-crea-1kg.webp",
    marca: "Star Nutrition",
  },
  {
    id: "combo-remera-crea-300",
    nombre: "Remera A&V + Creatina 300g",
    precio: 50000,
    categoria: "combos",
    image: "/images/combos/remera-creatina-300g.webp",
    marca: "A&V Suplementos",
  },
  {
    id: "combo-remera-crea-150",
    nombre: "Remera A&V + Creatina 150g",
    precio: 42000,
    categoria: "combos",
    image: "/images/combos/remera-creatina-150g.webp", // TODO: foto combo 150g
    marca: "A&V Suplementos",
  },
  {
    id: "combo-remera-shaker",
    nombre: "Remera A&V + Shaker Everlast 610ml",
    precio: 37500,
    categoria: "combos",
    image: "/images/combos/remera-shaker-610ml.webp",
    marca: "A&V Suplementos",
  },

  // ── Geles y Energía ──
  {
    id: "gel-mervick-suelto",
    nombre: "Gel Race Mervick Repositor Energético Running Gym",
    precio: 2500,
    categoria: "energia",
    image: "/images/varios/gel-mervick-suelto.webp",
    marca: "Mervick",
    sabores: ["Frutos Rojos", "Limón"],
  },
  {
    id: "gel-mervick-pack-12",
    nombre: "Gel Race Mervick Repositor Energético Running Gym Pack x12",
    precio: 27600,
    categoria: "energia",
    image: "/images/varios/gel-mervick-pack-12.webp",
    marca: "Mervick",
    sabores: ["Frutos Rojos", "Limón"],
  },

  {
    id: "ei45-maltodextrina-fructosa-x12u",
    nombre: "Ei45 Maltodextrina Fructosa 1-0.8 Sabor Neutro Caja x12u",
    precio: 24500,
    categoria: "energia",
    image: "/images/energia/ei45-maltodextrina-fructosa-x12u.webp",
    marca: "Ei",
  },
  {
    id: "gel-ei-energetico-cafeina-x6u",
    nombre: "Gel Ei Energético con Cafeína x6u",
    precio: 34000,
    categoria: "energia",
    image: "/images/energia/gel-ei-energetico-cafeina-x6u.webp",
    marca: "Ei",
  },
  {
    id: "gel-ei50-maltodextrina-fructosa-x6u",
    nombre: "Gel Ei50 Maltodextrina Fructosa Caja x6u",
    precio: 34000,
    categoria: "energia",
    image: "/images/energia/gel-ei50-maltodextrina-fructosa-x6u.webp",
    marca: "Ei",
  },

  // ── Pancakes & Keto ──
  {
    id: "keto-cupcakes-chocolate",
    nombre: "Keto Cupcakes Chocolate Granger",
    precio: 14500,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/keto-cupcakes-chocolate.png",
    marca: "Granger",
  },
  {
    id: "cupcakes-proteicos-vainilla-limon",
    nombre: "Cupcakes Proteicos Vainilla Limón con Chips Granger",
    precio: 16000,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/cupcakes-proteicos-vainilla-limon.png",
    marca: "Granger",
  },
  {
    id: "keto-cupcakes-vainilla",
    nombre: "Keto Cupcakes Vainilla Granger",
    precio: 14500,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/keto-cupcakes-vainilla.png",
    marca: "Granger",
  },
  {
    id: "keto-pancakes-chocolate",
    nombre: "Keto Pancakes Chocolate 200g Granger",
    precio: 14500,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/keto-pancakes-chocolate.webp",
    marca: "Granger",
  },
  {
    id: "keto-pancakes-vainilla",
    nombre: "Keto Pancakes Vainilla 200g Granger",
    precio: 14500,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/keto-pancakes-vainilla.png",
    marca: "Granger",
  },
  {
    id: "pancakes-proteicos-jalapeno-limon",
    nombre: "Pancakes Proteicos 300g Jalapeño y Limón Granger",
    precio: 16000,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/pancakes-proteicos-jalapeno-limon.png",
    marca: "Granger",
  },
  {
    id: "cupcakes-proteicos-360g",
    nombre: "Cupcakes Proteicos 360g Granger",
    precio: 16000,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/cupcakes-proteicos-360g.png",
    marca: "Granger",
  },
  {
    id: "pancakes-proteicos-chocolate-vainilla",
    nombre: "Pancakes Proteicos 400g Chocolate y Vainilla Granger",
    precio: 16000,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/pancakes-proteicos-chocolate-vainilla.png",
    marca: "Granger",
    sabores: ["Chocolate", "Vainilla"],
  },
  {
    id: "pancakes-proteicos-caprese",
    nombre: "Pancakes Proteicos Caprese 300g Granger",
    precio: 16000,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/pancakes-proteicos-caprese.png",
    marca: "Granger",
  },
  {
    id: "pancakes-proteicos-queso",
    nombre: "Pancakes Proteicos Salados Sabor Queso Granger",
    precio: 16000,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/pancakes-proteicos-queso.webp",
    marca: "Granger",
  },
  {
    id: "pancakes-proteicos-dulce-leche",
    nombre: "Pancakes Proteicos 300g Dulce de Leche Granger",
    precio: 16000,
    categoria: "pancakes-keto",
    image: "/images/pancakes-keto/pancakes-proteicos-dulce-leche.png",
    marca: "Granger",
  },

  // ── Creatinas (Gold Nutrition) ──
  {
    id: "crea-300-gold",
    nombre: "Creatina 300g",
    precio: 26000,
    categoria: "creatinas",
    image: "/images/creatinas/creatina-300g-gold.webp",
    marca: "Gold Nutrition",
  },

  // ── Colágeno ──
  {
    id: "colageno-plus-360g-star",
    nombre: "Colágeno Plus 360g",
    precio: 26000,
    categoria: "colageno",
    image: "/images/colageno/colageno-plus-360g-star.webp",
    marca: "Star Nutrition",
  },

  // ── Proteínas ──
  {
    id: "just-whey-2lb-sin-sabor-star",
    nombre: "Just Whey 2 Lb Sin Sabor",
    precio: 102000,
    categoria: "proteinas",
    image: "/images/proteinas/just-whey-2lb-sin-sabor-star.webp",
    marca: "Star Nutrition",
  },

  // ── Varios ──
  {
    id: "citrato-magnesio-500g-star",
    nombre: "Citrato de Magnesio 500g Neutro",
    precio: 30000,
    categoria: "varios",
    image: "/images/varios/citrato-magnesio-500g-star.webp",
    marca: "Star Nutrition",
  },
  {
    id: "citrato-magnesio-60cap-star",
    nombre: "Citrato de Magnesio x60 Caps",
    precio: 14000,
    categoria: "varios",
    image: "/images/varios/citrato-magnesio-60cap-star.webp",
    marca: "Star Nutrition",
  },
  {
    id: "omega3-fish-oil-30cap-gold",
    nombre: "Omega 3 Fish Oil x30 Caps",
    precio: 28500,
    categoria: "varios",
    image: "/images/varios/omega3-fish-oil-30cap-gold.webp",
    marca: "Gold Nutrition",
  },
  {
    id: "omega3-fish-oil-60cap-star",
    nombre: "Omega 3 Fish Oil x60 Caps",
    precio: 32500,
    categoria: "varios",
    image: "/images/varios/omega3-fish-oil-60cap-star.webp",
    marca: "Star Nutrition",
  },

  // ── Indumentaria ──
  {
    id: "remera-av",
    nombre: "Remera A&V",
    precio: 30000,
    categoria: "indumentaria",
    image: "/images/indumentaria/remera-av.webp",
    marca: "A&V Suplementos",
  },
];

export function productosPorCategoria(slug: string): Producto[] {
  return productos.filter((p) => p.categoria === slug);
}
