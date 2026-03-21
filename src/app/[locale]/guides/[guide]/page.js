import { notFound } from 'next/navigation';
import PlaceholderPage from '@/components/content/PlaceholderPage';
import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';

const GUIDES = {
  'sleep-stages': 'guides/sleep-stages',
  'how-much-sleep': 'guides/how-much-sleep',
  'sleep-deprivation': 'guides/sleep-deprivation',
  'sleep-tips': 'guides/sleep-tips'
};

export async function generateStaticParams() {
  const locales = ['en', 'zh', 'ja'];
  return locales.flatMap((locale) =>
    Object.keys(GUIDES).map((guide) => ({ locale, guide }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, guide } = await params;
  const pageKey = GUIDES[guide];
  if (!pageKey) return {};
  return buildMetadata(locale, pageKey, `guides/${guide}`);
}

export default async function GuidePage({ params }) {
  const { locale, guide } = await params;
  const pageKey = GUIDES[guide];

  if (!pageKey) {
    notFound();
  }

  const seo = getPageSeo(locale, pageKey);

  return (
    <PlaceholderPage
      title={seo.title}
      description={seo.description}
      h1={seo.h1}
    />
  );
}
