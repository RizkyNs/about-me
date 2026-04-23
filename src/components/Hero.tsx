import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 flex flex-col items-center"
      >
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="mb-8 relative flex flex-col md:flex-row items-center gap-6"
        >
          <img 
            src="https://raw.githubusercontent.com/RizkyNs/portfolio-assets/main/avatar.jpg" 
            alt="Ikky Avatar" 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-500/30"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-8xl md:text-[10rem] font-display font-black tracking-tighter text-gradient-blue shadow-blue-500/20 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            IKKY
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl font-light text-slate-400 italic max-w-lg pl-2"
        >
          “Aku suka suasana tenang, hujan yang pelan, kopi hangat, langit, dan langit senja.”
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 text-sm md:text-base uppercase tracking-widest font-medium text-slate-400/60"
        >
          just a random human trying to make things look cool.
        </motion.h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }}
      >
        <ChevronDown className="w-6 h-6 text-sky-blue/50" />
      </motion.div>
    </section>
  );
}
