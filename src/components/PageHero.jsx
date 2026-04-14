import { motion } from "framer-motion";

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
    <section className={`page-hero page-hero--${theme}`}>



      <div className="container-custom relative z-10 w-full">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
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
            className="page-hero__title font-display text-balance text-[3rem] font-bold leading-[0.95] sm:text-[4.35rem] lg:text-[5.3rem]"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="page-hero__description mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-foreground/75 sm:text-[1.2rem]"
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
