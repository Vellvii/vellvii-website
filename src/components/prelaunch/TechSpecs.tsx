import { ScrollReveal } from "@/components/animations/ScrollReveal";

const leftSpecs = [
  { label: "Exterior", value: "Premium vegan leather" },
  { label: "Interior", value: "Italian velvet lining" },
  { label: "Dimensions", value: '12" × 8" × 6"' },
  { label: "Weight", value: "3.2 lbs" },
  { label: "Colors", value: "Midnight Black, Champagne Ivory" },
];

const rightSpecs = [
  { label: "Biometric", value: "360° fingerprint sensor (5 users)" },
  { label: "Charging", value: "Qi wireless × 3 cradles" },
  { label: "Power", value: "USB-C input, 65W" },
  { label: "Connectivity", value: "Bluetooth 5.2 (optional app)" },
  { label: "Security", value: "256-bit encryption" },
  { label: "Battery", value: "24hr backup power (optional)" },
];

export const TechSpecs = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-16 font-playfair">
            Technical Excellence
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Materials & Dimensions */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="glass-dark border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6 font-playfair">
                Materials & Dimensions
              </h3>
              <div className="space-y-4">
                {leftSpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0">
                    <span className="text-white/60 text-sm sm:text-base">{spec.label}</span>
                    <span className="text-white font-medium text-sm sm:text-base text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Technology */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="glass-dark border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6 font-playfair">
                Technology
              </h3>
              <div className="space-y-4">
                {rightSpecs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0">
                    <span className="text-white/60 text-sm sm:text-base">{spec.label}</span>
                    <span className="text-white font-medium text-sm sm:text-base text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Technical Diagram Placeholder */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative aspect-[5/4] rounded-2xl overflow-hidden glass-dark">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <p className="text-white/40 text-sm font-medium text-center">
                  TECH DIAGRAM: DOX Internal Components
                  <br />
                  <span className="text-xs">(Exploded view showing fingerprint sensor, charging coils, battery)</span>
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
