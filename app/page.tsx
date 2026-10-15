import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Combos from "@/components/Combos";
import TiendaSection from "@/components/TiendaSection";
import Nosotros from "@/components/Nosotros";
import Galeria from "@/components/Galeria";
import Contacto from "@/components/Contacto";
import NDSocial from "@/components/NDSocial";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Combos />
      <TiendaSection />
      <Nosotros />
      <Galeria />
      <Contacto />
      <NDSocial />
      <Footer />
    </>
  );
}
