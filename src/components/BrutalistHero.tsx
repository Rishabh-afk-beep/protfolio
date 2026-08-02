import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import MagneticButton from './MagneticButton';
import GlitchText from './GlitchText';
import TextScramble from './TextScramble';
import { FloatingElement } from './ParallaxSection';
import ThreeBackground from './ThreeBackground';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function BrutalistHero() {
  const [time, setTime] = useState(new Date());
  const { getAnalyserData } = useSoundEffects();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden noise">
      {/* 3D Interactive Background */}
      <ThreeBackground getAnalyserData={getAnalyserData} />
      
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Floating decorative elements */}
      <FloatingElement className="absolute top-20 right-20 hidden lg:block" speed={0.5}>
        <div className="w-24 h-24 border-4 border-electric rotate-12 pulse-glow" />
      </FloatingElement>
      
      <FloatingElement className="absolute bottom-40 left-20 hidden lg:block" speed={0.3} delay={0.2}>
        <div className="w-16 h-16 bg-hot-red rotate-45" />
      </FloatingElement>

      <FloatingElement className="absolute top-1/3 right-1/4 hidden lg:block" speed={0.4} delay={0.4}>
        <div className="font-mono text-6xl text-electric/20 rotate-12">{'<>'}</div>
      </FloatingElement>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-start relative z-10"
      >
        <div className="font-mono text-sm text-muted-foreground">
          <div>LOCATION: <span className="text-flicker">BENGALURU, INDIA</span></div>
          <div>STATUS: <span className="text-electric pulse-glow inline-block px-1">OPEN TO OPPORTUNITIES</span></div>
        </div>
        <div className="font-mono text-sm text-right text-muted-foreground">
          <div>{time.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}</div>
          <div className="text-electric text-flicker">{time.toLocaleTimeString('en-US', { hour12: false })}</div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center -mt-20 relative z-10">
        {/* Name - Massive with Glitch */}
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
            className="text-display text-[10vw] md:text-[8vw] leading-[0.8] tracking-tight"
          >
            <GlitchText intensity="low">RISHABH RANJAN</GlitchText>
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
              className="text-display text-[12vw] md:text-[10vw] leading-[0.8] tracking-tight text-electric neon-underline"
            >
              <GlitchText intensity="high" continuous>DANGI</GlitchText>
            </motion.h1>
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: -3 }}
            transition={{ delay: 1 }}
            className="text-2xl md:text-4xl font-mono text-muted-foreground rotate-text hidden md:block float"
          >
            ©{new Date().getFullYear()}
          </motion.span>
        </div>

        {/* Role line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-electric via-hot-red to-cold-blue my-6 origin-left"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex flex-wrap gap-4 font-mono text-sm md:text-base">
            <span className="electric-bg px-3 py-1 font-bold border-dance">
              <TextScramble revealOnScroll={false} scrambleOnHover>FULL STACK DEV</TextScramble>
            </span>
            <span className="border-2 border-foreground px-3 py-1 hover:bg-foreground hover:text-background transition-colors">
              <TextScramble revealOnScroll={false} scrambleOnHover>AI / RAG</TextScramble>
            </span>
            <span className="border-2 border-foreground px-3 py-1 hover:bg-foreground hover:text-background transition-colors">
              <TextScramble revealOnScroll={false} scrambleOnHover>PYTHON</TextScramble>
            </span>
            <span className="border-2 border-foreground px-3 py-1 hover:bg-foreground hover:text-background transition-colors">
              <TextScramble revealOnScroll={false} scrambleOnHover>REACT</TextScramble>
            </span>
          </div>
          
          <p className="font-mono text-muted-foreground max-w-xs text-sm">
            ENGINEERING <span className="text-foreground font-bold gradient-text">AI-POWERED</span> SOLUTIONS THAT SOLVE <span className="text-foreground font-bold gradient-text">REAL-WORLD</span> PROBLEMS
          </p>
        </motion.div>
      </div>

      {/* Bottom section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="flex justify-between items-end relative z-10"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 w-full sm:w-auto">
          <MagneticButton
            onClick={scrollToProjects}
            data-cursor="SCROLL"
            className="border-4 border-foreground px-6 py-3 md:px-8 md:py-4 font-mono text-base md:text-lg hover-brutal bg-background group text-center"
          >
            <span className="group-hover:text-electric transition-colors">VIEW WORK</span>
            <motion.span 
              className="ml-2 inline-block"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↓
            </motion.span>
          </MagneticButton>

          <MagneticButton
            data-cursor="DOWNLOAD"
            className="border-4 border-electric px-6 py-3 md:px-8 md:py-4 font-mono text-base md:text-lg hover-brutal electric-bg text-raw-black group flex justify-center"
          >
            <a 
              href="/resume.pdf" 
              download="resume.pdf"
              className="flex items-center gap-2 justify-center"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span>RESUME</span>
            </a>
          </MagneticButton>
        </div>

        <div className="hidden md:flex flex-col items-end gap-2">
          <motion.div 
            className="w-16 h-1 bg-electric"
            animate={{ scaleX: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <span className="font-mono text-xs text-muted-foreground text-flicker">SCROLL TO EXPLORE</span>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 1.8 }}
        className="absolute top-1/4 right-12 text-[30vw] font-display text-foreground pointer-events-none select-none hidden lg:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        DEV
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-electric" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-electric" />
    </section>
  );
}
