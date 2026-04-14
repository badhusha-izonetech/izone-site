import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { ThemeProvider } from "@/hooks/useTheme";
import { AdminProvider } from "@/context/AdminContext";
import Development from "./pages/Development";
import Index from "./pages/Index";
import About from "./pages/About";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Clients from "./pages/Clients";
import Portfolio from "./pages/Portfolio";
import GetStarted from "./pages/GetStarted";
import SiteBackground from "./components/SiteBackground";
import AdminDashboard from "./pages/AdminDashboard";
import PopupManagement from "./pages/admin/PopupManagement";
import TestimonialManagement from "./pages/admin/TestimonialManagement";
import JobRoleManagement from "./pages/admin/JobRoleManagement";
import ContactManagement from "./pages/admin/ContactManagement";
import InternManagement from "./pages/admin/InternManagement";
import ClientManagement from "./pages/admin/ClientManagement";
import TeamManagement from "./pages/admin/TeamManagement";
import AdminLogin from "./pages/admin/AdminLogin";
import PhotoManagement from "./pages/admin/PhotoManagement";
import ServiceRequestManagement from "./pages/admin/ServiceRequestManagement";
import { ProtectedRoute } from "./components/admin";
import MobilePopup from "./components/MobilePopup";

// Development pages
import WebDevelopment from "./pages/development/WebDevelopment";
import SocialMediaMarketing from "./pages/development/SocialMediaMarketing";
import ContentWriting from "./pages/development/ContentWriting";
import GraphicsDesigner from "./pages/development/GraphicsDesigner";
import SoftwareDevelopment from "./pages/development/SoftwareDevelopment";
import AppDevelopment from "./pages/development/AppDevelopment";
import AiMlDevelopment from "./pages/development/AiMlDevelopment";
import GovernmentTenders from "./pages/development/GovernmentTenders";

// Services pages
import BulkSms from "./pages/services/BulkSms";
import VoiceSms from "./pages/services/VoiceSms";
import WhatsappPanel from "./pages/services/WhatsappPanel";
import WhatsappMarketing from "./pages/services/WhatsappMarketing";
import DigitalElectionCampaign from "./pages/services/DigitalElectionCampaign";
import Services from "./pages/Services";




const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ConditionalSiteBackground() {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;
  return <SiteBackground />;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/development" element={<Development />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/career" element={<Career />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/development/web-development" element={<WebDevelopment/>} />
              <Route path="/development/social-media-marketing" element={<SocialMediaMarketing />} />
              <Route path="/development/content-writing" element={<ContentWriting />} />
              <Route path="/development/graphics-designer" element={<GraphicsDesigner />} />
              <Route path="/development/software-development" element={<SoftwareDevelopment />} />
              <Route path="/development/app-development" element={<AppDevelopment />} />
              <Route path="/development/ai-ml" element={<AiMlDevelopment />} />
              <Route path="/development/government-tenders" element={<GovernmentTenders />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/bulk-sms" element={<BulkSms />} />
              <Route path="/services/voice-sms" element={<VoiceSms />} />
              <Route path="/services/whatsapp-panel" element={<WhatsappPanel />} />
              <Route path="/services/whatsapp-marketing" element={<WhatsappMarketing />} />
              <Route path="/services/digital-election-campaign" element={<DigitalElectionCampaign />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/popups" element={<ProtectedRoute><PopupManagement /></ProtectedRoute>} />
              <Route path="/admin/testimonials" element={<ProtectedRoute><TestimonialManagement /></ProtectedRoute>} />
              <Route path="/admin/job-roles" element={<ProtectedRoute><JobRoleManagement /></ProtectedRoute>} />
              <Route path="/admin/clients" element={<ProtectedRoute><ClientManagement /></ProtectedRoute>} />
              <Route path="/admin/interns" element={<ProtectedRoute><InternManagement /></ProtectedRoute>} />
              <Route path="/admin/contacts" element={<ProtectedRoute><ContactManagement /></ProtectedRoute>} />
              <Route path="/admin/photo" element={<ProtectedRoute><PhotoManagement /></ProtectedRoute>} />
              <Route path="/admin/service-requests" element={<ProtectedRoute><ServiceRequestManagement /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ConditionalSiteBackground />
            <MobilePopup />
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
};

export default App;
