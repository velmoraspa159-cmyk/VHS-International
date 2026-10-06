import React, { useState } from 'react';
import { SpaService } from '../types';
import { useSpa } from '../context/SpaContext';
import { Search, X, Star, Clock, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: SpaService) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService
}) => {
  const { services } = useSpa();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E5E0D6] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#EAE3DE] flex items-center gap-3 bg-[#FAF7F5]">
          <Search className="w-5 h-5 text-[#964B59] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search home rituals, treatments, pressure or benefits..."
            className="w-full text-sm bg-transparent border-0 focus:outline-hidden text-[#1F2421]"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-[#8E9B93] hover:text-[#1F2421]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#7C8880] hover:text-[#1F2421] rounded-full hover:bg-[#EFECE6]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#7C8880]">
              No rituals found for "{searchQuery}". Try "massage", "facial", or "couples".
            </div>
          ) : (
            filtered.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  onClose();
                  onSelectService(service);
                }}
                className="p-3.5 rounded-xl border border-[#EAE3DE] hover:border-[#964B59] hover:bg-[#FAF7F5] flex items-center justify-between gap-4 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif text-base font-medium text-[#1F2421] group-hover:text-[#964B59] truncate">
                      {service.title}
                    </h4>
                    <p className="text-[11px] text-[#637068] truncate">
                      {service.subtitle}
                    </p>
                    <div className="text-[11px] text-[#2D4A3E] font-medium mt-0.5">
                      ★ {service.rating} ({service.reviewCount} reviews) · {service.intensity}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-xs font-bold text-[#1F2421]">
                    From ₹{service.basePrice.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-[#964B59] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
