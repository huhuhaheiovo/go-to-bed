import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-blue-200 mb-8">
          The page you&#39;re looking for doesn&#39;t exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
