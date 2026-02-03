import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const BrandPhilosophy = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="py-24 md:py-40 bg-surface-dark relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary/90 font-montserrat text-sm tracking-[0.3em] mb-8 block font-medium"
          >
            V E L L V I I
          </motion.span>

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-baskerville text-2xl md:text-4xl lg:text-5xl text-white leading-relaxed mb-8"
          >
            "We believe intimacy deserves the same thoughtful design as everything else in your life."
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-12 bg-primary/50" />
            <span className="font-montserrat text-white/80 tracking-widest text-sm">
              LUXURY • PRIVACY • PLEASURE
            </span>
            <div className="h-px w-12 bg-primary/50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
