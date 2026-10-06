import React from 'react';
import { Calendar, Users, Flower2, Sparkles, ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  onBookAppointment: () => void;
  onOpenGiftCards: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onBookAppointment, onOpenGiftCards }) => {
  return (
    <section className="bg-[#1C2C24] text-white py-14 sm:py-16 relative overflow-hidden">
      {/* Subtle organic leaves background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FAF9F5_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-white/15">
          
          {/* Headline & Kicker */}
          <div className="text-center lg:text-left space-y-2">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#C2D4C8] font-medium">
              Self Care is a Better Tomorrow
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight">
              Book Your Relaxation Today
            </h2>
            <p className="text-xs sm:text-sm text-[#AABDB2]">
              Take a break. You deserve it.
            </p>
          </div>

          {/* Button matching image.png */}
          <div>
            <button
              onClick={onBookAppointment}
              className="px-8 py-3.5 bg-white hover:bg-[#F2ECE8] text-[#1C2C24] text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>Book an Appointment</span>
              <span className="text-base leading-none transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

        </div>

        {/* 3 Bottom Icons matching image.png */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 text-center sm:text-left">
          
          <button
            onClick={onOpenGiftCards}
            className="flex items-center justify-center sm:justify-start gap-3 text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#D99B9B]">
              <Calendar className="w-4 h-4 stroke-[1.8]" />
            </div>
            <span className="text-xs sm:text-sm font-medium">
              Gift Cards Available
            </span>
          </button>

          <button
            onClick={onBookAppointment}
            className="flex items-center justify-center sm:justify-start gap-3 text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#D99B9B]">
              <Users className="w-4 h-4 stroke-[1.8]" />
            </div>
            <span className="text-xs sm:text-sm font-medium">
              Group & Couples Bookings
            </span>
          </button>

          <button
            onClick={onBookAppointment}
            className="flex items-center justify-center sm:justify-start gap-3 text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#D99B9B]">
              <Flower2 className="w-4 h-4 stroke-[1.8]" />
            </div>
            <span className="text-xs sm:text-sm font-medium">
              Special Custom Packages
            </span>
          </button>

        </div>

      </div>
    </section>
  );
};
