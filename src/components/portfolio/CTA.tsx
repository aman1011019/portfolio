import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { StarField } from "./StarField";
import { RevealText } from "./RevealText";
import { MagneticButton } from "./MagneticButton";
import ContactScene from "./ContactScene";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/aman1011019" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aman-kumar-sharma-aks113114" },
  { icon: Mail, label: "Email", href: "mailto:aks1011019@gmail.com" },
];

export function CTA() {
  return (
    <section id="contact" className="relative h-screen min-h-[760px] w-full overflow-hidden">
      {/* Background StarField */}
      <div className="absolute inset-0">
        <StarField />
      </div>

      <div className="vignette" />

      {/* Main layout container */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-6 py-16 md:px-12 md:py-20">
        {/* Top Header Label */}
        <div className="text-xs uppercase tracking-[0.5em] text-[#8a96b5]">· contact / 06</div>

        {/* Central Layout Split */}
        <div className="flex flex-1 flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full my-auto">
          {/* LEFT SIDE (45%): Large WebGL core scene */}
          <div className="pointer-events-auto w-full md:w-[45%] h-[320px] md:h-full min-h-[380px] md:min-h-[550px] relative">
            <ContactScene />
          </div>

          {/* RIGHT SIDE (55%): CTA typography & mail button */}
          <div className="pointer-events-auto w-full md:w-[55%] flex flex-col justify-center items-end text-right">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="font-accent mb-4 inline-block text-[clamp(2rem,5vw,4.5rem)] text-neon"
              style={{ textShadow: "0 0 30px rgba(111,255,0,0.6)" }}
            >
              Let&apos;s Connect
            </motion.div>
            <h2 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.9] text-[#EFF4FF] max-w-full">
              <RevealText text="LET'S BUILD" />
              <RevealText text="WHAT DOESN'T" />
              <RevealText text="EXIST YET." />
              <span className="block text-neon">
                <RevealText text="CREATE THE FUTURE." />
              </span>
            </h2>

            <div className="mt-8 flex justify-end">
              <MagneticButton
                href="mailto:aks1011019@gmail.com"
                className="glow-neon inline-block rounded-full px-8 py-4 font-display text-base tracking-widest text-[#010828]"
              >
                <span style={{ background: "#6FFF00", borderRadius: 999 }}>START&nbsp;A&nbsp;PROJECT</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pointer-events-auto flex items-end justify-between mt-4">
          <div className="liquid-glass flex flex-col gap-2 rounded-full p-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full text-[#EFF4FF] transition-all hover:text-neon hover:scale-110"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
          <div className="text-right text-xs uppercase tracking-[0.4em] text-[#8a96b5]">
            <div>© 2026 Aman Kumar Sharma</div>
            <div className="mt-1 text-[#EFF4FF]/60">Crafted with obsession.</div>
          </div>
        </div>
      </div>
    </section>
  );
}