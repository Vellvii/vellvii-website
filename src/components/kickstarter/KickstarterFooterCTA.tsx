import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import heroVilla from "@/assets/kickstarter/ks-hero-villa.jpg";

export const KickstarterFooterCTA = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroVilla} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary mb-6 leading-tight"
        >
          Your private world
          <br />
          deserves <span className="gradient-text">this.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-montserrat text-sm sm:text-base text-light-secondary mb-10 max-w-lg mx-auto"
        >
          Be among the first to own the Vellvii DOX.
          Early bird pricing is limited.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="btn-premium px-10 py-4 rounded-xl font-montserrat text-sm font-semibold">
            Back This Project
          </button>
          <button className="px-10 py-4 rounded-xl border border-white/20 text-light-secondary hover:border-primary/40 hover:text-primary font-montserrat text-sm transition-all duration-300">
            Notify Me at Launch
          </button>
        </motion.div>

        {/* Footer links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <img
            src="/uploads/Vellvii-full-logo-transparent.png"
            alt="Vellvii"
            className="h-8 w-auto opacity-60"
          />
          <div className="flex gap-6">
            <a href="/about" className="font-montserrat text-xs text-light-muted hover:text-primary transition-colors uppercase tracking-wider">About</a>
            <a href="/contact" className="font-montserrat text-xs text-light-muted hover:text-primary transition-colors uppercase tracking-wider">Contact</a>
            <a href="/privacy-policy" className="font-montserrat text-xs text-light-muted hover:text-primary transition-colors uppercase tracking-wider">Privacy</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
