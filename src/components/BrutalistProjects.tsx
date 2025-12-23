import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import MagneticButton from './MagneticButton';

const projects = [
  {
    id: '01',
    title: 'E-COMMERCE PLATFORM',
    category: 'FULLSTACK',
    year: '2024',
    description: 'Complete shopping experience with real-time inventory and payment processing.',
    tech: ['REACT', 'NODE', 'POSTGRESQL'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  },
  {
    id: '02',
    title: 'AI DASHBOARD',
    category: 'DATA VIZ',
    year: '2024',
    description: 'Machine learning predictions with interactive data visualization.',
    tech: ['TYPESCRIPT', 'PYTHON', 'D3.JS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: '03',
    title: '3D CONFIGURATOR',
    category: 'WEBGL',
    year: '2023',
    description: 'Real-time 3D product customization with AR preview.',
    tech: ['THREE.JS', 'REACT', 'WEBGL'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
  },
];

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div
        className="border-t-2 border-foreground py-8 md:py-12 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Mobile layout */}
        <div className="md:hidden space-y-4">
          <div className="flex justify-between items-start">
            <span className="font-mono text-muted-foreground">{project.id}</span>
            <span className="font-mono text-sm text-muted-foreground">{project.year}</span>
          </div>
          <h3 className="text-display text-4xl">{project.title}</h3>
          <div className="flex gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs font-mono text-muted-foreground border border-muted px-2 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
          <span className="col-span-1 font-mono text-muted-foreground">{project.id}</span>
          
          <MagneticButton
            data-cursor="VIEW"
            className="col-span-5"
          >
            <h3 className="text-display text-5xl lg:text-7xl group-hover:text-electric transition-colors duration-200">
              {project.title}
            </h3>
          </MagneticButton>
          
          <span className="col-span-2 font-mono text-sm text-muted-foreground">{project.category}</span>
          
          <div className="col-span-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span 
                key={t} 
                className="text-xs font-mono text-muted-foreground border border-muted px-2 py-1 group-hover:border-electric group-hover:text-electric transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
          
          <span className="col-span-1 font-mono text-sm text-right text-muted-foreground">{project.year}</span>
        </div>

        {/* Hover image preview */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-48 pointer-events-none z-10 hidden lg:block overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.8,
            x: isHovered ? 0 : 50
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full border-4 border-foreground bg-background p-1">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function BrutalistProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" className="min-h-screen p-6 md:p-12 noise" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-baseline gap-4 mb-4">
          <h2 className="text-display text-6xl md:text-8xl">SELECTED</h2>
          <span className="text-display text-6xl md:text-8xl text-electric">WORK</span>
        </div>
        <div className="flex justify-between items-end">
          <p className="font-mono text-sm text-muted-foreground max-w-md">
            A CURATED SELECTION OF PROJECTS THAT DEFINE MY APPROACH TO DEVELOPMENT AND DESIGN.
          </p>
          <span className="font-mono text-sm text-muted-foreground hidden md:block">
            ({projects.length.toString().padStart(2, '0')}) PROJECTS
          </span>
        </div>
      </motion.div>

      {/* Projects list */}
      <div>
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
        <div className="border-t-2 border-foreground" />
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-16 flex justify-center"
      >
        <MagneticButton
          href="https://github.com"
          data-cursor="GITHUB"
          className="border-4 border-foreground px-12 py-6 font-mono text-xl hover-brutal bg-background"
        >
          VIEW ALL ON GITHUB →
        </MagneticButton>
      </motion.div>
    </section>
  );
}
