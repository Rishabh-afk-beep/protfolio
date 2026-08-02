import { useEffect, useState, useRef } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function SystemOverload() {
  const [stress, setStress] = useState(0);
  const [isCrashed, setIsCrashed] = useState(false);
  const { playGlitch } = useSoundEffects();
  
  const stressRef = useRef(0);
  const crashRef = useRef(false);

  useEffect(() => {
    const handleAction = (e: Event) => {
      if (crashRef.current) return;
      
      // Don't accumulate stress if typing in an input field (like the terminal)
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      
      // Only increment on discrete clicks and keypresses to avoid triggering during normal scrolling
      stressRef.current += 15;
      if (stressRef.current > 100) {
        stressRef.current = 100;
      }
      setStress(stressRef.current);

      if (stressRef.current >= 100 && !crashRef.current) {
        triggerCrash();
      }
    };

    const triggerCrash = () => {
      crashRef.current = true;
      setIsCrashed(true);
      playGlitch();
      
      // Reboot after 3.5 seconds
      setTimeout(() => {
        crashRef.current = false;
        setIsCrashed(false);
        stressRef.current = 0;
        setStress(0);
      }, 3500);
    };

    window.addEventListener('mousedown', handleAction);
    window.addEventListener('keydown', handleAction);
    window.addEventListener('touchstart', handleAction);

    // Decay stress faster so it only triggers on truly rapid spamming
    const decayInterval = setInterval(() => {
      if (!crashRef.current && stressRef.current > 0) {
        stressRef.current = Math.max(0, stressRef.current - 20);
        setStress(stressRef.current);
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousedown', handleAction);
      window.removeEventListener('keydown', handleAction);
      window.removeEventListener('touchstart', handleAction);
      clearInterval(decayInterval);
    };
  }, [playGlitch]);

  return (
    <>
      {/* Invisible Stress UI */}
      {stress > 0 && !isCrashed && (
        <div 
          className="fixed bottom-0 left-0 h-1 bg-hot-red z-[10000] transition-all duration-300 ease-out"
          style={{ width: `${stress}%`, opacity: stress / 100 }}
        />
      )}

      {/* Blue Screen of Death */}
      {isCrashed && (
        <div className="fixed inset-0 z-[10000] bg-[#0000aa] text-white font-mono p-8 md:p-16 flex flex-col justify-start items-start overflow-hidden cursor-none select-none">
          {/* Tearing effect CSS using inline styles for instant glitch */}
          <style dangerouslySetInnerHTML={{__html: `
            body { overflow: hidden !important; }
            .bsod-tear {
              animation: tear 0.2s steps(2) infinite;
            }
            @keyframes tear {
              0% { transform: skew(0deg); }
              20% { transform: skew(-10deg); filter: invert(1); }
              40% { transform: skew(10deg); filter: invert(0); }
              60% { transform: skew(-5deg) translate(-10px, 10px); }
              80% { transform: skew(5deg) translate(10px, -10px); }
              100% { transform: skew(0deg); }
            }
          `}} />
          
          <div className="bsod-tear w-full h-full space-y-6 flex flex-col">
            <div className="bg-white text-[#0000aa] px-4 py-1 self-start inline-block font-bold text-xl uppercase tracking-widest">
              Windows
            </div>
            
            <p className="text-xl md:text-2xl mt-8">
              A fatal exception 0E has occurred at 0028:C0011E36 in UXD vxd(01) +<br/>
              00010E36. The current application will be terminated.
            </p>

            <ul className="list-disc list-inside text-lg md:text-xl space-y-4 mt-8">
              <li>Press any key to terminate the current application.</li>
              <li>Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.</li>
            </ul>

            <p className="mt-12 text-lg md:text-xl text-center w-full">
              Press any key to continue _
            </p>
            
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none noise opacity-20 mix-blend-overlay"></div>
          </div>
        </div>
      )}
    </>
  );
}
