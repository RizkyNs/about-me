import { Suspense, lazy } from 'react';
import BackgroundEffect from './components/BackgroundEffect';
import RippleEffect from './components/RippleEffect';
import Hero from './components/Hero';
import About from './components/About';
import Favorites from './components/Favorites';
import HobbySkills from './components/HobbySkills';
import FunFact from './components/FunFact';
import Countdown from './components/Countdown';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="relative min-h-screen selection:bg-electric-blue/30 overflow-x-hidden">
      <BackgroundEffect />
      <RippleEffect />
      
      <main className="relative z-10">
        <Hero />
        
        <div className="space-y-40 pb-40">
          <About />
          <Favorites />
          <HobbySkills />
          <FunFact />
          <Countdown />
        </div>

        {/* Closing Quote */}
        <section className="py-32 flex flex-col items-center justify-center text-center px-6">
           <div className="w-12 h-[1px] bg-sky-blue/20 mb-8" />
           <p className="text-white/20 text-xs uppercase tracking-[0.8em]">End of Transmission</p>
           <h5 className="mt-8 text-xl font-display font-light text-white/40 italic select-none">
              “Stay curious, stay calm.”
           </h5>
        </section>
      </main>

      <MusicPlayer />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[999]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
}

