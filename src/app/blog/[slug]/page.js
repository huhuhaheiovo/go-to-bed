/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

export default function BlogPost() {
  const params = useParams();
  const { slug } = params;

  // 模拟博客文章数据
  const blogPosts = {
    'improve-sleep-quality-white-noise': {
      title: "How to Improve Your Sleep Quality with White Noise",
      content: `
        <h2>The Science Behind White Noise</h2>
        <p>White noise is a type of sound that contains all frequencies at equal intensity. It's often described as a steady, consistent sound that can help mask other noises that might disturb your sleep.</p>
        
        <h3>How White Noise Works</h3>
        <p>When you're trying to sleep, sudden sounds can jolt you awake or prevent you from falling asleep in the first place. White noise works by creating a consistent background sound that helps mask these disruptive noises.</p>
        
        <h3>Benefits of White Noise for Sleep</h3>
        <ul>
          <li>Masks disruptive environmental sounds</li>
          <li>Creates a consistent sleep environment</li>
          <li>Helps the brain focus on a steady sound</li>
          <li>Can improve sleep quality and duration</li>
        </ul>
        
        <h3>Types of White Noise</h3>
        <p>There are several types of white noise you can use for sleep:</p>
        <ul>
          <li><strong>Pure White Noise:</strong> A consistent hissing sound</li>
          <li><strong>Pink Noise:</strong> Similar to white noise but with reduced high frequencies</li>
          <li><strong>Brown Noise:</strong> Deeper, more bass-heavy sound</li>
          <li><strong>Nature Sounds:</strong> Rain, ocean waves, or forest sounds</li>
        </ul>
        
        <h3>Tips for Using White Noise</h3>
        <p>To get the most benefit from white noise:</p>
        <ul>
          <li>Start with a low volume and adjust as needed</li>
          <li>Place the sound source away from your bed</li>
          <li>Use a timer to turn off after you fall asleep</li>
          <li>Experiment with different types of sounds</li>
        </ul>
      `,
      date: "August 15, 2025",
      readTime: "5 min read",
      category: "Sleep Science",
      author: "Sleep Expert Team"
    },
    'asmr-benefits-relaxation-sleep': {
      title: "The Benefits of ASMR for Relaxation and Sleep",
      content: `
        <h2>Understanding ASMR</h2>
        <p>ASMR (Autonomous Sensory Meridian Response) is a tingling sensation that typically begins on the scalp and moves down the back of the neck and upper spine. It's triggered by specific audio and visual stimuli.</p>
        
        <h3>How ASMR Helps with Sleep</h3>
        <p>ASMR triggers can help you relax and fall asleep faster by:</p>
        <ul>
          <li>Reducing stress and anxiety</li>
          <li>Creating a calming environment</li>
          <li>Helping the mind focus on gentle stimuli</li>
          <li>Promoting deep relaxation</li>
        </ul>
        
        <h3>Popular ASMR Triggers</h3>
        <p>Common ASMR triggers that can help with sleep include:</p>
        <ul>
          <li>Soft whispering or gentle speech</li>
          <li>Tapping sounds on various surfaces</li>
          <li>Paper or fabric rustling</li>
          <li>Gentle tapping or scratching sounds</li>
          <li>Soft breathing or ambient sounds</li>
        </ul>
      `,
      date: "August 10, 2025",
      readTime: "4 min read",
      category: "ASMR",
      author: "ASMR Specialist"
    },
    'natural-sleep-sounds-nature-lullaby': {
      title: "Natural Sleep Sounds: Nature's Lullaby",
      content: `
        <h2>The Power of Natural Sounds</h2>
        <p>Nature has provided us with some of the most effective sleep sounds. From gentle rain to ocean waves, these natural sounds have been helping humans sleep for thousands of years.</p>
        
        <h3>Most Effective Natural Sleep Sounds</h3>
        <ul>
          <li><strong>Rain Sounds:</strong> Gentle rainfall creates a soothing, consistent background noise</li>
          <li><strong>Ocean Waves:</strong> The rhythmic sound of waves can be deeply relaxing</li>
          <li><strong>Forest Sounds:</strong> Birds, wind through trees, and distant wildlife</li>
          <li><strong>Streams and Rivers:</strong> Flowing water creates a peaceful atmosphere</li>
        </ul>
        
        <h3>Why Natural Sounds Work</h3>
        <p>Natural sounds are effective for sleep because they:</p>
        <ul>
          <li>Are familiar and non-threatening</li>
          <li>Create a sense of being in nature</li>
          <li>Have consistent, predictable patterns</li>
          <li>Help mask urban or household noises</li>
        </ul>
      `,
      date: "August 5, 2025",
      readTime: "6 min read",
      category: "Sleep Sounds",
      author: "Nature Sound Expert"
    },
    'perfect-sleep-environment': {
      title: "Creating the Perfect Sleep Environment",
      content: `
        <h2>Setting Up Your Sleep Sanctuary</h2>
        <p>Your sleep environment plays a crucial role in the quality of your rest. Here's how to create the perfect sleep environment using both physical and audio elements.</p>
        
        <h3>Physical Environment</h3>
        <ul>
          <li><strong>Temperature:</strong> Keep your bedroom between 60-67°F (15-19°C)</li>
          <li><strong>Lighting:</strong> Use blackout curtains and dim lights</li>
          <li><strong>Bedding:</strong> Choose comfortable, breathable materials</li>
          <li><strong>Clutter:</strong> Keep your bedroom clean and organized</li>
        </ul>
        
        <h3>Audio Environment</h3>
        <p>Combine these audio elements for optimal sleep:</p>
        <ul>
          <li>White noise or nature sounds</li>
          <li>Consistent volume levels</li>
          <li>Timer functions to turn off after sleep</li>
          <li>High-quality audio equipment</li>
        </ul>
        
        <h3>Technology Tips</h3>
        <p>Use technology to enhance your sleep environment:</p>
        <ul>
          <li>Smart speakers for easy control</li>
          <li>Sleep tracking apps</li>
          <li>Automated lighting systems</li>
          <li>Temperature control devices</li>
        </ul>
      `,
      date: "July 30, 2025",
      readTime: "7 min read",
      category: "Sleep Tips",
      author: "Sleep Environment Specialist"
    }
  };

  const post = blogPosts[slug];

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
