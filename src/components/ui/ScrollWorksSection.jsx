import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollWorksSection({ works, title = "Our Work", subtitle = "Case Studies" }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.1, 0.1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.08]);

  return (
    <section ref={containerRef} className="relative section-padding overflow-hidden">
      {/* Parallax background text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: bgOpacity, scale: bgScale }}
      >
        <span className="font-black text-[22vw] text-primary/15 whitespace-nowrap tracking-tighter">
          WORKS
        </span>
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-10 sm:mb-20"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">{title}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">{subtitle}</h2>
        </motion.div>

        <div className="space-y-16 sm:space-y-28">
          {works.map((work, index) => (
            <ScrollWorkCard key={index} work={work} index={index} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollWorkCard({ work, index, isLeft }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start 0.9", "start 0.3"] });

  // Image: slides in from left or right + fades
  const imgX = useTransform(scrollYProgress, [0, 1], [isLeft ? -80 : 80, 0]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.7, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  // Content: slides up + fades
  const contentY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-12 items-center`}
    >
      {/* Image */}
      <motion.div
        style={{ x: imgX, opacity: imgOpacity, scale: imgScale }}
        className="w-full md:w-3/5 relative group"
      >
        <div className="glass-card overflow-hidden glow-border">
          <div className="relative overflow-hidden aspect-video">
            <img
              src={work.image}
              alt={work.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

            {/* Hover shine sweep */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            {/* Category badge on image */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
              className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/70 backdrop-blur-sm border border-border/50 text-xs font-semibold text-primary"
            >
              {work.category}
            </motion.div>
          </div>
        </div>

        {/* Index number badge */}
        <motion.div
          className={`absolute -bottom-4 ${isLeft ? "-right-4" : "-left-4"} w-12 h-12 sm:w-14 sm:h-14 rounded-2xl glass-card flex items-center justify-center glow-border`}
          initial={{ scale: 0, rotate: -15 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 18 }}
        >
          <span className="font-extrabold text-base sm:text-lg text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={`w-full md:w-2/5 pt-6 md:pt-0 ${isLeft ? "md:pl-2" : "md:pr-2"}`}
      >
        {/* Line accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className={`h-0.5 w-10 bg-primary rounded-full mb-4 origin-left`}
        />

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-3"
        >
          {work.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5"
        >
          {work.description}
        </motion.p>

        {/* Tags — pop in one by one */}
        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.7, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                delay: 0.4 + idx * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="tag-pill"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Client */}
        {work.client && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.6 }}
            className="mt-5 text-xs text-muted-foreground"
          >
            Client — <span className="text-foreground font-medium">{work.client}</span>
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default ScrollWorksSection;


