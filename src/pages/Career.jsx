import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Heart, Coffee, Laptop, Globe, Users, Rocket,
  MapPin, Briefcase, Clock, X, Upload, GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  { icon: Heart, title: "Health Insurance", description: "Comprehensive medical coverage for you and your family." },
  { icon: Coffee, title: "Free Snacks & Coffee", description: "Fully stocked kitchen with premium coffee and snacks." },
  { icon: Laptop, title: "Latest Equipment", description: "Top-of-the-line tools you need to succeed." },
  { icon: Globe, title: "Remote Flexibility", description: "Work from anywhere with our hybrid remote-first culture." },
  { icon: Users, title: "Team Events", description: "Regular team outings, hackathons, and company retreats." },
  { icon: Rocket, title: "Learning Budget", description: "Annual budget for courses and professional development." },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const emptyJob = { name: "", email: "", phone: "", address: "", qualification: "", experience: "", location: "", message: "", resume: "", resumeName: "", resumeType: "" };
const emptyIntern = { name: "", email: "", phone: "", address: "", role: "", duration: "", qualification: "", skills: "", message: "", resume: "", resumeName: "", resumeType: "" };
const CAREER_HERO_IMAGE = "/assests/career.png";
const ALLOWED_RESUME_EXTENSIONS = ["pdf", "doc", "docx"];
const ALLOWED_RESUME_MESSAGE = "Only PDF, DOC, and DOCX files are allowed.";
const FORM_INPUT_CLASS = "rounded-full border-input bg-background text-foreground placeholder:text-muted-foreground";
const FORM_TEXTAREA_CLASS = "rounded-xl border-input bg-background text-foreground placeholder:text-muted-foreground resize-none";
const FORM_UPLOAD_CLASS = "flex items-center gap-3 rounded-full border border-dashed border-input bg-muted/45 px-4 py-2.5 transition-colors hover:border-primary/50";

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      {children}
      {error && <p className="text-xs text-primary">{error}</p>}
    </div>
  );
}

function ApplyModal({ title, onClose, onSubmit, children, image }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.classList.add("modal-open");
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
    };
  }, []);

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        style={{ maxWidth: 760, maxHeight: "calc(100vh - 1.5rem)" }}
      >
        {/* Left green panel — fixed width, hidden on mobile */}
        <div
          className="hidden md:flex flex-col items-center justify-center bg-primary p-8 relative overflow-hidden"
          style={{ width: 280, minWidth: 280, flexShrink: 0 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
          <img
            src="https://illustrations.popsy.co/green/work-from-home.svg"
            alt=""
            aria-hidden="true"
            className="w-48 h-48 object-contain relative z-10 drop-shadow-xl"
          />
          <div className="relative z-10 mt-6 text-center">
            <h3 className="text-white font-display text-lg font-bold leading-snug">{title}</h3>
            <p className="text-white/70 text-sm mt-2 leading-relaxed">Fill in your details and we'll get back to you shortly.</p>
          </div>
        </div>

        {/* Right white form panel */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-card text-card-foreground">
          {/* Mobile-only top green banner */}
          <div className="md:hidden flex items-center gap-4 bg-primary px-5 py-4">
            <img
              src="https://illustrations.popsy.co/green/work-from-home.svg"
              alt=""
              aria-hidden="true"
              className="w-16 h-16 object-contain shrink-0"
            />
            <div>
              <h3 className="text-white font-display font-bold text-sm leading-snug">{title}</h3>
              <p className="text-white/70 text-xs mt-0.5">Fill in your details below.</p>
            </div>
          </div>
          {/* Mobile header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0 md:pt-5">
            <div>
              <p className="text-sm text-muted-foreground">Complete the form below to apply.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 shrink-0 rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary flex items-center justify-center"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          {/* Mobile-only title */}
          <div className="md:hidden px-5 pb-3 shrink-0">
            <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="flex flex-col min-h-0 flex-1">
            <div ref={scrollRef} className="overflow-y-auto px-5 pb-2 space-y-3 flex-1">
              {children}
            </div>
            <div className="sticky bottom-0 flex shrink-0 justify-end gap-3 border-t border-border bg-card px-5 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-input px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}

export default function Career() {
  const { jobRoles, internRoles, addJobApplication, addInternApplication } = useAdmin();
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const [jobModal, setJobModal] = useState(null);
  const [internModal, setInternModal] = useState(false);
  const [jobForm, setJobForm] = useState(emptyJob);
  const [internForm, setInternForm] = useState(emptyIntern);
  const [jobErrors, setJobErrors] = useState({});
  const [internErrors, setInternErrors] = useState({});

  const setJ = (k) => (e) => setJobForm((f) => ({ ...f, [k]: e.target.value }));
  const setI = (k) => (e) => setInternForm((f) => ({ ...f, [k]: e.target.value }));

  const handleFile = (setter, setErrors) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_RESUME_EXTENSIONS.includes(ext)) {
      setter((f) => ({ ...f, resume: "", resumeName: "", resumeType: "" }));
      setErrors((current) => ({ ...current, resume: ALLOWED_RESUME_MESSAGE }));
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setter((f) => ({
        ...f,
        resume: ev.target.result,
        resumeName: file.name,
        resumeType: file.type || ext,
      }));
      setErrors((current) => ({ ...current, resume: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const validateJob = () => {
    const e = {};
    if (!jobForm.name.trim()) e.name = "Required";
    if (!jobForm.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(jobForm.email)) e.email = "Invalid email";
    if (!jobForm.phone.trim()) e.phone = "Required";
    if (!jobForm.address.trim()) e.address = "Required";
    if (!jobForm.qualification.trim()) e.qualification = "Required";
    if (!jobForm.experience.trim()) e.experience = "Required";
    if (!jobForm.resume) e.resume = "Resume is required";
    setJobErrors(e);
    return !Object.keys(e).length;
  };

  const validateIntern = () => {
    const e = {};
    if (!internForm.name.trim()) e.name = "Required";
    if (!internForm.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(internForm.email)) e.email = "Invalid email";
    if (!internForm.phone.trim()) e.phone = "Required";
    if (!internForm.address.trim()) e.address = "Required";
    if (!internForm.role.trim()) e.role = "Required";
    if (!internForm.qualification.trim()) e.qualification = "Required";
    if (!internForm.resume) e.resume = "Resume is required";
    setInternErrors(e);
    return !Object.keys(e).length;
  };

  const submitJob = (e) => {
    e.preventDefault();
    if (!validateJob()) return;
    addJobApplication({ ...jobForm, jobRole: jobModal.roleName });
    setJobModal(null);
    setJobForm(emptyJob);
    setJobErrors({});
    toast({ title: "Application Submitted!", description: "We'll get back to you soon." });
  };

  const submitIntern = (e) => {
    e.preventDefault();
    if (!validateIntern()) return;
    addInternApplication(internForm);
    setInternModal(false);
    setInternForm(emptyIntern);
    setInternErrors({});
    toast({ title: "Application Submitted!", description: "We'll review your internship application." });
  };

  return (
    <Layout hideScrollToTop={Boolean(jobModal || internModal)} hideFooter={Boolean(internModal)}>
      {/* Hero */}
      <section className="relative flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-28 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--site-highlight)/0.14),transparent_26%),radial-gradient(circle_at_78%_28%,hsl(var(--site-highlight)/0.10),transparent_24%),linear-gradient(180deg,hsl(var(--site-background)/0.96),hsl(var(--site-background)/0.92))]" />
        <div className="absolute inset-y-0 left-0 w-full max-w-[34rem] bg-gradient-to-r from-primary/8 via-transparent to-transparent" />

        <div className="container-custom relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl text-center lg:text-left"
          >
            <span className="page-badge">Join Our Team</span>
            <h1 className="font-display mb-5 text-4xl font-bold md:text-5xl lg:text-6xl">
              Build Your Career
              <span className="gradient-text block">With Us</span>
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0 mx-auto">
              Join a team of passionate innovators, grow your craft, and help shape the future of digital products.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="#open-positions">View Openings</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8"
                onClick={() => { setInternModal(true); setInternForm(emptyIntern); setInternErrors({}); }}
              >
                Apply for Internship
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
                  : { y: [0, -14, 0], rotate: [0, -1.2, 0, 1.2, 0], scale: [1, 1.03, 1] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 7.4, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative z-10"
            >
              <img
                src={CAREER_HERO_IMAGE}
                alt="Illustration showing career growth and opportunity"
                className="h-full w-full object-contain drop-shadow-[0_32px_72px_rgba(0,0,0,0.16)]"
                style={{ clipPath: "inset(2px 0 0 0)" }}
                loading="eager"
              />
            </motion.div>
            <motion.div
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, -12, 0], y: [0, -12, 0], opacity: [0.38, 0.7, 0.38] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 6.1, repeat: Infinity, ease: "easeInOut" }
              }
              className="absolute left-10 top-8 h-36 w-36 rounded-full bg-primary/15 blur-3xl"
            />
            <motion.div
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, 18, 0], y: [0, 10, 0], opacity: [0.34, 0.72, 0.34] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }
              className="absolute bottom-8 right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="text-center mb-16">
            <span className="section-label">Benefits & Perks</span>
            <h2 className="section-title">We Take Care of Our Team</h2>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-card p-6 hover-glow flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="text-center mb-16">
            <span className="section-label">Open Positions</span>
            <h2 className="section-title">Current Openings</h2>
          </motion.div>

          {jobRoles.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No open positions at the moment. Check back soon!</p>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="space-y-4 max-w-4xl mx-auto">
              {jobRoles.map((job) => (
                <motion.div key={job.id} variants={itemVariants} className="glass-card p-6 hover-glow flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2">{job.roleName}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" />{job.qualification}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.workTiming}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                      <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        <Briefcase className="w-3 h-3" />{job.workCulture}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="glow-border hover-glow shrink-0"
                    onClick={() => { setJobModal(job); setJobForm(emptyJob); setJobErrors({}); }}
                  >
                    Apply Now
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Internship Program */}
      <section id="internship-program" className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="glass-card glow-border p-12 text-center relative overflow-hidden max-w-3xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <span className="text-primary font-medium">Internship Program</span>
              <h2 className="font-display text-3xl font-bold mt-2 mb-4">Start Your Journey With Us</h2>
              <p className="text-muted-foreground mb-8">
                We offer internship opportunities for students and fresh graduates. Gain real-world experience working alongside our expert team.
              </p>
              <Button
                size="lg"
                className="glow-border hover-glow"
                onClick={() => { setInternModal(true); setInternForm(emptyIntern); setInternErrors({}); }}
              >
                Apply for Internship
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Apply Modal */}
      {jobModal && (
        <ApplyModal title={`Apply — ${jobModal.roleName}`} image="/assests/career.png" onClose={() => setJobModal(null)} onSubmit={submitJob}>
          <Field label="Full Name *" error={jobErrors.name}>
            <Input placeholder="John Doe" value={jobForm.name} onChange={setJ("name")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Email *" error={jobErrors.email}>
            <Input type="email" placeholder="john@example.com" value={jobForm.email} onChange={setJ("email")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Phone Number *" error={jobErrors.phone}>
            <Input placeholder="+91 9999999999" value={jobForm.phone} onChange={setJ("phone")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Qualification *" error={jobErrors.qualification}>
            <Input placeholder="e.g. B.Tech in Computer Science" value={jobForm.qualification} onChange={setJ("qualification")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Experience *" error={jobErrors.experience}>
            <Input placeholder="e.g. 2 years in React development" value={jobForm.experience} onChange={setJ("experience")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Address *" error={jobErrors.address}>
            <Input placeholder="Your full address" value={jobForm.address} onChange={setJ("address")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Current Location">
            <Input placeholder="e.g. Chennai, Tamil Nadu" value={jobForm.location} onChange={setJ("location")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Cover Letter">
            <Textarea placeholder="Tell us why you're a great fit..." rows={3} value={jobForm.message} onChange={setJ("message")} className={FORM_TEXTAREA_CLASS} />
          </Field>
          <Field label="Resume / Document *" error={jobErrors.resume}>
            <label className={`${FORM_UPLOAD_CLASS} cursor-pointer`}>
              <Upload size={15} className="shrink-0 text-muted-foreground" />
              <span className="truncate text-sm text-muted-foreground">{jobForm.resumeName || "Upload resume (PDF, DOC, DOCX)"}</span>
              <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={handleFile(setJobForm, setJobErrors)} />
            </label>
          </Field>
        </ApplyModal>
      )}

      {/* Intern Apply Modal */}
      {internModal && (
        <ApplyModal title="Apply for Internship" image="/assests/career.png" onClose={() => setInternModal(false)} onSubmit={submitIntern}>
          <Field label="Full Name *" error={internErrors.name}>
            <Input placeholder="John Doe" value={internForm.name} onChange={setI("name")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Email *" error={internErrors.email}>
            <Input type="email" placeholder="john@example.com" value={internForm.email} onChange={setI("email")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Phone Number *" error={internErrors.phone}>
            <Input placeholder="+91 9999999999" value={internForm.phone} onChange={setI("phone")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Address *" error={internErrors.address}>
            <Input placeholder="Your full address" value={internForm.address} onChange={setI("address")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Internship Role *" error={internErrors.role}>
            {internRoles.length > 0 ? (
              <select
                value={internForm.role}
                onChange={setI("role")}
                className="h-10 w-full rounded-full border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
              >
                <option value="">Select a role...</option>
                {internRoles.map((r) => (
                  <option key={r.id} value={r.roleName}>{r.roleName}</option>
                ))}
              </select>
            ) : (
              <Input placeholder="e.g. Frontend Development Intern" value={internForm.role} onChange={setI("role")} className={FORM_INPUT_CLASS} />
            )}
          </Field>
          <Field label="Qualification *" error={internErrors.qualification}>
            <Input placeholder="e.g. B.Tech 3rd Year, CS" value={internForm.qualification} onChange={setI("qualification")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Skills">
            <Input placeholder="e.g. React, Node.js, Python" value={internForm.skills} onChange={setI("skills")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Preferred Duration">
            <Input placeholder="e.g. 3 months" value={internForm.duration} onChange={setI("duration")} className={FORM_INPUT_CLASS} />
          </Field>
          <Field label="Message">
            <Textarea placeholder="Tell us about yourself..." rows={3} value={internForm.message} onChange={setI("message")} className={FORM_TEXTAREA_CLASS} />
          </Field>
          <Field label="Resume / Document *" error={internErrors.resume}>
            <label className={`${FORM_UPLOAD_CLASS} cursor-pointer`}>
              <Upload size={15} className="shrink-0 text-muted-foreground" />
              <span className="truncate text-sm text-muted-foreground">{internForm.resumeName || "Upload resume (PDF, DOC, DOCX)"}</span>
              <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={handleFile(setInternForm, setInternErrors)} />
            </label>
          </Field>
        </ApplyModal>
      )}
    </Layout>
  );
}


