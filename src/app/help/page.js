'use client';

export default function HelpPage() {
  const audioOptions = [
    // {
    //   id: 'rain',
    //   name: 'Rain',
    //   description: 'Gentle raindrops creating a peaceful atmosphere',
    //   icon: '🌧️'
    // },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Help & Support
        </h1>
        <p className="text-xl text-blue-200 text-center mb-12">
          Not at the moment, waiting for updates
        </p>
      </div>
    </div>
  );
}
