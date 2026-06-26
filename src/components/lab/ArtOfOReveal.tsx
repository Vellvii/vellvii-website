import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

// Pre-extracted, color-keyed frames from the DOX closed->open CGI render —
// the flat gray studio backdrop is keyed to real alpha transparency, swapped
// by scroll position instead of scrubbing a <video> (avoids autoplay/seek
// restrictions in sandboxed preview environments).
const FRAME_COUNT = 20;
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/uploads/dox-open-frames-alpha/frame-${String(i).padStart(2, "0")}.png`,
);

// Looping motion texture showing through the cutout letters — mirrors the
// iCaur "BORN TO PLAY" treatment where the letters carry moving footage
// rather than a static image.
const TEXTURE_VIDEO = "/uploads/dox-open-animation.mp4";

export const ArtOfOReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);
  const productX = useTransform(scrollYProgress, [0, 1], ["0%", "160%"]);
  const [frameIndex, setFrameIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setFrameIndex(Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))));
  });

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-white py-20 sm:py-28">
      <motion.div style={{ opacity }} className="relative mx-auto aspect-[2/1] w-full max-w-6xl px-4">
        <svg viewBox="0 0 1600 800" preserveAspectRatio="xMidYMid meet" className="block h-full w-full">
          <defs>
            <mask id="art-of-o-mask">
              <rect width="100%" height="100%" fill="black" />
              <text
                x="50%"
                y="34%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-montserrat"
                fontSize="240"
                fontWeight="800"
                letterSpacing="-6"
                fill="white"
              >
                THE ART
              </text>
              <text
                x="50%"
                y="74%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-montserrat"
                fontSize="240"
                fontWeight="800"
                letterSpacing="-6"
                fill="white"
              >
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
              style={{ filter: "saturate(1.15) contrast(1.05)" }}
            >
              <source src={TEXTURE_VIDEO} type="video/mp4" />
            </video>
          </foreignObject>
        </svg>

        <motion.div
          style={{ x: productX }}
          className="pointer-events-none absolute left-[6%] top-[18%] h-[64%] w-[34%] sm:w-[30%]"
        >
          {FRAMES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === FRAME_COUNT - 1 ? "Vellvii DOX, branded" : "Vellvii DOX opening"}
              className="absolute inset-0 h-full w-full object-contain"
              style={{ opacity: i === frameIndex ? 1 : 0 }}
              loading="eager"
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
