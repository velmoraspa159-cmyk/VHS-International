import React from 'react';
import { Play, Sparkles, Flower2, Heart, Building2, MapPin } from 'lucide-react';

interface MobileStoriesBarProps {
  onOpenStory: () => void;
  onOpenDiscount: () => void;
  onNavigateCorporate: () => void;
  onSelectCategory?: (category: string) => void;
}

export const MobileStoriesBar: React.FC<MobileStoriesBarProps> = ({
  onOpenStory,
  onOpenDiscount,
  onNavigateCorporate,
  onSelectCategory
}) => {
  const stories = [
    {
      id: 'story',
      title: 'Our Story',
      icon: Play,
      bg: 'bg-radial from-[#964B59] to-[#68303C]',
      border: 'border-[#964B59]',
      onClick: onOpenStory,
      isLive: true
    },
    {
      id: 'voucher',
      title: '20% Off',
      icon: Sparkles,
      bg: 'bg-radial from-[#D4A373] to-[#A97444]',
      border: 'border-[#D4A373]',
      onClick: onOpenDiscount,
      badge: 'PROMO'
    },
    {
      id: 'therapists',
      title: 'Master LMTs',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      border: 'border-[#2D4A3E]',
      onClick: () => {
        const el = document.getElementById('therapists');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'spain',
      title: 'Spain 🇪🇸',
      image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=120&auto=format&fit=crop&q=80',
      border: 'border-[#B76E79]',
      onClick: () => {
        if (onSelectCategory) onSelectCategory('all');
      }
    },
    {
      id: 'india',
      title: 'India 🇮🇳',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=120&auto=format&fit=crop&q=80',
      border: 'border-[#B76E79]',
      onClick: () => {
        if (onSelectCategory) onSelectCategory('all');
      }
    },
    {
      id: 'corporate',
      title: 'Corporate',
      icon: Building2,
      bg: 'bg-radial from-[#2D4A3E] to-[#1B3028]',
      border: 'border-[#2D4A3E]',
      onClick: onNavigateCorporate
    }
  ];

  return (
    <div className="w-full overflow-x-auto py-2.5 px-4 scrollbar-none select-none">
      <div className="flex items-center gap-3.5 min-w-max">
        {stories.map((st) => {
          const Icon = st.icon;
          return (
            <button
              key={st.id}
              onClick={st.onClick}
              className="flex flex-col items-center gap-1.5 focus:outline-hidden cursor-pointer group active:scale-95 transition-transform"
            >
              {/* Outer Gradient Ring */}
              <div className={`p-0.5 rounded-full border-2 ${st.border} shadow-2xs relative transition-all group-hover:scale-105`}>
                {st.image ? (
                  <img
                    src={st.image}
                    alt={st.title}
                    className="w-13 h-13 rounded-full object-cover p-0.5 bg-white"
                  />
                ) : (
                  <div className={`w-13 h-13 rounded-full ${st.bg} text-white flex items-center justify-center p-0.5 ring-2 ring-white`}>
                    {Icon && <Icon className="w-5 h-5 fill-current/30" />}
                  </div>
                )}

                {/* Optional mini badge */}
                {st.isLive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#964B59] text-white text-[8px] font-bold uppercase px-1 rounded font-mono shadow-xs">
                    Watch
                  </span>
                )}
                {st.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#D4A373] text-white text-[8px] font-bold uppercase px-1 rounded font-mono shadow-xs">
                    {st.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <span className="text-[11px] font-medium text-[#4A5550] group-hover:text-[#1F2421] transition-colors truncate max-w-[62px] text-center">
                {st.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
