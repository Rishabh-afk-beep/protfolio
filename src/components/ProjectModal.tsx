import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Tag, Layers } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  image: string;
  color: string;
  // Extended fields for case study
  challenge?: string;
  solution?: string;
  results?: string[];
  gallery?: string[];
  liveUrl?: string;
  githubUrl?: string;
  duration?: string;
  role?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { playClick, playWhoosh } = useSoundEffects();

  const handleClose = () => {
    playClick();
    onClose();
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onAnimationComplete={() => playWhoosh()}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <div className="relative w-full h-full bg-background border-4 border-foreground overflow-y-auto">
              {/* Close button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-12 h-12 border-2 border-foreground bg-background flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Content */}
              <div className="p-6 md:p-12">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-12"
                >
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-mono text-electric text-2xl">{project.id}</span>
                    <span className="font-mono text-muted-foreground">{project.year}</span>
                  </div>
                  <h2 className="text-display text-5xl md:text-7xl lg:text-9xl mb-4">{project.title}</h2>
                  <p className="font-mono text-xl text-muted-foreground max-w-2xl">{project.description}</p>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`relative mb-12 border-4 border-${project.color} overflow-hidden`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 scanlines opacity-10" />
                </motion.div>

                {/* Project Details Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="border-l-4 border-electric pl-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-electric" />
                      <span className="font-mono text-sm text-muted-foreground">CATEGORY</span>
                    </div>
                    <p className="font-display text-2xl">{project.category}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="border-l-4 border-hot-red pl-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-hot-red" />
                      <span className="font-mono text-sm text-muted-foreground">DURATION</span>
                    </div>
                    <p className="font-display text-2xl">{project.duration || '3 MONTHS'}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="border-l-4 border-cold-blue pl-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-cold-blue" />
                      <span className="font-mono text-sm text-muted-foreground">ROLE</span>
                    </div>
                    <p className="font-display text-2xl">{project.role || 'LEAD DEVELOPER'}</p>
                  </motion.div>
                </div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mb-12"
                >
                  <h3 className="font-display text-3xl mb-6">TECH STACK</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        className={`px-4 py-2 border-2 border-${project.color} font-mono text-sm hover:bg-${project.color} hover:text-background transition-colors cursor-default`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Case Study Sections */}
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <h3 className="font-display text-3xl mb-4 flex items-center gap-3">
                      <span className="w-8 h-1 bg-electric" />
                      THE CHALLENGE
                    </h3>
                    <p className="font-mono text-muted-foreground leading-relaxed">
                      {project.challenge || 
                        `The client needed a robust, scalable solution that could handle high traffic while maintaining exceptional user experience. The existing system was outdated and couldn't support modern requirements.`}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="font-display text-3xl mb-4 flex items-center gap-3">
                      <span className="w-8 h-1 bg-hot-red" />
                      THE SOLUTION
                    </h3>
                    <p className="font-mono text-muted-foreground leading-relaxed">
                      {project.solution ||
                        `Built a modern, component-based architecture with emphasis on performance and maintainability. Implemented cutting-edge technologies and best practices for optimal results.`}
                    </p>
                  </motion.div>
                </div>

                {/* Results */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="mb-12 p-8 border-4 border-foreground bg-foreground/5"
                >
                  <h3 className="font-display text-3xl mb-6">KEY RESULTS</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(project.results || ['98% Performance Score', '40% Faster Load Time', '50K+ Users', '99.9% Uptime']).map((result, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="text-center"
                      >
                        <p className={`text-display text-4xl text-${project.color} mb-2`}>
                          {result.split(' ')[0]}
                        </p>
                        <p className="font-mono text-sm text-muted-foreground">
                          {result.split(' ').slice(1).join(' ')}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                    className="mb-12"
                  >
                    <h3 className="font-display text-3xl mb-6">PROJECT GALLERY</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.gallery.map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="border-2 border-foreground overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                        >
                          <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-48 object-cover" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 }}
                  className="flex flex-wrap gap-4"
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-electric text-background font-mono hover-brutal"
                    >
                      <ExternalLink className="w-5 h-5" />
                      VIEW LIVE SITE
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border-2 border-foreground font-mono hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      VIEW SOURCE
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 w-32 h-32 border-t-4 border-r-4 border-electric opacity-20" />
              <div className="absolute top-0 right-0 w-32 h-32 border-b-4 border-l-4 border-hot-red opacity-20" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
