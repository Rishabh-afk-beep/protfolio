import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function GlitchNumber() {
  const [display, setDisplay] = useState('404');
  useEffect(() => {
    let iter = 0;
    const target = '404';
    const interval = setInterval(() => {
      setDisplay(
        target.split('').map((char, i) =>
          i < iter ? char : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join('')
      );
      iter += 0.3;
      if (iter >= target.length + 3) {
        setDisplay(target);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);
  return <span className="font-display text-[25vw] md:text-[20vw] leading-none text-hot-red glitch" data-text={display}>{display}</span>;
}

function ScanLine() {
  return (
    <motion.div
      className="fixed left-0 right-0 h-1 bg-hot-red/30 pointer-events-none z-10"
      animate={{ top: ['0%', '100%'] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
    />
  );
}

const CONSOLE_LINES = [
  '> KERNEL PANIC: page_fault in non-paged area',
  '> SYSTEM ERROR: route "{{PATH}}" not found in registry',
  '> STACK TRACE: 0x00000000 0xFFFFFFFF 0xDEADBEEF',
  '> Attempting system recovery...',
  '> RECOVERY FAILED. Manual intervention required.',
  '> Suggest navigating to: / (home)',
];

export default function NotFound() {
  const location = useLocation();
  const [lines, setLines] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    console.error('404 — route not found:', location.pathname);
    let i = 0;
    const addLine = () => {
      if (i < CONSOLE_LINES.length) {
        const line = CONSOLE_LINES[i].replace('{{PATH}}', location.pathname);
        setLines(prev => [...prev, line]);
        i++;
        setTimeout(addLine, 500 + Math.random() * 400);
      } else {
        setTimeout(() => setShowButton(true), 400);
      }
    };
    setTimeout(addLine, 300);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden noise p-6">
      <ScanLine />

      {/* Big 404 */}
      <div className="relative z-10 text-center">
        <GlitchNumber />

        <motion.div
          className="font-mono text-xl md:text-2xl text-foreground border-b-2 border-hot-red pb-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          CRITICAL ERROR — PAGE NOT FOUND
        </motion.div>

        {/* Console output */}
        <div className="text-left border-2 border-muted bg-card/60 p-4 font-mono text-xs md:text-sm max-w-lg w-full mx-auto mb-8 min-h-[160px]">
          <div className="text-muted-foreground mb-2 text-[10px]">SYSTEM_LOG.txt — READ ONLY</div>
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                className={`mb-1 ${line.startsWith('> RECOVERY FAILED') || line.startsWith('> KERNEL') || line.startsWith('> STACK') ? 'text-hot-red' : line.startsWith('> Suggest') ? 'text-electric' : 'text-muted-foreground'}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
          {!showButton && (
            <span className="inline-block w-2 h-4 bg-foreground animate-pulse align-middle ml-1" />
          )}
        </div>

        {/* CTA Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/"
                className="border-4 border-electric px-8 py-4 font-mono font-bold text-electric hover:bg-electric hover:text-background transition-colors text-center hover-brutal"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                ← RETURN TO HOME
              </motion.a>
              <motion.a
                href="/#work"
                className="border-4 border-foreground px-8 py-4 font-mono font-bold hover:bg-foreground hover:text-background transition-colors text-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                VIEW MY WORK
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-hot-red opacity-40" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-hot-red opacity-40" />
      <div className="absolute top-1/4 right-8 font-mono text-[15vw] text-foreground/[0.03] leading-none pointer-events-none select-none hidden lg:block">ERR</div>
    </div>
  );
}
