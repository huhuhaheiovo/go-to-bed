import SleepMain from '../../components/SleepMain';
import { locales } from '../../data/locales';

export const metadata = locales.fr.metadata;

export default function Page() {
    return <SleepMain content={locales.fr} />;
}
