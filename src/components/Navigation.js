'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Home, Music, Volume1, Heart, Bed, Globe, ChevronDown, Calculator } from 'lucide-react';
import { locales } from '../data/locales';

export default function Navigation() {
  const pathname = usePathname();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  // Determine current language from path
  const getCurrentLangCode = () => {
    if (pathname.startsWith('/ja')) return 'ja';
    if (pathname.startsWith('/ko')) return 'ko';
    if (pathname.startsWith('/fr')) return 'fr';
    if (pathname.startsWith('/es')) return 'es';
    return 'en';
  };

  const currentLang = getCurrentLangCode();
  const t = locales[currentLang]?.nav || locales.en.nav;

  // Helper to construct localized paths for nav items
  // Since sub-pages like /white-noise don't have language prefixes yet in this simple implementation
  // we will keep them absolute for now, or adapt if those pages are localized later.
  // Assumption: The user asked for "pages" for languages which currently maps to the home page content translated.
  // Other links like /white-noise are likely still shared or English-only components. 
  // However, user asked "Navigation bar content increase multi-language".
  // I will just localize the LABELS for now. The hrefs might point to English pages if those don't exist in localized versions.
  // If the user wants full site localization, that's a bigger task.
  // For the home page link, it should point to the localized home.

  const getHomeLink = () => {
    return currentLang === 'en' ? '/' : `/${currentLang}`;
  };

  const navItems = [
    { href: getHomeLink(), label: t.tapping, icon: Home },
    { href: '/white-noise', label: t.whiteNoise, icon: Volume1 },
    { href: '/sleep-sounds', label: t.sleepSounds, icon: Music },
    { href: '/asmr', label: t.asmr, icon: Heart },
    { href: '/sleep-calculator', label: t.sleepCalculator, icon: Calculator },
    { href: '/regarding-sleep', label: t.regarding, icon: Bed }
  ];

  const languages = [
    { code: 'en', label: 'English', path: '/' },
    { code: 'ja', label: '日本語', path: '/ja' },
    { code: 'ko', label: '한국어', path: '/ko' },
    { code: 'fr', label: 'Français', path: '/fr' },
    { code: 'es', label: 'Español', path: '/es' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCurrentLangLabel = () => {
    const lang = languages.find(l => l.code === currentLang);
    return lang ? lang.label : 'English';
  };

  return (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={getHomeLink()} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image src="/sleep-assistant.svg" alt="Sleep Assistant" width={24} height={24} className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Sleep Assistant</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              // Simple active check - matches if path starts with href (except root) or exact match
              const isActive = item.href === '/' || item.href.match(/^\/[a-z]{2}$/)
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${isActive
                      ? 'bg-white/20 text-white'
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-all"
              >
                <Globe size={18} />
                <span className="text-sm font-medium">{getCurrentLangLabel()}</span>
                <ChevronDown size={14} className={`transform transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={lang.path}
                      onClick={() => setIsLangMenuOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-white/10 transition-colors ${currentLang === lang.code
                          ? 'text-indigo-400 bg-white/5'
                          : 'text-gray-300'
                        }`}
                    >
                      {lang.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Language Trigger (Simplified) */}
            <div className="text-sm font-bold text-blue-200 uppercase">{currentLang}</div>

            <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
