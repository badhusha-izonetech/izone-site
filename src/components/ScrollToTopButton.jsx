import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = ({ hideOnMobile = false }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    let currentScroll = window.scrollY;
    let velocity = 0.1;

    const animate = () => {
      currentScroll -= currentScroll * velocity;
      velocity = Math.min(velocity + 0.03, 0.25);

      window.scrollTo(0, currentScroll);

      if (currentScroll > 1) {
        requestAnimationFrame(animate);
      } else {
        window.scrollTo(0, 0);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          className={`
            fixed bottom-6 right-6 z-50
            flex items-center justify-center
            w-12 h-12 rounded-full
            bg-background border border-border
            shadow-lg backdrop-blur
            text-foreground
            hover:scale-110 active:scale-95
            transition-transform
            ${hideOnMobile ? "max-[768px]:hidden" : ""}
          `}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
