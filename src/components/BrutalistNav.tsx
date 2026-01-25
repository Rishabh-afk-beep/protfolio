import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export default function BrutalistNav() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <motion.header
      style={{ borderBottomColor: `rgba(255, 255, 255, ${borderOpacity})` }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b-2 border-transparent"
    >
      <nav className="flex items-center justify-between p-4 md:p-6">
        {/* Logo */}
        <MagneticButton href="#" data-cursor="HOME">
          <span className="text-display text-3xl md:text-4xl">
            RD<span className="text-electric">.</span>
          </span>
        </MagneticButton>

        {/* Nav links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <MagneticButton key={link.label} href={link.href} data-cursor={link.label}>
              <span className="font-mono text-sm hover:text-electric transition-colors relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric transition-all duration-300 group-hover:w-full" />
              </span>
            </MagneticButton>
          ))}
        </div>

        {/* CTA */}
        <MagneticButton
          href="#contact"
          data-cursor="HIRE"
          className="electric-bg text-raw-black font-mono text-sm px-6 py-3 font-bold hover-brutal border-2 border-foreground"
        >
          HIRE ME
        </MagneticButton>
      </nav>
    </motion.header>
  );
}
