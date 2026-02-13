import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "When will my DOX ship?",
    a: "Estimated shipping begins Q3 2026 for Early Bird and Founder's Edition backers. Complete Collection tiers ship within 2 weeks of the initial batch.",
  },
  {
    q: "What colors are available?",
    a: "Launch colors include Matte Black and Champagne White. Founder's Edition backers receive access to an exclusive limited-edition colorway revealed during the campaign.",
  },
  {
    q: "How does the biometric lock work?",
    a: "The DOX uses a capacitive fingerprint sensor that stores up to 10 fingerprints locally on the device. No cloud, no apps, no data leaves your DOX — ever.",
  },
  {
    q: "What are the dimensions?",
    a: "The DOX measures approximately 12\" × 8\" × 6\" — designed to sit elegantly on a nightstand, bookshelf, or closet shelf.",
  },
  {
    q: "Is this just for intimate products?",
    a: "The DOX is a luxury storage system for anything private — from personal wellness items to jewelry, documents, or medications. It's designed for privacy, period.",
  },
  {
    q: "What if the campaign doesn't reach its goal?",
    a: "If funding isn't reached, all backers receive a full refund. No risk.",
  },
];

export const KickstarterFAQ = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 surface-dark-rich" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Questions & Answers
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl text-light-primary">
            Everything you need to <span className="gradient-text">know.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-dark rounded-xl border-white/10 px-6 overflow-hidden"
              >
                <AccordionTrigger className="font-baskerville text-base sm:text-lg text-light-primary hover:text-primary py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-montserrat text-sm text-light-muted leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
