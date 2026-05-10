import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingDock from "@/components/ui/FloatingDock";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Experience />
      <Resume />
      <Contact />
      <Footer />
      <FloatingDock />
    </main>
  );
}
