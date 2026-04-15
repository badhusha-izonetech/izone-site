import { motion } from "framer-motion";
import { Brain, Bot, BarChart3, Eye, Cpu, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import StackStatCard from "@/components/ui/StackStatCard";

const services = [
  {
    title: "Machine Learning Models",
    summary: "Custom ML models trained on your data to automate decisions and uncover insights.",
    fullContent: "We build and deploy custom machine learning models tailored to your business needs — from classification and regression to clustering and recommendation systems.",
    icon: Brain,
    features: ["Supervised Learning", "Unsupervised Learning", "Model Training", "Hyperparameter Tuning", "Model Deployment"],
    shape3D: "cube",
  },
  {
    title: "Natural Language Processing",
    summary: "Understand and process human language with chatbots, sentiment analysis, and more.",
    fullContent: "Leverage NLP to build intelligent chatbots, automate document processing, perform sentiment analysis, and extract meaningful insights from unstructured text data.",
    icon: Bot,
    features: ["Chatbot Development", "Sentiment Analysis", "Text Classification", "Named Entity Recognition", "Language Translation"],
    shape3D: "sphere",
  },
  {
    title: "Predictive Analytics",
    summary: "Forecast trends and outcomes using advanced statistical and AI-driven models.",
    fullContent: "Turn your historical data into future insights. Our predictive analytics solutions help you anticipate customer behavior, market trends, and operational risks.",
    icon: BarChart3,
    features: ["Demand Forecasting", "Churn Prediction", "Risk Assessment", "Sales Forecasting", "Anomaly Detection"],
    shape3D: "torus",
  },
  {
    title: "Computer Vision",
    summary: "Enable machines to interpret and understand visual data from images and videos.",
    fullContent: "Build powerful computer vision applications for object detection, facial recognition, quality inspection, and real-time video analytics.",
    icon: Eye,
    features: ["Object Detection", "Image Classification", "Facial Recognition", "OCR", "Video Analytics"],
    shape3D: "octahedron",
  },
  {
    title: "AI Integration",
    summary: "Seamlessly integrate AI capabilities into your existing systems and workflows.",
    fullContent: "We integrate AI APIs and custom models into your existing platforms — from CRMs and ERPs to mobile apps and web services — with minimal disruption.",
    icon: Cpu,
    features: ["API Integration", "OpenAI / Gemini", "Custom Pipelines", "Cloud AI Services", "Edge AI"],
    shape3D: "cube",
  },
  {
    title: "Deep Learning Solutions",
    summary: "Advanced neural networks for complex pattern recognition and generative AI tasks.",
    fullContent: "Harness the power of deep learning with neural network architectures for image generation, speech recognition, and complex data pattern analysis.",
    icon: Layers,
    features: ["Neural Networks", "CNNs & RNNs", "Transformers", "Generative AI", "Transfer Learning"],
    shape3D: "sphere",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const AiMlDevelopment = () => {
  return (
    <Layout>
      <PageHero
        theme="services"
        badge="AI & Machine Learning"
        eyebrow="Real-world intelligent systems"
        title={<>Intelligent Solutions <span className="page-hero__title-accent">Powered by AI</span></>}
        description="Transform your business with cutting-edge artificial intelligence and machine learning solutions built for real-world impact."
        chips={["ML models", "AI integration", "Predictive analytics"]}
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
                  Ready to Leverage AI?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Let's build intelligent solutions that give your business a competitive edge.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="rounded-full px-8">
                    Start Your AI Project
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

export default AiMlDevelopment;




