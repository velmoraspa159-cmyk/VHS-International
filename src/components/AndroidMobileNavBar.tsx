import React from 'react';
import { useSpa } from '../context/SpaContext';
import { Home, Sparkles, Calendar, Building2, User, LogIn, Clock } from 'lucide-react';

interface AndroidMobileNavBarProps {
  currentPage: 'home' | 'corporate-wellness';
  onNavigateHome: () => void;
  onNavigateServices: () => void;
  onNavigateCorporate: () => void;
  onOpenBooking: () => void;
  onOpenProfile: (tab?: 'history' | 'profile') => void;
  onOpenAuth: () => void;
  onOpenTracker?: () => void;
}

export const AndroidMobileNavBar: React.FC<AndroidMobileNavBarProps> = ({
  currentPage,
  onNavigateHome,
  onNavigateServices,
  onNavigateCorporate,
  onOpenBooking,
  onOpenProfile,
  onOpenAuth,
  onOpenTracker
}) => {
  const { isLoggedIn, currentUser, bookings } = useSpa();
  const enRouteBooking = bookings.find(b => b.status === 'en_route');

  return (
    <nav 
      aria-label="Mobile Android App Navigation" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-lg border-t border-[#EAE3DE] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        
        {/* 1. Home */}
        <button
          onClick={onNavigateHome}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
            currentPage === 'home' ? 'text-[#8E4A56]' : 'text-[#7C8880] hover:text-[#1F2421]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Home</span>
          {currentPage === 'home' && (
            <span className="w-1 h-1 rounded-full bg-[#8E4A56] mt-0.5" />
          )}
        </button>

        {/* 2. Track / Live Radar (or Services) */}
        {onOpenTracker ? (
          <button
            onClick={onOpenTracker}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer relative ${
              enRouteBooking ? 'text-[#2D4A3E] font-bold' : 'text-[#7C8880] hover:text-[#1F2421]'
            }`}
          >
            <Clock className={`w-5 h-5 mb-0.5 ${enRouteBooking ? 'text-[#2D4A3E] animate-pulse' : ''}`} />
            <span className="text-[10px] font-medium tracking-tight">
              {enRouteBooking ? 'Radar' : 'Track'}
            </span>
            {enRouteBooking && (
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#34A853] animate-ping" />
            )}
          </button>
        ) : (
          <button
            onClick={onNavigateServices}
            className="flex flex-col items-center justify-center flex-1 py-1 text-[#7C8880] hover:text-[#1F2421] transition-colors cursor-pointer"
          >
            <Sparkles className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium tracking-tight">Rituals</span>
          </button>
        )}

        {/* 3. Central Prominent Elevated Action Button: Book Now */}
        <div className="flex-1 flex justify-center -mt-5">
          <button
            onClick={onOpenBooking}
            className="w-13 h-13 rounded-full bg-[#1F2B24] hover:bg-[#141C18] text-white flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer border-2 border-white ring-2 ring-[#8E4A56]/20"
            title="Book a Home Spa Ritual"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">Book</span>
          </button>
        </div>

        {/* 4. Corporate Wellness */}
        <button
          onClick={onNavigateCorporate}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
            currentPage === 'corporate-wellness' ? 'text-[#8E4A56]' : 'text-[#7C8880] hover:text-[#1F2421]'
          }`}
        >
          <Building2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Corporate</span>
          {currentPage === 'corporate-wellness' && (
            <span className="w-1 h-1 rounded-full bg-[#8E4A56] mt-0.5" />
          )}
        </button>

        {/* 5. Account / My Bookings (Only shows bookings if signed in!) */}
        {isLoggedIn ? (
          <button
            onClick={() => onOpenProfile('history')}
            className="flex flex-col items-center justify-center flex-1 py-1 text-[#7C8880] hover:text-[#8E4A56] transition-colors cursor-pointer relative"
          >
            <div className="relative">
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 mb-0.5" />
              )}
              {bookings.length > 0 && (
                <span className="absolute -top-1 -right-2 px-1 text-[9px] font-mono font-bold bg-[#8E4A56] text-white rounded-full">
                  {bookings.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-tight">Bookings</span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex flex-col items-center justify-center flex-1 py-1 text-[#7C8880] hover:text-[#8E4A56] transition-colors cursor-pointer"
          >
            <LogIn className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium tracking-tight">Sign In</span>
          </button>
        )}

      </div>
    </nav>
  );
};
