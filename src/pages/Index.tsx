import EnhancedCursor from '@/components/EnhancedCursor';
import BrutalistNav from '@/components/BrutalistNav';
import BrutalistHero from '@/components/BrutalistHero';
import BrutalistProjects from '@/components/BrutalistProjects';
import BrutalistAbout from '@/components/BrutalistAbout';
import BrutalistContact from '@/components/BrutalistContact';
import ThemeToggle from '@/components/ThemeToggle';
import PageTransition from '@/components/PageTransition';
import SoundToggle from '@/components/SoundToggle';
import { SoundProvider } from '@/hooks/useSoundEffects';

const Index = () => {
  return (
    <SoundProvider>
      <PageTransition>
        <div className="relative min-h-screen overflow-x-hidden bg-background">
          {/* Enhanced Custom Cursor with particles */}
          <EnhancedCursor />
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Sound Toggle */}
          <SoundToggle />
          
          {/* Navigation */}
          <BrutalistNav />
          
          {/* Main Content */}
          <main className="pt-20">
            <BrutalistHero />
            <BrutalistProjects />
            <BrutalistAbout />
            <BrutalistContact />
          </main>
        </div>
      </PageTransition>
    </SoundProvider>
  );
};

export default Index;
