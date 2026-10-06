export interface UserAddress {
  id: string;
  label: string; // e.g., 'Primary Residence', 'Penthouse Suite', 'Vacation Villa'
  street: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  gateCode?: string;
  parkingNotes?: string;
  roomSetup: 'living_room' | 'master_bedroom' | 'terrace_patio' | 'guest_suite';
}

export interface UserPreferences {
  preferredPressure: 'gentle' | 'moderate' | 'firm' | 'deep_tissue';
  organicOilPreference: string;
  ambientSound: 'nature_stream' | 'tibetan_singing_bowls' | 'soft_harp' | 'silent_zen';
  lightingPreference: 'candlelight_dim' | 'soft_warm' | 'natural_sunlight';
  medicalNotes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  membershipTier: 'Silver Sanctuary' | 'Gold Wellness' | 'Velmora Black Diamond';
  savedAddresses: UserAddress[];
  preferences: UserPreferences;
  favoriteServiceIds: string[];
  favoriteTherapistIds: string[];
  createdAt: string;
}

export interface DurationOption {
  minutes: number;
  price: number;
  recommendedFor: string;
}

export interface OrganicOil {
  id: string;
  name: string;
  botanicalNotes: string;
  benefits: string;
  aromaProfile: string;
  colorHex: string;
}

export interface SpaAddOn {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export interface SpaService {
  id: string;
  title: string;
  subtitle: string;
  category: 'massage' | 'facial' | 'couples' | 'body-ritual' | 'wellness';
  description: string;
  basePrice: number;
  durations: DurationOption[];
  rating: number;
  reviewCount: number;
  image: string;
  benefits: string[];
  equipmentBrought: string[];
  intensity: 'Gentle Relaxation' | 'Targeted Firm' | 'Deep Therapeutic';
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  specialties: string[];
  certifications: string[];
  bio: string;
  nextAvailable: string;
  verifiedLicense: string;
}

export type BookingStatus = 
  | 'confirmed'
  | 'preparing'
  | 'en_route'
  | 'in_session'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  bookingNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: SpaService;
  selectedDuration: number;
  selectedPressure: string;
  selectedOil: OrganicOil;
  selectedAddOns: SpaAddOn[];
  therapistId: string; // therapist ID or 'auto'
  therapistName: string;
  therapistTitle?: string;
  therapistAvatar?: string;
  date: string;
  timeSlot: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
    gateCode?: string;
    parkingNotes?: string;
    roomSetup: string;
  };
  specialRequests?: string;
  paymentMethod: 'card' | 'apple_pay' | 'google_pay' | 'bank_transfer' | 'deposit_cod';
  paymentCardBrand?: string;
  paymentLast4?: string;
  status: BookingStatus;
  subtotal: number;
  tipAmount: number;
  discountAmount: number;
  promoCodeApplied?: string;
  travelFee: number;
  totalAmount: number;
  createdAt: string;
  etaMinutes?: number;
  ratingGiven?: number;
  reviewGiven?: string;
}
