import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function SoundToggle() {
  const { isMuted, toggleMute, playClick } = useSoundEffects();

  const handleClick = () => {
    if (!isMuted) playClick();
    toggleMute();
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 border-2 border-foreground bg-background flex items-center justify-center group"
      aria-label="Toggle sound"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
    >
      <motion.div
        animate={{ rotate: isMuted ? 0 : 360 }}
        transition={{ duration: 0.3 }}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </motion.div>
      
      {/* Pulse ring when unmuted */}
      {!isMuted && (
        <motion.div
          className="absolute inset-0 border-2 border-electric"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}

      {/* Tooltip */}
      <span className="absolute left-full ml-3 whitespace-nowrap font-mono text-xs bg-foreground text-background px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {isMuted ? 'UNMUTE' : 'MUTE'} SOUNDS
      </span>
    </motion.button>
  );
}
