"use client";

import { useState } from "react";
import Productos from "@/components/Productos";
import Tienda from "@/components/Tienda";
import { categorias } from "@/data/productos";

export default function TiendaSection() {
  const [categoriaActiva, setCategoriaActiva] = useState(categorias[0].slug);

  return (
    <>
      <Productos onSelectCategoria={setCategoriaActiva} />
      <Tienda
        categoriaActiva={categoriaActiva}
        onCategoriaChange={setCategoriaActiva}
      />
    </>
  );
}
