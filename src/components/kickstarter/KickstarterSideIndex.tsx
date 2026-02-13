import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "The Vision" },
  { id: "story", label: "Our Story" },
  { id: "video", label: "The DOX" },
  { id: "lifestyle", label: "A World Apart" },
  { id: "features", label: "Engineered" },
  { id: "gallery", label: "Gallery" },
  { id: "rewards", label: "Rewards" },
  { id: "faq", label: "FAQ" },
];

export const KickstarterSideIndex = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);

      const offsets = sections.map(({ id }) => {
        const el = document.getElementById(id);
        return { id, top: el?.getBoundingClientRect().top ?? Infinity };
      });

      const current = offsets.reduce((closest, section) =>
        Math.abs(section.top) < Math.abs(closest.top) ? section : closest
      );
      setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group flex items-center gap-3"
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  activeSection === id
                    ? "bg-primary w-3 h-3 shadow-[0_0_12px_hsl(40_65%_72%/0.5)]"
                    : "bg-white/20 group-hover:bg-white/40"
                )}
              />
              <span
                className={cn(
                  "font-montserrat text-[11px] uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap",
                  activeSection === id
                    ? "text-primary opacity-100"
                    : "text-white/0 group-hover:text-white/60"
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
