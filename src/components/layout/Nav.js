import { getTranslations } from 'next-intl/server';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';

function localizedPath(locale, path) {
  if (locale === 'en') return path;
  return `/${locale}${path}`;
}

export default async function Nav({ locale }) {
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <header className="sc-nav-wrap">
      <div className="sc-nav container">
        <a href={localizedPath(locale, '/')} className="sc-logo">SleepTool</a>
        <nav className="sc-nav-links">
          <a href={localizedPath(locale, '/')}>{t('home')}</a>
          <a href={localizedPath(locale, '/tools/sleep-calculator')}>{t('tools')}</a>
          <a href={localizedPath(locale, '/guides/sleep-stages')}>{t('guides')}</a>
          <a href={localizedPath(locale, '/blog')}>{t('blog')}</a>
        </nav>
        <div className="sc-nav-actions">
          <a className="sc-nav-cta" href={localizedPath(locale, '/tools/sleep-calculator')}>
            {t('cta')}
          </a>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
