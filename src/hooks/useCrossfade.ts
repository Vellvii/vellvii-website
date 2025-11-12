import { useState, useEffect, useRef } from "react";

export interface UseCrossfadeOptions {
  items: string[];
  videoDisplayTime?: number;
  imageDisplayTime?: number;
  transitionDuration?: number;
}

export const useCrossfade = ({
  items,
  videoDisplayTime = 10000,
  imageDisplayTime = 6000,
  transitionDuration = 2000,
}: UseCrossfadeOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tFrom, setTFrom] = useState<string | null>(null);
  const [tTo, setTTo] = useState<string | null>(null);
  
  const loadedSet = useRef<Set<string>>(new Set());
  const waitRef = useRef<number | null>(null);
  const animatingRef = useRef(false);

  const isVideo = (url: string) => url.endsWith(".mp4") || url.endsWith(".webm");

  const preloadMedia = (url: string): Promise<void> => {
    if (!url || loadedSet.current.has(url)) return Promise.resolve();

    return new Promise((resolve) => {
      if (isVideo(url)) {
        const video = document.createElement("video");
        video.preload = "auto";
        video.muted = true;
        video.src = url;
        const onReady = () => {
          loadedSet.current.add(url);
          video.removeEventListener("canplaythrough", onReady);
          resolve();
        };
        video.addEventListener("canplaythrough", onReady);
        video.load();
      } else {
        const img = new Image();
        img.src = url;
        img.decode()
          .then(() => {
            loadedSet.current.add(url);
            resolve();
          })
          .catch(() => {
            img.onload = () => {
              loadedSet.current.add(url);
              resolve();
            };
          });
      }
    });
  };

  const startTransition = async (targetIndex?: number) => {
    if (animatingRef.current) return;

    const next = typeof targetIndex === "number" ? targetIndex : (currentIndex + 1) % items.length;
    const fromUrl = items[currentIndex];
    const toUrl = items[next];

    if (!loadedSet.current.has(toUrl)) {
      await preloadMedia(toUrl);
    }

    setTFrom(fromUrl);
    setTTo(toUrl);
    setNextIndex(next);
    animatingRef.current = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
        window.setTimeout(() => {
          setCurrentIndex(next);
          setIsTransitioning(false);
          setTFrom(null);
          setTTo(null);
          animatingRef.current = false;
        }, transitionDuration);
      });
    });
  };

  // Auto-play
  useEffect(() => {
    if (items.length <= 1) return;

    const currentUrl = items[currentIndex];
    const displayTime = isVideo(currentUrl) ? videoDisplayTime : imageDisplayTime;

    const timer = window.setTimeout(() => {
      startTransition();
    }, displayTime);

    return () => {
      clearTimeout(timer);
      if (waitRef.current) {
        clearTimeout(waitRef.current);
        waitRef.current = null;
      }
    };
  }, [currentIndex, items.length]);

  // Preload next
  useEffect(() => {
    const next = (currentIndex + 1) % items.length;
    setNextIndex(next);
    preloadMedia(items[next]);
  }, [currentIndex, items.length]);

  const goToIndex = (index: number) => {
    if (index !== currentIndex && !animatingRef.current) {
      startTransition(index);
    }
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % items.length;
    startTransition(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + items.length) % items.length;
    startTransition(prev);
  };

  const displayCurrent = isTransitioning && tFrom ? tFrom : items[currentIndex];
  const displayNext = isTransitioning && tTo ? tTo : items[nextIndex];

  return {
    currentIndex,
    nextIndex,
    isTransitioning,
    displayCurrent,
    displayNext,
    goToIndex,
    nextSlide,
    prevSlide,
    isVideo,
  };
};
