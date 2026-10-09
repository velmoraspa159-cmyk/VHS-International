/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SpaProvider, useSpa } from './context/SpaContext';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { MobileAppHeader } from './components/MobileAppHeader';
import { MobileDynamicIsland } from './components/MobileDynamicIsland';
import { MobileQuickActions } from './components/MobileQuickActions';
import { MobileTreatmentCatalog } from './components/MobileTreatmentCatalog';
import { MobileBottomNav, MobileNavTab } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TherapistSection } from './components/TherapistSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PartnerSection } from './components/PartnerSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { UserProfileModal } from './components/UserProfileModal';
import { LiveTrackerModal } from './components/LiveTrackerModal';
import { PartnerFormModal } from './components/PartnerFormModal';
import { AuthModal } from './components/AuthModal';
import { StoryModal } from './components/StoryModal';
import { SearchModal } from './components/SearchModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AromaDiscountModal } from './components/AromaDiscountModal';
import { AndroidInstallBanner } from './components/AndroidInstallBanner';
import { ToastNotification } from './components/ToastNotification';
import { CorporateWellnessPage } from './pages/CorporateWellnessPage';
import { SpaService, Therapist, Booking } from './types';

function SpaAppContent() {
  const { 
    services, therapists, bookings, activeBookingToTrack, 
    currentUser, isLoggedIn 
  } = useSpa();

  // Active Bottom Navigation Tab: 'home' | 'rituals' | 'bookings' | 'radar' | 'profile'
  const [activeTab, setActiveTab] = useState<MobileNavTab>('home');

  // Page view routing: 'home' | 'corporate-wellness'
  const [currentPage, setCurrentPage] = useState<'home' | 'corporate-wellness'>(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('corporate-wellness')) {
      return 'corporate-wellness';
    }
    return 'home';
  });

  // Sync hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('corporate-wellness')) {
        setCurrentPage('corporate-wellness');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToCorporate = () => {
    setCurrentPage('corporate-wellness');
    window.location.hash = '#/corporate-wellness';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modal open states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileTab, setProfileTab] = useState<'history' | 'favorites' | 'profile' | 'addresses'>('profile');
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);

  // Booking selections
  const [selectedBookingForTracker, setSelectedBookingForTracker] = useState<Booking | null>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<SpaService | null>(null);
  const [selectedTherapistIdForBooking, setSelectedTherapistIdForBooking] = useState<string | null>(null);
  const [selectedDurationForBooking, setSelectedDurationForBooking] = useState<number | null>(null);
  const [selectedPromoCodeForBooking, setSelectedPromoCodeForBooking] = useState<string>('AROMA20');

  // Open Tracker Handler
  const handleOpenTracker = (booking?: Booking) => {
    if (booking) {
      setSelectedBookingForTracker(booking);
    } else {
      setSelectedBookingForTracker(activeBookingToTrack || bookings[0] || null);
    }
    setIsTrackerOpen(true);
  };

  // Gently show the Vedic Aroma Discount Modal once after 4.5 seconds for new visitors
  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem('velmora_aroma_discount_seen');
      if (!hasSeen) {
        const timer = setTimeout(() => {
          setIsDiscountOpen(true);
          sessionStorage.setItem('velmora_aroma_discount_seen', 'true');
        }, 4500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore in restricted environments
    }
  }, []);

  // Handlers
  const handleOpenBooking = (service?: SpaService, duration?: number, therapistId?: string, promoCode?: string) => {
    setSelectedServiceForBooking(service || services[0]);
    setSelectedDurationForBooking(duration || null);
    setSelectedTherapistIdForBooking(therapistId || null);
    if (promoCode) setSelectedPromoCodeForBooking(promoCode);
    setIsBookingOpen(true);
  };

  const handleBookWithTherapist = (therapist: Therapist) => {
    setSelectedServiceForBooking(services[0]);
    setSelectedTherapistIdForBooking(therapist.id);
    setSelectedDurationForBooking(90);
    setIsBookingOpen(true);
  };

  const handleOpenProfile = (tab: 'history' | 'favorites' | 'profile' | 'addresses' = 'history') => {
    if (!isLoggedIn) {
      setIsAuthOpen(true);
      return;
    }
    setProfileTab(tab);
    setIsProfileOpen(true);
  };

  const handleBottomTabChange = (tab: MobileNavTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      if (currentPage !== 'home') navigateToHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'rituals') {
      if (currentPage !== 'home') navigateToHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'bookings') {
      handleOpenProfile('history');
    } else if (tab === 'radar') {
      handleOpenTracker();
    } else if (tab === 'profile') {
      handleOpenProfile('profile');
    }
  };

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MobileDeviceFrame>
      <div className="min-h-full bg-white text-[#1F2421] flex flex-col font-sans selection:bg-[#964B59] selection:text-white pb-20">
        
        {/* Real-time Dynamic Toast Notification */}
        <ToastNotification />

        {/* Android PWA Install Banner */}
        <AndroidInstallBanner />

        {/* 1. Simple, Clean & Clear Native Mobile App Header */}
        <MobileAppHeader
          onOpenBooking={() => handleOpenBooking()}
          onOpenProfile={handleOpenProfile}
          onOpenAuth={() => setIsAuthOpen(true)}
          onSearchClick={() => setIsSearchOpen(true)}
        />

        {/* 2. Floating Dynamic Island Widget (When Booking is Active / En Route) */}
        <MobileDynamicIsland onOpenTracker={() => handleOpenTracker()} />

        {/* 3. Native 4-Grid Quick Actions (Book Ritual, Live Radar, Corporate Wellness, Concierge WhatsApp) */}
        <MobileQuickActions
          onOpenBooking={() => handleOpenBooking()}
          onOpenTracker={() => handleOpenTracker()}
          onNavigateCorporate={navigateToCorporate}
        />

        {/* Main View: Switch between Home Feed, Rituals Catalog, and Corporate Wellness Page */}
        {currentPage === 'corporate-wellness' ? (
          <CorporateWellnessPage
            onBackToHome={navigateToHome}
            onOpenBooking={() => handleOpenBooking()}
          />
        ) : activeTab === 'rituals' ? (
          /* Native Rituals Catalog View with Category Pill Slider & Instant 1-Tap Booking */
          <main className="flex-1">
            <div className="px-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-normal text-[#1F2421]">
                    Home Spa Catalog
                  </h2>
                  <p className="text-xs text-[#7C8880]">
                    Select a treatment to schedule therapist arrival
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('home')}
                  className="text-xs text-[#964B59] font-semibold underline cursor-pointer"
                >
                  Back to Home
                </button>
              </div>
            </div>
            <MobileTreatmentCatalog onBookService={(s) => handleOpenBooking(s)} />
          </main>
        ) : (
          <main className="flex-1">
            {/* 1. Hero Section: "A Calmer You, A Brighter Tomorrow" with quick booking CTA & live arrival tracker */}
            <Hero
              onStartBooking={() => handleOpenBooking()}
              onWatchStory={() => setIsStoryOpen(true)}
              onOpenTracker={() => handleOpenTracker()}
            />

            {/* 2. Services Section: "Spa Experiences for Mind, Body & Soul" with treatment cards */}
            <ServicesGrid
              onBookService={(s) => handleOpenBooking(s)}
              onViewAllClick={() => setActiveTab('rituals')}
            />

            {/* 3. Why Choose Us Section: "More Than a Spa, A Better You" with ambient lounge photo & 4 feature rows */}
            <WhyChooseUs
              onOurStoryClick={() => setIsStoryOpen(true)}
            />

            {/* 4. Certified Master Therapists Directory */}
            <TherapistSection
              onBookWithTherapist={handleBookWithTherapist}
            />

            {/* 5. What Our Guests Say: "Real People. Real Relaxation." with reviews */}
            <TestimonialsSection />

            {/* 6. Partner With Us: Google Form Embed for Visiting Specialists */}
            <PartnerSection
              onOpenPartnerModal={() => setIsPartnerOpen(true)}
            />

            {/* 7. Bottom CTA Banner: "Self Care is a Better Tomorrow / Book Your Relaxation Today" */}
            <CtaBanner
              onBookAppointment={() => handleOpenBooking()}
              onOpenGiftCards={() => handleOpenBooking(services[0], 90)}
            />

            {/* 8. Footer with official helpline, hubs, and international presence */}
            <Footer
              onOpenBooking={() => handleOpenBooking()}
              onOpenProfile={handleOpenProfile}
              onOpenPartner={() => setIsPartnerOpen(true)}
              onOpenStory={() => setIsStoryOpen(true)}
              onNavigateToSection={scrollToSection}
              onNavigateToCorporate={navigateToCorporate}
            />
          </main>
        )}

        {/* FLOATING WHATSAPP BUTTON: Redirects with prefilled tag to +91 99127 06021 */}
        <WhatsAppWidget />

        {/* NATIVE MOBILE BOTTOM NAVIGATION BAR: Home · Rituals · Center Book · Radar · Account */}
        <MobileBottomNav
          currentTab={activeTab}
          onTabChange={handleBottomTabChange}
          onOpenBooking={() => handleOpenBooking()}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        {/* BOTTOM SHEET 1: Partner Application Form */}
        <PartnerFormModal
          isOpen={isPartnerOpen}
          onClose={() => setIsPartnerOpen(false)}
        />

        {/* BOTTOM SHEET 2: User Signup / Login via 1-Click Demo, Google & Mobile Number OTP */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={() => {
            setIsProfileOpen(true);
          }}
        />

        {/* BOTTOM SHEET 3: Interactive Multi-Step Home Booking Wizard & Secure Payment Gateway */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialService={selectedServiceForBooking}
          initialTherapistId={selectedTherapistIdForBooking}
          initialDuration={selectedDurationForBooking}
          initialPromoCode={selectedPromoCodeForBooking}
          onBookingCompleted={(booking) => {
            setSelectedBookingForTracker(booking);
            setIsTrackerOpen(true);
          }}
        />

        {/* BOTTOM SHEET 4: User Profile System (History, Favorites, Addresses, Preferences) */}
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          initialTab={profileTab}
          onRebook={(service, dur, thId) => handleOpenBooking(service, dur, thId)}
          onTrackBooking={(b) => {
            setIsProfileOpen(false);
            setSelectedBookingForTracker(b);
            setIsTrackerOpen(true);
          }}
        />

        {/* BOTTOM SHEET 5: Live Therapist Arrival Radar Modal */}
        <LiveTrackerModal
          isOpen={isTrackerOpen}
          booking={selectedBookingForTracker || activeBookingToTrack || bookings[0]}
          onClose={() => setIsTrackerOpen(false)}
          onRebook={(service, dur, thId) => handleOpenBooking(service, dur, thId)}
        />

        {/* BOTTOM SHEET 6: Watch Our Story Video / Heritage Modal */}
        <StoryModal
          isOpen={isStoryOpen}
          onClose={() => setIsStoryOpen(false)}
          onBookNow={() => handleOpenBooking()}
        />

        {/* BOTTOM SHEET 7: Search Treatments Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectService={(s) => handleOpenBooking(s)}
        />

        {/* BOTTOM SHEET 8: Vedic Aroma & Ayurveda Style Discount Pop-up Form */}
        <AromaDiscountModal
          isOpen={isDiscountOpen}
          onClose={() => setIsDiscountOpen(false)}
          onApplyAndBook={(promoCode) => {
            setSelectedPromoCodeForBooking(promoCode);
            handleOpenBooking(undefined, undefined, undefined, promoCode);
          }}
        />

      </div>
    </MobileDeviceFrame>
  );
}

export default function App() {
  return (
    <SpaProvider>
      <SpaAppContent />
    </SpaProvider>
  );
}
