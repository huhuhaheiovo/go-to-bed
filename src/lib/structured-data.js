export function buildHomeSchema(locale = 'en') {
  const inLanguage = locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : 'en-US';
  const url = locale === 'en' ? 'https://sleeptool.top/' : `https://sleeptool.top/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SleepTool',
    description: 'Smart sleep cycle calculator based on 90-minute cycles.',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    inLanguage,
    url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}
