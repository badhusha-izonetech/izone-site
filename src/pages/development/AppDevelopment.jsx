import { motion } from 'framer-motion';
import {
  Smartphone,
  TabletSmartphone,
  Layers,
  Palette,
  Zap,
  Store,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';
import StackStatCard from '../../components/ui/StackStatCard';

const services = [
  {
    title: 'iOS App Development',
    summary: 'Native iOS applications built with Swift for the Apple ecosystem.',
    fullContent:
      'Create stunning iOS apps that leverage the full power of Apple devices. From iPhone to iPad, we build native experiences that users love.',
    icon: Smartphone,
    features: [
      'Swift & SwiftUI',
      'iPhone & iPad',
      'Apple Watch',
      'App Store Launch',
      'iOS Updates',
    ],
    shape3D: 'cube',
  },
  {
    title: 'Android Development',
    summary: 'Powerful Android apps built with Kotlin for the Google Play Store.',
    fullContent:
      'Develop feature-rich Android applications that run smoothly across thousands of devices. We use Kotlin and modern Android architecture.',
    icon: TabletSmartphone,
    features: [
      'Kotlin & Java',
      'Material Design',
      'Google Play Launch',
      'Device Testing',
      'Android Updates',
    ],
    shape3D: 'sphere',
  },
  {
    title: 'Cross-Platform Apps',
    summary: 'Build once, deploy everywhere with React Native and Flutter.',
    fullContent:
      'Maximize efficiency with cross-platform development. Single codebase for iOS and Android with near-native performance and consistent experience.',
    icon: Layers,
    features: [
      'React Native',
      'Flutter',
      'Code Reusability',
      'Faster Development',
      'Consistent UX',
    ],
    shape3D: 'torus',
  },
  {
    title: 'UI/UX Design',
    summary: 'Beautiful, intuitive app interfaces designed for maximum engagement.',
    fullContent:
      'Create delightful user experiences with thoughtful UI/UX design. From wireframes to polished interfaces, we design apps users love to use.',
    icon: Palette,
    features: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Visual Design',
      'Usability Testing',
    ],
    shape3D: 'octahedron',
  },
  {
    title: 'App Performance',
    summary: 'Optimized apps that are fast, responsive, and battery efficient.',
    fullContent:
      'Deliver exceptional performance with optimized code, efficient data handling, and smooth animations. Your app will feel snappy and responsive.',
    icon: Zap,
    features: [
      'Performance Profiling',
      'Memory Optimization',
      'Battery Efficiency',
      'Offline Support',
      'Fast Loading',
    ],
    shape3D: 'cube',
  },
  {
    title: 'App Store Launch',
    summary: 'Complete app store submission and optimization services.',
    fullContent:
      'Navigate the app store submission process with confidence. We handle everything from screenshots to descriptions and ASO for maximum visibility.',
    icon: Store,
    features: [
      'Store Submission',
      'ASO Optimization',
      'Screenshots & Video',
      'Review Response',
      'Update Management',
    ],
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

const AppDevelopment = () => {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="App Development"
        eyebrow="Built for mobile adoption"
        title={<>Apps That Users <span className="page-hero__title-accent">Love</span></>}
        description="Native and cross-platform mobile applications that deliver exceptional user experiences."
        chips={["iOS + Android", "Cross-platform builds", "Store launch support"]}
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
                  Ready to Build Your App?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Let's create a mobile app that your users will love.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="rounded-full px-8">
                    Start Your Project
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

export default AppDevelopment;




