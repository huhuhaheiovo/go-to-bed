import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  return buildMetadata(locale, 'blog/[slug]', `blog/${slug}`, { slug });
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  const seo = getPageSeo(locale, 'blog/[slug]', { slug });

  return (
    <section className="container sc-placeholder">
      <h1>{seo.h1}</h1>
      <p>{seo.description}</p>
      <p>Blog article placeholder for this slug.</p>
    </section>
  );
}
