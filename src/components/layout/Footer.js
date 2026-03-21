import { getTranslations } from 'next-intl/server';

function localizedPath(locale, path) {
  if (locale === 'en') return path;
  return `/${locale}${path}`;
}

export default async function Footer({ locale }) {
  const t = await getTranslations({ locale, namespace: 'footer' });

  return (
    <footer className="sc-footer">
      <div className="container sc-footer-grid">
        <div>
          <h3>{t('tools_title')}</h3>
          <a href={localizedPath(locale, '/tools/sleep-calculator')}>Sleep Calculator</a>
          <a href={localizedPath(locale, '/tools/bedtime-calculator')}>Bedtime Calculator</a>
          <a href={localizedPath(locale, '/tools/wake-up-calculator')}>Wake Up Calculator</a>
          <a href={localizedPath(locale, '/tools/nap-calculator')}>Nap Calculator</a>
        </div>
        <div>
          <h3>{t('guides_title')}</h3>
          <a href={localizedPath(locale, '/guides/sleep-stages')}>Sleep Stages</a>
          <a href={localizedPath(locale, '/guides/how-much-sleep')}>How Much Sleep</a>
          <a href={localizedPath(locale, '/guides/sleep-deprivation')}>Sleep Deprivation</a>
          <a href={localizedPath(locale, '/guides/sleep-tips')}>Sleep Tips</a>
        </div>
        <div>
          <h3>{t('about_title')}</h3>
          <a href={localizedPath(locale, '/blog')}>Blog</a>
          <a href={localizedPath(locale, '/blog')}>{t('privacy')}</a>
          <p>{t('disclaimer')}</p>
        </div>
      </div>
      <div className="container sc-footer-note">{t('copyright')}</div>
    </footer>
  );
}
