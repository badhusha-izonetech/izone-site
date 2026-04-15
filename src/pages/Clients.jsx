import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Building2, Users, Globe, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import TestimonialCard from "@/components/ui/TestimonialCard";

const fallbackClients = [
  { name: "TechCorp Industries", logo: "TC", industry: "Technology", description: "Enterprise software solutions and digital transformation." },
  { name: "Global Finance Ltd", logo: "GF", industry: "Finance", description: "Secure banking and financial services platform." },
  { name: "HealthCare Plus", logo: "HC", industry: "Healthcare", description: "Patient management and telemedicine solutions." },
  { name: "EduLearn Academy", logo: "EL", industry: "Education", description: "Online learning platform and student management." },
  { name: "RetailMax Stores", logo: "RM", industry: "Retail", description: "E-commerce and inventory management systems." },
  { name: "GreenEnergy Co", logo: "GE", industry: "Energy", description: "Smart grid and renewable energy solutions." },
  { name: "MediaHub Network", logo: "MH", industry: "Media", description: "Content management and streaming platform." },
  { name: "LogiTrans Solutions", logo: "LT", industry: "Logistics", description: "Fleet management and supply chain optimization." },
];

const statsData = [
  { Icon: Building2, target: 500, suffix: "+", label: "Clients Served",    color: "text-primary", bg: "bg-primary/10 border-primary/25" },
  { Icon: Users,     target: 50,  suffix: "M+",label: "Users Reached",    color: "text-primary", bg: "bg-primary/10 border-primary/25" },
  { Icon: Globe,     target: 25,  suffix: "+", label: "Countries",         color: "text-primary", bg: "bg-primary/10 border-primary/25" },
  { Icon: Award,     target: 99,  suffix: "%", label: "Satisfaction Rate", color: "text-primary",  bg: "bg-primary/10 border-primary/25" },
];

const CLIENTS_HERO_IMAGE = "/assests/client.png";

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const clientCardPalette = {
  accent: "hsl(var(--primary))",
  accentSoft: "hsl(var(--primary) / 0.16)",
  border: "linear-gradient(135deg, hsl(var(--site-highlight) / 0.82) 0%, hsl(var(--site-highlight) / 0.42) 52%, hsl(var(--site-background) / 0.92) 100%)",
  glow: "0 24px 44px -28px hsl(var(--primary) / 0.42)",
  chipBg: "hsl(var(--primary) / 0.10)",
  chipBorder: "hsl(var(--primary) / 0.22)",
  chipText: "hsl(var(--primary))",
};

function useCountUp(target, active, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    setCount(0);
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(start);
    }, 16);
    return () => clearInterval(t);
  }, [active, target]);
  return count;
}

function StatCard({ Icon, target, suffix, label, color, bg, i }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const count = useCountUp(target, active);

  const glows   = ["shadow-primary/30", "shadow-primary/30", "shadow-primary/30", "shadow-primary/30"];
  const rings   = ["ring-primary/40",   "ring-primary/40",   "ring-primary/40",   "ring-primary/40"];
  const pulses  = ["bg-primary",        "bg-primary",        "bg-primary",        "bg-primary"];
  const lines   = ["from-primary",      "from-primary",      "from-primary",      "from-primary"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`group relative rounded-2xl border border-border/30 bg-card overflow-hidden cursor-default shadow-xl ${glows[i]}`}
    >
      {/* animated gradient sweep on hover */}
      <motion.div
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`absolute inset-0 bg-gradient-to-r ${lines[i]}/10 via-transparent to-transparent pointer-events-none`}
      />

      {/* left colour bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${lines[i]} to-transparent`} />

      <div className="relative z-10 p-4 sm:p-6 flex items-center gap-3 sm:gap-5">
        {/* icon with pulse ring */}
        <div className="relative shrink-0">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            className={`absolute inset-0 rounded-2xl ring-2 ${rings[i]} opacity-50`}
          />
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${bg}`}>
            <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${color}`} />
          </div>
          {/* pulse dot */}
          <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${pulses[i]} animate-ping opacity-60`} />
          <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${pulses[i]}`} />
        </div>

        {/* text */}
        <div className="min-w-0">
          <motion.p
            className={`text-2xl sm:text-4xl font-black leading-none tracking-tight ${color}`}
          >
            {count}{suffix}
          </motion.p>
          <p className="text-muted-foreground text-[11px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-widest uppercase mt-1.5">{label}</p>
          {/* animated progress bar */}
          <div className="mt-2 h-0.5 w-full bg-border/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={active ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.4, delay: i * 0.12, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${lines[i]} to-transparent rounded-full`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const CARD_W = 480;

function TestimonialSection({ testimonials, scrollIdx, setScrollIdx, slideDir, setSlideDir, scrollTo, maxIdx }) {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);
  const [inside, setInside] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const cursor = cursorRef.current;
    if (!el || !cursor) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      pos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onEnter = () => setInside(true);
    const onLeave = () => setInside(false);

    const animate = () => {
      cursor.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden md:cursor-none">
      {/* custom cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute top-0 left-0 z-50 transition-opacity duration-200"
        style={{ opacity: inside ? 1 : 0 }}
      >
        {/* outer ring */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-10 h-10 rounded-full border border-primary/60"
        />
        {/* inner dot */}
        <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/40 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/6 to-secondary/10 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </motion.div>

          {testimonials.length > 1 && (
            <div className="flex gap-2 shrink-0 ml-4">
              <button
                onClick={() => scrollTo(-1)}
                disabled={scrollIdx === 0}
                className="w-9 h-9 rounded-full glass-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollTo(1)}
                disabled={scrollIdx === maxIdx}
                className="w-9 h-9 rounded-full glass-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={slideDir}>
            <motion.div
              key={scrollIdx}
              custom={slideDir}
              initial={(dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0 })}
              animate={{ x: 0, opacity: 1 }}
              exit={(dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0 })}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl mx-auto px-2 sm:px-0"
            >
              {testimonials[scrollIdx] && (
                <TestimonialCard t={testimonials[scrollIdx]} avatarSize="lg" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setSlideDir(i > scrollIdx ? 1 : -1); setScrollIdx(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === scrollIdx ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const Clients = () => {
  const { clients: adminClients, testimonials: adminTestimonials } = useAdmin();
  const scrollRef = useRef(null);
  const [scrollIdx, setScrollIdx] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const displayClients = adminClients.length > 0 ? adminClients : fallbackClients;

  // Normalize admin client fields (admin saves companyName+icon, fallback uses name+logo+image)
  const normalizedClients = displayClients.map((c) => ({
    id: c.id,
    name: c.companyName || c.name || "",
    logo: c.logo || (c.companyName || c.name || "?")[0].toUpperCase(),
    image: c.icon || c.image || null,
    industry: c.industry || "",
    description: c.description || "",
  }));

  // Map admin testimonials to shared card shape
  const testimonials = adminTestimonials.map((t) => ({
    author: t.name,
    role: t.designation,
    quote: t.description,
    img: t.image || null,
    rating: t.rating ?? 5,
  }));

  const maxIdx = Math.max(0, testimonials.length - 1);

  const [slideDir, setSlideDir] = useState(1);

  const scrollTo = (dir) => {
    const next = Math.min(Math.max(scrollIdx + dir, 0), maxIdx);
    setSlideDir(dir);
    setScrollIdx(next);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--site-highlight)/0.16),transparent_34%),radial-gradient(circle_at_85%_22%,hsl(var(--site-highlight)/0.10),transparent_28%),linear-gradient(180deg,hsl(var(--site-background)/0.96),hsl(var(--site-background)/0.9))]" />
        <div className="absolute inset-y-0 right-0 w-full max-w-[48rem] bg-gradient-to-l from-primary/10 via-transparent to-transparent" />

        <div className="container-custom relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-center lg:text-left"
          >
            <span className="page-badge">Our Clients</span>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We partner with ambitious brands across industries and help them launch clearer, stronger digital experiences.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="#valued-partners">Explore Partners</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <Link to="/contact">Start a Project</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xl"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -16, 0], rotate: [0, 1.5, 0, -1, 0], scale: [1, 1.025, 1] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative z-10"
            >
              <img
                src={CLIENTS_HERO_IMAGE}
                alt="Illustration representing client collaboration and digital growth"
                className="h-full w-full object-contain drop-shadow-[0_32px_70px_rgba(0,0,0,0.16)]"
                style={{ filter: "hue-rotate(85deg) saturate(2) brightness(0.88)" }}
                loading="eager"
              />
            </motion.div>
            <motion.div
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, 16, 0], y: [0, -18, 0], opacity: [0.45, 0.75, 0.45] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
              }
              className="absolute right-6 top-4 h-32 w-32 rounded-full bg-primary/15 blur-3xl"
            />
            <motion.div
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, -14, 0], y: [0, 14, 0], opacity: [0.35, 0.7, 0.35] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
              }
              className="absolute bottom-6 left-6 h-36 w-36 rounded-full bg-primary/20 blur-3xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="valued-partners" className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 min-[430px]:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {statsData.map((s, i) => (
              <StatCard key={i} {...s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Valued Partners */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Our Valued <span className="gradient-text">Partners</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              From startups to enterprises, we've helped businesses across industries achieve their digital goals.
            </p>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: false }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
          >
            {normalizedClients.map((client, i) => {
              const p = clientCardPalette;
              return (
                <motion.article
                  key={client.id ?? i}
                  variants={item}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative cursor-pointer h-full"
                >
                  <div
                    className="absolute inset-2 rounded-[26px] blur-2xl opacity-55 transition-opacity duration-300 group-hover:opacity-90"
                    style={{
                      background: `radial-gradient(circle at top left, ${p.accentSoft} 0%, transparent 62%)`,
                    }}
                  />

                  <div
                    className="relative rounded-[28px] p-[1.5px] h-full transition-transform duration-300 group-hover:scale-[1.01]"
                    style={{
                      background: p.border,
                      boxShadow: p.glow,
                    }}
                  >
                    <div
                      className="relative h-full rounded-[26px] px-4 py-4 sm:px-5 flex flex-col justify-between"
                      style={{
                        background: "hsl(var(--site-background) / 0.96)",
                      }}
                    >
                      <motion.div
                        initial={{ x: "-110%", opacity: 0.2 }}
                        whileHover={{ x: "115%", opacity: 0.45 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="pointer-events-none absolute inset-y-0 left-0 w-20 skew-x-[-18deg]"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${p.accentSoft} 50%, transparent 100%)`,
                        }}
                      />

                      <div className="relative z-10 flex items-start gap-3">
                        <div className="relative shrink-0">
                          <motion.div
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                            className="absolute inset-0 rounded-full border"
                            style={{ borderColor: p.accentSoft }}
                          />
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-full border bg-white/90 shadow-sm transition-transform duration-300 group-hover:scale-110"
                            style={{ borderColor: p.accentSoft }}
                          >
                            {client.image ? (
                              <img
                                src={client.image}
                                alt={client.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-extrabold tracking-tight" style={{ color: p.accent }}>
                                {(client.logo || client.name?.[0] || "C").toString().slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span
                            className="absolute -right-0.5 top-0 h-3 w-3 rounded-full border-2 border-white"
                            style={{ backgroundColor: p.accent }}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold leading-snug text-foreground sm:text-[15px]">
                            {client.name}
                          </h3>
                          {client.industry && (
                            <span
                              className="mt-2 inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-none"
                              style={{
                                backgroundColor: p.chipBg,
                                borderColor: p.chipBorder,
                                color: p.chipText,
                              }}
                            >
                              {client.industry}
                            </span>
                          )}
                          {client.description && (
                            <p className="mt-3 text-sm leading-7 text-foreground/75 line-clamp-3">
                              {client.description}
                            </p>
                          )}
                          <div className="mt-4 h-px w-full overflow-hidden rounded-full bg-primary/20">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              viewport={{ once: false }}
                              transition={{ duration: 1.1, delay: i * 0.08, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${p.accent} 0%, hsl(var(--site-background) / 0.25) 100%)`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials — horizontal scroll carousel */}
      {testimonials.length > 0 && (
        <TestimonialSection
          testimonials={testimonials}
          scrollIdx={scrollIdx}
          setScrollIdx={setScrollIdx}
          slideDir={slideDir}
          setSlideDir={setSlideDir}
          scrollTo={scrollTo}
          maxIdx={maxIdx}
        />
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }}
            className="glass-card glow-border p-10 sm:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing List of Clients</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm sm:text-base">
                Let's discuss how we can help your business achieve its digital goals.
              </p>
              <a href="/contact"
                className="inline-flex items-center px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Started Today
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Clients;






