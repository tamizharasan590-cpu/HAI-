import React from 'react';

interface HaiLogoProps {
  className?: string;
  theme?: 'light' | 'dark' | 'brand';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const HaiLogo: React.FC<HaiLogoProps> = ({
  className = '',
  theme = 'brand',
  showTagline = true,
  size = 'md'
}) => {
  const isDark = theme === 'dark';

  // Responsive height based on size prop
  const logoHeight =
    size === 'sm'
      ? 'h-7 sm:h-8'
      : size === 'lg'
      ? 'h-11 sm:h-13'
      : size === 'xl'
      ? 'h-14 sm:h-18'
      : 'h-9 sm:h-10';

  const taglineSize =
    size === 'sm'
      ? 'text-[8px]'
      : size === 'lg'
      ? 'text-[11px]'
      : size === 'xl'
      ? 'text-xs'
      : 'text-[9px]';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Container adapting to dark/light theme */}
      <div
        className={`inline-flex items-center justify-center transition-transform duration-200 hover:scale-105 ${
          isDark
            ? 'bg-white px-2.5 py-1 rounded-md shadow-sm'
            : 'mix-blend-multiply'
        }`}
      >
        <img
          src="/hai-logo.png"
          alt="HAI — Human Agri Intelligence"
          className={`${logoHeight} w-auto object-contain`}
          loading="eager"
        />
      </div>

      {showTagline && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-black tracking-wider uppercase leading-tight ${taglineSize} ${
              isDark ? 'text-white' : 'text-hai-forest'
            }`}
          >
            Human Agri Intelligence
          </span>
          <span
            className={`text-[8px] sm:text-[9px] font-medium tracking-normal mt-0.5 ${
              isDark ? 'text-hai-leaf/80' : 'text-hai-agri'
            }`}
          >
            உழவர் நேரடி கொள்முதல் • Tamil Nadu
          </span>
        </div>
      )}
    </div>
  );
};
