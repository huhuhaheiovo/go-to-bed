'use client';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "How to Improve Your Sleep Quality with White Noise",
      excerpt: "Discover the science behind white noise and how it can help you achieve better sleep quality. Learn about different types of white noise and their benefits.",
      date: "August 15, 2025",
      readTime: "5 min read",
      category: "Sleep Science",
      slug: "improve-sleep-quality-white-noise"
    },
    {
      id: 2,
      title: "The Benefits of ASMR for Relaxation and Sleep",
      excerpt: "Explore the world of ASMR and how these autonomous sensory meridian response triggers can help you relax and fall asleep faster.",
      date: "August 10, 2025",
      readTime: "4 min read",
      category: "ASMR",
      slug: "asmr-benefits-relaxation-sleep"
    },
    {
      id: 3,
      title: "Natural Sleep Sounds: Nature's Lullaby",
      excerpt: "From rain sounds to ocean waves, discover how natural sounds can create the perfect environment for restful sleep and deep relaxation.",
      date: "August 5, 2025",
      readTime: "6 min read",
      category: "Sleep Sounds",
      slug: "natural-sleep-sounds-nature-lullaby"
    },
    {
      id: 4,
      title: "Creating the Perfect Sleep Environment",
      excerpt: "Learn how to set up your bedroom and use audio tools to create an optimal sleep environment that promotes deep, restorative sleep.",
      date: "July 30, 2025",
      readTime: "7 min read",
      category: "Sleep Tips",
      slug: "perfect-sleep-environment"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Sleep Blog
          </h1>
          <p className="text-xl text-blue-200">
            Expert insights on sleep, relaxation, and wellness
          </p>
        </div>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-3 text-white hover:text-blue-200 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-300 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-medium transition-colors"
              >
                Read more
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Get the latest sleep tips and wellness advice delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
