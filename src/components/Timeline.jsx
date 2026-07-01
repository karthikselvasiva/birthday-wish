import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Sparkles, Clock } from 'lucide-react';
import { CONFIG } from '../config';

const getStepIcon = (id) => {
  switch (id) {
    case 1:
      return <Heart className="w-5 h-5 text-romantic-400 fill-romantic-500/10" />;
    case 2:
      return <Calendar className="w-5 h-5 text-romantic-400" />;
    case 3:
      return <Clock className="w-5 h-5 text-romantic-400" />;
    default:
      return <Sparkles className="w-5 h-5 text-romantic-400 animate-pulse" />;
  }
};

export default function Timeline() {
  const steps = CONFIG.timeline.map((item, index) => {
    const iconPosition = index % 2 === 0 ? 'right' : 'left';
    return {
      id: index + 1,
      date: item.date,
      title: item.title,
      desc: item.desc,
      iconPosition
    };
  });

  return (
    <section className="py-20 px-4 md:px-8 bg-slate-950 relative overflow-hidden">
      
      {/* Soft romantic glows in background */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-romantic-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-romantic-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        
        {/* Section Header */}
        <div className="text-center mb-20 z-10 relative">
          <span className="text-xs uppercase tracking-widest text-romantic-400 font-semibold">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-1 text-white flex items-center justify-center gap-2">
            <span>The Timeline of Us</span>
            <Heart className="w-5 h-5 text-romantic-500 fill-romantic-500 animate-pulse" />
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto">
            A vertical walk down memory lane, charting the major milestones of our love.
          </p>
        </div>

        {/* Vertical Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-48 bottom-8 w-[2px] bg-rose-500/20 transform -translate-x-1/2 z-0" />

        {/* Timeline Items Grid */}
        <div className="space-y-12 relative z-10">
          {steps.map((step, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div 
                key={step.id} 
                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                  isLeft ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node Circle with Step Number */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-romantic-500 text-white flex items-center justify-center font-bold text-sm z-10 shadow-[0_0_12px_rgba(244,63,94,0.35)] select-none">
                  {step.id}
                </div>

                {/* Card Container */}
                <div className="w-full pl-14 md:pl-0 md:w-[45%]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                    className="relative glass-panel-romantic p-6 rounded-2xl border border-rose-500/10 shadow-lg text-left group hover:border-romantic-500/25 transition-colors duration-300"
                  >
                    {/* Dynamically Positioned Icon facing the centerline */}
                    <div className={`absolute top-6 ${
                      step.iconPosition === 'right' ? 'right-6' : 'left-6'
                    }`}>
                      {getStepIcon(step.id)}
                    </div>
                    
                    {/* Content text adjusted for icon spacing */}
                    <div className={step.iconPosition === 'left' ? 'pl-9' : 'pr-9'}>
                      {/* Date */}
                      <span className="text-[10px] text-romantic-300 font-semibold uppercase tracking-wider block mb-1">
                        {step.date}
                      </span>
                      {/* Title */}
                      <h3 className="font-serif text-base font-bold text-white mb-2 group-hover:text-romantic-300 transition-colors">
                        {step.title}
                      </h3>
                      {/* Description */}
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Desktop Spacer */}
                <div className="hidden md:block w-[45%]" />

              </div>
            );
          })}
        </div>
        
        {/* Final Ending Heart Icon */}
        <div className="mt-16 flex justify-center relative z-20">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-10 h-10 rounded-full bg-romantic-500 flex items-center justify-center border-4 border-slate-950 text-white shadow-lg animate-heartbeat"
          >
            <Heart className="w-4 h-4 fill-white" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}