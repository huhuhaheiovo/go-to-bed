import { notFound } from 'next/navigation';
import SleepCalculator from '@/components/calculator/SleepCalculator';
import PlaceholderPage from '@/components/content/PlaceholderPage';
import SiteShell from '@/components/layout/SiteShell';
import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';
import enMessages from '@/messages/en.json';

const TOOLS = {
  'sleep-calculator': 'tools/sleep-calculator',
  'bedtime-calculator': 'tools/bedtime-calculator',
  'wake-up-calculator': 'tools/wake-up-calculator',
  'nap-calculator': 'tools/nap-calculator'
};

export async function generateStaticParams() {
  return Object.keys(TOOLS).map((tool) => ({ tool }));
}

export async function generateMetadata({ params }) {
  const { tool } = await params;
  const pageKey = TOOLS[tool];
  if (!pageKey) return {};
  return buildMetadata('en', pageKey, `tools/${tool}`);
}

export default async function ToolPage({ params }) {
  const { tool } = await params;
  const pageKey = TOOLS[tool];

  if (!pageKey) {
    notFound();
  }

  if (tool === 'sleep-calculator') {
    const seo = getPageSeo('en', pageKey);
    return (
      <SiteShell locale="en" messages={enMessages}>
        <SleepCalculator locale="en" homeH1={seo.h1} />
      </SiteShell>
    );
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
