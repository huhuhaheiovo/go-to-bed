import SiteShell from '@/components/layout/SiteShell';
import SleepCalculator from '@/components/calculator/SleepCalculator';
import { buildMetadata } from '@/lib/metadata';
import { getPageSeo } from '@/lib/page-seo';
import { buildHomeSchema } from '@/lib/structured-data';
import enMessages from '@/messages/en.json';

export async function generateMetadata() {
  return buildMetadata('en', 'home');
}

export default function HomePage() {
  const schema = buildHomeSchema('en');
  const seo = getPageSeo('en', 'home');

  return (
    <SiteShell locale="en" messages={enMessages}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SleepCalculator locale="en" homeH1={seo.h1} />
    </SiteShell>
  );
}
