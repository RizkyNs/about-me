import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MESSAGES = [
  "Kadang produktif,",
  "kadang jadi NPC."
];

export default function FunFact() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-dark-navy/20 flex flex-col items-center justify-center text-center">
      <div className="glass-premium p-12 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-blue/30 to-transparent"></div>
        
        <span className="block text-[10px] uppercase tracking-[1em] text-white/20 mb-8">Daily State</span>
        
        <div className="h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h4
              key={index}
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-4xl md:text-5xl font-mono tracking-tight text-blue-300"
            >
              {index === 0 ? "Kadang produktif," : <>kadang jadi <span className="text-white/40">NPC</span><span className="animate-pulse text-blue-400">|</span></>}
            </motion.h4>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
            {MESSAGES.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === index ? 'bg-sky-blue w-4' : 'bg-white/10'}`} 
                />
            ))}
        </div>
      </div>
    </section>
  );
}
