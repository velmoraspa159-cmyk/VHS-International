import React, { useState } from 'react';
import { useSpa } from '../context/SpaContext';
import { VelmoraLogo } from './VelmoraLogo';
import { 
  Search, Calendar, User, LogIn, Menu, X, 
  Building2, Sparkles, Clock, Navigation 
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenProfile: (tab?: 'history' | 'favorites' | 'profile' | 'addresses') => void;
  onOpenAuth: () => void;
  onOpenPartner: () => void;
  onOpenStory: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToCorporate: () => void;
  onSearchClick: () => void;
  onOpenTracker: () => void;
  onOpenDiscount?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenProfile,
  onOpenAuth,
  onOpenPartner,
  onOpenStory,
  onNavigateToSection,
  onNavigateToCorporate,
  onSearchClick,
  onOpenTracker,
  onOpenDiscount
}) => {
  const { currentUser, isLoggedIn, bookings } = useSpa();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if there is an active en-route appointment
  const enRouteBooking = bookings.find(b => b.status === 'en_route');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE3DE] transition-colors">
      
      {/* Main Simple Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Authentic Velmora Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center cursor-pointer"
        >
          <VelmoraLogo size="md" />
        </a>

        {/* Center: Clean Simple Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs uppercase tracking-wider font-medium text-[#4A5550]">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#964B59] font-semibold border-b-2 border-[#964B59] pb-0.5"
          >
            Home
          </a>
          <button
            onClick={onOpenStory}
            className="hover:text-[#964B59] transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => onNavigateToSection('services')}
            className="hover:text-[#964B59] transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={onNavigateToCorporate}
            className="text-[#964B59] hover:text-[#7D3B47] transition-colors cursor-pointer font-bold flex items-center gap-1"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Wellness</span>
          </button>
          <button
            onClick={onOpenPartner}
            className="hover:text-[#964B59] transition-colors cursor-pointer flex items-center gap-1 font-semibold text-[#525E57]"
          >
            <span>Partner With Us</span>
          </button>
        </nav>

        {/* Right: Search, Auth, and Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            aria-label="Search rituals"
            className="p-2 text-[#4A5550] hover:text-[#964B59] rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User Sign In / Profile Button */}
          {isLoggedIn ? (
            <button
              onClick={() => onOpenProfile('profile')}
              className="inline-flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 text-xs font-medium text-[#1F2421] hover:bg-neutral-100 rounded-full transition-colors border border-[#E5E0D6] cursor-pointer"
              title="Open Account Profile"
            >
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#964B59] text-white flex items-center justify-center font-serif text-xs font-bold">
                  {currentUser?.name.charAt(0) || 'U'}
                </div>
              )}
              <span className="hidden sm:inline-block max-w-[100px] truncate">
                {currentUser?.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#964B59] hover:bg-[#FAF4F5] rounded-full border border-[#F0D5DA] transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Primary Action "Book an Appointment ->" */}
          <button
            onClick={onOpenBooking}
            className="px-3.5 sm:px-5 py-2.5 bg-[#1F2B24] hover:bg-[#141C18] text-[#FAF9F5] text-xs font-medium rounded-full shadow-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Book Now</span>
            <span className="text-sm leading-none">→</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A5550] hover:text-[#1F2421] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAE3DE] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="block w-full text-left py-2 text-xs uppercase font-semibold text-[#964B59]"
          >
            Home
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigateToCorporate(); }}
            className="block w-full text-left py-2 text-xs uppercase font-bold text-[#964B59] bg-[#FAF4F5] px-2 rounded"
          >
            Corporate Wellness Program
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenStory(); }}
            className="block w-full text-left py-2 text-xs uppercase font-medium text-[#4A5550]"
          >
            About & Story
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onNavigateToSection('services'); }}
            className="block w-full text-left py-2 text-xs uppercase font-medium text-[#4A5550]"
          >
            Services & Rituals
          </button>

          <div className="pt-3 border-t border-[#EAE3DE] flex flex-col gap-2">
            {!isLoggedIn ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 bg-[#FAF4F5] text-[#964B59] text-xs font-semibold rounded-lg text-center"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenProfile('profile'); }}
                className="w-full py-2.5 bg-[#FAF4F5] text-[#964B59] text-xs font-semibold rounded-lg text-center"
              >
                Logged in as {currentUser?.name}
              </button>
            )}

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full py-2.5 bg-[#1F2B24] text-white text-xs font-medium rounded-lg text-center"
            >
              Book an Appointment →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

