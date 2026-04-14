import { motion } from 'framer-motion';
import { Phone, Mic, Volume2, Radio, Settings, BarChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';
import StackStatCard from '../../components/ui/StackStatCard';

const services = [
  {
    title: 'Automated Voice Calls',
    summary: 'Deliver pre-recorded voice messages to thousands of recipients simultaneously.',
    fullContent: 'Our automated voice call system lets you broadcast important messages, reminders, and promotional content through crystal-clear voice calls at scale.',
    icon: Phone,
    features: ['Mass Broadcasting', 'IVR Integration', 'Call Scheduling', 'Retry Logic', 'Call Recording'],
    shape3D: 'cube',
  },
  {
    title: 'Text-to-Speech',
    summary: 'Convert your text messages into natural-sounding voice calls automatically.',
    fullContent: 'Transform written content into engaging voice messages with our advanced text-to-speech technology supporting multiple languages and voice options.',
    icon: Mic,
    features: ['Multiple Languages', 'Natural Voices', 'Custom Pacing', 'SSML Support', 'Voice Selection'],
    shape3D: 'sphere',
  },
  {
    title: 'Voice Broadcasting',
    summary: 'Reach your entire audience with personalized voice broadcasts in minutes.',
    fullContent: 'Send personalized voice messages to large audiences for announcements, alerts, political campaigns, and promotional activities with high delivery rates.',
    icon: Volume2,
    features: ['Personalization', 'Bulk Delivery', 'Priority Queuing', 'Custom CallerID', 'Time Optimization'],
    shape3D: 'torus',
  },
  {
    title: 'Interactive Voice Response',
    summary: 'Create interactive voice menus for surveys, feedback, and customer engagement.',
    fullContent: 'Build sophisticated IVR systems for collecting customer feedback, conducting surveys, and creating interactive campaigns with keypress responses.',
    icon: Radio,
    features: ['Menu Builder', 'Keypress Capture', 'Survey Creation', 'Response Tracking', 'Data Collection'],
    shape3D: 'octahedron',
  },
  {
    title: 'Campaign Management',
    summary: 'Manage and optimize your voice campaigns with our intuitive dashboard.',
    fullContent: 'Control all aspects of your voice campaigns from a single dashboard with scheduling, audience management, and real-time monitoring capabilities.',
    icon: Settings,
    features: ['Campaign Dashboard', 'Audience Segments', 'A/B Testing', 'Schedule Control', 'Template Library'],
    shape3D: 'cube',
  },
  {
    title: 'Analytics & Insights',
    summary: 'Track call performance with detailed analytics and actionable insights.',
    fullContent: 'Monitor your voice campaign performance with comprehensive analytics including answer rates, call duration, response patterns, and conversion tracking.',
    icon: BarChart,
    features: ['Call Analytics', 'Answer Rates', 'Duration Stats', 'Response Analysis', 'Export Reports'],
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

const VoiceSms = () => {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="Voice SMS Services"
        eyebrow="Broadcast with clarity"
        title={<>Voice That <span className="page-hero__title-accent">Resonates</span></>}
        description="Deliver your message through powerful voice broadcasting and create lasting connections with your audience."
        chips={["Voice campaigns", "IVR workflows", "Audience insights"]}
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
                  Ready to Be Heard?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Start your voice campaign today and connect with your audience.
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

export default VoiceSms;




