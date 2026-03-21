import { POLISHED_PATHS, SITEMAP_LOCALES } from '@/lib/sitemap-pages';

const BASE_URL = 'https://sleeptool.top';

function localizedPath(locale, path) {
  if (locale === 'en') return path;
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

export default function sitemap() {
  const now = new Date();

  return SITEMAP_LOCALES.flatMap((locale) =>
    POLISHED_PATHS.map((path) => {
      const urlPath = localizedPath(locale, path);
      return {
        url: `${BASE_URL}${urlPath}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: path === '/' ? 1 : 0.8
      };
    })
  );
}
