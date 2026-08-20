import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sounds } from "../../utils/soundEffects";
import { triggerConfetti } from "../../utils/confetti";
import {
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon,
  SunIcon,
  AwardIcon,
} from "../common/Icons";

export default function WarmWelcome({ onNext }) {
  const [stats, setStats] = useState({
    days: 0,
    hours: 0,
    smiles: "Infinite",
  });

  useEffect(() => {
    // Birthdate: August 29, 2008
    const birthDate = new Date("2008-08-29T00:00:00");
    const now = new Date();
    const diffTime = Math.abs(now - birthDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    setStats({
      days: diffDays,
      hours: diffHours,
      smiles: "∞",
    });
  }, []);

  const handleStart = () => {
    sounds.playSparkle();
    triggerConfetti({ count: 70, originY: 0.7 });
    onNext();
  };

  const facts = [
    { label: "Date of Origin", value: "29th August 2008", icon: "📅" },
    { label: "Zodiac Charm", value: "Virgo (Gentle & Wise)", icon: "♍" },
    { label: "Lucky Birthstone", value: "Peridot & Jade", icon: "💎" },
    { label: "Core Vibe", value: "100% Pure Sunshine", icon: "🌻" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto px-3.5 sm:px-4 py-4 sm:py-8 text-center"
    >
      {/* Cute top pill */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full neu-pill text-[11px] sm:text-xs font-semibold text-rose-600 mb-4 sm:mb-6"
      >
        <SparklesIcon
          className="w-3.5 h-3.5 text-amber-500 animate-spin"
          style={{ animationDuration: "6s" }}
        />
        <span>Today is all about you!</span>
        <HeartIcon className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
      </motion.div>

      {/* Main warm title */}
      <h1 className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-medium text-rose-950 tracking-tight mb-2 sm:mb-4 px-1">
        Happy Birthday,{" "}
        <span className="font-handwriting text-4xl sm:text-6xl md:text-7xl text-rose-500 block sm:inline font-bold">
          Sanjana
        </span>{" "}
        ✨
      </h1>

      <p className="font-sans text-xs sm:text-base md:text-lg text-rose-800/70 max-w-lg mx-auto mb-6 sm:mb-10 leading-relaxed font-light px-2">
        Welcome to your personal birthday universe. We crafted four little
        interactive mini-games and surprises just for you before unlocking your
        final birthday gift.
      </p>

      {/* Neumorphic Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-10 text-left">
        {facts.map((fact, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="neu-flat rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all hover:scale-[1.02] group"
          >
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
              {fact.icon}
            </div>
            <div className="text-[9px] sm:text-[11px] uppercase tracking-wider text-rose-400 font-semibold mb-0.5 sm:mb-1">
              {fact.label}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-rose-950 leading-tight">
              {fact.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Life Metrics Counter Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-10 border border-white/80 shadow-md relative overflow-hidden"
      >
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="text-[10px] sm:text-xs uppercase tracking-widest text-rose-500 font-bold mb-3 flex items-center justify-center gap-1.5 sm:gap-2">
          <SunIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
          <span>Lifetime of Radiance</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-6 items-center">
          <div>
            <div className="font-serif-title text-xl sm:text-3xl md:text-4xl font-bold text-rose-900 leading-tight">
              {stats.days.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-xs text-rose-700/70 font-medium mt-0.5">
              Days of Joy
            </div>
          </div>
          <div className="border-x border-rose-200/70 px-1 sm:px-2">
            <div className="font-serif-title text-xl sm:text-3xl md:text-4xl font-bold text-rose-900 leading-tight">
              {stats.hours.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-xs text-rose-700/70 font-medium mt-0.5">
              Hours Blessed
            </div>
          </div>
          <div>
            <div className="font-serif-title text-xl sm:text-3xl md:text-4xl font-bold text-rose-600 leading-tight">
              {stats.smiles}
            </div>
            <div className="text-[10px] sm:text-xs text-rose-700/70 font-medium mt-0.5">
              Memories Given
            </div>
          </div>
        </div>
      </motion.div>

      {/* Continue CTA */}
      <div className="flex flex-col items-center gap-2.5 sm:gap-3 px-2">
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="neu-button w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-rose-900 font-semibold text-xs sm:text-base flex items-center justify-center gap-2.5 sm:gap-3 shadow-lg border border-white group"
        >
          <span>Begin Game 1: Star Catcher</span>
          <ArrowRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
        </motion.button>
        <span className="text-[11px] sm:text-xs text-rose-500/70 font-medium">
          Get ready to catch some birthday magic!
        </span>
      </div>
    </motion.div>
  );
}
