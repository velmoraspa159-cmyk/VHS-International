import React from 'react';
import { useSpa } from '../context/SpaContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useSpa();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-70 max-w-sm w-auto animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-[#1F2B24] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-3 backdrop-blur-md">
        <div className="w-7 h-7 rounded-full bg-[#34A853]/20 text-[#34A853] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="text-xs font-medium leading-snug">
          {toastMessage}
        </div>
        <Sparkles className="w-3.5 h-3.5 text-[#E0B0B8] shrink-0 ml-1" />
      </div>
    </div>
  );
};
