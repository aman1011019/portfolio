import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="liquid-glass glass-shine fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full text-[#010828] md:bottom-8 md:right-8"
          style={{
            background: "#6FFF00",
            boxShadow: "0 0 32px rgba(111,255,0,0.45), 0 12px 30px rgba(0,0,0,0.4)",
          }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowUp size={22} strokeWidth={2.4} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}