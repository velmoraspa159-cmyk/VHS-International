import React from 'react';

export const VELMORA_LOGO_IMG = '/src/assets/images/velmora_brand_logo_1791270423323.jpg';

interface VelmoraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  variant?: 'light' | 'dark' | 'rose';
}

export const VelmoraLogo: React.FC<VelmoraLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  variant = 'rose'
}) => {
  const isDark = variant === 'dark';
  const isLight = variant === 'light';

  // Dimension presets
  const emblemDim = size === 'sm' ? 'w-9 h-9' : size === 'md' ? 'w-11 h-11' : size === 'lg' ? 'w-14 h-14' : 'w-20 h-20';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-3xl' : 'text-4xl';
  const subSize = size === 'sm' ? 'text-[9px]' : size === 'md' ? 'text-[10px]' : size === 'lg' ? 'text-[12px]' : 'text-sm';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Proper Official Velmora Rose Gold Emblem */}
      <div className={`relative ${emblemDim} shrink-0 rounded-full overflow-hidden shadow-2xs border border-[#F0D5DA]/70 bg-white flex items-center justify-center transition-transform duration-300 hover:scale-105`}>
        <img
          src={VELMORA_LOGO_IMG}
          alt="Velmora Home Spa Logo"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Brand Typography - Clean, elegant, no lines above or below */}
      {showSubtitle && (
        <div className="flex flex-col justify-center leading-tight">
          <span
            className={`font-serif tracking-[0.16em] uppercase font-semibold leading-none ${titleSize} ${
              isLight ? 'text-[#FAF9F5]' : isDark ? 'text-[#1F2421]' : 'text-[#8E4A56]'
            }`}
          >
            Velmora
          </span>

          <span
            className={`tracking-[0.28em] uppercase font-medium mt-1 text-[#8E4A56] ${subSize} ${
              isLight ? 'text-white/80' : 'text-[#8E4A56]'
            }`}
          >
            Home Spa
          </span>
        </div>
      )}
    </div>
  );
};
