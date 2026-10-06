import React, { useState } from 'react';
import { Booking } from '../types';
import { useSpa } from '../context/SpaContext';
import { 
  X, Clock, Phone, MessageSquare, MapPin, ShieldCheck, 
  CheckCircle2, Navigation, AlertCircle, Sparkles, Feather
} from 'lucide-react';

interface LiveTrackerModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LiveTrackerModal: React.FC<LiveTrackerModalProps> = ({
  booking,
  isOpen,
  onClose
}) => {
  const { therapists } = useSpa();
  const [showCallNote, setShowCallNote] = useState(false);

  if (!isOpen || !booking) return null;

  // Progress steps
  const steps = [
    { id: 'confirmed', label: 'Booking Confirmed', desc: 'Therapist matched & appointment scheduled' },
    { id: 'preparing', label: 'Sanitizing Kit & Oils', desc: 'Heated basalt stones & organic linens packed' },
    { id: 'en_route', label: 'Therapist En Route', desc: `In transit to ${booking.address.street}` },
    { id: 'setup', label: 'Sanctuary Setup', desc: 'Unfolding heated bed & ambient misting' },
    { id: 'in_session', label: 'Ritual in Session', desc: `${booking.selectedDuration}m restorative treatment` }
  ];

  const currentStepIndex = booking.status === 'confirmed' ? 0 :
                           booking.status === 'preparing' ? 1 :
                           booking.status === 'en_route' ? 2 :
                           booking.status === 'in_session' ? 4 :
                           booking.status === 'completed' ? 5 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#E5E0D6] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E0D6] flex items-center justify-between bg-[#FBFBF9]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D4A3E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2D4A3E]"></span>
            </span>
            <h2 className="font-serif text-xl font-medium text-[#1F2421]">
              Live Home Dispatch Radar
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7C8880] hover:text-[#1F2421] rounded-full hover:bg-[#EFECE6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Status Hero Card */}
          <div className="p-5 rounded-xl bg-radial from-[#2D4A3E] to-[#1E332B] text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold tracking-wider text-[#D1E0D7] uppercase">
                Order #{booking.bookingNumber}
              </span>
              <span className="text-xs bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded font-medium">
                {booking.date} · {booking.timeSlot}
              </span>
            </div>

            <div className="pt-1">
              <h3 className="font-serif text-2xl font-normal text-white">
                {booking.status === 'en_route' 
                  ? `Therapist Arriving in ~${booking.etaMinutes || 18} Minutes`
                  : booking.status === 'confirmed'
                  ? 'Ritual Scheduled & Kit Reserved'
                  : booking.status === 'in_session'
                  ? 'Sanctuary Ritual Currently in Session'
                  : 'Sanctuary Completed'}
              </h3>
              <p className="text-xs text-[#D1E0D7] mt-1">
                {booking.service.title} · {booking.selectedDuration} Minutes · {booking.selectedOil.name}
              </p>
            </div>

            {/* Radar Visual Strip */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#D1E0D7]">
              <Navigation className="w-4 h-4 text-[#C2D6C8] animate-pulse" />
              <span className="truncate">
                En route to: {booking.address.street}, {booking.address.city} ({booking.address.roomSetup})
              </span>
            </div>
          </div>

          {/* Assigned Therapist Profile Card */}
          <div className="p-4 bg-[#FAF9F5] border border-[#E5E0D6] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={booking.therapistAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'}
                alt={booking.therapistName}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#2D4A3E]/20"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs">
                <div className="font-serif text-base font-medium text-[#1F2421]">
                  {booking.therapistName}
                </div>
                <div className="text-[#637068]">
                  {booking.therapistTitle || 'Certified Master Bodywork LMT'}
                </div>
                <div className="text-[#2D4A3E] font-medium mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Licensed NY LMT · Verified Background</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCallNote(true)}
                className="px-3 py-2 bg-white border border-[#DDD7CD] hover:bg-[#EFECE6] text-[#1F2421] text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Call Therapist</span>
              </button>

              <button
                onClick={() => setShowCallNote(true)}
                className="px-3 py-2 bg-white border border-[#DDD7CD] hover:bg-[#EFECE6] text-[#1F2421] text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Message Door Code</span>
              </button>
            </div>
          </div>

          {showCallNote && (
            <div className="p-3 bg-[#E8EFEA] border border-[#2D4A3E]/20 rounded-md text-xs text-[#2D4A3E] flex items-center justify-between">
              <span>Connected via Velmora Private Masked Dispatch: Direct dial active.</span>
              <button onClick={() => setShowCallNote(false)} className="text-[11px] underline">Dismiss</button>
            </div>
          )}

          {/* Timeline Pipeline */}
          <div className="space-y-4 pt-2">
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

          {/* Home Preparation Reminder */}
          <div className="p-4 bg-white border border-[#E5E0D6] rounded-xl space-y-2 text-xs">
            <div className="font-semibold text-[#1F2421] flex items-center gap-1.5">
              <Feather className="w-4 h-4 text-[#2D4A3E]" />
              <span>Sanctuary Arrival Reminder</span>
            </div>
            <p className="text-[#637068] leading-relaxed">
              Your therapist carries an ergonomic portable table, warm clean sheets, and music. Please ensure approx. 2m x 1m open floor space in your designated room ({booking.address.roomSetup}). No other preparation needed.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E5E0D6] bg-[#FBFBF9] flex items-center justify-between">
          <div className="text-xs text-[#7C8880]">
            Need to reschedule? Call Concierge at <strong>(800) 582-7489</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2D4A3E] text-white text-xs font-medium rounded-md hover:bg-[#233A31] cursor-pointer"
          >
            Close Radar
          </button>
        </div>
      </div>
    </div>
  );
};
