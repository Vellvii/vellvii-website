import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// iCAUR "BORN TO PLAY" mechanic, verified frame-by-frame from the reference
// recording: a looping video fills the headline through a text-shaped SVG
// mask + foreignObject (the same proven pattern as VideoTextReveal below it
// on this page), while the product photo enters off-angle and off-center,
// then both slides into place AND rotates flat as the section scrolls into
// view. We mirror that with three static product photos instead of one car.
const BG_VIDEO = "/uploads/dox-open-animation.mp4";

const PRODUCTS = [
  {
    src: "/uploads/dox-open-frames-alpha/frame-00.png",
    alt: "Vellvii DOX",
    width: "w-[36%] max-w-sm",
    from: { x: "-160%", y: "40%", rotate: -55 },
    to: { x: "-95%", y: "-8%", rotate: -6 },
  },
  {
    src: "/uploads/RedGVibeSide-alpha.png",
    alt: "Vellvii G-Vibe",
    width: "w-[24%] max-w-xs",
    from: { x: "10%", y: "-130%", rotate: 65 },
    to: { x: "0%", y: "-8%", rotate: 4 },
  },
  {
    src: "/uploads/PinkPulseBack-alpha.png",
    alt: "Vellvii Pulse",
    width: "w-[24%] max-w-xs",
    from: { x: "170%", y: "60%", rotate: -45 },
    to: { x: "95%", y: "-8%", rotate: -4 },
  },
];

export const ArtOfOReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.2"] });

  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const p0x = useTransform(scrollYProgress, [0, 1], [PRODUCTS[0].from.x, PRODUCTS[0].to.x]);
  const p0y = useTransform(scrollYProgress, [0, 1], [PRODUCTS[0].from.y, PRODUCTS[0].to.y]);
  const p0r = useTransform(scrollYProgress, [0, 1], [PRODUCTS[0].from.rotate, PRODUCTS[0].to.rotate]);

  const p1x = useTransform(scrollYProgress, [0, 1], [PRODUCTS[1].from.x, PRODUCTS[1].to.x]);
  const p1y = useTransform(scrollYProgress, [0, 1], [PRODUCTS[1].from.y, PRODUCTS[1].to.y]);
  const p1r = useTransform(scrollYProgress, [0, 1], [PRODUCTS[1].from.rotate, PRODUCTS[1].to.rotate]);

  const p2x = useTransform(scrollYProgress, [0, 1], [PRODUCTS[2].from.x, PRODUCTS[2].to.x]);
  const p2y = useTransform(scrollYProgress, [0, 1], [PRODUCTS[2].from.y, PRODUCTS[2].to.y]);
  const p2r = useTransform(scrollYProgress, [0, 1], [PRODUCTS[2].from.rotate, PRODUCTS[2].to.rotate]);

  const motionValues = [
    { x: p0x, y: p0y, rotate: p0r },
    { x: p1x, y: p1y, rotate: p1r },
    { x: p2x, y: p2y, rotate: p2r },
  ];

  return (
    <section ref={ref} className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden bg-black">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <mask id="art-of-o-mask">
            <rect width="100%" height="100%" fill="black" />
            <text x="50%" y="40%" textAnchor="middle" dominantBaseline="middle" className="font-montserrat" fontWeight={900} fontSize="170" letterSpacing="2" fill="white">
              THE ART
            </text>
            <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" className="font-montserrat" fontWeight={900} fontSize="170" letterSpacing="2" fill="white">
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
              x: motionValues[i].x,
              y: motionValues[i].y,
              rotate: motionValues[i].rotate,
              opacity,
            }}
          />
        ))}
      </div>
    </section>
  );
};
