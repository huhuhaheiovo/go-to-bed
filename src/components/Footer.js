import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Shield, FileText, Music, Mail, Github } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    {
      title: "Content",
      links: [
        { href: '/', label: 'Tapping Sound', icon: Music },
        { href: '/white-noise', label: 'White Noise', icon: Music },
        { href: '/sleep-sounds', label: 'Sleep Sounds', icon: Music },
        { href: '/asmr', label: 'ASMR', icon: Music },
      ]
    },
    {
      title: "Resources",
      links: [
        { href: '/blog', label: 'Blog', icon: BookOpen },
        { href: '/privacy-policy', label: 'Privacy Policy', icon: Shield },
        { href: '/terms-of-service', label: 'Terms of Service', icon: FileText },
      ]
    },
    {
      title: "Contact",
      links: [
        { href: 'mailto:xu310715321@gmail.com', label: 'Email', icon: Mail },
        { href: 'https://github.com', label: 'GitHub', icon: Github },
      ]
    }
  ];

  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="flex items-center gap-2 text-gray-300 hover:text-blue-200 transition-colors"
                      >
                        <Icon size={16} />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded flex items-center justify-center">
                <Image src="/sleep-assistant.svg" alt="Sleep Assistant" width={20} height={20} className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">Sleep Assistant</span>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2025 Sleep Assistant. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
