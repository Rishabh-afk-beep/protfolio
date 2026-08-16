import { useState, useEffect, useCallback, useRef } from 'react';
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
import CursorTrail from '@/components/CursorTrail';
import SystemStatsHUD from '@/components/SystemStatsHUD';
import GitHubActivity from '@/components/GitHubActivity';
import AIChatbot from '@/components/AIChatbot';

// ── Konami Code ───────────────────────────────────────────────────────────────
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function useKonamiCode(onActivate: () => void) {
  const buf = useRef<string[]>([]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      buf.current = [...buf.current, e.key].slice(-KONAMI.length);
      if (buf.current.join(',') === KONAMI.join(',')) {
        buf.current = [];
        onActivate();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onActivate]);
}

// ── Confetti burst ────────────────────────────────────────────────────────────
function spawnConfetti() {
  const colors = ['#FFE000','#FF3333','#3B82F6','#A855F7','#22C55E'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999;overflow:hidden';
  document.body.appendChild(container);
  for (let i = 0; i < 120; i++) {
    const el = document.createElement('div');
    const size = Math.random() * 10 + 5;
    el.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      left:${Math.random() * 100}%;
      top:-20px;
      border-radius:${Math.random() > 0.5 ? '50%' : '0'};
      animation:fall ${1.5 + Math.random() * 2}s linear ${Math.random() * 1}s forwards;
    `;
    container.appendChild(el);
  }
  const style = document.createElement('style');
  style.textContent = `@keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}`;
  document.head.appendChild(style);
  setTimeout(() => { container.remove(); style.remove(); }, 5000);
}

// ── Konami overlay ────────────────────────────────────────────────────────────
function KonamiOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[99990] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center space-y-6 p-8 border-4 border-electric max-w-lg mx-4"
        initial={{ scale: 0.5, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', bounce: 0.5 }}
      >
        <div className="text-6xl">🎮</div>
        <h2 className="text-display text-4xl md:text-6xl text-electric">CHEAT CODE!</h2>
        <p className="font-mono text-sm text-muted-foreground">You found the Konami Code easter egg.<br/>You're clearly a developer of taste.</p>
        <div className="font-mono text-xs border-2 border-muted p-4 text-left space-y-1">
          <div className="text-electric">&gt; ACHIEVEMENT UNLOCKED</div>
          <div className="text-muted-foreground">↑↑↓↓←→←→BA — Classic.</div>
          <div className="text-muted-foreground">You'd fit right in with Rishabh's team.</div>
          <div className="text-hot-red">&gt; REWARD: +100 respect points</div>
        </div>
        <motion.button
          onClick={onClose}
          className="border-4 border-electric px-8 py-3 font-mono font-bold text-electric hover:bg-electric hover:text-background transition-colors"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        >
          CLOSE [ESC]
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ── Init screen ───────────────────────────────────────────────────────────────
const InitScreen = ({ onStart }: { onStart: () => void }) => (
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

// ── Main page ─────────────────────────────────────────────────────────────────
const Index = () => {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [matrixActive, setMatrixActive] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!started || loading) {
      document.body.style.overflow = 'hidden';
    } else {
      window.scrollTo(0, 0);
      setTimeout(() => { document.body.style.overflow = ''; }, 100);
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading, started]);

  const handleMatrix = useCallback(() => {
    setMatrixActive(true);
    setTimeout(() => setMatrixActive(false), 5000);
  }, []);

  useEffect(() => {
    window.addEventListener('trigger-matrix', handleMatrix);
    return () => window.removeEventListener('trigger-matrix', handleMatrix);
  }, [handleMatrix]);

  const handleKonami = useCallback(() => {
    spawnConfetti();
    setKonamiActive(true);
  }, []);

  useKonamiCode(handleKonami);

  // Close konami on ESC
  useEffect(() => {
    if (!konamiActive) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setKonamiActive(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [konamiActive]);

  return (
    <SoundProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-background">

        {/* Cursor particle trail */}
        <CursorTrail />

        <AnimatePresence mode="wait">
          {!started && <InitScreen key="init" onStart={() => setStarted(true)} />}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {started && loading && <PreLoader key="preloader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {/* Konami overlay */}
        <AnimatePresence>
          {konamiActive && <KonamiOverlay key="konami" onClose={() => setKonamiActive(false)} />}
        </AnimatePresence>

        {/* Global overlays */}
        <ScrollProgress />
        <SystemOverload />
        <DoomLevel />
        <PhysicsEngine />
        <MatrixRain active={matrixActive} />
        <PageGlitch />
        <EnhancedCursor />

        {/* HUD widgets + Nav — shown after load */}
        {!loading && started && (
          <>
            <ThemeToggle />
            <SoundToggle />
            <BrutalistNav />
            <SystemStatsHUD />
            <GitHubActivity />
            <AIChatbot />
          </>
        )}

        {/* Main Content */}
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
