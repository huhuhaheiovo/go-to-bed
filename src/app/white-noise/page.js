import WhiteNoiseClient from './WhiteNoiseClient';

export const metadata = {
  title: 'White Noise for Sleep & Focus | Sleep Assistant',
  description: 'Listen to pure white noise to filter out distractions, improve focus, and sleep better. Free online white noise generator.',
  keywords: 'white noise, sleep noise, focus noise, study noise, background noise, sleep sounds',
  openGraph: {
    title: 'White Noise for Sleep & Focus',
    description: 'Pure white noise to help you relax, sleep, and concentrate.',
    type: 'website',
  }
};

export default function WhiteNoisePage() {
  return (
    <div className="min-h-screen">
      <header className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          White Noise Collection
        </h1>
        <p className="text-xl text-blue-200">
          Pure white noise for peaceful sleep and concentration
        </p>
      </header>
      <WhiteNoiseClient />
    </div>
  );
}
