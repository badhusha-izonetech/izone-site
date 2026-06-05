import { motion } from 'framer-motion';
import { Landmark, FileText, ShieldCheck, Bell, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import StackStatCard from '@/components/ui/StackStatCard';

const projects = [
  {
    icon: FileText,
    title: 'Minnagam',
    description: 'A unified digital portal connecting vendors with government tender opportunities, transparent, fast, and fully compliant.',
    features: ['Tender Listings', 'Vendor Management', 'Smart Alerts', 'Bid Submission', 'Document Vault'],
  },
  {
    icon: ShieldCheck,
    title: 'Verified Tender System',
    description: 'All tenders sourced directly from official government portals with real-time updates and compliance checks.',
    features: ['Official Sources', 'Real-time Updates', 'Document Verification', 'Audit Trail', 'Compliance Check'],
  },
  {
    icon: Bell,
    title: 'Smart Notification Engine',
    description: 'Instant alerts for new tenders matching vendor profiles via email, SMS, and in-app notifications.',
    features: ['Email Alerts', 'SMS Notifications', 'Custom Keywords', 'Deadline Reminders', 'Bid Updates'],
  },
  {
    icon: Users,
    title: 'Vendor Dashboard',
    description: 'Manage your vendor profile, documents, and bid submissions from a single centralized dashboard.',
    features: ['Profile Management', 'Document Vault', 'Bid History', 'Win/Loss Analysis', 'Team Collaboration'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function GovernmentTenders() {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="Government Tenders"
        badgeIcon={<Landmark size={15} />}
        eyebrow="Procurement made simpler"
        title={<>Government Tender <span className="page-hero__title-accent">Solutions</span></>}
        description="Digital platforms that simplify government procurement, connecting vendors, contractors, and departments seamlessly."
        chips={["Verified tenders", "Smart notifications", "Vendor workflows"]}
      />

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <span className="section-label">Our Projects</span>
            <h2 className="section-title">What We've Built</h2>
            <p className="section-subtitle">End-to-end tender management systems built for scale and compliance.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <StackStatCard
                key={project.title}
                title={project.title}
                description={project.description}
                Icon={project.icon}
                tags={project.features}
                delay={index * 0.05}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="stack-card-wrapper p-px max-w-4xl mx-auto"
          >
            <div className="stack-card p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-accent/8" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Ready to Modernize Tender Management?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Let's build a transparent, efficient government tender platform tailored to your needs.
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
