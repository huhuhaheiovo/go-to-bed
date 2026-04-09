import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';

const PAGE_KEY = 'sbtitest';

export async function generateStaticParams() {
  const locales = ['en', 'zh', 'ja'];
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata(locale, PAGE_KEY, 'sbtitest');
}

export default async function SbtiTestPage({ params }) {
  const { locale } = await params;
  const seo = getPageSeo(locale, PAGE_KEY);

  return (
    <div>
      <h1 className="sr-only">{seo.h1}</h1>
      <iframe
        src="https://sbti.fancc.de5.net/"
        title={seo.h1}
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          display: 'block',
        }}
        allowFullScreen
      />
    </div>
  );
}
