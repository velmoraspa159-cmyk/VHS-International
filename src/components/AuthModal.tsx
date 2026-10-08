import React, { useState, useEffect } from 'react';
import { useSpa } from '../context/SpaContext';
import { VelmoraLogo } from './VelmoraLogo';
import { 
  X, Smartphone, Check, AlertCircle, ArrowRight, 
  ShieldCheck, RefreshCw, Lock, Sparkles 
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithGoogle, loginWithPhone, loginAsDemoUser, login, register, currentUser } = useSpa();

  // Auth Method: 'demo' | 'google' | 'mobile' | 'email'
  const [authMethod, setAuthMethod] = useState<'demo' | 'google' | 'mobile' | 'email'>('demo');

  // Email form state
  const [emailFormMode, setEmailFormMode] = useState<'signin' | 'register'>('signin');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneRegisterInput, setPhoneRegisterInput] = useState('');

  // Mobile Auth State
  const [mobileStep, setMobileStep] = useState<'input' | 'otp'>('input');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('9912706021');
  const [fullName, setFullName] = useState('Camilla Montgomery');
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Google Auth State
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showCustomGoogle, setShowCustomGoogle] = useState(false);

  // Timer for OTP countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mobileStep === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [mobileStep, timer]);

  if (!isOpen) return null;

  // Handle Demo 1-Click Sign In
  const handleDemoLogin = () => {
    loginAsDemoUser();
    if (onSuccess) onSuccess();
    onClose();
  };

  // Handle Email Submit
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    if (emailFormMode === 'register') {
      if (!nameInput.trim()) {
        setErrorMessage('Please enter your full name');
        return;
      }
      register(nameInput, emailInput, phoneRegisterInput || '+91 99127 06021');
    } else {
      login(emailInput);
    }
    if (onSuccess) onSuccess();
    onClose();
  };

  // Handle Google Auth
  const handleGoogleSignIn = (emailChoice?: string, nameChoice?: string) => {
    setIsGoogleSigningIn(true);
    setErrorMessage('');
    setTimeout(() => {
      loginWithGoogle({
        email: emailChoice || customGoogleEmail || 'velmoraspa159@gmail.com',
        name: nameChoice || (emailChoice?.includes('velmora') ? 'Camilla Montgomery' : 'Google Spa Guest'),
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      });
      setIsGoogleSigningIn(false);
      if (onSuccess) onSuccess();
      onClose();
    }, 700);
  };

  // Handle Send Mobile OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 7) {
      setErrorMessage('Please enter a valid mobile number');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMobileStep('otp');
      setTimer(30);
    }, 600);
  };

  // Handle Verify Mobile OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage('Please enter the 6-digit OTP code');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const fullPhone = `${countryCode} ${phoneNumber}`;
      loginWithPhone(fullPhone, fullName);
      if (onSuccess) onSuccess();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E5E0D6] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Velmora Logo */}
        <div className="p-6 bg-[#FAF7F5] border-b border-[#EAE3DE] flex items-center justify-between">
          <VelmoraLogo size="sm" />
          <button
            onClick={onClose}
            className="p-1.5 text-[#7C8880] hover:text-[#1F2421] rounded-full hover:bg-[#EFECE6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-2xl font-medium text-[#1F2421]">
              Welcome to Velmora Sanctuary
            </h3>
            <p className="text-xs text-[#637068]">
              Sign in or create an account via Google or Mobile Number to manage home spa bookings, past rituals & favorites.
            </p>
          </div>

          {/* Segmented Auth Selector (4 Options) */}
          <div className="grid grid-cols-4 p-1 bg-[#F4F1EA] rounded-xl border border-[#E5E0D6] text-xs font-medium">
            <button
              type="button"
              onClick={() => { setAuthMethod('demo'); setErrorMessage(''); }}
              className={`py-2 rounded-lg transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
                authMethod === 'demo'
                  ? 'bg-[#1F2B24] text-white shadow-2xs font-semibold'
                  : 'text-[#637068] hover:text-[#1F2421]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E0B0B8]" />
              <span className="text-[11px]">Demo</span>
            </button>

            <button
              type="button"
              onClick={() => { setAuthMethod('google'); setErrorMessage(''); }}
              className={`py-2 rounded-lg transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
                authMethod === 'google'
                  ? 'bg-white text-[#1F2421] shadow-2xs font-semibold'
                  : 'text-[#637068] hover:text-[#1F2421]'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="text-[11px]">Google</span>
            </button>

            <button
              type="button"
              onClick={() => { setAuthMethod('mobile'); setErrorMessage(''); }}
              className={`py-2 rounded-lg transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
                authMethod === 'mobile'
                  ? 'bg-white text-[#1F2421] shadow-2xs font-semibold'
                  : 'text-[#637068] hover:text-[#1F2421]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#964B59]" />
              <span className="text-[11px]">Mobile</span>
            </button>

            <button
              type="button"
              onClick={() => { setAuthMethod('email'); setErrorMessage(''); }}
              className={`py-2 rounded-lg transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 ${
                authMethod === 'email'
                  ? 'bg-white text-[#1F2421] shadow-2xs font-semibold'
                  : 'text-[#637068] hover:text-[#1F2421]'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-[#525E57]" />
              <span className="text-[11px]">Email</span>
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* METHOD 0: 1-CLICK DEMO CLIENT ACCESS */}
          {authMethod === 'demo' && (
            <div className="space-y-4">
              <div className="p-5 bg-[#FAF9F5] border border-[#DDD7CD] rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1F2421]">Demo Member Profile</span>
                  <span className="text-[10px] bg-[#E8EFEA] text-[#2D4A3E] px-2.5 py-0.5 rounded-full font-semibold">
                    Preloaded Bookings
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                    alt="Camilla Montgomery"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#964B59]/30"
                  />
                  <div className="text-xs">
                    <div className="font-serif text-base font-medium text-[#1F2421]">
                      Camilla Montgomery
                    </div>
                    <div className="text-[#637068]">
                      velmoraspa159@gmail.com · +91 99127 06021
                    </div>
                    <div className="text-[#964B59] font-medium mt-0.5">
                      Silver Sanctuary Member (Spain 🇪🇸 & India 🇮🇳)
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E5E0D6] space-y-1.5 text-xs text-[#525E57]">
                  <div className="font-semibold text-[#1F2421] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#964B59]" />
                    <span>Included Demo Bookings for Live Tracking:</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-[#637068]">
                    <li><strong>#VEL-9842:</strong> Balinese Deep Tissue (En Route · ~18m ETA Radar)</li>
                    <li><strong>#VEL-8720:</strong> Botanical Glow Facial (Completed · Past History)</li>
                    <li><strong>#VEL-8419:</strong> Couples Sanctuary Ritual (Completed · Past History)</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-3 bg-[#1F2B24] hover:bg-[#141C18] text-white text-xs font-medium rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>1-Click Sign In as Demo Client</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* METHOD 3: EMAIL SIGN IN / REGISTER */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="flex border-b border-[#EAE3DE] pb-2 gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => setEmailFormMode('signin')}
                  className={`pb-1 font-semibold cursor-pointer ${
                    emailFormMode === 'signin' ? 'text-[#964B59] border-b-2 border-[#964B59]' : 'text-[#7C8880]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setEmailFormMode('register')}
                  className={`pb-1 font-semibold cursor-pointer ${
                    emailFormMode === 'register' ? 'text-[#964B59] border-b-2 border-[#964B59]' : 'text-[#7C8880]'
                  }`}
                >
                  Create New Account
                </button>
              </div>

              {emailFormMode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-[#4A5550] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g., Lucia Gomez"
                    className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] rounded-md px-3 py-2.5 text-[#1F2421]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#4A5550] mb-1">Email Address</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g., client@example.com"
                  className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] rounded-md px-3 py-2.5 text-[#1F2421]"
                  required
                />
              </div>

              {emailFormMode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-[#4A5550] mb-1">Mobile Phone (For Dispatch)</label>
                  <input
                    type="tel"
                    value={phoneRegisterInput}
                    onChange={(e) => setPhoneRegisterInput(e.target.value)}
                    placeholder="+91 99127 06021 or +34 612 345 678"
                    className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] rounded-md px-3 py-2.5 text-[#1F2421]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2D4A3E] hover:bg-[#233A31] text-white text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                {emailFormMode === 'signin' ? 'Sign In' : 'Create Sanctuary Account'}
              </button>
            </form>
          )}

          {/* METHOD 1: GOOGLE SIGN-IN */}
          {authMethod === 'google' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF9F5] border border-[#DDD7CD] rounded-xl space-y-3">
                <div className="text-xs font-semibold text-[#1F2421] flex items-center justify-between">
                  <span>Fast 1-Tap Google Sign-In</span>
                  <span className="text-[10px] bg-[#E8EFEA] text-[#2D4A3E] px-2 py-0.5 rounded font-mono">
                    Instant Verified
                  </span>
                </div>

                {/* Primary Google Button for user's account */}
                <button
                  type="button"
                  onClick={() => handleGoogleSignIn('velmoraspa159@gmail.com', 'Camilla Montgomery')}
                  disabled={isGoogleSigningIn}
                  className="w-full p-3 bg-white border border-[#DDD7CD] hover:border-[#4285F4] hover:shadow-xs rounded-xl flex items-center justify-between transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Google Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-left text-xs">
                      <div className="font-semibold text-[#1F2421]">Camilla Montgomery</div>
                      <div className="text-[#637068] text-[11px]">velmoraspa159@gmail.com</div>
                    </div>
                  </div>

                  <span className="text-[11px] font-medium text-[#4285F4] flex items-center gap-1">
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                {/* Alternate Google Email */}
                {!showCustomGoogle ? (
                  <button
                    type="button"
                    onClick={() => setShowCustomGoogle(true)}
                    className="w-full text-center text-xs text-[#964B59] hover:underline pt-1 cursor-pointer"
                  >
                    Use another Google Account
                  </button>
                ) : (
                  <div className="space-y-2 pt-2 border-t border-[#EAE3DE]">
                    <label className="block text-[11px] text-[#637068]">Enter Google Email</label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={customGoogleEmail}
                        onChange={(e) => setCustomGoogleEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full text-xs p-2.5 bg-white border border-[#DDD7CD] rounded-md text-[#1F2421]"
                      />
                      <button
                        type="button"
                        onClick={() => handleGoogleSignIn(customGoogleEmail, customGoogleEmail.split('@')[0])}
                        className="px-4 py-2 bg-[#4285F4] text-white text-xs font-medium rounded-md hover:bg-[#3367D6]"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-[#FCFAF8] rounded-lg border border-[#EAE3DE] flex items-center gap-2 text-[11px] text-[#7C8880]">
                <ShieldCheck className="w-4 h-4 text-[#964B59] shrink-0" />
                <span>Google OAuth 2.0 encrypted. No password required.</span>
              </div>
            </div>
          )}

          {/* METHOD 2: MOBILE NUMBER & OTP SIGN-IN */}
          {authMethod === 'mobile' && (
            <div className="space-y-4">
              {mobileStep === 'input' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F2421] mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Camilla Montgomery"
                      className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-[#DDD7CD] rounded-md text-[#1F2421] focus:ring-1 focus:ring-[#964B59]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F2421] mb-1">
                      Mobile Number (For Dispatch & Login)
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="text-xs bg-[#FAF9F5] border border-[#DDD7CD] rounded-md px-2.5 py-2 text-[#1F2421] font-mono shrink-0"
                      >
                        <option value="+91">🇮🇳 +91 (India)</option>
                        <option value="+34">🇪🇸 +34 (Spain)</option>
                        <option value="+1">🇺🇸 +1 (US)</option>
                        <option value="+44">🇬🇧 +44 (UK)</option>
                        <option value="+971">🇦🇪 +971 (UAE)</option>
                        <option value="+61">🇦🇺 +61 (Aus)</option>
                      </select>

                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="5553829104"
                        className="w-full text-xs font-mono p-2.5 bg-[#FAF9F5] border border-[#DDD7CD] rounded-md text-[#1F2421] focus:ring-1 focus:ring-[#964B59]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#964B59] hover:bg-[#7D3B47] text-white text-xs font-medium rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending SMS OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send 6-Digit OTP</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Step 2: OTP Verification */
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#F0D5DA] text-xs text-[#8E4A56] space-y-1">
                    <div>Verification code sent via SMS to:</div>
                    <div className="font-mono font-bold text-sm text-[#1F2421]">
                      {countryCode} {phoneNumber}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-[#1F2421]">
                        Enter 6-Digit Code
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpCode('482910')}
                        className="text-[11px] text-[#964B59] font-medium hover:underline cursor-pointer"
                      >
                        Auto-Fill (482910)
                      </button>
                    </div>

                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="482910"
                      maxLength={6}
                      className="w-full text-center tracking-widest font-mono text-lg py-2.5 bg-[#FAF9F5] border border-[#DDD7CD] rounded-md text-[#1F2421] focus:ring-1 focus:ring-[#964B59]"
                      autoFocus
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#637068]">
                    <button
                      type="button"
                      onClick={() => setMobileStep('input')}
                      className="hover:text-[#1F2421] underline cursor-pointer"
                    >
                      Change phone number
                    </button>

                    {timer > 0 ? (
                      <span>Resend in {timer}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setTimer(30)}
                        className="text-[#964B59] font-medium hover:underline cursor-pointer"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[#964B59] hover:bg-[#7D3B47] text-white text-xs font-medium rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Verify & Access Sanctuary</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F5] border-t border-[#EAE3DE] text-center text-[11px] text-[#8E9B93]">
          By continuing, you agree to Velmora's Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};
