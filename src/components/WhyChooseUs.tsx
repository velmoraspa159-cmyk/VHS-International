import React from 'react';
import { 
  Heart, Leaf, Flower2, Sparkles, UserCheck, ShieldCheck, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';

interface WhyChooseUsProps {
  onOurStoryClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOurStoryClick }) => {
  const LOUNGE_IMAGE = '/src/assets/images/spa_lounge_peaceful_escape_1791267290357.jpg';

  const features = [
    {
      icon: Heart,
      title: 'Expert Therapists',
      desc: 'Skilled, certified and caring professionals.'
    },
    {
      icon: Leaf,
      title: 'Natural & Safe Products',
      desc: 'Premium, skin-friendly and eco-conscious.'
    },
    {
      icon: Flower2,
      title: 'Relaxing Ambience',
      desc: 'A serene space designed for your peace.'
    },
    {
      icon: Sparkles,
      title: 'Personalized Care',
      desc: 'Every treatment tailored to your needs.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 bg-[#FAF7F5] border-t border-[#EAE3DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Ambient Spa Lounge Photo matching image.png */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EAE3DE] bg-[#EFECE6] aspect-4/3 lg:aspect-square">
              <img
                src={LOUNGE_IMAGE}
                alt="Velmora Spa Lounge peaceful escape"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

              {/* Glowing illuminated sign inside the photo matching image.png */}
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <div className="bg-black/35 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 text-white max-w-sm">
                  {/* Glowing Lotus / V icon */}
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center text-[#E2A8AA]">
                    <Flower2 className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <div className="font-serif tracking-[0.2em] uppercase text-2xl sm:text-3xl font-medium text-white">
                    Velmora
                  </div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#D99B9B] mt-1 font-light">
                    Home Spa & Wellness
                  </div>
                  <div className="w-12 h-[1px] bg-white/40 mx-auto my-3" />
                  <div className="text-xs sm:text-sm tracking-wider uppercase font-light text-white/90">
                    A Peaceful Escape From Everyday Life
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy, Button, and 4 Feature Bullets matching image.png */}
          <div className="lg:col-span-6 space-y-7">
            
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8E4A56] mb-2">
                Why Choose Us
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2421] font-normal tracking-tight text-balance">
                More Than a Spa,<br />A Better You
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#525E57] leading-relaxed">
              At Velmora, we combine ancient healing traditions with modern wellness techniques to give you a truly transformative experience. It's not just a spa visit — it's a step towards a healthier, happier you.
            </p>

            {/* "Our Story ->" Button matching image.png */}
            <div>
              <button
                onClick={onOurStoryClick}
                className="px-6 py-3 bg-[#1F2B24] hover:bg-[#141C18] text-white text-xs sm:text-sm font-medium rounded-full shadow-xs transition-colors cursor-pointer flex items-center gap-2 group"
              >
                <span>Our Story</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            {/* 4 Feature Items with Circular Outline Icons matching image.png */}
            <div className="space-y-4 pt-3">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-[#DDD7CD] bg-white flex items-center justify-center text-[#964B59] shrink-0 shadow-2xs">
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-medium text-[#1F2421]">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-[#637068] mt-0.5">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
