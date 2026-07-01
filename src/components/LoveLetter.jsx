import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, X, Heart } from 'lucide-react';
import { CONFIG } from '../config';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullReadingView, setShowFullReadingView] = useState(false);
  const [typewriterActive, setTypewriterActive] = useState(false);
  const [typedParagraphs, setTypedParagraphs] = useState([]);
  const [showClosing, setShowClosing] = useState(false);
  const letterRef = useRef(null);

  const fullLetter = CONFIG.loveLetter.paragraphs;
  const closingText = CONFIG.loveLetter.closing;

  // Typewriter effect for the envelope preview
  useEffect(() => {
    if (!isOpen) {
      setTypedParagraphs([]);
      setTypewriterActive(false);
      setShowClosing(false);
      return;
    }

    // Delay start until the letter slides up (e.g. 1s)
    const delayTimeout = setTimeout(() => {
      setTypewriterActive(true);
    }, 1000);

    return () => clearTimeout(delayTimeout);
  }, [isOpen]);

  useEffect(() => {
    if (!typewriterActive) return;

    let currentParagraphIndex = 0;
    let currentCharIndex = 0;
    let localParagraphs = Array(fullLetter.length).fill("");

    const interval = setInterval(() => {
      if (currentParagraphIndex < fullLetter.length) {
        const text = fullLetter[currentParagraphIndex];
        
        if (currentCharIndex < text.length) {
          localParagraphs[currentParagraphIndex] = text.slice(0, currentCharIndex + 1);
          setTypedParagraphs([...localParagraphs]);
          currentCharIndex++;
        } else {
          currentParagraphIndex++;
          currentCharIndex = 0;
        }
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowClosing(true);
        }, 300);
      }
    }, 25); // fast typing for preview

    return () => clearInterval(interval);
  }, [typewriterActive]);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Automatically open the full screen reading view after the slide animation finishes
      setTimeout(() => {
        setShowFullReadingView(true);
      }, 1500);
    } else {
      setShowFullReadingView(true);
    }
  };

  return (
    <section ref={letterRef} className="py-20 px-4 flex flex-col items-center justify-center min-h-screen bg-slate-950 relative overflow-hidden">
      
      {/* Decorative starry particles in letter background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-12 left-10 w-2.5 h-2.5 bg-pink-400 rounded-full animate-ping" />
        <div className="absolute top-1/2 right-12 w-2 h-2 bg-rose-300 rounded-full animate-pulse" />
        <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-yellow-200 rounded-full animate-bounce" />
      </div>

      <div className="max-w-md w-full text-center mb-10 z-10 px-4">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs uppercase tracking-widest text-romantic-400 font-semibold"
        >
          A Letter For You
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl font-bold mt-1 text-white"
        >
          From the Deepest Corner
        </motion.h2>
        <p className="text-slate-400 text-xs mt-2">
          Click the envelope below to read the message inside.
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="relative w-full max-w-sm h-80 flex items-center justify-center z-20">
        <div 
          onClick={handleOpen}
          className="relative cursor-pointer w-76 h-52 transition-transform duration-500 hover:scale-102 flex items-center justify-center"
        >
          {/* Envelope Back Flap */}
          <div className="absolute inset-0 bg-romantic-900 rounded-lg envelope-shadow border border-romantic-800" />
          
          {/* The Letter Sheet that slides up */}
          <motion.div
            initial={{ y: 0, scale: 0.95, opacity: 0 }}
            animate={
              isOpen
                ? { y: '-105%', scale: 1, opacity: 1, zIndex: 10 }
                : { y: 0, scale: 0.95, opacity: 0, zIndex: 0 }
            }
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: isOpen ? 0.3 : 0 }}
            className={`absolute left-4 right-4 top-2 min-h-64 rounded-md bg-rose-50 p-6 text-slate-800 shadow-xl border border-rose-100 flex flex-col justify-between ${
              isOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <div className="flex-1 overflow-hidden text-left font-serif pr-1">
              {/* Recipient */}
              <div className="text-xs font-bold text-romantic-800 tracking-wide border-b border-rose-200/60 pb-1 mb-3">
                {CONFIG.loveLetter.recipient}
              </div>
              
              {/* Typed Paragraphs Preview */}
              <div className="space-y-2 text-[11px] leading-relaxed text-slate-700">
                {typedParagraphs.slice(0, 3).map((para, idx) => (
                  <p key={idx} className="line-clamp-2">
                    {para}
                  </p>
                ))}
                {typedParagraphs.length > 3 && (
                  <p className="text-[10px] text-romantic-500 font-semibold animate-pulse mt-2">
                    Tap card to read full letter...
                  </p>
                )}
              </div>
            </div>

            {/* Closing Signature */}
            {showClosing && (
              <div className="text-right mt-2 border-t border-rose-200/60 pt-1">
                <span className="font-cursive text-2xl text-romantic-600 font-medium block">
                  {closingText}
                </span>
              </div>
            )}
          </motion.div>

          {/* Envelope Front Triangle Pieces */}
          {/* Left Wing */}
          <div className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#5d0e20] border-l border-b border-romantic-800 rounded-bl-lg"
               style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)', zIndex: 11 }} />
          {/* Right Wing */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#5d0e20] border-r border-b border-romantic-800 rounded-br-lg"
               style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 50%)', zIndex: 11 }} />
          {/* Bottom Wing */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#4c0a19] border-b border-romantic-800 rounded-b-lg"
               style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)', zIndex: 12 }} />
          
          {/* Top Flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 13 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'top center', perspective: 1000 }}
            className="absolute left-0 right-0 top-0 h-26 bg-[#6e1227] border-t border-romantic-700/30 rounded-t-lg shadow-sm"
            clipPath="polygon(0 0, 50% 100%, 100% 0)"
          />

          {/* Envelope Seal Stamp Button */}
          <div className="absolute z-14 flex items-center justify-center pointer-events-none" style={{ top: '55%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <motion.div
              animate={isOpen ? { scale: 0.8, opacity: 0.6 } : { scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 rounded-full bg-gold-400 border-2 border-gold-200 flex items-center justify-center shadow-md cursor-pointer"
            >
              {isOpen ? (
                <MailOpen className="w-5 h-5 text-[#4c0a19]" />
              ) : (
                <Mail className="w-5 h-5 text-[#4c0a19]" />
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Re-seal instruction helper */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          onClick={() => {
            setShowFullReadingView(true);
          }}
          className="mt-28 bg-romantic-600/10 border border-romantic-500/20 text-romantic-300 px-5 py-2 rounded-full text-xs font-semibold hover:bg-romantic-600/20 cursor-pointer"
        >
          Open Reading Board
        </motion.button>
      )}

      {/* FULL SCREEN PARCHMENT READING BOARD OVERLAY */}
      <AnimatePresence>
        {showFullReadingView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 md:p-6 backdrop-blur-md"
            onClick={() => setShowFullReadingView(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative max-w-lg w-full max-h-[85vh] bg-[#fdfaf2] rounded-2xl shadow-2xl border border-rose-100 flex flex-col overflow-hidden text-slate-800 font-serif"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Icon */}
              <button
                onClick={() => setShowFullReadingView(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrollable Letter Page */}
              <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-6 text-left selection:bg-rose-200">
                {/* Header Stamp */}
                <div className="flex items-center gap-2 border-b border-rose-200/70 pb-3">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <span className="text-xs uppercase font-sans font-bold tracking-widest text-slate-400">
                    Our Little Universe
                  </span>
                </div>

                {/* Recipient */}
                <h3 className="text-lg md:text-xl font-bold text-romantic-800 tracking-wide">
                  {CONFIG.loveLetter.recipient}
                </h3>

                {/* Paragraphs Content */}
                <div className="space-y-4 text-[14px] md:text-[15px] leading-relaxed text-slate-700">
                  {fullLetter.map((para, idx) => {
                    const isBoldFirst = para.startsWith('First of all...');
                    const isBoldThankYou = para.startsWith('Thank you for being');
                    const isBoldHappyBirthday = para.startsWith('Once again...');
                    
                    if (isBoldFirst) {
                      return (
                        <p key={idx} className="font-semibold text-slate-800">
                          First of all... <span className="text-romantic-600 font-bold">Happy Birthday di ❤️🎂</span>
                        </p>
                      );
                    }
                    if (isBoldThankYou) {
                      return (
                        <p key={idx} className="font-semibold bg-rose-50/50 p-3 rounded-lg border-l-4 border-rose-400 text-slate-800 my-4 italic">
                          Thank you for being a beautiful part of my life. ❤️
                        </p>
                      );
                    }
                    if (isBoldHappyBirthday) {
                      return (
                        <div key={idx} className="py-2 border-t border-b border-rose-100 my-4 text-center">
                          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Once again...</p>
                          <p className="text-lg md:text-xl font-bold text-romantic-600">
                            Happy Birthday My Dear Ammu ❤️✨
                          </p>
                        </div>
                      );
                    }

                    return (
                      <p key={idx} className="whitespace-pre-line">
                        {para}
                      </p>
                    );
                  })}
                </div>

                {/* Closing Signature */}
                <div className="text-right pt-6 border-t border-rose-100">
                  <span className="text-xs uppercase font-sans font-bold tracking-wider text-slate-400 block mb-1">
                    With Love
                  </span>
                  <span className="font-cursive text-3xl md:text-4xl text-romantic-600 font-medium block">
                    {closingText}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}