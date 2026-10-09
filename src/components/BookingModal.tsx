import React, { useState, useEffect } from 'react';
import { SpaService, Therapist, OrganicOil, SpaAddOn, Booking } from '../types';
import { useSpa } from '../context/SpaContext';
import { ORGANIC_OILS, SPA_ADDONS } from '../data/mockData';
import { PaymentGateway } from './PaymentGateway';
import { 
  X, Check, ChevronRight, ChevronLeft, Calendar, Clock, MapPin, 
  Sparkles, ShieldCheck, Heart, User, CheckCircle2, Download, Printer
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: SpaService | null;
  initialTherapistId?: string | null;
  initialDuration?: number | null;
  initialPromoCode?: string;
  onBookingCompleted: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialTherapistId,
  initialDuration,
  initialPromoCode,
  onBookingCompleted
}) => {
  const { services, therapists, currentUser, createBooking, register } = useSpa();

  // Wizard Step: 1 = Customization, 2 = Therapist, 3 = Schedule & Address, 4 = Secure Payment, 5 = Confirmation Receipt
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Selected state
  const [selectedService, setSelectedService] = useState<SpaService>(() => initialService || services[0]);
  const [selectedDuration, setSelectedDuration] = useState<number>(() => {
    if (initialDuration) return initialDuration;
    return initialService?.durations[1]?.minutes || initialService?.durations[0]?.minutes || 60;
  });
  const [selectedPressure, setSelectedPressure] = useState<string>(
    currentUser?.preferences.preferredPressure || 'Moderate'
  );
  const [selectedOil, setSelectedOil] = useState<OrganicOil>(ORGANIC_OILS[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<SpaAddOn[]>([]);
  
  // Therapist
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | 'auto'>(() => {
    if (initialTherapistId && initialTherapistId !== 'auto') {
      const match = therapists.find(t => t.id === initialTherapistId);
      if (match) return match;
    }
    return 'auto';
  });

  // Schedule & Address
  const [bookingDate, setBookingDate] = useState<string>('Today');
  const [bookingTimeSlot, setBookingTimeSlot] = useState<string>('05:30 PM');
  
  // Residence fields
  const primaryAddr = currentUser?.savedAddresses[0];
  const [clientName, setClientName] = useState<string>(currentUser?.name || '');
  const [clientEmail, setClientEmail] = useState<string>(currentUser?.email || '');
  const [clientPhone, setClientPhone] = useState<string>(currentUser?.phone || '+91 99127 06021');

  useEffect(() => {
    if (currentUser) {
      if (!clientName) setClientName(currentUser.name);
      if (!clientEmail) setClientEmail(currentUser.email);
      if (!clientPhone) setClientPhone(currentUser.phone);
    }
  }, [currentUser]);

  const [selectedCountry, setSelectedCountry] = useState<'ES' | 'IN'>(() => {
    if (primaryAddr?.city?.toLowerCase().includes('spain') || primaryAddr?.city?.toLowerCase().includes('barcelona') || primaryAddr?.city?.toLowerCase().includes('madrid')) {
      return 'ES';
    }
    return 'IN';
  });
  const [streetAddress, setStreetAddress] = useState<string>(primaryAddr?.street || 'Tower 4, The Magnolias, Golf Course Rd');
  const [suiteUnit, setSuiteUnit] = useState<string>(primaryAddr?.suite || 'Penthouse Suite 14A');
  const [city, setCity] = useState<string>(primaryAddr?.city || 'Gurgaon, Delhi NCR');
  const [zipCode, setZipCode] = useState<string>(primaryAddr?.zip || '122002');
  const [gateCode, setGateCode] = useState<string>(primaryAddr?.gateCode || '#8821');
  const [roomSetup, setRoomSetup] = useState<string>('Living Room Sanctuary');
  const [specialNotes, setSpecialNotes] = useState<string>(currentUser?.preferences.medicalNotes || '');

  // Confirmed booking ref
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Sync initial props if changed
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      const matchDur = initialService.durations.find(d => d.minutes === initialDuration);
      if (matchDur) {
        setSelectedDuration(matchDur.minutes);
      } else {
        setSelectedDuration(initialService.durations[0].minutes);
      }
    }
    if (initialTherapistId) {
      const t = therapists.find(x => x.id === initialTherapistId);
      if (t) setSelectedTherapist(t);
    }
  }, [initialService, initialTherapistId, initialDuration, therapists]);

  if (!isOpen) return null;

  // Pricing calculation
  const durationObj = selectedService.durations.find(d => d.minutes === selectedDuration) || selectedService.durations[0];
  const durationPrice = durationObj ? durationObj.price : selectedService.basePrice;

  const toggleAddOn = (addon: SpaAddOn) => {
    const exists = selectedAddOns.some(a => a.id === addon.id);
    if (exists) {
      setSelectedAddOns(selectedAddOns.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handlePaymentSuccess = (paymentInfo: {
    method: 'card' | 'apple_pay' | 'google_pay' | 'bank_transfer' | 'deposit_cod';
    cardBrand?: string;
    last4?: string;
    tipAmount: number;
    discountAmount: number;
    promoCode?: string;
    totalAmount: number;
  }) => {
    const assignedTherapist = typeof selectedTherapist === 'object' ? selectedTherapist : therapists[0];

    // If client is not signed in yet, seamlessly sign them up so they have an active persistent sanctuary account!
    let effectiveUserId = currentUser?.id;
    if (!currentUser && clientEmail) {
      register(clientName || 'Sanctuary Client', clientEmail, clientPhone || '+91 99127 06021');
      effectiveUserId = `usr-${Date.now()}`;
    }

    const newBooking = createBooking({
      userId: effectiveUserId || currentUser?.id || `usr-guest-${Date.now()}`,
      customerName: clientName || currentUser?.name || 'Sanctuary Client',
      customerEmail: clientEmail || currentUser?.email || 'guest@velmora.com',
      customerPhone: clientPhone || currentUser?.phone || '+91 99127 06021',
      service: selectedService,
      selectedDuration,
      selectedPressure,
      selectedOil,
      selectedAddOns,
      therapistId: typeof selectedTherapist === 'object' ? selectedTherapist.id : 'auto',
      therapistName: typeof selectedTherapist === 'object' ? selectedTherapist.name : 'Elena Rostova (Master LMT)',
      therapistTitle: typeof selectedTherapist === 'object' ? selectedTherapist.title : 'Master Bodywork Specialist',
      therapistAvatar: typeof selectedTherapist === 'object' ? selectedTherapist.avatar : therapists[0].avatar,
      date: bookingDate,
      timeSlot: bookingTimeSlot,
      address: {
        street: streetAddress,
        suite: suiteUnit,
        city,
        state: selectedCountry === 'ES' ? 'Spain' : 'Haryana',
        zip: zipCode,
        gateCode,
        roomSetup
      },
      specialRequests: specialNotes,
      paymentMethod: paymentInfo.method,
      paymentCardBrand: paymentInfo.cardBrand,
      paymentLast4: paymentInfo.last4,
      subtotal: durationPrice + selectedAddOns.reduce((s, a) => s + a.price, 0),
      tipAmount: paymentInfo.tipAmount,
      discountAmount: paymentInfo.discountAmount,
      promoCodeApplied: paymentInfo.promoCode,
      travelFee: 0,
      totalAmount: paymentInfo.totalAmount,
      etaMinutes: 18
    });

    setConfirmedBooking(newBooking);
    setCurrentStep(5);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-t-[32px] sm:rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border-t sm:border border-[#E5E0D6] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Bottom Sheet Drag Handle */}
        <div className="w-12 h-1 bg-[#D5CDC5] rounded-full mx-auto mt-2.5 mb-0.5 sm:hidden shrink-0" />

        {/* Wizard Top Bar */}
        <div className="px-6 py-4 border-b border-[#E5E0D6] flex items-center justify-between bg-[#FBFBF9]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#2D4A3E]">
              Step {currentStep} of {currentStep === 5 ? '5 · Confirmation' : '4'}
            </div>
            <h2 className="font-serif text-xl font-medium text-[#1F2421]">
              {currentStep === 1 && `Customize Ritual: ${selectedService.title}`}
              {currentStep === 2 && 'Select Certified Master Therapist'}
              {currentStep === 3 && 'Schedule Date, Time & Home Setup'}
              {currentStep === 4 && 'Secure Integrated Payment Gateway'}
              {currentStep === 5 && 'Sanctuary Booking Confirmed!'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7C8880] hover:text-[#1F2421] rounded-full hover:bg-[#EFECE6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progress Tracker */}
        {currentStep < 5 && (
          <div className="grid grid-cols-4 border-b border-[#E5E0D6] bg-white text-[10px] sm:text-xs text-center font-medium">
            <div className={`py-2 px-1 border-b-2 transition-colors truncate ${currentStep >= 1 ? 'border-[#2D4A3E] text-[#2D4A3E]' : 'border-transparent text-[#A4AAA6]'}`}>
              1. Treatment
            </div>
            <div className={`py-2 px-1 border-b-2 transition-colors truncate ${currentStep >= 2 ? 'border-[#2D4A3E] text-[#2D4A3E]' : 'border-transparent text-[#A4AAA6]'}`}>
              2. Therapist
            </div>
            <div className={`py-2 px-1 border-b-2 transition-colors truncate ${currentStep >= 3 ? 'border-[#2D4A3E] text-[#2D4A3E]' : 'border-transparent text-[#A4AAA6]'}`}>
              3. Schedule
            </div>
            <div className={`py-2 px-1 border-b-2 transition-colors truncate ${currentStep >= 4 ? 'border-[#2D4A3E] text-[#2D4A3E]' : 'border-transparent text-[#A4AAA6]'}`}>
              4. Payment
            </div>
          </div>
        )}

        {/* Wizard Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 sm:space-y-6">

          {/* STEP 1: TREATMENT & CUSTOMIZATION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Treatment overview card */}
              <div className="p-4 rounded-xl border border-[#E5E0D6] bg-[#FAF9F5] flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full sm:w-28 h-24 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 text-xs">
                  <h3 className="font-serif text-lg font-medium text-[#1F2421]">
                    {selectedService.title}
                  </h3>
                  <p className="text-[#637068] mt-0.5">
                    {selectedService.subtitle}
                  </p>
                  <div className="mt-2 text-[#2D4A3E] font-medium flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Includes heated memory foam table, sterile linens & botanical oils</span>
                  </div>
                </div>
              </div>

              {/* Duration Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] mb-2">
                  Select Ritual Duration
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedService.durations.map((dur) => (
                    <button
                      key={dur.minutes}
                      type="button"
                      onClick={() => setSelectedDuration(dur.minutes)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedDuration === dur.minutes
                          ? 'bg-[#FAF9F5] border-[#2D4A3E] ring-1 ring-[#2D4A3E]/30 text-[#1F2421]'
                          : 'bg-white border-[#E5E0D6] text-[#4A5550] hover:border-[#DDD7CD]'
                      }`}
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-semibold text-sm">
                          {dur.minutes} Minutes
                        </span>
                        <span className="font-mono text-sm font-bold text-[#1F2421]">
                          ₹{dur.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#637068] leading-tight">
                        {dur.recommendedFor}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pressure Preference */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] mb-2">
                  Desired Pressure Intensity
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['Gentle Flow', 'Moderate Balanced', 'Firm Tension Release', 'Deep Sports Tissue'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setSelectedPressure(p)}
                      className={`py-2.5 px-3 rounded-lg border text-center font-medium cursor-pointer transition-colors ${
                        selectedPressure === p
                          ? 'bg-[#2D4A3E] text-white border-[#2D4A3E]'
                          : 'bg-[#FAF9F5] border-[#E5E0D6] text-[#4A5550] hover:bg-[#EFECE6]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Organic Botanical Oil Formulation */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] mb-2">
                  Aromatherapy Botanical Oil Blend (Complimentary)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ORGANIC_OILS.map((oil) => (
                    <button
                      key={oil.id}
                      type="button"
                      onClick={() => setSelectedOil(oil)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedOil.id === oil.id
                          ? 'bg-[#FAF9F5] border-[#2D4A3E] ring-1 ring-[#2D4A3E]/30'
                          : 'bg-white border-[#E5E0D6] hover:border-[#DDD7CD]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-[#1F2421]">
                          {oil.name}
                        </span>
                        {selectedOil.id === oil.id && (
                          <span className="text-[10px] bg-[#E8EFEA] text-[#2D4A3E] px-2 py-0.5 rounded font-medium">
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#2D4A3E] font-medium">
                        {oil.botanicalNotes}
                      </div>
                      <div className="text-[11px] text-[#637068] mt-1">
                        {oil.benefits}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Luxury Add-Ons */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] mb-2">
                  Enhance Your Sanctuary (Optional Add-Ons)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SPA_ADDONS.map((addon) => {
                    const isSelected = selectedAddOns.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#FAF9F5] border-[#2D4A3E] ring-1 ring-[#2D4A3E]/30'
                            : 'bg-white border-[#E5E0D6] hover:border-[#DDD7CD]'
                        }`}
                      >
                        <div className="text-xs">
                          <div className="font-semibold text-[#1F2421]">
                            {addon.name}
                          </div>
                          <div className="text-[11px] text-[#637068] mt-0.5">
                            {addon.description}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-mono text-xs font-bold text-[#1F2421]">
                            +₹{addon.price.toLocaleString('en-IN')}
                          </div>
                          <span className={`inline-block mt-1 w-4 h-4 rounded border text-center text-[10px] ${
                            isSelected ? 'bg-[#2D4A3E] border-[#2D4A3E] text-white' : 'border-[#DDD7CD]'
                          }`}>
                            {isSelected && '✓'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: THERAPIST SELECTION */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="text-xs text-[#525E57]">
                Choose your preferred certified master therapist, or let our intelligent algorithm assign the top-rated practitioner closest to your location.
              </div>

              {/* Auto-match option */}
              <div
                onClick={() => setSelectedTherapist('auto')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                  selectedTherapist === 'auto'
                    ? 'bg-[#FAF9F5] border-[#2D4A3E] ring-1 ring-[#2D4A3E]/30'
                    : 'bg-white border-[#E5E0D6] hover:border-[#DDD7CD]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#E8EFEA] text-[#2D4A3E] flex items-center justify-center font-serif text-lg font-bold">
                    ★
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-sm text-[#1F2421]">
                      Auto-Assign Best Available Master Therapist (Recommended)
                    </div>
                    <div className="text-[#637068] mt-0.5">
                      Fastest arrival, vetted LMT matching your chosen pressure & focus notes.
                    </div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-[11px] font-mono text-[#2D4A3E] bg-[#E8EFEA] px-2.5 py-1 rounded">
                    Fastest Dispatch
                  </span>
                </div>
              </div>

              {/* Specific therapists cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {therapists.map((th) => {
                  const isSelected = typeof selectedTherapist === 'object' && selectedTherapist.id === th.id;
                  const isFav = currentUser?.favoriteTherapistIds.includes(th.id);

                  return (
                    <div
                      key={th.id}
                      onClick={() => setSelectedTherapist(th)}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#FAF9F5] border-[#2D4A3E] ring-1 ring-[#2D4A3E]/30'
                          : 'bg-white border-[#E5E0D6] hover:border-[#DDD7CD]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={th.avatar}
                          alt={th.name}
                          className="w-14 h-14 rounded-full object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-xs min-w-0">
                          <div className="font-semibold text-sm text-[#1F2421] flex items-center gap-1.5">
                            <span className="truncate">{th.name}</span>
                            {isFav && <Heart className="w-3.5 h-3.5 fill-[#A35D5D] text-[#A35D5D] shrink-0" />}
                          </div>
                          <div className="text-[11px] text-[#637068] truncate">
                            {th.title}
                          </div>
                          <div className="text-[11px] text-[#2D4A3E] font-medium mt-1">
                            ★ {th.rating} ({th.reviewCount} rituals) · {th.experienceYears}y exp
                          </div>
                          <div className="text-[11px] text-[#525E57] mt-1.5 line-clamp-2">
                            {th.bio}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-[11px]">
                        <span className="text-[#637068]">
                          Next: <strong className="text-[#1F2421]">{th.nextAvailable}</strong>
                        </span>
                        <span className={`px-2 py-0.5 rounded font-medium ${
                          isSelected ? 'bg-[#2D4A3E] text-white' : 'text-[#2D4A3E]'
                        }`}>
                          {isSelected ? 'Selected' : 'Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE & ADDRESS DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Client Contact Info */}
              <div className="p-4 bg-[#FAF9F5] border border-[#E5E0D6] rounded-xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3E]">
                    Client Sanctuary Contact (Instant Sign Up & Book)
                  </div>
                  {currentUser ? (
                    <span className="text-[11px] bg-[#E8EFEA] text-[#2D4A3E] px-2 py-0.5 rounded font-medium">
                      ✓ Logged In Member: {currentUser.name.split(' ')[0]}
                    </span>
                  ) : (
                    <span className="text-[11px] bg-[#FAF4F5] text-[#964B59] font-medium px-2 py-0.5 rounded border border-[#F0D5DA]">
                      ⚡ Auto-creates account with booking
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#4A5550] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Camilla Montgomery"
                      className="w-full text-xs bg-white border border-[#DDD7CD] rounded-md p-2 text-[#1F2421]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#4A5550] mb-1">
                      Email for Receipt
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@velmora.com"
                      className="w-full text-xs bg-white border border-[#DDD7CD] rounded-md p-2 text-[#1F2421]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#4A5550] mb-1">
                      Mobile for Arrival Updates
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 99127 06021"
                      className="w-full text-xs bg-white border border-[#DDD7CD] rounded-md p-2 text-[#1F2421]"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] mb-2">
                    Appointment Date
                  </label>
                  <select
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] rounded-md p-2.5 text-[#1F2421] focus:ring-1 focus:ring-[#2D4A3E]"
                  >
                    <option value="Today">Today (On-Demand Dispatch)</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Wednesday, Oct 7">Wednesday, Oct 7</option>
                    <option value="Thursday, Oct 8">Thursday, Oct 8</option>
                    <option value="Friday, Oct 9">Friday, Oct 9</option>
                    <option value="Saturday, Oct 10">Saturday, Oct 10</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] mb-2">
                    Arrival Time Slot
                  </label>
                  <select
                    value={bookingTimeSlot}
                    onChange={(e) => setBookingTimeSlot(e.target.value)}
                    className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] rounded-md p-2.5 text-[#1F2421] focus:ring-1 focus:ring-[#2D4A3E]"
                  >
                    <option value="09:00 AM">09:00 AM (Morning Awakening)</option>
                    <option value="11:30 AM">11:30 AM (Midday Focus)</option>
                    <option value="02:30 PM">02:30 PM (Afternoon Recovery)</option>
                    <option value="05:30 PM">05:30 PM (Evening Unwind)</option>
                    <option value="08:00 PM">08:00 PM (Night Sleep Ritual)</option>
                  </select>
                </div>
              </div>

              {/* Address Form */}
              <div className="p-5 bg-[#FAF9F5] border border-[#E5E0D6] rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3E]">
                    Residence Destination
                  </div>
                  {currentUser && currentUser.savedAddresses.length > 0 && (
                    <select
                      onChange={(e) => {
                        const addr = currentUser.savedAddresses.find(a => a.id === e.target.value);
                        if (addr) {
                          setStreetAddress(addr.street);
                          setSuiteUnit(addr.suite || '');
                          setCity(addr.city);
                          setZipCode(addr.zip);
                          setGateCode(addr.gateCode || '');
                          if (addr.city.toLowerCase().includes('spain') || addr.city.toLowerCase().includes('barcelona') || addr.city.toLowerCase().includes('madrid')) {
                            setSelectedCountry('ES');
                          } else {
                            setSelectedCountry('IN');
                          }
                        }
                      }}
                      className="text-[11px] bg-white border border-[#DDD7CD] rounded px-2 py-1 text-[#2D4A3E]"
                    >
                      {currentUser.savedAddresses.map(a => (
                        <option key={a.id} value={a.id}>
                          Use Saved: {a.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Country Selector: Spain & India */}
                <div className="bg-white p-3 rounded-lg border border-[#E0D9D1] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-[#4A5550]">
                      International Service Country
                    </label>
                    <span className="text-[10px] text-[#964B59] font-medium">
                      Available in Spain & India
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCountry('ES');
                        setCity('Madrid, Spain');
                        setZipCode('28001');
                        setStreetAddress('Passeig de Gràcia 88');
                      }}
                      className={`py-2 px-3 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        selectedCountry === 'ES'
                          ? 'bg-[#FAF4F5] border-[#964B59] text-[#964B59] font-bold ring-1 ring-[#964B59]/30'
                          : 'bg-[#FAF7F5] border-[#DDD7CD] text-[#525E57] hover:border-[#964B59]'
                      }`}
                    >
                      <span>🇪🇸 Spain (España)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCountry('IN');
                        setCity('Gurgaon, Delhi NCR / India');
                        setZipCode('122002');
                        setStreetAddress('Tower 4, The Magnolias, Golf Course Rd');
                      }}
                      className={`py-2 px-3 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        selectedCountry === 'IN'
                          ? 'bg-[#FAF4F5] border-[#964B59] text-[#964B59] font-bold ring-1 ring-[#964B59]/30'
                          : 'bg-[#FAF7F5] border-[#DDD7CD] text-[#525E57] hover:border-[#964B59]'
                      }`}
                    >
                      <span>🇮🇳 India (Bharat)</span>
                    </button>
                  </div>

                  {/* Quick City Chips */}
                  <div className="pt-1">
                    <div className="text-[10px] text-[#7C8880] mb-1">Quick Select Hub:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCountry === 'ES' ? (
                        ['Madrid', 'Barcelona', 'Marbella / Costa del Sol', 'Ibiza', 'Mallorca', 'Valencia'].map(c => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCity(`${c}, Spain`)}
                            className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                              city.includes(c)
                                ? 'bg-[#964B59] text-white border-[#964B59]'
                                : 'bg-[#FAF7F5] border-[#DDD7CD] text-[#525E57] hover:bg-white'
                            }`}
                          >
                            {c}
                          </button>
                        ))
                      ) : (
                        ['Delhi NCR / Gurgaon', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Goa', 'Pune'].map(c => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setCity(`${c}, India`)}
                            className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                              city.includes(c)
                                ? 'bg-[#964B59] text-white border-[#964B59]'
                                : 'bg-[#FAF7F5] border-[#DDD7CD] text-[#525E57] hover:bg-white'
                            }`}
                          >
                            {c}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#637068] mb-1">Street Address</label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder={selectedCountry === 'ES' ? 'e.g. Calle Serrano 42 / Passeig de Gràcia' : 'e.g. The Magnolias, Golf Course Rd'}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-[#1F2421]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#637068] mb-1">Apt / Floor / Suite / Villa</label>
                    <input
                      type="text"
                      value={suiteUnit}
                      onChange={(e) => setSuiteUnit(e.target.value)}
                      placeholder="e.g. Unit 8B / Villa 4"
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-[#1F2421]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#637068] mb-1">Gate / Buzzer Code</label>
                    <input
                      type="text"
                      value={gateCode}
                      onChange={(e) => setGateCode(e.target.value)}
                      placeholder="e.g. #8821"
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-[#1F2421]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#637068] mb-1">City & State / Region</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-[#1F2421]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#637068] mb-1">Postal / Zip Code</label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-[#1F2421]"
                    />
                  </div>
                </div>

                {/* Setup Room in Residence */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#4A5550] mb-1.5">
                    Room Setup Location (Needs approx. 2m x 1m space)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {['Living Room Sanctuary', 'Master Bedroom Suite', 'Covered Terrace / Patio', 'Guest Suite'].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRoomSetup(r)}
                        className={`p-2 rounded-md border text-center transition-colors cursor-pointer ${
                          roomSetup === r
                            ? 'bg-[#2D4A3E] text-white border-[#2D4A3E]'
                            : 'bg-white border-[#DDD7CD] text-[#4A5550] hover:bg-[#EFECE6]'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#4A5550] mb-1">
                    Door Access or Health Notes
                  </label>
                  <input
                    type="text"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Service elevator on left; tight shoulder blades; quiet arrival preferred"
                    className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-xs text-[#1F2421]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SECURE PAYMENT GATEWAY */}
          {currentStep === 4 && (
            <PaymentGateway
              service={selectedService}
              selectedDuration={selectedDuration}
              durationPrice={durationPrice}
              selectedOil={selectedOil}
              selectedAddOns={selectedAddOns}
              therapist={selectedTherapist}
              date={bookingDate}
              timeSlot={bookingTimeSlot}
              initialPromoCode={initialPromoCode}
              onSuccess={handlePaymentSuccess}
              onBack={() => setCurrentStep(3)}
            />
          )}

          {/* STEP 5: CONFIRMATION RECEIPT */}
          {currentStep === 5 && confirmedBooking && (
            <div className="space-y-6 text-center max-w-lg mx-auto py-4">
              <div className="w-16 h-16 rounded-full bg-[#E8EFEA] text-[#2D4A3E] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-serif text-3xl font-medium text-[#1F2421]">
                  Sanctuary Reserved & Confirmed
                </h3>
                <div className="font-mono text-xs font-semibold text-[#2D4A3E] mt-1">
                  Booking Reference: #{confirmedBooking.bookingNumber}
                </div>
                <p className="text-xs text-[#637068] mt-2">
                  A confirmation email & mobile arrival link have been dispatched to <strong>{confirmedBooking.customerEmail}</strong>.
                </p>
              </div>

              {/* Summary ticket */}
              <div className="p-5 bg-[#FAF9F5] border border-[#E5E0D6] rounded-xl text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                  <span className="text-[#637068]">Treatment</span>
                  <span className="font-semibold text-[#1F2421]">{confirmedBooking.service.title} ({confirmedBooking.selectedDuration}m)</span>
                </div>
                <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                  <span className="text-[#637068]">Therapist</span>
                  <span className="font-semibold text-[#1F2421]">{confirmedBooking.therapistName}</span>
                </div>
                <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                  <span className="text-[#637068]">Date & Slot</span>
                  <span className="font-semibold text-[#2D4A3E]">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-[#EAE5DC] pb-2">
                  <span className="text-[#637068]">Address</span>
                  <span className="text-[#1F2421] text-right truncate max-w-[200px]">{confirmedBooking.address.street}, {confirmedBooking.address.city}</span>
                </div>
                <div className="flex justify-between pt-1 font-semibold text-sm">
                  <span>Total Paid</span>
                  <span className="font-mono text-[#1F2421]">₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookingCompleted(confirmedBooking);
                  }}
                  className="flex-1 py-3 bg-[#2D4A3E] hover:bg-[#233A31] text-white text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Open Live Dispatch Tracker</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-3 bg-white border border-[#DDD7CD] hover:bg-[#FAF9F5] text-[#1F2421] text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Navigation (Steps 1 to 3) */}
        {currentStep < 4 && (
          <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-[#E5E0D6] bg-[#FBFBF9] flex items-center justify-between gap-2">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((currentStep - 1) as any)}
                className="px-2.5 sm:px-4 py-2 text-xs font-medium text-[#4A5550] hover:text-[#1F2421] flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-right">
                <div className="text-[10px] text-[#7C8880]">Total</div>
                <div className="font-mono text-xs sm:text-sm font-bold text-[#1F2421]">
                  ₹{(durationPrice + selectedAddOns.reduce((s, a) => s + a.price, 0)).toLocaleString('en-IN')}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep((currentStep + 1) as any)}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#2D4A3E] hover:bg-[#233A31] active:scale-95 text-white text-xs font-medium rounded-md shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="hidden sm:inline">Continue to {currentStep === 1 ? 'Therapist' : currentStep === 2 ? 'Schedule' : 'Payment'}</span>
                <span className="sm:hidden font-semibold">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
