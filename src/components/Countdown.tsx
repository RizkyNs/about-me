import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import BirthdayEffect from './BirthdayEffect';

function getTargetStatus() {
  const now = new Date();
  const year = now.getFullYear();
  const currentBirthday = new Date(year, 5, 5, 0, 0, 0); // June 5th
  
  let isBirthdayMonth = false;
  const windowEnd = new Date(year, 6, 5, 0, 0, 0); // July 5th (1 month later)
  
  // Active state for effects: June 5 to July 5
  if (now.getTime() >= currentBirthday.getTime() && now.getTime() < windowEnd.getTime()) {
    isBirthdayMonth = true;
  }

  // Determine countdown target
  let targetDate = currentBirthday.getTime();
  const dayAfterBirthday = new Date(year, 5, 6, 0, 0, 0); // June 6th
  
  // If we are past the current year's birthday day (June 6+), target next year
  if (now.getTime() >= dayAfterBirthday.getTime()) {
    targetDate = new Date(year + 1, 5, 5, 0, 0, 0).getTime();
  }

  return { targetDate, isBirthdayMonth };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [birthdaySignal, setBirthdaySignal] = useState(0);
  const [hasTriggeredAuto, setHasTriggeredAuto] = useState(false);
  const isBirthdayRef = useRef(calculateTimeLeft().isBirthdayMonth);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const { targetDate, isBirthdayMonth } = getTargetStatus();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthdayMonth };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isBirthdayMonth
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      
      // Auto-trigger if midnight rollover occurs while viewing
      if (newTime.isBirthdayMonth && !isBirthdayRef.current && !hasTriggeredAuto) {
        setBirthdaySignal(prev => prev + 1);
        setHasTriggeredAuto(true);
      }
      isBirthdayRef.current = newTime.isBirthdayMonth;
      
    }, 1000);

    return () => clearInterval(timer);
  }, [hasTriggeredAuto]);

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <motion.section 
      onViewportEnter={() => {
        if (isBirthdayRef.current && !hasTriggeredAuto) {
          setBirthdaySignal(prev => prev + 1);
          setHasTriggeredAuto(true);
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-12 md:py-24 px-6 max-w-4xl mx-auto flex flex-col items-center gap-16 relative"
    >
      <div className="w-full flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="text-center mb-8"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-blue-400 mb-2 block">Countdown To My Birthday (June 5)</span>
        </motion.div>

        <div className="p-8 md:p-10 rounded-2xl bg-blue-500/5 border border-blue-500/10 w-full max-w-2xl flex justify-center gap-6 md:gap-16 shadow-2xl backdrop-blur-sm">
          {items.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center group"
            >
              <div className="text-3xl md:text-5xl font-display font-light text-white mb-2">
                {String(item.value).padStart(2, '0')}
              </div>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</span>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Grid Random Pics 1:1 - Windows Style */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full flex flex-col items-center mt-4"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-blue-400/70 mb-8 font-semibold line-through decoration-blue-500/30">Random Pics</span>
        
        <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-[280px] md:max-w-[360px]">
          <img 
            src="https://raw.githubusercontent.com/RizkyNs/portfolio-assets/main/cool.jpg" 
            alt="Random Vibe 1" 
            className="w-full aspect-square object-cover rounded-tl-2xl grayscale-[40%] hover:grayscale-0 transition-all duration-300 border border-white/5"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://raw.githubusercontent.com/RizkyNs/portfolio-assets/main/fun.png" 
            alt="Random Vibe 2" 
            className="w-full aspect-square object-cover rounded-tr-2xl grayscale-[40%] hover:grayscale-0 transition-all duration-300 border border-white/5"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://raw.githubusercontent.com/RizkyNs/portfolio-assets/main/fun2.webp" 
            alt="Random Vibe 3" 
            className="w-full aspect-square object-cover rounded-bl-2xl grayscale-[40%] hover:grayscale-0 transition-all duration-300 border border-white/5"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://raw.githubusercontent.com/RizkyNs/portfolio-assets/main/avatar2.webp" 
            alt="Random Vibe 4" 
            className="w-full aspect-square object-cover rounded-br-2xl grayscale-[40%] hover:grayscale-0 transition-all duration-300 border border-white/5"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {/* Birthday Celebration Overlay */}
      <BirthdayEffect triggerSignal={birthdaySignal} />
    </motion.section>
  );
}
