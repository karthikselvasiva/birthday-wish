import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Eye } from 'lucide-react';
import { CONFIG } from '../config';

// Custom vector graphics for each placeholder to look high-end and romantic (Dark Theme version)
const SVGPlaceholders = [
  // Card 1: Our First Moment (Stars / Planets colliding)
  (
    <svg className="w-full h-full bg-gradient-to-br from-indigo-955 to-pink-955 p-8" viewBox="0 0 200 200">
      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="100" r="30" fill="url(#glow1)" />
      <circle cx="130" cy="100" r="40" fill="#471833" opacity="0.3" />
      <circle cx="70" cy="100" r="15" fill="#f43f5e" />
      <circle cx="130" cy="100" r="20" fill="#fbcfe8" />
      <path d="M 85 100 Q 100 80 115 100" fill="none" stroke="#d4a32f" strokeWidth="2" strokeDasharray="4" />
      <path d="M 85 100 Q 100 120 115 100" fill="none" stroke="#d4a32f" strokeWidth="2" strokeDasharray="4" />
      <Heart className="w-8 h-8 text-rose-500 absolute" style={{ top: '40%', left: '42%' }} />
    </svg>
  ),
  // Card 2: First Conversation (Glow Speech Bubbles)
  (
    <svg className="w-full h-full bg-gradient-to-br from-purple-955 to-rose-955 p-8" viewBox="0 0 200 200">
      <rect x="30" y="50" width="90" height="50" rx="15" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1" />
      <path d="M 45 100 L 45 115 L 60 100" fill="#1e1b4b" />
      <rect x="80" y="100" width="90" height="50" rx="15" fill="#4c0519" stroke="#ec4899" strokeWidth="1" />
      <path d="M 155 150 L 155 165 L 140 150" fill="#4c0519" />
      <text x="50" y="80" fill="#cbd5e1" fontSize="12" fontFamily="serif">"Hello..."</text>
      <text x="95" y="130" fill="#cbd5e1" fontSize="12" fontFamily="serif">"Hi!"</text>
      <circle cx="100" cy="95" r="8" fill="#fbbf24" />
    </svg>
  ),
  // Card 3: Favorite Date (Coffee Cups & Rose)
  (
    <svg className="w-full h-full bg-gradient-to-br from-slate-950 to-rose-955 p-8" viewBox="0 0 200 200">
      {/* Cup 1 */}
      <path d="M 50 110 L 80 110 L 75 150 L 55 150 Z" fill="#d97706" opacity="0.8" />
      <path d="M 80 120 Q 90 120 90 130 Q 90 140 80 140" fill="none" stroke="#d97706" strokeWidth="3" />
      {/* Cup 2 */}
      <path d="M 120 110 L 150 110 L 145 150 L 125 150 Z" fill="#be123c" opacity="0.8" />
      <path d="M 120 120 Q 110 120 110 130 Q 110 140 120 140" fill="none" stroke="#be123c" strokeWidth="3" />
      {/* Table base */}
      <line x1="20" y1="155" x2="180" y2="155" stroke="#475569" strokeWidth="3" />
      {/* Steams */}
      <path d="M 65 100 Q 60 90 70 80" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
      <path d="M 135 100 Q 140 90 130 80" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
      {/* Flower */}
      <circle cx="100" cy="70" r="6" fill="#f43f5e" />
      <circle cx="92" cy="70" r="5" fill="#fda4af" />
      <circle cx="108" cy="70" r="5" fill="#fda4af" />
      <circle cx="100" cy="62" r="5" fill="#fda4af" />
      <circle cx="100" cy="78" r="5" fill="#fda4af" />
    </svg>
  ),
  // Card 4: Laugh (Sun / Audio wave)
  (
    <svg className="w-full h-full bg-gradient-to-br from-[#120024] to-[#24002a] p-8" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="30" fill="#f59e0b" opacity="0.2" className="animate-pulse" />
      <circle cx="100" cy="100" r="20" fill="#fbbf24" />
      <line x1="100" y1="50" x2="100" y2="60" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="140" x2="100" y2="150" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="100" x2="60" y2="100" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      <line x1="140" y1="100" x2="150" y2="100" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      <path d="M 65 65 L 72 72 M 128 128 L 135 135 M 65 135 L 72 128 M 128 65 L 135 72" stroke="#fbbf24" strokeWidth="2.5" />
      {/* Smile */}
      <path d="M 85 105 Q 100 125 115 105" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  // Card 5: Dreams (Starry sky / Sparkles)
  (
    <svg className="w-full h-full bg-gradient-to-br from-indigo-950 to-violet-955 p-8" viewBox="0 0 200 200">
      <path d="M 100 40 L 105 60 L 125 65 L 105 70 L 100 90 L 95 70 L 75 65 L 95 60 Z" fill="#d4a32f" />
      <path d="M 60 110 L 63 120 L 73 122.5 L 63 125 L 60 135 L 57 125 L 47 122.5 L 57 120 Z" fill="#f87171" />
      <path d="M 140 120 L 142 128 L 150 130 L 142 132 L 140 140 L 138 132 L 130 130 L 138 128 Z" fill="#60a5fa" />
      <circle cx="50" cy="60" r="1.5" fill="#f43f5e" />
      <circle cx="150" cy="50" r="2" fill="#f43f5e" />
      <circle cx="160" cy="150" r="1" fill="#f43f5e" />
      <circle cx="80" cy="160" r="2" fill="#f43f5e" />
    </svg>
  ),
  // Card 6: Forever (Heart Infinity)
  (
    <svg className="w-full h-full bg-gradient-to-br from-rose-955 to-stone-950 p-8" viewBox="0 0 200 200">
      {/* Infinity shape */}
      <path d="M 60 100 C 20 60, 20 140, 60 100 C 100 60, 140 60, 140 100 C 140 140, 100 140, 60 100" fill="none" stroke="#f43f5e" strokeWidth="4" />
      {/* Small hearts intertwined */}
      <path d="M 100 100 Q 100 90 92 90 T 85 96 T 100 110 T 115 96 T 108 90 T 100 100" fill="#be123c" />
    </svg>
  )
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="py-20 px-4 md:px-8 bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-romantic-400 font-semibold">
            Our Love Story
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-1 text-white">
            Moments Frozen In Time
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">
            A small collection of beautiful memories that define us. Click on any card to view it closely.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {CONFIG.memories.map((memory, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedPhoto({ ...memory, index })}
              className="group cursor-pointer rounded-2xl overflow-hidden glass-panel-romantic border border-rose-500/10 flex flex-col"
            >
              {/* Photo Area */}
              <div className="relative w-full aspect-[9/16] bg-slate-955 overflow-hidden flex items-center justify-center">
                {memory.image ? (
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                ) : (
                  /* Interactive SVG Vector Artwork */
                  <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                    {SVGPlaceholders[memory.svgIndex]}
                  </div>
                )}

                {/* Floating Overlay Icons */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div className="p-2.5 rounded-full bg-romantic-500/80 text-white shadow-lg animate-heartbeat">
                    <Heart className="w-5 h-5 fill-white" />
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-4 flex-1 flex flex-col justify-center border-t border-rose-500/10 bg-slate-900/60">
                <h3 className="font-serif text-sm font-semibold text-rose-100 line-clamp-1">
                  {memory.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {memory.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-[260px] sm:w-[300px] max-h-[95vh] rounded-2xl overflow-hidden glass-panel border border-white/10 flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Display Area */}
                <div className="w-full aspect-[9/16] bg-black flex items-center justify-center overflow-hidden flex-shrink-0">
                  {selectedPhoto.image ? (
                    <img
                      src={selectedPhoto.image}
                      alt={selectedPhoto.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full scale-110">
                      {SVGPlaceholders[selectedPhoto.svgIndex]}
                    </div>
                  )}
                </div>

                {/* Description details */}
                <div className="p-4 bg-slate-955/95 border-t border-white/10 text-left overflow-y-auto flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4.5 h-4.5 text-romantic-500 fill-romantic-500" />
                    <h3 className="font-serif text-base font-bold text-white">
                      {selectedPhoto.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {selectedPhoto.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}