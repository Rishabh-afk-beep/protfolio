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

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [matrixActive, setMatrixActive] = useState(false);

  // Force scroll to top on every page load
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Lock scrolling while preloader is active, reset scroll when done
  useEffect(() => {
    if (loading) {
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
  }, [loading]);

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
        {/* Preloader */}
        <AnimatePresence mode="wait">
          {loading && <PreLoader key="preloader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {/* Global overlays */}
        <ScrollProgress />
        <SystemOverload />
        <DoomLevel />
        <PhysicsEngine />
        <MatrixRain active={matrixActive} />
        <PageGlitch />
        <EnhancedCursor />
        <ThemeToggle />
        <SoundToggle />
        <BrutalistNav />

        {/* Main Content — only mounts after preloader finishes */}
        <AnimatePresence>
          {!loading && (
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
