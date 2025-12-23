import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      // Dark brutalist theme
      root.style.setProperty('--background', '0 0% 3%');
      root.style.setProperty('--foreground', '0 0% 98%');
      root.style.setProperty('--card', '0 0% 6%');
      root.style.setProperty('--card-foreground', '0 0% 98%');
      root.style.setProperty('--muted', '0 0% 15%');
      root.style.setProperty('--muted-foreground', '0 0% 55%');
      root.style.setProperty('--border', '0 0% 20%');
      root.style.setProperty('--secondary', '0 0% 12%');
      root.style.setProperty('--secondary-foreground', '0 0% 98%');
    } else {
      // Light brutalist theme
      root.style.setProperty('--background', '0 0% 98%');
      root.style.setProperty('--foreground', '0 0% 3%');
      root.style.setProperty('--card', '0 0% 95%');
      root.style.setProperty('--card-foreground', '0 0% 3%');
      root.style.setProperty('--muted', '0 0% 90%');
      root.style.setProperty('--muted-foreground', '0 0% 40%');
      root.style.setProperty('--border', '0 0% 80%');
      root.style.setProperty('--secondary', '0 0% 92%');
      root.style.setProperty('--secondary-foreground', '0 0% 3%');
    }
  }, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 border-4 border-foreground bg-background flex items-center justify-center hover-brutal"
      data-cursor="THEME"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-2xl font-mono font-bold"
        >
          {isDark ? '☀' : '☾'}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
