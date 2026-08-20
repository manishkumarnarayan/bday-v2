import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../../utils/soundEffects";
import { triggerConfetti } from "../../utils/confetti";
import {
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  AwardIcon,
} from "../common/Icons";

const QUESTIONS = [
  {
    id: 1,
    question: "What historic cosmic miracle happened on August 29, 2008?",
    options: [
      {
        text: "A bright star landed on Earth (Named Sanjana) ✨",
        correct: true,
        feedback: "Exactly! The universe received its brightest light!",
      },
      {
        text: "Earth received extra sunshine",
        correct: true,
        feedback: "So true! The world got 1000x brighter that day.",
      },
      {
        text: "All chocolate became 50% sweeter",
        correct: true,
        feedback: "Science confirmed it was due to her arrival!",
      },
    ],
  },
  {
    id: 2,
    question: "What is Sanjana's undeniable Virgo superpower?",
    options: [
      {
        text: "Being effortlessly kind & having the warmest smile 🌸",
        correct: true,
        feedback: "Heart of pure gold! Everyone loves her smile.",
      },
      {
        text: "Super-radar for good vibes & deep thoughtful conversations 💫",
        correct: true,
        feedback: "Her energy is always calming and genuine.",
      },
      {
        text: "Radiating quiet elegance & wisdom beyond years 👑",
        correct: true,
        feedback: "An absolute queen in every way!",
      },
    ],
  },
  {
    id: 3,
    question: "If Sanjana had a personal soundtrack, what genre would it be?",
    options: [
      {
        text: "Cozy Lo-Fi beats on a rainy afternoon ☕",
        correct: true,
        feedback: "Pure cozy, comforting, warm aesthetic!",
      },
      {
        text: "Golden Hour acoustic guitar melodies 🎸",
        correct: true,
        feedback: "Gentle and uplifting always.",
      },
      {
        text: "Upbeat celebration anthems full of laughter 🎶",
        correct: true,
        feedback: "Joyful and full of life!",
      },
    ],
  },
  {
    id: 4,
    question: "What is the official birthday mandate for Sanjana today?",
    options: [
      {
        text: "Receive 100% infinite happiness, zero stress & endless cake! 🎂",
        correct: true,
        feedback: "Law of the universe approved!",
      },
      {
        text: "Be treated like royalty for the entire year 👑",
        correct: true,
        feedback: "Non-negotiable! She deserves all the pampering!",
      },
      {
        text: "All of the above multiplied by infinity ✨",
        correct: true,
        feedback: "The only right answer! Happy Birthday Sanjana!",
      },
    ],
  },
];

export default function GameTrivia({ onNext }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answeredFeedback, setAnsweredFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUESTIONS[currentIdx];

  const handleSelect = (option, idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setAnsweredFeedback(option.feedback);

    sounds.playSparkle();
    triggerConfetti({ count: 50, originY: 0.6 });
    setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIdx + 1 < QUESTIONS.length) {
        setCurrentIdx((i) => i + 1);
        setSelectedOption(null);
        setAnsweredFeedback(null);
      } else {
        setIsCompleted(true);
        sounds.playFanfare();
        triggerConfetti({ count: 100, originY: 0.5 });
      }
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-xl mx-auto px-3.5 sm:px-4 py-4 sm:py-6 text-center select-none"
    >
      <div className="mb-3 sm:mb-4">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-amber-600 bg-amber-100/70 px-2.5 sm:px-3 py-1 rounded-full neu-pill">
          Mini-Game 2 of 4
        </span>
        <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-rose-950 mt-1.5 mb-1">
          The Sanjana Chronicle Quiz 💡
        </h2>
        <p className="text-xs sm:text-sm text-rose-800/70">
          Question {currentIdx + 1} of {QUESTIONS.length}
        </p>
      </div>

      {!isCompleted ? (
        <div className="neu-flat rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white relative overflow-hidden shadow-sm">
          {/* Question text */}
          <h3 className="font-serif-title text-base sm:text-xl font-semibold text-rose-900 mb-4 sm:mb-6 leading-snug">
            "{currentQ.question}"
          </h3>

          {/* Options */}
          <div className="space-y-2.5 sm:space-y-3 mb-3 sm:mb-4">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(opt, idx)}
                  whileHover={selectedOption === null ? { scale: 1.01 } : {}}
                  whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                  className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? "neu-pressed text-rose-900 border-2 border-rose-300 font-semibold shadow-inner"
                      : selectedOption !== null
                        ? "opacity-50 neu-flat text-zinc-600"
                        : "neu-button text-rose-900 hover:text-rose-950 border border-white"
                  }`}
                >
                  <span className="flex-1 pr-2 leading-relaxed">
                    {opt.text}
                  </span>
                  {isSelected && (
                    <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 shrink-0 animate-bounce" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Real-time uplifting feedback popup */}
          <AnimatePresence>
            {answeredFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-pill px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-rose-700 inline-flex items-center gap-1.5 border border-rose-200"
              >
                <SparklesIcon className="w-3.5 h-3.5 text-amber-500" />
                <span>{answeredFeedback}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Quiz Complete Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="neu-flat rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white shadow-lg text-center"
        >
          <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">👑</div>
          <h3 className="font-serif-title text-xl sm:text-3xl font-bold text-rose-950 mb-1.5 sm:mb-2">
            100% Certified Queen!
          </h3>
          <p className="text-xs sm:text-sm text-rose-800/80 max-w-sm mx-auto mb-5 sm:mb-6 leading-relaxed">
            Every answer proved that August 29, 2008 truly brought the most
            wonderful soul into our lives.
          </p>

          <motion.button
            onClick={() => {
              sounds.playSparkle();
              onNext();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neu-button w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full text-rose-950 font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 border border-white shadow-md"
          >
            <span>Next: Cake Decorator & Candle Blow</span>
            <ArrowRightIcon className="w-4 h-4 text-rose-500" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
