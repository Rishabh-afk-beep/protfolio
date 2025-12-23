import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [trail, setTrail] = useState<CursorPosition[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    
    setTrail(prev => {
      const newTrail = [...prev, { x: e.clientX, y: e.clientY }];
      return newTrail.slice(-8);
    });
  }, [cursorX, cursorY]);

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', () => setIsClicking(true));
    window.addEventListener('mouseup', () => setIsClicking(false));

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('a, button, [data-cursor]')) {
        setIsHovering(true);
        const cursorData = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        setCursorText(cursorData || '');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor]')) {
        setIsHovering(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [moveCursor]);

  return (
    <>
      {/* Trail */}
      {trail.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
          style={{
            x: pos.x - 4,
            y: pos.y - 4,
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-2 h-2 bg-foreground" />
        </motion.div>
      ))}

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
            scale: isClicking ? 0.8 : isHovering ? 2.5 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute w-10 h-10 border-2 border-foreground"
            style={{ 
              x: -20, 
              y: -20,
            }}
            animate={{
              rotate: isHovering ? 45 : 0,
              borderColor: isHovering ? 'hsl(52, 100%, 50%)' : 'hsl(0, 0%, 98%)',
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Center dot */}
          <motion.div
            className="w-2 h-2 bg-foreground"
            style={{ 
              x: -4, 
              y: -4,
            }}
            animate={{
              backgroundColor: isHovering ? 'hsl(52, 100%, 50%)' : 'hsl(0, 0%, 98%)',
            }}
          />

          {/* Cursor text */}
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-foreground whitespace-nowrap uppercase tracking-wider"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
