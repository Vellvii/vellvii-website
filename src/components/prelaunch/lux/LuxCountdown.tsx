import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const LuxCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date("2026-04-01T00:00:00") - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-3 justify-center">
        {timeUnits.map(({ label, value }) => (
          <div
            key={label}
            className="relative p-4 sm:p-6 text-center min-w-[70px] sm:min-w-[90px] rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(178, 145, 108, 0.15), rgba(139, 115, 85, 0.1))',
              border: '1px solid rgba(178, 145, 108, 0.2)',
              boxShadow: '0 4px 20px rgba(178, 145, 108, 0.15)'
            }}
          >
            {/* Subtle stars accent */}
            <div className="absolute top-1 right-1 text-[8px] opacity-20">★</div>
            <div className="absolute bottom-1 left-1 text-[8px] opacity-20">★</div>
            
            <div className="text-3xl sm:text-5xl font-bold text-white font-baskerville">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs uppercase tracking-widest text-white/60 mt-1 font-semibold">
              {label}
            </div>
          </div>
        ))}
      </div>
      
      {/* USA Launch Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-white/70">
        <span className="text-primary/80 text-lg">★</span>
        <span className="uppercase tracking-wider font-light">First Launch: USA - April 1, 2026</span>
        <span className="text-primary/80 text-lg">★</span>
      </div>
    </div>
  );
};
