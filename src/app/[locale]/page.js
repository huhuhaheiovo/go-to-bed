import SleepCalculator from '@/components/calculator/SleepCalculator';
import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';
import { buildHomeSchema } from '@/lib/structured-data';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata(locale, 'home');
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const schema = buildHomeSchema(locale);
  const seo = getPageSeo(locale, 'home');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SleepCalculator locale={locale} homeH1={seo.h1} />
    </>
  );
}
