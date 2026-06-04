import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  type: 'circle' | 'sparkle' | 'emoji';
  emoji?: string;
  rotation?: number;
  rotationSpeed?: number;
}

interface BirthdayEffectProps {
  triggerSignal: number; // Increment to trigger a burst manually
}

export default function BirthdayEffect({ triggerSignal }: BirthdayEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);
  const [showGiftBtn, setShowGiftBtn] = useState(false);
  const [glowPulse, setGlowPulse] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Theme colors matching the portfolio aesthetic
  const colors = [
    'rgba(96, 165, 250, 0.8)',  // electric-blue
    'rgba(103, 232, 249, 0.8)',  // sky-blue
    'white',                     // white glow
    'rgba(251, 146, 60, 0.8)',   // sunset-orange / gold
  ];

  const emojis = ['✨', '🎉', '🍰', '🎈'];

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  const createBurst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const particleCount = 60; // Reduced for less meriah

    // Trigger physical screen pulsations
    setGlowPulse(true);
    setTimeout(() => setGlowPulse(false), 2000);

    // Show temporary elegant birthday greeting (now a persistent button)
    setShowGiftBtn(true);

    // Generate particles radiating outward from center and random heights
    const newParticles: Particle[] = [];

    // Center radial burst
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5;
      const size = 1.5 + Math.random() * 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const typeRand = Math.random();
      const type = typeRand < 0.6 ? 'circle' : typeRand < 0.95 ? 'sparkle' : 'emoji';
      const emoji = type === 'emoji' ? emojis[Math.floor(Math.random() * emojis.length)] : undefined;

      newParticles.push({
        x: centerX + (Math.random() - 0.5) * 40,
        y: centerY + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (0.5 + Math.random() * 1.5), // slight drift upward initially
        size,
        color,
        alpha: 1,
        decay: 0.008 + Math.random() * 0.012,
        type,
        emoji,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
      });
    }

    // Gentle bottom-corner helper bursts (symmetrical decoration)
    const sideCount = 10; // Reduced from 25
    const launchPoints = [
      { x: canvas.width * 0.15, y: canvas.height * 0.8 },
      { x: canvas.width * 0.85, y: canvas.height * 0.8 }
    ];

    launchPoints.forEach((pt) => {
      for (let i = 0; i < sideCount; i++) {
        const angle = -Math.PI / 4 - Math.random() * (Math.PI / 2); // Angled upward
        const speed = 3 + Math.random() * 5;
        const size = 1.5 + Math.random() * 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const emoji = Math.random() > 0.8 ? emojis[Math.floor(Math.random() * emojis.length)] : undefined;

        newParticles.push({
          x: pt.x,
          y: pt.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          color,
          alpha: 1,
          decay: 0.006 + Math.random() * 0.01,
          type: emoji ? 'emoji' : (Math.random() > 0.5 ? 'sparkle' : 'circle'),
          emoji,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
        });
      }
    });

    particles.current = [...particles.current, ...newParticles].slice(-400); // Limit total active particles to avoid performance degradation
  };

  // Watch triggerSignal for manual/auto bursts
  useEffect(() => {
    if (triggerSignal > 0) {
      createBurst();
    }
  }, [triggerSignal]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeParticles: Particle[] = [];

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;

        // Apply slight gravity and wind
        p.vy += 0.03; // very gentle downward drag
        p.vx += Math.sin(p.y * 0.01 + p.x * 0.005) * 0.02; // swaying factor

        if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
          p.rotation += p.rotationSpeed;
        }

        p.alpha -= p.decay;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = p.alpha;

          if (p.type === 'circle') {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
          } else if (p.type === 'sparkle') {
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation || 0);
            ctx.beginPath();
            // Tiny neat sparkle cross pattern
            ctx.moveTo(-p.size * 2, 0);
            ctx.lineTo(p.size * 2, 0);
            ctx.moveTo(0, -p.size * 2);
            ctx.lineTo(0, p.size * 2);

            ctx.lineWidth = 1;
            ctx.strokeStyle = p.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = p.color;
            ctx.stroke();
          } else if (p.type === 'emoji' && p.emoji) {
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation || 0);
            ctx.font = `${p.size * 6}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.emoji, 0, 0);
          }

          ctx.restore();
          activeParticles.push(p);
        }
      }

      particles.current = activeParticles;
      animationFrameId.current = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId.current = requestAnimationFrame(updateAndDraw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <>
      {/* Absolute canvas overlay on viewport */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[110]"
      />

      {/* Screen flash pulse (glow burst) */}
      <AnimatePresence>
        {glowPulse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed inset-0 bg-blue-500/10 mix-blend-screen pointer-events-none z-[105] blur-[150px]"
          />
        )}
      </AnimatePresence>

      {/* Elegant dummy button reveal overlay */}
      <AnimatePresence>
        {showGiftBtn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="fixed bottom-32 md:bottom-12 left-0 right-0 flex justify-center pointer-events-none z-[108] px-6"
          >
            {/* The button container allows pointer events so it can be clicked */}
            <div className="pointer-events-auto">
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowVideo(true);
                  window.dispatchEvent(new CustomEvent('video-modal-open', { detail: true }));
                }}
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-blue-500/50 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 active:scale-95"
              >
                <span className="text-xs uppercase tracking-widest text-slate-200 group-hover:text-white font-medium">
                  Buka Kenangan
                </span>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 md:p-12 bg-slate-950/90 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white backdrop-blur-md transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.1 }}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] bg-black"
            >
              <video
                src="https://raw.githubusercontent.com/RizkyNs/portfolio-assets/main/lv_7514722072459873589_20260604205039.mp4"
                controls
                autoPlay
                className="w-full h-auto aspect-video object-contain bg-black"
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
