import React, { useState } from 'react';
import { SEO_SEARCH_KEYWORDS } from '../data/blogData';
import { 
  ChevronDown, ChevronUp, Sparkles, ShieldCheck, CheckCircle2, 
  HelpCircle, Search, Flame, ArrowRight, HeartHandshake, Award
} from 'lucide-react';

interface SeoFaqSectionProps {
  onOpenBooking: () => void;
  onKeywordClick?: (keyword: string) => void;
}

export const SeoFaqSection: React.FC<SeoFaqSectionProps> = ({ onOpenBooking, onKeywordClick }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const FAQS = [
    {
      q: 'How does in-home doorstep spa and massage service work?',
      a: 'Booking an in-home spa is simple and seamless. You select your preferred ritual, certified therapist, and convenient arrival time slot online. At your scheduled time, your therapist arrives at your doorstep equipped with a professional heated massage table, sterile Egyptian cotton linens, warmed botanical oils, and ambient music. All you do is unwind in the comfort of your living space.'
    },
    {
      q: 'What equipment does the therapist bring? Do I need to provide anything?',
      a: 'You do not need to provide any equipment. Velmora therapists arrive with a complete portable five-star spa suite: heated memory foam bed, single-use sterilized face cradle covers, plush fleece blankets, USDA-certified organic aromatherapy oils, hot stone warmers, and ultrasonic scent diffusers. You only need to provide an unobstructed 6.5 x 6.5 ft area in your room.'
    },
    {
      q: 'Can I request a certified female therapist for my home session?',
      a: 'Yes, absolutely. Velmora gives you full transparency and choice. In Step 2 of the booking flow, you can view each licensed practitioner’s photo, board certification, experience level, and gender, or choose our intelligent auto-dispatch for the fastest arrival.'
    },
    {
      q: 'How are Velmora therapists licensed, vetted, and background-checked?',
      a: 'We adhere to the highest hospitality and security standards in the industry. Every therapist holds verified state or international massage therapy credentials (such as CIDESCO, Wat Po, or State Board LMT licenses), undergoes strict biometric and criminal background checks, and completes practical protocol evaluations overseen by senior master bodyworkers.'
    },
    {
      q: 'How should I prepare my home before the therapist arrives?',
      a: 'Preparation takes less than five minutes: 1) Clear a 6.5 x 6.5 ft open floor space in your bedroom or living room; 2) Dim bright overhead lights and adjust room temperature to a cozy 22°C–24°C (72°F–75°F); 3) Take a warm shower beforehand to relax muscle tension and maximize oil absorption.'
    },
    {
      q: 'What is your cancellation and rescheduling policy?',
      a: 'We know schedules change. You can reschedule or cancel your appointment free of charge up to 3 hours prior to your scheduled arrival time directly from your personal Sanctuary Profile or Live Radar Tracking screen.'
    },
    {
      q: 'Why is an in-home massage more effective than driving to a day spa?',
      a: 'Clinical sleep and wellness research confirms that staying in your home preserves your parasympathetic "rest-and-digest" nervous system state. Driving through traffic, searching for parking, and navigating crowded lobbies elevates cortisol, undoing the muscle-relaxing benefits. At home, you can slip directly into your bed or bath immediately following your treatment.'
    }
  ];

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-white border-t border-[#EAE3DE] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF4F5] text-[#964B59] rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Search Intent & Client Queries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1F2421] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#637068] leading-relaxed">
            Everything you need to know about booking, therapist credentials, safety protocols, and doorstep spa logistics.
          </p>
        </div>

        {/* 1. Trending High-Volume Search Keywords Cloud */}
        <div className="mb-14 p-6 sm:p-8 bg-[#FAF9F5] rounded-2xl border border-[#EAE3DE]">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#964B59]" />
              <h3 className="font-serif text-base sm:text-lg font-medium text-[#1F2421]">
                Trending Google Search Keywords for Home Spa & Doorstep Wellness
              </h3>
            </div>
            <span className="text-[11px] text-[#7C8880] uppercase tracking-wider font-semibold">
              Live Verified Search Volume
            </span>
          </div>

          <p className="text-xs text-[#637068] mb-4">
            Discover why thousands of clients search for doorstep massage each month. Click any high-intent search query to book or learn more:
          </p>

          <div className="flex flex-wrap gap-2.5">
            {SEO_SEARCH_KEYWORDS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (onKeywordClick) onKeywordClick(item.keyword);
                  onOpenBooking();
                }}
                className="group inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#1F2B24] border border-[#DDD7CD] hover:border-[#1F2B24] rounded-xl text-xs transition-all shadow-2xs hover:shadow-sm cursor-pointer text-left"
              >
                <Search className="w-3.5 h-3.5 text-[#964B59] group-hover:text-[#C1AA91]" />
                <span className="font-medium text-[#1F2421] group-hover:text-white">
                  {item.keyword}
                </span>
                <span className="text-[10px] text-[#7C8880] group-hover:text-[#A8B7AF] bg-[#F5EFEA] group-hover:bg-[#2C3B32] px-2 py-0.5 rounded font-mono">
                  {item.monthlyVolume}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Responsive 2-Column Layout: FAQs Accordion + Trust Standards Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Accordion list (8 cols) */}
          <div className="lg:col-span-8 space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-[#FCFBF9] border-[#964B59]/40 shadow-xs ring-1 ring-[#964B59]/20'
                      : 'bg-white border-[#EAE3DE] hover:border-[#DDD7CD]'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-[#1F2421] leading-snug">
                      {faq.q}
                    </span>
                    <div className={`p-1.5 rounded-full shrink-0 transition-colors ${
                      isOpen ? 'bg-[#964B59] text-white' : 'bg-[#F2ECE6] text-[#4A5550]'
                    }`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#525E57] leading-relaxed border-t border-[#F0EBE5] pt-3 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Trust, Safety & Instant Booking Guarantee (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 bg-[#FAF9F5] border border-[#EAE3DE] rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-[#2D4A3E]">
                <ShieldCheck className="w-5 h-5 text-[#2D4A3E]" />
                <h4 className="font-serif text-lg font-medium text-[#1F2421]">
                  The Velmora Safety Guarantee
                </h4>
              </div>

              <p className="text-xs text-[#637068] leading-relaxed">
                We believe total relaxation begins with total safety and transparency. Every ritual is backed by our four pillars of clinical excellence.
              </p>

              <div className="space-y-3 text-xs text-[#3E4A43] pt-2 border-t border-[#EAE3DE]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>100% Licensed Practitioners:</strong> Verified state board LMT and CIDESCO certifications.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Hospital-Grade Hygiene:</strong> Single-use sterile linens and sanitized equipment.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Transparent Pricing:</strong> Zero hidden surge pricing or mandatory tip fees.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Instant Live GPS Radar:</strong> Real-time ETA and direct contact with your specialist.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE3DE]">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 bg-[#1F2B24] hover:bg-[#141C18] text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Book Your Ritual in 2 Minutes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Helpline Card */}
            <div className="p-5 bg-[#FAF4F5] border border-[#F0D5DA] rounded-2xl flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#964B59]">
                  Need Personalized Help?
                </div>
                <div className="text-xs text-[#525E57] mt-0.5">
                  Speak directly with a sanctuary concierge.
                </div>
              </div>
              <a
                href="https://wa.me/919912706021?text=Hi%20Velmora,%20I%20have%20a%20question%20about%20booking%20a%20home%20spa%20ritual"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#964B59] hover:bg-[#823E4B] text-white text-[11px] font-medium rounded-full cursor-pointer whitespace-nowrap shadow-xs"
              >
                WhatsApp Us
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
