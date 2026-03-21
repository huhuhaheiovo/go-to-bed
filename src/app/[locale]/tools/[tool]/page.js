import { notFound } from 'next/navigation';
import SleepCalculator from '@/components/calculator/SleepCalculator';
import PlaceholderPage from '@/components/content/PlaceholderPage';
import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';

const TOOLS = {
  'sleep-calculator': 'tools/sleep-calculator',
  'bedtime-calculator': 'tools/bedtime-calculator',
  'wake-up-calculator': 'tools/wake-up-calculator',
  'nap-calculator': 'tools/nap-calculator'
};

export async function generateStaticParams() {
  const locales = ['en', 'zh', 'ja'];
  return locales.flatMap((locale) =>
    Object.keys(TOOLS).map((tool) => ({ locale, tool }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, tool } = await params;
  const pageKey = TOOLS[tool];
  if (!pageKey) return {};
  return buildMetadata(locale, pageKey, `tools/${tool}`);
}

export default async function ToolPage({ params }) {
  const { locale, tool } = await params;
  const pageKey = TOOLS[tool];

  if (!pageKey) {
    notFound();
  }

  if (tool === 'sleep-calculator') {
    const seo = getPageSeo(locale, pageKey);
    return <SleepCalculator locale={locale} homeH1={seo.h1} />;
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
