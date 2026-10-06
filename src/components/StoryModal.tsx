import React from 'react';
import { VelmoraLogo } from './VelmoraLogo';
import { X, Play, ShieldCheck, Heart, Sparkles, Feather, Clock } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose, onBookNow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-[#E5E0D6] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-[#FAF7F5] border-b border-[#EAE3DE] flex items-center justify-between">
          <VelmoraLogo size="sm" />
          <button
            onClick={onClose}
            className="p-1.5 text-[#7C8880] hover:text-[#1F2421] rounded-full hover:bg-[#EFECE6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Visual Video Cover */}
          <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-black shadow-md group">
            <img
              src="/src/assets/images/hero_woman_spa_relaxation_1791267269523.jpg"
              alt="Velmora Spa Story"
              className="w-full h-full object-cover opacity-85 group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-xs text-[#964B59] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-4 text-white text-xs font-serif italic text-lg drop-shadow">
              "The Art of Tranquil Home Sanctuary"
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-2xl text-[#1F2421] font-medium">
              Our Journey Since 2014
            </h3>
            <p className="text-xs sm:text-sm text-[#525E57] leading-relaxed">
              Founded in 2014, Velmora was born from a simple belief: true relaxation should never require navigating congested traffic, hunting for parking, or losing your peaceful state on the commute back home.
            </p>
            <p className="text-xs sm:text-sm text-[#525E57] leading-relaxed">
              We bring the five-star sanctuary directly to you. Our certified master bodyworkers arrive fully equipped with heated memory-foam treatment tables, pure Egyptian cotton linens, Himalayan basalt stones, and cold-pressed wildcraft botanical elixirs.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#EAE3DE] text-xs space-y-1">
              <div className="font-semibold text-[#1F2421] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#964B59]" />
                <span>100% Vetted</span>
              </div>
              <p className="text-[#637068] text-[11px]">
                Every therapist is state licensed with continuous background audits.
              </p>
            </div>

            <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#EAE3DE] text-xs space-y-1">
              <div className="font-semibold text-[#1F2421] flex items-center gap-1.5">
                <Feather className="w-4 h-4 text-[#964B59]" />
                <span>Zero Prep</span>
              </div>
              <p className="text-[#637068] text-[11px]">
                We supply everything. You only need a small quiet room.
              </p>
            </div>

            <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#EAE3DE] text-xs space-y-1">
              <div className="font-semibold text-[#1F2421] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#964B59]" />
                <span>On-Demand</span>
              </div>
              <p className="text-[#637068] text-[11px]">
                Book in as fast as 60 mins or reserve your favorite date in advance.
              </p>
            </div>
          </div>

        </div>

        <div className="p-4 bg-[#FAF7F5] border-t border-[#EAE3DE] flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-[#7C8880] hover:text-[#1F2421] px-3 py-2 cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookNow();
            }}
            className="px-5 py-2.5 bg-[#1F2B24] hover:bg-[#141C18] text-white text-xs font-medium rounded-full shadow-xs transition-colors cursor-pointer"
          >
            Book an Appointment Now →
          </button>
        </div>
      </div>
    </div>
  );
};
