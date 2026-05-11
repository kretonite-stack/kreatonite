import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import ProductsSection from "@/components/public/ProductsSection";
import Comparison from "@/components/Comparison";
import Community from "@/components/Community";

// Versión actualizada - sección sabores eliminada
export default function HomePage() {
  return (
    <>
      <section id="inicio">
        <Hero />
      </section>
      <section id="beneficios">
        <Benefits />
      </section>
      <section id="productos">
        <ProductsSection />
      </section>
      <section id="comparacion">
        <Comparison />
      </section>
      <section id="comunidad">
        <Community />
      </section>
    </>
  );
}
