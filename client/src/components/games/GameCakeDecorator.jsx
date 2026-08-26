import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../../utils/soundEffects";
import { triggerGrandCelebration } from "../../utils/confetti";
import {
  FlameIcon,
  SparklesIcon,
  ArrowRightIcon,
  CakeIcon,
  CheckCircleIcon,
} from "../common/Icons";

const FLAVORS = [
  {
    id: "strawberry",
    name: "Strawberry Rose",
    color: "from-pink-300 to-rose-400",
    accent: "#fb7185",
  },
  {
    id: "vanilla",
    name: "Vanilla Velvet",
    color: "from-amber-100 to-amber-200",
    accent: "#fde68a",
  },
  {
    id: "chocolate",
    name: "Choco Ganache",
    color: "from-stone-600 to-amber-950",
    accent: "#78350f",
  },
  {
    id: "matcha",
    name: "Matcha Cream",
    color: "from-emerald-200 to-teal-300",
    accent: "#86efac",
  },
];

const TOPPINGS = [
  { id: "strawberries", emoji: "🍓", label: "Strawberries" },
  { id: "macarons", emoji: "🍥", label: "Macarons" },
  { id: "cherries", emoji: "🍒", label: "Cherries" },
  { id: "stars", emoji: "⭐", label: "Gold Stars" },
  { id: "hearts", emoji: "💖", label: "Sweet Hearts" },
];

export default function GameCakeDecorator({ onNext }) {
  const [flavor, setFlavor] = useState(FLAVORS[0]);
  const [selectedToppings, setSelectedToppings] = useState([
    "strawberries",
    "stars",
  ]);
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const toggleTopping = (id) => {
    sounds.playPop();
    if (selectedToppings.includes(id)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== id));
    } else {
      setSelectedToppings([...selectedToppings, id]);
    }
  };

  const handleBlowCandles = () => {
    if (!candlesLit || isBlowing) return;
    setIsBlowing(true);
    sounds.playBlowCandle();

    setTimeout(() => {
      setCandlesLit(false);
      setWishMade(true);
      setIsBlowing(false);
      sounds.playFanfare();
      triggerGrandCelebration();
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto px-3.5 sm:px-4 py-4 sm:py-6 text-center select-none"
    >
      <div className="mb-3 sm:mb-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-rose-500 bg-rose-100/70 px-2.5 sm:px-3 py-1 rounded-full neu-pill">
          Mini-Game 3 of 4
        </span>
        <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-rose-950 mt-1.5 mb-1">
          Sanjana's Dream Cake 🎂
        </h2>
        <p className="text-xs sm:text-sm text-rose-800/70">
          Customize your cake, make a heartfelt wish, and blow out the candles!
        </p>
      </div>

      {/* Cake Stage */}
      <div className="neu-flat rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-4 sm:mb-6 border border-white relative overflow-hidden shadow-sm">
        {/* The 3-Tier Layered Interactive Cake */}
        <div className="relative h-56 sm:h-72 flex flex-col items-center justify-end pb-3 sm:pb-4">
          {/* Glowing Candles on Top */}
          <div className="flex gap-4 sm:gap-6 mb-2 z-20">
            {[1, 2, 3].map((candle) => (
              <div
                key={candle}
                onClick={handleBlowCandles}
                className="flex flex-col items-center cursor-pointer group p-1 -m-1"
                title="Tap to blow candle"
              >
                {/* Flame or Smoke */}
                <div className="h-6 flex items-center justify-center">
                  <AnimatePresence>
                    {candlesLit ? (
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 0.95, 1.1, 1],
                          y: [-1, 2, -2, 1],
                          rotate: [-3, 3, -2, 2],
                        }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="relative"
                      >
                        <div className="w-3.5 h-5 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full blur-[0.5px] shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
                        <div className="absolute inset-0 bg-orange-400/40 rounded-full blur-md animate-pulse" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0.7, 0], y: -20, x: [0, 5, -5] }}
                        transition={{ duration: 1.5 }}
                        className="text-xs text-zinc-400 font-bold"
                      >
                        💨
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Stick */}
                <div className="w-2.5 sm:w-3 h-7 sm:h-10 bg-gradient-to-b from-amber-100 via-rose-200 to-pink-300 rounded-t-sm shadow-sm border border-white/60" />
              </div>
            ))}
          </div>

          {/* Top Layer of Cake */}
          <motion.div
            className={`w-32 xs:w-36 sm:w-44 h-10 sm:h-12 rounded-t-2xl bg-gradient-to-r ${flavor.color} shadow-md border-t border-white/80 relative flex items-center justify-center`}
            animate={{ scale: isBlowing ? [1, 0.98, 1] : 1 }}
          >
            {/* Dripping frosting effect */}
            <div className="absolute -bottom-2 inset-x-0 flex justify-around opacity-80 pointer-events-none">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/70 rounded-full" />
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white/70 rounded-full -mt-1" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/70 rounded-full" />
            </div>

            {/* Toppings Placed on Top */}
            <div className="flex gap-1.5 sm:gap-2">
              {selectedToppings.map((tid) => {
                const item = TOPPINGS.find((t) => t.id === tid);
                return (
                  <span
                    key={tid}
                    className="text-xs sm:text-sm filter drop-shadow-sm animate-bounce"
                  >
                    {item?.emoji}
                  </span>
                );
              })}
            </div>
          </motion.div>

          {/* Middle Layer */}
          <div
            className={`w-44 xs:w-50 sm:w-56 h-12 sm:h-14 bg-gradient-to-r ${flavor.color} shadow-lg border-t border-white/60 relative flex items-center justify-center`}
          >
            <span className="font-handwriting text-rose-950 font-bold text-base sm:text-xl drop-shadow-sm tracking-wider">
              Sanjana ✨
            </span>
          </div>

          {/* Base Layer */}
          <div
            className={`w-56 xs:w-64 sm:w-72 h-14 sm:h-16 rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-r ${flavor.color} shadow-xl border-t border-white/60 relative flex items-center justify-center`}
          >
            <span className="text-[10px] sm:text-[11px] font-bold text-rose-900/80 tracking-widest uppercase">
              29 · 08 · 2008
            </span>
          </div>

          {/* Cake Stand (Neumorphic Plate) */}
          <div className="w-64 xs:w-72 sm:w-80 h-2.5 sm:h-3 bg-gradient-to-r from-zinc-200 via-white to-zinc-200 rounded-full shadow-md mt-1 border border-zinc-100" />
        </div>

        {/* Blow Action / Wish Message */}
        <div className="mt-3 sm:mt-4">
          {!wishMade ? (
            <motion.button
              onClick={handleBlowCandles}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="neu-button w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full text-rose-950 font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 border border-white shadow-md group"
            >
              <span className="text-base sm:text-lg">🌬️</span>
              <span>Make a Wish & Blow Candles!</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="text-[11px] sm:text-sm font-semibold text-rose-700 glass-pill px-3.5 py-1.5 sm:px-4 sm:py-2 inline-flex items-center gap-2 border border-rose-200 leading-snug">
                <SparklesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                <span>Your secret birthday wish is sealed in the stars ✨</span>
              </div>
              <div>
                <motion.button
                  onClick={() => {
                    sounds.playSparkle();
                    onNext();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="neu-button w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full text-rose-950 font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 border border-white shadow-md"
                >
                  <span>Next: Letter</span>
                  <ArrowRightIcon className="w-4 h-4 text-rose-500" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Flavor & Toppings Customizer Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
        {/* Flavor Selector */}
        <div className="neu-flat rounded-2xl p-3.5 sm:p-4">
          <div className="text-[11px] sm:text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">
            Cake Flavor:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {FLAVORS.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  sounds.playClick();
                  setFlavor(f);
                }}
                className={`px-2.5 sm:px-3 py-2 rounded-xl text-[11px] sm:text-xs font-medium transition-all text-left flex items-center justify-between ${
                  flavor.id === f.id
                    ? "neu-pressed text-rose-900 font-bold"
                    : "neu-button text-zinc-700"
                }`}
              >
                <span className="truncate">{f.name}</span>
                {flavor.id === f.id && (
                  <span className="text-rose-500 text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Topping Multi-Selector */}
        <div className="neu-flat rounded-2xl p-3.5 sm:p-4">
          <div className="text-[11px] sm:text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">
            Add Toppings:
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {TOPPINGS.map((t) => {
              const active = selectedToppings.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => toggleTopping(t.id)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1.5 ${
                    active
                      ? "neu-pressed text-rose-950 font-semibold scale-105"
                      : "neu-button text-zinc-700"
                  }`}
                >
                  <span>{t.emoji}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
