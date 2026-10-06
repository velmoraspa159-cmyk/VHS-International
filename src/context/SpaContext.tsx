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
  activeBookingToTrack: Booking | null;
  setActiveBookingToTrack: (booking: Booking | null) => void;
  // Quick pre-fill for rebooking
  rebookPreFill: {
    serviceId?: string;
    therapistId?: string;
    duration?: number;
  } | null;
  setRebookPreFill: (data: { serviceId?: string; therapistId?: string; duration?: number } | null) => void;
}

const STORAGE_KEY_USER = 'velmora_user_session_v1';
const STORAGE_KEY_BOOKINGS = 'velmora_bookings_v1';

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

  const [services] = useState<SpaService[]>(SPA_SERVICES);
  const [therapists] = useState<Therapist[]>(THERAPISTS);
  const [activeBookingToTrack, setActiveBookingToTrack] = useState<Booking | null>(() => {
    // Pick the most recent active or en-route booking
    const active = INITIAL_BOOKINGS.find(b => b.status === 'en_route' || b.status === 'confirmed');
    return active || null;
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
    }, 45000); // realistic countdown ticker
    return () => clearInterval(timer);
  }, []);

  const login = (email: string) => {
    if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
      return true;
    }
    // Create or find user
    const newUser: User = {
      ...INITIAL_USER,
      email: email.trim(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Spa Guest'
    };
    setCurrentUser(newUser);
    return true;
  };

  const loginWithGoogle = (googleUser?: { name: string; email: string; avatarUrl?: string }) => {
    const email = googleUser?.email || 'velmoraspa159@gmail.com';
    const name = googleUser?.name || 'Velmora Member';
    const avatar = googleUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

    const user: User = {
      ...INITIAL_USER,
      email,
      name,
      avatarUrl: avatar,
      id: `usr-google-${Date.now()}`
    };
    setCurrentUser(user);
    return true;
  };

  const loginWithPhone = (phone: string, name?: string) => {
    const formattedPhone = phone.trim();
    const user: User = {
      ...INITIAL_USER,
      phone: formattedPhone,
      name: name?.trim() || currentUser?.name || 'Sanctuary Guest',
      id: `usr-phone-${Date.now()}`
    };
    setCurrentUser(user);
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
          street: '725 5th Ave',
          city: 'New York',
          state: 'NY',
          zip: '10022',
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
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const toggleFavoriteService = (serviceId: string) => {
    if (!currentUser) return;
    const exists = currentUser.favoriteServiceIds.includes(serviceId);
    const updated = exists
      ? currentUser.favoriteServiceIds.filter(id => id !== serviceId)
      : [...currentUser.favoriteServiceIds, serviceId];
    updateUserProfile({ favoriteServiceIds: updated });
  };

  const toggleFavoriteTherapist = (therapistId: string) => {
    if (!currentUser) return;
    const exists = currentUser.favoriteTherapistIds.includes(therapistId);
    const updated = exists
      ? currentUser.favoriteTherapistIds.filter(id => id !== therapistId)
      : [...currentUser.favoriteTherapistIds, therapistId];
    updateUserProfile({ favoriteTherapistIds: updated });
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
  };

  const removeAddress = (addressId: string) => {
    if (!currentUser) return;
    updateUserProfile({
      savedAddresses: currentUser.savedAddresses.filter(a => a.id !== addressId)
    });
  };

  const createBooking = (
    bookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>
  ): Booking => {
    const bookingNumber = `VEL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingNumber,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      etaMinutes: 45
    };

    setBookings(prev => [newBooking, ...prev]);
    setActiveBookingToTrack(newBooking);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' as BookingStatus } : b))
    );
    return true;
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, date: newDate, timeSlot: newTime, status: 'confirmed' as BookingStatus } : b))
    );
    return true;
  };

  const rateBooking = (bookingId: string, rating: number, review: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, ratingGiven: rating, reviewGiven: review } : b))
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
        activeBookingToTrack,
        setActiveBookingToTrack,
        rebookPreFill,
        setRebookPreFill
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
