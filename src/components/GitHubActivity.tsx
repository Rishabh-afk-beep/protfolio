import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    action?: string;
    ref?: string;
  };
}

function formatEvent(event: GitHubEvent): string {
  const repo = event.repo.name.replace('Rishabh-afk-beep/', '');
  switch (event.type) {
    case 'PushEvent':
      const msg = event.payload.commits?.[0]?.message?.slice(0, 40) ?? 'pushed commits';
      return `PUSH → ${repo}: ${msg}`;
    case 'CreateEvent':
      return `CREATE ${event.payload.ref ?? 'repo'} → ${repo}`;
    case 'WatchEvent':
      return `STARRED → ${repo}`;
    case 'ForkEvent':
      return `FORK → ${repo}`;
    case 'IssuesEvent':
      return `ISSUE ${event.payload.action?.toUpperCase()} → ${repo}`;
    case 'PullRequestEvent':
      return `PR ${event.payload.action?.toUpperCase()} → ${repo}`;
    default:
      return `${event.type.replace('Event', '')} → ${repo}`;
  }
}

function timeAgo(dateStr: string): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/Rishabh-afk-beep/events/public?per_page=8')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setEvents(data.slice(0, 8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed bottom-24 left-4 z-40 w-72 font-mono text-xs select-none"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 0.6 }}
    >
      {/* Header */}
      <div
        className="bg-foreground text-background flex items-center justify-between px-2 py-1 cursor-pointer"
        onClick={() => setMinimized(m => !m)}
      >
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-electric animate-pulse" />
          <span className="text-[9px] font-bold tracking-widest">GITHUB_ACTIVITY.log</span>
        </div>
        <div className="flex gap-1">
          <button
            className="w-3 h-3 bg-electric text-background flex items-center justify-center text-[8px] font-bold"
            onClick={e => { e.stopPropagation(); setMinimized(m => !m); }}
          >—</button>
          <button
            className="w-3 h-3 bg-hot-red text-background flex items-center justify-center text-[8px] font-bold"
            onClick={e => { e.stopPropagation(); setVisible(false); }}
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
            <div className="bg-card/95 border-2 border-t-0 border-foreground backdrop-blur-sm max-h-52 overflow-y-auto">
              {loading ? (
                <div className="p-3 text-electric animate-pulse text-[10px]">
                  FETCHING COMMITS...
                </div>
              ) : events.length === 0 ? (
                <div className="p-3 text-muted-foreground text-[10px]">
                  NO RECENT ACTIVITY
                </div>
              ) : (
                <div className="divide-y divide-muted/30">
                  {events.map((event, i) => (
                    <motion.div
                      key={event.id}
                      className="px-2 py-1.5 hover:bg-muted/20 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="text-[9px] text-electric truncate">
                        &gt; {formatEvent(event)}
                      </div>
                      <div className="text-[8px] text-muted-foreground mt-0.5">
                        {timeAgo(event.created_at)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              <div className="border-t border-muted/30 px-2 py-1 text-[8px] text-muted-foreground">
                <a
                  href="https://github.com/Rishabh-afk-beep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-electric transition-colors"
                >
                  → github.com/Rishabh-afk-beep
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
