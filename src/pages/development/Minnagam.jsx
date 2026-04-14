import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Users, Bell, ArrowRight, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import StackStatCard from '@/components/ui/StackStatCard';

const features = [
  {
    icon: FileText,
    title: 'Tender Listings',
    description: 'Browse and search all active government tenders in one place with advanced filters.',
    features: ['Category Filter', 'Department Filter', 'Date Range', 'Keyword Search', 'Status Tracking'],
  },
  {
    icon: ShieldCheck,
    title: 'Verified & Authentic',
    description: 'All tenders are sourced directly from official government portals ensuring authenticity.',
    features: ['Official Sources', 'Real-time Updates', 'Document Verification', 'Audit Trail', 'Compliance Check'],
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Get notified instantly when new tenders matching your profile are published.',
    features: ['Email Alerts', 'SMS Notifications', 'Custom Keywords', 'Deadline Reminders', 'Bid Updates'],
  },
  {
    icon: Users,
    title: 'Vendor Management',
    description: 'Manage your vendor profile, documents, and bid submissions from a single dashboard.',
    features: ['Profile Management', 'Document Vault', 'Bid History', 'Win/Loss Analysis', 'Team Collaboration'],
  },
];

const process = [
  { step: '01', title: 'Register', description: 'Create your vendor profile and upload required documents.' },
  { step: '02', title: 'Discover', description: 'Browse tenders filtered by category, department, and value.' },
  { step: '03', title: 'Prepare', description: 'Download tender documents and prepare your bid with our tools.' },
  { step: '04', title: 'Submit', description: 'Submit bids digitally with e-signature and track status live.' },
];

const stats = [
  { value: '10,000+', label: 'Active Tenders' },
  { value: '500+', label: 'Government Departments' },
  { value: '25,000+', label: 'Registered Vendors' },
  { value: '98%', label: 'Uptime Guarantee' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Minnagam() {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="Government Tenders"
        badgeIcon={<ClipboardList size={15} />}
        eyebrow="Unified tender access"
        title={<>Minnagam <span className="page-hero__title-accent">Tender Portal</span></>}
        description="A unified digital platform connecting vendors with government tender opportunities, transparent, fast, and fully compliant."
        chips={["Tender listings", "Verified updates", "Vendor dashboard"]}
        actions={
          <>
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/contact">Get Started <ArrowRight className="ml-1 w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-7">
              <Link to="/get-started">Request Demo</Link>
            </Button>
          </>
        }
      />

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={itemVariants} className="stack-card-wrapper p-px">
                <div className="stack-card p-6 text-center">
                  <p className="text-3xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <span className="section-label">Features</span>
            <h2 className="section-title">Everything You Need to Win Tenders</h2>
            <p className="section-subtitle">Built for vendors, contractors, and suppliers who want a competitive edge.</p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="grid md:grid-cols-2 gap-8"
          >
            {features.map((f, i) => (
              <StackStatCard
                key={f.title}
                title={f.title}
                description={f.description}
                Icon={f.icon}
                tags={f.features}
                delay={i * 0.05}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-card/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Simple 4-Step Process</h2>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {process.map((item) => (
              <motion.div key={item.step} variants={itemVariants} whileHover={{ y: -6 }} className="stack-card-wrapper p-px">
                <div className="stack-card p-6 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-display font-bold text-primary/10">{item.step}</div>
                  <div className="relative z-10">
                    <span className="text-primary font-display font-bold text-sm">Step {item.step}</span>
                    <h3 className="font-display text-xl font-bold mt-2 mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="stack-card-wrapper p-px max-w-4xl mx-auto"
          >
            <div className="stack-card p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-accent/8" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Access Government Tenders?</h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Join thousands of vendors already using Minnagam to discover and win government contracts.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="rounded-full px-8">
                    Contact Us <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
