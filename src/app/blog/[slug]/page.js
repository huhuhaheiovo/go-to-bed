/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

import { blogPosts } from '../../../data/blogPosts';

export default function BlogPost() {
  const params = useParams();
  const { slug } = params;

  // Find post in the imported array
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-300 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-medium"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-medium mb-6"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <article className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-gray-300 mb-6">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {post.readTime}
              </div>
              <div>By {post.author}</div>
            </div>

            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Share2 size={16} />
              Share
            </button>
          </header>

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
