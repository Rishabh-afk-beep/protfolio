import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnhancedCursor from '@/components/EnhancedCursor';
import PreLoader from '@/components/PreLoader';
import ScrollProgress from '@/components/ScrollProgress';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import BrutalistNav from '@/components/BrutalistNav';
import BrutalistHero from '@/components/BrutalistHero';
import BrutalistProjects from '@/components/BrutalistProjects';
import BrutalistAbout from '@/components/BrutalistAbout';
import BrutalistContact from '@/components/BrutalistContact';
import ThemeToggle from '@/components/ThemeToggle';
import SoundToggle from '@/components/SoundToggle';
import { SoundProvider } from '@/hooks/useSoundEffects';
import MatrixRain from '@/components/MatrixRain';
import PageGlitch from '@/components/PageGlitch';
import PhysicsEngine from '@/components/PhysicsEngine';
import SystemOverload from '@/components/SystemOverload';
import DoomLevel from '@/components/DoomLevel';

const InitScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-[200] w-screen h-[100dvh] flex flex-col items-center justify-center bg-background cursor-pointer noise"
      onClick={onStart}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="font-mono text-xl md:text-2xl font-bold tracking-widest text-electric animate-pulse flex flex-col items-center gap-4">
        <span>[ CLICK TO INITIALIZE ]</span>
        <span className="text-xs text-muted-foreground font-normal tracking-normal">SYSTEM AUDIO REQUIRED</span>
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [matrixActive, setMatrixActive] = useState(false);

  // Force scroll to top on every page load
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Lock scrolling while preloader is active or hasn't started, reset scroll when done
  useEffect(() => {
    if (!started || loading) {
      document.body.style.overflow = 'hidden';
    } else {
      // Force scroll to top right when loading finishes
      window.scrollTo(0, 0);
      // Small delay before re-enabling scroll so browser doesn't jump
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 100);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [loading, started]);

  const handleMatrix = useCallback(() => {
    setMatrixActive(true);
    setTimeout(() => setMatrixActive(false), 5000);
  }, []);

  useEffect(() => {
    window.addEventListener('trigger-matrix', handleMatrix);
    return () => window.removeEventListener('trigger-matrix', handleMatrix);
  }, [handleMatrix]);

  return (
    <SoundProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <AnimatePresence mode="wait">
          {!started && <InitScreen key="init" onStart={() => setStarted(true)} />}
        </AnimatePresence>

        {/* Preloader */}
        <AnimatePresence mode="wait">
          {started && loading && <PreLoader key="preloader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {/* Global overlays */}
        <ScrollProgress />
        <SystemOverload />
        <DoomLevel />
        <PhysicsEngine />
        <MatrixRain active={matrixActive} />
        <PageGlitch />
        <EnhancedCursor />
        
        {!loading && started && (
          <>
            <ThemeToggle />
            <SoundToggle />
            <BrutalistNav />
          </>
        )}

        {/* Main Content — only mounts after preloader finishes */}
        <AnimatePresence>
          {!loading && started && (
            <motion.main
              className="pt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <BrutalistHero />

              <section className="py-20 px-6 md:px-12 noise border-b-2 border-foreground">
                <InteractiveTerminal />
              </section>

              <BrutalistProjects />
              <BrutalistAbout />
              <BrutalistContact />
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </SoundProvider>
  );
};

export default Index;
