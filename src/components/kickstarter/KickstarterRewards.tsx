import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Early Bird",
    price: "$349",
    originalPrice: "$499",
    savings: "30% OFF",
    limited: "Limited to 100 backers",
    includes: [
      "Vellvii DOX (choice of color)",
      "Biometric fingerprint lock",
      "Integrated USB-C charging",
      "Premium gift packaging",
      "Early bird pricing locked in",
    ],
    featured: false,
  },
  {
    name: "Founder's Edition",
    price: "$449",
    originalPrice: "$599",
    savings: "25% OFF",
    limited: "Limited to 250 backers",
    includes: [
      "Everything in Early Bird",
      "Exclusive Founder's Edition colorway",
      "Numbered certificate of authenticity",
      "Priority shipping",
      "Founder's community access",
    ],
    featured: true,
  },
  {
    name: "Complete Collection",
    price: "$799",
    originalPrice: "$1,199",
    savings: "33% OFF",
    limited: "Limited to 50 backers",
    includes: [
      "Vellvii DOX (Founder's Edition)",
      "Full LUX accessory collection",
      "Lifetime warranty upgrade",
      "Concierge onboarding call",
      "Name engraving",
    ],
    featured: false,
  },
];

export const KickstarterRewards = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="rewards" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(15,12%,8%)] via-black to-[hsl(15,12%,8%)]" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 30% at 50% 30%, hsl(40 65% 72% / 0.05), transparent)"
      }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Back the Project
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary mb-4">
            Choose your <span className="gradient-text">reward.</span>
          </h2>
          <p className="font-montserrat text-sm text-light-muted max-w-md mx-auto">
            Exclusive pricing for early supporters. These tiers won't last.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * i }}
              className={cn(
                "relative rounded-2xl p-8 sm:p-10 transition-all duration-500",
                tier.featured
                  ? "glass-accent border-primary/30 scale-[1.02] md:scale-105"
                  : "glass-dark hover:border-primary/20"
              )}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary text-primary-foreground">
                  <Star className="w-3 h-3" fill="currentColor" />
                  <span className="font-montserrat text-[10px] uppercase tracking-wider font-semibold">Most Popular</span>
                </div>
              )}

              <h3 className="font-baskerville text-xl sm:text-2xl text-light-primary mb-2">{tier.name}</h3>
              <p className="font-montserrat text-xs text-primary uppercase tracking-wider mb-6">{tier.limited}</p>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-baskerville text-4xl text-light-primary">{tier.price}</span>
                <span className="font-montserrat text-sm text-light-muted line-through">{tier.originalPrice}</span>
              </div>
              <span className="inline-block font-montserrat text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-8">
                {tier.savings}
              </span>

              <ul className="space-y-3 mb-8">
                {tier.includes.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="font-montserrat text-sm text-light-secondary">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full py-3.5 rounded-xl font-montserrat text-sm font-semibold transition-all duration-300",
                  tier.featured
                    ? "btn-premium"
                    : "border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                )}
              >
                Back This Tier
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
