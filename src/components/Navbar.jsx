import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Code, Share2, PenTool, Palette,
  Cpu, Smartphone, Brain, MessageSquare, Phone, MessageCircle,
  Megaphone, Vote, Landmark,
} from "lucide-react";

const developmentServices = [
  { name: "Web Development", path: "/development/web-development", icon: Code },
  { name: "Software Development", path: "/development/software-development", icon: Cpu },
  { name: "App Development", path: "/development/app-development", icon: Smartphone },
  { name: "AI & ML", path: "/development/ai-ml", icon: Brain },
  { name: "Social Media Marketing", path: "/development/social-media-marketing", icon: Share2 },
  { name: "Content Writing", path: "/development/content-writing", icon: PenTool },
  { name: "Graphics Designer", path: "/development/graphics-designer", icon: Palette },
  { name: "Government Tenders", path: "/development/government-tenders", icon: Landmark },
];

const servicesItems = [
  { name: "Bulk SMS", path: "/services/bulk-sms", icon: MessageSquare },
  { name: "Voice SMS", path: "/services/voice-sms", icon: Phone },
  { name: "WhatsApp Panel", path: "/services/whatsapp-panel", icon: MessageCircle },
  { name: "WhatsApp Marketing", path: "/services/whatsapp-marketing", icon: Megaphone },
  { name: "Digital Election Campaign", path: "/services/digital-election-campaign", icon: Vote },
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Development", path: "/development", hasDropdown: true, dropdownType: "development" },
  { name: "Services", path: "/services", hasDropdown: true, dropdownType: "services" },
  { name: "Clients", path: "/clients" },
  { name: "Career", path: "/career" },
  { name: "Contact", path: "/contact" },
];

// logoVisible prop: passed from Index to show/hide logo in navbar
export function Navbar({ logoVisible = true, hideOnMobile = false, hide = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const location = useLocation();
  const isHomeHero = location.pathname === "/" && !scrolled;
  const isInnerHero = false;
  const isHeroNav = isHomeHero || isInnerHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!hideOnMobile) return;
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [hideOnMobile]);

  const getItems = (type) =>
    type === "development" ? developmentServices : type === "services" ? servicesItems : [];

  const isActivePath = (type) =>
    type === "development"
      ? location.pathname.startsWith("/development")
      : location.pathname.startsWith("/services");

  if (hide) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
            : isHeroNav
              ? "hero-nav"
              : "bg-transparent"
        } py-0 ${hideOnMobile ? "max-[768px]:hidden" : ""}`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo — always visible on desktop left */}
          <div className="hidden lg:flex items-center overflow-visible" style={{ marginLeft: "-2.5rem" }}>
            <Link to="/" className="flex items-center shrink-0 overflow-visible">
              <img
                src="/hero/logo.png"
                alt="Izone Logo"
                className="w-auto object-contain"
                style={{ height: "110px", marginTop: "0px", marginBottom: "0px" }}
              />
            </Link>
          </div>

          {/* Desktop Nav — pushed to right */}
          <div className="hidden lg:flex items-center gap-1 ml-auto">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.dropdownType)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActivePath(link.dropdownType)
                        ? isHeroNav
                          ? "hero-nav-link hero-nav-link-active"
                          : "text-primary bg-primary/10"
                        : isHeroNav
                          ? "hero-nav-link"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                    }`}
                  >
                    {link.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        activeDropdown === link.dropdownType ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.dropdownType && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full right-0 mt-2 w-60 rounded-2xl p-1.5 shadow-xl border border-border/70 bg-card/90 backdrop-blur-2xl"
                      >
                        <Link
                          to={`/${link.dropdownType}`}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
                        >
                          All {link.name}
                        </Link>
                        <div className="h-px bg-border/60 my-1" />
                        {getItems(link.dropdownType).map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                              location.pathname === item.path
                                ? "bg-primary/15 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                            }`}
                          >
                            <item.icon size={15} className="text-primary shrink-0" />
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? isHeroNav
                        ? "hero-nav-link hero-nav-link-active"
                        : "text-primary"
                      : isHeroNav
                        ? "hero-nav-link"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && !isHomeHero && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              )
            )}
          </div>
          <div className="lg:hidden flex items-center">
            <Link to="/" className="flex items-center shrink-0 overflow-visible">
              <img src="/hero/logo.png" alt="Izone" className="w-auto object-contain" style={{ height: "64px" }} />
            </Link>
          </div>

          {/* Mobile Controls — right */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-background border-l border-border shadow-2xl lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <img src="/hero/logo.png" alt="Izone" className="h-10 w-auto" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.hasDropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileDropdown(
                              mobileDropdown === link.dropdownType ? null : link.dropdownType
                            )
                          }
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                            isActivePath(link.dropdownType)
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          {link.name}
                          <ChevronDown
                            size={15}
                            className={`transition-transform duration-200 ${
                              mobileDropdown === link.dropdownType ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileDropdown === link.dropdownType && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden ml-3 mt-1 space-y-0.5"
                            >
                              <Link
                                to={`/${link.dropdownType}`}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                              >
                                All {link.name}
                              </Link>
                              {getItems(link.dropdownType).map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                                    location.pathname === item.path
                                      ? "bg-primary/10 text-primary"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                  }`}
                                >
                                  <item.icon size={14} className="text-primary shrink-0" />
                                  {item.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          location.pathname === link.path
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;




