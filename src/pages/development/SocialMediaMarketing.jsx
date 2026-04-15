import { motion } from 'framer-motion';
import { Share2, TrendingUp, Users, MessageCircle, BarChart3, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';
import { Button } from '../../components/ui/button';
import StackStatCard from '../../components/ui/StackStatCard';


const services = [
  {
    title: 'Social Media Strategy',
    summary: 'Comprehensive strategies tailored to your brand voice and business goals.',
    fullContent: 'We develop data-driven social media strategies that align with your business objectives. Our approach includes audience analysis, competitive research, content calendars, and KPI tracking.',
    icon: Target,
    features: ['Audience Research', 'Competitive Analysis', 'Content Calendar', 'KPI Definition', 'Platform Selection'],
    shape3D: 'octahedron',
  },
  {
    title: 'Content Creation',
    summary: 'Engaging visual and written content that resonates with your audience.',
    fullContent: 'Our creative team produces scroll-stopping content including graphics, videos, reels, stories, and captions that capture attention and drive engagement across all platforms.',
    icon: Share2,
    features: ['Graphics & Images', 'Video Production', 'Reels & Stories', 'Copywriting', 'Brand Guidelines'],
    shape3D: 'cube',
  },
  {
    title: 'Community Management',
    summary: 'Build and nurture an engaged community around your brand.',
    fullContent: 'We handle all aspects of community management including responding to comments, DMs, mentions, and building meaningful relationships with your followers and potential customers.',
    icon: Users,
    features: ['Comment Management', 'DM Responses', 'Community Building', 'Crisis Management', 'Influencer Outreach'],
    shape3D: 'sphere',
  },
  {
    title: 'Paid Advertising',
    summary: 'Targeted ad campaigns that maximize ROI across all major platforms.',
    fullContent: 'We create and manage high-performing paid campaigns on Facebook, Instagram, LinkedIn, and TikTok with precise targeting, A/B testing, and continuous optimization.',
    icon: TrendingUp,
    features: ['Facebook & Instagram Ads', 'LinkedIn Advertising', 'TikTok Campaigns', 'Retargeting', 'A/B Testing'],
    shape3D: 'torus',
  },
  {
    title: 'Analytics & Reporting',
    summary: 'In-depth analytics and insights to measure and improve performance.',
    fullContent: 'We provide comprehensive monthly reports with actionable insights, including engagement metrics, audience growth, conversion tracking, and recommendations for improvement.',
    icon: BarChart3,
    features: ['Monthly Reports', 'Engagement Metrics', 'ROI Analysis', 'Competitor Tracking', 'Growth Insights'],
    shape3D: 'octahedron',
  },
  {
    title: 'Influencer Marketing',
    summary: 'Connect with the right influencers to amplify your brand message.',
    fullContent: 'We identify, vet, and manage influencer partnerships that align with your brand values and target audience, ensuring authentic collaborations that drive results.',
    icon: MessageCircle,
    features: ['Influencer Discovery', 'Campaign Management', 'Contract Negotiation', 'Performance Tracking', 'UGC Collection'],
    shape3D: 'cube',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const SocialMediaMarketing = () => {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="Social Media Marketing"
        eyebrow="Audience growth with purpose"
        title={<>Grow Your Brand <span className="page-hero__title-accent">Online</span></>}
        description="Strategic social media management that builds community, drives engagement, and converts followers into customers."
        chips={["Content strategy", "Paid campaigns", "Analytics reporting"]}
      />

      {/* Services Grid */}
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

      {/* CTA Section */}
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
                  Ready to Boost Your Social Presence?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Let's create a social media strategy that grows your audience and drives results.
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

export default SocialMediaMarketing;




