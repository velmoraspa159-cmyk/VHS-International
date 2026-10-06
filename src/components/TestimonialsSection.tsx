import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const testimonials = [
    {
      name: 'Neha Kapoor',
      role: 'Fashion Stylist & Home Spa Regular',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'An absolutely beautiful experience! The ambience, the staff and the massage — everything was perfect. I left feeling brand new!'
    },
    {
      name: 'Rohan Mehta',
      role: 'Tech Executive & Triathlete',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'Best spa in the city! The facial left my skin glowing and the staff made me feel so comfortable. Highly recommend!'
    },
    {
      name: 'Simran Kaur',
      role: 'Architect & Interior Designer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'A truly relaxing escape. The couple spa package was an amazing experience. Can\'t wait to visit again!'
    },
    {
      name: 'Camilla Montgomery',
      role: 'Private Client, New York',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'Elena arrived with heated linens and essential botanical oils right to my living room. Zero travel stress and pure bliss.'
    }
  ];

  const handlePrev = () => {
    setCurrentPage(p => (p === 0 ? testimonials.length - 3 : p - 1));
  };

  const handleNext = () => {
    setCurrentPage(p => (p + 3 >= testimonials.length ? 0 : p + 1));
  };

  const visibleTestimonials = testimonials.slice(currentPage, currentPage + 3);

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#EAE3DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Carousel Navigation Arrows matching image.png */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8E4A56] mb-2">
              What Our Guests Say
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421] font-normal tracking-tight">
              Real People. Real Relaxation.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous reviews"
              className="w-10 h-10 rounded-full border border-[#DDD7CD] flex items-center justify-center text-[#1F2421] hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next reviews"
              className="w-10 h-10 rounded-full border border-[#DDD7CD] flex items-center justify-center text-[#1F2421] hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Review Cards matching image.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FCFAF8] border border-[#EAE3DE] flex flex-col justify-between space-y-5 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <p className="text-xs sm:text-sm text-[#4A5550] leading-relaxed italic">
                "{t.quote}"
              </p>

              <div className="pt-4 border-t border-[#F0EBE6] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#1F2421]">
                      {t.name}
                    </h4>
                    <p className="text-[10px] text-[#7C8880]">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* 5 Gold Stars */}
                <div className="flex items-center gap-0.5 text-[#F5A623]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
