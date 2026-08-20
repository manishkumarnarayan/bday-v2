import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingElements({ isDark = false }) {
  const elements = [
    { id: 1, text: '✨', size: 'text-2xl', top: '12%', left: '8%', delay: 0, duration: 6 },
    { id: 2, text: '🌸', size: 'text-xl', top: '24%', left: '88%', delay: 1.5, duration: 7 },
    { id: 3, text: '💖', size: 'text-lg', top: '70%', left: '6%', delay: 2, duration: 8 },
    { id: 4, text: '⭐', size: 'text-xl', top: '82%', left: '92%', delay: 0.8, duration: 6.5 },
    { id: 5, text: '🌷', size: 'text-2xl', top: '45%', left: '94%', delay: 3, duration: 9 },
    { id: 6, text: '✨', size: 'text-lg', top: '18%', left: '75%', delay: 2.2, duration: 5.5 },
    { id: 7, text: '🎀', size: 'text-xl', top: '85%', left: '18%', delay: 1, duration: 7.5 },
    { id: 8, text: '💫', size: 'text-lg', top: '55%', left: '4%', delay: 3.5, duration: 8.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft glowing ambient orbs */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40 transition-colors duration-1000 ${
          isDark
            ? 'bg-purple-900/30'
            : 'bg-rose-200/50'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-32 w-96 h-96 rounded-full blur-3xl opacity-40 transition-colors duration-1000 ${
          isDark
            ? 'bg-indigo-900/30'
            : 'bg-amber-100/60'
        }`}
      />
      <div
        className={`absolute -bottom-32 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-40 transition-colors duration-1000 ${
          isDark
            ? 'bg-pink-900/20'
            : 'bg-pink-100/50'
        }`}
      />

      {/* Floating cute emojis */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute ${el.size} opacity-60 filter drop-shadow-sm`}
          style={{ top: el.top, left: el.left }}
          animate={{
            y: [-10, 12, -10],
            rotate: [-6, 8, -6],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: el.delay,
          }}
        >
          {el.text}
        </motion.div>
      ))}
    </div>
  );
}
