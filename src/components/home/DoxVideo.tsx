import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const DoxVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    setIsPlaying(true);
    setVideoEnded(false);
    const video = videoRef.current;
    if (video) {
      try {
        await video.play();
      } catch (err) {
        console.log("Video play error:", err);
      }
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleReplay = async () => {
    setVideoEnded(false);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      try {
        await video.play();
      } catch (err) {
        console.log("Replay error:", err);
      }
    }
  };

  return (
    <section className="py-20 md:py-32 bg-surface-dark">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-primary/90 font-montserrat text-sm tracking-[0.3em] mb-4 block font-medium">
              EXPERIENCE
            </span>
            <h2 className="font-baskerville text-3xl md:text-5xl text-white mb-4">
              DOX in 60 Seconds
            </h2>
            <p className="font-montserrat text-white/80 max-w-xl mx-auto">
              Discover how the Vellvii DOX transforms your private wellness experience
            </p>
          </div>
        </ScrollReveal>

        {/* Video Container */}
        <ScrollReveal delay={0.2}>
          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
            <div className="aspect-video relative bg-black">
              <video
                ref={videoRef}
                src="/uploads/The_Vellvii_Dox_1.webm"
                className="w-full h-full object-contain"
                onEnded={handleVideoEnd}
                playsInline
                controls={isPlaying && !videoEnded}
              />

              {/* Play Button Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group"
                    onClick={handlePlay}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/90 flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-500"
                    >
                      <Play className="w-8 h-8 md:w-12 md:h-12 text-black ml-1" fill="currentColor" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* End Screen */}
              <AnimatePresence>
                {videoEnded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 px-4"
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-baskerville text-2xl md:text-4xl text-primary mb-6 text-center"
                    >
                      Ready to Experience Luxury?
                    </motion.h3>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/product/vellvii-dox">
                        <Button
                          size="lg"
                          className="bg-primary text-black hover:bg-primary/90 font-montserrat font-semibold px-8"
                        >
                          Shop DOX
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleReplay}
                        className="border-white/30 text-white hover:bg-white/10 font-montserrat"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Watch Again
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Below Video */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-10">
            <Link to="/product/vellvii-dox">
              <Button
                size="lg"
                className="bg-primary text-black hover:bg-primary/90 font-montserrat font-semibold tracking-wide px-10 shadow-elegant hover:shadow-glow transition-all duration-500"
              >
                Explore the DOX
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
