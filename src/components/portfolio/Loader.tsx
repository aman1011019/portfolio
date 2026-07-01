import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const DURATION = 2600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setPct(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "#010828" }}
        >
          <motion.div
            className="relative h-40 w-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, #6FFF00, transparent 60%)",
                filter: "blur(2px)",
              }}
            />
            <div className="absolute inset-3 rounded-full" style={{ background: "#010828" }} />
            <div
              className="absolute inset-6 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #6FFF00, transparent 60%), radial-gradient(circle at 70% 70%, #00B7FF, transparent 70%)",
                filter: "blur(8px)",
                opacity: 0.7,
              }}
            />
            {/* Center Logo */}
            <div className="absolute inset-10 overflow-hidden rounded-full border border-neon/30">
              <img src="/logo.jpg" alt="AK Logo" className="h-full w-full object-cover" />
            </div>
          </motion.div>
          <div className="mt-10 font-display text-4xl tracking-wider text-[#EFF4FF]">
            AMAN.DEV
          </div>
          <div className="mt-2 font-display text-lg tracking-widest text-[#6FFF00]">
            {String(pct).padStart(3, "0")}%
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.5em] text-[#8a96b5]">
            initializing&nbsp;experience
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}