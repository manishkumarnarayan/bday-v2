import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../../utils/soundEffects';
import { SparklesIcon, HeartIcon } from './Icons';

export default function CuteLoader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Start preloading audio
    sounds.preloadAudio((pct) => {
      setProgress(pct);
      if (pct >= 100) {
        setIsReady(true);
      }
    });
  }, []);

  const handleStart = () => {
    sounds.playSparkle();
    sounds.startBGM(); // Start background music on by default
    onLoaded();
  };


  const getLoadingText = (pct) => {
    if (pct < 30) return 'Gathering cosmic stardust for Sanjana... ✨';
    if (pct < 65) return 'Tuning sweet birthday melodies... 🎵';
    if (pct < 95) return 'Illuminating warm memories... 💖';
    return 'Ready to celebrate Sanjana! 🎂';
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0b10] text-rose-50 px-4 select-none overflow-hidden">
      {/* Background Starry Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/70 animate-sparkle"
            style={{
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              top: `${(i * 23) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 5) * 0.7}s`,
              opacity: (i % 4) * 0.25 + 0.25,
            }}
          />
        ))}
        {/* Soft glowing ambient orbs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-rose-950/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-950/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-sm w-full mx-auto text-center flex flex-col items-center">
        {/* Floating Glowing Cake / Sparkle Badge */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full neu-dark-flat flex items-center justify-center border border-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.25)] relative">
            <span className="text-4xl sm:text-5xl filter drop-shadow">🎂</span>
            
            {/* Orbiting Sparkle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="absolute inset-0 flex items-start justify-center pointer-events-none"
            >
              <span className="text-sm -mt-2">✨</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Recipient Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1 mb-6"
        >
          <h2 className="font-serif-title text-2xl sm:text-3xl font-normal text-rose-100/90 tracking-wide">
            Sanjana's Birthday
          </h2>
          <p className="text-[11px] sm:text-xs text-rose-400/70 uppercase tracking-widest font-mono">
            29 · 08 · 2007
          </p>
        </motion.div>

        {/* Cute Progress Bar */}
        <div className="w-full bg-zinc-900/90 rounded-full h-3 p-0.5 border border-white/10 shadow-inner mb-4 overflow-hidden relative">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 relative shadow-[0_0_12px_rgba(244,63,94,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          >
            {/* Shimmer light effect */}
            <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse" />
          </motion.div>
        </div>

        {/* Progress percent & status */}
        <div className="flex items-center justify-between w-full text-xs text-zinc-400 mb-6 font-medium px-1">
          <span className="text-rose-300 text-[11px] truncate max-w-[210px] text-left">
            {getLoadingText(progress)}
          </span>
          <span className="font-mono text-rose-400 font-bold ml-2">
            {progress}%
          </span>
        </div>

        {/* Start Button when ready */}
        <AnimatePresence>
          {isReady && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full"
            >
              <button
                onClick={handleStart}
                className="w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-rose-950 bg-gradient-to-r from-rose-200 via-pink-100 to-amber-100 shadow-[0_0_30px_rgba(251,191,36,0.5)] border border-white hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Sanjana's Universe</span>
                <SparklesIcon className="w-4 h-4 text-rose-600 animate-spin" style={{ animationDuration: '4s' }} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
