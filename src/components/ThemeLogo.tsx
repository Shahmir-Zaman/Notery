'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function ThemeLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme to get the actual theme (handles 'system' theme)
  const isDark = mounted ? resolvedTheme === 'dark' : false;
  const logoSrc = isDark ? '/Notery_Logo_Light.png' : '/Notery_Logo_Dark.png';

  return (
    <div className="relative h-12 w-12">
      <Image
        src={logoSrc}
        height={48}
        width={48}
        alt="logo"
        className="transform transition-all duration-500 ease-in-out hover:scale-110"
        key={logoSrc} // Force re-render on src change for smooth transition
      />
    </div>
  );
}
