import { motion } from "framer-motion";
import { Code2, Headphones, Palette, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";

const developmentCards = [
  {
    title: "Custom Web Development",
    description:
      "Tailored web applications built from the ground up using modern frameworks and best practices.",
    icon: Code2,
    tags: ["React & Next.js", "TypeScript", "Node.js Backend", "REST & GraphQL APIs", "Database Design"],
  },
  {
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces designed with your users in mind for maximum engagement.",
    icon: Palette,
    tags: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Accessibility"],
  },
  {
    title: "Technical Consulting",
    description:
      "Expert guidance on architecture, technology stack, and development strategy.",
    icon: Settings,
    tags: ["Architecture Review", "Code Audits", "Performance Optimization", "Tech Stack Planning"],
  },
  {
    title: "Ongoing Support",
    description:
      "Continuous maintenance, updates, and support to keep your application running smoothly.",
    icon: Headphones,
    tags: ["24/7 Monitoring", "Bug Fixes", "Feature Updates", "Maintenance"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function PageServiceCard({ card }) {
  const Icon = card.icon;

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      className="relative flex min-h-[18.5rem] overflow-hidden rounded-[1.9rem] border border-primary/20 bg-card/90 p-8 shadow-[0_14px_34px_hsl(var(--primary)/0.08)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.10),transparent_34%),linear-gradient(180deg,hsl(var(--card)/0.96),hsl(var(--background)/0.72))]" />
      <div className="absolute left-6 top-6 h-7 w-7 rounded-tl-xl border-l-[4px] border-t-[4px] border-primary/70" />
      <div className="absolute bottom-6 right-6 h-7 w-7 rounded-br-xl border-b-[4px] border-r-[4px] border-accent" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-[0_6px_18px_hsl(var(--primary)/0.08)]">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-[1.2rem] font-bold leading-[1.25] tracking-tight text-foreground sm:text-[1.35rem]">
              {card.title}
            </h3>
          </div>
        </div>

        <p className="mt-7 max-w-[30rem] text-[0.98rem] leading-8 text-foreground/75">
          {card.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-[0.78rem] font-semibold text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

const Development = () => {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="Development"
        eyebrow="Modern product engineering"
        title={<>Development <span className="page-hero__title-accent">Services</span></>}
        description="Modern, scalable solutions built with the latest technologies to launch faster, support growth, and keep your product experience polished."
        chips={["Web + app builds", "Design systems", "Long-term technical support"]}
      />

      <section className="pb-20 pt-6">
        <div className="container-custom">
          <div className="grid items-stretch gap-8 md:grid-cols-2">
            {developmentCards.map((card) => (
              <PageServiceCard key={card.title} card={card} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Development;


