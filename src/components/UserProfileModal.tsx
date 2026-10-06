import React, { useState } from 'react';
import { useSpa } from '../context/SpaContext';
import { User, Booking, SpaService, Therapist } from '../types';
import { 
  User as UserIcon, Calendar, Heart, MapPin, Sliders, LogOut, 
  X, Check, Star, RefreshCw, AlertCircle, Clock, Plus, Trash2, ArrowRight
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'history' | 'favorites' | 'profile' | 'addresses';
  onRebook: (service: SpaService, duration?: number, therapistId?: string) => void;
  onTrackBooking: (booking: Booking) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'history',
  onRebook,
  onTrackBooking
}) => {
  const { 
    currentUser, isLoggedIn, login, loginWithGoogle, loginWithPhone, register, logout, 
    bookings, services, therapists, cancelBooking, rescheduleBooking,
    rateBooking, toggleFavoriteService, toggleFavoriteTherapist,
    addAddress, removeAddress, updateUserProfile
  } = useSpa();

  const [activeTab, setActiveTab] = useState<'history' | 'favorites' | 'profile' | 'addresses'>(initialTab);
  
  // Auth state when not logged in
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Rating modal/state for a booking
  const [ratingBookingId, setRatingBookingId] = useState<string | null>(null);
  const [stars, setStars] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Reschedule state
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('Tomorrow');
  const [newTime, setNewTime] = useState('02:30 PM');

  // New address state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('New Home');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrSuite, setNewAddrSuite] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('New York');
  const [newAddrZip, setNewAddrZip] = useState('10001');
  const [newAddrGate, setNewAddrGate] = useState('');
  const [newAddrRoom, setNewAddrRoom] = useState<'living_room' | 'master_bedroom' | 'terrace_patio' | 'guest_suite'>('living_room');

  // Filter for booking history
  const [bookingFilter, setBookingFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setAuthError('Please enter a valid email address');
      return;
    }
    login(emailInput);
    setAuthError('');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput || !emailInput) {
      setAuthError('Please provide your name and email');
      return;
    }
    register(nameInput, emailInput, phoneInput || '+1 (555) 000-0000');
    setAuthError('');
  };

  const handleDemoSignIn = () => {
    login('velmoraspa159@gmail.com');
  };

  const submitRating = (bookingId: string) => {
    rateBooking(bookingId, stars, reviewText);
    setRatingBookingId(null);
    setReviewText('');
  };

  const handleConfirmReschedule = (bookingId: string) => {
    rescheduleBooking(bookingId, newDate, newTime);
    setRescheduleBookingId(null);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet) return;
    addAddress({
      label: newAddrLabel,
      street: newAddrStreet,
      suite: newAddrSuite,
      city: newAddrCity,
      state: 'NY',
      zip: newAddrZip,
      gateCode: newAddrGate,
      roomSetup: newAddrRoom
    });
    setShowAddAddress(false);
    setNewAddrStreet('');
    setNewAddrSuite('');
  };

  // Filtered bookings
  const filteredBookings = bookings.filter(b => {
    if (bookingFilter === 'active') return b.status === 'confirmed' || b.status === 'preparing' || b.status === 'en_route' || b.status === 'in_session';
    if (bookingFilter === 'completed') return b.status === 'completed';
    if (bookingFilter === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  // Favorite services & therapists objects
  const favoriteServicesList = services.filter(s => currentUser?.favoriteServiceIds.includes(s.id));
  const favoriteTherapistsList = therapists.filter(t => currentUser?.favoriteTherapistIds.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#E5E0D6] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#E5E0D6] flex items-center justify-between bg-[#FBFBF9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2D4A3E] text-[#FAF9F5] flex items-center justify-center font-serif text-lg font-medium">
              {currentUser ? currentUser.name.charAt(0) : 'V'}
            </div>
            <div>
              <h2 className="font-serif text-xl font-medium text-[#1F2421]">
                {currentUser ? currentUser.name : 'Velmora Client Portal'}
              </h2>
              <p className="text-xs text-[#637068]">
                {currentUser ? `${currentUser.membershipTier} Member · ${currentUser.email}` : 'Sign in to access your sanctuary profile & history'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={logout}
                className="text-xs text-[#7C8880] hover:text-[#A35D5D] px-2.5 py-1.5 rounded-md hover:bg-[#F2EFE9] transition-colors flex items-center gap-1 cursor-pointer"
                title="Log out of session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-[#7C8880] hover:text-[#1F2421] rounded-full hover:bg-[#EFECE6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Logged In State */}
        {!isLoggedIn ? (
          <div className="p-8 max-w-md mx-auto w-full my-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-2xl text-[#1F2421]">
                {authMode === 'login' ? 'Welcome Back to Velmora' : 'Join Velmora Sanctuary'}
              </h3>
              <p className="text-xs text-[#637068]">
                {authMode === 'login' 
                  ? 'Access your saved home rituals, preferred therapists, and instant past rebooking.'
                  : 'Create an account to save preferences, address notes, and favorite bodywork practitioners.'}
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A5550] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g., velmoraspa159@gmail.com"
                    className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] rounded-md px-3 py-2.5 text-[#1F2421] focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => loginWithGoogle({ name: 'Camilla Montgomery', email: 'velmoraspa159@gmail.com' })}
                    className="py-2.5 px-3 bg-white hover:bg-[#FAF7F5] border border-[#DDD7CD] rounded-lg text-xs font-medium text-[#1F2421] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => loginWithPhone('+1 (555) 382-9104', 'Camilla Montgomery')}
                    className="py-2.5 px-3 bg-white hover:bg-[#FAF7F5] border border-[#DDD7CD] rounded-lg text-xs font-medium text-[#1F2421] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="text-[#964B59]">📱</span>
                    <span>Mobile OTP</span>
                  </button>
                </div>

                <div className="relative py-2 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E5E0D6]" />
                  </div>
                  <span className="relative bg-white px-3 text-[11px] text-[#8E9B93]">
                    Or email login
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#964B59] hover:bg-[#7D3B47] text-white text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  Sign In with Email
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className="text-xs text-[#2D4A3E] hover:underline cursor-pointer"
                  >
                    Don't have an account? Register here
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A5550] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g., Eleanor Vance"
                    className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] rounded-md px-3 py-2.5 text-[#1F2421] focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A5550] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g., eleanor@example.com"
                    className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] rounded-md px-3 py-2.5 text-[#1F2421] focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A5550] mb-1">
                    Mobile Phone (For Dispatch Updates)
                  </label>
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] rounded-md px-3 py-2.5 text-[#1F2421] focus:outline-hidden focus:ring-1 focus:ring-[#2D4A3E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#2D4A3E] hover:bg-[#233A31] text-[#FAF9F5] text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  Create Member Profile
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className="text-xs text-[#2D4A3E] hover:underline cursor-pointer"
                  >
                    Already registered? Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-[#FAF9F5] border-r border-[#E5E0D6] p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer text-left whitespace-nowrap ${
                  activeTab === 'history'
                    ? 'bg-[#2D4A3E] text-[#FAF9F5]'
                    : 'text-[#4A5550] hover:bg-[#EFECE6]'
                }`}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Past & Active Bookings</span>
                <span className="ml-auto font-mono text-[11px] opacity-80">
                  {bookings.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('favorites')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer text-left whitespace-nowrap ${
                  activeTab === 'favorites'
                    ? 'bg-[#2D4A3E] text-[#FAF9F5]'
                    : 'text-[#4A5550] hover:bg-[#EFECE6]'
                }`}
              >
                <Heart className="w-4 h-4 shrink-0" />
                <span>Saved Favorites</span>
                <span className="ml-auto font-mono text-[11px] opacity-80">
                  {(currentUser?.favoriteServiceIds.length || 0) + (currentUser?.favoriteTherapistIds.length || 0)}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer text-left whitespace-nowrap ${
                  activeTab === 'addresses'
                    ? 'bg-[#2D4A3E] text-[#FAF9F5]'
                    : 'text-[#4A5550] hover:bg-[#EFECE6]'
                }`}
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Saved Residences</span>
                <span className="ml-auto font-mono text-[11px] opacity-80">
                  {currentUser?.savedAddresses.length || 0}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer text-left whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-[#2D4A3E] text-[#FAF9F5]'
                    : 'text-[#4A5550] hover:bg-[#EFECE6]'
                }`}
              >
                <Sliders className="w-4 h-4 shrink-0" />
                <span>Sanctuary Preferences</span>
              </button>
            </div>

            {/* Main Tab Panel Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* TAB 1: BOOKING HISTORY */}
              {activeTab === 'history' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-[#1F2421]">
                        Ritual Booking History
                      </h3>
                      <p className="text-xs text-[#637068]">
                        Track active dispatch status, reschedule upcoming visits, or 1-click rebook your favorite treatments.
                      </p>
                    </div>

                    {/* Filter Segmented Control (Allowed Interactive Buttons) */}
                    <div className="flex items-center gap-1 p-1 bg-[#F4F1EA] rounded-lg border border-[#E5E0D6] shrink-0 text-xs">
                      {(['all', 'active', 'completed', 'cancelled'] as const).map((filterKey) => (
                        <button
                          key={filterKey}
                          onClick={() => setBookingFilter(filterKey)}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors capitalize cursor-pointer ${
                            bookingFilter === filterKey
                              ? 'bg-white text-[#1F2421] shadow-xs'
                              : 'text-[#637068] hover:text-[#1F2421]'
                          }`}
                        >
                          {filterKey}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-[#DDD7CD] rounded-xl p-8 space-y-3">
                      <Calendar className="w-8 h-8 text-[#A4AAA6] mx-auto" />
                      <div className="text-sm font-medium text-[#1F2421]">
                        No bookings found in this view
                      </div>
                      <p className="text-xs text-[#637068] max-w-sm mx-auto">
                        Ready to reserve your next home spa sanctuary? Explore our signature rituals and certified master therapists.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredBookings.map((b) => {
                        const isActive = b.status === 'confirmed' || b.status === 'preparing' || b.status === 'en_route' || b.status === 'in_session';

                        return (
                          <div
                            key={b.id}
                            className={`p-5 rounded-xl border transition-all ${
                              isActive 
                                ? 'bg-[#FAF9F5] border-[#2D4A3E]/30 shadow-xs ring-1 ring-[#2D4A3E]/10' 
                                : 'bg-white border-[#E5E0D6]'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div>
                                {/* Unboxed Metadata Header */}
                                <div className="flex items-center gap-2 text-xs text-[#637068] mb-1">
                                  <span className="font-mono font-medium text-[#2D4A3E]">
                                    #{b.bookingNumber}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span>{b.date} at {b.timeSlot}</span>
                                  <span aria-hidden="true">·</span>
                                  <span className={`font-medium ${
                                    b.status === 'en_route' ? 'text-amber-700 font-semibold' :
                                    b.status === 'confirmed' ? 'text-[#2D4A3E]' :
                                    b.status === 'completed' ? 'text-slate-600' : 'text-red-600'
                                  }`}>
                                    {b.status === 'en_route' ? `Therapist En Route (${b.etaMinutes || 20}m ETA)` :
                                     b.status === 'confirmed' ? 'Confirmed & Scheduled' :
                                     b.status === 'completed' ? 'Ritual Completed' :
                                     b.status === 'in_session' ? 'Session In Progress' : 'Cancelled'}
                                  </span>
                                </div>

                                <h4 className="font-serif text-lg font-medium text-[#1F2421]">
                                  {b.service.title}
                                </h4>

                                <div className="text-xs text-[#525E57] mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <span>{b.selectedDuration} Minutes</span>
                                  <span aria-hidden="true">·</span>
                                  <span>Therapist: <strong className="text-[#1F2421]">{b.therapistName}</strong></span>
                                  <span aria-hidden="true">·</span>
                                  <span>Aromatherapy: {b.selectedOil.name}</span>
                                </div>

                                <div className="text-xs text-[#7C8880] mt-1.5 flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-[#2D4A3E] shrink-0" />
                                  <span className="truncate">
                                    {b.address.street}, {b.address.city} ({b.address.roomSetup})
                                  </span>
                                </div>
                              </div>

                              <div className="text-right sm:shrink-0">
                                <div className="font-mono tabular-nums text-base font-semibold text-[#1F2421]">
                                  ₹{b.totalAmount.toLocaleString('en-IN')}
                                </div>
                                <div className="text-[11px] text-[#7C8880]">
                                  Paid via {b.paymentMethod === 'apple_pay' ? 'Apple Pay' : b.paymentMethod === 'card' ? `Card (•••• ${b.paymentLast4 || '4242'})` : 'Deposit'}
                                </div>
                              </div>
                            </div>

                            {/* Review quote if already rated */}
                            {b.ratingGiven && (
                              <div className="mt-3 p-2.5 bg-[#F9F8F5] rounded-md border border-[#EAE5DC] text-xs text-[#4A5550]">
                                <div className="flex items-center gap-1 text-[#D4A373] mb-1">
                                  {[...Array(b.ratingGiven)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-current" />
                                  ))}
                                  <span className="text-[11px] text-[#7C8880] ml-1 font-sans">Your Client Review</span>
                                </div>
                                <p className="italic">"{b.reviewGiven}"</p>
                              </div>
                            )}

                            {/* Action Buttons Row */}
                            <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                {isActive && (
                                  <button
                                    onClick={() => onTrackBooking(b)}
                                    className="px-3 py-1.5 bg-[#2D4A3E] hover:bg-[#233A31] text-[#FAF9F5] text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Track Live Arrival</span>
                                  </button>
                                )}

                                {/* 1-Click Rebook button */}
                                <button
                                  onClick={() => {
                                    onClose();
                                    onRebook(b.service, b.selectedDuration, b.therapistId);
                                  }}
                                  className="px-3 py-1.5 bg-[#F4F1EA] hover:bg-[#EFECE6] text-[#2D4A3E] text-xs font-medium rounded-md border border-[#E5E0D6] transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" />
                                  <span>1-Click Rebook</span>
                                </button>
                              </div>

                              <div className="flex items-center gap-2">
                                {isActive && (
                                  <>
                                    <button
                                      onClick={() => setRescheduleBookingId(b.id)}
                                      className="text-xs text-[#4A5550] hover:text-[#1F2421] px-2.5 py-1 rounded hover:bg-[#EFECE6] transition-colors cursor-pointer"
                                    >
                                      Reschedule
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm("Are you sure you want to cancel this home spa visit? Full refund will be automatically reversed to your original payment.")) {
                                          cancelBooking(b.id);
                                        }
                                      }}
                                      className="text-xs text-red-600 hover:text-red-800 px-2.5 py-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}

                                {b.status === 'completed' && !b.ratingGiven && (
                                  <button
                                    onClick={() => setRatingBookingId(b.id)}
                                    className="text-xs text-[#2D4A3E] font-medium hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    <Star className="w-3.5 h-3.5" />
                                    <span>Review Therapist</span>
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Reschedule Inline Box */}
                            {rescheduleBookingId === b.id && (
                              <div className="mt-3 p-3 bg-white border border-[#2D4A3E]/30 rounded-lg space-y-3">
                                <div className="text-xs font-semibold text-[#1F2421]">
                                  Select New Date & Time Slot
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <select
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                    className="p-2 border border-[#DDD7CD] rounded-md bg-[#FAF9F5]"
                                  >
                                    <option value="Tomorrow">Tomorrow</option>
                                    <option value="Wednesday, Oct 7">Wednesday, Oct 7</option>
                                    <option value="Thursday, Oct 8">Thursday, Oct 8</option>
                                    <option value="Friday, Oct 9">Friday, Oct 9</option>
                                  </select>
                                  <select
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                    className="p-2 border border-[#DDD7CD] rounded-md bg-[#FAF9F5]"
                                  >
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="02:30 PM">02:30 PM</option>
                                    <option value="05:30 PM">05:30 PM</option>
                                    <option value="08:00 PM">08:00 PM</option>
                                  </select>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => setRescheduleBookingId(null)}
                                    className="text-xs text-[#637068] px-3 py-1 rounded"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleConfirmReschedule(b.id)}
                                    className="text-xs font-medium text-white bg-[#2D4A3E] px-3 py-1 rounded"
                                  >
                                    Update Slot
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Rating Inline Box */}
                            {ratingBookingId === b.id && (
                              <div className="mt-3 p-3 bg-white border border-[#2D4A3E]/30 rounded-lg space-y-3">
                                <div className="text-xs font-semibold text-[#1F2421]">
                                  How was your sanctuary experience with {b.therapistName}?
                                </div>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                      key={s}
                                      type="button"
                                      onClick={() => setStars(s)}
                                      className="p-1 cursor-pointer"
                                    >
                                      <Star
                                        className={`w-5 h-5 ${
                                          s <= stars ? 'fill-[#D4A373] text-[#D4A373]' : 'text-slate-300'
                                        }`}
                                      />
                                    </button>
                                  ))}
                                </div>
                                <textarea
                                  value={reviewText}
                                  onChange={(e) => setReviewText(e.target.value)}
                                  placeholder="Describe the therapist's punctuality, table comfort, pressure, and aroma..."
                                  className="w-full text-xs p-2 border border-[#DDD7CD] rounded-md bg-[#FAF9F5]"
                                  rows={2}
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => setRatingBookingId(null)}
                                    className="text-xs text-[#637068] px-3 py-1 rounded"
                                  >
                                    Skip
                                  </button>
                                  <button
                                    onClick={() => submitRating(b.id)}
                                    className="text-xs font-medium text-white bg-[#2D4A3E] px-3 py-1 rounded"
                                  >
                                    Submit Review
                                  </button>
                                </div>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SAVED FAVORITES (SERVICES & THERAPISTS) */}
              {activeTab === 'favorites' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#1F2421]">
                      Saved Favorites & Quick Rebooking
                    </h3>
                    <p className="text-xs text-[#637068]">
                      Your curated personal catalog of favorite home rituals and certified master therapists.
                    </p>
                  </div>

                  {/* Favorite Services Section */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3E]">
                      Favorite Treatments ({favoriteServicesList.length})
                    </h4>
                    
                    {favoriteServicesList.length === 0 ? (
                      <p className="text-xs text-[#7C8880] italic">
                        No favorite treatments saved yet. Click the heart icon on any ritual card to save it here.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {favoriteServicesList.map(serv => (
                          <div
                            key={serv.id}
                            className="p-4 bg-white border border-[#E5E0D6] rounded-xl flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={serv.image}
                                alt={serv.title}
                                className="w-14 h-14 rounded-lg object-cover shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <h5 className="font-serif text-base font-medium text-[#1F2421] truncate">
                                  {serv.title}
                                </h5>
                                <div className="text-[11px] text-[#7C8880]">
                                  From ₹{serv.basePrice.toLocaleString('en-IN')} / 60m
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => toggleFavoriteService(serv.id)}
                                className="p-1.5 text-[#A35D5D] hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                title="Remove from favorites"
                              >
                                <Heart className="w-4 h-4 fill-current" />
                              </button>
                              <button
                                onClick={() => {
                                  onClose();
                                  onRebook(serv);
                                }}
                                className="px-3 py-1.5 bg-[#2D4A3E] hover:bg-[#233A31] text-white text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Favorite Therapists Section */}
                  <div className="space-y-3 pt-4 border-t border-[#F0EBE1]">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3E]">
                      Favorite Master Therapists ({favoriteTherapistsList.length})
                    </h4>

                    {favoriteTherapistsList.length === 0 ? (
                      <p className="text-xs text-[#7C8880] italic">
                        No preferred therapists saved yet. Heart your favorite practitioner to request them instantly next time.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {favoriteTherapistsList.map(th => (
                          <div
                            key={th.id}
                            className="p-4 bg-white border border-[#E5E0D6] rounded-xl flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={th.avatar}
                                alt={th.name}
                                className="w-12 h-12 rounded-full object-cover shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <h5 className="font-serif text-base font-medium text-[#1F2421] truncate">
                                  {th.name}
                                </h5>
                                <div className="text-[11px] text-[#637068] truncate">
                                  {th.title}
                                </div>
                                <div className="text-[11px] text-[#2D4A3E] font-medium">
                                  ★ {th.rating} ({th.reviewCount} reviews)
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => toggleFavoriteTherapist(th.id)}
                                className="p-1.5 text-[#A35D5D] hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                title="Remove from favorites"
                              >
                                <Heart className="w-4 h-4 fill-current" />
                              </button>
                              <button
                                onClick={() => {
                                  onClose();
                                  onRebook(services[0], 90, th.id);
                                }}
                                className="px-3 py-1.5 bg-[#2D4A3E] hover:bg-[#233A31] text-white text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Request Visit
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: SAVED RESIDENCES / ADDRESSES */}
              {activeTab === 'addresses' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-[#1F2421]">
                        Saved Residences & Sanctuary Access
                      </h3>
                      <p className="text-xs text-[#637068]">
                        Provide gate codes, door attendant notes, and room preferences so setup is silent and seamless.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddAddress(!showAddAddress)}
                      className="px-3 py-1.5 bg-[#2D4A3E] text-white text-xs font-medium rounded-md hover:bg-[#233A31] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Residence</span>
                    </button>
                  </div>

                  {/* Add Residence Form */}
                  {showAddAddress && (
                    <form onSubmit={handleCreateAddress} className="p-4 bg-[#FAF9F5] border border-[#2D4A3E]/30 rounded-xl space-y-3">
                      <div className="text-xs font-semibold text-[#1F2421]">
                        New Residence Details
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[11px] text-[#637068] mb-1">Residence Label</label>
                          <input
                            type="text"
                            value={newAddrLabel}
                            onChange={(e) => setNewAddrLabel(e.target.value)}
                            placeholder="e.g. Tribeca Loft, Downtown Studio"
                            className="w-full p-2 bg-white border border-[#DDD7CD] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#637068] mb-1">Street Address</label>
                          <input
                            type="text"
                            value={newAddrStreet}
                            onChange={(e) => setNewAddrStreet(e.target.value)}
                            placeholder="e.g. 450 Lexington Ave"
                            required
                            className="w-full p-2 bg-white border border-[#DDD7CD] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#637068] mb-1">Apt / Floor / Suite</label>
                          <input
                            type="text"
                            value={newAddrSuite}
                            onChange={(e) => setNewAddrSuite(e.target.value)}
                            placeholder="e.g. Unit 12B"
                            className="w-full p-2 bg-white border border-[#DDD7CD] rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#637068] mb-1">Gate / Buzzer Code</label>
                          <input
                            type="text"
                            value={newAddrGate}
                            onChange={(e) => setNewAddrGate(e.target.value)}
                            placeholder="e.g. #9901"
                            className="w-full p-2 bg-white border border-[#DDD7CD] rounded-md"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddAddress(false)}
                          className="px-3 py-1.5 text-xs text-[#637068]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-[#2D4A3E] text-white text-xs font-medium rounded-md"
                        >
                          Save Residence
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of saved addresses */}
                  <div className="space-y-3">
                    {currentUser?.savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="p-4 bg-white border border-[#E5E0D6] rounded-xl flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 text-xs">
                          <div className="font-semibold text-sm text-[#1F2421] flex items-center gap-2">
                            <span>{addr.label}</span>
                            <span className="text-[10px] bg-[#E8EFEA] text-[#2D4A3E] px-2 py-0.5 rounded font-mono">
                              Setup: {addr.roomSetup.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-[#4A5550]">
                            {addr.street} {addr.suite && `· ${addr.suite}`}
                          </div>
                          <div className="text-[#637068]">
                            {addr.city}, {addr.state} {addr.zip}
                          </div>
                          {addr.gateCode && (
                            <div className="text-[#2D4A3E] font-mono text-[11px]">
                              Buzzer / Gate: {addr.gateCode}
                            </div>
                          )}
                          {addr.parkingNotes && (
                            <div className="text-[#7C8880] italic text-[11px]">
                              Note: {addr.parkingNotes}
                            </div>
                          )}
                        </div>

                        {currentUser.savedAddresses.length > 1 && (
                          <button
                            onClick={() => removeAddress(addr.id)}
                            className="p-1.5 text-[#7C8880] hover:text-red-600 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            title="Remove address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SANCTUARY PREFERENCES */}
              {activeTab === 'profile' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#1F2421]">
                      Bespoke Sanctuary Preferences
                    </h3>
                    <p className="text-xs text-[#637068]">
                      These settings are automatically forwarded to your visiting therapist for tailored preparation.
                    </p>
                  </div>

                  <div className="p-5 bg-white border border-[#E5E0D6] rounded-xl space-y-4">
                    {/* Preferred Pressure */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1F2421] mb-2">
                        Preferred Pressure Level
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {[
                          { id: 'gentle', label: 'Gentle Flow', desc: 'Light soothing effleurage' },
                          { id: 'moderate', label: 'Moderate', desc: 'Balanced rhythmic tension release' },
                          { id: 'firm', label: 'Firm Structural', desc: 'Targeted knots & trigger points' },
                          { id: 'deep_tissue', label: 'Deep Tissue', desc: 'Intensive muscle fascia release' }
                        ].map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              if (!currentUser) return;
                              updateUserProfile({
                                preferences: { ...currentUser.preferences, preferredPressure: p.id as any }
                              });
                            }}
                            className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                              currentUser?.preferences.preferredPressure === p.id
                                ? 'bg-[#E8EFEA] border-[#2D4A3E] text-[#2D4A3E] font-medium'
                                : 'bg-[#FAF9F5] border-[#E5E0D6] text-[#4A5550]'
                            }`}
                          >
                            <div className="font-semibold">{p.label}</div>
                            <div className="text-[10px] opacity-80 mt-0.5">{p.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ambient Sound */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1F2421] mb-2">
                        Soundscape Atmosphere (Speaker brought by therapist)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {[
                          { id: 'nature_stream', label: 'Forest Rain & Stream' },
                          { id: 'tibetan_singing_bowls', label: 'Tibetan Singing Bowls' },
                          { id: 'soft_harp', label: 'Celtic Soft Harp' },
                          { id: 'silent_zen', label: 'Absolute Silent Zen' }
                        ].map(s => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              if (!currentUser) return;
                              updateUserProfile({
                                preferences: { ...currentUser.preferences, ambientSound: s.id as any }
                              });
                            }}
                            className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                              currentUser?.preferences.ambientSound === s.id
                                ? 'bg-[#E8EFEA] border-[#2D4A3E] text-[#2D4A3E] font-medium'
                                : 'bg-[#FAF9F5] border-[#E5E0D6] text-[#4A5550]'
                            }`}
                          >
                            <div>{s.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Medical / Focal Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1F2421] mb-1">
                        Specific Areas to Focus or Avoid
                      </label>
                      <textarea
                        value={currentUser?.preferences.medicalNotes || ''}
                        onChange={(e) => {
                          if (!currentUser) return;
                          updateUserProfile({
                            preferences: { ...currentUser.preferences, medicalNotes: e.target.value }
                          });
                        }}
                        placeholder="e.g. Tight trapezii from computer screen; avoid pressure on left knee; prefer no scented oils near face..."
                        rows={3}
                        className="w-full text-xs p-3 bg-[#FAF9F5] border border-[#DDD7CD] rounded-md text-[#1F2421] focus:ring-1 focus:ring-[#2D4A3E] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
