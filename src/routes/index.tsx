import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Aman Kumar Sharma — Full Stack Developer & AI Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Aman Kumar Sharma — Full Stack Developer, AI Engineer, and Creative Technologist. Building AI systems, OCR pipelines, and premium digital products. SVIT Hyderabad.",
      },
      { property: "og:title", content: "Aman Kumar Sharma — Full Stack Developer & AI Engineer" },
      {
        property: "og:description",
        content: "Building AI products, immersive digital experiences, and scalable software. Hyderabad, India.",
      },
    ],
  }),
  component: Index,
}));

function Index() {
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
