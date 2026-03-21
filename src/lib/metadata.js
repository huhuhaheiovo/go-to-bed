import { getPageSeo } from '@/lib/page-seo';

const BASE_URL = 'https://sleeptool.top';

function normalizeSlug(slug = '') {
  return slug.replace(/^\/+/, '').replace(/\/+$/, '');
}

function withLocalePath(locale, slug = '') {
  const cleanSlug = normalizeSlug(slug);
  const suffix = cleanSlug ? `/${cleanSlug}` : '';

  if (locale === 'en') return suffix || '/';
  return `/${locale}${suffix}`;
}

export async function buildMetadata(locale, pageKey, slug = '', values = {}) {
  const seo = getPageSeo(locale, pageKey, values);
  const canonicalPath = withLocalePath(locale, slug);
  const zhPath = withLocalePath('zh', slug);
  const enPath = withLocalePath('en', slug);
  const jaPath = withLocalePath('ja', slug);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        en: `${BASE_URL}${enPath}`,
        zh: `${BASE_URL}${zhPath}`,
        ja: `${BASE_URL}${jaPath}`,
        'x-default': `${BASE_URL}${enPath}`
      }
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      siteName: 'SleepTool',
      url: `${BASE_URL}${canonicalPath}`,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : locale === 'ja' ? 'ja_JP' : 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description
    }
  };
}
