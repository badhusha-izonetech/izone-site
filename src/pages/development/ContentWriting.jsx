import { motion } from 'framer-motion';
import { PenTool, FileText, BookOpen, Search, Mail, Newspaper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';
import StackStatCard from '../../components/ui/StackStatCard';


const services = [
  {
    title: 'Blog Writing',
    summary: 'Engaging blog posts that educate, entertain, and convert your audience.',
    fullContent: 'Our expert writers create compelling blog content optimized for both readers and search engines. We research trending topics, incorporate keywords naturally, and maintain your brand voice.',
    icon: PenTool,
    features: ['Topic Research', 'SEO Optimization', 'Engaging Headlines', 'Internal Linking', 'Call-to-Actions'],
    shape3D: 'cube',
  },
  {
    title: 'Website Copywriting',
    summary: 'Persuasive web copy that communicates your value and drives action.',
    fullContent: 'From homepage heroes to product descriptions, we craft website copy that clearly communicates your unique value proposition and guides visitors toward conversion.',
    icon: FileText,
    features: ['Homepage Copy', 'Landing Pages', 'Product Descriptions', 'About Us Pages', 'Service Pages'],
    shape3D: 'sphere',
  },
  {
    title: 'SEO Content',
    summary: 'Search-optimized content that ranks and drives organic traffic.',
    fullContent: 'We create content specifically designed to rank on search engines. Our SEO writing process includes keyword research, competitor analysis, and on-page optimization.',
    icon: Search,
    features: ['Keyword Research', 'Meta Descriptions', 'Header Optimization', 'Featured Snippets', 'Content Clusters'],
    shape3D: 'torus',
  },
  {
    title: 'Email Marketing',
    summary: 'Email campaigns that engage subscribers and drive conversions.',
    fullContent: 'From welcome sequences to promotional campaigns, we write emails that get opened, read, and clicked. Our approach combines compelling copy with proven email marketing strategies.',
    icon: Mail,
    features: ['Welcome Sequences', 'Newsletters', 'Promotional Emails', 'Drip Campaigns', 'A/B Testing Copy'],
    shape3D: 'octahedron',
  },
  {
    title: 'Technical Writing',
    summary: 'Clear, concise documentation and technical content for complex topics.',
    fullContent: 'We simplify complex technical concepts into clear, user-friendly documentation. From API guides to user manuals, we make technical content accessible.',
    icon: BookOpen,
    features: ['Documentation', 'User Guides', 'API Documentation', 'Whitepapers', 'Case Studies'],
    shape3D: 'cube',
  },
  {
    title: 'Press Releases',
    summary: 'Newsworthy press releases that get media attention.',
    fullContent: "We write compelling press releases that capture journalists' attention and get your news covered. Our releases follow AP style guidelines and include all essential elements.",
    icon: Newspaper,
    features: ['News Announcements', 'Product Launches', 'Company Updates', 'Media Pitches', 'Distribution Support'],
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

const ContentWriting = () => {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="Content Writing"
        eyebrow="Messaging that sells"
        title={<>Words That <span className="page-hero__title-accent">Convert</span></>}
        description="Professional content writing that engages your audience, builds trust, and drives business results."
        chips={["SEO content", "Website copy", "Email campaigns"]}
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
                  Need Compelling Content?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Let's create content that tells your story and connects with your audience.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="rounded-full px-8">
                    Get a Quote
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

export default ContentWriting;




