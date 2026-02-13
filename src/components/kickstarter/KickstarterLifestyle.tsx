import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import yachtInterior from "@/assets/kickstarter/ks-yacht-interior.jpg";
import vineyardVilla from "@/assets/kickstarter/ks-vineyard-villa.jpg";
import penthouseCloset from "@/assets/kickstarter/ks-penthouse-closet.jpg";

const lifestyleItems = [
  {
    image: yachtInterior,
    tagline: "At sea, at ease.",
    description: "Your private world travels with you.",
    alt: "Super yacht master cabin interior",
  },
  {
    image: vineyardVilla,
    tagline: "Where taste meets terrain.",
    description: "Designed for spaces that demand perfection.",
    alt: "Vineyard villa with infinity pool",
  },
  {
    image: penthouseCloset,
    tagline: "Every detail, intentional.",
    description: "The DOX belongs among your finest possessions.",
    alt: "Luxury penthouse dressing room",
  },
];

export const KickstarterLifestyle = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="lifestyle" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 surface-dark-rich" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-primary mb-4">
            A World Apart
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary">
            Not just where you <span className="gradient-text">keep it.</span>
            <br />
            Where you <span className="gradient-text">live.</span>
          </h2>
        </motion.div>

        {/* Cinematic staggered grid */}
        <div className="space-y-8 sm:space-y-12">
          {lifestyleItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 * i }}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12`}
            >
              <div className="w-full md:w-2/3 relative overflow-hidden rounded-2xl group">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-64 sm:h-80 md:h-[480px] object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="w-full md:w-1/3 text-center md:text-left">
                <h3 className="font-baskerville text-2xl sm:text-3xl text-light-primary mb-3">
                  {item.tagline}
                </h3>
                <p className="font-montserrat text-sm text-light-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
