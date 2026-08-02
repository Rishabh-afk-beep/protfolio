import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSoundEffects } from '@/hooks/useSoundEffects';

type CommandHistory = {
  command: string;
  response: string | React.ReactNode;
  isStreaming?: boolean;
};

// Component to simulate a typing effect for AI responses
const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const { playLoadingBeep } = useSoundEffects();

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      if (i % 3 === 0) playLoadingBeep(); // Beep occasionally while typing
      i++;
      if (i > text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 20); // Typing speed

    return () => clearInterval(interval);
  }, [text, onComplete, playLoadingBeep]);

  return <span>{displayedText}</span>;
};

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<CommandHistory[]>([
    { command: '', response: 'SYSTEM_READY. TYPE "help" FOR AVAILABLE COMMANDS.\n\n[HINT: TRY TYPING "matrix", "play doom", OR "sudo rm -rf /" FOR COOL EASTER EGGS]' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playClick, playSuccess } = useSoundEffects();

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return; // Prevent input while AI is typing
    
    const cmd = input.trim();
    if (!cmd) return;
    
    const lowerCmd = cmd.toLowerCase();
    let response: string | React.ReactNode = '';
    let needsTypewriter = false;
    
    setInput('');
    setIsProcessing(true);
    playClick();

    // First push the user command to history immediately
    setHistory(prev => [...prev, { command: cmd, response: '' }]);

    if (lowerCmd === 'help') {
      response = 'COMMANDS: help, whoami, skills, contact, clear, matrix, play doom, sudo rm -rf /';
    } else if (lowerCmd === 'whoami') {
      response = 'RISHABH RANJAN DANGI\nROLE: INFORMATION SCIENCE STUDENT & AI DEVELOPER\nLOCATION: BENGALURU';
    } else if (lowerCmd === 'skills') {
      response = 'PYTHON [█████████░] 90%\nREACT  [████████░░] 85%\nFASTAPI[████████░░] 85%\nAI/RAG [████████░░] 85%';
    } else if (lowerCmd === 'contact') {
      response = 'EMAIL: YOUR_EMAIL@EXAMPLE.COM\nGITHUB: RISHABH-AFK-BEEP';
    } else if (lowerCmd === 'clear') {
      setHistory([]);
      setIsProcessing(false);
      playClick();
      return;
    } else if (lowerCmd === 'reboot' || lowerCmd === 'reset') {
      response = 'SYSTEM REBOOT INITIATED. CLEARING MEMORY...';
      playSuccess();
      window.dispatchEvent(new CustomEvent('stop-physics'));
      window.dispatchEvent(new CustomEvent('trigger-matrix')); // actually we should stop matrix if we had a stop
      // let's just reload the page for a true reboot experience if they want
      setTimeout(() => window.location.reload(), 1500);
    } else if (lowerCmd === 'matrix') {
      response = 'INITIATING MATRIX PROTOCOL...';
      playSuccess();
      window.dispatchEvent(new CustomEvent('trigger-matrix'));
    } else if (lowerCmd.includes('doom')) {
      response = 'INITIALIZING 3D ENGINE... LOCK AND LOAD.';
      playSuccess();
      window.dispatchEvent(new CustomEvent('trigger-doom'));
    } else if (lowerCmd.startsWith('sudo rm -rf')) {
      response = 'CRITICAL ERROR: KERNEL PANIC. SYSTEM INTEGRITY COMPROMISED.';
      playSuccess();
      window.dispatchEvent(new CustomEvent('trigger-physics'));
    } else {
      response = "COMMAND UNRECOGNIZED. TYPE 'help' FOR A LIST OF AVAILABLE COMMANDS.";
      needsTypewriter = true;
    }

    if (needsTypewriter) {
      // Show a processing state temporarily
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].response = 'PROCESSING...';
        return newHistory;
      });

      // Give it a tiny fake delay for aesthetic
      setTimeout(() => {
        setHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].response = (
            <TypewriterText text={response as string} onComplete={() => setIsProcessing(false)} />
          );
          newHistory[newHistory.length - 1].isStreaming = true;
          return newHistory;
        });
      }, 300);
    } else {
      // Standard hardcoded response instantly
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].response = response;
        return newHistory;
      });
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Keep scroll at bottom while streaming
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing) {
      interval = setInterval(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-3xl mx-auto border-2 border-foreground bg-card p-4 font-mono text-xs md:text-sm shadow-[8px_8px_0_0_hsl(var(--electric))] hover:shadow-[12px_12px_0_0_hsl(var(--electric))] transition-shadow duration-300"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 border-b-2 border-foreground/20 pb-2">
        <div className="w-3 h-3 bg-hot-red" />
        <div className="w-3 h-3 bg-electric" />
        <div className="w-3 h-3 bg-cold-blue" />
        <span className="ml-2 text-muted-foreground font-bold tracking-widest">RISHABH_TERM.EXE [SECURE]</span>
      </div>
      
      {/* Terminal Body */}
      <div 
        ref={containerRef}
        className="h-64 overflow-y-auto space-y-3 pb-4 pr-2 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            {item.command && (
              <div className="flex gap-2 text-electric">
                <span>C:\USERS\RISHABH&gt;</span>
                <span>{item.command}</span>
              </div>
            )}
            <div className="text-foreground whitespace-pre-line ml-4">
              {item.response}
              {/* Blinking cursor effect on the last active streaming line */}
              {item.isStreaming && isProcessing && i === history.length - 1 && (
                <span className="inline-block w-2 h-4 bg-foreground animate-pulse ml-1 align-middle" />
              )}
            </div>
          </div>
        ))}
        
        {!isProcessing && (
          <form onSubmit={handleCommand} className="flex gap-2 text-electric pt-2">
            <span>C:\USERS\RISHABH&gt;</span>
              <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground caret-electric"
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        )}
      </div>
    </motion.div>
  );
}
