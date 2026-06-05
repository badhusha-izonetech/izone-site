import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BellRing, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAdmin } from "@/context/AdminContext";

const DISPLAY_DELAY = 2400;
const AUTO_CLOSE_DELAY = 9000;

export default function MobilePopup() {
  const { pathname } = useLocation();
  const { popups } = useAdmin();
  const [popup, setPopup] = useState(null);
  const shownPopupIdRef = useRef(null);

  useEffect(() => {
    if (pathname !== "/") {
      shownPopupIdRef.current = null;
      setPopup(null);
      return undefined;
    }

    const active = [...popups].reverse().find((item) => item.isActive);
    if (!active) {
      shownPopupIdRef.current = null;
      setPopup(null);
      return undefined;
    }

    if (shownPopupIdRef.current === active.id) {
      return undefined;
    }

    const openTimer = setTimeout(() => {
      shownPopupIdRef.current = active.id;
      setPopup(active);
    }, DISPLAY_DELAY);

    const closeTimer = setTimeout(() => {
      setPopup((current) => (current?.id === active.id ? null : current));
    }, DISPLAY_DELAY + AUTO_CLOSE_DELAY);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, [pathname, popups]);

  return (
    <AnimatePresence>
      {popup && (
        <div
          className="pointer-events-none fixed inset-0 z-[9998] flex items-center justify-center px-4 py-4 min-[769px]:items-end min-[769px]:justify-end min-[769px]:px-5 min-[769px]:py-4"
        >
          <motion.div
            className="w-full max-w-[22rem] min-[769px]:max-w-sm"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Alert className="pointer-events-auto overflow-hidden rounded-[1.2rem] border border-primary/25 bg-background/95 p-0 text-foreground shadow-[0_18px_60px_hsl(var(--site-text)/0.14)] backdrop-blur-xl min-[769px]:rounded-[1.4rem]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

              <div className="flex min-h-[21rem] flex-col items-center gap-3 p-4 pt-5 text-center min-[769px]:min-h-0 min-[769px]:flex-row min-[769px]:items-start min-[769px]:p-4 min-[769px]:pr-12 min-[769px]:pt-4 min-[769px]:text-left">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BellRing size={18} className="h-[18px] w-[18px]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.26em] text-primary min-[769px]:justify-start">
                    <span>Home Alert</span>
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span>Live</span>
                  </div>

                  <AlertTitle className="mt-2 text-[1rem] font-semibold leading-tight text-foreground min-[769px]:text-base">
                    {popup.title}
                  </AlertTitle>

                  <AlertDescription className="mt-2 text-[0.88rem] leading-relaxed text-foreground/75 min-[769px]:text-sm">
                    {popup.description}
                  </AlertDescription>

                  {popup.image && (
                    <div className="mx-auto mt-4 w-full max-w-[17rem] overflow-hidden rounded-2xl border border-primary/20 bg-background min-[769px]:mx-0 min-[769px]:mt-3 min-[769px]:max-w-none">
                      <img src={popup.image} alt={popup.title} className="h-28 w-full object-cover min-[769px]:h-28" />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPopup(null)}
                className="absolute right-2.5 top-2.5 rounded-full border border-primary/25 bg-background/90 p-1.5 text-foreground/70 transition-colors hover:text-foreground min-[769px]:right-3 min-[769px]:top-3"
                aria-label="Close popup"
              >
                <X size={14} className="min-[769px]:h-[15px] min-[769px]:w-[15px]" />
              </button>
            </Alert>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
