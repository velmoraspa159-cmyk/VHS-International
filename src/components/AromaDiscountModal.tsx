import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Copy, ArrowRight, ShieldCheck, Heart, Leaf } from 'lucide-react';
import { VelmoraLogo } from './VelmoraLogo';

interface AromaDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAndBook: (promoCode: string) => void;
}

export const AromaDiscountModal: React.FC<AromaDiscountModalProps> = ({
  isOpen,
  onClose,
  onApplyAndBook
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedDosha, setSelectedDosha] = useState<'vata' | 'pitta' | 'kapha'>('pitta');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const PROMO_CODE = 'AROMA20';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    setIsSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with motion blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#EAE3DE] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Animated Aroma Steam & Botanical Mist Effect */}
            <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none opacity-40">
              <motion.div
                animate={{
                  y: [-10, -35, -10],
                  x: [-8, 8, -8],
                  scale: [1, 1.15, 1],
                  opacity: [0.35, 0.7, 0.35]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-10 left-1/4 w-48 h-48 bg-gradient-to-b from-[#E2A8AA]/40 to-transparent rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  y: [-5, -28, -5],
                  x: [6, -6, 6],
                  scale: [1, 1.2, 1],
                  opacity: [0.25, 0.6, 0.25]
                }}
                transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-12 right-1/4 w-44 h-44 bg-gradient-to-b from-[#C49278]/30 to-transparent rounded-full blur-2xl"
              />

              {/* Gentle floating herbal mist rings */}
              <svg className="w-full h-full" viewBox="0 0 400 160" fill="none">
                <motion.path
                  d="M 50 140 Q 150 70 250 110 T 380 60"
                  stroke="url(#steamGrad1)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  initial={{ pathOffset: 0 }}
                  animate={{ pathOffset: [0, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <motion.path
                  d="M 20 120 Q 120 40 220 80 T 360 40"
                  stroke="url(#steamGrad2)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  initial={{ pathOffset: 0 }}
                  animate={{ pathOffset: [1, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />
                <defs>
                  <linearGradient id="steamGrad1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#964B59" stopOpacity="0" />
                    <stop offset="50%" stopColor="#964B59" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#964B59" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="steamGrad2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2D4A3E" stopOpacity="0" />
                    <stop offset="50%" stopColor="#2D4A3E" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2D4A3E" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 p-2 text-[#7C8880] hover:text-[#1F2421] bg-white/70 hover:bg-white rounded-full transition-all cursor-pointer shadow-2xs"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Body */}
            <div className="relative p-6 sm:p-8 space-y-6">
              
              {/* Header Icon & Branding */}
              <div className="text-center space-y-2 pt-2">
                <div className="flex justify-center mb-1">
                  <VelmoraLogo size="sm" showSubtitle={false} />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4F5] border border-[#F0D5DA] text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8E4A56]">
                  <Sparkles className="w-3 h-3 text-[#B76E79]" />
                  <span>Vedic Aroma Ritual Voucher</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#1F2421] font-normal tracking-tight">
                  Awaken Your Inner Harmony
                </h3>

                <p className="text-xs sm:text-sm text-[#525E57] max-w-sm mx-auto leading-relaxed">
                  Enjoy <strong className="text-[#8E4A56]">20% Off</strong> your inaugural home spa ritual with therapeutic botanical oils in Spain 🇪🇸 & India 🇮🇳.
                </p>
              </div>

              {!isSubmitted ? (
                /* The Simple Minimalistic Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Dosha Essence Aroma Selector */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4A5550] mb-2 text-center">
                      Choose Your Ayurvedic Aroma Element
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'vata', label: 'Vata Calming', botanical: 'Sandalwood & Orange', icon: '🌸' },
                        { id: 'pitta', label: 'Pitta Cooling', botanical: 'Rose & Vetiver', icon: '🌿' },
                        { id: 'kapha', label: 'Kapha Revive', botanical: 'Eucalyptus & Mint', icon: '🍃' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedDosha(item.id as any)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[76px] ${
                            selectedDosha === item.id
                              ? 'bg-[#FAF4F5] border-[#964B59] ring-1 ring-[#964B59]/40 text-[#964B59] shadow-2xs'
                              : 'bg-white border-[#E5E0D6] text-[#525E57] hover:border-[#964B59]/40'
                          }`}
                        >
                          <span className="text-base mb-0.5">{item.icon}</span>
                          <span className="text-[11px] font-semibold leading-tight">{item.label}</span>
                          <span className="text-[9px] text-[#7C8880] truncate w-full">{item.botanical}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-2.5 pt-1">
                    <div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name (Optional)"
                        className="w-full text-xs p-3 bg-white border border-[#DDD7CD] rounded-xl text-[#1F2421] placeholder:text-[#A4AAA6] focus:outline-none focus:ring-1 focus:ring-[#964B59]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="WhatsApp / Mobile Number or Email *"
                        required
                        className="w-full text-xs p-3 bg-white border border-[#DDD7CD] rounded-xl text-[#1F2421] placeholder:text-[#A4AAA6] focus:outline-none focus:ring-1 focus:ring-[#964B59]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1F2B24] hover:bg-[#141C18] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <span>Claim 20% Sanctuary Voucher</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#7C8880] pt-1">
                    <ShieldCheck className="w-3 h-3 text-[#2D4A3E]" />
                    <span>Instant coupon code · Valid for 30 days on all rituals</span>
                  </div>
                </form>
              ) : (
                /* Celebration & Coupon Display State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 text-center py-2"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#EBF5EE] text-[#2D4A3E] flex items-center justify-center">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <div>
                    <h4 className="font-serif text-xl font-medium text-[#1F2421]">
                      Your Vedic Blessing is Active!
                    </h4>
                    <p className="text-xs text-[#525E57] mt-1">
                      Use the code below at checkout to receive 20% off your treatment.
                    </p>
                  </div>

                  {/* Coupon Card */}
                  <div className="p-4 bg-white rounded-2xl border border-dashed border-[#964B59] flex items-center justify-between gap-3 shadow-2xs">
                    <div className="text-left">
                      <span className="block text-[10px] text-[#7C8880] uppercase tracking-wider">Promo Code</span>
                      <span className="font-mono text-xl font-bold text-[#964B59] tracking-wider">{PROMO_CODE}</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-3.5 py-2 bg-[#FAF4F5] hover:bg-[#F2DFE3] text-[#8E4A56] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct Book CTA */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onApplyAndBook(PROMO_CODE);
                      }}
                      className="flex-1 py-3 bg-[#1F2B24] hover:bg-[#141C18] text-[#FAF9F5] text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Apply & Book Ritual Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={onClose}
                      className="px-4 py-3 bg-white border border-[#DDD7CD] hover:bg-[#FAF9F5] text-[#525E57] text-xs font-medium rounded-xl transition-colors cursor-pointer"
                    >
                      Browse First
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
