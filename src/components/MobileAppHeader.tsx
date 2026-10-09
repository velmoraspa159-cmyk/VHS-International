import React from 'react';
import { useSpa } from '../context/SpaContext';
import { VelmoraLogo } from './VelmoraLogo';
import { Search, LogIn, Calendar } from 'lucide-react';

interface MobileAppHeaderProps {
  onOpenBooking: () => void;
  onOpenProfile: (tab?: 'profile') => void;
  onOpenAuth: () => void;
  onSearchClick: () => void;
}

export const MobileAppHeader: React.FC<MobileAppHeaderProps> = ({
  onOpenBooking,
  onOpenProfile,
  onOpenAuth,
  onSearchClick
}) => {
  const { currentUser, isLoggedIn } = useSpa();

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-[#EAE3DE] sticky top-0 z-40 transition-colors">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Clean Simple Authentic Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center cursor-pointer select-none"
        >
          <VelmoraLogo size="sm" />
        </a>

        {/* Right: Simple, Clean & Clear Actions (Search, Sign In/Profile, Book) */}
        <div className="flex items-center gap-2">
          {/* Clean Search Trigger */}
          <button
            onClick={onSearchClick}
            aria-label="Search rituals"
            className="p-2 text-[#4A5550] hover:text-[#964B59] rounded-full hover:bg-[#FAF7F5] transition-colors cursor-pointer active:scale-95"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User Profile Avatar / Sign In */}
          {isLoggedIn ? (
            <button
              onClick={() => onOpenProfile('profile')}
              className="flex items-center gap-1.5 cursor-pointer active:scale-95 focus:outline-hidden"
              title="Open Account Profile"
            >
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#964B59]/30"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#964B59] text-white flex items-center justify-center font-serif text-xs font-bold shadow-2xs">
                  {currentUser?.name.charAt(0) || 'U'}
                </div>
              )}
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF4F5] hover:bg-[#F2E5E8] text-[#964B59] text-xs font-semibold rounded-full border border-[#F0D5DA] cursor-pointer active:scale-95 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Simple Clean Book CTA */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1 px-3.5 py-1.5 bg-[#1F2B24] hover:bg-[#141C18] text-white text-xs font-medium rounded-full shadow-2xs cursor-pointer active:scale-95 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book</span>
          </button>
        </div>
      </div>
    </header>
  );
};
