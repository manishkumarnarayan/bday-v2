import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sounds } from '../../utils/soundEffects';
import { MusicIcon, VolumeXIcon } from './Icons';

export default function AudioPlayer({ isDark = false }) {
  const [isPlaying, setIsPlaying] = useState(sounds.bgmPlaying);
  const [isMuted, setIsMuted] = useState(sounds.muted);

  useEffect(() => {
    return sounds.subscribe(({ isPlaying: playing, isMuted: muted }) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });
  }, []);

  // During stages 1-6, audio controls are cleanly integrated in HeaderProgress
  if (!isDark) return null;

  const toggleMusic = () => {
    sounds.toggleBGM();
    sounds.playClick();
  };

  const toggleMute = () => {
    sounds.toggleMute();
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-3 sm:top-5 right-3 sm:right-5 z-50 flex items-center gap-2 select-none"
    >

      <button
        onClick={toggleMusic}
        className={`group flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
          isDark
            ? 'neu-dark-btn text-purple-200 hover:text-white'
            : 'neu-button text-rose-700/80 hover:text-rose-900 bg-white/80'
        }`}
        title={isPlaying ? 'Pause Music Box' : 'Play Music Box'}
      >
        <motion.div
          animate={isPlaying ? { rotate: [0, 15, -15, 0] } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <MusicIcon className={`w-4 h-4 ${isPlaying ? 'text-rose-500' : 'text-zinc-400'}`} />
        </motion.div>
        <span className="hidden sm:inline">
          {isPlaying ? 'Music: Playing ✨' : 'Play Music 🎵'}
        </span>
        {isPlaying && (
          <span className="flex gap-0.5 items-end h-3">
            <span className="w-1 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s] h-full" />
            <span className="w-1 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.15s] h-2/3" />
            <span className="w-1 bg-pink-400 rounded-full animate-bounce h-4/5" />
          </span>
        )}
      </button>

      <button
        onClick={toggleMute}
        className={`p-2.5 rounded-full transition-all ${
          isDark
            ? 'neu-dark-btn text-purple-200'
            : 'neu-button text-zinc-600 bg-white/80'
        }`}
        title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
      >
        {isMuted ? (
          <VolumeXIcon className="w-4 h-4 text-red-400" />
        ) : (
          <span className="text-xs">🔔</span>
        )}
      </button>
    </motion.div>
  );
}
