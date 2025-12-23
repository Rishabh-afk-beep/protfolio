import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ParallaxSection({ 
  children, 
  className = '', 
  speed = 0.5,
  direction = 'up' 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const getTransform = () => {
    const range = 100 * speed;
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [range, -range]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [-range, range]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [range, -range]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [-range, range]);
    }
  };

  const transform = getTransform();
  const isHorizontal = direction === 'left' || direction === 'right';

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={isHorizontal ? { x: transform } : { y: transform }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Floating element for decorative parallax
interface FloatingElementProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  delay?: number;
}

export function FloatingElement({ 
  children, 
  className = '', 
  speed = 0.3,
  delay = 0 
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate, scale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
