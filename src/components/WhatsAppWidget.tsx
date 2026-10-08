import React, { useState } from 'react';
import { OFFICIAL_PHONE, getWhatsAppUrl } from '../utils/contact';
import { MessageCircle, X, ChevronRight, ShieldCheck, Building2, Calendar, Sparkles } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Chat Menu */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-[#E5E0D6] overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#1C2C24] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold shadow-xs">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="font-serif text-sm font-semibold">
                  Velmora Concierge
                </div>
                <div className="text-[10px] text-[#A8C9B4] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Online · {OFFICIAL_PHONE}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAF7F5] space-y-3">
            <div className="p-3 bg-white rounded-xl border border-[#EAE3DE] text-xs text-[#525E57] space-y-1 shadow-2xs">
              <p className="font-medium text-[#1F2421]">
                Hello! Welcome to Velmora Home Spa.
              </p>
              <p className="text-[11px] text-[#7C8880]">
                Click below to chat on WhatsApp. Your message will be automatically tagged as <strong className="text-[#964B59]">"Redirected from Website"</strong>.
              </p>
            </div>

            {/* Quick Option Links */}
            <div className="space-y-1.5">
              <a
                href={getWhatsAppUrl('corporate')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-2.5 bg-white hover:bg-[#F9ECEE] border border-[#DDD7CD] hover:border-[#964B59] rounded-xl flex items-center justify-between transition-colors text-xs text-[#1F2421] group font-medium"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#964B59]" />
                  <span>Corporate Wellness Inquiry</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8E9B93] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={getWhatsAppUrl('booking')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-2.5 bg-white hover:bg-[#F9ECEE] border border-[#DDD7CD] hover:border-[#964B59] rounded-xl flex items-center justify-between transition-colors text-xs text-[#1F2421] group font-medium"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#964B59]" />
                  <span>Book Home Spa Visit</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8E9B93] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={getWhatsAppUrl('partner')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-2.5 bg-white hover:bg-[#F9ECEE] border border-[#DDD7CD] hover:border-[#964B59] rounded-xl flex items-center justify-between transition-colors text-xs text-[#1F2421] group font-medium"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#964B59]" />
                  <span>Join as Visiting Specialist</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8E9B93] group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <div className="p-2.5 bg-white border-t border-[#EAE3DE] text-center text-[10px] text-[#7C8880] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#25D366]" />
            <span>Direct WhatsApp Helpline: {OFFICIAL_PHONE}</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:inline-block bg-[#1C2C24] text-white text-xs px-3 py-1.5 rounded-full shadow-md font-medium tracking-wide">
            Chat on WhatsApp
          </span>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp Chat"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5C] active:scale-95 text-white flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer group hover:ring-4 hover:ring-[#25D366]/30"
        >
          <MessageCircle className="w-7 h-7 fill-current transition-transform group-hover:scale-110" />
        </button>
      </div>

    </div>
  );
};
