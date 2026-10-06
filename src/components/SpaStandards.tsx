import React from 'react';
import { Sparkles, ShieldCheck, Clock, MapPin, Feather, CheckCircle } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

export const SpaStandards: React.FC = () => {
  return (
    <section id="experience" className="py-16 sm:py-24 bg-white border-b border-[#E5E0D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] mb-2">
            The Velmora Gold Standard
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421] font-normal tracking-tight text-balance">
            Zero Effort Setup. Pure Sanctuary at Home.
          </h2>
          <p className="text-sm sm:text-base text-[#525E57] mt-3">
            You do not need to prepare anything except a quiet room. Our therapists arrive 15 minutes prior to transform your living room or suite into a calming haven.
          </p>
        </div>

        {/* 3-Column Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="p-6 rounded-xl border border-[#E5E0D6] bg-[#FBFBF9] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#E8EFEA] flex items-center justify-center text-[#2D4A3E]">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1F2421]">
              01. Everything Provided
            </h3>
            <p className="text-xs sm:text-sm text-[#525E57] leading-relaxed">
              We supply the heated ergonomic massage table, fresh 1,000-thread count Egyptian cotton linens, hypoallergenic fleece, eye pillows, and organic botanicals.
            </p>
            <ul className="text-xs text-[#4A5550] space-y-1.5 pt-2 border-t border-[#EAE5DC]">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Adjustable ergonomic face cradle</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Therapist-controlled table warmer</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Soundscape speaker & essential mist</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border border-[#E5E0D6] bg-[#FBFBF9] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#E8EFEA] flex items-center justify-center text-[#2D4A3E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1F2421]">
              02. Certified & Vetted LMTs
            </h3>
            <p className="text-xs sm:text-sm text-[#525E57] leading-relaxed">
              Every practitioner is licensed with state massage boards, carries active professional liability insurance, and passes strict in-person technique assessments.
            </p>
            <ul className="text-xs text-[#4A5550] space-y-1.5 pt-2 border-t border-[#EAE5DC]">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Minimum 5+ years master practice</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Sterilized & sealed tools for every visit</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Continuous background audits</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-xl border border-[#E5E0D6] bg-[#FBFBF9] space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#E8EFEA] flex items-center justify-center text-[#2D4A3E]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1F2421]">
              03. Punctual & Effortless
            </h3>
            <p className="text-xs sm:text-sm text-[#525E57] leading-relaxed">
              Book on-demand in as fast as 60 minutes or reserve weeks in advance. Live arrival tracking gives you an exact minute-by-minute arrival estimate.
            </p>
            <ul className="text-xs text-[#4A5550] space-y-1.5 pt-2 border-t border-[#EAE5DC]">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Live dispatch radar & therapist contact</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Free cancellation up to 2h before</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Automated receipt & invoice for FSA/HSA</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
