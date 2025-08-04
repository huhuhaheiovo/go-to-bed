'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Home, Music, Volume1, Heart } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Tapping Sound',
      icon: Home
    },
    {
      href: '/white-noise',
      label: 'White Noise',
      icon: Volume1
    },
    {
      href: '/sleep-sounds',
      label: 'Sleep Sounds',
      icon: Music
    },
    {
      href: '/asmr',
      label: 'ASMR',
      icon: Heart
    }
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Image src="/sleep-assistant.svg" alt="Sleep Assistant" className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Sleep Assistant</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20 text-white' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
