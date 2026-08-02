import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function PreLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const { playLoadingBeep, playSuccess } = useSoundEffects();

  useEffect(() => {
    // Brutalist loading logic: random aggressive jumps in progress
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      // Slower jumps for a more suspenseful load
      currentProgress += Math.floor(Math.random() * 12) + 2;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(currentProgress);
        clearInterval(interval);
        playSuccess(); // Play success chime when loading is done
        
        // Wait a little longer at 100% before triggering exit animation
        setTimeout(() => {
          onComplete();
        }, 800);
      } else {
        setProgress(currentProgress);
        playLoadingBeep(); // Play subtle computer processing sound on each jump
      }
    }, 180);
    
    return () => clearInterval(interval);
  }, [onComplete, playLoadingBeep, playSuccess]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background noise overflow-hidden"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="relative">
        <div 
          className="text-display text-8xl md:text-[15rem] font-black tracking-tighter electric-text glitch" 
          data-text={`${progress}%`}
        >
          {progress}%
        </div>
      </div>
      
      <div className="absolute bottom-10 left-6 md:bottom-20 md:left-12 text-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-hot-red animate-pulse" />
          <p>INITIALIZING SYSTEM_</p>
        </div>
        <p className="opacity-70">LOADING ASSETS: {progress} / 100</p>
      </div>
      
      <div className="absolute bottom-10 right-6 md:bottom-20 md:right-12">
        <div className="w-32 md:w-64 h-2 bg-muted relative overflow-hidden border border-foreground/20">
          <div 
            className="absolute top-0 left-0 h-full bg-electric transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
