import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Booking, SpaService, Therapist, UserAddress, BookingStatus } from '../types';
import { INITIAL_USER, INITIAL_BOOKINGS, SPA_SERVICES, THERAPISTS } from '../data/mockData';

interface SpaContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  bookings: Booking[];
  services: SpaService[];
  therapists: Therapist[];
  login: (email: string, password?: string) => boolean;
  loginWithGoogle: (googleUser?: { name: string; email: string; avatarUrl?: string }) => boolean;
  loginWithPhone: (phone: string, name?: string) => boolean;
  loginAsDemoUser: () => boolean;
  register: (name: string, email: string, phone: string) => boolean;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  toggleFavoriteService: (serviceId: string) => void;
  toggleFavoriteTherapist: (therapistId: string) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  removeAddress: (addressId: string) => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>) => Booking;
  cancelBooking: (bookingId: string, reason?: string) => boolean;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => boolean;
  rateBooking: (bookingId: string, rating: number, review: string) => void;
  advanceBookingStatus: (bookingId: string) => BookingStatus;
  getBookingByNumber: (query: string) => Booking | undefined;
  activeBookingToTrack: Booking | null;
  setActiveBookingToTrack: (booking: Booking | null) => void;
  // Quick pre-fill for rebooking
  rebookPreFill: {
    serviceId?: string;
    therapistId?: string;
    duration?: number;
  } | null;
  setRebookPreFill: (data: { serviceId?: string; therapistId?: string; duration?: number } | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY_USER = 'velmora_user_session_v1';
const STORAGE_KEY_BOOKINGS = 'velmora_bookings_v2';

const SpaContext = createContext<SpaContextType | undefined>(undefined);

export const SpaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_USER;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_BOOKINGS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => {
      setToastMessage(null);
    }, 4500);
    return () => clearTimeout(t);
  }, [toastMessage]);

  const [services] = useState<SpaService[]>(SPA_SERVICES);
  const [therapists] = useState<Therapist[]>(THERAPISTS);
  const [activeBookingToTrack, setActiveBookingToTrack] = useState<Booking | null>(() => {
    // Pick the most recent active or en-route booking
    const active = bookings.find(b => b.status === 'en_route' || b.status === 'confirmed');
    return active || bookings[0] || null;
  });

  const [rebookPreFill, setRebookPreFill] = useState<{
    serviceId?: string;
    therapistId?: string;
    duration?: number;
  } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  // Keep active booking in sync with updated status in bookings array
  useEffect(() => {
    if (activeBookingToTrack) {
      const matched = bookings.find(b => b.id === activeBookingToTrack.id);
      if (matched && matched.status !== activeBookingToTrack.status) {
        setActiveBookingToTrack(matched);
      }
    }
  }, [bookings, activeBookingToTrack]);

  // Simulated ETA countdown for en-route booking
  useEffect(() => {
    const timer = setInterval(() => {
      setBookings(prev =>
        prev.map(b => {
          if (b.status === 'en_route' && b.etaMinutes && b.etaMinutes > 2) {
            return { ...b, etaMinutes: b.etaMinutes - 1 };
          }
          if (b.status === 'en_route' && b.etaMinutes && b.etaMinutes <= 2) {
            return { ...b, status: 'in_session', etaMinutes: undefined };
          }
          return b;
        })
      );
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  const loginAsDemoUser = () => {
    setCurrentUser(INITIAL_USER);
    showToast(`Welcome back, ${INITIAL_USER.name}! Your sanctuary dashboard is active.`);
    return true;
  };

  const login = (email: string) => {
    if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
      showToast(`Logged in as ${currentUser.name}`);
      return true;
    }
    const cleanEmail = email.trim();
    const cleanName = cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Spa Guest';
    const newUser: User = {
      ...INITIAL_USER,
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      name: cleanName
    };
    setCurrentUser(newUser);
    showToast(`Welcome to Velmora, ${cleanName}!`);
    return true;
  };

  const loginWithGoogle = (googleUser?: { name: string; email: string; avatarUrl?: string }) => {
    const email = googleUser?.email || 'velmoraspa159@gmail.com';
    const name = googleUser?.name || 'Camilla Montgomery';
    const avatar = googleUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

    const user: User = {
      ...INITIAL_USER,
      email,
      name,
      avatarUrl: avatar,
      id: `usr-google-${Date.now()}`
    };
    setCurrentUser(user);
    showToast(`Signed in with Google as ${name}`);
    return true;
  };

  const loginWithPhone = (phone: string, name?: string) => {
    const formattedPhone = phone.trim();
    const clientName = name?.trim() || 'Sanctuary Member';
    const user: User = {
      ...INITIAL_USER,
      phone: formattedPhone,
      name: clientName,
      id: `usr-phone-${Date.now()}`
    };
    setCurrentUser(user);
    showToast(`Phone verified: Welcome ${clientName}!`);
    return true;
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      membershipTier: 'Silver Sanctuary',
      savedAddresses: [
        {
          id: `addr-${Date.now()}`,
          label: 'Primary Home',
          street: 'Tower 4, The Magnolias, Golf Course Rd',
          city: 'Gurgaon, Delhi NCR',
          state: 'Haryana',
          zip: '122002',
          roomSetup: 'living_room'
        }
      ],
      preferences: {
        preferredPressure: 'moderate',
        organicOilPreference: 'oil-lavender-sandalwood',
        ambientSound: 'nature_stream',
        lightingPreference: 'candlelight_dim'
      },
      favoriteServiceIds: ['serv-deep-balinese'],
      favoriteTherapistIds: ['th-elena'],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    showToast(`Account created! Welcome to Velmora, ${newUser.name}.`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out of Velmora. Safe relaxation!');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
    showToast('Sanctuary profile updated');
  };

  const toggleFavoriteService = (serviceId: string) => {
    if (!currentUser) return;
    const exists = currentUser.favoriteServiceIds.includes(serviceId);
    const updated = exists
      ? currentUser.favoriteServiceIds.filter(id => id !== serviceId)
      : [...currentUser.favoriteServiceIds, serviceId];
    updateUserProfile({ favoriteServiceIds: updated });
    showToast(exists ? 'Removed from favorites' : 'Saved to favorite rituals');
  };

  const toggleFavoriteTherapist = (therapistId: string) => {
    if (!currentUser) return;
    const exists = currentUser.favoriteTherapistIds.includes(therapistId);
    const updated = exists
      ? currentUser.favoriteTherapistIds.filter(id => id !== therapistId)
      : [...currentUser.favoriteTherapistIds, therapistId];
    updateUserProfile({ favoriteTherapistIds: updated });
    showToast(exists ? 'Removed therapist from favorites' : 'Saved therapist to favorites');
  };

  const addAddress = (address: Omit<UserAddress, 'id'>) => {
    if (!currentUser) return;
    const newAddr: UserAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };
    updateUserProfile({
      savedAddresses: [...currentUser.savedAddresses, newAddr]
    });
    showToast(`Saved residence: ${newAddr.label}`);
  };

  const removeAddress = (addressId: string) => {
    if (!currentUser) return;
    updateUserProfile({
      savedAddresses: currentUser.savedAddresses.filter(a => a.id !== addressId)
    });
    showToast('Residence removed');
  };

  const createBooking = (
    bookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>
  ): Booking => {
    const bookingNumber = `VEL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingNumber,
      status: 'en_route',
      createdAt: new Date().toISOString(),
      etaMinutes: 18
    };

    setBookings(prev => [newBooking, ...prev]);
    setActiveBookingToTrack(newBooking);
    showToast(`🎉 Booking #${bookingNumber} Confirmed! Live radar tracking activated.`);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId || b.bookingNumber === bookingId ? { ...b, status: 'cancelled' as BookingStatus } : b))
    );
    showToast('Appointment cancelled. Refund initiated to original payment.');
    return true;
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId || b.bookingNumber === bookingId ? { ...b, date: newDate, timeSlot: newTime, status: 'confirmed' as BookingStatus } : b))
    );
    showToast(`Appointment rescheduled to ${newDate} at ${newTime}!`);
    return true;
  };

  const rateBooking = (bookingId: string, rating: number, review: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId || b.bookingNumber === bookingId ? { ...b, ratingGiven: rating, reviewGiven: review } : b))
    );
    showToast(`Thank you for your ${rating}★ review!`);
  };

  const advanceBookingStatus = (bookingId: string): BookingStatus => {
    const statusCycle: BookingStatus[] = ['confirmed', 'preparing', 'en_route', 'in_session', 'completed'];
    let nextStatus: BookingStatus = 'confirmed';
    
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId || b.bookingNumber === bookingId) {
          const curIdx = statusCycle.indexOf(b.status);
          nextStatus = curIdx >= 0 && curIdx < statusCycle.length - 1 ? statusCycle[curIdx + 1] : statusCycle[0];
          const updatedEta = nextStatus === 'en_route' ? 16 : nextStatus === 'in_session' ? undefined : b.etaMinutes;
          return { ...b, status: nextStatus, etaMinutes: updatedEta };
        }
        return b;
      })
    );
    showToast(`Status updated to: ${nextStatus.replace('_', ' ').toUpperCase()}`);
    return nextStatus;
  };

  const getBookingByNumber = (query: string): Booking | undefined => {
    const clean = query.trim().toLowerCase().replace(/^#/, '');
    if (!clean) return undefined;
    return bookings.find(b => 
      b.bookingNumber.toLowerCase() === clean ||
      b.bookingNumber.toLowerCase() === `vel-${clean}` ||
      b.id.toLowerCase() === clean ||
      b.customerPhone.replace(/\D/g, '').includes(clean.replace(/\D/g, '')) ||
      b.customerEmail.toLowerCase() === clean
    );
  };

  return (
    <SpaContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        bookings,
        services,
        therapists,
        login,
        loginWithGoogle,
        loginWithPhone,
        loginAsDemoUser,
        register,
        logout,
        updateUserProfile,
        toggleFavoriteService,
        toggleFavoriteTherapist,
        addAddress,
        removeAddress,
        createBooking,
        cancelBooking,
        rescheduleBooking,
        rateBooking,
        advanceBookingStatus,
        getBookingByNumber,
        activeBookingToTrack,
        setActiveBookingToTrack,
        rebookPreFill,
        setRebookPreFill,
        toastMessage,
        showToast
      }}
    >
      {children}
    </SpaContext.Provider>
  );
};

export const useSpa = () => {
  const ctx = useContext(SpaContext);
  if (!ctx) throw new Error('useSpa must be used within a SpaProvider');
  return ctx;
};
