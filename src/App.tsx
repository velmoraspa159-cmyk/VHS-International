/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SpaProvider, useSpa } from './context/SpaContext';
import { Navbar } from './components/Navbar';
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
import { CorporateWellnessPage } from './pages/CorporateWellnessPage';
import { SpaService, Therapist, Booking } from './types';

function SpaAppContent() {
  const { 
    services, therapists, bookings, activeBookingToTrack, 
    setActiveBookingToTrack, currentUser, isLoggedIn 
  } = useSpa();

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
  const [profileTab, setProfileTab] = useState<'history' | 'favorites' | 'profile' | 'addresses'>('history');
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Booking selections
  const [selectedBookingForTracker, setSelectedBookingForTracker] = useState<Booking | null>(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<SpaService | null>(null);
  const [selectedTherapistIdForBooking, setSelectedTherapistIdForBooking] = useState<string | null>(null);
  const [selectedDurationForBooking, setSelectedDurationForBooking] = useState<number | null>(null);

  // Handlers
  const handleOpenBooking = (service?: SpaService, duration?: number, therapistId?: string) => {
    setSelectedServiceForBooking(service || services[0]);
    setSelectedDurationForBooking(duration || null);
    setSelectedTherapistIdForBooking(therapistId || null);
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
    <div className="min-h-screen bg-[#FAF7F5] text-[#1F2421] flex flex-col font-sans selection:bg-[#964B59] selection:text-white">
      
      {/* Simple Header with Corporate link and official contact */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenProfile={handleOpenProfile}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenPartner={() => setIsPartnerOpen(true)}
        onOpenStory={() => setIsStoryOpen(true)}
        onNavigateToSection={scrollToSection}
        onNavigateToCorporate={navigateToCorporate}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main View: Switch between Home Page and Dedicated Corporate Wellness Page */}
      {currentPage === 'corporate-wellness' ? (
        <CorporateWellnessPage
          onBackToHome={navigateToHome}
          onOpenBooking={() => handleOpenBooking()}
        />
      ) : (
        <main className="flex-1">
          {/* 1. Hero Section: "A Calmer You, A Brighter Tomorrow" with 4 trust counters & serene imagery */}
          <Hero
            onStartBooking={() => handleOpenBooking()}
            onWatchStory={() => setIsStoryOpen(true)}
          />

          {/* 2. Services Section: "Spa Experiences for Mind, Body & Soul" with 6 cards */}
          <ServicesGrid
            onBookService={(s) => handleOpenBooking(s)}
            onViewAllClick={() => scrollToSection('services')}
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

          {/* 6. Partner With Us: Google Form Embed for Home Spa Visitors */}
          <PartnerSection
            onOpenPartnerModal={() => setIsPartnerOpen(true)}
          />

          {/* 7. Bottom CTA Banner: "Self Care is a Better Tomorrow / Book Your Relaxation Today" */}
          <CtaBanner
            onBookAppointment={() => handleOpenBooking()}
            onOpenGiftCards={() => handleOpenBooking(services[0], 90)}
          />
        </main>
      )}

      {/* 8. Footer matching reference layout */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenProfile={handleOpenProfile}
        onOpenPartner={() => setIsPartnerOpen(true)}
        onOpenStory={() => setIsStoryOpen(true)}
        onNavigateToSection={scrollToSection}
        onNavigateToCorporate={navigateToCorporate}
      />

      {/* FLOATING WHATSAPP BUTTON: Redirects with prefilled tag to +91 99127 06021 */}
      <WhatsAppWidget />

      {/* MODAL 1: Google Form for Partners / Home Spa Visitors */}
      <PartnerFormModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />

      {/* MODAL 2: User Signup / Login via Google and Mobile Number OTP */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setIsProfileOpen(true);
        }}
      />

      {/* MODAL 3: Interactive Multi-Step Home Booking Wizard & Secure Payment Gateway */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedServiceForBooking}
        initialTherapistId={selectedTherapistIdForBooking}
        initialDuration={selectedDurationForBooking}
        onBookingCompleted={(booking) => {
          setSelectedBookingForTracker(booking);
          setIsTrackerOpen(true);
        }}
      />

      {/* MODAL 4: User Profile System (History, Favorites, Addresses, Preferences) */}
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

      {/* MODAL 5: Live Therapist Arrival Radar Modal */}
      <LiveTrackerModal
        isOpen={isTrackerOpen}
        booking={selectedBookingForTracker || activeBookingToTrack || bookings[0]}
        onClose={() => setIsTrackerOpen(false)}
      />

      {/* MODAL 6: Watch Our Story Video / Heritage Modal */}
      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        onBookNow={() => handleOpenBooking()}
      />

      {/* MODAL 7: Search Treatments Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectService={(s) => handleOpenBooking(s)}
      />

    </div>
  );
}

export default function App() {
  return (
    <SpaProvider>
      <SpaAppContent />
    </SpaProvider>
  );
}
