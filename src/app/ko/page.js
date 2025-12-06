import SleepMain from '../../components/SleepMain';
import { locales } from '../../data/locales';

export const metadata = locales.ko.metadata;

export default function Page() {
    return <SleepMain content={locales.ko} />;
}
