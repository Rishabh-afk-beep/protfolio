import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';
import ScrollReveal from './ScrollReveal';
import GlitchText from './GlitchText';
import TextScramble from './TextScramble';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function BrutalistContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'd022fd2b-3216-415a-8263-24ee5658717e');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("MESSAGE SENT", {
          description: "I'll get back to you soon.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast.error("ERROR", {
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen p-6 md:p-12 noise relative overflow-hidden" ref={ref}>
      {/* Background number */}
      <div className="absolute top-0 right-0 text-[40vw] font-display text-foreground/[0.02] leading-none pointer-events-none select-none">
        04
      </div>

      {/* Animated corner elements */}
      <motion.div 
        className="absolute top-10 right-10 w-32 h-32 border-4 border-electric"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div 
        className="absolute bottom-40 left-10 w-24 h-24 border-4 border-hot-red hidden lg:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <ScrollReveal variant="flip">
          <motion.div className="mb-16">
            <h2 className="text-display text-[12vw] md:text-[10vw] leading-[0.85]">
              <GlitchText intensity="low">LET'S</GlitchText>
            </h2>
            <h2 className="text-display text-[12vw] md:text-[10vw] leading-[0.85] gradient-text">
              <GlitchText intensity="high" continuous>WORK</GlitchText>
              <span className="text-foreground">.</span>
            </h2>
          </motion.div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <ScrollReveal variant="slide" delay={0.1}>
            <div className="space-y-12">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Got a project in mind? Let's create something{' '}
                <span className="text-foreground font-bold neon-underline">extraordinary</span> together.
              </p>

              <div className="space-y-8">
                <TiltCard tiltAmount={8} className="border-l-4 border-electric pl-6 py-4">
                  <div className="font-mono text-xs text-muted-foreground mb-2">EMAIL</div>
                  <a 
                    href="mailto:ranjanrishabh2002@gmail.com" 
                    className="text-2xl font-bold hover:text-electric transition-colors"
                    data-cursor="EMAIL"
                  >
                    <TextScramble scrambleOnHover revealOnScroll={false}>RANJANRISHABH2002@GMAIL.COM</TextScramble>
                  </a>
                </TiltCard>

                <TiltCard tiltAmount={8} className="border-l-4 border-foreground pl-6 py-4">
                  <div className="font-mono text-xs text-muted-foreground mb-2">SOCIALS</div>
                  <div className="flex gap-6">
                    <MagneticButton href="https://github.com/Rishabh-afk-beep" data-cursor="GH">
                      <span className="text-lg font-bold hover:text-electric transition-colors">GITHUB</span>
                    </MagneticButton>
                    <MagneticButton href="https://www.linkedin.com/in/rishabhranjan1221/" data-cursor="IN">
                      <span className="text-lg font-bold hover:text-electric transition-colors">LINKEDIN</span>
                    </MagneticButton>
                  </div>
                </TiltCard>

                <TiltCard tiltAmount={8} className="border-l-4 border-foreground pl-6 py-4">
                  <div className="font-mono text-xs text-muted-foreground mb-2">LOCATION</div>
                  <div className="text-lg">BENGALURU, INDIA</div>
                  <div className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                    <motion.span 
                      className="w-2 h-2 bg-electric rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                    IST (UTC+5:30)
                  </div>
                </TiltCard>

                <TiltCard tiltAmount={8} className="border-l-4 border-hot-red pl-6 py-4">
                  <div className="font-mono text-xs text-muted-foreground mb-2">RESUME</div>
                  <MagneticButton
                    data-cursor="DOWNLOAD"
                  >
                    <a 
                      href="/resume.pdf" 
                      download="Rishabh_Ranjan_Dangi_Resume.pdf"
                      className="flex items-center gap-3 text-lg font-bold hover:text-electric transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <TextScramble scrambleOnHover revealOnScroll={false}>DOWNLOAD CV</TextScramble>
                    </a>
                  </MagneticButton>
                </TiltCard>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Form */}
          <ScrollReveal variant="fade" delay={0.3}>
            <TiltCard tiltAmount={3}>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 p-6 border-4 border-foreground bg-card/50 backdrop-blur-sm"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className={`transition-transform duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                    <label className="font-mono text-xs text-muted-foreground block mb-2">NAME *</label>
                    <Input
                      name="name"
                      required
                      placeholder="JOHN DOE"
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-transparent border-2 border-foreground rounded-none h-14 font-mono placeholder:text-muted-foreground focus:border-electric focus:ring-0 transition-all hover:border-electric/50"
                    />
                  </div>
                  <div className={`transition-transform duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                    <label className="font-mono text-xs text-muted-foreground block mb-2">EMAIL *</label>
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder="JOHN@EXAMPLE.COM"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="bg-transparent border-2 border-foreground rounded-none h-14 font-mono placeholder:text-muted-foreground focus:border-electric focus:ring-0 transition-all hover:border-electric/50"
                    />
                  </div>
                </div>

                <div className={`transition-transform duration-300 ${focusedField === 'project' ? 'scale-[1.02]' : ''}`}>
                  <label className="font-mono text-xs text-muted-foreground block mb-2">PROJECT TYPE</label>
                  <Input
                    name="project_type"
                    placeholder="WEB APP / WEBSITE / OTHER"
                    onFocus={() => setFocusedField('project')}
                    onBlur={() => setFocusedField(null)}
                    className="bg-transparent border-2 border-foreground rounded-none h-14 font-mono placeholder:text-muted-foreground focus:border-electric focus:ring-0 transition-all hover:border-electric/50"
                  />
                </div>

                <div className={`transition-transform duration-300 ${focusedField === 'message' ? 'scale-[1.02]' : ''}`}>
                  <label className="font-mono text-xs text-muted-foreground block mb-2">MESSAGE *</label>
                  <Textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="TELL ME ABOUT YOUR PROJECT..."
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="bg-transparent border-2 border-foreground rounded-none font-mono placeholder:text-muted-foreground focus:border-electric focus:ring-0 resize-none transition-all hover:border-electric/50"
                  />
                </div>

                <MagneticButton
                  data-cursor="SEND"
                  className="w-full"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full electric-bg text-raw-black font-mono text-lg py-6 font-bold hover-brutal border-4 border-foreground disabled:opacity-50 transition-all relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                        >
                          SENDING...
                        </motion.span>
                      ) : (
                        'SEND MESSAGE →'
                      )}
                    </span>
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-hot-red -z-0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                </MagneticButton>
              </motion.form>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <ScrollReveal variant="fade" delay={0.5}>
        <motion.footer className="mt-24 pt-8 border-t-4 border-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-sm text-muted-foreground">
              © {new Date().getFullYear()} <TextScramble scrambleOnHover revealOnScroll={false}>RISHABH RANJAN DANGI</TextScramble>. ALL RIGHTS RESERVED.
            </div>
            <motion.div 
              className="font-mono text-sm text-muted-foreground flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              DESIGNED & BUILT WITH{' '}
              <motion.span 
                className="text-electric text-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                ♦
              </motion.span>
            </motion.div>
          </div>
        </motion.footer>
      </ScrollReveal>
    </section>
  );
}
