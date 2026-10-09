import React from 'react';
import { useSpa } from '../context/SpaContext';
import { Navigation, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

interface MobileDynamicIslandProps {
  onOpenTracker: () => void;
}

export const MobileDynamicIsland: React.FC<MobileDynamicIslandProps> = ({ onOpenTracker }) => {
  const { bookings } = useSpa();

  // Find en-route or confirmed booking
  const activeBooking = bookings.find(b => b.status === 'en_route' || b.status === 'confirmed');

  if (!activeBooking) return null;

  const isEnRoute = activeBooking.status === 'en_route';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 animate-in slide-in-from-top-2 duration-300">
      <button
        onClick={onOpenTracker}
        className="w-full bg-[#1F2B24] text-white p-2.5 rounded-2xl shadow-lg border border-white/10 flex items-center justify-between text-xs cursor-pointer active:scale-98 transition-all hover:bg-[#151E19]"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 rounded-full bg-[#2D4A3E] flex items-center justify-center shrink-0">
            {isEnRoute ? (
              <Navigation className="w-4 h-4 text-[#C2D6C8] animate-pulse" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-[#C2D6C8]" />
            )}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#34A853] ring-2 ring-[#1F2B24] animate-ping" />
          </div>

          <div className="text-left truncate">
            <div className="font-semibold text-white flex items-center gap-1.5 truncate">
              <span>{isEnRoute ? `🚗 ${activeBooking.therapistName} En Route` : 'Sanctuary Kit Reserved'}</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
                #{activeBooking.bookingNumber}
              </span>
            </div>
            <div className="text-[11px] text-[#A2B5A8] truncate">
              {isEnRoute ? `Arriving in ~${activeBooking.etaMinutes || 18}m · Tap to view live radar` : `${activeBooking.service.title} (${activeBooking.selectedDuration}m)`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#E0B0B8] shrink-0 font-medium text-[11px] pl-2">
          <span>Live Radar</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
