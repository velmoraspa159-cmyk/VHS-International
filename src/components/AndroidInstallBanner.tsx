import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Star, ShieldCheck, Check } from 'lucide-react';
import { VELMORA_LOGO_IMG } from './VelmoraLogo';

export const AndroidInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (installed PWA)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    const dismissed = sessionStorage.getItem('velmora_pwa_banner_dismissed');
    if (dismissed) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // On mobile screens, show banner after 3 seconds if not dismissed
    const isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) || window.innerWidth < 768;
    let timer: NodeJS.Timeout;
    if (isMobile) {
      timer = setTimeout(() => {
        setShowBanner(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const [showInstruction, setShowInstruction] = useState(false);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowInstruction(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('velmora_pwa_banner_dismissed', 'true');
  };

  if (!showBanner || isInstalled) return null;

  return (
    <div className="fixed top-20 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-[#EAE3DE] shadow-xl p-3.5 animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-start gap-3">
        {/* App Icon */}
        <div className="w-11 h-11 rounded-xl overflow-hidden shadow-2xs border border-[#F0D5DA] shrink-0 bg-white">
          <img
            src={VELMORA_LOGO_IMG}
            alt="Velmora Spa App Icon"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-sm font-semibold text-[#1F2421] truncate">
              Velmora Spa for Android
            </h4>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="text-[#8E9B93] hover:text-[#1F2421] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-[#2D4A3E] font-medium mt-0.5">
            <div className="flex text-[#D4A373]">
              {'★'.repeat(5)}
            </div>
            <span>4.9 · Native App Experience</span>
          </div>

          <p className="text-[11px] text-[#637068] mt-1 line-clamp-1">
            Install on phone for 1-tap booking & live therapist GPS radar.
          </p>

          {showInstruction && (
            <div className="mt-2 p-2 bg-[#FAF4F5] border border-[#F0D5DA] rounded-lg text-[10px] text-[#8E4A56] leading-tight">
              Tap browser menu (<strong>⋮</strong> or Share) → <strong>Install app</strong> or <strong>Add to Home screen</strong>.
            </div>
          )}

          <div className="flex items-center gap-2 mt-2.5">
            <button
              onClick={handleInstallClick}
              className="flex-1 py-1.5 px-3 bg-[#1F2B24] hover:bg-[#141C18] text-white text-[11px] font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
            <button
              onClick={handleDismiss}
              className="py-1.5 px-2.5 text-[11px] text-[#7C8880] hover:text-[#1F2421] transition-colors cursor-pointer"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
