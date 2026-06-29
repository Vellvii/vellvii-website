import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// iCAUR "BORN TO PLAY" mechanic: a looping video filling the headline via an
// SVG text mask, with product photos flying in flat across the cutout as the
// section scrolls into view - static images, not the DOX-opening animation.
const BG_VIDEO = "/uploads/dox-open-animation.mp4";

const PRODUCTS = [
  { src: "/uploads/dox-open-frames-alpha/frame-00.png", alt: "Vellvii DOX", from: "-160%", rotate: -24, width: "w-[42%] max-w-sm" },
  { src: "/uploads/RedGVibeSide-alpha.png", alt: "Vellvii G-Vibe", from: "170%", rotate: 18, width: "w-[38%] max-w-xs" },
  { src: "/uploads/PinkPulseBack-alpha.png", alt: "Vellvii Pulse", from: "0%", rotate: 10, width: "w-[34%] max-w-xs" },
];

export const ArtOfOReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.25"] });

  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const doxX = useTransform(scrollYProgress, [0, 1], [PRODUCTS[0].from, "-50%"]);
  const gvibeX = useTransform(scrollYProgress, [0, 1], [PRODUCTS[1].from, "-50%"]);
  const pulseX = useTransform(scrollYProgress, [0, 1], [PRODUCTS[2].from, "-50%"]);
  const productXs = [doxX, gvibeX, pulseX];

  return (
    <section ref={ref} className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden bg-black">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <mask id="art-of-o-mask">
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="42%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-montserrat"
              fontSize="180"
              fontWeight="800"
              letterSpacing="2"
              fill="white"
            >
              THE ART
            </text>
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-montserrat"
              fontSize="180"
              fontWeight="800"
              letterSpacing="2"
              fill="white"
            >
              OF &#8220;O&#8221;
            </text>
          </mask>
        </defs>
        <foreignObject width="100%" height="100%" mask="url(#art-of-o-mask)">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover">
            <source src={BG_VIDEO} type="video/mp4" />
          </video>
        </foreignObject>
      </svg>

      <div className="pointer-events-none absolute inset-0">
        {PRODUCTS.map((product, i) => (
          <motion.img
            key={product.src}
            src={product.src}
            alt={product.alt}
            className={`absolute left-1/2 top-1/2 ${product.width}`}
            style={{
              x: productXs[i],
              y: "-50%",
              rotate: product.rotate,
              opacity,
            }}
          />
        ))}
      </div>
    </section>
  );
};
