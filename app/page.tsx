// Trigger redeploy - New Hero with video
import HeroWrapper from "@/components/HeroWrapper";
import Benefits from "@/components/Benefits";
import Flavors from "@/components/Flavors";
import Comparison from "@/components/Comparison";
import Contact from "@/components/Contact";
import Community from "@/components/Community";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroWrapper />
      <Benefits />
      <Flavors />
      <Comparison />
      <Contact />
      <Community />
      <Footer />
    </main>
  );
}