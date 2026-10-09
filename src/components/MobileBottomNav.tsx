import React from 'react';
import { useSpa } from '../context/SpaContext';
import { Home, Sparkles, Calendar, Clock, User, LogIn } from 'lucide-react';

export type MobileNavTab = 'home' | 'rituals' | 'bookings' | 'radar' | 'profile';

interface MobileBottomNavProps {
  currentTab: MobileNavTab;
  onTabChange: (tab: MobileNavTab) => void;
  onOpenBooking: () => void;
  onOpenAuth: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenBooking,
  onOpenAuth
}) => {
  const { isLoggedIn, currentUser, bookings } = useSpa();
  const enRouteBooking = bookings.find(b => b.status === 'en_route');

  return (
    <nav
      aria-label="Mobile Bottom App Bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-t border-[#EAE3DE] shadow-[0_-4px_25px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto relative">
        
        {/* 1. Home Tab */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer active:scale-90 ${
            currentTab === 'home' ? 'text-[#964B59]' : 'text-[#7C8880] hover:text-[#1F2421]'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${currentTab === 'home' ? 'stroke-[2.4]' : ''}`} />
          <span className="text-[10px] font-semibold tracking-tight">Home</span>
          {currentTab === 'home' && (
            <span className="w-1 h-1 rounded-full bg-[#964B59] mt-0.5" />
          )}
        </button>

        {/* 2. Rituals Catalog Tab */}
        <button
          onClick={() => onTabChange('rituals')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer active:scale-90 ${
            currentTab === 'rituals' ? 'text-[#964B59]' : 'text-[#7C8880] hover:text-[#1F2421]'
          }`}
        >
          <Sparkles className={`w-5 h-5 mb-0.5 ${currentTab === 'rituals' ? 'stroke-[2.4]' : ''}`} />
          <span className="text-[10px] font-semibold tracking-tight">Rituals</span>
          {currentTab === 'rituals' && (
            <span className="w-1 h-1 rounded-full bg-[#964B59] mt-0.5" />
          )}
        </button>

        {/* 3. Central Elevated Action: Instant Book Now */}
        <div className="flex-1 flex justify-center -mt-6">
          <button
            onClick={onOpenBooking}
            className="w-14 h-14 rounded-full bg-radial from-[#1F2B24] to-[#121B16] text-white flex flex-col items-center justify-center shadow-xl active:scale-90 transition-transform cursor-pointer border-3 border-white ring-3 ring-[#964B59]/25 group"
            title="Book a Home Spa Ritual"
          >
            <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">Book</span>
          </button>
        </div>

        {/* 4. Live Radar Tab */}
        <button
          onClick={() => onTabChange('radar')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer active:scale-90 relative ${
            currentTab === 'radar' ? 'text-[#2D4A3E] font-bold' : 'text-[#7C8880] hover:text-[#1F2421]'
          }`}
        >
          <div className="relative">
            <Clock className={`w-5 h-5 mb-0.5 ${currentTab === 'radar' ? 'stroke-[2.4]' : ''}`} />
            {enRouteBooking && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#34A853] ring-2 ring-white animate-ping" />
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Radar</span>
          {currentTab === 'radar' && (
            <span className="w-1 h-1 rounded-full bg-[#2D4A3E] mt-0.5" />
          )}
        </button>

        {/* 5. Account / Bookings Tab */}
        {isLoggedIn ? (
          <button
            onClick={() => onTabChange('profile')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer active:scale-90 relative ${
              currentTab === 'profile' || currentTab === 'bookings' ? 'text-[#964B59]' : 'text-[#7C8880] hover:text-[#1F2421]'
            }`}
          >
            <div className="relative">
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover border border-[#964B59]"
                />
              ) : (
                <User className="w-5 h-5 mb-0.5" />
              )}
              {bookings.length > 0 && (
                <span className="absolute -top-1 -right-2 px-1 text-[9px] font-mono font-bold bg-[#964B59] text-white rounded-full">
                  {bookings.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold tracking-tight">Account</span>
            {(currentTab === 'profile' || currentTab === 'bookings') && (
              <span className="w-1 h-1 rounded-full bg-[#964B59] mt-0.5" />
            )}
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex flex-col items-center justify-center flex-1 py-1 text-[#7C8880] hover:text-[#964B59] transition-all cursor-pointer active:scale-90"
          >
            <LogIn className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Sign In</span>
          </button>
        )}

      </div>
    </nav>
  );
};
