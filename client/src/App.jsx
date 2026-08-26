import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FloatingElements from "./components/common/FloatingElements";
import AudioPlayer from "./components/common/AudioPlayer";
import HeaderProgress from "./components/common/HeaderProgress";

import DarkIntro from "./components/pages/DarkIntro";
import WarmWelcome from "./components/pages/WarmWelcome";
import GameStarCatch from "./components/games/GameStarCatch";
import GameTrivia from "./components/games/GameTrivia";
import GameCakeDecorator from "./components/games/GameCakeDecorator";
import GameBubblePop from "./components/games/GameBubblePop";
import ScratchCardFinale from "./components/pages/ScratchCardFinale";

export default function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = dark cosmic intro
  const isDark = currentStep === 0;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleSelectStep = (step) => {
    setCurrentStep(step);
  };

  const handleRestart = () => {
    setCurrentStep(0);
  };

  return (
    <div
      className={`min-h-screen w-full relative transition-colors duration-1000 flex flex-col justify-between ${
        isDark ? "bg-[#0d0e15] text-rose-50" : "bg-[#fcf9f5] text-rose-950"
      }`}
    >
      {/* Background Floating Elements & Ambient Glows */}
      <FloatingElements isDark={isDark} />

      {/* Floating Audio Controller */}
      <AudioPlayer isDark={isDark} />

      {/* Top Stage Header Navigation */}
      <HeaderProgress
        currentStep={currentStep}
        onSelectStep={handleSelectStep}
        isDark={isDark}
      />

      {/* Main Dynamic Page Switcher */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center py-2 sm:py-6 px-1 sm:px-2 w-full max-w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <DarkIntro onIlluminate={handleNext} />
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <WarmWelcome onNext={handleNext} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="game-stars"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <GameStarCatch onNext={handleNext} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="game-trivia"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <GameTrivia onNext={handleNext} />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="game-cake"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <GameCakeDecorator onNext={handleNext} />
            </motion.div>
          )}

          {/* {currentStep === 5 && (
            <motion.div
              key="game-bubbles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <GameBubblePop onNext={handleNext} />
            </motion.div>
          )} */}

          {currentStep === 5 && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <ScratchCardFinale onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Cute Minimal Footer */}
      {!isDark && (
        <footer className="relative z-10 text-center py-4 text-xs text-rose-800/40 select-none">
          Crafted with 💖 for Sanjana's Birthday · 29th August 2008
        </footer>
      )}
    </div>
  );
}
