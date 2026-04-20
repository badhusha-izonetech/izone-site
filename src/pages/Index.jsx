import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code, Palette, Smartphone, Sparkles, Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";

const TYPING_WORDS = ["Inspire", "Convert", "Delight"];
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1800&q=80",
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const aboutContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const aboutItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};

function TypingText() {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const current = TYPING_WORDS[wordIndex] ?? TYPING_WORDS[0];
    let timer;

    if (!deleting && text.length < current.length) {
      timer = window.setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
    } else if (!deleting && text.length === current.length) {
      timer = window.setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && text.length > 0) {
      timer = window.setTimeout(() => setText(text.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % TYPING_WORDS.length);
    }

    return () => window.clearTimeout(timer);
  }, [deleting, prefersReducedMotion, text, wordIndex]);

  const shown = prefersReducedMotion ? TYPING_WORDS[0] : text || TYPING_WORDS[wordIndex];

  return (
    <span className="relative inline-flex items-baseline">
      <span className="hero-typing-word">{shown}</span>
      {!prefersReducedMotion ? (
        <span className="hero-typing-caret ml-1 inline-block w-[1ch] animate-pulse">|</span>
      ) : null}
    </span>
  );
}

const FALLBACK_TESTIMONIALS = [
  {
    quote: "Izone Technologies transformed our digital presence. The experience was smooth and the results were outstanding.",
    author: "Sarah Johnson",
    role: "CEO, TechStart",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "Clear communication, fast delivery, and a clean UI. Exactly what we needed for our product launch.",
    author: "Michael Chen",
    role: "Founder, DataFlow",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "A thoughtful team with great taste. They helped us simplify the UX and increase conversions.",
    author: "Emily Rodriguez",
    role: "CTO, InnovateCo",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face",
    rating: 5,
  },
];

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern, scalable solutions built with the latest technologies.",
    details:
      "From fast landing pages to complex web apps—built with best practices for performance, SEO, and maintainability.",
    tags: ["React", "Next.js", "Node.js", "APIs", "SEO"],
    path: "/development?service=web-development",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Clean, user-friendly layouts crafted for performance.",
    details:
      "User-focused design systems, wireframes, prototypes, and polished UI that improves clarity and conversion.",
    tags: ["Wireframes", "Prototypes", "Design System", "Accessibility"],
    path: "/development?service=ui-ux-design",
  },
  {
    icon: Sparkles,
    title: "Branding",
    description: "Build strong and memorable business identities.",
    details:
      "Logo + visual identity + guidelines that keep your brand consistent across web, social, and print.",
    tags: ["Identity", "Guidelines", "Logo", "Visuals"],
    path: "/development?service=branding",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Smooth cross-platform apps designed for growth.",
    details:
      "High-quality mobile experiences with scalable architecture, smooth UX, and performance you can feel.",
    tags: ["Android", "iOS", "Cross-platform", "Launch"],
    path: "/development?service=mobile-apps",
  },
];

const timeline = [
  { title: "Experienced Team", description: "Designers and engineers who ship polished experiences." },
  { title: "Proven Process", description: "Discovery → design → build → launch, with clear milestones." },
  { title: "Transparent Communication", description: "Regular updates, fast feedback loops, no surprises." },
  { title: "Long-term Support", description: "Post-launch monitoring, improvements, and maintenance." },
];

const projects = [
  {
    title: "E-Commerce Redesign",
    category: "Web",
    image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=900&h=650&fit=crop",
  },
  {
    title: "SaaS Dashboard UI",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=760&fit=crop",
  },
  {
    title: "Mobile App Experience",
    category: "App",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=900&h=720&fit=crop",
  },
  {
    title: "Brand Identity Kit",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=700&fit=crop",
  },
  {
    title: "Landing Page System",
    category: "Web",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=650&fit=crop",
  },
  {
    title: "Analytics & Reporting",
    category: "Product",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&h=760&fit=crop",
  },
];

function TestimonialBubbleCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const current = items[index] ?? items[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            className="h-10 w-10 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            className="h-10 w-10 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${index}-${current.author}`}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-border/70 bg-card/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.10)] p-6 sm:p-8"
          >
            <div className="absolute -bottom-2 left-10 h-4 w-4 bg-card rotate-45 border-b border-r border-border/70" />
            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={14}
                  className={j < (current.rating ?? 5) ? "text-primary fill-primary" : "text-foreground/25 fill-transparent"}
                />
              ))}
            </div>
            <p className="text-foreground/90 text-base sm:text-lg leading-relaxed">
              “{current.quote}”
            </p>
            <div className="mt-6 flex items-center gap-3">
              <img src={current.img} alt={current.author}
                className="h-11 w-11 rounded-full object-cover border border-border" loading="lazy"
              />
              <div className="min-w-0">
                <p className="font-semibold leading-tight truncate">{current.author}</p>
                <p className="text-sm text-muted-foreground truncate">{current.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-primary/35"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioMasonry({ items }) {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }} className="mb-10 text-center">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-subtitle">Hover each project card to reveal the portfolio details with a stronger animated presentation.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, index) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
            >
              <Link to="/portfolio" className="portfolio-tilt-card group block">
                <div className="portfolio-tilt-visual">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="portfolio-tilt-image"
                    loading="lazy"
                  />
                  <div className="portfolio-tilt-content">
                    <p className="portfolio-tilt-category">{p.category}</p>
                    <h3 className="portfolio-tilt-title">{p.title}</h3>
                    <p className="portfolio-tilt-description">
                      Clean execution, stronger visuals, and a product-focused build approach for modern brands.
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


const ABOUT_PILLARS = [
  {
    icon: Sparkles,
    title: "Discovery before pixels",
    description: "We turn loose ideas into a clear plan before the first screen is designed.",
  },
  {
    icon: Palette,
    title: "Interfaces with intent",
    description: "Every layout is shaped around readability, flow, and the next useful action.",
  },
  {
    icon: Code,
    title: "Builds ready to grow",
    description: "Clean frontend structure, smooth handoff, and support after launch.",
  },
];

const ABOUT_COPY = [
  "Izone Technologies started with a simple idea: build websites and apps that feel effortless to use.",
  "Today, we help businesses launch modern digital experiences, from strategy and UI/UX to development and support.",
  "We care about clean typography, thoughtful interactions, and performance you can measure.",
];

const ABOUT_STEPS = ["Listen", "Shape", "Ship"];

function ServiceModal({ svc, index, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.45)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="service-showcase-card service-showcase-card-open relative w-full max-w-md flex-col items-start"
          style={{ display: "flex", flexDirection: "column", cursor: "default", minHeight: "unset", padding: "1.5rem" }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="service-showcase-border" aria-hidden="true" />
          <span className="service-showcase-footer" aria-hidden="true">IZONE TECHNOLOGIES</span>

          {/* number + close row — fully inside card */}
          <div className="flex w-full items-center justify-between mb-4">
            <p className="text-[10px] font-bold tracking-[0.12em] text-primary/65">{String(index + 1).padStart(2, "0")}</p>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-base leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* icon + title */}
          <div className="flex items-start gap-3 mb-3 w-full">
            <div className="service-showcase-logo flex-shrink-0">
              <span className="service-showcase-logo-main">
                <svc.icon className="h-5 w-5" />
              </span>
            </div>
            <div>
              <p className="service-showcase-hover-title">{svc.title}</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{svc.description}</p>
            </div>
          </div>

          {/* details */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 pl-1">{svc.details}</p>

          {/* tech stack */}
          <p className="service-showcase-stack-label" style={{ display: "block" }}>Tech Stack</p>
          <div className="flex flex-wrap gap-2 mt-2 mb-4">
            {svc.tags.map((tag) => (
              <span key={tag} className="service-showcase-tag">{tag}</span>
            ))}
          </div>

          {/* more details */}
          <Link
            to={svc.path}
            className="service-showcase-cta"
            style={{ opacity: 1, maxHeight: "none", overflow: "visible", marginTop: 0 }}
            onClick={onClose}
          >
            More Details <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ServiceShowcaseCard({ svc, index, open, onToggle }) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => onToggle(index)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle(index);
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className="service-showcase-card group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      aria-expanded={open}
    >
      <span className="service-showcase-hover-glow" aria-hidden="true" />
      <span className="service-showcase-border" aria-hidden="true" />
      <span className="service-showcase-footer" aria-hidden="true">IZONE TECHNOLOGIES</span>
      <p className="service-showcase-index">{String(index + 1).padStart(2, "0")}</p>

      <div className="service-showcase-shell">
        <div className="service-showcase-content">
          <div className="service-showcase-logo">
            <span className="service-showcase-logo-main">
              <svc.icon className="h-5 w-5" />
            </span>
            <span className="service-showcase-trail" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="service-showcase-hover-title">{svc.title}</p>
          </div>
          <span className="service-showcase-plus" aria-hidden="true">+</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Index() {
  const { testimonials: adminTestimonials } = useAdmin();
  const [logoVisible, setLogoVisible] = useState(false);
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const [expandedServiceIndex, setExpandedServiceIndex] = useState(-1);
  const toggleServiceCard = useCallback((index) => {
    setExpandedServiceIndex((current) => (current === index ? -1 : index));
  }, []);
  const closeModal = useCallback(() => setExpandedServiceIndex(-1), []);


  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setLogoVisible(!entry.isIntersecting), {
      threshold: 0.05,
    });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  const testimonials = useMemo(() => {
    if (!adminTestimonials || adminTestimonials.length === 0) return FALLBACK_TESTIMONIALS;
    return adminTestimonials
      .slice(-3)
      .reverse()
      .map((t) => ({
        author: t.name,
        role: t.designation,
        quote: t.description,
        img: t.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
        rating: t.rating ?? 5,
      }));
  }, [adminTestimonials]);

  return (
    <Layout
      logoVisible={logoVisible}
      hideNavbar={expandedServiceIndex !== -1}
      hideNavbarOnMobile={false}
      hideScrollToTopOnMobile={false}
    >
      {/* Hero */}
      <section ref={heroRef} className="hero-section relative isolate overflow-hidden text-white">
        <AnimatePresence mode="sync" initial={false}>
          <motion.img
            key={HERO_IMAGES[activeHeroImage]}
            src={HERO_IMAGES[activeHeroImage]}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.01 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="hero-bg-img"
          />
        </AnimatePresence>
        <div className="absolute inset-0 hero-image-shade" />
        <div className="absolute inset-0 hero-tech-overlay" />

        <div className="container-custom relative">
          <motion.div variants={heroContainer} initial="hidden" animate="visible" className="home-hero-content mx-auto max-w-4xl text-center">
                <motion.h1 variants={heroItem} className="home-hero-title mt-7 text-balance text-[2.35rem] font-semibold leading-[1.05] text-white sm:text-[3.5rem] lg:text-[3.15rem] xl:text-[3.35rem]">
                  <span className="min-[511px]:whitespace-nowrap">
                    Build Digital <span className="max-[510px]:block">Experiences</span>
                  </span>
                  <span className="block">
                    That <TypingText />
                  </span>
                </motion.h1>

                <motion.p
                  variants={heroItem}
                  className="home-hero-description mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/78 sm:text-xl"
                >
                  We create websites, apps, and digital systems with a sharper visual identity, faster delivery, and a polished launch experience.
                </motion.p>

                <motion.div variants={heroItem} className="home-hero-actions mt-9 flex flex-wrap items-center justify-center gap-4">
                  <Button asChild size="lg" className="h-14 rounded-full px-8 text-base">
                    <Link to="/get-started">
                      Get Started <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 rounded-full border-white/20 bg-white/5 px-8 text-base text-white backdrop-blur-xl hover:bg-white/12 hover:text-white">
                    <Link to="/services">View Services</Link>
                  </Button>
                </motion.div>

                <motion.div variants={heroItem} className="home-hero-benefits mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/82">
                  {["Fast delivery", "Clean UI/UX", "Scalable builds"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  variants={heroItem}
                  className="home-hero-scroll mt-12 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-white/50"
                >
                  <span className="h-px w-12 bg-white/18" />
                  Scroll
                  <motion.span
                    aria-hidden="true"
                    animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
                    transition={prefersReducedMotion ? undefined : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block text-sm"
                  >
                    ↓
                  </motion.span>
                </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }} className="mb-10 flex flex-col items-center text-center">
            <span className="section-label">Our Services</span>
            <h2 className="section-title">What We Offer</h2>
            <p className="section-subtitle">A sharper, more visual service experience that keeps details clear and easy to explore.</p>
          </motion.div>

          <div className="px-1 py-4 sm:px-0 sm:py-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((svc, i) => (
                <ServiceShowcaseCard
                  key={svc.title}
                  svc={svc}
                  index={i}
                  open={expandedServiceIndex === i}
                  onToggle={toggleServiceCard}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">Click a card to see more details.</p>

          <AnimatePresence>
            {expandedServiceIndex !== -1 && (
              <ServiceModal
                key={expandedServiceIndex}
                svc={services[expandedServiceIndex]}
                index={expandedServiceIndex}
                onClose={closeModal}
              />
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* About */}
      <section className="section-padding home-about-section">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <motion.div
            variants={aboutContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            className="home-about-copy"
          >
            <motion.span variants={aboutItem} className="section-label">About Us</motion.span>
            <motion.h2 variants={aboutItem} className="section-title max-w-xl">
              Thoughtful digital work, shaped with calm momentum.
            </motion.h2>
            <motion.div variants={aboutItem} className="home-about-story">
              {ABOUT_COPY.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </motion.div>

            <div className="mt-5 grid gap-2">
              {ABOUT_PILLARS.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={aboutItem}
                  className="home-about-pillar"
                  whileHover={prefersReducedMotion ? undefined : { x: 8 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="home-about-pillar-icon">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="home-about-pillar-title">{item.title}</span>
                    <span className="home-about-pillar-copy">{item.description}</span>
                  </span>
                  <span className="home-about-pillar-number">{String(index + 1).padStart(2, "0")}</span>
                </motion.div>
              ))}
            </div>

            <motion.div variants={aboutItem} className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-[8px] px-6">
                <Link to="/about">
                  Learn More <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-[8px] px-6">
                <Link to="/contact">Talk to Us</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 42, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="home-about-visual"
          >
            <motion.div
              className="home-about-image-wrap"
              whileHover={prefersReducedMotion ? undefined : { rotate: -1.2, scale: 1.015 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=80"
                alt="Team planning a digital project"
                className="home-about-image"
                loading="lazy"
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.045, 1], x: [0, -8, 0] }}
                transition={prefersReducedMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="home-about-scan" aria-hidden="true" />
            </motion.div>

            <motion.div
              className="home-about-note home-about-note-top"
              animate={prefersReducedMotion ? undefined : { y: [0, -12, 0], rotate: [-1, 1, -1] }}
              transition={prefersReducedMotion ? undefined : { duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="home-about-note-label">Now refining</span>
              <strong>Clarity, layout, motion</strong>
            </motion.div>

            <motion.div
              className="home-about-note home-about-note-bottom"
              animate={prefersReducedMotion ? undefined : { y: [0, 10, 0], rotate: [1, -1, 1] }}
              transition={prefersReducedMotion ? undefined : { duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
            >
              <span className="home-about-live-dot" />
              Smooth launch support
            </motion.div>

            <motion.div
              className="home-about-workflow"
              variants={aboutContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-80px" }}
            >
              {ABOUT_STEPS.map((step, index) => (
                <motion.div key={step} variants={aboutItem} className="home-about-workflow-step">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us (Timeline) */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="px-1 py-12 sm:px-0 lg:py-16">
            <img
              src="/backgrounds/hero image 2.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.06] mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.12),transparent_24%),radial-gradient(circle_at_80%_70%,hsl(var(--accent)/0.16),transparent_22%)]" />

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }} className="relative z-10 mb-12 text-center">
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">A process that keeps things moving</h2>
              <p className="section-subtitle">Reframed as a centered visual timeline, closer to the layout in your reference image.</p>
            </motion.div>

            <div className="relative z-10">
              <div className="timeline-process-line left-6 lg:left-1/2 lg:-translate-x-1/2" />
              <div className="space-y-10 lg:space-y-2">
                {timeline.map((t, idx) => (
                  <motion.div
                    key={t.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-80px" }}
                    className="relative grid min-h-[10rem] items-center lg:grid-cols-2"
                  >
                    <div
                      className={`timeline-process-card pl-16 lg:pl-0 ${
                        idx % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"
                      }`}
                    >
                      <p className="timeline-process-step">
                        Step {String(idx + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 text-3xl font-bold tracking-tight text-foreground/90">
                        {t.title}
                      </h3>
                      <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                        {t.description}
                      </p>
                    </div>

                    <div className="absolute left-6 top-7 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2">
                      <div className="timeline-process-dot">{idx + 1}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <TestimonialBubbleCarousel items={testimonials} />
        </div>
      </section>

      {/* Portfolio */}
      <PortfolioMasonry items={projects} />

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="rounded-3xl border border-border/70 bg-gradient-to-r from-primary/14 via-accent/12 to-secondary/12 p-8 sm:p-10 shadow-[0_18px_70px_rgba(0,0,0,0.10)]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <span className="section-label">Ready to Start?</span>
                <h2 className="section-title mt-2">Ready to Start Your Project?</h2>
                <p className="mt-3 text-muted-foreground max-w-2xl">
                  Tell us what you’re building — we’ll help you plan, design, and launch with confidence.
                </p>
              </div>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


