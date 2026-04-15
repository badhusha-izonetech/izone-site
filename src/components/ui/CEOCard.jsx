import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { TrendingUp, Users, Briefcase, Quote } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "15+", label: "Years Experience" },
  { icon: Briefcase,  value: "200+", label: "Projects Led" },
  { icon: Users,      value: "200+", label: "Team Members" },
];

export default function CEOCard({ name, role, description, image }) {
  const imageUrl = image || "https://www.izonetech.in/img/kesavan.jpg";
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20 });
  const sy = useSpring(my, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const onMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) / r.width);
    my.set((e.clientY - (r.top + r.height / 2)) / r.height);
  };
  const onLeave = () => { mx.set(0); my.set(0); setHovered(false); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl mx-auto mb-14 perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{ rotateX: hovered ? rotateX : 0, rotateY: hovered ? rotateY : 0, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Outer glow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.35, scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-primary/25 via-accent/15 to-primary/10 blur-2xl pointer-events-none"
        />

        <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-card/90 backdrop-blur-2xl">
          {/* Top bar */}
          <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

          {/* Shimmer sweep */}
          <motion.div
            animate={{ x: hovered ? "110%" : "-110%" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/4 to-transparent skew-x-12 pointer-events-none"
          />

          <div className="relative flex flex-col-reverse md:flex-row">

            {/* ── LEFT: content ── */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">

              {/* Badge */}
              <div className="flex items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase">
                  Leadership
                </span>
              </div>

              {/* Name & role */}
              <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-1">{name}</h3>
              <p className="text-primary font-semibold text-sm mb-5 flex items-center gap-2">
                <span className="w-8 h-px bg-gradient-to-r from-primary to-accent inline-block" />
                {role}
              </p>

              {/* Quote icon */}
              <Quote className="w-7 h-7 text-primary/25 mb-3" />

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-lg">
                {description}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4">
                {stats.map(({ icon: Icon, value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/50 border border-border/50 hover:border-primary/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-foreground leading-none">{value}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Animated underline */}
              <motion.div
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 h-px bg-gradient-to-r from-primary to-accent origin-left"
              />
            </div>

            {/* ── RIGHT: photo panel ── */}
            <div className="relative md:w-72 shrink-0 bg-gradient-to-bl from-primary/10 via-accent/5 to-transparent flex flex-col items-center justify-center p-8 gap-4">
              {/* Decorative rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute w-52 h-52 rounded-full border border-dashed border-primary/15 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                className="absolute w-68 h-68 rounded-full border border-dashed border-accent/10 pointer-events-none"
              />

              {/* Photo */}
              <div className="relative z-10">
                <motion.div
                  animate={{ boxShadow: hovered ? "0 0 48px hsl(var(--primary)/0.45)" : "0 0 24px hsl(var(--primary)/0.18)" }}
                  transition={{ duration: 0.4 }}
                  className="w-45 h-80 rounded-2xl overflow-hidden border-2 border-primary/35"
                >
                  <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                </motion.div>


                {/* Glow blob behind photo */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/20 blur-2xl scale-110" />
              </div>

            </div>

          </div>

          {/* Bottom bar */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}


