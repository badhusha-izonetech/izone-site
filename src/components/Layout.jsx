import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import ScrollToTopButton from './ScrollToTopButton';
import Navbar from './Navbar';

// Page flip: bottom-right corner folds to top-left (like turning a book page)
const flipVariants = {
  initial: {
    opacity: 0,
    clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)',
    transformOrigin: 'bottom right',
  },
  animate: {
    opacity: 1,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    transformOrigin: 'bottom right',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)',
    transformOrigin: 'top left',
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  },
};

const Layout = ({
  children,
  logoVisible = true,
  hideNavbar = false,
  hideNavbarOnMobile = false,
  hideScrollToTopOnMobile = false,
  hideScrollToTop = false,
  hideFooter = false,
}) => {
  const location = useLocation();
  return (
    <div className="relative z-10 min-h-screen flex flex-col bg-transparent text-foreground">
      <Navbar logoVisible={logoVisible} hide={hideNavbar} hideOnMobile={hideNavbarOnMobile} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={flipVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {!hideScrollToTop && <ScrollToTopButton hideOnMobile={hideScrollToTopOnMobile} />}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
