import { ScrollReveal } from "@/components/animations/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "When will the DOX ship?",
    answer: "The DOX is scheduled to ship in Q2 2025. Early-bird backers will receive priority shipping within the first 500 orders. We'll keep you updated throughout the manufacturing process with regular email updates.",
  },
  {
    question: "What's the early-bird discount?",
    answer: "Early-bird backers save $200 off the retail price. This exclusive discount is only available during the prelaunch campaign. Once we launch, the DOX will be sold at full retail price.",
  },
  {
    question: "How many products fit inside?",
    answer: "The DOX features 3 custom wireless charging cradles designed to fit most devices. The velvet interior is form-fitted to securely hold your collection while keeping everything organized and easily accessible.",
  },
  {
    question: "Can I add more fingerprints?",
    answer: "Yes! The biometric fingerprint lock can store up to 5 different user profiles. This makes it perfect for couples or shared spaces while maintaining individual access control.",
  },
  {
    question: "Is there a warranty?",
    answer: "Every DOX includes a comprehensive 2-year premium warranty covering all manufacturing defects, electronic components, and materials. We stand behind our craftsmanship with exceptional customer support.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide! International shipping costs will be calculated at checkout based on your location. All international orders include customs documentation and tracking.",
  },
  {
    question: "What if I change my mind?",
    answer: "We offer a 30-day return policy from the date of delivery. If you're not completely satisfied with your DOX, you can return it for a full refund, no questions asked.",
  },
  {
    question: "Is the fingerprint data stored securely?",
    answer: "Absolutely. All biometric data is encrypted with 256-bit encryption and stored locally on the device. Your fingerprint data is never uploaded to the cloud or shared with any third parties.",
  },
];

export const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-4 font-playfair">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto mb-16">
            Everything you need to know about the DOX
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-dark border-white/10 rounded-lg px-6 data-[state=open]:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-white hover:text-primary text-left py-6 hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
