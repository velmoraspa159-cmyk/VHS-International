import React from 'react';
import { useSpa } from '../context/SpaContext';
import { VelmoraLogo } from './VelmoraLogo';
import { OFFICIAL_PHONE, getWhatsAppUrl } from '../utils/contact';
import { 
  Instagram, Facebook, Youtube, Linkedin, MapPin, 
  Phone, Mail, Clock, ExternalLink, MessageCircle, Building2,
  Sparkles, ArrowRight, HeartHandshake, Calendar
} from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenProfile: (tab?: any) => void;
  onOpenPartner: () => void;
  onOpenStory: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToCorporate: () => void;
  onOpenDiscount?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenProfile,
  onOpenPartner,
  onOpenStory,
  onNavigateToSection,
  onNavigateToCorporate,
  onOpenDiscount
}) => {
  const { isLoggedIn, bookings } = useSpa();

  return (
    <footer className="bg-white text-[#4A5550] pt-14 pb-20 md:pb-12 border-t border-[#EAE3DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: Vedic Aroma 20% Offer Banner & Partner With Us Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14">
          
          {/* Card 1: Vedic Aroma 20% Off Offer (Moved from header to footer) */}
          <div className="lg:col-span-7 p-6 sm:p-7 bg-gradient-to-br from-[#FAF4F5] via-[#FFF8F6] to-[#F5ECE8] rounded-3xl border border-[#F0D5DA] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#F0D5DA] text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8E4A56]">
                <Sparkles className="w-3 h-3 text-[#B76E79]" />
                <span>Special Sanctuary Offer</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1F2421] font-medium tracking-tight">
                20% Off Vedic Aroma Rituals
              </h3>
              <p className="text-xs text-[#525E57] max-w-md leading-relaxed">
                Claim your inaugural home spa voucher (Promo code: <strong className="font-mono text-[#8E4A56]">AROMA20</strong>) with organic therapeutic dosha oils in Spain 🇪🇸 & India 🇮🇳.
              </p>
            </div>

            {onOpenDiscount && (
              <button
                onClick={onOpenDiscount}
                className="px-5 py-3 bg-[#8E4A56] hover:bg-[#73333F] text-white text-xs font-semibold rounded-full shadow-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 group self-stretch sm:self-auto justify-center"
              >
                <span>Claim 20% Voucher</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>

          {/* Card 2: Partner With Us Feature (Moved from header to footer) */}
          <div className="lg:col-span-5 p-6 sm:p-7 bg-[#FAF9F5] rounded-3xl border border-[#E5E0D6] shadow-2xs flex flex-col justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#DDD7CD] text-[10px] uppercase tracking-[0.16em] font-semibold text-[#2D4A3E]">
                <HeartHandshake className="w-3 h-3 text-[#2D4A3E]" />
                <span>Join Specialist Team</span>
              </div>
              <h3 className="font-serif text-xl text-[#1F2421] font-medium tracking-tight">
                Partner With Us
              </h3>
              <p className="text-xs text-[#637068] leading-relaxed">
                Licensed massage therapist or aesthetician? Earn <strong>₹2,500 – ₹5,500</strong> / session + 100% tips with flexible hours.
              </p>
            </div>

            <button
              onClick={onOpenPartner}
              className="px-4 py-2.5 bg-white hover:bg-[#FAF4F5] border border-[#DDD7CD] text-[#8E4A56] text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-between group"
            >
              <span>Submit Google Partner Form</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>

        {/* Main 4-Column Grid matching reference image.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#EAE3DE]">
          
          {/* Column 1: Logo & Socials (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <VelmoraLogo size="md" />

            <p className="text-xs text-[#7C8880] tracking-wide pt-1">
              Relax. Rejuvenate. Rebalance.
            </p>

            <p className="text-xs text-[#525E57] leading-relaxed max-w-sm">
              Luxury mobile spa treatments delivered directly to your home, apartment, private villa, or corporate office with licensed master therapists.
            </p>

            {/* Social Icons & WhatsApp */}
            <div className="flex items-center gap-3 pt-2 text-[#7C8880]">
              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                title={`Chat on WhatsApp (${OFFICIAL_PHONE})`}
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#DDD7CD] flex items-center justify-center hover:text-[#964B59] hover:border-[#964B59] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#DDD7CD] flex items-center justify-center hover:text-[#964B59] hover:border-[#964B59] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#DDD7CD] flex items-center justify-center hover:text-[#964B59] hover:border-[#964B59] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#DDD7CD] flex items-center justify-center hover:text-[#964B59] hover:border-[#964B59] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-serif text-sm font-semibold text-[#1F2421]">
              Quick Links
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-[#964B59] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('services')}
                  className="hover:text-[#964B59] transition-colors cursor-pointer"
                >
                  Services & Rituals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('wellness-journal')}
                  className="hover:text-[#964B59] font-medium text-[#1F2421] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#964B59]" />
                  <span>Journal & Guides</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('faqs')}
                  className="hover:text-[#964B59] transition-colors cursor-pointer"
                >
                  FAQs & Client Queries
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToCorporate}
                  className="hover:text-[#964B59] text-[#964B59] font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Corporate Wellness</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStory}
                  className="hover:text-[#964B59] transition-colors cursor-pointer"
                >
                  About Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPartner}
                  className="hover:text-[#964B59] font-medium text-[#8E4A56] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Partner With Us</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>

              {/* My Bookings: ONLY VISIBLE AFTER SIGN UP / SIGN IN */}
              {isLoggedIn && (
                <li>
                  <button
                    onClick={() => onOpenProfile('history')}
                    className="hover:text-[#964B59] transition-colors cursor-pointer text-[#8E4A56] font-semibold flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>My Bookings ({bookings.length})</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Our Services (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-serif text-sm font-semibold text-[#1F2421]">
              Our Services
            </div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={onOpenBooking} className="hover:text-[#964B59] transition-colors cursor-pointer">Signature Massage Therapy</button></li>
              <li><button onClick={onOpenBooking} className="hover:text-[#964B59] transition-colors cursor-pointer">Facials & Organic Skincare</button></li>
              <li><button onClick={onOpenBooking} className="hover:text-[#964B59] transition-colors cursor-pointer">Herbal Body Treatments</button></li>
              <li><button onClick={onOpenBooking} className="hover:text-[#964B59] transition-colors cursor-pointer">Couple's Sanctuary Packages</button></li>
              <li><button onClick={onNavigateToCorporate} className="hover:text-[#964B59] transition-colors cursor-pointer font-medium text-[#964B59]">Office Chair De-Stress Sessions</button></li>
              <li><button onClick={onOpenBooking} className="hover:text-[#964B59] transition-colors cursor-pointer">Himalayan Stone Spa Rituals</button></li>
            </ul>
          </div>

          {/* Column 4: Contact Us + International Hubs (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="font-serif text-sm font-semibold text-[#1F2421]">
              Contact Us
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#964B59] shrink-0 mt-0.5" />
                <span>
                  <strong>Spain 🇪🇸:</strong> Madrid · Barcelona · Marbella<br />
                  <strong>India 🇮🇳:</strong> Delhi NCR · Mumbai · Bengaluru
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#964B59] shrink-0" />
                <a href="tel:+919912706021" className="hover:text-[#964B59] font-mono font-semibold">
                  {OFFICIAL_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline font-medium"
                >
                  WhatsApp: Chat Redirect from Website
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#964B59] shrink-0" />
                <a href="mailto:velmoraspa159@gmail.com" className="hover:text-[#964B59]">
                  velmoraspa159@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#964B59] shrink-0" />
                <span>Mon – Sun: 9:00 AM – 9:00 PM</span>
              </div>
            </div>

            {/* Handwritten Note matching reference image.png */}
            <div className="pt-3 select-none">
              <div className="font-serif italic text-2xl text-[#964B59] leading-tight">
                A Healthier
              </div>
              <div className="font-serif italic text-xl text-[#7C4A55] flex items-center gap-1">
                <span>Happier You</span>
                <span className="text-[#964B59]">♡</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E9B93]">
          <div>
            © {new Date().getFullYear()} Velmora Home Spa & Wellness. Since 2014. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#1F2421] transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#1F2421] transition-colors">Terms of Service</a>
            <span>·</span>
            <button onClick={onNavigateToCorporate} className="hover:text-[#964B59] transition-colors">
              Corporate Desk
            </button>
            <span>·</span>
            <button onClick={onOpenPartner} className="hover:text-[#8E4A56] font-semibold transition-colors underline">
              Partner Google Form
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
