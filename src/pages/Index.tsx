import EnhancedCursor from '@/components/EnhancedCursor';
import BrutalistNav from '@/components/BrutalistNav';
import BrutalistHero from '@/components/BrutalistHero';
import BrutalistProjects from '@/components/BrutalistProjects';
import BrutalistAbout from '@/components/BrutalistAbout';
import BrutalistContact from '@/components/BrutalistContact';
import ThemeToggle from '@/components/ThemeToggle';
import PageTransition from '@/components/PageTransition';

const Index = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-x-hidden bg-background">
        {/* Enhanced Custom Cursor with particles */}
        <EnhancedCursor />
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
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
  );
};

export default Index;
