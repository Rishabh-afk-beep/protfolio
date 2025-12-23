import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page reveal overlay */}
        <motion.div
          className="fixed inset-0 z-[100] bg-electric pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          style={{ transformOrigin: 'top' }}
        />
        <motion.div
          className="fixed inset-0 z-[99] bg-background pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          style={{ transformOrigin: 'top' }}
        />

        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Loading screen component
export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-display text-6xl md:text-8xl text-electric"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 1.2],
        }}
        transition={{ 
          duration: 2,
          times: [0, 0.2, 0.8, 1],
          repeat: Infinity,
        }}
      >
        LOADING
      </motion.div>
    </motion.div>
  );
}
