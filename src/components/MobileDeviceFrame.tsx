import React, { useState } from 'react';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';
import { MobileStatusBar } from './MobileStatusBar';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({ children }) => {
  // Mode: 'frame' | 'full'
  const [frameMode, setFrameMode] = useState<'frame' | 'full'>('frame');

  return (
    <div className="min-h-screen bg-[#F0ECE6] flex flex-col items-center justify-start antialiased selection:bg-[#964B59] selection:text-white">
      
      {/* Desktop Mode Switcher Bar */}
      <aside aria-label="Desktop Preview Controls" className="hidden md:flex w-full bg-[#1A251F] text-white px-6 py-2 items-center justify-between z-50 text-xs border-b border-white/10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
          <span className="font-semibold tracking-wide">Velmora Mobile App UI/UX Experience</span>
          <span className="text-white/40">|</span>
          <span className="text-white/70 text-[11px]">Luxury In-Home Spa Sanctuary Dispatch</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/60">Display Mode:</span>
          <div className="flex items-center p-0.5 bg-white/10 rounded-lg border border-white/15">
            <button
              onClick={() => setFrameMode('frame')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                frameMode === 'frame'
                  ? 'bg-white text-[#1F2421] shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Smartphone Frame</span>
            </button>
            <button
              onClick={() => setFrameMode('full')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                frameMode === 'full'
                  ? 'bg-white text-[#1F2421] shadow-xs'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Full-Width App</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Frame Container */}
      <div className={`w-full flex justify-center transition-all duration-300 ${
        frameMode === 'frame' ? 'md:py-8' : 'p-0'
      }`}>
        <div
          className={`w-full bg-white relative transition-all duration-300 flex flex-col ${
            frameMode === 'frame'
              ? 'md:max-w-[430px] md:rounded-[48px] md:border-[10px] md:border-[#1E2320] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] md:overflow-hidden md:min-h-[880px]'
              : 'max-w-2xl min-h-screen shadow-md'
          }`}
        >
          {/* Native Mobile Status Bar (Always on mobile or inside frame) */}
          <MobileStatusBar />

          {/* App Body Content */}
          <div className="flex-1 flex flex-col relative w-full">
            {children}
          </div>

          {/* Native Bottom Home Indicator (Home Bar Pill) */}
          <div className="w-full py-1.5 flex justify-center bg-white shrink-0 pointer-events-none">
            <div className="w-32 h-1 bg-[#1F2421]/60 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
