import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextScrambleProps {
  children: string;
  className?: string;
  scrambleOnHover?: boolean;
  revealOnScroll?: boolean;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

export default function TextScramble({ 
  children, 
  className = '',
  scrambleOnHover = true,
  revealOnScroll = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(revealOnScroll ? '' : children);
  const [isScrambling, setIsScrambling] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasRevealed = useRef(false);

  // Reveal animation on scroll
  useEffect(() => {
    if (revealOnScroll && isInView && !hasRevealed.current) {
      hasRevealed.current = true;
      scrambleText(children);
    }
  }, [isInView, revealOnScroll, children]);

  const scrambleText = (targetText: string) => {
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = targetText.length * 3;
    
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 3) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(targetText);
        setIsScrambling(false);
      }
    }, 30);
  };

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isScrambling) {
      scrambleText(children);
    }
  };

  return (
    <motion.span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={`${className} ${isScrambling ? 'text-electric' : ''}`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {displayText || '\u00A0'.repeat(children.length)}
    </motion.span>
  );
}
