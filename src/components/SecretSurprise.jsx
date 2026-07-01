import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Play, Pause, Video, Disc, Heart, RefreshCw, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';

export default function SecretSurprise() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // Audio Player states for Voice Message
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef(null);
  
  // Video Player states
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toUpperCase() === CONFIG.secret.password.toUpperCase()) {
      setIsUnlocked(true);
      setIsError(false);
    } else {
      setIsError(true);
      setPassword('');
      // Vibrate on mobile for tactile feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      setTimeout(() => setIsError(false), 500);
    }
  };

  // Audio Play/Pause handlers
  const handleAudioPlay = () => {
    if (!audioRef.current) return;
    
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setAudioPlaying(true))
        .catch(err => console.log("Audio play error: ", err));
    }
  };

  const handleAudioTimeUpdate = () => {
    if (!audioRef.current) return;
    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };

  const handleAudioEnded = () => {
    setAudioPlaying(false);
    setAudioProgress(0);
  };

  const handleAudioSliderChange = (e) => {
    if (!audioRef.current) return;
    const val = parseFloat(e.target.value);
    const newTime = (val / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setAudioProgress(val);
  };

  // Video Play/Pause toggle
  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setVideoPlaying(true))
        .catch(err => console.log("Video play error: ", err));
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-slate-900/50 border-y border-slate-800 relative overflow-hidden">
      
      {/* Decorative layout elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-rose-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          
          {!isUnlocked ? (
            /* LOCKED GATED STATE */
            <motion.div
              key="locked-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              {/* Header */}
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-romantic-400 font-semibold">
                  Top Secret
                </span>
                <h2 className="font-serif text-3xl font-bold mt-1 text-white">
                  Unlock Your Surprise
                </h2>
                <p className="text-xs text-slate-400 mt-2">
                  There is a locked vault created just for you. Enter the password to open it.
                </p>
              </div>

              {/* Password Form Box */}
              <motion.div
                animate={isError ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="glass-panel-romantic p-8 rounded-3xl border border-rose-500/10 shadow-lg"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 shadow-inner">
                    <Lock className="w-6 h-6 animate-pulse" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password (Hint: L___)"
                      className={`w-full px-5 py-3.5 rounded-xl text-center text-sm font-semibold tracking-widest text-white border outline-none bg-slate-950 transition-all ${
                        isError 
                          ? 'border-red-500 bg-red-950/20' 
                          : 'border-slate-800 bg-slate-950 focus:border-rose-500'
                      }`}
                    />
                    {isError && (
                      <span className="text-xs text-red-400 font-medium block pt-1 select-none animate-pulse">
                        Incorrect passcode. Try again!
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl cursor-pointer font-semibold text-sm tracking-wide text-white bg-gradient-to-r from-romantic-600 to-romantic-500 hover:from-romantic-500 hover:to-romantic-600 transition-all duration-300 shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Open Vault</span>
                    <Unlock className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            </motion.div>
          ) : (
            
            /* UNLOCKED SURPRISE STATE */
            <motion.div
              key="unlocked-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold flex items-center justify-center gap-1.5 animate-pulse">
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  Unlocked Vault
                </span>
                <h2 className="font-serif text-3xl font-bold mt-1 text-white">
                  For Your Eyes Only
                </h2>
              </div>

              {/* Multimedia Card */}
              <div className="glass-panel-romantic rounded-3xl border border-rose-500/10 shadow-xl overflow-hidden">
                
                {/* 1. Stylized Romantic Video Player */}
                <div className="relative w-full h-56 bg-slate-955 border-b border-rose-500/10 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={CONFIG.secret.videoUrl}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    onClick={toggleVideoPlay}
                  />
                  
                  {/* Play/Pause Center Trigger Overlay */}
                  {!videoPlaying && (
                    <div 
                      onClick={toggleVideoPlay}
                      className="absolute inset-0 bg-black/50 hover:bg-black/60 flex flex-col items-center justify-center text-white cursor-pointer transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-rose-500 border border-rose-400 flex items-center justify-center shadow-lg animate-heartbeat">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-medium tracking-wide mt-2">Play Romantic Clip</span>
                    </div>
                  )}
                  {videoPlaying && (
                    <button
                      onClick={toggleVideoPlay}
                      className="absolute bottom-4 right-4 bg-black/75 hover:bg-black text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer border border-white/10"
                    >
                      <Pause className="w-3.5 h-3.5" /> Pause
                    </button>
                  )}
                </div>

                {/* 2. Interactive Voice Message Player */}
                <div className="p-6 bg-slate-900/60 border-b border-rose-500/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Disc className={`w-5 h-5 text-rose-400 ${audioPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                    <span className="text-xs font-semibold text-rose-200 tracking-wider">Play Voice Note</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Circle Play Button */}
                    <button
                      onClick={handleAudioPlay}
                      className="w-12 h-12 rounded-full bg-rose-500 border border-rose-400 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
                    >
                      {audioPlaying ? (
                        <Pause className="w-5 h-5" fill="white" />
                      ) : (
                        <Play className="w-5 h-5 ml-1" fill="white" />
                      )}
                    </button>

                    {/* Progress details */}
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={audioProgress}
                        onChange={handleAudioSliderChange}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer outline-none transition-colors"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-semibold tracking-wider font-mono">
                        <span>{audioPlaying ? 'PLAYING' : 'READY'}</span>
                        <span>{Math.round(audioProgress)}%</span>
                      </div>
                    </div>
                  </div>

                  <audio
                    ref={audioRef}
                    src={CONFIG.secret.audioUrl}
                    onTimeUpdate={handleAudioTimeUpdate}
                    onEnded={handleAudioEnded}
                  />
                </div>

                {/* 3. Deep Personalized Message */}
                <div className="p-6 text-left">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4.5 h-4.5 text-rose-500" fill="currentColor" />
                    <h3 className="font-serif text-sm font-bold text-rose-100 uppercase tracking-wider">
                      My Promise to You
                    </h3>
                  </div>
                  <p className="text-[13px] text-slate-200 leading-relaxed font-light">
                    {CONFIG.secret.message}
                  </p>
                </div>

              </div>

              {/* Lock Back Option */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setIsUnlocked(false);
                    setPassword('');
                    if (audioPlaying) {
                      audioRef.current.pause();
                      setAudioPlaying(false);
                    }
                    if (videoPlaying) {
                      videoRef.current.pause();
                      setVideoPlaying(false);
                    }
                  }}
                  className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1.5 mx-auto underline cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-lock Vault
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}