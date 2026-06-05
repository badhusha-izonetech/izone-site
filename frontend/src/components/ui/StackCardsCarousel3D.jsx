import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function StackCardsCarousel3D({
  items = [],
  render,
  autoRotate = true,
  intervalMs = 3200,
  className = "",
  heightClassName = "h-[26rem] sm:h-[28rem]",
}) {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const len = items.length;
  const allowAuto = autoRotate && !prefersReducedMotion;

  useEffect(() => {
    if (len === 0) return;
    setActive((i) => mod(i, len));
  }, [len]);

  useEffect(() => {
    if (!allowAuto || len <= 1) return;
    const t = window.setInterval(() => setActive((i) => mod(i + 1, len)), intervalMs);
    return () => window.clearInterval(t);
  }, [allowAuto, intervalMs, len]);

  const slots = useMemo(() => [
    { offset: -2, x: "-52%", scale: 0.82, rotateY: 45, rotateZ: -4, z: -200, opacity: 0.35 },
    { offset: -1, x: "-28%", scale: 0.91, rotateY: 28, rotateZ: -2, z: -100, opacity: 0.70 },
    { offset:  0, x:   "0%", scale: 1.00, rotateY:  0, rotateZ:  0, z:    0, opacity: 1.00 },
    { offset:  1, x:  "28%", scale: 0.91, rotateY:-28, rotateZ:  2, z: -100, opacity: 0.70 },
    { offset:  2, x:  "52%", scale: 0.82, rotateY:-45, rotateZ:  4, z: -200, opacity: 0.35 },
  ], []);

  if (len === 0) return null;

  const go = (dir) => setActive((i) => mod(i + dir, len));

  return (
    <div className={`relative ${heightClassName} ${className}`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-3xl" />

      <div className="absolute inset-0" style={{ perspective: 1800 }}>
        {items.map((item, index) => {
          const rel = mod(index - active, len);
          const wrapped = rel > len / 2 ? rel - len : rel; // [-len/2, len/2]
          const slot = slots.find((s) => s.offset === wrapped);
          const isVisible = Boolean(slot);
          const isActive = wrapped === 0;

          if (!isVisible) return null;

          return (
            <motion.div
              key={item?.id ?? index}
              role="button"
              tabIndex={0}
              aria-label={isActive ? "Active card" : "Carousel card"}
              onClick={() => (wrapped < 0 ? go(-1) : wrapped > 0 ? go(1) : undefined)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") go(-1);
                if (e.key === "ArrowRight") go(1);
              }}
              initial={false}
              animate={{
                opacity: slot.opacity,
                x: slot.x,
                scale: slot.scale,
                rotateY: slot.rotateY,
                rotateZ: slot.rotateZ,
                z: slot.z,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="absolute left-1/2 top-1/2 w-[min(92vw,26rem)] -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
              style={{
                transformStyle: "preserve-3d",
                zIndex: isActive ? 20 : 10 - Math.abs(wrapped),
                filter: isActive ? "none" : "saturate(0.95)",
              }}
            >
              {render(item, { index, activeIndex: active, isActive })}
            </motion.div>
          );
        })}
      </div>

      {/* Small nav dots */}
      {len > 1 ? (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {items.slice(0, Math.min(8, len)).map((it, i) => {
            // When len > 8, this keeps dots stable for the first 8 cards.
            // (Better than rendering dozens of dots in admin UI.)
            const idx = i;
            const isOn = idx === active;
            return (
              <button
                key={it?.id ?? i}
                onClick={() => setActive(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  isOn ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-primary/35"
                }`}
                aria-label={`Go to card ${i + 1}`}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
