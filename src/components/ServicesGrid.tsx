import React from 'react';
import { SpaService } from '../types';
import { useSpa } from '../context/SpaContext';
import { 
  Flower2, Sparkles, Leaf, Users, Heart, Bath, 
  ArrowRight, Star, Heart as HeartIcon 
} from 'lucide-react';

interface ServicesGridProps {
  onBookService: (service: SpaService) => void;
  onViewAllClick: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onBookService, onViewAllClick }) => {
  const { services, currentUser, toggleFavoriteService } = useSpa();

  // The 6 categories matching reference image.png
  const serviceCategories = [
    {
      id: 'serv-deep-balinese',
      title: 'Signature Massage',
      subtitle: 'Relax. Restore. Rejuvenate.',
      desc: 'Targeted acupressure, thumb-walking, and deep muscular tension release with heated botanical oils.',
      image: '/src/assets/images/spa_massage_balinese_1791265969510.jpg',
      icon: Flower2,
      price: 2499,
      duration: '60 – 120 mins'
    },
    {
      id: 'serv-botanical-facial',
      title: 'Facials & Skincare',
      subtitle: 'Healthy, radiant skin for a natural glow.',
      desc: 'Double cleanse, papaya enzyme polish, chilled jade contour sculpting, and bio-hyaluronic hydration.',
      image: '/src/assets/images/spa_botanical_facial_1791265984201.jpg',
      icon: Sparkles,
      price: 2599,
      duration: '60 – 90 mins'
    },
    {
      id: 'serv-body-treatments',
      title: 'Body Treatments',
      subtitle: 'Detoxify and nourish your body.',
      desc: 'Dead Sea mineral salt exfoliation, warm lavender steam compress, and lymphatic detox body wrap.',
      image: '/src/assets/images/spa_body_scrub_treatment_1791267307576.jpg',
      icon: Leaf,
      price: 2399,
      duration: '75 mins'
    },
    {
      id: 'serv-couples-sanctuary',
      title: 'Couple Packages',
      subtitle: 'Share relaxation with someone special.',
      desc: 'Two master therapists arrive with dual matching heated beds, synchronized music, and herbal tea ceremony.',
      image: '/src/assets/images/spa_couples_sanctuary_1791266011451.jpg',
      icon: Users,
      price: 4799,
      duration: '60 – 120 mins'
    },
    {
      id: 'serv-swedish-aromatherapy',
      title: 'Wellness Therapies',
      subtitle: 'Holistic treatments for a balanced you.',
      desc: 'Pure botanical aromatherapy, singing bowl vibration alignment, and stress-dissolving Swedish gliding strokes.',
      image: '/src/assets/images/spa_aromatherapy_oils_1791265999693.jpg',
      icon: Heart,
      price: 2199,
      duration: '60 – 90 mins'
    },
    {
      id: 'serv-warm-stone-recovery',
      title: 'Spa Rituals',
      subtitle: 'Curated experiences for total renewal.',
      desc: 'Himalayan basalt warm volcanic stone gliding along energy channels with rose floral water mist.',
      image: '/src/assets/images/spa_rose_petal_soak_1791267326544.jpg',
      icon: Bath,
      price: 2799,
      duration: '75 – 120 mins'
    }
  ];

  const handleCardClick = (catId: string) => {
    const match = services.find(s => s.id === catId) || services[0];
    onBookService(match);
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-t border-[#EAE3DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching image.png */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8E4A56] mb-2">
              Our Services
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421] font-normal tracking-tight">
              Spa Experiences for Mind, Body & Soul
            </h2>
          </div>

          <button
            onClick={onViewAllClick}
            className="text-xs font-semibold text-[#1F2421] hover:text-[#964B59] flex items-center gap-1.5 transition-colors cursor-pointer group shrink-0"
          >
            <span>View All Services</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* 6 Category Cards Grid matching reference image.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {serviceCategories.map((item) => {
            const Icon = item.icon;
            const isFav = currentUser?.favoriteServiceIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-white border border-[#EAE3DE] hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Photo Container with circular icon badge in bottom-left */}
                  <div className="relative aspect-4/3 w-full bg-[#FAF7F5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Circular Icon Overlay in bottom-left matching image.png */}
                    <div className="absolute bottom-2.5 left-2.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#964B59] shadow-xs border border-white/60">
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>

                    {/* Favorite Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteService(item.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-2xs hover:bg-white transition-colors"
                      title="Save to favorites"
                    >
                      <HeartIcon
                        className={`w-3.5 h-3.5 ${
                          isFav ? 'fill-[#964B59] text-[#964B59]' : 'text-[#8E9B93]'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-serif text-lg font-medium text-[#1F2421] group-hover:text-[#964B59] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#637068] leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Footer with "Learn More ->" */}
                <div className="p-4 pt-0">
                  <div className="pt-2.5 border-t border-[#F4EFEA] flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#1F2421]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-semibold text-[#964B59] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Learn More</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
