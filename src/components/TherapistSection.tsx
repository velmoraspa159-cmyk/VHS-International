import React from 'react';
import { Therapist } from '../types';
import { useSpa } from '../context/SpaContext';
import { Star, ShieldCheck, Heart, Calendar, CheckCircle2 } from 'lucide-react';

interface TherapistSectionProps {
  onBookWithTherapist: (therapist: Therapist) => void;
}

export const TherapistSection: React.FC<TherapistSectionProps> = ({ onBookWithTherapist }) => {
  const { therapists, currentUser, toggleFavoriteTherapist } = useSpa();

  return (
    <section id="therapists" className="py-16 sm:py-20 bg-white border-y border-[#EAE3DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#2D4A3E] mb-2 flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-[#2D4A3E]"></span>
            <span>Vetted & Certified Practitioners</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421] font-normal tracking-tight text-balance">
            Meet Our Master Bodywork & Holistic Specialists
          </h2>
          <p className="text-sm sm:text-base text-[#525E57] mt-3">
            Every practitioner undergoes strict criminal background verification, state licensure audits, and 80+ hours of advanced five-star hospitality protocol training.
          </p>
        </div>

        {/* Therapists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {therapists.map((th) => {
            const isFav = currentUser?.favoriteTherapistIds.includes(th.id) || false;

            return (
              <div
                key={th.id}
                className="bg-white border border-[#E5E0D6] rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Top Avatar & Favorite Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="relative">
                      <img
                        src={th.avatar}
                        alt={th.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#2D4A3E]/10"
                        referrerPolicy="no-referrer"
                      />
                      <span
                        className="absolute bottom-0 right-0 w-4 h-4 bg-[#2D4A3E] rounded-full border-2 border-white flex items-center justify-center text-white text-[9px]"
                        title="State Licensed & Background Verified"
                      >
                        ✓
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFavoriteTherapist(th.id)}
                      className="p-1.5 rounded-full hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                      title={isFav ? "Remove from favorite therapists" : "Save to favorite therapists"}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? 'fill-[#A35D5D] text-[#A35D5D]' : 'text-[#8E9B93] hover:text-[#1F2421]'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Name & Credentials */}
                  <h3 className="font-serif text-lg font-medium text-[#1F2421]">
                    {th.name}
                  </h3>
                  <div className="text-xs text-[#637068] mt-0.5 font-medium">
                    {th.title}
                  </div>

                  {/* Rating & Experience */}
                  <div className="flex items-center gap-2 text-xs text-[#7C8880] mt-2">
                    <span className="flex items-center gap-1 font-medium text-[#1F2421]">
                      <Star className="w-3.5 h-3.5 fill-[#D4A373] text-[#D4A373]" />
                      <span className="font-mono tabular-nums">{th.rating}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{th.experienceYears} yrs exp</span>
                    <span aria-hidden="true">·</span>
                    <span>{th.reviewCount} rituals</span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#4A5550] mt-3 line-clamp-3 leading-relaxed">
                    {th.bio}
                  </p>

                  {/* Specialties tags (unboxed text list) */}
                  <div className="mt-4 pt-3 border-t border-[#F0EBE1]">
                    <div className="text-[11px] font-semibold text-[#637068] uppercase tracking-wider mb-1.5">
                      Specialties
                    </div>
                    <div className="text-xs text-[#2D4A3E] font-medium">
                      {th.specialties.join(' · ')}
                    </div>
                  </div>

                  {/* Availability badge */}
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#525E57] bg-[#FAF9F5] p-2 rounded-md border border-[#E5E0D6]">
                    <Calendar className="w-3.5 h-3.5 text-[#2D4A3E] shrink-0" />
                    <span className="truncate">Next: <strong className="text-[#1F2421]">{th.nextAvailable}</strong></span>
                  </div>
                </div>

                {/* Primary Button */}
                <div className="pt-4 mt-4 border-t border-[#F0EBE1]">
                  <button
                    onClick={() => onBookWithTherapist(th)}
                    className="w-full py-2 bg-[#2D4A3E] hover:bg-[#233A31] active:scale-[0.99] text-[#FAF9F5] text-xs font-medium rounded-md transition-colors cursor-pointer"
                  >
                    Select & Reserve
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
