import PlaceholderPage from '@/components/content/PlaceholderPage';
import SiteShell from '@/components/layout/SiteShell';
import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';

export async function generateMetadata() {
  return buildMetadata('en', 'blog', 'blog');
}

export default function BlogPage() {
  const seo = getPageSeo('en', 'blog');
  return (
    <SiteShell locale="en">
      <PlaceholderPage title={seo.title} description={seo.description} h1={seo.h1} />
    </SiteShell>
  );
}
