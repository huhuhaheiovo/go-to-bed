import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'zh', 'ja'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = locales.includes(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone:
      locale === 'zh' ? 'Asia/Shanghai' :
      locale === 'ja' ? 'Asia/Tokyo' :
      'America/New_York'
  };
});
