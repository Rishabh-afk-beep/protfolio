import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import MagneticButton from './MagneticButton';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export default function BrutalistNav() {
  const { scrollY } = useScroll();
  const { playHover, playClick } = useSoundEffects();
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    playClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        style={{ borderBottomColor: `rgba(255, 255, 255, ${borderOpacity})` }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b-2 border-transparent"
      >
        <nav className="flex items-center justify-between p-4 md:p-6">
          {/* Logo & Status */}
          <div className="flex items-center gap-4">
            <MagneticButton href="#" data-cursor="HOME" onMouseEnter={() => playHover()} onClick={() => playClick()}>
              <span className="text-display text-3xl md:text-4xl">
                RD<span className="text-electric">.</span>
              </span>
            </MagneticButton>
            <div className="hidden sm:flex items-center gap-2 border border-electric/30 bg-electric/10 px-2 py-1 ml-2">
              <span className="w-1.5 h-1.5 bg-hot-red animate-ping absolute" />
              <span className="w-1.5 h-1.5 bg-hot-red relative" />
              <span className="font-mono text-[9px] text-electric font-bold tracking-widest whitespace-nowrap">OPEN TO WORK</span>
            </div>
          </div>

          {/* Nav links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticButton key={link.label} href={link.href} data-cursor={link.label} onMouseEnter={() => playHover()} onClick={() => playClick()}>
                <span className="font-mono text-sm hover:text-electric transition-colors relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric transition-all duration-300 group-hover:w-full" />
                </span>
              </MagneticButton>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* CTA - Desktop */}
            <div className="hidden md:block">
              <MagneticButton
                href="#contact"
                data-cursor="HIRE"
                className="electric-bg text-raw-black font-mono text-sm px-6 py-3 font-bold hover-brutal border-2 border-foreground"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
              >
                HIRE ME
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-foreground p-2 z-50 relative"
              onClick={() => {
                playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center p-6 border-b-4 border-electric"
          >
            <div className="absolute top-0 left-0 w-full h-full noise opacity-50 pointer-events-none" />
            
            <div className="flex flex-col items-center gap-8 text-center relative z-10 w-full max-w-sm">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.2 }}
                  className="text-display text-5xl hover:text-electric transition-colors w-full border-b-2 border-foreground/20 pb-4"
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.a
                href="#contact"
                onClick={handleLinkClick}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 electric-bg text-raw-black font-mono text-xl px-12 py-4 font-bold border-4 border-foreground w-full uppercase"
              >
                HIRE ME
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
