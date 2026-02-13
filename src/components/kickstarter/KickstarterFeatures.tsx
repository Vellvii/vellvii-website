import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Fingerprint, Zap, Shield, Gem } from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Biometric Lock",
    description: "Fingerprint-secured access. No keys, no codes, no compromises.",
  },
  {
    icon: Zap,
    title: "Integrated Charging",
    description: "USB-C charging dock keeps everything powered and ready.",
  },
  {
    icon: Shield,
    title: "Aircraft-Grade Build",
    description: "Precision-machined from premium materials built to last decades.",
  },
  {
    icon: Gem,
    title: "Luxury Finishes",
    description: "Matte black, champagne gold, and limited edition colorways.",
  },
];

export const KickstarterFeatures = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[hsl(15,12%,8%)] to-black" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(40 65% 72% / 0.06), transparent)"
      }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Engineered Without Compromise
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary">
            Obsessively <span className="gradient-text">crafted.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="group glass-dark rounded-2xl p-8 sm:p-10 hover:border-primary/30 transition-all duration-500"
            >
              <feature.icon className="w-8 h-8 text-primary mb-5 group-hover:drop-shadow-[0_0_12px_hsl(40_65%_72%/0.5)] transition-all duration-500" />
              <h3 className="font-baskerville text-xl sm:text-2xl text-light-primary mb-3">
                {feature.title}
              </h3>
              <p className="font-montserrat text-sm text-light-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
