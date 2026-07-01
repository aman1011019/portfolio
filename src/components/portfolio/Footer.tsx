import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowUp } from "lucide-react";
import { useMemo } from "react";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", href: "https://github.com/aman1011019" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aman-kumar-sharma-aks113114" },
  { icon: Mail, label: "Email", href: "mailto:aks1011019@gmail.com" },
];

function FooterParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "#6FFF00",
            boxShadow: "0 0 6px rgba(111,255,0,0.6)",
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [-10, -30, -50],
            scale: [1, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden" style={{ background: "#010828" }}>
      {/* Top glow border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(111,255,0,0.15) 20%, rgba(111,255,0,0.7) 50%, rgba(111,255,0,0.15) 80%, transparent 100%)",
          boxShadow: "0 0 30px rgba(111,255,0,0.3)",
        }}
      />

      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(111,255,0,0.04) 0%, transparent 70%)" }}
      />

      <FooterParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-8 md:px-12">
        {/* Main footer grid */}
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {/* LEFT — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <a href="#home" className="group inline-flex flex-col">
              <div className="mb-4 relative h-16 w-16 overflow-hidden rounded-full border border-neon/30 transition-all duration-500 group-hover:scale-105 group-hover:border-neon group-hover:shadow-[0_0_20px_rgba(111,255,0,0.6)]">
                <img src="/logo.jpg" alt="AK Logo" className="h-full w-full object-cover" />
              </div>
              <span
                className="font-display text-4xl tracking-widest text-[#EFF4FF]"
                style={{ textShadow: "0 0 30px rgba(239,244,255,0.15)" }}
              >
                AMAN KUMAR<span className="text-neon">.</span>
              </span>
              <div className="font-display text-sm tracking-[0.4em] text-[#8a96b5]">SHARMA</div>
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#8a96b5]">
              Building AI systems, scalable software, and immersive digital experiences.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <a
                href="mailto:aks1011019@gmail.com"
                className="flex items-center gap-2 text-xs text-[#8a96b5] transition-colors hover:text-neon"
              >
                <Mail size={12} />
                aks1011019@gmail.com
              </a>
              <div className="flex items-center gap-2 text-xs text-[#8a96b5]">
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#6FFF00", boxShadow: "0 0 6px #6FFF00" }} />
                Hyderabad, India
              </div>
            </div>
          </motion.div>

          {/* CENTER — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="mb-6 text-[10px] uppercase tracking-[0.5em] text-[#8a96b5]">Quick Links</div>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-[#EFF4FF]/70 transition-all duration-300 hover:text-neon"
                  >
                    <span
                      className="h-px w-4 transition-all duration-300 group-hover:w-8"
                      style={{ background: "#6FFF00", opacity: 0.4 }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT — Social Links + Resume */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6 text-[10px] uppercase tracking-[0.5em] text-[#8a96b5]">Connect</div>
            <div className="space-y-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-[#EFF4FF]/70 transition-all duration-300 hover:text-neon"
                >
                  <div
                    className="grid h-9 w-9 place-items-center rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(111,255,0,0.06)", border: "1px solid rgba(111,255,0,0.12)" }}
                  >
                    <s.icon size={14} />
                  </div>
                  {s.label}
                </a>
              ))}
            </div>

            {/* Resume Download */}
            <div className="mt-8">
              <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#8a96b5]">Resume</div>
              <a
                href="/resume.pdf"
                download="Aman-Kumar-Sharma-Resume.pdf"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-6 py-3 font-display text-sm tracking-widest text-[#EFF4FF] transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "rgba(111,255,0,0.08)",
                  border: "1px solid rgba(111,255,0,0.3)",
                  boxShadow: "0 0 20px rgba(111,255,0,0.1)",
                }}
              >
                {/* Hover glow sweep */}
                <span
                  className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-[rgba(111,255,0,0.12)] to-transparent transition-transform duration-700 group-hover:translate-x-[100%]"
                />
                <Download size={14} className="text-neon" />
                DOWNLOAD RESUME
              </a>
            </div>
          </motion.div>
        </div>

        {/* Animated neon divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="my-10 h-px origin-left"
          style={{
            background: "linear-gradient(90deg, #6FFF00 0%, rgba(111,255,0,0.3) 50%, transparent 100%)",
            boxShadow: "0 0 12px rgba(111,255,0,0.3)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.4em] text-[#8a96b5]"
          >
            © 2026 Aman Kumar Sharma · All rights reserved
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center gap-6"
          >
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
