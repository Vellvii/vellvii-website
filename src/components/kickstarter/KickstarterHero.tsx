import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import heroVilla from "@/assets/kickstarter/ks-hero-villa.jpg";

export const KickstarterHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlay = async () => {
    setIsPlaying(true);
    if (videoRef.current) {
      try {
        await videoRef.current.play();
      } catch (err) {
        console.log("Play error:", err);
      }
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background - video or fallback image */}
      {!isPlaying && (
        <div className="absolute inset-0">
          <img
            src={heroVilla}
            alt="Ultra-luxury cliffside villa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </div>
      )}

      <video
        ref={videoRef}
        src="/uploads/The_Vellvii_Dox_1.webm"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        muted={isMuted}
        playsInline
        onEnded={() => setIsPlaying(false)}
      />

      {isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.35em] text-primary mb-6"
        >
          Launching Soon on Kickstarter
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="font-baskerville text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-light-primary leading-[0.95] mb-6"
        >
          Privacy is the
          <br />
          <span className="gradient-text">ultimate luxury.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-montserrat text-sm sm:text-base text-light-secondary max-w-lg mb-12 leading-relaxed"
        >
          The world's first biometric luxury storage system
          <br className="hidden sm:block" />
          for those who demand more from their private world.
        </motion.p>

        {/* Play Button */}
        {!isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            onClick={handlePlay}
            className="group flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary/40 flex items-center justify-center group-hover:border-primary/80 group-hover:shadow-[0_0_40px_hsl(40_65%_72%/0.3)] transition-all duration-700">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-primary ml-1" fill="currentColor" />
            </div>
            <span className="font-montserrat text-xs uppercase tracking-[0.2em] text-light-muted group-hover:text-primary transition-colors">
              Watch the Film
            </span>
          </motion.button>
        )}

        {/* Mute toggle when playing */}
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => {
              setIsMuted(!isMuted);
              if (videoRef.current) videoRef.current.muted = !isMuted;
            }}
            className="absolute bottom-8 right-8 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
          </motion.button>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
};
