import CustomCursor from '@/components/CustomCursor';
import BrutalistNav from '@/components/BrutalistNav';
import BrutalistHero from '@/components/BrutalistHero';
import BrutalistProjects from '@/components/BrutalistProjects';
import BrutalistAbout from '@/components/BrutalistAbout';
import BrutalistContact from '@/components/BrutalistContact';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Custom Cursor */}
      <CustomCursor />
      
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
  );
};

export default Index;
