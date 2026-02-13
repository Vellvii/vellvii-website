import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryItems = [
  { type: "video" as const, src: "/uploads/The_Vellvii_Dox_1.webm", poster: "/uploads/Dox1.jpg", label: "The Vellvii DOX" },
  { type: "image" as const, src: "/uploads/Dox1.jpg", label: "Exterior" },
  { type: "video" as const, src: "/uploads/dox-animation.mp4", poster: "/uploads/Dox2.jpg", label: "Animation" },
  { type: "image" as const, src: "/uploads/Dox_black_shelf_close_up.png", label: "On Display" },
  { type: "video" as const, src: "/uploads/dox-open-animation.mp4", poster: "/uploads/Dox3.jpg", label: "Open" },
  { type: "image" as const, src: "/uploads/Dox_white_open_plugged_in_content2.png", label: "Interior" },
  { type: "video" as const, src: "/uploads/fingerprint-video.webm", poster: "/uploads/FP_lock_V_lock_close_ups.png", label: "Biometric" },
  { type: "image" as const, src: "/uploads/Dox_white_lifestyle1.jpg", label: "Lifestyle" },
];

export const KickstarterGallery = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 surface-dark-rich" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Gallery
          </p>
          <h2 className="font-baskerville text-3xl sm:text-4xl md:text-5xl text-light-primary">
            See it. <span className="gradient-text">Feel it.</span>
          </h2>
        </motion.div>

        {/* Masonry-inspired grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onClick={() => setLightboxItem(item)}
            >
              {item.type === "video" ? (
                <>
                  <img
                    src={item.poster}
                    alt={item.label}
                    className={`w-full ${i === 0 ? "h-full min-h-[320px] sm:min-h-[480px]" : "h-40 sm:h-52"} object-cover transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={item.src}
                  alt={item.label}
                  className={`w-full ${i === 0 ? "h-full min-h-[320px] sm:min-h-[480px]" : "h-40 sm:h-52"} object-cover transition-transform duration-700 group-hover:scale-105`}
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <span className="font-montserrat text-[10px] sm:text-xs uppercase tracking-widest text-white/80">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!lightboxItem} onOpenChange={() => setLightboxItem(null)}>
        <DialogContent className="max-w-5xl bg-black/95 border-white/10 p-2 sm:p-4">
          {lightboxItem?.type === "video" ? (
            <video
              src={lightboxItem.src}
              autoPlay
              controls
              playsInline
              className="w-full h-auto rounded-lg max-h-[80vh]"
            />
          ) : lightboxItem ? (
            <img
              src={lightboxItem.src}
              alt={lightboxItem.label}
              className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
};
