import React from 'react';
import { SpaService } from '../types';
import { useSpa } from '../context/SpaContext';
import { Heart, Star, Sparkles, Clock, Check } from 'lucide-react';

interface ServiceCardProps {
  service: SpaService;
  onBook: (service: SpaService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  const { currentUser, toggleFavoriteService } = useSpa();
  const isFavorite = currentUser?.favoriteServiceIds.includes(service.id) || false;

  return (
    <article className="group bg-white border border-[#E5E0D6] rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Visual Image Slot */}
      <div className="relative aspect-4/3 w-full bg-[#EFECE6] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteService(service.id);
          }}
          aria-label={isFavorite ? "Remove from favorite rituals" : "Save to favorite rituals"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-white transition-colors cursor-pointer shadow-xs"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#A35D5D] text-[#A35D5D]' : 'text-[#637068] hover:text-[#1F2421]'
            }`}
          />
        </button>

        {/* Clean Intensity Tag */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-[#FAF9F5] text-[11px] font-medium px-2.5 py-1 rounded-sm">
          {service.intensity}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Unboxed Metadata Line */}
          <div className="flex items-center gap-2 text-xs text-[#637068] mb-1.5">
            <span className="flex items-center gap-1 font-medium text-[#1F2421]">
              <Star className="w-3.5 h-3.5 fill-[#D4A373] text-[#D4A373]" />
              <span className="font-mono tabular-nums">{service.rating}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{service.reviewCount} verified home reviews</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{service.category}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#1F2421] font-medium tracking-tight">
            {service.title}
          </h3>

          <p className="text-xs text-[#7C8880] mt-0.5 line-clamp-1 italic">
            {service.subtitle}
          </p>

          <p className="text-xs text-[#4A5550] mt-3 leading-relaxed line-clamp-2">
            {service.description}
          </p>

          {/* Key Benefits List */}
          <ul className="mt-3 space-y-1">
            {service.benefits.slice(0, 2).map((benefit, idx) => (
              <li key={idx} className="text-[11px] text-[#525E57] flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#2D4A3E] shrink-0" />
                <span className="truncate">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing & Duration Bar */}
        <div className="pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#7C8880]">Starting from</div>
            <div className="font-mono tabular-nums text-lg font-semibold text-[#1F2421]">
              ₹{service.basePrice.toLocaleString('en-IN')}
              <span className="text-[11px] font-sans font-normal text-[#637068]"> / 60m</span>
            </div>
          </div>

          <button
            onClick={() => onBook(service)}
            className="px-4 py-2 bg-[#2D4A3E] hover:bg-[#233A31] active:scale-[0.99] text-[#FAF9F5] text-xs font-medium rounded-md transition-all cursor-pointer shadow-xs whitespace-nowrap"
          >
            Customize & Book
          </button>
        </div>
      </div>
    </article>
  );
};
