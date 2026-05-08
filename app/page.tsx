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
    <main style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/hero-bg-thunder.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
    }}>
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