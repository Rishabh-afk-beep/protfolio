import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function EnhancedCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'link' | 'text' | 'image'>('default');
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smoother spring config to reduce fluctuation
  const springConfig = { damping: 35, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trail for smooth following - higher damping for stability
  const trailSpringConfig = { damping: 45, stiffness: 150, mass: 0.8 };
  const trailX = useSpring(cursorX, trailSpringConfig);
  const trailY = useSpring(cursorY, trailSpringConfig);

  const createParticle = useCallback((x: number, y: number) => {
    const colors = ['hsl(52, 100%, 50%)', 'hsl(0, 100%, 55%)', 'hsl(220, 100%, 60%)'];
    const newParticle: Particle = {
      id: particleId.current++,
      x,
      y,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setParticles(prev => [...prev.slice(-20), newParticle]);
  }, []);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    
    // Create particles less frequently to reduce visual noise
    if (Math.random() > 0.95) {
      createParticle(e.clientX, e.clientY);
    }
  }, [cursorX, cursorY, createParticle]);

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', () => {
      setIsClicking(true);
      // Burst particles on click
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createParticle(
            cursorX.get() + (Math.random() - 0.5) * 40,
            cursorY.get() + (Math.random() - 0.5) * 40
          );
        }, i * 20);
      }
    });
    window.addEventListener('mouseup', () => setIsClicking(false));

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('a, button, [data-cursor]')) {
        setIsHovering(true);
        const cursorData = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        setCursorText(cursorData || '');
        
        if (target.closest('img, video, [data-cursor-image]')) {
          setCursorVariant('image');
        } else if (target.closest('a')) {
          setCursorVariant('link');
        } else {
          setCursorVariant('text');
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor]')) {
        setIsHovering(false);
        setCursorText('');
        setCursorVariant('default');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [moveCursor, createParticle, cursorX, cursorY]);

  // Clean up old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-15));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  const getCursorSize = () => {
    if (isClicking) return 0.6;
    if (isHovering) return 3;
    return 1;
  };

  return (
    <>
      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full mix-blend-screen"
            style={{
              x: particle.x - particle.size / 2,
              y: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
        }}
      >
        <motion.div
          className="absolute border-2 border-foreground/50 rounded-full"
          style={{ 
            x: -24, 
            y: -24,
            width: 48,
            height: 48,
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.3 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: getCursorSize(),
          }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute w-10 h-10 border-2 border-foreground"
            style={{ x: -20, y: -20 }}
            animate={{
              rotate: isHovering ? 45 : 0,
              borderRadius: cursorVariant === 'image' ? '50%' : '0%',
              borderColor: isHovering ? 'hsl(52, 100%, 50%)' : 'hsl(0, 0%, 98%)',
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Center dot */}
          <motion.div
            className="w-2 h-2 bg-foreground"
            style={{ x: -4, y: -4 }}
            animate={{
              backgroundColor: isHovering ? 'hsl(52, 100%, 50%)' : 'hsl(0, 0%, 98%)',
              scale: isClicking ? 2 : 1,
            }}
          />

          {/* Cursor text */}
          <AnimatePresence>
            {cursorText && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                className="absolute top-10 left-1/2 -translate-x-1/2 text-xs font-mono text-foreground whitespace-nowrap uppercase tracking-wider bg-electric text-primary-foreground px-2 py-1"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Magnetic field indicator */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          x: trailX,
          y: trailY,
        }}
      >
        <motion.div
          className="absolute rounded-full border border-electric/20"
          style={{ x: -60, y: -60, width: 120, height: 120 }}
          animate={{
            scale: isHovering ? [1, 1.2, 1] : 1,
            opacity: isHovering ? 0.5 : 0,
          }}
          transition={{ duration: 0.6, repeat: isHovering ? Infinity : 0 }}
        />
      </motion.div>
    </>
  );
}
