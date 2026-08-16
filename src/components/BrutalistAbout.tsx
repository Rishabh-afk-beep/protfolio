import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import TextScramble from './TextScramble';
import { FloatingElement } from './ParallaxSection';

const skills = [
  { name: 'JAVA', level: 90, color: 'electric' },
  { name: 'REACT', level: 85, color: 'cold-blue' },
  { name: 'FASTAPI', level: 85, color: 'hot-red' },
  { name: 'LANGGRAPH', level: 80, color: 'electric' },
  { name: 'RAG PIPELINES', level: 85, color: 'cold-blue' },
  { name: 'JAVASCRIPT', level: 85, color: 'hot-red' },
];

const experiences = [
  {
    period: '2023 — 2027',
    role: 'B.E. IN INFO SCIENCE',
    company: 'ACHARYA INSTITUTE OF TECHNOLOGY',
    description: 'Mastering core Computer Science: DSA, Algorithms, DBMS, and scalable software engineering principles.',
  },
  {
    period: '2025',
    role: '2ND PLACE OVERALL',
    company: 'SRUJANA HACKATHON 2025',
    description: 'Crushed the competition against elite engineering teams. Architected and deployed a production-ready solution under extreme time constraints.',
  },
  {
    period: '2025',
    role: '3RD PLACE FINISH',
    company: 'IMPACTX 2025 (RNSIT)',
    description: 'Engineered a high-impact, technical solution that dominated the judging rounds. Proven ability to execute complex ideas rapidly.',
  },
  {
    period: '2024',
    role: 'CERTIFIED DEVELOPER',
    company: 'IBM CLOUD COMPUTING',
    description: 'Mastered cloud infrastructure, deployment pipelines, and scalable system architecture via Coursera.',
  },
];

export default function BrutalistAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="min-h-screen p-6 md:p-12 noise relative" ref={ref}>
      {/* Background number */}
      <div className="absolute top-0 left-0 text-[40vw] font-display text-foreground/[0.02] leading-none pointer-events-none select-none">
        03
      </div>

      {/* Floating elements */}
      <FloatingElement className="absolute top-40 right-10 hidden lg:block" speed={0.4}>
        <div className="w-20 h-20 border-4 border-hot-red rotate-45" />
      </FloatingElement>

      {/* Header */}
      <ScrollReveal variant="flip">
        <motion.div className="mb-20">
          <h2 className="text-display text-6xl md:text-8xl mb-4">
            <TextScramble>ABOUT</TextScramble>
            <span className="text-electric">.</span>
          </h2>
        </motion.div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left column - Bio & Profile */}
        <ScrollReveal variant="slide" delay={0.1}>
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="w-full sm:w-3/4 md:w-full lg:w-4/5 xl:w-2/3 aspect-square border-4 border-foreground relative group overflow-hidden bg-muted">
              {/* Halftone / Colored Overlay */}
              <div className="absolute inset-0 bg-electric mix-blend-multiply opacity-50 z-10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
              {/* Scanlines */}
              <div className="absolute inset-0 scanlines opacity-30 z-10 pointer-events-none" />
              
              <img 
                src="/assets/profile.jpg" 
                alt="Rishabh Ranjan"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/placeholder.svg';
                }}
              />
              
              {/* Brutalist Badge */}
              <div className="absolute bottom-4 right-4 z-20 font-mono text-xs font-bold bg-foreground text-background px-2 py-1 flex items-center gap-2 border-2 border-background">
                <span className="w-2 h-2 bg-hot-red animate-pulse" />
                [ ID: RISHABH ]
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-2xl md:text-3xl font-light leading-relaxed">
                I'm an <span className="font-bold gradient-text">Information Science</span> student based in{' '}
                <span className="electric-bg px-2 border-dance inline-block">Bengaluru</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I build scalable web and AI-powered applications, with hands-on experience designing, developing, and deploying end-to-end solutions that solve real-world problems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm passionate about engineering agentic RAG pipelines, working with modern frontend technologies, and building robust backend services.
              </p>
            </div>

            {/* Stats */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 pt-8 border-t-2 border-foreground">
              <StaggerItem>
                <div className="group">
                  <motion.div 
                    className="text-display text-6xl text-electric"
                    whileHover={{ scale: 1.1 }}
                  >
                    <TextScramble scrambleOnHover>0-1</TextScramble>
                  </motion.div>
                  <div className="font-mono text-sm sm:text-xs text-muted-foreground mt-2 group-hover:text-electric transition-colors">YEARS EXP</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="group">
                  <motion.div 
                    className="text-display text-6xl"
                    whileHover={{ scale: 1.1 }}
                  >
                    <TextScramble scrambleOnHover>5+</TextScramble>
                  </motion.div>
                  <div className="font-mono text-xs text-muted-foreground mt-2 group-hover:text-electric transition-colors">PROJECTS</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="group">
                  <motion.div 
                    className="text-display text-6xl text-electric"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                  >
                    2
                  </motion.div>
                  <div className="font-mono text-sm sm:text-xs text-muted-foreground mt-2 group-hover:text-electric transition-colors">HACKATHON WINS</div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </ScrollReveal>

        {/* Right column - Skills & Experience */}
        <div className="space-y-12">
          {/* Skills */}
          <ScrollReveal variant="fade" delay={0.2}>
            <div>
              <h3 className="font-mono text-sm text-muted-foreground mb-6">SKILLS</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-sm group-hover:text-electric transition-colors">
                        <TextScramble scrambleOnHover revealOnScroll={false}>{skill.name}</TextScramble>
                      </span>
                      <span className="font-mono text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted overflow-hidden relative">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: skill.level / 100 } : {}}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full bg-${skill.color} origin-left group-hover:pulse-glow`}
                      />
                      {/* Animated particles on skill bar */}
                      <motion.div
                        className="absolute top-0 right-0 w-1 h-full bg-foreground"
                        initial={{ x: '-100vw' }}
                        animate={isInView ? { x: `${skill.level}%` } : {}}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Experience */}
          <ScrollReveal variant="fade" delay={0.4}>
            <div>
              <h3 className="font-mono text-sm text-muted-foreground mb-6">EDUCATION & ACHIEVEMENTS</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.period}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.15 }}
                    className="border-l-4 border-muted pl-4 hover:border-electric transition-all group relative overflow-hidden"
                  >
                    {/* Hover fill */}
                    <motion.div
                      className="absolute inset-0 bg-electric/5 -z-10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="font-mono text-xs text-muted-foreground mb-1">{exp.period}</div>
                    <div className="font-bold text-lg group-hover:text-electric transition-colors">
                      <TextScramble scrambleOnHover revealOnScroll={false}>{exp.role}</TextScramble>
                    </div>
                    <div className="text-muted-foreground">{exp.company}</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">{exp.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Marquee */}
      <ScrollReveal variant="scale" delay={0.5}>
        <motion.div className="mt-24 overflow-hidden border-y-4 border-foreground py-6 relative">
          {/* Double marquee for seamless loop */}
          <div className="flex whitespace-nowrap">
          <div className="marquee flex">
              <span className="text-display text-4xl md:text-6xl flex items-center gap-8">
                {['PYTHON', '✦', 'JAVASCRIPT', '✦', 'SQL', '✦', 'JAVA', '✦', 'C++', '✦', 'RAG PIPELINES', '✦', 'LANGGRAPH', '✦', 'CHROMADB', '✦', 'OLLAMA', '✦', 'FASTAPI', '✦', 'REST APIS', '✦', 'REACT', '✦', 'GIT', '✦', 'GITHUB', '✦', 'VS CODE', '✦', 'VERCEL', '✦', 'RENDER', '✦', 'DSA', '✦', 'DBMS', '✦', 'COMPUTER NETWORKS', '✦'].map((item, i) => (
                  <span key={i} className={item === '✦' ? 'text-electric' : 'hover:text-electric transition-colors'}>
                    {item}
                  </span>
                ))}
              </span>
              <span className="text-display text-4xl md:text-6xl flex items-center gap-8 ml-8">
                {['PYTHON', '✦', 'JAVASCRIPT', '✦', 'SQL', '✦', 'JAVA', '✦', 'C++', '✦', 'RAG PIPELINES', '✦', 'LANGGRAPH', '✦', 'CHROMADB', '✦', 'OLLAMA', '✦', 'FASTAPI', '✦', 'REST APIS', '✦', 'REACT', '✦', 'GIT', '✦', 'GITHUB', '✦', 'VS CODE', '✦', 'VERCEL', '✦', 'RENDER', '✦', 'DSA', '✦', 'DBMS', '✦', 'COMPUTER NETWORKS', '✦'].map((item, i) => (
                  <span key={i} className={item === '✦' ? 'text-electric' : 'hover:text-electric transition-colors'}>
                    {item}
                  </span>
                ))}
              </span>
            </div>
          </div>
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
