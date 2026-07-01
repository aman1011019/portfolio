const ITEMS = [
  "FULL STACK",
  "AI ENGINEER",
  "CREATIVE TECHNOLOGIST",
  "PRODUCT BUILDER",
  "HACKATHON CHAMPION",
  "FRONTEND ENGINEER",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div
      className="relative w-full overflow-hidden border-y py-6"
      style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
    >
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display text-3xl tracking-widest text-[#EFF4FF]/80 md:text-5xl"
          >
            {t}
            <span className="mx-6 inline-block text-neon">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}