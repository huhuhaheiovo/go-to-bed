import SleepSoundsClient from './SleepSoundsClient';

export const metadata = {
  title: 'Sleep Sounds for Deep Sleep | Sleep Assistant',
  description: 'Drift off to sleep with our collection of calming sleep sounds. Free online sleep sound player.',
  keywords: 'sleep sounds, deep sleep sounds, calming sounds, relaxing sounds, sleep music, insomnia relief',
  openGraph: {
    title: 'Sleep Sounds for Deep Sleep',
    description: 'Collection of gentle sounds to help you fall asleep peacefully.',
    type: 'website',
  }
};

export default function SleepSoundsPage() {
  return (
    <div className="min-h-screen">
      <header className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Sleep Sounds
        </h1>
        <p className="text-xl text-blue-200">
          Gentle sounds to help you fall asleep peacefully
        </p>
      </header>
      <SleepSoundsClient />
    </div>
  );
}
