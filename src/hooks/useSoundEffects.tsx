import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playWhoosh: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

// Create subtle synthesized sounds using Web Audio API
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

const createAudioContext = () => {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) throw new Error('Web Audio API is not supported');
  return new Ctx();
};

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((
    frequency: number, 
    duration: number, 
    type: OscillatorType = 'sine',
    volume: number = 0.1
  ) => {
    if (isMuted) return;

    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = type;

      // Subtle envelope
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context might not be available
    }
  }, [isMuted, getAudioContext]);

  const playHover = useCallback(() => {
    playTone(800, 0.08, 'sine', 0.05);
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(600, 0.1, 'triangle', 0.08);
    setTimeout(() => playTone(900, 0.08, 'sine', 0.06), 30);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    playTone(523, 0.15, 'sine', 0.08);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.08), 100);
    setTimeout(() => playTone(784, 0.2, 'sine', 0.08), 200);
  }, [playTone]);

  const playWhoosh = useCallback(() => {
    if (isMuted) return;

    try {
      const ctx = getAudioContext();
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      source.buffer = buffer;
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.15);

      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      source.start();
    } catch (e) {
      // Audio context might not be available
    }
  }, [isMuted, getAudioContext]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playHover, playClick, playSuccess, playWhoosh }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundEffects() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundEffects must be used within a SoundProvider');
  }
  return context;
}
