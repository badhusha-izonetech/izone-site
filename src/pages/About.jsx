import { AnimatePresence, motion } from "framer-motion";
import {
  Target, Eye, Heart, Users, Award, Lightbulb, X, Images, Code2, Server, Database, ChevronLeft, ChevronRight, Sparkles, Globe2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/Layout";
import ExpertCard from "../components/ui/ExpertCard";
import CEOCard from "../components/ui/CEOCard";
import { useAdmin } from "@/context/AdminContext";

const values = [
  {
    icon: Heart,
    title: "Passion",
    description:
      "We pour our hearts into every project, treating your success as our own.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Constantly pushing boundaries to deliver cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Working closely with clients to ensure perfect alignment with their vision.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Committed to delivering nothing less than exceptional quality.",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CTO",
    avatar: "SC",
    bio: "Full-stack expert passionate about scalable architecture.",
  },
  {
    name: "Michael Rodriguez",
    role: "Lead Designer",
    avatar: "MR",
    bio: "Award-winning designer focused on user experience.",
  },
  {
    name: "Emily Johnson",
    role: "Project Manager",
    avatar: "EJ",
    bio: "Agile enthusiast ensuring seamless project delivery.",
  },
  {
    name: "David Kim",
    role: "Senior Developer",
    avatar: "DK",
    bio: "React specialist with a love for clean code.",
  },
  {
    name: "Lisa Wang",
    role: "UX Researcher",
    avatar: "LW",
    bio: "Data-driven designer advocating for user needs.",
  },
  {
    name: "James Miller",
    role: "DevOps Engineer",
    avatar: "JM",
    bio: "Cloud infrastructure specialist ensuring 99.9% uptime.",
  },
];

const ceoData = {
  name: "Mr.B.Kesavan M.E",
  role: "Founder/CEO",
  description:
    "Visionary leader with 15+ years of experience in the tech industry. Kesavan founded Izone Technologies with a mission to democratize world-class web development and help businesses of all sizes achieve digital excellence.",
};

const milestones = [
  {
    year: "2014",
    title: "Founded",
    description:
      "Izone Technologies was born with a vision to transform digital experiences.",
    label: "Launch Phase",
  },
  {
    year: "2016",
    title: "First Major Client",
    description: "Partnered with Fortune 500 company for enterprise solution.",
    label: "Trust Built",
  },
  {
    year: "2018",
    title: "Team Expansion",
    description: "Grew to 25+ team members across multiple countries.",
    label: "Team Scale",
  },
  {
    year: "2020",
    title: "Global Reach",
    description: "Expanded services to clients in 15+ countries worldwide.",
    label: "Worldwide",
  },
  {
    year: "2022",
    title: "Industry Award",
    description: "Recognized as Top Web Development Agency of the Year.",
    label: "Recognition",
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description: "Launched R&D division for emerging technologies.",
    label: "Future Ready",
  },
];

const techStack = [
  {
    title: "Frontend",
    icon: Code2,
    desc: "Modern UI frameworks and tooling for fast, responsive experiences.",
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"],
  },
  {
    title: "Backend",
    icon: Server,
    desc: "APIs and services built for scale, security, and performance.",
    items: ["Node.js", "Python", "GraphQL"],
  },
  {
    title: "Database",
    icon: Database,
    desc: "Reliable data layers and cloud-ready infrastructure foundations.",
    items: ["PostgreSQL", "MongoDB", "AWS", "Docker"],
  },
];

const aboutHeroOrbitItems = [
  { label: "Web", top: "12%", left: "8%", delay: 0 },
  { label: "Apps", top: "24%", right: "6%", delay: 0.25 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const heroCopyVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const heroCopyItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const About = () => {
  const { sitePhotos } = useAdmin();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const timelineRef = useRef(null);
  const orderedPhotos = useMemo(() => [...sitePhotos].reverse(), [sitePhotos]);
  const previewPhotos = orderedPhotos.slice(0, 5);

  const openGalleryAt = useCallback((index) => {
    setActivePhotoIndex(index);
    setShowAllPhotos(true);
  }, []);

  const closeGallery = useCallback(() => setShowAllPhotos(false), []);
  const showPrevPhoto = useCallback(() => {
    if (!orderedPhotos.length) return;
    setActivePhotoIndex((prev) => (prev - 1 + orderedPhotos.length) % orderedPhotos.length);
  }, [orderedPhotos.length]);
  const showNextPhoto = useCallback(() => {
    if (!orderedPhotos.length) return;
    setActivePhotoIndex((prev) => (prev + 1) % orderedPhotos.length);
  }, [orderedPhotos.length]);

  const scrollTimelineTo = useCallback((index) => {
    const container = timelineRef.current;
    if (!container) return;
    const nextIndex = Math.max(0, Math.min(index, milestones.length - 1));
    const slide = container.children[nextIndex];
    if (!(slide instanceof HTMLElement)) return;
    container.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setActiveTimelineIndex(nextIndex);
  }, []);

  const showPrevTimeline = useCallback(() => {
    scrollTimelineTo(activeTimelineIndex - 1);
  }, [activeTimelineIndex, scrollTimelineTo]);

  const showNextTimeline = useCallback(() => {
    scrollTimelineTo(activeTimelineIndex + 1);
  }, [activeTimelineIndex, scrollTimelineTo]);

  const handleTimelineScroll = useCallback(() => {
    const container = timelineRef.current;
    if (!container) return;
    const center = container.scrollLeft + container.clientWidth / 2;
    const children = Array.from(container.children);
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    children.forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveTimelineIndex(closestIndex);
  }, []);

  useEffect(() => {
    if (!showAllPhotos) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") showPrevPhoto();
      if (e.key === "ArrowRight") showNextPhoto();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeGallery, showAllPhotos, showNextPhoto, showPrevPhoto]);

  const activePhoto = orderedPhotos[activePhotoIndex];
  return (
    <Layout hideNavbar={showAllPhotos}>
      {/* Hero Section */}
      <section className="about-hero-section relative overflow-hidden px-4 md:px-8">
        <div className="about-hero-radial about-hero-radial-left" />
        <div className="about-hero-radial about-hero-radial-right" />
        <div className="container-custom relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10">
            <motion.div
              variants={heroCopyVariants}
              initial="hidden"
              animate="visible"
              className="about-hero-copy max-w-xl"
            >
              <motion.span variants={heroCopyItemVariants} className="page-badge">About Us</motion.span>
              <motion.h1 variants={heroCopyItemVariants} className="font-display text-balance text-[2.8rem] font-bold leading-[1.02] sm:text-[3.25rem] lg:text-[3.35rem]">
                <span className="block">We build digital</span>
                <span className="block">experiences that</span>
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="gradient-text-animated block pt-2"
                >
                  move and convert.
                </motion.span>
              </motion.h1>
              <motion.p variants={heroCopyItemVariants} className="mt-5 max-w-md text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
                Web, apps, and growth systems built for real business impact.
              </motion.p>
              <motion.div variants={heroCopyItemVariants} className="about-hero-copy-line" />
              <motion.div variants={heroCopyItemVariants} className="about-hero-text-tags">
                {["Web + Apps", "Growth Systems"].map((label, index) => (
                  <motion.span
                    key={label}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.25, ease: "easeInOut" }}
                    className="about-hero-text-tag"
                  >
                    {label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="about-hero-visual"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="about-hero-orbit about-hero-orbit-outer"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="about-hero-orbit about-hero-orbit-inner"
              />

              {aboutHeroOrbitItems.map((item) => (
                <motion.div
                  key={item.label}
                  animate={{ y: [0, -10, 0], scale: [1, 1.04, 1] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
                  className="about-hero-float-pill"
                  style={item}
                >
                  {item.label}
                </motion.div>
              ))}

              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="about-hero-card about-hero-card-main"
              >
                <div className="about-hero-card-glow" />
                <motion.div
                  animate={{ x: ["-120%", "160%"] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
                  className="about-hero-card-sweep"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <img src="/hero/logo.png" alt="Izone Logo" className="h-28 w-auto object-contain" />
                </div>

                <div className="about-hero-stack">
                  {[1, 2, 3].map((item, index) => (
                    <motion.div
                      key={item}
                      animate={{ x: [0, index % 2 === 0 ? 18 : 10, 0], y: [0, -3, 0] }}
                      transition={{ duration: 4.6 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
                      className={`about-hero-lane about-hero-lane-${item}`}
                    >
                      <span className="about-hero-lane-icon">
                        {index === 0 ? <Globe2 size={14} /> : <Sparkles size={14} />}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="about-hero-card-footer">
                  <div className="about-hero-flow">
                    {["Discover", "Develop"].map((step, index) => (
                      <motion.div
                        key={step}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.25, ease: "easeInOut" }}
                        className="about-hero-flow-pill"
                      >
                        <span className="about-hero-flow-index">{String(index + 1).padStart(2, "0")}</span>
                        <span>{step}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    animate={{ y: [0, -8, 0], x: [0, 4, 0], scale: [1, 1.03, 1] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                    className="about-hero-status"
                  >
                    <span className="about-hero-status-dot" />
                    Live Motion
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {[{
              icon: Target, title: "Our Mission", dir: -30,
              text: "We strive to develop smart application and websites for our clients for their IT efficiency and business profitability and to be a global leader and expert in providing Smart Training with smart skills.",
              tags: ["Smart Apps", "IT Efficiency", "Global Leader", "Smart Training"],
            }, {
              icon: Eye, title: "Our Vision", dir: 30,
              text: "Our Vision is to provide a smart training with smart skills and developing smart application and website with enthusiastically and with innovative methods in full-fledged customer satisfaction and beyond customer expectation.",
              tags: ["Smart Skills", "Innovation", "Customer First", "Excellence"],
            }].map(({ icon: Icon, title, dir, text, tags }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: dir }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
                className="stack-card-wrapper cursor-default"
              >
                <div className="stack-card p-7 sm:p-8">
                  <div className="relative z-10 flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h2 className="font-display text-xl font-bold">{title}</h2>
                  </div>
                  <p className="relative z-10 text-muted-foreground text-sm leading-relaxed mb-5">{text}</p>
                  <div className="relative z-10 flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full border border-primary/20 bg-card/80 text-xs font-medium text-foreground/80">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="section-label">Our Values</span>
            <h2 className="section-title">What Drives Us</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => {
              const palettes = [
                { line: "from-primary", ring: "ring-primary/40", pulse: "bg-primary", glow: "shadow-primary/20", bg: "bg-primary/10 border-primary/25", text: "text-primary" },
                { line: "from-primary", ring: "ring-primary/40", pulse: "bg-primary", glow: "shadow-primary/20", bg: "bg-primary/10 border-primary/25", text: "text-primary" },
                { line: "from-primary", ring: "ring-primary/40", pulse: "bg-primary", glow: "shadow-primary/20", bg: "bg-primary/10 border-primary/25", text: "text-primary" },
                { line: "from-primary", ring: "ring-primary/40", pulse: "bg-primary", glow: "shadow-primary/20", bg: "bg-primary/10 border-primary/25", text: "text-primary" },
              ];
              const p = palettes[index % palettes.length];
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                  className={`group relative rounded-2xl border border-border/30 bg-card overflow-hidden cursor-default shadow-xl ${p.glow}`}
                >
                  {/* animated gradient sweep on hover */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className={`absolute inset-0 bg-gradient-to-r ${p.line}/10 via-transparent to-transparent pointer-events-none`}
                  />
                  {/* left colour bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${p.line} to-transparent`} />

                  <div className="relative z-10 p-5 sm:p-6">
                    {/* icon with pulse ring */}
                    <div className="relative w-14 h-14 mb-4">
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                        className={`absolute inset-0 rounded-2xl ring-2 ${p.ring} opacity-50`}
                      />
                      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${p.bg}`}>
                        <value.icon className={`w-7 h-7 ${p.text}`} />
                      </div>
                      <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${p.pulse} animate-ping opacity-60`} />
                      <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${p.pulse}`} />
                    </div>

                    <h3 className={`font-bold text-base mb-1.5 group-hover:${p.text} transition-colors`}>{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">{value.description}</p>

                    {/* animated progress bar */}
                    <div className="h-0.5 w-full bg-border/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.4, delay: index * 0.12, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${p.line} to-transparent rounded-full`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-padding">
        <div className="container-custom">
          <CEOCard
            name={ceoData.name}
            role={ceoData.role}
            description={ceoData.description}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Meet the Experts</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ExpertCard
                  name={member.name}
                  role={member.role}
                  avatar={member.avatar}
                  bio={member.bio}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">Company Timeline</h2>
          </motion.div>

          {/* scroll controls */}
          <div className="flex items-center justify-end gap-2 mb-4">
            <button type="button" onClick={showPrevTimeline} className="timeline-showcase-arrow" aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={showNextTimeline} className="timeline-showcase-arrow" aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* horizontal timeline track */}
          <div className="relative">
            <div
              ref={timelineRef}
              onScroll={handleTimelineScroll}
              className="overflow-x-auto scrollbar-hide pb-6"
            >
              <div className="relative inline-flex items-start min-w-max px-8 pt-2">

                {/* horizontal spine line — sits between card bottom and circle top */}
                <div className="absolute left-0 right-0 h-0.5 bg-primary/30" style={{ top: "calc(10rem + 1.5rem + 0.5rem)" }} />

                {milestones.map((milestone, index) => {
                  const phaseColors = [
                    { bg: "bg-primary",         text: "text-white", dot: "bg-primary",         ring: "ring-primary/50",    circle: "bg-primary" },
                    { bg: "bg-primary/85",      text: "text-white", dot: "bg-primary/85",      ring: "ring-primary/40",    circle: "bg-primary/85" },
                    { bg: "bg-primary/70",      text: "text-white", dot: "bg-primary/70",      ring: "ring-primary/35",    circle: "bg-primary/70" },
                    { bg: "bg-primary",         text: "text-white", dot: "bg-primary",         ring: "ring-primary/50",    circle: "bg-primary" },
                    { bg: "bg-primary/85",      text: "text-white", dot: "bg-primary/85",      ring: "ring-primary/40",    circle: "bg-primary/85" },
                    { bg: "bg-primary/70",      text: "text-white", dot: "bg-primary/70",      ring: "ring-primary/35",    circle: "bg-primary/70" },
                  ];
                  const c = phaseColors[index % phaseColors.length];
                  const timelineImage = orderedPhotos.length > 0 ? orderedPhotos[index % orderedPhotos.length] : null;

                  return (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: index * 0.07 }}
                      className="relative flex flex-col items-center w-48 mx-4"
                    >
                      {/* top card — fixed height so all cards align */}
                      <div className={`w-full h-40 rounded-2xl ${c.bg} p-4 shadow-md flex flex-col justify-start`}>
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-white/70 mb-1">{milestone.label}</p>
                        <p className="text-[1rem] font-bold leading-tight text-white">{milestone.title}</p>
                        <p className="text-[0.7rem] font-semibold text-white/80 mt-0.5">{milestone.year}</p>
                        <p className="text-[0.67rem] leading-snug text-white/70 mt-1.5 line-clamp-3">{milestone.description}</p>
                      </div>

                      {/* stem from card to dot — fixed height gap */}
                      <div className="w-px h-6 bg-primary/40" />

                      {/* dot on spine */}
                      <div className={`w-4 h-4 rounded-full ${c.dot} ring-4 ${c.ring} z-10 shrink-0`} />

                      {/* stem from dot to circle */}
                      <div className="w-px h-6 bg-primary/40" />

                      {/* circular image / fallback */}
                      <div className={`w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ${c.ring} shrink-0`}>
                        {timelineImage ? (
                          <img src={timelineImage.url} alt={milestone.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className={`w-full h-full ${c.circle} flex items-center justify-center`}>
                            <span className="text-xl font-bold text-white">{milestone.year.slice(2)}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Site Photos — after timeline, grid preview + explore modal */}
      {orderedPhotos.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="rounded-3xl border border-border/70 bg-card/60 p-5 sm:p-7"
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                <div>
                  <span className="text-primary font-medium text-xs uppercase tracking-[0.22em]">Gallery</span>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-1">Our Moments</h2>
                  <p className="text-sm text-muted-foreground mt-1">Captured photos uploaded by admin.</p>
                </div>
                <button
                  onClick={() => openGalleryAt(0)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
                >
                  <Images size={15} />
                  Explore All ({orderedPhotos.length})
                </button>
              </div>
            
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
                <motion.button
                  type="button"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => openGalleryAt(0)}
                  className="group relative lg:col-span-7 rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[300px] border border-border/60"
                >
                  <img
                    src={previewPhotos[0]?.url}
                    alt={previewPhotos[0]?.name || "Gallery photo"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                  <div className="absolute left-4 bottom-4 text-left text-white">
                    <p className="text-xs uppercase tracking-[0.2em] opacity-80">Featured</p>
                    <p className="text-sm sm:text-base font-semibold truncate max-w-[22rem]">{previewPhotos[0]?.name}</p>
                  </div>
                </motion.button>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4"
                >
                  {previewPhotos.slice(1).map((photo, idx) => (
                    <motion.button
                      type="button"
                      key={photo.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => openGalleryAt(idx + 1)}
                      className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-border/60"
                    >
                      <img src={photo.url} alt={photo.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {showAllPhotos && activePhoto ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={closeGallery}
              aria-label="Close gallery"
            />

            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-6xl"
            >
              <div className="rounded-2xl border border-white/20 bg-black/80 p-3 sm:p-4">
                <div className="relative rounded-xl overflow-hidden bg-black">
                  <img
                    src={activePhoto.url}
                    alt={activePhoto.name || "Gallery image"}
                    className="w-full h-[56vh] sm:h-[68vh] object-contain"
                  />

                  <button
                    type="button"
                    onClick={showPrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/30 transition-colors flex items-center justify-center"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/30 transition-colors flex items-center justify-center"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={closeGallery}
                    className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white/30 transition-colors flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between text-white/90 text-xs sm:text-sm">
                  <p className="truncate pr-4">{activePhoto.name || "Photo"}</p>
                  <p>{activePhotoIndex + 1} / {orderedPhotos.length}</p>
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {orderedPhotos.map((photo, idx) => (
                    <button
                      type="button"
                      key={photo.id}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 rounded-lg overflow-hidden border transition-colors ${idx === activePhotoIndex ? "border-primary" : "border-white/20"}`}
                    >
                      <img src={photo.url} alt={photo.name || `Photo ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Technology Stack */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="section-label">Our Stack</span>
            <h2 className="section-title">Technologies We Master</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
          >
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.title}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                className="stack-card-wrapper"
              >
                <div className="stack-card p-7 sm:p-8">
                  <div className="relative z-10 flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                      <stack.icon size={18} className="text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-bold">{stack.title}</h3>
                  </div>
                  <p className="relative z-10 text-muted-foreground text-sm leading-relaxed mb-5">{stack.desc}</p>
                  <div className="relative z-10 flex flex-wrap gap-2">
                    {stack.items.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full border border-primary/20 bg-card/80 text-xs font-medium text-foreground/80">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;




