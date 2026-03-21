import SiteShell from '@/components/layout/SiteShell';
import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildMetadata('en', 'blog/[slug]', `blog/${slug}`, { slug });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const seo = getPageSeo('en', 'blog/[slug]', { slug });

  return (
    <SiteShell locale="en">
      <section className="container sc-placeholder">
        <h1>{seo.h1}</h1>
        <p>{seo.description}</p>
        <p>Blog article placeholder for this slug.</p>
      </section>
    </SiteShell>
  );
}
