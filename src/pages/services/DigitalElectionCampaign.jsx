import { motion } from 'framer-motion';
import { Vote, Users, MapPin, BarChart3, Megaphone, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';
import StackStatCard from '../../components/ui/StackStatCard';


const services = [
  {
    title: 'Voter Outreach',
    summary: 'Reach millions of voters through multi-channel digital campaigns.',
    fullContent:
      'Connect with voters across SMS, WhatsApp, voice calls, and social media with coordinated campaigns designed to maximize reach and engagement.',
    icon: Vote,
    features: ['Multi-Channel Reach', 'Mass Messaging', 'Personalized Appeals', 'Language Support', 'Timed Delivery'],
    shape3D: 'cube',
  },
  {
    title: 'Constituency Mapping',
    summary: 'Target voters precisely with geo-targeted constituency campaigns.',
    fullContent:
      'Leverage advanced geo-targeting to reach voters in specific constituencies, wards, and booths with localized messaging and candidate information.',
    icon: MapPin,
    features: ['Geo-Targeting', 'Booth Level Data', 'Ward Segmentation', 'Rural/Urban Split', 'Location Analytics'],
    shape3D: 'sphere',
  },
  {
    title: 'Volunteer Management',
    summary: 'Coordinate and mobilize campaign volunteers effectively.',
    fullContent:
      'Manage your ground force with tools for volunteer registration, task assignment, progress tracking, and real-time communication during elections.',
    icon: Users,
    features: ['Volunteer Database', 'Task Assignment', 'Mobile App', 'Progress Tracking', 'Team Communication'],
    shape3D: 'torus',
  },
  {
    title: 'Campaign Analytics',
    summary: 'Track campaign performance with real-time analytics and insights.',
    fullContent:
      'Monitor your campaign effectiveness with dashboards showing reach, engagement, sentiment analysis, and voter response patterns across all channels.',
    icon: BarChart3,
    features: ['Real-time Dashboard', 'Sentiment Analysis', 'Engagement Metrics', 'Voter Response', 'Trend Reports'],
    shape3D: 'octahedron',
  },
  {
    title: 'Social Media Strategy',
    summary: 'Dominate social media with strategic content and advertising.',
    fullContent:
      'Build a strong social media presence with viral content, targeted ads, influencer partnerships, and rapid response strategies for maximum impact.',
    icon: Megaphone,
    features: ['Content Strategy', 'Paid Advertising', 'Viral Campaigns', 'Influencer Outreach', 'Crisis Management'],
    shape3D: 'cube',
  },
  {
    title: 'Compliance & Security',
    summary: 'Ensure campaign compliance with election laws and data security.',
    fullContent:
      'Run compliant campaigns with built-in safeguards for election regulations, spending limits, content guidelines, and secure voter data handling.',
    icon: Shield,
    features: ['Election Compliance', 'Spending Tracking', 'Content Review', 'Data Security', 'Audit Trail'],
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

const DigitalElectionCampaign = () => {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="Digital Election Campaign"
        eyebrow="High-reach voter engagement"
        title={<>Win Elections <span className="page-hero__title-accent">Digitally</span></>}
        description="Comprehensive digital campaign solutions to reach voters, mobilize supporters, and secure victory."
        chips={["Voter outreach", "Geo targeting", "Campaign analytics"]}
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
                  Ready to Win Your Campaign?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Partner with us for a winning digital election strategy.
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

export default DigitalElectionCampaign;




