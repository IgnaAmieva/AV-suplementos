import IntroLoader from "@/components/IntroLoader";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ArmaTuStack from "@/components/ArmaTuStack";
import Combos from "@/components/Combos";
import Nosotros from "@/components/Nosotros";
import Contacto from "@/components/Contacto";
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
      <Contacto />
      <Footer />
    </>
  );
}
