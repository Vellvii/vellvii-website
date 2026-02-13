import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import supercarVilla from "@/assets/kickstarter/ks-supercar-villa.jpg";

export const KickstarterStory = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="story" className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <img src={supercarVilla} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-montserrat text-xs uppercase tracking-[0.3em] text-primary mb-8"
        >
          The Origin
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary mb-10 leading-tight"
        >
          We asked a <span className="gradient-text">simple question.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-montserrat text-base sm:text-lg text-light-secondary leading-relaxed max-w-2xl mx-auto mb-8"
        >
          Why does everything in your life reflect your taste — your home, your car, your wardrobe —
          except the most private corners of it?
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-montserrat text-sm text-light-muted leading-relaxed max-w-xl mx-auto"
        >
          The Vellvii DOX was born from that question. A biometric-locked, beautifully crafted
          storage system that treats your private world with the same reverence as everything else you own.
        </motion.p>
      </div>
    </section>
  );
};
