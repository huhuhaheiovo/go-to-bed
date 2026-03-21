'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const LOCALES = ['en', 'zh', 'ja'];

function stripLocale(pathname) {
  if (!pathname) return '/';
  const parts = pathname.split('/');
  if (LOCALES.includes(parts[1])) {
    const rest = parts.slice(2).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname;
}

function localizedPath(locale, pathname) {
  const base = stripLocale(pathname);
  if (locale === 'en') return base;
  return base === '/' ? `/${locale}` : `/${locale}${base}`;
}

export default function LocaleSwitcher() {
  const pathname = usePathname();

  const links = useMemo(() => {
    return LOCALES.map((locale) => ({
      locale,
      href: localizedPath(locale, pathname)
    }));
  }, [pathname]);

  return (
    <div className="sc-locale-switcher" aria-label="Language switcher">
      {links.map((item) => (
        <a key={item.locale} href={item.href}>
          {item.locale.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
