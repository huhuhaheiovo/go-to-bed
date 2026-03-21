import { notFound } from 'next/navigation';
import PlaceholderPage from '@/components/content/PlaceholderPage';
import SiteShell from '@/components/layout/SiteShell';
import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';

const GUIDES = {
  'sleep-stages': 'guides/sleep-stages',
  'how-much-sleep': 'guides/how-much-sleep',
  'sleep-deprivation': 'guides/sleep-deprivation',
  'sleep-tips': 'guides/sleep-tips'
};

export async function generateStaticParams() {
  return Object.keys(GUIDES).map((guide) => ({ guide }));
}

export async function generateMetadata({ params }) {
  const { guide } = await params;
  const pageKey = GUIDES[guide];
  if (!pageKey) return {};
  return buildMetadata('en', pageKey, `guides/${guide}`);
}

export default async function GuidePage({ params }) {
  const { guide } = await params;
  const pageKey = GUIDES[guide];

  if (!pageKey) {
    notFound();
  }

  const seo = getPageSeo('en', pageKey);
  return (
    <SiteShell locale="en">
      <PlaceholderPage
        title={seo.title}
        description={seo.description}
        h1={seo.h1}
      />
    </SiteShell>
  );
}
