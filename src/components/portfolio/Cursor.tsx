import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor='hover']"));
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);

    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.45;
      pos.current.y += (target.current.y - pos.current.y) * 0.45;
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 hidden h-2 w-2 rounded-full bg-[#6FFF00] md:block"
        style={{
          zIndex: 9999999, // Absolute top layer
          boxShadow: "0 0 14px #6FFF00, 0 0 28px rgba(111,255,0,0.5)",
          transition: "width .25s, height .25s",
          width: clicking ? 28 : 8,
          height: clicking ? 28 : 8,
          opacity: clicking ? 0.4 : 1,
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 hidden rounded-full border md:block"
        style={{
          zIndex: 9999998, // Absolute top layer
          width: hover ? 64 : 36,
          height: hover ? 64 : 36,
          borderColor: hover ? "#6FFF00" : "rgba(239,244,255,0.35)",
          backdropFilter: "invert(8%)",
          transition: "width .35s cubic-bezier(.2,.8,.2,1), height .35s, border-color .3s",
        }}
      />
    </>
  );
}