import React from 'react';
import { 
  Play, Sparkles, Feather, ShieldCheck, Heart, 
  Leaf, Flower2, Clock, CheckCircle2, ChevronRight 
} from 'lucide-react';

interface HeroProps {
  onStartBooking: () => void;
  onWatchStory: () => void;
  onOpenTracker: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBooking, onWatchStory, onOpenTracker }) => {
  const HERO_IMAGE_WOMAN = '/src/assets/images/hero_woman_spa_relaxation_1791267269523.jpg';

  return (
    <section className="relative pt-6 pb-12 sm:pb-16 lg:pt-10 lg:pb-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Grid matching reference image.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typography, CTAs, and 4 Feature Badges */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* International Hub Badge & Kicker */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4F5] border border-[#F0D5DA] text-[11px] font-semibold text-[#8E4A56]">
                <span>🇪🇸 Spain</span>
                <span className="text-[#DDD7CD]">·</span>
                <span>🇮🇳 India</span>
                <span className="text-[9px] bg-[#964B59] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider font-sans font-bold">
                  International
                </span>
              </span>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8E4A56]">
                Relax · Rejuvenate · Rebalance
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F2421] leading-[1.08] font-normal tracking-tight text-balance">
              A Calmer You<br />
              <span className="italic font-normal">A Brighter Tomorrow</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#525E57] font-normal leading-relaxed max-w-lg">
              Certified doorstep massage & luxury in-home spa rituals delivered directly to your residence across Spain (Madrid, Barcelona, Marbella) & India (Delhi NCR, Mumbai, Bengaluru). Full equipment brought to your door.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <button
                onClick={onStartBooking}
                className="w-full sm:w-auto justify-center px-6 py-3.5 bg-[#1F2B24] hover:bg-[#141C18] text-[#FAF9F5] text-xs sm:text-sm font-medium rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2 group active:scale-98"
              >
                <span>Instant Sign Up & Book</span>
                <span className="text-base leading-none transition-transform group-hover:translate-x-1">→</span>
              </button>

              <button
                onClick={onWatchStory}
                className="w-full sm:w-auto justify-center px-5 py-3.5 bg-white hover:bg-neutral-50 text-[#1F2421] text-xs sm:text-sm font-medium rounded-full border border-[#DDD7CD] shadow-2xs transition-all cursor-pointer flex items-center gap-2.5 active:scale-98"
              >
                <div className="w-6 h-6 rounded-full bg-[#1F2B24] text-white flex items-center justify-center text-[10px]">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Real-time Tracking Bar & Client Access */}
            <div className="pt-1">
              <div className="p-3 bg-[#FAF7F5] rounded-2xl border border-[#EAE3DE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34A853] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34A853]"></span>
                  </span>
                  <div className="text-[#4A5550]">
                    <span className="font-semibold text-[#1F2421]">Have an upcoming appointment?</span>{' '}
                    <span>Track therapist arrival in real-time</span>
                  </div>
                </div>
                <button
                  onClick={onOpenTracker}
                  className="px-3.5 py-1.5 bg-[#2D4A3E] hover:bg-[#233A31] text-white text-xs font-medium rounded-full shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center active:scale-95"
                >
                  <Clock className="w-3.5 h-3.5 text-[#C2D6C8]" />
                  <span>Track Live Radar →</span>
                </button>
              </div>
            </div>

            {/* 4 Feature Badges matching image.png */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#EAE3DE]">
              <div className="flex flex-col items-start gap-1.5">
                <div className="text-[#964B59]">
                  <Flower2 className="w-5 h-5 stroke-[1.7]" />
                </div>
                <div className="text-xs font-semibold text-[#1F2421] leading-tight">
                  Expert<br />Therapists
                </div>
              </div>

              <div className="flex flex-col items-start gap-1.5">
                <div className="text-[#964B59]">
                  <Leaf className="w-5 h-5 stroke-[1.7]" />
                </div>
                <div className="text-xs font-semibold text-[#1F2421] leading-tight">
                  Premium<br />Organic Products
                </div>
              </div>

              <div className="flex flex-col items-start gap-1.5">
                <div className="text-[#964B59]">
                  <Feather className="w-5 h-5 stroke-[1.7]" />
                </div>
                <div className="text-xs font-semibold text-[#1F2421] leading-tight">
                  A Tranquil<br />Environment
                </div>
              </div>

              <div className="flex flex-col items-start gap-1.5">
                <div className="text-[#964B59]">
                  <Heart className="w-5 h-5 stroke-[1.7]" />
                </div>
                <div className="text-xs font-semibold text-[#1F2421] leading-tight">
                  Your Wellbeing<br />Our Priority
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Photograph with "Good Skin Happier You ♡" handwritten tag */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EAE3DE] bg-white aspect-16/10 sm:aspect-4/3 lg:aspect-16/11">
              <img
                src={HERO_IMAGE_WOMAN}
                alt="Woman enjoying serene spa relaxation"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Handwritten Note flourish in top-right matching image.png */}
              <div className="absolute top-4 right-5 sm:top-6 sm:right-6 text-white text-right drop-shadow-md select-none pointer-events-none">
                <div className="font-serif italic text-lg sm:text-2xl leading-none tracking-wide text-white">
                  Good Skin
                </div>
                <div className="font-serif italic text-base sm:text-xl text-white/95">
                  Happier You ♡
                </div>
              </div>

              {/* Bottom Subtle Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 shadow-xs flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                  <span className="font-medium text-[#1F2421]">Home Visits in Spain 🇪🇸 & India 🇮🇳 Today</span>
                </div>
                <span className="font-mono text-[#964B59] font-semibold text-[11px]">
                  Avg Arrival: 45 Mins
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
