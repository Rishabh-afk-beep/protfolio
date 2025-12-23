import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  continuous?: boolean;
}

export default function GlitchText({ 
  children, 
  className = '', 
  intensity = 'medium',
  continuous = false 
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(continuous);

  useEffect(() => {
    if (continuous) return;
    
    // Random glitch triggers
    const triggerGlitch = () => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
      }
    };

    const interval = setInterval(triggerGlitch, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [continuous]);

  const glitchConfig = {
    low: { offset: 2, duration: 0.1 },
    medium: { offset: 4, duration: 0.15 },
    high: { offset: 8, duration: 0.2 },
  };

  const config = glitchConfig[intensity];

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <motion.span
        animate={isGlitching ? {
          x: [0, -config.offset, config.offset, -config.offset/2, 0],
          skewX: [0, 2, -2, 1, 0],
        } : {}}
        transition={{ duration: config.duration }}
        className="relative z-10"
      >
        {children}
      </motion.span>

      {/* Red layer */}
      <motion.span
        aria-hidden
        className="absolute inset-0 text-hot-red"
        animate={isGlitching ? {
          x: [0, config.offset, -config.offset, config.offset/2, 0],
          opacity: [0, 0.8, 0.8, 0.4, 0],
        } : { opacity: 0 }}
        transition={{ duration: config.duration }}
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
      >
        {children}
      </motion.span>

      {/* Blue layer */}
      <motion.span
        aria-hidden
        className="absolute inset-0 text-cold-blue"
        animate={isGlitching ? {
          x: [0, -config.offset, config.offset, -config.offset/2, 0],
          opacity: [0, 0.8, 0.8, 0.4, 0],
        } : { opacity: 0 }}
        transition={{ duration: config.duration }}
        style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
      >
        {children}
      </motion.span>
    </span>
  );
}
