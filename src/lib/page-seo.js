import pageSeo from '@/content/page-seo.json';

function interpolate(template = '', values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? `{${key}}`);
}

export function getPageSeo(locale, pageKey, values = {}) {
  const localePack = pageSeo[locale] || pageSeo.en;
  const fallback = pageSeo.en[pageKey];
  const target = localePack[pageKey] || fallback;

  if (!target) {
    throw new Error(`Missing SEO config for page key: ${pageKey}`);
  }

  return {
    title: interpolate(target.title, values),
    description: interpolate(target.description, values),
    h1: interpolate(target.h1, values)
  };
}

