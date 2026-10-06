import React, { useState } from 'react';
import { SpaService, OrganicOil, SpaAddOn, Therapist } from '../types';
import { 
  CreditCard, ShieldCheck, Lock, Check, AlertCircle, 
  Smartphone, Building2, Wallet, ArrowRight, Sparkles, RefreshCw
} from 'lucide-react';

interface PaymentGatewayProps {
  service: SpaService;
  selectedDuration: number;
  durationPrice: number;
  selectedOil: OrganicOil;
  selectedAddOns: SpaAddOn[];
  therapist: Therapist | 'auto';
  date: string;
  timeSlot: string;
  initialPromoCode?: string;
  onSuccess: (paymentInfo: {
    method: 'card' | 'apple_pay' | 'google_pay' | 'bank_transfer' | 'deposit_cod';
    cardBrand?: string;
    last4?: string;
    tipAmount: number;
    discountAmount: number;
    promoCode?: string;
    totalAmount: number;
  }) => void;
  onBack: () => void;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  service,
  selectedDuration,
  durationPrice,
  selectedOil,
  selectedAddOns,
  therapist,
  date,
  timeSlot,
  initialPromoCode,
  onSuccess,
  onBack
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'bank_transfer' | 'deposit_cod'>('card');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('Camilla Montgomery');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('883');
  const [saveCard, setSaveCard] = useState(true);

  // Tip calculation
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');

  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState(() => initialPromoCode || 'AROMA20');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; type: 'percent' | 'flat' } | null>(() => {
    if (initialPromoCode === 'AROMA20' || initialPromoCode === 'AYURVEDA20' || !initialPromoCode) {
      return { code: 'AROMA20', discount: 20, type: 'percent' };
    }
    return null;
  });
  const [promoError, setPromoError] = useState('');

  // 3D Secure / Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [show3DSModal, setShow3DSModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');

  // Calculations
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const subtotal = durationPrice + addOnsTotal;

  // Calculate discount
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      discountAmount = Math.round((subtotal * appliedPromo.discount) / 100);
    } else {
      discountAmount = appliedPromo.discount;
    }
  }

  // Calculate tip
  let tipAmount = 0;
  if (customTip !== '') {
    tipAmount = Math.max(0, parseFloat(customTip) || 0);
  } else if (tipPercent > 0) {
    tipAmount = Math.round((subtotal * tipPercent) / 100);
  }

  const travelFee = 0; // complimentary
  const totalAmount = Math.max(0, subtotal - discountAmount + tipAmount + travelFee);

  // Detect card brand
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s+/g, '');
    if (/^4/.test(clean)) return 'Visa';
    if (/^5[1-5]/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'Amex';
    if (/^6/.test(clean)) return 'RuPay';
    return 'Card';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    // format in groups of 4
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(value);
  };

  const applyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'AROMA20' || code === 'AYURVEDA20') {
      setAppliedPromo({ code, discount: 20, type: 'percent' });
      setPromoError('');
    } else if (code === 'VELMORA15') {
      setAppliedPromo({ code, discount: 15, type: 'percent' });
      setPromoError('');
    } else if (code === 'RELAX500') {
      setAppliedPromo({ code, discount: 500, type: 'flat' });
      setPromoError('');
    } else if (code === 'WELCOME') {
      setAppliedPromo({ code, discount: 350, type: 'flat' });
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try AROMA20 for 20% off or VELMORA15.');
    }
  };

  const handleFillDemoCard = (type: 'visa' | 'mc' | 'amex') => {
    if (type === 'visa') {
      setCardNumber('4242 4242 4242 4242');
      setCardExpiry('12/28');
      setCardCvv('123');
    } else if (type === 'mc') {
      setCardNumber('5555 5555 5555 4444');
      setCardExpiry('09/27');
      setCardCvv('789');
    } else {
      setCardNumber('3782 8224 6310 005');
      setCardExpiry('11/29');
      setCardCvv('4567');
    }
  };

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'card') {
      // Simulate 3D Secure Verification flow
      setTimeout(() => {
        setIsProcessing(false);
        setShow3DSModal(true);
      }, 700);
    } else {
      // Direct tokenization for Apple Pay / Google Pay / Bank
      setTimeout(() => {
        setIsProcessing(false);
        finalizeTransaction();
      }, 1200);
    }
  };

  const handleVerify3DS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setOtpError('Please enter the 6-digit authorization code');
      return;
    }
    setShow3DSModal(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      finalizeTransaction();
    }, 900);
  };

  const finalizeTransaction = () => {
    const rawNumber = cardNumber.replace(/\s+/g, '');
    const last4 = rawNumber.length >= 4 ? rawNumber.slice(-4) : '4242';
    const brand = getCardBrand(cardNumber);

    onSuccess({
      method: paymentMethod,
      cardBrand: paymentMethod === 'card' ? brand : undefined,
      last4: paymentMethod === 'card' ? last4 : undefined,
      tipAmount,
      discountAmount,
      promoCode: appliedPromo?.code,
      totalAmount
    });
  };

  return (
    <div className="space-y-6">
      {/* 3D Secure / OTP Simulation Modal */}
      {show3DSModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E0D6] space-y-5">
            <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2D4A3E]" />
                <span className="font-serif text-lg font-medium text-[#1F2421]">
                  Verified by Visa / 3D-Secure 2.2
                </span>
              </div>
              <Lock className="w-4 h-4 text-[#8E9B93]" />
            </div>

            <div className="text-xs text-[#525E57] space-y-2">
              <p>
                To safeguard your home booking, your issuing bank requested an authorization code sent to your registered phone number:
              </p>
              <div className="p-3 bg-[#FAF9F5] border border-[#DDD7CD] rounded-md font-mono text-xs text-[#1F2421]">
                <strong>Merchant:</strong> Velmora Home Spa Sanctuary (India & Spain)<br />
                <strong>Amount:</strong> ₹{totalAmount.toLocaleString('en-IN')}.00 INR<br />
                <strong>Card:</strong> •••• {cardNumber.replace(/\s+/g, '').slice(-4) || '4242'}
              </div>
            </div>

            <form onSubmit={handleVerify3DS} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1F2421] mb-1">
                  Enter 6-Digit Bank Verification Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                      setOtpError('');
                    }}
                    placeholder="892401"
                    maxLength={6}
                    className="w-full text-center tracking-widest text-base font-mono bg-[#FAF9F5] border border-[#DDD7CD] rounded-md py-2.5 text-[#1F2421] focus:ring-1 focus:ring-[#2D4A3E]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setOtpCode('892401')}
                    className="px-3 py-2 text-xs bg-[#E8EFEA] text-[#2D4A3E] font-medium rounded-md hover:bg-[#DDE7DF] whitespace-nowrap cursor-pointer"
                  >
                    Auto-Fill (892401)
                  </button>
                </div>
                {otpError && (
                  <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{otpError}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShow3DSModal(false)}
                  className="text-xs text-[#7C8880] hover:text-[#1F2421]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#2D4A3E] hover:bg-[#233A31] text-white text-xs font-medium rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  Confirm & Authorize ₹{totalAmount.toLocaleString('en-IN')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Payment Method Selection & Card Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Payment Method Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D4A3E]">
                Select Integrated Payment Gateway
              </label>
              <span className="text-[11px] text-[#964B59] font-medium">
                Currency: INR (₹) · Available in India 🇮🇳 & Spain 🇪🇸
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-[#FAF9F5] border-[#2D4A3E] ring-1 ring-[#2D4A3E]/30 text-[#1F2421] font-semibold'
                    : 'bg-white border-[#E5E0D6] text-[#637068] hover:border-[#DDD7CD]'
                }`}
              >
                <CreditCard className="w-4 h-4 mb-2 text-[#2D4A3E]" />
                <span>Cards / RuPay</span>
                <span className="text-[10px] text-[#7C8880] font-normal">Visa, MC, RuPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-[#FAF9F5] border-[#2D4A3E] ring-1 ring-[#2D4A3E]/30 text-[#1F2421] font-semibold'
                    : 'bg-white border-[#E5E0D6] text-[#637068] hover:border-[#DDD7CD]'
                }`}
              >
                <Smartphone className="w-4 h-4 mb-2 text-[#2D4A3E]" />
                <span>UPI / GPay</span>
                <span className="text-[10px] text-[#7C8880] font-normal">PhonePe, Paytm</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'bg-[#FAF9F5] border-[#2D4A3E] ring-1 ring-[#2D4A3E]/30 text-[#1F2421] font-semibold'
                    : 'bg-white border-[#E5E0D6] text-[#637068] hover:border-[#DDD7CD]'
                }`}
              >
                <Building2 className="w-4 h-4 mb-2 text-[#2D4A3E]" />
                <span>NetBanking / SEPA</span>
                <span className="text-[10px] text-[#7C8880] font-normal">HDFC, ICICI, BBVA</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('deposit_cod')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'deposit_cod'
                    ? 'bg-[#FAF9F5] border-[#2D4A3E] ring-1 ring-[#2D4A3E]/30 text-[#1F2421] font-semibold'
                    : 'bg-white border-[#E5E0D6] text-[#637068] hover:border-[#DDD7CD]'
                }`}
              >
                <Wallet className="w-4 h-4 mb-2 text-[#2D4A3E]" />
                <span>Spa Deposit</span>
                <span className="text-[10px] text-[#7C8880] font-normal">₹999 Hold Now</span>
              </button>
            </div>
          </div>

          {/* Card Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 bg-[#FBFBF9] p-5 rounded-xl border border-[#E5E0D6]">
              {/* Quick test card chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[11px] text-[#7C8880]">Test Cards:</span>
                <button
                  type="button"
                  onClick={() => handleFillDemoCard('visa')}
                  className="px-2 py-0.5 bg-white border border-[#DDD7CD] rounded text-[11px] text-[#2D4A3E] hover:bg-[#EFECE6] cursor-pointer"
                >
                  Visa (4242)
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemoCard('mc')}
                  className="px-2 py-0.5 bg-white border border-[#DDD7CD] rounded text-[11px] text-[#2D4A3E] hover:bg-[#EFECE6] cursor-pointer"
                >
                  Mastercard (5555)
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemoCard('amex')}
                  className="px-2 py-0.5 bg-white border border-[#DDD7CD] rounded text-[11px] text-[#2D4A3E] hover:bg-[#EFECE6] cursor-pointer"
                >
                  Amex (3782)
                </button>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-[11px] font-semibold text-[#4A5550] mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Full name as written on card"
                  className="w-full text-xs p-2.5 bg-white border border-[#DDD7CD] rounded-md text-[#1F2421] focus:ring-1 focus:ring-[#2D4A3E] focus:outline-hidden"
                />
              </div>

              {/* Card Number */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-[#4A5550]">
                    Card Number
                  </label>
                  <span className="text-[10px] font-mono text-[#2D4A3E] font-medium">
                    {getCardBrand(cardNumber)}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    className="w-full font-mono text-xs p-2.5 pr-10 bg-white border border-[#DDD7CD] rounded-md text-[#1F2421] tracking-wider focus:ring-1 focus:ring-[#2D4A3E] focus:outline-hidden"
                  />
                  <Lock className="w-3.5 h-3.5 text-[#8E9B93] absolute right-3 top-3" />
                </div>
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#4A5550] mb-1">
                    Expiration (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full font-mono text-xs p-2.5 bg-white border border-[#DDD7CD] rounded-md text-[#1F2421] focus:ring-1 focus:ring-[#2D4A3E] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#4A5550] mb-1">
                    Security Code (CVV)
                  </label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.slice(0, 4))}
                    placeholder="3 or 4 digits"
                    maxLength={4}
                    className="w-full font-mono text-xs p-2.5 bg-white border border-[#DDD7CD] rounded-md text-[#1F2421] focus:ring-1 focus:ring-[#2D4A3E] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Save Card Checkbox */}
              <div className="flex items-center gap-2 pt-1 text-xs text-[#525E57]">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="rounded text-[#2D4A3E] focus:ring-0"
                />
                <label htmlFor="saveCard" className="cursor-pointer">
                  Securely save card token for 1-click future rebooking
                </label>
              </div>
            </div>
          )}

          {/* Apple Pay View */}
          {paymentMethod === 'apple_pay' && (
            <div className="p-6 bg-[#FBFBF9] rounded-xl border border-[#E5E0D6] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-black text-white mx-auto flex items-center justify-center font-bold text-lg">
                
              </div>
              <h4 className="font-serif text-lg text-[#1F2421]">
                Pay with Apple Pay
              </h4>
              <p className="text-xs text-[#637068] max-w-sm mx-auto">
                Authenticate securely using Face ID or Touch ID. Default shipping address and contact info will sync automatically.
              </p>
            </div>
          )}

          {/* Bank Transfer View */}
          {paymentMethod === 'bank_transfer' && (
            <div className="p-6 bg-[#FBFBF9] rounded-xl border border-[#E5E0D6] space-y-3 text-xs">
              <div className="font-semibold text-sm text-[#1F2421]">
                Direct NetBanking & International SEPA Wire
              </div>
              <p className="text-[#637068]">
                Instant bank verification powered by 256-bit financial grade encryption. Compatible with HDFC, ICICI, State Bank of India, Axis, Banco Santander, BBVA, and CaixaBank.
              </p>
              <div className="p-3 bg-white rounded-lg border border-[#DDD7CD] font-mono text-[11px] text-[#4A5550]">
                Velmora International Escrow · IFSC: HDFC000021 · IBAN/BIC: ES88 0049 · Direct Settlement
              </div>
            </div>
          )}

          {/* Deposit on Arrival View */}
          {paymentMethod === 'deposit_cod' && (
            <div className="p-6 bg-[#FBFBF9] rounded-xl border border-[#E5E0D6] space-y-3 text-xs">
              <div className="font-semibold text-sm text-[#1F2421]">
                ₹1,000 Reservation Hold + Balance on Arrival
              </div>
              <p className="text-[#637068]">
                A temporary ₹1,000 authorization hold is placed today to secure your therapist's dedicated travel slot. The remaining balance (₹{Math.max(0, totalAmount - 1000).toLocaleString('en-IN')}) is settled seamlessly via mobile contactless POS terminal or UPI after your treatment.
              </p>
            </div>
          )}

          {/* Gratuity Tip Selection */}
          <div className="p-5 bg-white border border-[#E5E0D6] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3E]">
                Therapist Gratuity (100% to Practitioner)
              </label>
              <span className="text-xs font-mono font-medium text-[#1F2421]">
                ₹{tipAmount.toLocaleString('en-IN')} tip
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 text-xs">
              {[
                { label: 'None', val: 0 },
                { label: '₹200', val: 200, isFlat: true },
                { label: '₹400', val: 400, isFlat: true },
                { label: '₹600', val: 600, isFlat: true }
              ].map(t => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => {
                    if (t.isFlat) {
                      setCustomTip(t.val.toString());
                      setTipPercent(-1);
                    } else {
                      setTipPercent(0);
                      setCustomTip('');
                    }
                  }}
                  className={`py-2 rounded-md border text-center font-medium transition-colors cursor-pointer ${
                    (customTip === t.val.toString() || (customTip === '' && tipPercent === 0 && t.val === 0))
                      ? 'bg-[#2D4A3E] text-white border-[#2D4A3E]'
                      : 'bg-[#FAF9F5] border-[#DDD7CD] text-[#4A5550] hover:bg-[#EFECE6]'
                  }`}
                >
                  {t.label}
                </button>
              ))}

              <input
                type="number"
                placeholder="Custom ₹"
                value={customTip}
                onChange={(e) => {
                  setCustomTip(e.target.value);
                  setTipPercent(-1);
                }}
                className={`py-2 px-1 text-center font-mono border rounded-md text-xs ${
                  customTip !== '' ? 'border-[#2D4A3E] bg-[#E8EFEA]' : 'border-[#DDD7CD] bg-[#FAF9F5]'
                }`}
              />
            </div>
          </div>

          {/* Promo Code Input */}
          <div className="p-4 bg-white border border-[#E5E0D6] rounded-xl space-y-2">
            <label className="block text-[11px] font-semibold text-[#637068] uppercase tracking-wider">
              Promotional or Sanctuary Gift Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value)}
                placeholder="e.g. VELMORA15 or RELAX500"
                className="w-full text-xs font-mono uppercase p-2 bg-[#FAF9F5] border border-[#DDD7CD] rounded-md text-[#1F2421] focus:ring-1 focus:ring-[#2D4A3E]"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="px-4 py-2 bg-[#2D4A3E] text-white text-xs font-medium rounded-md hover:bg-[#233A31] cursor-pointer"
              >
                Apply
              </button>
            </div>
            {appliedPromo && (
              <p className="text-[11px] text-[#2D4A3E] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Code {appliedPromo.code} applied! Saved ₹{discountAmount.toLocaleString('en-IN')}</span>
              </p>
            )}
            {promoError && (
              <p className="text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{promoError}</span>
              </p>
            )}
          </div>

        </div>

        {/* Right Column: Order Summary & Instant Checkout */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 bg-[#FAF9F5] border border-[#2D4A3E]/20 rounded-2xl space-y-5 sticky top-28">
            <h3 className="font-serif text-xl font-medium text-[#1F2421]">
              Sanctuary Booking Summary
            </h3>

            {/* Service & Time details */}
            <div className="space-y-2 text-xs pb-4 border-b border-[#E5E0D6]">
              <div className="font-semibold text-sm text-[#1F2421]">
                {service.title}
              </div>
              <div className="text-[#637068]">
                {selectedDuration} Minutes · {selectedOil.name} Aroma
              </div>
              <div className="text-[#2D4A3E] font-medium">
                {date} at {timeSlot}
              </div>
              <div className="text-[11px] text-[#7C8880]">
                Therapist: {typeof therapist === 'object' ? therapist.name : 'Auto-Assigned Master LMT'}
              </div>
            </div>

            {/* Selected Add-ons list */}
            {selectedAddOns.length > 0 && (
              <div className="space-y-1.5 text-xs pb-4 border-b border-[#E5E0D6]">
                <div className="text-[11px] font-semibold text-[#637068] uppercase tracking-wider">
                  Luxury Add-Ons
                </div>
                {selectedAddOns.map(add => (
                  <div key={add.id} className="flex justify-between text-[#525E57]">
                    <span>{add.name}</span>
                    <span className="font-mono tabular-nums">₹{add.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Line items pricing */}
            <div className="space-y-2 text-xs text-[#525E57] pb-4 border-b border-[#E5E0D6]">
              <div className="flex justify-between">
                <span>Ritual Base ({selectedDuration}m)</span>
                <span className="font-mono tabular-nums">₹{durationPrice.toLocaleString('en-IN')}</span>
              </div>

              {addOnsTotal > 0 && (
                <div className="flex justify-between">
                  <span>Add-Ons Total</span>
                  <span className="font-mono tabular-nums">₹{addOnsTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Sanitized Mobile Kit & Linens</span>
                <span className="font-mono text-[#2D4A3E] font-medium">FREE</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#2D4A3E] font-medium">
                  <span>Promotional Discount</span>
                  <span className="font-mono tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {tipAmount > 0 && (
                <div className="flex justify-between">
                  <span>Therapist Gratuity</span>
                  <span className="font-mono tabular-nums">₹{tipAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Final Total */}
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <div className="text-xs font-semibold text-[#1F2421]">Total Amount Due</div>
                <div className="text-[10px] text-[#7C8880]">All local fees & setup included</div>
              </div>
              <div className="font-mono tabular-nums text-2xl font-bold text-[#1F2421]">
                ₹{totalAmount.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="p-3 bg-white rounded-lg border border-[#E5E0D6] flex items-center gap-2.5 text-xs text-[#525E57]">
              <ShieldCheck className="w-5 h-5 text-[#2D4A3E] shrink-0" />
              <span>
                256-bit Bank Encrypted. Cancel free up to 2 hours before appointment.
              </span>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={handleInitiatePayment}
              disabled={isProcessing}
              className="w-full py-3.5 bg-[#2D4A3E] hover:bg-[#233A31] active:scale-[0.99] text-white text-sm font-medium rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authorizing Secure Gateway...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    {paymentMethod === 'deposit_cod'
                      ? 'Reserve with ₹999 Deposit'
                      : `Pay ₹${totalAmount.toLocaleString('en-IN')} & Confirm Booking`}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full text-center text-xs text-[#7C8880] hover:text-[#1F2421] transition-colors py-1 cursor-pointer"
            >
              ← Back to Details & Schedule
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
