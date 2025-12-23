import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import TextScramble from './TextScramble';
import { FloatingElement } from './ParallaxSection';

const skills = [
  { name: 'REACT', level: 95, color: 'electric' },
  { name: 'TYPESCRIPT', level: 90, color: 'cold-blue' },
  { name: 'NODE.JS', level: 85, color: 'hot-red' },
  { name: 'PYTHON', level: 80, color: 'electric' },
  { name: 'THREE.JS', level: 75, color: 'cold-blue' },
  { name: 'POSTGRESQL', level: 85, color: 'hot-red' },
];

const experiences = [
  {
    period: '2022 — NOW',
    role: 'SENIOR DEVELOPER',
    company: 'TECH CORP',
    description: 'Leading frontend architecture and mentoring team members.',
  },
  {
    period: '2020 — 2022',
    role: 'FULLSTACK DEVELOPER',
    company: 'STARTUP INC',
    description: 'Built scalable applications from scratch.',
  },
  {
    period: '2018 — 2020',
    role: 'JUNIOR DEVELOPER',
    company: 'AGENCY XYZ',
    description: 'Developed client websites and web applications.',
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
        {/* Left column - Bio */}
        <ScrollReveal variant="slide" delay={0.1}>
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl font-light leading-relaxed">
                I'm a <span className="font-bold gradient-text">developer</span> and{' '}
                <span className="font-bold gradient-text">designer</span> based in{' '}
                <span className="electric-bg px-2 border-dance inline-block">San Francisco</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I build things for the web with a focus on creating experiences that are fast, accessible, and visually striking. My work sits at the intersection of technology and design.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, or experimenting with generative art.
              </p>
            </div>

            {/* Stats */}
            <StaggerContainer className="grid grid-cols-3 gap-4 pt-8 border-t-2 border-foreground">
              <StaggerItem>
                <div className="group">
                  <motion.div 
                    className="text-display text-5xl md:text-6xl text-electric"
                    whileHover={{ scale: 1.1 }}
                  >
                    <TextScramble scrambleOnHover>5+</TextScramble>
                  </motion.div>
                  <div className="font-mono text-xs text-muted-foreground mt-2 group-hover:text-electric transition-colors">YEARS EXP</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="group">
                  <motion.div 
                    className="text-display text-5xl md:text-6xl"
                    whileHover={{ scale: 1.1 }}
                  >
                    <TextScramble scrambleOnHover>50+</TextScramble>
                  </motion.div>
                  <div className="font-mono text-xs text-muted-foreground mt-2 group-hover:text-electric transition-colors">PROJECTS</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="group">
                  <motion.div 
                    className="text-display text-5xl md:text-6xl"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                  >
                    ∞
                  </motion.div>
                  <div className="font-mono text-xs text-muted-foreground mt-2 group-hover:text-electric transition-colors">COFFEE</div>
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
              <h3 className="font-mono text-sm text-muted-foreground mb-6">EXPERIENCE</h3>
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
                {['REACT', '✦', 'TYPESCRIPT', '✦', 'NODE', '✦', 'PYTHON', '✦', 'THREE.JS', '✦', 'POSTGRESQL', '✦', 'DOCKER', '✦', 'AWS', '✦', 'FIGMA', '✦'].map((item, i) => (
                  <span key={i} className={item === '✦' ? 'text-electric' : 'hover:text-electric transition-colors'}>
                    {item}
                  </span>
                ))}
              </span>
              <span className="text-display text-4xl md:text-6xl flex items-center gap-8 ml-8">
                {['REACT', '✦', 'TYPESCRIPT', '✦', 'NODE', '✦', 'PYTHON', '✦', 'THREE.JS', '✦', 'POSTGRESQL', '✦', 'DOCKER', '✦', 'AWS', '✦', 'FIGMA', '✦'].map((item, i) => (
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
