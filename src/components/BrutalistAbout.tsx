import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'REACT', level: 95 },
  { name: 'TYPESCRIPT', level: 90 },
  { name: 'NODE.JS', level: 85 },
  { name: 'PYTHON', level: 80 },
  { name: 'THREE.JS', level: 75 },
  { name: 'POSTGRESQL', level: 85 },
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
    <section id="about" className="min-h-screen p-6 md:p-12 noise" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="mb-20"
      >
        <h2 className="text-display text-6xl md:text-8xl mb-4">
          ABOUT<span className="text-electric">.</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left column - Bio */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              I'm a <span className="font-bold">developer</span> and <span className="font-bold">designer</span> based in <span className="electric-bg px-2">San Francisco</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I build things for the web with a focus on creating experiences that are fast, accessible, and visually striking. My work sits at the intersection of technology and design.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open source, or experimenting with generative art.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t-2 border-foreground">
            <div>
              <div className="text-display text-5xl md:text-6xl text-electric">5+</div>
              <div className="font-mono text-xs text-muted-foreground mt-2">YEARS EXP</div>
            </div>
            <div>
              <div className="text-display text-5xl md:text-6xl">50+</div>
              <div className="font-mono text-xs text-muted-foreground mt-2">PROJECTS</div>
            </div>
            <div>
              <div className="text-display text-5xl md:text-6xl">∞</div>
              <div className="font-mono text-xs text-muted-foreground mt-2">COFFEE</div>
            </div>
          </div>
        </motion.div>

        {/* Right column - Skills & Experience */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="space-y-12"
        >
          {/* Skills */}
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
                    <span className="font-mono text-sm">{skill.name}</span>
                    <span className="font-mono text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-muted overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: skill.level / 100 } : {}}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      className="h-full bg-foreground origin-left group-hover:bg-electric transition-colors"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-mono text-sm text-muted-foreground mb-6">EXPERIENCE</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.period}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.15 }}
                  className="border-l-2 border-muted pl-4 hover:border-electric transition-colors group"
                >
                  <div className="font-mono text-xs text-muted-foreground mb-1">{exp.period}</div>
                  <div className="font-bold text-lg group-hover:text-electric transition-colors">{exp.role}</div>
                  <div className="text-muted-foreground">{exp.company}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="mt-24 overflow-hidden border-y-2 border-foreground py-4"
      >
        <div className="marquee whitespace-nowrap">
          <span className="text-display text-4xl md:text-6xl">
            REACT • TYPESCRIPT • NODE • PYTHON • THREE.JS • POSTGRESQL • DOCKER • AWS • FIGMA • REACT • TYPESCRIPT • NODE • PYTHON • THREE.JS • POSTGRESQL • DOCKER • AWS • FIGMA •{' '}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
