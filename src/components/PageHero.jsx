import { motion } from "framer-motion";
import HeroOrbitBg from "./ui/HeroOrbitBg";

const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function PageHero({
  badge,
  badgeIcon,
  title,
  description,
  chips = [],
  theme = "development",
  eyebrow,
  actions,
}) {
  return (
    <section className={`page-hero page-hero--${theme}`} data-site-hero>
      <div className="page-hero__backdrop" />
      <div className="page-hero__grid" />
      <div className="page-hero__glow page-hero__glow--one" />
      <div className="page-hero__glow page-hero__glow--two" />
      <div className="page-hero__ring page-hero__ring--one" />
      <div className="page-hero__ring page-hero__ring--two" />
      <div className="page-hero__beam" />
      <HeroOrbitBg className="page-hero__orbit" />

      <div className="container-custom relative z-10 w-full">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="page-hero__content mx-auto max-w-4xl text-center"
        >
          <motion.span variants={heroItemVariants} className="page-badge page-hero__badge">
            {badgeIcon ? <span className="page-hero__badge-icon">{badgeIcon}</span> : null}
            {badge}
          </motion.span>

          {eyebrow ? (
            <motion.p variants={heroItemVariants} className="page-hero__eyebrow">
              {eyebrow}
            </motion.p>
          ) : null}

          <motion.h1
            variants={heroItemVariants}
            className="page-hero__title font-display text-balance font-bold leading-[0.95]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="page-hero__description mx-auto mt-6 max-w-2xl text-pretty text-foreground/75"
          >
            {description}
          </motion.p>



          {actions ? (
            <motion.div variants={heroItemVariants} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {actions}
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

export default PageHero;
