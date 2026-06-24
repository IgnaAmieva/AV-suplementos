"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Productos from "@/components/Productos";
import Nosotros from "@/components/Nosotros";
import Tienda from "@/components/Tienda";
import Galeria from "@/components/Galeria";
import NDSocial from "@/components/NDSocial";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import { categorias } from "@/data/productos";

export default function Home() {
  const [categoriaActiva, setCategoriaActiva] = useState(categorias[0].slug);

  return (
    <>
      <Hero />
      <Productos onSelectCategoria={setCategoriaActiva} />
      <Nosotros />
      <Tienda
        categoriaActiva={categoriaActiva}
        onCategoriaChange={setCategoriaActiva}
      />
      <Galeria />
      <NDSocial />
      <Contacto />
      <Footer />
    </>
  );
}
