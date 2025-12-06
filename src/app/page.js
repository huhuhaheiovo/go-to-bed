import SleepMain from '../components/SleepMain';
import { locales } from '../data/locales';

export const metadata = locales.en.metadata;

export default function Page() {
  return <SleepMain content={locales.en} />;
}
