import { motion } from "framer-motion";
import { useMemo } from "react";

export function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const lines = useMemo(() => text.split("\n"), [text]);
  return (
    <span className={className}>
      {lines.map((line, li) => {
        let charCount = 0;
        const words = line.split(" ");
        return (
          <span key={li} className="block leading-[0.95]">
            {words.map((word, wi) => {
              const wordChars = Array.from(word);
              const wordStartIdx = charCount;
              charCount += wordChars.length + 1;
              return (
                <span key={wi} className="inline-block overflow-hidden whitespace-nowrap">
                  {wordChars.map((ch, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ y: "115%", opacity: 0, filter: "blur(12px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 1,
                        delay: delay + li * 0.2 + (wordStartIdx + i) * stagger,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                  {/* Append non-breaking space to separate words */}
                  {wi < words.length - 1 && "\u00A0"}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}