import { motion } from 'framer-motion';
import { Palette, Image, Layers, Box, Monitor, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StackStatCard from '../../components/ui/StackStatCard';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';

const services = [
  {
    title: 'Brand Identity Design',
    summary: 'Complete visual identity systems that make your brand memorable.',
    fullContent: 'We create comprehensive brand identities including logos, color palettes, typography, and brand guidelines that establish a strong, cohesive visual presence across all touchpoints.',
    icon: Sparkles,
    features: ['Logo Design', 'Color Palette', 'Typography Selection', 'Brand Guidelines', 'Stationery Design'],
    shape3D: 'octahedron',
  },
  {
    title: 'UI/UX Design',
    summary: 'User-centered interface designs that delight and convert.',
    fullContent: 'Our UI/UX designers create intuitive, beautiful interfaces for websites and applications. We focus on user research, wireframing, prototyping, and pixel-perfect visual design.',
    icon: Monitor,
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
    shape3D: 'cube',
  },
  {
    title: 'Social Media Graphics',
    summary: 'Scroll-stopping visuals optimized for every social platform.',
    fullContent: 'We design engaging social media graphics including posts, stories, covers, and ads that maintain brand consistency while maximizing engagement on each platform.',
    icon: Image,
    features: ['Post Templates', 'Story Designs', 'Cover Images', 'Ad Creatives', 'Carousel Graphics'],
    shape3D: 'sphere',
  },
  {
    title: 'Print Design',
    summary: 'High-quality print materials from business cards to banners.',
    fullContent: 'From business cards to large format banners, we create print-ready designs that look stunning in the physical world. All files are prepared to professional printing standards.',
    icon: Layers,
    features: ['Business Cards', 'Brochures', 'Flyers & Posters', 'Banners', 'Packaging Design'],
    shape3D: 'torus',
  },
  {
    title: 'Illustration',
    summary: 'Custom illustrations that bring your ideas to life.',
    fullContent: 'Our illustrators create unique, custom artwork including character design, infographics, icons, and editorial illustrations that add personality and clarity to your content.',
    icon: Palette,
    features: ['Custom Illustrations', 'Icon Design', 'Infographics', 'Character Design', 'Editorial Art'],
    shape3D: 'octahedron',
  },
  {
    title: 'Motion Graphics',
    summary: 'Animated visuals that capture attention and tell stories.',
    fullContent: 'We create dynamic motion graphics including logo animations, explainer videos, social media animations, and presentation graphics that bring your brand to life.',
    icon: Box,
    features: ['Logo Animation', 'Explainer Videos', 'Social Animations', 'Presentation Graphics', 'GIF Creation'],
    shape3D: 'cube',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const GraphicsDesigner = () => {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="Graphics Design"
        eyebrow="Visual systems that stand out"
        title={<>Visual Design <span className="page-hero__title-accent">Excellence</span></>}
        description="Creative graphic design that transforms your ideas into stunning visuals that captivate and communicate."
        chips={["Brand identity", "Social visuals", "Motion graphics"]}
      />

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} className="stack-card-wrapper p-px max-w-4xl mx-auto">
            <div className="stack-card p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-accent/8" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Ready to Elevate Your Visual Brand?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Let's create designs that make your brand stand out from the competition.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="rounded-full px-8">
                    Start a Project
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

export default GraphicsDesigner;
