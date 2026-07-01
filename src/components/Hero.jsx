import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown, Gift } from 'lucide-react';
import { CONFIG } from '../config';

export default function Hero({ onOpenSurprise }) {
  // Generate random positions for floating elements
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // percentage width
    y: Math.random() * 100,
    size: Math.random() * 18 + 10,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  const stars = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 4,
  }));

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-between py-12 px-6 overflow-hidden select-none bg-radial from-[#1e102f] via-[#0e0716] to-[#07040b]">
      
      {/* Starry background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-sparkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              boxShadow: '0 0 8px rgba(255,255,255,0.8)',
            }}
          />
        ))}
      </div>

      {/* Floating Animated Hearts */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-romantic-500/20"
            initial={{ y: '105vh', x: `${heart.x}vw`, scale: 0.5, rotate: 0 }}
            animate={{
              y: '-10vh',
              rotate: [0, 45, -45, 0],
              scale: [0.5, 1, 0.8, 0.5],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'easeInOut',
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Decorative Golden Orbs */}
      <div className="absolute top-1/4 left-1/10 w-48 h-48 rounded-full bg-romantic-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-64 h-64 rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-20 flex items-center gap-2 px-4 py-1.5 rounded-full border border-romantic-500/25 bg-romantic-500/5 backdrop-blur-md"
      >
        <Sparkles className="w-4 h-4 text-gold-300 animate-pulse" />
        <span className="text-xs uppercase tracking-[0.25em] text-romantic-200 font-semibold">
          For My Life Line
        </span>
      </motion.div>

      {/* Main Content */}
      <div className="z-20 text-center flex-1 flex flex-col justify-center max-w-md w-full">
        {/* Handwriting Styled Name */}
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          className="font-cursive text-6xl md:text-8xl text-romantic-400 text-glow select-none leading-none mb-2"
        >
          {CONFIG.girlfriendName}
        </motion.h2>

        {/* Surprise Webpage Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
        >
          Welcome to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-romantic-300 via-romantic-500 to-gold-300">
            {CONFIG.hero.title.replace('Welcome to ', '')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-sm md:text-base text-slate-300 tracking-wide font-light max-w-xs mx-auto mb-10 leading-relaxed"
        >
          {CONFIG.hero.subtitle}
        </motion.p>

        {/* Pulsating CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex justify-center"
        >
          <button
            onClick={onOpenSurprise}
            className="group relative cursor-pointer px-8 py-4 rounded-full font-medium tracking-wide text-white overflow-hidden shadow-lg border border-romantic-400/50 bg-gradient-to-r from-romantic-600 to-romantic-500 hover:from-romantic-500 hover:to-romantic-600 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            {/* Pulsing Backglow Ring */}
            <span className="absolute inset-0 rounded-full bg-romantic-500/30 animate-ping pointer-events-none" />
            <span className="text-base select-none">{CONFIG.hero.giftText}</span>
            <Gift className="w-5 h-5 text-white animate-pulse" />
          </button>
        </motion.div>
      </div>

      {/* Footer Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="z-20 text-center text-slate-400 text-xs flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={onOpenSurprise}
      >
        <span>Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-romantic-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}