import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const stageLabels = ["Strategy", "Design", "Launch"];
const orbitDots = [
  { top: "4%", left: "50%", size: "h-3 w-3", color: "bg-primary" },
  { top: "24%", right: "6%", size: "h-2.5 w-2.5", color: "bg-primary/80" },
  { bottom: "18%", right: "10%", size: "h-3.5 w-3.5", color: "bg-primary/70" },
  { bottom: "8%", left: "20%", size: "h-2.5 w-2.5", color: "bg-primary/50" },
  { top: "34%", left: "8%", size: "h-2 w-2", color: "bg-primary/70" },
];

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,hsl(var(--site-highlight)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.12),transparent_22%),linear-gradient(180deg,hsl(var(--site-background))_0%,hsl(var(--site-background))_52%,hsl(var(--site-background))_100%)] px-4"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(214,162,82,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(214,162,82,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.55),transparent_88%)]" />

          <motion.div
            aria-hidden="true"
            animate={prefersReducedMotion ? { opacity: 0.6 } : { scale: [1, 1.08, 1], opacity: [0.22, 0.42, 0.22] }}
            transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          />

          <motion.div
            aria-hidden="true"
            animate={prefersReducedMotion ? { opacity: 0.48 } : { x: [-30, 22, -30], y: [18, -16, 18] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[10%] top-[20%] h-48 w-48 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-[18rem] w-[18rem] items-center justify-center sm:h-[21rem] sm:w-[21rem]"
            >
              <motion.div
                aria-hidden="true"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/70"
              />

              <motion.div
                aria-hidden="true"
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[1.15rem] rounded-full border border-primary/30"
              />

              <motion.div
                aria-hidden="true"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[2.4rem] rounded-full border border-dashed border-primary/20"
              />

              {orbitDots.map((dot, index) => (
                <motion.span
                  key={index}
                  aria-hidden="true"
                  animate={prefersReducedMotion ? { opacity: 0.8 } : { scale: [1, 1.18, 1], y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.4 + index * 0.35, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
                  className={`absolute rounded-full shadow-[0_0_0_8px_rgba(255,255,255,0.28)] ${dot.size} ${dot.color}`}
                  style={dot}
                />
              ))}

              <motion.div
                aria-hidden="true"
                animate={prefersReducedMotion ? { opacity: 0.38 } : { scale: [0.94, 1.07, 0.94], opacity: [0.2, 0.42, 0.2] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[3.7rem] rounded-full bg-[radial-gradient(circle,rgba(214,162,82,0.32),hsl(var(--primary)/0.12),transparent_72%)] blur-2xl"
              />

              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/85 bg-white/88 shadow-[0_24px_70px_rgba(109,44,14,0.18)] backdrop-blur-xl sm:h-36 sm:w-36">
                <motion.div
                  aria-hidden="true"
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-3 rounded-full bg-[conic-gradient(from_0deg,hsl(var(--primary)/0.08),rgba(214,162,82,0.34),rgba(127,211,141,0.18),hsl(var(--primary)/0.08))]"
                />
                <div className="absolute inset-[0.95rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.98),rgba(255,247,235,0.94))]" />
                <img src="/hero/logo.png" alt="Izone" className="relative z-10 h-14 w-auto object-contain sm:h-16" />
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="-mt-3"
            >
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.42em] text-primary">
                Izone Technologies
              </p>
              <p className="mt-3 text-sm text-foreground/75 sm:text-base">
                Crafting your next digital launch
              </p>

              <div className="mt-5 flex items-center justify-center gap-3 text-[0.66rem] uppercase tracking-[0.3em] text-primary sm:gap-5">
                {stageLabels.map((label, index) => (
                  <motion.span
                    key={label}
                    animate={prefersReducedMotion ? { opacity: 0.92 } : { opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.45, repeat: Infinity, delay: index * 0.22 }}
                  >
                    {label}
                  </motion.span>
                ))}
              </div>

              <div className="relative mx-auto mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-primary/15 sm:w-64">
                <motion.div
                  animate={prefersReducedMotion ? { x: "10%" } : { x: ["-55%", "110%"] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-primary"
                />
              </div>
            </motion.div>

            <span className="sr-only">Loading Izone Technologies</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
