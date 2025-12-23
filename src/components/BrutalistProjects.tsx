import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';
import TextScramble from './TextScramble';
import ScrollReveal from './ScrollReveal';
import ProjectModal, { ProjectData } from './ProjectModal';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const projects: ProjectData[] = [
  {
    id: '01',
    title: 'E-COMMERCE PLATFORM',
    category: 'FULLSTACK',
    year: '2024',
    description: 'Complete shopping experience with real-time inventory and payment processing.',
    tech: ['REACT', 'NODE', 'POSTGRESQL', 'STRIPE', 'REDIS', 'DOCKER'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    color: 'electric',
    challenge: 'The client was losing 30% of customers due to slow checkout and poor mobile experience. Their legacy system couldn\'t handle flash sales, causing server crashes during peak traffic.',
    solution: 'Built a headless commerce architecture with React frontend and Node.js microservices. Implemented Redis caching for inventory, Stripe for payments, and real-time WebSocket updates for live stock counts.',
    results: ['300% Faster Checkout', '2M+ Transactions', '99.99% Uptime', '45% Revenue Increase'],
    duration: '4 MONTHS',
    role: 'LEAD FULLSTACK DEV',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop',
    ],
  },
  {
    id: '02',
    title: 'AI DASHBOARD',
    category: 'DATA VIZ',
    year: '2024',
    description: 'Machine learning predictions with interactive data visualization.',
    tech: ['TYPESCRIPT', 'PYTHON', 'D3.JS', 'TENSORFLOW', 'FASTAPI', 'AWS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    color: 'hot-red',
    challenge: 'Data scientists were spending 80% of their time on manual analysis instead of building models. The existing tools were disconnected and lacked real-time capabilities.',
    solution: 'Created a unified dashboard with TensorFlow integration for predictions, D3.js for dynamic visualizations, and FastAPI backend for real-time data streaming. Implemented drag-and-drop report builder.',
    results: ['80% Time Saved', '50+ ML Models', '10TB Data/Day', '95% Accuracy'],
    duration: '6 MONTHS',
    role: 'FRONTEND ARCHITECT',
    liveUrl: 'https://example.com',
    gallery: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    ],
  },
  {
    id: '03',
    title: '3D CONFIGURATOR',
    category: 'WEBGL',
    year: '2023',
    description: 'Real-time 3D product customization with AR preview.',
    tech: ['THREE.JS', 'REACT', 'WEBGL', 'AR.JS', 'BLENDER', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    color: 'cold-blue',
    challenge: 'Customers couldn\'t visualize custom products before purchase, leading to high return rates. Traditional 2D images weren\'t conveying the true product experience.',
    solution: 'Developed an immersive 3D configurator using Three.js with real-time material and color changes. Added AR functionality for mobile users to see products in their space before buying.',
    results: ['60% Less Returns', '150K+ Configs', '4.8★ Rating', '35% More Sales'],
    duration: '5 MONTHS',
    role: '3D/WEBGL DEVELOPER',
    githubUrl: 'https://github.com',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&h=400&fit=crop',
    ],
  },
  {
    id: '04',
    title: 'FINTECH MOBILE APP',
    category: 'MOBILE',
    year: '2023',
    description: 'Secure banking application with biometric authentication and real-time transactions.',
    tech: ['REACT NATIVE', 'TYPESCRIPT', 'NODE.JS', 'POSTGRESQL', 'PLAID'],
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop',
    color: 'electric',
    challenge: 'Traditional banking apps felt outdated and complex. Users wanted a modern, intuitive experience with instant transactions and comprehensive security.',
    solution: 'Built a React Native app with biometric auth, real-time push notifications, and Plaid integration for account aggregation. Implemented end-to-end encryption for all transactions.',
    results: ['500K+ Downloads', '4.9★ App Store', '$2B Processed', '0 Breaches'],
    duration: '8 MONTHS',
    role: 'MOBILE LEAD',
    liveUrl: 'https://example.com',
  },
  {
    id: '05',
    title: 'SOCIAL PLATFORM',
    category: 'WEB APP',
    year: '2023',
    description: 'Community-driven platform with real-time messaging and content sharing.',
    tech: ['NEXT.JS', 'GRAPHQL', 'PRISMA', 'WEBSOCKETS', 'AWS S3', 'REDIS'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    color: 'hot-red',
    challenge: 'Existing platforms were cluttered with ads and poor content discovery. Users needed a clean, focused space for meaningful connections.',
    solution: 'Created a Next.js platform with GraphQL subscriptions for real-time updates, algorithmic content discovery, and WebSocket-powered instant messaging.',
    results: ['1M+ Users', '10M+ Messages', '98% Retention', '< 50ms Latency'],
    duration: '7 MONTHS',
    role: 'FULLSTACK ENGINEER',
    githubUrl: 'https://github.com',
  },
];

function ProjectRow({ project, index, onProjectClick }: { project: ProjectData; index: number; onProjectClick: (project: ProjectData) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playClick } = useSoundEffects();

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHover();
  };

  const handleClick = () => {
    playClick();
    onProjectClick(project);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <TiltCard tiltAmount={5} glareEnabled={false}>
        <div
          className="border-t-2 border-foreground py-8 md:py-12 relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
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
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="text-xs font-mono text-muted-foreground border border-muted px-2 py-1">
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-xs font-mono text-muted-foreground border border-muted px-2 py-1">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
            <p className="font-mono text-sm text-electric">TAP TO VIEW CASE STUDY →</p>
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
              {project.tech.slice(0, 3).map((t, i) => (
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
              {project.tech.length > 3 && (
                <motion.span 
                  className="text-xs font-mono border border-muted text-muted-foreground px-2 py-1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                >
                  +{project.tech.length - 3}
                </motion.span>
              )}
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
              {/* View badge */}
              <div className="absolute bottom-2 left-2 bg-background/90 px-2 py-1 font-mono text-xs">
                CLICK TO EXPAND
              </div>
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
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playHover } = useSoundEffects();

  const handleProjectClick = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
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
                A CURATED SELECTION OF PROJECTS THAT DEFINE MY APPROACH TO DEVELOPMENT AND DESIGN. CLICK ANY PROJECT TO VIEW THE FULL CASE STUDY.
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
            <ProjectRow 
              key={project.id} 
              project={project} 
              index={index} 
              onProjectClick={handleProjectClick}
            />
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
              onMouseEnter={() => playHover()}
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

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
}
