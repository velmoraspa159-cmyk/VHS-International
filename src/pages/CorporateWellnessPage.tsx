import React, { useState } from 'react';
import { OFFICIAL_PHONE, getWhatsAppUrl } from '../utils/contact';
import { VelmoraLogo } from '../components/VelmoraLogo';
import { 
  Building2, Users, Heart, ShieldCheck, CheckCircle2, 
  ArrowRight, Phone, MessageCircle, Calendar, Sparkles, 
  Award, TrendingUp, Clock, FileText, ChevronRight, Check
} from 'lucide-react';

interface CorporateWellnessPageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const CorporateWellnessPage: React.FC<CorporateWellnessPageProps> = ({
  onBackToHome,
  onOpenBooking
}) => {
  // Quote calculator state
  const [teamSize, setTeamSize] = useState<'small' | 'medium' | 'large' | 'enterprise'>('medium');
  const [frequency, setFrequency] = useState<'onetime' | 'monthly' | 'biweekly'>('monthly');
  const [programType, setProgramType] = useState<'chair' | 'executive' | 'hybrid'>('chair');

  // Form submission state
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [cityLocation, setCityLocation] = useState('Gurgaon / Delhi NCR (India) & Madrid / Barcelona (Spain)');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Pricing calculations (INR values)
  const baseEmployees = teamSize === 'small' ? 20 : teamSize === 'medium' ? 45 : teamSize === 'large' ? 85 : 150;
  const perEmployeeRate = programType === 'chair' ? 999 : programType === 'executive' ? 1999 : 1499;
  const frequencyDiscount = frequency === 'monthly' ? 0.85 : frequency === 'biweekly' ? 0.75 : 1.0;
  
  const estimatedCost = Math.round(baseEmployees * perEmployeeRate * frequencyDiscount);
  const therapistsNeeded = Math.ceil(baseEmployees / 12);

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const programs = [
    {
      id: 'chair',
      title: 'Ergonomic Desk De-Stress Chair Massage',
      idealFor: 'Tech companies, financial desks, creative agencies',
      duration: '15 – 20 mins per employee',
      desc: 'No clothes change required. Certified LMTs provide acupressure, neck, shoulder, lumbar, and wrist relief right at an open office nook.',
      features: ['Focus on neck tension & carpel tunnel', 'Up to 24 employees per therapist daily', 'Zero disruption to meetings']
    },
    {
      id: 'executive',
      title: 'Executive Sanctuary Suite & Private Sessions',
      idealFor: 'Leadership teams, C-suite suites, private retreats',
      duration: '30 – 45 mins per executive',
      desc: 'We transform an unused conference room into a tranquil spa sanctuary with heated hydraulic table, essential oils, and sound healing.',
      features: ['Full targeted deep tissue or Swedish', 'Aromatherapy nebulizer & warm basalt stones', 'Post-treatment organic herbal infusions']
    },
    {
      id: 'retreat',
      title: 'Corporate Wellness Days & Offsite Summits',
      idealFor: 'Annual offsites, hackathons, Women\'s Day, Mental Health Week',
      duration: 'Full Day / Multi-Station Experience',
      desc: 'Comprehensive multi-station relaxation setup including chair massages, botanical eye treatments, and guided breathing audio stations.',
      features: ['Multi-practitioner coordinated team', 'Branded wellness gift bags option', 'Customizable station flow for up to 300+ staff']
    },
    {
      id: 'vouchers',
      title: 'Corporate Gifting & Home Spa Vouchers',
      idealFor: 'Remote teams, employee perks, client appreciation',
      duration: '60 – 120 mins home visits',
      desc: 'Send five-star Velmora home spa vouchers to remote employees or top-performing team members to enjoy at their personal residence.',
      features: ['Digital or luxury boxed voucher cards', 'Valid across all residential service areas', 'Seamless online booking for recipients']
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#1F2421] font-sans">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#1C2C24] text-white text-xs px-4 py-2 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="text-[#B7C9BD] hover:text-white transition-colors cursor-pointer"
            >
              ← Back to Main Home Spa
            </button>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Corporate Wellness Solutions</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-white/70">
              Corporate Desk Helpline: <strong>{OFFICIAL_PHONE}</strong>
            </span>
            <a
              href={getWhatsAppUrl('corporate')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5C] text-white px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden border-b border-[#EAE3DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4F5] border border-[#F0D5DA] text-[#964B59] text-xs font-semibold tracking-wide uppercase">
                <Building2 className="w-3.5 h-3.5" />
                <span>Velmora Corporate Wellness Program</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F2421] leading-[1.08] font-normal tracking-tight text-balance">
                Bring Five-Star Spa Wellness Directly to Your Workplace
              </h1>

              <p className="text-base sm:text-lg text-[#525E57] leading-relaxed max-w-xl">
                Alleviate screen burnout, reduce posture strain, and show your team tangible care. Our certified master bodyworkers arrive equipped with ergonomic massage chairs, organic botanicals, and zero disruption.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#calculator"
                  className="px-6 py-3.5 bg-[#1F2B24] hover:bg-[#141C18] text-white text-xs sm:text-sm font-medium rounded-full shadow-sm transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <span>Calculate Proposal & Rates</span>
                  <span className="text-base leading-none transition-transform group-hover:translate-x-1">→</span>
                </a>

                <a
                  href={getWhatsAppUrl('corporate')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-white hover:bg-[#FAF7F5] text-[#1F2421] text-xs sm:text-sm font-medium rounded-full border border-[#DDD7CD] shadow-2xs transition-all flex items-center gap-2.5"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                  <span>Chat on WhatsApp ({OFFICIAL_PHONE})</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#EAE3DE] text-xs">
                <div>
                  <div className="font-mono text-xl font-bold text-[#964B59]">-38%</div>
                  <div className="text-[#637068] mt-0.5">Stress & Neck Strain</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-[#964B59]">100%</div>
                  <div className="text-[#637068] mt-0.5">Licensed & Insured LMTs</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-[#964B59]">0 Min</div>
                  <div className="text-[#637068] mt-0.5">Setup Effort for HR</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold text-[#964B59]">150+</div>
                  <div className="text-[#637068] mt-0.5">Corporate Clients Served</div>
                </div>
              </div>

            </div>

            {/* Right Column: High-Res Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#EAE3DE] aspect-4/3 lg:aspect-16/12 bg-[#EFECE6]">
                <img
                  src="/src/assets/images/corporate_wellness_office_massage_1791267964899.jpg"
                  alt="Corporate Chair Massage in modern office"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-sm">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-serif font-medium text-sm text-[#1F2421]">
                        On-Site Office Chair Massage
                      </div>
                      <div className="text-[11px] text-[#637068] mt-0.5">
                        Compact, silent, fully sanitized between employees
                      </div>
                    </div>
                    <span className="font-mono text-[#964B59] font-semibold text-[11px] bg-[#FAF4F5] px-2.5 py-1 rounded-full">
                      Zero Disruption
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Program Offerings Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#EAE3DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8E4A56] mb-2">
              Our Corporate Offerings
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421] font-normal tracking-tight">
              Tailored Wellness for Modern Teams
            </h2>
            <p className="text-sm sm:text-base text-[#525E57] mt-3">
              Whether you need monthly wellness days, quarterly offsite retreats, or physical luxury voucher rewards, Velmora coordinates end-to-end execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="p-6 rounded-2xl bg-[#FCFAF8] border border-[#EAE3DE] flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="text-[11px] font-mono uppercase text-[#964B59] font-semibold">
                    {prog.duration}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#1F2421] mt-1.5">
                    {prog.title}
                  </h3>
                  <div className="text-[11px] text-[#7C8880] italic mt-1">
                    {prog.idealFor}
                  </div>
                  <p className="text-xs text-[#525E57] mt-3 leading-relaxed">
                    {prog.desc}
                  </p>

                  <ul className="mt-4 space-y-1.5 pt-3 border-t border-[#F0EBE6]">
                    {prog.features.map((f, i) => (
                      <li key={i} className="text-[11px] text-[#4A5550] flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#2D4A3E] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3">
                  <a
                    href="#calculator"
                    className="w-full py-2 bg-white hover:bg-[#FAF4F5] border border-[#DDD7CD] text-[#1F2421] hover:text-[#964B59] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Request Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Quotation Calculator & Request Proposal Section */}
      <section id="calculator" className="py-16 sm:py-24 bg-[#FAF7F5] border-b border-[#EAE3DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8E4A56] mb-2">
              Corporate Quotation Tool
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421] font-normal tracking-tight">
              Instant Corporate Estimate & Proposal Request
            </h2>
            <p className="text-sm text-[#525E57] mt-3">
              Configure your team size and frequency for an instant estimate, or submit your details to receive an official corporate proposal within 2 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Configurator */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3DE] shadow-xs space-y-6">
              
              {/* Step 1: Team Size */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#964B59] mb-2.5">
                  1. Select Office Team Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {[
                    { id: 'small', label: '10 – 25 Staff', count: '20' },
                    { id: 'medium', label: '25 – 50 Staff', count: '45' },
                    { id: 'large', label: '50 – 100 Staff', count: '85' },
                    { id: 'enterprise', label: '100+ Staff', count: '150+' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTeamSize(t.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        teamSize === t.id
                          ? 'bg-[#FAF4F5] border-[#964B59] text-[#964B59] font-bold ring-1 ring-[#964B59]/30'
                          : 'bg-[#FAF7F5] border-[#DDD7CD] text-[#525E57] hover:border-[#964B59]'
                      }`}
                    >
                      <div>{t.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Program Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#964B59] mb-2.5">
                  2. Preferred Program Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  {[
                    { id: 'chair', title: 'Ergonomic Chair', desc: '15m / employee at desk' },
                    { id: 'executive', title: 'Executive Suite', desc: '30m / private meeting room' },
                    { id: 'hybrid', title: 'Hybrid Spa Day', desc: 'Chairs + Sound relaxation' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProgramType(p.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        programType === p.id
                          ? 'bg-[#FAF4F5] border-[#964B59] text-[#964B59] font-bold ring-1 ring-[#964B59]/30'
                          : 'bg-[#FAF7F5] border-[#DDD7CD] text-[#525E57] hover:border-[#964B59]'
                      }`}
                    >
                      <div>{p.title}</div>
                      <div className="text-[10px] text-[#7C8880] mt-0.5">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Frequency */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#964B59] mb-2.5">
                  3. Session Frequency
                </label>
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  {[
                    { id: 'onetime', label: 'One-Time Event', desc: 'Offsite or Special Day' },
                    { id: 'monthly', label: 'Monthly Wellness', desc: '15% Discount included' },
                    { id: 'biweekly', label: 'Bi-Weekly Retainer', desc: '25% Discount included' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFrequency(f.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        frequency === f.id
                          ? 'bg-[#FAF4F5] border-[#964B59] text-[#964B59] font-bold ring-1 ring-[#964B59]/30'
                          : 'bg-[#FAF7F5] border-[#DDD7CD] text-[#525E57] hover:border-[#964B59]'
                      }`}
                    >
                      <div>{f.label}</div>
                      <div className="text-[10px] text-[#7C8880] mt-0.5">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Cost Summary Box */}
              <div className="p-5 bg-[#FAF7F5] rounded-xl border border-[#EAE3DE] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs">
                  <div className="font-semibold text-sm text-[#1F2421]">
                    Estimated Package Value
                  </div>
                  <div className="text-[#637068] mt-0.5">
                    Includes {therapistsNeeded} licensed therapist(s) · All equipment, sanitization & sheets provided
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#1F2421]">
                    ₹{estimatedCost.toLocaleString('en-IN')}
                    <span className="text-xs font-sans font-normal text-[#7C8880]"> / session</span>
                  </div>
                  <div className="text-[11px] text-[#2D4A3E] font-medium">
                    Approx. ₹{Math.round(estimatedCost / baseEmployees).toLocaleString('en-IN')} per employee
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Request Official Proposal Form */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE3DE] shadow-xs space-y-5">
              <div>
                <h3 className="font-serif text-2xl font-medium text-[#1F2421]">
                  Request Formal Proposal
                </h3>
                <p className="text-xs text-[#637068] mt-1">
                  Our Corporate Concierge will review your schedule and dispatch details to send an official invoice/quote.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 bg-[#FAF4F5] border border-[#F0D5DA] rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#964B59] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl text-[#1F2421]">
                    Proposal Request Received!
                  </h4>
                  <p className="text-xs text-[#525E57]">
                    Thank you, {contactName}. A detailed corporate proposal for <strong>{companyName}</strong> has been sent to <strong>{workEmail}</strong>.
                  </p>
                  <div className="pt-2">
                    <a
                      href={getWhatsAppUrl('corporate')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-xs font-semibold rounded-lg shadow-2xs"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Follow Up on WhatsApp ({OFFICIAL_PHONE})</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitProposal} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A5550] mb-1">Company / Organization Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Technologies Inc."
                      required
                      className="w-full p-2.5 bg-[#FAF7F5] border border-[#DDD7CD] rounded-md text-[#1F2421]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A5550] mb-1">HR / Coordinator Full Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      required
                      className="w-full p-2.5 bg-[#FAF7F5] border border-[#DDD7CD] rounded-md text-[#1F2421]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A5550] mb-1">Corporate Work Email</label>
                      <input
                        type="email"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="s.jenkins@acme.com"
                        required
                        className="w-full p-2.5 bg-[#FAF7F5] border border-[#DDD7CD] rounded-md text-[#1F2421]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A5550] mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+1 / +91 ..."
                        required
                        className="w-full p-2.5 bg-[#FAF7F5] border border-[#DDD7CD] rounded-md text-[#1F2421]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A5550] mb-1">Office Location / City</label>
                    <input
                      type="text"
                      value={cityLocation}
                      onChange={(e) => setCityLocation(e.target.value)}
                      placeholder="e.g. Manhattan, NY or Tech Park, Gurgaon"
                      className="w-full p-2.5 bg-[#FAF7F5] border border-[#DDD7CD] rounded-md text-[#1F2421]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#964B59] hover:bg-[#7D3B47] text-white font-medium rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Submit & Receive Corporate Proposal</span>
                  </button>

                  <div className="text-center pt-2">
                    <a
                      href={getWhatsAppUrl('corporate')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#25D366] font-medium hover:underline inline-flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Prefer instant WhatsApp? Chat at {OFFICIAL_PHONE}</span>
                    </a>
                  </div>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Corporate FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1F2421]">
              Frequently Asked Questions by HR & People Ops
            </h2>
            <p className="text-xs text-[#637068]">
              Everything you need to know about setting up Velmora in your office.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#FAF7F5] rounded-xl border border-[#EAE3DE] space-y-1.5">
              <h4 className="font-semibold text-sm text-[#1F2421]">What space or room do we need to provide?</h4>
              <p className="text-[#525E57] leading-relaxed">
                For chair massages, an open corner or small meeting room of approx. 6x6 feet per chair is plenty. For executive suite sessions, a standard conference room works perfectly. We bring our own ergonomic chairs, sanitizers, and fresh disposable headrest linens.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F5] rounded-xl border border-[#EAE3DE] space-y-1.5">
              <h4 className="font-semibold text-sm text-[#1F2421]">Do employees need to remove clothing or use oils at the office?</h4>
              <p className="text-[#525E57] leading-relaxed">
                No. Our workplace chair massages are 100% dry and performed over business attire without oils. For private executive sessions, employees can opt for targeted aromatherapy oils if preferred.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F5] rounded-xl border border-[#EAE3DE] space-y-1.5">
              <h4 className="font-semibold text-sm text-[#1F2421]">Are your therapists licensed and insured?</h4>
              <p className="text-[#525E57] leading-relaxed">
                Yes. Every Velmora therapist carries valid State/International Board Licensure (LMT) and full professional liability insurance (₹15 Crore / €2,000,000 international policy). Certificates of Insurance (COI) listing your company as additional insured can be provided within 24 hours.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F5] rounded-xl border border-[#EAE3DE] space-y-1.5">
              <h4 className="font-semibold text-sm text-[#1F2421]">How do we pay or book?</h4>
              <p className="text-[#525E57] leading-relaxed">
                We accept corporate credit cards, ACH wire transfer, and Net-30 invoicing for recurring enterprise accounts. Simply reach out via our calculator form or WhatsApp at <strong>{OFFICIAL_PHONE}</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
