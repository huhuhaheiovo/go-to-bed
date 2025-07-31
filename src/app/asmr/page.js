'use client';

export default function ASMRPage() {
  const asmrOptions = [
    // {
    //   id: 'cafe',
    //   name: 'Cafe',
    //   description: 'Soft background music and coffee machine sounds',
    //   icon: '☕',
    //   color: 'from-amber-400 to-amber-600'
    // },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          ASMR Sounds
        </h1>
        <p className="text-xl text-blue-200 mb-8">
          Not at the moment, waiting for updates
        </p>
      </div>
    </div>
  );
}
