import React from 'react';
import { Calendar, Clock, Building2, MessageCircle, Sparkles } from 'lucide-react';

interface MobileQuickActionsProps {
  onOpenBooking: () => void;
  onOpenTracker: () => void;
  onNavigateCorporate: () => void;
  onOpenWhatsApp?: () => void;
}

export const MobileQuickActions: React.FC<MobileQuickActionsProps> = ({
  onOpenBooking,
  onOpenTracker,
  onNavigateCorporate,
  onOpenWhatsApp
}) => {
  const actions = [
    {
      id: 'book',
      label: 'Book Ritual',
      sub: 'At Your Home',
      icon: Calendar,
      color: 'bg-[#FAF4F5] text-[#964B59]',
      border: 'border-[#F0D5DA]',
      onClick: onOpenBooking
    },
    {
      id: 'radar',
      label: 'Live Radar',
      sub: 'Track Arrival',
      icon: Clock,
      color: 'bg-[#E8EFEA] text-[#2D4A3E]',
      border: 'border-[#C2D6C8]',
      onClick: onOpenTracker
    },
    {
      id: 'corporate',
      label: 'Corporate',
      sub: 'Office Chair',
      icon: Building2,
      color: 'bg-[#F5F2EB] text-[#635547]',
      border: 'border-[#DDD7CD]',
      onClick: onNavigateCorporate
    },
    {
      id: 'concierge',
      label: 'Concierge',
      sub: '+91 99127',
      icon: MessageCircle,
      color: 'bg-[#EAF3EB] text-[#25D366]',
      border: 'border-[#CCE5CF]',
      onClick: () => {
        const text = encodeURIComponent('Hello Velmora Spa Sanctuary Concierge! I would like to book a luxury home spa ritual.');
        window.open(`https://wa.me/919912706021?text=${text}`, '_blank');
      }
    }
  ];

  return (
    <div className="px-4 py-3">
      <div className="grid grid-cols-4 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className={`p-2.5 rounded-2xl border ${act.border} ${act.color} flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-2xs active:scale-95 hover:shadow-xs`}
            >
              <div className="w-9 h-9 rounded-xl bg-white shadow-2xs flex items-center justify-center mb-1.5">
                <Icon className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[11px] font-bold tracking-tight text-[#1F2421] truncate w-full">
                {act.label}
              </span>
              <span className="text-[9px] text-[#7C8880] truncate w-full">
                {act.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
