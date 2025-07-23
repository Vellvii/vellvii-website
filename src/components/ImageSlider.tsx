import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ImageSliderProps {
  images: string[];
  name: string;
  className?: string;
}

export const ImageSlider = ({ images, name, className }: ImageSliderProps) => {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    if (intervalRef.current || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 1500);
  };

  useEffect(() => {
    if (!isMobile) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
          } else {
            clear();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clear();
    };
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (!isMobile) start();
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      clear();
      setIndex(0);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${name} image ${i + 1}`}
          className={cn(
            "absolute inset-0 w-full h-full object-contain transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
    </div>
  );
};
