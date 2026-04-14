import { motion } from 'framer-motion';
import { MessageSquare, Send, Users, BarChart3, Clock, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';
import StackStatCard from '../../components/ui/StackStatCard';

const services = [
  {
    title: 'Mass SMS Broadcasting',
    summary: 'Send thousands of messages instantly to your audience with our robust bulk SMS platform.',
    fullContent: 'Reach your customers instantly with our high-capacity SMS broadcasting system. Perfect for promotions, alerts, and mass communications with guaranteed delivery rates.',
    icon: Send,
    features: ['Instant Delivery', 'High Volume Capacity', 'Delivery Reports', 'Scheduled Sending', 'Custom Sender ID'],
    shape3D: 'cube',
  },
  {
    title: 'Promotional Campaigns',
    summary: 'Create engaging promotional SMS campaigns that drive sales and customer engagement.',
    fullContent: 'Design and execute powerful promotional campaigns with personalized messages, tracking, and analytics to maximize your marketing ROI.',
    icon: MessageSquare,
    features: ['Campaign Templates', 'Personalization', 'A/B Testing', 'Click Tracking', 'Conversion Analytics'],
    shape3D: 'sphere',
  },
  {
    title: 'Contact Management',
    summary: 'Organize and segment your contact lists for targeted and effective messaging.',
    fullContent: 'Manage your contacts efficiently with advanced segmentation, import/export tools, and automated list cleaning to ensure your messages reach the right people.',
    icon: Users,
    features: ['List Segmentation', 'CSV Import/Export', 'Duplicate Removal', 'Opt-out Management', 'Custom Fields'],
    shape3D: 'torus',
  },
  {
    title: 'Analytics & Reporting',
    summary: 'Track campaign performance with detailed analytics and comprehensive reports.',
    fullContent: 'Get deep insights into your SMS campaigns with real-time analytics, delivery reports, and performance metrics to optimize your messaging strategy.',
    icon: BarChart3,
    features: ['Real-time Tracking', 'Delivery Reports', 'Performance Metrics', 'Export Reports', 'ROI Analysis'],
    shape3D: 'octahedron',
  },
  {
    title: 'Scheduled Messaging',
    summary: 'Plan and schedule your SMS campaigns in advance for optimal timing and reach.',
    fullContent: 'Schedule your messages to be sent at the perfect time. Set up recurring campaigns, time-zone aware delivery, and automated follow-ups.',
    icon: Clock,
    features: ['Time-zone Support', 'Recurring Campaigns', 'Queue Management', 'Auto Follow-ups', 'Calendar View'],
    shape3D: 'cube',
  },
  {
    title: 'Secure & Compliant',
    summary: 'Enterprise-grade security with full regulatory compliance for peace of mind.',
    fullContent: 'Our platform ensures your data is protected with encryption, secure APIs, and full compliance with telecommunications regulations and data protection laws.',
    icon: Shield,
    features: ['Data Encryption', 'GDPR Compliant', 'DND Filtering', 'Secure APIs', 'Audit Logs'],
    shape3D: 'sphere',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const BulkSms = () => {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="Bulk SMS Services"
        eyebrow="High-volume messaging"
        title={<>Reach Thousands <span className="page-hero__title-accent">Instantly</span></>}
        description="Powerful bulk SMS solutions to connect with your audience effectively and drive engagement at scale."
        chips={["Instant delivery", "Campaign scheduling", "Delivery reports"]}
      />

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <StackStatCard
                key={service.title}
                title={service.title}
                description={service.summary}
                Icon={service.icon}
                tags={service.features?.slice(0, 5)}
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
                  Ready to Start Messaging?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Get started with our bulk SMS platform and reach your audience today.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="rounded-full px-8">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BulkSms;




