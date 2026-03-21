import PlaceholderPage from '@/components/content/PlaceholderPage';
import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata(locale, 'blog', 'blog');
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const seo = getPageSeo(locale, 'blog');

  return <PlaceholderPage title={seo.title} description={seo.description} h1={seo.h1} />;
}
