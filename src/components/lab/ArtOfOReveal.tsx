import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Placeholder reveal video — swap for real campaign motion footage when ready.
const REVEAL_VIDEO = "/uploads/dox-open-animation.mp4";

// Feathers the product photos' hard rectangular edges into the white background,
// approximating a cutout rather than a literal rectangle floating on the page.
const FEATHER_MASK = "radial-gradient(ellipse 65% 65% at 50% 50%, black 55%, transparent 100%)";

export const ArtOfOReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const closedX = useTransform(scrollYProgress, [0, 0.5], ["-14%", "0%"]);
  const openX = useTransform(scrollYProgress, [0, 0.5], ["14%", "0%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-white py-24 sm:py-32">
      <motion.svg
        viewBox="0 0 1600 700"
        preserveAspectRatio="xMidYMid meet"
        className="mx-auto block w-full max-w-6xl"
        style={{ opacity: textOpacity }}
      >
        <defs>
          <mask id="art-of-o-mask">
            <rect width="100%" height="100%" fill="black" />
            <text x="50%" y="32%" textAnchor="middle" dominantBaseline="middle" className="font-baskerville" fontSize="190" fontWeight="700" fill="white">
              THE ART
            </text>
            <text x="50%" y="68%" textAnchor="middle" dominantBaseline="middle" className="font-baskerville" fontSize="190" fontWeight="700" fill="white">
              OF &ldquo;O&rdquo;
            </text>
          </mask>
        </defs>
        <foreignObject width="100%" height="100%" mask="url(#art-of-o-mask)">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            style={{ filter: "blur(1.5px) saturate(1.2)" }}
          >
            <source src={REVEAL_VIDEO} type="video/mp4" />
          </video>
        </foreignObject>
      </motion.svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-3 sm:gap-8">
        <motion.img
          src="/uploads/Dox_white_lifestyle1.jpg"
          alt="Vellvii DOX, closed"
          style={{ x: closedX, opacity: imageOpacity, maskImage: FEATHER_MASK, WebkitMaskImage: FEATHER_MASK }}
          className="h-40 w-32 -rotate-3 rounded-sm object-cover shadow-2xl sm:h-64 sm:w-48 md:h-80 md:w-60"
        />
        <motion.img
          src="/uploads/White_charge_outside.png"
          alt="Vellvii DOX, open"
          style={{ x: openX, opacity: imageOpacity, maskImage: FEATHER_MASK, WebkitMaskImage: FEATHER_MASK }}
          className="h-40 w-32 rotate-3 rounded-sm object-cover shadow-2xl sm:h-64 sm:w-48 md:h-80 md:w-60"
        />
      </div>
    </section>
  );
};
