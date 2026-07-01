import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { CONFIG } from '../config';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAutoplayTooltip, setShowAutoplayTooltip] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.4;

    const startAudio = () => {
      if (!audioRef.current) return;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowAutoplayTooltip(false);
          removeInteractionListeners();
        })
        .catch((error) => {
          console.log("Audio playback waiting for interaction...");
        });
    };

    const removeInteractionListeners = () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
      document.removeEventListener('scroll', startAudio);
      document.removeEventListener('keydown', startAudio);
    };

    // 1. Try to play immediately
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setShowAutoplayTooltip(false);
        })
        .catch((error) => {
          console.log("Autoplay blocked. Adding global interaction listeners.");
          // 2. Add global interaction listeners to play as soon as user touches/interacts with the screen
          document.addEventListener('click', startAudio);
          document.addEventListener('touchstart', startAudio);
          document.addEventListener('scroll', startAudio);
          document.addEventListener('keydown', startAudio);
        });
    }

    return () => {
      removeInteractionListeners();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowAutoplayTooltip(false);
        })
        .catch(err => console.error("Error playing audio:", err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Autoplay Helper Tooltip */}
      {showAutoplayTooltip && (
        <div className="mb-2 bg-romantic-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg animate-bounce flex items-center gap-1 glass-panel">
          <Music className="w-3.5 h-3.5 animate-spin" />
          <span>Tap to play background music</span>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border outline-none cursor-pointer ${
          isPlaying 
            ? 'bg-romantic-600 border-romantic-400 text-white animate-heartbeat' 
            : 'bg-slate-900/80 border-slate-700/50 text-romantic-300 hover:text-white'
        }`}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <div className="flex items-center gap-0.5 h-4 justify-center">
            {/* Animated Equalizer Wave Bars */}
            <span className="w-0.75 bg-white rounded-full animate-bounce h-3.5" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }}></span>
            <span className="w-0.75 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '0.3s', animationDuration: '0.8s' }}></span>
            <span className="w-0.75 bg-white rounded-full animate-bounce h-4" style={{ animationDelay: '0.0s', animationDuration: '0.5s' }}></span>
            <span className="w-0.75 bg-white rounded-full animate-bounce h-2.5" style={{ animationDelay: '0.4s', animationDuration: '0.7s' }}></span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={CONFIG.music.url}
        loop
        preload="auto"
      />
    </div>
  );
}