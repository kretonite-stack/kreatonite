import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Flavors from "@/components/Flavors";
import Comparison from "@/components/Comparison";
import Community from "@/components/Community";

export default function HomePage() {
  return (
    <>
      <section id="inicio">
        <Hero />
      </section>
      <section id="beneficios">
        <Benefits />
      </section>
      <section id="sabores">
        <Flavors />
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
