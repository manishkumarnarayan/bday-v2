import React, { useState } from "react";
import { motion } from "framer-motion";
import { sounds } from "../../utils/soundEffects";
import { MusicIcon, VolumeXIcon } from "./Icons";

const STAGES = [
  { id: 0, title: "Cosmos", icon: "✨" },
  { id: 1, title: "Welcome", icon: "🌸" },
  { id: 2, title: "Wishes", icon: "⭐" },
  { id: 3, title: "Trivia", icon: "💡" },
  { id: 4, title: "Cake", icon: "🎂" },
  { id: 5, title: "Bubbles", icon: "🫧" },
  { id: 6, title: "Letter", icon: "💌" },
];

export default function HeaderProgress({ currentStep, onSelectStep, isDark }) {
  const [isPlaying, setIsPlaying] = useState(sounds.bgmPlaying);
  const [isMuted, setIsMuted] = useState(sounds.muted);

  if (currentStep === 0) return null; // Don't distract during the dark starry intro

  const toggleMusic = () => {
    const active = sounds.toggleBGM();
    setIsPlaying(active);
    sounds.playClick();
  };

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (muted) setIsPlaying(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto px-2.5 sm:px-4 pt-3 sm:pt-5 pb-1 select-none relative z-40"
    >
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex items-center justify-between shadow-sm gap-1 sm:gap-2">
        {/* Logo / Name */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-1 shrink-0">
          <span className="text-lg sm:text-xl">🎂</span>
          <div className="text-left hidden xs:block">
            <h2 className="text-[11px] sm:text-xs font-bold text-rose-900 tracking-wider uppercase font-sans">
              Sanjana
            </h2>
            <p className="text-[9px] sm:text-[10px] text-rose-500 font-medium leading-none">
              29·08·2008
            </p>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-1">
          {STAGES.slice(1).map((stage) => {
            const isActive = currentStep === stage.id;
            const isPassed = currentStep > stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  if (stage.id <= currentStep + 1) {
                    sounds.playClick();
                    onSelectStep(stage.id);
                  }
                }}
                className={`relative px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 shrink-0 ${
                  isActive
                    ? "neu-pressed text-rose-700 font-semibold shadow-inner scale-105"
                    : isPassed
                      ? "text-rose-400 hover:text-rose-600"
                      : "text-zinc-300 opacity-50 cursor-not-allowed"
                }`}
                title={stage.title}
              >
                <span className="text-xs sm:text-sm">{stage.icon}</span>
                <span className="hidden md:inline text-[11px]">
                  {stage.title}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Integrated Quick Audio Controls */}
        <div className="flex items-center gap-1 shrink-0 pr-1">
          <button
            onClick={toggleMusic}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-full text-xs transition-all flex items-center gap-1 ${
              isPlaying
                ? "neu-pressed text-rose-600"
                : "neu-button text-zinc-500"
            }`}
            title={isPlaying ? "Pause Music" : "Play Music Box"}
          >
            <MusicIcon
              className={`w-3.5 h-3.5 ${isPlaying ? "text-rose-500 animate-pulse" : "text-zinc-400"}`}
            />
            <span className="hidden lg:inline text-[10px] font-medium">
              {isPlaying ? "Music" : "Music"}
            </span>
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full neu-button text-zinc-500 text-xs transition-all"
            title={isMuted ? "Unmute FX" : "Mute FX"}
          >
            {isMuted ? (
              <VolumeXIcon className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <span className="text-[11px] leading-none">🔔</span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
