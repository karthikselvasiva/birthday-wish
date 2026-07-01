import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarRange, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';

export default function Countdown() {
  const calculateTimeLeft = () => {
    const difference = +new Date(CONFIG.countdown.targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format single digits to double digits
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const timerItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-slate-955/60 border-t border-slate-900 relative overflow-hidden">
      
      {/* Decorative starry elements */}
      <div className="absolute top-10 left-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-sparkle" />
      <div className="absolute bottom-10 right-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-sparkle" />

      <div className="max-w-md mx-auto text-center z-10 relative">
        
        {/* Section Icon & Title */}
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-romantic-500/10 border border-romantic-500/25">
            <CalendarRange className="w-6 h-6 text-romantic-400" />
          </div>
        </div>
        
        <h2 className="font-serif text-2xl font-bold text-white mb-2">
          {CONFIG.countdown.message}
        </h2>
        
        <p className="text-xs text-slate-400 mb-8 tracking-wide">
          Target Date: {new Date(CONFIG.countdown.targetDate).toLocaleDateString(undefined, { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>

        {timeLeft.isExpired ? (
          /* EXPIRED STATE (IT'S BIRTHDAY!) */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-romantic p-6 rounded-2xl border border-rose-500/20"
          >
            <div className="flex justify-center gap-1 mb-2">
              <Sparkles className="w-5 h-5 text-gold-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-semibold text-rose-300 uppercase tracking-widest text-xs">Let the Party Begin</span>
              <Sparkles className="w-5 h-5 text-gold-400 animate-pulse" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white text-glow">
              Happy Birthday, {CONFIG.girlfriendName}!
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Every second of waiting has led to this beautiful day. Time to celebrate your presence in my life!
            </p>
          </motion.div>
        ) : (
          /* RUNNING COUNTDOWN */
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {timerItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center justify-center p-3 rounded-xl glass-panel-romantic border border-rose-500/10 shadow-sm"
              >
                {/* Glow Count Number */}
                <span className="font-mono text-2xl md:text-3xl font-bold text-rose-300 text-glow leading-none select-none">
                  {formatTime(item.value)}
                </span>
                {/* Metric Label */}
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-2 select-none">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}