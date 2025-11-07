import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface WaitlistCounterProps {
  count: number;
}

export const WaitlistCounter = ({ count }: WaitlistCounterProps) => {
  const [displayCount, setDisplayCount] = useState(0);
  const spring = useSpring(0, { stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    spring.set(count);
    setDisplayCount(count);
  }, [count, spring]);

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="relative">
        <motion.div 
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-playfair"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {display}
        </motion.div>
        <motion.div
          className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <p className="text-white/60 text-lg font-medium">
        People on Waitlist
      </p>
    </div>
  );
};
