import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../../utils/soundEffects';
import { triggerConfetti } from '../../utils/confetti';
import { HeartIcon, SparklesIcon, ArrowRightIcon, CheckCircleIcon } from '../common/Icons';

const COMPLIMENTS = [
  { id: 1, title: 'Radiant Laughter 🌸', desc: 'Your laugh has an effortless way of lighting up the entire room and melting away anyone’s stress.' },
  { id: 2, title: 'Deep Empathy & Care 💖', desc: 'You listen with your whole heart and make people feel truly heard, valued, and safe.' },
  { id: 3, title: 'Unmatched Grace 🌷', desc: 'You carry yourself with quiet confidence, elegance, and natural authenticity.' },
  { id: 4, title: 'Creative Soul ✨', desc: 'You see beauty in the smallest details and have such a wonderfully unique perspective on the world.' },
  { id: 5, title: 'Gentle Strength 🌿', desc: 'Even in chaotic moments, your calm aura and gentle wisdom ground everyone around you.' },
  { id: 6, title: 'Golden Heart ⭐', desc: 'Simply put: knowing Sanjana makes life richer, sweeter, and infinitely more joyful!' },
];

export default function GameBubblePop({ onNext }) {
  const [poppedIds, setPoppedIds] = useState([]);
  const [activeCompliment, setActiveCompliment] = useState(null);

  const handlePop = (comp) => {
    if (poppedIds.includes(comp.id)) {
      setActiveCompliment(comp);
      sounds.playClick();
      return;
    }

    sounds.playPop();
    triggerConfetti({ count: 35, originY: 0.6 });
    setPoppedIds((prev) => [...prev, comp.id]);
    setActiveCompliment(comp);

    if (poppedIds.length + 1 === COMPLIMENTS.length) {
      setTimeout(() => {
        sounds.playFanfare();
        triggerConfetti({ count: 90, originY: 0.5 });
      }, 500);
    }
  };

  const isAllPopped = poppedIds.length === COMPLIMENTS.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto px-3.5 sm:px-4 py-4 sm:py-6 text-center select-none"
    >
      <div className="mb-3 sm:mb-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-rose-500 bg-rose-100/70 px-2.5 sm:px-3 py-1 rounded-full neu-pill">
          Mini-Game 4 of 4
        </span>
        <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-rose-950 mt-1.5 mb-1">
          Compliment Bubbles 🫧
        </h2>
        <p className="text-xs sm:text-sm text-rose-800/70">
          Pop all <span className="font-bold text-rose-600">6 floating bubbles</span> to reveal why you are cherished!
        </p>
      </div>

      {/* Progress pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full neu-pill text-[11px] sm:text-xs font-semibold text-rose-700 mb-4 sm:mb-6 shadow-sm">
        <span>Bubbles Popped:</span>
        <span className="text-rose-600 font-bold">{poppedIds.length} / {COMPLIMENTS.length}</span>
      </div>

      {/* Floating Bubbles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
        {COMPLIMENTS.map((comp) => {
          const isPopped = poppedIds.includes(comp.id);
          return (
            <motion.div
              key={comp.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handlePop(comp)}
              className={`cursor-pointer rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 transition-all flex flex-col items-center justify-center min-h-[95px] sm:min-h-[120px] relative ${
                isPopped
                  ? 'neu-pressed border border-rose-200 text-rose-900 shadow-inner'
                  : 'glass-panel text-rose-800 hover:shadow-lg animate-float-gentle'
              }`}
            >
              {!isPopped ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="text-2xl sm:text-3xl mb-1 filter drop-shadow"
                  >
                    🫧
                  </motion.div>
                  <span className="text-[11px] sm:text-xs font-bold tracking-wide text-rose-600">
                    Tap to Pop!
                  </span>
                </>
              ) : (
                <>
                  <div className="text-lg sm:text-xl mb-0.5 sm:mb-1">✨</div>
                  <div className="text-[11px] sm:text-xs font-bold text-rose-950 text-center leading-tight">
                    {comp.title}
                  </div>
                  <CheckCircleIcon className="w-3.5 h-3.5 text-rose-500 mt-1" />
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Selected Affirmation Card */}
      <AnimatePresence>
        {activeCompliment && (
          <motion.div
            key={activeCompliment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="neu-flat rounded-xl sm:rounded-2xl p-3.5 sm:p-5 mb-4 sm:mb-6 border border-white text-left max-w-lg mx-auto shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-rose-600 text-xs sm:text-sm font-bold mb-1">
              <SparklesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
              <span>{activeCompliment.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-900/80 leading-relaxed font-light">
              "{activeCompliment.desc}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grand Finale Unlock CTA */}
      {isAllPopped && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 sm:mt-4"
        >
          <motion.button
            onClick={() => {
              sounds.playSparkle();
              onNext();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neu-button w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-rose-950 font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2.5 sm:gap-3 border border-white shadow-lg"
          >
            <span className="text-lg sm:text-xl">🎁</span>
            <span>Unlock Grand Finale: Scratch Card Letter</span>
            <ArrowRightIcon className="w-4 h-4 text-rose-500" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

