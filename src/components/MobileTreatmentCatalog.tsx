import React, { useState } from 'react';
import { SpaService } from '../types';
import { useSpa } from '../context/SpaContext';
import { Star, Heart, Clock, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface MobileTreatmentCatalogProps {
  onBookService: (service: SpaService) => void;
}

export const MobileTreatmentCatalog: React.FC<MobileTreatmentCatalogProps> = ({ onBookService }) => {
  const { services, currentUser, toggleFavoriteService } = useSpa();

  // Category filter: 'all' | 'massage' | 'facial' | 'couples' | 'wellness'
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Rituals' },
    { id: 'massage', label: 'Massage' },
    { id: 'facial', label: 'Facial & Glow' },
    { id: 'couples', label: 'Couples Sanctuary' },
    { id: 'wellness', label: 'Aromatherapy & Body' }
  ];

  const filtered = services.filter(s => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'massage') return s.category === 'massage';
    if (selectedCategory === 'facial') return s.category === 'facial';
    if (selectedCategory === 'couples') return s.category === 'couples';
    if (selectedCategory === 'wellness') return s.category === 'wellness' || s.category === 'body-ritual';
    return true;
  });

  return (
    <div className="py-3 px-4 space-y-4 pb-24">
      {/* Category Pills Scroller */}
      <div className="overflow-x-auto scrollbar-none -mx-4 px-4 py-1">
        <div className="flex items-center gap-2 min-w-max">
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-[#1F2B24] text-white shadow-xs'
                    : 'bg-[#F7F4EF] text-[#525E57] hover:bg-[#EFECE6] border border-[#E5E0D6]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Grid Cards */}
      <div className="space-y-4">
        {filtered.map((service) => {
          const isFav = currentUser?.favoriteServiceIds.includes(service.id);
          return (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#EAE3DE] overflow-hidden shadow-2xs hover:shadow-md transition-all active:scale-[0.99]"
            >
              {/* Card Image Banner */}
              <div className="relative aspect-16/9 w-full overflow-hidden bg-neutral-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Rating & Favorite Floating Overlays */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <div className="bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-bold text-[#1F2421] flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 text-[#D4A373] fill-current" />
                    <span>{service.rating}</span>
                    <span className="text-[10px] text-[#7C8880]">({service.reviewCount})</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavoriteService(service.id);
                  }}
                  aria-label="Save to favorites"
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#964B59] shadow-xs active:scale-90 transition-transform cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-[#964B59]' : 'text-[#7C8880]'}`} />
                </button>

                {/* Intensity pill */}
                <div className="absolute bottom-2.5 left-2.5">
                  <span className="bg-[#1F2B24]/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                    {service.intensity}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#1F2421] leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#7C8880] mt-0.5 line-clamp-1">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono text-base font-bold text-[#1F2421]">
                      ₹{service.basePrice.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-[#7C8880]">from 60m</div>
                  </div>
                </div>

                {/* Durations available */}
                <div className="flex items-center gap-1.5 text-[11px] text-[#637068]">
                  <Clock className="w-3 h-3 text-[#964B59] shrink-0" />
                  <span>Available: {service.durations.map(d => `${d.minutes}m`).join(' · ')}</span>
                </div>

                {/* 1-Tap Book Button */}
                <button
                  onClick={() => onBookService(service)}
                  className="w-full py-2.5 bg-[#1F2B24] hover:bg-[#141C18] text-white text-xs font-medium rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <span>Select & Customize Ritual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
