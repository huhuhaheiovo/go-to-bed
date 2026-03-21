import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)']
};
