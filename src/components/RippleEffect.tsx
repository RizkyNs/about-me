import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export default function RippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setRipples((prev) => [...prev, newRipple]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            style={{
              position: 'absolute',
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(125, 211, 252, 0.4) 0%, transparent 70%)',
              boxShadow: '0 0 20px rgba(125, 211, 252, 0.2)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
