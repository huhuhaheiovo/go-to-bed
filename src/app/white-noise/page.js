'use client';

export default function WhiteNoisePage() {
  const whiteNoiseOptions = [
    // {
    //   id: 'white-noise',
    //   name: 'White Noise',
    //   description: 'Pure white noise to block out external disturbances',
    //   icon: '⚪',
    //   color: 'from-gray-400 to-gray-600'
    // }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          White Noise Collection
        </h1>
        <p className="text-xl text-blue-200 mb-8">
          Not at the moment, waiting for updates
        </p>
      </div>
    </div>
  );
}
