import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Minimize2 } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // iTunes preview URL for "About You" - The 1975
  const AUDIO_URL = "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d1/6b/bf/d16bbf0e-04d9-a43a-3a86-d9c06d6efba7/mzaf_11783011839176776232.plus.aac.p.m4a";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-8 right-8 z-[100] flex flex-col items-end justify-end pointer-events-none"
    >
      <audio ref={audioRef} src={AUDIO_URL} preload="metadata" />
      
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center gap-4 w-72 pointer-events-auto shadow-2xl group transition-all"
          >
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900 border border-white/5">
              <img
                src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/1f/c7/98/1fc7988e-0a39-5724-1390-e45246250e24/198704825934_Cover.jpg/600x600bb.jpg"
                alt="About You - The 1975"
                className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${isPlaying ? 'scale-105' : 'scale-100 grayscale'}`}
                referrerPolicy="no-referrer"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-[2px]">
                   {[1, 2, 3].map((i) => (
                     <motion.div
                        key={i}
                        animate={{ height: ['20%', '70%', '20%'] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        className="w-[3px] bg-white rounded-full"
                     />
                   ))}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-semibold text-white truncate">About You</h5>
              <p className="text-[10px] text-slate-400 truncate">The 1975</p>
              
              <div className="mt-2 w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-blue-500 absolute top-0 left-0 transition-all duration-100" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayPause}
                className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} className="ml-0.5" fill="currentColor" />}
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/20 hover:text-white/60 transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 size={12} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-blue-400 pointer-events-auto hover:bg-black transition-colors shadow-xl"
            aria-label="Expand Player"
          >
             <Volume2 size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
