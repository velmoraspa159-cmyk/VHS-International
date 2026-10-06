import React, { useState } from 'react';
import { GOOGLE_FORM_URL, GOOGLE_FORM_EMBED_URL } from './PartnerFormModal';
import { 
  Sparkles, ShieldCheck, DollarSign, Clock, HeartHandshake, 
  CheckCircle, ExternalLink, ArrowRight, UserCheck 
} from 'lucide-react';

interface PartnerSectionProps {
  onOpenPartnerModal: () => void;
}

export const PartnerSection: React.FC<PartnerSectionProps> = ({ onOpenPartnerModal }) => {
  const [showEmbeddedForm, setShowEmbeddedForm] = useState(false);

  return (
    <section id="partner" className="py-16 sm:py-24 bg-[#FAF7F5] border-t border-[#EAE3DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#964B59] mb-2 flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-[#964B59]"></span>
            <span>Join Our Network of Specialists</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421] font-normal tracking-tight text-balance">
            Work With Velmora as a Home Spa Visiting Specialist
          </h2>
          <p className="text-sm sm:text-base text-[#525E57] mt-3">
            Are you a licensed massage therapist, holistic aesthetician, or bodywork practitioner? Join our growing team of elite home wellness providers with industry-leading payouts, flexible schedules, and verified residential clients.
          </p>
        </div>

        {/* Highlight Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="p-5 bg-white border border-[#E5E0D6] rounded-xl space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF4F5] text-[#964B59] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-medium text-[#1F2421]">
              Industry High Payouts
            </h3>
            <p className="text-xs text-[#637068] leading-relaxed">
              Earn ₹2,500 – ₹5,500 / €80 – €160 per session with direct weekly payouts + 100% of client tips retained across Spain 🇪🇸 & India 🇮🇳.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E5E0D6] rounded-xl space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF4F5] text-[#964B59] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-medium text-[#1F2421]">
              100% Flexible Schedule
            </h3>
            <p className="text-xs text-[#637068] leading-relaxed">
              Accept appointments on your own terms. Set your preferred working days, hours, and travel radius.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E5E0D6] rounded-xl space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF4F5] text-[#964B59] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-medium text-[#1F2421]">
              Safety & Verified Clients
            </h3>
            <p className="text-xs text-[#637068] leading-relaxed">
              Every client is verified with card tokenization and residential background authentication before dispatch.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E5E0D6] rounded-xl space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF4F5] text-[#964B59] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-medium text-[#1F2421]">
              Equipment & Organic Oils
            </h3>
            <p className="text-xs text-[#637068] leading-relaxed">
              We provide access to lightweight ergonomic beds, certified organic botanical elixirs, and linen laundering.
            </p>
          </div>
        </div>

        {/* Embedded Google Form Section / Expandable Container */}
        <div className="bg-white border border-[#E5E0D6] rounded-2xl shadow-xs overflow-hidden">
          <div className="p-6 sm:p-8 bg-[#FAF4F5] border-b border-[#F0D5DA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#964B59]" />
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1F2421]">
                  Official Partner Application Form
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#7C4A55] mt-1">
                Fill out the quick Google Form below to submit your credentials, experience, and preferred availability.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowEmbeddedForm(!showEmbeddedForm)}
                className="px-4 py-2.5 bg-white border border-[#DDD7CD] hover:bg-[#FDFBFB] text-[#1F2421] text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                {showEmbeddedForm ? 'Minimize Form' : 'Show Form On Page'}
              </button>

              <button
                onClick={onOpenPartnerModal}
                className="px-5 py-2.5 bg-[#964B59] hover:bg-[#7D3B47] text-white text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Open Full-Screen Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Embedded Google Form */}
          {showEmbeddedForm ? (
            <div className="w-full h-[700px] bg-[#FAF9F5] p-2 sm:p-4">
              <iframe
                src={GOOGLE_FORM_EMBED_URL}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Velmora Partner Google Form"
                className="w-full h-full rounded-xl border border-[#E5E0D6] bg-white"
              >
                Loading Google Form...
              </iframe>
            </div>
          ) : (
            <div className="p-8 text-center bg-[#FCFAF8] space-y-4">
              <p className="text-xs sm:text-sm text-[#637068] max-w-lg mx-auto">
                Ready to begin your application? Click below to complete the secure Google Form online. Our talent onboarding concierge reviews all submissions within 24–48 hours.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setShowEmbeddedForm(true)}
                  className="px-5 py-2.5 bg-[#964B59] hover:bg-[#7D3B47] text-white text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Fill Application Form Here</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-white border border-[#DDD7CD] hover:bg-[#FBFBF9] text-[#1F2421] text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Open Direct Google Form Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
