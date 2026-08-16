import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const KB: Record<string, string> = {
  default: "I'm RD-AI, Rishabh's personal assistant. Ask me anything about him — skills, projects, availability, or just say hi!",
  hi: "Hey! I'm RD-AI, Rishabh's assistant. What would you like to know about him?",
  hello: "Hey! I'm RD-AI, Rishabh's assistant. What would you like to know about him?",
  hey: "Hey there! Ask me anything about Rishabh — his skills, projects, or how to hire him!",
  who: "Rishabh Ranjan Dangi is a Full-Stack Developer & AI Engineer based in Bengaluru, India. He's currently pursuing B.E. in Information Science at Acharya Institute of Technology (2023-2027).",
  name: "His name is Rishabh Ranjan Dangi. You can call him RD!",
  skills: "Rishabh is skilled in: Python (90%), React (85%), FastAPI (85%), LangGraph (80%), RAG Pipelines (85%), JavaScript (85%), SQL, Java, and more.",
  tech: "His tech stack includes Python, React, FastAPI, LangGraph, ChromaDB, Ollama, Firebase, Leaflet, REST APIs, Git, and cloud platforms like Vercel and Render.",
  project: "He has 3 key projects:\n1. Agentic Multimodal RAG — LangGraph + ChromaDB + Groq\n2. CivicSim — AI civic transparency platform (Hackathon winner!)\n3. NearMyColleges — Full-stack student housing marketplace (live at nearmycolleges.in)",
  rag: "His flagship project is an Agentic Multimodal RAG pipeline built with LangGraph, ChromaDB, BM25, cross-encoder reranking, and multi-LLM routing (Groq, Gemini, Ollama). It handles complex multi-step queries over documents with high accuracy.",
  hackathon: "Rishabh secured 2nd place at Srujana Hackathon 2025 and 3rd place at ImpactX 2025 (RNSIT). He's a proven performer under pressure!",
  experience: "Rishabh is a fresher with 0-1 years of professional experience. However, he has shipped 3 production-grade projects and won 2 hackathons. He's looking for his first full-time role.",
  hire: "Rishabh is ACTIVELY open to opportunities! Best way to reach him is through the Contact section on this portfolio or directly at his email. He's interested in AI/ML Engineer, Full-Stack Developer, and Backend Engineer roles.",
  available: "Yes! Rishabh is currently open to full-time roles and internships. He's available immediately.",
  contact: "You can contact Rishabh through:\n→ The Contact form on this portfolio\n→ GitHub: github.com/Rishabh-afk-beep\n→ He responds fast!",
  salary: "Rishabh is open to discussing compensation based on the role and company. Feel free to reach out through the contact form!",
  location: "Rishabh is based in Bengaluru, India. He's open to remote work and hybrid roles.",
  education: "B.E. in Information Science at Acharya Institute of Technology, Bengaluru (2023-2027). CGPA and academic performance reflect his dedication to core CS fundamentals.",
  ai: "Rishabh specializes in Agentic AI — LangGraph-based multi-step pipelines, RAG systems with vector search, multi-LLM routing, and NLP. He has shipped production-grade AI applications.",
  python: "Python is Rishabh's primary language (90% proficiency). He uses it for backend development with FastAPI and AI/ML work with LangChain, LangGraph, and HuggingFace.",
  react: "Rishabh builds modern UIs with React (85% proficiency). He's also experienced with TypeScript, Vite, and component-driven design.",
  resume: "You can download Rishabh's resume directly from this portfolio — there's a big yellow RESUME button right on the hero section!",
  github: "Rishabh's GitHub: github.com/Rishabh-afk-beep — check it out to see his code quality and contributions!",
  strength: "Rishabh's core strengths are: building agentic AI systems end-to-end, full-stack development, shipping fast under pressure (proven in hackathons), and clean production-ready code.",
  weakness: "He'd say he's still building industry experience, but what he lacks in years he makes up in shipped products and hackathon wins!",
  why: "Why should you hire Rishabh? Because he doesn't just write code, he ships products. He's proven he can build complex AI systems (Agentic RAG), scale full-stack apps (NearMyColleges), and perform under pressure (2 hackathon wins). Plus, he's hungry to learn and contribute from day one.",
  joke: "Why do programmers prefer dark mode? Because light attracts bugs! 🐛 (Rishabh told me that one).",
  hobby: "When he's not coding or winning hackathons, Rishabh enjoys exploring new AI models, reading tech blogs, and building side projects.",
  framework: "Rishabh loves React for the frontend and FastAPI for the backend. He's also heavily using LangGraph for AI orchestration right now.",
  database: "He works with PostgreSQL, MongoDB, ChromaDB (for vector search), and Firebase/Firestore.",
  cloud: "He has experience deploying on Vercel, Render, and Firebase, along with basic AWS knowledge."
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  
  // Exact or strongly matching phrases
  if (lower.includes('why should i hire') || lower.includes('why hire')) return KB.why;
  if (lower.includes('tell me a joke') || lower.includes('joke')) return KB.joke;

  // General keyword matching
  for (const [key, response] of Object.entries(KB)) {
    if (key === 'default') continue;
    if (lower.includes(key)) return response;
  }
  return "I don't have a specific answer for that, but Rishabh is the best person to ask! Use the Contact section to reach him directly. 🚀";
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: KB.default }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { role: 'bot', text: getBotResponse(text) }]);
    }, 800 + Math.random() * 600);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        className="fixed bottom-6 right-24 z-50 w-14 h-14 border-4 border-electric bg-background flex items-center justify-center hover-brutal group"
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        aria-label="Open AI chatbot"
      >
        <MessageCircle className="w-6 h-6 text-electric" />
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 border-2 border-electric"
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 whitespace-nowrap font-mono text-xs bg-foreground text-background px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          ASK RD-AI
        </span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 border-4 border-foreground bg-card shadow-[8px_8px_0_0_hsl(var(--electric))] flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ maxHeight: '70vh' }}
          >
            {/* Header */}
            <div className="bg-foreground text-background px-3 py-2 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-electric animate-pulse" />
                <span className="font-bold tracking-widest">RD-AI v1.0</span>
                <span className="text-muted text-[9px]">RISHABH'S ASSISTANT</span>
              </div>
              <button onClick={() => setOpen(false)} className="hover:text-electric transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick prompts */}
            <div className="flex gap-1 flex-wrap px-2 pt-2">
              {['Skills', 'Projects', 'Hire me?', 'Contact'].map(q => (
                <button
                  key={q}
                  onClick={() => {
                    setMessages(m => [...m, { role: 'user', text: q }]);
                    setTyping(true);
                    setTimeout(() => {
                      setTyping(false);
                      setMessages(m => [...m, { role: 'bot', text: getBotResponse(q) }]);
                    }, 700);
                  }}
                  className="text-[9px] font-mono border border-electric text-electric px-2 py-0.5 hover:bg-electric hover:text-background transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0" style={{ maxHeight: '300px' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] font-mono text-xs px-3 py-2 whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-electric text-background border-2 border-electric'
                      : 'bg-muted text-foreground border-2 border-foreground'
                  }`}>
                    {msg.role === 'bot' && (
                      <span className="text-[8px] text-muted-foreground block mb-1">RD-AI &gt;</span>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground border-2 border-foreground font-mono text-xs px-3 py-2">
                    <span className="text-[8px] text-muted-foreground block mb-1">RD-AI &gt;</span>
                    <span className="animate-pulse">PROCESSING...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t-2 border-foreground flex">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent font-mono text-xs px-3 py-2 outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={sendMessage}
                className="border-l-2 border-foreground px-3 hover:bg-electric hover:text-background transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
