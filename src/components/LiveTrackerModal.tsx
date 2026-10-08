import React, { useState, useEffect } from 'react';
import { Booking, BookingStatus } from '../types';
import { useSpa } from '../context/SpaContext';
import { 
  X, Clock, Phone, MessageSquare, MapPin, ShieldCheck, 
  CheckCircle2, Navigation, AlertCircle, Sparkles, Feather,
  Search, RefreshCw, Star, Calendar, Printer, ChevronRight,
  ArrowRight, UserCheck
} from 'lucide-react';

interface LiveTrackerModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onRebook?: (service: any, duration?: number, therapistId?: string) => void;
}

export const LiveTrackerModal: React.FC<LiveTrackerModalProps> = ({
  booking: propBooking,
  isOpen,
  onClose,
  onRebook
}) => {
  const { 
    bookings, 
    advanceBookingStatus, 
    rescheduleBooking, 
    cancelBooking, 
    rateBooking,
    getBookingByNumber
  } = useSpa();

  // Current selected booking to track
  const [selectedBookingId, setSelectedBookingId] = useState<string>(() => {
    return propBooking?.id || (bookings.length > 0 ? bookings[0].id : '');
  });

  // Track by reference lookup search input
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [showLookupInput, setShowLookupInput] = useState(false);

  // Simulated direct call note
  const [showCallNote, setShowCallNote] = useState(false);
  const [doorMessage, setDoorMessage] = useState('');
  const [showMessageSent, setShowMessageSent] = useState(false);

  // Reschedule state
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('Tomorrow');
  const [rescheduleTime, setRescheduleTime] = useState('02:30 PM');

  // Rating state
  const [stars, setStars] = useState(5);
  const [reviewInput, setReviewInput] = useState('');

  // Invoice / Receipt print view
  const [showInvoice, setShowInvoice] = useState(false);

  // Sync prop changes
  useEffect(() => {
    if (propBooking?.id) {
      setSelectedBookingId(propBooking.id);
    }
  }, [propBooking]);

  if (!isOpen) return null;

  // Find currently active booking object from latest bookings state
  const activeBooking = bookings.find(b => b.id === selectedBookingId || b.bookingNumber === selectedBookingId) || bookings[0];

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = getBookingByNumber(searchQuery);
    if (found) {
      setSelectedBookingId(found.id);
      setSearchError('');
      setShowLookupInput(false);
    } else {
      setSearchError(`No booking found matching "${searchQuery}". Please check your booking reference (e.g. VEL-8720) or phone.`);
    }
  };

  const handleSimulateNextStep = () => {
    if (!activeBooking) return;
    advanceBookingStatus(activeBooking.id);
  };

  const handleConfirmReschedule = () => {
    if (!activeBooking) return;
    rescheduleBooking(activeBooking.id, rescheduleDate, rescheduleTime);
    setIsRescheduling(false);
  };

  const handleConfirmCancel = () => {
    if (!activeBooking) return;
    if (window.confirm(`Are you sure you want to cancel appointment #${activeBooking.bookingNumber}? Full refund will be automatically reversed.`)) {
      cancelBooking(activeBooking.id);
    }
  };

  const handleSaveReview = () => {
    if (!activeBooking) return;
    rateBooking(activeBooking.id, stars, reviewInput || 'Exceptional therapeutic pressure and punctual arrival. Highly recommended.');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doorMessage.trim()) return;
    setShowMessageSent(true);
    setTimeout(() => {
      setShowMessageSent(false);
      setDoorMessage('');
    }, 4000);
  };

  // Progress steps
  const steps = [
    { id: 'confirmed', label: 'Booking Confirmed', desc: 'Therapist matched & appointment scheduled' },
    { id: 'preparing', label: 'Sanitizing Kit & Oils', desc: 'Heated basalt stones & organic linens packed' },
    { id: 'en_route', label: 'Therapist En Route', desc: `In transit to ${activeBooking?.address.street || 'Residence'}` },
    { id: 'in_session', label: 'Sanctuary Ritual in Session', desc: `${activeBooking?.selectedDuration || 60}m restorative treatment` },
    { id: 'completed', label: 'Ritual Completed', desc: 'Restored, grounded & relaxed' }
  ];

  const currentStepIndex = !activeBooking ? 0 :
    activeBooking.status === 'confirmed' ? 0 :
    activeBooking.status === 'preparing' ? 1 :
    activeBooking.status === 'en_route' ? 2 :
    activeBooking.status === 'in_session' ? 3 :
    activeBooking.status === 'completed' ? 4 : 0;

  const isActiveSession = activeBooking && (activeBooking.status === 'confirmed' || activeBooking.status === 'preparing' || activeBooking.status === 'en_route' || activeBooking.status === 'in_session');
  const isCompletedSession = activeBooking && activeBooking.status === 'completed';
  const isCancelledSession = activeBooking && activeBooking.status === 'cancelled';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-[#E5E0D6] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-[#E5E0D6] flex items-center justify-between bg-[#FBFBF9]">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isActiveSession ? 'bg-[#34A853]' : 'bg-[#964B59]'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isActiveSession ? 'bg-[#34A853]' : 'bg-[#964B59]'
              }`}></span>
            </span>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-medium text-[#1F2421]">
                Live Dispatch & Tracking Radar
              </h2>
              <p className="text-[11px] text-[#637068]">
                Real-time therapist GPS arrival & previous booking history
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLookupInput(!showLookupInput)}
              className="text-xs px-2.5 py-1.5 rounded-md border border-[#DDD7CD] hover:bg-[#EFECE6] text-[#4A5550] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Track by booking reference number"
            >
              <Search className="w-3.5 h-3.5 text-[#964B59]" />
              <span className="hidden sm:inline">Lookup #</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#7C8880] hover:text-[#1F2421] rounded-full hover:bg-[#EFECE6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Booking Switcher Pill Bar (Switch between multiple client bookings) */}
        <div className="bg-[#FAF7F5] px-5 py-2.5 border-b border-[#EAE3DE] flex items-center justify-between gap-3 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5 font-medium text-[#637068] shrink-0">
            <Calendar className="w-3.5 h-3.5 text-[#964B59]" />
            <span className="text-[11px] uppercase tracking-wider">Your Appointments:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            {bookings.map((b) => {
              const isSelected = activeBooking?.id === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBookingId(b.id);
                    setShowInvoice(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#1F2B24] text-white shadow-xs'
                      : 'bg-white text-[#4A5550] hover:bg-[#F0EBE1] border border-[#DDD7CD]'
                  }`}
                >
                  <span className="font-mono font-semibold">#{b.bookingNumber}</span>
                  <span className="opacity-70">·</span>
                  <span className="capitalize text-[11px]">
                    {b.status === 'en_route' ? '🚗 En Route' : b.status === 'confirmed' ? '✓ Scheduled' : b.status === 'in_session' ? '💆 In Session' : b.status === 'completed' ? 'Done' : 'Cancelled'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Lookup Bar by Booking Reference */}
        {showLookupInput && (
          <form onSubmit={handleLookup} className="p-4 bg-[#F5F2EB] border-b border-[#E5E0D6] space-y-2 animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Booking # (e.g. VEL-8720, VEL-8419, or phone)"
                className="flex-1 text-xs bg-white border border-[#DDD7CD] rounded-md px-3 py-2 text-[#1F2421] focus:ring-1 focus:ring-[#2D4A3E]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2D4A3E] hover:bg-[#233A31] text-white text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
              >
                Track Live
              </button>
            </div>
            {searchError && (
              <div className="text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{searchError}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[11px] text-[#637068]">
              <span>Quick tests:</span>
              {bookings.slice(0, 3).map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setSelectedBookingId(b.id);
                    setShowLookupInput(false);
                  }}
                  className="underline hover:text-[#1F2421] cursor-pointer"
                >
                  #{b.bookingNumber}
                </button>
              ))}
            </div>
          </form>
        )}

        {/* Main Content Area */}
        {activeBooking ? (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Status Hero Card */}
            <div className={`p-5 rounded-2xl text-white shadow-md space-y-3 relative overflow-hidden ${
              isActiveSession
                ? 'bg-radial from-[#243E33] to-[#15251F]'
                : isCompletedSession
                ? 'bg-radial from-[#3B4D43] to-[#26332C]'
                : 'bg-radial from-[#524646] to-[#362E2E]'
            }`}>
              
              {/* Background ambient pattern */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle,_#fff_10%,_transparent_20%)] bg-[size:12px_12px] pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold tracking-wider text-[#D1E0D7] uppercase bg-white/10 px-2 py-0.5 rounded">
                    #{activeBooking.bookingNumber}
                  </span>
                  <span className="text-[11px] bg-white/15 backdrop-blur-xs px-2 py-0.5 rounded font-medium">
                    {activeBooking.date} · {activeBooking.timeSlot}
                  </span>
                </div>

                {/* Simulation Control Button: Let client advance status to test real live updates! */}
                <button
                  onClick={handleSimulateNextStep}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold transition-all cursor-pointer border border-white/25 active:scale-95"
                  title="Simulate advancing the dispatch status in real time"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5E2C8]" />
                  <span>Advance Status ⚡</span>
                </button>
              </div>

              <div className="pt-1 relative z-10">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {activeBooking.status === 'en_route' 
                    ? `Therapist In Transit · ~${activeBooking.etaMinutes || 18} Mins Away`
                    : activeBooking.status === 'confirmed'
                    ? 'Appointment Confirmed · Kit Reserved'
                    : activeBooking.status === 'preparing'
                    ? 'Therapist Sanitizing Heated Table & Oils'
                    : activeBooking.status === 'in_session'
                    ? 'Restorative Ritual in Session'
                    : activeBooking.status === 'completed'
                    ? 'Sanctuary Treatment Completed'
                    : 'Appointment Cancelled'}
                </h3>
                <p className="text-xs text-[#D1E0D7] mt-1.5">
                  {activeBooking.service.title} · {activeBooking.selectedDuration} Minutes · {activeBooking.selectedOil?.name || 'Vedic Botanical Oil'}
                </p>
              </div>

              {/* Radar Visual Strip */}
              <div className="pt-2 flex items-center justify-between gap-2 text-xs text-[#D1E0D7] border-t border-white/10 relative z-10">
                <div className="flex items-center gap-2 truncate">
                  <Navigation className="w-4 h-4 text-[#C2D6C8] animate-pulse shrink-0" />
                  <span className="truncate">
                    Destination: {activeBooking.address.street}, {activeBooking.address.city} ({activeBooking.address.roomSetup})
                  </span>
                </div>
                <div className="font-mono text-white text-xs font-semibold shrink-0">
                  ₹{activeBooking.totalAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Simulated Live Radar Animation (En Route or Preparing) */}
            {isActiveSession && (
              <div className="p-4 bg-[#FAF9F5] border border-[#E5E0D6] rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-[#1F2421]">
                    <span className="w-2 h-2 rounded-full bg-[#34A853] animate-ping" />
                    <span>Live GPS Telemetry</span>
                  </div>
                  <span className="text-[11px] text-[#637068]">
                    Speed: ~32 km/h · Distance: 4.8 km · Direct Route
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#E5E0D6] rounded-full h-2 overflow-hidden relative">
                  <div 
                    className="bg-[#2D4A3E] h-full transition-all duration-700 ease-out"
                    style={{
                      width: activeBooking.status === 'confirmed' ? '20%' :
                             activeBooking.status === 'preparing' ? '45%' :
                             activeBooking.status === 'en_route' ? '75%' :
                             activeBooking.status === 'in_session' ? '92%' : '100%'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Assigned Master Therapist Profile Card */}
            <div className="p-4 bg-[#FAF9F5] border border-[#E5E0D6] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={activeBooking.therapistAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'}
                  alt={activeBooking.therapistName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#2D4A3E]/30 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs">
                  <div className="font-serif text-base font-medium text-[#1F2421]">
                    {activeBooking.therapistName}
                  </div>
                  <div className="text-[#637068]">
                    {activeBooking.therapistTitle || 'Certified Master Bodywork Specialist'}
                  </div>
                  <div className="text-[#2D4A3E] font-medium mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified License · Enhanced Police Background Cleared</span>
                  </div>
                </div>
              </div>

              {/* Direct Therapist Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowCallNote(true)}
                  className="px-3 py-2 bg-white border border-[#DDD7CD] hover:bg-[#EFECE6] text-[#1F2421] text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2D4A3E]" />
                  <span>Call Therapist</span>
                </button>

                <button
                  onClick={() => setShowCallNote(true)}
                  className="px-3 py-2 bg-white border border-[#DDD7CD] hover:bg-[#EFECE6] text-[#1F2421] text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#2D4A3E]" />
                  <span>Gate Code</span>
                </button>
              </div>
            </div>

            {/* Direct Dial / Gate Code Simulator */}
            {showCallNote && (
              <div className="p-4 bg-[#E8EFEA] border border-[#2D4A3E]/20 rounded-xl text-xs space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-[#2D4A3E] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Private Masked Dispatch Dispatcher</span>
                  </div>
                  <button onClick={() => setShowCallNote(false)} className="text-[11px] underline text-[#4A5550]">
                    Dismiss
                  </button>
                </div>
                <p className="text-[#364A3E]">
                  Direct call connected to {activeBooking.therapistName} via masked extension (+91 99127 06021 ext #884). Your private phone number remains concealed for security.
                </p>

                {/* Quick Door Code Form */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={doorMessage}
                    onChange={(e) => setDoorMessage(e.target.value)}
                    placeholder="Send gate code or parking instructions (e.g., Gate 4, code #9910)"
                    className="flex-1 bg-white border border-[#DDD7CD] rounded-md px-3 py-1.5 text-xs text-[#1F2421]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#2D4A3E] text-white text-xs font-medium rounded-md hover:bg-[#233A31] cursor-pointer"
                  >
                    Send to Therapist
                  </button>
                </form>
                {showMessageSent && (
                  <div className="text-[11px] text-[#2D4A3E] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Note transmitted to {activeBooking.therapistName}'s dispatch terminal!</span>
                  </div>
                )}
              </div>
            )}

            {/* Timeline Pipeline */}
            <div className="space-y-4 pt-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3E]">
                Dispatch Milestones
              </h4>

              <div className="space-y-3">
                {steps.map((st, idx) => {
                  const isPassed = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={st.id} className="flex items-start gap-3 text-xs">
                      <div className="mt-0.5 relative flex items-center justify-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          isCurrent
                            ? 'bg-[#2D4A3E] text-white ring-4 ring-[#E8EFEA]'
                            : isPassed
                            ? 'bg-[#2D4A3E] text-white'
                            : 'bg-[#E5E0D6] text-[#8E9B93]'
                        }`}>
                          {isPassed ? '✓' : idx + 1}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold ${isPassed ? 'text-[#1F2421]' : 'text-[#8E9B93]'}`}>
                          {st.label}
                        </div>
                        <div className="text-[11px] text-[#637068]">
                          {st.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Reschedule / Cancel Panel */}
            {isRescheduling && (
              <div className="p-4 bg-[#FAF7F5] border border-[#EAE3DE] rounded-xl space-y-3 text-xs">
                <div className="font-semibold text-[#1F2421]">Reschedule Appointment</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#637068] mb-1">New Date</label>
                    <select
                      value={rescheduleDate}
                      onChange={(e) => setRescheduleDate(e.target.value)}
                      className="w-full p-2 bg-white border border-[#DDD7CD] rounded text-xs"
                    >
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Thursday, Oct 8">Thursday, Oct 8</option>
                      <option value="Friday, Oct 9">Friday, Oct 9</option>
                      <option value="Saturday, Oct 10">Saturday, Oct 10</option>
                      <option value="Sunday, Oct 11">Sunday, Oct 11</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#637068] mb-1">New Arrival Slot</label>
                    <select
                      value={rescheduleTime}
                      onChange={(e) => setRescheduleTime(e.target.value)}
                      className="w-full p-2 bg-white border border-[#DDD7CD] rounded text-xs"
                    >
                      <option value="09:00 AM">09:00 AM (Morning)</option>
                      <option value="11:30 AM">11:30 AM (Midday)</option>
                      <option value="02:30 PM">02:30 PM (Afternoon)</option>
                      <option value="05:30 PM">05:30 PM (Evening)</option>
                      <option value="08:00 PM">08:00 PM (Night)</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => setIsRescheduling(false)}
                    className="px-3 py-1.5 text-xs text-[#637068] hover:text-[#1F2421] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmReschedule}
                    className="px-4 py-1.5 bg-[#2D4A3E] text-white text-xs font-medium rounded hover:bg-[#233A31] cursor-pointer"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </div>
            )}

            {/* Completed Booking Rating Section */}
            {isCompletedSession && (
              <div className="p-5 bg-[#FAF9F5] border border-[#E5E0D6] rounded-xl space-y-3 text-xs">
                <div className="font-serif text-base font-medium text-[#1F2421]">
                  Ritual Experience & Review
                </div>

                {activeBooking.ratingGiven ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-[#D4A373]">
                      {[...Array(activeBooking.ratingGiven)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="text-xs text-[#7C8880] ml-1 font-sans">
                        Rated {activeBooking.ratingGiven}/5 Stars
                      </span>
                    </div>
                    <p className="italic text-[#4A5550]">
                      "{activeBooking.reviewGiven}"
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[#637068]">
                      How was your treatment with {activeBooking.therapistName}? Your feedback shapes our therapist honors.
                    </p>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setStars(num)}
                          className={`p-1.5 transition-colors cursor-pointer ${
                            num <= stars ? 'text-[#D4A373]' : 'text-[#DDD7CD]'
                          }`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={reviewInput}
                      onChange={(e) => setReviewInput(e.target.value)}
                      placeholder="Share your thoughts on therapist touch, aromatherapy notes, and punctuality..."
                      rows={2}
                      className="w-full p-2.5 bg-white border border-[#DDD7CD] rounded-md text-xs text-[#1F2421]"
                    />
                    <button
                      onClick={handleSaveReview}
                      className="px-4 py-2 bg-[#964B59] text-white text-xs font-medium rounded-md hover:bg-[#7D3B47] transition-colors cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Quick Invoice Modal View */}
            {showInvoice && (
              <div className="p-5 bg-white border border-[#DDD7CD] rounded-xl space-y-3 text-xs shadow-md animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="font-serif text-base font-bold text-[#1F2421]">
                    Tax Invoice & Receipt
                  </div>
                  <span className="font-mono text-[#964B59]">#{activeBooking.bookingNumber}</span>
                </div>
                <div className="space-y-1.5 text-[#525E57]">
                  <div className="flex justify-between">
                    <span>Client:</span>
                    <span className="font-medium text-[#1F2421]">{activeBooking.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>{activeBooking.service.title} ({activeBooking.selectedDuration}m)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assigned Therapist:</span>
                    <span>{activeBooking.therapistName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Destination Address:</span>
                    <span>{activeBooking.address.street}, {activeBooking.address.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono">₹{activeBooking.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Therapist Gratuity:</span>
                    <span className="font-mono">₹{activeBooking.tipAmount.toLocaleString('en-IN')}</span>
                  </div>
                  {activeBooking.discountAmount > 0 && (
                    <div className="flex justify-between text-[#964B59]">
                      <span>Promo Discount ({activeBooking.promoCodeApplied}):</span>
                      <span className="font-mono">-₹{activeBooking.discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-sm text-[#1F2421] pt-2 border-t">
                    <span>Total Amount Paid:</span>
                    <span className="font-mono">₹{activeBooking.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-[#F4F1EA] hover:bg-[#EFECE6] text-[#1F2421] rounded text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Invoice</span>
                  </button>
                </div>
              </div>
            )}

            {/* Home Arrival Preparation Reminder */}
            <div className="p-4 bg-white border border-[#E5E0D6] rounded-xl space-y-1.5 text-xs">
              <div className="font-semibold text-[#1F2421] flex items-center gap-1.5">
                <Feather className="w-4 h-4 text-[#2D4A3E]" />
                <span>Sanctuary Preparation Guidance</span>
              </div>
              <p className="text-[#637068] leading-relaxed">
                Your certified therapist carries a heated memory foam bed, sanitized organic cotton linens, and botanical aroma mist. Please ensure ~2m x 1m open floor space in your designated room ({activeBooking.address.roomSetup}).
              </p>
            </div>

          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <Calendar className="w-10 h-10 text-[#C2D6C8] mx-auto" />
            <h3 className="font-serif text-lg font-medium text-[#1F2421]">No Appointments Found</h3>
            <p className="text-xs text-[#637068]">
              Reserve your first luxury home spa treatment or lookup an appointment by reference number.
            </p>
          </div>
        )}

        {/* Footer Actions */}
        {activeBooking && (
          <div className="px-5 py-3.5 border-t border-[#E5E0D6] bg-[#FBFBF9] flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              {/* Reschedule Button */}
              {isActiveSession && (
                <button
                  onClick={() => setIsRescheduling(!isRescheduling)}
                  className="px-3 py-1.5 text-xs text-[#4A5550] hover:text-[#1F2421] border border-[#DDD7CD] rounded-md hover:bg-[#EFECE6] transition-colors cursor-pointer"
                >
                  Reschedule
                </button>
              )}

              {/* Cancel Button */}
              {isActiveSession && (
                <button
                  onClick={handleConfirmCancel}
                  className="px-3 py-1.5 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              )}

              {/* View Invoice */}
              <button
                onClick={() => setShowInvoice(!showInvoice)}
                className="px-3 py-1.5 text-xs text-[#4A5550] hover:text-[#1F2421] border border-[#DDD7CD] rounded-md hover:bg-[#EFECE6] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{showInvoice ? 'Hide Invoice' : 'Receipt'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* 1-Click Rebook if completed */}
              {isCompletedSession && onRebook && (
                <button
                  onClick={() => {
                    onClose();
                    onRebook(activeBooking.service, activeBooking.selectedDuration, activeBooking.therapistId);
                  }}
                  className="px-4 py-2 bg-[#964B59] hover:bg-[#7D3B47] text-white text-xs font-medium rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>1-Click Re-book</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#1F2B24] hover:bg-[#141C18] text-white text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Close Radar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
