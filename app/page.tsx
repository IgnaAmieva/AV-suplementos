import IntroLoader from "@/components/IntroLoader";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ArmaTuStack from "@/components/ArmaTuStack";
import Combos from "@/components/Combos";
import Nosotros from "@/components/Nosotros";
import Galeria from "@/components/Galeria";
import Contacto from "@/components/Contacto";
import NDSocial from "@/components/NDSocial";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <Hero />
      <Marquee />
      <ArmaTuStack />
      <Combos />
      <Nosotros />
      <Galeria />
      <Contacto />
      <NDSocial />
      <Footer />
    </>
  );
}
