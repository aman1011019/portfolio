import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const glassStyle = {
    backdropFilter: scrolled ? "blur(28px) saturate(180%)" : "blur(14px) saturate(140%)",
    background: scrolled ? "rgba(1,8,40,0.55)" : "rgba(255,255,255,0.03)",
  } as const;

  return (
    <>
      {/* Desktop centered pill */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 md:block"
      >
        <div className="liquid-glass flex items-center gap-1 rounded-full px-2 py-2 transition-all" style={glassStyle}>
          <a href="#home" className="group flex items-center gap-2 px-4 font-display text-base tracking-widest text-[#EFF4FF]">
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-neon/30 transition-all duration-500 group-hover:scale-110 group-hover:border-neon group-hover:shadow-[0_0_12px_rgba(111,255,0,0.5)]">
              <img src="/logo.jpg" alt="AK Logo" className="h-full w-full object-cover" />
            </div>
            <span className="hidden sm:inline">AMAN<span className="text-neon">.</span>DEV</span>
          </a>
          <div className="flex items-center">
            {LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-full px-4 py-2 font-display text-xs tracking-widest text-[#010828]"
            style={{ background: "#6FFF00", boxShadow: "0 0 24px rgba(111,255,0,0.4)" }}
          >
            LET&apos;S TALK
          </a>
        </div>
      </motion.nav>

      {/* Mobile top bar: logo left, menu right */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed inset-x-4 top-5 z-50 flex items-center justify-between md:hidden"
      >
        <a
          href="#home"
          className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2 font-display text-base tracking-widest text-[#EFF4FF]"
          style={glassStyle}
        >
          <div className="h-6 w-6 overflow-hidden rounded-full border border-neon/30">
            <img src="/logo.jpg" alt="AK Logo" className="h-full w-full object-cover" />
          </div>
          <span>AMAN<span className="text-neon">.</span></span>
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="liquid-glass grid h-12 w-12 place-items-center rounded-full text-[#EFF4FF]"
          style={glassStyle}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-50 md:hidden"
          >
            <div className="liquid-glass rounded-3xl p-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-display text-2xl tracking-wider hover:text-neon"
                >
                  {l.label.toUpperCase()}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#EFF4FF]/80 transition-colors hover:text-[#EFF4FF]"
    >
      {label}
      <span
        className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-px scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: "linear-gradient(90deg, transparent, #6FFF00, transparent)" }}
      />
    </a>
  );
}