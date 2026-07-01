import { Cursor } from "@/components/portfolio/Cursor";
import { Loader } from "@/components/portfolio/Loader";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { CTA } from "@/components/portfolio/CTA";
import { Marquee } from "@/components/portfolio/Marquee";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";
import { Footer } from "@/components/portfolio/Footer";

export function App() {
  return (
    <main className="relative w-full" style={{ background: "#010828" }}>
      <Loader />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Skills />
      <CTA />
      <Footer />
      <ScrollToTop />
      <div className="grain-overlay" />
    </main>
  );
}
