import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowUpRight, X, Github, ExternalLink } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────── */
type Project = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  stack: string[];
  tagline: string;
  bullets: string[];
  gradient: string;
  accentColor: string;
  liveUrl?: string;
  githubUrl?: string;
};

/* ─── Project Data ──────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: "medremind",
    title: "MEDREMIND AI",
    subtitle: "AI Medication Reminder & Management Assistant",
    type: "AI + HEALTHCARE PROJECT",
    tagline: "MedRemind AI is an intelligent healthcare assistant designed to automate medication management and help users follow prescriptions more effectively.",
    stack: [
      "React",
      "TypeScript",
      "Python",
      "Artificial Intelligence",
      "Healthcare Automation",
      "API Integration",
      "Smart Scheduling System"
    ],
    bullets: [
      "AI-powered medication reminder system and smart medicine schedule generation.",
      "Intelligent prescription understanding and personalized medicine management assistant.",
      "Automated healthcare reminder workflows and daily medication tracking with health automation.",
      "Designed to reduce missed medication schedules and make healthcare management more efficient using artificial intelligence."
    ],
    gradient: "linear-gradient(135deg, #6FFF00 0%, #00B7FF 100%)",
    accentColor: "#6FFF00",
    liveUrl: "https://medremind-ai.aks1011019.workers.dev/",
    githubUrl: "https://github.com/aman1011019/MedRemind-AI.git",
  },
  {
    id: "supportmind",
    title: "SUPPORTMIND",
    subtitle: "AI Customer Support Platform",
    type: "AI PLATFORM · FULL STACK",
    tagline: "Developed an AI-powered customer support platform that analyzes complaints and generates personalized context-aware resolutions.",
    stack: ["React", "Node.js", "AI APIs", "OAuth", "Database", "Full Stack"],
    bullets: [
      "Developed an AI-powered customer support platform that analyzes complaints and generates personalized context-aware resolutions instead of generic chatbot responses.",
      "Implemented a memory-driven support system that stores prior customer interactions and improves future responses using historical complaint data.",
      "Built a full-stack SaaS application with secure authentication backend APIs and persistent user/ticket management.",
      "Designed a responsive dashboard for analytics support automation and issue tracking."
    ],
    gradient: "linear-gradient(135deg, #00B7FF 0%, #A855F7 100%)",
    accentColor: "#00B7FF",
    liveUrl: "https://support-mind-ai.vercel.app/",
    githubUrl: "https://github.com/aman1011019/support-mind-ai",
  },
  {
    id: "mindease",
    title: "MINDEASE AI",
    subtitle: "Mental Health Platform",
    type: "AI · MENTAL HEALTH",
    tagline: "Built Gemini API powered mental health AI assistant with mood detection, emotion-aware conversations, and voice interaction.",
    stack: ["Flask", "Gemini API", "AI", "Speech Recognition", "Text to Speech", "Backend"],
    bullets: [
      "Built Gemini API powered mental health AI assistant with mood detection emotion-aware conversations breathing therapy module and bidirectional voice interaction."
    ],
    gradient: "linear-gradient(135deg, #A855F7 0%, #6FFF00 100%)",
    accentColor: "#A855F7",
    liveUrl: "https://mindease-three-blue.vercel.app/",
    githubUrl: "https://github.com/aman1011019/MindEase.git",
  },
  {
    id: "healthscan",
    title: "HEALTHSCAN",
    subtitle: "AI Medication Reminder",
    type: "AI HEALTHCARE · OCR",
    tagline: "Built OCR pipeline extracting medicine names and dosage schedules from prescription images.",
    stack: ["Python", "OCR", "AI", "React", "Text to Speech", "Automation"],
    bullets: [
      "Built OCR pipeline extracting medicine names dosage schedules from prescription images and converting them into automated voice reminders with accessibility support."
    ],
    gradient: "linear-gradient(135deg, #6FFF00 0%, #00B7FF 100%)",
    accentColor: "#6FFF00",
    liveUrl: "https://healthscan.pages.dev/",
    githubUrl: "https://github.com/aman1011019/healthscan.git",
  },
  {
    id: "kapday",
    title: "KAPDAY",
    subtitle: "Online Clothing Store",
    type: "E-COMMERCE · FRONTEND",
    tagline: "Modern fashion e-commerce with category browsing and shopping cart functionality.",
    stack: ["React", "JavaScript", "Tailwind CSS", "E-Commerce", "State Management", "Responsive UI"],
    bullets: [
      "Modern online clothing store website designed for showcasing fashion products with category browsing shopping cart functionality and responsive premium shopping experience."
    ],
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FF6B9D 100%)",
    accentColor: "#F59E0B",
    liveUrl: "https://kapday.vercel.app/",
    githubUrl: "https://github.com/DharunTeja/KAPDAY.git",
  },
  {
    id: "bmw",
    title: "BMW M3 E36",
    subtitle: "Car Showcase Website",
    type: "WEB · INTERACTIVE · UI",
    tagline: "Premium animated car showcase with interactive image gallery and modular React architecture.",
    stack: ["React", "Tailwind CSS", "Vite", "UI Engineering", "Animation", "Performance"],
    bullets: [
      "Premium automotive showcase website with immersive animations interactive image gallery reusable scalable components and optimized high-performance rendering."
    ],
    gradient: "linear-gradient(135deg, #FF6B9D 0%, #6FFF00 100%)",
    accentColor: "#FF6B9D",
    liveUrl: "https://bmw-e36.aks1011019.workers.dev/",
    githubUrl: "https://github.com/aman1011019/bmw-m3-e36.git",
  }
];

/* ─── Premium Project Button ─────────────────────────────────────────── */
function ProjectButton({
  href,
  children,
  variant = "ghost",
  accentColor,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  accentColor: string;
}) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
  };

  if (variant === "solid") {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={addRipple}
        className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-6 py-3 font-display text-xs tracking-widest text-[#010828]"
        style={{
          background: accentColor,
          boxShadow: `0 0 24px ${accentColor}70, 0 0 0 0 ${accentColor}`,
          transition: "box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${accentColor}90, 0 8px 30px ${accentColor}40`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${accentColor}70, 0 0 0 0 ${accentColor}`;
        }}
      >
        {/* Light sweep */}
        <span className="pointer-events-none absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-[110%]" />
        {/* Ripples */}
        {ripples.map((rp) => (
          <span
            key={rp.id}
            className="pointer-events-none absolute animate-ping rounded-full bg-white/40"
            style={{ left: rp.x - 10, top: rp.y - 10, width: 20, height: 20, animationDuration: "0.7s" }}
          />
        ))}
        {children}
        <ExternalLink size={12} className="transition-transform duration-300 group-hover:rotate-12" />
      </motion.a>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={addRipple}
      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-6 py-3 font-display text-xs tracking-widest transition-all duration-300"
      style={{
        background: `${accentColor}10`,
        border: `1px solid ${accentColor}35`,
        color: accentColor,
        boxShadow: `0 0 0 0 ${accentColor}`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${accentColor}40, inset 0 0 24px ${accentColor}08`;
        (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}70`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${accentColor}`;
        (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}35`;
      }}
    >
      {/* Sweep shimmer */}
      <span
        className="pointer-events-none absolute inset-0 translate-x-[-110%] transition-transform duration-500 group-hover:translate-x-[110%]"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}20, transparent)` }}
      />
      {/* Ripples */}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="pointer-events-none absolute animate-ping rounded-full"
          style={{ left: rp.x - 10, top: rp.y - 10, width: 20, height: 20, background: accentColor, opacity: 0.3, animationDuration: "0.7s" }}
        />
      ))}
      {children}
      <Github size={12} className="transition-transform duration-300 group-hover:scale-110" />
    </motion.a>
  );
}

/* ─── Project Card ───────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const onLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ perspective: 1400 }}
    >
      {/* Floating idle wrapper */}
      <motion.div
        animate={{ y: [0, index % 2 === 0 ? -6 : -4, 0] }}
        transition={{
          duration: 5 + index * 0.7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        ref={cardRef}
        className="relative"
      >
        {/* Depth shadow that follows tilt */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, ${project.accentColor}25, transparent 65%)`,
          }}
        />

        <div
          onClick={onOpen}
          className="liquid-glass glass-shine group relative aspect-[5/4] cursor-pointer overflow-hidden rounded-3xl"
        >
          {/* Gradient fill */}
          <div
            className="absolute inset-0 opacity-55 transition-opacity duration-700 group-hover:opacity-85"
            style={{ background: project.gradient }}
          />

          {/* Moving glass reflection on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.12), transparent 50%)`,
            }}
          />

          {/* Static shimmer overlay */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6), transparent 50%)" }}
          />

          {/* Animated neon border on hover */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow: `inset 0 0 0 1px ${project.accentColor}60, 0 0 40px ${project.accentColor}30`,
            }}
          />

          {/* Index */}
          <div className="absolute left-6 top-6 font-display text-sm tracking-widest text-[#EFF4FF]/70">
            0{index + 1}
          </div>

          {/* Quick-action buttons (visible on hover) */}
          <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="grid h-9 w-9 place-items-center rounded-full text-[#EFF4FF] transition-all duration-300 hover:scale-110"
                style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)" }}
                title="Live Demo"
              >
                <ExternalLink size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="grid h-9 w-9 place-items-center rounded-full text-[#EFF4FF] transition-all duration-300 hover:scale-110"
                style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)" }}
                title="GitHub"
              >
                <Github size={14} />
              </a>
            )}
          </div>

          {/* Bottom content */}
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-[#EFF4FF]/70">{project.type}</div>
              <h3 className="mt-1 font-display text-2xl leading-tight text-[#EFF4FF] md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-1.5 max-w-[260px] text-xs leading-relaxed text-[#EFF4FF]/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {project.tagline}
              </p>
            </div>
            <div
              className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full text-[#EFF4FF] transition-all duration-500 group-hover:scale-110 group-hover:rotate-45"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${project.accentColor}80, #1a0a3a)`,
                boxShadow: `0 0 28px ${project.accentColor}60`,
              }}
            >
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Cinematic Modal ───────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Lock body scroll and stop Lenis while modal is open
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, []);

  return (
    /* OUTER OVERLAY */
    <div
      className="fixed inset-0"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999, // z-index 9999
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6FFF00 !important;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent !important;
        }
      `}} />

      {/* ANIMATION WRAPPER (only handles animation, NO scrolling) */}
      <motion.div
        layoutId={`card-${project.id}`}
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.82, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1100px]"
      >
        {/* MODAL CONTAINER */}
        <div 
          className="liquid-glass relative overflow-hidden rounded-3xl"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "90vh",
            boxShadow: "0 0 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* SCROLL CONTAINER (handles all scrolling) */}
          <div
            data-lenis-prevent
            className="custom-scrollbar w-full"
            style={{
              height: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              overflowX: "hidden",
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
              paddingBottom: "100px",
            }}
          >
            {/* STICKY HEADER INSIDE MODAL */}
            <div
              style={{
                position: "sticky",
                top: 0,
                backdropFilter: "blur(20px) saturate(180%)",
                background: "rgba(1,8,40,0.85)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                zIndex: 50,
              }}
            >
              {/* Gradient preview band */}
              <div className="relative h-44 w-full overflow-hidden md:h-56">
                <div className="absolute inset-0" style={{ background: project.gradient }} />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 30%, rgba(1,8,40,0.96) 100%)" }}
                />
                {/* Animated orb */}
                <motion.div
                  animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-16 -top-16 h-52 w-52 rounded-full"
                  style={{ background: `radial-gradient(circle, ${project.accentColor}80, transparent)` }}
                />
                {/* Category label bottom-left */}
                <div className="absolute bottom-3 left-6 font-display text-[10px] uppercase tracking-[0.4em] text-[#EFF4FF]/60">
                  {project.type}
                </div>
                {/* Close button top-right */}
                <button
                  onClick={onClose}
                  className="liquid-glass absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Title row */}
              <div className="px-6 py-4 md:px-8">
                <h3 className="font-display text-3xl text-[#EFF4FF] md:text-4xl">{project.title}</h3>
                <p className="mt-0.5 font-display text-base" style={{ color: project.accentColor }}>
                  {project.subtitle}
                </p>
              </div>
            </div>

            <div className="px-6 pb-10 pt-4 md:px-8">
              <p className="text-sm italic leading-relaxed text-[#EFF4FF]/75">{project.tagline}</p>

              <div className="mt-6 space-y-4">
                {project.bullets.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                    className="flex gap-3 text-sm leading-relaxed text-[#EFF4FF]/80"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: project.accentColor, boxShadow: `0 0 8px ${project.accentColor}` }}
                    />
                    {b}
                  </motion.div>
                ))}
              </div>

              <div className="mt-7">
                <div
                  className="mb-3 text-[10px] uppercase tracking-[0.4em]"
                  style={{ color: project.accentColor }}
                >
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full px-3 py-1 font-display text-xs"
                      style={{
                        background: `${project.accentColor}12`,
                        border: `1px solid ${project.accentColor}30`,
                        color: project.accentColor,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <ProjectButton href={project.liveUrl} variant="solid" accentColor={project.accentColor}>
                    LIVE DEMO
                  </ProjectButton>
                )}
                {project.githubUrl && (
                  <ProjectButton href={project.githubUrl} variant="ghost" accentColor={project.accentColor}>
                    GITHUB REPOSITORY
                  </ProjectButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main Projects section ─────────────────────────────────────────── */
export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative w-full overflow-hidden py-32" style={{ background: "#010828" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 text-xs uppercase tracking-[0.5em] text-[#8a96b5]">· selected work / 02</div>
            <h2 className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.9]">
              PROJECT<br />COLLECTION
            </h2>
            <div className="mt-2 text-3xl md:text-5xl">
              <span className="font-accent text-neon" style={{ textShadow: "0 0 24px rgba(111,255,0,0.55)" }}>
                Real
              </span>{" "}
              <span className="font-display text-[#EFF4FF]/90">Builds</span>
            </div>
          </div>
          <motion.a
            href="https://github.com/aman1011019"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="liquid-glass glass-shine group flex items-center gap-3 rounded-full px-6 py-4 font-display text-sm tracking-widest"
          >
            VIEW ALL ON GITHUB
            <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}