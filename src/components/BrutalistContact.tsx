import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import MagneticButton from './MagneticButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function BrutalistContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast({
      title: "MESSAGE SENT",
      description: "I'll get back to you soon.",
    });
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="min-h-screen p-6 md:p-12 noise" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <h2 className="text-display text-[12vw] md:text-[10vw] leading-[0.85]">
            LET'S
          </h2>
          <h2 className="text-display text-[12vw] md:text-[10vw] leading-[0.85] text-electric">
            WORK<span className="text-foreground">.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Got a project in mind? Let's create something <span className="text-foreground font-bold">extraordinary</span> together.
            </p>

            <div className="space-y-8">
              <div className="border-l-4 border-electric pl-6">
                <div className="font-mono text-xs text-muted-foreground mb-2">EMAIL</div>
                <a 
                  href="mailto:hello@example.com" 
                  className="text-2xl font-bold hover:text-electric transition-colors"
                  data-cursor="EMAIL"
                >
                  HELLO@EXAMPLE.COM
                </a>
              </div>

              <div className="border-l-4 border-foreground pl-6">
                <div className="font-mono text-xs text-muted-foreground mb-2">SOCIALS</div>
                <div className="flex gap-6">
                  <MagneticButton href="https://github.com" data-cursor="GH">
                    <span className="text-lg font-bold hover:text-electric transition-colors">GITHUB</span>
                  </MagneticButton>
                  <MagneticButton href="https://linkedin.com" data-cursor="IN">
                    <span className="text-lg font-bold hover:text-electric transition-colors">LINKEDIN</span>
                  </MagneticButton>
                  <MagneticButton href="https://twitter.com" data-cursor="X">
                    <span className="text-lg font-bold hover:text-electric transition-colors">TWITTER</span>
                  </MagneticButton>
                </div>
              </div>

              <div className="border-l-4 border-foreground pl-6">
                <div className="font-mono text-xs text-muted-foreground mb-2">LOCATION</div>
                <div className="text-lg">SAN FRANCISCO, CA</div>
                <div className="font-mono text-sm text-muted-foreground">PST (UTC-8)</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="font-mono text-xs text-muted-foreground block mb-2">NAME *</label>
                <Input
                  required
                  placeholder="JOHN DOE"
                  className="bg-transparent border-2 border-foreground rounded-none h-14 font-mono placeholder:text-muted-foreground focus:border-electric focus:ring-0 transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-muted-foreground block mb-2">EMAIL *</label>
                <Input
                  type="email"
                  required
                  placeholder="JOHN@EXAMPLE.COM"
                  className="bg-transparent border-2 border-foreground rounded-none h-14 font-mono placeholder:text-muted-foreground focus:border-electric focus:ring-0 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-2">PROJECT TYPE</label>
              <Input
                placeholder="WEB APP / WEBSITE / OTHER"
                className="bg-transparent border-2 border-foreground rounded-none h-14 font-mono placeholder:text-muted-foreground focus:border-electric focus:ring-0 transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-muted-foreground block mb-2">MESSAGE *</label>
              <Textarea
                required
                rows={6}
                placeholder="TELL ME ABOUT YOUR PROJECT..."
                className="bg-transparent border-2 border-foreground rounded-none font-mono placeholder:text-muted-foreground focus:border-electric focus:ring-0 resize-none transition-colors"
              />
            </div>

            <MagneticButton
              data-cursor="SEND"
              className="w-full"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full electric-bg text-raw-black font-mono text-lg py-6 font-bold hover-brutal border-4 border-foreground disabled:opacity-50 transition-all"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE →'}
              </button>
            </MagneticButton>
          </motion.form>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="mt-24 pt-8 border-t-2 border-foreground"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-sm text-muted-foreground">
            © {new Date().getFullYear()} YOUR NAME. ALL RIGHTS RESERVED.
          </div>
          <div className="font-mono text-sm text-muted-foreground">
            DESIGNED & BUILT WITH <span className="text-electric">♦</span>
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
