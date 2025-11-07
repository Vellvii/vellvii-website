import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint, Zap, Package, Heart, Shield, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Biometric Fingerprint Lock",
    description: "Military-grade security with 360° fingerprint recognition. Store up to 5 user profiles.",
  },
  {
    icon: Zap,
    title: "Wireless Charging Cradles",
    description: "Charge up to 3 devices simultaneously. No cables, no hassle, always ready.",
  },
  {
    icon: Package,
    title: "Premium Vegan Leather",
    description: "Museum-quality craftsmanship with sustainable materials. Timeless elegance.",
  },
  {
    icon: Heart,
    title: "Custom Velvet Interior",
    description: "Soft, form-fitting saddles protect each item. Italian velvet lining throughout.",
  },
  {
    icon: Shield,
    title: "Travel Lock System",
    description: "TSA-approved secure transport mode. Take your collection anywhere with confidence.",
  },
  {
    icon: Lightbulb,
    title: "Smart LED Indicators",
    description: "Ambient charging status lights. Know at a glance when devices are ready.",
  },
];

export const FeatureGrid = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-playfair">
            Designed for Perfection
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-16">
            Every detail crafted to elevate your experience
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={0.1 * index} direction="up">
              <Card className="glass-dark border-white/10 hover:border-primary/30 transition-all duration-300 hover-glow h-full group">
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-playfair">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
