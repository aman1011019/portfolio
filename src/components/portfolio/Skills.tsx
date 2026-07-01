import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { SkillUniverse } from "./SkillUniverse";
import { GraduationCap, Trophy, Code2, Brain, Cpu, Layers, ArrowUpRight, type LucideIcon } from "lucide-react";

/* ─── Skill categories ────────────────────────────────────────────── */
const SKILL_CATEGORIES = [
  { label: "Languages",   items: ["Python", "Java", "JavaScript"] },
  { label: "ML / AI",     items: ["OCR Pipelines", "Gemini API", "Prompt Engineering", "Conversational AI", "Model Evaluation"] },
  { label: "Frontend",    items: ["React", "Tailwind CSS", "HTML", "CSS"] },
  { label: "Backend",     items: ["Flask", "REST APIs", "Node.js Basics"] },
  { label: "Databases",   items: ["MongoDB", "Firebase"] },
  { label: "Tools",       items: ["Git", "GitHub", "Figma", "Android Studio"] },
  { label: "Core CS",     items: ["DSA", "OOP", "SDLC"] },
];

/* ─── Journey timeline data ─────────────────────────────────────────── */
type Milestone = {
  date: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  tag: string;
  link?: string;
  linkLabel?: string;
};

const JOURNEY: Milestone[] = [
  {
    date: "2023",
    title: "B.Tech Journey Started",
    description:
      "Started my B.Tech journey in Artificial Intelligence and Machine Learning at Swami Vivekananda Institute of Technology, Hyderabad. Began learning software engineering fundamentals, problem solving, frontend development, and artificial intelligence concepts.",
    icon: GraduationCap,
    color: "#00B7FF",
    tag: "EDUCATION",
  },
  {
    date: "December 2023",
    title: "Smart India Hackathon Finalist",
    description:
      "Qualified as Smart India Hackathon 2023 Finalist after building an innovative solution and reaching the national-level competition stage.",
    icon: Trophy,
    color: "#FFD700",
    tag: "ACHIEVEMENT",
    link: "https://www.linkedin.com/posts/aman-kumar-sharma-aks113114_smartindiahackathon2023-pmabrmodiatsih-innovationseatmanirbharbharat-activity-7152519096834707456-auoC",
    linkLabel: "View Achievement",
  },
  {
    date: "January 2025",
    title: "JBIT Hackathon",
    description:
      "Participated in JBIT Hackathon, collaborating with developers to solve technical challenges and build innovative software solutions under time constraints.",
    icon: Code2,
    color: "#6FFF00",
    tag: "HACKATHON",
    link: "https://www.linkedin.com/posts/aman-kumar-sharma-aks113114_hackathon-ai-innovation-activity-7306209673722875924-GSoW",
    linkLabel: "View Event",
  },
  {
    date: "December 2025",
    title: "Malla Reddy GDG Hackathon",
    description:
      "Participated in Google Developer Groups Hyderabad Agentathon hackathon hosted at Malla Reddy, building advanced AI-powered solutions and collaborating with top developers.",
    icon: Brain,
    color: "#A855F7",
    tag: "HACKATHON · AI",
    link: "https://www.linkedin.com/posts/aman-kumar-sharma-aks113114_agentathon-gdghyderabad-googlefordevelopers-activity-7408909954658541568-lADW",
    linkLabel: "View Event",
  },
  {
    date: "February 2026",
    title: "IIT Kharagpur Data Science Hackathon",
    description:
      "Participated in IIT Kharagpur Data Science Hackathon working on data science challenges, machine learning solutions, analytics workflows, and technical problem solving.",
    icon: Cpu,
    color: "#FF6B9D",
    tag: "HACKATHON · DATA SCIENCE",
    link: "https://www.linkedin.com/posts/aman-kumar-sharma-aks113114_datascience-hackathon-iitkharagpur-activity-7421546196298670080-zeA5",
    linkLabel: "View Event",
  },
  {
    date: "March 2026",
    title: "SIES PixelVerse Mumbai Hackathon",
    description:
      "Participated in PixelVerse UI/UX and product innovation hackathon hosted in Mumbai, collaborating on creative product design, interface systems, and user experience engineering.",
    icon: Layers,
    color: "#6FFF00",
    tag: "HACKATHON · UI/UX",
    link: "https://www.linkedin.com/posts/aman-kumar-sharma-aks113114_pixelverse-gdg-uiux-activity-7439108405044281344-N8kL",
    linkLabel: "View Event",
  },
];

/* ─── Individual timeline card ──────────────────────────────────────── */
function JourneyCard({
  milestone,
  index,
  side,
}: {
  milestone: Milestone;
  index: number;
  side: "left" | "right";
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const Icon = milestone.icon;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    setTilt({ x: y, y: x });
  };
  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -60 : 60, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className={`relative w-full md:w-[46%] ${side === "right" ? "md:ml-auto" : ""}`}
      style={{ perspective: 1000 }}
    >
      {/* Floating breathing animation wrapper */}
      <motion.div
        animate={hovered ? { y: -6 } : { y: [0, -4, 0] }}
        transition={
          hovered
            ? { duration: 0.3 }
            : { duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }
        }
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onHoverStart={() => setHovered(true)}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? "transform 0.1s" : "transform 0.5s cubic-bezier(.2,.8,.2,1)",
          transformStyle: "preserve-3d",
        }}
        className="liquid-glass glass-shine group relative overflow-hidden rounded-3xl p-6"
      >
        {/* Corner glow */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-30"
          style={{ background: `radial-gradient(circle, ${milestone.color}, transparent)` }}
        />
        {/* Left accent line */}
        <div
          className="absolute inset-y-0 left-0 w-[3px] rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(180deg, transparent, ${milestone.color}, transparent)` }}
        />

        {/* Header row */}
        <div className="mb-4 flex items-start gap-3">
          <div
            className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
            style={{
              background: `${milestone.color}18`,
              border: `1px solid ${milestone.color}40`,
              boxShadow: hovered ? `0 0 20px ${milestone.color}50` : "none",
            }}
          >
            <Icon size={18} style={{ color: milestone.color }} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-3 py-0.5 font-display text-[9px] tracking-[0.3em]"
                style={{ background: `${milestone.color}15`, color: milestone.color, border: `1px solid ${milestone.color}30` }}
              >
                {milestone.tag}
              </span>
              <span className="font-display text-sm tracking-widest" style={{ color: milestone.color }}>
                {milestone.date}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-display text-xl leading-tight text-[#EFF4FF] transition-colors duration-300 group-hover:text-white md:text-2xl">
          {milestone.title}
        </h4>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-[#8a96b5]">{milestone.description}</p>

        {/* Link button */}
        {milestone.link && (
          <motion.a
            href={milestone.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group/btn relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 font-display text-xs tracking-widest transition-all duration-300"
            style={{
              background: `${milestone.color}12`,
              border: `1px solid ${milestone.color}35`,
              color: milestone.color,
              boxShadow: `0 0 0 0 ${milestone.color}00`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${milestone.color}40`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${milestone.color}00`;
            }}
          >
            {/* Ripple sweep on hover */}
            <span
              className="pointer-events-none absolute inset-0 translate-x-[-110%] transition-transform duration-500 group-hover/btn:translate-x-[110%]"
              style={{ background: `linear-gradient(90deg, transparent, ${milestone.color}20, transparent)` }}
            />
            {milestone.linkLabel}
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover/btn:rotate-45 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Animated vertical neon line ────────────────────────────────────── */
function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 15%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div ref={ref} className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 hidden md:block">
      {/* Background track */}
      <div className="absolute inset-0" style={{ background: "rgba(111,255,0,0.06)" }} />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          scaleY,
          height: "100%",
          background: "linear-gradient(180deg, transparent 0%, rgba(111,255,0,0.8) 40%, rgba(111,255,0,0.4) 100%)",
          boxShadow: "0 0 12px rgba(111,255,0,0.5)",
        }}
      />
    </div>
  );
}

/* ─── Glowing node on timeline ──────────────────────────────────────── */
function TimelineNode({ color }: { color: string }) {
  return (
    <div className="relative hidden md:flex items-center justify-center">
      {/* Outer pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-6 w-6 rounded-full"
        style={{ background: color, opacity: 0.3 }}
      />
      {/* Core dot */}
      <div
        className="relative z-10 h-3.5 w-3.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 14px ${color}, 0 0 30px ${color}60` }}
      />
    </div>
  );
}

/* ─── Main Skills component ─────────────────────────────────────────── */
export function Skills() {
  return (
    <section id="skills" className="relative w-full overflow-hidden py-32" style={{ background: "#010828" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* ── Skill Universe header ── */}
        <div className="mb-12 grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="mb-6 text-xs uppercase tracking-[0.5em] text-[#8a96b5]">· capability / 03</div>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9]">
              SKILL <span className="font-accent text-neon">universe</span>
            </h2>
          </div>
          <p className="text-[#8a96b5] md:col-span-5">
            A live orbit of tools I use to ship product. Hover any planet to identify the
            skill — every one is in active use.
          </p>
        </div>

        <div id="ai" className="liquid-glass overflow-hidden rounded-3xl">
          <SkillUniverse />
        </div>

        {/* ── Skill category badges ── */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
              className="liquid-glass glass-shine rounded-2xl p-5"
            >
              <div className="mb-3 text-[10px] uppercase tracking-[0.4em] text-neon">{cat.label}</div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full px-3 py-1 text-xs text-[#EFF4FF]/80"
                    style={{ background: "rgba(111,255,0,0.08)", border: "1px solid rgba(111,255,0,0.15)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Journey Timeline ── */}
        <div id="experience" className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 text-xs uppercase tracking-[0.5em] text-[#8a96b5]">· trajectory / 04</div>
            <h3 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.9]">
              MY <span className="font-accent text-neon">Journey</span>
            </h3>
            <p className="mt-4 max-w-xl text-sm text-[#8a96b5]">
              From first lines of code to national-level hackathons — a continuous journey of
              building, competing, and growing as an engineer.
            </p>
          </motion.div>

          {/* Timeline container */}
          <div className="relative mt-20">
            {/* Animated neon spine */}
            <TimelineLine />

            {/* Mobile left rail */}
            <div
              className="absolute left-4 top-0 h-full w-px md:hidden"
              style={{ background: "linear-gradient(180deg, transparent, rgba(111,255,0,0.5), transparent)" }}
            />

            <div className="space-y-14">
              {JOURNEY.map((milestone, i) => {
                const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
                return (
                  <div key={milestone.title} className="relative pl-10 md:pl-0">
                    {/* Mobile dot */}
                    <div
                      className="absolute left-4 top-6 h-3.5 w-3.5 -translate-x-1/2 rounded-full md:hidden"
                      style={{ background: milestone.color, boxShadow: `0 0 12px ${milestone.color}` }}
                    />

                    {/* Desktop row: card + node + empty */}
                    <div className="hidden md:flex md:items-center md:gap-0">
                      {side === "left" ? (
                        <>
                          <JourneyCard milestone={milestone} index={i} side="left" />
                          <div className="flex flex-col items-center" style={{ width: "8%" }}>
                            <TimelineNode color={milestone.color} />
                          </div>
                          <div className="w-[46%]" />
                        </>
                      ) : (
                        <>
                          <div className="w-[46%]" />
                          <div className="flex flex-col items-center" style={{ width: "8%" }}>
                            <TimelineNode color={milestone.color} />
                          </div>
                          <JourneyCard milestone={milestone} index={i} side="right" />
                        </>
                      )}
                    </div>

                    {/* Mobile: always full-width */}
                    <div className="md:hidden">
                      <JourneyCard milestone={milestone} index={i} side="left" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* End cap */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 hidden md:flex justify-center"
            >
              <div
                className="flex items-center gap-3 rounded-full px-6 py-2.5 font-display text-xs tracking-[0.4em] text-[#EFF4FF]/70"
                style={{
                  background: "rgba(111,255,0,0.06)",
                  border: "1px solid rgba(111,255,0,0.2)",
                  boxShadow: "0 0 20px rgba(111,255,0,0.08)",
                }}
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: "#6FFF00", boxShadow: "0 0 8px #6FFF00" }}
                />
                THE JOURNEY CONTINUES
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: "#6FFF00", boxShadow: "0 0 8px #6FFF00" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}