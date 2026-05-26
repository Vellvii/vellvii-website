import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "vellvii_age_confirmed";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const isBot = () => {
  if (typeof navigator === "undefined") return false;
  return /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegram|googlebot|google-inspectiontool|duckduckbot|baiduspider|yandex/i.test(
    navigator.userAgent,
  );
};

const hasValidConfirmation = (): boolean => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (Number.isNaN(ts)) return false;
    return Date.now() - ts < TTL_MS;
  } catch {
    return false;
  }
};

const AgeGateModal = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isBot()) return;
    if (!hasValidConfirmation()) setOpen(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  const handleEnter = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const handleLeave = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      window.setTimeout(() => {
        window.location.href = "https://www.google.com";
      }, 250);
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[2000] bg-background text-foreground flex items-center justify-center px-6 sm:px-10"
          role="dialog"
          aria-modal="true"
          aria-label="Age confirmation"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 40%, hsl(var(--primary) / 0.18), transparent 70%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md flex flex-col items-center text-center"
          >
            <img
              src="/uploads/Vellvii-full-logo-transparent.png"
              alt="Vellvii"
              className="h-16 sm:h-20 md:h-24 w-auto drop-shadow-[0_0_24px_rgba(212,175,55,0.18)]"
            />

            <p className="mt-8 font-baskerville italic text-base sm:text-lg text-primary/85 tracking-wide">
              Reshaping the future of intimate wellness.
            </p>

            <span className="block w-10 h-px bg-primary/30 mt-8" aria-hidden />

            <button
              type="button"
              onClick={handleEnter}
              className="mt-8 inline-flex items-center justify-center px-10 py-3 rounded-md bg-primary text-primary-foreground font-montserrat text-xs sm:text-sm tracking-[0.32em] uppercase hover:shadow-glow transition-all"
            >
              Enter
            </button>

            <p className="mt-7 font-montserrat text-[0.7rem] sm:text-xs leading-relaxed text-foreground/55 max-w-sm">
              By entering, you confirm that you are 18+ or of legal age in your
              jurisdiction to view intimate wellness products.
            </p>

            <button
              type="button"
              onClick={handleLeave}
              className="mt-6 font-montserrat text-[0.7rem] sm:text-xs tracking-[0.18em] uppercase text-foreground/40 hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
            >
              Leave site
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeGateModal;
