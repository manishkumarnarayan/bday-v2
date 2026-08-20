import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../../utils/soundEffects";
import { triggerConfetti } from "../../utils/confetti";
import { SparklesIcon, MoonIcon } from "../common/Icons";

export default function DarkIntro({ onIlluminate }) {
  const [step, setStep] = useState(0);
  const [isIgniting, setIsIgniting] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 2600);
    const timer3 = setTimeout(() => setStep(3), 4400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleIgnite = () => {
    if (isIgniting) return;
    setIsIgniting(true);
    sounds.playSparkle();
    sounds.startBGM();
    triggerConfetti({ count: 60, originY: 0.5 });

    setTimeout(() => {
      onIlluminate();
    }, 1200);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      {/* Background Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-sparkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Soft glowing ambient badge */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark-panel text-amber-200/90 text-xs tracking-widest uppercase border border-amber-300/20 shadow-lg">
                <MoonIcon className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Midnight August 29 · 2008</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinematic mysterious text message */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 px-2"
            >
              <h1 className="font-serif-title text-2xl sm:text-4xl md:text-5xl font-light text-rose-50/90 tracking-tight leading-relaxed">
                In a quiet, starry universe...
              </h1>
              <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-400 font-light max-w-md mx-auto leading-relaxed">
                A little spark of warmth and pure kindness was born to make the
                whole world a softer, brighter place.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personalized reveal & Neumorphic ignition button */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 sm:gap-6 w-full px-2"
            >
              <div className="p-1 rounded-full neu-dark-flat max-w-full">
                <motion.button
                  onClick={handleIgnite}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  disabled={isIgniting}
                  className={`group relative px-5 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden w-full sm:w-auto ${
                    isIgniting
                      ? "bg-amber-100 text-rose-900 shadow-[0_0_50px_rgba(251,191,36,0.8)]"
                      : "neu-dark-btn text-rose-100/90 hover:text-white border border-rose-400/30 shadow-[0_0_30px_rgba(244,63,94,0.2)]"
                  }`}
                >
                  {/* Glowing background burst effect */}
                  {isIgniting && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 40, opacity: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-amber-200 via-rose-100 to-orange-100 rounded-full z-0"
                    />
                  )}

                  <span className="relative z-10 text-lg sm:text-xl">✨</span>
                  <span className="relative z-10 font-medium tracking-wide">
                    {isIgniting
                      ? "Lighting up the world..."
                      : "Illuminate Sanjana's World"}
                  </span>
                  <SparklesIcon className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
                </motion.button>
              </div>

              <p className="text-[11px] sm:text-xs text-zinc-500 font-light tracking-wide animate-pulse">
                Tap to turn on the warmth & begin the journey
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
