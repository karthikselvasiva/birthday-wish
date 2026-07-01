import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONFIG } from '../config';

export default function Celebration() {
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [showSmoke, setShowSmoke] = useState(false);
  const [wishesCount, setWishesCount] = useState(0);

  // Trigger continuous light confetti on mount for festive vibe
  useEffect(() => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6078', '#f43f5e', '#d4a32f']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6078', '#f43f5e', '#d4a32f']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);

  const triggerFireworks = () => {
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 28, spread: 360, ticks: 50, zIndex: 100 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (timeLeft / duration);
      // Burst from left and right
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.15, 0.35), y: Math.random() - 0.2 } 
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.65, 0.85), y: Math.random() - 0.2 } 
      });
    }, 250);
  };

  const handleBlowCandle = () => {
    if (!isCandleLit) return;
    
    setIsCandleLit(false);
    setShowSmoke(true);
    
    // Vibrate device if supported
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    // Trigger explosive celebration
    triggerFireworks();
    
    // Clear smoke after 2s
    setTimeout(() => {
      setShowSmoke(false);
    }, 2000);
  };

  const handleForeverClick = () => {
    setWishesCount(prev => prev + 1);
    
    // Splash of pink/rose hearts confetti
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ff6078', '#f43f5e', '#be123c', '#ffdce1']
    });
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-radial from-[#1f0d2c] via-[#090510] to-[#040207] relative overflow-hidden text-center min-h-screen flex flex-col items-center justify-center">
      
      {/* Background Star Flashes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-md w-full space-y-10 z-10">
        
        {/* Header Ribbon */}
        <div className="flex justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold-400/20 bg-gold-400/5 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs uppercase tracking-[0.2em] text-gold-200 font-bold select-none">
              Make A Wish
            </span>
          </motion.div>
        </div>

        {/* 1. Interactive Birthday Cake */}
        <div className="flex flex-col items-center select-none">
          <div className="relative w-64 h-64 flex items-center justify-center">
            
            {/* The Cake Illustration */}
            <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              {/* Stand Plate */}
              <ellipse cx="100" cy="160" rx="70" ry="10" fill="#e2e8f0" opacity="0.9" />
              <rect x="90" y="160" width="20" height="20" fill="#cbd5e1" />
              <ellipse cx="100" cy="180" rx="40" ry="8" fill="#94a3b8" />

              {/* Cake Bottom Layer */}
              <rect x="50" y="110" width="100" height="40" rx="4" fill="#a21caf" />
              <ellipse cx="100" cy="110" rx="50" ry="8" fill="#c084fc" />
              <ellipse cx="100" cy="150" rx="50" ry="8" fill="#86198f" />

              {/* Cake Top Layer */}
              <rect x="60" y="80" width="80" height="30" rx="4" fill="#f43f5e" />
              <ellipse cx="100" cy="80" rx="40" ry="6" fill="#fbcfe8" />
              <ellipse cx="100" cy="110" rx="40" ry="6" fill="#be123c" />

              {/* Frosting Drips */}
              <path d="M 60 82 Q 70 95 80 82 Q 90 95 100 82 Q 110 95 120 82 Q 130 95 140 82" fill="none" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" />

              {/* Candle Body */}
              <rect x="97" y="50" width="6" height="30" rx="1" fill="#f59e0b" />
              <path d="M 97 50 L 103 50 L 103 80 L 97 80 Z" fill="url(#stripeGrad)" />
              
              <defs>
                <linearGradient id="stripeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>

              {/* Wick */}
              <line x1="100" y1="50" x2="100" y2="45" stroke="#475569" strokeWidth="1.5" />
            </svg>

            {/* Glowing Interactive Candle Flame */}
            <AnimatePresence>
              {isCandleLit && (
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: [1, 1.1, 0.95, 1], y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={handleBlowCandle}
                  className="absolute cursor-pointer w-7 h-10 flex items-center justify-center"
                  style={{ top: '24%', left: '44.5%' }}
                >
                  {/* Outer Flame Glow */}
                  <span className="absolute w-8 h-8 rounded-full bg-orange-500/40 blur-md animate-ping" style={{ animationDuration: '1.2s' }} />
                  
                  {/* Outer Yellow Flame shape */}
                  <div className="w-5 h-8 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full" 
                       style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                       
                  {/* Inner Flame shape */}
                  <div className="absolute w-2.5 h-4.5 bg-yellow-100 rounded-full" 
                       style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', bottom: '15%' }} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Smoke puff after blown out */}
            <AnimatePresence>
              {showSmoke && (
                <motion.div
                  initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -45, scale: 2.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute bg-slate-400/30 rounded-full blur-sm w-4 h-4"
                  style={{ top: '27%', left: '48.5%' }}
                />
              )}
            </AnimatePresence>

            {/* Click to blow suggestion tooltip */}
            {isCandleLit && (
              <div 
                onClick={handleBlowCandle}
                className="absolute top-[12%] bg-rose-600 border border-rose-400 text-white text-[10px] px-2.5 py-1 rounded-full shadow-lg cursor-pointer animate-bounce flex items-center gap-1 glass-panel"
              >
                <span>Tap Flame to Blow!</span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Birthday Greetings */}
        <div className="space-y-4">
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Happy Birthday <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-romantic-300 via-romantic-500 to-gold-300 text-glow flex items-center justify-center gap-2 flex-wrap">
              <span>My Soul, {CONFIG.girlfriendName}</span>
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-heartbeat" />
            </span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-300 max-w-xs mx-auto font-light leading-relaxed">
            "My wish is to create thousands of beautiful memories with you."
          </p>
        </div>

        {/* 3. Interactive Forever Button */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            onClick={handleForeverClick}
            className="group relative cursor-pointer px-10 py-4.5 rounded-full font-bold tracking-widest text-sm text-white overflow-hidden shadow-lg border border-romantic-400 bg-gradient-to-r from-romantic-600 via-rose-500 to-romantic-600 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5"
          >
            {/* Sparkles backglow */}
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span>FOREVER</span>
            <Heart className="w-4.5 h-4.5 text-white animate-heartbeat fill-white" />
          </button>
          
          {wishesCount > 0 && (
            <motion.span
              key={wishesCount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              className="text-[10px] text-romantic-300 tracking-wider font-semibold select-none flex items-center gap-1"
            >
              Sent {wishesCount} Forever Heart{wishesCount > 1 ? 's' : ''} to Hema! <Gift className="w-3 h-3" />
            </motion.span>
          )}
        </div>

      </div>
    </section>
  );
}