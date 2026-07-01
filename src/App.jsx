import React, { useRef } from 'react';
import Hero from './components/Hero';
import MusicPlayer from './components/MusicPlayer';
import LoveLetter from './components/LoveLetter';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Reasons from './components/Reasons';
import Celebration from './components/Celebration';
import { Heart } from 'lucide-react';

function App() {
  const loveLetterRef = useRef(null);

  const handleOpenSurprise = () => {
    if (loveLetterRef.current) {
      loveLetterRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white antialiased">
      {/* Floating Background Music Player */}
      <MusicPlayer />

      {/* Hero Landing Entrance */}
      <Hero onOpenSurprise={handleOpenSurprise} />

      {/* Scrollable Story Blocks */}
      <main className="relative z-20">
        
        {/* Anchor point for Hero CTA */}
        <div ref={loveLetterRef} id="love-letter-section">
          <LoveLetter />
        </div>

        {/* Real-time Ticking Countdown */}
        <Countdown />

        {/* Couples Photo Gallery (Custom Illustrations) */}
        <Gallery />

        {/* Journey Timeline */}
        <Timeline />

        {/* Reasons Why I Love You (3D Flip Grid) */}
        <Reasons />



        {/* Celebration Finale (Cake blow, fireworks, confetti) */}
        <Celebration />

      </main>

      {/* Cursive Romantic Footer */}
      <footer className="py-12 bg-[#090510] border-t border-slate-900/50 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-1.5 font-medium tracking-wide">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-heartbeat" />
          <span>only for Hemalatha Kartthik Selva Siva</span>
        </div>
        <p className="opacity-60 text-[10px] uppercase tracking-wider font-semibold">
          © {new Date().getFullYear()} Our Little Universe. All Rights Reserved by Karthik Selva Siva.
        </p>
      </footer>
    </div>
  );
}

export default App;