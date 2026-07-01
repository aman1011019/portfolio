import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, Download } from "lucide-react";
import { HeroScene } from "./HeroScene";
import { RevealText } from "./RevealText";
import { MagneticButton } from "./MagneticButton";

const SOCIALS = [
  { icon: Github, href: "https://github.com/aman1011019", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/aman-kumar-sharma-aks113114", label: "LinkedIn" },
  { icon: Mail, href: "mailto:aks1011019@gmail.com", label: "Email" },
];

export function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[760px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <HeroScene />
      </div>
      <div className="vignette" />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
        <div className="flex items-start justify-between px-6 pt-24 md:px-12 md:pt-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.3, duration: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-[#8a96b5]"
          >
            <div className="mb-1 text-[#6FFF00]">● online</div>
            Hyderabad, India · AI &amp; Full Stack Engineer
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.3, duration: 1 }}
            className="pointer-events-auto hidden gap-3 md:flex"
          >
            {SOCIALS.map((s) => (
              <MagneticButton
                key={s.label}
                href={s.href}
                className="liquid-glass glass-shine grid h-12 w-12 place-items-center rounded-full"
              >
                <s.icon size={18} />
              </MagneticButton>
            ))}
          </motion.div>
        </div>

        <div className="relative mt-auto flex flex-1 flex-col justify-end px-6 pb-20 md:px-12 md:pb-28">
          <motion.div
            className="font-accent absolute right-[8%] top-[12%] hidden -rotate-12 text-[clamp(2rem,5vw,4rem)] text-[#6FFF00] md:block"
            style={{ mixBlendMode: "screen", textShadow: "0 0 30px rgba(111,255,0,0.6)" }}
            initial={{ opacity: 0, y: 30, rotate: -20 }}
            animate={{ opacity: 1, y: 0, rotate: -12 }}
            transition={{ delay: 3.6, duration: 1.2 }}
          >
            Creative Technologist
          </motion.div>

          <h1 className="font-display text-[clamp(4.2rem,11.5vw,11.5rem)] leading-[0.85] text-[#EFF4FF]">
            <RevealText text="AMAN" delay={2.7} stagger={0.05} />
            <RevealText text="KUMAR" delay={2.9} stagger={0.05} className="block text-[#EFF4FF]/95" />
            <RevealText text="SHARMA" delay={3.1} stagger={0.04} className="block text-[#EFF4FF]/90" />
          </h1>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8, duration: 1 }}
              className="max-w-md text-sm leading-relaxed text-[#8a96b5] md:text-base"
            >
              Full Stack Developer · <span className="text-[#EFF4FF]">AI Engineer</span> · Creative Technologist ·{" "}
              <span className="text-[#EFF4FF]">Building Scalable Digital Products</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.0, duration: 1 }}
              className="pointer-events-auto flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                href="#projects"
                className="liquid-glass glass-shine rounded-full px-7 py-4 font-display tracking-widest text-[#EFF4FF]"
              >
                EXPLORE MY WORK
              </MagneticButton>
              <a
                href="/resume.pdf"
                download="Aman-Kumar-Sharma-Resume.pdf"
                className="liquid-glass glass-shine inline-flex items-center gap-2 rounded-full px-7 py-4 font-display tracking-widest text-[#EFF4FF] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(111,255,0,0.4)]"
                style={{ border: "1px solid rgba(111,255,0,0.25)" }}
              >
                <Download size={16} className="animate-bounce" /> DOWNLOAD RESUME
              </a>
              <MagneticButton
                href="#contact"
                className="glow-neon inline-block rounded-full px-7 py-4 font-display tracking-widest text-[#010828]"
              >
                <span style={{ background: "#6FFF00", borderRadius: 999, padding: 0 }}>CONTACT&nbsp;ME</span>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-auto flex justify-center pb-6 md:hidden">
          <div className="liquid-glass flex gap-3 rounded-full px-3 py-2">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="grid h-9 w-9 place-items-center">
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 4.2, duration: 2, repeat: Infinity }}
        className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-[#8a96b5]"
      >
        <ArrowDown size={14} className="mx-auto mb-1" />
        scroll
      </motion.div>
    </section>
  );
}