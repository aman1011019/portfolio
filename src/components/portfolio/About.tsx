import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { StarField } from "./StarField";
import { RevealText } from "./RevealText";
import { Download } from "lucide-react";

const CARDS = [
  {
    title: "AI Engineering",
    body: "LLM systems, OCR pipelines, conversational AI, Gemini API integration, and production-grade AI products.",
    tag: "01",
  },
  {
    title: "Full Stack Development",
    body: "Scalable APIs, Flask backends, REST services, databases, and end-to-end product architecture.",
    tag: "02",
  },
  {
    title: "Frontend Development",
    body: "Premium React interfaces, Tailwind CSS systems, responsive design, and pixel-perfect implementations.",
    tag: "03",
  },
  {
    title: "Problem Solving",
    body: "Data Structures, Algorithms, system design thinking, and competitive programming fundamentals.",
    tag: "04",
  },
];

// target number, display suffix, label
const STATS = [
  { target: 15, suffix: "+", l: "Hackathons Attended" },
  { target: 4,  suffix: "×", l: "AI Projects" },
  { target: 1,  suffix: "",  l: "Internship" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const duration = 1400;
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-display text-3xl text-[#EFF4FF]">
      {display}{suffix}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative w-full overflow-hidden py-32">
      <div className="absolute inset-0 opacity-70">
        <StarField />
      </div>
      <div className="vignette" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-6 text-xs uppercase tracking-[0.5em] text-[#8a96b5]">· about / 01</div>
            <h2 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9]">
              <RevealText text="ABOUT" />
              <RevealText text="ME" />
            </h2>
            <div className="pointer-events-none mt-4">
              <span
                className="font-accent inline-block -rotate-6 text-[clamp(3rem,8vw,6rem)] text-[#6FFF00]"
                style={{ mixBlendMode: "screen", textShadow: "0 0 30px rgba(111,255,0,0.6)" }}
              >
                Aman
              </span>
            </div>
          </div>
          <div className="md:col-span-5 md:pt-32">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="text-lg leading-relaxed text-[#EFF4FF]/85 md:text-xl"
            >
              B.Tech student specializing in{" "}
              <span className="text-neon">Artificial Intelligence and Machine Learning</span> at Swami Vivekananda
              Institute of Technology, Hyderabad. I enjoy building{" "}
              <span className="text-electric">AI-powered systems</span>, scalable web applications, OCR automation
              pipelines, conversational AI solutions, and{" "}
              <span className="text-neon">premium digital experiences</span>. My focus is on creating impactful
              software products that solve real-world problems.
            </motion.p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.06, y: -4 }}
                  className="liquid-glass glass-shine rounded-2xl p-4 cursor-default"
                  style={{ boxShadow: "0 0 0 1px rgba(111,255,0,0.08)" }}
                >
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-[#8a96b5]">{s.l}</div>
                </motion.div>
              ))}
            </div>

            {/* Location badge & View Resume */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: "#6FFF00", boxShadow: "0 0 8px #6FFF00" }}
                />
                <span className="text-xs uppercase tracking-[0.3em] text-[#8a96b5]">Hyderabad, India</span>
              </motion.div>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="liquid-glass glass-shine inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-xs tracking-widest text-[#EFF4FF] transition-all duration-300 hover:shadow-[0_0_20px_rgba(111,255,0,0.3)]"
                style={{ border: "1px solid rgba(111,255,0,0.2)" }}
              >
                <Download size={12} className="text-[#6FFF00]" /> VIEW RESUME
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.tag}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              whileHover={{ y: -10 }}
              className="liquid-glass glass-shine group flex h-64 flex-col rounded-3xl p-6"
            >
              <div className="flex items-start justify-between">
                <div className="text-xs uppercase tracking-widest text-[#8a96b5]">{c.tag}</div>
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: "#6FFF00", boxShadow: "0 0 12px #6FFF00" }}
                />
              </div>
              <div className="mt-auto">
                <h3 className="font-display text-2xl leading-tight text-[#EFF4FF]">{c.title}</h3>
                <p className="mt-3 text-sm text-[#8a96b5]">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}