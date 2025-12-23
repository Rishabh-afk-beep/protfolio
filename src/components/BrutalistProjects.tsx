import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';
import TextScramble from './TextScramble';
import ScrollReveal from './ScrollReveal';

const projects = [
  {
    id: '01',
    title: 'E-COMMERCE PLATFORM',
    category: 'FULLSTACK',
    year: '2024',
    description: 'Complete shopping experience with real-time inventory and payment processing.',
    tech: ['REACT', 'NODE', 'POSTGRESQL'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    color: 'electric',
  },
  {
    id: '02',
    title: 'AI DASHBOARD',
    category: 'DATA VIZ',
    year: '2024',
    description: 'Machine learning predictions with interactive data visualization.',
    tech: ['TYPESCRIPT', 'PYTHON', 'D3.JS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: 'hot-red',
  },
  {
    id: '03',
    title: '3D CONFIGURATOR',
    category: 'WEBGL',
    year: '2023',
    description: 'Real-time 3D product customization with AR preview.',
    tech: ['THREE.JS', 'REACT', 'WEBGL'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    color: 'cold-blue',
  },
];

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group"
    >
      <TiltCard tiltAmount={5} glareEnabled={false}>
        <div
          className="border-t-2 border-foreground py-8 md:py-12 relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated background on hover */}
          <motion.div
            className={`absolute inset-0 bg-${project.color}/5 -z-10`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Mobile layout */}
          <div className="md:hidden space-y-4">
            <div className="flex justify-between items-start">
              <span className="font-mono text-muted-foreground">{project.id}</span>
              <span className="font-mono text-sm text-muted-foreground">{project.year}</span>
            </div>
            <h3 className="text-display text-4xl">
              <TextScramble>{project.title}</TextScramble>
            </h3>
            <div className="flex gap-2 flex-wrap">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-mono text-muted-foreground border border-muted px-2 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
            <motion.span 
              className="col-span-1 font-mono text-muted-foreground text-2xl"
              animate={{ 
                color: isHovered ? `hsl(var(--${project.color}))` : 'hsl(var(--muted-foreground))',
                scale: isHovered ? 1.2 : 1,
              }}
            >
              {project.id}
            </motion.span>
            
            <MagneticButton
              data-cursor="VIEW"
              className="col-span-5"
            >
              <h3 className={`text-display text-5xl lg:text-7xl transition-all duration-300 ${isHovered ? 'text-electric' : ''}`}>
                <TextScramble scrambleOnHover>{project.title}</TextScramble>
              </h3>
            </MagneticButton>
            
            <span className="col-span-2 font-mono text-sm text-muted-foreground">{project.category}</span>
            
            <div className="col-span-3 flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <motion.span 
                  key={t} 
                  className={`text-xs font-mono border px-2 py-1 transition-all duration-300 ${
                    isHovered 
                      ? `border-${project.color} text-${project.color}` 
                      : 'border-muted text-muted-foreground'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
            
            <motion.span 
              className="col-span-1 font-mono text-sm text-right text-muted-foreground"
              animate={{ x: isHovered ? -10 : 0 }}
            >
              {project.year}
            </motion.span>
          </div>

          {/* Hover image preview */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-56 pointer-events-none z-10 hidden lg:block overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, x: 100, rotate: 5 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              scale: isHovered ? 1 : 0.8,
              x: isHovered ? 0 : 100,
              rotate: isHovered ? -3 : 5,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`w-full h-full border-4 border-${project.color} bg-background p-1`}>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Scanline overlay */}
              <div className="absolute inset-0 scanlines opacity-20" />
            </div>
          </motion.div>

          {/* Progress line on hover */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 bg-${project.color}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function BrutalistProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" className="min-h-screen p-6 md:p-12 noise relative" ref={ref}>
      {/* Background number */}
      <div className="absolute top-0 right-0 text-[40vw] font-display text-foreground/[0.02] leading-none pointer-events-none select-none">
        02
      </div>

      {/* Header */}
      <ScrollReveal variant="slide">
        <motion.div className="mb-16">
          <div className="flex items-baseline gap-4 mb-4">
            <h2 className="text-display text-6xl md:text-8xl">SELECTED</h2>
            <span className="text-display text-6xl md:text-8xl gradient-text">WORK</span>
          </div>
          <div className="flex justify-between items-end">
            <p className="font-mono text-sm text-muted-foreground max-w-md">
              A CURATED SELECTION OF PROJECTS THAT DEFINE MY APPROACH TO DEVELOPMENT AND DESIGN.
            </p>
            <motion.span 
              className="font-mono text-sm text-muted-foreground hidden md:flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="w-2 h-2 bg-electric rounded-full" />
              ({projects.length.toString().padStart(2, '0')}) PROJECTS
            </motion.span>
          </div>
        </motion.div>
      </ScrollReveal>

      {/* Projects list */}
      <div>
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
        <div className="border-t-2 border-foreground" />
      </div>

      {/* Bottom CTA */}
      <ScrollReveal variant="scale" delay={0.3}>
        <motion.div className="mt-16 flex justify-center">
          <MagneticButton
            href="https://github.com"
            data-cursor="GITHUB"
            className="border-4 border-foreground px-12 py-6 font-mono text-xl hover-brutal bg-background group relative overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-background transition-colors duration-300">
              VIEW ALL ON GITHUB →
            </span>
            <motion.div
              className="absolute inset-0 bg-electric -z-0"
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </MagneticButton>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
