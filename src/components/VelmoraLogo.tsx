import React from 'react';

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

  // Sizing definitions
  const iconHeight = size === 'sm' ? 36 : size === 'md' ? 44 : size === 'lg' ? 64 : 96;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Emblem: Rose Gold Silhouette "V" with woman's profile and botanical leaves */}
      <svg
        height={iconHeight}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Rose Gold Gradient matching velmora logo.jpeg */}
          <linearGradient id="roseGoldGrad" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D99B9B" />
            <stop offset="45%" stopColor="#B76E79" />
            <stop offset="100%" stopColor="#8E4A56" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="80" y1="90" x2="140" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E2A8AA" />
            <stop offset="60%" stopColor="#C47986" />
            <stop offset="100%" stopColor="#9E5362" />
          </linearGradient>
        </defs>

        {/* Left arm of letter "V" */}
        <path
          d="M 38 32 C 46 32, 58 35, 60 48 C 62 60, 56 86, 70 120 C 72 125, 78 132, 84 126 C 88 120, 80 100, 78 90 C 74 72, 70 50, 76 34 C 77 32, 72 32, 38 32 Z"
          fill="url(#roseGoldGrad)"
          opacity="0.9"
        />

        {/* Stylized woman's profile and right arm of "V" */}
        {/* Forehead, nose, lips, chin, throat flowing down */}
        <path
          d="M 96 32 C 92 42, 88 56, 88 66 C 88 74, 94 76, 96 82 C 98 87, 95 91, 91 94 C 88 97, 86 102, 90 106 C 96 112, 105 118, 114 114 C 118 111, 122 104, 118 96 C 114 88, 108 86, 112 78 C 116 70, 128 66, 124 50 C 120 40, 106 32, 96 32 Z"
          fill="url(#roseGoldGrad)"
          opacity="0.85"
        />

        {/* Closed serene eye & long curved eyelashes */}
        <path
          d="M 104 60 C 107 63, 112 63, 115 60"
          stroke={isLight ? '#FAF9F5' : '#73333F'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Eyelash ticks */}
        <path d="M 107 62 L 106 65" stroke={isLight ? '#FAF9F5' : '#73333F'} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 110 63 L 110 66" stroke={isLight ? '#FAF9F5' : '#73333F'} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 113 62 L 114 65" stroke={isLight ? '#FAF9F5' : '#73333F'} strokeWidth="1.5" strokeLinecap="round" />

        {/* Graceful lips profile line */}
        <path
          d="M 120 76 C 122 77, 123 79, 121 80"
          stroke={isLight ? '#FAF9F5' : '#73333F'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Flowing hair strands forming the outer V curve */}
        <path
          d="M 88 34 C 76 50, 72 70, 78 88 C 84 106, 98 124, 114 130 C 100 134, 76 130, 64 112 C 54 96, 52 74, 58 52 C 62 38, 74 34, 88 34 Z"
          fill="url(#roseGoldGrad)"
        />

        {/* Botanical rose leaves fan at the base of the neck */}
        {/* Leaf 1 (center-up) */}
        <path
          d="M 106 112 C 108 98, 118 90, 124 88 C 124 98, 118 108, 106 112 Z"
          fill="url(#leafGrad)"
          opacity="0.9"
        />
        {/* Leaf 2 (top right) */}
        <path
          d="M 112 114 C 120 102, 134 98, 142 98 C 138 108, 128 116, 112 114 Z"
          fill="url(#leafGrad)"
          opacity="0.85"
        />
        {/* Leaf 3 (middle right) */}
        <path
          d="M 114 118 C 126 114, 140 114, 146 118 C 138 126, 124 126, 114 118 Z"
          fill="url(#leafGrad)"
          opacity="0.8"
        />
        {/* Leaf 4 (lower right) */}
        <path
          d="M 110 122 C 122 122, 134 130, 136 138 C 126 138, 116 132, 110 122 Z"
          fill="url(#leafGrad)"
          opacity="0.85"
        />
        {/* Delicate leaf veins */}
        <path d="M 110 110 L 122 92" stroke="#FAF9F5" strokeWidth="0.8" opacity="0.6" />
        <path d="M 114 114 L 138 102" stroke="#FAF9F5" strokeWidth="0.8" opacity="0.6" />
        <path d="M 116 118 L 140 120" stroke="#FAF9F5" strokeWidth="0.8" opacity="0.6" />
      </svg>

      {/* Brand Typography matching velmora logo.jpeg */}
      {showSubtitle && (
        <div className="flex flex-col">
          <div
            className={`font-serif tracking-[0.18em] font-medium uppercase leading-none ${
              size === 'sm'
                ? 'text-lg sm:text-xl'
                : size === 'md'
                ? 'text-xl sm:text-2xl'
                : size === 'lg'
                ? 'text-3xl'
                : 'text-4xl'
            } ${
              isLight
                ? 'text-[#FAF9F5]'
                : isDark
                ? 'text-[#1F2421]'
                : 'text-[#964B59]'
            }`}
          >
            Velmora
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`h-[1px] w-3 ${
                isLight ? 'bg-white/40' : 'bg-[#B76E79]/50'
              }`}
            />
            <span
              className={`text-[9px] sm:text-[10px] tracking-[0.26em] uppercase font-medium ${
                isLight ? 'text-white/80' : 'text-[#8E4A56]'
              }`}
            >
              Home Spa
            </span>
            <span
              className={`h-[1px] w-3 ${
                isLight ? 'bg-white/40' : 'bg-[#B76E79]/50'
              }`}
            />
          </div>

          <div
            className={`text-[8px] tracking-[0.2em] uppercase font-light mt-0.5 ${
              isLight ? 'text-white/60' : 'text-[#A86E78]'
            }`}
          >
            Since 2014
          </div>
        </div>
      )}
    </div>
  );
};
