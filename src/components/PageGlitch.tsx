import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageGlitch() {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const handleGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 400);
    };

    window.addEventListener('trigger-glitch', handleGlitch);
    return () => window.removeEventListener('trigger-glitch', handleGlitch);
  }, []);

  return (
    <AnimatePresence>
      {isGlitching && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.8, 1, 0.6, 1, 0] }}
          transition={{ duration: 0.4, times: [0, 0.1, 0.2, 0.3, 0.5, 1] }}
          className="fixed inset-0 z-[9998] pointer-events-none"
        >
          {/* CRT scanlines */}
          <div
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.15) 0px,
                rgba(0, 0, 0, 0.15) 1px,
                transparent 1px,
                transparent 3px
              )`,
            }}
          />

          {/* RGB shift layers */}
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            animate={{
              x: [0, -8, 5, -3, 0],
              opacity: [0.5, 0.8, 0.3, 0.6, 0],
            }}
            transition={{ duration: 0.4 }}
            style={{ backgroundColor: 'rgba(255, 0, 0, 0.15)' }}
          />
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            animate={{
              x: [0, 6, -4, 2, 0],
              opacity: [0.5, 0.3, 0.7, 0.4, 0],
            }}
            transition={{ duration: 0.4 }}
            style={{ backgroundColor: 'rgba(0, 255, 0, 0.15)' }}
          />
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            animate={{
              x: [0, 3, -6, 4, 0],
              opacity: [0.5, 0.6, 0.4, 0.8, 0],
            }}
            transition={{ duration: 0.4 }}
            style={{ backgroundColor: 'rgba(0, 0, 255, 0.15)' }}
          />

          {/* Noise grain */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.3, 0.5, 0.2, 0.4, 0] }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px',
            }}
          />

          {/* White flash bar */}
          <motion.div
            className="absolute left-0 right-0 h-2 bg-white"
            animate={{
              top: ['-10%', '110%'],
              opacity: [0.8, 0],
            }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
