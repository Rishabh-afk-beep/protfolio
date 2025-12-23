import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';

export default function BrutalistHero() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden noise">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-start"
      >
        <div className="font-mono text-sm text-muted-foreground">
          <div>LOCATION: EARTH</div>
          <div>STATUS: <span className="text-electric">AVAILABLE</span></div>
        </div>
        <div className="font-mono text-sm text-right text-muted-foreground">
          <div>{time.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}</div>
          <div className="text-electric">{time.toLocaleTimeString('en-US', { hour12: false })}</div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center -mt-20">
        {/* Name - Massive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="overflow-hidden"
        >
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-[20vw] md:text-[18vw] leading-[0.8] tracking-tight"
          >
            YOUR
          </motion.h1>
        </motion.div>
        
        <div className="flex items-baseline gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="overflow-hidden"
          >
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-display text-[20vw] md:text-[18vw] leading-[0.8] tracking-tight text-electric"
            >
              NAME
            </motion.h1>
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: -3 }}
            transition={{ delay: 1 }}
            className="text-2xl md:text-4xl font-mono text-muted-foreground rotate-text hidden md:block"
          >
            ©2024
          </motion.span>
        </div>

        {/* Role line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="h-0.5 bg-foreground my-6 origin-left"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex flex-wrap gap-4 font-mono text-sm md:text-base">
            <span className="electric-bg px-3 py-1 font-bold">DEVELOPER</span>
            <span className="border-2 border-foreground px-3 py-1">DESIGNER</span>
            <span className="border-2 border-foreground px-3 py-1 strike-through text-muted-foreground">CREATIVE</span>
          </div>
          
          <p className="font-mono text-muted-foreground max-w-xs text-sm">
            BUILDING DIGITAL EXPERIENCES THAT <span className="text-foreground">BREAK</span> THE <span className="text-foreground">RULES</span>
          </p>
        </motion.div>
      </div>

      {/* Bottom section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="flex justify-between items-end"
      >
        <MagneticButton
          onClick={scrollToProjects}
          data-cursor="SCROLL"
          className="border-4 border-foreground px-8 py-4 font-mono text-lg hover-brutal bg-background"
        >
          VIEW WORK ↓
        </MagneticButton>

        <div className="hidden md:flex flex-col items-end gap-2">
          <div className="w-16 h-0.5 bg-electric" />
          <span className="font-mono text-xs text-muted-foreground">SCROLL TO EXPLORE</span>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1.8 }}
        className="absolute top-1/4 right-12 text-[30vw] font-display text-foreground pointer-events-none select-none hidden lg:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        DEV
      </motion.div>
    </section>
  );
}
