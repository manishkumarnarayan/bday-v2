import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../../utils/soundEffects';
import { triggerConfetti } from '../../utils/confetti';
import { SparklesIcon, HeartIcon, ArrowRightIcon, RotateCcwIcon, AwardIcon } from '../common/Icons';

const ITEMS = [
  { id: 'star', emoji: '⭐', label: 'Endless Luck', points: 1 },
  { id: 'cake', emoji: '🎂', label: 'Sweet Moments', points: 1 },
  { id: 'heart', emoji: '💖', label: 'Boundless Love', points: 1 },
  { id: 'gift', emoji: '🎁', label: 'Surprise Joy', points: 1 },
  { id: 'flower', emoji: '🌸', label: 'Peace & Bloom', points: 1 },
  { id: 'sparkle', emoji: '✨', label: 'Radiant Glow', points: 1 },
];

export default function GameStarCatch({ onNext }) {
  const [basketX, setBasketX] = useState(50); // percentage 0-100
  const [fallingItems, setFallingItems] = useState([]);
  const [score, setScore] = useState(0);
  const [caughtWishes, setCaughtWishes] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const TARGET = 7;

  // Start game automatically
  useEffect(() => {
    setIsPlaying(true);
  }, []);

  // Handle pointer / touch drag over the game canvas
  const handlePointerMove = (e) => {
    if (!containerRef.current || isCompleted) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(10, Math.min(90, ((clientX - rect.left) / rect.width) * 100));
    setBasketX(x);
  };

  const moveBasketRelative = (delta) => {
    setBasketX((prev) => Math.max(12, Math.min(88, prev + delta)));
    sounds.playClick();
  };

  // Spawn falling items
  useEffect(() => {
    if (!isPlaying || isCompleted) return;

    const interval = setInterval(() => {
      const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      const newItem = {
        id: Math.random(),
        type: randomItem,
        x: Math.random() * 76 + 12,
        y: 0,
        speed: 1.1 + Math.random() * 0.7,
      };

      setFallingItems((prev) => [...prev.slice(-10), newItem]);
    }, 1150);

    return () => clearInterval(interval);
  }, [isPlaying, isCompleted]);

  // Falling animation and collision loop
  useEffect(() => {
    if (!isPlaying || isCompleted) return;

    const anim = setInterval(() => {
      setFallingItems((prev) => {
        const nextItems = [];
        for (let item of prev) {
          const nextY = item.y + item.speed * 2.4;

          // Check collision with basket (basket is around y = 75-88%)
          if (nextY >= 72 && nextY <= 86) {
            const distance = Math.abs(item.x - basketX);
            if (distance < 14) {
              // CAUGHT!
              sounds.playPop();
              setScore((s) => {
                const newScore = s + 1;
                if (newScore >= TARGET && !isCompleted) {
                  setIsCompleted(true);
                  sounds.playFanfare();
                  triggerConfetti({ count: 90, originY: 0.5 });
                }
                return newScore;
              });

              setCaughtWishes((wishes) => [item.type.label, ...wishes.slice(0, 3)]);
              continue; // don't add to nextItems
            }
          }

          if (nextY < 96) {
            nextItems.push({ ...item, y: nextY });
          }
        }
        return nextItems;
      });
    }, 35);

    return () => clearInterval(anim);
  }, [isPlaying, isCompleted, basketX]);

  const handleReset = () => {
    setScore(0);
    setCaughtWishes([]);
    setIsCompleted(false);
    setFallingItems([]);
    sounds.playClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 text-center select-none"
    >
      {/* Title and game instructions */}
      <div className="mb-3 sm:mb-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-rose-500 bg-rose-100/60 px-2.5 sm:px-3 py-1 rounded-full neu-pill">
          Mini-Game 1 of 4
        </span>
        <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-rose-950 mt-1.5 mb-1">
          Sanjana's Star Catcher ✨
        </h2>
        <p className="text-xs sm:text-sm text-rose-800/70">
          Move your glowing jar to catch <span className="font-bold text-rose-600">{TARGET}</span> birthday wishes!
        </p>
      </div>

      {/* Score & live wish preview */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-2.5 px-2">
        <div className="text-[11px] sm:text-xs font-semibold text-rose-700 bg-white/80 px-3 py-1.5 rounded-full neu-pill flex items-center gap-1.5 shadow-sm">
          <span>Collected:</span>
          <span className="text-rose-600 font-bold text-xs sm:text-sm">
            {score} / {TARGET}
          </span>
        </div>

        {caughtWishes.length > 0 && (
          <motion.div
            key={caughtWishes[0]}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] sm:text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 shadow-sm"
          >
            + {caughtWishes[0]}!
          </motion.div>
        )}
      </div>

      {/* Main Interactive Game Box */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onTouchMove={handlePointerMove}
        onTouchStart={handlePointerMove}
        className="relative w-full h-[300px] xs:h-[350px] sm:h-[400px] rounded-2xl sm:rounded-3xl neu-flat overflow-hidden border border-white cursor-ew-resize touch-none shadow-inner select-none"
        style={{
          background: 'radial-gradient(ellipse at top, #fff5f5 0%, #fdf6ee 50%, #f7ece1 100%)',
        }}
      >
        {/* Background stars */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                top: `${(i * 19) % 95}%`,
                left: `${(i * 27) % 95}%`,
              }}
            />
          ))}
        </div>

        {/* Falling Objects */}
        {fallingItems.map((item) => (
          <div
            key={item.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none filter drop-shadow-sm transition-all"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            <span className="text-xl sm:text-3xl animate-bounce">{item.type.emoji}</span>
          </div>
        ))}

        {/* The Catcher Jar / Basket */}
        <div
          className="absolute bottom-4 sm:bottom-6 -translate-x-1/2 pointer-events-none transition-transform duration-75"
          style={{ left: `${basketX}%` }}
        >
          <div className="glass-panel px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border-2 border-rose-300/80 shadow-lg flex flex-col items-center min-w-[70px] sm:min-w-[80px]">
            <span className="text-xl sm:text-2xl">🍯</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-rose-700 tracking-wide">
              {score >= TARGET ? 'Full! ✨' : 'Jar'}
            </span>
          </div>
        </div>

        {/* Completion Modal Overlay */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 glass-modal flex flex-col items-center justify-center p-4 sm:p-6 z-30"
            >
              <div className="text-3xl sm:text-4xl mb-2">🎉</div>
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-rose-950 mb-1">
                Wishes Collected!
              </h3>
              <p className="text-xs sm:text-sm text-rose-800/80 max-w-xs mb-4 sm:mb-5 leading-relaxed">
                You've gathered a full jar of joy, love, and good fortune for your new year ahead, Sanjana!
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="p-3 rounded-full neu-button text-rose-700 hover:text-rose-900"
                  title="Play Again"
                >
                  <RotateCcwIcon className="w-4 h-4" />
                </button>

                <motion.button
                  onClick={() => {
                    sounds.playSparkle();
                    onNext();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="neu-button px-5 sm:px-6 py-3 rounded-full text-rose-950 font-bold text-xs sm:text-sm flex items-center gap-2 border border-white shadow-md"
                >
                  <span>Next: Birthday Quiz</span>
                  <ArrowRightIcon className="w-4 h-4 text-rose-500" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Touch Control Buttons for Easy One-Handed Play */}
      <div className="flex items-center justify-between gap-3 mt-3 px-1">
        <button
          onClick={() => moveBasketRelative(-16)}
          className="flex-1 py-2.5 rounded-xl neu-button text-xs font-bold text-rose-800 flex items-center justify-center gap-1 active:scale-95 transition-transform"
        >
          <span>◀</span>
          <span>Slide Left</span>
        </button>

        <button
          onClick={() => moveBasketRelative(16)}
          className="flex-1 py-2.5 rounded-xl neu-button text-xs font-bold text-rose-800 flex items-center justify-center gap-1 active:scale-95 transition-transform"
        >
          <span>Slide Right</span>
          <span>▶</span>
        </button>
      </div>

      <p className="text-[10px] sm:text-[11px] text-rose-600/60 mt-2">
        💡 Drag with finger or tap buttons to move Sanjana's Wish Jar
      </p>
    </motion.div>
  );
}

