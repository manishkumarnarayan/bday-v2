import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../../utils/soundEffects";
import { triggerGrandCelebration } from "../../utils/confetti";
import {
  SparklesIcon,
  HeartIcon,
  RotateCcwIcon,
  AwardIcon,
} from "../common/Icons";

export default function ScratchCardFinale({ onRestart }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  // Initialize Canvas Scratch Layer with Retina / Mobile DPR support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Draw holographic golden/rose foil overlay
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f9a8d4"); // rose pink
    gradient.addColorStop(0.3, "#fcd34d"); // gold
    gradient.addColorStop(0.6, "#fda4af"); // rose
    gradient.addColorStop(1, "#c084fc"); // lavender

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative sparkles pattern on foil
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    for (let i = 0; i < 40; i++) {
      const x = (i * 47) % width;
      const y = (i * 31) % height;
      ctx.beginPath();
      ctx.arc(x, y, (i % 3) + 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Centered foil text
    ctx.fillStyle = "#4c0519";
    ctx.font = "bold 14px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "✨ SCRATCH WITH FINGER OR MOUSE ✨",
      width / 2,
      height / 2 - 12,
    );
    ctx.font = "12px Outfit, sans-serif";
    ctx.fillStyle = "#831843";
    ctx.fillText(
      "To unveil Sanjana’s Birthday Letter",
      width / 2,
      height / 2 + 16,
    );
  }, [isRevealed]);

  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();

    sounds.playScratch();

    // Check scratched percentage periodically
    if (Math.random() < 0.3) {
      calculateScratchPercent();
    }
  };

  const calculateScratchPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Sample 100 pixels for fast performance
    const sampleSize = 16;
    let transparentCount = 0;
    const totalSamples = (width / sampleSize) * (height / sampleSize);

    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      for (let x = 0; x < width; x += sampleSize) {
        for (let y = 0; y < height; y += sampleSize) {
          const alphaIndex = (Math.floor(y) * width + Math.floor(x)) * 4 + 3;
          if (imgData.data[alphaIndex] < 128) {
            transparentCount++;
          }
        }
      }
      const pct = Math.round((transparentCount / totalSamples) * 100);
      setScratchPercent(pct);

      if (pct > 35 && !isRevealed) {
        revealFull();
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const revealFull = () => {
    setIsRevealed(true);
    sounds.playFanfare();
    triggerGrandCelebration();
  };

  const handlePointerDown = (e) => {
    isDrawingRef.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    scratch(clientX, clientY);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current) return;
    if (e.touches && e.cancelable) {
      e.preventDefault(); // Prevent mobile screen scrolling while scratching
    }
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    scratch(clientX, clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const copyWish = () => {
    const text = `Happy Birthday Sanjana! 🎂✨ Born August 29, 2008. Wishing you endless happiness, boundless success, and joy today and always! 💖`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    sounds.playSparkle();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8 text-center select-none"
    >
      {/* Title */}
      <div className="mb-4 sm:mb-6">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-rose-500 bg-rose-100/70 px-2.5 sm:px-3 py-1 rounded-full neu-pill">
          The Grand Birthday Reveal 💌
        </span>
        <h2 className="font-serif-title text-2xl sm:text-4xl md:text-5xl font-bold text-rose-950 mt-1.5 mb-1 sm:mb-2">
          A Message from the Heart ✨
        </h2>
        <p className="text-xs sm:text-sm text-rose-800/70">
          Created exclusively for Sanjana · 29th August 2008
        </p>
      </div>

      {/* Main Container Holding Scratch Card / Revealed Letter */}
      <div className="relative neu-flat rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-white shadow-xl overflow-hidden mb-6 sm:mb-8 text-left">
        {/* Background Letter Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Letter Header */}
          <div className="border-b border-rose-100 pb-3 sm:pb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="font-handwriting text-2xl sm:text-4xl font-bold text-rose-600">
                Dearest Sanjana,
              </div>
              <div className="text-[10px] sm:text-xs text-rose-400 font-medium">
                August 29, 2008 🌟 A Special Journey Continues
              </div>
            </div>
            <div className="glass-pill px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-bold text-rose-600 flex items-center gap-1">
              <HeartIcon className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Happy Birthday!</span>
            </div>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-3 sm:space-y-4 font-sans text-xs sm:text-base text-rose-950/85 leading-relaxed font-light">
            <p>
              On <strong>August 29, 2008</strong>, something truly extraordinary
              entered this world. You came with a spirit that brings gentle
              comfort to those around you, an infectious laughter that makes
              gloomy days bright, and a heart that always knows how to care.
            </p>
            <p>
              Growing through every chapter, you have handled life with an
              admirable blend of grace, resilience, and quiet determination.
              Never underestimate how much your kindness matters or how many
              lives are made better simply because you are in them.
            </p>
            <p>
              As you celebrate this birthday, may this year unfold like a dream:
              filled with unforgettable adventures, peace in your mind, laughter
              with the people you cherish, and all the success and love that you
              so unconditionally deserve.
            </p>
            <p className="font-medium text-rose-900">
              Never stop being the bright, radiant, and wonderful Sanjana that
              you are. Keep shining like the brightest star in the night sky! ✨
            </p>
          </div>

          {/* Sweet Signature */}
          <div className="pt-3 sm:pt-4 border-t border-rose-100 flex items-center justify-between">
            <div>
              <div className="text-[10px] sm:text-xs text-rose-400 font-medium uppercase tracking-wider">
                With all the warmest wishes,
              </div>
              <div className="font-handwriting text-xl sm:text-3xl text-rose-700 font-bold mt-0.5 sm:mt-1">
                Your Biggest Well-Wishers 🌸
              </div>
            </div>
            <div className="text-3xl sm:text-4xl">🎂</div>
          </div>

          {/* Cute Polaroids & Memory Keepsakes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 sm:pt-4">
            <div className="neu-flat rounded-xl sm:rounded-2xl p-3 text-center transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="text-xl sm:text-2xl mb-0.5 sm:mb-1">🌻</div>
              <div className="font-handwriting text-sm sm:text-base font-bold text-rose-900">
                Pure Sunshine
              </div>
              <div className="text-[10px] text-rose-600">
                Always radiating warmth
              </div>
            </div>
            <div className="neu-flat rounded-xl sm:rounded-2xl p-3 text-center transform rotate-1 hover:rotate-0 transition-transform">
              <div className="text-xl sm:text-2xl mb-0.5 sm:mb-1">💫</div>
              <div className="font-handwriting text-sm sm:text-base font-bold text-rose-900">
                Endless Dreams
              </div>
              <div className="text-[10px] text-rose-600">
                The best is yet to come
              </div>
            </div>
            <div className="neu-flat rounded-xl sm:rounded-2xl p-3 text-center transform -rotate-1 sm:-rotate-2 hover:rotate-0 transition-transform">
              <div className="text-xl sm:text-2xl mb-0.5 sm:mb-1">🎁</div>
              <div className="font-handwriting text-sm sm:text-base font-bold text-rose-900">
                Forever Loved
              </div>
              <div className="text-[10px] text-rose-600">Today & every day</div>
            </div>
          </div>
        </div>

        {/* Scratch Card Foil Canvas Overlay (Hidden once revealed) */}
        {!isRevealed && (
          <div className="absolute inset-0 z-30 touch-none flex flex-col overscroll-none">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              className="w-full h-full cursor-crosshair rounded-2xl sm:rounded-3xl touch-none"
            />
            {/* Quick Unveil Button Overlay */}
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-40">
              <button
                onClick={revealFull}
                className="glass-pill px-3 py-1.5 text-xs font-bold text-rose-900 hover:bg-white transition-all shadow-md active:scale-95"
              >
                Instant Scratch 🪄
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 px-1">
        <motion.button
          onClick={() => {
            sounds.playSparkle();
            triggerGrandCelebration();
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="neu-button w-full sm:w-auto px-6 py-3.5 rounded-full text-rose-950 font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 border border-white shadow-md"
        >
          <span>🎉 Celebrate with Fireworks!</span>
        </motion.button>

        <motion.button
          onClick={copyWish}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="neu-button w-full sm:w-auto px-6 py-3.5 rounded-full text-rose-900 font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 border border-white shadow-md"
        >
          <span>
            {copied ? "Copied to Clipboard! ✓" : "📋 Copy Birthday Blessing"}
          </span>
        </motion.button>

        <motion.button
          onClick={() => {
            sounds.playClick();
            onRestart();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="neu-button w-full sm:w-auto p-3.5 rounded-full text-zinc-600 hover:text-rose-700 shadow-md flex items-center justify-center gap-2"
          title="Replay Experience"
        >
          <RotateCcwIcon className="w-4 h-4" />
          <span className="sm:hidden text-xs font-medium">
            Replay Experience
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
