import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function useAnimatedStat(base: number, variance: number, interval = 1200) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    const t = setInterval(() => {
      setVal(Math.min(99, Math.max(1, base + (Math.random() - 0.5) * variance)));
    }, interval);
    return () => clearInterval(t);
  }, [base, variance, interval]);
  return Math.round(val);
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-0.5">
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground font-mono text-[9px]">{label}</span>
        <span className="font-mono text-[9px]" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1 bg-muted/50 w-full overflow-hidden">
        <motion.div
          className="h-full origin-left"
          style={{ backgroundColor: color }}
          animate={{ scaleX: value / 100 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

export default function SystemStatsHUD() {
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [uptime, setUptime] = useState(0);

  const cpu = useAnimatedStat(34, 40);
  const ram = useAnimatedStat(58, 20);
  const net = useAnimatedStat(12, 30, 800);
  const gpu = useAnimatedStat(22, 35, 1500);

  useEffect(() => {
    const t = setInterval(() => setUptime(u => u + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatUptime = (s: number) => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-20 right-4 z-40 w-44 font-mono text-xs select-none"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      {/* Header bar */}
      <div className="bg-foreground text-background flex items-center justify-between px-2 py-1 cursor-pointer"
        onClick={() => setMinimized(m => !m)}
      >
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-hot-red animate-pulse" />
          <span className="text-[9px] font-bold tracking-widest">SYS_MONITOR.exe</span>
        </div>
        <div className="flex gap-1">
          <button
            className="w-3 h-3 bg-electric text-background flex items-center justify-center text-[8px] font-bold hover:bg-yellow-300"
            onClick={(e) => { e.stopPropagation(); setMinimized(m => !m); }}
          >—</button>
          <button
            className="w-3 h-3 bg-hot-red text-background flex items-center justify-center text-[8px] font-bold hover:bg-red-400"
            onClick={(e) => { e.stopPropagation(); setVisible(false); }}
          >✕</button>
        </div>
      </div>

      {/* Body */}
      <AnimatePresence>
        {!minimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-card/95 border-2 border-t-0 border-foreground p-2 space-y-2 backdrop-blur-sm">
              <StatBar label="CPU" value={cpu} color="hsl(51,100%,50%)" />
              <StatBar label="RAM" value={ram} color="hsl(220,100%,60%)" />
              <StatBar label="NET" value={net} color="hsl(0,100%,55%)" />
              <StatBar label="GPU" value={gpu} color="hsl(280,100%,65%)" />

              <div className="border-t border-muted pt-1 space-y-0.5">
                <div className="flex justify-between text-[9px]">
                  <span className="text-muted-foreground">UPTIME</span>
                  <span className="text-electric">{formatUptime(uptime)}</span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-muted-foreground">PROC</span>
                  <span className="text-cold-blue">PORTFOLIO.EXE</span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-muted-foreground">STATUS</span>
                  <span className="text-hot-red flex items-center gap-1">
                    <span className="w-1 h-1 bg-hot-red animate-ping" />
                    LIVE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
