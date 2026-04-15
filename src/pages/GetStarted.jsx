import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Code, Palette, Smartphone, Globe, MessageSquare, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/context/AdminContext';

const services = [
  {
    id: 'web', icon: Globe, label: 'Web Development',
    works: [
      { title: 'E-Commerce Platform', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop', tags: ['React', 'Node.js', 'Stripe'] },
      { title: 'SaaS Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop', tags: ['TypeScript', 'GraphQL', 'AWS'] },
      { title: 'Real Estate Platform', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop', tags: ['Next.js', 'Mapbox'] },
    ],
  },
  {
    id: 'app', icon: Smartphone, label: 'App Development',
    works: [
      { title: 'FinTech Mobile App', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop', tags: ['React Native', 'Firebase'] },
      { title: 'Healthcare App', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop', tags: ['Flutter', 'Node.js'] },
      { title: 'Food Delivery App', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=250&fit=crop', tags: ['React Native', 'Maps API'] },
    ],
  },
  {
    id: 'software', icon: Code, label: 'Software Development',
    works: [
      { title: 'ERP System', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop', tags: ['Java', 'PostgreSQL'] },
      { title: 'Inventory Management', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop', tags: ['Python', 'Django'] },
      { title: 'CRM Platform', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop', tags: ['React', 'Node.js'] },
    ],
  },
  {
    id: 'design', icon: Palette, label: 'Graphics Design',
    works: [
      { title: 'Brand Identity', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop', tags: ['Branding', 'Logo'] },
      { title: 'UI Design System', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop', tags: ['Figma', 'UI/UX'] },
      { title: 'Marketing Materials', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop', tags: ['Print', 'Digital'] },
    ],
  },
  {
    id: 'marketing', icon: MessageSquare, label: 'Digital Marketing',
    works: [
      { title: 'Social Media Campaign', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop', tags: ['Instagram', 'Facebook'] },
      { title: 'SEO Optimization', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=250&fit=crop', tags: ['SEO', 'Content'] },
      { title: 'Email Marketing', image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=250&fit=crop', tags: ['Mailchimp', 'Automation'] },
    ],
  },
  {
    id: 'sms', icon: Zap, label: 'Bulk SMS Services',
    works: [
      { title: 'Promotional Campaign', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop', tags: ['Bulk SMS', 'Analytics'] },
      { title: 'Election Campaign', image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400&h=250&fit=crop', tags: ['Voice SMS', 'WhatsApp'] },
      { title: 'OTP & Alerts', image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=400&h=250&fit=crop', tags: ['Transactional', 'API'] },
    ],
  },
  {
    id: 'aiml', icon: Brain, label: 'AI & ML',
    works: [
      { title: 'Predictive Analytics', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=250&fit=crop', tags: ['Python', 'TensorFlow'] },
      { title: 'Chatbot Solution', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=250&fit=crop', tags: ['NLP', 'OpenAI'] },
      { title: 'Computer Vision', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop', tags: ['CV', 'PyTorch'] },
    ],
  },
];

const stepVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.25 } },
};

const GetStarted = () => {
  const { toast } = useToast();
  const { addServiceRequest } = useAdmin();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', projectDetails: '' });

  const selected = services.find((s) => s.id === selectedService);

  const handleServiceClick = (id) => {
    setSelectedService(id);
    setStep(2);
  };

  const handleSubmit = () => {
    addServiceRequest({
      ...formData,
      selectedServices: [selected?.label],
    });
    toast({ title: 'Request Submitted!', description: 'Our team will contact you within 24 hours.' });
    setStep(1);
    setSelectedService(null);
    setFormData({ name: '', email: '', phone: '', company: '', projectDetails: '' });
  };

  const canSubmit = formData.name && formData.email && formData.projectDetails;

  const steps = ['Choose Service', 'Related Work', 'Your Details'];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="page-badge">Start Your Journey</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Let's Build Something
              <span className="gradient-text block mt-2">Extraordinary</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your project and we'll help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 pb-20">
        <div className="container-custom">
          {/* Step indicators */}
          <div className="flex justify-center items-center gap-3 mb-12">
            {steps.map((label, i) => {
              const s = i + 1;
              return (
                <div key={s} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                        step > s ? 'bg-primary text-primary-foreground' :
                        step === s ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                        'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    <span className={`text-[11px] font-medium hidden sm:block ${step === s ? 'text-primary' : 'text-muted-foreground'}`}>
                      {label}
                    </span>
                  </div>
                  {s < 3 && (
                    <div className={`w-12 md:w-20 h-1 mx-2 mb-4 rounded transition-all ${step > s ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">

              {/* ── Step 1: Choose a Service ── */}
              {step === 1 && (
                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="text-center mb-8">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">What service do you need?</h2>
                    <p className="text-muted-foreground">Click a service to continue</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {services.map((service, i) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => handleServiceClick(service.id)}
                        className="glass-card p-5 cursor-pointer transition-all hover:scale-105 hover:border-primary/60 hover:bg-primary/5 group"
                      >
                        <service.icon className="w-8 h-8 mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium text-sm">{service.label}</span>
                        <div className="flex items-center gap-1 mt-2 text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          Select <ArrowRight className="w-3 h-3" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Related Work ── */}
              {step === 2 && selected && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
                      <selected.icon className="w-4 h-4" />
                      {selected.label}
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Our Related Work</h2>
                    <p className="text-muted-foreground">Here's what we've built in this space</p>
                  </div>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
                    {selected.works.map((work, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card overflow-hidden rounded-xl group"
                      >
                        <div className="overflow-hidden h-40">
                          <img
                            src={work.image}
                            alt={work.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <p className="font-semibold text-sm mb-2">{work.title}</p>
                          <div className="flex flex-wrap gap-1">
                            {work.tags.map((tag) => (
                              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button size="lg" variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button size="lg" onClick={() => setStep(3)} className="glow-border hover-glow">
                      Continue <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Contact Form ── */}
              {step === 3 && (
                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="text-center mb-8">
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Tell us about yourself</h2>
                    <p className="text-muted-foreground">We'll get in touch within 24 hours</p>
                  </div>

                  <div className="glass-card p-6 md:p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <Input placeholder="John Doe" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <Input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <Input placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company Name</label>
                        <Input placeholder="Your Company" value={formData.company} onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Details *</label>
                      <Textarea
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        rows={5}
                        value={formData.projectDetails}
                        onChange={(e) => setFormData((p) => ({ ...p, projectDetails: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button size="lg" variant="outline" onClick={() => setStep(2)}>Back</Button>
                    <Button size="lg" onClick={handleSubmit} disabled={!canSubmit} className="glow-border hover-glow">
                      Submit Request <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetStarted;


