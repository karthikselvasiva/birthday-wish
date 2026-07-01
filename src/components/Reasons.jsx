import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Flower2, Compass, Sparkles, Handshake } from 'lucide-react';
import { CONFIG } from '../config';

const iconMap = {
  Smile: <Smile className="w-12 h-12 text-rose-400 animate-pulse" />,
  Flower2: <Flower2 className="w-12 h-12 text-rose-400 animate-pulse" />,
  Heart: <Heart className="w-12 h-12 text-rose-400 fill-rose-400/20 animate-pulse" />,
  Compass: <Compass className="w-12 h-12 text-rose-400 animate-pulse" />,
  Sparkles: <Sparkles className="w-12 h-12 text-rose-400 animate-pulse" />,
  Handshake: <Handshake className="w-12 h-12 text-rose-400 animate-pulse" />
};

export default function Reasons() {
  // Store the flipped state of each card by index
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-slate-900/40 relative overflow-hidden">

      {/* Decorative stars / bubbles */}
      <div className="absolute top-1/2 left-10 w-24 h-24 rounded-full bg-rose-500/5 blur-xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gold-400/5 blur-xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center">

        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-romantic-400 font-semibold">
            My Deepest Feelings
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-1 text-white">
            Reasons Why I Love You
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">
            Just a few of the infinite reasons why you are the center of my universe. Tap each card to reveal details.
          </p>
        </div>

        {/* Interactive Flip Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {CONFIG.reasons.map((reason, index) => {
            const isFlipped = !!flippedCards[index];

            return (
              <div
                key={index}
                onClick={() => toggleFlip(index)}
                className="perspective-1000 w-full h-48 md:h-52 cursor-pointer relative"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-full h-full relative duration-500"
                >

                  {/* CARD FRONT */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl glass-panel-romantic border border-rose-500/10 p-5 flex flex-col items-center justify-between shadow-md"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <div className="flex items-center justify-center mt-2 select-none">
                      {iconMap[reason.icon] || <Heart className="w-12 h-12 text-rose-400" />}
                    </div>
                    <div className="text-center">
                      <h3 className="font-serif text-sm md:text-base font-bold text-rose-100 mb-1 leading-tight">
                        {reason.title}
                      </h3>
                      <span className="text-[10px] text-romantic-300 font-medium tracking-wide uppercase flex items-center justify-center gap-1 mt-1 opacity-70">
                        Tap to reveal <Heart className="w-2.5 h-2.5 fill-current" />
                      </span>
                    </div>
                  </div>

                  {/* CARD BACK */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-rose-950 to-indigo-950 border border-rose-500/30 p-5 flex flex-col items-center justify-between text-left shadow-lg"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="flex-1 overflow-y-auto pr-1">
                      <h4 className="font-serif text-[11px] font-bold tracking-wider text-rose-300 uppercase mb-2 border-b border-rose-500/20 pb-1">
                        {reason.title}
                      </h4>
                      <p className="text-[11px] md:text-xs text-slate-200 leading-relaxed font-light">
                        {reason.desc}
                      </p>
                    </div>
                    <div className="text-[9px] text-slate-400 italic text-center w-full mt-2 pt-1 border-t border-slate-800">
                      Tap to flip back
                    </div>
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}