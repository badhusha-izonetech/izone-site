import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function StackStatCard({
  title,
  description,
  Icon,
  tags = [],
  to,
  className = "",
  iconClassName = "",
  delay = 0,
}) {
  const inner = (
    <div
      className={`relative flex h-full min-h-[18.5rem] flex-col overflow-hidden rounded-[1.9rem] border border-primary/20 bg-card/90 p-8 shadow-[0_14px_34px_hsl(var(--primary)/0.08)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.10),transparent_34%),linear-gradient(180deg,hsl(var(--card)/0.96),hsl(var(--background)/0.72))]" />
      <div className="absolute left-6 top-6 h-7 w-7 rounded-tl-xl border-l-[4px] border-t-[4px] border-primary/70" />
      <div className="absolute bottom-6 right-6 h-7 w-7 rounded-br-xl border-b-[4px] border-r-[4px] border-accent" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-[0_6px_18px_hsl(var(--primary)/0.08)]">
            {Icon ? <Icon className={`h-5 w-5 ${iconClassName}`} /> : null}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="pt-1 font-display text-[1.15rem] sm:text-[1.3rem] font-bold leading-[1.25] tracking-tight text-foreground">
              {title}
            </h3>
          </div>
          {to ? (
            <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white text-primary transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          ) : null}
        </div>

        {description ? (
          <p className="mt-6 max-w-[30rem] text-[0.98rem] leading-8 text-foreground/75">{description}</p>
        ) : null}

        {tags?.length ? (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-[0.78rem] font-semibold text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      {to ? (
        <Link to={to} className="group block h-full">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </motion.div>
  );
}


