'use client';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

import { blogPosts } from '../../data/blogPosts';

export default function BlogPage() {
  // blogPosts is now imported

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
