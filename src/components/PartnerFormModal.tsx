import React, { useState } from 'react';
import { ExternalLink, X, ShieldCheck, DollarSign, Clock, HeartHandshake, CheckCircle } from 'lucide-react';

interface PartnerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe5zldrHEXKqehOLL8xbBua2p0w0MoVotIg6qf6SYmRJawFuA/viewform";
export const GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe5zldrHEXKqehOLL8xbBua2p0w0MoVotIg6qf6SYmRJawFuA/viewform?embedded=true";

export const PartnerFormModal: React.FC<PartnerFormModalProps> = ({ isOpen, onClose }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-t-[32px] sm:rounded-2xl max-w-4xl w-full h-[92vh] overflow-hidden shadow-2xl border-t sm:border border-[#E5E0D6] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="w-12 h-1 bg-[#D5CDC5] rounded-full mx-auto mt-2.5 mb-0.5 sm:hidden shrink-0" />

        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#E5E0D6] flex items-center justify-between bg-[#FBFBF9] shrink-0">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#964B59]">
              Partner Program Application
            </div>
            <h2 className="font-serif text-xl font-medium text-[#1F2421]">
              Join Velmora as a Home Spa Specialist & Visiting Therapist
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#964B59] hover:underline flex items-center gap-1 font-medium px-2 py-1 rounded hover:bg-[#F9ECEE] transition-colors"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 text-[#7C8880] hover:text-[#1F2421] rounded-full hover:bg-[#EFECE6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Highlight Perks Strip */}
        <div className="px-6 py-2.5 bg-[#FAF4F5] border-b border-[#F0D5DA] text-xs text-[#8E4A56] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 font-medium">
            <DollarSign className="w-4 h-4 text-[#B76E79]" />
            <span>Earn ₹2,500 – ₹5,500 / €80 – €160 per visit + 100% Client Tips (Spain 🇪🇸 & India 🇮🇳)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#B76E79]" />
            <span>Choose your own hours & neighborhood radius</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#B76E79]" />
            <span>Full liability coverage & background-vetted homes</span>
          </div>
        </div>

        {/* Embedded Google Form Container */}
        <div className="flex-1 w-full bg-[#FAF9F5] relative overflow-hidden flex flex-col">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#FAF9F5] z-10">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 border-2 border-[#964B59] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[#7C8880]">Loading official Velmora Partner Application Form...</p>
              </div>
            </div>
          )}

          <iframe
            src={GOOGLE_FORM_EMBED_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Velmora Home Spa Partner Form"
            onLoad={() => setIframeLoaded(true)}
            className="w-full h-full flex-1 border-0"
          >
            Loading Velmora Partner Registration Form...
          </iframe>
        </div>
      </div>
    </div>
  );
};
